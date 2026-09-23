import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { D as DataTable } from "./DataTable-3ydYjkG5.mjs";
import { P as PersonModal } from "./CBMSModals-l01ACcnl.mjs";
import { Button, exportCSV, exportXLSX, exportPDF, exportDOCX, printPayload } from "./router-n4bYjCIt.mjs";
import { S as SOURCE_NOTE } from "./cbms-labels-DwSwLAQ_.mjs";
import { g as getEnrichedPersons, l as listSector, R as RULES } from "./cbms-recognition-D6VhIdmt.mjs";
import "../_libs/xlsx-js-style.mjs";
import "../_libs/jspdf.mjs";
import "../_libs/jspdf-autotable.mjs";
import "../_libs/zip.js__zip.js.mjs";
import { N as Download, I as FileSpreadsheet, z as FileText, P as Printer } from "../_libs/lucide-react.mjs";
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
import "./input-DRTFHFri.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-effect-event+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
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
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-progress.mjs";
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
const DIMS = [{
  id: "barangay",
  label: "Barangay",
  bucket: (p) => p.area_name || "—"
}, {
  id: "sex",
  label: "Sex",
  bucket: (p) => p.a03_sex || "—"
}, {
  id: "age_group",
  label: "Age group",
  bucket: (p) => {
    const a = p.a05_age;
    if (typeof a !== "number") return "—";
    if (a <= 5) return "0–5";
    if (a <= 14) return "6–14";
    if (a <= 17) return "15–17";
    if (a <= 30) return "18–30";
    if (a <= 59) return "31–59";
    return "60+";
  }
}, {
  id: "civil",
  label: "Civil status",
  bucket: (p) => p.a07_marital_status || "—"
}, {
  id: "education",
  label: "Educational level",
  bucket: (p) => p.a11_hgc_level || "—"
}, {
  id: "employment",
  label: "Employment status",
  bucket: (p) => p.e01_employment_status || "—"
}, {
  id: "water",
  label: "HH drinking water source",
  bucket: (p) => p._hh?.n02_drinking_water || "—"
}, {
  id: "toilet",
  label: "HH toilet facility",
  bucket: (p) => p._hh?.n08_toilet_facility || "—"
}, {
  id: "electricity",
  label: "HH electricity",
  bucket: (p) => p._hh?.o11_electricity || "—"
}, {
  id: "roof",
  label: "HH roof material",
  bucket: (p) => p._hh?.o03_roof || "—"
}, {
  id: "walls",
  label: "HH wall material",
  bucket: (p) => p._hh?.o04_outer_walls || "—"
}, {
  id: "tenure",
  label: "HH tenure",
  bucket: (p) => p._hh?.o09_tenure || "—"
}, {
  id: "internet",
  label: "HH internet",
  bucket: (p) => p._hh?.k01_internet_access || "—"
}];
const FILTERS = [{
  id: "all",
  label: "All persons"
}, ...RULES.map((r) => ({
  id: r.id,
  label: r.title
}))];
function CrosstabPage() {
  const [filter, setFilter] = reactExports.useState("pwd");
  const [rowDim, setRowDim] = reactExports.useState("barangay");
  const [colDim, setColDim] = reactExports.useState("age_group");
  const [drill, setDrill] = reactExports.useState(null);
  const [selected, setSelected] = reactExports.useState(null);
  const universe = reactExports.useMemo(() => filter === "all" ? getEnrichedPersons() : listSector(filter), [filter]);
  const rd = DIMS.find((d) => d.id === rowDim);
  const cd = DIMS.find((d) => d.id === colDim);
  const {
    matrix,
    rowKeys,
    colKeys,
    rowTotals,
    colTotals,
    grand
  } = reactExports.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    const cset = /* @__PURE__ */ new Set();
    for (const p of universe) {
      const r = rd.bucket(p);
      const c = cd.bucket(p);
      cset.add(c);
      const inner = m.get(r) || /* @__PURE__ */ new Map();
      inner.set(c, (inner.get(c) || 0) + 1);
      m.set(r, inner);
    }
    const rowKeys2 = Array.from(m.keys()).sort();
    const colKeys2 = Array.from(cset).sort();
    const rowTotals2 = /* @__PURE__ */ new Map();
    const colTotals2 = /* @__PURE__ */ new Map();
    let grand2 = 0;
    for (const r of rowKeys2) {
      let rt = 0;
      for (const c of colKeys2) {
        const v = m.get(r)?.get(c) || 0;
        rt += v;
        colTotals2.set(c, (colTotals2.get(c) || 0) + v);
      }
      rowTotals2.set(r, rt);
      grand2 += rt;
    }
    return {
      matrix: m,
      rowKeys: rowKeys2,
      colKeys: colKeys2,
      rowTotals: rowTotals2,
      colTotals: colTotals2,
      grand: grand2
    };
  }, [universe, rd, cd]);
  const drillRows = reactExports.useMemo(() => {
    if (!drill) return [];
    return universe.filter((p) => rd.bucket(p) === drill.row && cd.bucket(p) === drill.col);
  }, [drill, universe, rd, cd]);
  const filterLabel = FILTERS.find((f) => f.id === filter).label;
  const title = `Cross-tabulation: ${filterLabel} by ${rd.label} × ${cd.label}`;
  const exportColumns = [{
    key: "row",
    label: rd.label
  }, ...colKeys.map((c) => ({
    key: c,
    label: c
  })), {
    key: "_total",
    label: "Total"
  }];
  const exportRows = rowKeys.map((r) => {
    const row = {
      row: r
    };
    for (const c of colKeys) row[c] = matrix.get(r)?.get(c) || 0;
    row._total = rowTotals.get(r) || 0;
    return row;
  });
  const totalRow = {
    row: "TOTAL"
  };
  for (const c of colKeys) totalRow[c] = colTotals.get(c) || 0;
  totalRow._total = grand;
  exportRows.push(totalRow);
  const payload = {
    title,
    subtitle: `Total: ${grand.toLocaleString()} persons`,
    columns: exportColumns,
    rows: exportRows,
    note: SOURCE_NOTE
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: "Cross-tabulation Reports" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Build any 2-dimensional matrix and click a cell to drill into the underlying names. Export the matrix or the drill-down list with the PSA source note." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Population filter", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "h-9 w-full rounded-md border border-input bg-background px-2 text-sm", value: filter, onChange: (e) => setFilter(e.target.value), children: FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: f.id, children: f.label }, f.id)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Rows", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "h-9 w-full rounded-md border border-input bg-background px-2 text-sm", value: rowDim, onChange: (e) => setRowDim(e.target.value), children: DIMS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: d.id, children: d.label }, d.id)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Columns", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "h-9 w-full rounded-md border border-input bg-background px-2 text-sm", value: colDim, onChange: (e) => setColDim(e.target.value), children: DIMS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: d.id, children: d.label }, d.id)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-border bg-card shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col gap-2 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Total: ",
            grand.toLocaleString(),
            " persons. Click any cell to drill down."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => exportCSV(payload), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
            " CSV"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => exportXLSX(payload), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileSpreadsheet, { className: "h-4 w-4" }),
            " Excel"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => exportPDF(payload), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
            " PDF"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => exportDOCX(payload), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
            " Word"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => printPayload(payload), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-4 w-4" }),
            " Print"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[60vh] overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full border-collapse text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "sticky top-0 z-10 bg-secondary/80 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-border px-3 py-2 text-left font-semibold", children: rd.label }),
          colKeys.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-border px-3 py-2 text-right font-semibold", children: c }, c)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border-b border-border px-3 py-2 text-right font-semibold", children: "Total" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          rowKeys.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-medium", children: r }),
            colKeys.map((c) => {
              const v = matrix.get(r)?.get(c) || 0;
              return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right", children: v > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setDrill({
                row: r,
                col: c
              }), className: "rounded px-1.5 py-0.5 text-primary hover:bg-primary/10 hover:underline", children: v }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) }, c);
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right font-semibold", children: rowTotals.get(r)?.toLocaleString() })
          ] }, r)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: "Total" }),
            colKeys.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right", children: (colTotals.get(c) || 0).toLocaleString() }, c)),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-right", children: grand.toLocaleString() })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border bg-muted/30 px-4 py-2 text-[11px] italic text-muted-foreground", children: SOURCE_NOTE })
    ] }),
    drill && /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { title: `Drill-down — ${filterLabel}: ${rd.label} = "${drill.row}" × ${cd.label} = "${drill.col}"`, subtitle: `Cell total: ${drillRows.length.toLocaleString()} person(s) · Row total (${drill.row}): ${(rowTotals.get(drill.row) || 0).toLocaleString()} · Column total (${drill.col}): ${(colTotals.get(drill.col) || 0).toLocaleString()} · Grand total: ${grand.toLocaleString()}`, rows: drillRows, columns: [{
      key: "_full_name",
      label: "Full Name"
    }, {
      key: "a03_sex",
      label: "Sex"
    }, {
      key: "a05_age",
      label: "Age"
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
      key: "husn",
      label: "HUSN"
    }, {
      key: "a07_marital_status",
      label: "Civil Status"
    }, {
      key: "e01_employment_status",
      label: "Employment"
    }, {
      key: "e08_class_of_worker",
      label: "Class of Worker"
    }, {
      key: "e05_occupation_group",
      label: "Occupation"
    }], onRowClick: (r) => setSelected(r) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PersonModal, { person: selected, onClose: () => setSelected(null) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
      "Tip: change recognition rules (e.g., who counts as PWD) in",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/validation", className: "text-primary underline", children: "Data Validation & Mapping" }),
      "."
    ] })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 block text-xs font-medium text-muted-foreground", children: label }),
    children
  ] });
}
export {
  CrosstabPage as component
};
