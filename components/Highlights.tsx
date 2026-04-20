import { useI18n } from './I18nProvider';

export default function Highlights() {
  const { t } = useI18n();
  const items = [t('hi_perf'), t('hi_pack'), t('hi_rt')];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((it, i) => (
        <div key={i} className="card p-5 text-sm">
          <div className="mb-2 h-2 w-10 rounded-full bg-[var(--accent)]" />
          <p className="text-neutral-700 dark:text-neutral-300">{it}</p>
        </div>
      ))}
    </div>
  );
}
