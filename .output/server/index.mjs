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
  "/favicon.png": {
    "type": "image/png",
    "etag": '"5d1f9-FuAvhJRdRfa5RuagK4uNjX8rnEY"',
    "mtime": "2026-09-17T12:25:51.000Z",
    "size": 381433,
    "path": "../public/favicon.png"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": '"25873-2ep6ZU5Pye990LKl3wVlnKA5MGs"',
    "mtime": "2026-09-17T12:26:59.000Z",
    "size": 153715,
    "path": "../public/favicon.ico"
  },
  "/assets/cbms-labels-DBkX4hFW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12b-N8UfB4Xs0oVpOmMxoafgTYRbenc"',
    "mtime": "2026-09-23T05:55:50.694Z",
    "size": 299,
    "path": "../public/assets/cbms-labels-DBkX4hFW.js"
  },
  "/assets/barangays-LhKTayLq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190d-xmMQJeyQ+5Yqfle04BdDna3SDnY"',
    "mtime": "2026-09-23T05:55:50.690Z",
    "size": 6413,
    "path": "../public/assets/barangays-LhKTayLq.js"
  },
  "/cbms-insights-logo.png": {
    "type": "image/png",
    "etag": '"5d1f9-FuAvhJRdRfa5RuagK4uNjX8rnEY"',
    "mtime": "2026-09-17T12:32:16.000Z",
    "size": 381433,
    "path": "../public/cbms-insights-logo.png"
  },
  "/assets/cbms-report-defs-CvakwyGc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6f85-2UPIklMQ041i14OB08HsJo8jB0w"',
    "mtime": "2026-09-23T05:55:50.692Z",
    "size": 28549,
    "path": "../public/assets/cbms-report-defs-CvakwyGc.js"
  },
  "/assets/comparative-DPFR3wDh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"69f8-auIiRcFqTDH9Hmezfuh/j07NlpQ"',
    "mtime": "2026-09-23T05:55:50.690Z",
    "size": 27128,
    "path": "../public/assets/comparative-DPFR3wDh.js"
  },
  "/assets/demographics-QJ6jLFy5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1469-Lm8NfqG5tCvI/9Q0ebUL0oys2HI"',
    "mtime": "2026-09-23T05:55:50.692Z",
    "size": 5225,
    "path": "../public/assets/demographics-QJ6jLFy5.js"
  },
  "/assets/cbms-recognition-CR5nv9tp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f11-kGaxECxXr3pWpoZkYv8fg1wRqvA"',
    "mtime": "2026-09-23T05:55:50.694Z",
    "size": 7953,
    "path": "../public/assets/cbms-recognition-CR5nv9tp.js"
  },
  "/app-icon.png": {
    "type": "image/png",
    "etag": '"5d1f9-FuAvhJRdRfa5RuagK4uNjX8rnEY"',
    "mtime": "2026-09-17T12:25:51.000Z",
    "size": 381433,
    "path": "../public/app-icon.png"
  },
  "/assets/CBMSModals-Cf9gRjU8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"bc6f-vMfuScdpiJc/dXrNh/47mQ5cm8o"',
    "mtime": "2026-09-23T05:55:50.692Z",
    "size": 48239,
    "path": "../public/assets/CBMSModals-Cf9gRjU8.js"
  },
  "/assets/DataTable-7_q--vFP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"17cd-4JaInK7eo5Bzb7UOCjplFbqYfBk"',
    "mtime": "2026-09-23T05:55:50.692Z",
    "size": 6093,
    "path": "../public/assets/DataTable-7_q--vFP.js"
  },
  "/assets/download-CSUYvQKS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"103-1mqOejRINmD99Z4OFGM85tzzrcQ"',
    "mtime": "2026-09-23T05:55:50.692Z",
    "size": 259,
    "path": "../public/assets/download-CSUYvQKS.js"
  },
  "/assets/export-log-DUlP3m5r.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f8-IdjVA7QnjPBwluVnKizqBY2O5dI"',
    "mtime": "2026-09-23T05:55:50.690Z",
    "size": 504,
    "path": "../public/assets/export-log-DUlP3m5r.js"
  },
  "/assets/export-log-DxXPW0UG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f63-L/vu4nQAEjdVT6RY2g+6ZVbc5Ao"',
    "mtime": "2026-09-23T05:55:50.692Z",
    "size": 8035,
    "path": "../public/assets/export-log-DxXPW0UG.js"
  },
  "/assets/file-type-2-Ct7XCpwM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"25a-/VTaarC7KfDMX6ejDiVvBHz/fx0"',
    "mtime": "2026-09-23T05:55:50.694Z",
    "size": 602,
    "path": "../public/assets/file-type-2-Ct7XCpwM.js"
  },
  "/assets/file-archive-DAA9AnJW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18b-P85APfifEco3GiK0j4HbTj4brwE"',
    "mtime": "2026-09-23T05:55:50.692Z",
    "size": 395,
    "path": "../public/assets/file-archive-DAA9AnJW.js"
  },
  "/assets/file-spreadsheet-WqLRIbgY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"174-FSftaUgyKYMMV7JUr93iBsSi1tk"',
    "mtime": "2026-09-23T05:55:50.692Z",
    "size": 372,
    "path": "../public/assets/file-spreadsheet-WqLRIbgY.js"
  },
  "/assets/food-frequency-DL306Abl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ac9-6rWw9Vm759Z1R9GVobVRCnLERSQ"',
    "mtime": "2026-09-23T05:55:50.692Z",
    "size": 2761,
    "path": "../public/assets/food-frequency-DL306Abl.js"
  },
  "/assets/crosstab-C8LoXWYt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f8f-WdjrH3BUjl7od3acNU1loQJ1/G8"',
    "mtime": "2026-09-23T05:55:50.692Z",
    "size": 8079,
    "path": "../public/assets/crosstab-C8LoXWYt.js"
  },
  "/assets/import-D7hnfDLJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"96-tsYZ8eopkUN2XIXzKFjgobN9iyA"',
    "mtime": "2026-09-23T05:55:50.692Z",
    "size": 150,
    "path": "../public/assets/import-D7hnfDLJ.js"
  },
  "/assets/households-BdjqYDvE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1b28-uHv/OgYTYXeZ2SQVuKNOFMjd7Pg"',
    "mtime": "2026-09-23T05:55:50.692Z",
    "size": 6952,
    "path": "../public/assets/households-BdjqYDvE.js"
  },
  "/assets/html2canvas.esm-DXEQVQnt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"31151-TyUyRNm9rR2JDwpyAxcruTmmr6A"',
    "mtime": "2026-09-23T05:55:50.694Z",
    "size": 201041,
    "path": "../public/assets/html2canvas.esm-DXEQVQnt.js"
  },
  "/assets/cbms-insights-logo-C9waL7MR.png": {
    "type": "image/png",
    "etag": '"5d1f9-FuAvhJRdRfa5RuagK4uNjX8rnEY"',
    "mtime": "2026-09-23T05:55:50.668Z",
    "size": 381433,
    "path": "../public/assets/cbms-insights-logo-C9waL7MR.png"
  },
  "/assets/compendium-rN4o1-GY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"90288-Ku9ZbBtScvgO/6lkcAvN52OSGDk"',
    "mtime": "2026-09-23T05:55:50.694Z",
    "size": 590472,
    "path": "../public/assets/compendium-rN4o1-GY.js"
  },
  "/assets/index-CuLU_I3s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1b21-pCoUCVATCfn+yQwImtjAISVfHKg"',
    "mtime": "2026-09-23T05:55:50.690Z",
    "size": 6945,
    "path": "../public/assets/index-CuLU_I3s.js"
  },
  "/assets/info-ABVqKuIO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c4-1O5EDkbNkZYPG7g4EefmSlGdRT0"',
    "mtime": "2026-09-23T05:55:50.694Z",
    "size": 196,
    "path": "../public/assets/info-ABVqKuIO.js"
  },
  "/assets/input-CjCvxZnG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"22e-l0PljPTsfHMskSzeuW8aYdS2bPI"',
    "mtime": "2026-09-23T05:55:50.692Z",
    "size": 558,
    "path": "../public/assets/input-CjCvxZnG.js"
  },
  "/assets/inspector-DmkGa63L.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"31d4-c9ICHVgZwKDypsl/n2lR3Ztxj0Q"',
    "mtime": "2026-09-23T05:55:50.692Z",
    "size": 12756,
    "path": "../public/assets/inspector-DmkGa63L.js"
  },
  "/assets/persons-BW0Tbf3K.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"383e-EwZJ90u/U5fH/cPvjk23+Xd9ARE"',
    "mtime": "2026-09-23T05:55:50.692Z",
    "size": 14398,
    "path": "../public/assets/persons-BW0Tbf3K.js"
  },
  "/assets/purify.es-CEBYger9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"70bc-ACI6reTSHPnxH2qoGnp6HQi6b4E"',
    "mtime": "2026-09-23T05:55:50.694Z",
    "size": 28860,
    "path": "../public/assets/purify.es-CEBYger9.js"
  },
  "/assets/index.es-B3Z2whsQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26cbf-mODbnXNjdMKy8CHNwc2le9joF4E"',
    "mtime": "2026-09-23T05:55:50.694Z",
    "size": 158911,
    "path": "../public/assets/index.es-B3Z2whsQ.js"
  },
  "/assets/rotate-ccw-Csh-hP2Z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c4-7HXSWwJEaICegYfILwJ0gDUo+nE"',
    "mtime": "2026-09-23T05:55:50.694Z",
    "size": 196,
    "path": "../public/assets/rotate-ccw-Csh-hP2Z.js"
  },
  "/assets/settings-p2LgNMSF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c29-t4JJpka1j4azhtXk/3abwUXPH/A"',
    "mtime": "2026-09-23T05:55:50.694Z",
    "size": 7209,
    "path": "../public/assets/settings-p2LgNMSF.js"
  },
  "/assets/reports-CJGn8lcF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"105e-xyEkwQChoT9GJSMC4XIB2jYzldA"',
    "mtime": "2026-09-23T05:55:50.692Z",
    "size": 4190,
    "path": "../public/assets/reports-CJGn8lcF.js"
  },
  "/assets/validation-CdJpYwCL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2c9e-0qS+TP/EYYWOUGOhRZk1bVeCD8w"',
    "mtime": "2026-09-23T05:55:50.694Z",
    "size": 11422,
    "path": "../public/assets/validation-CdJpYwCL.js"
  },
  "/assets/wallet-cards-pW7m6ntD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"144-iLCEC8xnPiDJ+mX0s27nceO7V0E"',
    "mtime": "2026-09-23T05:55:50.690Z",
    "size": 324,
    "path": "../public/assets/wallet-cards-pW7m6ntD.js"
  },
  "/assets/sectors-BYdSc9_8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1631b-aLS14LhdpZ5Q9nvruAGqPPlOPvs"',
    "mtime": "2026-09-23T05:55:50.692Z",
    "size": 90907,
    "path": "../public/assets/sectors-BYdSc9_8.js"
  },
  "/assets/styles-CidEOaxd.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"1ad94-2NWIz1COfurYDC2Lnvly6J9Od8E"',
    "mtime": "2026-09-23T05:55:50.690Z",
    "size": 109972,
    "path": "../public/assets/styles-CidEOaxd.css"
  },
  "/assets/troubleshooting-tFqXWN-i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2339-LvSGz5PTtkjvuENDiSCwk0nKmBQ"',
    "mtime": "2026-09-23T05:55:50.694Z",
    "size": 9017,
    "path": "../public/assets/troubleshooting-tFqXWN-i.js"
  },
  "/assets/index-BvtE8lvp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1fa774-O90Pm2lnIDukHlU7ynN8DzgzGgQ"',
    "mtime": "2026-09-23T05:55:50.701Z",
    "size": 2074484,
    "path": "../public/assets/index-BvtE8lvp.js"
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
