'use client';

import Link from 'next/link';
import { useI18n } from '@/components/I18nProvider';

const content = {
  es: {
    back: '← Volver al portfolio',
    download: 'Descargar PDF',
    subtitle: 'Full Stack Developer · AI Engineer',
    sections: {
      profile: 'PERFIL PROFESIONAL',
      experience: 'EXPERIENCIA LABORAL',
      projects: 'PROYECTOS DESTACADOS',
      stack: 'STACK TÉCNICO',
      education: 'EDUCACIÓN',
      languages: 'IDIOMAS',
    },
    profile:
      'Soy Técnico Universitario en Programación, recibido en la UTN FRCU, con más de 2 años y medio de experiencia como Software Engineer. Lidero el desarrollo de aplicaciones internas, diseño bases de datos y gestiono infraestructura de sistemas. Además, de forma autodidacta, he construido e implementado arquitecturas RAG con pgvector, agentes de IA con n8n, integración de LLMs via OpenAI API y servidores MCP en proyectos propios. Background en automatización industrial que aporta comprensión de sistemas críticos y datos en tiempo real.',
    jobTitle: 'Ingeniero de Desarrollo',
    jobPeriod: 'Jun. 2023 – actualidad',
    company: 'MSI Integración de Sistemas · Concepción del Uruguay, ER',
    companyDesc:
      'Empresa de automatización industrial. Rol híbrido: desarrollo de software interno, integración de sistemas y automatización de procesos con IA.',
    bullets: [
      'Lidero el área de sistemas: desarrollo de aplicaciones internas, integración de sistemas, automatización con IA y soporte de infraestructura de red.',
      'Coordiné puestas en marcha en planta junto a técnicos y operadores, siendo referente técnico en campo.',
      'Desarrollé ERP desktop en Python/PyQt5 para 10 usuarios simultáneos vía VPN, con PostgreSQL LISTEN/NOTIFY para sincronización en tiempo real, módulos de horas por proyecto, KPIs y dashboards operativos.',
      'Diseñé y desplegué la base de datos de trazabilidad y control de stock para un frigorífico; sistema en producción sin interrupciones desde su lanzamiento.',
      'Construí interfaz de gestión de tanques de materia prima con PLC Schneider M241 + WebVisu para planta industrial.',
      'Programé PLCs en Ladder y Structured Text; desarrollé interfaces SCADA y gestioné conexiones PLC–base de datos.',
    ],
    projects: [
      {
        name: 'Portfolio con chatbot RAG y servidor MCP',
        stack: 'Next.js · TypeScript · OpenAI API · Supabase pgvector · n8n · MCP SDK',
        desc: 'Pipeline RAG de 7 pasos: rate limiting, guardia semántica, embeddings, agentes con Window Buffer Memory y persistencia en Supabase. Servidor MCP en producción conectable a Claude Desktop.',
      },
      {
        name: 'N8N Hub — Automatizaciones IA self-hosted',
        stack: 'n8n · OpenAI API · Gemini · Claude · Docker · Oracle Cloud',
        desc: 'Flujos de producción para generación de contenido en LinkedIn, blog bilingüe ES/EN con IA y chatbot RAG con búsqueda vectorial en pgvector. Orquestación de múltiples LLMs equivalente a LangChain.',
      },
      {
        name: 'Plataforma SaaS Agroindustrial',
        stack: 'Python · FastAPI · Supabase · Docker · PostgreSQL · WhatsApp Cloud API',
        desc: 'Sistema multi-tenant con RBAC 3-tier (super_admin → admin → usuario con permisos efectivos), actualización OTA con verificación SHA256, trazabilidad de productos y sincronización en tiempo real vía LISTEN/NOTIFY.',
      },
    ],
    stackRows: [
      { label: 'IA / LLMs', value: 'OpenAI API (GPT-4o, embeddings), Gemini 2.0, Claude (Anthropic), RAG, pgvector, MCP (Model Context Protocol), agentes de IA, Ollama' },
      { label: 'Automatización', value: 'n8n self-hosted (orquestación de agentes, pipelines de IA), Docker, Oracle Cloud' },
      { label: 'Web / Backend', value: 'Next.js, TypeScript, Tailwind CSS, Python, FastAPI' },
      { label: 'Bases de datos', value: 'PostgreSQL, Supabase, pgvector, LISTEN/NOTIFY' },
      { label: 'Industrial', value: 'PLCs Schneider (Ladder, ST), SCADA, WebVisu, Python industrial' },
    ],
    education: [
      { title: 'Técnico Universitario en Programación', institution: 'Universidad Tecnológica Nacional — Facultad Regional Concepción del Uruguay', year: '2021 – 2023' },
      { title: 'Diplomatura Universitaria en Liderazgo y Coaching de Equipos', institution: 'Universidad Tecnológica Nacional — Facultad Regional Concepción del Uruguay', year: '2023 – 2024' },
      { title: 'Automatización y Control de Procesos Industriales — 4 años cursados', institution: 'UADER — Sede Concepción del Uruguay', year: '2019 – 2022' },
    ],
    languages: [
      { label: 'Español', value: 'nativo' },
      { label: 'Inglés', value: 'intermedio — lectura técnica fluida, escritura funcional, conversación en progreso' },
    ],
  },
  en: {
    back: '← Back to portfolio',
    download: 'Download PDF',
    subtitle: 'Full Stack Developer · AI Engineer',
    sections: {
      profile: 'PROFESSIONAL PROFILE',
      experience: 'WORK EXPERIENCE',
      projects: 'FEATURED PROJECTS',
      stack: 'TECHNICAL STACK',
      education: 'EDUCATION',
      languages: 'LANGUAGES',
    },
    profile:
      'I hold a University Technician degree in Programming from UTN FRCU, with over 2 and a half years of experience as a Software Engineer. I lead internal application development, design databases, and manage systems infrastructure. Additionally, on a self-taught basis, I have built and deployed RAG architectures with pgvector, AI agents with n8n, LLM integration via OpenAI API, and MCP servers in personal projects. Background in industrial automation providing understanding of critical systems and real-time data.',
    jobTitle: 'Development Engineer',
    jobPeriod: 'Jun. 2023 – present',
    company: 'MSI Integración de Sistemas · Concepción del Uruguay, ER',
    companyDesc:
      'Industrial automation company. Hybrid role: internal software development, systems integration, and AI process automation.',
    bullets: [
      'Lead the systems area: internal application development, systems integration, AI automation, and network infrastructure support.',
      'Coordinated plant startups alongside technicians and operators, acting as the technical lead in the field.',
      'Developed a desktop ERP in Python/PyQt5 for 10 simultaneous users via VPN, with PostgreSQL LISTEN/NOTIFY for real-time sync, project hours modules, KPIs and operational dashboards.',
      'Designed and deployed the traceability and stock control database for a meatpacking plant; system running in production without interruptions since launch.',
      'Built a raw material tank management interface with Schneider M241 PLC + WebVisu for an industrial plant.',
      'Programmed PLCs in Ladder and Structured Text; developed SCADA interfaces and managed PLC–database connections.',
    ],
    projects: [
      {
        name: 'Portfolio with RAG chatbot and MCP server',
        stack: 'Next.js · TypeScript · OpenAI API · Supabase pgvector · n8n · MCP SDK',
        desc: '7-step RAG pipeline: rate limiting, semantic guard, embeddings, agents with Window Buffer Memory and persistence in Supabase. MCP server in production connectable to Claude Desktop.',
      },
      {
        name: 'N8N Hub — Self-hosted AI Automations',
        stack: 'n8n · OpenAI API · Gemini · Claude · Docker · Oracle Cloud',
        desc: 'Production flows for LinkedIn content generation, bilingual ES/EN AI blog and RAG chatbot with vector search in pgvector. Multi-LLM orchestration equivalent to LangChain.',
      },
      {
        name: 'Agroindustrial SaaS Platform',
        stack: 'Python · FastAPI · Supabase · Docker · PostgreSQL · WhatsApp Cloud API',
        desc: 'Multi-tenant system with 3-tier RBAC (super_admin → admin → user with effective permissions), OTA updates with SHA256 verification, product traceability and real-time sync via LISTEN/NOTIFY.',
      },
    ],
    stackRows: [
      { label: 'AI / LLMs', value: 'OpenAI API (GPT-4o, embeddings), Gemini 2.0, Claude (Anthropic), RAG, pgvector, MCP (Model Context Protocol), AI agents, Ollama' },
      { label: 'Automation', value: 'n8n self-hosted (agent orchestration, AI pipelines), Docker, Oracle Cloud' },
      { label: 'Web / Backend', value: 'Next.js, TypeScript, Tailwind CSS, Python, FastAPI' },
      { label: 'Databases', value: 'PostgreSQL, Supabase, pgvector, Row Level Security, LISTEN/NOTIFY' },
      { label: 'Industrial', value: 'Schneider PLCs (Ladder, ST), SCADA, WebVisu, industrial Python' },
    ],
    education: [
      { title: 'University Technician in Programming', institution: 'Universidad Tecnológica Nacional — Concepción del Uruguay Regional Faculty', year: '2021 – 2023' },
      { title: 'University Diploma in Leadership and Team Coaching', institution: 'Universidad Tecnológica Nacional — Concepción del Uruguay Regional Faculty', year: '2023 – 2024' },
      { title: 'Automation and Industrial Process Control — 4 years completed', institution: 'UADER — Concepción del Uruguay Campus', year: '2019 – 2022' },
    ],
    languages: [
      { label: 'Spanish', value: 'native' },
      { label: 'English', value: 'intermediate — fluent technical reading, functional writing, conversational in progress' },
    ],
  },
} as const;

export default function CVPage() {
  const { lang } = useI18n();
  const c = content[lang === 'en' ? 'en' : 'es'];

  return (
    <>
      <style>{`
        @media print {
          header, footer, [data-no-print], .mouse-glow, .fixed {
            display: none !important;
          }
          body { background: white !important; color: black !important; }
          .cv-shell { padding: 0 !important; max-width: 100% !important; }
          .cv-doc { box-shadow: none !important; border: none !important; }
        }
        @page { margin: 14mm 16mm; size: A4; }
      `}</style>

      {/* Toolbar */}
      <div
        data-no-print
        className="sticky top-0 z-40 border-b border-[color:var(--line)] bg-[color:var(--surface-soft)] px-4 py-2.5 flex items-center justify-between"
      >
        <Link href="/" className="text-sm font-medium text-[color:var(--muted)] hover:text-[color:var(--text)] transition">
          {c.back}
        </Link>
        <button
          onClick={() => window.print()}
          className="btn-primary h-8 px-4 text-xs"
        >
          {c.download}
        </button>
      </div>

      {/* CV shell */}
      <div className="cv-shell mx-auto max-w-[780px] px-4 py-8">
        <article
          className="cv-doc bg-white text-[#111] shadow-xl border border-gray-200 p-[14mm] font-sans"
          style={{ fontFamily: "'Segoe UI', Arial, sans-serif", fontSize: '10.5pt', lineHeight: '1.45', color: '#111' }}
        >

          {/* ── HEADER ─────────────────────────────────────────────────────── */}
          <div style={{ marginBottom: '10px' }}>
            <h1 style={{ fontSize: '22pt', fontWeight: 700, letterSpacing: '-0.5px', margin: 0, color: '#000' }}>
              Facundo Remmer
            </h1>
            <p style={{ fontSize: '11pt', fontWeight: 600, color: '#444', margin: '2px 0 6px' }}>
              {c.subtitle}
            </p>
            <p style={{ fontSize: '9pt', color: '#555', margin: 0, lineHeight: '1.6' }}>
              facundoremmer0@gmail.com &nbsp;·&nbsp; linkedin.com/in/remmer-facundo
              <br />
              github.com/Facuremmer &nbsp;·&nbsp; <strong style={{ color: '#111' }}>portfolio-remmer.vercel.app</strong>
              <br />
              Concepción del Uruguay, ER
            </p>
          </div>

          <hr style={{ border: 'none', borderTop: '2px solid #111', margin: '8px 0' }} />

          {/* ── PERFIL PROFESIONAL ─────────────────────────────────────────── */}
          <section style={{ marginBottom: '10px' }}>
            <h2 style={sectionTitle}>{c.sections.profile}</h2>
            <p style={{ margin: 0, fontSize: '10pt' }}>{c.profile}</p>
          </section>

          {/* ── EXPERIENCIA LABORAL ────────────────────────────────────────── */}
          <section style={{ marginBottom: '10px' }}>
            <h2 style={sectionTitle}>{c.sections.experience}</h2>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '10.5pt' }}>{c.jobTitle}</strong>
                <span style={{ fontSize: '9pt', color: '#555' }}>{c.jobPeriod}</span>
              </div>
              <p style={{ margin: '1px 0 4px', fontSize: '9.5pt', color: '#444', fontStyle: 'italic' }}>
                {c.company}
              </p>
              <p style={{ margin: '0 0 4px', fontSize: '9.5pt', color: '#555' }}>
                {c.companyDesc}
              </p>
              <ul style={ulStyle}>
                {c.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── PROYECTOS DESTACADOS ───────────────────────────────────────── */}
          <section style={{ marginBottom: '10px' }}>
            <h2 style={sectionTitle}>{c.sections.projects}</h2>
            <div style={{ display: 'grid', gap: '6px' }}>
              {c.projects.map((p) => (
                <Project key={p.name} name={p.name} stack={p.stack} desc={p.desc} />
              ))}
            </div>
          </section>

          {/* ── STACK TÉCNICO ─────────────────────────────────────────────── */}
          <section style={{ marginBottom: '10px' }}>
            <h2 style={sectionTitle}>{c.sections.stack}</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9.5pt' }}>
              <tbody>
                {c.stackRows.map((row) => (
                  <StackRow key={row.label} label={row.label} value={row.value} />
                ))}
              </tbody>
            </table>
          </section>

          {/* ── EDUCACIÓN ─────────────────────────────────────────────────── */}
          <section style={{ marginBottom: '10px' }}>
            <h2 style={sectionTitle}>{c.sections.education}</h2>
            <div style={{ display: 'grid', gap: '4px' }}>
              {c.education.map((e) => (
                <EduItem key={e.title} title={e.title} institution={e.institution} year={e.year} />
              ))}
            </div>
          </section>

          {/* ── IDIOMAS ───────────────────────────────────────────────────── */}
          <section>
            <h2 style={sectionTitle}>{c.sections.languages}</h2>
            <p style={{ margin: 0, fontSize: '9.5pt' }}>
              {c.languages.map((l, i) => (
                <span key={l.label}>
                  {i > 0 && <> &nbsp;·&nbsp; </>}
                  <strong>{l.label}:</strong> {l.value}
                </span>
              ))}
            </p>
          </section>

        </article>
      </div>
    </>
  );
}

const sectionTitle: React.CSSProperties = {
  fontSize: '9pt',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#111',
  borderBottom: '1px solid #bbb',
  paddingBottom: '2px',
  marginBottom: '6px',
  marginTop: 0,
};

const ulStyle: React.CSSProperties = {
  margin: '0',
  paddingLeft: '14px',
  fontSize: '9.5pt',
  lineHeight: '1.5',
};

function Project({ name, stack, desc }: { name: string; stack: string; desc: string }) {
  return (
    <div style={{ paddingLeft: '2px' }}>
      <strong style={{ fontSize: '10pt' }}>{name}</strong>
      <span style={{ fontSize: '9pt', color: '#555', fontStyle: 'italic' }}> — {stack}</span>
      <p style={{ margin: '1px 0 0', fontSize: '9.5pt', color: '#333', lineHeight: '1.4' }}>{desc}</p>
    </div>
  );
}

function StackRow({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <td style={{ width: '110px', fontWeight: 600, color: '#333', paddingRight: '8px', verticalAlign: 'top', paddingBottom: '3px', whiteSpace: 'nowrap' }}>
        {label}
      </td>
      <td style={{ color: '#444', paddingBottom: '3px' }}>{value}</td>
    </tr>
  );
}

function EduItem({ title, institution, year }: { title: string; institution: string; year: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <div>
        <span style={{ fontSize: '10pt', fontWeight: 600 }}>{title}</span>
        <span style={{ fontSize: '9.5pt', color: '#555' }}> · {institution}</span>
      </div>
      <span style={{ fontSize: '9pt', color: '#555', whiteSpace: 'nowrap', marginLeft: '8px' }}>{year}</span>
    </div>
  );
}
