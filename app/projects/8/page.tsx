'use client';

import Link from "next/link";
import { useI18n } from '@/components/I18nProvider';
import CodeSnippet from '@/components/CodeSnippet';
import CaseOverview from '@/components/CaseOverview';

export default function IceCreamIotPage() {
  const { t } = useI18n();
  const tr = (k: string) => t(`proj_8_${k}`);

  return (
    <main className="container-pro space-y-10 pb-16 pt-10">
      <CaseOverview
        badges={['MySQL', 'SCADA', 'PLC']}
        title={tr("title")}
        summary={tr("summary")}
        metrics={[
          { value: '24/7', label: 'Monitoreo de proceso' },
          { value: 'PLC + SQL', label: 'Puente OT/IT' },
          { value: 'Historian', label: 'Variables críticas' },
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

        {/* 1. Tanques */}
        <div className="space-y-3">
            <h3 className="text-lg font-semibold tracking-tight text-[color:var(--text)]">{tr("snip_tank_title")}</h3>
            <p className="text-sm text-[color:var(--muted)] mb-2">
                {tr("snip_tank_expl")}
            </p>
            <CodeSnippet
              title="tables/tanques.sql"
              language="sql"
            >
{`CREATE TABLE tanques (
  IdTanque int(11) NOT NULL AUTO_INCREMENT,
  Descripcion varchar(45) DEFAULT NULL,
  CapacidadLitros decimal(10,2) DEFAULT NULL,
  DensidadProducto decimal(10,3) DEFAULT NULL,
  OffsetNivel decimal(10,2) DEFAULT '0.00', -- CalibraciÃ³n sensor
  AlarmaTempMax decimal(5,2) DEFAULT NULL,  -- Setpoint alarma
  PRIMARY KEY (IdTanque)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`}
            </CodeSnippet>
        </div>

        {/* 2. Historico */}
        <div className="space-y-3">
            <h3 className="text-lg font-semibold tracking-tight text-[color:var(--text)]">{tr("snip_hist_title")}</h3>
            <p className="text-sm text-[color:var(--muted)] mb-2">
                {tr("snip_hist_expl")}
            </p>
            <CodeSnippet
              title="tables/historico_procesos.sql"
              language="sql"
            >
{`CREATE TABLE historico_procesos (
  IdRegistro bigint(20) NOT NULL AUTO_INCREMENT,
  FechaHora datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  IdTanque int(11) NOT NULL,
  NivelLitros decimal(10,2) NOT NULL,
  Temperatura decimal(5,2) NOT NULL,
  EstadoAgitador tinyint(1) DEFAULT '0',
  EstadoBomba tinyint(1) DEFAULT '0',
  IdLoteProduccion varchar(50) DEFAULT NULL,
  PRIMARY KEY (IdRegistro),
  KEY idx_fecha_tanque (FechaHora, IdTanque) -- Ãndice para grÃ¡ficos
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`}
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
{`IoT_System/
  â”œâ”€ PLC_Logic/
  â”‚  â””â”€ Gestion_Materia_Prima.project  # Codesys/IEC 61131-3
  â”œâ”€ Database/
  â”‚  â”œâ”€ scripts_tablas.sql
  â”‚  â””â”€ stored_procedures.sql
  â””â”€ Documentation/
     â””â”€ Manual_de_Uso.docx`}
        </pre>
        <p className="text-sm text-[color:var(--muted)] mt-2">{tr("structure_note")}</p>
      </section>

      <Link href="/#proyectos" className="btn-ghost inline-flex items-center gap-2">← {tr("back_to_projects")}
      </Link>
    </main>
  );
}
