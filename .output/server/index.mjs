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
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": '"25873-2ep6ZU5Pye990LKl3wVlnKA5MGs"',
    "mtime": "2026-09-23T16:35:20.000Z",
    "size": 153715,
    "path": "../public/favicon.ico"
  },
  "/assets/cbms-labels-DBkX4hFW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12b-N8UfB4Xs0oVpOmMxoafgTYRbenc"',
    "mtime": "2026-09-24T02:53:00.567Z",
    "size": 299,
    "path": "../public/assets/cbms-labels-DBkX4hFW.js"
  },
  "/assets/cbms-report-defs-BRBQ70jl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"efb-4BIAyNpuRaheDGseQhk8wRsyIV0"',
    "mtime": "2026-09-24T02:53:00.566Z",
    "size": 3835,
    "path": "../public/assets/cbms-report-defs-BRBQ70jl.js"
  },
  "/assets/barangays-CVZCK5I7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"190d-g6AM73o3luKD482TIbP0tP19hwk"',
    "mtime": "2026-09-24T02:53:00.564Z",
    "size": 6413,
    "path": "../public/assets/barangays-CVZCK5I7.js"
  },
  "/assets/CBMSModals-nAKK4KRg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"bc6f-QjCF5myMU2aGqfZjmVI6o48/BfA"',
    "mtime": "2026-09-24T02:53:00.566Z",
    "size": 48239,
    "path": "../public/assets/CBMSModals-nAKK4KRg.js"
  },
  "/assets/cbms-recognition-BKH4ZucT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f11-jPsgB7cSsb/Ifs1DUe0FQ4cx1ok"',
    "mtime": "2026-09-24T02:53:00.567Z",
    "size": 7953,
    "path": "../public/assets/cbms-recognition-BKH4ZucT.js"
  },
  "/assets/comparative-BdtJtNoj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"69f8-shENE0GY6AV/Sixk30QLjEoS4u4"',
    "mtime": "2026-09-24T02:53:00.564Z",
    "size": 27128,
    "path": "../public/assets/comparative-BdtJtNoj.js"
  },
  "/favicon.png": {
    "type": "image/png",
    "etag": '"5d1f9-FuAvhJRdRfa5RuagK4uNjX8rnEY"',
    "mtime": "2026-09-23T16:35:20.000Z",
    "size": 381433,
    "path": "../public/favicon.png"
  },
  "/cbms-insights-logo.png": {
    "type": "image/png",
    "etag": '"5d1f9-FuAvhJRdRfa5RuagK4uNjX8rnEY"',
    "mtime": "2026-09-23T16:35:20.000Z",
    "size": 381433,
    "path": "../public/cbms-insights-logo.png"
  },
  "/assets/crosstab-D1_pJtnX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f8f-77jfHIeOAi5tOZbtzUaPRvQvYG4"',
    "mtime": "2026-09-24T02:53:00.564Z",
    "size": 8079,
    "path": "../public/assets/crosstab-D1_pJtnX.js"
  },
  "/assets/DataTable-SC_8xWke.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"17cd-I9J67ZNR9dDhwKy1DpLBs+EQcCw"',
    "mtime": "2026-09-24T02:53:00.566Z",
    "size": 6093,
    "path": "../public/assets/DataTable-SC_8xWke.js"
  },
  "/assets/demographics-CT-9Dp4p.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1469-0WlHGqsALr0xbYG8tCm0bXGmEBE"',
    "mtime": "2026-09-24T02:53:00.565Z",
    "size": 5225,
    "path": "../public/assets/demographics-CT-9Dp4p.js"
  },
  "/assets/download-qxIAu3cA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"103-4O41oTea8cCZ53cVMOwaruM4zcw"',
    "mtime": "2026-09-24T02:53:00.566Z",
    "size": 259,
    "path": "../public/assets/download-qxIAu3cA.js"
  },
  "/assets/export-log-CVWj6qS5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ca5-hixNABSlABvabndStnaoO9ICjtk"',
    "mtime": "2026-09-24T02:53:00.565Z",
    "size": 7333,
    "path": "../public/assets/export-log-CVWj6qS5.js"
  },
  "/assets/file-archive-CLARMZeE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"18b-EyqU6LtYLW8dP19q4HyLk5u5imE"',
    "mtime": "2026-09-24T02:53:00.565Z",
    "size": 395,
    "path": "../public/assets/file-archive-CLARMZeE.js"
  },
  "/assets/file-spreadsheet-BFtgrZK-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"174-rg+6PiTpcDyDwyq/fpBSSvDMvSo"',
    "mtime": "2026-09-24T02:53:00.566Z",
    "size": 372,
    "path": "../public/assets/file-spreadsheet-BFtgrZK-.js"
  },
  "/assets/food-frequency-DL306Abl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ac9-6rWw9Vm759Z1R9GVobVRCnLERSQ"',
    "mtime": "2026-09-24T02:53:00.566Z",
    "size": 2761,
    "path": "../public/assets/food-frequency-DL306Abl.js"
  },
  "/assets/export-log-CRwtKAch.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f8-FLiST/lM+b+WTEiBb71cRqhjsvs"',
    "mtime": "2026-09-24T02:53:00.565Z",
    "size": 504,
    "path": "../public/assets/export-log-CRwtKAch.js"
  },
  "/assets/file-type-2-dhXvYcT1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"25a-Lou8jklOEULJFR98MPOKB3r56XE"',
    "mtime": "2026-09-24T02:53:00.567Z",
    "size": 602,
    "path": "../public/assets/file-type-2-dhXvYcT1.js"
  },
  "/assets/households-BufQ-71S.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1b28-Wuvx6JUroqxpJxmysX+kevIF1s8"',
    "mtime": "2026-09-24T02:53:00.565Z",
    "size": 6952,
    "path": "../public/assets/households-BufQ-71S.js"
  },
  "/assets/import-DrOyKe8U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"96-aD93DHrU1S9krGPdZF77o2wluyI"',
    "mtime": "2026-09-24T02:53:00.565Z",
    "size": 150,
    "path": "../public/assets/import-DrOyKe8U.js"
  },
  "/app-icon.png": {
    "type": "image/png",
    "etag": '"5d1f9-FuAvhJRdRfa5RuagK4uNjX8rnEY"',
    "mtime": "2026-09-23T16:35:20.000Z",
    "size": 381433,
    "path": "../public/app-icon.png"
  },
  "/assets/html2canvas.esm-DXEQVQnt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"31151-TyUyRNm9rR2JDwpyAxcruTmmr6A"',
    "mtime": "2026-09-24T02:53:00.567Z",
    "size": 201041,
    "path": "../public/assets/html2canvas.esm-DXEQVQnt.js"
  },
  "/assets/cbms-insights-logo-C9waL7MR.png": {
    "type": "image/png",
    "etag": '"5d1f9-FuAvhJRdRfa5RuagK4uNjX8rnEY"',
    "mtime": "2026-09-24T02:53:00.553Z",
    "size": 381433,
    "path": "../public/assets/cbms-insights-logo-C9waL7MR.png"
  },
  "/assets/compendium-CdPLMxDD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9566f-CUq4Wm0f6MKNFwtlm0lb/YLfgfU"',
    "mtime": "2026-09-24T02:53:00.567Z",
    "size": 611951,
    "path": "../public/assets/compendium-CdPLMxDD.js"
  },
  "/assets/index-IoRp87K7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1b21-4wgbIGI0FQqwzMWoU27oxYhZRG4"',
    "mtime": "2026-09-24T02:53:00.564Z",
    "size": 6945,
    "path": "../public/assets/index-IoRp87K7.js"
  },
  "/assets/info-Cl-E2tyX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c4-Y2wuwSqbGI5KtVHXWL/mo1hcO+4"',
    "mtime": "2026-09-24T02:53:00.566Z",
    "size": 196,
    "path": "../public/assets/info-Cl-E2tyX.js"
  },
  "/assets/inspector-C23vO1X9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"31d4-0z/2BYBR2NjGPkwA7OTTtSzvwQU"',
    "mtime": "2026-09-24T02:53:00.565Z",
    "size": 12756,
    "path": "../public/assets/inspector-C23vO1X9.js"
  },
  "/assets/purify.es-CEBYger9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"70bc-ACI6reTSHPnxH2qoGnp6HQi6b4E"',
    "mtime": "2026-09-24T02:53:00.567Z",
    "size": 28860,
    "path": "../public/assets/purify.es-CEBYger9.js"
  },
  "/assets/persons-C5L6yqdK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"383e-ewz5gYYmzW1sy4S5APTFk0bjss4"',
    "mtime": "2026-09-24T02:53:00.565Z",
    "size": 14398,
    "path": "../public/assets/persons-C5L6yqdK.js"
  },
  "/assets/index.es-B8MV4gWX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26cbf-o0eoMeAPPTe6oegsFNV6f/MW3nc"',
    "mtime": "2026-09-24T02:53:00.568Z",
    "size": 158911,
    "path": "../public/assets/index.es-B8MV4gWX.js"
  },
  "/assets/input-1Z_iAHpY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"22e-WdoIL+x3xMWIpEyh+zwFLfqsKKU"',
    "mtime": "2026-09-24T02:53:00.566Z",
    "size": 558,
    "path": "../public/assets/input-1Z_iAHpY.js"
  },
  "/assets/reports-MLhqLTRq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e3a-ro0131QMcpYuxwxAvRCrKANi1Tc"',
    "mtime": "2026-09-24T02:53:00.566Z",
    "size": 3642,
    "path": "../public/assets/reports-MLhqLTRq.js"
  },
  "/assets/settings-D5SrVJkE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1c29-Vx++clsX/RymYtxSjsHS35tIP58"',
    "mtime": "2026-09-24T02:53:00.567Z",
    "size": 7209,
    "path": "../public/assets/settings-D5SrVJkE.js"
  },
  "/assets/rotate-ccw-Bz98AxsJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c4-eZdd+9/mVmAKJJnNB9f452xuBto"',
    "mtime": "2026-09-24T02:53:00.566Z",
    "size": 196,
    "path": "../public/assets/rotate-ccw-Bz98AxsJ.js"
  },
  "/assets/sectors-CN9nddq0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1631b-WdON4Hgo26XHqkVLCSu8BZ9gBcA"',
    "mtime": "2026-09-24T02:53:00.566Z",
    "size": 90907,
    "path": "../public/assets/sectors-CN9nddq0.js"
  },
  "/assets/wallet-cards-DaIpIfNX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"144-ua2pfsDnxoZj67svGKaRLaU/IGs"',
    "mtime": "2026-09-24T02:53:00.565Z",
    "size": 324,
    "path": "../public/assets/wallet-cards-DaIpIfNX.js"
  },
  "/assets/troubleshooting-DKJQ3LBY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2339-lGOPE+vE0s3m6VeOe1NtNAqqvpk"',
    "mtime": "2026-09-24T02:53:00.566Z",
    "size": 9017,
    "path": "../public/assets/troubleshooting-DKJQ3LBY.js"
  },
  "/assets/validation-BJR4FJV5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2c9e-QvJ8F8zlXvSaNKoDhD3/pyr0x94"',
    "mtime": "2026-09-24T02:53:00.566Z",
    "size": 11422,
    "path": "../public/assets/validation-BJR4FJV5.js"
  },
  "/assets/styles-WPvKSbup.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"1bd19-4dnXfisaUO2a/e7C4esm8CSRSMc"',
    "mtime": "2026-09-24T02:53:00.564Z",
    "size": 113945,
    "path": "../public/assets/styles-WPvKSbup.css"
  },
  "/assets/index-CXOrTLeW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1fbb5f-lwMf/WgRPmWUNradiIounnFd8WE"',
    "mtime": "2026-09-24T02:53:00.575Z",
    "size": 2079583,
    "path": "../public/assets/index-CXOrTLeW.js"
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
