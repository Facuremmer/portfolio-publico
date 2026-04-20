import type { ReactNode } from 'react';

type Metric = {
  value: string;
  label: string;
};

type StoryBlock = {
  title: string;
  intro: string;
  bullets: string[];
};

type Props = {
  badges: string[];
  title: string;
  summary: string;
  metrics: Metric[];
  problem: StoryBlock;
  decision: StoryBlock;
  results: {
    title: string;
    bullets: string[];
  };
  actions?: ReactNode;
};

export default function CaseOverview({
  badges,
  title,
  summary,
  metrics,
  problem,
  decision,
  results,
  actions,
}: Props) {
  return (
    <>
      <section className="card space-y-6 p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-2">
          {badges.map((badge) => (
            <span key={badge} className="badge">
              {badge}
            </span>
          ))}
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--text)] md:text-4xl">{title}</h1>
          <p className="max-w-3xl text-base leading-relaxed text-[color:var(--muted)] md:text-lg">{summary}</p>
        </div>

        {actions && <div>{actions}</div>}

        <div className="grid gap-3 sm:grid-cols-3">
          {metrics.map((metric) => (
            <div key={`${metric.value}-${metric.label}`} className="rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-soft)] p-4">
              <p className="text-lg font-semibold tracking-tight text-[color:var(--text)]">{metric.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-[color:var(--muted)]">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <article className="card h-full space-y-3 p-6">
          <h2 className="text-xl font-semibold tracking-tight text-[color:var(--text)]">{problem.title}</h2>
          <p className="text-sm leading-relaxed text-[color:var(--muted)]">{problem.intro}</p>
          <ul className="list-disc space-y-2 pl-5 text-sm text-[color:var(--text)]">
            {problem.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="card h-full space-y-3 border-l-2 border-l-[color:var(--accent)] p-6">
          <h2 className="text-xl font-semibold tracking-tight text-[color:var(--text)]">{decision.title}</h2>
          <p className="text-sm leading-relaxed text-[color:var(--muted)]">{decision.intro}</p>
          <ul className="list-disc space-y-2 pl-5 text-sm text-[color:var(--text)]">
            {decision.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="card h-full space-y-3 p-6">
          <h2 className="text-xl font-semibold tracking-tight text-[color:var(--text)]">{results.title}</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-[color:var(--text)]">
            {results.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>
    </>
  );
}
