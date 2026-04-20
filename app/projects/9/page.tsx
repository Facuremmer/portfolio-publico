'use client';

import Link from 'next/link';
import { useI18n } from '@/components/I18nProvider';
import CodeSnippet from '@/components/CodeSnippet';
import CaseOverview from '@/components/CaseOverview';

export default function PythonSaasBasePage() {
  const { t } = useI18n();
  const tr = (k: string) => t(`proj_base_${k}`);

  return (
    <main className="container-pro space-y-10 pb-16 pt-10">
      <CaseOverview
        badges={['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'JWT', 'RBAC', 'Open Source']}
        title={tr('title')}
        summary={tr('summary')}
        metrics={[
          { value: 'JWT', label: 'Auth con roles' },
          { value: 'Docker', label: 'Un comando para levantar' },
          { value: 'Open Source', label: 'Código público en GitHub' },
        ]}
        problem={{
          title: tr('problem_title'),
          intro: tr('problem_intro'),
          bullets: [tr('problem_1'), tr('problem_2'), tr('problem_3')],
        }}
        decision={{
          title: 'Decisión de diseño',
          intro: tr('solution_intro'),
          bullets: [tr('solution_1'), tr('solution_2')],
        }}
        results={{
          title: 'Patrones implementados',
          bullets: [tr('solution_3'), tr('solution_4')],
        }}
        actions={
          <a
            href="https://github.com/Facuremmer/python-saas-base"
            target="_blank"
            rel="noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            Ver código en GitHub →
          </a>
        }
      />

      {/* Snippets */}
      <section className="space-y-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--text)]">
            Snippets de arquitectura
          </h2>
          <p className="mt-2 text-[color:var(--muted)]">
            Los módulos centrales del template: auth, permisos y base de datos.
          </p>
        </div>

        {/* RBAC */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-[color:var(--text)]">
            {tr('snip_rbac_title')}
          </h3>
          <p className="mb-2 text-sm text-[color:var(--muted)]">{tr('snip_rbac_expl')}</p>
          <CodeSnippet title="core/permissions.py" language="python">
{`ROLE_PERMISSIONS: dict[str, set[str]] = {
    'superadmin': {'users.read', 'users.write', 'users.delete'},
    'admin':      {'users.read', 'users.write'},
    'user':       {'users.read'},
}

def can(role: str, permission: str) -> bool:
    return permission in ROLE_PERMISSIONS.get(role, set())

def require_permission(permission: str):
    """FastAPI dependency — raises 403 if role lacks the permission."""
    def dependency(current_user: dict = Depends(get_current_user)):
        if not can(current_user['role'], permission):
            raise HTTPException(status_code=403, detail='Forbidden')
        return current_user
    return dependency`}
          </CodeSnippet>
        </div>

        {/* Pool PostgreSQL */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-[color:var(--text)]">
            {tr('snip_pool_title')}
          </h3>
          <p className="mb-2 text-sm text-[color:var(--muted)]">{tr('snip_pool_expl')}</p>
          <CodeSnippet title="core/database.py" language="python">
{`@contextmanager
def get_conn():
    conn = _pool.getconn()
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        _pool.putconn(conn)  # always returns to pool

def fetch_one(query: str, params=()) -> dict | None:
    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, params)
            return cur.fetchone()

def is_alive() -> bool:
    try:
        fetch_one('SELECT 1')
        return True
    except Exception:
        return False`}
          </CodeSnippet>
        </div>

        {/* JWT */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-[color:var(--text)]">
            Auth JWT (core/security.py)
          </h3>
          <p className="mb-2 text-sm text-[color:var(--muted)]">
            Token HS256 con expiración configurable. La dependencia <code>get_current_user</code> se inyecta en cualquier ruta con <code>Depends()</code>.
          </p>
          <CodeSnippet title="core/security.py" language="python">
{`def create_access_token(user_id: int, role: str) -> str:
    s = get_settings()
    expire = datetime.now(timezone.utc) + timedelta(minutes=s.api_token_expire_minutes)
    payload = {'sub': str(user_id), 'role': role, 'exp': expire}
    return jwt.encode(payload, s.api_secret_key, algorithm='HS256')

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)
) -> dict:
    """FastAPI dependency — returns decoded token payload."""
    return decode_token(credentials.credentials)`}
          </CodeSnippet>
        </div>
      </section>

      {/* Estructura */}
      <section className="card p-6 md:p-8 space-y-4">
        <h2 className="text-xl font-semibold text-[color:var(--text)]">Estructura del proyecto</h2>
        <pre className="overflow-x-auto rounded-lg bg-[#0a1120] p-4 text-xs leading-relaxed text-[#dce9ff] sm:text-sm">
{`python-saas-base/
  ├── core/
  │    ├── config.py       # Pydantic BaseSettings — vars desde .env
  │    ├── database.py     # SimpleConnectionPool + context manager
  │    ├── security.py     # bcrypt hash/verify + JWT create/decode
  │    └── permissions.py  # RBAC: ROLE_PERMISSIONS + require_permission()
  ├── api/
  │    ├── main.py         # FastAPI app + lifespan (pool init/close)
  │    └── routes/
  │         ├── health.py  # GET /health → {status, database}
  │         ├── auth.py    # POST /auth/token → JWT
  │         └── users.py   # GET/POST/DELETE /users con RBAC
  ├── sql/
  │    └── init.sql        # Schema + superadmin seed
  ├── docker-compose.yml   # postgres:16-alpine + api
  ├── Dockerfile           # python:3.12-slim
  └── requirements.txt`}
        </pre>
      </section>

      {/* GitHub CTA */}
      <section className="card border-l-4 border-[color:var(--accent)] p-6 md:p-8">
        <p className="section-label">Open Source</p>
        <h2 className="mt-1 text-xl font-semibold text-[color:var(--text)]">Código disponible en GitHub</h2>
        <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">
          Template limpio, sin lógica de negocio. Clonás, configurás el <code>.env</code> y levantás con <code>docker compose up</code>.
          Construido a partir del core de un proyecto Python real en producción.
        </p>
        <a
          href="https://github.com/Facuremmer/python-saas-base"
          target="_blank"
          rel="noreferrer"
          className="btn-primary mt-4 inline-flex items-center gap-2"
        >
          Ver repositorio →
        </a>
      </section>

      <div className="border-t border-[color:var(--line)] pt-8">
        <Link href="/#proyectos" className="btn-ghost inline-flex items-center gap-2">
          ← {tr('back')}
        </Link>
      </div>
    </main>
  );
}
