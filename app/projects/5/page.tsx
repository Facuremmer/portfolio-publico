'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useI18n } from '@/components/I18nProvider';
import CodeSnippet from '@/components/CodeSnippet';
import CaseOverview from '@/components/CaseOverview';

const SCREENSHOTS = [
  {
    src: '/captures/saas_dashboard.png',
    alt: 'Dashboard con KPIs agronómicos',
    title: 'Dashboard — KPIs agronómicos',
    desc: 'Vista de inicio con métricas de cartera activa, superficie total y evolución de clientes con gráficos nativos (line chart + donut).',
  },
  {
    src: '/captures/saas_rbac.png',
    alt: 'Panel de permisos por rol',
    title: 'RBAC — Permisos por rol',
    desc: 'Matriz de módulos × acciones (Leer / Editar) configurable por rol. Los permisos efectivos se calculan en PostgreSQL y el menú se reconstruye en tiempo real.',
  },
  {
    src: '/captures/saas_updates.png',
    alt: 'Gestión de actualizaciones OTA',
    title: 'OTA — Gestión de actualizaciones',
    desc: 'Panel para publicar versiones por empresa y canal (stable/beta). La columna SHA256 muestra el hash del instalador que la app verifica antes de ejecutar.',
  },
];

export default function AgroSaasPage() {
  const { t } = useI18n();
  const tr = (k: string) => t(`proj_1_${k}`);
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);

  return (
    <main className="container-pro space-y-10 pb-16 pt-10">
      <CaseOverview
        badges={['Python', 'PyQt5', 'PostgreSQL', 'FastAPI', 'Docker', 'WhatsApp API', 'OTA']}
        title={tr('S_title')}
        summary={tr('summary')}
        metrics={[
          { value: 'Multi-tenant', label: 'Aislamiento por company_id' },
          { value: 'SHA256', label: 'Verificación criptográfica OTA' },
          { value: 'WhatsApp', label: 'Cloud API integrada' },
        ]}
        problem={{
          title: tr('problem_title'),
          intro: tr('problem_intro'),
          bullets: [tr('problem_1'), tr('problem_2'), tr('problem_3'), tr('problem_4')],
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

      {/* Snippets técnicos */}
      <section className="space-y-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--text)]">{tr('snippets_title')}</h2>
          <p className="mt-2 text-[color:var(--muted)]">{tr('snippets_intro')}</p>
        </div>

        {/* 1. Realtime Engine */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-[color:var(--text)]">{tr('snip_realtime_title')}</h3>
          <p className="mb-2 text-sm text-[color:var(--muted)]">{tr('snip_realtime_expl')}</p>
          <CodeSnippet title="app/services/realtime.py" language="python">
{`class _PgNotifyThread(threading.Thread):
    """Thread dedicado LISTEN/NOTIFY con reconexión exponencial."""
    daemon = True

    def run(self):
        backoff = 1.0
        while not self._stop.is_set():
            try:
                self._open_and_listen()   # LISTEN app_events, notification_events
                backoff = 1.0             # reset al reconectar con éxito
                self._pump_notifications()
            except Exception as e:
                logger.warning("[realtime] desconectado: %s", e)
                time.sleep(min(backoff, self._reconnect_max_sleep))
                backoff = min(self._reconnect_max_sleep, backoff * 2.0)

    def _pump_notifications(self):
        while not self._stop.is_set():
            if select.select([self._conn], [], [], 1.0) == ([], [], []):
                continue
            self._conn.poll()
            while self._conn.notifies:
                n = self._conn.notifies.pop(0)
                payload = json.loads(n.payload)
                # Aislamiento multi-tenant: descarta eventos de otras empresas
                if int(payload.get("company_id", -1)) != int(self._company_id):
                    continue
                self._on_event({
                    "topic":  payload.get("kind") or payload.get("topic"),
                    "entity": payload.get("entity"),
                    "op":     payload.get("op"),
                    "record": payload.get("record"),
                })`}
          </CodeSnippet>
        </div>

        {/* 2. RBAC SaaS */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-[color:var(--text)]">{tr('snip_perm_title')}</h3>
          <p className="mb-2 text-sm text-[color:var(--muted)]">{tr('snip_perm_expl')}</p>
          <CodeSnippet title="app/services/permissions.py" language="python">
{`def user_can_access_module(company_id: int, user_id: int, module_code: str, action: str = 'read') -> bool:
    role_info = get_user_role_info(company_id, user_id)
    app_role = role_info.app_role.strip().lower()

    # Nivel 1 — Super Admin: acceso total
    if app_role == "super_admin":
        return True

    # Nivel 2 — Admin de empresa: módulos core + paquete contratado
    if app_role == "admin":
        return _module_is_core(module_code) or company_has_module(company_id, module_code)

    # Nivel 3 — Usuario regular: verifica paquete y luego permisos efectivos
    if not company_has_module(company_id, module_code):
        return False                          # empresa no contrató el módulo

    ep = get_effective_permission(company_id, user_id, module_code)
    if not ep:
        return False
    return {"create": ep.can_create, "read": ep.can_read,
            "update": ep.can_update, "delete": ep.can_delete}.get(action, False)


def company_has_module(company_id: int, module_code: str) -> bool:
    """Delega la verificación a una función PostgreSQL para evitar N+1 queries."""
    row = Database.fetch_one("SELECT public.company_has_module(%s,%s) AS ok", (company_id, module_code))
    return bool(row and row["ok"])`}
          </CodeSnippet>
        </div>

        {/* 3. OTA Updater */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-[color:var(--text)]">OTA Updater — descarga, SHA256 y actualizaciones obligatorias</h3>
          <p className="mb-2 text-sm text-[color:var(--muted)]">
            Cada empresa tiene su propio canal de actualizaciones (stable/beta) en la DB. Al iniciar, la app consulta la versión disponible, descarga el instalador, verifica el hash SHA256 byte a byte y — si la actualización es obligatoria — bloquea el acceso hasta que se complete.
          </p>
          <CodeSnippet title="app/services/update_service.py" language="python">
{`def check_latest_for_company(company_id: int, channel: str = "stable") -> dict | None:
    """Versión disponible por empresa y canal desde la DB (timeout 1.5s)."""
    return Database.fetch_one("""
        SELECT version, url, sha256, mandatory, notes
        FROM app_update
        WHERE company_id = %s AND channel = %s AND active = TRUE
        ORDER BY release_date DESC LIMIT 1
    """, (company_id, channel), ms=1500)

def start_update(parent, latest: dict, mandatory: bool = False) -> None:
    """Descarga el .exe con barra de progreso, verifica SHA256 y lo lanza."""
    url, expected_hash = latest["url"], latest["sha256"]
    tmp_path = _tmp_dir(latest["company_id"], latest["version"])

    _download_with_progress(parent, url, tmp_path)   # QProgressDialog

    # Verificación criptográfica antes de ejecutar
    actual = hashlib.sha256(Path(tmp_path).read_bytes()).hexdigest()
    if actual != expected_hash:
        raise ValueError(f"SHA256 mismatch: {actual} != {expected_hash}")

    subprocess.Popen([tmp_path])    # lanza el instalador
    if mandatory:
        os._exit(0)                 # cierra la app sin permitir continuar`}
          </CodeSnippet>
        </div>
      </section>

      {/* Capturas */}
      <section className="space-y-6">
        <div>
          <p className="section-label">Interfaz real</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[color:var(--text)]">
            Capturas de la aplicación
          </h2>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            Instancia de demostración — sin datos de producción.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {SCREENSHOTS.map((s) => (
            <div key={s.src} className="card overflow-hidden p-0">
              <button
                type="button"
                className="relative block h-44 w-full cursor-zoom-in bg-[color:var(--surface-soft)]"
                onClick={() => setLightbox({ src: s.src, title: s.title })}
                aria-label={`Ampliar: ${s.title}`}
              >
                <Image src={s.src} alt={s.alt} fill className="object-cover object-top transition-opacity hover:opacity-90" sizes="(max-width: 768px) 100vw, 33vw" />
                <span className="absolute bottom-2 right-2 rounded-md bg-black/50 px-2 py-0.5 text-[10px] text-white">click para ampliar</span>
              </button>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-[color:var(--text)]">{s.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-[color:var(--muted)]">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Estructura */}
      <section className="card p-6 md:p-8 space-y-4">
        <h2 className="text-xl font-semibold text-[color:var(--text)]">{tr('structure_title')}</h2>
        <pre className="overflow-x-auto rounded-lg bg-[#0a1120] p-4 text-xs leading-relaxed text-[#dce9ff] sm:text-sm">
{`saas_agro/
  ├── main.py
  └── app/
       ├── api/
       │    └── geo_api/              # FastAPI microservicio geolocalización
       │         ├── main.py          # Routes: parcelas, campos, coordenadas
       │         └── security.py     # API key validation
       ├── gui/
       │    ├── frames/               # Módulos: clientes, cotizaciones, accesos…
       │    └── widgets/              # Kit de componentes Qt reutilizables
       ├── services/
       │    ├── realtime.py           # LISTEN/NOTIFY + filtro por company_id
       │    ├── permissions.py        # RBAC 3-tier + paquetes contratados
       │    ├── update_service.py     # OTA: SHA256 + actualizaciones obligatorias
       │    ├── wa_sender.py          # WhatsApp Cloud API (templates + media)
       │    └── connectivity_bus.py   # Eventos de red → UI (online/offline)
       └── utils/
            └── connection.py         # Pool resiliente + statement_timeout`}
        </pre>
        <p className="text-sm text-[color:var(--muted)]">{tr('structure_note')}</p>
      </section>

      <div className="border-t border-[color:var(--line)] pt-8">
        <Link href="/#proyectos" className="btn-ghost inline-flex items-center gap-2">
          ← {tr('back_to_projects')}
        </Link>
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={() => setLightbox(null)}>
          <div className="relative max-h-[90vh] max-w-[95vw]" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setLightbox(null)} className="absolute -right-3 -top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white text-black shadow-lg text-sm font-bold" aria-label="Cerrar">✕</button>
            <Image src={lightbox.src} alt={lightbox.title} width={1400} height={800} className="rounded-xl object-contain shadow-2xl" style={{ maxHeight: '88vh', width: 'auto' }} />
            <p className="mt-2 text-center text-xs text-white/70">{lightbox.title}</p>
          </div>
        </div>
      )}
    </main>
  );
}
