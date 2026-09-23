import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { D as Dialog$1, a as DialogPortal$1, b as DialogContent$1, c as DialogClose, d as DialogTitle$1, e as DialogOverlay$1, f as DialogDescription$1 } from "../_libs/radix-ui__react-dialog.mjs";
import { personsByHousehold, householdKey, getPersonFullName, cn, getActiveYear } from "./router-n4bYjCIt.mjs";
import { f as fullName, a as formatVal } from "./cbms-labels-DwSwLAQ_.mjs";
import { X } from "../_libs/lucide-react.mjs";
const Dialog = Dialog$1;
const DialogPortal = DialogPortal$1;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogOverlay$1,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogOverlay$1.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent$1,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogClose, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogContent$1.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogTitle$1,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogTitle$1.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogDescription$1,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogDescription$1.displayName;
function Field({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-wide text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-foreground", children: formatVal(value) })
  ] });
}
function Section({ title, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 border-b border-border pb-2 font-display text-sm font-semibold uppercase tracking-wider text-primary", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3", children })
  ] });
}
function sourceLabel(key) {
  return key.replace(/^legacy_/i, "").replace(/_/g, " ").replace(/\\b\\w/g, (c) => c.toUpperCase());
}
function SourceValue({ value }) {
  if (value === null || value === void 0 || value === "") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" });
  }
  if (typeof value !== "object") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "break-words", children: formatVal(value) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs break-all", children: JSON.stringify(value) });
}
function SourceObject({ value, depth = 0 }) {
  if (value === null || value === void 0 || typeof value !== "object") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SourceValue, { value });
  }
  if (Array.isArray(value)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: value.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Empty" }) : value.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { open: depth < 1, className: "rounded-md border border-border/60 bg-muted/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { className: "cursor-pointer px-3 py-2 text-xs font-semibold", children: [
        "Record ",
        index + 1
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 border-t border-border/60 p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SourceObject, { value: item, depth: depth + 1 }) })
    ] }, index)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 sm:grid-cols-2", children: Object.entries(value).map(([key, item]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border/50 bg-background p-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground", children: sourceLabel(key) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SourceObject, { value: item, depth: depth + 1 })
  ] }, key)) });
}
function LegacySourceData({ data, year }) {
  if (!data || typeof data !== "object") return null;
  const entries = Object.entries(data);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border/70 bg-muted/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { className: "cursor-pointer px-4 py-3 font-display text-sm font-semibold", children: [
      "Complete CBMS ",
      year,
      " source data",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-xs font-normal text-muted-foreground", children: [
        "(",
        entries.length,
        " top-level sections/fields)"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 border-t border-border/70 p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-xs text-muted-foreground", children: "This view preserves the original export fields, including fields that do not have a direct 2024 normalized equivalent." }),
      entries.map(([key, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "rounded-md border border-border/60 bg-background", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("summary", { className: "cursor-pointer px-3 py-2 text-xs font-semibold", children: sourceLabel(key) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border/60 p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SourceObject, { value }) })
      ] }, key))
    ] })
  ] }) });
}
function PersonModal({ person, onClose }) {
  if (!person) return null;
  const year = getActiveYear();
  const isHead = person.a02_relation_to_hh_head === "Head" || person.line_number === 1;
  const householdMembers = isHead ? (personsByHousehold(year).get(householdKey(person)) || []).slice().sort((a, b) => {
    const ah = a.a02_relation_to_hh_head === "Head" || a.line_number === 1 ? 0 : 1;
    const bh = b.a02_relation_to_hh_head === "Head" || b.line_number === 1 ? 0 : 1;
    if (ah !== bh) return ah - bh;
    const lineA = Number.isFinite(Number(a.line_number)) ? Number(a.line_number) : Number.MAX_SAFE_INTEGER;
    const lineB = Number.isFinite(Number(b.line_number)) ? Number(b.line_number) : Number.MAX_SAFE_INTEGER;
    if (lineA !== lineB) return lineA - lineB;
    return getPersonFullName(a).localeCompare(getPersonFullName(b), void 0, { sensitivity: "base" });
  }) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[92vh] max-w-4xl overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-xl sm:text-2xl", children: fullName(person) }),
        isHead && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary", children: "Household Head" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
        "CBMS ",
        year,
        " · ",
        person.area_name || "—",
        " · Household ",
        person.husn ?? "—",
        "/",
        person.hsn ?? "—",
        " · Line ",
        person.line_number ?? "—"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 py-2", children: [
      isHead && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-primary/20 bg-primary/[0.04] p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-bold text-foreground", children: "Household Members" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-xs text-muted-foreground", children: [
              "Members recorded under this household head in CBMS ",
              year,
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-background px-3 py-1.5 text-xs font-semibold shadow-sm ring-1 ring-border/60", children: [
            householdMembers.length,
            " ",
            householdMembers.length === 1 ? "member" : "members"
          ] })
        ] }),
        householdMembers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 rounded-lg border border-dashed border-border/70 bg-background/60 p-4 text-sm text-muted-foreground", children: "No matching household member records are currently loaded." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 overflow-hidden rounded-xl border border-border/70 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/60", children: householdMembers.map((member, index) => {
          const memberIsHead = member.a02_relation_to_hh_head === "Head" || member.line_number === 1;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `grid gap-3 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_140px_80px] sm:items-center ${memberIsHead ? "bg-primary/[0.05]" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `truncate text-sm font-semibold ${memberIsHead ? "text-primary" : "text-foreground"}`, children: getPersonFullName(member) || "(No name)" }),
                memberIsHead && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-primary", children: "Head" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs text-muted-foreground", children: [
                member.a03_sex || "—",
                " · Age ",
                member.a05_age ?? "—",
                " · ",
                member.a07_marital_status || "—"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-semibold uppercase tracking-wide text-muted-foreground", children: "Relationship" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-sm font-medium text-foreground", children: memberIsHead ? "Head" : member.a02_relation_to_hh_head || "—" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-semibold uppercase tracking-wide text-muted-foreground", children: "Line" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-sm font-medium text-foreground", children: member.line_number ?? "—" })
            ] })
          ] }, `${member.area_code}-${member.husn}-${member.hsn}-${member.line_number}-${index}`);
        }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Personal", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Age", value: person.a05_age }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Sex", value: person.a03_sex }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Birthday", value: person.a04_birthday_year ? `${person.a04_birthday_month}/${person.a04_birthday_day}/${person.a04_birthday_year}` : null }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Civil Status", value: person.a07_marital_status }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Religion", value: person.a08_religion }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Ethnicity", value: person.a09_ethnicity }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Citizenship", value: person.c01_citizenship }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Relationship to Head", value: person.a02_relation_to_hh_head }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Literate", value: person.a10_simple_literacy })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Education", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Educational Level", value: person.a11_hgc_level }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Highest Grade", value: person.a11_hgc }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Currently in School", value: person.d01_currently_attending_school }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "TVET Graduate", value: person.d07_tvet_graduate }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Attending TVET", value: person.d08_tvet_currently_attending })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Employment", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Labor Force", value: person.e01_labor_force_participation }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Employment Status", value: person.e01_employment_status }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Underemployment", value: person.e01_underemployment_status }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Occupation", value: person.e05_psoc }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Occupation Group", value: person.e05_occupation_group }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Industry", value: person.e06_industry_group }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nature of Employment", value: person.e07_nature_of_employment }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Class of Worker", value: person.e08_class_of_worker }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Basis of Payment", value: person.e09_basis_of_payment }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Basic Pay / Day (CBMS 2022 E20)", value: person.e20_basic_pay_per_day != null ? `₱${Number(person.e20_basic_pay_per_day).toLocaleString()}` : null }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Hours Worked", value: person.e11_number_of_hours_worked_in_all_jobs }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Farmer", value: person.e17_farmer }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Fisherfolk", value: person.e18_fisherfolk })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Sectoral & Disability", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "PhilSys ID", value: person.b03_phil_id }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Solo Parent", value: person.b05_solo_parent }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Senior Citizen ID", value: person.b07_senior_citizen_id }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "PWD", value: person.b10_pwd }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "With PWD ID", value: person.b11_with_pwd_id }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Pregnant", value: person.b08_currently_pregnant }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Lactating", value: person.b09_lactating_mother }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Seeing", value: person.b13_seeing }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Hearing", value: person.b14_hearing }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Walking", value: person.b15_walking })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Social Protection", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "SSS", value: person.m01_a_sss }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "GSIS", value: person.m01_b_gsis }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "PhilHealth", value: person.m01_c_philhealth }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "4Ps", value: person.m05_a_4ps }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Social Pension", value: person.m05_b_socpen })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LegacySourceData, { data: person.legacy_raw, year })
    ] })
  ] }) });
}
function HouseholdModal({ household, onClose }) {
  if (!household) return null;
  const key = `${household.area_code}-${household.husn}-${household.hsn}`;
  const members = personsByHousehold().get(key) || [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] max-w-4xl overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-xl", children: [
        "Household ",
        household.husn,
        "/",
        household.hsn,
        " · ",
        household.area_name
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        household.hh_size,
        " members · ",
        household.overcrowding_status
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Composition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Household Size", value: household.hh_size }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Males", value: household.number_of_males }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Females", value: household.number_of_females }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nuclear Families", value: household.number_of_nuclear_families }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Overcrowding", value: household.overcrowding_status }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Sitio/Purok", value: household.address_sitio_purok })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Water & Sanitation", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Main Water", value: household.n01_main_water }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Drinking Water", value: household.n02_drinking_water }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Drinking Water Service", value: household.n03_service_level_drinking_water }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Toilet Facility", value: household.n08_toilet_facility }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Toilet Service Level", value: household.n08_service_level_toilet_facility }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Handwashing Facility", value: household.n13_service_level_handwashing_facility })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Housing", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Building Type", value: household.o01_building_type }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Floors", value: household.o02_number_of_floors }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Roof", value: household.o03_roof }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Outer Walls", value: household.o04_outer_walls }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Floor", value: household.o06_floor }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Floor Area", value: household.o07_floor_area_range }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Bedrooms", value: household.o08_number_of_bedrooms }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tenure", value: household.o09_tenure }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Year Built", value: household.o10_year_constructed })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Utilities & Connectivity", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Electricity", value: household.o11_electricity }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Lighting Fuel", value: household.o12_fuel_for_lighting }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Cooking Fuel", value: household.o13_fuel_for_cooking }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Internet Access", value: household.k01_internet_access }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Internet at Home", value: household.k02_internet_at_home }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Safe Walking at Night", value: household.l01_safe_walking_alone })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LegacySourceData, { data: household.legacy_raw, year: 2022 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mb-3 border-b border-border pb-2 font-display text-sm font-semibold uppercase tracking-wider text-primary", children: [
          "Household Members (",
          members.length,
          ")"
        ] }),
        members.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No matching person records loaded." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-md border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1.5 text-left font-medium", children: "Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1.5 text-left font-medium", children: "Age" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1.5 text-left font-medium", children: "Sex" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1.5 text-left font-medium", children: "Civil Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1.5 text-left font-medium", children: "Education" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-1.5 text-left font-medium", children: "Employment" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: members.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5 font-medium", children: fullName(m) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5", children: m.a05_age ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5", children: m.a03_sex ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5", children: m.a07_marital_status ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5", children: m.a11_hgc_level ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5", children: m.e01_employment_status ?? "—" })
          ] }, i)) })
        ] }) })
      ] })
    ] })
  ] }) });
}
export {
  HouseholdModal as H,
  PersonModal as P
};
