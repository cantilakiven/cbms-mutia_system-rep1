import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { subscribeData, getDataVersion, getYearDatasets, getYearDataHealth, getSourceWatermark, exportPDF, exportDOCX, printPayload, DATASET_LABELS, getHouseholdIncome, getActiveBarangay } from "./router-n4bYjCIt.mjs";
import "../_libs/xlsx-js-style.mjs";
import "../_libs/jspdf.mjs";
import "../_libs/jspdf-autotable.mjs";
import "../_libs/zip.js__zip.js.mjs";
import { U as Users, H as House, W as WalletCards, S as ShieldCheck, j as ChartColumn, N as Download, D as Database, v as FileCheck2, h as CircleCheck, c as MapPin } from "../_libs/lucide-react.mjs";
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
const n = (v) => Number.isFinite(Number(v)) ? Number(v) : 0;
const fmt = (v) => Math.round(v).toLocaleString();
const percent = (a, b) => b === 0 ? a === 0 ? "0.0%" : "N/A" : `${((a - b) / b * 100).toFixed(1)}%`;
const yes = (v) => v === "Yes" || v === 1 || v === "1" || v === true;
function scoped(ds, barangay) {
  return {
    persons: ds.persons.filter((p) => !barangay || p.area_name === barangay),
    households: ds.households.filter((h) => !barangay || h.area_name === barangay)
  };
}
function incomeSummary(ds, barangay) {
  const {
    households
  } = scoped(ds, barangay);
  const reported = households.filter((h) => getHouseholdIncome(h) !== null);
  if (!reported.length) return {
    reportedHouseholds: 0,
    below15: null,
    below20: null
  };
  const below15 = reported.filter((h) => getHouseholdIncome(h) < 15e3).length;
  const below20 = reported.filter((h) => getHouseholdIncome(h) < 2e4).length;
  return {
    reportedHouseholds: reported.length,
    below15,
    below20
  };
}
function countYes(rows, key) {
  const defined = rows.filter((r) => r?.[key] !== null && r?.[key] !== void 0 && r?.[key] !== "");
  if (!defined.length) return null;
  return defined.filter((r) => yes(r[key])).length;
}
function countLabel(rows, key, value) {
  const defined = rows.filter((r) => r?.[key] !== null && r?.[key] !== void 0 && r?.[key] !== "");
  if (!defined.length) return null;
  return defined.filter((r) => String(r[key]).toLowerCase() === value.toLowerCase()).length;
}
function metricStats(ds, barangay) {
  const {
    persons: p,
    households: h
  } = scoped(ds, barangay);
  const income = h.filter((x) => getHouseholdIncome(x) !== null);
  const employed = countLabel(p, "e01_employment_status", "Employed");
  const unemployed = countLabel(p, "e01_employment_status", "Unemployed");
  const laborDefined = p.filter((x) => x.e01_labor_force_participation !== null && x.e01_labor_force_participation !== void 0 && x.e01_labor_force_participation !== "");
  const lf = laborDefined.length ? laborDefined.filter((x) => String(x.e01_labor_force_participation).toLowerCase() === "in the labor force").length : null;
  const under = countLabel(p, "e01_underemployment_status", "Underemployed");
  const age = (lo, hi) => {
    const defined = p.filter((x) => Number.isFinite(Number(x.a05_age)));
    return defined.length ? defined.filter((x) => n(x.a05_age) >= lo && n(x.a05_age) <= hi).length : null;
  };
  const fourPsDefined = h.filter((x) => x.m05_a_4ps !== null && x.m05_a_4ps !== void 0 && x.m05_a_4ps !== "" || x.m06_a_benefit_4ps !== null && x.m06_a_benefit_4ps !== void 0 && x.m06_a_benefit_4ps !== "");
  const fourPs = fourPsDefined.length ? fourPsDefined.filter((x) => yes(x.m05_a_4ps) || yes(x.m06_a_benefit_4ps)).length : null;
  const socpen = (() => {
    const defined = h.filter((x) => x.m05_b_socpen !== null && x.m05_b_socpen !== void 0 && x.m05_b_socpen !== "" || x.m06_b_benefit_socpen !== null && x.m06_b_benefit_socpen !== void 0 && x.m06_b_benefit_socpen !== "");
    return defined.length ? defined.filter((x) => yes(x.m05_b_socpen) || yes(x.m06_b_benefit_socpen)).length : null;
  })();
  const reportedSchool = countYes(p, "d01_currently_attending_school");
  return {
    population: p.length,
    households: h.length,
    male: countLabel(p, "a03_sex", "Male"),
    female: countLabel(p, "a03_sex", "Female"),
    children: age(0, 14),
    youth: age(15, 24),
    workingAge: age(15, 59),
    seniors: age(60, 200),
    pwd: countYes(p, "b10_pwd"),
    soloParent: countYes(p, "b05_solo_parent") ?? countYes(p, "b06_solo_parent_id"),
    pregnant: countYes(p, "b08_currently_pregnant"),
    lactating: countYes(p, "b09_lactating_mother"),
    employed,
    unemployed,
    laborForce: lf ?? (employed !== null && unemployed !== null ? employed + unemployed : null),
    underemployed: under,
    farmers: countYes(p, "e17_farmer"),
    fisherfolk: countYes(p, "e18_fisherfolk"),
    attendingSchool: reportedSchool,
    literate: countYes(p, "a10_simple_literacy"),
    tvet: (() => {
      const a = countYes(p, "d07_tvet_graduate");
      const b = countYes(p, "d08_tvet_currently_attending");
      return a === null && b === null ? null : (a || 0) + (b || 0);
    })(),
    fourPs,
    socpen,
    philhealth: countYes(h, "m01_c_philhealth"),
    bankAccount: (() => {
      const vals = h.filter((x) => ["i01_a_bank_account", "i01_b_digital_bank_account", "i01_c_emoney_or_cash_card"].some((k) => x[k] !== null && x[k] !== void 0 && x[k] !== ""));
      return vals.length ? vals.filter((x) => [x.i01_a_bank_account, x.i01_b_digital_bank_account, x.i01_c_emoney_or_cash_card].some(yes)).length : null;
    })(),
    internet: countYes(h, "k01_internet_access"),
    electricity: countYes(h, "o11_electricity"),
    overcrowded: (() => {
      const vals = h.filter((x) => x.overcrowding_status !== null && x.overcrowding_status !== void 0 && x.overcrowding_status !== "");
      return vals.length ? vals.filter((x) => String(x.overcrowding_status).toLowerCase() === "overcrowded").length : null;
    })(),
    foodConcern: (() => {
      const vals = h.filter((x) => [x.g01_worried, x.g02_not_eaten_healthy, x.g03_ate_few_food, x.g04_skipped_meal, x.g05_ate_less, x.g06_ran_out_of_food, x.g07_hungry, x.g08_not_eaten_whole_day].some((v) => v !== null && v !== void 0 && v !== ""));
      return vals.length ? vals.filter((x) => [x.g01_worried, x.g02_not_eaten_healthy, x.g03_ate_few_food, x.g04_skipped_meal, x.g05_ate_less, x.g06_ran_out_of_food, x.g07_hungry, x.g08_not_eaten_whole_day].some(yes)).length : null;
    })(),
    low15: income.length ? income.filter((x) => getHouseholdIncome(x) < 15e3).length : null,
    low20: income.length ? income.filter((x) => getHouseholdIncome(x) < 2e4).length : null,
    incomeReported: income.length
  };
}
const INDICATORS = [{
  key: "population",
  label: "Population",
  group: "Population",
  description: "All person records",
  value: (s) => s.population
}, {
  key: "households",
  label: "Households",
  group: "Population",
  description: "Household records",
  value: (s) => s.households
}, {
  key: "male",
  label: "Male",
  group: "Population",
  description: "Male persons",
  value: (s) => s.male
}, {
  key: "female",
  label: "Female",
  group: "Population",
  description: "Female persons",
  value: (s) => s.female
}, {
  key: "children",
  label: "Children 0–14",
  group: "Age & vulnerability",
  description: "Children and young adolescents",
  value: (s) => s.children
}, {
  key: "youth",
  label: "Youth 15–24",
  group: "Age & vulnerability",
  description: "Youth population",
  value: (s) => s.youth
}, {
  key: "workingAge",
  label: "Working age 15–59",
  group: "Age & vulnerability",
  description: "Working-age population",
  value: (s) => s.workingAge
}, {
  key: "seniors",
  label: "Senior citizens 60+",
  group: "Age & vulnerability",
  description: "Older persons",
  value: (s) => s.seniors
}, {
  key: "pwd",
  label: "Persons with disability",
  group: "Age & vulnerability",
  description: "Persons flagged as PWD",
  value: (s) => s.pwd
}, {
  key: "soloParent",
  label: "Solo parents",
  group: "Age & vulnerability",
  description: "Solo parent indicators",
  value: (s) => s.soloParent
}, {
  key: "pregnant",
  label: "Pregnant persons",
  group: "Age & vulnerability",
  description: "Currently pregnant",
  value: (s) => s.pregnant
}, {
  key: "lactating",
  label: "Lactating mothers",
  group: "Age & vulnerability",
  description: "Currently lactating",
  value: (s) => s.lactating
}, {
  key: "employed",
  label: "Employed",
  group: "Work & livelihood",
  description: "Employment status",
  value: (s) => s.employed
}, {
  key: "unemployed",
  label: "Unemployed",
  group: "Work & livelihood",
  description: "Unemployment status",
  value: (s) => s.unemployed
}, {
  key: "laborForce",
  label: "Labor force",
  group: "Work & livelihood",
  description: "Persons in the labor force",
  value: (s) => s.laborForce
}, {
  key: "underemployed",
  label: "Underemployed",
  group: "Work & livelihood",
  description: "Underemployment indicator",
  value: (s) => s.underemployed
}, {
  key: "farmers",
  label: "Farmers",
  group: "Work & livelihood",
  description: "Farmer indicator",
  value: (s) => s.farmers
}, {
  key: "fisherfolk",
  label: "Fisherfolk",
  group: "Work & livelihood",
  description: "Fisherfolk indicator",
  value: (s) => s.fisherfolk
}, {
  key: "attendingSchool",
  label: "Currently attending school",
  group: "Education",
  description: "Current school attendance",
  value: (s) => s.attendingSchool
}, {
  key: "literate",
  label: "Simple literacy",
  group: "Education",
  description: "Simple literacy indicator",
  value: (s) => s.literate
}, {
  key: "tvet",
  label: "TVET graduate / attending",
  group: "Education",
  description: "TVET-related person records",
  value: (s) => s.tvet
}, {
  key: "fourPs",
  label: "4Ps households",
  group: "Social protection",
  description: "4Ps enrollment or benefit",
  value: (s) => s.fourPs
}, {
  key: "socpen",
  label: "Social pension households",
  group: "Social protection",
  description: "Social pension enrollment/benefit",
  value: (s) => s.socpen
}, {
  key: "philhealth",
  label: "PhilHealth persons",
  group: "Social protection",
  description: "PhilHealth indicator",
  value: (s) => s.philhealth
}, {
  key: "bankAccount",
  label: "Financial account households",
  group: "Household conditions",
  description: "Bank, digital or e-money account",
  value: (s) => s.bankAccount
}, {
  key: "internet",
  label: "Households with internet",
  group: "Household conditions",
  description: "Internet access",
  value: (s) => s.internet
}, {
  key: "electricity",
  label: "Households with electricity",
  group: "Household conditions",
  description: "Electricity availability",
  value: (s) => s.electricity
}, {
  key: "overcrowded",
  label: "Overcrowded households",
  group: "Household conditions",
  description: "Overcrowding status",
  value: (s) => s.overcrowded
}, {
  key: "foodConcern",
  label: "Food insecurity concern",
  group: "Household conditions",
  description: "At least one food-insecurity response",
  value: (s) => s.foodConcern
}, {
  key: "low15",
  label: "Household income < ₱15,000",
  group: "Income",
  description: "Reported H06 family income below ₱15,000",
  value: (s) => s.low15
}, {
  key: "low20",
  label: "Household income < ₱20,000",
  group: "Income",
  description: "Reported H06 family income below ₱20,000",
  value: (s) => s.low20
}, {
  key: "incomeReported",
  label: "Households with income reported",
  group: "Income",
  description: "Households with a numeric H06 income",
  value: (s) => s.incomeReported
}];
function Delta({
  oldValue,
  newValue
}) {
  if (oldValue === null || newValue === null) return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-muted-foreground", children: "N/A — field not comparable" });
  const d = newValue - oldValue;
  const sign = d > 0 ? "+" : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `font-bold ${d > 0 ? "text-success" : d < 0 ? "text-destructive" : "text-muted-foreground"}`, children: [
    sign,
    fmt(d),
    " (",
    percent(newValue, oldValue),
    ")"
  ] });
}
function CompareRow({
  item,
  a,
  b
}) {
  const max = Math.max(1, a ?? 0, b ?? 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/70 bg-background/40 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold", children: item.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: item.description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Delta, { oldValue: a, newValue: b })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-[42px_1fr_64px] items-center gap-2 text-[11px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-muted-foreground", children: "2022" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-primary", style: {
        width: `${(a ?? 0) / max * 100}%`
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right font-bold", children: a === null ? "N/A" : fmt(a) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 grid grid-cols-[42px_1fr_64px] items-center gap-2 text-[11px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-muted-foreground", children: "2024" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-success", style: {
        width: `${(b ?? 0) / max * 100}%`
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right font-bold", children: b === null ? "N/A" : fmt(b) })
    ] })
  ] });
}
function AgePyramid({
  ds,
  barangay,
  year
}) {
  const rows = reactExports.useMemo(() => {
    const out = [];
    for (let start = 80; start >= 0; start -= 5) {
      const end = start === 80 ? 200 : start + 4;
      const people = ds.persons.filter((p) => {
        const age = Number(p.a05_age);
        return (!barangay || p.area_name === barangay) && Number.isFinite(age) && age >= start && age <= end;
      });
      out.push({
        label: start === 80 ? "80+" : `${start}–${end}`,
        male: people.filter((p) => p.a03_sex === "Male").length,
        female: people.filter((p) => p.a03_sex === "Female").length
      });
    }
    return out;
  }, [ds.persons, barangay]);
  const max = Math.max(1, ...rows.flatMap((r) => [r.male, r.female]));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold", children: [
          "CBMS ",
          year,
          " age & sex pyramid"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Male left · Female right" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-primary" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-1", children: rows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_44px_1fr] items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 rounded-l bg-primary/75", style: {
        width: `${r.male / max * 100}%`
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-center text-[9px] text-muted-foreground", children: r.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 rounded-r bg-success/75", style: {
        width: `${r.female / max * 100}%`
      } }) })
    ] }, r.label)) })
  ] });
}
function BarangayHeatmap({
  ds23,
  ds24
}) {
  const rows = reactExports.useMemo(() => {
    const count = (ds) => {
      const m = /* @__PURE__ */ new Map();
      for (const p of ds.persons) m.set(p.area_name || "Not Stated", (m.get(p.area_name || "Not Stated") || 0) + 1);
      return m;
    };
    const a = count(ds23), b = count(ds24);
    return Array.from(/* @__PURE__ */ new Set([...a.keys(), ...b.keys()])).map((barangay) => ({
      barangay,
      a: a.get(barangay) || 0,
      b: b.get(barangay) || 0,
      d: (b.get(barangay) || 0) - (a.get(barangay) || 0)
    })).sort((x, y) => Math.abs(y.d) - Math.abs(x.d));
  }, [ds23.persons, ds24.persons]);
  const max = Math.max(1, ...rows.map((r) => Math.max(r.a, r.b)));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold", children: "Barangay change map" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Sorted by the largest population change so planners can spot areas needing attention." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid gap-3 md:grid-cols-2", children: rows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/70 p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: r.barangay }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: r.d > 0 ? "font-bold text-success" : r.d < 0 ? "font-bold text-destructive" : "text-muted-foreground", children: [
          r.d > 0 ? "+" : "",
          fmt(r.d)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 grid grid-cols-[42px_1fr_54px] items-center gap-2 text-[10px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "2022" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-primary", style: {
          width: `${r.a / max * 100}%`
        } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: fmt(r.a) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 grid grid-cols-[42px_1fr_54px] items-center gap-2 text-[10px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "2024" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-success", style: {
          width: `${r.b / max * 100}%`
        } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: fmt(r.b) })
      ] })
    ] }, r.barangay)) })
  ] });
}
function ComparativePage() {
  reactExports.useSyncExternalStore(subscribeData, getDataVersion, () => 0);
  const barangay = getActiveBarangay();
  const ds23 = getYearDatasets(2022);
  const ds24 = getYearDatasets(2024);
  const a = reactExports.useMemo(() => metricStats(ds23, barangay), [ds23.persons.length, ds23.households.length, barangay]);
  const b = reactExports.useMemo(() => metricStats(ds24, barangay), [ds24.persons.length, ds24.households.length, barangay]);
  const income23 = reactExports.useMemo(() => incomeSummary(ds23, barangay), [ds23.households.length, barangay]);
  const income24 = reactExports.useMemo(() => incomeSummary(ds24, barangay), [ds24.households.length, barangay]);
  const grouped = reactExports.useMemo(() => Array.from(new Set(INDICATORS.map((i) => i.group))), []);
  const rows = INDICATORS.map((item) => {
    const oldValue = item.value(a);
    const newValue = item.value(b);
    return {
      indicator: item.label,
      y2022: oldValue,
      y2024: newValue,
      difference: oldValue === null || newValue === null ? null : newValue - oldValue
    };
  });
  const payload = {
    title: "CBMS 2022–2024 Comparative Analysis",
    subtitle: barangay ? `Barangay: ${barangay}` : "Area-wide",
    columns: [{
      key: "indicator",
      label: "Indicator"
    }, {
      key: "y2022",
      label: "2022"
    }, {
      key: "y2024",
      label: "2024"
    }, {
      key: "difference",
      label: "Difference"
    }],
    rows,
    note: getSourceWatermark("comparison")
  };
  const health23 = getYearDataHealth(2022);
  const health24 = getYearDataHealth(2024);
  const yearCoverage = [{
    year: 2022,
    health: health23,
    tone: "primary"
  }, {
    year: 2024,
    health: health24,
    tone: "success"
  }];
  const headline = [{
    label: "Population",
    a: a.population,
    b: b.population,
    icon: Users
  }, {
    label: "Households",
    a: a.households,
    b: b.households,
    icon: House
  }, {
    label: "HH income < ₱20k",
    a: a.low20,
    b: b.low20,
    icon: WalletCards
  }, {
    label: "PWD",
    a: a.pwd,
    b: b.pwd,
    icon: ShieldCheck
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-7", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-elevated)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-4 w-4" }),
          " Decision dashboard"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-3xl font-black", children: "2022 vs 2024 Comparative Analysis" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-3xl text-sm leading-6 text-muted-foreground", children: "A local-data planning view that compares every common indicator we can safely normalize across both CBMS structures. Differences are shown numerically and visually; fields that do not exist in a year are not invented." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-2 text-[10px] font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/10 px-3 py-1.5 text-primary", children: barangay || "All Barangays" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-muted px-3 py-1.5", children: getSourceWatermark("comparison") })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => exportPDF(payload), className: "inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
          " PDF"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => exportDOCX(payload), className: "inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 text-sm font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
          " Word"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => printPayload(payload), className: "inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 text-sm font-bold", children: "Print" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold", children: "Both CBMS datasets are available here" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 max-w-3xl text-xs leading-5 text-muted-foreground", children: "This workspace is the single place for cross-year review. It brings the complete normalized dataset coverage for 2022 and 2024 into one view instead of making you switch between year workspaces." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "h-5 w-5 shrink-0 text-primary" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-3 md:grid-cols-2", children: yearCoverage.map(({
        year,
        health
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/70 bg-muted/20 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "CBMS" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-black", children: year })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl bg-background p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileCheck2, { className: "h-5 w-5 text-primary" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CoverageStat, { label: "Persons", value: health.persons }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CoverageStat, { label: "Households", value: health.households }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CoverageStat, { label: "Barangays", value: health.barangays }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CoverageStat, { label: "Files", value: health.files })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-success", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
          " ",
          health.totalRecords.toLocaleString(),
          " normalized records available"
        ] })
      ] }, year)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 overflow-auto rounded-xl border border-border/70", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[620px] text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Dataset" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-right", children: "2022" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-right", children: "2024" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: Object.keys(DATASET_LABELS).map((key) => {
          const left = getYearDatasets(2022)[key].length;
          const right = getYearDatasets(2024)[key].length;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-medium", children: DATASET_LABELS[key] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right", children: left.toLocaleString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right", children: right.toLocaleString() })
          ] }, key);
        }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4", children: headline.map(({
      label,
      a: a2,
      b: b2,
      icon: Icon
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-primary" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-3xl font-black", children: b2 === null ? "N/A" : fmt(b2) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs text-muted-foreground", children: [
        "2022: ",
        a2 === null ? "N/A" : fmt(a2),
        " · 2024: ",
        b2 === null ? "N/A" : fmt(b2)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Delta, { oldValue: a2, newValue: b2 }) })
    ] }, label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-5 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricBarChart, { title: "Population composition", items: [{
        label: "Children 0–14",
        a: a.children,
        b: b.children
      }, {
        label: "Youth 15–24",
        a: a.youth,
        b: b.youth
      }, {
        label: "Working age 15–59",
        a: a.workingAge,
        b: b.workingAge
      }, {
        label: "Seniors 60+",
        a: a.seniors,
        b: b.seniors
      }] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricBarChart, { title: "Work & livelihood", items: [{
        label: "Employed",
        a: a.employed,
        b: b.employed
      }, {
        label: "Unemployed",
        a: a.unemployed,
        b: b.unemployed
      }, {
        label: "Farmers",
        a: a.farmers,
        b: b.farmers
      }, {
        label: "Fisherfolk",
        a: a.fisherfolk,
        b: b.fisherfolk
      }] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricBarChart, { title: "Protection & access", items: [{
        label: "PWD",
        a: a.pwd,
        b: b.pwd
      }, {
        label: "Solo parents",
        a: a.soloParent,
        b: b.soloParent
      }, {
        label: "4Ps",
        a: a.fourPs,
        b: b.fourPs
      }, {
        label: "Social pension",
        a: a.socpen,
        b: b.socpen
      }] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChangeRanking, { rows: rows.filter((r) => r.difference !== null) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "grid gap-5 lg:grid-cols-2", children: grouped.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold", children: group }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "2022 and 2024 shown on the same scale for quick reading." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: INDICATORS.filter((i) => i.group === group).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(CompareRow, { item, a: item.value(a), b: item.value(b) }, item.key)) })
    ] }, group)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-5 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AgePyramid, { ds: ds23, barangay, year: 2022 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AgePyramid, { ds: ds24, barangay, year: 2024 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BarangayHeatmap, { ds23, ds24 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(WalletCards, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold", children: "Income shift" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Household-reported H06 Total Family Income. This is not individual salary." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IncomeCompare, { label: "Households below ₱15,000", a: income23.below15, b: income24.below15, totalA: income23.reportedHouseholds, totalB: income24.reportedHouseholds }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IncomeCompare, { label: "Households below ₱20,000", a: income23.below20, b: income24.below20, totalA: income23.reportedHouseholds, totalB: income24.reportedHouseholds })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold", children: "Complete machine-readable comparison" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[720px] text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50 text-left text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Indicator" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "2022" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "2024" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2", children: "Change" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-semibold", children: r.indicator }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: r.y2022 === null ? "N/A" : fmt(r.y2022) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: r.y2024 === null ? "N/A" : fmt(r.y2024) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Delta, { oldValue: r.y2022, newValue: r.y2024 }) })
        ] }, r.indicator)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "flex flex-col gap-1 border-t border-border pt-4 text-center text-[11px] text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: getSourceWatermark("comparison") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Comparative figures are based only on fields that can be responsibly normalized between the two CBMS structures." })
    ] })
  ] });
}
function MetricBarChart({
  title,
  items
}) {
  const max = Math.max(1, ...items.flatMap((x) => [x.a ?? 0, x.b ?? 0]));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Grouped bars · 2022 vs 2024" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-4 w-4 text-primary" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-4", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center justify-between text-[10px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: item.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
          item.a === null ? "N/A" : fmt(item.a),
          " → ",
          item.b === null ? "N/A" : fmt(item.b)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 text-[9px]", children: "22" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 flex-1 rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-primary/75", style: {
            width: `${(item.a ?? 0) / max * 100}%`
          } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 text-[9px]", children: "24" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 flex-1 rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-success/75", style: {
            width: `${(item.b ?? 0) / max * 100}%`
          } }) })
        ] })
      ] })
    ] }, item.label)) })
  ] });
}
function ChangeRanking({
  rows
}) {
  const ranked = [...rows].sort((a, b) => Math.abs(b.difference ?? 0) - Math.abs(a.difference ?? 0)).slice(0, 10);
  const max = Math.max(1, ...ranked.map((r) => Math.abs(r.difference ?? 0)));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold", children: "Largest changes at a glance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Diverging bars rank the indicators with the biggest absolute change." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-5 w-5 text-primary" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 space-y-3", children: ranked.map((r) => {
      const d = r.difference ?? 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_64px] items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold", children: r.indicator }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 h-2 rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full rounded-full ${d >= 0 ? "bg-success" : "bg-destructive"}`, style: {
            width: `${Math.min(100, Math.abs(d) / max * 100)}%`
          } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-right text-xs font-black ${d > 0 ? "text-success" : d < 0 ? "text-destructive" : "text-muted-foreground"}`, children: [
          d > 0 ? "+" : "",
          fmt(d)
        ] })
      ] }, r.indicator);
    }) })
  ] });
}
function CoverageStat({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-background p-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-bold", children: value.toLocaleString() })
  ] });
}
function IncomeCompare({
  label,
  a,
  b,
  totalA,
  totalB
}) {
  const max = Math.max(1, a ?? 0, b ?? 0);
  const line = (year, value, total, tone) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 grid grid-cols-[42px_1fr_88px] items-center gap-2 text-[11px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: year }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full rounded-full ${tone}`, style: {
      width: `${(value ?? 0) / max * 100}%`
    } }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right font-bold", children: value === null ? "N/A" : `${fmt(value)} (${total ? (value / total * 100).toFixed(1) : "N/A"}%)` })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/70 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm font-bold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Delta, { oldValue: a, newValue: b })
    ] }),
    line("2022", a, totalA, "bg-primary/75"),
    line("2024", b, totalB, "bg-success/75"),
    a === null || b === null ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[10px] text-muted-foreground", children: "Income comparison is unavailable for a year with no reported H06 income field." }) : null
  ] });
}
export {
  ComparativePage as component
};
