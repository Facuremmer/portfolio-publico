'use client';

import Link from "next/link";
import { useI18n } from '@/components/I18nProvider';
import CodeSnippet from '@/components/CodeSnippet';
import CaseOverview from '@/components/CaseOverview';

export default function InternalMgmtPage() {
  const { t } = useI18n();
  const tr = (k: string) => t(`proj_3_${k}`);

  return (
    <main className="container-pro space-y-10 pb-16 pt-10">
      <CaseOverview
        badges={['Python', 'PyQt5', 'PostgreSQL', 'LISTEN/NOTIFY', 'RBAC', 'Multithreading']}
        title={tr("title")}
        summary={tr("summary")}
        metrics={[
          { value: '10', label: 'Usuarios simultáneos vía VPN' },
          { value: 'Real-time', label: 'LISTEN/NOTIFY sin polling' },
          { value: 'RBAC', label: 'Permisos granulares por módulo' },
        ]}
        problem={{
          title: tr("problem_title"),
          intro: tr("problem_intro"),
          bullets: [tr("problem_1"), tr("problem_2"), tr("problem_3")],
        }}
        decision={{
          title: 'Decisión técnica',
          intro: 'Aplicación centralizada con sincronización en tiempo real entre sesiones, permisos configurables desde la base de datos y reconexión automática ante caídas de red.',
          bullets: [
            'Real-time via LISTEN/NOTIFY: los cambios de un usuario se propagan al resto en milisegundos, sin polling.',
            'RBAC dinámico: módulos y acciones configurables desde la DB — agregar un permiso es una fila, sin tocar código.',
          ],
        }}
        results={{
          title: 'Resultados',
          bullets: [tr("solution_3"), tr("solution_4")],
        }}
      />

      {/* Snippets */}
      <section className="space-y-8">
        <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--text)]">{tr("snippets_title")}</h2>
            <p className="text-[color:var(--muted)] mt-2">{tr("snippets_intro")}</p>
        </div>

        {/* 1. LISTEN/NOTIFY */}
        <div className="space-y-3">
            <h3 className="text-lg font-semibold tracking-tight text-[color:var(--text)]">Real-time sync — PostgreSQL LISTEN/NOTIFY</h3>
            <p className="text-sm text-[color:var(--muted)] mb-2">
                El listener corre en un hilo separado y emite una señal Qt (<code>pyqtSignal</code>) al recibir un NOTIFY — lo que actualiza la UI de forma thread-safe sin polling. Si la conexión se cae, reconecta automáticamente.
            </p>
            <CodeSnippet
              title="app/services/notifications_listener.py"
              language="python"
            >
{`class Notification_listener(QObject):
    nuevaNotificacion = pyqtSignal(dict)  # señal Qt — segura entre hilos

    def run(self):
        while self._running:
            try:
                conn = self._connect()   # LISTEN canal_notificaciones
                self._conn = conn
                while self._running:
                    # select() bloquea 5s — 0% CPU en espera
                    if select.select([conn], [], [], 5) == ([], [], []):
                        continue
                    conn.poll()
                    while conn.notifies:
                        notify = conn.notifies.pop(0)
                        data = json.loads(notify.payload)
                        self.nuevaNotificacion.emit(data)  # → actualiza la UI
            except Exception:
                if self._running:
                    time.sleep(_RECONNECT_DELAY)  # reconexión automática`}
            </CodeSnippet>
        </div>

        {/* 2. Connection Pool */}
        <div className="space-y-3">
            <h3 className="text-lg font-semibold tracking-tight text-[color:var(--text)]">Pool de conexiones thread-safe + transacciones atómicas</h3>
            <p className="text-sm text-[color:var(--muted)] mb-2">
                <code>ThreadedConnectionPool</code> de psycopg2 maneja las 10 sesiones simultáneas. Ante una conexión rota (<code>InterfaceError</code>), la descarta del pool y reintenta solo. El context manager <code>transaction()</code> garantiza commit/rollback automático en operaciones multi-query.
            </p>
            <CodeSnippet
              title="app/utils/Connection_BD.py"
              language="python"
            >
{`class DatabaseConnection:
    def __init__(self, ...):
        self._pool = ThreadedConnectionPool(min_conn=2, max_conn=8, **self._params)

    def execute_query(self, query, params=None):
        conn = self._pool.getconn()
        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(query, params)
                result = cur.fetchall() if is_select else None
            if not is_select:
                conn.commit()
            return result
        except psycopg2.InterfaceError:
            self._pool.putconn(conn, close=True)   # descarta la conexión rota
            return self.execute_query(query, params)  # reintenta una vez
        finally:
            self._pool.putconn(conn)

    @contextmanager
    def transaction(self):
        """Operaciones multi-query atómicas — commit/rollback automático."""
        conn = self._pool.getconn()
        try:
            yield conn
            conn.commit()
        except Exception:
            conn.rollback()
            raise
        finally:
            self._pool.putconn(conn)`}
            </CodeSnippet>
        </div>

        {/* 3. RBAC */}
        <div className="space-y-3">
            <h3 className="text-lg font-semibold tracking-tight text-[color:var(--text)]">RBAC con dos capas — roles + overrides por empleado</h3>
            <p className="text-sm text-[color:var(--muted)] mb-2">
                Los permisos tienen dos capas: permisos base por rol y overrides individuales por empleado. El chequeo final (<code>app_can</code>) y el menú de navegación los resuelve PostgreSQL con funciones almacenadas — la app solo consume el resultado.
            </p>
            <CodeSnippet
              title="app/services/access_control_repo.py"
              language="python"
            >
{`def app_can(self, employee_id: int, module_key: str, action: str = "read") -> bool:
    """Delega el chequeo a una función almacenada en PostgreSQL."""
    result = self._read_with_fallback(
        ["SELECT app_can(%s, %s, %s) AS allowed"],
        (employee_id, module_key, action)
    )
    return bool(result[0].get("allowed", False)) if result else False

def get_menu_for_employee(self, employee_id: int) -> list:
    """El menú de navegación lo construye PostgreSQL según permisos efectivos."""
    return self._read_with_fallback(
        ["SELECT module_key, module_name, frame_name, sort_order "
         "FROM get_menu_for_employee(%s)"],
        (employee_id,)
    )

def get_effective_permissions(self, employee_id: int) -> list:
    """Vista que resuelve rol base + overrides individuales en un solo query."""
    return self._read_with_fallback(
        ["SELECT module_key, can_create, can_read, can_update, can_delete, source "
         "FROM v_employee_effective_permissions WHERE employee_id = %s"],
        (employee_id,)
    )`}
            </CodeSnippet>
        </div>
      </section>

      {/* AVISO DE CONFIDENCIALIDAD */}
      <section className="card border-l-2 border-l-[color:var(--accent)] p-8 text-center">
        <h3 className="text-lg font-semibold text-[color:var(--text)] mb-2">
            {tr("confidential_title")}
        </h3>
        <p className="text-sm text-[color:var(--muted)] max-w-xl mx-auto leading-relaxed">
            {tr("confidential_desc")}
        </p>
      </section>

      {/* Estructura LÃ³gica */}
      <section className="card p-6 md:p-8 space-y-4">
        <h2 className="text-xl font-semibold">{tr("structure_title")}</h2>
        <pre className="overflow-x-auto rounded-lg bg-[#0a1120] p-4 text-xs leading-relaxed text-[#dce9ff] sm:text-sm">
{`gestion_interna/
  ├── main.py
  └── app/
       ├── core/
       │    ├── settings.py            # Configuración y variables de entorno
       │    └── resources.py           # Assets e íconos empaquetados
       ├── gui/
       │    ├── windows/
       │    │    ├── main_window.py    # Shell principal + navegación
       │    │    └── login_window.py   # Autenticación con token
       │    ├── frames/                # +20 módulos: proyectos, KPIs, permisos…
       │    └── widgets/               # Kit de componentes reutilizables (PyQt5)
       ├── services/
       │    ├── notifications_listener.py  # LISTEN/NOTIFY daemon thread
       │    ├── access_control_repo.py     # RBAC — carga permisos desde DB
       │    └── permission_reminder_worker.py
       ├── integrations/
       │    └── drive_client.py        # Google Drive (documentos)
       └── utils/
            ├── Connection_BD.py       # Pool + reconexión con backoff
            └── workers.py`}
        </pre>
        <p className="text-sm text-[color:var(--muted)] mt-2">{tr("structure_note")}</p>
      </section>

      <Link href="/#proyectos" className="btn-ghost inline-flex items-center gap-2">← {tr("back_to_projects")}
      </Link>
    </main>
  );
}
