import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { subscribeData, getDataVersion, getYearDatasets, getYearIncomeSummary, getAvailableBarangays, getSourceWatermark, getActiveYear, getActiveBarangay } from "./router-n4bYjCIt.mjs";
import "../_libs/xlsx-js-style.mjs";
import "../_libs/jspdf.mjs";
import "../_libs/jspdf-autotable.mjs";
import "../_libs/zip.js__zip.js.mjs";
import { U as Users, H as House, W as WalletCards, c as MapPin, j as ChartColumn, F as FileChartColumnIncreasing, S as ShieldCheck, k as HeartHandshake, y as ArrowRight } from "../_libs/lucide-react.mjs";
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
const pct = (n, d) => d ? `${(n / d * 100).toFixed(1)}%` : "N/A";
function Dashboard() {
  reactExports.useSyncExternalStore(subscribeData, getDataVersion, () => 0);
  const year = getActiveYear();
  const brgy = getActiveBarangay();
  const ds = getYearDatasets(year);
  const income = reactExports.useMemo(() => getYearIncomeSummary(year), [year, ds.households.length, ds.persons.length]);
  const persons = reactExports.useMemo(() => ds.persons.filter((p) => !brgy || p.area_name === brgy), [ds.persons, brgy]);
  const households = reactExports.useMemo(() => ds.households.filter((h) => !brgy || h.area_name === brgy), [ds.households, brgy]);
  const barangayCount = getAvailableBarangays(year).length;
  const male = persons.filter((p) => p.a03_sex === "Male").length;
  const female = persons.filter((p) => p.a03_sex === "Female").length;
  const lowIncome = households.filter((h) => Number.isFinite(Number(h.h06_total_family_income)) && Number(h.h06_total_family_income) < 2e4).length;
  const averageHouseholdSize = households.length ? households.reduce((s, h) => s + Number(h.hh_size || 0), 0) / households.length : 0;
  const metrics = [{
    label: "Population",
    value: persons.length,
    sub: `${male.toLocaleString()} male · ${female.toLocaleString()} female`,
    icon: Users
  }, {
    label: "Households",
    value: households.length,
    sub: `${averageHouseholdSize ? averageHouseholdSize.toFixed(1) : "N/A"} average members`,
    icon: House
  }, {
    label: "Low-income households",
    value: lowIncome,
    sub: `${pct(lowIncome, households.filter((h) => Number.isFinite(Number(h.h06_total_family_income))).length)} of reported income`,
    icon: WalletCards
  }, {
    label: "Barangays",
    value: barangayCount,
    sub: brgy ? `Filtered to ${brgy}` : "Area-wide",
    icon: MapPin
  }];
  const actions = [{
    title: "Compare 2022 & 2024",
    description: "Review changes across both CBMS years in one workspace.",
    to: "/comparative",
    icon: ChartColumn
  }, {
    title: "Generate reports",
    description: "Open statistical reports for either 2022 or 2024.",
    to: "/reports",
    icon: FileChartColumnIncreasing
  }, {
    title: "Validate the data",
    description: "Check completeness and export consistency before reporting.",
    to: "/validation",
    icon: ShieldCheck
  }, {
    title: "Explore sectors",
    description: "Open community rosters for priority sectors and programs.",
    to: "/sectors",
    icon: HeartHandshake
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dashboard-page space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "dashboard-hero-compact overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dashboard-hero-copy", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dashboard-eyebrow", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "dashboard-status-dot" }),
          "Community Data & Insights"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "dashboard-chip", children: "Selected Local Area" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "dashboard-chip", children: [
            "CBMS ",
            year
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "dashboard-chip", children: getSourceWatermark(year) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 max-w-3xl text-3xl font-black leading-tight tracking-tight text-foreground md:text-[2.6rem]", children: "Community-Based Monitoring System" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm leading-6 text-muted-foreground", children: "Community data for planning, reporting, analysis and evidence-based decision-making." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/comparative", className: "dashboard-primary-action", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-4 w-4" }),
            " Compare 2022 & 2024"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/reports", className: "dashboard-secondary-action", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileChartColumnIncreasing, { className: "h-4 w-4" }),
            " View reports"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dashboard-hero-photo-wrap dashboard-hero-visual", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dashboard-visual-grid" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dashboard-visual-glow dashboard-visual-glow-a" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dashboard-visual-glow dashboard-visual-glow-b" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "grid grid-cols-2 gap-3 xl:grid-cols-4", children: metrics.map((m) => {
      const Icon = m.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dashboard-metric rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] font-black uppercase tracking-[0.14em] text-muted-foreground", children: m.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "dashboard-metric-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-[1.65rem] font-black tracking-tight sm:text-2xl", children: m.value.toLocaleString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[10px] leading-4 text-muted-foreground", children: m.sub })
      ] }, m.label);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4 xl:grid-cols-[1.3fr_.7fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dashboard-panel rounded-xl border border-border bg-card shadow-[var(--shadow-card)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dashboard-panel-head", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "dashboard-section-label", children: "Quick access" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 text-lg font-black", children: "Common data tasks" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "dashboard-head-note", children: [
            "Selected year: ",
            year
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-2.5 md:grid-cols-2", children: actions.map((item) => {
          const Icon = item.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: item.to, className: "dashboard-action-card group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "dashboard-action-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 text-sm font-bold", children: [
                item.title,
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 transition group-hover:translate-x-1" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-[11px] leading-4.5 text-muted-foreground", children: item.description })
            ] })
          ] }, item.title);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dashboard-panel rounded-xl border border-border bg-card shadow-[var(--shadow-card)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "dashboard-section-label", children: "Income snapshot" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 text-lg font-black", children: "Household income indicators" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-[11px] leading-5 text-muted-foreground", children: [
          "Reported total family income for CBMS ",
          year,
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IncomeLine, { label: "Below ₱15,000", value: income.below15, total: income.reportedHouseholds, tone: "warning" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(IncomeLine, { label: "Below ₱20,000", value: income.below20, total: income.reportedHouseholds, tone: "success" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-lg border border-border bg-muted/35 p-3 text-[10px] leading-4.5 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Data note:" }),
          " figures refer to household-reported total family income."
        ] })
      ] })
    ] })
  ] });
}
function IncomeLine({
  label,
  value,
  total,
  tone
}) {
  const percent = total ? value / total * 100 : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black", children: value.toLocaleString() })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-2 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full rounded-full ${tone === "warning" ? "bg-warning" : "bg-success"}`, style: {
      width: `${Math.min(100, percent)}%`
    } }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-right text-[9px] text-muted-foreground", children: total ? `${percent.toFixed(1)}% of reported households` : "No reported income" })
  ] });
}
export {
  Dashboard as component
};
