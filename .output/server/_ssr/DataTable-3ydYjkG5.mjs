import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { I as Input } from "./input-DRTFHFri.mjs";
import { Button, exportCSV, exportXLSX, exportPDF, exportDOCX, printPayload, getSourceWatermark, getActiveYear } from "./router-n4bYjCIt.mjs";
import { N as Download, I as FileSpreadsheet, z as FileText, J as FileType2, P as Printer } from "../_libs/lucide-react.mjs";
function DataTable({
  title,
  subtitle,
  rows,
  columns,
  searchable = true,
  pageSize = 25,
  onRowClick,
  emptyText = "No records",
  summary,
  hideExport = false
}) {
  const [q, setQ] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(1);
  const filtered = reactExports.useMemo(() => {
    if (!q) return rows;
    const lower = q.toLowerCase();
    return rows.filter(
      (r) => columns.some((c) => String(getPath(r, c.key) ?? "").toLowerCase().includes(lower))
    );
  }, [q, rows, columns]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const cur = Math.min(page, totalPages);
  const slice = filtered.slice((cur - 1) * pageSize, cur * pageSize);
  const payload = { title, subtitle, columns, rows: filtered, note: getSourceWatermark(getActiveYear()), summary };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-border bg-card shadow-[var(--shadow-card)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: title }),
        subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: subtitle })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        searchable && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Filter table…",
            value: q,
            onChange: (e) => {
              setQ(e.target.value);
              setPage(1);
            },
            className: "h-9 w-full sm:w-56"
          }
        ),
        !hideExport && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => exportCSV(payload), title: "Export CSV", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
            " CSV"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => exportXLSX(payload), title: "Export Excel", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileSpreadsheet, { className: "h-4 w-4" }),
            " Excel"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => exportPDF(payload), title: "Export PDF", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
            " PDF"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => exportDOCX(payload), title: "Export Word", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileType2, { className: "h-4 w-4" }),
            " Word"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => printPayload(payload), title: "Print report", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-4 w-4" }),
            " Print"
          ] })
        ] })
      ] })
    ] }),
    summary && summary.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sector-summary-strip border-b border-border bg-muted/25 px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 flex items-center justify-between gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-black uppercase tracking-[0.16em] text-primary", children: "Summary & useful rates" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-[10px] text-muted-foreground", children: "Percentages use the correct population or reporting denominator for this filter." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 sm:grid-cols-2 xl:grid-cols-4", children: summary.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sector-summary-card rounded-xl border border-border bg-background px-3 py-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-semibold leading-4 text-muted-foreground", children: s.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-end justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-black tabular-nums text-foreground", children: typeof s.value === "number" ? s.value.toLocaleString() : s.value }),
          s.percentage != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "sector-summary-percent rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-black tabular-nums text-primary", children: [
            s.percentage.toFixed(1),
            "%"
          ] })
        ] }),
        s.percentage != null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-1.5 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-primary transition-all", style: { width: `${Math.min(100, Math.max(0, s.percentage))}%` } }) }),
        s.percentageLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[9px] leading-4 text-muted-foreground", children: s.percentageLabel })
      ] }, s.label)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[65vh] overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full border-collapse text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "sticky top-0 z-10 bg-secondary/80 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: columns.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-border px-3 py-2 text-left font-semibold text-secondary-foreground whitespace-nowrap", children: c.label }, c.key)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        slice.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: columns.length, className: "px-3 py-12 text-center text-muted-foreground", children: emptyText }) }),
        slice.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "tr",
          {
            onClick: onRowClick ? () => onRowClick(r) : void 0,
            className: `border-b border-border/60 transition hover:bg-muted/60 ${onRowClick ? "cursor-pointer" : ""}`,
            children: columns.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-foreground/90", children: formatCell(getPath(r, c.key)) }, c.key))
          },
          i
        ))
      ] }),
      filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tfoot", { className: "sticky bottom-0 bg-secondary/90 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: columns.length, className: "border-t-2 border-border px-3 py-2 text-left text-xs font-semibold text-secondary-foreground", children: [
        "TOTAL: ",
        filtered.length.toLocaleString(),
        " record(s)"
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "flex flex-col gap-3 border-t border-border p-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "Showing ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: slice.length }),
        " of",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: filtered.length.toLocaleString() }),
        " records"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", disabled: cur <= 1, onClick: () => setPage(cur - 1), children: "Prev" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Page ",
          cur,
          " / ",
          totalPages
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", disabled: cur >= totalPages, onClick: () => setPage(cur + 1), children: "Next" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border bg-muted/30 px-4 py-2 text-[11px] italic text-muted-foreground", children: getSourceWatermark(getActiveYear()) })
  ] });
}
function getPath(obj, path) {
  if (obj == null) return void 0;
  if (path in obj) return obj[path];
  return path.split(".").reduce((a, k) => a == null ? a : a[k], obj);
}
function formatCell(v) {
  if (v === null || v === void 0 || v === "") return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" });
  if (v === "Yes") return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-success/15 px-1.5 py-0.5 text-[11px] font-medium text-success", children: "Yes" });
  if (v === "No") return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground", children: "No" });
  return String(v);
}
export {
  DataTable as D
};
