# CBMS Statistical Reports

The Statistical Reports page derives its profile from the CBMS datasets loaded at runtime. Sample values are not hard-coded.

## Source model

- **CBMS 2022:** the legacy JSON is converted to the application's normalized person/household model. The original payload is preserved in `legacy_raw` so source fields remain available.
- **CBMS 2024:** the authorized JSON records are loaded directly into the normalized runtime store.
- Both years are cached locally in IndexedDB after import so the Statistical Reports page can reuse the loaded datasets after a restart.

## Profile indicators

### Population and households
- Total population = number of unique normalized person records.
- Total households = number of unique normalized household records.
- Farming households = households with at least one member classified as a farmer.
- Fisherfolk households = households with at least one member classified as fisherfolk.
- Mixed farmer + fisherfolk households = households containing both indicators.
- Non-agriculture/non-fishing households = households with neither indicator.

### Agricultural labor force
- Labor force, age 15–64 = persons aged 15–64 classified as in the labor force.
- Agriculture & fishery labor = age 15–64 persons in the labor force who are classified by the centralized CBMS farmer/fisherfolk sector rules.
- Women in agriculture/fishery = female share of the derived agriculture/fishery labor group.

### Income and poverty indicators
- Reported household income = household records with a numeric H06 total family income.
- H06 income below ₱20,000 = reported households below the threshold.
- Average agriculture/fishery household income = mean reported H06 income for households with farmer/fisherfolk members.
- Average non-agriculture/fishery household income = mean reported H06 income for households without those members.
- Income gap = agriculture/fishery average relative difference from the non-agriculture/fishery average.
- **Municipal poverty incidence is not estimated.** The CBMS normalized records available to this application do not expose an official poverty-incidence variable, so the UI explicitly distinguishes the H06 income indicator from an official poverty measure.

### Employment
- Total employed = person records classified as employed.
- Unemployment rate = unemployed age 15–64 divided by labor force age 15–64.
- Underemployment rate = underemployed employed-person records divided by employed-person records.
- Employment sector shares are derived reporting groupings: agriculture/fisheries, services/trade, and industry/government/other.

## Field handling

The implementation accepts the normalized text values and numeric CBMS value-set codes needed by the 2022 adapter and 2024 source records. Sector classification itself is centralized so the Statistical Reports page and Sectors page use the same rules.


## Verification guide

Every displayed percentage is accompanied by either a nearby formula or the Percentage check guide. In general: `percentage = numerator / denominator × 100`. The denominator is always identified by the metric: households for household shares, unique persons for person shares, labor force for unemployment, employed persons for underemployment, and numeric reported-income households for the H06 threshold rate.

Sector household counts and sector person counts intentionally use different units. A farming household means at least one linked person is classified as farmer. It does not mean exactly one farmer lives in the household.
