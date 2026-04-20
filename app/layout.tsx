import type { Metadata } from 'next';
import { Manrope, Syne, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { UiProvider } from '@/components/UiProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import AppShell from '@/components/AppShell';
import { I18nProvider } from '@/components/I18nProvider';

const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Facundo Remmer - Portfolio',
  description: 'AI Engineer and Full Stack Developer portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body>
        <UiProvider>
          <ThemeProvider>
            <I18nProvider>
              <AppShell>{children}</AppShell>
            </I18nProvider>
          </ThemeProvider>
        </UiProvider>
      </body>
    </html>
  );
}
