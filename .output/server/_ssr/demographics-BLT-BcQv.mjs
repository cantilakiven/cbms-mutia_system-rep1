import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { datasets, barangays } from "./router-n4bYjCIt.mjs";
import { D as DataTable } from "./DataTable-3ydYjkG5.mjs";
import "../_libs/xlsx-js-style.mjs";
import "../_libs/jspdf.mjs";
import "../_libs/jspdf-autotable.mjs";
import "../_libs/zip.js__zip.js.mjs";
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
import "../_libs/lucide-react.mjs";
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
const MAINSTREAM_ETHNICITIES = ["tagalog", "bisaya", "binisaya", "cebuano", "sugbuanon", "ilocano", "iloco", "hiligaynon", "ilonggo", "waray", "samar-leyte", "bikol", "bicol", "kapampangan", "pampango", "pangasinan", "pangasinense", "ibanag", "zamboangueño", "chavacano", "tausug"];
function isICC(eth) {
  if (!eth || typeof eth !== "string") return false;
  const lower = eth.toLowerCase();
  return !MAINSTREAM_ETHNICITIES.some((m) => lower.includes(m));
}
function ageBand(age, lo, hi) {
  return typeof age === "number" && age >= lo && age <= hi;
}
function pct(n, d) {
  if (!d) return "0.0%";
  return (n / d * 100).toFixed(1) + "%";
}
function DemographicsPage() {
  const persons = datasets.persons;
  const totalPopulation = persons.length;
  const ageBySex = reactExports.useMemo(() => {
    const bands = [["0–5 years old", 0, 5], ["6–12 years old", 6, 12], ["13–17 years old", 13, 17]];
    const rows = bands.map(([label, lo, hi]) => {
      const inBand = persons.filter((p) => ageBand(p.a05_age, lo, hi));
      const female = inBand.filter((p) => p.a03_sex === "Female").length;
      const male = inBand.filter((p) => p.a03_sex === "Male").length;
      const total = female + male;
      return {
        group: label,
        female,
        male,
        total,
        pct_of_pop: pct(total, totalPopulation)
      };
    });
    const f = rows.reduce((s, r) => s + r.female, 0);
    const m = rows.reduce((s, r) => s + r.male, 0);
    const t = f + m;
    rows.push({
      group: "TOTAL (0–17)",
      female: f,
      male: m,
      total: t,
      pct_of_pop: pct(t, totalPopulation)
    });
    return rows;
  }, [persons, totalPopulation]);
  const childrenByBarangay = reactExports.useMemo(() => {
    const allChildren = persons.filter((p) => typeof p.a05_age === "number" && p.a05_age <= 17).length;
    const rows = barangays.map((b) => {
      const inBrgy = persons.filter((p) => p.area_name === b.area_name && typeof p.a05_age === "number" && p.a05_age <= 17);
      const female = inBrgy.filter((p) => p.a03_sex === "Female").length;
      const male = inBrgy.filter((p) => p.a03_sex === "Male").length;
      const total = female + male;
      return {
        barangay: b.area_name,
        female,
        male,
        total,
        pct_of_children: pct(total, allChildren)
      };
    });
    rows.sort((a, b) => b.total - a.total);
    const f = rows.reduce((s, r) => s + r.female, 0);
    const m = rows.reduce((s, r) => s + r.male, 0);
    const t = f + m;
    rows.push({
      barangay: "TOTAL",
      female: f,
      male: m,
      total: t,
      pct_of_children: pct(t, allChildren)
    });
    return rows;
  }, [persons]);
  const iccRows = reactExports.useMemo(() => {
    const counts = /* @__PURE__ */ new Map();
    for (const p of persons) {
      if (!isICC(p.a09_ethnicity)) continue;
      const key = String(p.a09_ethnicity);
      const row = counts.get(key) || {
        ethnicity: key,
        female: 0,
        male: 0,
        total: 0
      };
      if (p.a03_sex === "Female") row.female++;
      else if (p.a03_sex === "Male") row.male++;
      row.total++;
      counts.set(key, row);
    }
    const base = Array.from(counts.values());
    const totalICC = base.reduce((s, r) => s + r.total, 0);
    const rows = base.sort((a, b) => b.total - a.total).map((r) => ({
      ...r,
      pct_of_icc: pct(r.total, totalICC),
      pct_of_pop: pct(r.total, totalPopulation)
    }));
    rows.push({
      ethnicity: "TOTAL ICC/IP Members",
      female: rows.reduce((s, r) => s + r.female, 0),
      male: rows.reduce((s, r) => s + r.male, 0),
      total: totalICC,
      pct_of_icc: pct(totalICC, totalICC),
      pct_of_pop: pct(totalICC, totalPopulation)
    });
    return rows;
  }, [persons, totalPopulation]);
  const iccMembers = reactExports.useMemo(() => {
    return persons.filter((p) => isICC(p.a09_ethnicity)).map((p) => ({
      _full_name: [p.a01_last_name, p.a01_first_name, p.a01_middle_name, p.a01_suffix].filter(Boolean).join(", "),
      a09_ethnicity: p.a09_ethnicity,
      a05_age: p.a05_age,
      a03_sex: p.a03_sex,
      area_name: p.area_name
    })).sort((a, b) => String(a.area_name ?? "").localeCompare(String(b.area_name ?? ""), void 0, {
      sensitivity: "base",
      numeric: true
    }) || String(a._full_name ?? "").localeCompare(String(b._full_name ?? ""), void 0, {
      sensitivity: "base",
      numeric: true
    }));
  }, [persons]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: "Demographic Profiles" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Age-group, sex, barangay, and indigenous community breakdowns. Each table is export-ready with the PSA source note." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { title: "Population Aged 0–5 Years, 6–12 Years, and 13–17 Years by Sex", subtitle: "Counts of children and adolescents by age band and sex", rows: ageBySex, columns: [{
      key: "group",
      label: "Age Group"
    }, {
      key: "female",
      label: "Female"
    }, {
      key: "male",
      label: "Male"
    }, {
      key: "total",
      label: "Total"
    }, {
      key: "pct_of_pop",
      label: "% of Population"
    }], searchable: false, pageSize: 10 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { title: "Number of Children (0–17 Years Old) per Barangay", subtitle: `${barangays.length} barangay(s) — sorted by total child population`, rows: childrenByBarangay, columns: [{
      key: "barangay",
      label: "Barangay"
    }, {
      key: "female",
      label: "Female"
    }, {
      key: "male",
      label: "Male"
    }, {
      key: "total",
      label: "Total Children (0–17)"
    }, {
      key: "pct_of_children",
      label: "% of All Children"
    }], pageSize: 60 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { title: "Number of Indigenous Cultural Communities (ICC/IP) Members by Ethnicity", subtitle: "Members of Indigenous Cultural Communities / Indigenous Peoples grouped by ethnic affiliation", rows: iccRows, columns: [{
      key: "ethnicity",
      label: "Ethnicity / IP Group"
    }, {
      key: "female",
      label: "Female"
    }, {
      key: "male",
      label: "Male"
    }, {
      key: "total",
      label: "Total"
    }, {
      key: "pct_of_icc",
      label: "% of ICC/IP"
    }, {
      key: "pct_of_pop",
      label: "% of Population"
    }], pageSize: 30 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { title: "Roster of Indigenous Cultural Communities (ICC/IP) Members", subtitle: `${iccMembers.length.toLocaleString()} individual(s) identified as ICC/IP · sorted A–Z by Barangay, then Full Name`, rows: iccMembers, columns: [{
      key: "_full_name",
      label: "Full Name"
    }, {
      key: "a09_ethnicity",
      label: "Ethnicity"
    }, {
      key: "a05_age",
      label: "Age"
    }, {
      key: "a03_sex",
      label: "Sex"
    }, {
      key: "area_name",
      label: "Barangay"
    }], pageSize: 25 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
      "ICC/IP membership is inferred from ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "a09_ethnicity" }),
      " by excluding mainstream Filipino ethnolinguistic groups (Tagalog, Bisaya/Cebuano, Ilocano, Hiligaynon, Waray, Bikol, Kapampangan, Pangasinan, Chavacano, Tausug). Adjust the list in",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/validation", className: "text-primary underline", children: "Validation" }),
      " ",
      "if your locality classifies these differently."
    ] })
  ] });
}
export {
  DemographicsPage as component
};
