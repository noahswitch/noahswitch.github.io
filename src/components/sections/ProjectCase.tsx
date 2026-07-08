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
  const reverse = index % 2 === 1;

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
      <Reveal className={reverse ? "lg:order-2" : ""}>
        <div className="mx-auto w-full max-w-[280px] lg:max-w-none">
          <ProjectVisual id={project.id} label={`${project.title.toLowerCase().replace(/\s+/g, "-")}`} icon={Icon} from={from} to={to} />
        </div>
      </Reveal>

      <Reveal className={reverse ? "lg:order-1" : ""}>
        <span className="font-mono text-xs text-mist-2">
          {String(index + 1).padStart(2, "0")} / {project.badge} · {project.year}
        </span>
        <h3 className="font-display mt-3 text-3xl font-medium tracking-tight text-paper sm:text-4xl">
          {project.title}
        </h3>

        <div className="mt-6 space-y-5">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-signal">The problem</p>
            <p className="mt-1.5 text-mist leading-relaxed">{project.problem}</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-signal">My solution</p>
            <p className="mt-1.5 text-mist leading-relaxed">{project.solution}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="glass rounded-full px-3 py-1 font-mono text-xs text-mist">
              {t}
            </span>
          ))}
        </div>

        <ul className="mt-5 space-y-2">
          {project.results.map((r) => (
            <li key={r} className="flex items-start gap-2.5 text-sm text-mist">
              <Check size={15} className="mt-0.5 shrink-0 text-teal" />
              {r}
            </li>
          ))}
        </ul>

        <p className="mt-5 border-l-2 border-line-strong pl-4 text-sm italic leading-relaxed text-mist-2">
          {project.lessons}
        </p>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-paper underline decoration-line underline-offset-4 hover:decoration-signal"
          >
            {project.linkLabel ?? "View project"} <ArrowRight size={14} />
          </a>
        )}
      </Reveal>
    </div>
  );
}
