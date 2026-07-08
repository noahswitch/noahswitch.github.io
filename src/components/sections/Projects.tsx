import { ArrowUpRight } from "lucide-react";
import { projects, dailyTools } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCase } from "./ProjectCase";

export function Projects() {
  return (
    <section id="projects" className="section-pad" aria-labelledby="projects-heading-x">
      <div className="wrap">
        <SectionHeading
          index="03"
          label="FEATURED WORK"
          title="Projects"
          description="Engineering projects spanning infrastructure automation, machine learning applications, and cloud architecture."
        />

        <div className="mt-16 space-y-24">
          {projects.map((project, i) => (
            <ProjectCase key={project.id} project={project} index={i} />
          ))}
        </div>

        <div className="mt-28">
          <Reveal>
            <h3 className="font-mono text-xs uppercase tracking-widest text-mist">
              Daily tools I&apos;ve built
            </h3>
          </Reveal>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {dailyTools.map((tool) => (
              <Reveal key={tool.id}>
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="glass group flex h-full flex-col rounded-2xl p-6 transition-colors hover:border-signal/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-display text-lg font-medium text-paper">{tool.title}</h4>
                    <ArrowUpRight
                      size={16}
                      className="mt-1 shrink-0 text-mist-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal"
                    />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-mist-2">{tool.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {tool.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[0.65rem] text-mist-2">
                        #{tag.toLowerCase().replace(/\s+/g, "-")}
                      </span>
                    ))}
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
