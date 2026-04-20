import { NextRequest, NextResponse } from 'next/server';
import { searchKnowledge, getProjects, getProfile } from '@/lib/mcp-tools';

const SERVER_INFO = { name: 'portfolio-facundo', version: '1.0.0' };

const TOOLS = [
  {
    name: 'search_knowledge',
    description: 'Busca información sobre Facundo Remmer en su knowledge base usando búsqueda vectorial.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Pregunta o tema a buscar' },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_projects',
    description: 'Devuelve la lista de proyectos de Facundo con stack y descripción.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_profile',
    description: 'Devuelve el perfil profesional completo de Facundo Remmer.',
    inputSchema: { type: 'object', properties: {} },
  },
];

type JsonRpcRequest = {
  jsonrpc: string;
  method: string;
  id?: number | string;
  params?: Record<string, unknown>;
};

function ok(id: number | string | undefined, result: unknown) {
  return NextResponse.json({ jsonrpc: '2.0', id: id ?? null, result });
}

function err(id: number | string | undefined, code: number, message: string) {
  return NextResponse.json({ jsonrpc: '2.0', id: id ?? null, error: { code, message } });
}

export async function POST(req: NextRequest) {
  const body = await req.json() as JsonRpcRequest;
  const { method, id, params } = body;

  if (method === 'initialize') {
    return ok(id, {
      protocolVersion: '2024-11-05',
      capabilities: { tools: {} },
      serverInfo: SERVER_INFO,
    });
  }

  if (method === 'notifications/initialized') {
    return new NextResponse(null, { status: 202 });
  }

  if (method === 'tools/list') {
    return ok(id, { tools: TOOLS });
  }

  if (method === 'tools/call') {
    const { name, arguments: args = {} } = params as { name: string; arguments: Record<string, string> };
    let text = '';

    if (name === 'search_knowledge') {
      const chunks = await searchKnowledge(args.query);
      text = chunks.map((c) => c.content).join('\n\n---\n\n') || 'Sin resultados relevantes.';
    } else if (name === 'get_projects') {
      const projects = getProjects();
      text = projects
        .map((p) => `**${p.name}** (${p.type})\n${p.description}\nStack: ${p.stack.join(', ')}`)
        .join('\n\n');
    } else if (name === 'get_profile') {
      const profile = getProfile();
      text = [
        `Nombre: ${profile.name}`,
        `Rol: ${profile.role}`,
        `Ubicación: ${profile.location}`,
        `Email: ${profile.email}`,
        `GitHub: ${profile.github}`,
        `Experiencia: ${profile.experience}`,
        `Formación: ${profile.education.join(' | ')}`,
        `Inglés: ${profile.english}`,
        `Disponible: ${profile.available ? 'Sí' : 'No'}`,
      ].join('\n');
    } else {
      return err(id, -32601, `Tool not found: ${name}`);
    }

    return ok(id, { content: [{ type: 'text', text }] });
  }

  return err(id, -32601, `Method not found: ${method}`);
}

export async function GET() {
  return NextResponse.json({
    name: SERVER_INFO.name,
    version: SERVER_INFO.version,
    description: 'MCP server for Facundo Remmer portfolio — tools: search_knowledge, get_projects, get_profile',
  });
}
