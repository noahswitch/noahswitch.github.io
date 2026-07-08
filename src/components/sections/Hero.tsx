"use client";

import dynamic from "next/dynamic";
import { ArrowRight, Github, Linkedin, Send, GraduationCap, Rss } from "lucide-react";
import { useLenis } from "lenis/react";
import { profile, links } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { StatusPill } from "@/components/ui/StatusPill";
import { Magnetic } from "@/components/ui/Magnetic";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const socials = [
  { href: links.github, label: "GitHub", icon: Github },
  { href: links.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: links.researchgate, label: "ResearchGate", icon: GraduationCap },
  { href: links.telegram, label: "Telegram", icon: Send },
  { href: links.blog, label: "Blog", icon: Rss },
];

export function Hero() {
  const reduced = useReducedMotion();
  const lenis = useLenis();

  function scrollToProjects(event: React.MouseEvent) {
    event.preventDefault();
    const target = document.querySelector("#projects");
    if (!target) return;
    if (lenis) lenis.scrollTo(target as HTMLElement, { offset: -84 });
    else target.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-24"
    >
      <div className="absolute inset-0">
        {!reduced && <HeroScene />}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(232,170,76,0.05), transparent 60%), linear-gradient(180deg, transparent 0%, var(--color-ink) 92%)",
          }}
        />
      </div>

      <div className="wrap relative z-10">
        <Reveal stagger={0.12} y={22} className="max-w-3xl">
          <StatusPill label={profile.statusLine} />

          <p className="font-mono mt-8 text-sm uppercase tracking-[0.18em] text-mist">
            {profile.role}
          </p>

          <h1
            id="hero-heading"
            className="font-display mt-4 text-6xl font-medium leading-[0.98] tracking-tight text-paper sm:text-7xl md:text-8xl"
          >
            {profile.name}
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-mist sm:text-xl">
            {profile.oneLiner}{" "}
            <span className="text-mist-2">
              5+ years of enterprise infrastructure, cloud architecture, and applied AI research,
              based in <span className="text-paper">{profile.location}</span>.
            </span>
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {profile.heroTags.map((tag) => (
              <span
                key={tag}
                className="glass rounded-full px-3 py-1 font-mono text-xs text-mist"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#projects"
                onClick={scrollToProjects}
                className="group inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3.5 text-sm font-medium text-ink transition-transform"
              >
                View Projects
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
          </div>

          <div className="mt-9 flex items-center gap-1.5">
            {socials.map(({ href, label, icon: Icon }) => (
              <Magnetic key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-mist transition-colors hover:text-paper"
                >
                  <Icon size={17} />
                </a>
              </Magnetic>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
        <div className="flex flex-col items-center gap-2 text-mist-2">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
          <span className="h-8 w-px bg-gradient-to-b from-mist-2 to-transparent" />
        </div>
      </div>
    </section>
  );
}
