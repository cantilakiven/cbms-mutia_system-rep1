import fs from "node:fs";
import path from "node:path";

const releaseDir = path.resolve("release");
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

if (!fs.existsSync(releaseDir)) {
  throw new Error("release/ does not exist. Run the Windows release build first.");
}

const version = pkg.version;
const expectedExe = `CBMS-Insights-Setup-${version}.exe`;
const expectedBlockmap = `${expectedExe}.blockmap`;
const files = fs.readdirSync(releaseDir, { withFileTypes: true })
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name);

const installers = files.filter((name) => /^CBMS-Insights-Setup-.*\.exe$/i.test(name));
if (installers.length !== 1) {
  throw new Error(`Expected exactly one CBMS Insights installer in release/, found ${installers.length}: ${installers.join(", ") || "<none>"}`);
}

const [exe] = installers;
if (exe !== expectedExe) {
  throw new Error(`Installer name ${exe} does not match package.json version ${version}. Expected ${expectedExe}.`);
}

if (!files.includes("latest.yml")) {
  throw new Error("Missing latest.yml updater metadata.");
}
if (!files.includes(expectedBlockmap)) {
  throw new Error(`Missing ${expectedBlockmap} updater blockmap.`);
}

const exeStats = fs.statSync(path.join(releaseDir, exe));
const blockmapStats = fs.statSync(path.join(releaseDir, expectedBlockmap));
if (exeStats.size < 1024 * 1024) {
  throw new Error(`Installer ${exe} is unexpectedly small (${exeStats.size} bytes).`);
}
if (blockmapStats.size < 100) {
  throw new Error(`Blockmap ${expectedBlockmap} is unexpectedly small (${blockmapStats.size} bytes).`);
}

const ymlText = fs.readFileSync(path.join(releaseDir, "latest.yml"), "utf8");
const versionMatch = ymlText.match(/^version:\s*([^\s]+)\s*$/m);
if (versionMatch?.[1]?.trim() !== version) {
  throw new Error(`latest.yml version ${versionMatch?.[1] ?? "<missing>"} does not match package.json ${version}.`);
}

const referencedPaths = [];
for (const match of ymlText.matchAll(/^(?:path|url):\s*["']?([^"'\r\n]+)["']?\s*$/gm)) {
  referencedPaths.push(match[1].trim());
}
const decodedPaths = referencedPaths.map((value) => {
  try { return decodeURIComponent(value); } catch { return value; }
});
if (!decodedPaths.includes(expectedExe)) {
  throw new Error(`latest.yml does not reference ${expectedExe}. References: ${decodedPaths.join(", ") || "<none>"}`);
}

if (!/^sha512:\s*\S+/m.test(ymlText)) {
  throw new Error("latest.yml is missing the installer SHA-512 metadata.");
}

console.log(JSON.stringify({
  ok: true,
  version,
  installer: exe,
  installerBytes: exeStats.size,
  blockmap: expectedBlockmap,
  blockmapBytes: blockmapStats.size,
  metadata: "latest.yml",
}, null, 2));
