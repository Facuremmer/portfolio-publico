'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useI18n } from '@/components/I18nProvider';
import CaseOverview from '@/components/CaseOverview';

const VERTICALS = [
  {
    id: '01',
    name: 'Content Generation',
    desc: 'LLM genera post ES/EN → draft a Telegram → aprobación → publish LinkedIn.',
    tags: ['OpenAI', 'Gemini', 'LinkedIn API'],
  },
  {
    id: '02',
    name: 'Blog Bilingüe',
    desc: 'Google Trends → research → redacción LLM → SEO → imagen DALL-E → publicación automática ES/EN.',
    tags: ['OpenAI', 'Gemini', 'DALL-E 3'],
  },
  {
    id: '03',
    name: 'Chatbot RAG',
    desc: 'Webhook → AI Agent con memoria de sesión → búsqueda en base vectorial (pgvector) → respuesta contextual.',
    tags: ['OpenAI', 'Supabase', 'pgvector'],
  },
  {
    id: '04',
    name: 'Social Publishing',
    desc: 'Scheduler de publicaciones multicanal (LinkedIn, Instagram) con aprobación previa por Telegram.',
    tags: ['Meta Graph API', 'LinkedIn API', 'Telegram Bot'],
  },
];

const WORKFLOWS = [
  {
    src: '/captures/n8n_hub_overview.png',
    alt: 'Hub principal de contenido',
    title: 'Hub principal de contenido',
    desc: 'Vista general del hub: búsqueda de trends y noticias, generación de post con IA, subida de imagen a Drive y envío a aprobación por Telegram. Múltiples sub-workflows conectados en un solo canvas.',
  },
  {
    src: '/captures/n8n_blog_pipeline.png',
    alt: 'Pipeline de blog automático',
    title: 'Pipeline de blog — 9 pasos',
    desc: 'De Google Trends al post publicado: descubrir tendencias → elegir tema SEO → research → redacción → optimización con links internos → generación de imagen → traducción ES/EN → publicación y post en LinkedIn.',
  },
  {
    src: '/captures/n8n_linkedin_approval.png',
    alt: 'Flujo de aprobación LinkedIn',
    title: 'Aprobación humana — LinkedIn',
    desc: 'Human-in-the-loop implementado sobre Telegram: el agente envía el borrador, el operador aprueba o edita, y el sistema ramifica el flujo según el tipo de publicación (con imagen, traducido, edición manual). Sin aprobación no se publica.',
  },
  {
    src: '/captures/n8n_rag_chatbot.png',
    alt: 'Workflow del chatbot RAG',
    title: 'Chatbot RAG — Workflow n8n',
    desc: 'Webhook → AI Agent con Window Buffer Memory (contexto de sesión) → Vector Store Tool sobre Supabase pgvector → respuesta. El agente busca en la base de conocimiento antes de responder, lo que elimina alucinaciones sobre el contexto propio.',
  },
];

export default function N8NHubPage() {
  const { t } = useI18n();
  const tr = (k: string) => t(`proj_n8n_${k}`);
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);

  return (
    <main className="container-pro space-y-10 pb-16 pt-10">
      <CaseOverview
        badges={['n8n', 'OpenAI', 'Gemini', 'Claude', 'Docker', 'Oracle Cloud']}
        title={tr('title')}
        summary={tr('summary')}
        metrics={[
          { value: '4', label: 'Verticales activos' },
          { value: 'Human-in-loop', label: 'Aprobación por Telegram' },
          { value: 'Self-hosted', label: 'Infra propia, sin límites' },
        ]}
        problem={{
          title: tr('problem_title'),
          intro: tr('problem_intro'),
          bullets: [tr('problem_1'), tr('problem_2'), tr('problem_3')],
        }}
        decision={{
          title: 'Decisión técnica',
          intro: tr('solution_intro'),
          bullets: [tr('solution_1'), tr('solution_2')],
        }}
        results={{
          title: 'Resultados',
          bullets: [tr('solution_3'), tr('solution_4')],
        }}
      />

      {/* Verticales */}
      <section className="space-y-6">
        <div>
          <p className="section-label">Arquitectura</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[color:var(--text)]">
            Verticales activos
          </h2>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            Cada vertical es un workflow independiente con su propio trigger, lógica y canal de output.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {VERTICALS.map((v) => (
            <div key={v.id} className="card p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:var(--muted)]">
                {v.id}
              </p>
              <h3 className="mt-1 text-sm font-semibold text-[color:var(--text)]">{v.name}</h3>
              <p className="mt-1 text-xs leading-relaxed text-[color:var(--muted)]">{v.desc}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {v.tags.map((tag) => (
                  <span key={tag} className="badge">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Workflows — capturas reales */}
      <section className="space-y-6">
        <div>
          <p className="section-label">Workflows en producción</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[color:var(--text)]">
            Capturas de los flujos reales
          </h2>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            Todos corren en la instancia self-hosted. Ningún dato sensible visible.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {WORKFLOWS.map((wf) => (
            <div key={wf.src} className="card overflow-hidden p-0">
              <button
                type="button"
                className="relative block h-48 w-full cursor-zoom-in bg-[color:var(--surface-soft)]"
                onClick={() => setLightbox({ src: wf.src, title: wf.title })}
                aria-label={`Ampliar: ${wf.title}`}
              >
                <Image
                  src={wf.src}
                  alt={wf.alt}
                  fill
                  className="object-cover object-top transition-opacity hover:opacity-90"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span className="absolute bottom-2 right-2 rounded-md bg-black/50 px-2 py-0.5 text-[10px] text-white">
                  click para ampliar
                </span>
              </button>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-[color:var(--text)]">{wf.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-[color:var(--muted)]">{wf.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Infra */}
      <section className="card p-6 md:p-8 space-y-4">
        <h2 className="text-xl font-semibold text-[color:var(--text)]">Infraestructura</h2>
        <pre className="overflow-x-auto rounded-lg bg-[#0a1120] p-4 text-xs leading-relaxed text-[#dce9ff] sm:text-sm">
{`Oracle Cloud (Always Free)
  └── VM ARM (4 vCPU / 24 GB RAM)
       ├── Docker Compose
       │    ├── n8n          # Automation engine
       │    ├── PostgreSQL   # n8n state + workflow DB
       │    └── Caddy        # Reverse proxy + SSL automático
       └── Cloudflare DNS   # Dominio + DDoS protection

Modelos activos:
  ├── OpenAI API   — contenido y embeddings
  ├── Gemini Flash — volumen y velocidad
  ├── Claude       — razonamiento complejo
  └── DALL-E 3     — generación de imágenes

Integraciones:
  ├── Telegram Bot API  — human-in-loop approval
  ├── LinkedIn API      — publicación social
  ├── Meta Graph API    — Instagram
  └── Google Workspace  — Sheets, Gmail, Drive`}
        </pre>
      </section>

      <div className="border-t border-[color:var(--line)] pt-8">
        <Link href="/#proyectos" className="btn-ghost inline-flex items-center gap-2">
          ← {tr('back')}
        </Link>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-h-[90vh] max-w-[95vw]" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute -right-3 -top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white text-black shadow-lg text-sm font-bold"
              aria-label="Cerrar"
            >
              ✕
            </button>
            <Image
              src={lightbox.src}
              alt={lightbox.title}
              width={1400}
              height={800}
              className="rounded-xl object-contain shadow-2xl"
              style={{ maxHeight: '88vh', width: 'auto' }}
            />
            <p className="mt-2 text-center text-xs text-white/70">{lightbox.title}</p>
          </div>
        </div>
      )}
    </main>
  );
}
