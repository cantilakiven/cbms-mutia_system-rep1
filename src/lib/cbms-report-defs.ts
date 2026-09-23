/**
 * Shared statistical-report definitions for the Statistical Reports page and
 * the Report Compendium. The definitions intentionally operate on the
 * normalized runtime records so CBMS 2022 and CBMS 2024 use the same report
 * contract while still allowing year-specific source fields to be discovered.
 */

export type ReportSource = "households" | "persons" | "barangays";
export type ReportKind = "frequency" | "summary" | "multi-account" | "barangay-status" | "employment-key";

export interface ReportDef {
  id: string;
  tableNumber: number;
  tabName: string;
  group: string;
  title: string;
  source: ReportSource;
  kind?: ReportKind;
  field?: string | ((r: any) => string | null);
  filter?: (r: any) => boolean;
  accounts?: { label: string; keys: string[] }[];
  note?: string;
}

export interface ReportRow extends Record<string, any> {
  category: string;
  count: number | string;
  percent: string;
}

export interface ReportResult {
  rows: ReportRow[];
  total: number;
  denominator?: number;
  note?: string;
}

export function householdSizeBucket(n: any): string {
  const value = Number(n);
  if (!Number.isFinite(value)) return "—";
  if (value === 1) return "1 member";
  if (value === 2) return "2 members";
  if (value <= 4) return "3–4 members";
  if (value <= 6) return "5–6 members";
  if (value <= 9) return "7–9 members";
  return "10+ members";
}

const yes = (v: any) => {
  if (v === true || v === 1 || v === "1") return true;
  return /^(yes|y|true|available|with|owned|safe|employed|in the labor force)$/i.test(String(v ?? "").trim());
};

const no = (v: any) => /^(no|n|false|not available|without|none|not employed|not in the labor force)$/i.test(String(v ?? "").trim());
const text = (v: any) => (v == null || String(v).trim() === "" ? null : String(v).trim());
const num = (v: any) => {
  const n = Number(v);
  return v !== null && v !== undefined && v !== "" && Number.isFinite(n) ? n : null;
};

const normalizedKey = (v: string) => v.toLowerCase().replace(/[^a-z0-9]/g, "");

function readDirect(row: any, candidates: string[]): any {
  if (!row || typeof row !== "object") return null;
  for (const key of candidates) {
    if (Object.prototype.hasOwnProperty.call(row, key)) {
      const value = row[key];
      if (value !== null && value !== undefined && value !== "") return value;
    }
  }

  const wanted = new Map(candidates.map((c) => [normalizedKey(c), c]));
  for (const [key, value] of Object.entries(row)) {
    const nk = normalizedKey(key);
    if (wanted.has(nk) && value !== null && value !== undefined && value !== "") return value;
  }
  return null;
}

function deepFind(row: any, predicate: (key: string) => boolean, depth = 0): any {
  if (!row || typeof row !== "object" || depth > 4) return null;
  for (const [key, value] of Object.entries(row)) {
    if (predicate(normalizedKey(key)) && value !== null && value !== undefined && value !== "") return value;
  }
  for (const value of Object.values(row)) {
    if (value && typeof value === "object") {
      const found = deepFind(value, predicate, depth + 1);
      if (found !== null && found !== undefined && found !== "") return found;
    }
  }
  return null;
}

function read(row: any, candidates: string[], tokenGroups: string[][] = []): any {
  const direct = readDirect(row, candidates);
  if (direct !== null && direct !== undefined && direct !== "") return direct;
  if (!tokenGroups.length) return null;
  return deepFind(row, (key) => tokenGroups.every((group) => group.some((token) => key.includes(normalizedKey(token)))));
}

const age = (r: any) => num(read(r, ["a05_age", "age", "AGE", "A07_AGE"]));
const sex = (r: any) => text(read(r, ["a03_sex", "sex", "SEX", "A05_SEX"]));
const attendance = (r: any) => text(read(r, ["d01_currently_attending_school", "currently_attending_school", "attending_school", "C03_CURRENTLY_ATTENDING_SCHOOL"]));
const employmentStatus = (r: any) => text(read(r, ["e01_employment_status", "employment_status", "EMPLOYMENT_STATUS"]));
const laborForceStatus = (r: any) => text(read(r, ["e01_labor_force_participation", "labor_force_participation", "labor_force_status"]));
const occupation = (r: any) => text(read(r, ["e05_occupation_group", "e05_psoc", "occupation_group", "occupation", "PSOC"]));
const industry = (r: any) => text(read(r, ["e06_industry_group", "e06_psic", "industry_group", "industry", "PSIC"]));
const workerClass = (r: any) => text(read(r, ["e08_class_of_worker", "class_of_worker", "CLASS_OF_WORKER"]));
const ethnicity = (r: any) => text(read(r, ["a09_ethnicity", "ethnicity", "A10_ETHNICITY"]));
const education = (r: any) => text(read(r, ["a11_hgc_level", "a11_hgc_group", "education_level", "highest_grade_completed", "education"]));
const householdSize = (r: any) => num(read(r, ["hh_size", "household_size", "HH_SIZE"]));
const safe = (r: any) => text(read(r, ["l01_safe_walking_alone", "safe_walking_alone", "safety_perception"]));
const electricity = (r: any) => text(read(r, ["o11_electricity", "electricity", "availability_of_electricity"]));
const cookingFuel = (r: any) => text(read(r, ["o13_fuel_for_cooking", "fuel_for_cooking", "cooking_fuel"]));
const tenure = (r: any) => text(read(r, ["o09_tenure", "tenure_status", "residence_tenure"]));
const internet = (r: any) => text(read(r, ["k01_internet_access", "internet_access", "access_to_internet"]));
const water = (r: any) => text(read(r, ["n01_main_water", "main_water_source", "main_source_of_water_supply"]));
const drinkingWater = (r: any) => text(read(r, ["n02_drinking_water", "drinking_water_source", "main_source_of_drinking_water"]));
const drinkingService = (r: any) => text(read(r, ["n03_service_level_drinking_water", "drinking_water_service_level", "service_level_drinking_water"]));
const toilet = (r: any) => text(read(r, ["n08_toilet_facility", "toilet_facility", "toilet_type"]));
const toiletService = (r: any) => text(read(r, ["n08_service_level_toilet_facility", "toilet_service_level", "service_level_toilet_facility"]));
const handwashingFacility = (r: any) => text(read(r, ["n13_handwashing_facility", "handwashing_facility"]));
const handwashingWater = (r: any) => text(read(r, ["n14_handwashing_with_water", "handwashing_with_water"]));
const handwashingSoap = (r: any) => text(read(r, ["n15_handwashing_with_soap", "handwashing_with_soap"]));
const building = (r: any) => text(read(r, ["o01_building_type", "building_type", "housing_unit_type"]));
const roof = (r: any) => text(read(r, ["o03_roof", "roof_material", "type_of_roof_material"]));
const roofStrength = (r: any) => text(read(r, ["o03_roof_strength", "o03_roof_frame", "roof_material_strength", "roof_strength"]));
const walls = (r: any) => text(read(r, ["o04_outer_walls", "outer_walls", "outer_wall_material"]));
const wallStrength = (r: any) => text(read(r, ["o04_outer_walls_strength", "outer_wall_strength", "wall_material_strength", "outer_wall_material_strength"]));
const floor = (r: any) => text(read(r, ["o06_floor", "floor_material", "type_of_floor_material"]));
const floorStrength = (r: any) => text(read(r, ["o06_floor_strength", "floor_material_strength", "floor_strength"]));

function normalizeStatus(v: any): string {
  const s = String(v ?? "").trim();
  if (!s) return "Not reported";
  if (yes(v)) return "Yes";
  if (no(v)) return "No";
  return s;
}

function isAttending(r: any) { return /^yes$/i.test(String(attendance(r) ?? "")) || yes(attendance(r)); }
function isNotAttending(r: any) { return /^no$/i.test(String(attendance(r) ?? "")) || no(attendance(r)); }
function isEmployed(r: any) { return /^employed$/i.test(String(employmentStatus(r) ?? "")); }
function isUnemployed(r: any) { return /^unemployed$/i.test(String(employmentStatus(r) ?? "")); }
function isLFP(r: any) {
  const value = String(laborForceStatus(r) ?? "").toLowerCase();
  if (value.includes("not in the labor force")) return false;
  if (value.includes("labor force")) return true;
  return isEmployed(r) || isUnemployed(r);
}
function isOFW(r: any) {
  const explicit = read(r, ["is_ofw", "ofw", "overseas_filipino_worker", "overseas_worker", "e15_overseas_filipino_worker"], [["ofw"], ["overseas", "worker"]]);
  return yes(explicit) || /overseas|ofw/i.test(`${occupation(r) ?? ""} ${industry(r) ?? ""}`) && /worker|employment/i.test(`${occupation(r) ?? ""} ${industry(r) ?? ""}`);
}
function hasFarmer(r: any) {
  if (yes(read(r, ["e17_farmer", "farmer", "is_farmer"]))) return true;
  return /farm|farmer|farming|agri/i.test(`${occupation(r) ?? ""} ${industry(r) ?? ""}`);
}
function hasFisherfolk(r: any) {
  if (yes(read(r, ["e18_fisherfolk", "fisherfolk", "is_fisherfolk"]))) return true;
  return /fisher|fishing|fish capture|aquaculture/i.test(`${occupation(r) ?? ""} ${industry(r) ?? ""}`);
}
function isManager(r: any) { return /manager|executive|chief|director|supervisor|head of/i.test(String(occupation(r) ?? "")); }
function isManufacturing(r: any) { return /manufactur/i.test(String(industry(r) ?? "")); }
function isInformalWorker(r: any) {
  const c = String(workerClass(r) ?? "").toLowerCase();
  return c.includes("self-employed") || c.includes("self employed") || c.includes("unpaid family");
}
function childLaborStatus(r: any): boolean | null {
  const explicit = read(r, ["child_labor", "child_labour", "is_child_labor", "engaged_to_child_labor"], [["child", "labor"], ["child", "labour"]]);
  if (explicit === null || explicit === undefined || explicit === "") return null;
  return yes(explicit);
}
function isCleanFuel(r: any) {
  const v = String(cookingFuel(r) ?? "").toLowerCase();
  if (!v) return null;
  return /electric|lpg|liquefied petroleum|natural gas|biogas|solar|ethanol|alcohol/.test(v) ? "Relies on clean fuel/technology" : "Does not rely on clean fuel/technology";
}
function secureTenure(r: any) {
  const explicit = read(r, ["o10_secure_tenure", "o12_secure_tenure", "access_to_secure_tenure", "secure_tenure", "o09_secure_tenure"]);
  return normalizeStatus(explicit);
}
function foodInsecurity(r: any) {
  const keys = ["g01_worried", "g02_not_eaten_healthy", "g03_ate_few_food", "g04_skipped_meal", "g05_ate_less", "g06_ran_out_of_food", "g07_hungry", "g08_not_eaten_whole_day"];
  const present = keys.filter((k) => read(r, [k]) !== null);
  if (!present.length) return "Not reported";
  return present.some((k) => yes(read(r, [k]))) ? "Experienced food insecurity" : "Did not report food insecurity";
}
function medicalTreatmentReason(r: any) {
  return text(read(r, [
    "medical_treatment_nonavail_reason", "reason_not_avail_medical_treatment", "reason_for_not_availing_medical_treatment",
    "main_reason_not_avail_medical_treatment", "f07_reason_not_avail_medical_treatment", "f09_reason_not_availing_medical_treatment",
  ], [["medical", "treatment", "reason"], ["treatment", "not", "avail"]])) ?? "Not reported";
}
function publicTransportation(r: any) {
  return normalizeStatus(read(r, ["access_to_public_transportation", "public_transportation", "public_transport_access", "p01_public_transportation"], [["public", "transport"]]));
}
function networkSignal(r: any) {
  return normalizeStatus(read(r, ["network_signal", "cellphone_network_signal", "cellphone_network", "k04_network_signal", "mobile_network_signal"], [["network", "signal"], ["cellphone", "network"]]));
}
function drrmStatus(r: any) {
  const explicit = read(r, ["drrm", "drrm_measures", "disaster_risk_reduction_and_management", "disaster_risk_reduction_measures", "risk_reduction_management"], [["disaster", "risk", "reduction"], ["drrm"]]);
  return normalizeStatus(explicit);
}
function garbageCollection(r: any) {
  const explicit = read(r, ["waste_collection", "garbage_collection", "garbage_collection_service", "n12_b_garbage_truck"], [["garbage", "collection"], ["garbage", "truck"]]);
  if (explicit !== null && explicit !== undefined && explicit !== "") return normalizeStatus(explicit);
  return "Not reported";
}
function childSchoolingReason(r: any) {
  return text(read(r, ["d06_reason_not_attending_school", "reason_not_attending_school", "not_schooling_reason"], [["reason", "not", "school"], ["reason", "attending", "school"]])) ?? "Not reported";
}
function schoolStatus(r: any) { return normalizeStatus(attendance(r)); }
function tvetGraduate(r: any) { return normalizeStatus(read(r, ["d07_tvet_graduate", "tvet_graduate", "TVET_GRADUATE"])); }
function tvetAttending(r: any) { return normalizeStatus(read(r, ["d08_tvet_currently_attending", "tvet_currently_attending"])); }
function seniorId(r: any) { return normalizeStatus(read(r, ["b07_senior_citizen_id", "senior_citizen_id"])); }
function lfpLabel(r: any) { return isLFP(r) ? "In the labor force" : "Not in the labor force"; }
function sexLabel(r: any) { return sex(r) ?? "Not reported"; }
function ageGroup(r: any) {
  const a = age(r);
  if (a == null) return "Not reported";
  if (a < 3) return "0–2";
  if (a <= 5) return "3–5";
  if (a <= 9) return "6–9";
  if (a <= 12) return "10–12";
  if (a <= 14) return "13–14";
  if (a <= 17) return "15–17";
  if (a <= 24) return "18–24";
  if (a <= 34) return "25–34";
  if (a <= 44) return "35–44";
  if (a <= 54) return "45–54";
  if (a <= 64) return "55–64";
  return "65+";
}
function serviceLevelHandwashing(r: any) {
  const explicit = read(r, ["n16_service_level_handwashing_facility", "handwashing_service_level", "service_level_handwashing_facility"]);
  if (explicit != null) return String(explicit);
  const facility = handwashingFacility(r);
  const waterPresent = yes(handwashingWater(r));
  const soapPresent = yes(handwashingSoap(r));
  if (!facility && !waterPresent && !soapPresent) return "Not reported";
  if (waterPresent && soapPresent) return "Basic service";
  if (facility || waterPresent || soapPresent) return "Limited service";
  return "No service / Not reported";
}

function materialStrength(value: string | null, kind: "roof" | "wall" | "floor"): string {
  if (!value) return "Not reported";
  const v = value.toLowerCase();
  if (/reinforced|concrete|steel|tile|ceramic|marble|cement|bricks?|hollow block|strong|durable/.test(v)) return "Strong / durable material";
  if (/wood|bamboo|anahaw|nipa|light|makeshift|salvaged|thatch|tarpaulin|soil|earth|dirt/.test(v)) return "Light / less durable material";
  return value;
}

const REPORTS: ReportDef[] = [
  { id: "summary_statistics", tableNumber: 1, tabName: "Summary statistics", group: "Households & services", title: "Responding Households, Covered Population and Average Household Size", source: "households", kind: "summary", note: "Responding households = number of household records. Covered population = number of person records. Average household size = arithmetic mean of valid household-size values; if household size is unavailable, the population-to-household ratio is used." },
  { id: "hh_size", tableNumber: 2, tabName: "Households by size", group: "Households & services", title: "Distribution of Households by Number of Household Members", source: "households", field: (h) => householdSizeBucket(householdSize(h)) },
  { id: "internet", tableNumber: 3, tabName: "Access to internet", group: "Households & services", title: "Distribution of Households by Access to Internet", source: "households", field: internet },
  { id: "safety", tableNumber: 4, tabName: "Perception on safety", group: "Households & services", title: "Distribution of Respondents by Perception on Safety while Walking Alone in their Neighborhood at Night", source: "households", field: safe },
  { id: "main_water", tableNumber: 5, tabName: "Main source of water supply", group: "Households & services", title: "Distribution of Households by Main Source of Water Supply", source: "households", field: water },
  { id: "drinking_water", tableNumber: 6, tabName: "Main source of drinking water", group: "Households & services", title: "Distribution of Households by Main Source of Drinking Water", source: "households", field: drinkingWater },
  { id: "drinking_service", tableNumber: 7, tabName: "Drinking water service level", group: "Households & services", title: "Distribution of Households by Service Level of Drinking Water", source: "households", field: drinkingService, note: "Uses the reported service-level field when supplied by the dataset. It is not reconstructed when the underlying variables are absent." },
  { id: "toilet", tableNumber: 8, tabName: "Toilet facility", group: "Households & services", title: "Distribution of Households by Type of Toilet Facility", source: "households", field: toilet },
  { id: "toilet_service", tableNumber: 9, tabName: "Toilet facility service level", group: "Households & services", title: "Distribution of Households by Service Level of Toilet Facility", source: "households", field: toiletService },
  { id: "handwashing", tableNumber: 10, tabName: "Handwashing facility", group: "Households & services", title: "Distribution of Households by Service Level of Handwashing Facility", source: "households", field: serviceLevelHandwashing, note: "Uses the explicit service-level field when present; otherwise a derived level is calculated from the recorded facility, water, and soap responses (basic when water and soap are both present; limited when one or more components are missing)." },
  { id: "building", tableNumber: 11, tabName: "Building type", group: "Households & services", title: "Distribution of Households by Type of Building/Housing Unit they Occupy", source: "households", field: building },
  { id: "roof", tableNumber: 12, tabName: "Roof material", group: "Households & services", title: "Distribution of Households by Type of Material Used in the Roof of the Building they Occupy", source: "households", field: roof },
  { id: "walls", tableNumber: 13, tabName: "Outer walls material", group: "Households & services", title: "Distribution of Households by Type of Material Used in the Outer Walls of the Building/Housing Unit they Occupy", source: "households", field: walls },
  { id: "floor", tableNumber: 14, tabName: "Floor material", group: "Households & services", title: "Distribution of Households by Type of Material Used in the Floor of the Housing Unit they Occupy", source: "households", field: floor },
  { id: "tenure", tableNumber: 15, tabName: "Residence tenure status", group: "Households & services", title: "Distribution of Households by Tenure Status of the Housing Unit and Lot they Occupy", source: "households", field: tenure },
  { id: "electricity", tableNumber: 16, tabName: "Access to electricity", group: "Households & services", title: "Distribution of Households by Availability of Electricity in the Building/Housing Unit they Occupy", source: "households", field: electricity },
  { id: "cooking", tableNumber: 17, tabName: "Fuel for cooking", group: "Households & services", title: "Distribution of Households by Fuel/Energy Source Used for Cooking", source: "households", field: cookingFuel },
  { id: "secure_tenure", tableNumber: 18, tabName: "Access to secure tenure", group: "Households & services", title: "Distribution of Households by Access to Secure Tenure", source: "households", field: secureTenure, note: "Uses an explicit secure-tenure field when supplied by the dataset. The application does not infer legal tenure security from tenure labels alone." },
  { id: "overcrowding", tableNumber: 19, tabName: "Overcrowding status", group: "Households & services", title: "Distribution of Households by Overcrowding Status", source: "households", field: (h) => text(read(h, ["overcrowding_status", "overcrowding"])) },
  { id: "clean_fuel", tableNumber: 20, tabName: "Reliance on clean fuel", group: "Households & services", title: "Distribution of Households by Reliance on Clean Fuels/Technology", source: "households", field: isCleanFuel, note: "This is a derived screening classification from the reported cooking-fuel/energy text. It is not presented as a separate official PSA poverty or health classification." },
  { id: "food_insecurity", tableNumber: 21, tabName: "Food insecurity experience", group: "Households & services", title: "Number of Households that Experienced Food Insecurity", source: "households", field: foodInsecurity },
  { id: "financial_account", tableNumber: 22, tabName: "Financial account", group: "Households & services", title: "Number of Households with Formal Financial Account by Type", source: "households", kind: "multi-account", accounts: [
    { label: "Bank account", keys: ["i01_a_bank_account", "bank_account", "formal_bank_account"] },
    { label: "Digital / online bank account", keys: ["i01_b_digital_bank_account", "digital_bank_account", "online_bank_account"] },
    { label: "E-money / cash card", keys: ["i01_c_emoney_or_cash_card", "emoney_or_cash_card", "e_money_account"] },
    { label: "NSSLA", keys: ["i01_d_nssla", "nssla"] },
    { label: "Cooperative account", keys: ["i01_e_account_with_coop", "cooperative_account", "account_with_cooperative"] },
    { label: "Microfinance account", keys: ["i01_f_microfinance", "microfinance_account"] },
  ] },
  { id: "medical_nonavailment", tableNumber: 23, tabName: "Medical treatment nonavailment", group: "Households & services", title: "Number of Households with Member/s who got Ill/Sick/Injured but did not Avail Medical Treatment by Main Reason", source: "households", field: medicalTreatmentReason },
  { id: "sex", tableNumber: 24, tabName: "Population by sex", group: "Population & demographics", title: "Distribution of Covered Population by Sex", source: "persons", field: sexLabel },
  { id: "age_sex", tableNumber: 25, tabName: "Population by age group", group: "Population & demographics", title: "Distribution of Covered Population by Age Group and Sex", source: "persons", field: (p) => `${ageGroup(p)} — ${sexLabel(p)}` },
  { id: "ethnicity", tableNumber: 26, tabName: "Population by ethnicity", group: "Population & demographics", title: "Distribution of Covered Population by Ethnicity", source: "persons", field: (p) => ethnicity(p) },
  { id: "senior_id", tableNumber: 27, tabName: "Senior citizen ID", group: "Population & demographics", title: "Distribution of Covered Population 60 Years Old and Over by Ownership of Senior Citizen ID", source: "persons", filter: (p) => (age(p) ?? -1) >= 60, field: seniorId },
  { id: "schooling_3_24", tableNumber: 28, tabName: "Schooling status of 3-24yo", group: "Population & demographics", title: "Distribution of Covered Population 3 to 24 Years Old by Schooling Status", source: "persons", filter: (p) => { const a = age(p); return a != null && a >= 3 && a <= 24; }, field: schoolStatus },
  { id: "not_school_reason_16_21", tableNumber: 29, tabName: "Not schooling reason of 16-21yo", group: "Population & demographics", title: "Distribution of Covered Population 16 to 21 Years Old who are not Attending School by Sex and Reason", source: "persons", filter: (p) => { const a = age(p); return a != null && a >= 16 && a <= 21 && isNotAttending(p); }, field: (p) => `${sexLabel(p)} — ${childSchoolingReason(p)}` },
  { id: "lfp", tableNumber: 30, tabName: "Labor force participation (LFP)", group: "Labor & livelihoods", title: "Labor Force Participation Rate among Covered Population 15 Years Old and Over Excluding Overseas Filipino Workers", source: "persons", field: lfpLabel, filter: (p) => { const a = age(p); return a != null && a >= 15 && !isOFW(p); } },
  { id: "lfp_sex", tableNumber: 31, tabName: "LFP by sex", group: "Labor & livelihoods", title: "Labor Force Participation Rate among Covered Population 15 Years Old and Over Excluding Overseas Filipino Workers by Sex", source: "persons", field: (p) => `${sexLabel(p)} — ${lfpLabel(p)}`, filter: (p) => { const a = age(p); return a != null && a >= 15 && !isOFW(p); } },
  { id: "key_employment", tableNumber: 32, tabName: "Key employment statistics", group: "Labor & livelihoods", title: "Employment, Unemployment and Underemployment among Covered Population 15 Years Old and Over Excluding Overseas Filipino Workers by Sex", source: "persons", kind: "employment-key", filter: (p) => { const a = age(p); return a != null && a >= 15 && !isOFW(p); } },
  { id: "farmers", tableNumber: 33, tabName: "Farmers and farm workers", group: "Labor & livelihoods", title: "Proportion of Farmers and Farm Workers among Covered Population 15 Years Old and Over Excluding Overseas Filipino Workers", source: "persons", field: (p) => hasFarmer(p) ? "Farmer / farm worker" : "Other covered population", filter: (p) => { const a = age(p); return a != null && a >= 15 && !isOFW(p); } },
  { id: "fisherfolk", tableNumber: 34, tabName: "Fisherfolk and fish workers", group: "Labor & livelihoods", title: "Proportion of Fisherfolk and Fish Workers among Covered Population 15 Years Old and Over Excluding Overseas Filipino Workers", source: "persons", field: (p) => hasFisherfolk(p) ? "Fisherfolk / fish worker" : "Other covered population", filter: (p) => { const a = age(p); return a != null && a >= 15 && !isOFW(p); } },
  { id: "child_labor", tableNumber: 35, tabName: "Child labor", group: "Labor & livelihoods", title: "Distribution of Covered Population 5 to 17 Years Old by Engagement to Child Labor", source: "persons", filter: (p) => { const a = age(p); return a != null && a >= 5 && a <= 17; }, field: (p) => { const v = childLaborStatus(p); return v === null ? "Not reported" : v ? "Engaged / working" : "Not engaged / not working"; } },
  { id: "working_children_sex", tableNumber: 36, tabName: "Working children by sex", group: "Labor & livelihoods", title: "Distribution of Working Children aged 5 to 17 Years Old by Sex", source: "persons", filter: (p) => { const a = age(p); return a != null && a >= 5 && a <= 17 && isEmployed(p); }, field: sexLabel },
  { id: "working_children_occupation", tableNumber: 37, tabName: "Working children by occupation", group: "Labor & livelihoods", title: "Distribution of Working Children aged 5 to 17 Years Old by Occupation Group", source: "persons", filter: (p) => { const a = age(p); return a != null && a >= 5 && a <= 17 && isEmployed(p); }, field: (p) => occupation(p) ?? "Not reported" },
  { id: "employed_managers", tableNumber: 38, tabName: "Employed managers", group: "Labor & livelihoods", title: "Distribution of Employed Persons in Managerial Positions by Sex", source: "persons", filter: (p) => isEmployed(p) && isManager(p), field: sexLabel },
  { id: "class_workers", tableNumber: 39, tabName: "Class of workers", group: "Labor & livelihoods", title: "Distribution of Covered Population 15 Years Old and Over Excluding Overseas Filipino Workers who are Employed by Class of Worker", source: "persons", filter: (p) => { const a = age(p); return a != null && a >= 15 && !isOFW(p) && isEmployed(p); }, field: (p) => workerClass(p) ?? "Not reported" },
  { id: "industry_group", tableNumber: 40, tabName: "Industry group", group: "Labor & livelihoods", title: "Distribution of Covered Population 15 Years Old and Over Excluding Overseas Filipino Workers who are Employed by Industry Group", source: "persons", filter: (p) => { const a = age(p); return a != null && a >= 15 && !isOFW(p) && isEmployed(p); }, field: (p) => industry(p) ?? "Not reported" },
  { id: "youth_neet", tableNumber: 41, tabName: "Youth engagement", group: "Labor & livelihoods", title: "Proportion of Youth not in Education, Employment or Training among Covered Population 15 to 24 Years Old", source: "persons", filter: (p) => { const a = age(p); return a != null && a >= 15 && a <= 24; }, field: (p) => !isAttending(p) && !isEmployed(p) && !/tvet/i.test(String(tvetAttending(p))) ? "NEET" : "Education / Employment / Training" },
  { id: "shs_not_school", tableNumber: 42, tabName: "SHS graduate not in school", group: "Labor & livelihoods", title: "Distribution of Senior High School Graduate not Attending School by Employment Status", source: "persons", filter: (p) => { const edu = String(education(p) ?? "").toLowerCase(); return isNotAttending(p) && /senior high|shs/.test(edu); }, field: (p) => employmentStatus(p) ?? "Not reported" },
  { id: "tvet_not_school", tableNumber: 43, tabName: "TVET graduate not in school", group: "Labor & livelihoods", title: "Distribution of Covered Population 15 Years Old and Over who are Technical and Vocational Education and Training Graduates not Attending School by Employment Status", source: "persons", filter: (p) => { const a = age(p); return a != null && a >= 15 && tvetGraduate(p) === "Yes" && tvetAttending(p) === "No"; }, field: (p) => employmentStatus(p) ?? "Not reported" },
  { id: "manufacturing", tableNumber: 44, tabName: "Manufacturing Industry", group: "Labor & livelihoods", title: "Proportion of Employed Individuals Engaged in the Manufacturing Industry", source: "persons", filter: isEmployed, field: (p) => isManufacturing(p) ? "Manufacturing" : "Other industries" },
  { id: "informal_employment", tableNumber: 45, tabName: "Informal employment", group: "Labor & livelihoods", title: "Proportion of Employed Individuals Who Are Self‑Employed and Unpaid Family Workers", source: "persons", filter: isEmployed, field: (p) => { const c = String(workerClass(p) ?? "").toLowerCase(); if (c.includes("self-employed") || c.includes("self employed")) return "Self-employed without paid employee"; if (c.includes("unpaid family")) return "Unpaid family worker"; return "Other employed"; } },
  { id: "occupation_sex", tableNumber: 46, tabName: "Employed by occupation group", group: "Labor & livelihoods", title: "Distribution of Employed Persons by Occupation Group and by Sex", source: "persons", filter: isEmployed, field: (p) => `${occupation(p) ?? "Not reported"} — ${sexLabel(p)}` },
  { id: "public_transportation", tableNumber: 47, tabName: "Public transportation", group: "Access & local services", title: "Distribution of Households by Access to Public Transportation", source: "households", field: publicTransportation },
  { id: "working_children_not_school", tableNumber: 48, tabName: "Working children not in school", group: "Labor & livelihoods", title: "Distribution of Working Children Aged 5 to 17 Years Old Who are Not in School by Age and Sex", source: "persons", filter: (p) => { const a = age(p); return a != null && a >= 5 && a <= 17 && isEmployed(p) && isNotAttending(p); }, field: (p) => `${ageGroup(p)} — ${sexLabel(p)}` },
  { id: "floor_strength", tableNumber: 49, tabName: "Floor material strength", group: "Housing quality", title: "Distribution of Households by Strength of Floor Materials", source: "households", field: floorStrength },
  { id: "roof_strength", tableNumber: 50, tabName: "Roof material strength", group: "Housing quality", title: "Distribution of Households by Strength of Roof Materials", source: "households", field: roofStrength },
  { id: "wall_strength", tableNumber: 51, tabName: "Outer wall material strength", group: "Housing quality", title: "Distribution of Households by Strength of Outer Wall Materials", source: "households", field: wallStrength },
  { id: "waste_collection", tableNumber: 52, tabName: "Waste collection", group: "Access & local services", title: "Availability of Garbage Collection Services by Barangay", source: "households", kind: "barangay-status", field: garbageCollection },
  { id: "network_signal", tableNumber: 53, tabName: "Network signal", group: "Access & local services", title: "Availability of Cellphone Network Signal by Barangay", source: "households", kind: "barangay-status", field: networkSignal },
  { id: "drrm", tableNumber: 54, tabName: "DRRM", group: "Access & local services", title: "Presence of Disaster Risk Reduction and Management Measures by Barangay", source: "barangays", kind: "barangay-status", field: drrmStatus },
  { id: "civil_status", tableNumber: 55, tabName: "Civil status", group: "Additional CBMS indicators", title: "Distribution of Covered Population by Civil Status", source: "persons", field: (p) => text(read(p, ["a07_marital_status", "civil_status", "marital_status"])) },
  { id: "education_level", tableNumber: 56, tabName: "Educational attainment", group: "Additional CBMS indicators", title: "Distribution of Covered Population by Educational Level", source: "persons", field: education },
  { id: "philhealth", tableNumber: 57, tabName: "PhilHealth membership", group: "Additional CBMS indicators", title: "Distribution of Covered Population by PhilHealth Membership", source: "persons", field: (p) => normalizeStatus(read(p, ["m01_c_philhealth", "philhealth_member", "philhealth"])) },
];

export { REPORTS };

function getRowsFor(report: ReportDef, datasets: { households: any[]; persons: any[]; barangays?: any[] }) {
  return report.source === "households" ? datasets.households : report.source === "persons" ? datasets.persons : datasets.barangays ?? [];
}

function valueOf(report: ReportDef, row: any): string {
  const raw = typeof report.field === "function" ? report.field(row) : report.field ? read(row, [report.field]) : null;
  return raw == null || String(raw).trim() === "" ? "Not reported" : String(raw).trim();
}

function filteredRows(report: ReportDef, datasets: { households: any[]; persons: any[]; barangays?: any[] }) {
  const rows = getRowsFor(report, datasets);
  return report.filter ? rows.filter(report.filter) : rows;
}

export function buildReportResult(report: ReportDef, datasets: { households: any[]; persons: any[]; barangays?: any[] }): ReportResult {
  if (report.kind === "summary") {
    const households = datasets.households || [];
    const persons = datasets.persons || [];
    const validSizes = households.map(h => householdSize(h)).filter((v): v is number => v != null);
    const average = validSizes.length ? validSizes.reduce((a, b) => a + b, 0) / validSizes.length : (households.length ? persons.length / households.length : 0);
    return {
      total: households.length,
      rows: [
        { category: "Responding Households", count: households.length, percent: "—", valueType: "count" },
        { category: "Covered Population", count: persons.length, percent: "—", valueType: "count" },
        { category: "Average Household Size", count: Number(average.toFixed(2)), percent: "—", valueType: "average" },
      ],
      denominator: households.length,
      note: report.note,
    };
  }

  const rowsIn = filteredRows(report, datasets);

  if (report.kind === "employment-key") {
    const total = rowsIn.length;
    const sexes = Array.from(new Set(rowsIn.map(sexLabel))).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
    const rows: ReportRow[] = [];
    for (const s of sexes) {
      const group = rowsIn.filter((p) => sexLabel(p) === s);
      const employed = group.filter(isEmployed).length;
      const unemployed = group.filter(isUnemployed).length;
      const underemployed = group.filter((p) => isEmployed(p) && /underemployed/i.test(String(read(p, ["e01_underemployment_status", "underemployment_status"])))) .length;
      rows.push({ category: `${s} — Employed`, count: employed, percent: total ? `${((employed / total) * 100).toFixed(2)}%` : "0%" });
      rows.push({ category: `${s} — Unemployed`, count: unemployed, percent: total ? `${((unemployed / total) * 100).toFixed(2)}%` : "0%" });
      rows.push({ category: `${s} — Underemployed`, count: underemployed, percent: employed ? `${((underemployed / employed) * 100).toFixed(2)}% of employed` : "0.00% of employed" });
    }
    return { rows, total, denominator: total, note: report.note ?? "Employment and unemployment percentages use the 15+ non-OFW population as denominator. Underemployment percentage uses employed persons as its denominator because underemployment is a subset of employment." };
  }

  if (report.kind === "multi-account") {
    const accounts = report.accounts ?? [];
    const total = rowsIn.length;
    const hasAnyAccountField = rowsIn.some((row) => accounts.some((account) => read(row, account.keys) !== null));
    if (!hasAnyAccountField) return { rows: [], total: 0, denominator: 0, note: report.note };
    const rows = accounts.map((account) => {
      const count = rowsIn.filter(row => yes(read(row, account.keys))).length;
      return { category: account.label, count, percent: total ? `${((count / total) * 100).toFixed(2)}%` : "0%" };
    });
    return { rows, total, denominator: total, note: report.note ?? "Households may hold more than one formal account type, so percentages across account types are not expected to sum to 100%." };
  }

  if (report.kind === "barangay-status") {
    const grouped = new Map<string, any[]>();
    for (const row of rowsIn) {
      const name = String(row?.area_name ?? "Selected Local Area").trim() || "Selected Local Area";
      if (!grouped.has(name)) grouped.set(name, []);
      grouped.get(name)!.push(row);
    }
    const allValues = rowsIn.map((row) => valueOf(report, row));
    const reportedAny = allValues.some((value) => value !== "Not reported");
    if (!reportedAny) return { rows: [], total: 0, denominator: 0, note: report.note };
    const rows: any[] = Array.from(grouped.entries())
      .sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true, sensitivity: "base" }))
      .map(([barangay, records]) => {
        const available = records.filter((r) => {
          const value = valueOf(report, r);
          if (/^no$|^none$|^not available$|^absent$|^not present$|^no signal$/i.test(value)) return false;
          return /^yes$|^available$|^with$|^present$|^good$|^strong$|^operational$|^in place$/i.test(value);
        }).length;
        const reported = records.filter((r) => valueOf(report, r) !== "Not reported").length;
        const status = reported === 0 ? "Not reported" : available === records.length ? "Available / Present" : available === 0 ? "Not available / Not present" : "Mixed responses";
        return { category: barangay, barangay, status, count: available, percent: reported ? `${((available / records.length) * 100).toFixed(2)}%` : "0%" };
      });
    return { rows, total: rows.length, denominator: rows.length, note: report.note };
  }

  const counts = new Map<string, number>();
  let reportedValues = 0;
  for (const row of rowsIn) {
    const k = valueOf(report, row);
    if (k !== "Not reported") reportedValues += 1;
    counts.set(k, (counts.get(k) || 0) + 1);
  }
  const total = rowsIn.length;
  if (!reportedValues) return { rows: [], total: 0, denominator: 0, note: report.note };
  const rows = Array.from(counts.entries())
    .map(([category, count]) => ({ category, count, percent: total ? `${((count / total) * 100).toFixed(2)}%` : "0%" }))
    .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category, undefined, { sensitivity: "base", numeric: true }));
  return { rows, total, denominator: total, note: report.note };
}

/** Backwards-compatible helper for modules that already pass a flat dataset. */
export function frequency(rowsIn: any[], report: ReportDef) {
  const datasets = report.source === "households" ? { households: rowsIn, persons: [], barangays: [] } : { households: [], persons: rowsIn, barangays: [] };
  return buildReportResult(report, datasets);
}

export function getReportColumns(report: ReportDef, result?: ReportResult) {
  if (report.kind === "summary") {
    return [
      { key: "category", label: "Indicator" },
      { key: "count", label: "Value" },
      { key: "percent", label: "Percentage / Rate" },
    ];
  }
  if (report.kind === "barangay-status") {
    return [
      { key: "barangay", label: "Barangay" },
      { key: "status", label: "Status" },
      { key: "count", label: "Available / Present" },
      { key: "percent", label: "Percentage Rate (%Rate)" },
    ];
  }
  return [
    { key: "category", label: "Category" },
    { key: "count", label: report.source === "households" ? "Households" : "Persons" },
    { key: "percent", label: "Percentage Rate (%Rate)" },
  ];
}
