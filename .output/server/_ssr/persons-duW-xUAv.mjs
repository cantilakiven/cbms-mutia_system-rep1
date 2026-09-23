import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { I as Input } from "./input-DRTFHFri.mjs";
import { Route as Route$5, Button, exportCSV, exportXLSX, exportPDF, exportDOCX, printPayload, barangays } from "./router-n4bYjCIt.mjs";
import { g as getEnrichedPersons, i as isMember, b as assessLowIncome } from "./cbms-recognition-D6VhIdmt.mjs";
import { D as DataTable } from "./DataTable-3ydYjkG5.mjs";
import { P as PersonModal } from "./CBMSModals-l01ACcnl.mjs";
import "../_libs/xlsx-js-style.mjs";
import "../_libs/jspdf.mjs";
import "../_libs/jspdf-autotable.mjs";
import "../_libs/zip.js__zip.js.mjs";
import { b as Search, X, a0 as FileArchive } from "../_libs/lucide-react.mjs";
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
const DEFAULT_COLS = [
  { key: "_full_name", label: "Full Name" },
  { key: "a05_age", label: "Age" },
  { key: "a03_sex", label: "Sex" },
  { key: "a07_marital_status", label: "Civil Status" },
  { key: "area_name", label: "Barangay" },
  { key: "_purok", label: "Purok / Sitio" },
  { key: "_address", label: "Address" },
  { key: "_hh_head", label: "Household Head" },
  { key: "e08_class_of_worker", label: "Class of Worker" }
];
function parseAgeRange(q) {
  const m = q.match(/(\d{1,3})\s*[-–to]+\s*(\d{1,3})/);
  if (m) return [parseInt(m[1]), parseInt(m[2])];
  const lt = q.match(/(?:under|below|less than)\s*(\d{1,3})/);
  if (lt) return [0, parseInt(lt[1]) - 1];
  const ge = q.match(/(?:over|above|at least|older than|\bge\b)\s*(\d{1,3})/);
  if (ge) return [parseInt(ge[1]), 120];
  const eq = q.match(/\bage\s*(\d{1,3})\b/);
  if (eq) return [parseInt(eq[1]), parseInt(eq[1])];
  return null;
}
function findBarangay(q) {
  const lower = q.toLowerCase();
  for (const b of barangays) {
    if (lower.includes(b.area_name.toLowerCase())) return b.area_name;
  }
  return null;
}
const NAME_STOPWORDS = /* @__PURE__ */ new Set([
  "in",
  "of",
  "at",
  "the",
  "and",
  "or",
  "with",
  "a",
  "an",
  "by",
  "for",
  "to",
  "on",
  "from",
  "years",
  "year",
  "old",
  "male",
  "female",
  "men",
  "women",
  "man",
  "woman",
  "boy",
  "boys",
  "girl",
  "girls",
  "child",
  "children",
  "senior",
  "seniors",
  "citizen",
  "citizens",
  "pwd",
  "disability",
  "disabilities",
  "solo",
  "parent",
  "parents",
  "pregnant",
  "lactating",
  "employed",
  "unemployed",
  "underemployed",
  "farmer",
  "farmers",
  "fisherfolk",
  "fisher",
  "fishermen",
  "tvet",
  "student",
  "students",
  "school",
  "widow",
  "widowed",
  "separated",
  "married",
  "single",
  "4ps",
  "pantawid",
  "food",
  "stamp",
  "fsp",
  "socpen",
  "pension",
  "philhealth",
  "sss",
  "gsis",
  "beneficiaries",
  "beneficiary",
  "member",
  "members",
  "youth",
  "infant",
  "infants",
  "toddler",
  "toddlers",
  "elderly",
  "under",
  "below",
  "over",
  "above",
  "less",
  "than",
  "least",
  "ge",
  "age",
  "graduates",
  "graduate",
  "currently",
  "attending",
  "not",
  "low",
  "income",
  "poor",
  "poverty",
  "indigent",
  "earner"
]);
const normName = (s) => s.toLowerCase().replace(/[^a-zñ\s'-]/g, " ").replace(/\s+/g, " ").trim();
function extractNameTokens(query, brgy) {
  const q = normName(query);
  if (!q) return [];
  return q.split(" ").filter((t) => t.length >= 2 && !NAME_STOPWORDS.has(t) && (!brgy || !brgy.toLowerCase().includes(t)));
}
function smartQuery(query) {
  const q = query.trim();
  const lower = q.toLowerCase();
  const filters = [];
  let rows = getEnrichedPersons();
  if (/\b(male|men|man|boys?)\b/.test(lower) && !/female/.test(lower)) {
    rows = rows.filter((p) => p.a03_sex === "Male");
    filters.push("Male");
  }
  if (/\b(female|women|woman|girls?)\b/.test(lower)) {
    rows = rows.filter((p) => p.a03_sex === "Female");
    filters.push("Female");
  }
  const range = parseAgeRange(lower);
  if (range) {
    rows = rows.filter((p) => typeof p.a05_age === "number" && p.a05_age >= range[0] && p.a05_age <= range[1]);
    filters.push(`Age ${range[0]}–${range[1]}`);
  }
  if (/senior\s*citizen/.test(lower) || lower.includes("elderly")) {
    rows = rows.filter((p) => typeof p.a05_age === "number" && p.a05_age >= 60);
    filters.push("Senior Citizens (60+)");
  }
  if (/\bchildren?\b/.test(lower) && !range) {
    rows = rows.filter((p) => typeof p.a05_age === "number" && p.a05_age <= 17);
    filters.push("Children (0–17)");
  }
  if (/\binfants?\b|\btoddlers?\b/.test(lower)) {
    rows = rows.filter((p) => typeof p.a05_age === "number" && p.a05_age <= 5);
    filters.push("Ages 0–5");
  }
  if (/youth/.test(lower)) {
    rows = rows.filter((p) => typeof p.a05_age === "number" && p.a05_age >= 15 && p.a05_age <= 30);
    filters.push("Youth (15–30)");
  }
  if (/\bpwd\b|disabilit/.test(lower)) {
    rows = rows.filter((p) => isMember("pwd", p));
    filters.push("Persons with Disability");
  }
  if (/solo\s*parent/.test(lower)) {
    rows = rows.filter((p) => p.b05_solo_parent === "Yes");
    filters.push("Solo Parents");
  }
  if (/pregnan/.test(lower)) {
    rows = rows.filter((p) => p.b08_currently_pregnant === "Yes");
    filters.push("Currently Pregnant");
  }
  if (/lactating/.test(lower)) {
    rows = rows.filter((p) => p.b09_lactating_mother === "Yes");
    filters.push("Lactating Mothers");
  }
  if (/unemploye/.test(lower)) {
    rows = rows.filter((p) => p.e01_employment_status === "Unemployed");
    filters.push("Unemployed");
  } else if (/\bemploye/.test(lower) && !/under|un/.test(lower)) {
    rows = rows.filter((p) => p.e01_employment_status === "Employed");
    filters.push("Employed");
  }
  if (/underemploye/.test(lower)) {
    rows = rows.filter((p) => p.e01_underemployment_status === "Underemployed");
    filters.push("Underemployed");
  }
  if (/\bfarmers?\b|farming/.test(lower)) {
    rows = rows.filter((p) => p.e17_farmer === "Yes");
    filters.push("Farmers");
  }
  if (/fisherfolk|fisher(men)?/.test(lower)) {
    rows = rows.filter((p) => p.e18_fisherfolk === "Yes");
    filters.push("Fisherfolk");
  }
  if (/\btvet\b|technical[- ]vocational/.test(lower)) {
    rows = rows.filter((p) => p.d07_tvet_graduate === "Yes" || p.d08_tvet_currently_attending === "Yes");
    filters.push("TVET");
  }
  if (/students?|attending school|in school/.test(lower)) {
    rows = rows.filter((p) => p.d01_currently_attending_school === "Yes");
    filters.push("Students");
  }
  if (/out[- ]of[- ]school|not attending school|not in school/.test(lower)) {
    rows = rows.filter((p) => p.d01_currently_attending_school === "No" && typeof p.a05_age === "number" && p.a05_age >= 5 && p.a05_age <= 24);
    filters.push("Out-of-School Youth (5–24)");
  }
  if (/widow/.test(lower)) {
    rows = rows.filter((p) => p.a07_marital_status === "Widowed");
    filters.push("Widowed");
  }
  if (/separated/.test(lower)) {
    rows = rows.filter((p) => p.a07_marital_status === "Separated");
    filters.push("Separated");
  }
  if (/married/.test(lower)) {
    rows = rows.filter((p) => p.a07_marital_status === "Married");
    filters.push("Married");
  }
  if (/single|never married/.test(lower)) {
    rows = rows.filter((p) => p.a07_marital_status === "Single");
    filters.push("Single");
  }
  const isYes = (v) => v === "Yes" || v === 1 || v === "1" || v === true;
  if (/4\s*p[s']?|pantawid/.test(lower)) {
    rows = rows.filter((p) => isYes(p._hh?.m05_a_4ps) || isYes(p._hh?.m06_a_benefit_4ps));
    filters.push("4Ps Beneficiaries");
  }
  if (/food\s*stamp|food\s*ramp|fsp\b/.test(lower)) {
    rows = rows.filter((p) => isYes(p._hh?.m05_d_food_stamp) || isYes(p._hh?.m06_d_benefit_food_stamp));
    filters.push("Food Stamp Members");
  }
  if (/socpen|social pension/.test(lower)) {
    rows = rows.filter((p) => isMember("socpen", p));
    filters.push("Social Pension");
  }
  if (/philhealth/.test(lower)) {
    rows = rows.filter((p) => p.m01_c_philhealth === "Yes");
    filters.push("PhilHealth Members");
  }
  if (/\bsss\b/.test(lower)) {
    rows = rows.filter((p) => p.m01_a_sss === "Yes");
    filters.push("SSS Members");
  }
  if (/\bgsis\b/.test(lower)) {
    rows = rows.filter((p) => p.m01_b_gsis === "Yes");
    filters.push("GSIS Members");
  }
  let lowIncomeMode = false;
  if (/low[- ]?income|\bpoor\b|poverty|indigent|low earner/.test(lower)) {
    rows = rows.map((p) => ({ p, a: assessLowIncome(p) })).filter((x) => x.a.isLow).sort((a, b) => b.a.score - a.a.score).map((x) => ({ ...x.p, _li_score: x.a.score, _li_reasons: x.a.reasons.join("; ") }));
    filters.push("Low-Income (verified signals)");
    lowIncomeMode = true;
  }
  const brgy = findBarangay(q);
  if (brgy) {
    rows = rows.filter((p) => p.area_name === brgy);
    filters.push(`Barangay ${brgy}`);
  }
  const queryNorm = normName(lower);
  const nameTokens = extractNameTokens(lower, brgy);
  if (nameTokens.length > 0) {
    const scored = rows.map((p) => {
      const name = normName(String(p._full_name ?? ""));
      if (!name) return { p, score: 0 };
      const nameWords = name.split(" ");
      let score = 0;
      let matched = 0;
      for (const t of nameTokens) {
        let tScore = 0;
        if (nameWords.includes(t)) tScore += 6;
        else if (nameWords.some((w) => w.startsWith(t))) tScore += 4;
        else if (name.includes(t)) tScore += 2;
        if (tScore > 0) {
          matched++;
          score += tScore;
        }
      }
      if (name === queryNorm) score += 25;
      else if (name.startsWith(queryNorm)) score += 8;
      if (matched === 0) return { p, score: 0 };
      if (matched < nameTokens.length) score = Math.max(1, score - (nameTokens.length - matched) * 3);
      return { p, score };
    }).filter((x) => x.score > 0).sort((a, b) => b.score - a.score);
    if (scored.length > 0) {
      rows = scored.map((x) => x.p);
      filters.push(`Name: "${nameTokens.join(" ")}"`);
    }
  }
  const cols = [...DEFAULT_COLS];
  if (lowIncomeMode) {
    cols.push(
      { key: "e01_employment_status", label: "Employment" },
      { key: "e08_class_of_worker", label: "Class of Worker" },
      { key: "m05_a_4ps", label: "4Ps" },
      { key: "_li_score", label: "Signals" },
      { key: "_li_reasons", label: "Why flagged" }
    );
  }
  if (filters.some((f) => /Farmer|Fisher/.test(f))) {
    cols.push({ key: "e05_psoc", label: "Occupation" });
  }
  if (filters.some((f) => /Employ|Unemploy|Underemploy/.test(f))) {
    cols.push({ key: "e01_employment_status", label: "Employment" }, { key: "e05_occupation_group", label: "Occupation Group" });
  }
  if (filters.some((f) => /TVET/.test(f))) {
    cols.push({ key: "d07_tvet_graduate", label: "TVET Grad" });
  }
  if (filters.some((f) => /PWD|Disabil/.test(f))) {
    cols.push({ key: "b11_with_pwd_id", label: "PWD ID" });
  }
  if (filters.some((f) => /Senior/.test(f))) {
    cols.push({ key: "b07_senior_citizen_id", label: "Sr. ID" });
  }
  if (filters.some((f) => /4Ps|Pension|PhilHealth|SSS|GSIS/.test(f))) {
    cols.push({ key: "m05_a_4ps", label: "4Ps" }, { key: "m01_c_philhealth", label: "PhilHealth" });
  }
  if (filters.some((f) => /Student|School/.test(f))) {
    cols.push({ key: "a11_hgc_level", label: "Education Level" });
  }
  const title = filters.length ? `List of ${filters.join(" • ")}` : q ? `Search Results for “${q}”` : "All Persons";
  return {
    title,
    subtitle: `${rows.length.toLocaleString()} record(s) found${filters.length ? "" : " — refine your search to narrow down"}`,
    rows,
    columns: cols,
    total: rows.length,
    matchedFilters: filters
  };
}
function Highlight({
  text,
  tokens
}) {
  if (!text) return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "—" });
  const escaped = tokens.filter((t) => t && t.length >= 2).map((t) => t.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"));
  if (!escaped.length) return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: text });
  const re = new RegExp(`((?:${escaped.join("|")})[A-Za-zÑñ'-]*)`, "ig");
  const parts = text.split(re);
  const lowerTokens = tokens.map((t) => t.toLowerCase());
  const isMatch = (p) => {
    const lp = p.toLowerCase();
    return lowerTokens.some((t) => lp === t || lp.startsWith(t));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: parts.map((part, i) => part && isMatch(part) ? /* @__PURE__ */ jsxRuntimeExports.jsx("mark", { className: "rounded bg-yellow-200 px-0.5 font-semibold text-foreground dark:bg-yellow-500/40", children: part }, i) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: part }, i)) });
}
function PersonsPage() {
  const {
    q
  } = Route$5.useSearch();
  const navigate = Route$5.useNavigate();
  const [text, setText] = reactExports.useState(q);
  const [debounced, setDebounced] = reactExports.useState(q);
  const [showSugg, setShowSugg] = reactExports.useState(false);
  const [selected, setSelected] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setDebounced(text), 180);
    return () => clearTimeout(t);
  }, [text]);
  reactExports.useEffect(() => {
    if (debounced !== q) queueMicrotask(() => navigate({
      search: {
        q: debounced
      },
      replace: true
    }));
  }, [debounced]);
  const result = reactExports.useMemo(() => smartQuery(debounced), [debounced]);
  const hlTokens = reactExports.useMemo(() => extractNameTokens(debounced), [debounced]);
  const suggestions = reactExports.useMemo(() => {
    if (!text.trim() || text.trim().length < 2) return [];
    return result.rows.slice(0, 8);
  }, [text, result.rows]);
  const openPerson = reactExports.useCallback((p) => setSelected(p), []);
  const closePerson = reactExports.useCallback(() => setSelected(null), []);
  const allPersonsPayload = reactExports.useMemo(() => {
    const rows = getEnrichedPersons().slice().sort((a, b) => {
      const ba = String(a.area_name || "").localeCompare(String(b.area_name || ""));
      if (ba !== 0) return ba;
      return String(a._full_name || "").localeCompare(String(b._full_name || ""));
    });
    const columns = [{
      key: "_full_name",
      label: "Full Name"
    }, {
      key: "a05_age",
      label: "Age"
    }, {
      key: "a03_sex",
      label: "Sex"
    }, {
      key: "a07_marital_status",
      label: "Civil Status"
    }, {
      key: "area_name",
      label: "Barangay"
    }, {
      key: "_purok",
      label: "Purok / Sitio"
    }, {
      key: "_address",
      label: "Address"
    }, {
      key: "_hh_head",
      label: "Household Head"
    }, {
      key: "a02_relation_to_hh_head",
      label: "Relation"
    }, {
      key: "a11_hgc_level",
      label: "Education Level"
    }, {
      key: "e01_employment_status",
      label: "Employment"
    }, {
      key: "e05_occupation_group",
      label: "Occupation"
    }, {
      key: "b10_pwd",
      label: "PWD"
    }, {
      key: "b05_solo_parent",
      label: "Solo Parent"
    }, {
      key: "husn",
      label: "HUSN"
    }, {
      key: "hsn",
      label: "HSN"
    }, {
      key: "line_number",
      label: "Line #"
    }];
    const bySex = rows.reduce((a, p) => {
      const k = p.a03_sex || "Unspecified";
      a[k] = (a[k] || 0) + 1;
      return a;
    }, {});
    const summary = [{
      label: "Total Persons",
      value: rows.length
    }, {
      label: "Male",
      value: bySex.Male || 0
    }, {
      label: "Female",
      value: bySex.Female || 0
    }, {
      label: "Household Heads",
      value: rows.filter((p) => p.a02_relation_to_hh_head === "Head" || p.line_number === 1).length
    }];
    return {
      title: "All Persons Basic Details",
      subtitle: `Complete personal roster (${rows.length.toLocaleString()} records)`,
      columns,
      rows,
      summary
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: "Person Search" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
        "Live search — type a ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "full name" }),
        ", a sector, age range, or community indicator. Results update as you type. Examples: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: '"Juan Dela Cruz"' }),
        ", ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: '"senior citizens"' }),
        ",",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: '"0-5 years old"' }),
        ", ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: '"PWD seniors"' }),
        ", ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: '"low income Poblacion"' }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 sm:flex-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: text, onChange: (e) => {
            setText(e.target.value);
            setShowSugg(true);
          }, onFocus: () => setShowSugg(true), onBlur: () => setTimeout(() => setShowSugg(false), 150), onKeyDown: (e) => {
            if (e.key === "Escape") {
              setShowSugg(false);
              setText("");
            }
          }, placeholder: "Search persons by name, sector, age, sex, barangay…", className: "h-11 pl-9 pr-9 text-base", autoComplete: "off" }),
          text && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setText(""), className: "absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:bg-muted", "aria-label": "Clear search", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", onClick: () => setShowSugg(false), className: "h-11 px-6", children: "Search" })
      ] }),
      showSugg && suggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute left-0 right-0 z-30 mt-1 max-h-80 overflow-auto rounded-lg border border-border bg-popover shadow-lg sm:right-[6.5rem]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border bg-muted/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground", children: [
          "Top ",
          suggestions.length,
          " match",
          suggestions.length === 1 ? "" : "es",
          " · ",
          result.rows.length.toLocaleString(),
          " total"
        ] }),
        suggestions.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onMouseDown: (e) => {
          e.preventDefault();
          openPerson(p);
          setShowSugg(false);
        }, className: "flex w-full items-start gap-3 border-b border-border/40 px-3 py-2 text-left text-sm transition hover:bg-muted/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground", children: p._full_name ? /* @__PURE__ */ jsxRuntimeExports.jsx(Highlight, { text: p._full_name, tokens: hlTokens }) : "(no name)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              p.a03_sex || "—",
              " · Age ",
              p.a05_age ?? "—",
              " ·",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Highlight, { text: p.area_name || "—", tokens: hlTokens }),
              p._purok ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                " · ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(Highlight, { text: p._purok, tokens: hlTokens })
              ] }) : ""
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground", children: [
            "HUSN ",
            p.husn ?? "—"
          ] })
        ] }, `${p.area_code}-${p.husn}-${p.hsn}-${p.line_number}-${i}`))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-primary/30 bg-primary/5 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-semibold text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileArchive, { className: "h-4 w-4 text-primary" }),
          " Export Every Person — Basic Details"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
          "Complete personal roster with full name, age, sex, civil status, barangay, purok, address, household head, education, employment, and sector flags. Delivered inside an AES-256 password-protected ZIP; password is stored in the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/export-log", className: "underline", children: "Export Log" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => exportCSV(allPersonsPayload), children: "All Persons · CSV" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => exportXLSX(allPersonsPayload), children: "All Persons · Excel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => exportPDF(allPersonsPayload), children: "All Persons · PDF" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => exportDOCX(allPersonsPayload), children: "All Persons · Word" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => printPayload(allPersonsPayload), children: "All Persons · Print" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { title: result.title, subtitle: result.subtitle, rows: result.rows, columns: result.columns, onRowClick: openPerson, emptyText: "No matching persons. Try a different name or keyword." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PersonModal, { person: selected, onClose: closePerson })
  ] });
}
export {
  PersonsPage as component
};
