import fs from "node:fs";

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const lock = JSON.parse(fs.readFileSync("package-lock.json", "utf8"));
const lockPackages = lock.packages ?? {};
const failures = [];

if (pkg.version !== "1.4.17") {
  failures.push(`Expected stable release version 1.4.16, found ${pkg.version}.`);
}
if (lock.version !== pkg.version || lockPackages[""]?.version !== pkg.version) {
  failures.push(`package-lock.json version must exactly match package.json (${pkg.version}).`);
}
if (pkg.engines?.node !== ">=24.20.0 <25") {
  failures.push(`Node.js engine must be >=24.20.0 <25 for the current LTS build baseline.`);
}

const publish = pkg.build?.publish;
if (
  publish?.provider !== "github" ||
  publish?.owner !== "cantilakiven" ||
  publish?.repo !== "cbms-mutia_system-rep1"
) {
  failures.push("GitHub publish configuration must target cantilakiven/cbms-mutia_system-rep1.");
}

if (pkg.build?.win?.target?.[0]?.target !== "nsis") {
  failures.push("Windows release target must remain NSIS.");
}

const critical = [
  ["electron", "devDependencies"],
  ["electron-builder", "devDependencies"],
  ["vite", "devDependencies"],
  ["@vitejs/plugin-react", "devDependencies"],
  ["electron-updater", "dependencies"],
  ["@tanstack/react-start", "dependencies"],
];

for (const [name, section] of critical) {
  if (!pkg[section]?.[name]) failures.push(`Missing critical package declaration: ${name}.`);
  const resolved = lockPackages[`node_modules/${name}`]?.version;
  if (!resolved) failures.push(`package-lock.json is missing resolved package ${name}.`);
}

if (pkg.build?.electronFuses) {
  const fuses = pkg.build.electronFuses;
  if (fuses.enableEmbeddedAsarIntegrityValidation !== true) failures.push("ASAR integrity validation fuse must remain enabled.");
  if (fuses.onlyLoadAppFromAsar !== true) failures.push("onlyLoadAppFromAsar fuse must remain enabled.");
  if (fuses.enableNodeOptionsEnvironmentVariable !== false) failures.push("NODE_OPTIONS environment-variable fuse must remain disabled.");
  if (fuses.enableNodeCliInspectArguments !== false) failures.push("Node CLI inspector fuse must remain disabled.");
}

if (failures.length) {
  console.error("Dependency/release contract validation failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

const resolved = Object.fromEntries(
  critical.map(([name]) => [name, lockPackages[`node_modules/${name}`]?.version]),
);

console.log(`Dependency/release contract passed for CBMS Insights ${pkg.version}.`);
console.log(JSON.stringify({ version: pkg.version, github: `${publish.owner}/${publish.repo}`, resolved }, null, 2));
