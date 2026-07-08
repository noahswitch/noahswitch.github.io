import Image from "next/image";
import { ArrowRight, FlaskConical } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { ResearchPaper } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";

const accents: Record<string, [string, string]> = {
  signal: ["#e8aa4c", "#d78d2e"],
  teal: ["#52d1c4", "#35a99d"],
  violet: ["#6a63f6", "#4b46b8"],
};

export function ResearchCard({
  paper,
  icon: Icon = FlaskConical,
  figure,
}: {
  paper: ResearchPaper;
  icon?: LucideIcon;
  figure?: { src: string; width: number; height: number; alt: string };
}) {
  const [from, to] = accents[paper.accent] ?? accents.signal;

  return (
    <Reveal>
      <article
        className={`glass grid gap-8 rounded-3xl p-7 sm:p-9 ${
          figure ? "lg:grid-cols-[1fr_190px]" : ""
        }`}
      >
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
            >
              <Icon size={16} className="text-ink" />
            </div>
            <span className="font-mono text-xs text-mist-2">
              {paper.venue} · {paper.year}
            </span>
          </div>

          <h3 className="font-display mt-4 text-2xl font-medium tracking-tight text-paper sm:text-3xl">
            {paper.title}
          </h3>
          <p className="mt-3 max-w-2xl text-mist leading-relaxed">{paper.summary}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {paper.tags.map((tag) => (
              <span key={tag} className="glass rounded-full px-3 py-1 font-mono text-xs text-mist">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {paper.results.map((r) => (
              <div key={r} className="rounded-xl border border-line px-3.5 py-2.5 text-xs text-mist-2 font-mono leading-relaxed">
                {r}
              </div>
            ))}
          </div>

          <a
            href={paper.link}
            className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-paper underline decoration-line underline-offset-4 hover:decoration-signal"
          >
            View paper &amp; results <ArrowRight size={14} />
          </a>
        </div>

        {figure && (
          <div className="hidden lg:block">
            <div className="glass overflow-hidden rounded-2xl border border-line">
              <Image
                src={figure.src}
                alt={figure.alt}
                width={figure.width}
                height={figure.height}
                className="h-auto w-full"
              />
            </div>
          </div>
        )}
      </article>
    </Reveal>
  );
}
