import fs from "node:fs";

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const lock = JSON.parse(fs.readFileSync("package-lock.json", "utf8"));
const packages = lock.packages ?? {};
const failures = [];

const expected = {
  vite: "8.3.0",
  pluginReact: "6.1.1",
  electron: "44.3.0",
  rolldown: "1.2.9",
  lightningcss: "1.33.0",
  pluginutils: "1.0.1",
};

if (pkg.version !== "1.4.14") failures.push(`Expected release version 1.4.14, found ${pkg.version}.`);
if (pkg.devDependencies?.vite !== "^8.3.0") failures.push(`package.json Vite range is ${pkg.devDependencies?.vite}, expected ^8.3.0.`);
if (pkg.devDependencies?.["@vitejs/plugin-react"] !== "^6.1.1") failures.push(`package.json @vitejs/plugin-react range is ${pkg.devDependencies?.["@vitejs/plugin-react"]}, expected ^6.1.1.`);
if (pkg.devDependencies?.electron !== "^44.3.0") failures.push(`package.json Electron range is ${pkg.devDependencies?.electron}, expected ^44.3.0.`);

const actual = {
  vite: packages["node_modules/vite"]?.version,
  pluginReact: packages["node_modules/@vitejs/plugin-react"]?.version,
  electron: packages["node_modules/electron"]?.version,
  rolldown: packages["node_modules/rolldown"]?.version,
  lightningcss: packages["node_modules/lightningcss"]?.version,
  pluginutils: packages["node_modules/@rolldown/pluginutils"]?.version,
};
for (const [name, version] of Object.entries(expected)) {
  if (actual[name] !== version) failures.push(`Lockfile ${name} is ${actual[name] ?? "missing"}, expected ${version}.`);
}

const vite = packages["node_modules/vite"];
if (vite?.dependencies?.rolldown !== "~1.2.9") failures.push("Vite must resolve Rolldown from the ~1.2.9 line.");
if (vite?.dependencies?.lightningcss !== "^1.33.0") failures.push("Vite must resolve Lightning CSS from the ^1.33.0 line.");
if (packages["node_modules/@vitejs/plugin-react"]?.peerDependencies?.vite !== "^8.0.0") failures.push("plugin-react 6.1.1 must declare Vite 8 compatibility.");
if (packages["node_modules/electron"]?.engines?.node !== ">= 22.12.0") failures.push("Electron 44 requires the Node 22.12+ engine contract.");
if (!packages["node_modules/electron/node_modules/@types/node"]?.version) failures.push("Electron's nested Node 24 type dependency is missing from the lockfile.");

const publish = pkg.build?.publish;
if (publish?.provider !== "github" || publish?.owner !== "cantilakiven" || publish?.repo !== "cbms-mutia_system-rep1") {
  failures.push("GitHub publish configuration does not match cantilakiven/cbms-mutia_system-rep1.");
}
if (pkg.build?.win?.target?.[0]?.target !== "nsis") failures.push("Windows release target must remain NSIS.");
if (pkg.dependencies?.["serve-handler"]) failures.push("Unused serve-handler must not be shipped.");
if (pkg.build?.electronFuses?.enableCookieEncryption !== true) failures.push("Electron cookie encryption fuse must be enabled.");
if (pkg.build?.electronFuses?.enableEmbeddedAsarIntegrityValidation !== true) failures.push("Electron ASAR integrity validation fuse must be enabled.");
if (pkg.build?.electronFuses?.onlyLoadAppFromAsar !== true) failures.push("Electron onlyLoadAppFromAsar fuse must be enabled.");
if (pkg.build?.electronFuses?.enableNodeOptionsEnvironmentVariable !== false) failures.push("Electron NODE_OPTIONS fuse must be disabled for production.");
if (pkg.build?.electronFuses?.enableNodeCliInspectArguments !== false) failures.push("Electron Node inspector fuse must be disabled for production.");
if (pkg.build?.electronFuses?.runAsNode !== true) failures.push("runAsNode must remain enabled because main.cjs uses process.fork().");

if (failures.length) {
  console.error("Dependency/release contract validation failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Dependency contract passed for CBMS Insights ${pkg.version}.`);
console.log(JSON.stringify({ expected, actual, github: `${publish.owner}/${publish.repo}` }, null, 2));
