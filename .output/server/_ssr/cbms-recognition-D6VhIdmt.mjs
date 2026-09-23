import { datasets, subscribeData } from "./router-n4bYjCIt.mjs";
import { f as fullName } from "./cbms-labels-DwSwLAQ_.mjs";
const yes = (v) => v === "Yes" || v === 1 || v === "1" || v === true;
const RULES = [
  {
    id: "pwd",
    title: "Person with Disability (PWD)",
    level: "person",
    fields: ["b10_pwd", "b11_with_pwd_id", "b13_seeing", "b14_hearing", "b15_walking", "b16_remembering", "b17_self_caring", "b18_communicating", "b19_ssdi"],
    defaultOption: "with_disability",
    options: [
      {
        id: "with_disability",
        label: "Actually with disability (excludes “Without disability”)",
        description: "Person is PWD if self-declared (b10=Yes), holds a PWD ID, reports any Washington-Group functional difficulty, OR b19 SSDI is not “Without disability”. Rows explicitly coded “Without disability” are excluded even if b10=Yes.",
        test: (p) => {
          if (p.b19_ssdi && String(p.b19_ssdi).toLowerCase() === "without disability") return false;
          const hasDifficulty = ["b13_seeing", "b14_hearing", "b15_walking", "b16_remembering", "b17_self_caring", "b18_communicating"].some((k) => p[k] && p[k] !== "No difficulty");
          const hasSSDI = p.b19_ssdi && String(p.b19_ssdi).toLowerCase() !== "without disability" && p.b19_ssdi !== "";
          return yes(p.b10_pwd) || yes(p.b11_with_pwd_id) || hasDifficulty || !!hasSSDI;
        }
      },
      { id: "b10_yes", label: "Self-declared PWD (b10_pwd = Yes)", description: "Use only the b10_pwd field.", test: (p) => yes(p.b10_pwd) },
      { id: "with_id", label: "Has PWD ID (b11_with_pwd_id = Yes)", description: "Strict — only registered PWDs.", test: (p) => yes(p.b11_with_pwd_id) },
      {
        id: "any_difficulty",
        label: "Any reported functional difficulty (Washington Group)",
        description: "Counts anyone whose b13–b18 answer is not “No difficulty”.",
        test: (p) => ["b13_seeing", "b14_hearing", "b15_walking", "b16_remembering", "b17_self_caring", "b18_communicating"].some(
          (k) => p[k] && p[k] !== "No difficulty"
        )
      },
      {
        id: "broad",
        label: "Any of: b10 = Yes OR PWD ID OR functional difficulty",
        description: "Most inclusive definition.",
        test: (p) => yes(p.b10_pwd) || yes(p.b11_with_pwd_id) || ["b13_seeing", "b14_hearing", "b15_walking", "b16_remembering", "b17_self_caring", "b18_communicating"].some(
          (k) => p[k] && p[k] !== "No difficulty"
        ) || p.b19_ssdi && p.b19_ssdi !== "Without disability"
      }
    ]
  },
  {
    id: "fourps",
    title: "4Ps / Pantawid Pamilya member",
    level: "household-derived",
    fields: ["m05_a_4ps", "m06_a_benefit_4ps"],
    defaultOption: "hh_4ps",
    options: [
      { id: "hh_4ps", label: "Household reported 4Ps (m05_a_4ps = Yes)", description: "Anyone living in a 4Ps household.", test: (p) => yes(p._hh?.m05_a_4ps) },
      { id: "hh_benefit", label: "Household received 4Ps benefit (m06_a_benefit_4ps = Yes)", description: "Stricter — actual benefit received.", test: (p) => yes(p._hh?.m06_a_benefit_4ps) },
      { id: "either", label: "Either reported OR received benefit", description: "Most inclusive.", test: (p) => yes(p._hh?.m05_a_4ps) || yes(p._hh?.m06_a_benefit_4ps) }
    ]
  },
  {
    id: "food_stamp",
    title: "Food Stamp Program member",
    level: "household-derived",
    fields: ["m05_d_food_stamp", "m06_d_benefit_food_stamp"],
    defaultOption: "hh_fs",
    options: [
      { id: "hh_fs", label: "Household enrolled (m05_d_food_stamp = Yes)", description: "All members of an enrolled household.", test: (p) => yes(p._hh?.m05_d_food_stamp) },
      { id: "hh_fs_benefit", label: "Household received the benefit (m06_d_benefit_food_stamp = Yes)", description: "Strictly verified beneficiaries.", test: (p) => yes(p._hh?.m06_d_benefit_food_stamp) },
      { id: "either", label: "Enrolled OR received benefit", description: "Most inclusive.", test: (p) => yes(p._hh?.m05_d_food_stamp) || yes(p._hh?.m06_d_benefit_food_stamp) }
    ]
  },
  {
    id: "senior",
    title: "Senior Citizen",
    level: "person",
    fields: ["a05_age", "b07_senior_citizen_id"],
    defaultOption: "age60",
    options: [
      { id: "age60", label: "Age ≥ 60", description: "Standard RA 9994 definition.", test: (p) => typeof p.a05_age === "number" && p.a05_age >= 60 },
      { id: "with_id", label: "Has Senior Citizen ID", description: "Only registered seniors.", test: (p) => yes(p.b07_senior_citizen_id) },
      { id: "either", label: "Age ≥ 60 OR Senior ID", description: "Most inclusive.", test: (p) => typeof p.a05_age === "number" && p.a05_age >= 60 || yes(p.b07_senior_citizen_id) }
    ]
  },
  {
    id: "solo_parent",
    title: "Solo Parent",
    level: "person",
    fields: ["b05_solo_parent", "b06_solo_parent_id"],
    defaultOption: "self",
    options: [
      { id: "self", label: "Self-declared (b05_solo_parent = Yes)", description: "", test: (p) => yes(p.b05_solo_parent) },
      { id: "with_id", label: "Has Solo Parent ID (b06)", description: "", test: (p) => yes(p.b06_solo_parent_id) }
    ]
  },
  {
    id: "socpen",
    title: "Social Pensioner",
    level: "household-derived",
    fields: ["m05_b_socpen", "m06_b_benefit_socpen"],
    defaultOption: "hh",
    options: [
      { id: "hh", label: "Household has SocPen (m05_b_socpen = Yes)", description: "", test: (p) => yes(p._hh?.m05_b_socpen) },
      { id: "hh_benefit", label: "Household received SocPen", description: "", test: (p) => yes(p._hh?.m06_b_benefit_socpen) }
    ]
  }
];
const LS_KEY = "lmdas.recognition.v1";
function loadOverrides() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(LS_KEY) || "{}");
  } catch {
    return {};
  }
}
let overrides = loadOverrides();
const listeners = /* @__PURE__ */ new Set();
function getRuleChoice(id) {
  return overrides[id] || RULES.find((r) => r.id === id).defaultOption;
}
function setRuleChoice(id, optionId) {
  overrides = { ...overrides, [id]: optionId };
  if (typeof window !== "undefined") window.localStorage.setItem(LS_KEY, JSON.stringify(overrides));
  listeners.forEach((l) => l());
}
function resetRuleChoices() {
  overrides = {};
  if (typeof window !== "undefined") window.localStorage.removeItem(LS_KEY);
  listeners.forEach((l) => l());
}
function subscribeRuleChanges(fn) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
let hhByKey = null;
let _enriched = null;
subscribeData(() => {
  hhByKey = null;
  _enriched = null;
});
function getHhByKey() {
  if (hhByKey) return hhByKey;
  const m = /* @__PURE__ */ new Map();
  for (const h of datasets.households) m.set(`${h.area_code}-${h.husn}-${h.hsn}`, h);
  hhByKey = m;
  return m;
}
function householdOf(p) {
  return getHhByKey().get(`${p.area_code}-${p.husn}-${p.hsn}`);
}
function addressOf(hh) {
  if (!hh) return "—";
  const parts = [
    hh.address_house_number,
    hh.address_block_or_lot_number,
    hh.address_floor_number && `Flr ${hh.address_floor_number}`,
    hh.address_street_name,
    hh.address_subdivision_or_village,
    hh.address_sitio_purok
  ].filter((s) => s !== void 0 && s !== null && String(s).trim() !== "");
  return parts.length ? parts.join(", ") : "—";
}
function getEnrichedPersons() {
  if (_enriched) return _enriched;
  const heads = /* @__PURE__ */ new Map();
  for (const p of datasets.persons) {
    if (p.a02_relation_to_hh_head === "Head" || p.line_number === 1) {
      heads.set(`${p.area_code}-${p.husn}-${p.hsn}`, fullName(p));
    }
  }
  _enriched = datasets.persons.map((p) => {
    const hh = householdOf(p);
    return {
      ...p,
      _full_name: fullName(p),
      _hh: hh,
      _address: addressOf(hh),
      _purok: hh?.address_sitio_purok || "—",
      _hh_head: heads.get(`${p.area_code}-${p.husn}-${p.hsn}`) || "—"
    };
  });
  return _enriched;
}
function isMember(ruleId, person) {
  const def = RULES.find((r) => r.id === ruleId);
  const choice = getRuleChoice(ruleId);
  const opt = def.options.find((o) => o.id === choice) || def.options[0];
  return opt.test(person);
}
function personIdentity(p) {
  const direct = String(p?.uuid || p?.id || "");
  if (direct) return direct;
  const area = String(p?.area_code ?? "");
  const husn = String(p?.husn ?? "");
  const hsn = String(p?.hsn ?? "");
  const line = String(p?.line_number ?? "");
  if (line) return `${area}-${husn}-${hsn}-${line}`;
  return `${area}-${husn}-${hsn}|${p?._full_name ?? ""}|${p?.a05_age ?? ""}|${p?.a03_sex ?? ""}`;
}
function listSector(ruleId) {
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const p of getEnrichedPersons()) {
    if (!isMember(ruleId, p)) continue;
    const key = personIdentity(p);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(p);
  }
  return out;
}
function assessLowIncome(p) {
  const hh = p._hh || {};
  const reasons = [];
  if (yes(hh.m05_a_4ps) || yes(hh.m06_a_benefit_4ps)) reasons.push("4Ps household");
  if (yes(hh.m05_d_food_stamp) || yes(hh.m06_d_benefit_food_stamp)) reasons.push("Food Stamp household");
  if (yes(hh.m05_b_socpen) || yes(hh.m06_b_benefit_socpen)) reasons.push("SocPen household");
  const age = typeof p.a05_age === "number" ? p.a05_age : null;
  const workingAge = age !== null && age >= 15 && age <= 59;
  if (workingAge && p.e01_employment_status === "Unemployed") reasons.push("Unemployed working-age");
  if (workingAge && p.e01_underemployment_status === "Underemployed") reasons.push("Underemployed");
  const cow = String(p.e08_class_of_worker || "").toLowerCase();
  if (workingAge && (cow.includes("unpaid family") || cow.includes("own-account") || cow.includes("without pay"))) {
    reasons.push(`Class of worker: ${p.e08_class_of_worker}`);
  }
  if (workingAge && (yes(p.e17_farmer) || yes(p.e18_fisherfolk)) && (p.e01_employment_status !== "Employed" || cow.includes("unpaid") || cow.includes("own-account"))) {
    reasons.push("Subsistence farmer/fisherfolk");
  }
  if (hh.o11_electricity === "No") reasons.push("No electricity");
  const fuel = String(hh.o13_fuel_for_cooking || "").toLowerCase();
  if (fuel.includes("wood") || fuel.includes("charcoal") || fuel.includes("kerosene") || fuel.includes("none")) {
    reasons.push("Wood/charcoal/no cooking fuel");
  }
  if (hh.overcrowding_status === "Overcrowded") reasons.push("Overcrowded household");
  const tenure = String(hh.o09_tenure || "").toLowerCase();
  if (tenure.includes("rent-free") || tenure.includes("informal") || tenure.includes("without consent")) {
    reasons.push(`Tenure: ${hh.o09_tenure}`);
  }
  if (yes(p.b05_solo_parent) && p.e01_employment_status !== "Employed") {
    reasons.push("Solo parent, not employed");
  }
  const uniq = Array.from(new Set(reasons));
  return { isLow: uniq.length >= 2, score: uniq.length, reasons: uniq };
}
export {
  RULES as R,
  getRuleChoice as a,
  assessLowIncome as b,
  setRuleChoice as c,
  getEnrichedPersons as g,
  isMember as i,
  listSector as l,
  resetRuleChoices as r,
  subscribeRuleChanges as s
};
