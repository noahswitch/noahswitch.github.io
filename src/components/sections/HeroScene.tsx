"use client";

import { useRef } from "react";
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
  parallax: number; // how strongly this layer shifts with the cursor
  rotationSpeed: number;
  warmBias: number; // 0-1, chance of a warm (signal) star vs cool ones
};

// Three depth layers read as genuine parallax: the far layer is dense, dim,
// and barely moves; the near layer is sparse, bright, and tracks the cursor
// noticeably. Rotation direction alternates per layer too, so the drift
// itself reads as depth rather than one flat field spinning together.
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
  },
  {
    count: 2200,
    spreadX: 17,
    spreadY: 11,
    zBase: -2.5,
    zSpread: 2.5,
    size: 0.042,
    opacity: 0.65,
    parallax: 0.32,
    rotationSpeed: -0.016,
    warmBias: 0.22,
  },
  {
    count: 550,
    spreadX: 12,
    spreadY: 7.5,
    zBase: 1,
    zSpread: 1.5,
    size: 0.07,
    opacity: 0.9,
    parallax: 0.6,
    rotationSpeed: 0.026,
    warmBias: 0.4,
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

function StarLayer({ cfg, data, index }: { cfg: LayerConfig; data: readonly [Float32Array, Float32Array]; index: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const smoothed = useRef({ x: 0, y: 0 });
  const [positions, colors] = data;

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
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
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
