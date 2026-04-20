'use client';

import { useI18n } from './I18nProvider';

export default function LangSwitch() {
  const { lang, setLang } = useI18n();

  return (
    <div className="inline-flex rounded-xl border border-[color:var(--line)] bg-[color:var(--surface-soft)] p-1">
      <button
        type="button"
        className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
          lang === 'es'
            ? 'bg-[var(--accent)] text-white'
            : 'text-[color:var(--muted)] hover:text-[color:var(--text)]'
        }`}
        onClick={() => setLang('es')}
        aria-label="Español"
      >
        ES
      </button>
      <button
        type="button"
        className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
          lang === 'en'
            ? 'bg-[var(--accent)] text-white'
            : 'text-[color:var(--muted)] hover:text-[color:var(--text)]'
        }`}
        onClick={() => setLang('en')}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
