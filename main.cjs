const { app, BrowserWindow, shell, ipcMain, dialog, session } = require("electron");
const { autoUpdater } = require("electron-updater");
const { fork } = require("child_process");
const path = require("path");
const http = require("http");
const net = require("net");
const fs = require("fs");
const crypto = require("crypto");

const ALLOWED_SETTINGS = new Set(["localdata.installed-at", "localdata.monthly-checkin.ack"]);
const MAX_EXPORT_BYTES = 100 * 1024 * 1024;
const MAX_PRINT_HTML_BYTES = 25 * 1024 * 1024;
const ALLOWED_EXTERNAL_URLS = new Set(["https://www.facebook.com/hello.kwekwe"]);

function isTrustedRenderer(event) {
  try {
    if (!event?.sender || !mainWindow || mainWindow.isDestroyed()) return false;
    if (event.sender !== mainWindow.webContents) return false;
    if (!appOrigin) return false;
    const currentUrl = event.sender.getURL();
    if (!currentUrl) return false;
    return new URL(currentUrl).origin === appOrigin;
  } catch {
    return false;
  }
}

function secureIpcHandle(channel, handler) {
  ipcMain.handle(channel, async (event, ...args) => {
    if (!isTrustedRenderer(event)) throw new Error(`Unauthorized IPC sender for ${channel}.`);
    return handler(event, ...args);
  });
}

function isAllowedExternalUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" && ALLOWED_EXTERNAL_URLS.has(parsed.href);
  } catch {
    return false;
  }
}

let serverProcess = null;
let mainWindow = null;
let appOrigin = "";

// ── Persistent Storage (AppData/Roaming/CBMS Insights) ────
// Fixed app name so the data folder is always the same across versions/builds.
app.setName("CBMS Insights");
try {
  app.setPath("userData", path.join(app.getPath("appData"), "CBMS Insights"));
} catch (err) {
  console.error("Failed to set userData path:", err);
}

function migrateLegacyUserData() {
  try {
    const appData = app.getPath("appData");
    const currentPath = path.join(appData, "CBMS Insights");
    const legacyFolder = String.fromCharCode(...[77,117,116,105,97,76,121,116,105,99,115]);
    const legacyPath = path.join(appData, legacyFolder);
    if (currentPath === legacyPath || !fs.existsSync(legacyPath) || fs.existsSync(currentPath)) return;
    fs.mkdirSync(currentPath, { recursive: true });
    for (const entry of fs.readdirSync(legacyPath, { withFileTypes: true })) {
      const from = path.join(legacyPath, entry.name);
      const to = path.join(currentPath, entry.name);
      if (entry.isDirectory()) fs.cpSync(from, to, { recursive: true, force: false });
      else if (!fs.existsSync(to)) fs.copyFileSync(from, to);
    }
  } catch (err) {
    console.warn("Legacy local data migration skipped:", err);
  }
}

migrateLegacyUserData();

function getSaveFolder() {
  const saveFolder = path.join(app.getPath("userData"), "saves");
  if (!fs.existsSync(saveFolder)) {
    fs.mkdirSync(saveFolder, { recursive: true });
  }
  return saveFolder;
}

function getLogFilePath() {
  return path.join(getSaveFolder(), "export-log.json");
}

function getSettingsFilePath() {
  return path.join(getSaveFolder(), "settings.json");
}

function readJsonFile(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    const data = fs.readFileSync(filePath, "utf-8");
    if (!data.trim()) return fallback;
    return JSON.parse(data);
  } catch (err) {
    console.error("Failed to read", filePath, err);
    return fallback;
  }
}

function writeJsonFileAtomic(filePath, value) {
  const tmp = `${filePath}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(value, null, 2), "utf-8");
  fs.renameSync(tmp, filePath);
}

// ── Local authentication security ───────────────────────
// The PIN is only 6 digits (1,000,000 possible values), so the strongest practical
// design is: OS-protected application key + AES-256-GCM at rest + memory-hard scrypt
// verification + strict persistent online lockout.
const AUTH_SCRYPT = { N: 131072, r: 8, p: 1, keylen: 32 };
const MAX_WRONG_ATTEMPTS = 3;
const LOCKOUT_MS = 10 * 60 * 60 * 1000; // 10 hours
const AUTH_BLOB_VERSION = 2;

function getSettings() {
  return readJsonFile(getSettingsFilePath(), {}) || {};
}

function saveSettings(settings) {
  writeJsonFileAtomic(getSettingsFilePath(), settings || {});
}

function getLegacyAuth(settings) {
  const auth = settings?.auth;
  return auth && typeof auth === "object" ? auth : {};
}

function getAuthKeyFilePath() {
  return path.join(getSaveFolder(), "auth.key");
}

function isSafeStorageAvailable() {
  try {
    const { safeStorage } = require("electron");
    return app.isReady() && safeStorage.isEncryptionAvailable();
  } catch {
    return false;
  }
}

function getStoredAuthKeyCandidates() {
  const settings = getSettings();
  const candidates = [];
  const seen = new Set();

  const add = (key) => {
    if (!Buffer.isBuffer(key) || key.length !== 32) return;
    const id = key.toString("hex");
    if (seen.has(id)) return;
    seen.add(id);
    candidates.push(key);
  };

  // Preferred: OS-protected key (Electron safeStorage / Windows DPAPI).
  if (settings.authKey && typeof settings.authKey === "string" && isSafeStorageAvailable()) {
    try {
      const { safeStorage } = require("electron");
      const keyB64 = safeStorage.decryptString(Buffer.from(settings.authKey, "base64"));
      add(Buffer.from(keyB64, "base64"));
    } catch (err) {
      console.warn("Unable to decrypt OS-protected authentication key; trying fallback key.", err);
    }
  }

  // Development fallback: preserve a stable key across electron:dev restarts.
  const keyPath = getAuthKeyFilePath();
  try {
    if (fs.existsSync(keyPath)) {
      add(Buffer.from(fs.readFileSync(keyPath, "utf8").trim(), "base64"));
    }
  } catch (err) {
    console.error("Failed to read persistent authentication key:", err);
  }

  return candidates;
}

function getOrCreateProtectedKey({ allowCreate = true } = {}) {
  const settings = getSettings();
  const candidates = getStoredAuthKeyCandidates();
  if (candidates.length) return candidates[0];
  if (!allowCreate) return null;

  const key = crypto.randomBytes(32);
  const keyPath = getAuthKeyFilePath();
  try {
    fs.writeFileSync(keyPath, key.toString("base64"), { encoding: "utf8", mode: 0o600 });
  } catch (err) {
    console.error("Failed to persist authentication key:", err);
  }

  if (isSafeStorageAvailable()) {
    try {
      const { safeStorage } = require("electron");
      settings.authKey = safeStorage.encryptString(key.toString("base64")).toString("base64");
      saveSettings(settings);
    } catch (err) {
      console.warn("Failed to OS-protect authentication key; persistent key file will be used.", err);
    }
  }
  return key;
}

function decryptAuthBlob(blob) {
  if (typeof blob !== "string" || !blob) return null;
  try {
    const packed = Buffer.from(blob, "base64");
    if (packed.length < 1 + 12 + 16 || packed[0] !== AUTH_BLOB_VERSION) return null;
    const iv = packed.subarray(1, 13);
    const tag = packed.subarray(13, 29);
    const ciphertext = packed.subarray(29);

    // Critical recovery behavior: try every recoverable key before declaring the
    // authentication record unreadable. This handles upgrades from older builds
    // where the OS-protected key and dev fallback key could temporarily differ.
    for (const key of getStoredAuthKeyCandidates()) {
      try {
        const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
        decipher.setAuthTag(tag);
        const plain = Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8");
        const record = JSON.parse(plain);
        if (record && typeof record === "object") return record;
      } catch {
        // Try the next recoverable key.
      }
    }

    return null;
  } catch {
    return null;
  }
}

function encryptAuthRecord(record) {
  const key = getOrCreateProtectedKey({ allowCreate: true });
  if (!key) throw new Error("Authentication encryption key is unavailable.");
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const ciphertext = Buffer.concat([cipher.update(JSON.stringify(record), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([Buffer.from([AUTH_BLOB_VERSION]), iv, tag, ciphertext]).toString("base64");
}

function migrateLegacyAuth(settings) {
  const legacy = getLegacyAuth(settings);
  if (!legacy.salt || !legacy.hash) return null;
  const record = {
    salt: legacy.salt,
    hash: legacy.hash,
    updatedAt: legacy.updatedAt || new Date().toISOString(),
    failedAttempts: 0,
    lockedUntil: 0,
  };
  settings.authBlob = encryptAuthRecord(record);
  delete settings.auth;
  saveSettings(settings);
  return record;
}

function getAuthRecord() {
  const settings = getSettings();
  if (settings.authBlob) {
    const record = decryptAuthBlob(settings.authBlob);
    return record || null;
  }
  return migrateLegacyAuth(settings) || {};
}

function saveAuthRecord(record) {
  const settings = getSettings();
  settings.authBlob = encryptAuthRecord(record);
  delete settings.auth;
  saveSettings(settings);
}

function hashPin(pin, saltHex) {
  return crypto.scryptSync(String(pin), Buffer.from(saltHex, "hex"), AUTH_SCRYPT.keylen, {
    N: AUTH_SCRYPT.N,
    r: AUTH_SCRYPT.r,
    p: AUTH_SCRYPT.p,
    maxmem: 256 * 1024 * 1024,
  }).toString("hex");
}

function verifyPin(pin, auth) {
  if (!auth || !auth.salt || !auth.hash) return false;
  try {
    const candidate = Buffer.from(hashPin(pin, auth.salt), "hex");
    const expected = Buffer.from(auth.hash, "hex");
    return candidate.length === expected.length && crypto.timingSafeEqual(candidate, expected);
  } catch { return false; }
}

secureIpcHandle("get-export-log", () => {
  const entries = readJsonFile(getLogFilePath(), []);
  return Array.isArray(entries) ? entries : [];
});

secureIpcHandle("save-export-log", (_, entries, replace) => {
  try {
    const list = Array.isArray(entries) ? entries : [];
    if (replace) {
      writeJsonFileAtomic(getLogFilePath(), list);
      return true;
    }
    // Merge with whatever is already on disk so no logged export is ever lost.
    const existing = readJsonFile(getLogFilePath(), []);
    const byId = new Map();
    for (const e of [...(Array.isArray(existing) ? existing : []), ...list]) {
      if (e && e.id) byId.set(e.id, e);
    }
    const merged = Array.from(byId.values())
      .sort((a, b) => String(b.timestamp || "").localeCompare(String(a.timestamp || "")))
      .slice(0, 5000);
    writeJsonFileAtomic(getLogFilePath(), merged);
    return true;
  } catch (err) {
    console.error("Failed to save log:", err);
    return false;
  }
});

secureIpcHandle("delete-export-log", () => {
  try {
    writeJsonFileAtomic(getLogFilePath(), []);
    return true;
  } catch (err) {
    console.error("Failed to clear log:", err);
    return false;
  }
});

secureIpcHandle("get-setting", (_, key) => {
  const settingKey = String(key || "");
  if (!ALLOWED_SETTINGS.has(settingKey)) throw new Error("Requested setting is not readable.");
  const settings = readJsonFile(getSettingsFilePath(), {});
  return settings && typeof settings === "object" ? settings[settingKey] ?? null : null;
});

secureIpcHandle("get-auth-state", () => {
  const settings = getSettings();
  const auth = getAuthRecord();
  const now = Date.now();
  if (settings.authBlob && !auth) {
    return {
      configured: true,
      valid: false,
      storageError: true,
      error: "The saved authentication record could not be decrypted. The system is refusing access rather than disabling the PIN."
    };
  }
  const lockedUntil = Number(auth.lockedUntil || 0);
  return {
    configured: Boolean(auth.salt && auth.hash),
    updatedAt: auth.updatedAt || null,
    failedAttempts: Number(auth.failedAttempts || 0),
    lockedUntil: lockedUntil > now ? lockedUntil : 0,
    lockoutActive: lockedUntil > now,
    remainingMs: lockedUntil > now ? lockedUntil - now : 0,
    maxWrongAttempts: MAX_WRONG_ATTEMPTS,
    lockoutHours: 10,
  };
});

secureIpcHandle("set-login-pin", (_, pin, currentPin) => {
  const nextPin = String(pin || "");
  const settings = getSettings();
  const existing = getAuthRecord();
  if (settings.authBlob && !existing) {
    return { ok: false, error: "The existing security record cannot be decrypted. Refusing to replace it automatically." };
  }
  if (!/^\d{6}$/.test(nextPin)) return { ok: false, error: "PIN must be exactly 6 digits." };
  const now = Date.now();
  if (existing.salt && existing.hash) {
    if (Number(existing.lockedUntil || 0) > now) {
      return { ok: false, error: "PIN changes are locked until the security lockout ends.", lockedUntil: existing.lockedUntil };
    }
    if (!verifyPin(String(currentPin || ""), existing)) {
      return { ok: false, error: "Current PIN is incorrect." };
    }
  }
  const salt = crypto.randomBytes(16).toString("hex");
  saveAuthRecord({
    salt,
    hash: hashPin(nextPin, salt),
    updatedAt: new Date().toISOString(),
    failedAttempts: 0,
    lockedUntil: 0,
  });
  return { ok: true };
});

secureIpcHandle("verify-login-pin", (_, pin) => {
  const settings = getSettings();
  const auth = getAuthRecord();
  if (settings.authBlob && !auth) {
    return { configured: true, valid: false, storageError: true, error: "The saved security record cannot be decrypted. Access is blocked." };
  }
  if (!auth.salt || !auth.hash) return { configured: false, valid: true };
  const now = Date.now();
  const lockedUntil = Number(auth.lockedUntil || 0);
  if (lockedUntil > now) {
    return {
      configured: true,
      valid: false,
      locked: true,
      lockedUntil,
      remainingMs: lockedUntil - now,
      failedAttempts: MAX_WRONG_ATTEMPTS,
      attemptsRemaining: 0,
    };
  }

  // Clear an expired lockout before accepting a new attempt.
  if (lockedUntil > 0) {
    auth.lockedUntil = 0;
    auth.failedAttempts = 0;
    saveAuthRecord(auth);
  }

  const valid = /^\d{6}$/.test(String(pin || "")) && verifyPin(String(pin || ""), auth);
  if (valid) {
    auth.failedAttempts = 0;
    auth.lockedUntil = 0;
    saveAuthRecord(auth);
    return { configured: true, valid: true, failedAttempts: 0, attemptsRemaining: MAX_WRONG_ATTEMPTS };
  }

  auth.failedAttempts = Number(auth.failedAttempts || 0) + 1;
  if (auth.failedAttempts >= MAX_WRONG_ATTEMPTS) {
    auth.lockedUntil = now + LOCKOUT_MS;
    saveAuthRecord(auth);
    return {
      configured: true,
      valid: false,
      locked: true,
      lockedUntil: auth.lockedUntil,
      remainingMs: LOCKOUT_MS,
      failedAttempts: MAX_WRONG_ATTEMPTS,
      attemptsRemaining: 0,
    };
  }

  saveAuthRecord(auth);
  return {
    configured: true,
    valid: false,
    locked: false,
    failedAttempts: auth.failedAttempts,
    attemptsRemaining: MAX_WRONG_ATTEMPTS - auth.failedAttempts,
  };
});

secureIpcHandle("save-setting", (_, key, value) => {
  try {
    const settingKey = String(key || "");
    if (!ALLOWED_SETTINGS.has(settingKey)) throw new Error("Requested setting is not writable.");

    if (settingKey === "localdata.installed-at") {
      const numberValue = Number(value);
      if (!Number.isFinite(numberValue) || numberValue < 0) throw new Error("Invalid installed-at setting.");
      value = numberValue;
    } else {
      if (value !== null && typeof value !== "string") throw new Error("Invalid check-in setting.");
      value = String(value || "").slice(0, 64);
    }

    const settings = readJsonFile(getSettingsFilePath(), {}) || {};
    settings[settingKey] = value;
    writeJsonFileAtomic(getSettingsFilePath(), settings);
    return true;
  } catch (err) {
    console.error("Failed to save setting:", err);
    return false;
  }
});

secureIpcHandle("get-user-data-path", () => app.getPath("userData"));
secureIpcHandle("get-export-log-path", () => getLogFilePath());
secureIpcHandle("get-download-path", (_, filename) => path.join(app.getPath("downloads"), path.basename(String(filename || "export"))));
secureIpcHandle("save-export-file", async (event, payload) => {
  try {
    const filename = path.basename(String(payload?.filename || "export")).slice(0, 240);
    const data = payload?.data;
    if (!data) return { canceled: true };
    const buffer = Buffer.from(data instanceof ArrayBuffer ? new Uint8Array(data) : data);
    if (buffer.byteLength === 0) return { canceled: true };
    if (buffer.byteLength > MAX_EXPORT_BYTES) return { canceled: false, error: "The export is too large to save safely (100 MB limit)." };
    const parent = BrowserWindow.fromWebContents(event.sender);
    const result = await dialog.showSaveDialog(parent || undefined, {
      title: "Save exported file",
      defaultPath: path.join(app.getPath("downloads"), filename),
      buttonLabel: "Save",
      properties: ["createDirectory", "showOverwriteConfirmation"],
    });
    if (result.canceled || !result.filePath) return { canceled: true };
    fs.writeFileSync(result.filePath, buffer);
    return { canceled: false, filePath: result.filePath };
  } catch (err) {
    console.error("Failed to save export file:", err);
    return { canceled: false, error: err instanceof Error ? err.message : "Unable to save file." };
  }
});
secureIpcHandle("get-printers", async (event) => {
  try {
    const printers = await event.sender.getPrintersAsync();
    return printers.map((printer) => ({
      name: printer.name,
      displayName: printer.displayName,
      description: printer.description || "",
      status: printer.status,
      isDefault: Boolean(printer.isDefault),
    })).sort((a, b) => Number(b.isDefault) - Number(a.isDefault) || String(a.displayName || a.name).localeCompare(String(b.displayName || b.name)));
  } catch (err) {
    console.error("Failed to get printers:", err);
    return [];
  }
});

secureIpcHandle("print-html", async (event, payload) => {
  const rawHtml = payload && typeof payload.html === "string" ? payload.html : "";
  const printerName = payload && typeof payload.printerName === "string" ? payload.printerName : "";
  const options = payload && payload.options && typeof payload.options === "object" ? payload.options : {};
  const paperSizes = {
    folio: { width: 215900, height: 330200 },
    a4: { width: 210000, height: 297000 },
    letter: { width: 215900, height: 279400 },
    legal: { width: 215900, height: 355600 },
    a3: { width: 297000, height: 420000 },
  };
  const requestedPaper = typeof options.paperSize === "string" && paperSizes[options.paperSize] ? options.paperSize : "folio";
  const requestedOrientation = options.orientation === "landscape" ? "landscape" : "portrait";
  const baseSize = paperSizes[requestedPaper];
  // Keep the physical media definition in its native (portrait) dimensions
  // and let Electron/Chromium apply the orientation explicitly. Several
  // Windows printer drivers interpret a swapped custom media size as a
  // portrait sheet even when the page content is visually landscape. Using the
  // native media size + `landscape: true` gives the driver one unambiguous
  // orientation instruction.
  // Windows printer drivers are more reliable when landscape is represented by
  // the actual rotated custom media dimensions instead of relying on Electron's boolean landscape flag. Portrait keeps the native paper dimensions.
  const landscape = requestedOrientation === "landscape";
  const pageSize = landscape
    ? { width: baseSize.height, height: baseSize.width }
    : { width: baseSize.width, height: baseSize.height };
  const orientedWidthMm = pageSize.width / 1000;
  const orientedHeightMm = pageSize.height / 1000;
  const html = rawHtml.replace(/<\/head>/i, `<style data-cbms-electron-print>@page{size:${orientedWidthMm}mm ${orientedHeightMm}mm;margin:0}.print-page{width:${orientedWidthMm}mm!important;min-width:${orientedWidthMm}mm!important;height:${orientedHeightMm}mm!important;min-height:${orientedHeightMm}mm!important}</style></head>`);
  if (!html) return { ok: false, error: "No printable report content was supplied." };
  if (Buffer.byteLength(rawHtml, "utf8") > MAX_PRINT_HTML_BYTES) return { ok: false, error: "The printable report is too large (25 MB limit)." };
  if (printerName.length > 512) return { ok: false, error: "Invalid printer name." };

  const parent = BrowserWindow.fromWebContents(event.sender);
  const printWindow = new BrowserWindow({
    show: false,
    width: 900,
    height: 1200,
    parent: parent || undefined,
    modal: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
      devTools: false,
    },
  });
  printWindow.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
  printWindow.webContents.on("will-navigate", (navigationEvent) => navigationEvent.preventDefault());

  try {
    await printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
    return await new Promise((resolve) => {
      // Use the native Windows print dialog. Landscape is represented by
      // rotated custom media dimensions and an explicit false landscape flag,
      // preventing drivers from applying a second rotation back to portrait.
      printWindow.webContents.print({
        silent: false,
        deviceName: printerName || undefined,
        printBackground: true,
        color: true,
        landscape: false,
        pageSize,
        margins: { marginType: "none" },
      }, (success, failureReason) => {
        if (!printWindow.isDestroyed()) printWindow.close();
        resolve(success ? { ok: true } : { ok: false, error: failureReason || "Printing was cancelled or failed." });
      });
    });
  } catch (err) {
    if (!printWindow.isDestroyed()) printWindow.close();
    console.error("Print failed:", err);
    return { ok: false, error: err instanceof Error ? err.message : "Printing failed." };
  }
});

secureIpcHandle("debug-read-file", (_, filePath) => {
  try {
    // Never expose arbitrary filesystem reads from the renderer. In packaged
    // builds the only permitted debug read is the export log, and only in the
    // development diagnostics path.
    const requested = path.resolve(String(filePath || ""));
    const allowed = path.resolve(getLogFilePath());
    if (requested !== allowed || !fs.existsSync(allowed)) return null;
    if (app.isPackaged) return null;
    return fs.readFileSync(allowed, "utf-8");
  } catch (err) {
    console.error("debug-read-file failed:", err);
    return null;
  }
});
// ────────────────────────────────────────────────────────


function tryPort(port) {
  return new Promise((resolve) => {
    const srv = net.createServer();
    srv.unref();
    srv.on("error", () => resolve(null));
    srv.listen(port, "127.0.0.1", () => {
      const actual = srv.address().port;
      srv.close(() => resolve(actual));
    });
  });
}

// Prefer a fixed port so the app origin (and its localStorage) stays stable between launches.
async function getFreePort() {
  const preferred = await tryPort(43117);
  if (preferred) return preferred;
  const any = await tryPort(0);
  if (any) return any;
  throw new Error("No free port available");
}



function waitForServer(url, timeoutMs = 45000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    let settled = false;
    const finish = (error) => {
      if (settled) return;
      settled = true;
      if (error) reject(error);
      else resolve();
    };

    const attempt = () => {
      if (Date.now() - start > timeoutMs) {
        finish(new Error(`Local application server did not start in time: ${url}`));
        return;
      }

      const req = http.get(url, { headers: { Accept: "text/html,application/json,*/*" } }, (res) => {
        res.resume();
        req.destroy();
        // Any HTTP response proves the local listener is alive. The production
        // server may intentionally return 403 to unauthenticated startup probes.
        finish();
      });

      req.setTimeout(1500, () => req.destroy(new Error("startup probe timeout")));
      req.on("error", () => setTimeout(attempt, 250));
    };

    attempt();
  });
}

async function startServer() {
  // A real Vite server is used for electron:dev. Packaged builds fork the
  // production TanStack/Nitro node-server bundle from the installed app.
  if (!app.isPackaged) {
    const devUrl = "http://127.0.0.1:8080/";
    await waitForServer(devUrl, 45000);
    appOrigin = new URL(devUrl).origin;
    return { url: devUrl, token: null };
  }

  const candidates = [
    path.join(process.resourcesPath || "", ".output", "server", "index.mjs"),
    path.join(process.resourcesPath || "", "app", ".output", "server", "index.mjs"),
    path.join(__dirname, ".output", "server", "index.mjs"),
    path.join(__dirname, "..", ".output", "server", "index.mjs"),
  ];

  const serverEntry = candidates.find((c) => c && fs.existsSync(c));
  if (!serverEntry) {
    throw new Error(`Build output not found at any candidate path. Checked: ${candidates.join(", ")}`);
  }

  const port = await getFreePort();
  const sessionToken = crypto.randomBytes(32).toString("base64url");

  serverProcess = fork(serverEntry, [], {
    env: {
      ...process.env,
      PORT: String(port),
      HOST: "127.0.0.1",
      NODE_ENV: "production",
      CBMS_SESSION_TOKEN: sessionToken,
      CBMS_ELECTRON: "1",
    },
    stdio: ["ignore", "inherit", "inherit", "ipc"],
  });

  const url = `http://127.0.0.1:${port}/`;
  await waitForServer(url);
  return { url, port, token: sessionToken };
}

let updaterInterval = null;

async function stopLocalServers() {
  if (serverProcess) {
    try { serverProcess.kill(); } catch {}
    serverProcess = null;
  }
}

function installLoopbackSecurity(win, appUrl, sessionToken) {
  const origin = new URL(appUrl).origin;
  const filter = { urls: [`${origin}/*`] };

  // Every request made by this Electron webContents receives the per-launch
  // capability header. Normal browsers have no way to obtain it from the URL.
  win.webContents.session.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
    details.requestHeaders["X-CBMS-Session"] = sessionToken;
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });

  // Do not allow the app renderer to navigate this window to an arbitrary URL.
  win.webContents.on("will-navigate", (event, url) => {
    try {
      if (new URL(url).origin !== origin) {
        event.preventDefault();
        if (/^https?:\/\//i.test(url)) void shell.openExternal(url);
      }
    } catch {
      event.preventDefault();
    }
  });

  win.webContents.on("will-attach-webview", (event) => {
    // This application does not require embedded webviews; disallow them to
    // reduce an unnecessary renderer attack surface.
    event.preventDefault();
  });

  if (app.isPackaged) {
    win.webContents.on("devtools-opened", () => {
      try { win.webContents.closeDevTools(); } catch {}
    });
    win.webContents.on("before-input-event", (event, input) => {
      const blocked =
        input.type === "keyDown" &&
        (input.key === "F12" ||
          (input.control && input.shift && ["I", "J", "C"].includes(String(input.key).toUpperCase())) ||
          (input.meta && input.alt && String(input.key).toUpperCase() === "I"));
      if (blocked) event.preventDefault();
    });
  }

  win.webContents.session.setPermissionRequestHandler((_webContents, _permission, callback) => callback(false));
  win.webContents.session.setPermissionCheckHandler(() => false);
}

function sendUpdaterEvent(channel, payload = {}) {
  for (const win of BrowserWindow.getAllWindows()) {
    if (!win.isDestroyed()) {
      try { win.webContents.send(channel, payload); } catch {}
    }
  }
}

secureIpcHandle("get-app-version", () => app.getVersion());

secureIpcHandle("check-for-updates", async () => {
  if (!app.isPackaged) return { ok: false, packaged: false, message: "Updates are available only in the packaged desktop application." };
  try {
    const result = await autoUpdater.checkForUpdates();
    const info = result?.updateInfo || null;
    if (info && info.version && info.version !== app.getVersion()) {
      sendUpdaterEvent("updater-status", { state: "available", version: info.version, currentVersion: app.getVersion() });
      return { ok: true, state: "available", version: info.version, currentVersion: app.getVersion() };
    }
    sendUpdaterEvent("updater-status", { state: "up-to-date", currentVersion: app.getVersion() });
    return { ok: true, state: "up-to-date", currentVersion: app.getVersion() };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unable to check for updates.";
    sendUpdaterEvent("updater-status", { state: "error", message });
    return { ok: false, state: "error", message };
  }
});

function getStartupSplashHtml() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>CBMS Insights</title>
<style>
html,body{margin:0;width:100%;height:100%;background:#020c1b;color:#e6f7ff;font-family:Segoe UI,Arial,sans-serif}
body{display:grid;place-items:center;overflow:hidden}
.card{text-align:center;width:100%;box-sizing:border-box;padding:34px 28px}
.mark{width:58px;height:58px;margin:0 auto 18px;border-radius:18px;display:grid;place-items:center;border:1px solid rgba(103,232,249,.28);background:rgba(15,23,42,.86);box-shadow:0 14px 40px rgba(0,0,0,.35)}
.shield{width:28px;height:28px;border:2px solid #67e8f9;border-radius:10px 10px 13px 13px;box-sizing:border-box;position:relative}
.shield:after{content:"";position:absolute;width:7px;height:3px;border-left:2px solid #67e8f9;border-bottom:2px solid #67e8f9;transform:rotate(-45deg);left:8px;top:8px}
.kicker{font-size:10px;letter-spacing:.22em;text-transform:uppercase;font-weight:800;color:#67e8f9}
.title{font-size:22px;font-weight:900;margin-top:5px}
.sub{font-size:12px;color:#94a3b8;margin-top:5px}
.row{display:flex;align-items:center;justify-content:center;gap:8px;font-size:12px;color:#cbd5e1;margin-top:22px}
.dot{width:8px;height:8px;border-radius:999px;background:#34d399;box-shadow:0 0 12px rgba(52,211,153,.75);animation:pulse 1.4s infinite}
@keyframes pulse{50%{opacity:.35;transform:scale(.72)}}
</style>
</head>
<body>
<div class="card">
  <div class="mark"><div class="shield"></div></div>
  <div class="kicker">Secure startup</div>
  <div class="title">CBMS Insights</div>
  <div class="sub">Community-Based Monitoring System</div>
  <div class="row"><span class="dot"></span><span>Securing system…</span></div>
</div>
</body>
</html>`;
}

async function showStartupSplash(win) {
  await win.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(getStartupSplashHtml())}`);
  if (!win.isDestroyed()) win.show();
}

async function createWindow() {
  const win = new BrowserWindow({
    show: false,
    width: 1280,
    height: 860,
    minWidth: 380,
    title: "CBMS Insights",
    backgroundColor: "#020c1b",
    autoHideMenuBar: true,
    icon: path.join(__dirname, "src", "assets", "cbms-insights-logo.png"),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
      devTools: !app.isPackaged,
      preload: path.join(__dirname, "preload.cjs"),
      spellcheck: false,
    },
  });

  mainWindow = win;

  const handleNavigation = (event, url) => {
    try {
      const target = new URL(url);
      if (target.origin === appOrigin) return;
      event.preventDefault();
      if (isAllowedExternalUrl(target.href)) shell.openExternal(target.href);
    } catch {
      event.preventDefault();
    }
  };

  win.webContents.on("will-navigate", handleNavigation);
  win.webContents.on("will-redirect", handleNavigation);
  win.webContents.on("will-attach-webview", (event) => event.preventDefault());
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (isAllowedExternalUrl(url)) shell.openExternal(url);
    return { action: "deny" };
  });

  const recordRendererError = (label, detail) => {
    const message = detail instanceof Error ? detail.stack || detail.message : String(detail ?? "Unknown renderer error");
    console.error(`[Renderer ${label}] ${message}`);
  };

  win.webContents.on("render-process-gone", (_event, details) => {
    recordRendererError("process-gone", details?.reason || details);
  });
  win.webContents.on("console-message", (_event, level, message, line, sourceId) => {
    if (level >= 2) console.error(`[Renderer console:${level}] ${message} (${sourceId}:${line})`);
  });
  win.webContents.on("did-fail-load", (_event, errorCode, errorDescription, validatedURL, isMainFrame) => {
    if (isMainFrame) recordRendererError("did-fail-load", `${errorCode} ${errorDescription} @ ${validatedURL}`);
  });

  if (app.isPackaged) {
    win.webContents.on("devtools-opened", () => {
      try { win.webContents.closeDevTools(); } catch {}
    });
    win.webContents.on("before-input-event", (event, input) => {
      const blocked =
        input.type === "keyDown" &&
        (input.key === "F12" ||
          (input.control && input.shift && ["I", "J", "C"].includes(String(input.key).toUpperCase())) ||
          (input.meta && input.alt && String(input.key).toUpperCase() === "I"));
      if (blocked) event.preventDefault();
    });
  }

  win.webContents.session.setPermissionRequestHandler((_webContents, _permission, callback) => callback(false));
  win.webContents.session.setPermissionCheckHandler(() => false);

  try {
    // Show the security surface immediately in this SAME BrowserWindow.
    // The production server may take a moment to boot, so the user never sees
    // an empty/white window while it starts.
    win.maximize();
    await showStartupSplash(win);
    await new Promise((resolve) => setTimeout(resolve, 550));

    const server = await startServer();
    appOrigin = new URL(server.url).origin;
    if (server.token) installLoopbackSecurity(win, server.url, server.token);

    await win.loadURL(server.url);

    // Release the splash only after the real document has been parsed. The
    // security gate is server-rendered first, so it is the first screen users see.
    await new Promise((resolve) => {
      let settled = false;
      let timer = null;
      const finish = () => {
        if (settled) return;
        settled = true;
        if (timer) clearTimeout(timer);
        win.webContents.removeListener("dom-ready", finish);
        win.webContents.removeListener("did-finish-load", finish);
        resolve();
      };
      win.webContents.once("dom-ready", finish);
      win.webContents.once("did-finish-load", finish);
      timer = setTimeout(finish, 8000);
    });

    win.show();
  } catch (err) {
    await stopLocalServers();
    if (mainWindow === win) mainWindow = null;
    if (!win.isDestroyed()) win.destroy();
    throw err;
  }

  win.on("closed", () => {
    if (mainWindow === win) mainWindow = null;
  });

  return win;
}

function configureAutoUpdater() {
  if (!app.isPackaged) return;

  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;
  autoUpdater.allowDowngrade = false;
  autoUpdater.allowPrerelease = false;

  autoUpdater.on("checking-for-update", () => {
    sendUpdaterEvent("updater-status", { state: "checking", currentVersion: app.getVersion() });
  });
  autoUpdater.on("update-available", (info) => {
    sendUpdaterEvent("updater-status", {
      state: "available",
      version: info?.version || "unknown",
      currentVersion: app.getVersion(),
    });
  });
  autoUpdater.on("update-not-available", () => {
    sendUpdaterEvent("updater-status", { state: "up-to-date", currentVersion: app.getVersion() });
  });
  autoUpdater.on("download-progress", (progress) => {
    sendUpdaterEvent("updater-status", {
      state: "downloading",
      percent: Number.isFinite(progress?.percent) ? Math.round(progress.percent) : 0,
      version: autoUpdater?.updateInfo?.version || "",
      currentVersion: app.getVersion(),
    });
  });
  autoUpdater.on("update-downloaded", async (info) => {
    sendUpdaterEvent("updater-status", {
      state: "downloaded",
      version: info?.version || "unknown",
      currentVersion: app.getVersion(),
    });
    const result = await dialog.showMessageBox({
      type: "info",
      buttons: ["Restart Now", "Later"],
      defaultId: 0,
      cancelId: 1,
      title: "CBMS Insights Update Ready",
      message: `CBMS Insights ${info?.version || "new"} is ready to install.`,
      detail: "The update has finished downloading. Restart now to apply it, or choose Later to install automatically the next time the application closes.",
    });
    if (result.response === 0) setImmediate(() => autoUpdater.quitAndInstall(false, true));
  });
  autoUpdater.on("error", (err) => {
    sendUpdaterEvent("updater-status", { state: "error", message: err?.message || "Update check failed." });
    console.error("CBMS Insights auto-update error:", err);
  });

  setTimeout(() => {
    autoUpdater.checkForUpdates().catch((err) => console.error("Initial update check failed:", err));
  }, 10000);
  updaterInterval = setInterval(() => {
    autoUpdater.checkForUpdates().catch((err) => console.error("Scheduled update check failed:", err));
  }, 30 * 60 * 1000);
}

app.whenReady().then(async () => {
  session.defaultSession.setPermissionRequestHandler((_webContents, _permission, callback) => callback(false));
  session.defaultSession.setPermissionCheckHandler(() => false);
  getLogFilePath(); // Forces the saves folder to create immediately on startup

  try {
    await createWindow();
    configureAutoUpdater();
  } catch (err) {
    console.error("Failed to start CBMS Insights:", err);
    dialog.showErrorBox("CBMS Insights could not start", err instanceof Error ? err.message : String(err));
    app.quit();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", async () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    try {
      await createWindow();
    } catch (err) {
      console.error("Failed to recreate CBMS Insights window:", err);
      app.quit();
    }
  }
});

app.on("before-quit", () => {
  if (updaterInterval) {
    clearInterval(updaterInterval);
    updaterInterval = null;
  }
  void stopLocalServers();
});

app.on("quit", () => {
  if (serverProcess) {
    try { serverProcess.kill(); } catch {}
    serverProcess = null;
  }
});
