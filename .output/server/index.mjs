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
    "mtime": "2026-09-23T05:05:13.542Z",
    "size": 381433,
    "path": "../public/app-icon.png"
  },
  "/assets/barangays-C1MOJS4l.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190d-nicFnBKaD4hbbMcBxet1OTNm/BE"',
    "mtime": "2026-09-23T05:20:38.197Z",
    "size": 6413,
    "path": "../public/assets/barangays-C1MOJS4l.js"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": '"25873-2ep6ZU5Pye990LKl3wVlnKA5MGs"',
    "mtime": "2026-09-23T05:05:13.546Z",
    "size": 153715,
    "path": "../public/favicon.ico"
  },
  "/cbms-insights-logo.png": {
    "type": "image/png",
    "etag": '"5d1f9-FuAvhJRdRfa5RuagK4uNjX8rnEY"',
    "mtime": "2026-09-23T05:05:13.544Z",
    "size": 381433,
    "path": "../public/cbms-insights-logo.png"
  },
  "/assets/cbms-report-defs-eZ_ePeSx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"efb-q4Zd/7j6AtIw0dsHtUGEEf6iyz4"',
    "mtime": "2026-09-23T05:20:38.201Z",
    "size": 3835,
    "path": "../public/assets/cbms-report-defs-eZ_ePeSx.js"
  },
  "/assets/cbms-recognition-CViKFAVU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f11-7/oysLZWXe4id/d+7pXjyNEP0Zc"',
    "mtime": "2026-09-23T05:20:38.201Z",
    "size": 7953,
    "path": "../public/assets/cbms-recognition-CViKFAVU.js"
  },
  "/assets/CBMSModals-DXBJills.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"bc6f-X+brqc2ujSSFWcMDiTfbYZTjJMU"',
    "mtime": "2026-09-23T05:20:38.201Z",
    "size": 48239,
    "path": "../public/assets/CBMSModals-DXBJills.js"
  },
  "/assets/DataTable-CAPRS2K2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"17cd-DgIxiJ8yPiGXfik/lz9lZDtI45Q"',
    "mtime": "2026-09-23T05:20:38.201Z",
    "size": 6093,
    "path": "../public/assets/DataTable-CAPRS2K2.js"
  },
  "/assets/crosstab-lUfox8HR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f8f-3nScG4ijPElQbEVeF6HIuVRxtDg"',
    "mtime": "2026-09-23T05:20:38.201Z",
    "size": 8079,
    "path": "../public/assets/crosstab-lUfox8HR.js"
  },
  "/assets/comparative-ky7cyfVu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"69f8-hTT5tUbmiQNpY3Xnaa//F80+LP8"',
    "mtime": "2026-09-23T05:20:38.197Z",
    "size": 27128,
    "path": "../public/assets/comparative-ky7cyfVu.js"
  },
  "/assets/cbms-labels-DBkX4hFW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12b-N8UfB4Xs0oVpOmMxoafgTYRbenc"',
    "mtime": "2026-09-23T05:20:38.201Z",
    "size": 299,
    "path": "../public/assets/cbms-labels-DBkX4hFW.js"
  },
  "/assets/demographics-Dgz4xvyL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1469-zWLqOKMWj6YoxwOpFLc519sRJbY"',
    "mtime": "2026-09-23T05:20:38.201Z",
    "size": 5225,
    "path": "../public/assets/demographics-Dgz4xvyL.js"
  },
  "/assets/download-DyrLyNkQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"103-mSZQpG8jbijt69qCz/qB5zZdZxo"',
    "mtime": "2026-09-23T05:20:38.201Z",
    "size": 259,
    "path": "../public/assets/download-DyrLyNkQ.js"
  },
  "/assets/file-archive-bNiE5iVj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18b-75XfBgAzWDLGneyD8blruo11VX8"',
    "mtime": "2026-09-23T05:20:38.201Z",
    "size": 395,
    "path": "../public/assets/file-archive-bNiE5iVj.js"
  },
  "/assets/export-log-BZmzm4HW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ca5-lqdB5z3GjCX8ivCvL0QeNd/QRKU"',
    "mtime": "2026-09-23T05:20:38.201Z",
    "size": 7333,
    "path": "../public/assets/export-log-BZmzm4HW.js"
  },
  "/assets/export-log-BROqMUTI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f8-OmjYEUQd0930XQXahOBALnVpzzc"',
    "mtime": "2026-09-23T05:20:38.201Z",
    "size": 504,
    "path": "../public/assets/export-log-BROqMUTI.js"
  },
  "/assets/file-type-2-Cbi0wr8r.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"25a-r6xGIN8/vJvFbK215Iz4p6Vy+wc"',
    "mtime": "2026-09-23T05:20:38.201Z",
    "size": 602,
    "path": "../public/assets/file-type-2-Cbi0wr8r.js"
  },
  "/assets/file-spreadsheet-DqQ0KEpU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"174-JE//VeUJP3JT0yG+GiAnPT+sdjs"',
    "mtime": "2026-09-23T05:20:38.201Z",
    "size": 372,
    "path": "../public/assets/file-spreadsheet-DqQ0KEpU.js"
  },
  "/assets/food-frequency-DL306Abl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ac9-6rWw9Vm759Z1R9GVobVRCnLERSQ"',
    "mtime": "2026-09-23T05:20:38.201Z",
    "size": 2761,
    "path": "../public/assets/food-frequency-DL306Abl.js"
  },
  "/assets/import-BqGkH60P.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"96-q1Ox2rWQfh4NH0EHLjkisz7Gduw"',
    "mtime": "2026-09-23T05:20:38.201Z",
    "size": 150,
    "path": "../public/assets/import-BqGkH60P.js"
  },
  "/favicon.png": {
    "type": "image/png",
    "etag": '"5d1f9-FuAvhJRdRfa5RuagK4uNjX8rnEY"',
    "mtime": "2026-09-23T05:05:13.548Z",
    "size": 381433,
    "path": "../public/favicon.png"
  },
  "/assets/html2canvas.esm-DXEQVQnt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"31151-TyUyRNm9rR2JDwpyAxcruTmmr6A"',
    "mtime": "2026-09-23T05:20:38.204Z",
    "size": 201041,
    "path": "../public/assets/html2canvas.esm-DXEQVQnt.js"
  },
  "/assets/households-BYhtJxOR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1b28-L1eIzUGa4pxqBGtVusqsgnluZmk"',
    "mtime": "2026-09-23T05:20:38.201Z",
    "size": 6952,
    "path": "../public/assets/households-BYhtJxOR.js"
  },
  "/assets/cbms-insights-logo-C9waL7MR.png": {
    "type": "image/png",
    "etag": '"5d1f9-FuAvhJRdRfa5RuagK4uNjX8rnEY"',
    "mtime": "2026-09-23T05:20:38.188Z",
    "size": 381433,
    "path": "../public/assets/cbms-insights-logo-C9waL7MR.png"
  },
  "/assets/compendium-Ah9rE--9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9566f-hrmTzM+7STXBBgc9uMm1IEqGebg"',
    "mtime": "2026-09-23T05:20:38.201Z",
    "size": 611951,
    "path": "../public/assets/compendium-Ah9rE--9.js"
  },
  "/assets/index.es-CzUi8rU5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26cbf-ixEDL51CP5FLWkaScjbXCtVS31I"',
    "mtime": "2026-09-23T05:20:38.201Z",
    "size": 158911,
    "path": "../public/assets/index.es-CzUi8rU5.js"
  },
  "/assets/index-CYuZOstE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1b21-Bdl8k2DfCRDiGcPREF1vRgRWa7A"',
    "mtime": "2026-09-23T05:20:38.197Z",
    "size": 6945,
    "path": "../public/assets/index-CYuZOstE.js"
  },
  "/assets/info-2nptO_pm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c4-sd/IOTA3T33QSSwLUEEzJUlURo0"',
    "mtime": "2026-09-23T05:20:38.201Z",
    "size": 196,
    "path": "../public/assets/info-2nptO_pm.js"
  },
  "/assets/input-lorzH1yQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"22e-SW6ZL31j+hJ3VFZQIhODmtMl9bM"',
    "mtime": "2026-09-23T05:20:38.201Z",
    "size": 558,
    "path": "../public/assets/input-lorzH1yQ.js"
  },
  "/assets/inspector-DVpRZdy7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"31d4-Izyfl4LxNfJKaCFPHIpz0oO0rP4"',
    "mtime": "2026-09-23T05:20:38.201Z",
    "size": 12756,
    "path": "../public/assets/inspector-DVpRZdy7.js"
  },
  "/assets/persons-DRNFqS3X.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"383e-NlLbCfRQqRN1WTmgqF9mLVgBTms"',
    "mtime": "2026-09-23T05:20:38.201Z",
    "size": 14398,
    "path": "../public/assets/persons-DRNFqS3X.js"
  },
  "/assets/reports-jNhiurSt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e3a-yVttrZvU4nslggSaMjP4mPLKpK8"',
    "mtime": "2026-09-23T05:20:38.201Z",
    "size": 3642,
    "path": "../public/assets/reports-jNhiurSt.js"
  },
  "/assets/purify.es-CEBYger9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"70bc-ACI6reTSHPnxH2qoGnp6HQi6b4E"',
    "mtime": "2026-09-23T05:20:38.206Z",
    "size": 28860,
    "path": "../public/assets/purify.es-CEBYger9.js"
  },
  "/assets/rotate-ccw-DRlYMOGP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c4-0MARuPFi8QtJkdmkxE0BHWMo0GA"',
    "mtime": "2026-09-23T05:20:38.201Z",
    "size": 196,
    "path": "../public/assets/rotate-ccw-DRlYMOGP.js"
  },
  "/assets/wallet-cards-yHESNjmY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"144-YqZU9+wJvGM+4zb7HFvKXvDHcCY"',
    "mtime": "2026-09-23T05:20:38.197Z",
    "size": 324,
    "path": "../public/assets/wallet-cards-yHESNjmY.js"
  },
  "/assets/troubleshooting-DBA1yh_7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2339-MZ9xZyVOgomY0CBCEMhY41sEJuY"',
    "mtime": "2026-09-23T05:20:38.201Z",
    "size": 9017,
    "path": "../public/assets/troubleshooting-DBA1yh_7.js"
  },
  "/assets/settings-CbF0dt62.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c29-C5nJ66Czx4odKdNVUll69l0iNVE"',
    "mtime": "2026-09-23T05:20:38.201Z",
    "size": 7209,
    "path": "../public/assets/settings-CbF0dt62.js"
  },
  "/assets/sectors-Bfphvw74.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1631b-WDCigPJW/scHmQuSSXUeX01Twg0"',
    "mtime": "2026-09-23T05:20:38.201Z",
    "size": 90907,
    "path": "../public/assets/sectors-Bfphvw74.js"
  },
  "/assets/validation-DgUvVKVB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2c9e-uHkeWcVIIkIi2k8QJuvzxDvRPKI"',
    "mtime": "2026-09-23T05:20:38.201Z",
    "size": 11422,
    "path": "../public/assets/validation-DgUvVKVB.js"
  },
  "/assets/styles-SbIDAYTZ.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"1acb6-bWnFVZZ+iyMT0TIJxUqQ1zFm1FU"',
    "mtime": "2026-09-23T05:20:38.197Z",
    "size": 109750,
    "path": "../public/assets/styles-SbIDAYTZ.css"
  },
  "/assets/index-BNisK57o.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1fa825-Ug0U85yS8IUp9U2DSVcKiwZgPeg"',
    "mtime": "2026-09-23T05:20:38.207Z",
    "size": 2074661,
    "path": "../public/assets/index-BNisK57o.js"
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
const _57a043dbe8745eb3 = defineHandler((event) => {
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
const _lazy_82646933e96758f8 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
const findRoute = /* @__PURE__ */ (() => {
  const data = { route: "/**", handler: _lazy_82646933e96758f8 };
  return ((_m, p) => {
    return { data, params: { "_": p.slice(1) } };
  });
})();
const globalMiddleware = [
  toEventHandler(_57a043dbe8745eb3)
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
