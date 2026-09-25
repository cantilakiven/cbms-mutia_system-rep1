import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useSyncExternalStore } from "react";
import { CalendarRange, CalendarCheck2, FileBarChart, Users, Home, Wheat, Fish, BriefcaseBusiness, WalletCards, TrendingDown, PieChart, Info, ClipboardList } from "lucide-react";
import { getAvailableYears, getDataVersion, getYearDatasets, subscribeData, type DataYear } from "@/data/cbms";
import { uniqueHouseholdRecords, uniquePersonRecords } from "@/lib/cbms-sector-classification";
import { DataTable } from "@/components/DataTable";
import { REPORTS, frequency } from "@/lib/cbms-report-defs";
import { buildStatisticalProfile } from "@/lib/cbms-statistical-profile";

export const Route = createFileRoute("/reports")({
  component: ReportsPage,
});

function ReportsPage() {
  const version = useSyncExternalStore(subscribeData, getDataVersion, () => 0);
  const [year, setYear] = useState<DataYear>(2022);
  const [active, setActive] = useState<string>(REPORTS[0].id);
  const report = REPORTS.find((r) => r.id === active)!;
  const ds = getYearDatasets(year);

  const profile = useMemo(() => buildStatisticalProfile(year, ds), [year, ds, version]);
  const profile2022 = useMemo(() => buildStatisticalProfile(2022, getYearDatasets(2022)), [version]);
  const profile2024 = useMemo(() => buildStatisticalProfile(2024, getYearDatasets(2024)), [version]);
  const availableYears = getAvailableYears();

  const result = useMemo(() => {
    const data = report.source === "households" ? uniqueHouseholdRecords(ds.households) : uniquePersonRecords(ds.persons);
    return frequency(data, report);
  }, [report, ds.households, ds.persons, version]);

  const rows = result.rows.map((row) => ({
    ...row,
    calculation: result.total > 0 ? `${row.count.toLocaleString()} ÷ ${result.total.toLocaleString()} × 100 = ${row.percent}` : "No denominator available",
  }));
  rows.push({ category: "TOTAL", count: result.total, percent: result.total > 0 ? "100.00%" : "0%", calculation: result.total > 0 ? `${result.total.toLocaleString()} ÷ ${result.total.toLocaleString()} × 100 = 100.00%` : "No denominator available", _isTotalRow: true });

  const datasetCounts = {
    persons: uniquePersonRecords(ds.persons).length,
    households: uniqueHouseholdRecords(ds.households).length,
    barangays: ds.barangays.length,
    interviews: ds.interviews.length,
  };

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary"><FileBarChart className="h-4 w-4" /> Statistical reporting</div>
            <h1 className="mt-2 font-display text-2xl font-bold">CBMS Statistical Reports</h1>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">Generate the same report families for 2022 or 2024 without leaving the Reports page. The year selection is independent from the sidebar workspace so the result is always obvious.</p>
          </div>
          <div className="flex rounded-xl bg-muted p-1" aria-label="Report year">
            {[2022, 2024].map((y) => (
              <button key={y} onClick={() => setYear(y as DataYear)} className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition ${year === y ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                {y === 2022 ? <CalendarRange className="h-4 w-4" /> : <CalendarCheck2 className="h-4 w-4" />}
                CBMS {y}
              </button>
            ))}
          </div>
        </div>
      </header>

      

      <StatisticalProfilePanel profile={profile} profile2022={profile2022} profile2024={profile2024} showComparison={availableYears.includes(2022) && availableYears.includes(2024)} />

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Object.entries(datasetCounts).map(([label, count]) => <div key={label} className="rounded-xl border border-border bg-card p-4"><div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</div><div className="mt-1 text-xl font-black">{count.toLocaleString()}</div></div>)}
      </section>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <aside className="rounded-xl border border-border bg-card p-2">
          <div className="mb-2 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{year} report families</div>
          <div className="max-h-[60vh] overflow-y-auto">
            {REPORTS.map((r) => (
              <button key={r.id} onClick={() => setActive(r.id)} className={`block w-full rounded-md px-3 py-2 text-left text-xs leading-tight transition ${active === r.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                {r.title}
              </button>
            ))}
          </div>
        </aside>
        <div className="mb-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-[10px] leading-5 text-muted-foreground">
          <span className="font-bold text-foreground">Percentage manual:</span> start with the count in the row, divide by the <span className="font-semibold text-foreground">report total</span> shown above the table, then multiply by 100. Example: <span className="font-semibold text-foreground">category count ÷ report total × 100</span>. The TOTAL row is 100% when at least one record is present. “Households” reports use unique household records; “persons” reports use unique person records.
        </div>
        <DataTable
          title={`${report.title} — CBMS ${year}`}
          subtitle={`Total: ${result.total.toLocaleString()} ${report.source === "households" ? "households" : "persons"} · Share = category count ÷ report total × 100`}
          rows={rows}
          columns={[{ key: "category", label: "Category" }, { key: "count", label: "Count" }, { key: "percent", label: "Share" }, { key: "calculation", label: "How calculated" }]}
          searchable={false}
          pageSize={50}
        />
      </div>

      <footer className="border-t border-border pt-4 text-center text-[11px] text-muted-foreground">
        CBMS {year} report · {datasetCounts.persons.toLocaleString()} persons · {datasetCounts.households.toLocaleString()} households · Generated from the normalized local dataset.
      </footer>
    </div>
  );
}


function fmtCount(value: number | null) {
  return value === null ? "N/A" : value.toLocaleString();
}

function fmtPercent(value: number | null) {
  return value === null || !Number.isFinite(value) ? "N/A" : `${value.toFixed(1)}%`;
}

function fmtMoney(value: number | null) {
  return value === null || !Number.isFinite(value) ? "N/A" : `₱${Math.round(value).toLocaleString()}`;
}

function StatCard({ icon: Icon, label, value, detail }: { icon: any; label: string; value: string; detail?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
        <Icon className="h-4 w-4 text-primary" />
        {label}
      </div>
      <div className="mt-2 text-2xl font-black tracking-tight">{value}</div>
      {detail ? <div className="mt-1 text-[10px] leading-4 text-muted-foreground">{detail}</div> : null}
    </div>
  );
}

function StatisticalProfilePanel({
  profile,
  profile2022,
  profile2024,
  showComparison,
}: {
  profile: ReturnType<typeof buildStatisticalProfile>;
  profile2022: ReturnType<typeof buildStatisticalProfile>;
  profile2024: ReturnType<typeof buildStatisticalProfile>;
  showComparison: boolean;
}) {
  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary"><PieChart className="h-4 w-4" /> Statistical profile · CBMS {profile.year}</div>
            <h2 className="mt-1 font-display text-xl font-black">Population, agriculture, income and employment indicators</h2>
            <p className="mt-1 max-w-4xl text-xs leading-5 text-muted-foreground">All figures below are calculated from the actual normalized CBMS records loaded for {profile.year}. No sample values are hard-coded. Switch the CBMS year above to recalculate the profile from the other dataset. Farming and fisherfolk household percentages are separate indicators and may overlap when a household has both.</p>
          </div>
          <div className="rounded-lg border border-border/70 bg-muted/40 px-3 py-2 text-[10px] text-muted-foreground">Source: authorized CBMS {profile.year} JSON dataset loaded at runtime</div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Users} label="Total population" value={fmtCount(profile.population)} detail="Unique person records" />
        <StatCard icon={Home} label="Total households" value={fmtCount(profile.households)} detail="Unique household keys" />
        <StatCard icon={Wheat} label="Farming households" value={fmtCount(profile.farmingHouseholds)} detail={`${fmtPercent(profile.households ? (profile.farmingHouseholds / profile.households) * 100 : null)} · farming households ÷ total households`} />
        <StatCard icon={Fish} label="Fisherfolk households" value={fmtCount(profile.fisherfolkHouseholds)} detail={`${fmtPercent(profile.households ? (profile.fisherfolkHouseholds / profile.households) * 100 : null)} · fisherfolk households ÷ total households`} />
      </div>

      <AccountingGuide profile={profile} />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2"><Wheat className="h-5 w-5 text-primary" /><div><h3 className="font-display text-base font-bold">Population and households</h3><p className="text-[10px] text-muted-foreground">Household classification is derived from farmer/fisherfolk indicators on household members.</p></div></div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <MetricRow label="Farming households" value={fmtCount(profile.farmingHouseholds)} pct={fmtPercent(profile.households ? (profile.farmingHouseholds / profile.households) * 100 : null)} formula="Farming households ÷ total households × 100" />
            <MetricRow label="Fisherfolk households" value={fmtCount(profile.fisherfolkHouseholds)} pct={fmtPercent(profile.households ? (profile.fisherfolkHouseholds / profile.households) * 100 : null)} formula="Fisherfolk households ÷ total households × 100" />
            <MetricRow label="Mixed farmer + fisherfolk" value={fmtCount(profile.mixedAgriFishHouseholds)} pct={fmtPercent(profile.households ? (profile.mixedAgriFishHouseholds / profile.households) * 100 : null)} formula="Mixed households ÷ total households × 100" />
            <MetricRow label="Neither farming nor fisherfolk households" value={fmtCount(profile.nonAgriFishHouseholds)} pct={fmtPercent(profile.households ? (profile.nonAgriFishHouseholds / profile.households) * 100 : null)} formula="Neither-sector households ÷ total households × 100" detail="This is the non-farming/non-fisherfolk group. It is mutually exclusive with the other household composition categories, but the headline Farming and Fisherfolk indicators can overlap because mixed households are counted in both." />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2"><BriefcaseBusiness className="h-5 w-5 text-primary" /><div><h3 className="font-display text-base font-bold">Agricultural labor force</h3><p className="text-[10px] text-muted-foreground">15–64 population and labor-force indicators derived from person records.</p></div></div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <MetricRow label="Labor force, age 15–64" value={fmtCount(profile.laborForce1564)} />
            <MetricRow label="Agriculture & fishery labor" value={fmtCount(profile.agricultureFisheryLabor)} pct={fmtPercent(profile.agricultureFisheryShare)} formula="Age 15–64 agriculture/fishery persons in labor force ÷ labor force age 15–64 × 100" />
            <MetricRow label="Farmers" value={fmtCount(profile.farmers)} />
            <MetricRow label="Fisherfolk" value={fmtCount(profile.fisherfolk)} />
            <MetricRow label="Women in agriculture/fishery" value={profile.womenInAgriculture === null ? "N/A" : fmtPercent(profile.womenInAgriculture)} formula="Women in agriculture/fishery labor force ÷ all agriculture/fishery labor force × 100" />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2"><WalletCards className="h-5 w-5 text-primary" /><div><h3 className="font-display text-base font-bold">Poverty and income indicators</h3><p className="text-[10px] text-muted-foreground">Based on reported H06 total family income. Income rates are not official poverty-incidence estimates.</p></div></div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <MetricRow label="Reported household income" value={fmtCount(profile.reportedIncomeHouseholds)} />
            <MetricRow label="H06 income below ₱20,000" value={fmtCount(profile.lowIncome20k)} pct={fmtPercent(profile.lowIncome20kRate)} formula="Reported households with H06 < ₱20,000 ÷ households with numeric H06 income × 100" />
            <MetricRow label="Municipal poverty incidence" value="Not in source JSON" detail="The CBMS record set does not expose an official municipal poverty-incidence field; it is not estimated here." />
            <MetricRow label="Average agri/fish household income" value={fmtMoney(profile.avgAgriIncome)} detail="Reported households classified with farmer/fisherfolk member" />
            <MetricRow label="Average non-agri/fish household income" value={fmtMoney(profile.avgNonAgriIncome)} detail="Reported households without farmer/fisherfolk member" />
            <MetricRow label="Income gap" value={fmtPercent(profile.incomeGapRate)} formula="(Average non-agri/fish income − average agri/fish income) ÷ average non-agri/fish income × 100" />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2"><BriefcaseBusiness className="h-5 w-5 text-primary" /><div><h3 className="font-display text-base font-bold">Employment</h3><p className="text-[10px] text-muted-foreground">Employment, unemployment and underemployment derived from the person-level CBMS fields.</p></div></div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <MetricRow label="Total employed" value={fmtCount(profile.employed)} />
            <MetricRow label="Unemployment rate" value={fmtPercent(profile.unemploymentRate)} formula="Unemployed persons age 15–64 ÷ labor force age 15–64 × 100" />
            <MetricRow label="Underemployment rate" value={fmtPercent(profile.underemploymentRate)} formula="Underemployed employed persons ÷ employed persons × 100" />
            <MetricRow label="Agriculture & fisheries" value={fmtPercent(profile.sector.agricultureFishery)} formula="Employed agriculture/fishery persons ÷ all employed persons × 100" />
            <MetricRow label="Services & trade" value={fmtPercent(profile.sector.servicesTrade)} formula="Employed services/trade persons ÷ all employed persons × 100" />
            <MetricRow label="Industry, government & other" value={fmtPercent(profile.sector.industryGovernmentOther)} formula="Employed persons in residual group ÷ all employed persons × 100" />
          </div>
        </div>
      </div>

      {showComparison ? <YearComparisonPanel a={profile2022} b={profile2024} /> : null}

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-[10px] leading-5">
        <div className="flex items-center gap-2 text-xs font-bold"><Info className="h-4 w-4 text-primary" /> Percentage manual for this profile</div>
        <div className="mt-1 text-muted-foreground">For each percentage shown above, use the exact numerator named in the metric, divide by the exact denominator named in its “How” line, and multiply by 100. Counts are not percentages. Household percentages always use unique households as the denominator; person percentages use unique persons or the specifically stated labor/employed base.</div>
      </div>

      <div className="rounded-2xl border border-border bg-muted/25 p-4">
        <div className="flex items-center gap-2 text-xs font-bold"><TrendingDown className="h-4 w-4 text-primary" /> Data interpretation notes</div>
        <ul className="mt-2 space-y-1 text-[10px] leading-4 text-muted-foreground">
          {profile.notes.map((note) => <li key={note}>• {note}</li>)}
        </ul>
      </div>
    </section>
  );
}


function AccountingGuide({ profile }: { profile: ReturnType<typeof buildStatisticalProfile> }) {
  const h = profile.accounting.household;
  const p = profile.accounting.person;
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary"><ClipboardList className="h-4 w-4" /> Count & percentage guide</div>
          <h3 className="mt-1 font-display text-base font-black">How to reproduce the results</h3>
          <p className="mt-1 max-w-4xl text-[11px] leading-5 text-muted-foreground">Use the same numerator and denominator shown below when checking a report. Household counts and person counts are separate measures and should never be expected to match.</p>
        </div>
        <div className="rounded-lg border border-border/70 bg-muted/40 px-3 py-2 text-[10px] text-muted-foreground"><Info className="mr-1 inline h-3.5 w-3.5" /> Unique households: {h.total.toLocaleString()} · Unique persons: {p.total.toLocaleString()} · Unmatched person→HH keys: {h.withoutHouseholdRecord.toLocaleString()}</div>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-border/70 bg-muted/20 p-4 text-[10px] leading-5">
          <div className="font-bold text-foreground">Household-based</div>
          <div>Farming HH % = farming households ÷ total households × 100</div>
          <div>Fisherfolk HH % = fisherfolk households ÷ total households × 100</div>
          <div>Farming-only HH + fisherfolk-only HH + mixed HH + neither HH = total households</div>
          <div className="mt-2 text-muted-foreground">Mixed households are included in both headline Farming HH and Fisherfolk HH counts, so those two headline percentages can overlap.</div>
        </div>
        <div className="rounded-xl border border-border/70 bg-muted/20 p-4 text-[10px] leading-5">
          <div className="font-bold text-foreground">Person-based</div>
          <div>Farmer % = unique farmers ÷ unique persons × 100</div>
          <div>Fisherfolk % = unique fisherfolk ÷ unique persons × 100</div>
          <div>A person marked both is counted in both sector columns; the union counts that person once.</div>
          <div className="mt-2 text-muted-foreground">This is why Farmer/Fisherfolk person totals and Farming/Fisherfolk household totals are different numbers by design.</div>
        </div>
      </div>
      <div className="mt-3 rounded-xl border border-border/70 bg-background p-4 text-[10px] leading-5">
        <div className="font-bold text-foreground">Source-field rules</div>
        <div className="mt-1">CBMS 2024: use <code>e17_farmer</code> and <code>e18_fisherfolk</code> exactly as Yes/No sector fields. CBMS 2022: use the agriculture/fishery engagement fields from the HPQ import adapter (G12/G13/G14 for farming; G12/G15/G16 for fishery). Free-text occupation or industry is displayed for audit but does not override these sector fields.</div>
        <div className="mt-2 rounded-lg border border-primary/20 bg-primary/5 p-3"><span className="font-bold text-foreground">Verification rule:</span> never compare a person count directly against a household count. A household is counted once even when several household members are farmers/fisherfolk. A person is counted once in the person denominator. Mixed households/persons can appear in both headline sectors, while the reconciliation view reports the overlap separately.</div>
      </div>
    </section>
  );
}

function YearComparisonPanel({ a, b }: { a: ReturnType<typeof buildStatisticalProfile>; b: ReturnType<typeof buildStatisticalProfile> }) {
  const rows: Array<[string, string, string, string?]> = [
    ["Total population", fmtCount(a.population), fmtCount(b.population)],
    ["Total households", fmtCount(a.households), fmtCount(b.households)],
    ["Farming households", fmtCount(a.farmingHouseholds), fmtCount(b.farmingHouseholds), "Farming HH ÷ total HH × 100 when shown as a percentage"],
    ["Fisherfolk households", fmtCount(a.fisherfolkHouseholds), fmtCount(b.fisherfolkHouseholds), "Fisherfolk HH ÷ total HH × 100 when shown as a percentage"],
    ["Labor force, age 15–64", fmtCount(a.laborForce1564), fmtCount(b.laborForce1564)],
    ["Agriculture & fishery labor", `${fmtCount(a.agricultureFisheryLabor)}${a.agricultureFisheryShare === null ? "" : ` (${fmtPercent(a.agricultureFisheryShare)})`}`, `${fmtCount(b.agricultureFisheryLabor)}${b.agricultureFisheryShare === null ? "" : ` (${fmtPercent(b.agricultureFisheryShare)})`}`, "Age 15–64 agri/fishery labor ÷ age 15–64 labor force × 100"],
    ["Farmers", fmtCount(a.farmers), fmtCount(b.farmers), "Unique farmer persons ÷ unique persons × 100 when shown as a percentage"],
    ["Fisherfolk", fmtCount(a.fisherfolk), fmtCount(b.fisherfolk), "Unique fisherfolk persons ÷ unique persons × 100 when shown as a percentage"],
    ["Average agri/fish household income", fmtMoney(a.avgAgriIncome), fmtMoney(b.avgAgriIncome)],
    ["Average non-agri/fish household income", fmtMoney(a.avgNonAgriIncome), fmtMoney(b.avgNonAgriIncome)],
    ["H06 income below ₱20,000", `${fmtCount(a.lowIncome20k)}${a.lowIncome20kRate === null ? "" : ` (${fmtPercent(a.lowIncome20kRate)})`}`, `${fmtCount(b.lowIncome20k)}${b.lowIncome20kRate === null ? "" : ` (${fmtPercent(b.lowIncome20kRate)})`}`, "Households with H06 < ₱20,000 ÷ households with numeric H06 income × 100"],
    ["Women in agriculture/fishery", fmtPercent(a.womenInAgriculture), fmtPercent(b.womenInAgriculture), "Women in agriculture/fishery labor force ÷ all agriculture/fishery labor force × 100"],
    ["Income gap", fmtPercent(a.incomeGapRate), fmtPercent(b.incomeGapRate), "(Average non-agri/fish income − average agri/fish income) ÷ average non-agri/fish income × 100"],
    ["Total employed", fmtCount(a.employed), fmtCount(b.employed)],
    ["Unemployment rate", fmtPercent(a.unemploymentRate), fmtPercent(b.unemploymentRate), "Unemployed persons age 15–64 ÷ labor force age 15–64 × 100"],
    ["Underemployment rate", fmtPercent(a.underemploymentRate), fmtPercent(b.underemploymentRate), "Underemployed employed persons ÷ employed persons × 100"],
    ["Agriculture & fisheries employment share", fmtPercent(a.sector.agricultureFishery), fmtPercent(b.sector.agricultureFishery), "Employed agriculture/fishery persons ÷ all employed persons × 100"],
    ["Services & trade employment share", fmtPercent(a.sector.servicesTrade), fmtPercent(b.sector.servicesTrade), "Employed services/trade persons ÷ all employed persons × 100"],
    ["Industry, government & other employment share", fmtPercent(a.sector.industryGovernmentOther), fmtPercent(b.sector.industryGovernmentOther), "Residual employed group ÷ all employed persons × 100"],
  ];

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2"><CalendarCheck2 className="h-5 w-5 text-primary" /><div><h3 className="font-display text-base font-bold">CBMS 2022 vs 2024 statistical profile</h3><p className="text-[10px] text-muted-foreground">Both columns are computed from the respective year datasets loaded into the application.</p></div></div>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border/70">
        <table className="w-full min-w-[860px] text-xs">
          <thead><tr className="border-b border-border bg-muted/40"><th className="px-3 py-2 text-left font-bold">Indicator</th><th className="px-3 py-2 text-right font-bold">CBMS 2022</th><th className="px-3 py-2 text-right font-bold">CBMS 2024</th><th className="px-3 py-2 text-left font-bold">How / audit formula</th></tr></thead>
          <tbody>{rows.map(([label, left, right, formula]) => <tr key={label} className="border-b border-border/50 last:border-0"><td className="px-3 py-2.5 text-left font-medium text-muted-foreground">{label}</td><td className="px-3 py-2.5 text-right font-bold">{left}</td><td className="px-3 py-2.5 text-right font-bold">{right}</td><td className="px-3 py-2.5 text-left text-[10px] text-muted-foreground">{formula ?? "Source value / count; no percentage formula."}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}

function MetricRow({ label, value, pct, detail, formula }: { label: string; value: string; pct?: string; detail?: string; formula?: string }) {
  return (
    <div className="rounded-xl border border-border/70 bg-muted/20 p-3">
      <div className="text-[10px] font-semibold leading-4 text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-baseline justify-between gap-2"><span className="text-lg font-black">{value}</span>{pct ? <span className="text-[10px] font-bold text-primary">{pct}</span> : null}</div>
      {formula ? <div className="mt-1 text-[9px] leading-4 text-muted-foreground">How: {formula}</div> : null}
      {detail ? <div className="mt-1 text-[9px] leading-4 text-muted-foreground">{detail}</div> : null}
    </div>
  );
}
