/**
 * Seed script — knowledge_documents para el chatbot de portfolio
 * Uso: npx tsx scripts/seed-knowledge.ts
 */

import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const CLIENT_ID = 'portfolio-facundo';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY!.trim() });

// ---------------------------------------------------------------------------
// CHUNKS DE CONOCIMIENTO
// ---------------------------------------------------------------------------

const chunks: { content: string; metadata: Record<string, string> }[] = [

  // ── PERFIL ──────────────────────────────────────────────────────────────
  {
    content: `Facundo Remmer es un desarrollador de 28 años con perfil AI Engineer, ubicado en Concepción del Uruguay, Entre Ríos, Argentina. Su diferenciador real es una evolución concreta en 2.5 años: empezó programando PLCs industriales, diseñó una base de datos para un frigorífico internacional, construyó un ERP desktop, luego una plataforma fintech web, y hoy tiene automatizaciones con IA en producción. Combina el mundo OT/industrial con IA y software web moderno — perfil muy poco común. Es autodidacta y sostiene múltiples proyectos complejos en paralelo sin abandonar ninguno, todo mientras trabaja full time.`,
    metadata: { topic: 'perfil', subtopic: 'diferenciador' },
  },
  {
    content: `Facundo Remmer trabaja como Ingeniero de desarrollo en MSI Integración de Sistemas hace 2.5 años. La empresa se dedica a automatización industrial. En ese tiempo programó PLCs en Ladder, Structured Text y Python; desarrolló interfaces SCADA; diseñó desde cero la base de datos de control de stock para un frigorífico internacional que hoy está en producción; construyó la gestión de tanques de materia prima para una fábrica de helados usando PLC Schneider M241 + WebVisu; y desarrolló un ERP interno usado por 10 usuarios simultáneos vía VPN. Hoy también gestiona dominios, mails, soporte de red y conexiones PLC-base de datos.`,
    metadata: { topic: 'experiencia', subtopic: 'trabajo-actual' },
  },
  {
    content: `La formación de Facundo: Técnico Universitario en Programación en UTN Concepción del Uruguay (título completo). Además cursó 4 años de la Licenciatura en Automatización y Control de Procesos Industriales en UNER — no tiene el título porque la pandemia interrumpió el proceso, pero tiene la base técnica sólida en automatización e ingeniería industrial.`,
    metadata: { topic: 'formacion' },
  },

  // ── STACK ────────────────────────────────────────────────────────────────
  {
    content: `Stack técnico principal de Facundo: Frontend con Next.js, TypeScript, Tailwind CSS y shadcn/ui. Backend con Python y FastAPI. Bases de datos: PostgreSQL (con LISTEN/NOTIFY para real-time), Supabase con pgvector para búsqueda vectorial. Automatización con IA: n8n self-hosted, OpenAI API, Gemini, Claude (Anthropic). Infraestructura: Docker, Oracle Cloud, Turborepo. Desktop: PyQt5 con Python. Industrial: PLCs Schneider y otros fabricantes, Ladder, Structured Text, SCADA, WebVisu.`,
    metadata: { topic: 'stack', subtopic: 'completo' },
  },
  {
    content: `Facundo tiene experiencia práctica con IA y LLMs en producción: usa OpenAI API (GPT-4o, embeddings text-embedding-3-small) y Gemini en flujos reales via n8n. Implementó RAG completo con pgvector en Supabase para el chatbot de su portfolio. Construyó un servidor MCP (Model Context Protocol) sobre Next.js. Tiene experiencia con function calling, tool use, embeddings y búsqueda vectorial por similitud coseno.`,
    metadata: { topic: 'stack', subtopic: 'ia-llms' },
  },
  {
    content: `Facundo usa n8n self-hosted como orquestador de agentes de IA — el equivalente funcional a LangChain para workflows de producción. n8n permite construir pipelines de IA, routing de canales, memoria de sesión y lógica de negocio sin acoplar el código. Tiene una instancia propia en producción con flujos activos para automatización de LinkedIn, blog bilingüe con IA y chatbot RAG. Nunca usó LangChain directamente, pero aplica exactamente los mismos patrones: chains, routers, memoria, herramientas conectadas. Puede incorporar LangChain o LangGraph rápidamente dado el overlap conceptual total.`,
    metadata: { topic: 'stack', subtopic: 'n8n-langchain' },
  },
  {
    content: `Facundo corrió modelos de lenguaje locales con Chat4All — aplicación equivalente a Ollama que permite correr LLMs open source en hardware propio sin conexión a internet. Entiende la diferencia entre modelos hosteados (OpenAI, Anthropic) y modelos locales open source (Llama, Mistral, Phi). HuggingFace lo conoce como la plataforma central del ecosistema open source de modelos — sin experiencia profunda todavía, pero con contexto claro de para qué sirve y cómo se usa.`,
    metadata: { topic: 'stack', subtopic: 'modelos-locales' },
  },

  // ── AGENTES DE IA ────────────────────────────────────────────────────────
  {
    content: `Un agente de IA es un sistema que razona en loop: recibe una consulta, decide qué herramienta usar, ejecuta la herramienta, procesa el resultado y decide si necesita otro paso o si ya puede responder. Facundo construyó el agente del portfolio con este patrón: tiene tres herramientas conectadas (buscar en la knowledge base por similitud semántica, listar proyectos, devolver perfil profesional). El agente decide cuál usar según la pregunta. Está orquestado en n8n, con memoria de sesión por sessionId.`,
    metadata: { topic: 'ia', subtopic: 'agentes' },
  },

  // ── MCP ──────────────────────────────────────────────────────────────────
  {
    content: `El portfolio de Facundo incluye un servidor MCP (Model Context Protocol) desplegado en producción. MCP es el protocolo estándar de Anthropic para que clientes de IA (como Claude Desktop) consuman herramientas externas de forma estandarizada. El servidor expone tres tools: search_knowledge (búsqueda semántica por embedding en pgvector), get_projects (lista de proyectos con stack y descripción), y get_profile (datos profesionales completos). Está implementado en TypeScript sobre Next.js y conectado a Supabase. Un reclutador técnico con Claude Desktop puede apuntar al servidor MCP del portfolio y consultar la knowledge base directamente, sin abrir el navegador.`,
    metadata: { topic: 'ia', subtopic: 'mcp' },
  },

  // ── RAG ──────────────────────────────────────────────────────────────────
  {
    content: `El chatbot del portfolio usa RAG (Retrieval-Augmented Generation) con arquitectura completa. Flujo: la pregunta del usuario se convierte en embedding con OpenAI text-embedding-3-small (1536 dimensiones). Ese vector se compara por similitud coseno contra la tabla knowledge_documents en Supabase con pgvector. Se recuperan los 4 chunks más relevantes (threshold 0.3). Esos chunks se inyectan como contexto al LLM junto con la pregunta original. El LLM responde con información real, no alucinada. La orquestación corre en n8n. La knowledge base tiene client_id "portfolio-facundo" para aislar contenido por cliente.`,
    metadata: { topic: 'ia', subtopic: 'rag-arquitectura' },
  },

  // ── PROYECTOS ────────────────────────────────────────────────────────────
  {
    content: `N8N Hub: sistema de automatizaciones IA self-hosted construido por Facundo. Incluye flujos para generación automática de posts en LinkedIn, blog bilingüe (ES/EN) con contenido generado por IA, newsletter y chatbot RAG con pgvector. Stack: n8n + OpenAI + Gemini + Claude + Docker + Oracle Cloud. Todo self-hosted, en producción. Demuestra capacidad de orquestar múltiples servicios de IA en flujos de producción reales.`,
    metadata: { topic: 'proyecto', subtopic: 'n8n-hub' },
  },
  {
    content: `Sistema de gestión interna: ERP interno desarrollado por Facundo para su empresa actual. Aplicación desktop en Python con PyQt5, usada por 10 usuarios simultáneos vía VPN. Usa PostgreSQL con LISTEN/NOTIFY para sincronización en tiempo real entre clientes. Cubre módulos de registro de horas consumidas por empleado por proyecto, KPIs internos y dashboards de gestión operativa. Proyecto privado (NDA). Fue construido desde cero en su primer año como desarrollador, sin arquitectura previa ni equipo.`,
    metadata: { topic: 'proyecto', subtopic: 'gestion-interna' },
  },
  {
    content: `Plataforma SaaS agroindustrial: sistema de gestión agro multiempresa. Aplicación desktop en Python/PyQt5 con backend FastAPI y base de datos en Supabase. Corre en Docker. Tiene gestión de stock, trazabilidad de productos, RBAC 3-tier (super_admin, admin por empresa, usuario con permisos efectivos), actualización OTA con verificación SHA256, integración con WhatsApp Cloud API, y sincronización en tiempo real vía PostgreSQL LISTEN/NOTIFY. Proyecto para cliente privado (NDA). Arquitectura SaaS multi-tenant completa.`,
    metadata: { topic: 'proyecto', subtopic: 'saas-agro' },
  },
  {
    content: `Portfolio con chatbot RAG y servidor MCP: el portfolio de Facundo implementa un chatbot con arquitectura RAG completa y un servidor MCP desplegado en producción. Stack: Next.js 15, TypeScript, Tailwind, Supabase pgvector, OpenAI API, n8n, MCP SDK de Anthropic. Código público en GitHub (github.com/Facuremmer).`,
    metadata: { topic: 'proyecto', subtopic: 'portfolio' },
  },

  // ── MOMENTOS TÉCNICOS ────────────────────────────────────────────────────
  {
    content: `Dos proyectos definen la capacidad de Facundo para sostener complejidad real. El primero: en su primer año como desarrollador, le asignaron construir el ERP interno de la empresa desde cero — sin arquitectura previa, sin equipo. Diseñó la base de datos, la arquitectura y todos los módulos: horas consumidas por empleado por proyecto, KPIs internos, dashboards de gestión operativa. Hoy lo usan 10 personas en simultáneo, en producción sin interrupciones. El segundo: diseñó desde cero la base de datos de trazabilidad y control de stock para un frigorífico internacional — luego construyó también la interfaz de gestión completa. Fue el primer sistema de escala real que llevó a producción completamente solo. Sigue corriendo sin fallos. Estos no fueron side projects: eran el sistema real de la empresa.`,
    metadata: { topic: 'perfil', subtopic: 'momentos-tecnicos' },
  },

  // ── FORTALEZAS AI ENGINEER ───────────────────────────────────────────────
  {
    content: `Lo que hace a Facundo candidato sólido para un rol AI Engineer: tiene IA en producción real — no demos ni tutoriales. Integra múltiples servicios (OpenAI, n8n, Supabase, Docker, MCP) en sistemas que corren solos. Entiende tanto el lado de software (APIs, bases de datos, arquitectura) como el lado de IA (embeddings, RAG, agentes, tool use, MCP). Es autodidacta con track record comprobable: aprendió PLCs, luego diseño de DB a escala, luego desarrollo web, luego IA — siempre en proyectos reales con usuarios reales. Aprende rápido y no necesita que le expliquen dos veces.`,
    metadata: { topic: 'perfil', subtopic: 'fortalezas-ai-engineer' },
  },

  // ── ITSYNCH ──────────────────────────────────────────────────────────────
  {
    content: `ITsynch es una empresa de software especializada en operaciones para la industria crucerista y marítima, fundada en 2007 con oficinas en Orlando (Florida, USA) y Concepción del Uruguay (Argentina). Desarrolla plataformas modulares de gestión técnica y hotelera para barcos: gestión de activos y repuestos, seguridad y cumplimiento normativo (HSEQ), logística de dique seco, control presupuestario, gestión documental y analytics operativo. Sus clientes incluyen las principales líneas de cruceros del mundo: Carnival, Virgin Voyages, Holland America, Cunard, AIDA y Seabourn, entre otras. Tiene más de 150 buques con su software instalado, más de 10.000 usuarios activos, 90+ especialistas globales, 18+ años de operación y 100% de retención de clientes. Es una empresa con escala internacional y producto propio — no una consultora.`,
    metadata: { topic: 'itsynch', subtopic: 'empresa' },
  },

  // ── INGLÉS Y CONTACTO ────────────────────────────────────────────────────
  {
    content: `Nivel de inglés de Facundo: lectura fluida (consume documentación técnica, papers y recursos en inglés sin problema). Escritura funcional, especialmente en contextos técnicos como Slack, emails o PRs. Conversación básica, mejorando activamente. Es honesto al respecto: no llega a B2 conversacional todavía, pero se comunica bien en entornos técnicos escritos.`,
    metadata: { topic: 'ingles' },
  },
  {
    content: `Facundo Remmer está disponible para nuevas oportunidades laborales como AI Engineer o rol similar. Está abierto a trabajo remoto. Para contactarlo: facundoremmer@outlook.com o facundoremmer0@gmail.com. GitHub: github.com/Facuremmer. LinkedIn: linkedin.com/in/facundo-remmer-6b761b211.`,
    metadata: { topic: 'contacto', subtopic: 'disponibilidad' },
  },
];

// ---------------------------------------------------------------------------
// EMBEDDING + INSERT
// ---------------------------------------------------------------------------

async function embed(text: string): Promise<number[]> {
  const res = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });
  return res.data[0].embedding;
}

async function main() {
  console.log(`Seeding ${chunks.length} chunks para client_id="${CLIENT_ID}"...\n`);

  const { error: deleteError } = await supabase
    .from('knowledge_documents')
    .delete()
    .eq('client_id', CLIENT_ID);

  if (deleteError) {
    console.error('Error borrando datos anteriores:', deleteError.message);
    process.exit(1);
  }

  console.log('Datos anteriores borrados. Insertando chunks...\n');

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    process.stdout.write(`[${i + 1}/${chunks.length}] ${chunk.metadata.subtopic ?? chunk.metadata.topic}... `);

    const embedding = await embed(chunk.content);

    const { error } = await supabase.from('knowledge_documents').insert({
      client_id: CLIENT_ID,
      content: chunk.content,
      metadata: chunk.metadata,
      embedding,
    });

    if (error) {
      console.error(`ERROR: ${error.message}`);
    } else {
      console.log('OK');
    }
  }

  console.log('\nSeed completo.');
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
