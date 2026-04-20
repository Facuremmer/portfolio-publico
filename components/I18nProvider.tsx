'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { DICS, type Lang, type Dict } from '@/data/dictionary';

type Ctx = { lang: Lang; t: (k: keyof Dict) => string; setLang: (l: Lang) => void };
const Ctx = createContext<Ctx | null>(null);

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'es';
  const stored = localStorage.getItem('lang');
  return stored === 'en' ? 'en' : 'es';
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const setLang = useCallback((nextLang: Lang) => {
    setLangState(nextLang);
    localStorage.setItem('lang', nextLang);
  }, []);

  const t = useCallback(
    (key: keyof Dict) => DICS[lang][key] ?? String(key),
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useI18n = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
};
