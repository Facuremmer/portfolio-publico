export default function Footer() {
  return (
    <footer className="container-pro pb-10 pt-4">
      <div className="flex flex-col gap-2 border-t border-[color:var(--line)] pt-5 text-xs text-[color:var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Facundo Remmer</span>
        <span>AI Engineer · Full Stack Developer</span>
      </div>
    </footer>
  );
}
