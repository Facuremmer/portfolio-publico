'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useI18n } from '@/components/I18nProvider';

export default function Hero() {
  const { t } = useI18n();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="card p-6 md:p-8 relative">
        <div className="grid gap-6 md:grid-cols-[auto,1fr] md:gap-8 items-center">
          {/* Foto de Perfil */}
          <div className="flex items-start">
            <div className="relative h-28 w-28 overflow-hidden rounded-full ring-4 ring-[var(--accent)]/20 md:h-32 md:w-32 shadow-xl">
              <Image
                src="/me.png" // Asegurate de que esta imagen exista en public/
                alt="Facundo Remmer"
                fill
                sizes="128px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Textos */}
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold md:text-4xl text-[var(--foreground)]">
                Facundo Remmer
              </h1>
              <p className="mt-2 text-lg font-medium text-[var(--accent)]">
                {t('hero_headline')}
              </p>
            </div>

            <p className="max-w-2xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {t('hero_subheadline')}
            </p>

            {/* Botones de Acción */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a 
                href="#proyectos" 
                className="rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[var(--accent)]/20 transition hover:opacity-90 hover:scale-[1.02] active:scale-95"
              >
                {t('cta_projects')}
              </a>

              {/* Botón que ABRE el modal (No descarga directo) */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-5 py-2.5 text-sm font-medium transition hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2 cursor-pointer"
              >
                📄 {t('cta_download_cv')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- MODAL DE DESCARGA DE CV --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-6 w-full max-w-sm border border-neutral-200 dark:border-neutral-800 scale-100 animate-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
          >
            {/* Título */}
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
              {t('cv_modal_title')}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-sm">
              {t('cv_modal_desc')}
            </p>

            {/* Opciones */}
            <div className="space-y-3">
              <a
                href="/cv_es.pdf"
                download="CV_Facundo_Remmer_ES.pdf"
                className="flex items-center justify-center w-full p-3 rounded-xl border-2 border-[var(--accent)]/20 hover:border-[var(--accent)] bg-[var(--accent)]/5 hover:bg-[var(--accent)]/10 transition text-[var(--accent)] font-semibold"
                onClick={() => setIsModalOpen(false)} // Cierra al hacer clic
              >
                🇪🇸 {t('cv_option_es')}
              </a>

              <a
                href="/cv_en.pdf"
                download="CV_Facundo_Remmer_EN.pdf"
                className="flex items-center justify-center w-full p-3 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition text-neutral-700 dark:text-neutral-300 font-medium"
                onClick={() => setIsModalOpen(false)}
              >
                🇺🇸 {t('cv_option_en')}
              </a>
            </div>

            {/* Botón Cancelar */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-6 w-full text-center text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition underline-offset-2 hover:underline"
            >
              {t('cv_cancel')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
