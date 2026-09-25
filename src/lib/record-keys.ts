/** Canonical identity helpers shared by import-time normalization and reporting.
 *
 * The goal is to prevent duplicate imports from inflating totals while avoiding
 * accidental collapse of legitimate people who do not carry a UUID/line number.
 */

const clean = (value: unknown) => String(value ?? "").trim();

export function canonicalHouseholdKey(row: any): string {
  const direct = clean(row?.uuid);
  const area = clean(row?.area_code);
  const husn = clean(row?.husn ?? row?.HUSN);
  const hsn = clean(row?.hsn ?? row?.HSN);
  if (area || husn || hsn) return `${area}|${husn}|${hsn}`;
  return direct;
}

export function canonicalPersonKey(row: any): string {
  const uuid = clean(row?.uuid);
  if (uuid) return `uuid:${uuid}`;

  const area = clean(row?.area_code);
  const husn = clean(row?.husn ?? row?.HUSN);
  const hsn = clean(row?.hsn ?? row?.HSN);
  const line = clean(row?.line_number ?? row?.LINE_NUMBER);
  if (area || husn || hsn || line) {
    if (line) return `hh:${area}|${husn}|${hsn}|line:${line}`;
  }

  // Last-resort deterministic identity for records lacking UUID and line number.
  // Include birth/sex/relation fields so two same-named people in one household
  // are much less likely to be collapsed accidentally.
  const name = [
    row?.a01_last_name,
    row?.a01_first_name,
    row?.a01_middle_name,
    row?.a01_suffix,
  ].map(clean).join("|").toLowerCase();
  const birth = [row?.a04_birthday_year, row?.a04_birthday_month, row?.a04_birthday_day]
    .map(clean).join("|");
  const age = clean(row?.a05_age);
  const sex = clean(row?.a03_sex).toLowerCase();
  const relation = clean(row?.a02_relation_to_hh_head).toLowerCase();
  const fallback = [area, husn, hsn, name, birth, age, sex, relation].join("|");
  return `fallback:${fallback}`;
}
