const { app, BrowserWindow, shell, ipcMain, dialog, session } = require("electron");
const { autoUpdater } = require("electron-updater");
const { fork } = require("child_process");
const path = require("path");
const http = require("http");
const net = require("net");
const fs = require("fs");
const crypto = require("crypto");

let serverProcess = null;
let proxyServer = null;
let proxyToken = null;
let appOrigin = "";
let updaterInterval = null;
let mainWindow = null;

const ALLOWED_SETTINGS = new Set(["localdata.installed-at", "localdata.monthly-checkin.ack"]);
const MAX_EXPORT_BYTES = 100 * 1024 * 1024;
const MAX_PRINT_HTML_BYTES = 25 * 1024 * 1024;
const MAX_LOG_ENTRIES = 5000;
const MAX_LOG_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXTERNAL_URLS = new Set(["https://www.facebook.com/hello.kwekwe"]);
const APP_CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src 'self' data: blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

function isTrustedRenderer(event) {
  try {
    if (!appOrigin || !event?.sender) return false;
    const owner = BrowserWindow.fromWebContents(event.sender);
    if (!owner || owner.isDestroyed() || !mainWindow || owner !== mainWindow) return false;
    const senderFrame = event.senderFrame;
    const senderOrigin = senderFrame?.origin || new URL(senderFrame?.url || event.sender.getURL()).origin;
    return senderOrigin === appOrigin;
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

function parseCookieHeader(value) {
  return String(value || "").split(";").reduce((out, part) => {
    const [key, ...rest] = part.trim().split("=");
    if (key) out[key] = rest.join("=");
    return out;
  }, {});
}

function safeTokenEquals(received, expected) {
  if (!received || !expected) return false;
  const a = Buffer.from(String(received));
  const b = Buffer.from(String(expected));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

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


const EXPORT_LOG_BLOB_VERSION = 1;

function getExportLogKeyFilePath() {
  return path.join(getSaveFolder(), "export-log.key");
}

function getOrCreateExportLogKey() {
  const settings = getSettings();
  const candidates = [];

  if (isSafeStorageAvailable() && typeof settings.exportLogKey === "string" && settings.exportLogKey) {
    try {
      const { safeStorage } = require("electron");
      const plain = safeStorage.decryptString(Buffer.from(settings.exportLogKey, "base64"));
      const key = Buffer.from(plain, "base64");
      if (key.length === 32) candidates.push(key);
    } catch {
      // Fall through to the legacy/fallback key file.
    }
  }

  const keyPath = getExportLogKeyFilePath();
  if (fs.existsSync(keyPath)) {
    try {
      const key = Buffer.from(fs.readFileSync(keyPath, "utf8").trim(), "base64");
      if (key.length === 32) candidates.push(key);
    } catch {
      // Ignore a corrupt fallback key and generate a new one only when creation is allowed.
    }
  }

  if (candidates.length) {
    const key = candidates[0];
    // Migrate a development/fallback key into OS-protected storage whenever possible.
    if (isSafeStorageAvailable()) {
      try {
        const { safeStorage } = require("electron");
        settings.exportLogKey = safeStorage.encryptString(key.toString("base64")).toString("base64");
        saveSettings(settings);
        try { fs.unlinkSync(keyPath); } catch {}
      } catch (err) {
        console.warn("Failed to migrate export-log key into OS protected storage.", err);
      }
    }
    return key;
  }

  const key = crypto.randomBytes(32);
  if (isSafeStorageAvailable()) {
    try {
      const { safeStorage } = require("electron");
      settings.exportLogKey = safeStorage.encryptString(key.toString("base64")).toString("base64");
      saveSettings(settings);
      return key;
    } catch (err) {
      console.warn("Failed to OS-protect export-log key; using restricted fallback file.", err);
    }
  }

  try {
    fs.writeFileSync(keyPath, key.toString("base64"), { encoding: "utf8", mode: 0o600 });
  } catch (err) {
    throw new Error(`Failed to persist export-log encryption key: ${err?.message || err}`);
  }
  return key;
}

function encryptExportLog(entries) {
  const key = getOrCreateExportLogKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const ciphertext = Buffer.concat([cipher.update(JSON.stringify(entries), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    v: EXPORT_LOG_BLOB_VERSION,
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
    data: ciphertext.toString("base64"),
  };
}

function decryptExportLogBlob(blob) {
  if (!blob || typeof blob !== "object" || blob.v !== EXPORT_LOG_BLOB_VERSION) return null;
  try {
    const iv = Buffer.from(blob.iv, "base64");
    const tag = Buffer.from(blob.tag, "base64");
    const ciphertext = Buffer.from(blob.data, "base64");
    if (iv.length !== 12 || tag.length !== 16 || !ciphertext.length) return null;
    const keyPath = getExportLogKeyFilePath();
    const settings = getSettings();
    const candidates = [];

    if (isSafeStorageAvailable() && typeof settings.exportLogKey === "string" && settings.exportLogKey) {
      try {
        const { safeStorage } = require("electron");
        const key = Buffer.from(safeStorage.decryptString(Buffer.from(settings.exportLogKey, "base64")), "base64");
        if (key.length === 32) candidates.push(key);
      } catch {}
    }
    if (fs.existsSync(keyPath)) {
      try {
        const key = Buffer.from(fs.readFileSync(keyPath, "utf8").trim(), "base64");
        if (key.length === 32) candidates.push(key);
      } catch {}
    }

    for (const key of candidates) {
      try {
        const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
        decipher.setAuthTag(tag);
        const plain = Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8");
        const parsed = JSON.parse(plain);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        // Try another recoverable key.
      }
    }
  } catch {}
  return null;
}

function readExportLog() {
  const raw = readJsonFile(getLogFilePath(), null);
  if (Array.isArray(raw)) {
    // Legacy v1.4.13 log: read once and transparently migrate it to AES-256-GCM.
    const legacy = raw.filter(Boolean).slice(0, MAX_LOG_ENTRIES);
    try { writeJsonFileAtomic(getLogFilePath(), encryptExportLog(legacy)); } catch (err) {
      console.warn("Failed to migrate legacy export log to encrypted storage.", err);
    }
    return legacy;
  }
  const decrypted = decryptExportLogBlob(raw);
  return Array.isArray(decrypted) ? decrypted : [];
}

function writeExportLog(entries) {
  writeJsonFileAtomic(getLogFilePath(), encryptExportLog(entries));
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

secureIpcHandle("get-export-log", () => readExportLog());

secureIpcHandle("save-export-log", (_, entries, replace) => {
  try {
    const list = Array.isArray(entries) ? entries.slice(0, MAX_LOG_ENTRIES) : [];
    const serialized = JSON.stringify(list);
    if (Buffer.byteLength(serialized, "utf8") > MAX_LOG_BYTES) throw new Error("Export log is too large.");
    if (replace) {
      writeExportLog(list);
      return true;
    }
    // Merge with whatever is already on disk so no logged export is ever lost.
    const existing = readExportLog();
    const byId = new Map();
    for (const e of [...existing, ...list]) {
      if (e && e.id) byId.set(e.id, e);
    }
    const merged = Array.from(byId.values())
      .sort((a, b) => String(b.timestamp || "").localeCompare(String(a.timestamp || "")))
      .slice(0, MAX_LOG_ENTRIES);
    writeExportLog(merged);
    return true;
  } catch (err) {
    console.error("Failed to save log:", err);
    return false;
  }
});

secureIpcHandle("delete-export-log", () => {
  try {
    writeExportLog([]);
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
    if (settingKey === "localdata.installed-at" && !(Number.isFinite(Number(value)) && Number(value) >= 0)) {
      throw new Error("Invalid installed-at setting.");
    }
    if (settingKey === "localdata.monthly-checkin.ack" && value !== null && typeof value !== "string") {
      throw new Error("Invalid check-in setting.");
    }
    const normalized = settingKey === "localdata.monthly-checkin.ack" ? String(value || "").slice(0, 64) : Number(value);
    const settings = readJsonFile(getSettingsFilePath(), {}) || {};
    settings[settingKey] = normalized;
    writeJsonFileAtomic(getSettingsFilePath(), settings);
    return true;
  } catch (err) {
    console.error("Failed to save setting:", err);
    return false;
  }
});

secureIpcHandle("get-user-data-path", () => app.getPath("userData"));
secureIpcHandle("get-export-log-path", () => getLogFilePath());
secureIpcHandle("get-download-path", (_, filename) => path.join(app.getPath("downloads"), path.basename(String(filename || "export")).slice(0, 240)));
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
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true, webSecurity: true, allowRunningInsecureContent: false },
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

async function getFreePort(preferred = 0) {
  if (preferred) {
    const preferredPort = await tryPort(preferred);
    if (preferredPort) return preferredPort;
  }
  const any = await tryPort(0);
  if (any) return any;
  throw new Error("No free local port available");
}

function waitForServer(url, timeoutMs = 30000) {
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
        finish(new Error(`Server did not start in time: ${url}`));
        return;
      }

      const req = http.get(url, { headers: { Accept: "text/html,application/json,*/*" } }, (res) => {
        res.resume();
        // Vite may briefly answer with a non-2xx response while optimizing dependencies.
        // Any HTTP response proves that the server is listening and reachable.
        req.destroy();
        finish();
      });

      req.setTimeout(1500, () => {
        req.destroy(new Error("startup probe timeout"));
      });
      req.on("error", () => {
        if (Date.now() - start > timeoutMs) {
          finish(new Error(`Server did not start in time: ${url}`));
        } else {
          setTimeout(attempt, 250);
        }
      });
    };

    attempt();
  });
}

function securityHeaders(headers) {
  const next = { ...headers };
  delete next["content-security-policy"];
  next["content-security-policy"] = APP_CSP;
  next["x-content-type-options"] = "nosniff";
  next["referrer-policy"] = "no-referrer";
  next["cross-origin-opener-policy"] = "same-origin";
  next["cross-origin-resource-policy"] = "same-origin";
  next["permissions-policy"] = "camera=(), microphone=(), geolocation=(), notifications=(), usb=(), serial=()";
  return next;
}

async function createProtectedProxy(internalPort) {
  const proxyPort = await getFreePort(43117);
  proxyToken = crypto.randomBytes(32).toString("base64url");
  proxyServer = http.createServer((req, res) => {
    const cookies = parseCookieHeader(req.headers.cookie);
    if (!safeTokenEquals(cookies.cbms_session, proxyToken)) {
      res.writeHead(401, { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" });
      res.end("Unauthorized");
      return;
    }

    const upstreamHeaders = { ...req.headers };
    delete upstreamHeaders.host;
    delete upstreamHeaders.cookie;
    delete upstreamHeaders.connection;

    const upstream = http.request({
      host: "127.0.0.1",
      port: internalPort,
      method: req.method,
      path: req.url || "/",
      headers: upstreamHeaders,
    }, (upstreamResponse) => {
      res.writeHead(upstreamResponse.statusCode || 502, securityHeaders(upstreamResponse.headers));
      upstreamResponse.pipe(res);
    });

    upstream.on("error", (err) => {
      if (!res.headersSent) res.writeHead(502, { "content-type": "text/plain; charset=utf-8" });
      res.end("Local application server unavailable");
      console.error("Protected proxy upstream error:", err.message);
    });

    req.pipe(upstream);
  });

  await new Promise((resolve, reject) => {
    proxyServer.once("error", reject);
    proxyServer.listen(proxyPort, "127.0.0.1", resolve);
  });

  return `http://127.0.0.1:${proxyPort}/`;
}

async function installProxyCookie(proxyUrl) {
  await session.defaultSession.cookies.set({
    url: proxyUrl,
    name: "cbms_session",
    value: proxyToken,
    path: "/",
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });
}

async function stopLocalServers() {
  if (proxyServer) {
    await new Promise((resolve) => {
      try { proxyServer.close(() => resolve()); } catch { resolve(); }
    });
    proxyServer = null;
  }
  proxyToken = null;
  if (serverProcess) {
    try { serverProcess.kill(); } catch {}
    serverProcess = null;
  }
}

async function startServer() {
  // Development mode is served directly by Vite. The production server bundle
  // does not exist until `npm run build`, so trying to fork .output here makes
  // `npm run electron:dev` open an empty/failed Electron window.
  if (!app.isPackaged) {
    const devUrl = "http://127.0.0.1:8080/";
    await waitForServer(devUrl, 45000);
    appOrigin = new URL(devUrl).origin;
    return devUrl;
  }

  const candidates = [
    path.join(process.resourcesPath || "", ".output", "server", "index.mjs"),
    path.join(process.resourcesPath || "", "app", ".output", "server", "index.mjs"),
    path.join(__dirname, ".output", "server", "index.mjs"),
    path.join(__dirname, "..", ".output", "server", "index.mjs"),
  ];

  const serverEntry = candidates.find((c) => c && fs.existsSync(c));
  if (!serverEntry) throw new Error(`Build output not found at any candidate path.`);

  const internalPort = await getFreePort();
  serverProcess = fork(serverEntry, [], {
    env: { ...process.env, PORT: String(internalPort), HOST: "127.0.0.1", NODE_ENV: "production" },
    stdio: ["ignore", "inherit", "inherit", "ipc"],
  });

  const internalUrl = `http://127.0.0.1:${internalPort}/`;
  await waitForServer(internalUrl);
  const protectedUrl = await createProtectedProxy(internalPort);
  appOrigin = new URL(protectedUrl).origin;
  await installProxyCookie(protectedUrl);
  return protectedUrl;
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

async function createWindow() {
  const win = new BrowserWindow({
    show: false,
    width: 1280,
    height: 860,
    minWidth: 380,
    title: "CBMS Insights",
    backgroundColor: "#0f1a17",
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
  win.webContents.on("will-attach-webview", (event) => { event.preventDefault(); });
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (isAllowedExternalUrl(url)) shell.openExternal(url);
    return { action: "deny" };
  });

  try {
    const url = await startServer();
    await win.loadURL(url);
  } catch (err) {
    await stopLocalServers();
    if (mainWindow === win) mainWindow = null;
    if (!win.isDestroyed()) win.destroy();
    throw err;
  }
  // Launch maximized to the Windows work area (taskbar remains visible);
  // this is intentionally not Electron's exclusive fullscreen mode.
  win.maximize();
  win.show();
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

app.whenReady().then(() => {
  session.defaultSession.setPermissionRequestHandler((_webContents, _permission, callback) => callback(false));
  session.defaultSession.setPermissionCheckHandler(() => false);
  getLogFilePath(); // Forces the saves folder to create immediately on startup
  createWindow().catch((err) => {
    console.error("Failed to start CBMS Insights:", err);
    dialog.showErrorBox("CBMS Insights could not start", err instanceof Error ? err.message : String(err));
    app.quit();
  });
  configureAutoUpdater();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow().catch((err) => {
      console.error("Failed to recreate CBMS Insights window:", err);
      app.quit();
    });
  }
});

app.on("before-quit", () => {
  if (updaterInterval) { clearInterval(updaterInterval); updaterInterval = null; }
  try { void session.defaultSession.cookies.remove(`${appOrigin}/`, "cbms_session"); } catch {}
  void stopLocalServers();
});

app.on("quit", () => {
  if (updaterInterval) { clearInterval(updaterInterval); updaterInterval = null; }
});
