'use client';

import Link from 'next/link';
import { useI18n } from './I18nProvider';
import { useUi } from './UiProvider';

export default function Offcanvas() {
  const { t, lang } = useI18n();
  const { sidebarOpen, toggleSidebar, closeSidebar } = useUi();

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        onClick={toggleSidebar}
        className="btn-ghost h-10 w-10 p-0 md:hidden"
      >
        <span className="relative block h-3.5 w-4">
          <span className="absolute inset-x-0 top-0 h-[1.5px] bg-current" />
          <span className="absolute inset-x-0 top-[6px] h-[1.5px] bg-current" />
          <span className="absolute inset-x-0 top-[12px] h-[1.5px] bg-current" />
        </span>
      </button>

      <div
        className={`fixed inset-0 z-40 bg-black/35 backdrop-blur-sm transition ${
          sidebarOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        } md:hidden`}
        onClick={closeSidebar}
      />

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 border-r border-[color:var(--line)] bg-[color:var(--surface)] p-5 transition-transform duration-300 md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm font-semibold tracking-wide text-[color:var(--muted)]">Navegación</p>
          <button type="button" aria-label="Close menu" onClick={closeSidebar} className="btn-ghost h-9 w-9 p-0">
            ✕
          </button>
        </div>

        <nav className="space-y-1 text-sm">
          <Item href="/#about" label={t('nav_about') ?? 'About'} onClick={closeSidebar} />
          <Item href="/#skills" label={t('nav_skills') ?? 'Skills'} onClick={closeSidebar} />
          <Item href="/#proyectos" label={t('nav_projects') ?? 'Projects'} onClick={closeSidebar} />
          <Item href="/chatbot" label={lang === 'es' ? 'Chatbot IA' : 'AI Chatbot'} onClick={closeSidebar} />
          <Item href="/#contacto" label={t('nav_contact') ?? 'Contact'} onClick={closeSidebar} />
        </nav>
      </aside>
    </>
  );
}

function Item({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block rounded-lg px-3 py-2 font-medium text-[color:var(--text)] transition hover:bg-[color:var(--accent-soft)]"
      scroll
    >
      {label}
    </Link>
  );
}
