import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { Button, clearExportLog, deleteExportLogEntry, subscribeExportLog, getExportLog } from "./router-n4bYjCIt.mjs";
import { I as Input } from "./input-DRTFHFri.mjs";
import "../_libs/xlsx-js-style.mjs";
import "../_libs/jspdf.mjs";
import "../_libs/jspdf-autotable.mjs";
import "../_libs/zip.js__zip.js.mjs";
import { E as EyeOff, o as Eye, T as Trash2, a as ShieldAlert, a0 as FileArchive, a1 as Copy } from "../_libs/lucide-react.mjs";
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
const EMPTY_LOG = [];
function useLog() {
  const getServerSnapshot = reactExports.useCallback(() => EMPTY_LOG, []);
  return reactExports.useSyncExternalStore(subscribeExportLog, getExportLog, getServerSnapshot);
}
function ExportLogPage() {
  const log = useLog();
  const [mounted, setMounted] = reactExports.useState(false);
  const [q, setQ] = reactExports.useState("");
  const [reveal, setReveal] = reactExports.useState({});
  const [revealAll, setRevealAll] = reactExports.useState(false);
  const [formatFilter, setFormatFilter] = reactExports.useState("ALL");
  reactExports.useEffect(() => {
    setMounted(true);
  }, []);
  const safeLog = mounted ? log : EMPTY_LOG;
  const filtered = safeLog.filter((e) => {
    const l = q.toLowerCase();
    const matchesText = !l || (e.filename || "").toLowerCase().includes(l) || (e.title || "").toLowerCase().includes(l) || (e.format || "").toLowerCase().includes(l);
    const matchesFormat = formatFilter === "ALL" || e.format === formatFilter;
    return matchesText && matchesFormat;
  });
  const byFormat = safeLog.reduce((acc, e) => {
    const fmt = e.format || "CSV";
    acc[fmt] = (acc[fmt] || 0) + 1;
    return acc;
  }, {});
  const copy = (t) => {
    try {
      navigator.clipboard.writeText(t);
    } catch {
    }
  };
  const mask = (p = "") => "•".repeat(Math.min(p.length || 8, 16));
  if (!mounted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-64 animate-pulse rounded bg-muted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-4", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 animate-pulse rounded-xl bg-card border border-border" }, i)) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: "Export Log & Password Vault" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Protected exports are recorded here with the password and exact saved path. PDF/Word compendiums use AES-256 protected ZIP containers; interactive HTML compendiums use AES-256-GCM inside the HTML file. This log is stored locally on this computer only." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Total exports", value: safeLog.length }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "CSV files", value: byFormat.CSV || 0 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Excel files", value: byFormat.XLSX || 0 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "PDF files", value: byFormat.PDF || 0 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Word files", value: byFormat.DOCX || 0 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "HTML files", value: byFormat.HTML || 0 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search filename, report, or format…", value: q, onChange: (e) => setQ(e.target.value), className: "h-10 w-full max-w-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: formatFilter, onChange: (e) => setFormatFilter(e.target.value), className: "h-10 rounded-lg border border-border bg-background px-3 text-sm font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ALL", children: "All formats" }),
        ["PDF", "DOCX", "HTML", "XLSX", "CSV"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: f, children: f }, f))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => setRevealAll((v) => !v), children: [
        revealAll ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }),
        revealAll ? "Hide all passwords" : "Reveal all passwords"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "destructive", size: "sm", onClick: () => {
        if (confirm("Delete ALL export log entries? This cannot be undone.")) clearExportLog();
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }),
        " Clear log"
      ] }),
      false
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-warning/40 bg-warning/10 p-3 text-xs text-warning-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-4 w-4" }),
        " Security reminder"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: "Never send the ZIP file and its password through the same channel (e.g., both by email). Prefer sending the file via one channel and the password via another (SMS, call, in person)." })
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileArchive, { className: "mx-auto mb-2 h-8 w-8 opacity-50" }),
      "No matching exports. Try another search or format."
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((e) => {
      const visible = revealAll || reveal[e.id];
      const rowCount = typeof e.rowCount === "number" ? e.rowCount : 0;
      const bytes = typeof e.bytes === "number" ? e.bytes : 0;
      const dateStr = e.timestamp ? new Date(e.timestamp).toLocaleString() : "—";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-black text-primary", children: e.format || "CSV" }),
              e.encryption && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-success/10 px-2.5 py-1 text-[10px] font-black text-success", children: e.encryption }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: dateStr })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 break-words text-sm font-black", children: e.title || "Unnamed export" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 break-all font-mono text-[11px] text-muted-foreground", children: e.filename || "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => setReveal((s) => ({
              ...s,
              [e.id]: !s[e.id]
            })), children: [
              visible ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }),
              visible ? "Hide" : "Show"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: () => copy(e.password || ""), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" }),
              " Copy password"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => {
              if (confirm(`Delete log entry for ${e.filename}?`)) deleteExportLogEntry(e.id);
            }, title: "Delete entry", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3 md:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-primary/20 bg-primary/5 p-3 md:col-span-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-black uppercase tracking-wider text-primary", children: "Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 break-all rounded-lg bg-background px-3 py-2 font-mono text-sm font-black", children: visible ? e.password : mask(e.password) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mt-2 w-full", size: "sm", onClick: () => copy(e.password || ""), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" }),
              " Copy password"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/20 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-black uppercase tracking-wider text-muted-foreground", children: "Export details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 grid grid-cols-2 gap-2 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Rows" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: rowCount.toLocaleString() })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Size" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold", children: [
                  (bytes / 1024).toFixed(1),
                  " KB"
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/20 p-3 md:col-span-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-black uppercase tracking-wider text-muted-foreground", children: "Saved location" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 break-all font-mono text-[11px] leading-5", children: e.savedPath || "Browser-selected location" })
          ] })
        ] })
      ] }, e.id);
    }) })
  ] });
}
function Stat({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-wide text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-2xl font-bold text-foreground", children: (value || 0).toLocaleString() })
  ] });
}
export {
  ExportLogPage as component
};
