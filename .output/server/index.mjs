globalThis.__nitro_main__ = import.meta.url;
import { c as NodeResponse, s as serve } from "./_libs/srvx.mjs";
import { d as defineHandler, H as HTTPError, t as toEventHandler, a as defineLazyEventHandler, h as headers, b as H3Core, m as memoizeRouteRulesMatcher, c as createMatcherFromFind, e as composeMiddleware } from "./_libs/h3.mjs";
import { H as HookableCore } from "./_libs/hookable.mjs";
import { d as decodePath, w as withLeadingSlash, a as withoutTrailingSlash, j as joinURL } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "./_libs/rou3.mjs";
const assets = {
  "/app-icon.png": {
    "type": "image/png",
    "etag": '"5d1f9-FuAvhJRdRfa5RuagK4uNjX8rnEY"',
    "mtime": "2026-09-24T00:35:20.000Z",
    "size": 381433,
    "path": "../public/app-icon.png"
  },
  "/assets/barangays-1TWTqDWQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190d-9cMWnHx6EZxNZHkHxB9jFNCS6+c"',
    "mtime": "2026-09-26T00:02:55.518Z",
    "size": 6413,
    "path": "../public/assets/barangays-1TWTqDWQ.js"
  },
  "/assets/cbms-labels-DBkX4hFW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12b-N8UfB4Xs0oVpOmMxoafgTYRbenc"',
    "mtime": "2026-09-26T00:02:55.521Z",
    "size": 299,
    "path": "../public/assets/cbms-labels-DBkX4hFW.js"
  },
  "/assets/cbms-recognition-JypBXCcS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e81-Ow8KGrSjqLutNgLgLmdw6SQDRi8"',
    "mtime": "2026-09-26T00:02:55.521Z",
    "size": 7809,
    "path": "../public/assets/cbms-recognition-JypBXCcS.js"
  },
  "/assets/cbms-sector-classification-8kn4xGk4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"105b-1c5XRrTfQUP4FgWFhfi7HEgx14I"',
    "mtime": "2026-09-26T00:02:55.520Z",
    "size": 4187,
    "path": "../public/assets/cbms-sector-classification-8kn4xGk4.js"
  },
  "/assets/cbms-report-defs-0cR5MK_-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"efb-WS1N73rfcHSi/9YZ8pRRDSo3PzY"',
    "mtime": "2026-09-26T00:02:55.520Z",
    "size": 3835,
    "path": "../public/assets/cbms-report-defs-0cR5MK_-.js"
  },
  "/assets/CBMSModals-BVzFIxX1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"bc6f-oxzsAlNM9ML7TJxklgwxDUM5fU4"',
    "mtime": "2026-09-26T00:02:55.521Z",
    "size": 48239,
    "path": "../public/assets/CBMSModals-BVzFIxX1.js"
  },
  "/assets/comparative-DKwPBlqo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"69f8-hKa0XA5TAMlPqFh+YehTmXK+ssA"',
    "mtime": "2026-09-26T00:02:55.518Z",
    "size": 27128,
    "path": "../public/assets/comparative-DKwPBlqo.js"
  },
  "/assets/crosstab-XiHdVtCY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f8f-bMFiHXYfrbU44WnuRVzndB91TDA"',
    "mtime": "2026-09-26T00:02:55.518Z",
    "size": 8079,
    "path": "../public/assets/crosstab-XiHdVtCY.js"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": '"25873-2ep6ZU5Pye990LKl3wVlnKA5MGs"',
    "mtime": "2026-09-24T00:35:20.000Z",
    "size": 153715,
    "path": "../public/favicon.ico"
  },
  "/assets/DataTable-CyI5lV3d.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"17f8-x4DCJCZPrhPMe/BRRXYgANWqXO0"',
    "mtime": "2026-09-26T00:02:55.520Z",
    "size": 6136,
    "path": "../public/assets/DataTable-CyI5lV3d.js"
  },
  "/assets/demographics-BmNl9FqW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1469-/+7gaqSKwPRNYyfejXA/QZ4gntk"',
    "mtime": "2026-09-26T00:02:55.518Z",
    "size": 5225,
    "path": "../public/assets/demographics-BmNl9FqW.js"
  },
  "/cbms-insights-logo.png": {
    "type": "image/png",
    "etag": '"5d1f9-FuAvhJRdRfa5RuagK4uNjX8rnEY"',
    "mtime": "2026-09-24T00:35:20.000Z",
    "size": 381433,
    "path": "../public/cbms-insights-logo.png"
  },
  "/assets/download-CB7WMTjx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"103-EtAJm3lszPLZ470rwdZeuxAn1Kw"',
    "mtime": "2026-09-26T00:02:55.521Z",
    "size": 259,
    "path": "../public/assets/download-CB7WMTjx.js"
  },
  "/assets/export-log-CVfwv7Vt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ca5-ePCVMVEpg6RY0VG03uoRSpkL5Rk"',
    "mtime": "2026-09-26T00:02:55.518Z",
    "size": 7333,
    "path": "../public/assets/export-log-CVfwv7Vt.js"
  },
  "/assets/file-archive-BdLG6xCY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18b-bpJoYv2/TkD9/Ynq8rygXVkBsQ0"',
    "mtime": "2026-09-26T00:02:55.520Z",
    "size": 395,
    "path": "../public/assets/file-archive-BdLG6xCY.js"
  },
  "/assets/export-log-CmvPwuvZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f8-XGfUu2JdDPCKBoONzic6dYMLbEg"',
    "mtime": "2026-09-26T00:02:55.518Z",
    "size": 504,
    "path": "../public/assets/export-log-CmvPwuvZ.js"
  },
  "/assets/file-spreadsheet-TInkkbT_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"174-K5e0diu7WqvMwf+fu1t/NMLUyak"',
    "mtime": "2026-09-26T00:02:55.520Z",
    "size": 372,
    "path": "../public/assets/file-spreadsheet-TInkkbT_.js"
  },
  "/assets/file-type-2-BjNkKWia.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"25a-1Lt0BbGAt7lYQ1/FpO/Gk1Xyqds"',
    "mtime": "2026-09-26T00:02:55.521Z",
    "size": 602,
    "path": "../public/assets/file-type-2-BjNkKWia.js"
  },
  "/assets/households-Bb3of5IG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1b28-VPG9glf7hvdMtk6j0XLaWTgg57U"',
    "mtime": "2026-09-26T00:02:55.518Z",
    "size": 6952,
    "path": "../public/assets/households-Bb3of5IG.js"
  },
  "/assets/food-frequency-DL306Abl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ac9-6rWw9Vm759Z1R9GVobVRCnLERSQ"',
    "mtime": "2026-09-26T00:02:55.518Z",
    "size": 2761,
    "path": "../public/assets/food-frequency-DL306Abl.js"
  },
  "/assets/html2canvas.esm-DXEQVQnt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"31151-TyUyRNm9rR2JDwpyAxcruTmmr6A"',
    "mtime": "2026-09-26T00:02:55.521Z",
    "size": 201041,
    "path": "../public/assets/html2canvas.esm-DXEQVQnt.js"
  },
  "/favicon.png": {
    "type": "image/png",
    "etag": '"5d1f9-FuAvhJRdRfa5RuagK4uNjX8rnEY"',
    "mtime": "2026-09-24T00:35:20.000Z",
    "size": 381433,
    "path": "../public/favicon.png"
  },
  "/assets/cbms-insights-logo-C9waL7MR.png": {
    "type": "image/png",
    "etag": '"5d1f9-FuAvhJRdRfa5RuagK4uNjX8rnEY"',
    "mtime": "2026-09-26T00:02:55.455Z",
    "size": 381433,
    "path": "../public/assets/cbms-insights-logo-C9waL7MR.png"
  },
  "/assets/compendium-Du8dHCtM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9566f-WSG0UhzaXWZlOw4gGnokJkUr2wc"',
    "mtime": "2026-09-26T00:02:55.522Z",
    "size": 611951,
    "path": "../public/assets/compendium-Du8dHCtM.js"
  },
  "/assets/import-BpiGa2AB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"96-PfNc0LMVsmbte4TZi8gARMmFVoY"',
    "mtime": "2026-09-26T00:02:55.518Z",
    "size": 150,
    "path": "../public/assets/import-BpiGa2AB.js"
  },
  "/assets/index-Cz8PtCNS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1b21-9mMcBgOQLODIEgFFZoe+JNDQD/M"',
    "mtime": "2026-09-26T00:02:55.518Z",
    "size": 6945,
    "path": "../public/assets/index-Cz8PtCNS.js"
  },
  "/assets/index.es-D-G63Rpd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26cbf-6zoK7BbXDFLeTlEtloyohdMTb5A"',
    "mtime": "2026-09-26T00:02:55.523Z",
    "size": 158911,
    "path": "../public/assets/index.es-D-G63Rpd.js"
  },
  "/assets/info-ngxWNkuZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c4-NlcxzOGNgKjcXDeCQqg94v0im80"',
    "mtime": "2026-09-26T00:02:55.521Z",
    "size": 196,
    "path": "../public/assets/info-ngxWNkuZ.js"
  },
  "/assets/input-D4zj6-lB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"22e-4fkWof+TnRhLMPidZ9ZnIoEnwpY"',
    "mtime": "2026-09-26T00:02:55.521Z",
    "size": 558,
    "path": "../public/assets/input-D4zj6-lB.js"
  },
  "/assets/inspector-Bzv8d9eE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"31d4-Z//N8ntO+mY/Ezwv9+W/lHy5FIo"',
    "mtime": "2026-09-26T00:02:55.518Z",
    "size": 12756,
    "path": "../public/assets/inspector-Bzv8d9eE.js"
  },
  "/assets/persons-D7AU1v_z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"383e-zvXwLEjWJIbZxAaRZq+LvkjZG2U"',
    "mtime": "2026-09-26T00:02:55.518Z",
    "size": 14398,
    "path": "../public/assets/persons-D7AU1v_z.js"
  },
  "/assets/purify.es-CEBYger9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"70bc-ACI6reTSHPnxH2qoGnp6HQi6b4E"',
    "mtime": "2026-09-26T00:02:55.523Z",
    "size": 28860,
    "path": "../public/assets/purify.es-CEBYger9.js"
  },
  "/assets/reports-CYUvjrZQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7777-GFHsLH4RAPD76hlVG3gOu8dzjbA"',
    "mtime": "2026-09-26T00:02:55.520Z",
    "size": 30583,
    "path": "../public/assets/reports-CYUvjrZQ.js"
  },
  "/assets/rotate-ccw-Qxm0FvHP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c4-QTq180dRlSRTCyXcijk5JsqrJKQ"',
    "mtime": "2026-09-26T00:02:55.521Z",
    "size": 196,
    "path": "../public/assets/rotate-ccw-Qxm0FvHP.js"
  },
  "/assets/sectors-D9_OUWAk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a1af-Gqy5WFTnl/KY+W820ny4BJBsN6I"',
    "mtime": "2026-09-26T00:02:55.518Z",
    "size": 106927,
    "path": "../public/assets/sectors-D9_OUWAk.js"
  },
  "/assets/troubleshooting-DO-kMpqC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2339-5A+Y4gTmsFdgFVsp30dFuy2904Q"',
    "mtime": "2026-09-26T00:02:55.521Z",
    "size": 9017,
    "path": "../public/assets/troubleshooting-DO-kMpqC.js"
  },
  "/assets/validation-Cv6Eb5GG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2c9e-wgReAeEY80J+4yhOsQvooe4unAI"',
    "mtime": "2026-09-26T00:02:55.521Z",
    "size": 11422,
    "path": "../public/assets/validation-Cv6Eb5GG.js"
  },
  "/assets/settings-4CUSG3KS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c29-pPXIJQpSBRRE2Kun9IGht0u/jeg"',
    "mtime": "2026-09-26T00:02:55.520Z",
    "size": 7209,
    "path": "../public/assets/settings-4CUSG3KS.js"
  },
  "/assets/wallet-cards-yU_ZspjT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"144-yO0DVIp53SzmYKoZWh9hEWAhoc0"',
    "mtime": "2026-09-26T00:02:55.518Z",
    "size": 324,
    "path": "../public/assets/wallet-cards-yU_ZspjT.js"
  },
  "/assets/styles-BD3p24W-.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"1bdf5-jIUtmmFxqs8OIA/jEzOZLnhuqlM"',
    "mtime": "2026-09-26T00:02:55.536Z",
    "size": 114165,
    "path": "../public/assets/styles-BD3p24W-.css"
  },
  "/assets/index-CoNUBdDH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1fc182-61uN21E2rge7cFknJFwdi1TK7XE"',
    "mtime": "2026-09-26T00:02:55.610Z",
    "size": 2081154,
    "path": "../public/assets/index-CoNUBdDH.js"
  }
};
function readAsset(id) {
  const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
  return promises.readFile(resolve(serverDir, assets[id].path));
}
const publicAssetBases = {};
function isPublicAssetURL(id = "") {
  if (assets[id]) {
    return true;
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) {
      return true;
    }
  }
  return false;
}
function getAsset(id) {
  return assets[id];
}
const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = {
  gzip: ".gz",
  br: ".br",
  zstd: ".zst"
};
const _dd4536cadfbe41e5 = defineHandler((event) => {
  if (event.req.method && !METHODS.has(event.req.method)) {
    return;
  }
  let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
  let asset;
  const encodingHeader = event.req.headers.get("accept-encoding") || "";
  const encodings = [...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.res.headers.delete("Cache-Control");
      throw new HTTPError({ status: 404 });
    }
    return;
  }
  if (encodings.length > 1) {
    event.res.headers.append("Vary", "Accept-Encoding");
  }
  const ifNotMatch = event.req.headers.get("if-none-match") === asset.etag;
  if (ifNotMatch) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  const ifModifiedSinceH = event.req.headers.get("if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  if (asset.type) {
    event.res.headers.set("Content-Type", asset.type);
  }
  if (asset.etag && !event.res.headers.has("ETag")) {
    event.res.headers.set("ETag", asset.etag);
  }
  if (asset.mtime && !event.res.headers.has("Last-Modified")) {
    event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.res.headers.has("Content-Encoding")) {
    event.res.headers.set("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.res.headers.has("Content-Length")) {
    event.res.headers.set("Content-Length", asset.size.toString());
  }
  return readAsset(id);
});
const findRouteRules = /* @__PURE__ */ (() => {
  const $0 = { route: "/assets/**", rank: 0, rules: [{ name: "headers", route: "/assets/**", handler: headers, options: { "cache-control": "public, max-age=31536000, immutable" } }] };
  return (m, p) => {
    let r = [];
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1);
    let s = p.split("/");
    if (s.length > 1 && s[s.length - 1] === "") {
      s.pop();
      p = p.slice(0, -1);
    }
    let l = s.length;
    if (l > 1) {
      if (s[1] === "assets") {
        r.push({ data: $0, params: { "_": p.slice(8) } });
      }
    }
    return r.reverse();
  };
})();
const _lazy_9f273bcc3eb75144 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
const findRoute = /* @__PURE__ */ (() => {
  const data = { route: "/**", handler: _lazy_9f273bcc3eb75144 };
  return ((_m, p) => {
    return { data, params: { "_": p.slice(1) } };
  });
})();
const globalMiddleware = [
  toEventHandler(_dd4536cadfbe41e5)
].filter(Boolean);
const errorHandler$1 = (error, event) => {
  const res = defaultHandler(error, event);
  return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
  const unhandled = error.unhandled ?? !HTTPError.isError(error);
  const { status = 500, statusText = "" } = unhandled ? {} : error;
  if (status === 404) {
    const url = event.url || new URL(event.req.url);
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      return {
        status: 302,
        headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
      };
    }
  }
  const headers2 = new Headers(unhandled ? {} : error.headers);
  headers2.set("content-type", "application/json; charset=utf-8");
  const jsonBody = unhandled ? {
    status,
    unhandled: true
  } : typeof error.toJSON === "function" ? error.toJSON() : {
    status,
    statusText,
    message: error.message
  };
  return {
    status,
    statusText,
    headers: headers2,
    body: {
      error: true,
      ...jsonBody
    }
  };
}
const errorHandlers = [errorHandler$1];
async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      const response = await handler(error, event, { defaultHandler });
      if (response) {
        return response;
      }
    } catch (error2) {
      console.error(error2);
    }
  }
}
function createNitroApp() {
  const captureError = (error, errorCtx) => {
    if (errorCtx?.event) {
      const errors = errorCtx.event.req.context?.nitro?.errors;
      if (errors) {
        errors.push({ error, context: errorCtx });
      }
    }
  };
  const h3App = createH3App({
    onError(error, event) {
      return errorHandler(error, event);
    }
  });
  let appHandler = (req) => {
    req.context ||= {};
    req.context.nitro = req.context.nitro || { errors: [] };
    return h3App.fetch(req);
  };
  return {
    fetch: appHandler,
    h3: h3App,
    hooks: void 0,
    captureError
  };
}
function createH3App(config) {
  const h3App = new H3Core(config);
  h3App["~findRoute"] = (event) => {
    event.context.routeRules = getRouteRules(event.req.method, event.url.pathname).routeRules;
    return findRoute(event.req.method, event.url.pathname);
  };
  h3App["~middleware"].push(createRouteRulesMiddleware());
  h3App["~middleware"].push(...globalMiddleware);
  return h3App;
}
const APP_ID = "default";
function useNitroApp() {
  let instance = useNitroApp._instance;
  if (instance) {
    return instance;
  }
  instance = useNitroApp._instance = createNitroApp();
  globalThis.__nitro__ = globalThis.__nitro__ || {};
  globalThis.__nitro__[APP_ID] = instance;
  return instance;
}
function useNitroHooks() {
  const nitroApp2 = useNitroApp();
  const hooks = nitroApp2.hooks;
  if (hooks) {
    return hooks;
  }
  return nitroApp2.hooks = new HookableCore();
}
let _matchRouteRules;
function getRouteRules(method, pathname) {
  return (_matchRouteRules ??= memoizeRouteRulesMatcher(createMatcherFromFind(findRouteRules)))(method, pathname);
}
function createRouteRulesMiddleware() {
  const composed = /* @__PURE__ */ new WeakMap();
  const middleware = (event, next) => {
    const ruleMiddleware = getRouteRules(event.req.method, event.url.pathname).routeRuleMiddleware;
    if (ruleMiddleware.length === 0) {
      return next();
    }
    let chain = composed.get(ruleMiddleware);
    if (!chain) {
      chain = composeMiddleware(ruleMiddleware);
      composed.set(ruleMiddleware, chain);
    }
    return chain(event, next);
  };
  return markUntraced(middleware);
}
function markUntraced(middleware) {
  middleware.__traced__ = true;
  return middleware;
}
function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
  process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
  process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
const tracingSrvxPlugins = [];
function setupCloseHooks(server2) {
  const closeServer = server2.close.bind(server2);
  let closeHooks;
  server2.close = (closeActiveConnections) => closeServer(closeActiveConnections).finally(() => closeHooks ??= callCloseHooks());
}
async function callCloseHooks() {
  try {
    await useNitroHooks().callHook("close");
  } catch (error) {
    console.error("[nitro] Error while calling `close` hooks:", error);
  }
}
const _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
const port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
const host = process.env.NITRO_HOST || process.env.HOST;
const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
const server = serve({
  port,
  hostname: host,
  tls: cert && key ? {
    cert,
    key
  } : void 0,
  fetch: nitroApp.fetch,
  plugins: [...tracingSrvxPlugins]
});
setupCloseHooks(server);
trapUnhandledErrors();
const nodeServer = {};
export {
  nodeServer as default
};
