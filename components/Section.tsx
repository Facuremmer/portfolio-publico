export default function Section({
  id,
  title,
  label,
  subtitle,
  children,
  className,
}: {
  id?: string;
  title: string;
  label?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-12 md:py-16 ${className ?? ''}`}>
      <div className="mb-8 md:mb-10">
        {label && <p className="section-label">{label}</p>}
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[color:var(--text)] md:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[color:var(--muted)]">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
