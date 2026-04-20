'use client';

import Link from "next/link";
import { useI18n } from '@/components/I18nProvider';
import CodeSnippet from '@/components/CodeSnippet';
import CaseOverview from '@/components/CaseOverview';

export default function TraceabilityDbPage() {
  const { t } = useI18n();
  const tr = (k: string) => t(`proj_6_${k}`);

  return (
    <main className="container-pro space-y-10 pb-16 pt-10">
      <CaseOverview
        badges={['SQL Server', 'T-SQL', 'Big Data']}
        title={tr("title")}
        summary={tr("summary")}
        metrics={[
          { value: 'Millones', label: 'Filas por año' },
          { value: 'Covering IDX', label: 'Reportes acelerados' },
          { value: 'Unit Trace', label: 'Caja a pallet' },
        ]}
        problem={{
          title: tr("problem_title"),
          intro: tr("problem_intro"),
          bullets: [tr("problem_1"), tr("problem_2"), tr("problem_3")],
        }}
        decision={{
          title: 'Decisión técnica',
          intro: tr("solution_intro"),
          bullets: [tr("solution_1"), tr("solution_2")],
        }}
        results={{
          title: 'Resultados',
          bullets: [tr("solution_3"), tr("solution_4")],
        }}
      />

      {/* Snippets SQL */}
      <section className="space-y-8">
        <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--text)]">{tr("snippets_title")}</h2>
            <p className="text-[color:var(--muted)] mt-2">{tr("snippets_intro")}</p>
        </div>

        {/* 1. Main Table */}
        <div className="space-y-3">
            <h3 className="text-lg font-semibold tracking-tight text-[color:var(--text)]">{tr("snip_main_title")}</h3>
            <p className="text-sm text-[color:var(--muted)] mb-2">
                {tr("snip_main_expl")}
            </p>
            <CodeSnippet
              title="dbo.Caja.sql"
              language="sql"
            >
{`CREATE TABLE [dbo].[Caja](
    [Cod_Caja_ID] [bigint] NOT NULL,
    [Pallet_ID] [bigint] NULL,
    [Codigo_Barra_ID] [varchar](64) NOT NULL,
    [OP_ID] [bigint] NULL,
    [Fecha_Produccion] [datetime2](0) NULL,
    [Peso_Neto] [decimal](18, 4) NULL,
    [Ubicacion_ID] [int] NULL,
    CONSTRAINT [PK_Caja] PRIMARY KEY CLUSTERED ([Cod_Caja_ID] ASC)
);

ALTER TABLE [dbo].[Caja] WITH CHECK ADD CONSTRAINT [FK_Caja_Pallet] 
FOREIGN KEY([Pallet_ID]) REFERENCES [dbo].[Pallet] ([Pallet_ID]);`}
            </CodeSnippet>
        </div>

        {/* 2. Pallet Table */}
        <div className="space-y-3">
            <h3 className="text-lg font-semibold tracking-tight text-[color:var(--text)]">{tr("snip_pallet_title")}</h3>
            <p className="text-sm text-[color:var(--muted)] mb-2">
                {tr("snip_pallet_expl")}
            </p>
            <CodeSnippet
              title="dbo.Pallet.sql"
              language="sql"
            >
{`CREATE TABLE [dbo].[Pallet](
    [Pallet_ID] [bigint] NOT NULL,
    [Fecha_Creacion] [datetime2](0) NOT NULL,
    [Ubicacion_ID] [int] NULL,
    [Estado] [varchar](20) DEFAULT 'ABIERTO',
    [Nro_Pallet_Fisico] [varchar](50) NULL,
    CONSTRAINT [PK_Pallet] PRIMARY KEY CLUSTERED ([Pallet_ID] ASC)
);`}
            </CodeSnippet>
        </div>

        {/* 3. Indexing Strategy */}
        <div className="space-y-3">
            <h3 className="text-lg font-semibold tracking-tight text-[color:var(--text)]">{tr("snip_index_title")}</h3>
            <p className="text-sm text-[color:var(--muted)] mb-2">
                {tr("snip_index_expl")}
            </p>
            <CodeSnippet
              title="Performance_Tuning.sql"
              language="sql"
            >
{`-- OptimizaciÃ³n para reportes de ProducciÃ³n por OP
-- Evita "Key Lookup" al incluir el peso en el nodo hoja del Ã­ndice.
CREATE NONCLUSTERED INDEX [IX_Caja_OP_Fecha] ON [dbo].[Caja]
(
    [OP_ID] ASC,
    [Fecha_Produccion] ASC
)
INCLUDE ([Peso_Neto], [Codigo_Barra_ID])
WITH (FILLFACTOR = 90);`}
            </CodeSnippet>
        </div>
      </section>

      {/* Estructura */}
      <section className="card p-6 md:p-8 space-y-4">
        <h2 className="text-xl font-semibold">{tr("structure_title")}</h2>
        <pre className="overflow-x-auto rounded-lg bg-[#0a1120] p-4 text-xs leading-relaxed text-[#dce9ff] sm:text-sm">
{`DB/
  â”œâ”€ Tables/
  â”‚  â”œâ”€ dbo.Caja.sql
  â”‚  â”œâ”€ dbo.Pallet.sql
  â”‚  â”œâ”€ dbo.Producto_BKP.sql
  â”‚  â””â”€ dbo.Ubicacion.sql
  â”œâ”€ Views/
  â”‚  â””â”€ dbo.v_Trazabilidad.sql
  â””â”€ Security/
     â””â”€ Users.sql`}
        </pre>
        <p className="text-sm text-[color:var(--muted)] mt-2">{tr("structure_note")}</p>
      </section>

      <Link href="/#proyectos" className="btn-ghost inline-flex items-center gap-2">← {tr("back_to_projects")}
      </Link>
    </main>
  );
}
