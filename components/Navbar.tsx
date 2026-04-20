'use client';

import Link from 'next/link';
import { useI18n } from './I18nProvider';
import LangSwitch from './LangSwitch';
import ThemeControls from './ThemeControls';
import Offcanvas from './Offcanvas';

export default function Navbar() {
  const { t, lang } = useI18n();

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-[color:var(--line)] bg-[color:color-mix(in_oklab,var(--surface)_86%,transparent)] backdrop-blur">
        <div className="container-pro flex h-16 items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Offcanvas />
            <Link href="/#about" className="font-semibold tracking-[0.12em] text-[13px] uppercase text-[color:var(--text)]">
              Facundo Remmer
            </Link>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            <NavLink href="/#about" label={t('nav_about') ?? 'About'} />
            <NavLink href="/#skills" label={t('nav_skills') ?? 'Skills'} />
            <NavLink href="/#proyectos" label={t('nav_projects') ?? 'Projects'} />
<NavLink href="/#contacto" label={t('nav_contact') ?? 'Contact'} />
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/cv" className="btn-primary hidden sm:inline-flex">
              {t('cta_download_cv') ?? 'View CV'}
            </Link>
            <LangSwitch />
            <ThemeControls />
          </div>
        </div>
      </header>

    </>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="rounded-lg px-3 py-2 text-sm font-medium text-[color:var(--muted)] transition hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--text)]">
      {label}
    </a>
  );
}
