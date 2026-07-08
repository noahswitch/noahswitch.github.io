"use client";

import { ReactNode, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** How strongly the element follows the cursor. Keep subtle. */
  strength?: number;
};

/**
 * Wraps interactive elements (buttons, links, icons) with a subtle magnetic
 * pull toward the cursor. Disabled entirely for touch and reduced-motion.
 */
export function Magnetic({ children, className, strength = 18 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const quickX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const quickY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;

    quickX.current ??= gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    quickY.current ??= gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const rect = el.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);

    quickX.current(relX / strength);
    quickY.current(relY / strength);
  }

  function handlePointerLeave() {
    quickX.current?.(0);
    quickY.current?.(0);
  }

  return (
    <div
      ref={ref}
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ display: "inline-block" }}
    >
      {children}
    </div>
  );
}
