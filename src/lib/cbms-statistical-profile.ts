import { getHouseholdIncome, type DataYear } from "@/data/cbms";
import {
  buildHouseholdSectorMap,
  classifyHousehold,
  classifyPersonSector,
  getSectorAccounting,
} from "@/lib/cbms-sector-classification";

export interface StatisticalProfile {
  year: DataYear;
  population: number;
  households: number;
  farmingHouseholds: number;
  fisherfolkHouseholds: number;
  farmingOnlyHouseholds: number;
  fisherfolkOnlyHouseholds: number;
  mixedAgriFishHouseholds: number;
  nonAgriFishHouseholds: number;
  reportedIncomeHouseholds: number;
  lowIncome20k: number;
  lowIncome20kRate: number | null;
  avgAgriIncome: number | null;
  avgNonAgriIncome: number | null;
  incomeGapRate: number | null;
  laborForce1564: number | null;
  agricultureFisheryLabor: number | null;
  agricultureFisheryShare: number | null;
  farmers: number | null;
  fisherfolk: number | null;
  womenInAgriculture: number | null;
  employed: number | null;
  unemployed: number | null;
  unemploymentRate: number | null;
  underemployed: number | null;
  underemploymentRate: number | null;
  sector: {
    agricultureFishery: number | null;
    servicesTrade: number | null;
    industryGovernmentOther: number | null;
  };
  accounting: {
    person: ReturnType<typeof getSectorAccounting>["person"];
    household: ReturnType<typeof getSectorAccounting>["household"];
  };
  notes: string[];
}

const finiteNumber = (value: unknown): number | null => {
  const n = Number(value);
  return value === null || value === undefined || value === "" || !Number.isFinite(n) ? null : n;
};

function isInLaborForce(person: any) {
  const value = person?.e01_labor_force_participation;
  if (value === 1 || value === "1" || String(value).toLowerCase() === "in the labor force") return true;
  if (value === 2 || value === "2" || String(value).toLowerCase() === "not in the labor force") return false;
  const employed = String(person?.e01_employment_status ?? "").toLowerCase();
  return employed === "employed" || employed === "unemployed" || employed === "umployed";
}

function isEmployed(person: any) {
  const value = person?.e01_employment_status;
  return value === 1 || value === "1" || String(value).toLowerCase() === "employed";
}

function isUnemployed(person: any) {
  const value = person?.e01_employment_status;
  const normalized = String(value ?? "").toLowerCase();
  return value === 2 || value === "2" || normalized === "unemployed" || normalized === "umployed";
}

function isUnderemployed(person: any) {
  const value = person?.e01_underemployment_status;
  return value === 1 || value === "1" || String(value).toLowerCase() === "underemployed";
}

function isFemale(person: any) {
  const value = person?.a03_sex;
  return value === 2 || value === "2" || String(value).toLowerCase() === "female";
}

function isAgricultureOrFishery(person: any) {
  const c = classifyPersonSector(person);
  return c.farmer || c.fisherfolk;
}

function sectorOf(person: any): "agri" | "services" | "other" | null {
  if (!isEmployed(person)) return null;
  if (isAgricultureOrFishery(person)) return "agri";

  const occupation = [person.e05_psoc, person.e05_occupation_group, person.legacy_occupation_text]
    .filter((v) => v !== null && v !== undefined && v !== "")
    .map((v) => String(v).toLowerCase()).join(" ");
  const industry = [person.e06_psic, person.e06_industry_group, person.legacy_industry_text]
    .filter((v) => v !== null && v !== undefined && v !== "")
    .map((v) => String(v).toLowerCase()).join(" ");
  const psic = finiteNumber(person.e06_psic_code);

  if (
    /retail|wholesale|trade|commerce|transport|accommodation|hotel|restaurant|food service|information|communication|telecom|finance|bank|insurance|real estate|education|school|teaching|health|hospital|clinic|social work|professional|administrative|support service|arts|entertainment|recreation|repair|personal service/.test(occupation) ||
    /retail|wholesale|trade|transport|accommodation|food|information|communication|finance|insurance|real estate|education|health|social work|professional|administrative|arts|entertainment|recreation|repair|other service/.test(industry) ||
    (psic !== null && psic >= 45000 && psic < 100000)
  ) return "services";

  return "other";
}

export function buildStatisticalProfile(year: DataYear, ds: any): StatisticalProfile {
  const rawPersons = Array.isArray(ds?.persons) ? ds.persons : [];
  const rawHouseholds = Array.isArray(ds?.households) ? ds.households : [];
  const accounting = getSectorAccounting(year, rawHouseholds, rawPersons);
  const persons = accounting.uniquePersons;
  const households = accounting.uniqueHouseholds;
  const personFlags = buildHouseholdSectorMap(persons);

  const farmingHouseholdRows = households.filter((household) => classifyHousehold(household, personFlags).farmer);
  const fisherfolkHouseholdRows = households.filter((household) => classifyHousehold(household, personFlags).fisherfolk);
  const mixedHouseholdRows = households.filter((household) => classifyHousehold(household, personFlags).mixed);

  const agriIncomes: number[] = [];
  const nonAgriIncomes: number[] = [];
  const reportedIncomes: number[] = [];
  for (const household of households) {
    const classification = classifyHousehold(household, personFlags);
    const income = getHouseholdIncome(household);
    if (income === null) continue;
    reportedIncomes.push(income);
    if (classification.farmer || classification.fisherfolk) agriIncomes.push(income);
    else nonAgriIncomes.push(income);
  }

  const age1564 = persons.filter((person: any) => {
    const age = finiteNumber(person.a05_age);
    return age !== null && age >= 15 && age <= 64;
  });
  const laborForce1564 = age1564.filter(isInLaborForce);
  const agriLabor = laborForce1564.filter(isAgricultureOrFishery);
  const womenAgriLabor = agriLabor.filter(isFemale).length;

  const employed = persons.filter(isEmployed);
  const unemployed = persons.filter(isUnemployed);
  const underemployed = employed.filter(isUnderemployed);
  const sectorCounts = employed.reduce((acc, person) => {
    const sector = sectorOf(person);
    if (sector === "agri") acc.agri += 1;
    else if (sector === "services") acc.services += 1;
    else if (sector === "other") acc.other += 1;
    return acc;
  }, { agri: 0, services: 0, other: 0 });

  const mean = (values: number[]) => values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
  const avgAgriIncome = mean(agriIncomes);
  const avgNonAgriIncome = mean(nonAgriIncomes);
  const incomeGapRate = avgAgriIncome !== null && avgNonAgriIncome !== null && avgNonAgriIncome > 0
    ? ((avgNonAgriIncome - avgAgriIncome) / avgNonAgriIncome) * 100
    : null;
  const lowIncome20k = reportedIncomes.filter((income) => income < 20000).length;

  const notes = [
    "Person counts and household counts are calculated separately. A person is counted once by unique person key; an explicit household is counted once by unique area + HUSN + HSN. Person-derived household keys without an explicit household record are reported as an audit exception instead of being silently added.",
    "Farmer and fisherfolk household counts are not mutually exclusive. A household with both types is counted in both headline indicators and separately reported as a mixed household.",
    "For CBMS 2024, farmer/fisherfolk classification uses the explicit e17_farmer and e18_fisherfolk fields from the supplied Data Dictionary. For CBMS 2022, classification uses the agricultural/fishery engagement fields from the 2022 HPQ structure carried through the import adapter.",
    "Free-text occupation/industry is not used to override an explicit farmer/fisherfolk sector flag. This prevents occupation descriptions from changing the sector count.",
    "Poverty incidence is not estimated from these records. H06 income below ₱20,000 is reported only as an income-threshold indicator.",
    "Agriculture/fishery, services/trade, and industry/government/other employment shares are derived reporting groupings; the underlying person-level CBMS fields remain available for audit.",
  ];

  return {
    year,
    population: persons.length,
    households: households.length,
    farmingHouseholds: farmingHouseholdRows.length,
    fisherfolkHouseholds: fisherfolkHouseholdRows.length,
    farmingOnlyHouseholds: accounting.household.farmingOnly,
    fisherfolkOnlyHouseholds: accounting.household.fisherfolkOnly,
    mixedAgriFishHouseholds: mixedHouseholdRows.length,
    nonAgriFishHouseholds: accounting.household.neither,
    reportedIncomeHouseholds: reportedIncomes.length,
    lowIncome20k,
    lowIncome20kRate: reportedIncomes.length ? (lowIncome20k / reportedIncomes.length) * 100 : null,
    avgAgriIncome,
    avgNonAgriIncome,
    incomeGapRate,
    laborForce1564: laborForce1564.length ? laborForce1564.length : null,
    agricultureFisheryLabor: laborForce1564.length ? agriLabor.length : null,
    agricultureFisheryShare: laborForce1564.length ? (agriLabor.length / laborForce1564.length) * 100 : null,
    farmers: persons.length ? accounting.person.farmers : null,
    fisherfolk: persons.length ? accounting.person.fisherfolk : null,
    womenInAgriculture: agriLabor.length ? (womenAgriLabor / agriLabor.length) * 100 : null,
    employed: persons.length ? employed.length : null,
    unemployed: persons.length ? unemployed.length : null,
    unemploymentRate: laborForce1564.length
      ? (unemployed.filter((person) => {
          const age = finiteNumber(person.a05_age);
          return age !== null && age >= 15 && age <= 64;
        }).length / laborForce1564.length) * 100
      : null,
    underemployed: employed.length ? underemployed.length : null,
    underemploymentRate: employed.length ? (underemployed.length / employed.length) * 100 : null,
    sector: {
      agricultureFishery: employed.length ? (sectorCounts.agri / employed.length) * 100 : null,
      servicesTrade: employed.length ? (sectorCounts.services / employed.length) * 100 : null,
      industryGovernmentOther: employed.length ? (sectorCounts.other / employed.length) * 100 : null,
    },
    accounting: {
      person: accounting.person,
      household: accounting.household,
    },
    notes,
  };
}
