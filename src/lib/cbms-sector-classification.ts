import { householdKey, type DataYear } from "@/data/cbms";
import { canonicalHouseholdKey, canonicalPersonKey } from "@/lib/record-keys";

export type SectorKind = "farmer" | "fisherfolk";

export interface PersonSectorClassification {
  farmer: boolean;
  fisherfolk: boolean;
  source: string[];
}

export interface HouseholdSectorClassification extends PersonSectorClassification {
  farmingOnly: boolean;
  fisherfolkOnly: boolean;
  mixed: boolean;
  neither: boolean;
}

const yes = (value: unknown) => value === "Yes" || value === 1 || value === "1" || value === true;
const hasValue = (value: unknown) => value !== null && value !== undefined && String(value).trim() !== "";
const hasOwn = (obj: any, key: string) => Object.prototype.hasOwnProperty.call(obj ?? {}, key);

function legacyAgriculture(person: any) {
  return person?.legacy_agriculture_engagement ?? {};
}

/**
 * Sector classification deliberately uses the CBMS sector-specific source fields.
 * It does not infer farmer/fisherfolk membership from free-text occupation/industry.
 * This prevents a person with an agricultural-looking occupation description from
 * being counted as a farmer when the CBMS sector flag says otherwise.
 */
export function classifyPersonSector(person: any): PersonSectorClassification {
  const legacyYear = Number(person?.legacy_year) === 2022;
  if (legacyYear) {
    const g = legacyAgriculture(person);
    const farmer =
      yes(g.G12_A_GROWING_OF_CROPS) ||
      yes(g.G12_B_LIVESTOCK_AND_POULTRY) ||
      hasValue(g.G13_TYPE_OF_ENGAGEMENT_IN_FARMING) ||
      [
        g.G14_A_DAY_TO_DAY_FARM_OPERATION,
        g.G14_B_LAND_PREPARATION,
        g.G14_C_PLANTING,
        g.G14_D_CULTIVATION,
        g.G14_E_HARVESTING,
        g.G14_F_FEEDING,
        g.G14_Z_OTHERS_FARM_PRODUCTION_ACTIVITY,
      ].some(yes);

    const fisherfolk =
      yes(g.G12_C_AQUACULTURE) ||
      yes(g.G12_D_FISH_CAPTURE) ||
      yes(g.G12_E_GLEANING) ||
      hasValue(g.G15_TYPE_OF_ENGAGEMENT_IN_FISHERY) ||
      [
        g.G16_A_DAY_TO_DAY_FISHERY_OPERATION,
        g.G16_B_PREPARATION,
        g.G16_C_STOCKING,
        g.G16_D_FEEDING,
        g.G16_E_WATER_MANAGEMENT,
        g.G16_F_POND_MAINTENANCE,
        g.G16_G_HARVESTING,
        g.G16_H_MUNICIPAL_FISHING,
        g.G16_I_GLEANING,
        g.G16_J_COMMERCIAL_FISHING,
        g.G16_Z_OTHERS_FISHERY_ACTIVITY,
      ].some(yes);

    return {
      farmer,
      fisherfolk,
      source: [
        farmer ? "CBMS 2022 G12/G13/G14 farming-engagement fields" : "",
        fisherfolk ? "CBMS 2022 G12/G15/G16 fishery-engagement fields" : "",
      ].filter(Boolean),
    };
  }

  // The 2024 Data Dictionary defines these as explicit person-level Yes/No fields.
  const farmerFieldAvailable = hasOwn(person, "e17_farmer");
  const fisherFieldAvailable = hasOwn(person, "e18_fisherfolk");
  const farmer = farmerFieldAvailable ? yes(person.e17_farmer) : false;
  const fisherfolk = fisherFieldAvailable ? yes(person.e18_fisherfolk) : false;

  return {
    farmer,
    fisherfolk,
    source: [
      farmerFieldAvailable ? "CBMS 2024 e17_farmer" : "2024 farmer field not present",
      fisherFieldAvailable ? "CBMS 2024 e18_fisherfolk" : "2024 fisherfolk field not present",
    ],
  };
}

export function personSectorKind(person: any): SectorKind[] {
  const c = classifyPersonSector(person);
  return [c.farmer ? "farmer" : null, c.fisherfolk ? "fisherfolk" : null].filter(Boolean) as SectorKind[];
}

export function uniquePersonRecords(persons: any[]) {
  const seen = new Set<string>();
  return persons.filter((person) => {
    const key = canonicalPersonKey(person);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function uniqueHouseholdRecords(households: any[]) {
  const seen = new Set<string>();
  return households.filter((household) => {
    const key = canonicalHouseholdKey(household);
    if (!key || key === "||" || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function buildHouseholdSectorMap(persons: any[]) {
  const map = new Map<string, { farmer: boolean; fisherfolk: boolean }>();
  for (const person of persons) {
    const key = householdKey(person);
    if (!key || key === "--") continue;
    const current = map.get(key) ?? { farmer: false, fisherfolk: false };
    const classification = classifyPersonSector(person);
    current.farmer ||= classification.farmer;
    current.fisherfolk ||= classification.fisherfolk;
    map.set(key, current);
  }
  return map;
}

export function classifyHousehold(household: any, personFlags: Map<string, { farmer: boolean; fisherfolk: boolean }>): HouseholdSectorClassification {
  const flags = personFlags.get(householdKey(household)) ?? { farmer: false, fisherfolk: false };
  return {
    ...flags,
    farmingOnly: flags.farmer && !flags.fisherfolk,
    fisherfolkOnly: flags.fisherfolk && !flags.farmer,
    mixed: flags.farmer && flags.fisherfolk,
    neither: !flags.farmer && !flags.fisherfolk,
    source: [flags.farmer ? "person-level farmer indicator(s)" : "", flags.fisherfolk ? "person-level fisherfolk indicator(s)" : ""].filter(Boolean),
  };
}

export function getSectorAccounting(year: DataYear, households: any[], persons: any[]) {
  const uniquePersons = uniquePersonRecords(persons);
  const uniqueHouseholds = uniqueHouseholdRecords(households);
  const personFlags = buildHouseholdSectorMap(uniquePersons);
  const householdRows = uniqueHouseholds.map((household) => ({
    household,
    classification: classifyHousehold(household, personFlags),
  }));

  const personFarmer = uniquePersons.filter((p) => classifyPersonSector(p).farmer).length;
  const personFisherfolk = uniquePersons.filter((p) => classifyPersonSector(p).fisherfolk).length;
  const personMixed = uniquePersons.filter((p) => {
    const c = classifyPersonSector(p);
    return c.farmer && c.fisherfolk;
  }).length;
  const personNeither = uniquePersons.length - (personFarmer + personFisherfolk - personMixed);

  const farmingHouseholds = householdRows.filter((r) => r.classification.farmer).length;
  const fisherfolkHouseholds = householdRows.filter((r) => r.classification.fisherfolk).length;
  const mixedHouseholds = householdRows.filter((r) => r.classification.mixed).length;
  const farmingOnlyHouseholds = householdRows.filter((r) => r.classification.farmingOnly).length;
  const fisherfolkOnlyHouseholds = householdRows.filter((r) => r.classification.fisherfolkOnly).length;
  const neitherHouseholds = householdRows.filter((r) => r.classification.neither).length;
  const householdKeySet = new Set(uniqueHouseholds.map((h) => householdKey(h)));
  const personHouseholdKeys = new Set(uniquePersons.map((p) => householdKey(p)).filter((k) => k && k !== "--"));
  const householdKeysWithPersons = [...personHouseholdKeys].filter((k) => householdKeySet.has(k)).length;
  const householdKeysWithoutRecord = [...personHouseholdKeys].filter((k) => !householdKeySet.has(k)).length;
  const personDerivedHouseholdFlags = new Map<string, { farmer: boolean; fisherfolk: boolean }>();
  for (const person of uniquePersons) {
    const key = householdKey(person);
    if (!key || key === "--") continue;
    const current = personDerivedHouseholdFlags.get(key) ?? { farmer: false, fisherfolk: false };
    const c = classifyPersonSector(person);
    current.farmer ||= c.farmer;
    current.fisherfolk ||= c.fisherfolk;
    personDerivedHouseholdFlags.set(key, current);
  }
  const personDerivedFarmingKeys = [...personDerivedHouseholdFlags.values()].filter((x) => x.farmer).length;
  const personDerivedFisherfolkKeys = [...personDerivedHouseholdFlags.values()].filter((x) => x.fisherfolk).length;
  const personDerivedMixedKeys = [...personDerivedHouseholdFlags.values()].filter((x) => x.farmer && x.fisherfolk).length;
  const personsWithoutHouseholdRecord = uniquePersons.filter((p) => {
    const k = householdKey(p);
    return !k || k === "--" || !householdKeySet.has(k);
  }).length;

  return {
    year,
    uniquePersons,
    uniqueHouseholds,
    person: {
      total: uniquePersons.length,
      farmers: personFarmer,
      fisherfolk: personFisherfolk,
      mixed: personMixed,
      neither: Math.max(0, personNeither),
      agricultureFishery: personFarmer + personFisherfolk - personMixed,
    },
    household: {
      total: uniqueHouseholds.length,
      farming: farmingHouseholds,
      fisherfolk: fisherfolkHouseholds,
      farmingOnly: farmingOnlyHouseholds,
      fisherfolkOnly: fisherfolkOnlyHouseholds,
      mixed: mixedHouseholds,
      neither: neitherHouseholds,
      exclusiveSum: farmingOnlyHouseholds + fisherfolkOnlyHouseholds + mixedHouseholds + neitherHouseholds,
      linkedToPersons: householdKeysWithPersons,
      withoutHouseholdRecord: householdKeysWithoutRecord,
      personsWithoutHouseholdRecord,
      personDerivedTotalKeys: personDerivedHouseholdFlags.size,
      personDerivedFarmingKeys,
      personDerivedFisherfolkKeys,
      personDerivedMixedKeys,
    },
    householdRows,
  };
}

export function percentage(value: number, denominator: number) {
  return denominator > 0 ? (value / denominator) * 100 : null;
}
