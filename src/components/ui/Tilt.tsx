"use client";

import { ReactNode, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Tilt({
  children,
  className,
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const quickX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const quickY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;

    quickX.current ??= gsap.quickTo(el, "rotateX", { duration: 0.6, ease: "power3.out" });
    quickY.current ??= gsap.quickTo(el, "rotateY", { duration: 0.6, ease: "power3.out" });

    const rect = el.getBoundingClientRect();
    const px = (event.clientY - rect.top) / rect.height - 0.5;
    const py = (event.clientX - rect.left) / rect.width - 0.5;

    quickX.current(px * -max);
    quickY.current(py * max);
  }

  function handlePointerLeave() {
    quickX.current?.(0);
    quickY.current?.(0);
  }

  return (
    <div style={{ perspective: 1000 }} className={className}>
      <div
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ transformStyle: "preserve-3d" }}
        className="h-full w-full will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}
