'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useI18n } from '@/components/I18nProvider';
import Section from '@/components/Section';
import ProjectCard from '@/components/ProjectCard';
import KpiStat from '@/components/KpiStat';
import Typewriter from '@/components/Typewriter';

const CORE_STACK: { name: string; tip: string }[] = [
  { name: 'Python',       tip: '3+ años · FastAPI, PyQt5, scripts industriales' },
  { name: 'TypeScript',   tip: '2+ años · Next.js, React, APIs tipadas' },
  { name: 'Next.js',      tip: '2+ años · App Router, SSR, proyectos propios' },
  { name: 'n8n',          tip: '1+ año · Automatizaciones IA self-hosted en producción' },
  { name: 'MCP',          tip: 'Model Context Protocol · integración con Claude' },
  { name: 'OpenAI API',   tip: 'GPT-4o, embeddings, function calling' },
  { name: 'Claude',       tip: 'Anthropic API · claude-sonnet-4-x, tool use' },
  { name: 'pgvector',     tip: 'RAG · búsqueda semántica en PostgreSQL' },
  { name: 'Supabase',     tip: 'Auth, DB, Storage · varios proyectos en producción' },
  { name: 'PostgreSQL',   tip: '3+ años · LISTEN/NOTIFY, funciones, RBAC avanzado' },
  { name: 'Docker',       tip: 'Compose, volúmenes, deploy en Oracle Cloud' },
  { name: 'Oracle Cloud', tip: 'VMs, networking, infraestructura self-hosted' },
  { name: 'Tailwind CSS', tip: '2+ años · diseño utilitario, temas custom' },
  { name: 'FastAPI',      tip: 'APIs REST, async, microservicios geolocalización' },
  { name: 'React',        tip: 'Hooks, estado global, componentes reutilizables' },
  { name: 'GitHub',       tip: 'Git flow, repos privados y públicos' },
];

const SKILL_GROUPS = [
  {
    titleKey: 'skills_desktop_title',
    items: [
      'skills_desktop_item1',
      'skills_desktop_item2',
      'skills_desktop_item3',
      'skills_desktop_item4',
      'skills_desktop_item5',
    ],
  },
  {
    titleKey: 'skills_backend_title',
    items: [
      'skills_backend_item1',
      'skills_backend_item2',
      'skills_backend_item3',
      'skills_backend_item4',
      'skills_backend_item5',
    ],
  },
  {
    titleKey: 'skills_web_title',
    items: [
      'skills_web_item1',
      'skills_web_item2',
      'skills_web_item3',
      'skills_web_item4',
      'skills_web_item5',
    ],
  },
  {
    titleKey: 'skills_devops_title',
    items: [
      'skills_devops_item1',
      'skills_devops_item2',
      'skills_devops_item3',
      'skills_devops_item4',
      'skills_devops_item5',
    ],
  },
  {
    titleKey: 'skills_realtime_title',
    items: [
      'skills_realtime_item1',
      'skills_realtime_item2',
      'skills_realtime_item3',
      'skills_realtime_item4',
      'skills_realtime_item5',
    ],
  },
  {
    titleKey: 'skills_industrial_title',
    items: [
      'skills_industrial_item1',
      'skills_industrial_item2',
      'skills_industrial_item3',
      'skills_industrial_item4',
      'skills_industrial_item5',
    ],
  },
];

type ProjectFilter = 'all' | 'ai' | 'web' | 'data' | 'industrial';

type ShowcaseProject = {
  id: number;
  href: string;
  title: string;
  subtitle: string;
  impact: string[];
  tech: string[];
  tags: Exclude<ProjectFilter, 'all'>[];
  featured?: boolean;
  nda?: boolean;
  codeUrl?: string;
};

export default function Page() {
  const { t, lang } = useI18n();
  const [showMore, setShowMore] = useState(true);

  const yearsExperience = useMemo(() => {
    const start = new Date(2023, 6, 1);
    const now = new Date();
    const diffYears =
      (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    if (diffYears < 1) return '<1';
    return `${Math.floor(diffYears)}+`;
  }, []);

  const allProjects = useMemo<ShowcaseProject[]>(
    () => [
      // — Proyectos principales (4) —
      {
        id: 1,
        href: '/projects/1',
        title: t('proj_1_title'),
        subtitle: t('proj_1_subtitle'),
        impact: [t('proj_1_impact1'), t('proj_1_impact2'), t('proj_1_impact3')],
        tech: ['n8n', 'OpenAI API', 'Gemini 2.0', 'Docker', 'Oracle Cloud', 'Telegram Bot'],
        tags: ['ai'],
        featured: true,
      },
      {
        id: 3,
        href: '/projects/3',
        title: t('proj_app_title'),
        subtitle: t('proj_app_subtitle'),
        impact: [t('proj_app_impact1'), t('proj_app_impact2'), t('proj_app_impact3')],
        tech: ['Python', 'PyQt5', 'PostgreSQL', 'LISTEN/NOTIFY', 'Tailscale', 'PyInstaller'],
        tags: ['data'],
        featured: true,
        nda: true,
      },
      {
        id: 5,
        href: '/projects/5',
        title: t('proj_1db_title'),
        subtitle: t('proj_1db_subtitle'),
        impact: [t('proj_1db_impact1'), t('proj_1db_impact2'), t('proj_1db_impact3')],
        tech: ['Python', 'PyQt5', 'Supabase', 'FastAPI', 'Docker', 'PostgreSQL'],
        tags: ['data'],
        featured: true,
        nda: true,
      },
      // — Background técnico (4) —
      {
        id: 9,
        href: '/projects/9',
        title: t('proj_base_title'),
        subtitle: t('proj_base_subtitle'),
        impact: [t('proj_base_impact1'), t('proj_base_impact2'), t('proj_base_impact3')],
        tech: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'JWT', 'RBAC'],
        tags: ['data'],
        featured: true,
        codeUrl: 'https://github.com/Facuremmer/python-saas-base',
      },
    ],
    [t]
  );

  const mainProjects = useMemo(() => allProjects.filter((p) => p.featured), [allProjects]);
  const backgroundProjects = useMemo(() => allProjects.filter((p) => !p.featured), [allProjects]);

  return (
    <main className="container-pro space-y-4 pb-8">
      <section id="about" className="card hero-bg noise reveal relative overflow-hidden p-6 md:p-10">
        <div className="grid gap-8 md:grid-cols-[1.2fr,0.8fr] md:items-start">
          <div>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[color:var(--text)] md:text-6xl">
              Facundo Remmer
            </h1>
            <p className="mt-4 max-w-2xl text-base font-medium text-[color:var(--accent)] md:text-lg font-mono">
              <Typewriter
                phrases={
                  lang === 'es'
                    ? ['AI Engineer', 'Automatización con IA', 'Full Stack Developer', 'Software Industrial → IA']
                    : ['AI Engineer', 'AI Automation Builder', 'Full Stack Developer', 'Industrial Software → AI']
                }
              />
            </p>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[color:var(--muted)] md:text-base">
              {t('hero_subheadline_detail')}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <a href="#proyectos" className="btn-primary">
                {t('cta_view_projects') ?? 'Ver proyectos'}
              </a>
              <a href="#contacto" className="btn-ghost">
                {t('nav_contact') ?? 'Contacto'}
              </a>
              <a
                href="https://github.com/Facuremmer/portfolio-publico"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                {lang === 'en' ? 'View portfolio source' : 'Ver código de este portfolio'}
              </a>
            </div>

            <div className="mt-6 max-w-3xl rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-soft)] p-4">
              <p className="text-sm leading-relaxed text-[color:var(--muted)]">
                {t('hero_tagline') ??
                  'Del mundo industrial al stack moderno de IA, construyendo software en producción de forma constante.'}
              </p>
              <button
                type="button"
                onClick={() => setShowMore((prev) => !prev)}
                className="mt-2 text-sm font-semibold text-[color:var(--accent)] hover:underline"
              >
                {showMore
                  ? t('hero_read_less') ?? 'Ver menos'
                  : t('hero_read_more') ?? 'Ver historia completa'}
              </button>
              {showMore && (
                <p className="mt-3 border-l-2 border-[color:var(--accent)] pl-3 text-sm leading-relaxed text-[color:var(--muted)] whitespace-pre-line">
                  {t('about_long')}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="card overflow-hidden p-0">
              <div className="relative h-[320px] w-full bg-[color:var(--surface-soft)]">
                <Image
                  src="/FotoCV.png"
                  alt="Facundo Remmer"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 360px"
                  priority
                />
              </div>
              <div className="border-t border-[color:var(--line)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--muted)]">{lang === 'es' ? 'Ubicación' : 'Location'}</p>
                <p className="mt-1 text-sm text-[color:var(--text)]">{lang === 'es' ? 'Concepción del Uruguay, Entre Ríos, Argentina · Remoto' : 'Concepción del Uruguay, Entre Ríos, Argentina · Remote'}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <KpiStat value={yearsExperience} label={t('kpi_years') ?? 'Años exp.'} />
              <KpiStat value="6+" label={t('kpi_projects') ?? 'Proyectos'} />
              <KpiStat value="15+" label={t('kpi_highlights') ?? 'Tecnologías'} />
              <div className="flex flex-col items-center justify-center rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-soft)] p-3 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[color:var(--muted)]">
                  {lang === 'es' ? 'Inglés' : 'English'}
                </p>
                <p className="mt-1 text-sm font-semibold text-[color:var(--text)]">A2 – B1</p>
                <p className="mt-0.5 text-[11px] leading-tight text-[color:var(--muted)]">
                  {lang === 'es' ? 'Lectura / escritura · conversación en progreso' : 'Reading / writing · speaking in progress'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="card reveal reveal-delay-1 p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="section-label">{lang === 'es' ? 'IA aplicada' : 'Applied AI'}</p>
            <h2 className="mt-1 text-2xl font-semibold text-[color:var(--text)]">
              {lang === 'es' ? '¿Querés saber más sobre mí?' : 'Want to know more about me?'}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">
              {lang === 'es'
                ? 'Preguntale al chat — está entrenado con mi experiencia, proyectos y stack. Responde en segundos. (Construido con n8n + RAG + pgvector)'
                : 'Ask the chatbot — it\'s trained on my experience, projects and stack. Responds in seconds. (Built with n8n + RAG + pgvector)'}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-[color:var(--muted)] opacity-70">
              {lang === 'es'
                ? 'Estado: chat productivo en ejecución (orquestado con n8n). Demo técnica en este sitio para exponer el pipeline RAG. Alcance: demo sin auth ni caché — en producción: rate limiting distribuido, API keys por cliente, caché de embeddings y métricas.'
                : 'Status: production chatbot running (n8n-orchestrated). Interactive demo here to showcase the RAG pipeline. Scope: demo without auth or caching — in production: distributed rate limiting, per-client API keys, embedding cache and metrics.'}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row md:flex-col">
            <Link href="/chatbot" className="btn-ghost text-center">
              {lang === 'es' ? 'Ver arquitectura técnica' : 'View technical architecture'}
            </Link>
          </div>
        </div>
      </section>

      <section className="card reveal reveal-delay-1 p-6 md:p-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-[color:var(--line)] pb-4">
          <div>
            <p className="section-label">{lang === 'es' ? 'Recorrido' : 'Career path'}</p>
            <h2 className="mt-1 text-2xl font-semibold text-[color:var(--text)]">{lang === 'es' ? 'De software industrial a IA' : 'From industrial software to AI'}</h2>
          </div>
          <p className="text-sm text-[color:var(--muted)]">{lang === 'es' ? 'Experiencia acumulada en industria, datos e IA' : 'Accumulated experience in industry, data and AI'}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {(lang === 'es' ? [
            {
              step: '01',
              title: 'Software industrial',
              detail: 'PLCs, SCADA. SQL Server y PostgreSQL.',
            },
            {
              step: '02',
              title: 'Desktop engineering',
              detail: 'Aplicaciones PyQt5 con arquitectura robusta y tiempo real.',
            },
            {
              step: '03',
              title: 'Web full stack',
              detail: 'Next.js, TypeScript y Supabase. Aplicaciones en producción.',
            },
            {
              step: '04',
              title: 'AI & automatización',
              detail: 'n8n self-hosted, agentes LLM y bases vectoriales.',
            },
          ] : [
            {
              step: '01',
              title: 'Industrial software',
              detail: 'PLCs, SCADA. SQL Server and PostgreSQL.',
            },
            {
              step: '02',
              title: 'Desktop engineering',
              detail: 'PyQt5 apps with robust architecture and real-time data.',
            },
            {
              step: '03',
              title: 'Web full stack',
              detail: 'Next.js, TypeScript and Supabase. Apps in production.',
            },
            {
              step: '04',
              title: 'AI & automation',
              detail: 'Self-hosted n8n, LLM agents and vector databases.',
            },
          ]).map((item) => (
            <article key={item.step} className="rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-soft)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[color:var(--muted)]">{item.step}</p>
              <h3 className="mt-2 text-sm font-semibold text-[color:var(--text)]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <Section
        id="skills"
        title={t('section_skills_title')}
        subtitle={t('section_skills_subtitle')}
        className="reveal reveal-delay-2"
      >
        <div className="space-y-6">
          <div className="card px-5 py-5">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-[color:var(--muted)]">
              {t('skills_core_intro')}
            </p>
            <div className="flex flex-wrap gap-2">
              {CORE_STACK.map((s) => (
                <span key={s.name} className="badge badge-skill">
                  {s.name}
                  <span className="skill-tip">{s.tip}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {SKILL_GROUPS.map((group) => (
              <div key={group.titleKey} className="card p-5">
                <h3 className="text-base font-semibold text-[color:var(--text)]">{t(group.titleKey)}</h3>
                <ul className="mt-3 space-y-2">
                  {group.items.map((itemKey) => (
                    <li key={itemKey} className="flex gap-2 text-sm leading-relaxed text-[color:var(--muted)]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                      <span>{t(itemKey)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="proyectos"
        title={t('projects_title') ?? 'Proyectos'}
        subtitle={lang === 'es' ? 'Selección de trabajo real: industria, web y IA.' : 'Selection of real work: industry, web and AI.'}
        className="reveal reveal-delay-2"
      >
        {/* Grid 2×2 — proyectos principales */}
        <div className="grid gap-4 md:grid-cols-2">
          {mainProjects.map((project, index) =>
            project.codeUrl ? (
              <div
                key={project.id}
                className="reveal"
                style={{ animationDelay: `${60 + index * 50}ms` }}
              >
                <ProjectCard
                  title={project.title}
                  subtitle={project.subtitle}
                  impact={project.impact}
                  tech={project.tech}
                  featuredTag={project.nda ? 'Flagship · NDA' : 'Flagship'}
                  detailUrl={project.href}
                  codeUrl={project.codeUrl}
                />
              </div>
            ) : (
              <Link
                key={project.id}
                href={project.href}
                className="block reveal"
                style={{ animationDelay: `${60 + index * 50}ms` }}
              >
                <ProjectCard
                  title={project.title}
                  subtitle={project.subtitle}
                  impact={project.impact}
                  tech={project.tech}
                  featuredTag={project.nda ? 'Flagship · NDA' : 'Flagship'}
                />
              </Link>
            )
          )}
        </div>

      </Section>

      <Section id="contacto" title={t('nav_contact') ?? 'Contact'} label="" subtitle="" className="reveal reveal-delay-3">
        <div className="card p-6 md:p-8">
          <div className="grid gap-2 sm:grid-cols-3">
            <ContactRow label="Email" value="facundoremmer0@gmail.com" href="mailto:facundoremmer0@gmail.com" />
            <ContactRow label="LinkedIn" value="linkedin.com/in/remmer-facundo" href="https://www.linkedin.com/in/remmer-facundo" />
            <ContactRow label="GitHub" value="github.com/Facuremmer" href="https://github.com/Facuremmer" />
          </div>
        </div>
      </Section>
    </main>
  );
}

function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className="flex items-center justify-between gap-3 rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-soft)] px-3 py-2 transition hover:border-[color:var(--accent)]"
    >
      <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[color:var(--muted)]">{label}</span>
      <span className="max-w-[70%] break-all text-right text-sm text-[color:var(--text)]">{value}</span>
    </a>
  );
}
