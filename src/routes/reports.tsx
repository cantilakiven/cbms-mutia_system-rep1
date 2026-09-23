import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useSyncExternalStore } from "react";
import { CalendarRange, CalendarCheck2, FileBarChart, ChevronDown } from "lucide-react";
import { getDataVersion, getYearDatasets, subscribeData, type DataYear } from "@/data/cbms";
import { DataTable } from "@/components/DataTable";
import { REPORTS, buildReportResult, getReportColumns } from "@/lib/cbms-report-defs";

export const Route = createFileRoute("/reports")({
  component: ReportsPage,
});

function ReportsPage() {
  const version = useSyncExternalStore(subscribeData, getDataVersion, () => 0);
  const [year, setYear] = useState<DataYear>(2022);
  const [active, setActive] = useState<string>(REPORTS[0].id);
  const report = REPORTS.find((r) => r.id === active) ?? REPORTS[0];
  const ds = getYearDatasets(year);

  const result = useMemo(() => buildReportResult(report, ds), [report, ds, version]);

  const datasetCounts = {
    persons: ds.persons.length,
    households: ds.households.length,
    barangays: ds.barangays.length,
    interviews: ds.interviews.length,
  };

  const groups = REPORTS.reduce<Record<string, typeof REPORTS>>((acc, item) => {
    (acc[item.group] ||= []).push(item);
    return acc;
  }, {});

  const columns = getReportColumns(report, result);
  const tableTitle = `Table ${report.tableNumber} — ${report.title} — CBMS ${year}`;

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary"><FileBarChart className="h-4 w-4" /> Statistical reporting</div>
            <h1 className="mt-2 font-display text-2xl font-bold">CBMS Statistical Reports</h1>
            <p className="mt-1 max-w-4xl text-sm leading-6 text-muted-foreground">Fifty-four core CBMS report tables plus selected supplemental indicators, using the same year-specific runtime data and report definitions used by the Compendium.</p>
          </div>
          <div className="flex rounded-xl bg-muted p-1" aria-label="Report year">
            {[2022, 2024].map((y) => (
              <button key={y} onClick={() => setYear(y as DataYear)} className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition ${year === y ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                {y === 2022 ? <CalendarRange className="h-4 w-4" /> : <CalendarCheck2 className="h-4 w-4" />}
                CBMS {y}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Object.entries(datasetCounts).map(([label, count]) => <div key={label} className="rounded-xl border border-border bg-card p-4"><div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</div><div className="mt-1 text-xl font-black">{count.toLocaleString()}</div></div>)}
      </section>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-xl border border-border bg-card p-2">
          <div className="mb-2 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{year} report tables</div>
          <div className="max-h-[70vh] overflow-y-auto pr-1">
            {Object.entries(groups).map(([group, items]) => (
              <details key={group} open className="group/report mb-1 overflow-hidden rounded-lg border border-border/60">
                <summary className="flex cursor-pointer list-none items-center justify-between bg-muted/30 px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-muted-foreground">
                  <span>{group}</span><ChevronDown className="h-3.5 w-3.5 transition group-open/report:rotate-180" />
                </summary>
                <div className="space-y-0.5 p-1.5">
                  {items.map((r) => (
                    <button key={r.id} onClick={() => setActive(r.id)} className={`block w-full rounded-md px-3 py-2 text-left text-xs leading-tight transition ${active === r.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                      <span className="mr-2 font-mono text-[10px] font-black opacity-80">T{r.tableNumber}</span>{r.tabName}
                    </button>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </aside>

        <div className="min-w-0 space-y-5">
          <DataTable
            title={tableTitle}
            subtitle={`${report.tabName} · ${report.group} · ${result.total.toLocaleString()} ${report.source === "households" ? "household" : report.source === "persons" ? "person" : "barangay"} base`}
            rows={result.rows}
            columns={columns}
            searchable
            pageSize={50}
          />
          {Boolean(result.byBarangayRows?.length) && (
            <DataTable
              title={`${tableTitle} — Summary by Barangay`}
              subtitle="Each percentage/rate is recalculated from that barangay’s own applicable report denominator."
              rows={result.byBarangayRows || []}
              columns={[
                { key: "barangay", label: "Barangay" },
                { key: "category", label: report.kind === "summary" ? "Indicator" : "Category" },
                { key: "count", label: report.kind === "summary" ? "Value" : report.source === "households" ? "Households" : "Persons" },
                { key: "percent", label: "Percentage / Rate" },
              ]}
              searchable
              pageSize={50}
            />
          )}
        </div>
      </div>

      <footer className="border-t border-border pt-4 text-center text-[11px] text-muted-foreground">
        Table {report.tableNumber} · CBMS {year} · {datasetCounts.persons.toLocaleString()} persons · {datasetCounts.households.toLocaleString()} households · Generated from the normalized local dataset.
      </footer>
    </div>
  );
}
