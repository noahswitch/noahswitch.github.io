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
    <Reveal className="h-full">
      <article className="glass flex h-full flex-col rounded-3xl p-6">
        {figure && (
          <div className="-mx-6 -mt-6 mb-5 overflow-hidden rounded-t-3xl border-b border-line">
            <Image
              src={figure.src}
              alt={figure.alt}
              width={figure.width}
              height={figure.height}
              className="aspect-video h-auto w-full object-cover"
            />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
            style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
          >
            <Icon size={16} className="text-ink" />
          </div>
          <span className="font-mono text-xs text-mist-2">
            {paper.venue} · {paper.year}
          </span>
        </div>

        <h3 className="font-display mt-4 text-xl font-medium tracking-tight text-paper">
          {paper.title}
        </h3>
        <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-mist">{paper.summary}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {paper.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="glass rounded-full px-2.5 py-1 font-mono text-[0.65rem] text-mist">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 space-y-1.5">
          {paper.results.map((r) => (
            <div
              key={r}
              className="rounded-lg border border-line px-3 py-2 font-mono text-[0.7rem] leading-relaxed text-mist-2"
            >
              {r}
            </div>
          ))}
        </div>

        <a
          href={paper.link}
          className="mt-5 inline-flex items-center gap-2 font-mono text-sm text-paper underline decoration-line underline-offset-4 hover:decoration-signal"
        >
          View paper &amp; results <ArrowRight size={14} />
        </a>
      </article>
    </Reveal>
  );
}
