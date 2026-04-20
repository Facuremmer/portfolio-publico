'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';

type UiCtx = {
  /** Estado principal del sidebar */
  sidebarOpen: boolean;
  /** Setter directo (útil para animaciones/compatibilidad) */
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  /** Helpers semánticos */
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;

  /** === Aliases de compatibilidad (por si algún componente viejo los usa) === */
  isSidebarOpen: boolean;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Ctx = createContext<UiCtx | null>(null);

export function UiProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // IMPORTANTE: No bloquear el scroll del documento.
  // Si antes tenías overflow hidden en <html>/<body>, quitarlo de aquí.

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);
  const toggleSidebar = () => setSidebarOpen((v) => !v);

  const value = useMemo<UiCtx>(
    () => ({
      sidebarOpen,
      setSidebarOpen,
      openSidebar,
      closeSidebar,
      toggleSidebar,

      // Aliases
      isSidebarOpen: sidebarOpen,
      menuOpen: sidebarOpen,
      setMenuOpen: setSidebarOpen,
    }),
    [sidebarOpen]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useUi = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useUi must be used within UiProvider');
  return ctx;
};
