import { useI18n } from './I18nProvider';

export default function Capabilities() {
  const { t } = useI18n();
  const caps = ['PyQt5', 'PostgreSQL', 'SQL Server', 'LISTEN/NOTIFY', 'Packaging MSI', 'CI/CD', 'Next.js', 'Tailwind'];
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold">{t('caps_title')}</h3>
      <div className="flex flex-wrap gap-2">
        {caps.map((c) => (
          <span key={c} className="badge">{c}</span>
        ))}
      </div>
    </div>
  );
}
