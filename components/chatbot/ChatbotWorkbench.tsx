'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { useI18n } from '@/components/I18nProvider';
import McpDemo from './McpDemo';

const UI = {
  es: {
    back: 'Volver al portfolio',
    badge: 'Caso Técnico',
    title: 'Chatbot RAG con pipeline de 7 pasos sobre base de conocimiento vectorial',
    subtitle:
      'Widget flotante en todo el portfolio, orquestado por n8n con GPT-4o-mini, rate limiting, guardia semántica, búsqueda vectorial en Supabase pgvector y memoria persistente por sesión.',

    nowLive: 'Ya activo en este sitio',
    nowLiveBody:
      'El chat está abajo a la derecha. El estado persiste mientras navegás y la conversación queda guardada localmente.',

    sectionStack: 'Stack completo',
    stackItems: [
      { label: 'UI', value: 'Next.js + TypeScript — widget flotante, persistencia localStorage' },
      { label: 'Adapter', value: 'Capa de integración que desacopla la UI del backend n8n' },
      { label: 'LLM', value: 'GPT-4o-mini — guardia semántica y generación de respuestas' },
      { label: 'n8n', value: 'Orquestador del agente: pipeline de 7 pasos, memoria, seguridad' },
      { label: 'RAG', value: 'OpenAI text-embedding-3-small + búsqueda vectorial en Supabase pgvector' },
      { label: 'Memoria', value: 'Window Buffer Memory — 15 mensajes por sesión, persistidos en Supabase' },
      { label: 'MCP', value: 'Servidor Model Context Protocol — tools search_knowledge, get_projects, get_profile' },
    ],

    sectionFlow: 'Pipeline de 7 pasos',
    flowBody:
      'Cada mensaje del usuario recorre un pipeline completo antes de generar una respuesta. El orden importa: la seguridad va primero, el RAG es siempre obligatorio.',
    flowSteps: [
      {
        step: '01',
        title: 'Rate Limiting',
        detail: 'Supabase verifica que la sesión no supere 30 requests por hora. Corta antes de cualquier llamada a LLM.',
        tag: 'Seguridad',
      },
      {
        step: '02',
        title: 'Guard semántico',
        detail: 'GPT-4o-mini evalúa si el mensaje es on-topic. Responde ALLOW o BLOCK. Bloquea jailbreaks, off-topic y hallucination attempts.',
        tag: 'Seguridad',
      },
      {
        step: '03',
        title: 'Enrich context',
        detail: 'Si el mensaje es una pregunta de seguimiento (≤7 palabras), se inyecta contexto de la conversación previa para que el embedding sea más preciso.',
        tag: 'Contexto',
      },
      {
        step: '04',
        title: 'Embedding',
        detail: 'La pregunta (enriquecida si aplica) se vectoriza con text-embedding-3-small (1536 dimensiones).',
        tag: 'RAG',
      },
      {
        step: '05',
        title: 'RAG lookup',
        detail: 'match_knowledge_documents() busca los 4 chunks más relevantes en pgvector por similitud coseno. Este paso es SIEMPRE obligatorio.',
        tag: 'RAG',
      },
      {
        step: '06',
        title: 'AI Agent',
        detail: 'GPT-4o-mini genera la respuesta con el contexto RAG + Window Buffer Memory (últimos 15 mensajes de la sesión). No inventa nada fuera del contexto.',
        tag: 'Generación',
      },
      {
        step: '07',
        title: 'Save context',
        detail: 'La respuesta y el turno se persisten en Supabase, asociados al sessionId. La memoria sobrevive cambios de página.',
        tag: 'Persistencia',
      },
    ],

    sectionKb: 'Knowledge base',
    kbBody: '13 documentos estratégicos cubriendo perfil, stack, proyectos, disponibilidad y contexto de empresa. Cada bloque fue diseñado para responder exactamente las preguntas que hace un reclutador técnico.',
    kbDocs: [
      'Perfil de Facundo',
      'Skills — IA y LLMs',
      'Skills — Automatización y n8n',
      'Skills — Web Full Stack',
      'Skills — Backend y Python',
      'Skills — Infraestructura y DevOps',
      'Skills — Background Industrial',
      'Proyecto N8N Hub',
      'Sistema de gestión interna',
      'Plataforma SaaS Agroindustrial',
      'Python SaaS Base',
      'Contacto y disponibilidad',
      'ITsynch — contexto de la empresa',
    ],

    sectionMcp: 'Servidor MCP',
    mcpBody:
      'Model Context Protocol es el estándar de Anthropic para conectar LLMs con herramientas externas. El servidor expone 3 tools y puede conectarse a cualquier cliente compatible (Claude Desktop, Cursor, otros).',
    mcpTools: [
      { name: 'search_knowledge', desc: 'Búsqueda semántica en la base de conocimiento vectorial.' },
      { name: 'get_projects', desc: 'Lista de proyectos con stack y descripción.' },
      { name: 'get_profile', desc: 'Perfil profesional completo.' },
    ],
    mcpConnectTitle: 'Conectar a Claude Desktop',
    mcpConnectBody: 'Agregá esto a tu configuración de Claude Desktop:',

    sectionContract: 'Contrato webhook',
    sectionContractBody: 'Payload que la UI envía a n8n. Cambiar el workflow no requiere tocar la UI.',

    sectionWhy: 'Decisiones de diseño',
    sectionWhyBody: 'Decisiones de arquitectura y alcance del sistema.',
    decisions: [
      'RAG siempre obligatorio — el agente nunca responde sin contexto recuperado. Elimina alucinaciones sobre proyectos y tecnologías.',
      'Contexto persistido en Supabase — la memoria de sesión no vive en el cliente. Funciona aunque el usuario recargue o cambie de página.',
      'Seguridad en 3 capas — rate limiting corta el abuso de API, el guard semántico bloquea off-topic y jailbreaks, el system prompt restringe el dominio de respuesta.',
      'Alcance y escalabilidad — el chatbot productivo usa rate limiting real en Supabase (30 req/hora por sesión). La demo interactiva tiene una capa liviana en memoria. Sin autenticación porque es demo pública; en producción: API keys por cliente. Sin caché de embeddings — primera optimización obvia al escalar con Redis o Upstash.',
    ],
  },
  en: {
    back: 'Back to portfolio',
    badge: 'Technical Case',
    title: 'RAG chatbot with 7-step pipeline on vector knowledge base',
    subtitle:
      'Floating widget across the full portfolio, orchestrated by n8n with GPT-4o-mini, rate limiting, semantic guard, Supabase pgvector search and persistent session memory.',

    nowLive: 'Live on this site',
    nowLiveBody:
      'Open the chatbot at the bottom right. State is kept while navigating and messages are persisted locally.',

    sectionStack: 'Full stack',
    stackItems: [
      { label: 'UI', value: 'Next.js + TypeScript — floating widget, localStorage persistence' },
      { label: 'Adapter', value: 'Integration layer that decouples UI from the n8n backend' },
      { label: 'LLM', value: 'GPT-4o-mini — semantic guard and response generation' },
      { label: 'n8n', value: 'Agent orchestrator: 7-step pipeline, memory, security' },
      { label: 'RAG', value: 'OpenAI text-embedding-3-small + vector search on Supabase pgvector' },
      { label: 'Memory', value: 'Window Buffer Memory — 15 messages per session, persisted in Supabase' },
      { label: 'MCP', value: 'Model Context Protocol server — tools search_knowledge, get_projects, get_profile' },
    ],

    sectionFlow: '7-step pipeline',
    flowBody:
      'Each user message goes through a full pipeline before a response is generated. Order matters: security runs first, RAG is always mandatory.',
    flowSteps: [
      {
        step: '01',
        title: 'Rate Limiting',
        detail: 'Supabase checks that the session has not exceeded 30 requests per hour. Cuts before any LLM call.',
        tag: 'Security',
      },
      {
        step: '02',
        title: 'Semantic Guard',
        detail: 'GPT-4o-mini evaluates whether the message is on-topic. Returns ALLOW or BLOCK. Catches jailbreaks, off-topic queries and hallucination attempts.',
        tag: 'Security',
      },
      {
        step: '03',
        title: 'Enrich context',
        detail: 'If the message is a follow-up (≤7 words), prior conversation context is injected to make the embedding more precise.',
        tag: 'Context',
      },
      {
        step: '04',
        title: 'Embedding',
        detail: 'The (optionally enriched) question is vectorized with text-embedding-3-small (1536 dimensions).',
        tag: 'RAG',
      },
      {
        step: '05',
        title: 'RAG lookup',
        detail: 'match_knowledge_documents() retrieves the 4 most relevant chunks from pgvector by cosine similarity. This step is ALWAYS mandatory.',
        tag: 'RAG',
      },
      {
        step: '06',
        title: 'AI Agent',
        detail: 'GPT-4o-mini generates the response using the RAG context + Window Buffer Memory (last 15 messages of the session). No answers outside the context.',
        tag: 'Generation',
      },
      {
        step: '07',
        title: 'Save context',
        detail: 'The response and the turn are persisted in Supabase, keyed by sessionId. Memory survives page changes.',
        tag: 'Persistence',
      },
    ],

    sectionKb: 'Knowledge base',
    kbBody: '13 strategic documents covering profile, stack, projects, availability and company context. Each block was designed to answer exactly what a technical recruiter asks.',
    kbDocs: [
      "Facundo's profile",
      'Skills — AI and LLMs',
      'Skills — Automation and n8n',
      'Skills — Web Full Stack',
      'Skills — Backend and Python',
      'Skills — Infrastructure and DevOps',
      'Skills — Industrial background',
      'N8N Hub project',
      'Internal management system',
      'Agroindustrial SaaS platform',
      'Python SaaS Base',
      'Contact and availability',
      'ITsynch — company context',
    ],

    sectionMcp: 'MCP Server',
    mcpBody:
      "Model Context Protocol is Anthropic's standard for connecting LLMs to external tools. The server exposes 3 tools and can connect to any compatible client (Claude Desktop, Cursor, others).",
    mcpTools: [
      { name: 'search_knowledge', desc: 'Semantic search on the vector knowledge base.' },
      { name: 'get_projects', desc: 'Project list with stack and description.' },
      { name: 'get_profile', desc: 'Full professional profile.' },
    ],
    mcpConnectTitle: 'Connect to Claude Desktop',
    mcpConnectBody: 'Add this to your Claude Desktop configuration:',

    sectionContract: 'Webhook contract',
    sectionContractBody: 'Payload the UI sends to n8n. Changing the workflow does not require touching the UI.',

    sectionWhy: 'Design decisions',
    sectionWhyBody: 'Architecture and scope decisions behind the system.',
    decisions: [
      'RAG always mandatory — the agent never responds without retrieved context. Eliminates hallucinations about projects and technologies.',
      'Context persisted in Supabase — session memory does not live on the client. Works even if the user reloads or changes pages.',
      'Security in 3 layers — rate limiting stops API abuse, the semantic guard blocks off-topic and jailbreaks, the system prompt restricts the response domain.',
      'Scope and scalability — the production chatbot uses real rate limiting in Supabase (30 req/hour per session). The interactive demo has a lightweight in-memory layer. No authentication because it\'s a public demo; in production: API keys per client. No embedding cache — the obvious first optimization when scaling with Redis or Upstash.',
    ],
  },
} as const;

const TAG_COLORS: Record<string, string> = {
  Seguridad: 'text-red-500',
  Security: 'text-red-500',
  Contexto: 'text-yellow-500',
  Context: 'text-yellow-500',
  RAG: 'text-[color:var(--accent)]',
  Generación: 'text-green-500',
  Generation: 'text-green-500',
  Persistencia: 'text-purple-400',
  Persistence: 'text-purple-400',
};

export default function ChatbotWorkbench() {
  const { lang } = useI18n();
  const locale = lang === 'en' ? 'en' : 'es';
  const copy = UI[locale];

  const webhookPayload = useMemo(
    () =>
      JSON.stringify(
        {
          conversationId: 'session-abc123',
          channel: 'web',
          locale,
          message: locale === 'es' ? 'Mensaje del usuario' : 'User message',
          capability: 'product',
          history: ['...'],
        },
        null,
        2,
      ),
    [locale],
  );

  const mcpConfig = JSON.stringify(
    {
      mcpServers: {
        'portfolio-facundo': {
          url: 'https://facuremmer.vercel.app/api/mcp',
        },
      },
    },
    null,
    2,
  );

  return (
    <main className="container-pro space-y-6 pb-12">

      {/* Hero */}
      <section className="card hero-bg noise relative overflow-hidden p-6 md:p-8">
        <Link href="/#proyectos" className="btn-ghost mb-5 inline-flex">
          {copy.back}
        </Link>
        <p className="section-label">{copy.badge}</p>
        <h1 className="mt-2 max-w-4xl text-3xl font-semibold tracking-tight text-[color:var(--text)] md:text-5xl">
          {copy.title}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[color:var(--muted)] md:text-base">
          {copy.subtitle}
        </p>
      </section>

      {/* Ya activo */}
      <section className="card p-6 md:p-8">
        <p className="section-label">{copy.nowLive}</p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[color:var(--muted)]">{copy.nowLiveBody}</p>
      </section>

      {/* Stack completo */}
      <section className="card p-6 md:p-8">
        <p className="section-label">{copy.sectionStack}</p>
        <div className="mt-4 divide-y divide-[color:var(--line)]">
          {copy.stackItems.map((item) => (
            <div key={item.label} className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-4">
              <span className="w-24 shrink-0 text-xs font-mono font-semibold text-[color:var(--accent)]">
                {item.label}
              </span>
              <span className="text-sm text-[color:var(--muted)]">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Pipeline 7 pasos */}
      <section className="card p-6 md:p-8">
        <p className="section-label">{copy.sectionFlow}</p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[color:var(--muted)]">{copy.flowBody}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {copy.flowSteps.map((item) => (
            <article
              key={item.step}
              className="rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-soft)] p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[color:var(--muted)]">
                  {item.step}
                </p>
                <span className={`text-[10px] font-semibold uppercase tracking-wide ${TAG_COLORS[item.tag] ?? 'text-[color:var(--muted)]'}`}>
                  {item.tag}
                </span>
              </div>
              <h3 className="mt-2 text-sm font-semibold text-[color:var(--text)]">{item.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-[color:var(--muted)]">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Workflow screenshot */}
      <section className="card overflow-hidden p-0">
        <div className="border-b border-[color:var(--line)] bg-[color:var(--surface-soft)] px-6 py-3">
          <p className="font-mono text-xs font-semibold text-[color:var(--accent)]">n8n — RAG chatbot workflow</p>
        </div>
        <div className="relative w-full">
          <Image
            src="/captures/n8n_rag_chatbot.png"
            alt="n8n RAG chatbot workflow"
            width={1600}
            height={900}
            className="w-full object-contain"
            priority
          />
        </div>
      </section>

      {/* Knowledge base */}
      <section className="card p-6 md:p-8">
        <p className="section-label">{copy.sectionKb}</p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[color:var(--muted)]">{copy.kbBody}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {copy.kbDocs.map((doc, i) => (
            <span
              key={doc}
              className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--line)] bg-[color:var(--surface-soft)] px-3 py-1 text-xs text-[color:var(--muted)]"
            >
              <span className="font-mono text-[10px] font-semibold text-[color:var(--accent)]">
                {String(i + 1).padStart(2, '0')}
              </span>
              {doc}
            </span>
          ))}
        </div>
      </section>

      {/* MCP Server */}
      <section className="card p-6 md:p-8">
        <p className="section-label">{copy.sectionMcp}</p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[color:var(--muted)]">{copy.mcpBody}</p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {copy.mcpTools.map((tool) => (
            <div key={tool.name} className="rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-soft)] p-4">
              <p className="font-mono text-xs font-semibold text-[color:var(--accent)]">{tool.name}()</p>
              <p className="mt-2 text-sm text-[color:var(--muted)]">{tool.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <p className="text-xs font-semibold text-[color:var(--text)]">{copy.mcpConnectTitle}</p>
          <p className="mt-1 text-xs text-[color:var(--muted)]">{copy.mcpConnectBody}</p>
          <pre className="terminal mt-3 overflow-x-auto p-3 text-[11px]">{mcpConfig}</pre>
        </div>
      </section>

      {/* Demo interactiva */}
      <section className="card p-6 md:p-8">
        <McpDemo />
      </section>

      {/* Contrato + Decisiones */}
      <section className="grid gap-4 lg:grid-cols-2">
        <article className="card p-6">
          <p className="section-label">{copy.sectionContract}</p>
          <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">{copy.sectionContractBody}</p>
          <pre className="terminal mt-4 overflow-x-auto p-3 text-[11px]">{webhookPayload}</pre>
        </article>

        <article className="card p-6">
          <p className="section-label">{copy.sectionWhy}</p>
          <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">{copy.sectionWhyBody}</p>
          <ul className="mt-4 space-y-2 text-sm text-[color:var(--muted)]">
            {copy.decisions.map((d) => (
              <li key={d} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface-soft)] px-3 py-2 leading-relaxed">
                {d}
              </li>
            ))}
          </ul>
        </article>
      </section>

    </main>
  );
}
