import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { subscribeData, getDataVersion, getYearDatasets, getAvailableBarangays, householdKey, getPersonFullName, getActiveYear, getHouseholdIncome } from "./router-n4bYjCIt.mjs";
import { D as DataTable } from "./DataTable-3ydYjkG5.mjs";
import { H as HouseholdModal } from "./CBMSModals-l01ACcnl.mjs";
import { g as getMealFrequency, i as isUnderThreeMeals } from "./food-frequency-C8UDumyi.mjs";
import "../_libs/xlsx-js-style.mjs";
import "../_libs/jspdf.mjs";
import "../_libs/jspdf-autotable.mjs";
import "../_libs/zip.js__zip.js.mjs";
import { b as Search, a2 as RotateCcw } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-effect-event+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "./cbms-labels-DwSwLAQ_.mjs";
const yes = (v) => v === "Yes" || v === "YES" || v === 1 || v === "1" || v === true;
const is4Ps = (h) => [h?.m05_a_4ps, h?.m06_a_benefit_4ps, h?.fourps, h?.four_ps].some(yes);
function matchesHouseholdSearch(h, query) {
  if (!query.trim()) return true;
  const needle = query.trim().toLowerCase();
  return [h._head_name, h.husn, h.area_name, h.address_sitio_purok, h._meal_frequency].some((v) => String(v ?? "").toLowerCase().includes(needle));
}
const FILTERS = [{
  key: "all",
  label: "All",
  fn: (_h) => true
}, {
  key: "fourps",
  label: "4Ps",
  fn: is4Ps
}, {
  key: "low_income",
  label: "Income < ₱20k",
  fn: (h) => {
    const n = getHouseholdIncome(h);
    return n !== null && n < 2e4;
  }
}, {
  key: "under3",
  label: "Food <3 meals/day",
  fn: isUnderThreeMeals
}, {
  key: "overcrowded",
  label: "Overcrowded",
  fn: (h) => /overcrowded/i.test(String(h.overcrowding_status ?? ""))
}, {
  key: "no_elec",
  label: "No electricity",
  fn: (h) => String(h.o11_electricity ?? "").toLowerCase() === "no"
}, {
  key: "no_internet",
  label: "No internet",
  fn: (h) => !yes(h.k01_internet_access)
}, {
  key: "wood_cook",
  label: "Wood cooking",
  fn: (h) => /wood/i.test(String(h.o13_fuel_for_cooking ?? ""))
}, {
  key: "no_toilet",
  label: "Unimproved toilet",
  fn: (h) => /unimproved|no facility|none/i.test(String(h.n08_toilet_facility ?? h.n08_service_level_toilet_facility ?? ""))
}];
function HouseholdsPage() {
  reactExports.useSyncExternalStore(subscribeData, getDataVersion, () => 0);
  const year = getActiveYear();
  const ds = getYearDatasets(year);
  const barangayOptions = getAvailableBarangays(year);
  const [filter, setFilter] = reactExports.useState("all");
  const [brgy, setBrgy] = reactExports.useState("");
  const [q, setQ] = reactExports.useState("");
  const [selected, setSelected] = reactExports.useState(null);
  const headByHousehold = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const p of ds.persons) {
      const key = householdKey(p);
      const head = p?.a02_relation_to_hh_head === "Head" || Number(p?.line_number) === 1;
      if (head || !map.has(key)) map.set(key, p);
    }
    return map;
  }, [ds.persons, year]);
  const decorated = reactExports.useMemo(() => ds.households.map((h) => {
    const head = headByHousehold.get(householdKey(h));
    const info = getMealFrequency(h);
    return {
      ...h,
      _head_name: head ? getPersonFullName(head) || "Not Stated" : "Not Stated",
      _meal_frequency: info.label
    };
  }), [ds.households, headByHousehold]);
  const rows = reactExports.useMemo(() => {
    const f = FILTERS.find((x) => x.key === filter);
    return decorated.filter((h) => (!brgy || h.area_name === brgy) && f.fn(h) && matchesHouseholdSearch(h, q)).slice().sort((a, b) => {
      const barangay = String(a.area_name || "").localeCompare(String(b.area_name || ""), void 0, {
        sensitivity: "base"
      });
      if (barangay !== 0) return barangay;
      const head = String(a._head_name || "Not Stated").localeCompare(String(b._head_name || "Not Stated"), void 0, {
        sensitivity: "base"
      });
      if (head !== 0) return head;
      return String(a.husn ?? "").localeCompare(String(b.husn ?? ""), void 0, {
        numeric: true
      });
    });
  }, [decorated, filter, brgy, q]);
  const counts = reactExports.useMemo(() => {
    const base = decorated.filter((h) => !brgy || h.area_name === brgy).filter((h) => matchesHouseholdSearch(h, q));
    return Object.fromEntries(FILTERS.map((f) => [f.key, base.filter(f.fn).length]));
  }, [decorated, brgy, q]);
  const barangayGroups = reactExports.useMemo(() => {
    const groups = /* @__PURE__ */ new Map();
    for (const row of rows) {
      const name = String(row.area_name || "Not Stated");
      const bucket = groups.get(name) || [];
      bucket.push(row);
      groups.set(name, bucket);
    }
    return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b, void 0, {
      sensitivity: "base"
    }));
  }, [rows]);
  const cols = [{
    key: "_head_name",
    label: "Household Head"
  }, {
    key: "husn",
    label: "HUSN"
  }, {
    key: "area_name",
    label: "Barangay"
  }, {
    key: "address_sitio_purok",
    label: "Sitio/Purok"
  }, {
    key: "hh_size",
    label: "Size"
  }, {
    key: "number_of_males",
    label: "M"
  }, {
    key: "number_of_females",
    label: "F"
  }, {
    key: "overcrowding_status",
    label: "Overcrowding"
  }, {
    key: "o11_electricity",
    label: "Electricity"
  }, {
    key: "k01_internet_access",
    label: "Internet"
  }, {
    key: "o13_fuel_for_cooking",
    label: "Cooking Fuel"
  }, {
    key: "n08_service_level_toilet_facility",
    label: "Toilet"
  }];
  FILTERS.find((x) => x.key === filter)?.label || "All";
  const title = `Households by Barangay${brgy ? ` · ${brgy}` : ""}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: "Households" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
        "CBMS ",
        year,
        " · Households are arranged by Barangay A–Z, then household head A–Z. Search, filter, and click a row for the complete household record."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 lg:flex-row lg:items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-w-0 flex-1 lg:max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search head name, HUSN, barangay…", className: "h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none ring-0 placeholder:text-muted-foreground focus:border-primary" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: brgy, onChange: (e) => setBrgy(e.target.value), className: "h-10 rounded-lg border border-border bg-background px-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All barangays" }),
          barangayOptions.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: b.area_name, children: b.area_name }, b.area_code || b.area_name))
        ] }),
        (q || brgy || filter !== "all") && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
          setQ("");
          setBrgy("");
          setFilter("all");
        }, className: "inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-border px-3 text-xs font-semibold hover:bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5" }),
          " Clear filters"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-1.5", children: FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setFilter(f.key), className: `rounded-full border px-3 py-1.5 text-xs font-semibold transition ${filter === f.key ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground hover:bg-muted"}`, children: [
        f.label,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: filter === f.key ? "opacity-80" : "opacity-60", children: [
          "(",
          (counts[f.key] || 0).toLocaleString(),
          ")"
        ] })
      ] }, f.key)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)] print:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-end justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-semibold", children: "Barangay Household Directory" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Formal index arranged alphabetically from A–Z." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-semibold text-muted-foreground", children: [
          barangayGroups.length,
          " barangay(s)"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: barangayGroups.map(([name, group]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setBrgy(name === "Not Stated" ? "" : name), className: `rounded-xl border px-3 py-2.5 text-left transition hover:bg-muted ${brgy === name ? "border-primary bg-primary/5" : "border-border bg-background"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground", children: name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 text-[11px] text-muted-foreground", children: [
          group.length.toLocaleString(),
          " household record(s)"
        ] })
      ] }, name)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { title, subtitle: `${rows.length.toLocaleString()} matching household record(s) · sorted Barangay A–Z, household head A–Z · ${ds.households.length.toLocaleString()} total in CBMS ${year}`, rows, columns: cols, onRowClick: (r) => setSelected(r) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HouseholdModal, { household: selected, onClose: () => setSelected(null) })
  ] });
}
export {
  HouseholdsPage as component
};
