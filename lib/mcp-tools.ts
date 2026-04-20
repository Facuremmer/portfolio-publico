import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const CLIENT_ID = 'portfolio-facundo';

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY!.trim() });
}

export type KnowledgeChunk = {
  content: string;
  metadata: Record<string, string>;
  similarity: number;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  stack: string[];
  type: string;
  public: boolean;
};

export type Profile = {
  name: string;
  role: string;
  location: string;
  email: string;
  github: string;
  experience: string;
  education: string[];
  english: string;
  available: boolean;
};

// ---------------------------------------------------------------------------
// TOOL: search_knowledge
// ---------------------------------------------------------------------------

export async function searchKnowledge(
  query: string,
  matchCount = 4,
): Promise<KnowledgeChunk[]> {
  const openai = getOpenAI();
  const supabase = getSupabase();

  const embeddingRes = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: query,
  });
  const embedding = embeddingRes.data[0].embedding;

  const { data, error } = await supabase.rpc('match_knowledge_documents', {
    query_embedding: embedding,
    match_client_id: CLIENT_ID,
    match_threshold: 0.3,
    match_count: matchCount,
  });

  if (error) throw new Error(error.message);

  return (data as KnowledgeChunk[]) ?? [];
}

// ---------------------------------------------------------------------------
// TOOL: get_projects
// ---------------------------------------------------------------------------

export function getProjects(): Project[] {
  return [
    {
      id: 'n8n-hub',
      name: 'N8N Hub',
      description: 'Automatizaciones IA self-hosted: LinkedIn, blog bilingüe, newsletter y chatbot RAG.',
      stack: ['n8n', 'OpenAI', 'Gemini', 'Docker', 'Oracle Cloud'],
      type: 'AI Automation',
      public: false,
    },
    {
      id: 'gestion-interna',
      name: 'Sistema de Gestión Interna',
      description: 'ERP interno completo. 10 usuarios simultáneos vía VPN. Sincronización real-time con PostgreSQL LISTEN/NOTIFY.',
      stack: ['Python', 'PyQt5', 'PostgreSQL'],
      type: 'Desktop ERP',
      public: false,
    },
    {
      id: 'saas-agro',
      name: 'Plataforma SaaS Agroindustrial',
      description: 'Sistema de gestión agro multiempresa con RBAC, trazabilidad y real-time.',
      stack: ['Python', 'PyQt5', 'FastAPI', 'Supabase', 'Docker'],
      type: 'SaaS Multi-tenant',
      public: false,
    },
    {
      id: 'fintech-web',
      name: 'Plataforma Fintech Web',
      description: 'Plataforma fintech para préstamos personales. AES-256-GCM + RLS a nivel de base de datos.',
      stack: ['Next.js', 'TypeScript', 'Supabase', 'shadcn/ui'],
      type: 'Fintech Web',
      public: false,
    },
    {
      id: 'portfolio',
      name: 'Portfolio con RAG + MCP',
      description: 'Este sitio. Chatbot con RAG (pgvector), servidor MCP, arquitectura n8n-ready.',
      stack: ['Next.js', 'TypeScript', 'Supabase', 'pgvector', 'OpenAI', 'n8n', 'MCP SDK'],
      type: 'AI Portfolio',
      public: true,
    },
  ];
}

// ---------------------------------------------------------------------------
// TOOL: get_profile
// ---------------------------------------------------------------------------

export function getProfile(): Profile {
  return {
    name: 'Facundo Remmer',
    role: 'Desarrollador — perfil AI Engineer',
    location: 'Concepción del Uruguay, Entre Ríos, Argentina',
    email: 'facundoremmer@outlook.com',
    github: 'github.com/Facuremmer',
    experience: '2.5 años en MSI Integración de Sistemas. Evolución: PLC/industrial → DB design → ERP desktop → fintech web → IA en producción.',
    education: [
      'Técnico Universitario en Programación — UTN CdU (completo)',
      '4 años Lic. en Automatización y Control de Procesos — UNER (sin título, pandemia)',
    ],
    english: 'Lectura fluida. Escritura funcional. Conversación básica en progreso.',
    available: true,
  };
}
