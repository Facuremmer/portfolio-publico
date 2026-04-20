'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/components/I18nProvider';
import { type ChatMessage, createN8nChatAdapter } from './chatAdapter';

const STORAGE_MESSAGES = 'portfolio_chat_messages_v1';
const STORAGE_SESSION = 'portfolio_chat_session_v1';

const PROMPTS: Record<'es' | 'en', string[]> = {
  es: [
    '¿Qué hace la empresa ITsynch?',
    '¿Qué experiencia tiene Facundo con IA?',
    '¿Con qué tecnologías trabaja Facundo?',
    '¿Qué proyectos desarrolló Facundo?',
  ],
  en: [
    'What does ITsynch do?',
    'What AI experience does Facundo have?',
    'What technologies does Facundo work with?',
    'What projects has Facundo built?',
  ],
};

const UI = {
  es: {
    launcherOpen: 'Abrir chat',
    launcherClose: 'Cerrar chat',
    title: 'Chat de asistencia',
    subtitle: 'Demo conectada a n8n · Preguntá sobre Facundo',
    inputPlaceholder: 'Escribi tu mensaje...',
    send: 'Enviar',
    typing: 'Escribiendo...',
    now: 'Ahora',
    assistant: 'Asistente',
    you: 'Vos',
    technicalPage: 'Ver arquitectura',
    clear: 'Limpiar',
    initial:
      'Hola. Soy el asistente del portfolio. ¿En qué puedo ayudarte?',
  },
  en: {
    launcherOpen: 'Open chat',
    launcherClose: 'Close chat',
    title: 'AI Assistant',
    subtitle: 'Ask about Facundo',
    inputPlaceholder: 'Type your message...',
    send: 'Send',
    typing: 'Writing...',
    now: 'Now',
    assistant: 'Assistant',
    you: 'You',
    technicalPage: 'View architecture',
    clear: 'Clear',
    initial:
      'Hi. I am Facundo Remmer\'s assistant. Ask me about his experience, projects, tech stack or availability.',
  },
} as const;

function makeMessage(role: ChatMessage['role'], content: string, at: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.round(Math.random() * 10000)}`,
    role,
    content,
    at,
  };
}

function getNowLabel(locale: 'es' | 'en') {
  const hour = new Date().toLocaleTimeString(locale === 'es' ? 'es-AR' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return hour;
}

function getInitialMessages(locale: 'es' | 'en'): ChatMessage[] {
  return [
    {
      id: 'assistant-initial',
      role: 'assistant',
      content: UI[locale].initial,
      at: UI[locale].now,
    },
  ];
}

export default function ChatWidget() {
  const { lang } = useI18n();
  const locale = lang === 'en' ? 'en' : 'es';
  const copy = UI[locale];
  const adapter = useMemo(() => createN8nChatAdapter(), []);

  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState('portfolio-chat-session');
  const [messages, setMessages] = useState<ChatMessage[]>(getInitialMessages(locale));
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedSession = localStorage.getItem(STORAGE_SESSION);
    const nextSession = storedSession || `session-${Math.random().toString(36).slice(2, 10)}`;
    setSessionId(nextSession);
    localStorage.setItem(STORAGE_SESSION, nextSession);

    const storedMessages = localStorage.getItem(STORAGE_MESSAGES);
    if (storedMessages) {
      try {
        const parsed = JSON.parse(storedMessages) as ChatMessage[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      } catch {
        setMessages(getInitialMessages(locale));
      }
    }

    setIsHydrated(true);
  }, [locale]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(STORAGE_MESSAGES, JSON.stringify(messages));
  }, [isHydrated, messages]);

  const clearConversation = () => {
    const fresh = getInitialMessages(locale);
    setMessages(fresh);
    localStorage.setItem(STORAGE_MESSAGES, JSON.stringify(fresh));
  };

  const submit = async (text: string) => {
    const cleanText = text.trim();
    if (!cleanText || sending) return;

    const timestamp = getNowLabel(locale);
    const userMessage = makeMessage('user', cleanText, timestamp);
    const nextHistory = [...messages, userMessage];
    setMessages(nextHistory);
    setInput('');
    setSending(true);

    try {
      const result = await adapter.send({
        conversationId: sessionId,
        message: cleanText,
        locale,
        channel: 'web',
        history: nextHistory,
        capability: 'product',
      });

      setMessages((prev) => [
        ...prev,
        makeMessage('assistant', result.text, getNowLabel(locale)),
      ]);
    } finally {
      setSending(false);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submit(input);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <section className="card flex h-[min(560px,calc(100dvh-5rem))] w-[min(380px,calc(100vw-1.25rem))] flex-col overflow-hidden">
          <header className="flex items-center justify-between border-b border-[color:var(--line)] bg-[color:var(--surface-soft)] px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold text-[color:var(--text)]">{copy.title}</h2>
              <p className="text-xs text-[color:var(--muted)]">{copy.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={copy.launcherClose}
              className="btn-ghost h-8 w-8 p-0 text-sm"
            >
              X
            </button>
          </header>

          <div className="flex items-center justify-between gap-2 border-b border-[color:var(--line)] px-4 py-2">
            <Link href="/chatbot" className="text-xs font-semibold text-[color:var(--accent)] hover:underline">
              {copy.technicalPage}
            </Link>
            <button
              type="button"
              onClick={clearConversation}
              className="text-xs font-semibold text-[color:var(--muted)] hover:text-[color:var(--text)]"
            >
              {copy.clear}
            </button>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto bg-[color:var(--surface)] px-3 py-3">
            {messages.map((message) => (
              <article
                key={message.id}
                className={`max-w-[88%] rounded-2xl border px-3 py-2 text-sm ${
                  message.role === 'user'
                    ? 'ml-auto border-[color:var(--accent)] bg-[color:var(--accent-soft)]'
                    : 'border-[color:var(--line)] bg-[color:var(--surface-soft)]'
                }`}
              >
                <p className="leading-relaxed text-[color:var(--text)]">{message.content}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.08em] text-[color:var(--muted)]">
                  {message.role === 'user' ? copy.you : copy.assistant} - {message.at}
                </p>
              </article>
            ))}

            {sending && (
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-[color:var(--surface-soft)] px-3 py-1.5 text-xs text-[color:var(--muted)]">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                <span>{copy.typing}</span>
              </div>
            )}
          </div>

          <div className="border-t border-[color:var(--line)] bg-[color:var(--surface-soft)] p-3">
            {!messages.some((m) => m.role === 'user') && (
              <div className="mb-2 flex flex-wrap gap-2">
                {PROMPTS[locale].map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void submit(prompt)}
                    className="rounded-full border border-[color:var(--line)] px-2.5 py-1 text-[11px] text-[color:var(--muted)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)]"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={onSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={copy.inputPlaceholder}
                className="h-10 flex-1 rounded-xl border border-[color:var(--line)] bg-[color:var(--surface)] px-3 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)]"
              />
              <button type="submit" className="btn-primary h-10 px-4 text-sm" disabled={sending}>
                {copy.send}
              </button>
            </form>
          </div>
        </section>
      ) : (
        <button
          type="button"
          aria-label={copy.launcherOpen}
          onClick={() => setIsOpen(true)}
          className="btn-primary glow-ring h-16 w-16 rounded-2xl p-0 text-[11px] font-bold shadow-lg leading-tight"
        >
          Chat
        </button>
      )}
    </div>
  );
}
