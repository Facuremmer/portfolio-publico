# Portfolio — Facundo Remmer

Portfolio personal con chatbot RAG, servidor MCP y arquitectura de IA end-to-end.

---

## Stack

| Capa | Tecnologías |
|------|-------------|
| Frontend | Next.js 16, TypeScript, Tailwind CSS, shadcn/ui |
| IA / RAG | OpenAI API (GPT-4o-mini, embeddings text-embedding-3-small) |
| Orquestación | n8n self-hosted, pipeline de 7 pasos |
| Base de datos | Supabase (PostgreSQL + pgvector) |
| MCP Server | @modelcontextprotocol/sdk |
| Deploy | Vercel |

---

## Arquitectura del chatbot

El chatbot implementa un pipeline completo de 7 pasos orquestado en n8n:

```
Request
  │
  ├─ 1. Rate Limiting        → Supabase (30 req/hr por sesión)
  ├─ 2. Semantic Guard       → GPT-4o-mini clasifica ALLOW / BLOCK
  ├─ 3. Context Enrichment   → inyecta contexto si la pregunta es ≤7 palabras
  ├─ 4. Embedding            → text-embedding-3-small
  ├─ 5. RAG Lookup           → pgvector, 4 chunks, siempre obligatorio
  ├─ 6. AI Agent             → GPT-4o-mini + Window Buffer Memory (15 msgs)
  └─ 7. Persistence          → guarda conversación en Supabase
```

---

## Servidor MCP

Expone un servidor MCP (Model Context Protocol) en `/api/mcp`, conectable desde Claude Desktop.

**Tools disponibles:**
- `search_knowledge` — búsqueda vectorial en la knowledge base
- `get_projects` — lista de proyectos con stack y descripción
- `get_profile` — perfil profesional completo

**Configuración en Claude Desktop:**
```json
{
  "mcpServers": {
    "portfolio-facundo": {
      "url": "https://facundoremmer.com/api/mcp"
    }
  }
}
```

---

## Knowledge Base

19 chunks indexados en Supabase pgvector:

- Perfil profesional y diferenciadores
- Experiencia en MSI (automatización industrial)
- Stack técnico por categoría
- Proyectos: Portfolio RAG, N8N Hub, Plataforma SaaS Agroindustrial, Sistema de Gestión Interna, Python SaaS Base
- Disponibilidad e inglés

---

## Features

- Bilingüe ES / EN con cambio en tiempo real
- Dark / Light mode con selección de color de acento
- CV descargable como PDF desde el navegador, bilingüe
- Responsive, mobile first
- Rate limiting en API routes
- Servidor MCP en producción

---

## Estructura

```
app/
  cv/              # CV descargable (ES/EN)
  chatbot/         # Arquitectura del chatbot
  projects/[id]/   # Casos por proyecto
  api/
    chat/          # Proxy al webhook n8n
    mcp/           # Servidor MCP (StreamableHTTP)
    mcp-demo/      # RAG directo a OpenAI

components/
  chatbot/         # ChatWidget + adapter

lib/
  mcp-tools.ts     # Tools del servidor MCP
  rateLimit.ts     # Rate limiter in-memory

data/
  dictionary.ts    # Traducciones ES/EN

scripts/
  seed-knowledge.ts # Carga chunks en Supabase pgvector
```

---

## Variables de entorno

```env
N8N_CHAT_URL=
OPENAI_API_KEY=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_DB_PASSWORD=
SUPABASE_MANAGEMENT_TOKEN=
```

---

## Contacto

**Email:** facundoremmer0@gmail.com  
**LinkedIn:** [linkedin.com/in/facundo-remmer-6b761b211](https://www.linkedin.com/in/facundo-remmer-6b761b211)  
**GitHub:** [github.com/Facuremmer](https://github.com/Facuremmer)
