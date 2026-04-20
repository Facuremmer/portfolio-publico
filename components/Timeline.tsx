type Item = { period: string; role: string; detail: string };
export default function Timeline({ items }: { items: Item[] }) {
  return (
    <ol className="relative ml-2 border-l border-neutral-200 dark:border-neutral-800">
      {items.map((it, i) => (
        <li key={i} className="mb-6 ml-4">
          <span className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full bg-[var(--accent)]" />
          <h4 className="text-sm font-semibold">{it.period} — {it.role}</h4>
          <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">{it.detail}</p>
        </li>
      ))}
    </ol>
  );
}
