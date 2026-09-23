import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const failures = [];

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git', 'release', '.output', 'dist', 'docs/archive'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

for (const file of walk(root)) {
  const rel = path.relative(root, file).replaceAll('\\', '/');
  const lower = rel.toLowerCase();
  if (/\.(rdata|rda|rds)$/.test(lower)) failures.push(`Raw R data file present: ${rel}`);
  if (/(?:\.exe|\.blockmap)$|(?:^|\/)latest\.yml$/.test(lower)) failures.push(`Generated release artifact inside source tree: ${rel}`);
  if ((/(?:^|\/)cbms_.*\.json$/.test(lower) || /097208.*\.json$/.test(lower)) && !lower.endsWith('package.json')) {
    failures.push(`Raw CBMS JSON dataset appears inside source tree: ${rel}`);
  }
  if (/\.(p12|pfx|pem|key)$/.test(lower)) failures.push(`Private/signing key material present: ${rel}`);
}

const eulaCandidates = walk(root).filter((f) => /(?:^|\/)(eula|license)(?:_[a-z-]+)?\.(txt|rtf|html)$/i.test(path.relative(root, f).replaceAll('\\','/')));
if (eulaCandidates.length !== 1 || eulaCandidates[0] !== path.join(root, 'docs', 'EULA.txt')) {
  failures.push(`Expected exactly one installer EULA at docs/EULA.txt; found ${eulaCandidates.map((f) => path.relative(root,f)).join(', ') || 'none'}`);
}

const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
if (packageJson.build?.nsis?.license !== 'docs/EULA.txt') failures.push('package.json must reference docs/EULA.txt as the only NSIS license.');

const mainSource = fs.readFileSync(path.join(root, 'main.cjs'), 'utf8');
const preloadSource = fs.readFileSync(path.join(root, 'preload.cjs'), 'utf8');

const exportLogSource = fs.readFileSync(path.join(root, 'src', 'lib', 'export-log.ts'), 'utf8');
if (!exportLogSource.includes('redactForLocalStorage') || !exportLogSource.includes('Never duplicate export passwords')) failures.push('Export passwords must not be persisted into renderer localStorage.');
if (/debug-read-file|electronDebug/.test(mainSource + '\n' + preloadSource)) failures.push('Arbitrary renderer-exposed file-read IPC must not exist.');
if (!mainSource.includes('sandbox: true') || !mainSource.includes('contextIsolation: true') || !mainSource.includes('nodeIntegration: false')) failures.push('Electron renderer hardening flags are incomplete.');
if (!mainSource.includes('setPermissionRequestHandler') || !mainSource.includes('setPermissionCheckHandler')) failures.push('Electron permission handlers are missing.');
if (!mainSource.includes('will-navigate') || !mainSource.includes('setWindowOpenHandler')) failures.push('Navigation/window-open restrictions are missing.');
if (!mainSource.includes('Unauthorized IPC sender')) failures.push('IPC sender validation is missing.');
if (!mainSource.includes('cbms_session') || !mainSource.includes('APP_CSP') || !mainSource.includes('frame-ancestors')) failures.push('Protected local-origin proxy/CSP hardening is incomplete.');
if (!mainSource.includes('will-attach-webview')) failures.push('WebView creation must be explicitly denied.');
if (!mainSource.includes('encryptExportLog') || !mainSource.includes('aes-256-gcm')) failures.push('Desktop Export Log must be encrypted at rest with AES-256-GCM.');
if (!mainSource.includes('getOrCreateExportLogKey') || !mainSource.includes('safeStorage.encryptString')) failures.push('Export-log key must be protected with Electron safeStorage when available.');
if (packageJson.dependencies?.['serve-handler']) failures.push('Unused serve-handler dependency must not be shipped.');
if (packageJson.build?.electronFuses?.enableCookieEncryption !== true || packageJson.build?.electronFuses?.enableEmbeddedAsarIntegrityValidation !== true || packageJson.build?.electronFuses?.onlyLoadAppFromAsar !== true) failures.push('Production Electron fuses are incomplete.');

let tracked = [];
try { tracked = execFileSync('git', ['ls-files'], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).split(/\r?\n/).filter(Boolean); } catch {}
for (const rel of tracked) {
  const lower = rel.toLowerCase();
  if (/\.(rdata|rda|rds)$/.test(lower) || /(?:^|\/)cbms_.*\.json$/.test(lower) || /097208.*\.json$/.test(lower)) failures.push(`Tracked raw dataset file: ${rel}`);
  if (/\.(pfx|p12|pem|key)$/.test(lower)) failures.push(`Tracked credential/key file: ${rel}`);
}

const eulaText = fs.readFileSync(path.join(root, 'docs', 'EULA.txt'), 'utf8');
if (!/AES-256/.test(eulaText)) failures.push('EULA must include AES-256 export protection language.');
if (/PSA.*endorse/i.test(eulaText) && !/not.*official.*PSA|not.*affiliated.*PSA/i.test(eulaText)) failures.push('EULA must clearly state non-affiliation with PSA.');

if (failures.length) {
  console.error('Repository safety validation failed:\n');
  for (const f of failures) console.error(`- ${f}`);
  process.exit(1);
}

console.log('Repository safety validation passed.');
console.log('No raw CBMS JSON/RData files, release binaries, or private key material were found in the source tree.');
console.log('Exactly one installer EULA is configured at docs/EULA.txt.');
