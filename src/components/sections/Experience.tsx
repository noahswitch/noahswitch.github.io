"use client";

import { useRef } from "react";
import { Building2, Calendar, MapPin, Trophy, FileText } from "lucide-react";
import { experience, education, honor } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reduced || !railRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        railRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 75%",
            scrub: 0.6,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="experience" className="section-pad" aria-labelledby="experience-heading-x">
      <div className="wrap">
        <SectionHeading index="06" label="EXPERIENCE" title="Career & education" />

        <div className="mt-14 grid gap-16 lg:grid-cols-[1fr_360px]">
          <div ref={containerRef} className="relative pl-9">
            <div className="absolute left-[7px] top-1.5 bottom-1.5 w-px bg-line-strong" />
            <div
              ref={railRef}
              className="absolute left-[7px] top-1.5 bottom-1.5 w-px origin-top bg-signal"
            />

            <div className="space-y-12">
              {experience.map((item) => (
                <Reveal key={item.role} y={16}>
                  <div className="relative">
                    <span className="absolute -left-9 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-signal bg-ink" />
                    <h3 className="font-display text-xl font-medium text-paper">{item.role}</h3>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-mist-2">
                      <span className="flex items-center gap-1.5">
                        <Building2 size={12} /> {item.org}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} /> {item.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={12} /> {item.location}
                      </span>
                    </div>
                    <p className="mt-3 max-w-xl text-mist leading-relaxed">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Reveal>
              <h3 className="font-mono text-xs uppercase tracking-widest text-mist">Education</h3>
            </Reveal>
            {education.map((edu) => (
              <Reveal key={edu.degree}>
                <div className="glass rounded-2xl p-6">
                  <h4 className="font-display text-lg font-medium text-paper">{edu.degree}</h4>
                  <p className="mt-1 text-sm text-mist-2">{edu.school}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="font-mono text-xs text-mist-2">{edu.period}</span>
                    <span className="glass rounded-full px-2.5 py-0.5 font-mono text-[0.65rem] text-teal">
                      {edu.grade}
                    </span>
                  </div>
                  {edu.note && (
                    <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-mist-2">
                      <FileText size={13} className="mt-0.5 shrink-0" />
                      {edu.note}
                    </p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {edu.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[0.65rem] text-mist-2">
                        #{tag.toLowerCase().replace(/\s+/g, "-")}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal>
              <div className="glass flex gap-3 rounded-2xl p-6">
                <Trophy size={18} className="mt-0.5 shrink-0 text-signal" />
                <div>
                  <p className="text-sm font-medium text-paper">{honor.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-mist-2">{honor.body}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
