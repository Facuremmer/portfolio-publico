'use client';

import { useState } from 'react';
import { useI18n } from './I18nProvider';

type Props = {
  title?: string;
  filename?: string;
  language?: string;
  children: string;
};

export default function CodeSnippet({ title, filename, language = 'txt', children }: Props) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="card mb-6 overflow-hidden p-0">
      {(title || filename) && (
        <div className="flex items-center justify-between border-b border-[color:var(--line)] bg-[color:var(--surface-soft)] px-4 py-2.5">
          <div className="text-sm text-[color:var(--muted)]">
            {title && <strong className="text-[color:var(--text)]">{title}</strong>}
            {filename && <span className="ml-2">{filename}</span>}
          </div>
          <button type="button" onClick={onCopy} className="btn-ghost px-2.5 py-1 text-xs">
            {copied ? t('copy_toast') || 'Copied' : t('copy_btn') || 'Copy'}
          </button>
        </div>
      )}
      <pre className="overflow-x-auto bg-[#0a1120] p-4 text-sm leading-relaxed text-[#dce9ff]">
        <code className={`language-${language}`}>{children}</code>
      </pre>
    </div>
  );
}
