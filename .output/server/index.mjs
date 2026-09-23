globalThis.__nitro_main__ = import.meta.url;
import { NodeResponse, serve } from "./_libs/srvx.mjs";
import { H3Core, HTTPError, composeMiddleware, createMatcherFromFind, defineHandler, defineLazyEventHandler, headers, memoizeRouteRulesMatcher, toEventHandler } from "./_libs/h3+rou3+srvx.mjs";
import { HookableCore } from "./_libs/hookable.mjs";
import { decodePath, joinURL, withLeadingSlash, withoutTrailingSlash } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/barangays-C4AV3piT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a18-ODlECM6j0uqc3P+k3ugMWFcudts\"",
		"mtime": "2026-09-23T14:07:57.230Z",
		"size": 6680,
		"path": "../public/assets/barangays-C4AV3piT.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"25873-2ep6ZU5Pye990LKl3wVlnKA5MGs\"",
		"mtime": "2026-09-17T12:26:58.000Z",
		"size": 153715,
		"path": "../public/favicon.ico"
	},
	"/assets/cbms-recognition-3sBJOoB1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee2-pkZpKSHHJ44ZBHk7EBakmldwTkk\"",
		"mtime": "2026-09-23T14:07:57.230Z",
		"size": 7906,
		"path": "../public/assets/cbms-recognition-3sBJOoB1.js"
	},
	"/assets/cbms-labels-DYLJn5er.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"128-AMh3ELc24gRsI7Oa42qnXAPGq3I\"",
		"mtime": "2026-09-23T14:07:57.230Z",
		"size": 296,
		"path": "../public/assets/cbms-labels-DYLJn5er.js"
	},
	"/assets/cbms-report-defs-DFygP7w-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6ef3-GczRbheT5j0hknN1OQE3hR7FrP0\"",
		"mtime": "2026-09-23T14:07:57.234Z",
		"size": 28403,
		"path": "../public/assets/cbms-report-defs-DFygP7w-.js"
	},
	"/assets/CBMSModals-DB0kFd3y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f01-SNJudfjUEjVniKD15E5qvDv2smI\"",
		"mtime": "2026-09-23T14:07:57.230Z",
		"size": 16129,
		"path": "../public/assets/CBMSModals-DB0kFd3y.js"
	},
	"/app-icon.png": {
		"type": "image/png",
		"etag": "\"5d1f9-FuAvhJRdRfa5RuagK4uNjX8rnEY\"",
		"mtime": "2026-09-17T12:25:50.000Z",
		"size": 381433,
		"path": "../public/app-icon.png"
	},
	"/assets/comparative-CLcVGmtX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6d33-uoHdV1KKO2kVrctmZ7U1s9nkR10\"",
		"mtime": "2026-09-23T14:07:57.234Z",
		"size": 27955,
		"path": "../public/assets/comparative-CLcVGmtX.js"
	},
	"/cbms-insights-logo.png": {
		"type": "image/png",
		"etag": "\"5d1f9-FuAvhJRdRfa5RuagK4uNjX8rnEY\"",
		"mtime": "2026-09-17T12:32:16.000Z",
		"size": 381433,
		"path": "../public/cbms-insights-logo.png"
	},
	"/assets/DataTable-CHPt2fUi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18da-gpO7V8Yla4J1KV0mXAP0BObYClo\"",
		"mtime": "2026-09-23T14:07:57.230Z",
		"size": 6362,
		"path": "../public/assets/DataTable-CHPt2fUi.js"
	},
	"/assets/crosstab-NYkM0TH8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2058-E12h4HzOv+GSZ31eQGjUcSTkiCs\"",
		"mtime": "2026-09-23T14:07:57.237Z",
		"size": 8280,
		"path": "../public/assets/crosstab-NYkM0TH8.js"
	},
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"5d1f9-FuAvhJRdRfa5RuagK4uNjX8rnEY\"",
		"mtime": "2026-09-17T12:25:50.000Z",
		"size": 381433,
		"path": "../public/favicon.png"
	},
	"/assets/export-log-BATgobtI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2051-2xZoptmUNKWCiJGUM5KC2n+6jso\"",
		"mtime": "2026-09-23T14:07:57.242Z",
		"size": 8273,
		"path": "../public/assets/export-log-BATgobtI.js"
	},
	"/assets/demographics-BHNiQunY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"149b-4nS8ysEVyp6LJwkOfZyFzU8Q9lw\"",
		"mtime": "2026-09-23T14:07:57.240Z",
		"size": 5275,
		"path": "../public/assets/demographics-BHNiQunY.js"
	},
	"/assets/import-XvRFlp9T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce-xsNK7I2/I04F8NBr7HUHqlM1PtU\"",
		"mtime": "2026-09-23T14:07:57.256Z",
		"size": 206,
		"path": "../public/assets/import-XvRFlp9T.js"
	},
	"/assets/input-Ck9rqMWG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c4-/ivynKPsUcKFF3NeCet0+J14k5k\"",
		"mtime": "2026-09-23T14:07:57.260Z",
		"size": 708,
		"path": "../public/assets/input-Ck9rqMWG.js"
	},
	"/assets/inspector-Cq74OaFH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30a1-QYAX8fMfJtGiL38KmWXcw6JFsU0\"",
		"mtime": "2026-09-23T14:07:57.267Z",
		"size": 12449,
		"path": "../public/assets/inspector-Cq74OaFH.js"
	},
	"/assets/persons-CosRaZh6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3811-qlxbqKXb1Umzxfcx0yYH5cd/Hnw\"",
		"mtime": "2026-09-23T14:07:57.271Z",
		"size": 14353,
		"path": "../public/assets/persons-CosRaZh6.js"
	},
	"/assets/reports-BvdirmaA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1316-xjFjNDjdqBJv5BfvLzA+XS60Cy8\"",
		"mtime": "2026-09-23T14:07:57.273Z",
		"size": 4886,
		"path": "../public/assets/reports-BvdirmaA.js"
	},
	"/assets/export-log-CK_y-sNA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"234-LIe/DdqIumPMs8v/zWJNrwtYehs\"",
		"mtime": "2026-09-23T14:07:57.246Z",
		"size": 564,
		"path": "../public/assets/export-log-CK_y-sNA.js"
	},
	"/assets/households-_MIGqtPX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b3b-QbYZufQMZrlOraKAWVEVjxVBa60\"",
		"mtime": "2026-09-23T14:07:57.249Z",
		"size": 6971,
		"path": "../public/assets/households-_MIGqtPX.js"
	},
	"/assets/rolldown-runtime-Dd_uD5pT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"452-sZl5y+VnYZJIxKNwHO0DTqczPH0\"",
		"mtime": "2026-09-23T14:07:57.275Z",
		"size": 1106,
		"path": "../public/assets/rolldown-runtime-Dd_uD5pT.js"
	},
	"/assets/cbms-insights-logo-C9waL7MR.png": {
		"type": "image/png",
		"etag": "\"5d1f9-FuAvhJRdRfa5RuagK4uNjX8rnEY\"",
		"mtime": "2026-09-23T14:07:57.291Z",
		"size": 381433,
		"path": "../public/assets/cbms-insights-logo-C9waL7MR.png"
	},
	"/assets/index-C7SNwjOz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3a39a-xD5A9H6RHGAgV03LEXaTUb6cng4\"",
		"mtime": "2026-09-23T14:07:57.228Z",
		"size": 238490,
		"path": "../public/assets/index-C7SNwjOz.js"
	},
	"/assets/compendium-e8avC0r4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"908b6-DupBsROYGawy+SyYaSvi+ybpL3I\"",
		"mtime": "2026-09-23T14:07:57.237Z",
		"size": 592054,
		"path": "../public/assets/compendium-e8avC0r4.js"
	},
	"/assets/routes-C1xumdb_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c19-GDEKjICo7RZ2NWxIo1Nx7FywGAc\"",
		"mtime": "2026-09-23T14:07:57.275Z",
		"size": 7193,
		"path": "../public/assets/routes-C1xumdb_.js"
	},
	"/assets/sectors-BicJS-5G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"162af-NS5g0S+D7yxk7tvHXYnHHVxAtZ4\"",
		"mtime": "2026-09-23T14:07:57.275Z",
		"size": 90799,
		"path": "../public/assets/sectors-BicJS-5G.js"
	},
	"/assets/settings-DL2YEvx6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1da8-4mCg2Uz2fkK1AZzVY5L9GNu8c6g\"",
		"mtime": "2026-09-23T14:07:57.278Z",
		"size": 7592,
		"path": "../public/assets/settings-DL2YEvx6.js"
	},
	"/assets/validation-CSKVG7tj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2db5-t/JtHA6DgQZt2SrARJipJgi/P+0\"",
		"mtime": "2026-09-23T14:07:57.282Z",
		"size": 11701,
		"path": "../public/assets/validation-CSKVG7tj.js"
	},
	"/assets/styles-EXX_vx7S.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1c193-U7j+katahQN0Pgcj1+IGNHzrehQ\"",
		"mtime": "2026-09-23T14:07:57.293Z",
		"size": 115091,
		"path": "../public/assets/styles-EXX_vx7S.css"
	},
	"/assets/troubleshooting-6DYF-MsW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23e7-CfkQavBA/NCh0/Yd3IUZoB00UwM\"",
		"mtime": "2026-09-23T14:07:57.280Z",
		"size": 9191,
		"path": "../public/assets/troubleshooting-6DYF-MsW.js"
	},
	"/assets/vendor-icons-DnZI5zCM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b65-JzGhnPSUidzT4fFpGwMqwNIrD7U\"",
		"mtime": "2026-09-23T14:07:57.285Z",
		"size": 23397,
		"path": "../public/assets/vendor-icons-DnZI5zCM.js"
	},
	"/assets/vendor-react-FO0ydnBk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"328c1-rU1QAB6JRF8icPE8mDt73erLT+c\"",
		"mtime": "2026-09-23T14:07:57.289Z",
		"size": 207041,
		"path": "../public/assets/vendor-react-FO0ydnBk.js"
	},
	"/assets/vendor-others-CVNCshxa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e9a4a-jXEIsfbBfz7PZT6/2bFofYuIR0Q\"",
		"mtime": "2026-09-23T14:07:57.288Z",
		"size": 2005578,
		"path": "../public/assets/vendor-others-CVNCshxa.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
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
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = {
		route: "/assets/**",
		rank: 0,
		rules: [{
			name: "headers",
			route: "/assets/**",
			handler: headers,
			options: { "cache-control": "public, max-age=31536000, immutable" }
		}]
	};
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1);
		let s = p.split("/");
		if (s.length > 1 && s[s.length - 1] === "") {
			s.pop();
			p = p.slice(0, -1);
		}
		if (s.length > 1) {
			if (s[1] === "assets") r.push({
				data: $0,
				params: { "_": p.slice(8) }
			});
		}
		return r.reverse();
	};
})();
var _lazy_82646933e96758f8 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_82646933e96758f8
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
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
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
var _matchRouteRules;
function getRouteRules(method, pathname) {
	return (_matchRouteRules ??= memoizeRouteRulesMatcher(createMatcherFromFind(findRouteRules)))(method, pathname);
}
function createRouteRulesMiddleware() {
	const composed = /* @__PURE__ */ new WeakMap();
	const middleware = (event, next) => {
		const ruleMiddleware = getRouteRules(event.req.method, event.url.pathname).routeRuleMiddleware;
		if (ruleMiddleware.length === 0) return next();
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
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/runtime/internal/shutdown.mjs
function setupCloseHooks(server) {
	const closeServer = server.close.bind(server);
	let closeHooks;
	server.close = (closeActiveConnections) => closeServer(closeActiveConnections).finally(() => closeHooks ??= callCloseHooks());
}
async function callCloseHooks() {
	try {
		await useNitroHooks().callHook("close");
	} catch (error) {
		console.error("[nitro] Error while calling `close` hooks:", error);
	}
}
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
setupCloseHooks(serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
}));
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
