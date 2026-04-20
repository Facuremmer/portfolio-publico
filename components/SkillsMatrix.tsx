function Bar({ label, level }: { label: string; level: number }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs">
        <span>{label}</span><span>{level}%</span>
      </div>
      <div className="h-2 rounded bg-neutral-200/70 dark:bg-neutral-800/70">
        <div className="h-2 rounded bg-[var(--accent)]" style={{ width: `${level}%` }} />
      </div>
    </div>
  );
}
export default function SkillsMatrix() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="card p-5">
        <h4 className="text-sm font-semibold mb-3">Frontend</h4>
        <div className="space-y-3">
          <Bar label="TypeScript" level={80} />
          <Bar label="Next.js" level={75} />
          <Bar label="Tailwind" level={85} />
        </div>
      </div>
      <div className="card p-5">
        <h4 className="text-sm font-semibold mb-3">Backend</h4>
        <div className="space-y-3">
          <Bar label="Python (FastAPI)" level={70} />
          <Bar label="Node/Nest" level={55} />
        </div>
      </div>
      <div className="card p-5">
        <h4 className="text-sm font-semibold mb-3">Data/DB</h4>
        <div className="space-y-3">
          <Bar label="PostgreSQL" level={90} />
          <Bar label="SQL Server" level={85} />
          <Bar label="Optimización SQL" level={90} />
        </div>
      </div>
      <div className="card p-5">
        <h4 className="text-sm font-semibold mb-3">DevOps</h4>
        <div className="space-y-3">
          <Bar label="Docker" level={70} />
          <Bar label="CI/CD (GH Actions)" level={75} />
          <Bar label="Packaging (MSI)" level={80} />
        </div>
      </div>
    </div>
  );
}
