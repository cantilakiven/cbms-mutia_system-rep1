import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { subscribeData, getDataVersion, getYearDatasets } from "./router-n4bYjCIt.mjs";
import { D as DataTable } from "./DataTable-3ydYjkG5.mjs";
import { R as REPORTS, f as frequency } from "./cbms-report-defs-JLs1b1j8.mjs";
import "../_libs/xlsx-js-style.mjs";
import "../_libs/jspdf.mjs";
import "../_libs/jspdf-autotable.mjs";
import "../_libs/zip.js__zip.js.mjs";
import { F as FileChartColumnIncreasing, O as CalendarRange, Q as CalendarCheck2 } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-progress.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/zod.mjs";
import "fs";
import "path";
import "../_libs/fflate.mjs";
import "../_libs/fast-png.mjs";
import "../_libs/iobuffer.mjs";
import "../_libs/pako.mjs";
import "../_libs/html2canvas.mjs";
import "../_libs/dompurify.mjs";
import "../_libs/canvg.mjs";
import "../_libs/core-js.mjs";
import "../_libs/babel__runtime.mjs";
import "../_libs/raf.mjs";
import "../_libs/performance-now.mjs";
import "../_libs/rgbcolor.mjs";
import "../_libs/svg-pathdata.mjs";
import "../_libs/stackblur-canvas.mjs";
import "./input-DRTFHFri.mjs";
function ReportsPage() {
  const version = reactExports.useSyncExternalStore(subscribeData, getDataVersion, () => 0);
  const [year, setYear] = reactExports.useState(2022);
  const [active, setActive] = reactExports.useState(REPORTS[0].id);
  const report = REPORTS.find((r) => r.id === active);
  const ds = getYearDatasets(year);
  const result = reactExports.useMemo(() => {
    const data = report.source === "households" ? ds.households : ds.persons;
    return frequency(data, report);
  }, [report, ds.households, ds.persons, version]);
  const rows = [...result.rows];
  rows.push({
    category: "TOTAL",
    count: result.total,
    percent: "100.00%"
  });
  const datasetCounts = {
    persons: ds.persons.length,
    households: ds.households.length,
    barangays: ds.barangays.length,
    interviews: ds.interviews.length
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileChartColumnIncreasing, { className: "h-4 w-4" }),
          " Statistical reporting"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-2xl font-bold", children: "CBMS Statistical Reports" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 max-w-3xl text-sm leading-6 text-muted-foreground", children: "Generate the same report families for 2022 or 2024 without leaving the Reports page. The year selection is independent from the sidebar workspace so the result is always obvious." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex rounded-xl bg-muted p-1", "aria-label": "Report year", children: [2022, 2024].map((y) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setYear(y), className: `inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition ${year === y ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`, children: [
        y === 2022 ? /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarRange, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck2, { className: "h-4 w-4" }),
        "CBMS ",
        y
      ] }, y)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "grid grid-cols-2 gap-3 lg:grid-cols-4", children: Object.entries(datasetCounts).map(([label, count]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xl font-black", children: count.toLocaleString() })
    ] }, label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[300px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "rounded-xl border border-border bg-card p-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground", children: [
          year,
          " report families"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[60vh] overflow-y-auto", children: REPORTS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActive(r.id), className: `block w-full rounded-md px-3 py-2 text-left text-xs leading-tight transition ${active === r.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`, children: r.title }, r.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { title: `${report.title} — CBMS ${year}`, subtitle: `Total: ${result.total.toLocaleString()} ${report.source === "households" ? "households" : "persons"}`, rows, columns: [{
        key: "category",
        label: "Category"
      }, {
        key: "count",
        label: "Count"
      }, {
        key: "percent",
        label: "Share"
      }], searchable: false, pageSize: 50 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "border-t border-border pt-4 text-center text-[11px] text-muted-foreground", children: [
      "CBMS ",
      year,
      " report · ",
      datasetCounts.persons.toLocaleString(),
      " persons · ",
      datasetCounts.households.toLocaleString(),
      " households · Generated from the normalized local dataset."
    ] })
  ] });
}
export {
  ReportsPage as component
};
