export function StatusPill({ label }: { label: string }) {
  return (
    <div className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm text-mist">
      <span className="relative flex h-2 w-2">
        <span className="dot-pulse absolute inline-flex h-full w-full rounded-full bg-signal" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
      </span>
      <span className="font-mono text-[0.8rem] tracking-wide">{label}</span>
    </div>
  );
}
