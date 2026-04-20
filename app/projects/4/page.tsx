'use client';

import Link from 'next/link';
import { useI18n } from '@/components/I18nProvider';
import CodeSnippet from '@/components/CodeSnippet';
import CaseOverview from '@/components/CaseOverview';

export default function FintechPlatformPage() {
  const { t } = useI18n();
  const tr = (k: string) => t(`proj_portfolio_${k}`);

  return (
    <main className="container-pro space-y-10 pb-16 pt-10">
      <CaseOverview
        badges={['Next.js 14', 'Supabase', 'TypeScript', 'AES-256', 'NDA']}
        title={t('proj_portfolio_title')}
        summary={tr('summary')}
        metrics={[
          { value: 'AES-256-GCM', label: 'Encriptación KYC' },
          { value: 'RLS', label: 'Row Level Security' },
          { value: '7 templates', label: 'Email transaccional' },
        ]}
        problem={{
          title: tr('problem_title'),
          intro: tr('problem_intro'),
          bullets: [tr('problem_1'), tr('problem_2'), tr('problem_3')],
        }}
        decision={{
          title: 'Decisión técnica',
          intro: tr('solution_intro'),
          bullets: [tr('solution_1'), tr('solution_2')],
        }}
        results={{
          title: 'Resultados',
          bullets: [tr('solution_3'), tr('solution_4')],
        }}
      />

      {/* Snippets */}
      <section className="space-y-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--text)]">
            {t('snippets_title')}
          </h2>
          <p className="mt-2 text-[color:var(--muted)]">{t('snippets_intro')}</p>
        </div>

        {/* 1. AES-256-GCM */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-[color:var(--text)]">
            {tr('snip_hook_title')}
          </h3>
          <p className="mb-2 text-sm text-[color:var(--muted)]">{tr('snip_hook_expl')}</p>
          <CodeSnippet title="utils/crypto.ts" language="typescript">
{`import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const ALGORITHM = 'aes-256-gcm';

export function encrypt(plaintext: string, key: Buffer): string {
  const iv = randomBytes(12); // GCM: 96-bit IV recomendado
  const cipher = createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag(); // GHASH de autenticidad

  // Empaquetado: iv (12B) + authTag (16B) + ciphertext
  return Buffer.concat([iv, authTag, encrypted]).toString('base64');
}

export function decrypt(ciphertext: string, key: Buffer): string {
  const data = Buffer.from(ciphertext, 'base64');
  const iv        = data.subarray(0, 12);
  const authTag   = data.subarray(12, 28);
  const encrypted = data.subarray(28);

  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  return Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]).toString('utf8');
}`}
          </CodeSnippet>
        </div>

        {/* 2. RLS */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-[color:var(--text)]">
            {tr('snip_i18n_title')}
          </h3>
          <p className="mb-2 text-sm text-[color:var(--muted)]">{tr('snip_i18n_expl')}</p>
          <CodeSnippet title="supabase/migrations/rls_loans.sql" language="sql">
{`-- Habilitar RLS en la tabla de préstamos
ALTER TABLE loans ENABLE ROW LEVEL SECURITY;

-- Clientes: solo ven sus propios préstamos
CREATE POLICY "clients_see_own_loans"
  ON loans FOR SELECT
  USING (auth.uid() = client_id);

-- Admins: acceso total
CREATE POLICY "admins_full_access"
  ON loans FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Audit log automático en cada modificación
CREATE TRIGGER audit_loans_changes
  AFTER INSERT OR UPDATE OR DELETE ON loans
  FOR EACH ROW EXECUTE FUNCTION log_audit_event();`}
          </CodeSnippet>
        </div>
      </section>

      {/* Confidential */}
      <section className="card border-l-4 border-[color:var(--accent)] p-6 md:p-8">
        <p className="section-label">Confidencialidad</p>
        <h2 className="mt-1 text-xl font-semibold text-[color:var(--text)]">Proyecto bajo NDA</h2>
        <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">
          Esta plataforma está en uso activo. Por acuerdo de privacidad no se publican capturas reales
          de la interfaz, datos de clientes ni acceso al repositorio. Los snippets de código han sido
          extraídos y anonimizados para demostración técnica.
        </p>
      </section>

      <div className="border-t border-[color:var(--line)] pt-8">
        <Link href="/#proyectos" className="btn-ghost inline-flex items-center gap-2">
          ← {t('back_to_projects')}
        </Link>
      </div>
    </main>
  );
}
