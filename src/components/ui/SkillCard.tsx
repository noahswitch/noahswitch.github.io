"use client";

import { useState } from "react";

export function SkillCard({ name, blurb }: { name: string; blurb: string }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      aria-expanded={open}
      className="glass group flex max-w-[15rem] flex-col rounded-2xl px-4 py-3 text-left transition-all duration-300 hover:-translate-y-1 hover:border-signal/30"
    >
      <span className="font-mono text-sm text-paper">{name}</span>
      <span
        className={`grid text-xs leading-snug text-mist-2 transition-all duration-300 ease-out ${
          open ? "mt-1.5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
        style={{ display: "grid" }}
      >
        <span className="overflow-hidden">{blurb}</span>
      </span>
    </button>
  );
}
