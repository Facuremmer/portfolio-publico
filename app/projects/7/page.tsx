'use client';

import Link from "next/link";
import { useI18n } from '@/components/I18nProvider';
import CodeSnippet from '@/components/CodeSnippet';
import CaseOverview from '@/components/CaseOverview';

export default function InternalDbPage() {
  const { t } = useI18n();
  const tr = (k: string) => t(`proj_7_${k}`);

  return (
    <main className="container-pro space-y-10 pb-16 pt-10">
      <CaseOverview
        badges={['SQL Server', 'T-SQL', 'RRHH']}
        title={tr("title")}
        summary={tr("summary")}
        metrics={[
          { value: 'Single Source', label: 'Datos operativos' },
          { value: 'Audit Trail', label: 'Cambios trazables' },
          { value: 'FK + CHECK', label: 'Integridad consistente' },
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

        {/* 1. Employees */}
        <div className="space-y-3">
            <h3 className="text-lg font-semibold tracking-tight text-[color:var(--text)]">{tr("snip_emp_title")}</h3>
            <p className="text-sm text-[color:var(--muted)] mb-2">
                {tr("snip_emp_expl")}
            </p>
            <CodeSnippet
              title="dbo.Employees.sql"
              language="sql"
            >
{`CREATE TABLE [dbo].[Employees](
    [EmployeeID] [int] IDENTITY(1,1) NOT NULL,
    [FirstName] [varchar](100) NOT NULL,
    [LastName] [varchar](100) NOT NULL,
    [Email] [varchar](150) NULL,
    [HireDate] [date] NOT NULL,
    [IsActive] [bit] NOT NULL DEFAULT ((1)),
    CONSTRAINT [PK_Employees] PRIMARY KEY CLUSTERED ([EmployeeID] ASC)
);`}
            </CodeSnippet>
        </div>

        {/* 2. Projects */}
        <div className="space-y-3">
            <h3 className="text-lg font-semibold tracking-tight text-[color:var(--text)]">{tr("snip_proj_title")}</h3>
            <p className="text-sm text-[color:var(--muted)] mb-2">
                {tr("snip_proj_expl")}
            </p>
            <CodeSnippet
              title="dbo.Projects.sql"
              language="sql"
            >
{`CREATE TABLE [dbo].[Projects](
    [ProjectID] [int] IDENTITY(1,1) NOT NULL,
    [Name] [varchar](200) NOT NULL,
    [ClientID] [int] NOT NULL,
    [StartDate] [date] NULL,
    [Status] [varchar](20) DEFAULT ('Active'),
    CONSTRAINT [PK_Projects] PRIMARY KEY CLUSTERED ([ProjectID] ASC),
    CONSTRAINT [FK_Projects_Clients] FOREIGN KEY([ClientID]) 
        REFERENCES [dbo].[Clients] ([ClientID])
);`}
            </CodeSnippet>
        </div>

        {/* 3. WorkHours */}
        <div className="space-y-3">
            <h3 className="text-lg font-semibold tracking-tight text-[color:var(--text)]">{tr("snip_hours_title")}</h3>
            <p className="text-sm text-[color:var(--muted)] mb-2">
                {tr("snip_hours_expl")}
            </p>
            <CodeSnippet
              title="dbo.WorkHours.sql"
              language="sql"
            >
{`CREATE TABLE [dbo].[WorkHours](
    [RecordID] [bigint] IDENTITY(1,1) NOT NULL,
    [EmployeeID] [int] NOT NULL,
    [ProjectID] [int] NOT NULL,
    [WorkDate] [date] NOT NULL,
    [Hours] [decimal](5, 2) NOT NULL,
    [Description] [varchar](500) NULL,
    [CreatedDate] [datetime] DEFAULT (getdate()),
    CONSTRAINT [PK_WorkHours] PRIMARY KEY CLUSTERED ([RecordID] ASC),
    CONSTRAINT [FK_WorkHours_Employees] FOREIGN KEY([EmployeeID]) 
        REFERENCES [dbo].[Employees] ([EmployeeID]),
    CONSTRAINT [CK_Hours_Limit] CHECK ([Hours] > 0 AND [Hours] <= 24)
);`}
            </CodeSnippet>
        </div>
      </section>

      {/* Estructura */}
      <section className="card p-6 md:p-8 space-y-4">
        <h2 className="text-xl font-semibold">{tr("structure_title")}</h2>
        <pre className="overflow-x-auto rounded-lg bg-[#0a1120] p-4 text-xs leading-relaxed text-[#dce9ff] sm:text-sm">
{`DB/
  â”œâ”€ Tables/
  â”‚  â”œâ”€ dbo.Employees.sql
  â”‚  â”œâ”€ dbo.Projects.sql
  â”‚  â”œâ”€ dbo.Tasks.sql
  â”‚  â””â”€ dbo.WorkHours.sql
  â”œâ”€ Views/
  â”‚  â””â”€ dbo.v_MonthlyReport.sql
  â””â”€ Security/
     â””â”€ Roles.sql`}
        </pre>
        <p className="text-sm text-[color:var(--muted)] mt-2">{tr("structure_note")}</p>
      </section>

      <Link href="/#proyectos" className="btn-ghost inline-flex items-center gap-2">← {tr("back_to_projects")}
      </Link>
    </main>
  );
}
