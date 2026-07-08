import { Box, Brain, ShoppingCart, ArrowRight, Check } from "lucide-react";
import { Project } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectVisual } from "./ProjectVisual";

const projectIcons = { "stock-management": Box, "nlp-sentiment": Brain, urboutik: ShoppingCart };
const projectAccents: Record<string, [string, string]> = {
  "stock-management": ["#e8aa4c", "#d78d2e"],
  "nlp-sentiment": ["#6a63f6", "#4b46b8"],
  urboutik: ["#52d1c4", "#35a99d"],
};

export function ProjectCase({ project, index }: { project: Project; index: number }) {
  const Icon = projectIcons[project.id as keyof typeof projectIcons] ?? Box;
  const [from, to] = projectAccents[project.id] ?? ["#e8aa4c", "#d78d2e"];

  return (
    <Reveal className="h-full">
      <article className="glass flex h-full flex-col rounded-3xl p-6">
        <ProjectVisual
          id={project.id}
          label={`${project.title.toLowerCase().replace(/\s+/g, "-")}`}
          icon={Icon}
          from={from}
          to={to}
        />

        <span className="mt-5 font-mono text-xs text-mist-2">
          {String(index + 1).padStart(2, "0")} / {project.badge} · {project.year}
        </span>
        <h3 className="font-display mt-2 text-xl font-medium tracking-tight text-paper">
          {project.title}
        </h3>

        <div className="mt-4 space-y-3">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-signal">
              The problem
            </p>
            <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-mist">{project.problem}</p>
          </div>
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-signal">
              My solution
            </p>
            <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-mist">{project.solution}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="glass rounded-full px-2.5 py-1 font-mono text-[0.65rem] text-mist">
              {t}
            </span>
          ))}
        </div>

        <ul className="mt-4 space-y-1.5">
          {project.results.map((r) => (
            <li key={r} className="flex items-start gap-2 text-xs text-mist">
              <Check size={13} className="mt-0.5 shrink-0 text-teal" />
              <span className="line-clamp-2">{r}</span>
            </li>
          ))}
        </ul>

        <p className="mt-4 line-clamp-2 border-l-2 border-line-strong pl-3 text-xs italic leading-relaxed text-mist-2">
          {project.lessons}
        </p>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-5 inline-flex items-center gap-2 font-mono text-sm text-paper underline decoration-line underline-offset-4 hover:decoration-signal"
          >
            {project.linkLabel ?? "View project"} <ArrowRight size={14} />
          </a>
        )}
      </article>
    </Reveal>
  );
}
