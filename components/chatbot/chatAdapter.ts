export type ChatLocale = 'es' | 'en';

export type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  at: string;
};

export type AdapterRequest = {
  conversationId: string;
  message: string;
  locale: ChatLocale;
  channel: 'web' | 'whatsapp' | 'telegram';
  history: ChatMessage[];
  capability: 'product' | 'sales' | 'support';
};

export type AdapterResponse = {
  text: string;
  latencyMs: number;
  workflow: string;
  source: 'mock';
};

type Rule = {
  workflow: string;
  keywords: string[];
  es: string;
  en: string;
};

const RULES: Rule[] = [
  {
    workflow: 'lead_qualification',
    keywords: ['precio', 'plan', 'cost', 'pricing', 'demo'],
    es:
      'Perfecto. Para cotizar rapido te propongo 3 pasos: 1) volumen esperado de conversaciones por mes, 2) canales (web/WhatsApp/Telegram), 3) si necesitas integracion con CRM. Con eso te armo una propuesta tecnica y economica.',
    en:
      'Great. For a fast estimate I need 3 inputs: 1) expected monthly conversations, 2) channels (web/WhatsApp/Telegram), and 3) whether you need CRM integration. With that I can provide a technical and pricing proposal.',
  },
  {
    workflow: 'support_flow',
    keywords: ['error', 'bug', 'fallo', 'issue', 'problema', 'soporte'],
    es:
      'Entendido. Lo trataria como ticket tecnico: severidad, contexto, logs y pasos de reproduccion. Si queres, te devuelvo un checklist de diagnostico para n8n + frontend y reducimos tiempo de resolucion.',
    en:
      'Understood. I would handle it as a technical ticket: severity, context, logs, and reproduction steps. If you want, I can return a diagnosis checklist for n8n + frontend to reduce resolution time.',
  },
  {
    workflow: 'implementation_scope',
    keywords: ['integrar', 'integration', 'api', 'webhook', 'n8n', 'conectar'],
    es:
      'Para integrarlo con n8n dejaria este contrato: POST al webhook con message/sessionId/userId/channel, respuesta JSON con type + content + actions opcionales. Con ese esquema podes iterar workflows sin tocar la UI.',
    en:
      'To integrate with n8n, I would use this contract: POST webhook with message/sessionId/userId/channel, JSON response with type + content + optional actions. That schema lets you iterate workflows without touching the UI.',
  },
];

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function pickRule(input: string): Rule {
  const clean = normalize(input);
  return RULES.find((rule) => rule.keywords.some((keyword) => clean.includes(keyword))) ?? RULES[2];
}

export function createN8nChatAdapter() {
  return {
    async send(request: AdapterRequest): Promise<AdapterResponse> {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: request.conversationId,
          locale: request.locale,
          message: request.message,
        }),
      });

      if (!res.ok) {
        const fallback =
          request.locale === 'es'
            ? 'No pude conectarme. Intentá de nuevo.'
            : 'Could not connect. Please try again.';
        return { text: fallback, latencyMs: 0, workflow: 'error', source: 'mock' };
      }

      const data = await res.json() as { text: string };
      return { text: data.text, latencyMs: 0, workflow: 'n8n', source: 'mock' };
    },
  };
}

const DEFAULT_DELAY_MS = 520;

export function createMockChatAdapter() {
  return {
    async send(request: AdapterRequest): Promise<AdapterResponse> {
      const rule = pickRule(request.message);
      const responseText = request.locale === 'es' ? rule.es : rule.en;
      const latencyMs = DEFAULT_DELAY_MS + Math.round(request.message.length * 3.4);

      await new Promise((resolve) => setTimeout(resolve, latencyMs));

      return {
        text: responseText,
        latencyMs,
        workflow: rule.workflow,
        source: 'mock',
      };
    },
  };
}
