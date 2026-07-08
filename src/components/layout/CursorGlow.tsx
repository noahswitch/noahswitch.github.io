"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const quickX = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" });
    const quickY = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" });

    function handleMove(event: PointerEvent) {
      quickX(event.clientX);
      quickY(event.clientY);
    }

    gsap.set(el, { opacity: 1 });
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [reduced]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[2] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
      style={{
        background:
          "radial-gradient(circle, rgba(232,170,76,0.06) 0%, rgba(106,99,246,0.035) 45%, transparent 70%)",
      }}
    />
  );
}
