'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type Theme = 'light' | 'dark';

type Ctx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  accent: string;
  setAccent: (c: string) => void;
};

const Ctx = createContext<Ctx | null>(null);
const DEFAULT_ACCENT = '#0891b2';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';

  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark' || storedTheme === 'light') return storedTheme;

  return 'light';
}

function getInitialAccent(): string {
  if (typeof window === 'undefined') return DEFAULT_ACCENT;
  return localStorage.getItem('accent') || DEFAULT_ACCENT;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [accent, setAccentState] = useState<string>(getInitialAccent);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent);
  }, [accent]);

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
    localStorage.setItem('theme', nextTheme);
  }, []);

  const setAccent = useCallback((nextAccent: string) => {
    setAccentState(nextAccent);
    localStorage.setItem('accent', nextAccent);
  }, []);

  const value = useMemo(() => ({ theme, setTheme, accent, setAccent }), [theme, setTheme, accent, setAccent]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useThemeCtx = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useThemeCtx must be used within ThemeProvider');
  return ctx;
};
