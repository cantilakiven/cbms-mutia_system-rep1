# Sector Accounting and Reconciliation

CBMS Insights reports agriculture/fishery sectors in two distinct units.

## Person-based count
A person is counted once using the canonical person identity. For CBMS 2024, the source fields are `e17_farmer` and `e18_fisherfolk`. The supplied 2024 dictionary defines both as Yes/No person-level fields. For CBMS 2022, the import adapter uses the agriculture/fishery engagement module in the supplied HPQ structure.

## Household-based count
A household is counted once using area + HUSN + HSN. A household is a farming household when at least one linked person is classified as farmer, and a fisherfolk household when at least one linked person is classified as fisherfolk.

## Why the numbers differ
A household may have several sector members. Therefore farmer persons and farming households answer different questions. A household may also contain both farmer and fisherfolk members and is counted in both headline household sectors, but only once in the mutually exclusive reconciliation categories.

## Reconciliation
Farming-only households + fisherfolk-only households + mixed households + neither = total unique households.

Farmer persons + fisherfolk persons - persons flagged as both = agriculture/fishery person union.

## Missing linkage
Person-linked household keys that have no household record are reported as an audit condition and are not silently synthesized into household totals.


## Reading the audit view

Use the following order when checking a discrepancy:
1. **Households** — one unique area + HUSN + HSN = one household row.
2. **Persons** — one unique person identity = one person row.
3. **Household derived from persons** — a cross-check of household keys present in person records; these are not silently added to the explicit household denominator when the household record is missing.

A farming household is a household with at least one linked person classified as a farmer. A fisherfolk household is a household with at least one linked person classified as fisherfolk. A household may satisfy both conditions, so those two headline household counts are allowed to overlap. The exclusive composition categories (farming-only, fisherfolk-only, mixed, neither) are the reconciliation set and must sum to the explicit household total.

For CBMS 2024, the person classification uses the explicit `e17_farmer` and `e18_fisherfolk` fields defined in the supplied Data Dictionary. fileciteturn79file0L51601-L51623 For CBMS 2022, the importer uses the agriculture/fishery engagement module from the HPQ structure.
