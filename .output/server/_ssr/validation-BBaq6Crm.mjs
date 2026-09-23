import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { subscribeData, getDataVersion, getYearDatasets, Button, exportPDF, exportDOCX, printPayload, coverageLabel } from "./router-n4bYjCIt.mjs";
import { s as subscribeRuleChanges, R as RULES, a as getRuleChoice, r as resetRuleChoices, l as listSector, c as setRuleChoice } from "./cbms-recognition-D6VhIdmt.mjs";
import "../_libs/xlsx-js-style.mjs";
import "../_libs/jspdf.mjs";
import "../_libs/jspdf-autotable.mjs";
import "../_libs/zip.js__zip.js.mjs";
import { z as FileText, J as FileType2, P as Printer, a2 as RotateCcw, a6 as Info, h as CircleCheck, x as TriangleAlert } from "../_libs/lucide-react.mjs";
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
import "./cbms-labels-DwSwLAQ_.mjs";
const PERSON_FIELDS = ["a01_first_name", "a01_last_name", "a03_sex", "a05_age", "a07_marital_status", "area_name", "husn", "b10_pwd", "b07_senior_citizen_id", "b05_solo_parent", "e01_employment_status"];
const HH_FIELDS = ["area_name", "husn", "hh_size", "m05_a_4ps", "m05_d_food_stamp", "m05_b_socpen", "n02_drinking_water", "n08_toilet_facility", "o11_electricity"];
function audit(rows, fields) {
  return fields.map((f) => {
    let missing = 0;
    const types = /* @__PURE__ */ new Set();
    const samples = /* @__PURE__ */ new Set();
    for (const r of rows) {
      const v = r[f];
      if (v === null || v === void 0 || v === "") {
        missing++;
        continue;
      }
      types.add(typeof v);
      if (samples.size < 4) samples.add(String(v).slice(0, 24));
    }
    return {
      field: f,
      total: rows.length,
      missing,
      types: [...types],
      sampleValues: [...samples]
    };
  });
}
function ValidationPage() {
  reactExports.useSyncExternalStore(subscribeData, getDataVersion, () => 0);
  const [year, setYear] = reactExports.useState(2022);
  const yearDs = getYearDatasets(year);
  reactExports.useSyncExternalStore((cb) => subscribeRuleChanges(cb), () => RULES.map((r) => getRuleChoice(r.id)).join("|"), () => "ssr");
  const [tab, setTab] = reactExports.useState("rules");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: "Data Validation & Mapping" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Inspect dataset health, see how many records are missing key fields, and confirm how your local configuration should recognise PWDs, 4Ps, and food-stamp members. Choices here apply across the entire app (Sectors, Cross-tab, Search)." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex rounded-xl bg-muted p-1", children: [2022, 2024].map((y) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setYear(y), className: `rounded-lg px-3 py-2 text-xs font-bold ${year === y ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`, children: [
          "CBMS ",
          y
        ] }, y)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: () => exportValidationReport(year, "PDF"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
            " Download Full Report"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => exportValidationReport(year, "DOCX"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileType2, { className: "h-4 w-4" }),
            " Word"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => exportValidationReport(year, "PRINT"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-4 w-4" }),
            " Print"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 rounded-xl border border-border bg-muted/30 px-3 py-2 text-xs text-muted-foreground", children: [
        "Validating CBMS ",
        year,
        ": ",
        yearDs.persons.length.toLocaleString(),
        " persons · ",
        yearDs.households.length.toLocaleString(),
        " households · ",
        yearDs.barangays.length.toLocaleString(),
        " barangay records."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 rounded-xl border border-border bg-card p-1 w-fit", children: ["rules", "fields", "joins"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab(t), className: `rounded-md px-3 py-1.5 text-xs font-medium transition ${tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`, children: t === "rules" ? "Recognition Rules" : t === "fields" ? "Field Coverage" : "Joins & Integrity" }, t)) }),
    tab === "rules" && /* @__PURE__ */ jsxRuntimeExports.jsx(RulesPanel, {}),
    tab === "fields" && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldsPanel, { year }),
    tab === "joins" && /* @__PURE__ */ jsxRuntimeExports.jsx(JoinsPanel, { year })
  ] });
}
function RulesPanel() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => resetRuleChoices(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4" }),
      " Reset to defaults"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 lg:grid-cols-2", children: RULES.map((r) => {
      const current = getRuleChoice(r.id);
      const count = listSector(r.id).length;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold", children: r.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Source: ",
              r.level === "person" ? "Person record" : "Joined from Household record",
              " ·",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: r.fields.join(", ") })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary whitespace-nowrap", children: [
            count.toLocaleString(),
            " match"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 space-y-2", children: r.options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex cursor-pointer items-start gap-3 rounded-md border p-3 text-sm transition ${current === o.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: r.id, checked: current === o.id, onChange: () => setRuleChoice(r.id, o.id), className: "mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: o.label }),
            o.description && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-xs text-muted-foreground", children: o.description })
          ] })
        ] }, o.id)) })
      ] }, r.id);
    }) })
  ] });
}
function FieldsPanel({
  year
}) {
  const ds = getYearDatasets(year);
  const personStats = reactExports.useMemo(() => audit(ds.persons, PERSON_FIELDS), [ds.persons.length, year]);
  const hhStats = reactExports.useMemo(() => audit(ds.households, HH_FIELDS), [ds.households.length, year]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldsTable, { title: `CBMS ${year} — Person record field coverage`, stats: personStats }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldsTable, { title: `CBMS ${year} — Household record field coverage`, stats: hhStats })
  ] });
}
function FieldsTable({
  title,
  stats
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-border bg-card shadow-[var(--shadow-card)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-border p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: title }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left font-semibold", children: "Field" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-right font-semibold", children: "Present" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-right font-semibold", children: "Missing" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left font-semibold", children: "Type(s)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left font-semibold", children: "Sample values" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-center font-semibold", children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: stats.map((s) => {
        const pct = s.total ? s.missing / s.total * 100 : 0;
        const ok = pct === 0;
        const warn = pct > 0 && pct < 30;
        const bad = pct >= 30;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-mono text-xs", children: s.field }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right", children: (s.total - s.missing).toLocaleString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2 text-right", children: [
            s.missing.toLocaleString(),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "(",
              pct.toFixed(0),
              "%)"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-xs", children: s.types.join(", ") || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-xs text-muted-foreground", children: s.sampleValues.join(" · ") || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2 text-center", children: [
            ok && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mx-auto h-4 w-4 text-success" }),
            warn && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mx-auto h-4 w-4 text-warning" }),
            bad && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mx-auto h-4 w-4 text-destructive" })
          ] })
        ] }, s.field);
      }) })
    ] }) })
  ] });
}
function JoinsPanel({
  year
}) {
  const ds = getYearDatasets(year);
  const stats = reactExports.useMemo(() => {
    const hhKeys = new Set(ds.households.map((h) => `${h.area_code}-${h.husn}-${h.hsn}`));
    let orphans = 0;
    for (const p of ds.persons) {
      if (!hhKeys.has(`${p.area_code}-${p.husn}-${p.hsn}`)) orphans++;
    }
    return {
      orphans,
      totalPersons: ds.persons.length,
      totalHH: ds.households.length
    };
  }, [ds.households.length, ds.persons.length, year]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-4 w-4 text-info" }), label: `CBMS ${year} persons`, value: stats.totalPersons }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-4 w-4 text-info" }), label: `CBMS ${year} households`, value: stats.totalHH }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: stats.orphans === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-success" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-destructive" }), label: "Persons without matching household", value: stats.orphans, tone: stats.orphans === 0 ? "success" : "destructive" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 rounded-xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground", children: [
      "Persons join to households on ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "area_code + husn + hsn" }),
      ". Household-level rules (4Ps, food stamp, SocPen) require this join. This integrity check is explicitly scoped to CBMS ",
      year,
      "."
    ] })
  ] });
}
function Stat({
  icon,
  label,
  value,
  tone
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
      icon,
      " ",
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-2 text-2xl font-bold ${tone === "destructive" ? "text-destructive" : tone === "success" ? "text-success" : "text-foreground"}`, children: value.toLocaleString() })
  ] });
}
const PERSON_AUDIT = ["a01_first_name", "a01_last_name", "a03_sex", "a05_age", "a07_marital_status", "area_name", "husn", "b10_pwd", "b07_senior_citizen_id", "b05_solo_parent", "e01_employment_status"];
const HH_AUDIT = ["area_name", "husn", "hh_size", "m05_a_4ps", "m05_d_food_stamp", "m05_b_socpen", "n02_drinking_water", "n08_toilet_facility", "o11_electricity"];
function validationPayload(year) {
  const selected = getYearDatasets(year);
  const rulesRows = RULES.map((r) => {
    const choice = getRuleChoice(r.id);
    const opt = r.options.find((o) => o.id === choice) || r.options[0];
    return {
      section: "Recognition Rules",
      field: r.title,
      present: listSector(r.id).length,
      missing: "—",
      percent: "—",
      status: opt.label
    };
  });
  const personRows = PERSON_AUDIT.map((f) => {
    const s = statRow(selected.persons, f);
    return {
      section: "Person Field Coverage",
      field: s[0],
      present: Number(s[1].replace(/,/g, "")) || 0,
      missing: Number(s[2].replace(/,/g, "")) || 0,
      percent: s[3],
      status: s[4]
    };
  });
  const hhRows = HH_AUDIT.map((f) => {
    const s = statRow(selected.households, f);
    return {
      section: "Household Field Coverage",
      field: s[0],
      present: Number(s[1].replace(/,/g, "")) || 0,
      missing: Number(s[2].replace(/,/g, "")) || 0,
      percent: s[3],
      status: s[4]
    };
  });
  const hhKeys = new Set(selected.households.map((h) => `${h.area_code}-${h.husn}-${h.hsn}`));
  let orphans = 0;
  for (const p of selected.persons) if (!hhKeys.has(`${p.area_code}-${p.husn}-${p.hsn}`)) orphans++;
  const integrityRows = [{
    section: "Joins & Integrity",
    field: "Total persons",
    present: selected.persons.length,
    missing: 0,
    percent: "—",
    status: "Loaded"
  }, {
    section: "Joins & Integrity",
    field: "Total households",
    present: selected.households.length,
    missing: 0,
    percent: "—",
    status: "Loaded"
  }, {
    section: "Joins & Integrity",
    field: "Persons without matching household (orphans)",
    present: orphans,
    missing: 0,
    percent: "—",
    status: orphans === 0 ? "OK" : "Review"
  }, {
    section: "Joins & Integrity",
    field: "Join key",
    present: "—",
    missing: "—",
    percent: "—",
    status: "area_code + husn + hsn"
  }];
  return {
    title: `CBMS ${year} Data Validation & Mapping Report`,
    subtitle: `${coverageLabel} · Recognition Rules, Field Coverage, and Joins & Integrity`,
    columns: [{
      key: "field",
      label: "Field / Metric"
    }, {
      key: "present",
      label: "Present / Count"
    }, {
      key: "missing",
      label: "Missing"
    }, {
      key: "percent",
      label: "% Missing"
    }, {
      key: "status",
      label: "Status / Rule"
    }],
    rows: [...rulesRows, ...personRows, ...hhRows, ...integrityRows],
    groups: [{
      title: "Recognition Rules Applied",
      rows: rulesRows
    }, {
      title: "Person Record — Field Coverage",
      rows: personRows
    }, {
      title: "Household Record — Field Coverage",
      rows: hhRows
    }, {
      title: "Joins & Integrity",
      rows: integrityRows
    }],
    summary: [{
      label: "Persons",
      value: selected.persons.length
    }, {
      label: "Households",
      value: selected.households.length
    }, {
      label: "Barangay records",
      value: selected.barangays.length
    }, {
      label: "Orphaned persons",
      value: orphans,
      percentage: selected.persons.length ? orphans / selected.persons.length * 100 : 0
    }],
    note: `CBMS ${year} validation dataset · ${coverageLabel}`
  };
}
function exportValidationReport(year, mode) {
  const payload = validationPayload(year);
  if (mode === "PDF") return void exportPDF(payload);
  if (mode === "DOCX") return void exportDOCX(payload);
  printPayload(payload);
}
function statRow(rows, field) {
  let missing = 0;
  for (const r of rows) {
    const v = r[field];
    if (v === null || v === void 0 || v === "") missing++;
  }
  const present = rows.length - missing;
  const pct = rows.length ? missing / rows.length * 100 : 0;
  const status = pct === 0 ? "OK" : pct < 30 ? "WARN" : "MISSING";
  return [field, present.toLocaleString(), missing.toLocaleString(), `${pct.toFixed(1)}%`, status];
}
export {
  ValidationPage as component
};
