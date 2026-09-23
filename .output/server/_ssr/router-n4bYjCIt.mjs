import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useLocation, e as useNavigate, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { R as Root, I as Indicator } from "../_libs/radix-ui__react-progress.mjs";
import { x as xlsx_minExports } from "../_libs/xlsx-js-style.mjs";
import { j as jspdf_node_minExports } from "../_libs/jspdf.mjs";
import { a as autoTable } from "../_libs/jspdf-autotable.mjs";
import { B as BlobWriter, Z as ZipWriter, T as TextReader, a as BlobReader } from "../_libs/zip.js__zip.js.mjs";
import { S as ShieldCheck, L as LockKeyhole, a as ShieldAlert, X, M as Menu, b as Search, C as CalendarDays, c as MapPin, d as ChevronDown, e as LoaderCircle, f as CloudDownload, g as CircleAlert, h as CircleCheck, i as LayoutDashboard, j as ChartColumn, U as Users, H as House, B as Baby, k as HeartHandshake, G as Grid3x3, F as FileChartColumnIncreasing, l as BookOpen, D as Database, K as KeyRound, m as Upload, n as Settings, E as EyeOff, o as Eye, p as Check, q as Clipboard, R as RefreshCw, P as Printer, r as PanelLeftOpen, s as PanelLeftClose, A as Activity, t as Sun, u as Moon, v as FileCheck2, w as FolderOpen, T as Trash2, x as TriangleAlert } from "../_libs/lucide-react.mjs";
import { o as object, s as string } from "../_libs/zod.mjs";
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
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
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
const appCss = "/assets/styles-SbIDAYTZ.css";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const logo = "/assets/cbms-insights-logo-C9waL7MR.png";
const INSTALL_KEY = "localdata.installed-at";
const ACK_KEY = "localdata.monthly-checkin.ack";
const PERIOD_DAYS = 30;
function store() {
  if (typeof window === "undefined") return null;
  return window.electronStore ?? null;
}
function MonthlyCheckinModal() {
  const [state, setState] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let cancelled = false;
    (async () => {
      const bridge = store();
      let installedAt = 0;
      if (bridge) {
        try {
          const raw = await bridge.getSetting(INSTALL_KEY);
          const parsed = Number(raw);
          if (Number.isFinite(parsed) && parsed > 0) installedAt = parsed;
        } catch {
        }
      }
      if (!installedAt) {
        const raw = localStorage.getItem(INSTALL_KEY);
        const parsed = raw ? Number(raw) : NaN;
        installedAt = Number.isFinite(parsed) && parsed > 0 ? parsed : Date.now();
      }
      localStorage.setItem(INSTALL_KEY, String(installedAt));
      if (bridge) {
        try {
          await bridge.saveSetting(INSTALL_KEY, installedAt);
        } catch {
        }
      }
      const period = Math.floor((Date.now() - installedAt) / (PERIOD_DAYS * 864e5));
      if (cancelled || period < 1) return;
      let acked = localStorage.getItem(ACK_KEY);
      if (bridge && !acked) {
        try {
          const remote = await bridge.getSetting(ACK_KEY);
          if (remote != null) acked = String(remote);
        } catch {
        }
      }
      if (acked !== String(period)) setState({ period });
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  if (!state) return null;
  const acknowledge = () => {
    localStorage.setItem(ACK_KEY, String(state.period));
    store()?.saveSetting(ACK_KEY, String(state.period)).catch(() => {
    });
    setState(null);
  };
  const monthsInUse = state.period;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[101] flex items-center justify-center bg-background/85 p-4 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "CBMS Insights logo", className: "h-14 w-14 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: "Maintenance reminder" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Local Data — Community Data & Insights" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3 rounded-lg border border-warning/40 bg-warning/10 p-4 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 font-medium", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-4 w-4 text-warning" }),
        " Please consult the developer"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
        "This software has been installed and in use for",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "text-foreground", children: monthsInUse === 1 ? "30 days" : `${monthsInUse * PERIOD_DAYS} days` }),
        ". This is a reminder for the developer,",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "text-foreground", children: "Kiven Cantila" }),
        ", to maintain and check this software. Please coordinate with him for updates, data checks and continued maintenance. No other person is authorized to modify this system."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: acknowledge, children: "I understand" }) })
  ] }) });
}
const BARANGAYS = {
  "001": "Alvenda",
  "002": "Buenasuerte",
  "003": "Diland",
  "004": "Diolen",
  "005": "Head Tipan",
  "006": "New Casul",
  "007": "Newland",
  "008": "New Siquijor",
  "009": "Paso Rio",
  "010": "Poblacion",
  "011": "San Miguel",
  "012": "Tinglan",
  "013": "Totongon",
  "014": "Tubac",
  "015": "Unidos",
  "016": "Santo Tomas"
};
const yesNo = (v) => {
  const n = code(v);
  if (n === 1) return "Yes";
  if (n === 2) return "No";
  return v === null || v === void 0 || v === "" ? null : String(v);
};
const code = (v) => {
  if (v && typeof v === "object" && "code" in v) return v.code;
  return v;
};
const str = (v) => {
  const x = code(v);
  if (x === null || x === void 0 || x === "") return null;
  return String(x);
};
const num = (v) => {
  const x = code(v);
  if (x === null || x === void 0 || x === "") return null;
  const n = Number(x);
  return Number.isFinite(n) ? n : null;
};
const pad = (v, n) => {
  const x = str(v);
  return x === null ? "".padStart(n, "0") : x.padStart(n, "0");
};
function safeLookup(map, val, fallback) {
  return val !== null && val in map ? map[val] : fallback;
}
function sectionOne(h, name) {
  const a = h?.[name];
  return Array.isArray(a) && a[0] && typeof a[0] === "object" ? a[0] : {};
}
function sectionRows(h, name) {
  const a = h?.[name];
  return Array.isArray(a) ? a.filter((x) => x && typeof x === "object") : [];
}
function unwrapLegacy(value) {
  if (Array.isArray(value)) return value.map(unwrapLegacy);
  if (value && typeof value === "object") {
    if (Object.keys(value).length === 1 && Object.prototype.hasOwnProperty.call(value, "code")) {
      return unwrapLegacy(value.code);
    }
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, unwrapLegacy(item)])
    );
  }
  return value;
}
function legacyRaw(h) {
  return unwrapLegacy(h?.HPQF2_LEVEL || {});
}
function areaMeta(h, filename) {
  const region = pad(h.REGION_CODE, 2);
  const province = pad(h.PROVINCE_CODE, 3);
  const city = pad(h.CITY_MUN_CODE, 2);
  const brgy = pad(h.BARANGAY_CODE, 3);
  const areaCode = `${region}${province}${city}${brgy}`;
  const municipalityCode = `${region}${province}${city}`;
  const areaName = BARANGAYS[brgy] || `Barangay ${Number(brgy) || brgy}`;
  return {
    area_code: areaCode,
    area_name: areaName,
    region_code: region,
    province_code: province,
    city_mun_code: city,
    barangay_code: brgy,
    id: municipalityCode,
    name: "Selected Local Area",
    legacy_source: filename
  };
}
const RELATION = {
  1: "Head",
  2: "Spouse",
  3: "Son",
  4: "Daughter",
  5: "Stepson",
  6: "Stepdaughter",
  7: "Son-in-law",
  8: "Daughter-in-law",
  9: "Grandson",
  10: "Granddaughter",
  11: "Father",
  12: "Mother",
  13: "Father-in-law",
  14: "Mother-in-law",
  15: "Brother",
  16: "Sister",
  17: "Brother-in-law",
  18: "Sister-in-law",
  19: "Uncle",
  20: "Aunt",
  21: "Nephew",
  22: "Niece",
  23: "Other relative",
  24: "Boarder",
  25: "Domestic helper",
  26: "Nonrelative"
};
const NUCLEAR_RELATION = {
  0: "One-member household",
  1: "Family head",
  2: "Spouse",
  3: "Partner",
  4: "Son",
  5: "Daughter",
  6: "Brother",
  7: "Sister",
  8: "Father",
  9: "Mother",
  10: "Other family member"
};
const MARITAL = {
  1: "Single",
  2: "Married",
  3: "Common law/live-in",
  4: "Widowed",
  5: "Divorced",
  6: "Separated",
  7: "Annulled",
  8: "Unknown"
};
const CLASS_OF_WORKER = {
  0: "Worked for private household",
  1: "Worked for private establishment",
  2: "Worked for government/government-owned and controlled corporation",
  3: "Self-employed without paid employee",
  4: "Employer in own family-operated farm or business",
  5: "Worked with pay in own family-operated farm or business",
  6: "Worked without pay in own family-operated farm or business"
};
const NATURE_OF_EMPLOYMENT = {
  1: "Permanent job/business/unpaid family work",
  2: "Short-term or seasonal or casual job/business, unpaid family work",
  3: "Worked for different employers or customers on day-to-day or week-to-week basis"
};
const BASIS_OF_PAYMENT = {
  0: "In-kind, imputed",
  1: "Per piece",
  2: "Per hour",
  3: "Per day",
  4: "Monthly",
  5: "Pakyaw",
  6: "Other salaries/wages",
  7: "Not salaries/wages"
};
const EMPLOYMENT_FROM_PERSON = (p) => {
  const worked = code(p.E01_WORK_PAST_WEEK) === 1;
  const looking = code(p.E25_TRY_LOOK_FOR_WORK_OR_DO_BUSINESS) === 1;
  const available = code(p.E31_AVAILABLE_FOR_WORK) === 1;
  if (worked || code(p.E03_JOB_OR_BUSINESS_PAST_WEEK) === 1) return "Employed";
  if (looking || available) return "Unemployed";
  return "Not in Labor Force";
};
const laborForceFromPerson = (p) => {
  const status = EMPLOYMENT_FROM_PERSON(p);
  return status === "Not in Labor Force" ? "Not in labor force" : "In the labor force";
};
function birthdayParts(v) {
  const s = str(v);
  if (!s) return { month: null, day: null, year: null };
  const x = s.padStart(8, "0");
  return {
    month: Number(x.slice(0, 2)) || null,
    day: Number(x.slice(2, 4)) || null,
    year: Number(x.slice(4, 8)) || null
  };
}
const EDUCATION_LEVELS_2022 = {
  0: "Early childhood education",
  1: "Elementary level",
  2: "Junior high school level",
  3: "Senior high school level",
  4: "Post-secondary non-tertiary level",
  5: "Short-cycle tertiary level",
  6: "College level",
  7: "Masteral level",
  8: "Doctoral level"
};
function educationLevel2022(level, hgc) {
  const direct = EDUCATION_LEVELS_2022[num(level) ?? -1];
  if (direct) return direct;
  const rawCode = code(hgc);
  if (rawCode === null || rawCode === void 0 || rawCode === "") return null;
  const raw = String(rawCode).padStart(8, "0");
  if (/^0+$/.test(raw)) return "Early childhood education";
  if (raw.startsWith("34") || raw.startsWith("35") || raw.startsWith("37")) return "Senior high school level";
  if (raw.startsWith("24") || raw.startsWith("23") || raw.startsWith("20")) return "Junior high school level";
  if (raw.startsWith("10")) return "Elementary level";
  if (raw.startsWith("60")) return "College level";
  if (raw.startsWith("50")) return "Short-cycle tertiary level";
  if (raw.startsWith("40")) return "Post-secondary non-tertiary level";
  return null;
}
function educationGroup2022(hgc, level) {
  const raw = String(code(hgc) ?? "").padStart(8, "0");
  if (!raw) return null;
  if (raw === "00000000") return "No grade completed";
  if (raw.startsWith("340")) return "Senior high school level";
  if (raw.startsWith("350")) return "Senior high school level";
  if (raw.startsWith("37")) return "Senior high school level";
  const lvl = educationLevel2022(level, hgc);
  return lvl;
}
function makePerson(h, source, filename, meta, gByLine) {
  const line = pad(source.LINE_NUMBER, 2);
  const bday = birthdayParts(source.A06_BIRTHDAY);
  const g = gByLine.get(line) || {};
  const p2Rows = sectionRows(h, "SECTION_P02_TO_P13");
  const p2Line = p2Rows.find((row) => pad(row.P2_LINE_NUMBER || row.SECTION_P_LINE_NUMBER, 2) === line) || {};
  const sexCode = num(source.A05_SEX);
  const age = num(source.A07_AGE);
  const relationCode = num(source.A02_RELATION_TO_HH_HEAD);
  const nuclearCode = num(source.A04_RELATION_TO_NUCLEAR_FAMILY_HEAD);
  const maritalCode = num(source.A09_MARITAL_STATUS);
  const classCode = num(source.E18_CLASS_OF_WORKER);
  const basisCode = num(source.E19_BASIS_OF_PAYMENT);
  const natureCode = num(source.E11_NATURE_OF_EMPLOYMENT);
  const employment = EMPLOYMENT_FROM_PERSON(source);
  const underemployed = employment === "Employed" && (code(source.E15_WANT_MORE_HOURS) === 1 || code(source.E16_LOOKING_FOR_ADDITIONAL_WORK) === 1);
  const occupationText = [source.E07_OCCUPATION, source.E35_LAST_OCCUPATION].map(str).filter(Boolean).join(" ");
  const industryText = [source.E09_KIND_OF_BUSINESS_OR_INDUSTRY, source.E37_LAST_INDUSTRY].map(str).filter(Boolean).join(" ");
  const farmer = code(g.G11_ENGAGED_IN_AGRI) === 1 || code(g.G12_A_GROWING_OF_CROPS) === 1 || code(g.G12_B_LIVESTOCK_AND_POULTRY) === 1 || code(g.G13_TYPE_OF_ENGAGEMENT_IN_FARMING) !== null || /farm|farmer|farming|agri/i.test(occupationText) || /farm|farmer|farming|agri/i.test(industryText);
  const fisherfolk = code(g.G15_ENGAGED_IN_AQUACULTURE) === 1 || code(g.G15_ENGAGED_IN_FISH_CAPTURE) === 1 || code(g.G15_ENGAGED_IN_GLEANING) === 1 || code(g.G12_D_FISH_CAPTURE) === 1 || code(g.G12_C_AQUACULTURE) === 1;
  return {
    ...meta,
    uuid: `${meta.area_code}-${pad(h.HUSN, 5)}-${pad(h.HSN, 5)}-${line}`,
    line_number: line,
    husn: pad(h.HUSN, 5),
    hsn: pad(h.HSN, 5),
    a01_last_name: str(source.A01_LAST_NAME),
    a01_first_name: str(source.A01_FIRST_NAME),
    a01_suffix: str(source.A01_SUFFIX),
    a01_middle_name: str(source.A01_MIDDLE_NAME),
    a02_relation_to_hh_head: safeLookup(RELATION, relationCode, str(source.A02_RELATION_TO_HH_HEAD)),
    a03_sex: sexCode === 1 ? "Male" : sexCode === 2 ? "Female" : str(source.A05_SEX),
    a04_birthday_month: bday.month,
    a04_birthday_day: bday.day,
    a04_birthday_year: bday.year,
    a05_age: age,
    a05_age_group_five_years: age === null ? null : `${Math.floor(age / 5) * 5}-${Math.floor(age / 5) * 5 + 4} years old`,
    a06_lcr_reg_status: yesNo(source.A08_LCR_REG_STATUS),
    a07_marital_status: safeLookup(MARITAL, maritalCode, str(source.A09_MARITAL_STATUS)),
    a08_religion: str(source.A11_RELIGION),
    a09_ethnicity: str(source.A10_ETHNICITY),
    a10_simple_literacy: yesNo(source.C01_SIMPLE_LITERACY),
    a11_hgc_level: educationLevel2022(source.C02_HGC_LEVEL, source.C02_HGC),
    a11_hgc_group: educationGroup2022(source.C02_HGC, source.C02_HGC_LEVEL),
    a11_hgc: str(source.C02_HGC),
    b01_nuclear_family: num(source.A03_NUCLEAR_FAMILY),
    b02_relation_to_nuclear_family_head: safeLookup(
      NUCLEAR_RELATION,
      nuclearCode,
      str(source.A04_RELATION_TO_NUCLEAR_FAMILY_HEAD)
    ),
    b03_phil_id: yesNo(source.A12_PHIL_ID),
    b05_solo_parent: yesNo(source.A17_SOLO_PARENT),
    b06_solo_parent_id: yesNo(source.A18_SOLO_PARENT_ID),
    b07_senior_citizen_id: yesNo(source.A19_SENIOR_CITIZEN_ID),
    b08_currently_pregnant: null,
    b09_lactating_mother: null,
    b10_pwd: [
      source.A20_A_SEEING,
      source.A20_B_HEARING,
      source.A20_C_WALKING,
      source.A20_D_REMEMBERING,
      source.A20_E_SELF_CARING,
      source.A20_F_COMMUNICATING
    ].some((v) => code(v) === 2) ? "Yes" : "No",
    b11_with_pwd_id: null,
    b12_a_visual_disability: code(source.A20_A_SEEING) === 2 ? "Yes" : "No",
    b12_b_hearing_disability: code(source.A20_B_HEARING) === 2 ? "Yes" : "No",
    b12_c_mental_disability: code(source.A20_C_REMEMBERING) === 2 ? "Yes" : "No",
    b12_d_physical_disability: code(source.A20_D_WALKING) === 2 ? "Yes" : "No",
    b12_e_speech_impairment: code(source.A20_F_COMMUNICATING) === 2 ? "Yes" : "No",
    b19_ssdi: [source.A20_A_SEEING, source.A20_B_HEARING, source.A20_C_WALKING, source.A20_D_REMEMBERING, source.A20_E_SELF_CARING, source.A20_F_COMMUNICATING].some((v) => code(v) === 2) ? "With disability" : "Without disability",
    c02_ofi: str(source.B06_OFI),
    d01_currently_attending_school: yesNo(source.C03_CURRENTLY_ATTENDING_SCHOOL),
    d02_type_of_school_attended: str(source.C04_TYPE_OF_SCHOOL_ATTENDED),
    d03_current_grade_level: educationLevel2022(source.C05_CURRENT_GRADE_LEVEL, source.C05_CURRENT_GRADE),
    d03_current_grade: str(source.C05_CURRENT_GRADE),
    d06_reason_not_attending_school: str(source.C06_REASON_NOT_ATTENDING_SCHOOL),
    d07_tvet_graduate: yesNo(source.C07_TVET_GRADUATE),
    d08_tvet_currently_attending: yesNo(source.C08_TVET_CURRENTLY_ATTENDING),
    e01_labor_force_participation: laborForceFromPerson(source),
    e01_employment_status: employment,
    e01_underemployment_status: underemployed ? "Underemployed" : "Not underemployed",
    e01_discouraged_worker: null,
    e01_work_past_week: yesNo(source.E01_WORK_PAST_WEEK),
    e02_job_or_business_past_week: yesNo(source.E03_JOB_OR_BUSINESS_PAST_WEEK),
    e03_work_location_province: null,
    e04_work_location_city_mun: null,
    // 2022 separates the text occupation/industry (E07/E09) from the
    // corresponding PSOC/PSIC codes (E08/E10). Keep the human-readable text
    // in the normalized fields so sector filters can work exactly like 2024,
    // while retaining the numeric classification code in dedicated fields.
    e05_psoc: str(source.E07_OCCUPATION) || str(source.E08_PSOC),
    e05_psoc_code: num(source.E08_PSOC),
    e05_occupation_group: str(source.E07_OCCUPATION) || str(source.E08_PSOC),
    e06_psic: str(source.E09_KIND_OF_BUSINESS_OR_INDUSTRY) || str(source.E10_PSIC),
    e06_psic_code: num(source.E10_PSIC),
    e06_industry_group: str(source.E09_KIND_OF_BUSINESS_OR_INDUSTRY) || str(source.E10_PSIC),
    e07_nature_of_employment: safeLookup(NATURE_OF_EMPLOYMENT, natureCode, str(source.E11_NATURE_OF_EMPLOYMENT)),
    e08_class_of_worker: safeLookup(CLASS_OF_WORKER, classCode, str(source.E18_CLASS_OF_WORKER)),
    e09_basis_of_payment: safeLookup(BASIS_OF_PAYMENT, basisCode, str(source.E19_BASIS_OF_PAYMENT)),
    // CBMS 2022 records E20 as the person's basic pay per day. Keep the
    // source value unchanged; do not convert it to monthly/yearly income.
    e20_basic_pay_per_day: num(source.E20_BASIC_PAY_PER_DAY),
    e10_other_job_or_business_past_week: yesNo(source.E21_OTHER_WORK_OR_BUSINESS),
    e11_number_of_hours_worked_in_all_jobs: num(source.E23_NUMBER_OF_HOURS_WORKED_IN_ALL_JOBS),
    e12_want_more_hours: yesNo(source.E15_WANT_MORE_HOURS),
    e13_try_look_for_work: yesNo(source.E25_TRY_LOOK_FOR_WORK_OR_DO_BUSINESS),
    e14_reason_not_looking_for_work: str(source.E29_REASON_NOT_LOOKING_FOR_WORK),
    e15_available_for_work: yesNo(source.E31_AVAILABLE_FOR_WORK),
    e16_willing_to_work: yesNo(source.E32_WILLING_TO_WORK),
    e17_farmer: farmer ? "Yes" : "No",
    e18_fisherfolk: fisherfolk ? "Yes" : "No",
    m06_a_benefit_4ps: [p2Line.P06_A_4PS_REGULAR_RECEIVED_BENEFITS, p2Line.P06_B_4PS_MODIFIED_RECEIVED_BENEFITS].some((v) => code(v) === 1) ? "Yes" : "No",
    m06_b_benefit_socpen: code(p2Line.P06_D_SOCPEN_RECEIVED_BENEFITS) === 1 ? "Yes" : "No",
    legacy_occupation_text: occupationText || null,
    legacy_industry_text: industryText || null,
    legacy_hgc_code: num(source.C02_HGC),
    legacy_hgc_level_code: num(source.C02_HGC_LEVEL),
    legacy_year: 2022,
    // Keep every original 2022 person field available, including fields that
    // have no 2024-normalized counterpart.
    legacy_raw: unwrapLegacy(source)
  };
}
function householdSectionValue(h, sectionName, fieldName) {
  const row = sectionOne(h, sectionName);
  return row?.[fieldName];
}
function makeHousehold(h, filename, meta) {
  const summary = sectionOne(h, "SUMMARY_OF_VISIT");
  const geo = sectionOne(h, "GEO_INFO");
  const p = sectionOne(h, "SECTION_P");
  const p2 = sectionRows(h, "SECTION_P02_TO_P13");
  const q = sectionOne(h, "SECTION_Q");
  const r = sectionOne(h, "SECTION_R");
  const j = sectionOne(h, "SECTION_J");
  const k = sectionOne(h, "SECTION_K");
  const i = sectionOne(h, "SECTION_I");
  const l = sectionOne(h, "SECTION_L");
  sectionOne(h, "SECTION_M");
  const n = sectionOne(h, "SECTION_N");
  const p2ByLine = /* @__PURE__ */ new Map();
  for (const row of p2) {
    const line = pad(row.P2_LINE_NUMBER || row.SECTION_P_LINE_NUMBER, 2);
    p2ByLine.set(line, row);
  }
  const hhSize = num(summary.HH_SIZE);
  return {
    ...meta,
    uuid: str(h.uuid) || `${meta.area_code}-${pad(h.HUSN, 5)}-${pad(h.HSN, 5)}`,
    husn: pad(h.HUSN, 5),
    hsn: pad(h.HSN, 5),
    longitude: num(geo.LONGITUDE),
    latitude: num(geo.LATITUDE),
    hh_size: hhSize,
    number_of_males: num(summary.NUMBER_OF_MALES),
    number_of_females: num(summary.NUMBER_OF_FEMALES),
    number_of_nuclear_families: num(summary.NUMBER_OF_NUCLEAR_FAMILY),
    respondent_line_number: pad(summary.RESPONDENT_LINE_NUMBER, 2),
    agree_to_sign_the_waiver: yesNo(summary.AGREE_TO_SIGN_THE_WAIVER),
    reason_for_not_signing_the_waiver: str(summary.REASON_NOT_SIGNING_THE_WAIVER),
    address_house_number: str(geo.HOUSE_NUMBER),
    address_floor_number: num(geo.FLOOR_NUMBER),
    address_block_or_lot_number: str(geo.BLOCK_OR_LOT_NUMBER),
    address_street_name: str(geo.STREET_NAME),
    address_subdivision_or_village: null,
    address_sitio_purok: str(geo.SITIO_PUROK),
    // Health / food / financial / disaster / internet / social protection.
    f01_with_member_who_has_been_sick: yesNo(l.L33_MEMBER_WHO_HAS_BEEN_SICK),
    f06_with_child_died: yesNo(l.L10_WITH_CHILD_DIED),
    g01_worried: yesNo(j.J01_WORRIED),
    g02_not_eaten_healthy: yesNo(j.J02_NOT_EATEN_HEALTHY),
    g03_ate_few_food: yesNo(j.J03_ATE_FEW_FOOD),
    g04_skipped_meal: yesNo(j.J04_SKIPPED_MEAL),
    g05_ate_less: yesNo(j.J05_ATE_LESS),
    g06_ran_out_of_food: yesNo(j.J06_RAN_OUT_OF_FOOD),
    g07_hungry: yesNo(j.J07_HUNGRY),
    g08_not_eaten_whole_day: yesNo(j.J08_NOT_EATEN_WHOLE_DAY),
    // CBMS 2022 food-consumption fields. IMPORTANT: I02 is frequency of food
    // expenditure/consumption, not number of meals eaten per day.
    i02_usual_food_consumption: str(i.I01_USUAL_FOOD_CONSUMPTION),
    i02_frequency_of_food_consumption: num(i.I02_FREQUENCY_OF_FOOD_CONSUMPTION),
    i02_frequency_of_food_consumption_label: safeLookup(
      { 1: "Per day", 2: "Per week", 3: "Every 15 days", 4: "Per month", 5: "Entire year" },
      num(i.I02_FREQUENCY_OF_FOOD_CONSUMPTION),
      str(i.I02_FREQUENCY_OF_FOOD_CONSUMPTION)
    ),
    i03_occasional_food_consumption: str(i.I03_OCCASSIONAL_FOOD_CONSUMPTION),
    i04_total_food_consumption: num(i.I04_TOTAL_FOOD_CONSUMPTION),
    i04_total_food_consumption_annual: num(i.I04_TOTAL_FOOD_CONSUMPTION),
    i01_a_bank_account: yesNo(k.K01_A_BANK_ACCOUNT),
    i01_b_digital_bank_account: yesNo(k.K01_B_ONLINE_BANK_ACCOUNT),
    i01_c_emoney_or_cash_card: yesNo(k.K01_C_EMONEY_ACCOUNT),
    i01_d_nssla: yesNo(k.K01_D_NSSLA),
    i01_e_account_with_coop: yesNo(k.K01_E_COOPERATIVE),
    i01_f_microfinance: yesNo(k.K01_F_MICROFINANCE),
    k01_internet_access: yesNo(n.N01_INTERNET_ACCESS),
    k02_internet_at_home: yesNo(n.N03_INTERNET_AT_HOME),
    k03_a_wired_broadband: yesNo(n.N04_A_WIRED),
    k03_b_wireless_broadband: yesNo(n.N04_B_WIRELESS),
    k03_c_satellite_broadband: yesNo(n.N04_C_SATELLITE),
    k03_d_mobile_broadband: yesNo(n.N04_D_MOBILE_BROADBAND),
    l01_safe_walking_alone: (() => {
      const c = num(sectionOne(h, "SECTION_O").O01_SAFE_WALKING_ALONE);
      const labels = {
        1: "Safe",
        2: "Somewhat safe",
        3: "Somewhat unsafe",
        4: "Unsafe",
        5: "Afraid to be alone"
      };
      return safeLookup(labels, c, str(sectionOne(h, "SECTION_O").O01_SAFE_WALKING_ALONE));
    })(),
    m01_a_sss: yesNo(p.P01_A_SSS),
    m01_b_gsis: yesNo(p.P01_B_GSIS),
    m01_c_philhealth: yesNo(p.P01_G_PHILHEALTH),
    m01_d_health_insurance: yesNo(p.P01_D_HEALTH_INSURANCE),
    m05_a_4ps: [p.P05_A_4PS_REGULAR, p.P05_B_4PS_MODIFIED].some((v) => code(v) === 1) ? "Yes" : "No",
    m05_b_socpen: yesNo(p.P05_D_SOCPEN),
    m05_c_aics: null,
    m05_d_food_stamp: null,
    m05_e_educ_assistance: null,
    m05_f_employ_assistance: null,
    m05_g_lgu_assistance: null,
    m05_z_assistance_other: yesNo(p.P05_Z_OTHER_SOCIAL_ASSISTANCE),
    m06_a_benefit_4ps: p2.some((x) => code(x.P06_A_4PS_REGULAR_RECEIVED_BENEFITS) === 1 || code(x.P06_B_4PS_MODIFIED_RECEIVED_BENEFITS) === 1) ? "Yes" : "No",
    m06_b_benefit_socpen: p2.some((x) => code(x.P06_D_SOCPEN_RECEIVED_BENEFITS) === 1) ? "Yes" : "No",
    m06_c_benefit_aics: null,
    m06_d_benefit_food_stamp: null,
    n01_main_water: str(q.Q01_MAIN_WATER),
    n02_drinking_water: str(q.Q03_DRINKING_WATER),
    n04_water_source_location: str(q.Q05_DRINKING_WATER_SOURCE_LOCATION),
    n05_time_to_collect_water: num(q.Q06_TIME_TO_COLLECT_WATER),
    n07_drinking_water_source_distance: num(q.Q07_DRINKING_WATER_SOURCE_DISTANCE),
    n08_toilet_facility: str(q.Q14_TOILET_FACILITY),
    n09_toilet_facility_located: str(q.Q18_TOILET_FACILITY_LOCATED),
    n10_share_toilet: yesNo(q.Q19_SHARE_TOILET),
    n11_toilet_for_public_use: yesNo(q.Q21_TOILET_FOR_PUBLIC_USE),
    n12_a_segregating_waste: yesNo(q.Q22_A_SEGREGATE_WASTE),
    n12_b_garbage_truck: yesNo(q.Q22_B_GARBAGE_TRUCK),
    n12_c_recycling_at_home: yesNo(q.Q22_C_RECYCLE_AT_HOME),
    n12_e_composting: yesNo(q.Q22_E_COMPOSTING),
    n12_f_burning: yesNo(q.Q22_F_BURNING),
    n12_g_dumping_in_pit_with_cover: yesNo(q.Q22_G_DUMPING_WITH_COVER),
    n12_h_dumping_in_pit_without_cover: yesNo(q.Q22_H_DUMPING_WITHOUT_COVER),
    n12_i_throwing_in_unhabited_locations: yesNo(q.Q22_I_THROW),
    n13_handwashing_facility: str(q.Q23_HANDWASHING),
    n14_handwashing_with_water: yesNo(q.Q24_HANDWASHING_WITH_WATER),
    n15_handwashing_with_soap: yesNo(q.Q25_HANDWASHING_WITH_SOAP),
    // CBMS 2022 household income fields. These are household-level amounts
    // and must not be presented as an individual person's salary.
    h02_a_salaries: num(householdSectionValue(h, "SECTION_H", "H02_A_SALARIES")),
    h02_b_commissions: num(householdSectionValue(h, "SECTION_H", "H02_B_COMMISSIONS")),
    h02_c_other_compensations: num(householdSectionValue(h, "SECTION_H", "H02_C_OTHER_COMPENSATIONS")),
    h04_total_income_from_current_members: num(householdSectionValue(h, "SECTION_H", "H04_TOTAL_INCOME_FROM_CURRENT_MEMBERS")),
    h05_total_income_from_former_members: num(householdSectionValue(h, "SECTION_H", "H05_TOTAL_INCOME_FROM_FORMER_MEMBERS")),
    h06_total_family_income: num(householdSectionValue(h, "SECTION_H", "H06_TOTAL_FAMILY_INCOME")),
    o01_building_type: str(r.R01_BUILDING_TYPE),
    o02_number_of_floors: num(r.R02_NUMBER_OF_FLOORS),
    o03_roof: str(r.R03_ROOF),
    o03_roof_strength: str(r.R03_ROOF_FRAME),
    o04_outer_walls: str(r.R04_OUTER_WALLS),
    o05_floor_finishing: str(r.R05_FLOOR_FINISHING),
    o06_floor: str(r.R06_FLOOR),
    o07_floor_area: num(r.R07_FLOOR_AREA),
    o08_number_of_bedrooms: num(r.R09_NUMBER_OF_BEDROOMS),
    o09_tenure: str(r.R10_TENURE),
    o10_year_constructed: num(r.R10_YEAR_CONSTRUCTED),
    o11_electricity: yesNo(r.R12_ELECTRICITY),
    o12_fuel_for_lighting: str(r.R14_FUEL_FOR_LIGHTING),
    o13_fuel_for_cooking: str(r.R15_FUEL_FOR_COOKING),
    o14_a_refrigerator: num(r.R16_A_REFRIGERATOR),
    o14_b_air_conditioner: num(r.R16_G_AIR_CONDITIONER),
    o14_c_washing_machine: num(r.R16_F_WASHING_MACHINE),
    o14_d_stove_oven: num(r.R16_B_STOVE_OVEN_WITH_GAS_RANGE),
    o14_e_radio: num(r.R16_I_RADIO),
    o14_f_tv: num(r.R16_J_TV),
    o14_g_audio_component: num(r.R16_L_AUDIO_COMPONENT),
    o14_h_telephone: num(r.R16_M_TELEPHONE),
    o14_i_basic_cp: num(r.R16_N_MOBILE_PHONE),
    o14_k_tablet: num(r.R16_O_TABLET),
    o14_l_computer: num(r.R16_P_COMPUTER),
    o14_m_car: num(r.R16_Q_CAR),
    o14_q_motorcycle: num(r.R16_U_MOTORCYCLE),
    o14_s_tricycle: num(r.R16_V_TRICYCLE),
    o14_t_bicycle: num(r.R16_W_BICYCLE),
    o14_v_banca_motorized: num(r.R16_Y_BANCA_MOTORIZED),
    o14_w_banca_nonmotorized: num(r.R16_Z_BANCA_NONMOTORIZED),
    legacy_year: 2022,
    // Preserve the complete original HPQF2_LEVEL payload. This is intentionally
    // separate from the normalized fields above so the application can expose
    // all 2022 fields without changing the source JSON.
    legacy_raw: legacyRaw(h)
  };
}
function makeInterview(h, meta) {
  const s = sectionOne(h, "SUMMARY_OF_VISIT");
  return {
    uuid: str(h.uuid),
    ...meta,
    husn: pad(h.HUSN, 5),
    hsn: pad(h.HSN, 5),
    visit_number: num(s.NUMBER_OF_VISITS) || 1,
    result_of_visit: num(s.RESULT_OF_VISIT),
    date_of_visit: null,
    time_began: null,
    time_ended: null,
    legacy_year: 2022
  };
}
function isLegacy2022Record(row) {
  return !!row && typeof row === "object" && !!row.HPQF2_LEVEL;
}
function convertLegacy2022(records, filename) {
  const out = {
    barangays: [],
    barangayList: [],
    households: [],
    childMortality: [],
    interviews: [],
    persons: [],
    personsTvet: []
  };
  const seenAreas = /* @__PURE__ */ new Set();
  const seenPuroks = /* @__PURE__ */ new Set();
  for (const record of records) {
    const h = record?.HPQF2_LEVEL;
    if (!h || typeof h !== "object") continue;
    const meta = areaMeta(h, filename);
    const persons = sectionRows(h, "SECTION_A_TO_E");
    const gByLine = /* @__PURE__ */ new Map();
    for (const row of sectionRows(h, "SECTION_G11_TO_G27")) {
      gByLine.set(pad(row.SECTION_G_LINE_NUMBER, 2), row);
    }
    out.households.push(makeHousehold(h, filename, meta));
    out.interviews.push(makeInterview(h, meta));
    for (const person of persons) {
      out.persons.push(makePerson(h, person, filename, meta, gByLine));
    }
    if (!seenAreas.has(meta.area_code)) {
      seenAreas.add(meta.area_code);
      out.barangays.push({
        uuid: `${meta.area_code}-legacy-2022`,
        ...meta,
        date_of_visit: null,
        time_began: null,
        time_ended: null,
        legacy_year: 2022
      });
    }
    const purok = str(sectionOne(h, "GEO_INFO").SITIO_PUROK);
    if (purok) {
      const pk = `${meta.area_code}|${purok}`;
      if (!seenPuroks.has(pk)) {
        seenPuroks.add(pk);
        out.barangayList.push({
          uuid: `${meta.area_code}-purok-${seenPuroks.size}`,
          ...meta,
          line_number: String(
            [...seenPuroks].filter((x) => x.startsWith(`${meta.area_code}|`)).length
          ).padStart(2, "0"),
          value: purok,
          type: "Purok/Zone",
          legacy_year: 2022
        });
      }
    }
  }
  return out;
}
const DATASET_KEYS = ["barangays", "barangayList", "households", "childMortality", "interviews", "persons", "personsTvet"];
const DATASET_LABELS = {
  barangays: "Barangays",
  barangayList: "Barangay List",
  households: "Households",
  childMortality: "Child Mortality",
  interviews: "Interviews",
  persons: "Persons",
  personsTvet: "Persons — TVET"
};
const coverageLabel = "Selected Local Area";
const empty = () => Object.fromEntries(DATASET_KEYS.map((k) => [k, []]));
const yearStores = { 2022: empty(), 2024: empty() };
let activeYear = 2022;
let activeBarangay = "";
let dataVersion = 0;
let loadedAt = null;
const listeners$1 = /* @__PURE__ */ new Set();
const datasets = yearStores[activeYear];
let barangays = [];
let detectedFiles = [];
let invalidFiles = [];
let repairedFiles = [];
let importReport = null;
let readyYears = /* @__PURE__ */ new Set();
function notify$1() {
  dataVersion++;
  for (const cb of listeners$1) cb();
}
const subscribeData = (cb) => {
  listeners$1.add(cb);
  return () => listeners$1.delete(cb);
};
const getDataVersion = () => dataVersion;
let dataLoadedAt = null;
function isDataLoaded() {
  return readyYears.size > 0;
}
function getAvailableYears() {
  return [2022, 2024].filter((y) => readyYears.has(y));
}
function getActiveYear() {
  return activeYear;
}
function setActiveYear(year) {
  activeYear = year;
  Object.assign(datasets, yearStores[activeYear]);
  barangays = getAvailableBarangays(year);
  notify$1();
}
function getActiveBarangay() {
  return activeBarangay;
}
function setActiveBarangay(value) {
  activeBarangay = value || "";
  notify$1();
}
function getYearDatasets(year) {
  return yearStores[year];
}
function getYearDataHealth(year) {
  const d = yearStores[year];
  return { year, persons: d.persons.length, households: d.households.length, barangays: d.barangays.length, files: detectedFiles.filter((f) => f.year === year).length, totalRecords: DATASET_KEYS.reduce((n, k) => n + d[k].length, 0) };
}
function getAvailableBarangays(year = activeYear) {
  const d = yearStores[year];
  const m = /* @__PURE__ */ new Map();
  for (const row of d.barangays) if (row?.area_name) m.set(row.area_code || row.area_name, row);
  for (const row of d.persons) if (row?.area_name && !m.has(row.area_code || row.area_name)) m.set(row.area_code || row.area_name, { area_name: row.area_name, area_code: row.area_code });
  for (const row of d.households) if (row?.area_name && !m.has(row.area_code || row.area_name)) m.set(row.area_code || row.area_name, { area_name: row.area_name, area_code: row.area_code });
  return Array.from(m.values()).sort((a, b) => String(a.area_name || "").localeCompare(String(b.area_name || ""), void 0, { numeric: true, sensitivity: "base" }));
}
function getHouseholdIncome(h) {
  const candidates = [h?.h06_total_family_income, h?.H06_TOTAL_FAMILY_INCOME, h?.legacy_raw?.SECTION_H?.H06_TOTAL_FAMILY_INCOME, h?.legacy_raw?.H06_TOTAL_FAMILY_INCOME];
  for (const v of candidates) {
    const n = Number(v);
    if (v !== null && v !== void 0 && v !== "" && Number.isFinite(n)) return n;
  }
  return null;
}
function getYearIncomeSummary(year, barangay = "") {
  const hh = yearStores[year].households.filter((h) => !barangay || h.area_name === barangay);
  const reported = hh.filter((h) => getHouseholdIncome(h) !== null);
  return { reported: reported.length, reportedHouseholds: reported.length, below15: reported.filter((h) => getHouseholdIncome(h) < 15e3).length, below20: reported.filter((h) => getHouseholdIncome(h) < 2e4).length };
}
function householdKey(h) {
  return `${h?.area_code || ""}-${h?.husn || ""}-${h?.hsn || ""}`;
}
function personsByHousehold(year = activeYear) {
  const m = /* @__PURE__ */ new Map();
  for (const p of yearStores[year].persons) {
    const k = householdKey(p);
    if (!m.has(k)) m.set(k, []);
    m.get(k).push(p);
  }
  return m;
}
function getPersonFullName(p) {
  return [p?.a01_last_name, p?.a01_first_name, p?.a01_middle_name, p?.a01_suffix].filter(Boolean).join(", ");
}
function getSourceWatermark(scope = activeYear) {
  const label = scope === "comparison" ? "Source: Authorized CBMS JSON datasets · CBMS 2022 and CBMS 2024" : `Source: Authorized CBMS JSON dataset · CBMS ${scope}`;
  return `${label}`;
}
const DB_NAME = "cbms-insights-runtime";
const DB_VERSION = 2;
const openDb = () => new Promise((resolve, reject) => {
  if (typeof indexedDB === "undefined") return reject(new Error("IndexedDB unavailable"));
  const req = indexedDB.open(DB_NAME, DB_VERSION);
  req.onupgradeneeded = () => {
    const db = req.result;
    if (!db.objectStoreNames.contains("years")) db.createObjectStore("years");
    if (!db.objectStoreNames.contains("meta")) db.createObjectStore("meta");
  };
  req.onsuccess = () => resolve(req.result);
  req.onerror = () => reject(req.error || new Error("IndexedDB open failed"));
});
async function dbPut(year, data) {
  const db = await openDb();
  await new Promise((res, rej) => {
    const tx = db.transaction("years", "readwrite");
    tx.objectStore("years").put(data, String(year));
    tx.oncomplete = () => res();
    tx.onerror = () => rej(tx.error);
  });
  db.close();
}
async function dbGet(year) {
  try {
    const db = await openDb();
    return await new Promise((res, rej) => {
      const tx = db.transaction("years", "readonly");
      const r = tx.objectStore("years").get(String(year));
      r.onsuccess = () => res(r.result || null);
      r.onerror = () => rej(r.error);
    });
  } catch {
    return null;
  }
}
async function dbPutMeta(value) {
  const db = await openDb();
  await new Promise((res, rej) => {
    const tx = db.transaction("meta", "readwrite");
    tx.objectStore("meta").put(value, "runtime");
    tx.oncomplete = () => res();
    tx.onerror = () => rej(tx.error);
  });
  db.close();
}
async function dbGetMeta() {
  try {
    const db = await openDb();
    return await new Promise((res, rej) => {
      const tx = db.transaction("meta", "readonly");
      const r = tx.objectStore("meta").get("runtime");
      r.onsuccess = () => res(r.result || null);
      r.onerror = () => rej(r.error);
    });
  } catch {
    return null;
  }
}
async function dbClear() {
  try {
    const db = await openDb();
    await new Promise((res, rej) => {
      const tx = db.transaction(["years", "meta"], "readwrite");
      tx.objectStore("years").clear();
      tx.objectStore("meta").clear();
      tx.oncomplete = () => res();
      tx.onerror = () => rej(tx.error);
    });
    db.close();
  } catch {
  }
}
async function persistRuntimeMeta() {
  await dbPutMeta({
    version: 1,
    detectedFiles,
    dataLoadedAt: dataLoadedAt ? dataLoadedAt.toISOString() : null,
    importReport,
    readyYears: Array.from(readyYears)
  });
}
function replaceYearData(year, data) {
  yearStores[year] = data;
  readyYears.add(year);
  if (activeYear === year) {
    Object.assign(datasets, data);
    barangays = getAvailableBarangays(year);
  }
}
function classify(filename, sample) {
  const n = filename.toLowerCase();
  if (isLegacy2022Record(sample) || isLegacyName(filename)) return "households";
  if (n.includes("person_record_tvet")) return "personsTvet";
  if (n.includes("person_record")) return "persons";
  if (n.includes("household_record_child_mortality")) return "childMortality";
  if (n.includes("household_record")) return "households";
  if (n.includes("interview_record")) return "interviews";
  if (n.includes("barangay_record_list")) return "barangayList";
  if (n.includes("barangay_record")) return "barangays";
  return null;
}
function normalize2024(rawByKey, namesByKey) {
  const out = empty();
  for (const key of DATASET_KEYS) if (rawByKey[key]) out[key] = rawByKey[key];
  if (!out.barangays.length) {
    const seen = /* @__PURE__ */ new Map();
    for (const r of [...out.persons, ...out.households]) if (r?.area_code && !seen.has(r.area_code)) seen.set(r.area_code, { area_code: r.area_code, area_name: r.area_name, region_code: r.region_code, province_code: r.province_code, city_mun_code: r.city_mun_code, barangay_code: r.barangay_code });
    out.barangays = [...seen.values()];
  }
  return out;
}
async function readFiles(files, yearHint, progress) {
  const started = performance.now();
  invalidFiles = [];
  repairedFiles = [];
  const groups = files.filter((f) => /\.json$/i.test(f.name));
  const total = groups.length;
  const legacyMerged = /* @__PURE__ */ new Map();
  const rawBy = {};
  let bytes = 0, records = 0;
  const reportFiles = [];
  const unrecognized = [];
  const mergeLegacyRecord = (a, b) => {
    if (Array.isArray(a) && Array.isArray(b)) {
      const n = Math.max(a.length, b.length);
      const out = [];
      for (let i = 0; i < n; i++) out[i] = i < a.length && i < b.length ? mergeLegacyRecord(a[i], b[i]) : i < a.length ? a[i] : b[i];
      return out;
    }
    if (a && typeof a === "object" && b && typeof b === "object") {
      const out = { ...a };
      for (const [k, v] of Object.entries(b)) out[k] = k in out ? mergeLegacyRecord(out[k], v) : v;
      return out;
    }
    return b !== null && b !== void 0 && b !== "" ? b : a;
  };
  for (let i = 0; i < groups.length; i++) {
    const f = groups[i];
    bytes += f.size;
    progress?.({ phase: "parsing", step: `Reading ${f.name}`, percent: 15 + Math.round(i / Math.max(1, total) * 60), rows: records, total, index: i });
    try {
      const text = await f.text();
      const json = JSON.parse(text);
      const arr = Array.isArray(json) ? json : [];
      records += arr.length;
      const key = classify(f.name, arr[0]);
      reportFiles.push({ filename: f.name, recordCount: arr.length, year: yearHint, classifiedAs: key, path: f.webkitRelativePath || f.name });
      if (key) {
        if (yearHint === 2022) {
          for (const record of arr) {
            const k = String(record?.key || record?.uuid || JSON.stringify(record));
            const existing = legacyMerged.get(k);
            legacyMerged.set(k, existing ? mergeLegacyRecord(existing, record) : record);
          }
        } else {
          (rawBy[key] ||= []).push(...arr);
        }
      } else unrecognized.push(f.name);
    } catch (e) {
      invalidFiles.push({ filename: f.name, reason: e?.message || "Invalid JSON" });
    }
  }
  progress?.({ phase: "indexing", step: `Building CBMS ${yearHint} indexes`, percent: 82, rows: records, total, index: total });
  let normalized;
  if (yearHint === 2022) {
    const merged = Array.from(legacyMerged.values());
    const batch = convertLegacy2022(merged, "Imported CBMS 2022 folder");
    normalized = batch;
  } else normalized = normalize2024(rawBy);
  replaceYearData(yearHint, normalized);
  detectedFiles = detectedFiles.filter((f) => f.year !== yearHint).concat(reportFiles);
  loadedAt = /* @__PURE__ */ new Date();
  dataLoadedAt = loadedAt;
  await dbPut(yearHint, normalized);
  const report = {
    at: (/* @__PURE__ */ new Date()).toISOString(),
    filesProcessed: groups.length,
    bytesProcessed: bytes,
    durationMs: Math.round(performance.now() - started),
    totalRecords: records,
    datasets: DATASET_KEYS.map((k) => ({ key: k, label: DATASET_LABELS[k], files: groups.filter((f) => classify(f.name, []) === k).map((f) => f.name), records: normalized[k].length, fields: [] })),
    normalized: { nulls: 0, trimmedStrings: 0, employmentStatus: 0, underemploymentStatus: 0 },
    joins: { personsWithoutHousehold: 0, householdsWithoutPersons: 0, personsMissingName: 0, personsMissingAge: 0, duplicatePersonKeys: 0 },
    unrecognizedFiles: unrecognized
  };
  importReport = report;
  await persistRuntimeMeta();
  progress?.({ phase: "done", step: `CBMS ${yearHint} import complete`, percent: 100, rows: records, total, index: total });
  notify$1();
  return report;
}
async function importFiles(files, progress) {
  const list = Array.from(files).filter((f) => /\.json$/i.test(f.name));
  const buckets = { 2022: [], 2024: [] };
  for (const f of list) {
    let year = isLegacyName(f.name) ? 2022 : 2024;
    if (year === 2024) {
      try {
        const sample = JSON.parse(await f.text());
        const first = Array.isArray(sample) ? sample[0] : sample;
        if (isLegacy2022Record(first)) year = 2022;
      } catch {
      }
    }
    buckets[year].push(f);
  }
  const reports = [];
  for (const year of [2022, 2024]) {
    if (!buckets[year].length) continue;
    reports.push(await readFiles(buckets[year], year, progress));
    setActiveYear(year);
  }
  if (reports.length > 1) {
    const datasetsMerged = DATASET_KEYS.map((key) => {
      const parts = reports.map((r) => r.datasets.find((d) => d.key === key)).filter(Boolean);
      return { key, label: DATASET_LABELS[key], files: parts.flatMap((p) => p.files), records: parts.reduce((n, p) => n + p.records, 0), fields: [] };
    });
    importReport = {
      at: (/* @__PURE__ */ new Date()).toISOString(),
      filesProcessed: reports.reduce((n, r) => n + r.filesProcessed, 0),
      bytesProcessed: reports.reduce((n, r) => n + r.bytesProcessed, 0),
      durationMs: reports.reduce((n, r) => n + r.durationMs, 0),
      totalRecords: reports.reduce((n, r) => n + r.totalRecords, 0),
      datasets: datasetsMerged,
      normalized: { nulls: 0, trimmedStrings: 0, employmentStatus: 0, underemploymentStatus: 0 },
      joins: { personsWithoutHousehold: 0, householdsWithoutPersons: 0, personsMissingName: 0, personsMissingAge: 0, duplicatePersonKeys: 0 },
      unrecognizedFiles: reports.flatMap((r) => r.unrecognizedFiles)
    };
    await persistRuntimeMeta();
    notify$1();
  }
}
function isLegacyName(n) {
  return /(^|[_\s-])(a|b|c)\.json$/i.test(n) || /097208.*\.json$/i.test(n);
}
async function loadFromCache(progress) {
  let any = false;
  for (const y of [2022, 2024]) {
    progress?.({ phase: "parsing", step: `Loading saved CBMS ${y} data`, percent: y === 2022 ? 20 : 60, rows: 0 });
    const d = await dbGet(y);
    if (d?.persons?.length || d?.households?.length || d?.barangays?.length) {
      replaceYearData(y, d);
      any = true;
    }
  }
  const meta = await dbGetMeta();
  if (meta?.detectedFiles && Array.isArray(meta.detectedFiles)) detectedFiles = meta.detectedFiles;
  if (meta?.importReport) importReport = meta.importReport;
  if (meta?.dataLoadedAt) dataLoadedAt = new Date(meta.dataLoadedAt);
  if (Array.isArray(meta?.readyYears)) {
    for (const y of meta.readyYears) if (y === 2022 || y === 2024) readyYears.add(y);
  }
  any = any || readyYears.size > 0;
  if (any) {
    loadedAt = dataLoadedAt || /* @__PURE__ */ new Date();
    dataLoadedAt = loadedAt;
    setActiveYear(readyYears.has(2022) ? 2022 : 2024);
    notify$1();
  }
  return any;
}
async function clearData() {
  await dbClear();
  for (const y of [2022, 2024]) {
    yearStores[y] = empty();
  }
  readyYears.clear();
  Object.assign(datasets, yearStores[activeYear]);
  barangays = [];
  detectedFiles = [];
  importReport = null;
  loadedAt = null;
  dataLoadedAt = null;
  notify$1();
}
function getImportReport() {
  return importReport;
}
const Progress = reactExports.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    ref,
    className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = Root.displayName;
function useDataVersion() {
  return reactExports.useSyncExternalStore(subscribeData, getDataVersion, () => 0);
}
function DataGate({ children }) {
  const version = useDataVersion();
  const [booting, setBooting] = reactExports.useState(true);
  const [progress, setProgress] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let alive = true;
    loadFromCache((p) => {
      if (alive) setProgress(p);
    }).catch(() => false).finally(() => {
      if (alive) {
        setBooting(false);
        setProgress(null);
      }
    });
    return () => {
      alive = false;
    };
  }, []);
  if (booting) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-3 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: progress?.step || "Loading your CBMS datasets…" }),
      progress && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress.percent, className: "h-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs", children: [
          progress.percent,
          "% · ",
          progress.rows.toLocaleString(),
          " records"
        ] })
      ] })
    ] });
  }
  if (!isDataLoaded()) return /* @__PURE__ */ jsxRuntimeExports.jsx(ImportPanel, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children }, version);
}
const PHASES = [
  { key: "saving", label: "Saving files to this computer" },
  { key: "parsing", label: "Parsing & indexing JSON (chunked)" },
  { key: "indexing", label: "Building indexes + validation report" },
  { key: "done", label: "Finished" }
];
function ImportPanel({ compact = false }) {
  const version = useDataVersion();
  const [busy, setBusy] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState(null);
  const [report, setReport] = reactExports.useState(() => getImportReport());
  const fileRef = reactExports.useRef(null);
  const file2022Ref = reactExports.useRef(null);
  const file2024Ref = reactExports.useRef(null);
  const dirRef = reactExports.useRef(null);
  const [dragging, setDragging] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setReport(getImportReport());
  }, [version]);
  const run = reactExports.useCallback(async (files) => {
    if (!files) return;
    const list = Array.from(files).filter((f) => f.name.toLowerCase().endsWith(".json"));
    if (!list.length) return;
    setBusy(true);
    setReport(null);
    try {
      await importFiles(list, setProgress);
      setReport(getImportReport());
    } finally {
      setBusy(false);
      setProgress(null);
    }
  }, []);
  const loaded = isDataLoaded();
  const totalRecords = Object.values(datasets).reduce((s, r) => s + r.length, 0);
  const activePhaseIndex = progress ? PHASES.findIndex((p) => p.key === progress.phase) : -1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-3xl space-y-5", "data-v": version, children: [
    !compact && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "h-6 w-6 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-2xl font-semibold", children: "Import CBMS Data" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-2 max-w-xl text-sm text-muted-foreground", children: "CBMS 2022 and 2024 are not bundled with the application. Choose the year folder from your computer to import its JSON files. Files are read one at a time and parsed in chunks, then stored locally so they remain available after you close the app. This keeps memory usage controlled and avoids bundling the large JSON into the JavaScript module graph." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-primary/30 bg-primary/5 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold", children: "22" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold", children: "CBMS 2022" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Legacy local-area folder" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs leading-5 text-muted-foreground", children: "Choose the complete 2022 folder. The system converts the legacy structure automatically." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold", children: "24" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold", children: "CBMS 2024" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Normalized JSON folder" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs leading-5 text-muted-foreground", children: "Choose the complete 2024 folder. JSON files are recognized automatically." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        onDragOver: (e) => {
          e.preventDefault();
          setDragging(true);
        },
        onDragLeave: () => setDragging(false),
        onDrop: (e) => {
          e.preventDefault();
          setDragging(false);
          void run(e.dataTransfer?.files ?? null);
        },
        className: `rounded-2xl border-2 border-dashed p-5 transition ${dragging ? "border-primary bg-primary/5" : "border-border bg-card"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => file2022Ref.current?.click(), disabled: busy, className: "rounded-2xl border border-primary/30 bg-primary/5 p-5 text-left transition hover:border-primary hover:bg-primary/10 disabled:opacity-50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-black text-primary-foreground", children: "22" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileCheck2, { className: "h-5 w-5 text-primary" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-display font-bold", children: "Import CBMS 2022" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs leading-5 text-muted-foreground", children: "Choose the entire 2022 CBMS folder. The app merges overlapping A/B/C snapshots, removes duplicate household keys, and preserves the best available fields." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-3 inline-flex items-center gap-2 text-xs font-bold text-primary", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "h-3.5 w-3.5" }),
                " Choose 2022 Folder"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => file2024Ref.current?.click(), disabled: busy, className: "rounded-2xl border border-success/30 bg-success/5 p-5 text-left transition hover:border-success hover:bg-success/10 disabled:opacity-50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-success text-sm font-black text-success-foreground", children: "24" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileCheck2, { className: "h-5 w-5 text-success" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-display font-bold", children: "Import CBMS 2024" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs leading-5 text-muted-foreground", children: "Choose the entire 2024 folder. The app recognizes Persons, Households, Barangays, Interviews, TVET and child mortality files." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-3 inline-flex items-center gap-2 text-xs font-bold text-success", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "h-3.5 w-3.5" }),
                " Choose 2024 Folder"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => dirRef.current?.click(), disabled: busy, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "mr-2 h-4 w-4" }),
              " Choose a mixed folder"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => fileRef.current?.click(), disabled: busy, children: "Auto-detect mixed JSON files" }),
            loaded && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", onClick: () => void loadFromCache(setProgress), disabled: busy, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "mr-2 h-4 w-4" }),
              " Reload saved data"
            ] }),
            loaded && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", onClick: () => void clearData(), disabled: busy, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "mr-2 h-4 w-4" }),
              " Clear all imported data"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-center text-[10px] text-muted-foreground", children: "You can also drag a folder here, or use the dedicated year-folder buttons above. Importing another year does not delete the year already stored." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileRef,
              type: "file",
              multiple: true,
              accept: ".json,application/json",
              className: "hidden",
              onChange: (e) => void run(e.target.files)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: file2022Ref,
              type: "file",
              multiple: true,
              className: "hidden",
              webkitdirectory: "true",
              directory: "true",
              onChange: (e) => void run(e.target.files)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: file2024Ref,
              type: "file",
              multiple: true,
              className: "hidden",
              webkitdirectory: "true",
              directory: "true",
              onChange: (e) => void run(e.target.files)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: dirRef,
              type: "file",
              multiple: true,
              webkitdirectory: "true",
              directory: "true",
              className: "hidden",
              onChange: (e) => void run(e.target.files)
            }
          ),
          progress && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-3 text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress.percent, className: "h-2.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 font-medium text-foreground", children: [
                progress.phase !== "done" && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
                progress.step
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                progress.percent,
                "% · ",
                progress.rows.toLocaleString(),
                " records",
                progress.total ? ` · file ${Math.min((progress.index ?? 0) + 1, progress.total)}/${progress.total}` : ""
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-1 text-xs", children: PHASES.map((p, i) => {
              const state = i < activePhaseIndex ? "done" : i === activePhaseIndex ? "active" : "todo";
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
                state === "done" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 text-success" }) : state === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3.5 w-3.5 rounded-full border border-border" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: state === "todo" ? "text-muted-foreground" : "text-foreground", children: p.label })
              ] }, p.key);
            }) })
          ] }),
          busy && !progress && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
            " Working…"
          ] })
        ]
      }
    ),
    loaded && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
      totalRecords.toLocaleString(),
      " records loaded from ",
      detectedFiles.length,
      " file(s)",
      dataLoadedAt ? ` · ${dataLoadedAt.toLocaleString()}` : ""
    ] }),
    report && /* @__PURE__ */ jsxRuntimeExports.jsx(ImportReportCard, { report }),
    repairedFiles.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-primary/30 bg-primary/5 p-4 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 font-medium text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-primary" }),
        " ",
        repairedFiles.length,
        " file(s) had invalid JSON syntax and were auto-corrected — all records were loaded"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 space-y-1", children: repairedFiles.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: f.filename }),
        " — ",
        f.rows.toLocaleString(),
        " records ·",
        " ",
        f.repairs.join("; ") || "structural fixes"
      ] }, f.filename)) })
    ] }),
    invalidFiles.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-warning/40 bg-warning/10 p-4 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 font-medium text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-warning" }),
        " ",
        invalidFiles.length,
        " file(s) could not be parsed"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 space-y-2", children: invalidFiles.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: f.filename }),
        f.line ? ` — line ${f.line}, column ${f.column}` : "",
        ": ",
        f.reason,
        f.snippet && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 font-mono text-muted-foreground", children: [
          "near: ",
          f.snippet
        ] })
      ] }, f.filename)) })
    ] })
  ] });
}
function ImportReportCard({ report }) {
  const n = report.normalized;
  const j = report.joins;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 rounded-xl border border-border bg-card p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-semibold", children: "Data Validation Report" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "Generated ",
        new Date(report.at).toLocaleString(),
        " · ",
        report.filesProcessed,
        " file(s) ·",
        " ",
        (report.bytesProcessed / 1024 / 1024).toFixed(1),
        " MB · ",
        report.durationMs.toLocaleString(),
        " ms ·",
        " ",
        report.totalRecords.toLocaleString(),
        " records"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/60 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1.5 font-semibold", children: "Dataset" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1.5 font-semibold", children: "File(s)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1.5 text-right font-semibold", children: "Records" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1.5 font-semibold", children: "Fields with missing values" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: report.datasets.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/60 align-top", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5 font-medium", children: d.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5 font-mono text-muted-foreground", children: d.files.join(", ") || "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5 text-right", children: d.records.toLocaleString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5", children: d.fields.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-success", children: "All checked fields complete" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
          d.fields.slice(0, 6).map(
            (f) => `${f.field} (${f.missing.toLocaleString()} / ${(f.missing / Math.max(1, f.total) * 100).toFixed(1)}%)`
          ).join(" · "),
          d.fields.length > 6 ? ` · +${d.fields.length - 6} more` : ""
        ] }) })
      ] }, d.key)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground", children: "Values normalized during load" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "NULL / N/A / blank values normalized: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: n.nulls.toLocaleString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "Whitespace trimmed: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: n.trimmedStrings.toLocaleString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "Employment status corrected (e.g. “Umployed” → “Unemployed”): ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: n.employmentStatus.toLocaleString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "Underemployment status corrected: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: n.underemploymentStatus.toLocaleString() })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground", children: "Record integrity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "Persons with no matching household: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: j.personsWithoutHousehold ? "text-warning" : "", children: j.personsWithoutHousehold.toLocaleString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "Households with no person records: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: j.householdsWithoutPersons ? "text-warning" : "", children: j.householdsWithoutPersons.toLocaleString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "Persons missing a first/last name: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: j.personsMissingName.toLocaleString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "Persons missing age: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: j.personsMissingAge.toLocaleString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "Duplicate person keys: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: j.duplicatePersonKeys.toLocaleString() })
          ] })
        ] })
      ] })
    ] }),
    report.unrecognizedFiles.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-warning", children: [
      "Unrecognized file name(s), not loaded: ",
      report.unrecognizedFiles.join(", ")
    ] })
  ] });
}
const KEY = "ld-theme";
function applyTheme(t) {
  const root = document.documentElement;
  if (t === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}
function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(KEY);
  if (stored) return stored;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = reactExports.useState("light");
  reactExports.useEffect(() => {
    const t = getInitialTheme();
    setTheme(t);
    applyTheme(t);
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: toggle,
      "aria-label": `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
      title: `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
      className: `theme-toggle inline-flex items-center gap-2 rounded-md border border-sidebar-border/40 bg-sidebar-accent/30 px-2.5 py-1.5 text-xs font-medium text-sidebar-foreground transition hover:bg-sidebar-accent ${className}`,
      children: [
        theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-3.5 w-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: theme === "dark" ? "Light" : "Dark" })
      ]
    }
  );
}
const LS_KEY = "lmdas.export_log.v1";
const CUSTOM_EVENT_KEY = "export-log-updated";
const listeners = /* @__PURE__ */ new Set();
let cachedLog = null;
function isClient() {
  return typeof window !== "undefined";
}
function notify() {
  listeners.forEach((fn) => fn());
  if (isClient()) {
    window.dispatchEvent(new Event(CUSTOM_EVENT_KEY));
  }
}
async function waitForBridge(timeoutMs = 4e3) {
  if (!isClient()) return;
  const isElectron = /electron/i.test(navigator.userAgent);
  if (!isElectron) return;
  const start = Date.now();
  while (!window.electronLog && Date.now() - start < timeoutMs) {
    await new Promise((r) => setTimeout(r, 100));
  }
}
async function initStore() {
  if (!isClient()) return;
  await waitForBridge();
  let diskEntries = [];
  if (window.electronLog) {
    try {
      const data = await window.electronLog.getLog();
      diskEntries = Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("export-log: failed reading from electronLog:", err);
      diskEntries = [];
    }
  }
  let lsEntries = [];
  try {
    const raw = localStorage.getItem(LS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    lsEntries = Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    lsEntries = [];
  }
  const byId = /* @__PURE__ */ new Map();
  const addList = (list) => {
    if (!list) return;
    for (const e of list) {
      if (!e || !e.id) continue;
      const existing = byId.get(e.id);
      if (!existing) {
        byId.set(e.id, e);
      } else if (e.timestamp && existing.timestamp && e.timestamp > existing.timestamp) {
        byId.set(e.id, e);
      }
    }
  };
  addList(diskEntries);
  addList(lsEntries);
  addList(cachedLog || []);
  const combined = Array.from(byId.values()).sort((a, b) => (b.timestamp || "").localeCompare(a.timestamp || "")).slice(0, 500);
  cachedLog = combined;
  try {
    await saveToDisk(cachedLog);
  } catch (err) {
    console.error("export-log: saveToDisk failed during init merge:", err);
  }
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(cachedLog));
  } catch {
  }
  notify();
}
let initPromise = null;
function ensureExportLogLoaded() {
  if (!isClient()) return Promise.resolve();
  if (!initPromise) initPromise = initStore();
  return initPromise;
}
async function reloadExportLog() {
  if (!isClient()) return;
  initPromise = initStore();
  await initPromise;
}
if (isClient()) {
  ensureExportLogLoaded();
  window.addEventListener("focus", () => {
    reloadExportLog();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") reloadExportLog();
  });
}
async function saveToDisk(entries, replace = false) {
  if (!isClient()) return;
  if (!window.electronLog) await waitForBridge(2e3);
  if (window.electronLog) {
    try {
      await window.electronLog.saveLog(entries, replace);
    } catch (err) {
      console.error("Failed to persist export log via electronLog:", err);
    }
  }
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(entries));
  } catch (err) {
    console.error("Failed to persist export log to localStorage:", err);
  }
}
function subscribeExportLog(fn) {
  listeners.add(fn);
  if (!isClient()) return () => listeners.delete(fn);
  const handleCustomEvent = () => fn();
  window.addEventListener(CUSTOM_EVENT_KEY, handleCustomEvent);
  return () => {
    listeners.delete(fn);
    window.removeEventListener(CUSTOM_EVENT_KEY, handleCustomEvent);
  };
}
function getExportLog() {
  if (!isClient()) return [];
  if (cachedLog !== null) return cachedLog;
  try {
    const raw = localStorage.getItem(LS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    cachedLog = Array.isArray(parsed) ? parsed : [];
    return cachedLog;
  } catch {
    cachedLog = [];
    return cachedLog;
  }
}
function addExportLog(entry) {
  if (!isClient()) return;
  const cur = getExportLog();
  const updated = [entry, ...cur].slice(0, 500);
  cachedLog = updated;
  saveToDisk(updated);
  notify();
}
function clearExportLog() {
  if (!isClient()) return;
  cachedLog = [];
  saveToDisk([], true);
  notify();
}
function deleteExportLogEntry(id) {
  if (!isClient()) return;
  const cur = getExportLog().filter((e) => e.id !== id);
  cachedLog = cur;
  saveToDisk(cur, true);
  notify();
}
const UPPER = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const LOWER = "abcdefghijkmnpqrstuvwxyz";
const DIGIT = "23456789";
const SYMBOL = "!@#$%^&*?-_=+";
const ALL = UPPER + LOWER + DIGIT + SYMBOL;
function pick(chars, rand, i) {
  return chars[rand[i] % chars.length];
}
function generatePassword(length = 16) {
  const len = Math.max(12, length);
  const rand = new Uint32Array(len + 4);
  crypto.getRandomValues(rand);
  const out = [
    pick(UPPER, rand, 0),
    pick(LOWER, rand, 1),
    pick(DIGIT, rand, 2),
    pick(SYMBOL, rand, 3)
  ];
  for (let i = 4; i < len; i++) {
    out.push(pick(ALL, rand, i));
  }
  const shuffle = new Uint32Array(len);
  crypto.getRandomValues(shuffle);
  for (let i = out.length - 1; i > 0; i--) {
    const j = shuffle[i] % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out.join("");
}
function makeExportId() {
  const r = new Uint32Array(2);
  crypto.getRandomValues(r);
  return `EXP-${Date.now().toString(36)}-${r[0].toString(36)}${r[1].toString(36)}`;
}
async function saveBlobWithPrompt(blob, filename) {
  if (!isClient()) return void 0;
  try {
    const bridge = window.electronStore;
    if (bridge?.saveExportFile) {
      const result = await bridge.saveExportFile(filename, await blob.arrayBuffer());
      if (result?.canceled) return void 0;
      if (result?.error) throw new Error(result.error);
      return result?.filePath;
    }
    const picker = window.showSaveFilePicker;
    if (picker) {
      const handle = await picker({
        suggestedName: filename,
        types: [{ description: "Exported document", accept: { "application/octet-stream": ["." + filename.split(".").pop()] } }]
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return handle.name || filename;
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1e3);
    return filename;
  } catch (err) {
    if (err && typeof err === "object" && "name" in err && err.name === "AbortError") return void 0;
    console.error("failed to save export:", err);
    throw err;
  }
}
function emitExportPassword(filename, password, format) {
  if (!isClient()) return;
  window.dispatchEvent(new CustomEvent("cbms-export-password", { detail: { filename, password, format } }));
}
function emitPrintPreview(html, title) {
  if (!isClient()) return;
  window.dispatchEvent(new CustomEvent("cbms-print-preview", { detail: { html, title } }));
}
const SORT_KEYWORDS = {
  barangay: ["area_name", "barangay", "barangay_name"],
  person: ["_full_name", "full_name", "person_name", "name"],
  head: ["_household_head", "household_head"]
};
function normalizeSortText(value) {
  return String(value ?? "").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/gi, "").toLowerCase();
}
function compareText(a, b) {
  return normalizeSortText(a).localeCompare(normalizeSortText(b), void 0, {
    sensitivity: "base",
    numeric: true,
    ignorePunctuation: true
  });
}
function findColumnKey(columns, rows, keys) {
  const available = /* @__PURE__ */ new Set([
    ...columns.map((c) => c.key),
    ...rows.length ? Object.keys(rows[0]) : []
  ]);
  return keys.find((key) => available.has(key));
}
function sortRowsForExport(columns, rows) {
  const barangayKey = findColumnKey(columns, rows, SORT_KEYWORDS.barangay);
  const personKey = findColumnKey(columns, rows, SORT_KEYWORDS.person);
  const headKey = findColumnKey(columns, rows, SORT_KEYWORDS.head);
  if (!barangayKey && !personKey && !headKey) return rows.slice();
  const indexed = rows.map((row, index) => ({ row, index }));
  const isTotal = (row) => columns.slice(0, 2).some((c) => {
    const value = normalizeSortText(getVal(row, c.key)).toUpperCase();
    return value === "TOTAL" || value.startsWith("TOTAL:");
  });
  indexed.sort((a, b) => {
    const at = isTotal(a.row);
    const bt = isTotal(b.row);
    if (at !== bt) return at ? 1 : -1;
    if (barangayKey) {
      const c = compareText(getVal(a.row, barangayKey), getVal(b.row, barangayKey));
      if (c !== 0) return c;
    }
    if (personKey) {
      const c = compareText(getVal(a.row, personKey), getVal(b.row, personKey));
      if (c !== 0) return c;
    }
    if (headKey) {
      const c = compareText(getVal(a.row, headKey), getVal(b.row, headKey));
      if (c !== 0) return c;
    }
    return a.index - b.index;
  });
  return indexed.map((x) => x.row);
}
function addPageFooter(pdf, ref) {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  pdf.setDrawColor(220, 226, 235);
  pdf.setLineWidth(0.2);
  pdf.line(14, pageHeight - 14, pageWidth - 14, pageHeight - 14);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7.2);
  pdf.setTextColor(100, 110, 125);
  pdf.text(`Doc. No. ${ref}`, pageWidth / 2, pageHeight - 9, { align: "center" });
  pdf.text(`Page ${pdf.getNumberOfPages()}`, pageWidth - 14, pageHeight - 9, { align: "right" });
}
function getVal(r, key) {
  if (r == null) return "";
  if (key in r) return r[key];
  return key.split(".").reduce((a, k) => a == null ? a : a[k], r);
}
function escapePrintHtml(value) {
  return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#039;");
}
function buildPrintHtml(payload) {
  const { title, subtitle, columns, rows, summary, barangaySummaryColumns, barangaySummaryRows, groups, dataYear } = payload;
  const sortedGroups = (groups || []).slice().sort((a, b) => compareText(a.title, b.title));
  const sbCols = barangaySummaryColumns || [];
  const sbRows = barangaySummaryRows || [];
  const source = getSourceWatermark(resolveExportYear(title, subtitle, dataYear));
  const rowsPerPage = columns.length >= 10 ? 24 : columns.length >= 7 ? 30 : 36;
  const pageHeader = (pageNo, label) => `<header class="report-head">${pageNo === 1 ? `<div class="eyebrow">CBMS · Community-Based Monitoring System</div>` : ""}<h1>${escapePrintHtml(title)}</h1><p>${escapePrintHtml(subtitle || `Coverage: ${coverageLabel}`)}</p><p class="meta">Generated: ${escapePrintHtml((/* @__PURE__ */ new Date()).toLocaleString())} · Page ${pageNo}</p></header>`;
  const renderTable = (tableRows) => `<table><thead><tr>${columns.map((c) => `<th>${escapePrintHtml(c.label)}</th>`).join("")}</tr></thead><tbody>${tableRows.map((r) => `<tr>${columns.map((c) => `<td>${escapePrintHtml(getVal(r, c.key))}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  const pages = [];
  let firstPageBody = "";
  if (summary?.length) {
    firstPageBody += `<section class="summary-block"><h2>Summary</h2><table><thead><tr><th>Indicator</th><th>Count / Value</th><th>Percentage Rate (%Rate) / Population (%Population)</th></tr></thead><tbody>${summary.map((item) => `<tr><td>${escapePrintHtml(item.label)}</td><td class="num">${escapePrintHtml(typeof item.value === "number" ? item.value.toLocaleString() : item.value)}</td><td class="num">${item.percentage == null ? "—" : `${item.percentage.toFixed(2)}%`}</td></tr>`).join("")}</tbody></table></section>`;
  }
  if (sbCols.length && sbRows.length) {
    firstPageBody += `<section class="summary-block"><h2>By Barangay Summary</h2><table><thead><tr>${sbCols.map((c) => `<th>${escapePrintHtml(c.label)}</th>`).join("")}</tr></thead><tbody>${sortRowsForExport(sbCols, sbRows).map((r) => `<tr>${sbCols.map((c) => `<td>${escapePrintHtml(getVal(r, c.key))}</td>`).join("")}</tr>`).join("")}</tbody></table></section>`;
  }
  if (!sortedGroups.length) {
    const sorted = sortRowsForExport(columns, rows || []);
    if (sorted.length === 0) {
      firstPageBody += `<section class="summary-block"><h2>Records</h2><p class="empty">No records for this report.</p></section>`;
    } else {
      for (let i = 0; i < sorted.length; i += rowsPerPage) {
        if (i === 0) firstPageBody += `<section class="summary-block"><h2>Records</h2>${renderTable(sorted.slice(i, i + rowsPerPage))}</section>`;
        else pages.push(`<section class="print-page">${pageHeader(pages.length + 2)}<section>${renderTable(sorted.slice(i, i + rowsPerPage))}</section></section>`);
      }
    }
  } else {
    for (const group of sortedGroups) {
      const groupRows = sortRowsForExport(columns, group.rows || []);
      for (let i = 0; i < groupRows.length; i += rowsPerPage) {
        const chunk = groupRows.slice(i, i + rowsPerPage);
        pages.push(`<section class="print-page">${pageHeader(pages.length + 2)}<div class="barangay-heading"><div class="kicker">${i ? "Continuation · Barangay" : "Barangay"}</div><h2>${escapePrintHtml(group.title)}</h2><div class="sub">${groupRows.length.toLocaleString()} record(s) · rows ${i + 1}–${Math.min(i + rowsPerPage, groupRows.length)}</div></div>${renderTable(chunk)}</section>`);
      }
    }
  }
  pages.unshift(`<section class="print-page">${pageHeader(1)}${firstPageBody}<p class="meta source-note">${escapePrintHtml(source)}</p></section>`);
  return `<!doctype html><html><head><meta charset="utf-8"><title>${escapePrintHtml(title)}</title><style>
  @page{size:215.9mm 330.2mm;margin:0}.print-page{width:215.9mm;min-height:330.2mm;height:330.2mm;padding:12mm 14mm 16mm;box-sizing:border-box;background:#fff;color:#1f2937;font-family:Arial,Helvetica,sans-serif;font-size:9pt;position:relative;page-break-after:always;break-after:page;overflow:hidden}.print-page:last-child{page-break-after:auto;break-after:auto}*{box-sizing:border-box}.report-head{padding-bottom:6mm;border-bottom:1.2px solid #1f3a5a;margin-bottom:6mm}.eyebrow{font-size:7.5pt;letter-spacing:.14em;text-transform:uppercase;color:#64748b;font-weight:700}.report-head h1{font-size:17pt;line-height:1.1;margin:2mm 0 1.5mm;color:#17324d}.report-head p{margin:0;color:#64748b;font-size:8.2pt}.meta{font-size:7pt;color:#64748b}.summary-block{margin-bottom:6mm}.summary-block h2{font-size:10.5pt;margin:0 0 2.5mm;color:#17324d;text-transform:uppercase;letter-spacing:.05em}table{width:100%;border-collapse:collapse;table-layout:fixed}th,td{border:1px solid #cfd6df;padding:2mm 1.8mm;vertical-align:top;word-break:break-word}th{background:#e9eef4;color:#17324d;font-weight:700;font-size:7.3pt}td{font-size:7.2pt}td.num{text-align:right;font-weight:700}.barangay-heading{padding:0 0 4mm;margin-bottom:4mm;border-bottom:1.2px solid #1f3a5a}.barangay-heading .kicker{font-size:7pt;letter-spacing:.13em;text-transform:uppercase;color:#64748b;font-weight:700}.barangay-heading h2{font-size:15pt;margin:1mm 0;color:#17324d}.barangay-heading .sub{font-size:7.8pt;color:#64748b}.source-note{position:absolute;left:14mm;right:14mm;bottom:7mm;border-top:1px solid #d7dee7;padding-top:2mm}.empty{font-size:9pt;color:#64748b}.screen-page-number{display:none}
  @media screen{body{margin:0;background:#dfe5ec;padding:10px}.print-page{margin:0 auto 12px;box-shadow:0 8px 30px rgba(15,23,42,.14)}.screen-page-number{display:block;position:absolute;top:4mm;right:7mm;font-size:8px;color:#94a3b8}}
  @media print{body{margin:0;background:#fff}.screen-page-number{display:none}}
  </style></head><body>${pages.map((html, i) => html.replace('<section class="print-page">', `<section class="print-page"><div class="screen-page-number">Page ${i + 1}</div>`)).join("")}</body></html>`;
}
function stamp() {
  const d = /* @__PURE__ */ new Date();
  const p = (n) => String(n).padStart(2, "0");
  return {
    slug: `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}_${p(d.getHours())}-${p(d.getMinutes())}-${p(d.getSeconds())}`,
    human: d.toLocaleString()
  };
}
function reportCode(title) {
  const normalized = title.toLowerCase();
  if (/persons? with disability|pwd/.test(normalized)) return "PWD";
  if (/indigenous cultural communities|icc\/?ip/.test(normalized)) return "ICC-IP";
  if (/senior/.test(normalized)) return "SENIORS";
  if (/household/.test(normalized) && /barangay/.test(normalized)) return "HOUSEHOLDS-BY-BARANGAY";
  if (/person/.test(normalized) && /barangay/.test(normalized)) return "PERSONS-BY-BARANGAY";
  return title.replace(/&/g, " AND ").replace(/\([^)]*\)/g, "").replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "").toUpperCase();
}
function resolveExportYear(title, subtitle, dataYear) {
  if (dataYear === 2022 || dataYear === 2024) return dataYear;
  const yearMatch = `${title} ${subtitle || ""}`.match(/\b(2022|2024)\b/);
  return yearMatch ? Number(yearMatch[1]) : getActiveYear();
}
function makeDocId(title, subtitle, dataYear) {
  const s = stamp();
  const id = makeExportId();
  const ref = `${s.slug}-${id.split("-").pop().slice(0, 5).toUpperCase()}`;
  const year = resolveExportYear(title, subtitle, dataYear);
  return {
    year,
    docTitle: `${title} — Doc. No. ${ref}`,
    base: `CBMS${year}_${reportCode(title)}_${s.slug}_${ref.split("-").pop().toUpperCase()}`,
    ref,
    generatedAt: s.human
  };
}
async function packageProtected(innerFilename, data, meta) {
  const password = generatePassword(16);
  const zipBlobWriter = new BlobWriter("application/zip");
  const writer = new ZipWriter(zipBlobWriter, { password, encryptionStrength: 3 });
  const reader = typeof data === "string" ? new TextReader(data) : new BlobReader(data);
  await writer.add(innerFilename, reader);
  const readme = `Encrypted export from CBMS Insights — secure local data export.

Document No.  : ${meta.doc.ref}
Report        : ${meta.title}
File inside   : ${innerFilename}
Records       : ${meta.rowCount}
Format        : ${meta.format}
Generated     : ${meta.doc.generatedAt}
Coverage       : Selected Local Area

To open: use 7-Zip, WinRAR, or the built-in extractor on macOS/Linux with the
password provided by the person who sent you this archive. This archive is
AES-256 encrypted; do not share the password over the same channel as the file.

${getSourceWatermark(meta.doc.year)}
`;
  await writer.add("README.txt", new TextReader(readme));
  await writer.close();
  const zipBlob = await zipBlobWriter.getData();
  const zipName = `${meta.doc.base}.protected.zip`;
  const bytes = zipBlob.size;
  const savedPath = await saveBlobWithPrompt(zipBlob, zipName);
  if (!savedPath && typeof window !== "undefined") return;
  addExportLog({
    id: makeExportId(),
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    filename: zipName,
    innerFile: innerFilename,
    format: meta.format,
    title: meta.doc.docTitle,
    rowCount: meta.rowCount,
    password,
    bytes,
    savedPath,
    encryption: "AES-256"
  });
  showPasswordToast(zipName, password, meta.format);
}
function showPasswordToast(filename, password, format) {
  emitExportPassword(filename, password, format);
}
async function exportCSV({ title, subtitle, columns, rows, note, summary, dataYear }) {
  const doc = makeDocId(title, subtitle, dataYear);
  rows = sortRowsForExport(columns, rows);
  const header = columns.map((c) => `"${c.label}"`).join(",");
  const body = rows.map((r) => columns.map((c) => `"${String(getVal(r, c.key) ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
  const totalLine = `"TOTAL RECORDS",${rows.length}`;
  const summaryBlock = summary && summary.length ? `SUMMARY
${summary.map((s) => `"${s.label}",${s.value},${s.percentage == null ? "" : `${s.percentage.toFixed(2)}%`}`).join("\n")}

` : "";
  const csv = `${doc.docTitle}
"Coverage","${coverageLabel}"
"Generated","${doc.generatedAt}"

${summaryBlock}${header}
${body}
${totalLine}

${note || getSourceWatermark(doc.year)}`;
  await packageProtected(`${doc.base}.csv`, csv, { format: "CSV", title, rowCount: rows.length, doc });
}
const FONT = "Arial";
const BORDER_THIN = { style: "thin", color: { rgb: "D0D7E2" } };
const box = { top: BORDER_THIN, bottom: BORDER_THIN, left: BORDER_THIN, right: BORDER_THIN };
const S = {
  title: {
    font: { name: FONT, sz: 15, bold: true, color: { rgb: "FFFFFF" } },
    fill: { patternType: "solid", fgColor: { rgb: "1E3A5F" } },
    alignment: { horizontal: "left", vertical: "center" }
  },
  subtitle: {
    font: { name: FONT, sz: 10, italic: true, color: { rgb: "FFFFFF" } },
    fill: { patternType: "solid", fgColor: { rgb: "2F5D8C" } },
    alignment: { horizontal: "left", vertical: "center" }
  },
  sectionHead: {
    font: { name: FONT, sz: 11, bold: true, color: { rgb: "1E3A5F" } },
    fill: { patternType: "solid", fgColor: { rgb: "DCE6F1" } },
    border: box
  },
  summaryLabel: {
    font: { name: FONT, sz: 10 },
    fill: { patternType: "solid", fgColor: { rgb: "F4F7FB" } },
    border: box
  },
  summaryValue: {
    font: { name: FONT, sz: 10, bold: true },
    fill: { patternType: "solid", fgColor: { rgb: "F4F7FB" } },
    alignment: { horizontal: "right" },
    border: box,
    numFmt: "#,##0"
  },
  th: {
    font: { name: FONT, sz: 10, bold: true, color: { rgb: "FFFFFF" } },
    fill: { patternType: "solid", fgColor: { rgb: "28407A" } },
    alignment: { horizontal: "center", vertical: "center", wrapText: true },
    border: box
  },
  td: { font: { name: FONT, sz: 10 }, border: box, alignment: { vertical: "top", wrapText: false } },
  tdAlt: {
    font: { name: FONT, sz: 10 },
    fill: { patternType: "solid", fgColor: { rgb: "F7F9FC" } },
    border: box,
    alignment: { vertical: "top", wrapText: false }
  },
  tdNum: { font: { name: FONT, sz: 10 }, border: box, alignment: { horizontal: "right" }, numFmt: "#,##0" },
  tdNumAlt: {
    font: { name: FONT, sz: 10 },
    fill: { patternType: "solid", fgColor: { rgb: "F7F9FC" } },
    border: box,
    alignment: { horizontal: "right" },
    numFmt: "#,##0"
  },
  total: {
    font: { name: FONT, sz: 10, bold: true, color: { rgb: "1E3A5F" } },
    fill: { patternType: "solid", fgColor: { rgb: "E4EAF4" } },
    border: { ...box, top: { style: "medium", color: { rgb: "1E3A5F" } } }
  },
  note: { font: { name: FONT, sz: 9, italic: true, color: { rgb: "5A6472" } } }
};
const A1 = (r, c) => xlsx_minExports.utils.encode_cell({ r, c });
async function exportXLSX({ title, subtitle, columns, rows, note, summary, dataYear }) {
  const doc = makeDocId(title, subtitle, dataYear);
  rows = sortRowsForExport(columns, rows);
  const nCols = Math.max(columns.length, 3);
  const ws = {};
  const merges = [];
  let r = 0;
  const put = (row, col, v, style) => {
    const isNum = typeof v === "number" && Number.isFinite(v);
    ws[A1(row, col)] = { t: isNum ? "n" : "s", v: isNum ? v : v === null || v === void 0 ? "" : String(v), s: style };
  };
  const bandRow = (row, style) => {
    for (let c = 0; c < nCols; c++) if (!ws[A1(row, c)]) ws[A1(row, c)] = { t: "s", v: "", s: style };
  };
  put(r, 0, doc.docTitle, S.title);
  bandRow(r, S.title);
  merges.push({ s: { r, c: 0 }, e: { r, c: nCols - 1 } });
  r++;
  put(r, 0, `${subtitle || `Coverage: ${coverageLabel}`}  ·  Generated: ${doc.generatedAt}`, S.subtitle);
  bandRow(r, S.subtitle);
  merges.push({ s: { r, c: 0 }, e: { r, c: nCols - 1 } });
  r += 2;
  if (summary && summary.length) {
    put(r, 0, "SUMMARY", S.sectionHead);
    put(r, 1, "Count / Value", S.sectionHead);
    put(r, 2, "Percentage Rate / Population", S.sectionHead);
    r++;
    for (const s of summary) {
      put(r, 0, s.label, S.summaryLabel);
      put(r, 1, typeof s.value === "number" ? s.value : s.value, S.summaryValue);
      put(r, 2, s.percentage == null ? "" : `${s.percentage.toFixed(2)}%`, S.summaryValue);
      r++;
    }
    r++;
  }
  columns.forEach((c, i) => put(r, i, c.label, S.th));
  const headerRow = r;
  r++;
  rows.forEach((row, i) => {
    const alt = i % 2 === 1;
    columns.forEach((c, ci) => {
      const v = getVal(row, c.key);
      const isNum = typeof v === "number" && Number.isFinite(v);
      put(r, ci, v ?? "", isNum ? alt ? S.tdNumAlt : S.tdNum : alt ? S.tdAlt : S.td);
    });
    r++;
  });
  put(r, 0, `TOTAL: ${rows.length.toLocaleString()} record(s)`, S.total);
  bandRow(r, S.total);
  merges.push({ s: { r, c: 0 }, e: { r, c: nCols - 1 } });
  r += 2;
  put(r, 0, note || getSourceWatermark(doc.year), S.note);
  merges.push({ s: { r, c: 0 }, e: { r, c: nCols - 1 } });
  r++;
  put(r, 0, `Document No. ${doc.ref}`, S.note);
  r++;
  ws["!ref"] = xlsx_minExports.utils.encode_range({ s: { r: 0, c: 0 }, e: { r, c: nCols - 1 } });
  ws["!merges"] = merges;
  ws["!cols"] = Array.from({ length: nCols }, (_, i) => {
    const label = columns[i]?.label ?? "";
    const widest = rows.slice(0, 200).reduce((m, row) => {
      const v = String(getVal(row, columns[i]?.key ?? "") ?? "");
      return Math.max(m, v.length);
    }, label.length);
    return { wch: Math.min(46, Math.max(12, widest + 2)) };
  });
  ws["!rows"] = [{ hpt: 24 }, { hpt: 16 }];
  ws["!freeze"] = { xSplit: "0", ySplit: String(headerRow + 1) };
  ws["!autofilter"] = { ref: xlsx_minExports.utils.encode_range({ s: { r: headerRow, c: 0 }, e: { r: headerRow + rows.length, c: columns.length - 1 } }) };
  const wb = xlsx_minExports.utils.book_new();
  xlsx_minExports.utils.book_append_sheet(wb, ws, "Report");
  const arrayBuffer = xlsx_minExports.write(wb, { type: "array", bookType: "xlsx" });
  const xlsxBlob = new Blob([arrayBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });
  await packageProtected(`${doc.base}.xlsx`, xlsxBlob, { format: "XLSX", title, rowCount: rows.length, doc });
}
const pdfPeso = (text) => String(text ?? "").replace(/₱/g, "P");
function xmlEscape(value) {
  return String(value ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function simpleDocxRun(text, bold = false) {
  return `<w:r><w:rPr>${bold ? "<w:b/>" : ""}<w:sz w:val="18"/></w:rPr><w:t xml:space="preserve">${xmlEscape(text)}</w:t></w:r>`;
}
function simpleDocxTable(columns, rows, total) {
  const cols = Math.max(1, columns.length);
  const widths = Array.from({ length: cols }, () => Math.floor(10500 / cols));
  const row = (cells, header = false, totalRow = false) => `<w:tr><w:trPr>${header ? "<w:tblHeader/>" : ""}<w:cantSplit/></w:trPr>${cells.map((cell, i) => `<w:tc><w:tcPr><w:tcW w:w="${widths[i]}" w:type="dxa"/>${header || totalRow ? `<w:shd w:fill="${header ? "DFE5EC" : "EEF1F5"}"/>` : ""}</w:tcPr><w:p><w:pPr><w:spacing w:after="0"/></w:pPr>${simpleDocxRun(cell, header || totalRow)}</w:p></w:tc>`).join("")}</w:tr>`;
  const body = rows.length ? rows.map((r) => row(columns.map((c) => String(getVal(r, c.key) ?? "")))).join("") : row(["No records", ...columns.slice(1).map(() => "")]);
  return `<w:tbl><w:tblPr><w:tblW w:w="10500" w:type="dxa"/><w:tblLayout w:type="fixed"/><w:tblBorders><w:top w:val="single" w:sz="5" w:color="AEB8C4"/><w:left w:val="single" w:sz="5" w:color="AEB8C4"/><w:bottom w:val="single" w:sz="5" w:color="AEB8C4"/><w:right w:val="single" w:sz="5" w:color="AEB8C4"/><w:insideH w:val="single" w:sz="4" w:color="C7CED7"/><w:insideV w:val="single" w:sz="4" w:color="C7CED7"/></w:tblBorders></w:tblPr><w:tblGrid>${widths.map((w) => `<w:gridCol w:w="${w}"/>`).join("")}</w:tblGrid>${row(columns.map((c) => c.label), true)}${body}${row([`TOTAL: ${(total ?? rows.length).toLocaleString()} record(s)`, ...columns.slice(1).map(() => "")], false, true)}</w:tbl>`;
}
async function buildGenericDocx(payload) {
  const parts = [];
  parts.push(`<w:p><w:pPr><w:jc w:val="center"/><w:spacing w:after="100"/></w:pPr>${simpleDocxRun(coverageLabel, true)}</w:p>`);
  parts.push(`<w:p><w:pPr><w:jc w:val="center"/></w:pPr>${simpleDocxRun(payload.title, true)}</w:p>`);
  if (payload.subtitle) parts.push(`<w:p><w:pPr><w:jc w:val="center"/></w:pPr>${simpleDocxRun(payload.subtitle)}</w:p>`);
  if (payload.summary?.length) {
    parts.push(`<w:p>${simpleDocxRun("SUMMARY", true)}</w:p>`);
    parts.push(simpleDocxTable([{ key: "label", label: "Indicator" }, { key: "value", label: "Count / Value" }, { key: "percentage", label: "Percentage Rate / Population" }], payload.summary.map((s) => ({ label: s.label, value: s.value, percentage: s.percentage == null ? "" : `${s.percentage.toFixed(2)}%` })), payload.summary.length));
  }
  if (payload.barangaySummaryColumns?.length && payload.barangaySummaryRows?.length) {
    parts.push(`<w:p>${simpleDocxRun("BY BARANGAY SUMMARY", true)}</w:p>`);
    parts.push(simpleDocxTable(payload.barangaySummaryColumns, payload.barangaySummaryRows));
  }
  const groups = payload.groups?.length ? payload.groups : [{ title: "Report", rows: payload.rows }];
  for (const g of groups) {
    parts.push(`<w:p><w:pPr><w:pageBreakBefore/></w:pPr>${simpleDocxRun(`Barangay: ${g.title}`, true)}</w:p>`);
    parts.push(simpleDocxTable(payload.columns, g.rows));
  }
  parts.push(`<w:p><w:pPr><w:spacing w:before="160"/></w:pPr>${simpleDocxRun(`Source: ${getSourceWatermark(resolveExportYear(payload.title, payload.subtitle, payload.dataYear))}`)}</w:p>`);
  const docXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${parts.join("")}<w:sectPr><w:pgSz w:w="12240" w:h="18720"/><w:pgMar w:top="720" w:right="900" w:bottom="720" w:left="900"/></w:sectPr></w:body></w:document>`;
  const ct = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>`;
  const rels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`;
  const zw = new ZipWriter(new BlobWriter("application/vnd.openxmlformats-officedocument.wordprocessingml.document"));
  await zw.add("[Content_Types].xml", new TextReader(ct));
  await zw.add("_rels/.rels", new TextReader(rels));
  await zw.add("word/document.xml", new TextReader(docXml));
  return await zw.close();
}
async function exportDOCX(payload) {
  const doc = makeDocId(payload.title, payload.subtitle, payload.dataYear);
  const blob = await buildGenericDocx(payload);
  const inner = `${doc.base}.docx`;
  await packageProtected(inner, blob, { format: "DOCX", title: payload.title, rowCount: payload.rows.length, doc });
}
function printPayload(payload) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("cbms-print-preview", { detail: { title: payload.title, html: buildPrintHtml(payload) } }));
}
async function exportPDF(payload) {
  const { title, subtitle, columns, rows, note, summary, barangaySummaryColumns, barangaySummaryRows, groups, dataYear } = payload;
  const docId = makeDocId(title, subtitle, dataYear);
  const FOLIO_WIDTH_MM = 215.9;
  const FOLIO_HEIGHT_MM = 330.2;
  const pdf = new jspdf_node_minExports.jsPDF({ orientation: "portrait", unit: "mm", format: [FOLIO_WIDTH_MM, FOLIO_HEIGHT_MM] });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 14;
  const source = pdfPeso(note || getSourceWatermark(docId.year));
  const usableWidth = pageWidth - margin * 2;
  const drawReportHeader = (sectionTitle, continuation = false) => {
    let y2 = 17;
    pdf.setTextColor(25, 34, 48);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(sectionTitle ? 13.5 : 15);
    const heading = sectionTitle ? `BARANGAY: ${sectionTitle}` : pdfPeso(title);
    const headingLines = pdf.splitTextToSize(heading, usableWidth);
    pdf.text(headingLines, margin, y2);
    y2 += headingLines.length * 5.6 + 1.5;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8.2);
    pdf.setTextColor(86, 96, 110);
    const line = continuation ? `${pdfPeso(subtitle || `Coverage: ${coverageLabel}`)} · Continuation` : pdfPeso(subtitle || `Coverage: ${coverageLabel}`);
    const lines = pdf.splitTextToSize(line, usableWidth);
    pdf.text(lines, margin, y2);
    y2 += lines.length * 4 + 4;
    return y2;
  };
  const drawSectionFooter = () => addPageFooter(pdf, docId.ref);
  let y = drawReportHeader();
  if (summary?.length) {
    autoTable(pdf, {
      startY: y,
      head: [["Summary", "Count / Value", "Percentage Rate (%Rate) / Population (%Population)"]],
      body: summary.map((item) => [
        pdfPeso(String(item.label)),
        typeof item.value === "number" ? item.value.toLocaleString() : pdfPeso(String(item.value)),
        item.percentage == null ? "-" : `${item.percentage.toFixed(2)}%`
      ]),
      margin: { left: margin, right: margin, bottom: 24 },
      theme: "grid",
      styles: { font: "helvetica", fontSize: 8.2, cellPadding: 2.4, lineColor: [190, 196, 204], lineWidth: 0.15, textColor: [40, 45, 52], valign: "middle" },
      headStyles: { fillColor: [226, 231, 237], textColor: [25, 30, 38], fontStyle: "bold" },
      columnStyles: { 1: { halign: "right", fontStyle: "bold" }, 2: { halign: "right", fontStyle: "bold" } },
      didDrawPage: drawSectionFooter
    });
    y = pdf.lastAutoTable.finalY + 7;
  }
  const sbCols = barangaySummaryColumns || (rows.length ? columns : []);
  const sbRows = barangaySummaryRows || rows.filter((r) => String(r._report_section || "") === "By Barangay Summary");
  if (sbCols.length && sbRows.length) {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10.5);
    pdf.setTextColor(25, 34, 48);
    pdf.text("BY BARANGAY SUMMARY", margin, y);
    y += 4;
    autoTable(pdf, {
      startY: y,
      head: [sbCols.map((c) => pdfPeso(c.label))],
      body: sortRowsForExport(sbCols, sbRows).map((r) => sbCols.map((c) => pdfPeso(String(getVal(r, c.key) ?? "")))),
      margin: { left: margin, right: margin, bottom: 24 },
      theme: "grid",
      styles: { font: "helvetica", fontSize: 7.7, cellPadding: 2.1, lineColor: [190, 196, 204], lineWidth: 0.15, textColor: [45, 50, 58], valign: "middle", overflow: "linebreak" },
      headStyles: { fillColor: [226, 231, 237], textColor: [25, 30, 38], fontStyle: "bold", valign: "middle" },
      alternateRowStyles: { fillColor: [249, 250, 251] },
      didDrawPage: drawSectionFooter
    });
    y = pdf.lastAutoTable.finalY + 5;
  }
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7.2);
  pdf.setTextColor(90, 96, 104);
  const metaY = Math.min(y, pageHeight - 26);
  pdf.text(`System generated: ${docId.generatedAt}`, margin, metaY);
  pdf.text(`Source: ${source}`, margin, metaY + 4.2);
  pdf.text(`Document No. ${docId.ref}`, margin, metaY + 8.4);
  drawSectionFooter();
  const sortedGroups = (groups || []).slice().sort((a, b) => compareText(a.title, b.title));
  if (sortedGroups.length) {
    for (const group of sortedGroups) {
      const groupRows = sortRowsForExport(columns, group.rows || []);
      if (!groupRows.length) continue;
      pdf.addPage([FOLIO_WIDTH_MM, FOLIO_HEIGHT_MM], "portrait");
      const groupY = drawReportHeader(group.title);
      const groupColumns = columns.map((c) => ({ ...c, label: pdfPeso(c.label) }));
      const groupOutputRows = groupRows.map((r) => groupColumns.map((c) => pdfPeso(String(getVal(r, c.key) ?? ""))));
      const numericIndexes = new Set(
        columns.map((c, i) => groupRows.some((r) => typeof getVal(r, c.key) === "number") ? i : -1).filter((i) => i >= 0)
      );
      autoTable(pdf, {
        startY: groupY,
        head: [groupColumns.map((c) => c.label)],
        body: groupOutputRows,
        foot: [[`TOTAL: ${groupRows.length.toLocaleString()} record(s)`, ...groupColumns.slice(1).map(() => "")]],
        margin: { top: 43, left: margin, right: margin, bottom: 24 },
        tableWidth: "auto",
        theme: "grid",
        styles: { font: "helvetica", fontSize: 7.2, cellPadding: 2.15, lineColor: [184, 190, 198], lineWidth: 0.14, textColor: [45, 50, 58], valign: "middle", overflow: "linebreak", minCellHeight: 6 },
        headStyles: { fillColor: [226, 231, 237], textColor: [25, 30, 38], fontStyle: "bold", halign: "left", valign: "middle", cellPadding: 2.3, lineColor: [150, 156, 164], lineWidth: 0.18 },
        alternateRowStyles: { fillColor: [250, 250, 250] },
        bodyStyles: { minCellHeight: 6 },
        footStyles: { fillColor: [242, 243, 245], textColor: [30, 35, 42], fontStyle: "bold", lineColor: [140, 146, 154], lineWidth: 0.2 },
        columnStyles: Object.fromEntries(Array.from(numericIndexes).map((i) => [i, { halign: "right" }])),
        didDrawPage: () => {
          drawSectionFooter();
        }
      });
    }
  } else {
    const flatRows = sortRowsForExport(columns, rows);
    if (flatRows.length) {
      pdf.addPage([FOLIO_WIDTH_MM, FOLIO_HEIGHT_MM], "portrait");
      const flatY = drawReportHeader();
      const outputColumns = columns.map((c) => ({ ...c, label: pdfPeso(c.label) }));
      const outputRows = flatRows.map((r) => outputColumns.map((c) => pdfPeso(String(getVal(r, c.key) ?? ""))));
      const numericIndexes = new Set(columns.map((c, i) => flatRows.some((r) => typeof getVal(r, c.key) === "number") ? i : -1).filter((i) => i >= 0));
      autoTable(pdf, {
        startY: flatY,
        head: [outputColumns.map((c) => c.label)],
        body: outputRows,
        foot: [[`TOTAL: ${flatRows.length.toLocaleString()} record(s)`, ...outputColumns.slice(1).map(() => "")]],
        margin: { top: 43, left: margin, right: margin, bottom: 24 },
        theme: "grid",
        styles: { font: "helvetica", fontSize: 7.2, cellPadding: 2.1, lineColor: [184, 190, 198], lineWidth: 0.14, textColor: [45, 50, 58], valign: "middle", overflow: "linebreak", minCellHeight: 6 },
        headStyles: { fillColor: [226, 231, 237], textColor: [25, 30, 38], fontStyle: "bold" },
        alternateRowStyles: { fillColor: [250, 250, 250] },
        footStyles: { fillColor: [242, 243, 245], textColor: [30, 35, 42], fontStyle: "bold" },
        columnStyles: Object.fromEntries(Array.from(numericIndexes).map((i) => [i, { halign: "right" }])),
        didDrawPage: () => {
          drawReportHeader();
          drawSectionFooter();
        }
      });
    }
  }
  const pdfBlob = pdf.output("blob");
  await packageProtected(`${docId.base}.pdf`, pdfBlob, { format: "PDF", title, rowCount: rows.length, doc: docId });
}
function ExportPasswordModal() {
  const [detail, setDetail] = reactExports.useState(null);
  const [revealed, setRevealed] = reactExports.useState(true);
  const [copied, setCopied] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onEvent = (e) => {
      const d = e.detail;
      setDetail(d);
      setRevealed(true);
      setCopied(false);
    };
    window.addEventListener("cbms-export-password", onEvent);
    return () => window.removeEventListener("cbms-export-password", onEvent);
  }, []);
  if (!detail) return null;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(detail.password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[220] grid place-items-center bg-slate-950/65 p-4 backdrop-blur-sm", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-xl overflow-hidden rounded-2xl border border-slate-300/20 bg-card shadow-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-primary/20 via-card to-card px-6 py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-black uppercase tracking-[.18em] text-primary", children: "Secure export" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 text-xl font-black", children: "Your export password is ready" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setDetail(null), className: "grid h-9 w-9 place-items-center rounded-lg border border-border bg-background/70", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-sm leading-6 text-muted-foreground", children: [
        "The ",
        detail.format,
        " file was encrypted and saved. Keep this password separate from the exported archive."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 px-6 py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/35 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground", children: "File" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 break-all font-mono text-xs", children: detail.filename })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-primary/30 bg-primary/5 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-black uppercase tracking-wider text-primary", children: "AES-256 password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setRevealed((v) => !v), className: "inline-flex items-center gap-1 text-[11px] font-bold text-muted-foreground hover:text-foreground", children: [
            revealed ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" }),
            revealed ? "Hide" : "Show"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "min-w-0 flex-1 break-all font-mono text-sm font-black tracking-wide", children: revealed ? detail.password : "•".repeat(Math.min(18, detail.password.length)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: copy, children: [
            copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Clipboard, { className: "h-4 w-4" }),
            copied ? "Copied" : "Copy"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-[11px] text-muted-foreground", children: "The password was also recorded in the local Export Log." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 border-t border-border bg-muted/30 px-6 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setDetail(null), children: "Close" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: copy, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clipboard, { className: "h-4 w-4" }),
        " Copy password"
      ] })
    ] })
  ] }) });
}
const PAPER_SIZES = {
  folio: { label: "Folio", widthMm: 215.9, heightMm: 330.2, note: "215.9 × 330.2 mm" },
  a4: { label: "A4", widthMm: 210, heightMm: 297, note: "210 × 297 mm" },
  letter: { label: "Letter", widthMm: 215.9, heightMm: 279.4, note: "8.5 × 11 in" },
  legal: { label: "Legal", widthMm: 215.9, heightMm: 355.6, note: "8.5 × 14 in" },
  a3: { label: "A3", widthMm: 297, heightMm: 420, note: "297 × 420 mm" }
};
function PrintPreviewModal() {
  const [detail, setDetail] = reactExports.useState(null);
  const [printers, setPrinters] = reactExports.useState([]);
  const [selected, setSelected] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [pages, setPages] = reactExports.useState([]);
  const [page, setPage] = reactExports.useState(0);
  const [fitScale, setFitScale] = reactExports.useState(1);
  const [zoomMode, setZoomMode] = reactExports.useState("fit");
  const [paperSize, setPaperSize] = reactExports.useState("folio");
  const [orientation, setOrientation] = reactExports.useState("portrait");
  const previewAreaRef = reactExports.useRef(null);
  const pxPerMm = 96 / 25.4;
  const selectedPaper = PAPER_SIZES[paperSize];
  const orientedWidthMm = orientation === "portrait" ? selectedPaper.widthMm : selectedPaper.heightMm;
  const orientedHeightMm = orientation === "portrait" ? selectedPaper.heightMm : selectedPaper.widthMm;
  const paperWidthPx = Math.round(orientedWidthMm * pxPerMm);
  const paperHeightPx = Math.round(orientedHeightMm * pxPerMm);
  const buildPageDocument = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const style = Array.from(doc.head.querySelectorAll("style")).map((s) => s.outerHTML).join("");
    const override = `<style data-cbms-print-options>
      @page { size: ${orientedWidthMm}mm ${orientedHeightMm}mm; margin: 0; }
      html, body { width: ${orientedWidthMm}mm; min-width: ${orientedWidthMm}mm; margin: 0; padding: 0; }
      .print-page { width: ${orientedWidthMm}mm !important; min-width: ${orientedWidthMm}mm !important; height: ${orientedHeightMm}mm !important; min-height: ${orientedHeightMm}mm !important; }
    </style>`;
    const nodes = Array.from(doc.body.querySelectorAll(".print-page"));
    if (!nodes.length) return [html.replace("</head>", `${override}</head>`)];
    return nodes.map((node) => `<!doctype html><html><head><meta charset="utf-8">${style}${override}</head><body>${node.outerHTML}</body></html>`);
  };
  const extractPages = (html) => {
    try {
      return buildPageDocument(html);
    } catch {
      return [html];
    }
  };
  const refresh = async () => {
    if (!window.electronPrint) return;
    try {
      const list = await window.electronPrint.getPrinters();
      const ordered = [...list].sort((a, b) => Number(b.isDefault) - Number(a.isDefault) || String(a.displayName || a.name).localeCompare(String(b.displayName || b.name)));
      setPrinters(ordered);
      setSelected((current) => current && ordered.some((p) => p.name === current) ? current : ordered.find((p) => p.isDefault)?.name || ordered[0]?.name || "");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load printers.");
    }
  };
  const recomputeFit = () => {
    const el = previewAreaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const availableW = Math.max(320, rect.width - 44);
    const availableH = Math.max(320, rect.height - 44);
    const scale = Math.min(availableW / paperWidthPx, availableH / paperHeightPx, 1);
    setFitScale(Number.isFinite(scale) && scale > 0 ? scale : 1);
  };
  reactExports.useEffect(() => {
    const onEvent = (e) => {
      const d = e.detail;
      setDetail(d);
      setPages(extractPages(d.html));
      setPage(0);
      setZoomMode("fit");
      setError("");
      setTimeout(refresh, 0);
    };
    window.addEventListener("cbms-print-preview", onEvent);
    return () => window.removeEventListener("cbms-print-preview", onEvent);
  }, []);
  reactExports.useEffect(() => {
    const savedPaper = localStorage.getItem("cbms-print-paper");
    const savedOrientation = localStorage.getItem("cbms-print-orientation");
    if (savedPaper && savedPaper in PAPER_SIZES) setPaperSize(savedPaper);
    if (savedOrientation === "portrait" || savedOrientation === "landscape") setOrientation(savedOrientation);
  }, []);
  reactExports.useEffect(() => {
    localStorage.setItem("cbms-print-paper", paperSize);
    localStorage.setItem("cbms-print-orientation", orientation);
    if (detail) setPages(extractPages(detail.html));
    setZoomMode("fit");
    setPage(0);
  }, [paperSize, orientation]);
  reactExports.useEffect(() => {
    if (!detail) return;
    recomputeFit();
    const el = previewAreaRef.current;
    if (!el) return;
    const observer = new ResizeObserver(recomputeFit);
    observer.observe(el);
    window.addEventListener("resize", recomputeFit);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", recomputeFit);
    };
  }, [detail, page, pages.length, paperSize, orientation]);
  if (!detail) return null;
  const print = async () => {
    setBusy(true);
    setError("");
    try {
      if (window.electronPrint) {
        const r = await window.electronPrint.printHtml(detail.html, selected, { paperSize, orientation });
        if (!r.ok) setError(r.error || "Printing was cancelled or failed.");
        else setDetail(null);
      } else {
        const popup = window.open("", "_blank");
        if (!popup) {
          setError("The print preview window was blocked.");
          return;
        }
        popup.document.write(detail.html.replace("</head>", `<style>@page{size:${orientedWidthMm}mm ${orientedHeightMm}mm;margin:0}.print-page{width:${orientedWidthMm}mm!important;min-width:${orientedWidthMm}mm!important;height:${orientedHeightMm}mm!important;min-height:${orientedHeightMm}mm!important}</style></head>`));
        popup.document.close();
        setTimeout(() => {
          popup.focus();
          popup.print();
        }, 300);
        setDetail(null);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Printing failed.");
    } finally {
      setBusy(false);
    }
  };
  const currentPage = pages[Math.min(page, Math.max(0, pages.length - 1))] || detail.html;
  const zoom = zoomMode === "fit" ? fitScale : Number(zoomMode) / 100;
  const displayW = Math.round(paperWidthPx * zoom);
  const displayH = Math.round(paperHeightPx * zoom);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[210] bg-slate-950/70 p-3 backdrop-blur-sm", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-full w-full max-w-[1600px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex shrink-0 items-center justify-between gap-4 border-b border-border bg-card px-5 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-black uppercase tracking-[.16em] text-primary", children: "Print Preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 truncate text-base font-black", children: detail.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 text-xs text-muted-foreground", children: [
          selectedPaper.label,
          " · ",
          orientation,
          " · ",
          selectedPaper.note,
          " · ",
          pages.length,
          " page",
          pages.length === 1 ? "" : "s"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setDetail(null), className: "grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-background hover:bg-muted", "aria-label": "Close print preview", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 border-b border-border bg-muted/20 px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-[1fr_1fr_1.2fr_auto] md:items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-black uppercase tracking-[.12em] text-muted-foreground", children: "Paper size" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: paperSize, onChange: (e) => setPaperSize(e.target.value), className: "mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-primary/30", children: Object.entries(PAPER_SIZES).map(([key, p]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: key, children: [
            p.label,
            " · ",
            p.note
          ] }, key)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-black uppercase tracking-[.12em] text-muted-foreground", children: "Orientation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 grid grid-cols-2 gap-1 rounded-xl border border-border bg-background p-1", children: ["portrait", "landscape"].map((mode) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOrientation(mode), className: `h-8 rounded-lg text-sm font-bold capitalize transition ${orientation === mode ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted"}`, children: mode }, mode)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-black uppercase tracking-[.12em] text-muted-foreground", children: "Printer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: refresh, className: "h-7 px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3.5 w-3.5" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: selected, onChange: (e) => setSelected(e.target.value), className: "mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-primary/30", disabled: !printers.length, children: printers.length ? printers.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: p.name, children: [
            p.isDefault ? "★ " : "",
            p.displayName || p.name,
            p.isDefault ? " — Ready" : ""
          ] }, p.name)) : /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "No printer found" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-primary/15 bg-primary/5 px-3 py-2 text-[11px] text-muted-foreground md:min-w-[190px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-foreground", children: "Selected output" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5", children: [
            orientedWidthMm.toFixed(1),
            " × ",
            orientedHeightMm.toFixed(1),
            " mm"
          ] })
        ] })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs font-medium text-destructive", children: error })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-h-0 flex-1 grid-cols-[132px_minmax(0,1fr)] gap-3 p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "min-h-0 overflow-hidden rounded-xl border border-border bg-muted/25", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-3 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-black uppercase tracking-[.14em] text-muted-foreground", children: "Pages" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold text-muted-foreground", children: [
            page + 1,
            "/",
            pages.length
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full overflow-y-auto p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: pages.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setPage(i), className: `block w-full rounded-xl border p-1.5 text-left transition ${page === i ? "border-primary bg-primary/10 shadow-sm" : "border-border bg-background hover:bg-muted"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center justify-between px-1 text-[9px] font-black", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Page ",
              i + 1
            ] }),
            i === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "First" }) : null
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-md border border-border bg-white", style: { aspectRatio: `${orientedWidthMm} / ${orientedHeightMm}` }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { title: `Page ${i + 1} thumbnail`, srcDoc: src, className: "pointer-events-none h-full w-full border-0" }) })
        ] }, i)) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { ref: previewAreaRef, className: "min-h-0 min-w-0 overflow-hidden rounded-xl border border-border bg-slate-100/70 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2.5 flex shrink-0 items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full border border-border bg-background px-2.5 py-1 font-semibold", children: [
              "Page ",
              page + 1,
              " of ",
              pages.length
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              selectedPaper.label,
              " · ",
              orientation
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 rounded-xl border border-border bg-background p-1 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: zoomMode === "fit" ? "default" : "ghost", onClick: () => setZoomMode("fit"), children: "Fit" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: zoomMode === "75" ? "default" : "ghost", onClick: () => setZoomMode("75"), children: "75%" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: zoomMode === "100" ? "default" : "ghost", onClick: () => setZoomMode("100"), children: "100%" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => previewAreaRef.current?.querySelector(".cbms-preview-scroller")?.scrollTo({ top: 0, behavior: "smooth" }), children: "Top" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => {
              const el = previewAreaRef.current?.querySelector(".cbms-preview-scroller");
              if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
            }, children: "Bottom" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", disabled: page <= 0, onClick: () => setPage((p) => p - 1), children: "Previous" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", disabled: page >= pages.length - 1, onClick: () => setPage((p) => p + 1), children: "Next" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "cbms-preview-scroller flex h-[calc(100%-44px)] min-h-0 min-w-0 items-start justify-start overflow-auto rounded-xl border border-border/70 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.98),rgba(226,232,240,.8))] p-3 [scrollbar-gutter:stable_both-edges]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative shrink-0 mx-auto", style: { width: displayW, height: displayH, minWidth: displayW, minHeight: displayH }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { title: "Printable paper preview", srcDoc: currentPage, className: "absolute left-0 top-0 block origin-top-left border-0 bg-white shadow-[0_18px_50px_rgba(15,23,42,.18)]", style: { width: paperWidthPx, height: paperHeightPx, transform: `scale(${zoom})` } }, `preview-${paperSize}-${orientation}-${page}-${pages.length}`) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "flex shrink-0 items-center justify-between gap-3 border-t border-border bg-card px-5 py-3.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "The preview uses the selected paper settings. Windows will open the printer dialog so the physical printer driver can confirm the selected paper and orientation." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setDetail(null), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: print, disabled: busy || !!printers.length && !selected, children: busy ? "Preparing…" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-4 w-4" }),
          " Print document"
        ] }) })
      ] })
    ] })
  ] }) });
}
const NAV_GROUPS = [
  {
    label: "Overview",
    items: [
      { to: "/", label: "Dashboard", icon: LayoutDashboard },
      { to: "/comparative", label: "Comparative Analysis", icon: ChartColumn }
    ]
  },
  {
    label: "Community Data",
    items: [
      { to: "/persons", label: "Person Search", icon: Users },
      { to: "/households", label: "Households", icon: House },
      { to: "/barangays", label: "Barangays", icon: MapPin },
      { to: "/demographics", label: "Demographics", icon: Baby },
      { to: "/sectors", label: "Sector Rosters", icon: HeartHandshake }
    ]
  },
  {
    label: "Analysis & Reports",
    items: [
      { to: "/crosstab", label: "Cross-tabulation", icon: Grid3x3 },
      { to: "/reports", label: "Statistical Reports", icon: FileChartColumnIncreasing },
      { to: "/compendium", label: "Report Compendium", icon: BookOpen },
      { to: "/validation", label: "Data Validation", icon: ShieldCheck }
    ]
  },
  {
    label: "System",
    items: [
      { to: "/inspector", label: "Dataset Inspector", icon: Database },
      { to: "/export-log", label: "Export Log", icon: KeyRound },
      { to: "/import", label: "Import Data", icon: Upload },
      { to: "/settings", label: "Settings", icon: Settings }
    ]
  }
];
const ALL_NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items);
const PAGE_TITLES = {
  "/": "Dashboard",
  "/comparative": "Comparative Analysis",
  "/persons": "Person Search",
  "/households": "Households",
  "/barangays": "Barangays",
  "/demographics": "Demographics",
  "/sectors": "Sector Rosters",
  "/crosstab": "Cross-tabulation",
  "/reports": "Statistical Reports",
  "/compendium": "Report Compendium",
  "/validation": "Data Validation",
  "/inspector": "Dataset Inspector",
  "/export-log": "Export Log",
  "/import": "Import Data",
  "/settings": "Settings",
  "/troubleshooting": "Troubleshooting"
};
function AppShell() {
  const loc = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = reactExports.useState(() => {
    try {
      return localStorage.getItem("cbms-insights.sidebar.collapsed") === "1";
    } catch {
      return false;
    }
  });
  const [searchValue, setSearchValue] = reactExports.useState("");
  const [searchOpen, setSearchOpen] = reactExports.useState(false);
  const [updateState, setUpdateState] = reactExports.useState({ state: "idle" });
  const [updateChecking, setUpdateChecking] = reactExports.useState(false);
  const dataVersion2 = reactExports.useSyncExternalStore(subscribeData, getDataVersion, () => 0);
  const activeYear2 = getActiveYear();
  const activeBarangay2 = getActiveBarangay();
  const availableYears = getAvailableYears();
  const availableBarangays = getAvailableBarangays(activeYear2);
  const pageTitle = PAGE_TITLES[loc.pathname] ?? "Community Data & Insights";
  const suggestions = reactExports.useMemo(() => {
    const q = searchValue.trim().toLowerCase();
    if (!q) return ALL_NAV_ITEMS.slice(0, 6);
    return ALL_NAV_ITEMS.filter((item) => item.label.toLowerCase().includes(q)).slice(0, 6);
  }, [searchValue]);
  reactExports.useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setSearchValue("");
  }, [loc.pathname]);
  reactExports.useEffect(() => {
    try {
      localStorage.setItem("cbms-insights.sidebar.collapsed", sidebarCollapsed ? "1" : "0");
    } catch {
    }
  }, [sidebarCollapsed]);
  reactExports.useEffect(() => {
    const handler = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        const input = document.querySelector(".app-global-search input");
        input?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  reactExports.useEffect(() => {
    const bridge = window.electronUpdater;
    if (!bridge) return;
    const off = bridge.onStatus((payload) => {
      setUpdateState({
        state: payload.state || "idle",
        version: payload.version,
        percent: payload.percent,
        message: payload.message
      });
      if (payload.state === "checking") setUpdateChecking(true);
      else setUpdateChecking(false);
    });
    return () => off?.();
  }, []);
  const checkForUpdates = async () => {
    if (!window.electronUpdater) {
      setUpdateState({ state: "unavailable", message: "Update checks are available in the installed desktop application." });
      return;
    }
    setUpdateChecking(true);
    setUpdateState({ state: "checking" });
    try {
      const result = await window.electronUpdater.checkForUpdates();
      if (!result.ok && result.message) setUpdateState({ state: "error", message: result.message });
    } catch (error) {
      setUpdateState({ state: "error", message: error instanceof Error ? error.message : "Unable to check for updates." });
    } finally {
      setUpdateChecking(false);
    }
  };
  const isActive = (to) => loc.pathname === to || to !== "/" && loc.pathname.startsWith(to);
  const submitSearch = () => {
    const target = suggestions[0];
    if (!target) return;
    navigate({ to: target.to });
    setSearchValue("");
    setSearchOpen(false);
  };
  const closeMobile = () => setMobileOpen(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-shell min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ExportPasswordModal, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PrintPreviewModal, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: `app-sidebar fixed inset-y-0 left-0 z-40 hidden flex-col lg:flex ${sidebarCollapsed ? "app-sidebar-collapsed w-[68px]" : "w-[224px]"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarBrand, { collapsed: sidebarCollapsed, onToggle: () => setSidebarCollapsed((v) => !v) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarNavigation, { isActive, onNavigate: closeMobile, collapsed: sidebarCollapsed }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarAccount, { collapsed: sidebarCollapsed })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `app-mobile-drawer-backdrop lg:hidden ${mobileOpen ? "is-open" : ""}`,
        onClick: closeMobile
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: `app-mobile-drawer lg:hidden ${mobileOpen ? "is-open" : ""}`, "aria-hidden": !mobileOpen, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarBrand, { mobile: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarNavigation, { isActive, onNavigate: closeMobile }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarAccount, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "app-topbar sticky top-0 z-30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-topbar-inner", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-topbar-leading", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "app-mobile-menu lg:hidden",
              type: "button",
              onClick: () => setMobileOpen((value) => !value),
              "aria-label": mobileOpen ? "Close navigation" : "Open navigation",
              children: mobileOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-breadcrumbs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "app-breadcrumb-muted", children: "CBMS Insights" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "app-breadcrumb-slash", children: "/" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "app-breadcrumb-current", children: pageTitle })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-search-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              className: "app-global-search",
              onSubmit: (event) => {
                event.preventDefault();
                submitSearch();
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-[15px] w-[15px] shrink-0 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    value: searchValue,
                    onChange: (event) => {
                      setSearchValue(event.target.value);
                      setSearchOpen(true);
                    },
                    onFocus: () => setSearchOpen(true),
                    placeholder: "Search modules, reports, people…",
                    "aria-label": "Global search"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "app-search-kbd", children: "Ctrl K" })
              ]
            }
          ),
          searchOpen && suggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-search-results", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "app-search-results-label", children: "Navigate" }),
            suggestions.map((item) => {
              const Icon = item.icon;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "app-search-result",
                  onMouseDown: (event) => event.preventDefault(),
                  onClick: () => navigate({ to: item.to }),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "app-search-result-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label })
                  ]
                },
                item.to
              );
            })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-topbar-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-year-switch topbar-year-switch hidden md:flex", "aria-label": "CBMS dataset year", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "app-year-switch-icon" }),
            [2022, 2024].map((year) => {
              const enabled = availableYears.includes(year);
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  disabled: !enabled,
                  "aria-pressed": activeYear2 === year,
                  className: `app-year-button ${activeYear2 === year ? "is-active" : ""} ${!enabled ? "is-disabled" : ""}`,
                  onClick: () => enabled && setActiveYear(year),
                  title: enabled ? `Use CBMS ${year} dataset` : `CBMS ${year} dataset is unavailable`,
                  children: year
                },
                year
              );
            })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-context-control app-barangay-control hidden 2xl:flex", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                "aria-label": "Active barangay",
                value: activeBarangay2,
                onChange: (event) => setActiveBarangay(event.target.value),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Barangays" }),
                  availableBarangays.map((barangay) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: barangay.area_name, children: barangay.area_name }, barangay.area_code))
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3 text-muted-foreground" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: checkForUpdates,
              className: `relative inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-semibold transition ${updateState.state === "available" || updateState.state === "downloaded" ? "border-primary/30 bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground hover:bg-muted"}`,
              title: updateState.version ? `Check for updates · ${updateState.version} available` : "Check for updates",
              "aria-label": "Check for updates",
              children: [
                updateChecking || updateState.state === "downloading" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : updateState.state === "available" || updateState.state === "downloaded" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CloudDownload, { className: "h-3.5 w-3.5" }) : updateState.state === "error" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3.5 w-3.5 text-destructive" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden xl:inline", children: updateState.state === "available" ? "New update" : updateState.state === "downloaded" ? "Update ready" : updateState.state === "downloading" ? `Updating ${updateState.percent ?? 0}%` : "Check updates" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {})
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-mobile-context lg:hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-mobile-context-item app-mobile-year-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Dataset" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "app-year-switch app-mobile-year-switch", "aria-label": "CBMS dataset year", children: [2022, 2024].map((year) => {
            const enabled = availableYears.includes(year);
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                disabled: !enabled,
                "aria-pressed": activeYear2 === year,
                className: `app-year-button ${activeYear2 === year ? "is-active" : ""} ${!enabled ? "is-disabled" : ""}`,
                onClick: () => enabled && setActiveYear(year),
                children: year
              },
              year
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-mobile-context-item app-mobile-context-grow", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Barangay" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { "aria-label": "Barangay view", value: activeBarangay2, onChange: (event) => setActiveBarangay(event.target.value), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Barangays" }),
            availableBarangays.map((barangay) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: barangay.area_name, children: barangay.area_name }, barangay.area_code))
          ] })
        ] })
      ] })
    ] }),
    updateState.state === "available" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-[57px] z-20 flex items-center justify-between gap-3 border-b border-primary/20 bg-primary/8 px-4 py-2 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-2 text-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CloudDownload, { className: "h-4 w-4 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate font-semibold", children: [
          "A new CBMS Insights update ",
          updateState.version ? `(${updateState.version})` : "",
          " is available and is downloading in the background."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: checkForUpdates, className: "shrink-0 rounded-md border border-primary/20 bg-background px-2.5 py-1.5 font-semibold text-primary hover:bg-primary/5", children: "Check now" })
    ] }),
    updateState.state === "downloaded" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-[57px] z-20 flex items-center justify-between gap-3 border-b border-emerald-500/20 bg-emerald-500/8 px-4 py-2 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-2 text-emerald-700 dark:text-emerald-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate font-semibold", children: [
        "Update ",
        updateState.version ? `(${updateState.version}) ` : "",
        "is downloaded and ready. Restart the application to install it."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: `app-main ${sidebarCollapsed ? "app-main-sidebar-collapsed" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-container mx-auto max-w-[1700px] px-5 py-5 sm:px-7 lg:px-9 lg:py-7 2xl:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DataGate, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }, dataVersion2),
      loc.pathname !== "/comparative" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-main-footer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: getSourceWatermark(activeYear2) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "CBMS · Offline-ready" })
      ] })
    ] }) }) })
  ] });
}
function SidebarBrand({ mobile = false, collapsed = false, onToggle }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `app-brand ${mobile ? "is-mobile" : ""} ${collapsed ? "is-collapsed" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { alt: "CBMS Insights logo", className: "app-brand-seal", src: logo }),
    !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "app-brand-kicker", children: "Community Data System" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "app-brand-title", children: "CBMS" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "app-brand-subtitle", children: "Community-Based Monitoring System" })
    ] }),
    !mobile && onToggle && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onToggle, className: "app-sidebar-collapse-toggle", "aria-label": collapsed ? "Expand sidebar" : "Collapse sidebar", title: collapsed ? "Expand sidebar" : "Collapse sidebar", children: collapsed ? /* @__PURE__ */ jsxRuntimeExports.jsx(PanelLeftOpen, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PanelLeftClose, { className: "h-4 w-4" }) })
  ] });
}
function SidebarNavigation({
  isActive,
  onNavigate,
  collapsed = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: `app-nav flex-1 overflow-y-auto px-2.5 py-3 ${collapsed ? "is-collapsed" : ""}`, "aria-label": "Primary navigation", children: NAV_GROUPS.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-nav-group", children: [
    !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "app-nav-label", children: group.label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0.5", children: group.items.map((item) => {
      const active = isActive(item.to);
      const Icon = item.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: item.to,
          onClick: onNavigate,
          className: `app-nav-item ${active ? "is-active" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "app-nav-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-[15px] w-[15px]", strokeWidth: 1.7 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: collapsed ? "sr-only" : "", children: item.label })
          ]
        },
        item.to
      );
    }) })
  ] }, group.label)) });
}
function SidebarAccount({ collapsed = false }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-sidebar-account", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "app-account-avatar", children: "MO" }),
    !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-[11px] font-bold", children: "Data Office" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-[9px] text-sidebar-foreground/45", children: "Data & Planning" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "app-account-status", title: "Local app ready", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-3 w-3" }) })
  ] });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$g = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Community Data & Insights" },
      { name: "description", content: "CBMS-based community profiling, search and reports for LGUs and barangays." },
      { name: "author", content: "LMDAS" },
      { property: "og:title", content: "Community Data & Insights" },
      { property: "og:description", content: "CBMS-based community profiling for Philippine LGUs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function SecureLoginGate({ children }) {
  const [checking, setChecking] = reactExports.useState(true);
  const [configured, setConfigured] = reactExports.useState(false);
  const [unlocked, setUnlocked] = reactExports.useState(false);
  const [pin, setPin] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [lockedUntil, setLockedUntil] = reactExports.useState(0);
  const [remainingMs, setRemainingMs] = reactExports.useState(0);
  const [attemptsRemaining, setAttemptsRemaining] = reactExports.useState(3);
  const [storageError, setStorageError] = reactExports.useState("");
  reactExports.useEffect(() => {
    void (async () => {
      const state = await window.electronStore?.getAuthState?.();
      setConfigured(Boolean(state?.configured));
      setLockedUntil(Number(state?.lockedUntil || 0));
      setRemainingMs(Number(state?.remainingMs || 0));
      setAttemptsRemaining(Number(state?.attemptsRemaining ?? 3));
      if (state?.storageError) setStorageError(String(state?.error || "Security storage could not be verified."));
      setChecking(false);
    })();
  }, []);
  reactExports.useEffect(() => {
    if (!lockedUntil) return;
    const tick = () => {
      const remaining = Math.max(0, lockedUntil - Date.now());
      setRemainingMs(remaining);
      if (remaining === 0) {
        setLockedUntil(0);
        setAttemptsRemaining(3);
        setError("");
      }
    };
    tick();
    const timer = window.setInterval(tick, 1e3);
    return () => window.clearInterval(timer);
  }, [lockedUntil]);
  if (checking) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen grid place-items-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Securing system…" }) });
  if (storageError) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen grid place-items-center bg-slate-950 p-6 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "w-full max-w-lg rounded-[28px] border border-red-400/20 bg-slate-900 p-7 shadow-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Selected Local Area", className: "h-16 w-16 rounded-2xl bg-white p-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-red-300", children: "Security storage error" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1 text-2xl font-black", children: "Access blocked" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-sm leading-6 text-slate-300", children: storageError }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs leading-5 text-slate-400", children: "Close the application completely and start it again. The application will not open its data until the existing security record can be verified." })
  ] }) });
  if (!configured) return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
  if (unlocked) return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
  const formatLockout = (ms) => {
    const total = Math.ceil(Math.max(0, ms) / 1e3);
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor(total % 3600 / 60);
    const seconds = total % 60;
    return `${hours}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;
  };
  const submit = async () => {
    setError("");
    if (!/^\d{6}$/.test(pin)) return setError("Enter your 6-digit PIN.");
    if (lockedUntil > Date.now()) {
      setError(`System locked. Try again in ${formatLockout(lockedUntil - Date.now())}.`);
      return;
    }
    const result = await window.electronStore?.verifyLoginPin?.(pin);
    if (result?.storageError) {
      setStorageError(String(result?.error || "The saved security record cannot be decrypted."));
      setPin("");
      return;
    }
    if (result?.valid) {
      setUnlocked(true);
      setPin("");
      setAttemptsRemaining(3);
      setError("");
    } else if (result?.locked) {
      setPin("");
      setLockedUntil(Number(result.lockedUntil || 0));
      setRemainingMs(Number(result.remainingMs || 0));
      setAttemptsRemaining(0);
      setError(`Three consecutive incorrect PIN entries were detected. Access is locked for 10 hours.`);
    } else {
      setPin("");
      setAttemptsRemaining(Number(result?.attemptsRemaining ?? Math.max(0, 3 - Number(result?.failedAttempts || 0))));
      setError(`Incorrect PIN. ${Number(result?.attemptsRemaining ?? 0)} attempt${Number(result?.attemptsRemaining ?? 0) === 1 ? "" : "s"} remaining.`);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen overflow-hidden bg-slate-950 p-6 grid place-items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[linear-gradient(135deg,rgba(2,12,27,.92),rgba(9,37,68,.78)_45%,rgba(2,12,27,.92))]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:36px_36px]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "relative w-full max-w-md overflow-hidden rounded-[30px] border border-white/25 bg-slate-950/70 p-7 shadow-[0_30px_100px_rgba(0,0,0,.45)] backdrop-blur-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 rounded-[30px] ring-1 ring-inset ring-white/10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/95 p-2 shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Selected Local Area", className: "h-full w-full rounded-xl object-contain" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300", children: "Protected access" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1 font-display text-2xl font-black text-white", children: "CBMS Insights" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-300", children: "Community-Based Monitoring System" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-7 overflow-hidden rounded-2xl border border-white/15 bg-white/8 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-6 -top-8 h-20 w-20 rounded-full bg-cyan-400/10 blur-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-bold text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-cyan-300" }),
          " Secure system"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs leading-5 text-slate-300", children: "Enter the 6-digit security PIN configured in System Settings." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "relative mt-6 block text-sm font-bold text-white", children: [
        "Security PIN",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-6 gap-2 sm:gap-2.5", "aria-hidden": "true", children: Array.from({ length: 6 }, (_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `grid aspect-square min-w-0 place-items-center rounded-xl border text-xl font-black transition sm:rounded-2xl sm:text-2xl ${pin.length > index ? "border-cyan-200/50 bg-cyan-300/10 text-cyan-100 shadow-[0_0_18px_rgba(103,232,249,.12)]" : "border-white/15 bg-black/25 text-slate-500"}`,
              children: pin.length > index ? "•" : ""
            },
            index
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              autoFocus: true,
              inputMode: "numeric",
              "aria-label": "6-digit Security PIN",
              maxLength: 6,
              type: "password",
              value: pin,
              onChange: (e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6)),
              onKeyDown: (e) => {
                if (e.key === "Enter") void submit();
              },
              disabled: lockedUntil > Date.now(),
              className: "absolute inset-0 h-full w-full cursor-text rounded-2xl opacity-0 outline-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-[10px] font-medium text-slate-400", children: "Six numeric digits required" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", disabled: lockedUntil > Date.now(), onClick: () => void submit(), className: "relative mt-4 flex w-full disabled:cursor-not-allowed disabled:opacity-50 items-center justify-center gap-2 rounded-2xl border border-cyan-200/20 bg-cyan-500/90 px-4 py-3.5 text-sm font-black text-slate-950 shadow-xl shadow-cyan-950/30 transition hover:bg-cyan-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LockKeyhole, { className: "h-4 w-4" }),
        " Unlock Secure System"
      ] }),
      lockedUntil > Date.now() ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-4 rounded-2xl border border-red-300/20 bg-red-950/35 p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-black text-red-200", children: "Security lockout active" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-mono text-xl font-black tracking-wide text-red-100", children: formatLockout(remainingMs) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-red-200/80", children: "Three consecutive incorrect PIN entries trigger this 10-hour lockout." })
      ] }) : (error || attemptsRemaining < 3) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "relative mt-3 text-center text-sm font-semibold text-red-300", children: error || `${attemptsRemaining} attempt${attemptsRemaining === 1 ? "" : "s"} remaining.` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-5 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.7)]" }),
        " Local secure session ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-1 text-slate-600", children: "•" }),
        " Selected Local Area"
      ] })
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$g.useRouteContext();
  reactExports.useEffect(() => {
    const stopRendererDrag = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    document.addEventListener("dragstart", stopRendererDrag, true);
    return () => document.removeEventListener("dragstart", stopRendererDrag, true);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SecureLoginGate, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MonthlyCheckinModal, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, {})
  ] }) });
}
const $$splitComponentImporter$f = () => import("./index-CyaHpA7n.mjs");
const Route$f = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./barangays-CoZDFvKX.mjs");
const Route$e = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./comparative-CykR3w5X.mjs");
const Route$d = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./compendium-CszDfOdT.mjs");
const Route$c = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./crosstab-BwYZSd3_.mjs");
const Route$b = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./demographics-BLT-BcQv.mjs");
const Route$a = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitErrorComponentImporter = () => import("./export-log-C1n4pxTw.mjs");
const $$splitComponentImporter$9 = () => import("./export-log-DooVYkiD.mjs");
const Route$9 = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$9, "component"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
const $$splitComponentImporter$8 = () => import("./households-RKW0AxYm.mjs");
const Route$8 = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./import--G3vfd1P.mjs");
const Route$7 = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$7, "component"),
  head: () => ({
    meta: [{
      title: "Import CBMS Data · Community Data & Insights"
    }, {
      name: "description",
      content: "Import your CBMS JSON datasets from this computer. Files are read one at a time to keep memory usage low."
    }, {
      property: "og:title",
      content: "Import CBMS Data · Local Data"
    }, {
      property: "og:description",
      content: "Load Barangay, Household, Person and TVET CBMS JSON files into the offline analytics platform."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary"
    }]
  })
});
const $$splitComponentImporter$6 = () => import("./inspector-Wn0Bv1xm.mjs");
const Route$6 = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./persons-duW-xUAv.mjs");
const schema$1 = object({
  q: string().catch("").default("")
});
const Route$5 = createFileRoute()({
  validateSearch: schema$1,
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./reports-CidAi6by.mjs");
const Route$4 = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./sectors-NlJ7Q6Et.mjs");
const schema = object({
  tab: string().catch("pwd_by_brgy").default("pwd_by_brgy")
});
const Route$3 = createFileRoute()({
  validateSearch: schema,
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./settings-Bzs_uPFR.mjs");
const Route$2 = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./troubleshooting-Cm3k6foa.mjs");
const Route$1 = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./validation-BBaq6Crm.mjs");
const Route = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route$f.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$g
});
const BarangaysRoute = Route$e.update({
  id: "/barangays",
  path: "/barangays",
  getParentRoute: () => Route$g
});
const ComparativeRoute = Route$d.update({
  id: "/comparative",
  path: "/comparative",
  getParentRoute: () => Route$g
});
const CompendiumRoute = Route$c.update({
  id: "/compendium",
  path: "/compendium",
  getParentRoute: () => Route$g
});
const CrosstabRoute = Route$b.update({
  id: "/crosstab",
  path: "/crosstab",
  getParentRoute: () => Route$g
});
const DemographicsRoute = Route$a.update({
  id: "/demographics",
  path: "/demographics",
  getParentRoute: () => Route$g
});
const ExportLogRoute = Route$9.update({
  id: "/export-log",
  path: "/export-log",
  getParentRoute: () => Route$g
});
const HouseholdsRoute = Route$8.update({
  id: "/households",
  path: "/households",
  getParentRoute: () => Route$g
});
const ImportRoute = Route$7.update({
  id: "/import",
  path: "/import",
  getParentRoute: () => Route$g
});
const InspectorRoute = Route$6.update({
  id: "/inspector",
  path: "/inspector",
  getParentRoute: () => Route$g
});
const PersonsRoute = Route$5.update({
  id: "/persons",
  path: "/persons",
  getParentRoute: () => Route$g
});
const ReportsRoute = Route$4.update({
  id: "/reports",
  path: "/reports",
  getParentRoute: () => Route$g
});
const SectorsRoute = Route$3.update({
  id: "/sectors",
  path: "/sectors",
  getParentRoute: () => Route$g
});
const SettingsRoute = Route$2.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => Route$g
});
const TroubleshootingRoute = Route$1.update({
  id: "/troubleshooting",
  path: "/troubleshooting",
  getParentRoute: () => Route$g
});
const ValidationRoute = Route.update({
  id: "/validation",
  path: "/validation",
  getParentRoute: () => Route$g
});
const rootRouteChildren = {
  IndexRoute,
  BarangaysRoute,
  ComparativeRoute,
  CompendiumRoute,
  CrosstabRoute,
  DemographicsRoute,
  ExportLogRoute,
  HouseholdsRoute,
  ImportRoute,
  InspectorRoute,
  PersonsRoute,
  ReportsRoute,
  SectorsRoute,
  SettingsRoute,
  TroubleshootingRoute,
  ValidationRoute
};
const routeTree = Route$g._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Button,
  DATASET_LABELS,
  ImportPanel,
  Route$5 as Route,
  Route$3 as Route$1,
  addExportLog,
  barangays,
  clearExportLog,
  cn,
  coverageLabel,
  dataLoadedAt,
  datasets,
  deleteExportLogEntry,
  detectedFiles,
  emitExportPassword,
  emitPrintPreview,
  exportCSV,
  exportDOCX,
  exportPDF,
  exportXLSX,
  generatePassword,
  getActiveBarangay,
  getActiveYear,
  getAvailableBarangays,
  getAvailableYears,
  getDataVersion,
  getExportLog,
  getHouseholdIncome,
  getImportReport,
  getPersonFullName,
  getSourceWatermark,
  getYearDataHealth,
  getYearDatasets,
  getYearIncomeSummary,
  householdKey,
  invalidFiles,
  logo,
  makeExportId,
  personsByHousehold,
  printPayload,
  router,
  saveBlobWithPrompt,
  subscribeData,
  subscribeExportLog
};
