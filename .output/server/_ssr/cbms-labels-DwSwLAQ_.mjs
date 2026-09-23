function fullName(p) {
  const parts = [p.a01_first_name, p.a01_middle_name, p.a01_last_name, p.a01_suffix].filter(Boolean);
  return parts.join(" ").trim() || "—";
}
function formatVal(v) {
  if (v === null || v === void 0 || v === "") return "—";
  if (typeof v === "number") return String(v);
  return String(v);
}
const SOURCE_NOTE = "Source: 2024 Community-Based Monitoring System, Philippine Statistics Authority";
export {
  SOURCE_NOTE as S,
  formatVal as a,
  fullName as f
};
