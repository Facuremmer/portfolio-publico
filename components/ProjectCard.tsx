'use client';

import Link from 'next/link';

function hashIndex(str: string, max: number) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) h = (h * 31 + str.charCodeAt(i)) & 0xffff;
  return h % max;
}

const TONES = ['AI Systems', 'Automation', 'Full Stack', 'Data', 'Architecture', 'Infra'];

export default function ProjectCard({
  title,
  subtitle,
  impact,
  tech,
  featuredTag,
  detailUrl,
  codeUrl,
}: {
  cover?: string;
  title: string;
  subtitle: string;
  impact: string[];
  tech: string[];
  featuredTag?: string;
  detailUrl?: string;
  codeUrl?: string;
}) {
  const tone = TONES[hashIndex(title, TONES.length)];

  return (
    <article className="card card-hover flex h-full flex-col overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-[color:var(--line)] bg-[color:var(--surface-soft)] px-5 py-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--muted)]">{tone}</span>
        {featuredTag ? (
          <span className="rounded-full border border-[color:var(--accent)] bg-[color:var(--accent-soft)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[color:var(--accent)]">
            {featuredTag}
          </span>
        ) : (
          <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[color:var(--muted)]">{tech.length} tech</span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold leading-tight text-[color:var(--text)]">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">{subtitle}</p>

        <ul className="mt-4 flex-1 space-y-2">
          {impact.slice(0, 3).map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-relaxed text-[color:var(--text)]">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {tech.slice(0, 6).map((item) => (
            <span key={item} className="badge">
              {item}
            </span>
          ))}
        </div>

        {codeUrl ? (
          <div className="mt-5 flex gap-3">
            {detailUrl && (
              <Link href={detailUrl} className="text-sm font-semibold text-[color:var(--accent)] hover:underline">
                Ver caso →
              </Link>
            )}
            <a
              href={codeUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-[color:var(--muted)] hover:text-[color:var(--text)] hover:underline"
            >
              Ver código →
            </a>
          </div>
        ) : (
          <div className="mt-5 text-sm font-semibold text-[color:var(--accent)]">Ver caso</div>
        )}
      </div>
    </article>
  );
}
