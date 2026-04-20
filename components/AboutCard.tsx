'use client';
import Image from 'next/image';
import { useI18n } from './I18nProvider';

export default function AboutCard() {
  const { t } = useI18n();

  const capabilities = ['PyQt5', 'PostgreSQL', 'SQL Server', 'LISTEN/NOTIFY', 'Packaging MSI', 'CI/CD', 'Next.js', 'Tailwind'];

  const stats = [
    { value: '9+', label: t('years_experience') },
    { value: '20+', label: t('projects_done') },
  ];

  return (
    <section className="container-pro py-10 md:py-14">
      <div className="card p-6 md:p-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Columna izquierda: Sobre mí + botones */}
          <div>
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-2xl ring-2 ring-[var(--accent)]">
                <Image src="/me.jpg" alt="Facundo" fill className="object-cover" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">Facundo</h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Python/PyQt5 • PostgreSQL/SQL Server • Next.js/Tailwind • CI/CD
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-2xl text-neutral-700 dark:text-neutral-300">
              {t('hero_tagline')}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a href="#proyectos" className="rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-medium text-neutral-900">
                {t('cta_projects')}
              </a>
              <a href="/CV_Facundo.pdf" className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800">
                {t('cta_download_cv')}
              </a>
            </div>
          </div>

          {/* Columna derecha: Skills (chips) */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">{t('caps_title')}</h3>
            <div className="flex flex-wrap gap-2">
              {capabilities.map((c) => (
                <span key={c} className="badge">{c}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Métricas */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-neutral-200/70 p-5 text-center dark:border-neutral-800/70">
              <div className="text-2xl font-semibold">{s.value}</div>
              <div className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">{s.label}</div>
            </div>
          ))}
          {/* Extra highlight */}
          <div className="rounded-xl border border-neutral-200/70 p-5 text-center dark:border-neutral-800/70">
            <div className="text-2xl font-semibold">✔</div>
            <div className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">{t('hi_title')}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

