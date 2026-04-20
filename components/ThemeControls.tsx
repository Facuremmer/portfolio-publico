'use client';

import { useEffect, useRef, useState } from 'react';
import { useThemeCtx } from './ThemeProvider';

const ACCENTS = [
  { color: '#0f4c81', label: 'Azul' },
  { color: '#7c3aed', label: 'Violeta' },
  { color: '#0891b2', label: 'Cyan' },
  { color: '#059669', label: 'Verde' },
  { color: '#dc2626', label: 'Rojo' },
  { color: '#d97706', label: 'Naranja' },
];

export default function ThemeControls() {
  const { theme, setTheme, accent, setAccent } = useThemeCtx();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isDark = theme === 'dark';

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="flex items-center gap-2">
      {/* Color picker */}
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="btn-ghost flex items-center gap-2"
          aria-label="Color de acento"
        >
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: accent }}
            suppressHydrationWarning
          />
          <span className="text-sm">Color</span>
        </button>

        {open && (
          <div
            className="absolute right-0 top-full z-50 mt-2 rounded-xl border border-[color:var(--line)] bg-[color:var(--surface)] p-3 shadow-lg"
            style={{ minWidth: '200px' }}
          >
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-[color:var(--muted)]">
              Acento
            </p>
            <div className="grid grid-cols-6 gap-2">
              {ACCENTS.map(({ color, label }) => (
                <button
                  key={color}
                  type="button"
                  aria-label={label}
                  onClick={() => { setAccent(color); setOpen(false); }}
                  title={label}
                  className="h-6 w-6 rounded-full transition-transform hover:scale-110"
                  style={{
                    backgroundColor: color,
                    outline: accent === color ? `2px solid ${color}` : 'none',
                    outlineOffset: '2px',
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tema */}
      <button
        type="button"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className="btn-ghost"
        aria-label="Cambiar tema"
      >
        {isDark ? '☀︎' : '☾'}
      </button>
    </div>
  );
}
