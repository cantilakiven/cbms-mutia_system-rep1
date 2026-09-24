import "./lib/error-capture";

import { randomBytes, timingSafeEqual } from "node:crypto";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

const SESSION_TOKEN = String(process.env.CBMS_SESSION_TOKEN || "");

function isAuthorizedLocalRequest(request: Request): boolean {
  // Fail closed if the Electron host did not provide a server capability token.
  if (!SESSION_TOKEN) return false;

  const supplied = request.headers.get("x-cbms-session") || "";
  const expected = Buffer.from(SESSION_TOKEN, "utf8");
  const actual = Buffer.from(supplied, "utf8");
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function unauthorizedResponse(): Response {
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>CBMS Insights</title>
<style>
html,body{margin:0;min-height:100%;font-family:Segoe UI,Arial,sans-serif;background:#020c1b;color:#e2e8f0}
body{display:grid;place-items:center;padding:24px;box-sizing:border-box}
.card{max-width:520px;border:1px solid rgba(103,232,249,.18);border-radius:20px;background:#0b1220;padding:28px;box-shadow:0 22px 70px rgba(0,0,0,.4)}
.k{font-size:10px;letter-spacing:.18em;text-transform:uppercase;font-weight:800;color:#67e8f9}
.t{font-size:20px;font-weight:900;margin-top:6px}
.p{font-size:13px;line-height:1.6;color:#94a3b8;margin-top:10px}
</style>
</head>
<body>
<main class="card">
<div class="k">Desktop application</div>
<div class="t">CBMS Insights is not available in a browser.</div>
<p class="p">This local endpoint accepts requests only from the running CBMS Insights desktop application.</p>
</main>
</body>
</html>`;

  return new Response(html, {
    status: 403,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store, max-age=0",
      "pragma": "no-cache",
      "x-content-type-options": "nosniff",
      "referrer-policy": "no-referrer",
      "content-security-policy": "default-src 'none'; style-src 'unsafe-inline'",
    },
  });
}

const CSP_HTML_LIMIT_BYTES = 8 * 1024 * 1024;
const IS_ELECTRON_NODE_SERVER = process.env.CBMS_ELECTRON === "1";

const BASE_CSP = [
  "default-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src 'self' data: blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
];

async function applySecurityHeaders(response: Response): Promise<Response> {
  const headers = new Headers(response.headers);
  headers.set("cache-control", "no-store, max-age=0");
  headers.set("pragma", "no-cache");
  headers.set("x-content-type-options", "nosniff");
  headers.set("referrer-policy", "no-referrer");
  headers.set("x-frame-options", "DENY");

  const contentType = headers.get("content-type")?.toLowerCase() ?? "";
  if (IS_ELECTRON_NODE_SERVER && contentType.includes("text/html")) {
    const contentLength = Number(headers.get("content-length") || 0);
    if (!contentLength || contentLength <= CSP_HTML_LIMIT_BYTES) {
      try {
        const html = await response.clone().text();
        if (Buffer.byteLength(html, "utf8") <= CSP_HTML_LIMIT_BYTES) {
          const nonce = randomBytes(18).toString("base64");
          const securedHtml = html.replace(
            /<script(?![^>]*\bsrc=)([^>]*)>/gi,
            `<script nonce="${nonce}"$1>`,
          );
          headers.delete("content-length");
          headers.delete("content-encoding");
          headers.delete("transfer-encoding");
          headers.set(
            "content-security-policy",
            [...BASE_CSP, `script-src 'self' 'nonce-${nonce}'`].join("; "),
          );
          return new Response(securedHtml, {
            status: response.status,
            statusText: response.statusText,
            headers,
          });
        }
      } catch (error) {
        console.error("Failed to apply HTML security policy:", error);
      }
    }
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store, max-age=0",
      "x-content-type-options": "nosniff",
      "referrer-policy": "no-referrer",
    },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    if (!isAuthorizedLocalRequest(request)) return unauthorizedResponse();

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      return await applySecurityHeaders(normalized);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
