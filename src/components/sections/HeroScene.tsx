"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type LayerConfig = {
  count: number;
  spreadX: number;
  spreadY: number;
  zBase: number;
  zSpread: number;
  size: number;
  opacity: number;
  parallax: number; // how strongly this layer drifts with the cursor
  rotationSpeed: number;
  warmBias: number; // 0-1, chance of a warm (signal) star vs cool ones
  /** Radius (world units) within which stars flee the cursor. 0 disables it. */
  repelRadius: number;
  /** How far a star gets pushed at the very center of the repel radius. */
  repelStrength: number;
};

// Three depth layers read as genuine parallax: the far layer is dense, dim,
// and barely moves; the near layer is sparse, bright, and tracks the cursor
// noticeably. The near two layers also scatter away from the cursor like
// startled fish, then drift back to rest — the far layer stays put, since
// its stars are small/dim enough that per-particle motion wouldn't read
// anyway, and skipping it keeps the effect cheap.
const LAYERS: LayerConfig[] = [
  {
    count: 5200,
    spreadX: 22,
    spreadY: 14,
    zBase: -7,
    zSpread: 3.5,
    size: 0.024,
    opacity: 0.4,
    parallax: 0.12,
    rotationSpeed: 0.01,
    warmBias: 0.12,
    repelRadius: 0,
    repelStrength: 0,
  },
  {
    count: 2200,
    spreadX: 17,
    spreadY: 11,
    zBase: -2.5,
    zSpread: 2.5,
    size: 0.042,
    opacity: 0.65,
    parallax: 0.28,
    rotationSpeed: -0.016,
    warmBias: 0.22,
    repelRadius: 2.6,
    repelStrength: 1.1,
  },
  {
    count: 550,
    spreadX: 12,
    spreadY: 7.5,
    zBase: 1,
    zSpread: 1.5,
    size: 0.07,
    opacity: 0.9,
    parallax: 0.5,
    rotationSpeed: 0.026,
    warmBias: 0.4,
    repelRadius: 3.2,
    repelStrength: 1.8,
  },
];

// Computed once at module load (not during render) so nothing impure ever
// runs inside the component's render phase.
function buildLayerData(cfg: LayerConfig) {
  const pos = new Float32Array(cfg.count * 3);
  const col = new Float32Array(cfg.count * 3);
  const signal = new THREE.Color("#f0b85e");
  const violet = new THREE.Color("#7a72ff");
  const teal = new THREE.Color("#5fdcce");

  for (let i = 0; i < cfg.count; i++) {
    const i3 = i * 3;
    pos[i3] = (Math.random() - 0.5) * cfg.spreadX;
    pos[i3 + 1] = (Math.random() - 0.5) * cfg.spreadY;
    pos[i3 + 2] = cfg.zBase + (Math.random() - 0.5) * cfg.zSpread;

    const roll = Math.random();
    const c = roll < cfg.warmBias ? signal : roll < cfg.warmBias + 0.35 ? teal : violet;
    col[i3] = c.r;
    col[i3 + 1] = c.g;
    col[i3 + 2] = c.b;
  }
  return [pos, col] as const;
}

const LAYER_DATA = LAYERS.map(buildLayerData);

function StarLayer({
  cfg,
  data,
  index,
}: {
  cfg: LayerConfig;
  data: readonly [Float32Array, Float32Array];
  index: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const smoothed = useRef({ x: 0, y: 0 });
  const livePositionsRef = useRef<Float32Array | null>(null);
  const [homePositions, colors] = data;
  const interactive = cfg.repelRadius > 0;

  // The mutable working copy we scatter/relax each frame is created and
  // attached to the geometry imperatively, entirely outside of render (refs
  // must only be read/written in effects or frame callbacks, never during
  // the render phase itself). The original homePositions array is never
  // touched, so stars always have a true rest position to ease back toward.
  useEffect(() => {
    if (!interactive) return;
    const geometry = geometryRef.current;
    if (!geometry) return;

    const live = homePositions.slice();
    livePositionsRef.current = live;
    geometry.setAttribute("position", new THREE.BufferAttribute(live, 3));
  }, [interactive, homePositions]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    // Snappier easing than a single flat field — this is what sells the
    // "the background reacts to me" feeling instead of a slow drift.
    smoothed.current.x += (state.pointer.x - smoothed.current.x) * 0.06;
    smoothed.current.y += (state.pointer.y - smoothed.current.y) * 0.06;

    group.position.x = smoothed.current.x * cfg.parallax;
    group.position.y = smoothed.current.y * cfg.parallax * 0.6;
    group.rotation.y += delta * cfg.rotationSpeed;
    group.rotation.x = smoothed.current.y * 0.05 * (index + 1);

    if (!interactive) return;
    const geometry = geometryRef.current;
    const livePositions = livePositionsRef.current;
    if (!geometry || !livePositions) return;

    const camera = state.camera as THREE.PerspectiveCamera;
    const fovRad = (camera.fov * Math.PI) / 180;
    const aspect = state.size.width / state.size.height;
    const radius = cfg.repelRadius;

    for (let i = 0; i < homePositions.length / 3; i++) {
      const i3 = i * 3;
      const homeX = homePositions[i3];
      const homeY = homePositions[i3 + 1];
      const z = homePositions[i3 + 2];

      // Approximate world-space cursor position at this star's depth, so
      // the repel radius feels consistent regardless of how far back a
      // star sits.
      const depth = camera.position.z - (z + group.position.z);
      const halfH = Math.tan(fovRad / 2) * Math.max(depth, 0.1);
      const halfW = halfH * aspect;
      const cursorX = smoothed.current.x * halfW;
      const cursorY = smoothed.current.y * halfH;

      const dx = homeX - cursorX;
      const dy = homeY - cursorY;
      const distSq = dx * dx + dy * dy;

      let targetX = homeX;
      let targetY = homeY;

      if (distSq < radius * radius) {
        const dist = Math.sqrt(distSq) || 0.001;
        const push = (1 - dist / radius) * cfg.repelStrength;
        targetX = homeX + (dx / dist) * push;
        targetY = homeY + (dy / dist) * push;
      }

      // Ease the live position toward the target — scatter is quick,
      // the return drift is a touch slower so it doesn't feel jittery.
      const ease = targetX === homeX && targetY === homeY ? 0.045 : 0.14;
      livePositions[i3] += (targetX - livePositions[i3]) * ease;
      livePositions[i3 + 1] += (targetY - livePositions[i3 + 1]) * ease;
    }

    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    posAttr.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry ref={geometryRef}>
          {!interactive && <bufferAttribute attach="attributes-position" args={[homePositions, 3]} />}
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={cfg.size}
          vertexColors
          transparent
          opacity={cfg.opacity}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function Starfield() {
  return (
    <>
      {LAYERS.map((cfg, i) => (
        <StarLayer key={i} cfg={cfg} data={LAYER_DATA[i]} index={i} />
      ))}
    </>
  );
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 5.2], fov: 50 }}
      className="!absolute inset-0"
    >
      <Starfield />
    </Canvas>
  );
}

export default HeroScene;
