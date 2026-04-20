export default function KpiStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card px-4 py-4 text-center">
      <div className="text-2xl font-semibold tracking-tight text-[color:var(--text)] md:text-3xl">{value}</div>
      <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--muted)]">{label}</div>
    </div>
  );
}
