import { LucideIcon } from "lucide-react";

function seedFrom(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

export function ProjectVisual({
  id,
  label,
  icon: Icon,
  from,
  to,
}: {
  id: string;
  label: string;
  icon: LucideIcon;
  from: string;
  to: string;
}) {
  const seed = seedFrom(id);
  const bars = Array.from({ length: 7 }, (_, i) => 22 + ((seed >> (i * 3)) % 55));

  return (
    <div
      className="glass ambient-blob relative aspect-[4/3] w-full overflow-hidden rounded-3xl [animation-duration:20s]"
      aria-hidden="true"
    >
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-mist-2/40" />
        <span className="h-2 w-2 rounded-full bg-mist-2/40" />
        <span className="h-2 w-2 rounded-full bg-mist-2/40" />
        <span className="ml-2 font-mono text-[0.65rem] text-mist-2">{label}</span>
      </div>

      <div className="relative flex h-[calc(100%-2.5rem)] items-end justify-center gap-2.5 px-8 pb-8 pt-10">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(circle at 50% 20%, ${from}22, transparent 60%)` }}
        />
        <div
          className="absolute left-1/2 top-8 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-2xl"
          style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
        >
          <Icon size={26} className="text-ink" />
        </div>

        {bars.map((h, i) => (
          <div
            key={i}
            className="w-full rounded-t-md"
            style={{
              height: `${h}%`,
              background: `linear-gradient(180deg, ${from}55, ${to}22)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
