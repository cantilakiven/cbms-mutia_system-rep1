import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { subscribeData, getDataVersion, getYearDatasets, getAvailableBarangays, Button, printPayload, exportPDF, exportXLSX, exportDOCX, coverageLabel, getActiveYear } from "./router-n4bYjCIt.mjs";
import "../_libs/xlsx-js-style.mjs";
import "../_libs/jspdf.mjs";
import "../_libs/jspdf-autotable.mjs";
import "../_libs/zip.js__zip.js.mjs";
import { P as Printer, z as FileText, I as FileSpreadsheet, J as FileType2, c as MapPin } from "../_libs/lucide-react.mjs";
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
function BarangaysPage() {
  const version = reactExports.useSyncExternalStore(subscribeData, getDataVersion, () => 0);
  const year = getActiveYear();
  const datasets = getYearDatasets(year);
  const barangays = getAvailableBarangays(year);
  const stats = reactExports.useMemo(() => {
    const isYes = (v) => v === "Yes" || v === "YES" || v === 1 || v === "1" || v === true;
    const is4PsHousehold = (h) => [h?.m05_a_4ps, h?.m06_a_benefit_4ps, h?.fourps, h?.four_ps].some(isYes);
    return barangays.slice().sort((a, b) => String(a.area_name || "").localeCompare(String(b.area_name || ""))).map((b) => {
      const persons = datasets.persons.filter((p) => p.area_code === b.area_code);
      const households = datasets.households.filter((h) => h.area_code === b.area_code);
      return {
        ...b,
        persons: persons.length,
        households: households.length,
        male: persons.filter((p) => p.a03_sex === "Male").length,
        female: persons.filter((p) => p.a03_sex === "Female").length,
        children: persons.filter((p) => typeof p.a05_age === "number" && p.a05_age <= 17).length,
        seniors: persons.filter((p) => typeof p.a05_age === "number" && p.a05_age >= 60).length,
        pwd: persons.filter((p) => p.b10_pwd === "Yes").length,
        fourPs: households.filter(is4PsHousehold).length,
        farmers: persons.filter((p) => p.e17_farmer === "Yes").length,
        noElec: households.filter((h) => h.o11_electricity === "No").length,
        overcrowded: households.filter((h) => h.overcrowding_status === "Overcrowded").length
      };
    });
  }, [version, year, barangays.length, datasets.persons.length, datasets.households.length]);
  const totals = stats.reduce((acc, b) => ({
    persons: acc.persons + b.persons,
    households: acc.households + b.households,
    male: acc.male + b.male,
    female: acc.female + b.female,
    children: acc.children + b.children,
    seniors: acc.seniors + b.seniors,
    pwd: acc.pwd + b.pwd,
    fourPs: acc.fourPs + b.fourPs,
    farmers: acc.farmers + b.farmers,
    noElec: acc.noElec + b.noElec,
    overcrowded: acc.overcrowded + b.overcrowded
  }), {
    persons: 0,
    households: 0,
    male: 0,
    female: 0,
    children: 0,
    seniors: 0,
    pwd: 0,
    fourPs: 0,
    farmers: 0,
    noElec: 0,
    overcrowded: 0
  });
  const columns = [{
    key: "area_name",
    label: "Barangay"
  }, {
    key: "persons",
    label: "Population"
  }, {
    key: "households",
    label: "Households"
  }, {
    key: "male",
    label: "Male"
  }, {
    key: "female",
    label: "Female"
  }, {
    key: "children",
    label: "Children 0–17"
  }, {
    key: "seniors",
    label: "Seniors 60+"
  }, {
    key: "pwd",
    label: "PWD"
  }, {
    key: "fourPs",
    label: "4Ps HH"
  }, {
    key: "farmers",
    label: "Farmers"
  }, {
    key: "noElec",
    label: "No Elec."
  }, {
    key: "overcrowded",
    label: "Overcrowded HH"
  }];
  const exportRows = [...stats.map((s) => Object.fromEntries(columns.map((c) => [c.key, s[c.key]]))), {
    area_name: "TOTAL",
    ...totals
  }];
  const payload = {
    title: `Barangay Population & Household Summary — ${coverageLabel}`,
    subtitle: `${barangays.length} barangays · ${totals.persons.toLocaleString()} persons · ${totals.households.toLocaleString()} households`,
    columns,
    rows: exportRows
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 print:hidden sm:flex-row sm:items-end sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: "Barangay Profiles" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          "CBMS ",
          year,
          " · ",
          barangays.length,
          " barangays · ",
          totals.persons.toLocaleString(),
          " persons · ",
          totals.households.toLocaleString(),
          " households."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => printPayload(payload), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "mr-1.5 h-4 w-4" }),
          " Print"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => exportPDF(payload), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mr-1.5 h-4 w-4" }),
          " PDF"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => exportXLSX(payload), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileSpreadsheet, { className: "mr-1.5 h-4 w-4" }),
          " Excel"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => exportDOCX(payload), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileType2, { className: "mr-1.5 h-4 w-4" }),
          " Word"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)] print:border-0 print:bg-transparent print:p-0 print:shadow-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 hidden print:block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold", children: payload.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: payload.subtitle })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full border-collapse text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/50 text-left text-xs uppercase text-muted-foreground", children: columns.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-2 font-semibold", children: c.label }, c.key)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/60 hover:bg-muted/30", children: columns.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: `px-2 py-1.5 ${c.key === "area_name" ? "font-medium" : "tabular-nums"}`, children: c.key === "area_name" ? s[c.key] : (s[c.key] || 0).toLocaleString() }, c.key)) }, s.area_code)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t-2 border-foreground bg-muted/40 font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2", children: "TOTAL" }),
            columns.slice(1).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2 tabular-nums", children: totals[c.key].toLocaleString() }, c.key))
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-[11px] text-muted-foreground", children: [
        "Source: CBMS ",
        year,
        " · Philippine Statistics Authority."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 print:hidden sm:grid-cols-2 xl:grid-cols-3", children: stats.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-elevated)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold leading-tight", children: b.area_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: b.area_code })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-primary/10 p-2 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-2 gap-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Population", value: b.persons }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Households", value: b.households }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Seniors", value: b.seniors }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "PWD", value: b.pwd }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "4Ps HH", value: b.fourPs }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Farmers", value: b.farmers }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Overcrowded", value: b.overcrowded, tone: "destructive" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/persons", search: {
        q: b.area_name
      }, className: "flex-1 rounded-md bg-secondary py-1.5 text-center text-xs font-medium hover:bg-muted", children: "View Persons" }) })
    ] }, b.area_code)) })
  ] });
}
function Stat({
  label,
  value,
  tone
}) {
  const cls = tone === "warning" ? "text-warning" : tone === "destructive" ? "text-destructive" : "text-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `font-bold ${cls}`, children: value.toLocaleString() }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: label })
  ] });
}
export {
  BarangaysPage as component
};
