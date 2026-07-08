"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { bootLines, profile } from "@/data/content";

const SESSION_KEY = "ns_intro_shown_v1";

export function IntroSequence() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const skipBtnRef = useRef<HTMLButtonElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const nameRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  function hideInstantly() {
    const els = [overlayRef.current, skipBtnRef.current].filter(Boolean) as HTMLElement[];
    gsap.set(els, { autoAlpha: 0, pointerEvents: "none" });
  }

  function finishNow() {
    if (timelineRef.current) {
      timelineRef.current.progress(1);
      timelineRef.current.kill();
    } else {
      hideInstantly();
    }
  }

  useIsomorphicLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadyShown = sessionStorage.getItem(SESSION_KEY);

    if (reduced || alreadyShown) {
      hideInstantly();
      return;
    }
    sessionStorage.setItem(SESSION_KEY, "1");

    const overlay = overlayRef.current;
    if (!overlay) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      timelineRef.current = tl;

      tl.set(overlay, { autoAlpha: 1 })
        .to(
          lineRefs.current.filter(Boolean),
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.22 },
          0.3
        )
        .to(nameRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "+=0.25")
        .to(overlay, { duration: 0.35 }, "+=0.6") // brief hold
        .to(skipBtnRef.current, { opacity: 0, duration: 0.3 }, "<")
        .to(
          overlay,
          {
            autoAlpha: 0,
            scale: 1.045,
            duration: 0.9,
            ease: "power2.inOut",
            pointerEvents: "none",
          },
          ">"
        );
    }, overlay);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink opacity-0"
      >
        <div
          className="ambient-blob pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(232,170,76,0.14), transparent 70%)" }}
        />
        <div
          className="ambient-blob pointer-events-none absolute left-[30%] top-[60%] h-[360px] w-[360px] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(106,99,246,0.12), transparent 70%)",
            animationDelay: "-6s",
          }}
        />

        <div className="relative flex flex-col items-center gap-1.5">
          {bootLines.map((line, i) => (
            <p
              key={line}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              className="translate-y-2 font-mono text-xs sm:text-sm text-mist-2 opacity-0"
            >
              <span className="text-teal">$</span> {line}
            </p>
          ))}
        </div>

        <div ref={nameRef} className="relative mt-8 translate-y-3 text-center opacity-0">
          <p className="font-display text-4xl font-medium tracking-tight text-paper sm:text-6xl">
            {profile.name}
          </p>
          <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-signal sm:text-xs">
            {profile.role}
          </p>
        </div>
      </div>

      <button
        ref={skipBtnRef}
        onClick={finishNow}
        className="fixed bottom-6 right-6 z-[110] font-mono text-xs text-mist-2 underline decoration-line underline-offset-4 transition-colors hover:text-paper"
      >
        Skip intro
      </button>
    </>
  );
}
