'use client';

import { useState } from 'react';
import { useI18n } from '@/components/I18nProvider';

type ToolCall = {
  tool: string;
  input: Record<string, string>;
  outputPreview: string;
};

type DemoResult = {
  query: string;
  toolCalls: ToolCall[];
  answer: string;
};

const SUGGESTED = {
  es: [
    '¿Qué hace la empresa ITsynch?',
    '¿Qué experiencia tiene con IA?',
    '¿Qué proyectos hizo?',
    '¿Con qué stack trabaja?',
    '¿Está disponible?',
  ],
  en: [
    'What does ITsynch do?',
    'What AI experience does he have?',
    'What projects has he built?',
    'What is his tech stack?',
    'Is he available?',
  ],
};

const UI = {
  es: {
    title: 'Demo en vivo — MCP',
    subtitle: 'Escribí una pregunta. El sistema llama las tools del servidor MCP, busca en la knowledge base vectorial y genera la respuesta.',
    placeholder: 'Preguntá algo sobre Facundo...',
    send: 'Consultar',
    loading: 'Consultando knowledge base...',
    toolsLabel: 'Tools ejecutadas',
    answerLabel: 'Respuesta generada',
    inputLabel: 'Input',
    outputLabel: 'Resultado (preview)',
  },
  en: {
    title: 'Live Demo — MCP',
    subtitle: 'Type a question. The system calls MCP server tools, searches the vector knowledge base, and generates the answer.',
    placeholder: 'Ask something about Facundo...',
    send: 'Query',
    loading: 'Querying knowledge base...',
    toolsLabel: 'Tools executed',
    answerLabel: 'Generated answer',
    inputLabel: 'Input',
    outputLabel: 'Result (preview)',
  },
} as const;

const TOOL_COLOR: Record<string, string> = {
  search_knowledge: 'text-[color:var(--accent)]',
  get_profile: 'text-emerald-400',
  get_projects: 'text-violet-400',
};

export default function McpDemo() {
  const { lang } = useI18n();
  const locale = lang === 'en' ? 'en' : 'es';
  const copy = UI[locale];

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DemoResult | null>(null);
  const [error, setError] = useState('');

  const run = async (q: string) => {
    const clean = q.trim();
    if (!clean || loading) return;
    setQuery(clean);
    setLoading(true);
    setResult(null);
    setError('');

    try {
      const res = await fetch('/api/mcp-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: clean, locale }),
      });
      const data = await res.json() as DemoResult;
      setResult(data);
    } catch {
      setError(locale === 'es' ? 'Error al consultar.' : 'Query failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="section-label">{copy.title}</p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[color:var(--muted)]">
          {copy.subtitle}
        </p>
      </div>

      {/* Suggested queries */}
      <div className="flex flex-wrap gap-2">
        {SUGGESTED[locale].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => void run(s)}
            className="rounded-full border border-[color:var(--line)] px-3 py-1 text-xs text-[color:var(--muted)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)]"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); void run(query); }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={copy.placeholder}
          className="h-10 flex-1 rounded-xl border border-[color:var(--line)] bg-[color:var(--surface)] px-3 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)]"
        />
        <button type="submit" className="btn-primary h-10 px-4 text-sm" disabled={loading}>
          {copy.send}
        </button>
      </form>

      {/* Loading */}
      {loading && (
        <div className="flex items-center gap-2 text-xs text-[color:var(--muted)]">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
          {copy.loading}
        </div>
      )}

      {/* Error */}
      {error && <p className="text-xs text-red-400">{error}</p>}

      {/* Results */}
      {result && (
        <div className="space-y-3">
          {/* Tool calls */}
          <div className="rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-soft)] p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-[color:var(--muted)]">
              {copy.toolsLabel}
            </p>
            <div className="space-y-3">
              {result.toolCalls.map((tc, i) => (
                <div key={i} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-3">
                  <p className={`text-xs font-mono font-semibold ${TOOL_COLOR[tc.tool] ?? 'text-[color:var(--text)]'}`}>
                    {tc.tool}()
                  </p>
                  {Object.keys(tc.input).length > 0 && (
                    <p className="mt-1 text-[11px] text-[color:var(--muted)]">
                      <span className="font-semibold">{copy.inputLabel}:</span>{' '}
                      {JSON.stringify(tc.input)}
                    </p>
                  )}
                  <p className="mt-1 text-[11px] leading-relaxed text-[color:var(--muted)]">
                    <span className="font-semibold">{copy.outputLabel}:</span>{' '}
                    {tc.outputPreview}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Answer */}
          <div className="rounded-xl border border-[color:var(--accent)] bg-[color:var(--accent-soft)] p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-[color:var(--accent)]">
              {copy.answerLabel}
            </p>
            <p className="text-sm leading-relaxed text-[color:var(--text)]">{result.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}
