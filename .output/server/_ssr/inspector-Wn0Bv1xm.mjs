import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { subscribeData, getDataVersion, getYearDataHealth, detectedFiles, getYearDatasets, dataLoadedAt, coverageLabel, getActiveYear, getSourceWatermark, datasets, getImportReport } from "./router-n4bYjCIt.mjs";
import { s as subscribeRuleChanges, R as RULES, a as getRuleChoice } from "./cbms-recognition-D6VhIdmt.mjs";
import "../_libs/xlsx-js-style.mjs";
import "../_libs/jspdf.mjs";
import "../_libs/jspdf-autotable.mjs";
import "../_libs/zip.js__zip.js.mjs";
import { a3 as FileJson, D as Database, a4 as Clock, h as CircleCheck, x as TriangleAlert, a5 as Layers3, b as Search } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
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
import "./cbms-labels-DwSwLAQ_.mjs";
const DATASET_LABELS = {
  barangays: "Barangay records",
  barangayList: "Barangay / Purok list",
  households: "Household records",
  childMortality: "Child mortality records",
  interviews: "Interview records",
  persons: "Person records",
  personsTvet: "Person TVET records",
  unrecognized: "Unrecognized (skipped)"
};
function fieldPresence(rows, field) {
  let missing = 0;
  for (const r of rows) {
    const v = field.startsWith("_hh.") ? void 0 : r[field];
    if (v === null || v === void 0 || v === "") missing++;
  }
  return {
    present: rows.length - missing,
    missing
  };
}
function InspectorPage() {
  reactExports.useSyncExternalStore(subscribeData, getDataVersion, () => 0);
  reactExports.useSyncExternalStore((cb) => subscribeRuleChanges(cb), () => RULES.map((r) => getRuleChoice(r.id)).join("|"), () => "ssr");
  const health22 = getYearDataHealth(2022);
  const health24 = getYearDataHealth(2024);
  const runtimeTotal = health22.totalRecords + health24.totalRecords;
  const totalRecords = runtimeTotal || detectedFiles.reduce((a, f) => a + f.recordCount, 0);
  const recognized = detectedFiles.filter((f) => f.classifiedAs !== "unrecognized");
  const unrecognized = detectedFiles.filter((f) => f.classifiedAs === "unrecognized");
  const importReport = getImportReport();
  const reconstructedFiles = importReport?.datasets.reduce((n, d) => n + d.files.length, 0) || health22.files + health24.files;
  const focus = ["pwd", "fourps", "food_stamp"];
  const legacy2022 = getYearDatasets(2022);
  const raw2022 = legacy2022.households.filter((h) => h.legacy_raw && typeof h.legacy_raw === "object");
  const legacySections = useLegacySections(raw2022);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: "Dataset Inspector" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "CBMS source records loaded for the Authorized CBMS Data Custodian, including the records loaded from each year and which fields are powering your PWD, 4Ps, and Food Stamp rosters." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileJson, { className: "h-4 w-4 text-info" }), label: "Detected files", value: detectedFiles.length || reconstructedFiles }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "h-4 w-4 text-info" }), label: "Total records loaded", value: totalRecords }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-info" }), label: "Last loaded", value: dataLoadedAt ? dataLoadedAt.toLocaleString() : "—", isText: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-primary/20 bg-primary/5 shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "border-b border-primary/10 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: "Runtime datasets currently loaded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "These totals are read directly from the in-memory CBMS stores, so the inspector remains accurate even when the original file list is not persisted in the current renderer session." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 p-4 md:grid-cols-2", children: [{
        year: 2022,
        health: health22
      }, {
        year: 2024,
        health: health24
      }].map(({
        year,
        health
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-background p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-black", children: [
            "CBMS ",
            year
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-muted-foreground", children: [
            health.files.toLocaleString(),
            " file(s)"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-3 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "h-4 w-4 text-primary" }), label: "Persons", value: health.persons }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "h-4 w-4 text-primary" }), label: "Households", value: health.households }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapIconShim, {}), label: "Total records", value: health.totalRecords })
        ] })
      ] }, year)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-border bg-card shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "border-b border-border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: "Detected JSON files" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Coverage: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: coverageLabel }),
          " · Files are auto-loaded by filename pattern. Drop new JSONs into",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "src/data/cbms/" }),
          " and the app reloads."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left font-semibold", children: "File" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left font-semibold", children: "Classified as" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-right font-semibold", children: "Records" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-center font-semibold", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          recognized.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-mono text-xs", children: f.filename }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: DATASET_LABELS[f.classifiedAs] || f.classifiedAs }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right", children: f.recordCount.toLocaleString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mx-auto h-4 w-4 text-success" }) })
          ] }, f.path)),
          unrecognized.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/60 bg-warning/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-mono text-xs", children: f.filename }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-muted-foreground", children: "Unrecognized — rename to match a pattern" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right", children: f.recordCount.toLocaleString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mx-auto h-4 w-4 text-warning" }) })
          ] }, f.path)),
          detectedFiles.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "p-6 text-center text-sm text-muted-foreground", children: "No JSON files detected." }) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-primary/20 bg-primary/5 shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-primary/10 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Layers3, { className: "mt-0.5 h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: "CBMS 2022 wide-data coverage" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "The 2022 questionnaire contains many sections that do not have one-to-one 2024 fields. The importer keeps those original fields inside ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "legacy_raw" }),
            " instead of discarding them."
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "h-4 w-4 text-primary" }), label: "2022 households", value: legacy2022.households.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "h-4 w-4 text-primary" }), label: "2022 persons", value: legacy2022.persons.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers3, { className: "h-4 w-4 text-primary" }), label: "Legacy sections found", value: legacySections.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-primary" }), label: "Active workspace", value: getActiveYear(), isText: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-2 md:grid-cols-2", children: legacySections.map((section) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-background p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-bold", children: section.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
              section.fields,
              " fields · ",
              section.coverage,
              "% rows"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-1.5 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-primary", style: {
            width: `${section.coverage}%`
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-[10px] text-muted-foreground", children: [
            section.sample.join(", "),
            section.sample.length >= 5 ? "…" : ""
          ] })
        ] }, section.name)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-[11px] text-muted-foreground", children: [
          getSourceWatermark(2022),
          " · These fields remain available for future local indicators even when the current dashboard does not yet have a dedicated card."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-border bg-card shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "border-b border-border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: "Schema mapping — PWD / 4Ps / Food Stamp" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "These are the exact fields that drive each roster, given the recognition rule you've selected in",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/validation", className: "text-primary underline", children: "Validation & Mapping" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: focus.map((id) => {
        const def = RULES.find((r) => r.id === id);
        const choice = getRuleChoice(id);
        const opt = def.options.find((o) => o.id === choice) || def.options[0];
        const sourceRows = def.level === "person" ? datasets.persons : datasets.households;
        const fieldStats = def.fields.map((f) => ({
          field: f,
          ...fieldPresence(sourceRows, f)
        }));
        const anyMissing = fieldStats.some((f) => f.missing > 0);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold", children: def.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Rule applied: ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: opt.label }),
                " · Source: ",
                def.level === "person" ? "Person record" : "Household record"
              ] })
            ] }),
            anyMissing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-md bg-warning/15 px-2 py-1 text-xs font-semibold text-warning", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3.5 w-3.5" }),
              " Some required fields are missing"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-md bg-success/15 px-2 py-1 text-xs font-semibold text-success", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
              " All required fields present"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1.5 text-left font-semibold", children: "Field" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1.5 text-right font-semibold", children: "Present" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1.5 text-right font-semibold", children: "Missing" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1.5 text-right font-semibold", children: "% Missing" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: fieldStats.map((s) => {
              const total = s.present + s.missing;
              const pct = total ? s.missing / total * 100 : 0;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/60", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5 font-mono", children: s.field }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5 text-right", children: s.present.toLocaleString() }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: `px-2 py-1.5 text-right ${s.missing > 0 ? "text-warning font-medium" : ""}`, children: s.missing.toLocaleString() }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-2 py-1.5 text-right", children: [
                  pct.toFixed(1),
                  "%"
                ] })
              ] }, s.field);
            }) })
          ] }) })
        ] }, id);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground", children: [
      "Open the rosters: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/sectors", className: "text-primary underline", children: "PWD / 4Ps / Food Stamp" }),
      " · Configure rules: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/validation", className: "text-primary underline", children: "Validation & Mapping" })
    ] })
  ] });
}
function useLegacySections(rows) {
  const sections = /* @__PURE__ */ new Map();
  for (const row of rows) {
    const raw = row.legacy_raw || {};
    for (const [name, value] of Object.entries(raw)) {
      if (!sections.has(name)) sections.set(name, {
        fields: /* @__PURE__ */ new Set(),
        present: 0
      });
      const item = sections.get(name);
      if (value && typeof value === "object" && !Array.isArray(value)) {
        Object.keys(value).forEach((k) => item.fields.add(k));
        if (Object.values(value).some((v) => v !== null && v !== void 0 && v !== "")) item.present++;
      } else if (value !== null && value !== void 0 && value !== "") {
        item.fields.add(name);
        item.present++;
      }
    }
  }
  return Array.from(sections.entries()).map(([name, v]) => ({
    name,
    fields: v.fields.size,
    coverage: rows.length ? Math.round(v.present / rows.length * 100) : 0,
    sample: Array.from(v.fields).slice(0, 5)
  })).sort((a, b) => b.fields - a.fields);
}
function MapIconShim() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layers3, { className: "h-4 w-4 text-primary" });
}
function Stat({
  icon,
  label,
  value,
  isText
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
      icon,
      " ",
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-2 font-bold text-foreground ${isText ? "text-base" : "text-2xl"}`, children: typeof value === "number" ? value.toLocaleString() : value })
  ] });
}
export {
  InspectorPage as component
};
