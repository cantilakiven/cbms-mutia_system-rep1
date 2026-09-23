import { __exportAll } from "../_runtime.mjs";
//#region node_modules/@zip.js/zip.js/lib/core/constants.js
var MAX_32_BITS = 4294967295;
var MAX_16_BITS = 65535;
var LOCAL_FILE_HEADER_SIGNATURE = 67324752;
var SPLIT_ZIP_FILE_SIGNATURE = 134695760;
var DATA_DESCRIPTOR_RECORD_SIGNATURE = SPLIT_ZIP_FILE_SIGNATURE;
var DIGITAL_SIGNATURE_RECORD_SIGNATURE = 84233040;
var CENTRAL_FILE_HEADER_SIGNATURE = 33639248;
var END_OF_CENTRAL_DIR_SIGNATURE = 101010256;
var ZIP64_END_OF_CENTRAL_DIR_SIGNATURE = 101075792;
var ZIP64_END_OF_CENTRAL_DIR_LOCATOR_SIGNATURE = 117853008;
var EXTRAFIELD_TYPE_AES = 39169;
var EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP = 21589;
var EXTRAFIELD_TYPE_UNICODE_PATH = 28789;
var EXTRAFIELD_TYPE_UNICODE_COMMENT = 25461;
var EXTRAFIELD_TYPE_USDZ = 6534;
var EXTRAFIELD_TYPE_INFOZIP = 30837;
var EXTRAFIELD_TYPE_UNIX = 30805;
var EXTRAFIELD_TYPE_UNIX_TYPE1 = 22613;
var BITFLAG_LANG_ENCODING_FLAG = 2048;
var FILE_ATTR_UNIX_TYPE_MASK = 61440;
var FILE_ATTR_UNIX_TYPE_DIR = 16384;
var FILE_ATTR_UNIX_TYPE_SYMLINK = 40960;
var FILE_ATTR_UNIX_TYPE_FILE = 32768;
var FILE_ATTR_UNIX_SETUID_MASK = 2048;
var FILE_ATTR_UNIX_SETGID_MASK = 1024;
var MAX_DATE = new Date(2107, 11, 31, 23, 59, 58);
var MIN_DATE = new Date(1980, 0, 1);
var INFINITY_VALUE = Infinity;
var UNDEFINED_TYPE = "undefined";
var FUNCTION_TYPE = "function";
var EMPTY_UINT8_ARRAY = /* @__PURE__ */ new Uint8Array();
var SYMBOL_ASYNC_DISPOSE = Symbol.asyncDispose || Symbol();
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/options.js
var OPTION_FILENAME_ENCODING = "filenameEncoding";
var OPTION_COMMENT_ENCODING = "commentEncoding";
var OPTION_EXTRACT_PREPENDED_DATA = "extractPrependedData";
var OPTION_EXTRACT_APPENDED_DATA = "extractAppendedData";
var OPTION_PASSWORD = "password";
var OPTION_RAW_PASSWORD = "rawPassword";
var OPTION_PASS_THROUGH = "passThrough";
var OPTION_SIGNAL = "signal";
var OPTION_CHECK_PASSWORD_ONLY = "checkPasswordOnly";
var OPTION_CHECK_OVERLAPPING_ENTRY_ONLY = "checkOverlappingEntryOnly";
var OPTION_CHECK_OVERLAPPING_ENTRY = "checkOverlappingEntry";
var OPTION_CHECK_AMBIGUITY = "checkAmbiguity";
var OPTION_CHECK_LOCAL_DIRECTORY = "checkLocalDirectory";
var OPTION_CHECK_LOCAL_FILENAME = "checkLocalFilename";
var OPTION_CHECK_CRC32 = "checkCrc32";
var OPTION_CHECK_AUTHENTICATION_CODE = "checkAuthenticationCode";
var OPTION_USE_WEB_WORKERS = "useWebWorkers";
var OPTION_USE_COMPRESSION_STREAM = "useCompressionStream";
var OPTION_TRANSFER_STREAMS = "transferStreams";
var OPTION_ENCRYPTION_STRENGTH = "encryptionStrength";
var OPTION_EXTENDED_TIMESTAMP = "extendedTimestamp";
var OPTION_NTFS_TIMESTAMP = "ntfsTimestamp";
var OPTION_KEEP_ORDER = "keepOrder";
var OPTION_LEVEL = "level";
var OPTION_BUFFERED_WRITE = "bufferedWrite";
var OPTION_CREATE_TEMP_STREAM = "createTempStream";
var OPTION_DATA_DESCRIPTOR_SIGNATURE = "dataDescriptorSignature";
var OPTION_USE_UNICODE_FILE_NAMES = "useUnicodeFileNames";
var OPTION_DATA_DESCRIPTOR = "dataDescriptor";
var OPTION_OFFSET = "offset";
var OPTION_USDZ = "usdz";
var OPTION_UNIX_EXTRA_FIELD_TYPE = "unixExtraFieldType";
var OPTION_LOCAL_EXTRA_FIELD = "localExtraField";
var OPTION_CENTRAL_EXTRA_FIELD = "centralExtraField";
var OPTION_STRICTNESS = "strictness";
var OPTION_FILENAME_VALIDATION = "filenameValidation";
var OPTION_NORMALIZE_FILENAME = "normalizeFilename";
var OPTION_MAX_APPENDED_DATA_SIZE = "maxAppendedDataSize";
var OPTION_DECRYPT_CENTRAL_DIRECTORY = "decryptCentralDirectory";
var OPTION_SIGN_CENTRAL_DIRECTORY = "signCentralDirectory";
var OPTION_ENTRY = "entry";
var TEXT_TYPE_FILENAME = "filename";
var TEXT_TYPE_COMMENT = "comment";
var STRICTNESS_STRICT = "strict";
var STRICTNESS_BALANCED = "balanced";
var STRICTNESS_TOLERANT = "tolerant";
var ERR_INVALID_FUNCTION_OPTION = "Invalid option (must be a function)";
var ERR_INVALID_SIGNAL = "Invalid signal (must be an AbortSignal instance)";
var ERR_INVALID_PASSWORD_TYPE = "Invalid password (password must be a string, rawPassword must be a Uint8Array)";
var ERR_INVALID_PASS_THROUGH_VALUE = "Invalid passThrough option (must be a boolean or 'compressed')";
var ERR_ABORTED = "The operation was aborted";
var ABORT_ERROR_NAME = "AbortError";
function checkFunctionOption(value) {
	if (value && typeof value != "function") throw new Error(ERR_INVALID_FUNCTION_OPTION);
	return value;
}
function checkSignalOption(signal) {
	if (signal && (typeof signal.addEventListener != "function" || typeof signal.aborted != "boolean")) throw new Error(ERR_INVALID_SIGNAL);
	return signal || void 0;
}
function throwIfAborted(signal) {
	if (signal && signal.aborted) throw signal.reason === void 0 ? new DOMException(ERR_ABORTED, ABORT_ERROR_NAME) : signal.reason;
}
function checkPasswordOption(password, rawPassword) {
	if (password && typeof password != "string" || rawPassword && !(rawPassword instanceof Uint8Array)) throw new Error(ERR_INVALID_PASSWORD_TYPE);
}
function checkPassThroughOption(passThrough) {
	if (passThrough !== void 0 && typeof passThrough != "boolean" && passThrough !== "compressed") throw new Error(ERR_INVALID_PASS_THROUGH_VALUE);
	return passThrough;
}
function checkInteger(value, maxValue, errorMessage) {
	if (!Number.isInteger(value) || value < 0 || value > maxValue) throw new Error(errorMessage);
}
function checkIntegerOption(value, maxValue, errorMessage) {
	if (value !== void 0) checkInteger(value, maxValue, errorMessage);
}
function toNumber(value) {
	return typeof value == "string" && value.trim() ? Number(value) : value;
}
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/configuration.js
var DEFAULT_CHUNK_SIZE$1 = 65536;
var MINIMUM_CHUNK_SIZE = 64;
var MINIMUM_PROPERTY_VALUE = 1;
var ERR_INVALID_MAX_WORKERS = "Invalid maxWorkers (must be an integer greater than 0)";
var ERR_INVALID_BASE_URI = "Invalid baseURI (must be a string)";
var ERR_INVALID_URI = "Invalid URI (must be a string or a function returning a string)";
var maxWorkers = 2;
try {
	if (typeof navigator != "undefined" && navigator.hardwareConcurrency) maxWorkers = navigator.hardwareConcurrency;
} catch {}
var DEFAULT_CONFIGURATION = {
	workerURI: "./core/web-worker-wasm.js",
	wasmURI: "./core/streams/zlib-wasm/zlib-streams.wasm",
	chunkSize: DEFAULT_CHUNK_SIZE$1,
	maxWorkers,
	terminateWorkerTimeout: 5e3,
	workerStarvationTimeout: 5e3,
	workerStartupTimeout: 5e3,
	useWebWorkers: true,
	useCompressionStream: true,
	transferStreams: true,
	CompressionStream: typeof CompressionStream != "undefined" && CompressionStream,
	DecompressionStream: typeof DecompressionStream != "undefined" && DecompressionStream
};
var PROPERTY_NAME_MAX_WORKERS = "maxWorkers";
var PROPERTY_NAME_BASE_URI = "baseURI";
var URI_PROPERTY_NAMES = ["wasmURI", "workerURI"];
var BOOLEAN_PROPERTY_NAMES = [
	"useCompressionStream",
	"useWebWorkers",
	"transferStreams"
];
var NUMBER_PROPERTY_NAMES = [
	"chunkSize",
	PROPERTY_NAME_MAX_WORKERS,
	"terminateWorkerTimeout",
	"workerStarvationTimeout",
	"workerStartupTimeout"
];
var FUNCTION_PROPERTY_NAMES = [
	"createWorker",
	"CompressionStream",
	"DecompressionStream",
	"CompressionStreamFallback",
	"DecompressionStreamFallback"
];
var CONFIGURABLE_PROPERTY_NAMES = [
	PROPERTY_NAME_BASE_URI,
	...URI_PROPERTY_NAMES,
	...BOOLEAN_PROPERTY_NAMES,
	...NUMBER_PROPERTY_NAMES,
	...FUNCTION_PROPERTY_NAMES
];
var config = { ...DEFAULT_CONFIGURATION };
function getConfiguration() {
	return config;
}
function getChunkSize(config) {
	return normalizeChunkSize(config.chunkSize);
}
function normalizeChunkSize(chunkSize) {
	chunkSize = toNumber(chunkSize);
	return Number.isInteger(chunkSize) && chunkSize >= MINIMUM_PROPERTY_VALUE ? Math.max(chunkSize, MINIMUM_CHUNK_SIZE) : DEFAULT_CHUNK_SIZE$1;
}
function checkConfiguration(configuration) {
	const checkedConfiguration = {};
	for (const propertyName of CONFIGURABLE_PROPERTY_NAMES) {
		const propertyValue = configuration[propertyName];
		if (propertyValue !== void 0) checkedConfiguration[propertyName] = checkPropertyValue(propertyName, propertyValue);
	}
	return checkedConfiguration;
}
function checkPropertyValue(propertyName, propertyValue) {
	if (NUMBER_PROPERTY_NAMES.includes(propertyName)) {
		propertyValue = toNumber(propertyValue);
		if (propertyName == PROPERTY_NAME_MAX_WORKERS && (!Number.isInteger(propertyValue) || propertyValue < MINIMUM_PROPERTY_VALUE)) throw new Error(ERR_INVALID_MAX_WORKERS);
	} else if (FUNCTION_PROPERTY_NAMES.includes(propertyName)) checkFunctionOption(propertyValue);
	else if (propertyName == PROPERTY_NAME_BASE_URI) {
		if (propertyValue && typeof propertyValue != "string") throw new Error(ERR_INVALID_BASE_URI);
	} else if (URI_PROPERTY_NAMES.includes(propertyName)) {
		if (propertyValue && typeof propertyValue != "string" && typeof propertyValue != "function") throw new Error(ERR_INVALID_URI);
	}
	return propertyValue;
}
function normalizeConfiguration(configuration) {
	configuration = configuration || {};
	const { CompressionStreamZlib, DecompressionStreamZlib } = configuration;
	if (CompressionStreamZlib === void 0 && DecompressionStreamZlib === void 0) return configuration;
	const normalizedConfiguration = Object.assign({}, configuration);
	if (normalizedConfiguration.CompressionStreamFallback === void 0) normalizedConfiguration.CompressionStreamFallback = CompressionStreamZlib;
	if (normalizedConfiguration.DecompressionStreamFallback === void 0) normalizedConfiguration.DecompressionStreamFallback = DecompressionStreamZlib;
	return normalizedConfiguration;
}
function setDefaultConfiguration(configuration) {
	const checkedConfiguration = checkConfiguration(normalizeConfiguration(configuration));
	Object.assign(DEFAULT_CONFIGURATION, checkedConfiguration);
	Object.assign(config, checkedConfiguration);
}
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/web-worker-inline-wasm.js
var t$1 = /* @__PURE__ */ new Uint8Array(288);
t$1.fill(8, 0, 144), t$1.fill(9, 144, 256), t$1.fill(7, 256, 280), t$1.fill(8, 280, 288), (/* @__PURE__ */ new Uint8Array(30)).fill(5);
var n$1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var e$1 = (t) => t({ workerURI: (t) => {
	const e = "text/javascript";
	let r = "!function(t){\"function\"==typeof define&&define.amd?define(t):t()}(function(){\"use strict\";const{Array:t,Object:n,Number:e,Math:o,Error:r,Uint8Array:s,Uint16Array:c,Uint32Array:i,Int32Array:a,Map:f,DataView:u,Promise:w,TextEncoder:l,crypto:h,postMessage:p,TransformStream:d,ReadableStream:y,WritableStream:m,CompressionStream:S,DecompressionStream:g}=self,v=void 0,z=\"undefined\",b=\"function\",k=new s,C=[[],[],[],[],[],[],[],[]];for(let t=0;t<256;t++){let n=t;for(let t=0;t<8;t++)n=1&n?n>>>1^3988292384:n>>>1;C[0][t]=n}for(let t=0;t<256;t++)for(let n=1;n<8;n++){const e=C[n-1][t];C[n][t]=e>>>8^C[0][255&e]}const[I,A,x,M,P,D,F,E]=C;class R{constructor(t){this.o=t||-1}append(t){let n=0|this.o;const e=0|t.length;let o=0;if(e>=8&&t.buffer){const r=new u(t.buffer,t.byteOffset,e),s=e-8;for(;o<=s;o+=8){const t=n^r.getInt32(o,!0),e=r.getInt32(o+4,!0);n=E[255&t]^F[t>>>8&255]^D[t>>>16&255]^P[t>>>24&255]^M[255&e]^x[e>>>8&255]^A[e>>>16&255]^I[e>>>24&255]}}for(;o<e;o++)n=n>>>8^I[255&(n^t[o])];this.o=n}get(){return~this.o}}class U extends d{constructor(){let t;const n=new R;super({transform(t,e){n.append(t),e.enqueue(t)},flush(){const e=new s(4);new u(e.buffer).setUint32(0,n.get()),t.value=e}}),t=this}}function B(t,n){const e=new s(t.length+n.length);return e.set(t),e.set(n,t.length),e}function T(t){return new u(t.buffer,t.byteOffset,t.byteLength)}const V=64,W=20,j=new s([128]),K=new s(1),O=new a([1732584193,4023233417,2562383102,271733878,3285377520]),H=new s(256),L=new a(256),N=new a(256),q=new a(256),G=new a(256);let J=!1;function Q(t,n){!function(){if(!J){let t=1,n=1;do{t=255&(t^t<<1^(128&t?27:0)),n=255&(n^n<<1),n=255&(n^n<<2),n=255&(n^n<<4),128&n&&(n^=9),H[t]=255&(n^(n<<1|n>>7)^(n<<2|n>>6)^(n<<3|n>>5)^(n<<4|n>>4)^99)}while(1!=t);H[0]=99;for(let t=0;t<256;t++){const n=H[t],e=$(n),o=e<<24|n<<16|n<<8|e^n;L[t]=o,N[t]=o>>>8|o<<24,q[t]=o>>>16|o<<16,G[t]=o>>>24|o<<8}J=!0}}();const e=new a(60),o=function(t,n){const e=t.length>>2,o=e+6,r=4*(o+1);let s=1;for(let o=0;o<e;o++)n[o]=t[4*o]<<24|t[4*o+1]<<16|t[4*o+2]<<8|t[4*o+3];for(let t=e;t<r;t++){let o=n[t-1];t%e==0?(o=Y(o<<8|o>>>24)^s<<24,s=$(s)):e>6&&t%e==4&&(o=Y(o)),n[t]=n[t-e]^o}return o}(t,e),r=new a(4),s=X(n);let c=0,i=0,f=0,w=0;return{process(t,n){n&&s.update(t,0,t.length),function(t){const n=new u(t.buffer,t.byteOffset,t.byteLength),e=t.length;let o=0;for(;o+16<=e;o+=16)l(),n.setInt32(o,n.getInt32(o)^r[0]),n.setInt32(o+4,n.getInt32(o+4)^r[1]),n.setInt32(o+8,n.getInt32(o+8)^r[2]),n.setInt32(o+12,n.getInt32(o+12)^r[3]);if(o<e){l();for(let n=0;o<e;o++,n++)t[o]^=r[n>>2]>>>24-8*(3&n)}}(t),n||s.update(t,0,t.length)},digest:()=>s.digest()};function l(){c=c+1|0,c||(i=i+1|0,i||(f=f+1|0,f||(w=w+1|0)));let t=Z(c)^e[0],n=Z(i)^e[1],s=Z(f)^e[2],a=Z(w)^e[3],u=L[t>>>24]^N[n>>>16&255]^q[s>>>8&255]^G[255&a]^e[4],l=L[n>>>24]^N[s>>>16&255]^q[a>>>8&255]^G[255&t]^e[5],h=L[s>>>24]^N[a>>>16&255]^q[t>>>8&255]^G[255&n]^e[6],p=L[a>>>24]^N[t>>>16&255]^q[n>>>8&255]^G[255&s]^e[7];t=L[u>>>24]^N[l>>>16&255]^q[h>>>8&255]^G[255&p]^e[8],n=L[l>>>24]^N[h>>>16&255]^q[p>>>8&255]^G[255&u]^e[9],s=L[h>>>24]^N[p>>>16&255]^q[u>>>8&255]^G[255&l]^e[10],a=L[p>>>24]^N[u>>>16&255]^q[l>>>8&255]^G[255&h]^e[11],u=L[t>>>24]^N[n>>>16&255]^q[s>>>8&255]^G[255&a]^e[12],l=L[n>>>24]^N[s>>>16&255]^q[a>>>8&255]^G[255&t]^e[13],h=L[s>>>24]^N[a>>>16&255]^q[t>>>8&255]^G[255&n]^e[14],p=L[a>>>24]^N[t>>>16&255]^q[n>>>8&255]^G[255&s]^e[15],t=L[u>>>24]^N[l>>>16&255]^q[h>>>8&255]^G[255&p]^e[16],n=L[l>>>24]^N[h>>>16&255]^q[p>>>8&255]^G[255&u]^e[17],s=L[h>>>24]^N[p>>>16&255]^q[u>>>8&255]^G[255&l]^e[18],a=L[p>>>24]^N[u>>>16&255]^q[l>>>8&255]^G[255&h]^e[19],u=L[t>>>24]^N[n>>>16&255]^q[s>>>8&255]^G[255&a]^e[20],l=L[n>>>24]^N[s>>>16&255]^q[a>>>8&255]^G[255&t]^e[21],h=L[s>>>24]^N[a>>>16&255]^q[t>>>8&255]^G[255&n]^e[22],p=L[a>>>24]^N[t>>>16&255]^q[n>>>8&255]^G[255&s]^e[23],t=L[u>>>24]^N[l>>>16&255]^q[h>>>8&255]^G[255&p]^e[24],n=L[l>>>24]^N[h>>>16&255]^q[p>>>8&255]^G[255&u]^e[25],s=L[h>>>24]^N[p>>>16&255]^q[u>>>8&255]^G[255&l]^e[26],a=L[p>>>24]^N[u>>>16&255]^q[l>>>8&255]^G[255&h]^e[27],u=L[t>>>24]^N[n>>>16&255]^q[s>>>8&255]^G[255&a]^e[28],l=L[n>>>24]^N[s>>>16&255]^q[a>>>8&255]^G[255&t]^e[29],h=L[s>>>24]^N[a>>>16&255]^q[t>>>8&255]^G[255&n]^e[30],p=L[a>>>24]^N[t>>>16&255]^q[n>>>8&255]^G[255&s]^e[31],t=L[u>>>24]^N[l>>>16&255]^q[h>>>8&255]^G[255&p]^e[32],n=L[l>>>24]^N[h>>>16&255]^q[p>>>8&255]^G[255&u]^e[33],s=L[h>>>24]^N[p>>>16&255]^q[u>>>8&255]^G[255&l]^e[34],a=L[p>>>24]^N[u>>>16&255]^q[l>>>8&255]^G[255&h]^e[35],u=L[t>>>24]^N[n>>>16&255]^q[s>>>8&255]^G[255&a]^e[36],l=L[n>>>24]^N[s>>>16&255]^q[a>>>8&255]^G[255&t]^e[37],h=L[s>>>24]^N[a>>>16&255]^q[t>>>8&255]^G[255&n]^e[38],p=L[a>>>24]^N[t>>>16&255]^q[n>>>8&255]^G[255&s]^e[39];let d=40;o>10&&(t=L[u>>>24]^N[l>>>16&255]^q[h>>>8&255]^G[255&p]^e[40],n=L[l>>>24]^N[h>>>16&255]^q[p>>>8&255]^G[255&u]^e[41],s=L[h>>>24]^N[p>>>16&255]^q[u>>>8&255]^G[255&l]^e[42],a=L[p>>>24]^N[u>>>16&255]^q[l>>>8&255]^G[255&h]^e[43],u=L[t>>>24]^N[n>>>16&255]^q[s>>>8&255]^G[255&a]^e[44],l=L[n>>>24]^N[s>>>16&255]^q[a>>>8&255]^G[255&t]^e[45],h=L[s>>>24]^N[a>>>16&255]^q[t>>>8&255]^G[255&n]^e[46],p=L[a>>>24]^N[t>>>16&255]^q[n>>>8&255]^G[255&s]^e[47],d=48),o>12&&(t=L[u>>>24]^N[l>>>16&255]^q[h>>>8&255]^G[255&p]^e[48],n=L[l>>>24]^N[h>>>16&255]^q[p>>>8&255]^G[255&u]^e[49],s=L[h>>>24]^N[p>>>16&255]^q[u>>>8&255]^G[255&l]^e[50],a=L[p>>>24]^N[u>>>16&255]^q[l>>>8&255]^G[255&h]^e[51],u=L[t>>>24]^N[n>>>16&255]^q[s>>>8&255]^G[255&a]^e[52],l=L[n>>>24]^N[s>>>16&255]^q[a>>>8&255]^G[255&t]^e[53],h=L[s>>>24]^N[a>>>16&255]^q[t>>>8&255]^G[255&n]^e[54],p=L[a>>>24]^N[t>>>16&255]^q[n>>>8&255]^G[255&s]^e[55],d=56),r[0]=(H[u>>>24]<<24|H[l>>>16&255]<<16|H[h>>>8&255]<<8|H[255&p])^e[d],r[1]=(H[l>>>24]<<24|H[h>>>16&255]<<16|H[p>>>8&255]<<8|H[255&u])^e[d+1],r[2]=(H[h>>>24]<<24|H[p>>>16&255]<<16|H[u>>>8&255]<<8|H[255&l])^e[d+2],r[3]=(H[p>>>24]<<24|H[u>>>16&255]<<16|H[l>>>8&255]<<8|H[255&h])^e[d+3]}}function X(t){const n=function(){const t=new a(O),n=new a(16),e=new s(V),r=new u(e.buffer),c=new s(8);let i=0,f=0;return{update:w,digest:function(){const n=8*f,e=o.floor(n/4294967296),r=n>>>0;for(w(j,0,1);56!=i;)w(K,0,1);c[0]=e>>>24,c[1]=e>>>16,c[2]=e>>>8,c[3]=e,c[4]=r>>>24,c[5]=r>>>16,c[6]=r>>>8,c[7]=r,w(c,0,8);const a=new s(W),l=new u(a.buffer);for(let n=0;n<t.length;n++)l.setInt32(4*n,t[n]);return t.set(O),i=0,f=0,a}};function w(t,n,o){const s=n+o;if(f+=o,i){for(;n<s&&i<V;)e[i++]=t[n++];i==V&&(l(r,0),i=0)}if(n+V<=s){const e=new u(t.buffer,t.byteOffset,t.byteLength);for(;n+V<=s;n+=V)l(e,n)}for(;n<s;)e[i++]=t[n++]}function l(e,o){for(let t=0;t<16;t++)n[t]=e.getInt32(o+4*t);let r,s=t[0],c=t[1],i=t[2],a=t[3],f=t[4];for(let t=0;t<15;t+=5)f=(s<<5|s>>>27)+((i^a)&c^a)+f+1518500249+n[t]|0,c=c<<30|c>>>2,a=(f<<5|f>>>27)+((c^i)&s^i)+a+1518500249+n[t+1]|0,s=s<<30|s>>>2,i=(a<<5|a>>>27)+((s^c)&f^c)+i+1518500249+n[t+2]|0,f=f<<30|f>>>2,c=(i<<5|i>>>27)+((f^s)&a^s)+c+1518500249+n[t+3]|0,a=a<<30|a>>>2,s=(c<<5|c>>>27)+((a^f)&i^f)+s+1518500249+n[t+4]|0,i=i<<30|i>>>2;f=(s<<5|s>>>27)+((i^a)&c^a)+f+1518500249+n[15]|0,c=c<<30|c>>>2,r=n[13]^n[8]^n[2]^n[0],r=r<<1|r>>>31,n[0]=r,a=(f<<5|f>>>27)+((c^i)&s^i)+a+1518500249+r|0,s=s<<30|s>>>2,r=n[14]^n[9]^n[3]^n[1],r=r<<1|r>>>31,n[1]=r,i=(a<<5|a>>>27)+((s^c)&f^c)+i+1518500249+r|0,f=f<<30|f>>>2,r=n[15]^n[10]^n[4]^n[2],r=r<<1|r>>>31,n[2]=r,c=(i<<5|i>>>27)+((f^s)&a^s)+c+1518500249+r|0,a=a<<30|a>>>2,r=n[0]^n[11]^n[5]^n[3],r=r<<1|r>>>31,n[3]=r,s=(c<<5|c>>>27)+((a^f)&i^f)+s+1518500249+r|0,i=i<<30|i>>>2;for(let t=20;t<40;t+=5)r=n[t-3&15]^n[t-8&15]^n[t-14&15]^n[15&t],r=r<<1|r>>>31,n[15&t]=r,f=(s<<5|s>>>27)+(c^i^a)+f+1859775393+r|0,c=c<<30|c>>>2,r=n[t-2&15]^n[t-7&15]^n[t-13&15]^n[t+1&15],r=r<<1|r>>>31,n[t+1&15]=r,a=(f<<5|f>>>27)+(s^c^i)+a+1859775393+r|0,s=s<<30|s>>>2,r=n[t-1&15]^n[t-6&15]^n[t-12&15]^n[t+2&15],r=r<<1|r>>>31,n[t+2&15]=r,i=(a<<5|a>>>27)+(f^s^c)+i+1859775393+r|0,f=f<<30|f>>>2,r=n[15&t]^n[t-5&15]^n[t-11&15]^n[t+3&15],r=r<<1|r>>>31,n[t+3&15]=r,c=(i<<5|i>>>27)+(a^f^s)+c+1859775393+r|0,a=a<<30|a>>>2,r=n[t+1&15]^n[t-4&15]^n[t-10&15]^n[t+4&15],r=r<<1|r>>>31,n[t+4&15]=r,s=(c<<5|c>>>27)+(i^a^f)+s+1859775393+r|0,i=i<<30|i>>>2;for(let t=40;t<60;t+=5)r=n[t-3&15]^n[t-8&15]^n[t-14&15]^n[15&t],r=r<<1|r>>>31,n[15&t]=r,f=(s<<5|s>>>27)+(c&i|(c|i)&a)+f+2400959708+r|0,c=c<<30|c>>>2,r=n[t-2&15]^n[t-7&15]^n[t-13&15]^n[t+1&15],r=r<<1|r>>>31,n[t+1&15]=r,a=(f<<5|f>>>27)+(s&c|(s|c)&i)+a+2400959708+r|0,s=s<<30|s>>>2,r=n[t-1&15]^n[t-6&15]^n[t-12&15]^n[t+2&15],r=r<<1|r>>>31,n[t+2&15]=r,i=(a<<5|a>>>27)+(f&s|(f|s)&c)+i+2400959708+r|0,f=f<<30|f>>>2,r=n[15&t]^n[t-5&15]^n[t-11&15]^n[t+3&15],r=r<<1|r>>>31,n[t+3&15]=r,c=(i<<5|i>>>27)+(a&f|(a|f)&s)+c+2400959708+r|0,a=a<<30|a>>>2,r=n[t+1&15]^n[t-4&15]^n[t-10&15]^n[t+4&15],r=r<<1|r>>>31,n[t+4&15]=r,s=(c<<5|c>>>27)+(i&a|(i|a)&f)+s+2400959708+r|0,i=i<<30|i>>>2;for(let t=60;t<80;t+=5)r=n[t-3&15]^n[t-8&15]^n[t-14&15]^n[15&t],r=r<<1|r>>>31,n[15&t]=r,f=(s<<5|s>>>27)+(c^i^a)+f+3395469782+r|0,c=c<<30|c>>>2,r=n[t-2&15]^n[t-7&15]^n[t-13&15]^n[t+1&15],r=r<<1|r>>>31,n[t+1&15]=r,a=(f<<5|f>>>27)+(s^c^i)+a+3395469782+r|0,s=s<<30|s>>>2,r=n[t-1&15]^n[t-6&15]^n[t-12&15]^n[t+2&15],r=r<<1|r>>>31,n[t+2&15]=r,i=(a<<5|a>>>27)+(f^s^c)+i+3395469782+r|0,f=f<<30|f>>>2,r=n[15&t]^n[t-5&15]^n[t-11&15]^n[t+3&15],r=r<<1|r>>>31,n[t+3&15]=r,c=(i<<5|i>>>27)+(a^f^s)+c+3395469782+r|0,a=a<<30|a>>>2,r=n[t+1&15]^n[t-4&15]^n[t-10&15]^n[t+4&15],r=r<<1|r>>>31,n[t+4&15]=r,s=(c<<5|c>>>27)+(i^a^f)+s+3395469782+r|0,i=i<<30|i>>>2;t[0]=t[0]+s|0,t[1]=t[1]+c|0,t[2]=t[2]+i|0,t[3]=t[3]+a|0,t[4]=t[4]+f|0}}(),e=new s(V),r=new s(V);t.length>V&&(n.update(t,0,t.length),t=n.digest());for(let n=0;n<V;n++){const o=n<t.length?t[n]:0;e[n]=54^o,r[n]=92^o}return n.update(e,0,V),{update(t,e,o){n.update(t,e,o)},digest(){const t=n.digest();n.update(r,0,V),n.update(t,0,W);const o=n.digest();return n.update(e,0,V),o}}}function Y(t){return H[t>>>24]<<24|H[t>>>16&255]<<16|H[t>>>8&255]<<8|H[255&t]}function Z(t){return t<<24|(65280&t)<<8|t>>>8&65280|t>>>24}function $(t){return 255&(t<<1^27*(t>>7))}const _=typeof h!=z&&typeof h.getRandomValues==b,tt=\"Invalid password\",nt=\"zipjs-abort-check-password\";function et(t){if(_)return h.getRandomValues(t);throw new r(\"Crypto API not supported\")}const ot={name:\"PBKDF2\"},rt=n.assign({hash:{name:\"HMAC\"}},ot),st=n.assign({iterations:1e3,hash:{name:\"SHA-1\"}},ot),ct=[\"deriveBits\"],it=[8,12,16],at=[16,24,32],ft=10,ut=typeof h!=z,wt=ut&&h.subtle;let lt=ut&&typeof wt!=z&&typeof wt.importKey==b&&typeof wt.deriveBits==b,ht=Q;class pt extends d{constructor({password:t,rawPassword:n,encryptionStrength:e,checkPasswordOnly:o,checkAuthenticationCode:c=!0}){super({start(){yt(this,t,n,e)},async transform(t,n){const e=this,{password:c,strength:i,l:a,ready:f}=e;c?(await async function(t,n,e,o){const s=await gt(t,n,e,zt(o,0,it[n])),c=zt(o,it[n]);if(s[0]!=c[0]||s[1]!=c[1])throw St(t),new r(tt)}(e,i,c,zt(t,0,it[i]+2)),t=zt(t,it[i]+2),o?(St(e),n.error(new r(nt))):a()):await f;const u=new s(t.length-ft-(t.length-ft)%16);n.enqueue(mt(e,t,u,0,ft,!0))},async flush(t){const{h:n,m:e,ready:o}=this;if(n){await o;const i=zt(e,e.length-ft),a=new s(zt(e,0,e.length-ft));n.process(a,!0);const f=n.digest();let u=e.length<ft?1:0;for(let t=0;t<ft;t++)u|=f[t]^i[t];if(u&&c)throw new r(\"Invalid authentication code\");t.enqueue(a)}},cancel(){St(this)}})}}class dt extends d{constructor({password:t,rawPassword:n,encryptionStrength:e}){super({start(){yt(this,t,n,e)},async transform(t,n){const e=this,{password:o,strength:r,l:c,ready:i}=e;let a=k;o?(a=await async function(t,n,e){const o=et(new s(it[n]));return B(o,await gt(t,n,e,o))}(e,r,o),c()):await i;const f=new s(a.length+t.length-t.length%16);f.set(a,0),n.enqueue(mt(e,t,f,a.length,0,!1))},async flush(t){const{h:n,m:e,ready:o}=this;if(n){await o;const r=new s(e);n.process(r,!1);const c=zt(n.digest(),0,ft);t.enqueue(B(r,c))}},cancel(){St(this)}})}}function yt(t,e,o,r){n.assign(t,{ready:new w(n=>t.l=n),password:vt(e,o),strength:r-1,m:k})}function mt(t,n,e,o,r,c){const{h:i,m:a}=t;a.length&&(n=B(a,n));const f=n.length-r,u=f-f%16;if(e=function(t,n){if(n&&n>t.length){const e=t;(t=new s(n)).set(e,0)}return t}(e,o+u),u){const t=zt(e,o,o+u);t.set(zt(n,0,u)),i.process(t,c)}return t.m=zt(n,u),e}function St({h:t}){t&&t.dispose&&t.dispose()}async function gt(t,e,r,c){t.password=null;const i=at[e],a=await async function(t,e,r){if(lt)try{const o=await wt.importKey(\"raw\",t,rt,!1,ct);return new s(await wt.deriveBits(n.assign({salt:e},st),o,8*r))}catch{lt=!1}return function(t,n,e,r){const c=X(t),i=new s(r),a=new s(n.length+4),f=new u(a.buffer);a.set(n);for(let t=1,e=0;e<r;t++,e+=W){f.setUint32(n.length,t),c.update(a,0,a.length);let s=c.digest();const u=s.slice();for(let t=1;t<1e3;t++){c.update(s,0,W),s=c.digest();for(let t=0;t<W;t++)u[t]^=s[t]}i.set(u.subarray(0,o.min(W,r-e)),e)}return i}(t,e,0,r)}(r,c,2*i+2);return t.h=ht(zt(a,0,i),zt(a,i,2*i)),zt(a,2*i)}function vt(t,n){return n===v?function(t){if(typeof l==z){t=unescape(encodeURIComponent(t));const n=new s(t.length);for(let e=0;e<n.length;e++)n[e]=t.charCodeAt(e);return n}return(new l).encode(t)}(t):n}function zt(t,n,e){return t.subarray(n,e)}class bt extends d{constructor({password:t,rawPassword:n,passwordVerification:e,checkPasswordOnly:o}){super({start(){Ct(this,t,n,e)},transform(t,n){const e=this;if(e.password||e.rawPassword){const n=It(e,t.subarray(0,12));if(e.password=e.rawPassword=null,0!=(n[11]^e.passwordVerification))throw new r(tt);t=t.subarray(12)}o?n.error(new r(nt)):n.enqueue(It(e,t))}})}}class kt extends d{constructor({password:t,rawPassword:n,passwordVerification:e}){super({start(){Ct(this,t,n,e)},transform(t,n){const e=this;let o,r;if(e.password||e.rawPassword){e.password=e.rawPassword=null;const n=et(new s(12));n[11]=e.passwordVerification,o=new s(t.length+n.length),o.set(At(e,n),0),r=12}else o=new s(t.length),r=0;o.set(At(e,t),r),n.enqueue(o)}})}}function Ct(t,e,o,r){n.assign(t,{password:e,rawPassword:o,passwordVerification:r}),function(t,e,o){const r=[305419896,591751049,878082192];if(n.assign(t,{keys:r,S:new R(r[0]),v:new R(r[2])}),o)for(let n=0;n<o.length;n++)xt(t,o[n]);else for(let n=0;n<e.length;n++)xt(t,e.charCodeAt(n))}(t,e,o)}function It(t,n){const e=new s(n.length);for(let o=0;o<n.length;o++)e[o]=Mt(t)^n[o],xt(t,e[o]);return e}function At(t,n){const e=new s(n.length);for(let o=0;o<n.length;o++)e[o]=Mt(t)^n[o],xt(t,n[o]);return e}function xt(t,n){let[,e]=t.keys;t.S.append([n]);const r=~t.S.get();e=Dt(o.imul(Dt(e+Pt(r)),134775813)+1),t.v.append([e>>>24]);const s=~t.v.get();t.keys=[r,e,s]}function Mt(t){const n=2|t.keys[2];return Pt(o.imul(n,1^n)>>>8)}function Pt(t){return 255&t}function Dt(t){return 4294967295&t}function Ft(t){if(t instanceof y)return t;const n=t.getReader();return new y({async pull(t){const{value:e,done:o}=await n.read();o?t.close():t.enqueue(e)},cancel:t=>n.cancel(t)})}const Et=new f;function Rt(t){return Et.get(t)}const Ut=\"Invalid uncompressed size\",Bt=\"deflate-raw\",Tt=\"gzip\",Vt=[31,139,8];class Wt extends d{constructor(t,{chunkSize:n,CompressionStreamFallback:e,CompressionStream:o}){super({});const{compressed:r,encrypted:s,useCompressionStream:c,zipCrypto:i,computeCrc32:a,level:f,deflate64:w,format:l,compressionMethod:h,inputSize:p}=t,d=this;let y,m,S,g=super.readable;const v=l&&Rt(l),z=function(t,n,e){return t&&n?n:e&&e.C?e:void 0}(c,o,e),b=a&&r&&!w&&!v&&(!s||i)&&Boolean(z);if(s&&!i||!a||b||(y=new U,g=qt(g,y)),r)if(v)g=Gt(g,Lt(v.CompressionStream,l,{level:f,chunkSize:n,compressionMethod:h,uncompressedSize:p}));else if(b)S=new jt,g=Gt(g,new z(Tt,{level:f,chunkSize:n})),g=qt(g,S);else try{g=Nt(g,c,{level:f,chunkSize:n},o,e)}catch(t){let n;try{n=new o(Tt)}catch{throw t}g=Gt(g,n),g=qt(g,new jt)}s&&(i?g=qt(g,new kt(t)):(m=new dt(t),g=qt(g,m))),Ht(d,g,()=>{s&&!i||!a||(d.crc32=b?S.crc32:new u(y.value.buffer).getUint32(0))})}}class jt extends d{constructor(){let t,n=10,e=new s(0);super({transform(t,r){if(n){const e=o.min(n,t.length);if(n-=e,!(t=t.subarray(e)).length)return}const s=e.length+t.length;if(s<=8)return void(e=B(e,t));const c=s-8,i=o.min(c,e.length);r.enqueue(B(e.subarray(0,i),t.subarray(0,c-i))),e=B(e.subarray(i),t.subarray(c-i))},flush(){const n=T(e);t.crc32=n.getUint32(0,!0),t.uncompressedSize=n.getUint32(4,!0)}}),t=this}}class Kt extends d{constructor(t,{chunkSize:n,DecompressionStreamFallback:e,DecompressionStream:o}){super({});const{zipCrypto:c,encrypted:i,checkCrc32:a,crc32:f,compressed:l,useCompressionStream:h,deflate64:p,format:m,compressionMethod:S,rawBitFlag:g,outputSize:z}=t;let b,k,C,I=super.readable;if(i&&(c?I=qt(I,new bt(t)):(k=new pt(t),I=qt(I,k))),l){const t=m&&Rt(m);if(t)I=Gt(I,Lt(t.DecompressionStream,m,{chunkSize:n,compressionMethod:S,rawBitFlag:g,uncompressedSize:z}));else try{I=Nt(I,h,{chunkSize:n,deflate64:p},o,e)}catch(t){if(p||z===v)throw t;let n;try{n=new o(Tt)}catch{throw t}C=new R,I=function(t,n,e,o){let c,i,a,f=0,u=!1;const l=new w((t,n)=>{i=t,a=n});l.catch(()=>{}),e||i();const h=new d({start(t){const n=new s(10);n.set(Vt),t.enqueue(n)},transform(t,n){n.enqueue(t)},async flush(t){u=!0,y();try{await l}finally{m()}const n=new s(8),r=T(n);r.setUint32(0,o.get(),!0),r.setUint32(4,e,!0),t.enqueue(n)},cancel(t){a(t)}}),p=new d({transform(t,n){o.append(t),f+=t.length,f>=e?i():u&&y(),n.enqueue(t)},cancel(t){a(t)}});return t=qt(t,h),qt(t=Gt(t,n),p);function y(){m(),c=setTimeout(()=>a(new r(Ut)),5e3)}function m(){clearTimeout(c)}}(I,n,z,C)}I=function(t){const n=t.getReader();return new y({async pull(t){let e;try{e=await n.read()}catch(t){if(t&&t.message)throw t;const n=new r(\"Invalid compressed data\");throw n.cause=t,n}const{value:o,done:s}=e;s?t.close():t.enqueue(o)},cancel:t=>n.cancel(t)})}(I)}a&&!C&&(b=new U,I=qt(I,b)),Ht(this,I,()=>{if(a){const t=C?C.get()>>>0:new u(b.value.buffer).getUint32(0,!1);if(f!=t)throw new r(\"Invalid CRC32\")}})}}const Ot=new f;function Ht(t,e,o){e=qt(e,new d({flush:o})),n.defineProperty(t,\"readable\",{get:()=>e})}function Lt(t,n,e){if(!t)throw new r(\"Compression method not supported\");return new t(n,e)}function Nt(t,n,e,o,r){const s=n&&o?o:r||o,c=e.deflate64?\"deflate64-raw\":Bt;let i;try{i=new s(c,e)}catch(t){if(!n||!r||s==r)throw t;i=new r(c,e)}return Gt(t,i)}function qt(t,n){return Ft(t).pipeThrough(n)}function Gt(t,n){const e=n.writable.getWriter(),o=t.getReader();return async function(){try{for(;;){await e.ready;const t=await o.read();if(t.done){await e.close();break}await e.write(t.value)}}catch(t){await async function(t,n){try{await t.abort(n)}catch{}}(e,t),await async function(t,n){try{await t.cancel(n)}catch{}}(o,t)}}(),n.readable}const Jt=\"data\",Qt=\"deflate\";class Xt extends d{constructor(t,e){super({});const o=this,{codecType:s}=t;let c;s.startsWith(Qt)?c=Wt:s.startsWith(\"inflate\")&&(c=Kt),o.outputSize=0;let i=0;const a=new c(t,e),f=super.readable,u=new d({transform(t,n){t&&t.length&&(i+=t.length,n.enqueue(t))},flush(){n.assign(o,{inputSize:i})}}),w=new d({transform(n,e){if(n&&n.length&&(e.enqueue(n),o.outputSize+=n.length,t.outputSize!==v&&o.outputSize>t.outputSize))throw new r(Ut)},flush(){const{crc32:t}=a;n.assign(o,{crc32:t,inputSize:i})}});n.defineProperty(o,\"readable\",{get:()=>f.pipeThrough(u).pipeThrough(a).pipeThrough(w)})}}class Yt extends d{constructor(t){const o=[];let r=0,c=0;function i(){const n=new s(t);let e=0;for(;e<t;){const r=o[0],s=t-e;r.length<=s?(n.set(r,e),e+=r.length,o.shift()):(n.set(r.subarray(0,s),e),o[0]=r.subarray(s),e+=s)}return r-=t,n}(!e.isFinite(t)||t<1)&&(t=65536),super({transform(n,e){for(o.push(n),r+=n.length;r>t;)c+=t,e.enqueue(i())},flush(t){r&&(c+=r,t.enqueue(function(t,n){const e=new s(n);let o=0;for(const n of t)e.set(n,o),o+=n.length;return e}(o,r)))}}),n.defineProperty(this,\"outputSize\",{get:()=>c})}}let Zt=2;try{typeof navigator!=z&&navigator.hardwareConcurrency&&(Zt=navigator.hardwareConcurrency)}catch{}function $t(t){return Boolean(t)&&\"object\"==typeof t}const _t=new f,tn=new f,nn=function(){try{return structuredClone(new r)instanceof r}catch{return!1}}();let en=0;async function on(t){let n,s,c;try{const{options:i,config:a}=t;if(i.format)try{await async function(t,n){!Et.has(t)&&n&&function(t,n){const{CompressionStream:e,DecompressionStream:o}=n;if(typeof e!=b&&typeof o!=b)throw new r(\"Invalid codec module\");Et.set(t,{CompressionStream:e,DecompressionStream:o})}(t,await(import(n)))}(i.format,i.codecURI)}catch(t){if($t(t))try{t.codecImportFailed=!0}catch{}throw t}if(a.CompressionStream=self.CompressionStream,a.DecompressionStream=self.DecompressionStream,i.compressed&&!i.format)if(i.useCompressionStream){if(!function(t,n){if(!t)return!1;let e=Ot.get(t);e||(e=new f,Ot.set(t,e));let o=e.get(n);if(o===v){try{new t(n),o=!0}catch{o=!1}e.set(n,o)}return o}(i.codecType.startsWith(Qt)?a.CompressionStream:a.DecompressionStream,Bt))try{await self.initModule(t.config)}catch{}}else try{await self.initModule(t.config)}catch{i.useCompressionStream=!0}if(i.encrypted&&!i.zipCrypto)try{await self.initModule(t.config)}catch{}!a.CompressionStreamFallback&&a.CompressionStreamZlib&&(a.CompressionStreamFallback=a.CompressionStreamZlib),!a.DecompressionStreamFallback&&a.DecompressionStreamZlib&&(a.DecompressionStreamFallback=a.DecompressionStreamZlib);const u={highWaterMark:1},l=t.readable?Ft(t.readable):new y({async pull(t){const n=new w(t=>_t.set(en,t));rn({type:\"pull\",messageId:en}),en=(en+1)%e.MAX_SAFE_INTEGER;const{value:o,done:r}=await n;t.enqueue(o),r&&t.close()}},u);c=t.writable?function(t){if(t instanceof m)return t;const n=t.getWriter();return new m({write:t=>n.write(t),close:()=>n.close(),abort:t=>n.abort(t)})}(t.writable):new m({async write(t){let n;const o=new w(t=>n=t);tn.set(en,n),rn({type:Jt,value:t,messageId:en}),en=(en+1)%e.MAX_SAFE_INTEGER,await o}},u),n=new Xt(i,a),s=new Yt(function(t){return r=\"string\"==typeof(n=r=t.chunkSize)&&n.trim()?e(n):n,e.isInteger(r)&&r>=1?o.max(r,64):65536;var n,r}(a)),await l.pipeThrough(n).pipeThrough(s).pipeTo(c,{preventClose:!0,preventAbort:!0}),await c.getWriter().close();const{crc32:h,inputSize:p,outputSize:d}=n;rn({type:\"close\",result:{crc32:h,inputSize:p,outputSize:d}})}catch(t){const n=s?s.outputSize:0;if($t(t))try{t.outputSize=n}catch{}if(c&&!c.locked)try{await c.getWriter().close()}catch{}sn(t,n)}}function rn(t){const{value:n}=t;if(n)if(n.length)try{t.value=(e=n,e.byteOffset||e.byteLength!=e.buffer.byteLength?new s(e):e).buffer,p(t,[t.value])}catch{p(t)}else p(t);else p(t);var e}function sn(t,n){const{message:e,stack:o,code:s,name:c,outputSize:i,cause:a,codecImportFailed:f}=function(t=new r(\"Unknown error\")){return $t(t)?t:new r(String(t))}(t),u={message:e,stack:o,code:s,name:c,outputSize:i===v?n:i};if(a&&(u.cause={name:a.name,message:a.message}),f&&(u.codecImportFailed=!0),nn)try{return void p({error:u,errorValue:{value:t}})}catch{}p({error:u})}addEventListener(\"message\",({data:t})=>{const{type:n,messageId:e,value:o,done:r}=t;try{if(\"start\"==n&&on(t),n==Jt){const t=_t.get(e);_t.delete(e),t({value:o||new s,done:r})}if(\"ack\"==n){const t=tn.get(e);tn.delete(e),t()}}catch(t){sn(t)}}),p({type:\"ready\"});const cn=\"deflate\",an=\"deflate-raw\",fn=\"deflate64-raw\",un=\"gzip\";let wn,ln,hn,pn,dn;function yn(t,n,e={}){if(!wn){const t=new r(\"WASM module not loaded\");throw t.cause=dn,t}const c=\"number\"==typeof e.level?e.level:-1,i=\"number\"==typeof e.outBuffer?e.outBuffer:65536,a=\"number\"==typeof e.inBufferSize?e.inBufferSize:65536;return new d({start(){try{let e;if(this.I=ln(i),this.in=ln(a),this.inBufferSize=a,!this.I||!this.in)throw new r(\"allocation failed\");if(t?(this.A=wn.deflate_process,this.M=wn.deflate_last_consumed,this.P=wn.deflate_end,this.D=wn.deflate_new(),e=n===un?wn.deflate_init_gzip(this.D,c):n===an?wn.deflate_init_raw(this.D,c):wn.deflate_init(this.D,c)):n===fn?(this.A=wn.inflate9_process,this.M=wn.inflate9_last_consumed,this.P=wn.inflate9_end,this.D=wn.inflate9_new(),e=wn.inflate9_init_raw(this.D)):(this.A=wn.inflate_process,this.M=wn.inflate_last_consumed,this.P=wn.inflate_end,this.D=wn.inflate_new(),e=n===an?wn.inflate_init_raw(this.D):n===un?wn.inflate_init_gzip(this.D):wn.inflate_init(this.D)),0!==e)throw new r(\"init failed:\"+e)}catch(t){throw f(this),t}},transform(t,n){try{const e=t,c=new s(pn.buffer),a=this.A,f=this.M,u=this.I;let w=0;for(;w<e.length;){const t=o.min(e.length-w,32768);if((!this.in||this.inBufferSize<t)&&(this.in&&hn&&(hn(this.in),this.in=0),this.in=ln(t),this.inBufferSize=t,!this.in))throw new r(\"allocation failed\");c.set(e.subarray(w,w+t),this.in);const s=a(this.D,this.in,t,u,i,0),l=s>>24&255,h=128&l?l-256:l;if(h<0)throw new r(\"process error:\"+h);const p=16777215&s;p&&n.enqueue(c.slice(u,u+p));const d=f(this.D);if(0===d&&0===p)break;w+=d}}catch(t){f(this),n.error(t)}},flush(t){try{const n=new s(pn.buffer),e=this.A,o=this.I;for(;;){const s=e(this.D,0,0,o,i,4),c=s>>24&255,a=128&c?c-256:c;if(a<0)throw new r(\"process error:\"+a);const f=16777215&s;if(f&&t.enqueue(n.slice(o,o+f)),1===c||0===f)break}}catch(n){t.error(n)}finally{const n=f(this);0!==n&&t.error(new r(\"end error:\"+n))}},cancel(){f(this)}});function f(t){let n=0;return t.D&&t.P&&(n=t.P(t.D)),t.D=0,t.in&&hn&&hn(t.in),t.in=0,t.I&&hn&&hn(t.I),t.I=0,n}}class mn{constructor(t=cn,n){return yn(!0,t,n)}}class Sn{constructor(t=cn,n){return yn(!1,t,n)}}mn.C=!0,Sn.C=!0,mn.F=[cn,an,un],Sn.F=[cn,an,un,fn];const gn=65536;let vn,zn;function bn(t){return new s(t.memory.buffer)}let kn=!1;!function(t={}){const{init:n,R:e}=t,o=t.CompressionStreamFallback||t.CompressionStreamZlib,r=t.DecompressionStreamFallback||t.DecompressionStreamZlib;e&&(ht=e||Q),self.initModule=async t=>{n&&await n(t),o&&(t.CompressionStreamFallback=o),r&&(t.DecompressionStreamFallback=r)}}({CompressionStreamFallback:mn,DecompressionStreamFallback:Sn,R:function(t,n){const e=vn;let o=e?function(t,n,e){zn||(zn=t.malloc(gn));const o=zn?t.aes_hmac_new():0;if(o){const r=bn(t);if(r.set(n,zn),r.set(e,zn+n.length),t.aes_hmac_init(o,zn,n.length,zn+n.length,e.length))return t.aes_hmac_end(o,0),0}return o}(e,t,n):0;if(!o)return Q(t,n);const r=zn;return{process(t,n){for(let s=0;s<t.length;s+=gn){const c=t.subarray(s,s+gn),i=bn(e);i.set(c,r),e.aes_hmac_process(o,r,c.length,n?1:0),c.set(i.subarray(r,r+c.length))}},digest:()=>(e.aes_hmac_end(o,r),o=0,bn(e).slice(r,r+20)),dispose(){o&&(e.aes_hmac_end(o,0),o=0)}}},init:t=>async function(t,{baseURI:n}){if(!kn)try{await async function(t,n){let e,o;try{try{o=new URL(t,n)}catch{}const r=await fetch(o);e=await r.arrayBuffer()}catch(n){if(!t.startsWith(\"data:application/wasm;base64,\"))throw n;e=function(t){const n=t.split(\",\")[1],e=atob(n),o=e.length,r=new s(o);for(let t=0;t<o;++t)r[t]=e.charCodeAt(t);return r.buffer}(t)}const c=await WebAssembly.instantiate(e);var i;(function(t){if(wn=t,({malloc:ln,free:hn,memory:pn}=wn),\"function\"!=typeof ln||\"function\"!=typeof hn||!pn)throw wn=ln=hn=pn=null,new r(\"Invalid WASM module\")})(c.instance.exports),typeof(i=c.instance.exports).aes_hmac_new==b&&(vn=i,zn=0)}(t,n),kn=!0}catch(t){throw function(t){dn=t}(t),t}}(t.wasmURI,t)})});\n";
	if ("string" == typeof r && (r = new TextEncoder().encode(r)), t) {
		const t = new Blob([r], { type: e });
		return URL.createObjectURL(t);
	}
	return "data:" + e + ";base64," + function(t) {
		let e = "";
		const r = t.length;
		let s = 0;
		for (; s + 2 < r; s += 3) {
			const r = t[s] << 16 | t[s + 1] << 8 | t[s + 2];
			e += n$1[r >> 18 & 63] + n$1[r >> 12 & 63] + n$1[r >> 6 & 63] + n$1[63 & r];
		}
		const o = r - s;
		if (1 === o) {
			const r = t[s] << 16;
			e += n$1[r >> 18 & 63] + n$1[r >> 12 & 63] + "==";
		} else if (2 === o) {
			const r = t[s] << 16 | t[s + 1] << 8;
			e += n$1[r >> 18 & 63] + n$1[r >> 12 & 63] + n$1[r >> 6 & 63] + "=";
		}
		return e;
	}(r);
} });
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/util/array.js
function concat(first, second) {
	const result = new Uint8Array(first.length + second.length);
	result.set(first);
	result.set(second, first.length);
	return result;
}
function toExactUint8Array(array) {
	return array.byteOffset || array.byteLength != array.buffer.byteLength ? new Uint8Array(array) : array;
}
function getDataView(array) {
	return new DataView(array.buffer, array.byteOffset, array.byteLength);
}
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/util/error.js
function isErrorObject(error) {
	return Boolean(error) && typeof error == "object";
}
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/streams/codecs/crc32.js
var T = [
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[]
];
for (let n = 0; n < 256; n++) {
	let t = n;
	for (let j = 0; j < 8; j++) t = t & 1 ? t >>> 1 ^ 3988292384 : t >>> 1;
	T[0][n] = t;
}
for (let n = 0; n < 256; n++) for (let k = 1; k < 8; k++) {
	const previous = T[k - 1][n];
	T[k][n] = previous >>> 8 ^ T[0][previous & 255];
}
var [T0$1, T1$1, T2$1, T3$1, T4, T5, T6, T7] = T;
var Crc32 = class {
	constructor(crc) {
		this.crc = crc || -1;
	}
	append(data) {
		let crc = this.crc | 0;
		const length = data.length | 0;
		let offset = 0;
		if (length >= 8 && data.buffer) {
			const view = new DataView(data.buffer, data.byteOffset, length);
			const end = length - 8;
			for (; offset <= end; offset += 8) {
				const a = crc ^ view.getInt32(offset, true);
				const b = view.getInt32(offset + 4, true);
				crc = T7[a & 255] ^ T6[a >>> 8 & 255] ^ T5[a >>> 16 & 255] ^ T4[a >>> 24 & 255] ^ T3$1[b & 255] ^ T2$1[b >>> 8 & 255] ^ T1$1[b >>> 16 & 255] ^ T0$1[b >>> 24 & 255];
			}
		}
		for (; offset < length; offset++) crc = crc >>> 8 ^ T0$1[(crc ^ data[offset]) & 255];
		this.crc = crc;
	}
	get() {
		return ~this.crc;
	}
};
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/streams/crc32-stream.js
var Crc32Stream = class extends TransformStream {
	constructor() {
		let stream;
		const crc32 = new Crc32();
		super({
			transform(chunk, controller) {
				crc32.append(chunk);
				controller.enqueue(chunk);
			},
			flush() {
				const value = /* @__PURE__ */ new Uint8Array(4);
				new DataView(value.buffer).setUint32(0, crc32.get());
				stream.value = value;
			}
		});
		stream = this;
	}
};
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/util/encode-text.js
function encodeText(value) {
	if (typeof TextEncoder == "undefined") {
		value = unescape(encodeURIComponent(value));
		const result = new Uint8Array(value.length);
		for (let i = 0; i < result.length; i++) result[i] = value.charCodeAt(i);
		return result;
	} else return new TextEncoder().encode(value);
}
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/streams/codecs/aes-hmac-sha1.js
var BLOCK_LENGTH$1 = 16;
var ROUND_KEYS_LENGTH = 60;
var SHA1_BLOCK_LENGTH = 64;
var SHA1_DIGEST_LENGTH = 20;
var SHA1_SCHEDULE_LENGTH = 16;
var SHA1_LENGTH_OFFSET = 56;
var SHA1_PADDING = new Uint8Array([128]);
var SHA1_ZERO = /* @__PURE__ */ new Uint8Array(1);
var SHA1_INITIAL_STATE = new Int32Array([
	1732584193,
	4023233417,
	2562383102,
	271733878,
	3285377520
]);
var HMAC_INNER_PADDING = 54;
var HMAC_OUTER_PADDING = 92;
var S_BOX = /* @__PURE__ */ new Uint8Array(256);
var T0 = /* @__PURE__ */ new Int32Array(256);
var T1 = /* @__PURE__ */ new Int32Array(256);
var T2 = /* @__PURE__ */ new Int32Array(256);
var T3 = /* @__PURE__ */ new Int32Array(256);
var tablesInitialized = false;
function createEngine$2(key, authenticationKey) {
	initTables();
	const roundKeys = new Int32Array(ROUND_KEYS_LENGTH);
	const rounds = expandKey(key, roundKeys);
	const keystream = new Int32Array(BLOCK_LENGTH$1 / 4);
	const hmac = createHmac(authenticationKey);
	let counter0 = 0;
	let counter1 = 0;
	let counter2 = 0;
	let counter3 = 0;
	return {
		process(data, decrypt) {
			if (decrypt) hmac.update(data, 0, data.length);
			encrypt(data);
			if (!decrypt) hmac.update(data, 0, data.length);
		},
		digest() {
			return hmac.digest();
		}
	};
	function encrypt(data) {
		const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
		const length = data.length;
		let offset = 0;
		for (; offset + BLOCK_LENGTH$1 <= length; offset += BLOCK_LENGTH$1) {
			nextKeystream();
			view.setInt32(offset, view.getInt32(offset) ^ keystream[0]);
			view.setInt32(offset + 4, view.getInt32(offset + 4) ^ keystream[1]);
			view.setInt32(offset + 8, view.getInt32(offset + 8) ^ keystream[2]);
			view.setInt32(offset + 12, view.getInt32(offset + 12) ^ keystream[3]);
		}
		if (offset < length) {
			nextKeystream();
			for (let indexByte = 0; offset < length; offset++, indexByte++) data[offset] ^= keystream[indexByte >> 2] >>> 24 - 8 * (indexByte & 3);
		}
	}
	function nextKeystream() {
		counter0 = counter0 + 1 | 0;
		if (!counter0) {
			counter1 = counter1 + 1 | 0;
			if (!counter1) {
				counter2 = counter2 + 1 | 0;
				if (!counter2) counter3 = counter3 + 1 | 0;
			}
		}
		let s0 = swapBytes(counter0) ^ roundKeys[0];
		let s1 = swapBytes(counter1) ^ roundKeys[1];
		let s2 = swapBytes(counter2) ^ roundKeys[2];
		let s3 = swapBytes(counter3) ^ roundKeys[3];
		let t0 = T0[s0 >>> 24] ^ T1[s1 >>> 16 & 255] ^ T2[s2 >>> 8 & 255] ^ T3[s3 & 255] ^ roundKeys[4];
		let t1 = T0[s1 >>> 24] ^ T1[s2 >>> 16 & 255] ^ T2[s3 >>> 8 & 255] ^ T3[s0 & 255] ^ roundKeys[5];
		let t2 = T0[s2 >>> 24] ^ T1[s3 >>> 16 & 255] ^ T2[s0 >>> 8 & 255] ^ T3[s1 & 255] ^ roundKeys[6];
		let t3 = T0[s3 >>> 24] ^ T1[s0 >>> 16 & 255] ^ T2[s1 >>> 8 & 255] ^ T3[s2 & 255] ^ roundKeys[7];
		s0 = T0[t0 >>> 24] ^ T1[t1 >>> 16 & 255] ^ T2[t2 >>> 8 & 255] ^ T3[t3 & 255] ^ roundKeys[8];
		s1 = T0[t1 >>> 24] ^ T1[t2 >>> 16 & 255] ^ T2[t3 >>> 8 & 255] ^ T3[t0 & 255] ^ roundKeys[9];
		s2 = T0[t2 >>> 24] ^ T1[t3 >>> 16 & 255] ^ T2[t0 >>> 8 & 255] ^ T3[t1 & 255] ^ roundKeys[10];
		s3 = T0[t3 >>> 24] ^ T1[t0 >>> 16 & 255] ^ T2[t1 >>> 8 & 255] ^ T3[t2 & 255] ^ roundKeys[11];
		t0 = T0[s0 >>> 24] ^ T1[s1 >>> 16 & 255] ^ T2[s2 >>> 8 & 255] ^ T3[s3 & 255] ^ roundKeys[12];
		t1 = T0[s1 >>> 24] ^ T1[s2 >>> 16 & 255] ^ T2[s3 >>> 8 & 255] ^ T3[s0 & 255] ^ roundKeys[13];
		t2 = T0[s2 >>> 24] ^ T1[s3 >>> 16 & 255] ^ T2[s0 >>> 8 & 255] ^ T3[s1 & 255] ^ roundKeys[14];
		t3 = T0[s3 >>> 24] ^ T1[s0 >>> 16 & 255] ^ T2[s1 >>> 8 & 255] ^ T3[s2 & 255] ^ roundKeys[15];
		s0 = T0[t0 >>> 24] ^ T1[t1 >>> 16 & 255] ^ T2[t2 >>> 8 & 255] ^ T3[t3 & 255] ^ roundKeys[16];
		s1 = T0[t1 >>> 24] ^ T1[t2 >>> 16 & 255] ^ T2[t3 >>> 8 & 255] ^ T3[t0 & 255] ^ roundKeys[17];
		s2 = T0[t2 >>> 24] ^ T1[t3 >>> 16 & 255] ^ T2[t0 >>> 8 & 255] ^ T3[t1 & 255] ^ roundKeys[18];
		s3 = T0[t3 >>> 24] ^ T1[t0 >>> 16 & 255] ^ T2[t1 >>> 8 & 255] ^ T3[t2 & 255] ^ roundKeys[19];
		t0 = T0[s0 >>> 24] ^ T1[s1 >>> 16 & 255] ^ T2[s2 >>> 8 & 255] ^ T3[s3 & 255] ^ roundKeys[20];
		t1 = T0[s1 >>> 24] ^ T1[s2 >>> 16 & 255] ^ T2[s3 >>> 8 & 255] ^ T3[s0 & 255] ^ roundKeys[21];
		t2 = T0[s2 >>> 24] ^ T1[s3 >>> 16 & 255] ^ T2[s0 >>> 8 & 255] ^ T3[s1 & 255] ^ roundKeys[22];
		t3 = T0[s3 >>> 24] ^ T1[s0 >>> 16 & 255] ^ T2[s1 >>> 8 & 255] ^ T3[s2 & 255] ^ roundKeys[23];
		s0 = T0[t0 >>> 24] ^ T1[t1 >>> 16 & 255] ^ T2[t2 >>> 8 & 255] ^ T3[t3 & 255] ^ roundKeys[24];
		s1 = T0[t1 >>> 24] ^ T1[t2 >>> 16 & 255] ^ T2[t3 >>> 8 & 255] ^ T3[t0 & 255] ^ roundKeys[25];
		s2 = T0[t2 >>> 24] ^ T1[t3 >>> 16 & 255] ^ T2[t0 >>> 8 & 255] ^ T3[t1 & 255] ^ roundKeys[26];
		s3 = T0[t3 >>> 24] ^ T1[t0 >>> 16 & 255] ^ T2[t1 >>> 8 & 255] ^ T3[t2 & 255] ^ roundKeys[27];
		t0 = T0[s0 >>> 24] ^ T1[s1 >>> 16 & 255] ^ T2[s2 >>> 8 & 255] ^ T3[s3 & 255] ^ roundKeys[28];
		t1 = T0[s1 >>> 24] ^ T1[s2 >>> 16 & 255] ^ T2[s3 >>> 8 & 255] ^ T3[s0 & 255] ^ roundKeys[29];
		t2 = T0[s2 >>> 24] ^ T1[s3 >>> 16 & 255] ^ T2[s0 >>> 8 & 255] ^ T3[s1 & 255] ^ roundKeys[30];
		t3 = T0[s3 >>> 24] ^ T1[s0 >>> 16 & 255] ^ T2[s1 >>> 8 & 255] ^ T3[s2 & 255] ^ roundKeys[31];
		s0 = T0[t0 >>> 24] ^ T1[t1 >>> 16 & 255] ^ T2[t2 >>> 8 & 255] ^ T3[t3 & 255] ^ roundKeys[32];
		s1 = T0[t1 >>> 24] ^ T1[t2 >>> 16 & 255] ^ T2[t3 >>> 8 & 255] ^ T3[t0 & 255] ^ roundKeys[33];
		s2 = T0[t2 >>> 24] ^ T1[t3 >>> 16 & 255] ^ T2[t0 >>> 8 & 255] ^ T3[t1 & 255] ^ roundKeys[34];
		s3 = T0[t3 >>> 24] ^ T1[t0 >>> 16 & 255] ^ T2[t1 >>> 8 & 255] ^ T3[t2 & 255] ^ roundKeys[35];
		t0 = T0[s0 >>> 24] ^ T1[s1 >>> 16 & 255] ^ T2[s2 >>> 8 & 255] ^ T3[s3 & 255] ^ roundKeys[36];
		t1 = T0[s1 >>> 24] ^ T1[s2 >>> 16 & 255] ^ T2[s3 >>> 8 & 255] ^ T3[s0 & 255] ^ roundKeys[37];
		t2 = T0[s2 >>> 24] ^ T1[s3 >>> 16 & 255] ^ T2[s0 >>> 8 & 255] ^ T3[s1 & 255] ^ roundKeys[38];
		t3 = T0[s3 >>> 24] ^ T1[s0 >>> 16 & 255] ^ T2[s1 >>> 8 & 255] ^ T3[s2 & 255] ^ roundKeys[39];
		let indexKey = 40;
		if (rounds > 10) {
			s0 = T0[t0 >>> 24] ^ T1[t1 >>> 16 & 255] ^ T2[t2 >>> 8 & 255] ^ T3[t3 & 255] ^ roundKeys[40];
			s1 = T0[t1 >>> 24] ^ T1[t2 >>> 16 & 255] ^ T2[t3 >>> 8 & 255] ^ T3[t0 & 255] ^ roundKeys[41];
			s2 = T0[t2 >>> 24] ^ T1[t3 >>> 16 & 255] ^ T2[t0 >>> 8 & 255] ^ T3[t1 & 255] ^ roundKeys[42];
			s3 = T0[t3 >>> 24] ^ T1[t0 >>> 16 & 255] ^ T2[t1 >>> 8 & 255] ^ T3[t2 & 255] ^ roundKeys[43];
			t0 = T0[s0 >>> 24] ^ T1[s1 >>> 16 & 255] ^ T2[s2 >>> 8 & 255] ^ T3[s3 & 255] ^ roundKeys[44];
			t1 = T0[s1 >>> 24] ^ T1[s2 >>> 16 & 255] ^ T2[s3 >>> 8 & 255] ^ T3[s0 & 255] ^ roundKeys[45];
			t2 = T0[s2 >>> 24] ^ T1[s3 >>> 16 & 255] ^ T2[s0 >>> 8 & 255] ^ T3[s1 & 255] ^ roundKeys[46];
			t3 = T0[s3 >>> 24] ^ T1[s0 >>> 16 & 255] ^ T2[s1 >>> 8 & 255] ^ T3[s2 & 255] ^ roundKeys[47];
			indexKey = 48;
		}
		if (rounds > 12) {
			s0 = T0[t0 >>> 24] ^ T1[t1 >>> 16 & 255] ^ T2[t2 >>> 8 & 255] ^ T3[t3 & 255] ^ roundKeys[48];
			s1 = T0[t1 >>> 24] ^ T1[t2 >>> 16 & 255] ^ T2[t3 >>> 8 & 255] ^ T3[t0 & 255] ^ roundKeys[49];
			s2 = T0[t2 >>> 24] ^ T1[t3 >>> 16 & 255] ^ T2[t0 >>> 8 & 255] ^ T3[t1 & 255] ^ roundKeys[50];
			s3 = T0[t3 >>> 24] ^ T1[t0 >>> 16 & 255] ^ T2[t1 >>> 8 & 255] ^ T3[t2 & 255] ^ roundKeys[51];
			t0 = T0[s0 >>> 24] ^ T1[s1 >>> 16 & 255] ^ T2[s2 >>> 8 & 255] ^ T3[s3 & 255] ^ roundKeys[52];
			t1 = T0[s1 >>> 24] ^ T1[s2 >>> 16 & 255] ^ T2[s3 >>> 8 & 255] ^ T3[s0 & 255] ^ roundKeys[53];
			t2 = T0[s2 >>> 24] ^ T1[s3 >>> 16 & 255] ^ T2[s0 >>> 8 & 255] ^ T3[s1 & 255] ^ roundKeys[54];
			t3 = T0[s3 >>> 24] ^ T1[s0 >>> 16 & 255] ^ T2[s1 >>> 8 & 255] ^ T3[s2 & 255] ^ roundKeys[55];
			indexKey = 56;
		}
		keystream[0] = (S_BOX[t0 >>> 24] << 24 | S_BOX[t1 >>> 16 & 255] << 16 | S_BOX[t2 >>> 8 & 255] << 8 | S_BOX[t3 & 255]) ^ roundKeys[indexKey];
		keystream[1] = (S_BOX[t1 >>> 24] << 24 | S_BOX[t2 >>> 16 & 255] << 16 | S_BOX[t3 >>> 8 & 255] << 8 | S_BOX[t0 & 255]) ^ roundKeys[indexKey + 1];
		keystream[2] = (S_BOX[t2 >>> 24] << 24 | S_BOX[t3 >>> 16 & 255] << 16 | S_BOX[t0 >>> 8 & 255] << 8 | S_BOX[t1 & 255]) ^ roundKeys[indexKey + 2];
		keystream[3] = (S_BOX[t3 >>> 24] << 24 | S_BOX[t0 >>> 16 & 255] << 16 | S_BOX[t1 >>> 8 & 255] << 8 | S_BOX[t2 & 255]) ^ roundKeys[indexKey + 3];
	}
}
function pbkdf2(password, salt, iterations, length) {
	const hmac = createHmac(password);
	const result = new Uint8Array(length);
	const block = new Uint8Array(salt.length + 4);
	const blockView = new DataView(block.buffer);
	block.set(salt);
	for (let indexBlock = 1, offset = 0; offset < length; indexBlock++, offset += SHA1_DIGEST_LENGTH) {
		blockView.setUint32(salt.length, indexBlock);
		hmac.update(block, 0, block.length);
		let previous = hmac.digest();
		const output = previous.slice();
		for (let iteration = 1; iteration < iterations; iteration++) {
			hmac.update(previous, 0, SHA1_DIGEST_LENGTH);
			previous = hmac.digest();
			for (let indexByte = 0; indexByte < SHA1_DIGEST_LENGTH; indexByte++) output[indexByte] ^= previous[indexByte];
		}
		result.set(output.subarray(0, Math.min(SHA1_DIGEST_LENGTH, length - offset)), offset);
	}
	return result;
}
function createHmac(key) {
	const sha1 = createSha1();
	const innerKey = new Uint8Array(SHA1_BLOCK_LENGTH);
	const outerKey = new Uint8Array(SHA1_BLOCK_LENGTH);
	if (key.length > SHA1_BLOCK_LENGTH) {
		sha1.update(key, 0, key.length);
		key = sha1.digest();
	}
	for (let indexByte = 0; indexByte < SHA1_BLOCK_LENGTH; indexByte++) {
		const keyByte = indexByte < key.length ? key[indexByte] : 0;
		innerKey[indexByte] = keyByte ^ HMAC_INNER_PADDING;
		outerKey[indexByte] = keyByte ^ HMAC_OUTER_PADDING;
	}
	sha1.update(innerKey, 0, SHA1_BLOCK_LENGTH);
	return {
		update(data, offset, length) {
			sha1.update(data, offset, length);
		},
		digest() {
			const innerDigest = sha1.digest();
			sha1.update(outerKey, 0, SHA1_BLOCK_LENGTH);
			sha1.update(innerDigest, 0, SHA1_DIGEST_LENGTH);
			const result = sha1.digest();
			sha1.update(innerKey, 0, SHA1_BLOCK_LENGTH);
			return result;
		}
	};
}
function createSha1() {
	const state = new Int32Array(SHA1_INITIAL_STATE);
	const schedule = new Int32Array(SHA1_SCHEDULE_LENGTH);
	const block = new Uint8Array(SHA1_BLOCK_LENGTH);
	const blockView = new DataView(block.buffer);
	const lengthBytes = /* @__PURE__ */ new Uint8Array(8);
	let blockLength = 0;
	let totalLength = 0;
	return {
		update,
		digest
	};
	function update(data, offset, length) {
		const end = offset + length;
		totalLength += length;
		if (blockLength) {
			while (offset < end && blockLength < SHA1_BLOCK_LENGTH) block[blockLength++] = data[offset++];
			if (blockLength == SHA1_BLOCK_LENGTH) {
				compress(blockView, 0);
				blockLength = 0;
			}
		}
		if (offset + SHA1_BLOCK_LENGTH <= end) {
			const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
			for (; offset + SHA1_BLOCK_LENGTH <= end; offset += SHA1_BLOCK_LENGTH) compress(view, offset);
		}
		while (offset < end) block[blockLength++] = data[offset++];
	}
	function digest() {
		const bits = totalLength * 8;
		const high = Math.floor(bits / 4294967296);
		const low = bits >>> 0;
		update(SHA1_PADDING, 0, 1);
		while (blockLength != SHA1_LENGTH_OFFSET) update(SHA1_ZERO, 0, 1);
		lengthBytes[0] = high >>> 24;
		lengthBytes[1] = high >>> 16;
		lengthBytes[2] = high >>> 8;
		lengthBytes[3] = high;
		lengthBytes[4] = low >>> 24;
		lengthBytes[5] = low >>> 16;
		lengthBytes[6] = low >>> 8;
		lengthBytes[7] = low;
		update(lengthBytes, 0, 8);
		const result = new Uint8Array(SHA1_DIGEST_LENGTH);
		const resultView = new DataView(result.buffer);
		for (let indexWord = 0; indexWord < state.length; indexWord++) resultView.setInt32(4 * indexWord, state[indexWord]);
		state.set(SHA1_INITIAL_STATE);
		blockLength = 0;
		totalLength = 0;
		return result;
	}
	function compress(view, offset) {
		for (let index = 0; index < 16; index++) schedule[index] = view.getInt32(offset + 4 * index);
		let a = state[0];
		let b = state[1];
		let c = state[2];
		let d = state[3];
		let e = state[4];
		let t;
		for (let index = 0; index < 15; index += 5) {
			e = (a << 5 | a >>> 27) + ((c ^ d) & b ^ d) + e + 1518500249 + schedule[index] | 0;
			b = b << 30 | b >>> 2;
			d = (e << 5 | e >>> 27) + ((b ^ c) & a ^ c) + d + 1518500249 + schedule[index + 1] | 0;
			a = a << 30 | a >>> 2;
			c = (d << 5 | d >>> 27) + ((a ^ b) & e ^ b) + c + 1518500249 + schedule[index + 2] | 0;
			e = e << 30 | e >>> 2;
			b = (c << 5 | c >>> 27) + ((e ^ a) & d ^ a) + b + 1518500249 + schedule[index + 3] | 0;
			d = d << 30 | d >>> 2;
			a = (b << 5 | b >>> 27) + ((d ^ e) & c ^ e) + a + 1518500249 + schedule[index + 4] | 0;
			c = c << 30 | c >>> 2;
		}
		e = (a << 5 | a >>> 27) + ((c ^ d) & b ^ d) + e + 1518500249 + schedule[15] | 0;
		b = b << 30 | b >>> 2;
		t = schedule[13] ^ schedule[8] ^ schedule[2] ^ schedule[0];
		t = t << 1 | t >>> 31;
		schedule[0] = t;
		d = (e << 5 | e >>> 27) + ((b ^ c) & a ^ c) + d + 1518500249 + t | 0;
		a = a << 30 | a >>> 2;
		t = schedule[14] ^ schedule[9] ^ schedule[3] ^ schedule[1];
		t = t << 1 | t >>> 31;
		schedule[1] = t;
		c = (d << 5 | d >>> 27) + ((a ^ b) & e ^ b) + c + 1518500249 + t | 0;
		e = e << 30 | e >>> 2;
		t = schedule[15] ^ schedule[10] ^ schedule[4] ^ schedule[2];
		t = t << 1 | t >>> 31;
		schedule[2] = t;
		b = (c << 5 | c >>> 27) + ((e ^ a) & d ^ a) + b + 1518500249 + t | 0;
		d = d << 30 | d >>> 2;
		t = schedule[0] ^ schedule[11] ^ schedule[5] ^ schedule[3];
		t = t << 1 | t >>> 31;
		schedule[3] = t;
		a = (b << 5 | b >>> 27) + ((d ^ e) & c ^ e) + a + 1518500249 + t | 0;
		c = c << 30 | c >>> 2;
		for (let index = 20; index < 40; index += 5) {
			t = schedule[index - 3 & 15] ^ schedule[index - 8 & 15] ^ schedule[index - 14 & 15] ^ schedule[index & 15];
			t = t << 1 | t >>> 31;
			schedule[index & 15] = t;
			e = (a << 5 | a >>> 27) + (b ^ c ^ d) + e + 1859775393 + t | 0;
			b = b << 30 | b >>> 2;
			t = schedule[index - 2 & 15] ^ schedule[index - 7 & 15] ^ schedule[index - 13 & 15] ^ schedule[index + 1 & 15];
			t = t << 1 | t >>> 31;
			schedule[index + 1 & 15] = t;
			d = (e << 5 | e >>> 27) + (a ^ b ^ c) + d + 1859775393 + t | 0;
			a = a << 30 | a >>> 2;
			t = schedule[index - 1 & 15] ^ schedule[index - 6 & 15] ^ schedule[index - 12 & 15] ^ schedule[index + 2 & 15];
			t = t << 1 | t >>> 31;
			schedule[index + 2 & 15] = t;
			c = (d << 5 | d >>> 27) + (e ^ a ^ b) + c + 1859775393 + t | 0;
			e = e << 30 | e >>> 2;
			t = schedule[index & 15] ^ schedule[index - 5 & 15] ^ schedule[index - 11 & 15] ^ schedule[index + 3 & 15];
			t = t << 1 | t >>> 31;
			schedule[index + 3 & 15] = t;
			b = (c << 5 | c >>> 27) + (d ^ e ^ a) + b + 1859775393 + t | 0;
			d = d << 30 | d >>> 2;
			t = schedule[index + 1 & 15] ^ schedule[index - 4 & 15] ^ schedule[index - 10 & 15] ^ schedule[index + 4 & 15];
			t = t << 1 | t >>> 31;
			schedule[index + 4 & 15] = t;
			a = (b << 5 | b >>> 27) + (c ^ d ^ e) + a + 1859775393 + t | 0;
			c = c << 30 | c >>> 2;
		}
		for (let index = 40; index < 60; index += 5) {
			t = schedule[index - 3 & 15] ^ schedule[index - 8 & 15] ^ schedule[index - 14 & 15] ^ schedule[index & 15];
			t = t << 1 | t >>> 31;
			schedule[index & 15] = t;
			e = (a << 5 | a >>> 27) + (b & c | (b | c) & d) + e + 2400959708 + t | 0;
			b = b << 30 | b >>> 2;
			t = schedule[index - 2 & 15] ^ schedule[index - 7 & 15] ^ schedule[index - 13 & 15] ^ schedule[index + 1 & 15];
			t = t << 1 | t >>> 31;
			schedule[index + 1 & 15] = t;
			d = (e << 5 | e >>> 27) + (a & b | (a | b) & c) + d + 2400959708 + t | 0;
			a = a << 30 | a >>> 2;
			t = schedule[index - 1 & 15] ^ schedule[index - 6 & 15] ^ schedule[index - 12 & 15] ^ schedule[index + 2 & 15];
			t = t << 1 | t >>> 31;
			schedule[index + 2 & 15] = t;
			c = (d << 5 | d >>> 27) + (e & a | (e | a) & b) + c + 2400959708 + t | 0;
			e = e << 30 | e >>> 2;
			t = schedule[index & 15] ^ schedule[index - 5 & 15] ^ schedule[index - 11 & 15] ^ schedule[index + 3 & 15];
			t = t << 1 | t >>> 31;
			schedule[index + 3 & 15] = t;
			b = (c << 5 | c >>> 27) + (d & e | (d | e) & a) + b + 2400959708 + t | 0;
			d = d << 30 | d >>> 2;
			t = schedule[index + 1 & 15] ^ schedule[index - 4 & 15] ^ schedule[index - 10 & 15] ^ schedule[index + 4 & 15];
			t = t << 1 | t >>> 31;
			schedule[index + 4 & 15] = t;
			a = (b << 5 | b >>> 27) + (c & d | (c | d) & e) + a + 2400959708 + t | 0;
			c = c << 30 | c >>> 2;
		}
		for (let index = 60; index < 80; index += 5) {
			t = schedule[index - 3 & 15] ^ schedule[index - 8 & 15] ^ schedule[index - 14 & 15] ^ schedule[index & 15];
			t = t << 1 | t >>> 31;
			schedule[index & 15] = t;
			e = (a << 5 | a >>> 27) + (b ^ c ^ d) + e + 3395469782 + t | 0;
			b = b << 30 | b >>> 2;
			t = schedule[index - 2 & 15] ^ schedule[index - 7 & 15] ^ schedule[index - 13 & 15] ^ schedule[index + 1 & 15];
			t = t << 1 | t >>> 31;
			schedule[index + 1 & 15] = t;
			d = (e << 5 | e >>> 27) + (a ^ b ^ c) + d + 3395469782 + t | 0;
			a = a << 30 | a >>> 2;
			t = schedule[index - 1 & 15] ^ schedule[index - 6 & 15] ^ schedule[index - 12 & 15] ^ schedule[index + 2 & 15];
			t = t << 1 | t >>> 31;
			schedule[index + 2 & 15] = t;
			c = (d << 5 | d >>> 27) + (e ^ a ^ b) + c + 3395469782 + t | 0;
			e = e << 30 | e >>> 2;
			t = schedule[index & 15] ^ schedule[index - 5 & 15] ^ schedule[index - 11 & 15] ^ schedule[index + 3 & 15];
			t = t << 1 | t >>> 31;
			schedule[index + 3 & 15] = t;
			b = (c << 5 | c >>> 27) + (d ^ e ^ a) + b + 3395469782 + t | 0;
			d = d << 30 | d >>> 2;
			t = schedule[index + 1 & 15] ^ schedule[index - 4 & 15] ^ schedule[index - 10 & 15] ^ schedule[index + 4 & 15];
			t = t << 1 | t >>> 31;
			schedule[index + 4 & 15] = t;
			a = (b << 5 | b >>> 27) + (c ^ d ^ e) + a + 3395469782 + t | 0;
			c = c << 30 | c >>> 2;
		}
		state[0] = state[0] + a | 0;
		state[1] = state[1] + b | 0;
		state[2] = state[2] + c | 0;
		state[3] = state[3] + d | 0;
		state[4] = state[4] + e | 0;
	}
}
function initTables() {
	if (!tablesInitialized) {
		let p = 1;
		let q = 1;
		do {
			p = (p ^ p << 1 ^ (p & 128 ? 27 : 0)) & 255;
			q = (q ^ q << 1) & 255;
			q = (q ^ q << 2) & 255;
			q = (q ^ q << 4) & 255;
			if (q & 128) q ^= 9;
			S_BOX[p] = (q ^ (q << 1 | q >> 7) ^ (q << 2 | q >> 6) ^ (q << 3 | q >> 5) ^ (q << 4 | q >> 4) ^ 99) & 255;
		} while (p != 1);
		S_BOX[0] = 99;
		for (let index = 0; index < 256; index++) {
			const s = S_BOX[index];
			const s2 = multiplyByTwo(s);
			const t = s2 << 24 | s << 16 | s << 8 | s2 ^ s;
			T0[index] = t;
			T1[index] = t >>> 8 | t << 24;
			T2[index] = t >>> 16 | t << 16;
			T3[index] = t >>> 24 | t << 8;
		}
		tablesInitialized = true;
	}
}
function expandKey(key, roundKeys) {
	const keyWords = key.length >> 2;
	const rounds = keyWords + 6;
	const total = 4 * (rounds + 1);
	let roundConstant = 1;
	for (let index = 0; index < keyWords; index++) roundKeys[index] = key[4 * index] << 24 | key[4 * index + 1] << 16 | key[4 * index + 2] << 8 | key[4 * index + 3];
	for (let index = keyWords; index < total; index++) {
		let word = roundKeys[index - 1];
		if (index % keyWords == 0) {
			word = substituteWord(word << 8 | word >>> 24) ^ roundConstant << 24;
			roundConstant = multiplyByTwo(roundConstant);
		} else if (keyWords > 6 && index % keyWords == 4) word = substituteWord(word);
		roundKeys[index] = roundKeys[index - keyWords] ^ word;
	}
	return rounds;
}
function substituteWord(word) {
	return S_BOX[word >>> 24] << 24 | S_BOX[word >>> 16 & 255] << 16 | S_BOX[word >>> 8 & 255] << 8 | S_BOX[word & 255];
}
function swapBytes(value) {
	return value << 24 | (value & 65280) << 8 | value >>> 8 & 65280 | value >>> 24;
}
function multiplyByTwo(value) {
	return (value << 1 ^ (value >> 7) * 27) & 255;
}
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/streams/common-crypto.js
var GET_RANDOM_VALUES_SUPPORTED = typeof crypto != "undefined" && typeof crypto.getRandomValues == "function";
var ERR_INVALID_PASSWORD = "Invalid password";
var ERR_INVALID_AUTHENTICATION_CODE = "Invalid authentication code";
var ERR_ABORT_CHECK_PASSWORD = "zipjs-abort-check-password";
var ERR_UNSUPPORTED_CRYPTO_API = "Crypto API not supported";
function getRandomValues(array) {
	if (GET_RANDOM_VALUES_SUPPORTED) return crypto.getRandomValues(array);
	else throw new Error(ERR_UNSUPPORTED_CRYPTO_API);
}
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/streams/aes-crypto-stream.js
var BLOCK_LENGTH = 16;
var RAW_FORMAT = "raw";
var PBKDF2_ALGORITHM = { name: "PBKDF2" };
var HASH_ALGORITHM = { name: "HMAC" };
var HASH_FUNCTION = "SHA-1";
var PBKDF2_ITERATIONS = 1e3;
var BASE_KEY_ALGORITHM = Object.assign({ hash: HASH_ALGORITHM }, PBKDF2_ALGORITHM);
var DERIVED_BITS_ALGORITHM = Object.assign({
	iterations: PBKDF2_ITERATIONS,
	hash: { name: HASH_FUNCTION }
}, PBKDF2_ALGORITHM);
var DERIVED_BITS_USAGE = ["deriveBits"];
var SALT_LENGTH = [
	8,
	12,
	16
];
var KEY_LENGTH = [
	16,
	24,
	32
];
var AUTHENTICATION_CODE_LENGTH = 10;
var PASSWORD_VERIFICATION_LENGTH = 2;
var CRYPTO_API_SUPPORTED = typeof crypto != UNDEFINED_TYPE;
var subtle = CRYPTO_API_SUPPORTED && crypto.subtle;
var DERIVE_BITS_SUPPORTED = CRYPTO_API_SUPPORTED && typeof subtle != "undefined" && typeof subtle.importKey == "function" && typeof subtle.deriveBits == "function";
var createEngine$1 = createEngine$2;
var AESDecryptionStream = class extends TransformStream {
	constructor({ password, rawPassword, encryptionStrength, checkPasswordOnly, checkAuthenticationCode = true }) {
		super({
			start() {
				initAesCrypto(this, password, rawPassword, encryptionStrength);
			},
			async transform(chunk, controller) {
				const aesCrypto = this;
				const { password, strength, resolveReady, ready } = aesCrypto;
				if (password) {
					await createDecryptionKeys(aesCrypto, strength, password, subarray(chunk, 0, SALT_LENGTH[strength] + PASSWORD_VERIFICATION_LENGTH));
					chunk = subarray(chunk, SALT_LENGTH[strength] + PASSWORD_VERIFICATION_LENGTH);
					if (checkPasswordOnly) {
						disposeEngine(aesCrypto);
						controller.error(new Error(ERR_ABORT_CHECK_PASSWORD));
					} else resolveReady();
				} else await ready;
				const output = new Uint8Array(chunk.length - AUTHENTICATION_CODE_LENGTH - (chunk.length - AUTHENTICATION_CODE_LENGTH) % BLOCK_LENGTH);
				controller.enqueue(append(aesCrypto, chunk, output, 0, AUTHENTICATION_CODE_LENGTH, true));
			},
			async flush(controller) {
				const { engine, pendingInput, ready } = this;
				if (engine) {
					await ready;
					const originalAuthenticationCode = subarray(pendingInput, pendingInput.length - AUTHENTICATION_CODE_LENGTH);
					const decryptedChunkArray = new Uint8Array(subarray(pendingInput, 0, pendingInput.length - AUTHENTICATION_CODE_LENGTH));
					engine.process(decryptedChunkArray, true);
					const authenticationCode = engine.digest();
					let invalidAuthenticationCode = pendingInput.length < AUTHENTICATION_CODE_LENGTH ? 1 : 0;
					for (let indexByte = 0; indexByte < AUTHENTICATION_CODE_LENGTH; indexByte++) invalidAuthenticationCode |= authenticationCode[indexByte] ^ originalAuthenticationCode[indexByte];
					if (invalidAuthenticationCode && checkAuthenticationCode) throw new Error(ERR_INVALID_AUTHENTICATION_CODE);
					controller.enqueue(decryptedChunkArray);
				}
			},
			cancel() {
				disposeEngine(this);
			}
		});
	}
};
var AESEncryptionStream = class extends TransformStream {
	constructor({ password, rawPassword, encryptionStrength }) {
		super({
			start() {
				initAesCrypto(this, password, rawPassword, encryptionStrength);
			},
			async transform(chunk, controller) {
				const aesCrypto = this;
				const { password, strength, resolveReady, ready } = aesCrypto;
				let preamble = EMPTY_UINT8_ARRAY;
				if (password) {
					preamble = await createEncryptionKeys(aesCrypto, strength, password);
					resolveReady();
				} else await ready;
				const output = new Uint8Array(preamble.length + chunk.length - chunk.length % BLOCK_LENGTH);
				output.set(preamble, 0);
				controller.enqueue(append(aesCrypto, chunk, output, preamble.length, 0, false));
			},
			async flush(controller) {
				const { engine, pendingInput, ready } = this;
				if (engine) {
					await ready;
					const encryptedChunkArray = new Uint8Array(pendingInput);
					engine.process(encryptedChunkArray, false);
					const authenticationCode = subarray(engine.digest(), 0, AUTHENTICATION_CODE_LENGTH);
					controller.enqueue(concat(encryptedChunkArray, authenticationCode));
				}
			},
			cancel() {
				disposeEngine(this);
			}
		});
	}
};
function setAESEngine(createEngineFunction) {
	createEngine$1 = createEngineFunction || createEngine$2;
}
function initAesCrypto(aesCrypto, password, rawPassword, encryptionStrength) {
	Object.assign(aesCrypto, {
		ready: new Promise((resolve) => aesCrypto.resolveReady = resolve),
		password: encodePassword(password, rawPassword),
		strength: encryptionStrength - 1,
		pendingInput: EMPTY_UINT8_ARRAY
	});
}
function append(aesCrypto, input, output, paddingStart, paddingEnd, decrypt) {
	const { engine, pendingInput } = aesCrypto;
	if (pendingInput.length) input = concat(pendingInput, input);
	const inputLength = input.length - paddingEnd;
	const alignedLength = inputLength - inputLength % BLOCK_LENGTH;
	output = expand(output, paddingStart + alignedLength);
	if (alignedLength) {
		const chunk = subarray(output, paddingStart, paddingStart + alignedLength);
		chunk.set(subarray(input, 0, alignedLength));
		engine.process(chunk, decrypt);
	}
	aesCrypto.pendingInput = subarray(input, alignedLength);
	return output;
}
async function createDecryptionKeys(decrypt, strength, password, preamble) {
	const passwordVerificationKey = await createKeys$1(decrypt, strength, password, subarray(preamble, 0, SALT_LENGTH[strength]));
	const passwordVerification = subarray(preamble, SALT_LENGTH[strength]);
	if (passwordVerificationKey[0] != passwordVerification[0] || passwordVerificationKey[1] != passwordVerification[1]) {
		disposeEngine(decrypt);
		throw new Error(ERR_INVALID_PASSWORD);
	}
}
function disposeEngine({ engine }) {
	if (engine && engine.dispose) engine.dispose();
}
async function createEncryptionKeys(encrypt, strength, password) {
	const salt = getRandomValues(new Uint8Array(SALT_LENGTH[strength]));
	return concat(salt, await createKeys$1(encrypt, strength, password, salt));
}
async function createKeys$1(aesCrypto, strength, password, salt) {
	aesCrypto.password = null;
	const keyLength = KEY_LENGTH[strength];
	const compositeKey = await deriveKey(password, salt, keyLength * 2 + PASSWORD_VERIFICATION_LENGTH);
	aesCrypto.engine = createEngine$1(subarray(compositeKey, 0, keyLength), subarray(compositeKey, keyLength, keyLength * 2));
	return subarray(compositeKey, keyLength * 2);
}
async function deriveKey(password, salt, length) {
	if (DERIVE_BITS_SUPPORTED) try {
		const baseKey = await subtle.importKey(RAW_FORMAT, password, BASE_KEY_ALGORITHM, false, DERIVED_BITS_USAGE);
		return new Uint8Array(await subtle.deriveBits(Object.assign({ salt }, DERIVED_BITS_ALGORITHM), baseKey, length * 8));
	} catch {
		DERIVE_BITS_SUPPORTED = false;
	}
	return pbkdf2(password, salt, PBKDF2_ITERATIONS, length);
}
function encodePassword(password, rawPassword) {
	if (rawPassword === void 0) return encodeText(password);
	else return rawPassword;
}
function expand(inputArray, length) {
	if (length && length > inputArray.length) {
		const array = inputArray;
		inputArray = new Uint8Array(length);
		inputArray.set(array, 0);
	}
	return inputArray;
}
function subarray(array, begin, end) {
	return array.subarray(begin, end);
}
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/streams/zip-crypto-stream.js
var HEADER_LENGTH = 12;
var ZipCryptoDecryptionStream = class extends TransformStream {
	constructor({ password, rawPassword, passwordVerification, checkPasswordOnly }) {
		super({
			start() {
				initZipCrypto(this, password, rawPassword, passwordVerification);
			},
			transform(chunk, controller) {
				const zipCrypto = this;
				if (zipCrypto.password || zipCrypto.rawPassword) {
					const decryptedHeader = decrypt(zipCrypto, chunk.subarray(0, HEADER_LENGTH));
					zipCrypto.password = zipCrypto.rawPassword = null;
					if ((decryptedHeader[11] ^ zipCrypto.passwordVerification) != 0) throw new Error(ERR_INVALID_PASSWORD);
					chunk = chunk.subarray(HEADER_LENGTH);
				}
				if (checkPasswordOnly) controller.error(new Error(ERR_ABORT_CHECK_PASSWORD));
				else controller.enqueue(decrypt(zipCrypto, chunk));
			}
		});
	}
};
var ZipCryptoEncryptionStream = class extends TransformStream {
	constructor({ password, rawPassword, passwordVerification }) {
		super({
			start() {
				initZipCrypto(this, password, rawPassword, passwordVerification);
			},
			transform(chunk, controller) {
				const zipCrypto = this;
				let output;
				let offset;
				if (zipCrypto.password || zipCrypto.rawPassword) {
					zipCrypto.password = zipCrypto.rawPassword = null;
					const header = getRandomValues(new Uint8Array(HEADER_LENGTH));
					header[11] = zipCrypto.passwordVerification;
					output = new Uint8Array(chunk.length + header.length);
					output.set(encrypt(zipCrypto, header), 0);
					offset = HEADER_LENGTH;
				} else {
					output = new Uint8Array(chunk.length);
					offset = 0;
				}
				output.set(encrypt(zipCrypto, chunk), offset);
				controller.enqueue(output);
			}
		});
	}
};
function initZipCrypto(zipCrypto, password, rawPassword, passwordVerification) {
	Object.assign(zipCrypto, {
		password,
		rawPassword,
		passwordVerification
	});
	createKeys(zipCrypto, password, rawPassword);
}
function decrypt(target, input) {
	const output = new Uint8Array(input.length);
	for (let index = 0; index < input.length; index++) {
		output[index] = getByte(target) ^ input[index];
		updateKeys(target, output[index]);
	}
	return output;
}
function encrypt(target, input) {
	const output = new Uint8Array(input.length);
	for (let index = 0; index < input.length; index++) {
		output[index] = getByte(target) ^ input[index];
		updateKeys(target, input[index]);
	}
	return output;
}
function createKeys(target, password, rawPassword) {
	const keys = [
		305419896,
		591751049,
		878082192
	];
	Object.assign(target, {
		keys,
		crcKey0: new Crc32(keys[0]),
		crcKey2: new Crc32(keys[2])
	});
	if (rawPassword) for (let index = 0; index < rawPassword.length; index++) updateKeys(target, rawPassword[index]);
	else for (let index = 0; index < password.length; index++) updateKeys(target, password.charCodeAt(index));
}
function updateKeys(target, byte) {
	let [, key1] = target.keys;
	target.crcKey0.append([byte]);
	const key0 = ~target.crcKey0.get();
	key1 = getInt32(Math.imul(getInt32(key1 + getInt8(key0)), 134775813) + 1);
	target.crcKey2.append([key1 >>> 24]);
	const key2 = ~target.crcKey2.get();
	target.keys = [
		key0,
		key1,
		key2
	];
}
function getByte(target) {
	const temp = target.keys[2] | 2;
	return getInt8(Math.imul(temp, temp ^ 1) >>> 8);
}
function getInt8(number) {
	return number & 255;
}
function getInt32(number) {
	return number & 4294967295;
}
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/util/compatible-streams.js
function toCompatibleReadable(readable) {
	if (readable instanceof ReadableStream) return readable;
	const reader = readable.getReader();
	return new ReadableStream({
		async pull(controller) {
			const { value, done } = await reader.read();
			if (done) controller.close();
			else controller.enqueue(value);
		},
		cancel(reason) {
			return reader.cancel(reason);
		}
	});
}
function streamToBlob(readable, contentType) {
	readable = toCompatibleReadable(readable);
	const blobOptions = contentType ? { type: contentType } : {};
	if (responseSupportsGlobalReadable()) return new Response(readable).blob().then((blob) => contentType ? new Blob([blob], blobOptions) : blob);
	const chunks = [];
	return readable.pipeTo(new WritableStream({ write(chunk) {
		chunks.push(chunk);
	} })).then(() => new Blob(chunks, blobOptions));
}
function responseSupportsGlobalReadable() {
	return typeof Blob.prototype.stream != "function" || new Blob([]).stream() instanceof ReadableStream;
}
function toCompatibleWritable(writable) {
	if (writable instanceof WritableStream) return writable;
	const writer = writable.getWriter();
	return new WritableStream({
		write(chunk) {
			return writer.write(chunk);
		},
		close() {
			return writer.close();
		},
		abort(reason) {
			return writer.abort(reason);
		}
	});
}
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/codec-registry.js
var ERR_INVALID_CODEC_MODULE = "Invalid codec module";
var ERR_UNSUPPORTED_COMPRESSION = "Compression method not supported";
var registeredCodecs = /* @__PURE__ */ new Map();
var codecStreams = /* @__PURE__ */ new Map();
function getRegisteredCodec(compressionMethod) {
	return registeredCodecs.get(compressionMethod);
}
function getCodecStreams(format) {
	return codecStreams.get(format);
}
function setCodecStreams(format, streams) {
	const { CompressionStream, DecompressionStream } = streams;
	if (typeof CompressionStream != "function" && typeof DecompressionStream != "function") throw new Error(ERR_INVALID_CODEC_MODULE);
	codecStreams.set(format, {
		CompressionStream,
		DecompressionStream
	});
}
async function ensureCodecStreams(format, codecURI) {
	if (!codecStreams.has(format) && codecURI) setCodecStreams(format, await import(
		/* webpackIgnore: true */
		/* @vite-ignore */
		codecURI
));
}
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/streams/zip-entry-stream.js
var ERR_INVALID_UNCOMPRESSED_SIZE = "Invalid uncompressed size";
var ERR_INVALID_COMPRESSED_DATA = "Invalid compressed data";
var ERR_INVALID_CRC32 = "Invalid CRC32";
var FORMAT_DEFLATE_RAW$1 = "deflate-raw";
var FORMAT_DEFLATE64_RAW$1 = "deflate64-raw";
var FORMAT_GZIP$1 = "gzip";
var GZIP_HEADER_LENGTH = 10;
var GZIP_TRAILER_LENGTH = 8;
var GZIP_HEADER_BYTES = [
	31,
	139,
	8
];
var GZIP_OUTPUT_STALL_TIMEOUT = 5e3;
var DeflateStream = class extends TransformStream {
	constructor(options, { chunkSize, CompressionStreamFallback, CompressionStream }) {
		super({});
		const { compressed, encrypted, useCompressionStream, zipCrypto, computeCrc32, level, deflate64, format, compressionMethod, inputSize } = options;
		const stream = this;
		let crc32Stream, encryptionStream, gzipCrc32Stream;
		let readable = super.readable;
		const codecStreams = format && getCodecStreams(format);
		const GzipCompressionStream = getGzipCompressionStream(useCompressionStream, CompressionStream, CompressionStreamFallback);
		const useGzipCrc32 = computeCrc32 && compressed && !deflate64 && !codecStreams && (!encrypted || zipCrypto) && Boolean(GzipCompressionStream);
		if ((!encrypted || zipCrypto) && computeCrc32 && !useGzipCrc32) {
			crc32Stream = new Crc32Stream();
			readable = pipeThrough(readable, crc32Stream);
		}
		if (compressed) {
			if (codecStreams) readable = pipeThroughBackpressured(readable, createCodecStream(codecStreams.CompressionStream, format, {
				level,
				chunkSize,
				compressionMethod,
				uncompressedSize: inputSize
			}));
			else if (useGzipCrc32) {
				gzipCrc32Stream = new GzipToRawDeflateStream();
				readable = pipeThroughBackpressured(readable, new GzipCompressionStream(FORMAT_GZIP$1, {
					level,
					chunkSize
				}));
				readable = pipeThrough(readable, gzipCrc32Stream);
			} else try {
				readable = pipeThroughCompressionStream(readable, useCompressionStream, {
					level,
					chunkSize
				}, CompressionStream, CompressionStreamFallback);
			} catch (error) {
				let gzipStream;
				try {
					gzipStream = new CompressionStream(FORMAT_GZIP$1);
				} catch {
					throw error;
				}
				readable = pipeThroughBackpressured(readable, gzipStream);
				readable = pipeThrough(readable, new GzipToRawDeflateStream());
			}
		}
		if (encrypted) {
			if (zipCrypto) readable = pipeThrough(readable, new ZipCryptoEncryptionStream(options));
			else {
				encryptionStream = new AESEncryptionStream(options);
				readable = pipeThrough(readable, encryptionStream);
			}
		}
		setReadable(stream, readable, () => {
			if ((!encrypted || zipCrypto) && computeCrc32) stream.crc32 = useGzipCrc32 ? gzipCrc32Stream.crc32 : new DataView(crc32Stream.value.buffer).getUint32(0);
		});
	}
};
var GzipToRawDeflateStream = class extends TransformStream {
	constructor() {
		let stream;
		let headerBytesLeft = GZIP_HEADER_LENGTH;
		let trailerCandidate = /* @__PURE__ */ new Uint8Array(0);
		super({
			transform(chunk, controller) {
				if (headerBytesLeft) {
					const droppedLength = Math.min(headerBytesLeft, chunk.length);
					headerBytesLeft -= droppedLength;
					chunk = chunk.subarray(droppedLength);
					if (!chunk.length) return;
				}
				const availableLength = trailerCandidate.length + chunk.length;
				if (availableLength <= GZIP_TRAILER_LENGTH) {
					trailerCandidate = concat(trailerCandidate, chunk);
					return;
				}
				const emitLength = availableLength - GZIP_TRAILER_LENGTH;
				const emittedFromTrailer = Math.min(emitLength, trailerCandidate.length);
				controller.enqueue(concat(trailerCandidate.subarray(0, emittedFromTrailer), chunk.subarray(0, emitLength - emittedFromTrailer)));
				trailerCandidate = concat(trailerCandidate.subarray(emittedFromTrailer), chunk.subarray(emitLength - emittedFromTrailer));
			},
			flush() {
				const dataView = getDataView(trailerCandidate);
				stream.crc32 = dataView.getUint32(0, true);
				stream.uncompressedSize = dataView.getUint32(4, true);
			}
		});
		stream = this;
	}
};
function pipeThroughGzipDecompressionStream(readable, gzipStream, outputSize, crc32) {
	let outputLength = 0;
	let inputDone = false;
	let watchdogTimeout;
	let resolveTrailerReady, rejectTrailerReady;
	const trailerReady = new Promise((resolve, reject) => {
		resolveTrailerReady = resolve;
		rejectTrailerReady = reject;
	});
	trailerReady.catch(() => {});
	if (!outputSize) resolveTrailerReady();
	const gzipWrapStream = new TransformStream({
		start(controller) {
			const header = new Uint8Array(GZIP_HEADER_LENGTH);
			header.set(GZIP_HEADER_BYTES);
			controller.enqueue(header);
		},
		transform(chunk, controller) {
			controller.enqueue(chunk);
		},
		async flush(controller) {
			inputDone = true;
			startWatchdog();
			try {
				await trailerReady;
			} finally {
				stopWatchdog();
			}
			const trailer = new Uint8Array(GZIP_TRAILER_LENGTH);
			const dataView = getDataView(trailer);
			dataView.setUint32(0, crc32.get(), true);
			dataView.setUint32(4, outputSize, true);
			controller.enqueue(trailer);
		},
		cancel(reason) {
			rejectTrailerReady(reason);
		}
	});
	const outputStream = new TransformStream({
		transform(chunk, controller) {
			crc32.append(chunk);
			outputLength += chunk.length;
			if (outputLength >= outputSize) resolveTrailerReady();
			else if (inputDone) startWatchdog();
			controller.enqueue(chunk);
		},
		cancel(reason) {
			rejectTrailerReady(reason);
		}
	});
	readable = pipeThrough(readable, gzipWrapStream);
	readable = pipeThroughBackpressured(readable, gzipStream);
	return pipeThrough(readable, outputStream);
	function startWatchdog() {
		stopWatchdog();
		watchdogTimeout = setTimeout(() => rejectTrailerReady(/* @__PURE__ */ new Error(ERR_INVALID_UNCOMPRESSED_SIZE)), GZIP_OUTPUT_STALL_TIMEOUT);
	}
	function stopWatchdog() {
		clearTimeout(watchdogTimeout);
	}
}
var InflateStream = class extends TransformStream {
	constructor(options, { chunkSize, DecompressionStreamFallback, DecompressionStream }) {
		super({});
		const { zipCrypto, encrypted, checkCrc32, crc32, compressed, useCompressionStream, deflate64, format, compressionMethod, rawBitFlag, outputSize } = options;
		let crc32Stream, decryptionStream, gzipCrc32;
		let readable = super.readable;
		if (encrypted) {
			if (zipCrypto) readable = pipeThrough(readable, new ZipCryptoDecryptionStream(options));
			else {
				decryptionStream = new AESDecryptionStream(options);
				readable = pipeThrough(readable, decryptionStream);
			}
		}
		if (compressed) {
			const codecStreams = format && getCodecStreams(format);
			if (codecStreams) readable = pipeThroughBackpressured(readable, createCodecStream(codecStreams.DecompressionStream, format, {
				chunkSize,
				compressionMethod,
				rawBitFlag,
				uncompressedSize: outputSize
			}));
			else try {
				readable = pipeThroughCompressionStream(readable, useCompressionStream, {
					chunkSize,
					deflate64
				}, DecompressionStream, DecompressionStreamFallback);
			} catch (error) {
				if (deflate64 || outputSize === void 0) throw error;
				let gzipStream;
				try {
					gzipStream = new DecompressionStream(FORMAT_GZIP$1);
				} catch {
					throw error;
				}
				gzipCrc32 = new Crc32();
				readable = pipeThroughGzipDecompressionStream(readable, gzipStream, outputSize, gzipCrc32);
			}
			readable = mapInflateStreamError(readable);
		}
		if (checkCrc32 && !gzipCrc32) {
			crc32Stream = new Crc32Stream();
			readable = pipeThrough(readable, crc32Stream);
		}
		setReadable(this, readable, () => {
			if (checkCrc32) {
				const computedCrc32 = gzipCrc32 ? gzipCrc32.get() >>> 0 : new DataView(crc32Stream.value.buffer).getUint32(0, false);
				if (crc32 != computedCrc32) throw new Error(ERR_INVALID_CRC32);
			}
		});
	}
};
var formatSupportByStream = /* @__PURE__ */ new Map();
function supportsFormat(StreamClass, format) {
	if (!StreamClass) return false;
	let supportByFormat = formatSupportByStream.get(StreamClass);
	if (!supportByFormat) {
		supportByFormat = /* @__PURE__ */ new Map();
		formatSupportByStream.set(StreamClass, supportByFormat);
	}
	let supported = supportByFormat.get(format);
	if (supported === void 0) {
		try {
			new StreamClass(format);
			supported = true;
		} catch {
			supported = false;
		}
		supportByFormat.set(format, supported);
	}
	return supported;
}
function supportsDeflateRaw(StreamClass) {
	return supportsFormat(StreamClass, FORMAT_DEFLATE_RAW$1);
}
function supportsGzip(StreamClass) {
	return supportsFormat(StreamClass, FORMAT_GZIP$1);
}
function setReadable(stream, readable, flush) {
	readable = pipeThrough(readable, new TransformStream({ flush }));
	Object.defineProperty(stream, "readable", { get() {
		return readable;
	} });
}
function createCodecStream(CodecStreamClass, format, options) {
	if (!CodecStreamClass) throw new Error(ERR_UNSUPPORTED_COMPRESSION);
	return new CodecStreamClass(format, options);
}
function getGzipCompressionStream(useCompressionStream, CompressionStreamNative, CompressionStreamFallback) {
	if (useCompressionStream && CompressionStreamNative) return CompressionStreamNative;
	else if (CompressionStreamFallback && CompressionStreamFallback.requiresModule) return CompressionStreamFallback;
}
function pipeThroughCompressionStream(readable, useCompressionStream, options, CompressionStreamNative, CompressionStreamFallback) {
	const Stream = useCompressionStream && CompressionStreamNative ? CompressionStreamNative : CompressionStreamFallback || CompressionStreamNative;
	const format = options.deflate64 ? FORMAT_DEFLATE64_RAW$1 : FORMAT_DEFLATE_RAW$1;
	let codecStream;
	try {
		codecStream = new Stream(format, options);
	} catch (error) {
		if (useCompressionStream && CompressionStreamFallback && Stream != CompressionStreamFallback) codecStream = new CompressionStreamFallback(format, options);
		else throw error;
	}
	return pipeThroughBackpressured(readable, codecStream);
}
function pipeThrough(readable, transformStream) {
	return toCompatibleReadable(readable).pipeThrough(transformStream);
}
function pipeThroughBackpressured(readable, transformStream) {
	const writer = transformStream.writable.getWriter();
	const reader = readable.getReader();
	pump();
	return transformStream.readable;
	async function pump() {
		try {
			for (;;) {
				await writer.ready;
				const result = await reader.read();
				if (result.done) {
					await writer.close();
					break;
				}
				await writer.write(result.value);
			}
		} catch (error) {
			await abort(writer, error);
			await cancel(reader, error);
		}
	}
}
async function abort(writer, error) {
	try {
		await writer.abort(error);
	} catch {}
}
async function cancel(reader, error) {
	try {
		await reader.cancel(error);
	} catch {}
}
function mapInflateStreamError(readable) {
	const reader = readable.getReader();
	return new ReadableStream({
		async pull(controller) {
			let result;
			try {
				result = await reader.read();
			} catch (error) {
				if (error && error.message) throw error;
				const mappedError = /* @__PURE__ */ new Error(ERR_INVALID_COMPRESSED_DATA);
				mappedError.cause = error;
				throw mappedError;
			}
			const { value, done } = result;
			if (done) controller.close();
			else controller.enqueue(value);
		},
		cancel(reason) {
			return reader.cancel(reason);
		}
	});
}
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/streams/codec-stream.js
var DEFAULT_CHUNK_SIZE = 65536;
var MESSAGE_EVENT_TYPE = "message";
var MESSAGE_START = "start";
var MESSAGE_DATA = "data";
var CODEC_DEFLATE = "deflate";
var CODEC_INFLATE = "inflate";
var CodecStream = class extends TransformStream {
	constructor(options, config) {
		super({});
		const codec = this;
		const { codecType } = options;
		let Stream;
		if (codecType.startsWith("deflate")) Stream = DeflateStream;
		else if (codecType.startsWith("inflate")) Stream = InflateStream;
		codec.outputSize = 0;
		let inputSize = 0;
		const stream = new Stream(options, config);
		const readable = super.readable;
		const inputSizeStream = new TransformStream({
			transform(chunk, controller) {
				if (chunk && chunk.length) {
					inputSize += chunk.length;
					controller.enqueue(chunk);
				}
			},
			flush() {
				Object.assign(codec, { inputSize });
			}
		});
		const outputSizeStream = new TransformStream({
			transform(chunk, controller) {
				if (chunk && chunk.length) {
					controller.enqueue(chunk);
					codec.outputSize += chunk.length;
					if (options.outputSize !== void 0 && codec.outputSize > options.outputSize) throw new Error(ERR_INVALID_UNCOMPRESSED_SIZE);
				}
			},
			flush() {
				const { crc32 } = stream;
				Object.assign(codec, {
					crc32,
					inputSize
				});
			}
		});
		Object.defineProperty(codec, "readable", { get() {
			return readable.pipeThrough(inputSizeStream).pipeThrough(stream).pipeThrough(outputSizeStream);
		} });
	}
};
var ChunkStream = class extends TransformStream {
	constructor(chunkSize) {
		const pendingChunks = [];
		let pendingLength = 0;
		let outputSize = 0;
		if (!Number.isFinite(chunkSize) || chunkSize < 1) chunkSize = DEFAULT_CHUNK_SIZE;
		super({
			transform(chunk, controller) {
				pendingChunks.push(chunk);
				pendingLength += chunk.length;
				while (pendingLength > chunkSize) {
					outputSize += chunkSize;
					controller.enqueue(shiftChunk());
				}
			},
			flush(controller) {
				if (pendingLength) {
					outputSize += pendingLength;
					controller.enqueue(concatChunks(pendingChunks, pendingLength));
				}
			}
		});
		Object.defineProperty(this, "outputSize", { get: () => outputSize });
		function shiftChunk() {
			const result = new Uint8Array(chunkSize);
			let resultOffset = 0;
			while (resultOffset < chunkSize) {
				const firstChunk = pendingChunks[0];
				const remainingLength = chunkSize - resultOffset;
				if (firstChunk.length <= remainingLength) {
					result.set(firstChunk, resultOffset);
					resultOffset += firstChunk.length;
					pendingChunks.shift();
				} else {
					result.set(firstChunk.subarray(0, remainingLength), resultOffset);
					pendingChunks[0] = firstChunk.subarray(remainingLength);
					resultOffset += remainingLength;
				}
			}
			pendingLength -= chunkSize;
			return result;
		}
		function concatChunks(chunks, length) {
			const result = new Uint8Array(length);
			let offset = 0;
			for (const chunk of chunks) {
				result.set(chunk, offset);
				offset += chunk.length;
			}
			return result;
		}
	}
};
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/codec-worker.js
var ERR_WORKER_STARTUP_TIMEOUT = "Worker startup timeout";
var webWorkerSupported;
var createWorkerFailed;
var webWorkerBackend;
var initModule$1 = () => {};
function configureWorker({ initModule: initModuleFunction }) {
	initModule$1 = initModuleFunction;
}
function setWebWorkerBackend(backend) {
	webWorkerBackend = backend;
}
async function supportsDeflate(config) {
	const { CompressionStream: NativeStream, CompressionStreamFallback: FallbackStream } = config;
	if (FallbackStream && !FallbackStream.requiresModule) return true;
	if (supportsDeflateRaw(NativeStream) || supportsGzip(NativeStream)) return true;
	if (FallbackStream) return await loadModule(config);
	return false;
}
async function loadModule(config) {
	if (initModule$1) try {
		await initModule$1(config);
		return true;
	} catch {}
	return false;
}
function disableWebWorker(workerData) {
	if (workerData.createWorker) createWorkerFailed = true;
	else webWorkerSupported = false;
}
var CodecWorker = class {
	constructor(workerData, { readable, writable }, workerOptions, onTaskFinished) {
		const { options, config, streamOptions, useWebWorkers, transferStreams, workerURI } = workerOptions;
		let { createWorker } = workerOptions;
		const { signal } = streamOptions;
		if (createWorkerFailed) createWorker = void 0;
		Object.assign(workerData, {
			busy: true,
			generation: (workerData.generation || 0) + 1,
			readable: readable.pipeThrough(new ChunkStream(getChunkSize(config))).pipeThrough(new ProgressWatcherStream(streamOptions), { signal }),
			writable,
			options: Object.assign({}, options),
			workerOptions,
			workerURI,
			createWorker,
			transferStreams,
			terminate() {
				return new Promise((resolve) => {
					const { worker, busy } = workerData;
					if (busy) {
						workerData.terminateResolvers = workerData.terminateResolvers || [];
						workerData.terminateResolvers.push(resolve);
					} else {
						if (worker) {
							worker.terminate();
							workerData.worker = null;
						}
						resolve();
					}
					workerData.interface = null;
				});
			},
			onTaskFinished() {
				if (workerData.busy) {
					const { terminateResolvers, worker } = workerData;
					if (terminateResolvers) {
						workerData.terminateResolvers = null;
						if (worker) {
							workerData.terminated = true;
							worker.terminate();
						}
					}
					workerData.busy = false;
					const pendingTasks = onTaskFinished(workerData);
					if (terminateResolvers) terminateResolvers.forEach((resolve) => resolve(pendingTasks));
				}
			}
		});
		if (webWorkerSupported === void 0) webWorkerSupported = typeof Worker != UNDEFINED_TYPE;
		return (useWebWorkers && webWorkerBackend && (webWorkerSupported && workerURI || createWorker) ? webWorkerBackend : createWorkerInterface)(workerData, config);
	}
};
var ProgressWatcherStream = class extends TransformStream {
	constructor({ onstart, onprogress, size, onend }) {
		let chunkOffset = 0;
		super({
			async start() {
				if (onstart) await callHandler(onstart, size);
			},
			async transform(chunk, controller) {
				chunkOffset += chunk.length;
				if (onprogress) await callHandler(onprogress, chunkOffset, size);
				controller.enqueue(chunk);
			},
			async flush() {
				if (onend) await callHandler(onend, chunkOffset);
			}
		});
	}
};
async function callHandler(handler, ...parameters) {
	try {
		await handler(...parameters);
	} catch {}
}
function createWorkerInterface(workerData, config) {
	return { run: () => runWorker$1(workerData, config) };
}
async function runWorker$1({ options, readable, writable, onTaskFinished, workerOptions }, config) {
	let codecStream, chunkStream, modulePromise;
	try {
		if (options.compressed && !options.format) {
			const deflate = options.codecType.startsWith(CODEC_DEFLATE);
			const FallbackStream = deflate ? config.CompressionStreamFallback : config.DecompressionStreamFallback;
			const NativeStream = deflate ? config.CompressionStream : config.DecompressionStream;
			if (!options.useCompressionStream) {
				if (!await moduleLoaded() && (!FallbackStream || FallbackStream.requiresModule)) options.useCompressionStream = true;
			} else if (FallbackStream && FallbackStream.requiresModule && !supportsDeflateRaw(NativeStream)) await moduleLoaded();
		}
		if (options.encrypted && !options.zipCrypto) await moduleLoaded();
		codecStream = new CodecStream(options, config);
		chunkStream = new ChunkStream(getChunkSize(config));
		await readable.pipeThrough(codecStream).pipeThrough(chunkStream).pipeTo(writable, {
			preventClose: true,
			preventAbort: true
		});
		const { crc32, inputSize, outputSize } = codecStream;
		return {
			crc32,
			inputSize,
			outputSize
		};
	} catch (error) {
		if (codecStream) {
			const outputSize = chunkStream ? chunkStream.outputSize : 0;
			workerOptions.outputSize = outputSize;
			if (isErrorObject(error)) try {
				error.outputSize = outputSize;
			} catch {}
		}
		throw error;
	} finally {
		onTaskFinished();
	}
	function moduleLoaded() {
		if (!modulePromise) modulePromise = loadModule(config);
		return modulePromise;
	}
}
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/codec-worker-web.js
var MODULE_WORKER_OPTIONS = { type: "module" };
var ERROR_EVENT_TYPE = "error";
var MESSAGE_ERROR_EVENT_TYPE = "messageerror";
var webWorkerSource;
var webWorkerURI;
var webWorkerOptions;
var transferStreamsSupported = true;
try {
	transferStreamsSupported = typeof structuredClone == "function" && structuredClone(new DOMException("", "AbortError")).code !== void 0;
} catch {}
setWebWorkerBackend(createWebWorkerInterface);
function createWebWorkerInterface(workerData, config) {
	const { baseURI, chunkSize, workerStartupTimeout } = config;
	let { wasmURI } = config;
	if (!workerData.interface) {
		if (typeof wasmURI == "function") wasmURI = wasmURI();
		let worker;
		try {
			worker = getWebWorker(workerData.workerURI, baseURI, workerData);
		} catch {
			disableWebWorker(workerData);
			return createWorkerInterface(workerData, config);
		}
		Object.assign(workerData, {
			worker,
			workerAlive: false,
			terminated: false,
			startupError: null,
			interface: { run: async () => {
				try {
					return await runWebWorker(workerData, {
						chunkSize,
						wasmURI,
						baseURI,
						workerStartupTimeout
					});
				} catch (error) {
					if (error && error.workerStartupFailed) {
						disableWebWorker(workerData);
						releaseWorkerStreams(workerData);
						return runWorker$1(workerData, config);
					}
					if (error && error.codecImportFailed) {
						if (workerData.reader) {
							releaseWorkerStreams(workerData);
							return runWorker$1(workerData, config);
						}
						workerData.onTaskFinished();
					}
					throw error;
				}
			} }
		});
	}
	return workerData.interface;
}
async function runWebWorker(workerData, config) {
	if (!workerData.worker) {
		const { startupError } = workerData;
		workerData.startupError = null;
		const error = startupError || /* @__PURE__ */ new Error("Worker startup timeout");
		error.workerStartupFailed = true;
		throw error;
	}
	let resolveResult, rejectResult;
	const result = new Promise((resolve, reject) => {
		resolveResult = resolve;
		rejectResult = (error) => {
			const { outputSize, workerOptions } = workerData;
			workerOptions.outputSize = outputSize;
			if (isErrorObject(error)) try {
				error.outputSize = outputSize;
			} catch {}
			reject(error);
		};
	});
	Object.assign(workerData, {
		reader: null,
		writer: null,
		outputSize: 0,
		destinationFailed: false,
		destinationError: null,
		resolveResult,
		rejectResult,
		result
	});
	const { readable, options } = workerData;
	const { writable, closed, abortPipe } = watchClosedStream(workerData.writable, workerData);
	let streamsTransferred;
	try {
		streamsTransferred = sendMessage({
			type: MESSAGE_START,
			options,
			config,
			readable,
			writable
		}, workerData);
	} catch (error) {
		abortPipe();
		try {
			await closed;
		} catch {}
		workerData.onTaskFinished();
		throw error;
	}
	if (!streamsTransferred) Object.assign(workerData, {
		reader: readable.getReader(),
		writer: writable.getWriter()
	});
	const { workerStartupTimeout } = config;
	if (!workerData.workerAlive && Number.isFinite(workerStartupTimeout) && workerStartupTimeout >= 0) workerData.startupTimeout = setTimeout(() => onStartupTimeout(workerData), workerStartupTimeout);
	try {
		const resultValue = await result;
		await closeWritable();
		await closed;
		return resultValue;
	} catch (error) {
		await closeWritable();
		abortPipe();
		try {
			await closed;
		} catch {}
		const { outputSize, workerOptions, destinationFailed, destinationError } = workerData;
		workerOptions.outputSize = outputSize;
		const workerFailed = isErrorObject(error) && (error.codecImportFailed || error.workerStartupFailed);
		const reportedError = destinationFailed && !workerFailed ? destinationError : error;
		if (isErrorObject(reportedError)) try {
			reportedError.outputSize = outputSize;
		} catch {}
		throw reportedError;
	}
	async function closeWritable() {
		if (!streamsTransferred && !writable.locked) try {
			await writable.getWriter().close();
		} catch {}
	}
}
function watchClosedStream(writableSource, workerData) {
	const abortController = new AbortController();
	let aborting;
	const { writable, readable } = new TransformStream({ transform(chunk, controller) {
		workerData.outputSize += chunk.length;
		controller.enqueue(chunk);
	} });
	const closed = readable.pipeTo(writableSource, {
		preventClose: true,
		preventAbort: true,
		signal: abortController.signal
	});
	closed.catch((error) => {
		if (!aborting) Object.assign(workerData, {
			destinationFailed: true,
			destinationError: error
		});
	});
	return {
		writable,
		closed,
		abortPipe: () => {
			aborting = true;
			abortController.abort();
		}
	};
}
function releaseWorkerStreams(workerData) {
	const { reader } = workerData;
	if (reader) reader.releaseLock();
	workerData.reader = null;
	workerData.writer = null;
}
function terminateWorker$1(workerData) {
	const { worker } = workerData;
	if (worker) try {
		worker.terminate();
	} catch {}
	workerData.interface = null;
}
function getWebWorker(url, baseURI, workerData, isModuleType, useBlobURI = true) {
	const { createWorker } = workerData;
	let worker, resolvedURI, resolvedOptions;
	if (createWorker) worker = createWorker();
	else if (webWorkerURI === void 0 || webWorkerSource !== url) {
		const isFunctionURI = typeof url == FUNCTION_TYPE;
		if (isFunctionURI) resolvedURI = url(useBlobURI);
		else resolvedURI = url;
		const isDataURI = resolvedURI.startsWith("data:");
		const isBlobURI = resolvedURI.startsWith("blob:");
		if (isDataURI || isBlobURI) {
			if (isModuleType === void 0) isModuleType = false;
			if (isModuleType) resolvedOptions = MODULE_WORKER_OPTIONS;
			try {
				worker = new Worker(resolvedURI, resolvedOptions);
			} catch (error) {
				if (isBlobURI) try {
					URL.revokeObjectURL(resolvedURI);
				} catch {}
				if (isFunctionURI && isBlobURI) return getWebWorker(url, baseURI, workerData, isModuleType, false);
				else if (!isModuleType) return getWebWorker(url, baseURI, workerData, true, false);
				else throw error;
			}
		} else {
			if (isModuleType === void 0) isModuleType = true;
			if (isModuleType) resolvedOptions = MODULE_WORKER_OPTIONS;
			try {
				resolvedURI = new URL(resolvedURI, baseURI);
			} catch {}
			try {
				worker = new Worker(resolvedURI, resolvedOptions);
			} catch (error) {
				if (isModuleType) return getWebWorker(url, baseURI, workerData, false, useBlobURI);
				else throw error;
			}
		}
		webWorkerSource = url;
		webWorkerURI = resolvedURI;
		webWorkerOptions = resolvedOptions;
	} else worker = new Worker(webWorkerURI, webWorkerOptions);
	worker.addEventListener(MESSAGE_EVENT_TYPE, (event) => {
		workerData.workerAlive = true;
		clearStartupTimeout(workerData);
		onMessage(event, workerData);
	});
	worker.addEventListener(ERROR_EVENT_TYPE, (event) => onWorkerError(event, workerData));
	worker.addEventListener(MESSAGE_ERROR_EVENT_TYPE, (event) => onWorkerError(event, workerData));
	return worker;
}
function onStartupTimeout(workerData) {
	workerData.startupTimeout = null;
	if (workerData.workerAlive) return;
	const { rejectResult, writer } = workerData;
	terminateWorker$1(workerData);
	workerData.worker = null;
	if (rejectResult) {
		const error = new Error(ERR_WORKER_STARTUP_TIMEOUT);
		error.workerStartupFailed = true;
		rejectResult(error);
		if (writer) writer.releaseLock();
	}
}
function clearStartupTimeout(workerData) {
	const { startupTimeout } = workerData;
	if (startupTimeout) {
		clearTimeout(startupTimeout);
		workerData.startupTimeout = null;
	}
}
function onWorkerError(event, workerData) {
	if (event.preventDefault) event.preventDefault();
	clearStartupTimeout(workerData);
	const { workerAlive, rejectResult, writer, onTaskFinished } = workerData;
	terminateWorker$1(workerData);
	if (!workerAlive) workerData.worker = null;
	let error = event.error || new Error(event.message || ERROR_EVENT_TYPE);
	if (!workerAlive) {
		error = Object.assign(new Error(error.message || ERROR_EVENT_TYPE), { workerStartupFailed: true });
		workerData.startupError = error;
	}
	if (rejectResult) {
		rejectResult(error);
		if (writer) writer.releaseLock();
		if (workerAlive) onTaskFinished();
	}
}
function sendMessage(message, { worker, writer, transferStreams, workerAlive }) {
	try {
		const { value, readable, writable } = message;
		const transferables = [];
		if (value) {
			message.value = toExactUint8Array(value);
			transferables.push(message.value.buffer);
		}
		if (transferStreams && transferStreamsSupported && workerAlive) {
			if (readable) transferables.push(readable);
			if (writable) transferables.push(writable);
		} else message.readable = message.writable = null;
		if (transferables.length) try {
			worker.postMessage(message, transferables);
			return true;
		} catch {
			transferStreamsSupported = false;
			message.readable = message.writable = null;
			worker.postMessage(message);
		}
		else worker.postMessage(message);
	} catch (error) {
		if (writer) writer.releaseLock();
		throw error;
	}
}
async function onMessage({ data }, workerData) {
	const { type, value, messageId, result, error, errorValue } = data;
	const { reader, writer, resolveResult, rejectResult, onTaskFinished, generation } = workerData;
	const stale = () => workerData.generation != generation;
	try {
		if (error) fail(getResponseError(error, errorValue));
		else {
			if (type == "pull") {
				const { value, done } = await reader.read();
				if (!stale()) sendMessage({
					type: MESSAGE_DATA,
					value,
					done,
					messageId
				}, workerData);
			}
			if (type == "data") {
				const chunk = new Uint8Array(value);
				await writer.ready;
				await writer.write(chunk);
				if (!stale()) sendMessage({
					type: "ack",
					messageId
				}, workerData);
			}
			if (type == "close") succeed(result);
		}
	} catch (error) {
		if (!stale()) {
			terminateWorker$1(workerData);
			fail(error);
		}
	}
	function fail(error) {
		if (!stale()) {
			rejectResult(error);
			releaseWriter();
			if (!(isErrorObject(error) && error.codecImportFailed)) onTaskFinished();
		}
	}
	function succeed(result) {
		if (!stale()) {
			resolveResult(result);
			releaseWriter();
			onTaskFinished();
		}
	}
	function releaseWriter() {
		if (writer) writer.releaseLock();
	}
}
function getResponseError(errorData, errorValue) {
	const { message, stack, code, name, outputSize, cause, codecImportFailed } = errorData;
	let responseError;
	if (errorValue) responseError = errorValue.value;
	else {
		responseError = Object.assign(new Error(message), {
			stack,
			code,
			name
		});
		if (cause) responseError.cause = Object.assign(new Error(cause.message), { name: cause.name });
	}
	if (isErrorObject(responseError)) try {
		if (outputSize !== void 0) responseError.outputSize = outputSize;
		if (codecImportFailed) responseError.codecImportFailed = true;
		if (errorValue) {
			if (responseError.name !== name) responseError.name = name;
			if (responseError.code !== code) responseError.code = code;
		}
	} catch {}
	return responseError;
}
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/codec-pool.js
var pool = [];
var pendingRequests = [];
var starvationTimeout;
var starvationDelay;
var indexWorker = 0;
async function runWorker(stream, workerOptions) {
	const { options, config } = workerOptions;
	const { transferStreams, useWebWorkers, useCompressionStream, compressed, checkCrc32, computeCrc32, encrypted, format, codecURI } = options;
	const { workerURI, createWorker, maxWorkers } = config;
	if (format) {
		if (codecURI) options.codecURI = resolveCodecURI(codecURI, config.baseURI);
		await ensureCodecStreams(format, options.codecURI);
	}
	workerOptions.transferStreams = !format && (transferStreams || transferStreams === void 0 && config.transferStreams);
	const streamCopy = !compressed && !checkCrc32 && !computeCrc32 && !encrypted;
	const workerSupported = format === void 0 || Boolean(options.codecURI);
	workerOptions.useWebWorkers = !streamCopy && workerSupported && (useWebWorkers || useWebWorkers === void 0 && config.useWebWorkers);
	workerOptions.workerURI = workerOptions.useWebWorkers && workerURI ? workerURI : void 0;
	workerOptions.createWorker = workerOptions.useWebWorkers && createWorker ? createWorker : void 0;
	options.useCompressionStream = useCompressionStream || useCompressionStream === void 0 && config.useCompressionStream;
	return (await getWorker()).run();
	async function getWorker() {
		const workerData = pool.find((workerData) => !workerData.busy);
		if (workerData) {
			clearTerminateTimeout(workerData);
			return new CodecWorker(workerData, stream, workerOptions, onTaskFinished);
		} else if (pool.length < maxWorkers) {
			const workerData = { indexWorker };
			indexWorker++;
			pool.push(workerData);
			return new CodecWorker(workerData, stream, workerOptions, onTaskFinished);
		} else return new Promise((resolve) => {
			pendingRequests.push({
				resolve,
				stream,
				workerOptions
			});
			starvationDelay = config.workerStarvationTimeout;
			armStarvationTimeout();
		});
	}
	function onTaskFinished(workerData) {
		clearStarvationTimeout();
		if (workerData.terminated) {
			workerData.terminated = false;
			return runPendingRequestsInline();
		} else if (pendingRequests.length) {
			const [{ resolve, stream, workerOptions }] = pendingRequests.splice(0, 1);
			resolve(new CodecWorker(workerData, stream, workerOptions, onTaskFinished));
			armStarvationTimeout();
		} else if (workerData.worker) {
			clearTerminateTimeout(workerData);
			terminateWorker(workerData, workerOptions);
		} else pool = pool.filter((data) => data != workerData);
	}
}
function resolveCodecURI(codecURI, baseURI) {
	try {
		return new URL(codecURI, baseURI).toString();
	} catch {
		return codecURI;
	}
}
function armStarvationTimeout() {
	if (!starvationTimeout && pendingRequests.length && Number.isFinite(starvationDelay) && starvationDelay >= 0) starvationTimeout = setTimeout(onWorkerStarvation, starvationDelay);
}
function clearStarvationTimeout() {
	if (starvationTimeout) {
		clearTimeout(starvationTimeout);
		starvationTimeout = null;
	}
}
function onWorkerStarvation() {
	starvationTimeout = null;
	if (pendingRequests.length) {
		const [{ resolve, stream, workerOptions }] = pendingRequests.splice(0, 1);
		resolve(new CodecWorker({}, stream, getInlineWorkerOptions(workerOptions), onInlineTaskFinished));
		armStarvationTimeout();
	}
}
function runPendingRequestsInline() {
	const tasks = pendingRequests.splice(0).map(({ resolve, stream, workerOptions }) => new Promise((resolveTask) => {
		resolve(new CodecWorker({}, stream, getInlineWorkerOptions(workerOptions), () => {
			onInlineTaskFinished();
			resolveTask();
		}));
	}));
	clearStarvationTimeout();
	return Promise.all(tasks);
}
function getInlineWorkerOptions(workerOptions) {
	return Object.assign({}, workerOptions, {
		useWebWorkers: false,
		workerURI: void 0,
		createWorker: void 0
	});
}
function onInlineTaskFinished() {
	clearStarvationTimeout();
	armStarvationTimeout();
}
function terminateWorker(workerData, workerOptions) {
	const { config } = workerOptions;
	const { terminateWorkerTimeout } = config;
	if (Number.isFinite(terminateWorkerTimeout) && terminateWorkerTimeout >= 0) workerData.terminateTimeout = setTimeout(async () => {
		pool = pool.filter((data) => data != workerData);
		try {
			await workerData.terminate();
		} catch {}
	}, terminateWorkerTimeout);
}
function clearTerminateTimeout(workerData) {
	const { terminateTimeout } = workerData;
	if (terminateTimeout) {
		clearTimeout(terminateTimeout);
		workerData.terminateTimeout = null;
	}
}
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/util/decode-cp437.js
var CP437 = "\0☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■\xA0".split("");
function decodeCP437(stringValue) {
	let result = "";
	for (let indexCharacter = 0; indexCharacter < stringValue.length; indexCharacter++) result += CP437[stringValue[indexCharacter]];
	return result;
}
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/util/decode-text.js
function decodeText(value, encoding) {
	return decode(value, encoding, true);
}
function isUTF8Text(value) {
	if (value.some((byte) => byte > 127)) try {
		new TextDecoder("utf-8", { fatal: true }).decode(value);
		return true;
	} catch {
		return false;
	}
	else return false;
}
function decode(value, encoding, ignoreBOM) {
	if (encoding && encoding.trim().toLowerCase() == "cp437") return decodeCP437(value);
	else return new TextDecoder(encoding, { ignoreBOM }).decode(value);
}
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/io.js
var ERR_ITERATOR_COMPLETED_TOO_SOON = "Writer iterator completed too soon";
var ERR_WRITER_SIZE_NOT_WRITABLE = "Invalid writer (size must be writable)";
var CONTENT_TYPE_TEXT_PLAIN = "text/plain";
22 + MAX_16_BITS;
var PROPERTY_NAME_WRITABLE = "writable";
var DISK_BOUNDARY = Symbol();
var Stream = class {
	constructor() {
		this.size = 0;
	}
	init() {
		this.initialized = true;
	}
};
var Reader = class extends Stream {
	get readable() {
		return this.createReadable();
	}
	createReadable({ offset = 0, size, chunkSize = getChunkSize(getConfiguration()) } = {}) {
		const reader = this;
		let chunkOffset = 0;
		chunkSize = normalizeChunkSize(chunkSize);
		return new ReadableStream({ async pull(controller) {
			const dataSize = size === void 0 ? chunkSize : Math.min(chunkSize, size - chunkOffset);
			const data = await readUint8Array(reader, offset + chunkOffset, dataSize);
			if (data.length) {
				controller.enqueue(data);
				chunkOffset += data.length;
			}
			if (size !== void 0 && chunkOffset >= size || !data.length && dataSize) controller.close();
		} });
	}
};
var blobSliceReliable;
var blobSliceProbe;
function probeBlobSliceReliability() {
	blobSliceProbe = (async () => {
		try {
			const streamReader = new Blob([/* @__PURE__ */ new Uint8Array(3)]).slice(1, 2).stream().getReader();
			let streamedLength = 0;
			let result = await streamReader.read();
			while (!result.done) {
				streamedLength += result.value.length;
				result = await streamReader.read();
			}
			blobSliceReliable = streamedLength == 1;
		} catch {
			blobSliceReliable = false;
		}
	})();
}
var BlobReader = class extends Reader {
	constructor(blob) {
		super();
		Object.assign(this, {
			sourceBlob: blob,
			size: blob.size
		});
		if (!blobSliceProbe) probeBlobSliceReliability();
	}
	createReadable(options) {
		const { sourceBlob, size } = this;
		const { offset = 0, size: readSize = size - offset } = options || {};
		if (typeof sourceBlob.stream == "function") {
			if (!offset && readSize >= size) return toCompatibleReadable(sourceBlob.stream());
			if (blobSliceReliable) return toCompatibleReadable(sourceBlob.slice(offset, offset + readSize).stream());
		}
		return super.createReadable(options);
	}
	async readUint8Array(offset, length) {
		const reader = this;
		const offsetEnd = offset + length;
		let arrayBuffer = await (!offset && offsetEnd >= reader.size ? reader.sourceBlob : reader.sourceBlob.slice(offset, offsetEnd)).arrayBuffer();
		if (arrayBuffer.byteLength > length) arrayBuffer = arrayBuffer.slice(offset, offsetEnd);
		return new Uint8Array(arrayBuffer);
	}
};
var BlobWriter = class extends Stream {
	constructor(contentType) {
		super();
		const writer = this;
		const transformStream = new TransformStream();
		Object.defineProperty(writer, PROPERTY_NAME_WRITABLE, { get() {
			return transformStream.writable;
		} });
		writer.contentType = contentType;
		writer.blobPromise = streamToBlob(transformStream.readable, contentType);
		writer.blobPromise.catch(() => {});
	}
	getData() {
		return this.blobPromise;
	}
};
var TextReader = class extends BlobReader {
	constructor(text) {
		super(new Blob([text], { type: CONTENT_TYPE_TEXT_PLAIN }));
	}
};
var SplitDataReader = class extends Reader {
	constructor(readers) {
		super();
		this.readers = readers;
	}
	async init() {
		const reader = this;
		reader.lastDiskNumber = 0;
		reader.diskOffsets = (reader.readers = await Promise.all(reader.readers.map(initDiskReader))).map((diskReader) => {
			const diskOffset = reader.size;
			reader.size += diskReader.size;
			return diskOffset;
		});
		super.init();
	}
	getDiskOffset(diskNumber) {
		const { diskOffsets, size } = this;
		const diskOffset = diskOffsets[diskNumber];
		return diskOffset === void 0 ? size : diskOffset;
	}
	async readUint8Array(offset, length) {
		const reader = this;
		const { readers } = this;
		let result;
		let currentDiskNumber = 0;
		let currentReaderOffset = offset;
		while (readers[currentDiskNumber] && currentReaderOffset >= readers[currentDiskNumber].size) {
			currentReaderOffset -= readers[currentDiskNumber].size;
			currentDiskNumber++;
		}
		const currentReader = readers[currentDiskNumber];
		if (currentReader) {
			const currentReaderSize = currentReader.size;
			if (currentReaderOffset + length <= currentReaderSize) result = await readUint8Array(currentReader, currentReaderOffset, length);
			else {
				const chunkLength = currentReaderSize - currentReaderOffset;
				result = concat(await readUint8Array(currentReader, currentReaderOffset, chunkLength), await reader.readUint8Array(offset + chunkLength, length - chunkLength));
			}
		} else result = EMPTY_UINT8_ARRAY;
		reader.lastDiskNumber = Math.max(currentDiskNumber, reader.lastDiskNumber);
		return result;
	}
};
var SplitDataWriter = class extends Stream {
	constructor(writerGenerator, maxSize = 4294967295) {
		super();
		const writer = this;
		Object.assign(writer, {
			diskNumber: 0,
			diskOffset: 0,
			size: 0,
			maxSize,
			availableSize: maxSize
		});
		let diskSourceWriter, diskWritable, diskWriter;
		const writable = new WritableStream({
			async write(chunk) {
				if (chunk === DISK_BOUNDARY) {
					if (diskWriter) await endDisk();
					return;
				}
				const { availableSize } = writer;
				if (!diskWriter) {
					const { value, done } = await writerGenerator.next();
					if (done && !value) throw new Error(ERR_ITERATOR_COMPLETED_TOO_SOON);
					else {
						diskSourceWriter = value;
						diskSourceWriter.size = 0;
						if (diskSourceWriter.maxSize) writer.maxSize = diskSourceWriter.maxSize;
						writer.availableSize = writer.maxSize;
						await initStream(diskSourceWriter);
						diskWritable = value.writable;
						diskWriter = diskWritable.getWriter();
					}
					await this.write(chunk);
				} else if (chunk.length >= availableSize) {
					await writeChunk(chunk.subarray(0, availableSize));
					await endDisk();
					if (chunk.length > availableSize) await this.write(chunk.subarray(availableSize));
				} else await writeChunk(chunk);
			},
			async close() {
				if (diskWriter) {
					await diskWriter.ready;
					await closeDiskWriter();
				}
			},
			async abort(reason) {
				if (diskWriter) await diskWriter.abort(reason);
			}
		});
		Object.defineProperty(writer, PROPERTY_NAME_WRITABLE, { get() {
			return writable;
		} });
		async function writeChunk(chunk) {
			const chunkLength = chunk.length;
			if (chunkLength) {
				await diskWriter.ready;
				await diskWriter.write(chunk);
				diskSourceWriter.size += chunkLength;
				writer.availableSize -= chunkLength;
			}
		}
		async function endDisk() {
			await closeDiskWriter();
			writer.diskOffset += diskSourceWriter.size;
			writer.diskNumber++;
			diskWriter = null;
			writer.availableSize = writer.maxSize;
		}
		async function closeDiskWriter() {
			await diskWriter.close();
		}
	}
	async closeDisk() {
		const streamWriter = this.writable.getWriter();
		try {
			await streamWriter.ready;
			await streamWriter.write(DISK_BOUNDARY);
		} finally {
			streamWriter.releaseLock();
		}
	}
};
var GenericReader = class {
	constructor(reader) {
		if (Array.isArray(reader)) reader = new SplitDataReader(reader);
		if (reader instanceof ReadableStream || typeof reader.getReader == "function") reader = { readable: toCompatibleReadable(reader) };
		return reader;
	}
};
var GenericWriter = class {
	constructor(writer) {
		if (writer.writable === void 0 && typeof writer.next == "function") writer = new SplitDataWriter(writer);
		if (writer instanceof WritableStream || typeof writer.getWriter == "function") writer = { writable: toCompatibleWritable(writer) };
		try {
			writer.size = writer.size === void 0 ? 0 : writer.size;
		} catch {
			throw new Error(ERR_WRITER_SIZE_NOT_WRITABLE);
		}
		return writer;
	}
};
function ownsWritable(writer) {
	return Boolean(writer && writer.getData);
}
async function initStream(stream, initSize) {
	if (stream.init && !stream.initialized) await stream.init(initSize);
	else return Promise.resolve();
}
async function initDiskReader(diskReader) {
	diskReader = new GenericReader(diskReader);
	await initStream(diskReader);
	if (diskReader.size === void 0 || !diskReader.readUint8Array) {
		diskReader = new BlobReader(await streamToBlob(diskReader.readable));
		await initStream(diskReader);
	}
	return diskReader;
}
function readUint8Array(reader, offset, size) {
	return reader.readUint8Array(offset, size);
}
function createReadable(reader, options) {
	if (reader.createReadable) return reader.createReadable(options);
	else if (reader.readUint8Array) return Reader.prototype.createReadable.call(reader, options);
	else return reader.readable;
}
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/util/warnings.js
function addWarning(warnings, reason, filename) {
	if (!warnings.some((warning) => warning.reason == reason)) {
		const warning = { reason };
		if (filename !== void 0) warning.filename = filename;
		warnings.push(warning);
	}
}
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/zip-entry.js
var PROPERTY_NAME_FILENAME = "filename";
var PROPERTY_NAME_RAW_FILENAME = "rawFilename";
var PROPERTY_NAME_COMMENT = "comment";
var PROPERTY_NAME_RAW_COMMENT = "rawComment";
var PROPERTY_NAME_UNCOMPRESSED_SIZE = "uncompressedSize";
var PROPERTY_NAME_COMPRESSED_SIZE = "compressedSize";
var PROPERTY_NAME_OFFSET = "offset";
var PROPERTY_NAME_DISK_NUMBER_START = "diskNumberStart";
var PROPERTY_NAME_LAST_MODIFICATION_DATE = "lastModDate";
var PROPERTY_NAME_RAW_LAST_MODIFICATION_DATE = "rawLastModDate";
var PROPERTY_NAME_LAST_ACCESS_DATE = "lastAccessDate";
var PROPERTY_NAME_RAW_LAST_ACCESS_DATE = "rawLastAccessDate";
var PROPERTY_NAME_CREATION_DATE = "creationDate";
var PROPERTY_NAME_RAW_CREATION_DATE = "rawCreationDate";
var PROPERTY_NAME_INTERNAL_FILE_ATTRIBUTES = "internalFileAttributes";
var PROPERTY_NAME_EXTERNAL_FILE_ATTRIBUTES = "externalFileAttributes";
var PROPERTY_NAME_MSDOS_ATTRIBUTES_RAW = "msdosAttributesRaw";
var PROPERTY_NAME_MSDOS_ATTRIBUTES = "msdosAttributes";
var PROPERTY_NAME_MS_DOS_COMPATIBLE = "msDosCompatible";
var PROPERTY_NAME_ZIP64 = "zip64";
var PROPERTY_NAME_ENCRYPTED = "encrypted";
var PROPERTY_NAME_VERSION = "version";
var PROPERTY_NAME_VERSION_MADE_BY = "versionMadeBy";
var PROPERTY_NAME_ZIPCRYPTO = "zipCrypto";
var PROPERTY_NAME_DIRECTORY = "directory";
var PROPERTY_NAME_EXECUTABLE = "executable";
var PROPERTY_NAME_SYMLINK = "symlink";
var PROPERTY_NAME_COMPRESSION_METHOD = "compressionMethod";
var PROPERTY_NAME_SIGNATURE = "signature";
var PROPERTY_NAME_CRC32 = "crc32";
var PROPERTY_NAME_EXTRA_FIELD = "extraField";
var PROPERTY_NAME_EXTRA_FIELD_INFOZIP = "extraFieldInfoZip";
var PROPERTY_NAME_EXTRA_FIELD_UNIX = "extraFieldUnix";
var PROPERTY_NAME_EXTRA_FIELD_UNIX_TYPE1 = "extraFieldUnixType1";
var PROPERTY_NAME_EXTRA_FIELD_PKWARE_UNIX = "extraFieldPkwareUnix";
var PROPERTY_NAME_UNIX_MODE = "unixMode";
var PROPERTY_NAME_SETUID = "setuid";
var PROPERTY_NAME_SETGID = "setgid";
var PROPERTY_NAME_STICKY = "sticky";
var PROPERTY_NAMES = [
	PROPERTY_NAME_FILENAME,
	PROPERTY_NAME_RAW_FILENAME,
	PROPERTY_NAME_UNCOMPRESSED_SIZE,
	PROPERTY_NAME_COMPRESSED_SIZE,
	PROPERTY_NAME_LAST_MODIFICATION_DATE,
	PROPERTY_NAME_RAW_LAST_MODIFICATION_DATE,
	PROPERTY_NAME_COMMENT,
	PROPERTY_NAME_RAW_COMMENT,
	PROPERTY_NAME_LAST_ACCESS_DATE,
	PROPERTY_NAME_RAW_LAST_ACCESS_DATE,
	PROPERTY_NAME_CREATION_DATE,
	PROPERTY_NAME_RAW_CREATION_DATE,
	PROPERTY_NAME_OFFSET,
	PROPERTY_NAME_DISK_NUMBER_START,
	PROPERTY_NAME_INTERNAL_FILE_ATTRIBUTES,
	PROPERTY_NAME_EXTERNAL_FILE_ATTRIBUTES,
	PROPERTY_NAME_MSDOS_ATTRIBUTES_RAW,
	PROPERTY_NAME_MSDOS_ATTRIBUTES,
	PROPERTY_NAME_MS_DOS_COMPATIBLE,
	PROPERTY_NAME_ZIP64,
	PROPERTY_NAME_ENCRYPTED,
	PROPERTY_NAME_VERSION,
	PROPERTY_NAME_VERSION_MADE_BY,
	PROPERTY_NAME_ZIPCRYPTO,
	PROPERTY_NAME_DIRECTORY,
	PROPERTY_NAME_EXECUTABLE,
	PROPERTY_NAME_SYMLINK,
	PROPERTY_NAME_COMPRESSION_METHOD,
	PROPERTY_NAME_SIGNATURE,
	PROPERTY_NAME_CRC32,
	PROPERTY_NAME_EXTRA_FIELD,
	PROPERTY_NAME_EXTRA_FIELD_UNIX,
	PROPERTY_NAME_EXTRA_FIELD_INFOZIP,
	PROPERTY_NAME_EXTRA_FIELD_UNIX_TYPE1,
	PROPERTY_NAME_EXTRA_FIELD_PKWARE_UNIX,
	"uid",
	"gid",
	PROPERTY_NAME_UNIX_MODE,
	"unixExternalUpper",
	PROPERTY_NAME_SETUID,
	PROPERTY_NAME_SETGID,
	PROPERTY_NAME_STICKY,
	"bitFlag",
	"rawBitFlag",
	"filenameLength",
	"extraFieldLength",
	"filenameUTF8",
	"commentUTF8",
	"rawExtraField",
	"extraFieldZip64",
	"extraFieldUnicodePath",
	"extraFieldUnicodeComment",
	"extraFieldAES",
	"extraFieldNTFS",
	"extraFieldExtendedTimestamp",
	"extraFieldUSDZ"
];
var Entry = class {
	constructor(data) {
		PROPERTY_NAMES.forEach((name) => this[name] = data[name]);
	}
};
var INTERPRETED_EXTRA_FIELD_TYPES = /* @__PURE__ */ new Set([
	1,
	EXTRAFIELD_TYPE_AES,
	10,
	EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP,
	EXTRAFIELD_TYPE_UNICODE_PATH,
	EXTRAFIELD_TYPE_UNICODE_COMMENT,
	EXTRAFIELD_TYPE_USDZ,
	EXTRAFIELD_TYPE_INFOZIP,
	EXTRAFIELD_TYPE_UNIX,
	EXTRAFIELD_TYPE_UNIX_TYPE1,
	13
]);
function getUserExtraField(extraField) {
	if (extraField) {
		const userExtraField = /* @__PURE__ */ new Map();
		extraField.forEach((field, type) => {
			if (!INTERPRETED_EXTRA_FIELD_TYPES.has(type)) userExtraField.set(type, field.data);
		});
		if (userExtraField.size) return userExtraField;
	}
}
function getEncryptionOverhead(encrypted, zipCrypto, encryptionStrength) {
	return encrypted ? zipCrypto ? 12 : 16 + encryptionStrength * 4 : 0;
}
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/zip-reader.js
var zip_reader_exports = /* @__PURE__ */ __exportAll({
	ERR_AMBIGUOUS_ARCHIVE: () => ERR_AMBIGUOUS_ARCHIVE,
	ERR_BAD_FORMAT: () => ERR_BAD_FORMAT,
	ERR_CENTRAL_DIRECTORY_NOT_FOUND: () => ERR_CENTRAL_DIRECTORY_NOT_FOUND,
	ERR_ENCRYPTED: () => ERR_ENCRYPTED,
	ERR_ENCRYPTED_CENTRAL_DIRECTORY: () => ERR_ENCRYPTED_CENTRAL_DIRECTORY,
	ERR_ENTRY_DATA_OUT_OF_BOUNDS: () => ERR_ENTRY_DATA_OUT_OF_BOUNDS,
	ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND: () => ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND,
	ERR_EOCDR_NOT_FOUND: () => ERR_EOCDR_NOT_FOUND,
	ERR_EXTRAFIELD_ZIP64_NOT_FOUND: () => ERR_EXTRAFIELD_ZIP64_NOT_FOUND,
	ERR_INVALID_AUTHENTICATION_CODE: () => ERR_INVALID_AUTHENTICATION_CODE,
	ERR_INVALID_COMPRESSED_DATA: () => ERR_INVALID_COMPRESSED_DATA,
	ERR_INVALID_CRC32: () => ERR_INVALID_CRC32,
	ERR_INVALID_FILENAME_VALIDATION: () => ERR_INVALID_FILENAME_VALIDATION,
	ERR_INVALID_MAX_APPENDED_DATA_SIZE: () => ERR_INVALID_MAX_APPENDED_DATA_SIZE,
	ERR_INVALID_PASSWORD: () => ERR_INVALID_PASSWORD,
	ERR_INVALID_STRICTNESS: () => ERR_INVALID_STRICTNESS,
	ERR_INVALID_UNCOMPRESSED_SIZE: () => ERR_INVALID_UNCOMPRESSED_SIZE,
	ERR_LOCAL_FILE_HEADER_NOT_FOUND: () => ERR_LOCAL_FILE_HEADER_NOT_FOUND,
	ERR_OVERLAPPING_ENTRY: () => ERR_OVERLAPPING_ENTRY,
	ERR_SPLIT_ZIP_FILE: () => ERR_SPLIT_ZIP_FILE,
	ERR_UNSAFE_FILENAME: () => ERR_UNSAFE_FILENAME,
	ERR_UNSUPPORTED_COMPRESSION: () => ERR_UNSUPPORTED_COMPRESSION,
	ERR_UNSUPPORTED_ENCRYPTION: () => ERR_UNSUPPORTED_ENCRYPTION,
	ERR_UNSUPPORTED_UINT64: () => ERR_UNSUPPORTED_UINT64,
	ERR_WORKER_STARTUP_TIMEOUT: () => ERR_WORKER_STARTUP_TIMEOUT,
	WARNING_APPENDED_DATA: () => WARNING_APPENDED_DATA,
	WARNING_COMPRESSED_PATCHED_DATA: () => WARNING_COMPRESSED_PATCHED_DATA,
	WARNING_DUPLICATE_FILENAME: () => WARNING_DUPLICATE_FILENAME,
	WARNING_MALFORMED_EXTRA_FIELD: () => WARNING_MALFORMED_EXTRA_FIELD,
	WARNING_MISMATCHED_LOCAL_FILE_HEADER_BIT_FLAG: () => WARNING_MISMATCHED_LOCAL_FILE_HEADER_BIT_FLAG,
	WARNING_MISMATCHED_LOCAL_FILE_HEADER_COMPRESSION_METHOD: () => WARNING_MISMATCHED_LOCAL_FILE_HEADER_COMPRESSION_METHOD,
	WARNING_MISMATCHED_LOCAL_FILE_HEADER_CRC32_OR_SIZES: () => WARNING_MISMATCHED_LOCAL_FILE_HEADER_CRC32_OR_SIZES,
	WARNING_MISMATCHED_LOCAL_FILE_HEADER_FILENAME: () => WARNING_MISMATCHED_LOCAL_FILE_HEADER_FILENAME,
	WARNING_MISMATCHED_ZIP64_END_OF_CENTRAL_DIRECTORY: () => WARNING_MISMATCHED_ZIP64_END_OF_CENTRAL_DIRECTORY,
	WARNING_MULTIPLE_END_OF_CENTRAL_DIRECTORY: () => WARNING_MULTIPLE_END_OF_CENTRAL_DIRECTORY,
	WARNING_PREPENDED_CENTRAL_DIRECTORY: () => WARNING_PREPENDED_CENTRAL_DIRECTORY,
	WARNING_PREPENDED_DATA: () => WARNING_PREPENDED_DATA,
	WARNING_TRAILING_CENTRAL_DIRECTORY_DATA: () => WARNING_TRAILING_CENTRAL_DIRECTORY_DATA,
	WARNING_UNKNOWN_VERSION: () => WARNING_UNKNOWN_VERSION,
	WARNING_UNKNOWN_ZIP64_EXTENSIBLE_DATA: () => WARNING_UNKNOWN_ZIP64_EXTENSIBLE_DATA,
	WARNING_UNSORTED_CENTRAL_DIRECTORY: () => WARNING_UNSORTED_CENTRAL_DIRECTORY,
	WARNING_WRAPPED_ENTRIES_COUNT: () => WARNING_WRAPPED_ENTRIES_COUNT,
	ZipReader: () => ZipReader
});
var ERR_BAD_FORMAT = "File format is not recognized";
var ERR_EOCDR_NOT_FOUND = "End of central directory not found";
var ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND = "End of Zip64 central directory locator not found";
var ERR_CENTRAL_DIRECTORY_NOT_FOUND = "Central directory header not found";
var ERR_LOCAL_FILE_HEADER_NOT_FOUND = "Local file header not found";
var ERR_EXTRAFIELD_ZIP64_NOT_FOUND = "Zip64 extra field not found";
var ERR_ENCRYPTED = "File contains encrypted entry";
var ERR_UNSUPPORTED_ENCRYPTION = "Encryption method not supported";
var ERR_SPLIT_ZIP_FILE = "Split zip file";
var ERR_OVERLAPPING_ENTRY = "Overlapping entry found";
var ERR_ENTRY_DATA_OUT_OF_BOUNDS = "Entry data out of bounds";
var ERR_AMBIGUOUS_ARCHIVE = "Ambiguous archive";
var ERR_ENCRYPTED_CENTRAL_DIRECTORY = "Encrypted central directory is not supported";
var ERR_UNSAFE_FILENAME = "Unsafe filename";
var ERR_INVALID_STRICTNESS = "Invalid strictness (must be 'strict', 'balanced' or 'tolerant')";
var ERR_INVALID_FILENAME_VALIDATION = "Invalid filenameValidation (must be 'strict', 'balanced' or 'tolerant')";
var ERR_INVALID_MAX_APPENDED_DATA_SIZE = "Invalid maxAppendedDataSize (must be a number greater than or equal to 0)";
var ERR_UNSUPPORTED_UINT64 = "64-bit value exceeds Number.MAX_SAFE_INTEGER";
var WARNING_UNSORTED_CENTRAL_DIRECTORY = "unsorted central directory";
var WARNING_UNKNOWN_VERSION = "unknown version needed to extract";
var WARNING_COMPRESSED_PATCHED_DATA = "compressed patched data";
var WARNING_MALFORMED_EXTRA_FIELD = "malformed extra field";
var WARNING_UNKNOWN_ZIP64_EXTENSIBLE_DATA = "unknown zip64 extensible data";
var WARNING_WRAPPED_ENTRIES_COUNT = "wrapped entries count";
var WARNING_APPENDED_DATA = "appended data";
var WARNING_PREPENDED_DATA = "prepended data";
var WARNING_PREPENDED_CENTRAL_DIRECTORY = "prepended central directory";
var WARNING_TRAILING_CENTRAL_DIRECTORY_DATA = "trailing central directory data";
var WARNING_DUPLICATE_FILENAME = "duplicate filename";
var WARNING_MISMATCHED_ZIP64_END_OF_CENTRAL_DIRECTORY = "mismatched zip64 end of central directory record";
var WARNING_MULTIPLE_END_OF_CENTRAL_DIRECTORY = "multiple end of central directory records";
var WARNING_MISMATCHED_LOCAL_FILE_HEADER_FILENAME = "mismatched local file header (filename)";
var WARNING_MISMATCHED_LOCAL_FILE_HEADER_BIT_FLAG = "mismatched local file header (general purpose bit flag)";
var WARNING_MISMATCHED_LOCAL_FILE_HEADER_COMPRESSION_METHOD = "mismatched local file header (compression method)";
var WARNING_MISMATCHED_LOCAL_FILE_HEADER_CRC32_OR_SIZES = "mismatched local file header (crc32 or sizes)";
var MAX_KNOWN_VERSION = 63;
var DRIVE_LETTER_REGEXP = /^[a-zA-Z]:/;
var PARENT_DIRECTORY_REGEXP = /(^|[\\/])\.\.([\\/]|$)/;
var CHARSET_UTF8 = "utf-8";
var PROPERTY_NAME_UTF8_SUFFIX = "UTF8";
var CHARSET_CP437 = "cp437";
var BITFLAG_AMBIGUITY_MASK = 9 | BITFLAG_LANG_ENCODING_FLAG;
var VENDOR_VERSION_AE_1$1 = 1;
var ZIP64_PROPERTIES = [
	[PROPERTY_NAME_UNCOMPRESSED_SIZE, MAX_32_BITS],
	[PROPERTY_NAME_COMPRESSED_SIZE, MAX_32_BITS],
	[PROPERTY_NAME_OFFSET, MAX_32_BITS],
	[PROPERTY_NAME_DISK_NUMBER_START, MAX_16_BITS]
];
var ZIP64_EXTRACTION = {
	[MAX_16_BITS]: {
		getValue: getUint32$1,
		bytes: 4
	},
	[MAX_32_BITS]: {
		getValue: getBigUint64,
		bytes: 8
	}
};
var MAX_SAFE_UINT64 = BigInt(Number.MAX_SAFE_INTEGER);
var MAX_END_OF_CENTRAL_DIR_PROBES = 64;
var MAX_DEFLATE_EXPANSION_RATIO = 1032;
var CENTRAL_DIRECTORY_UNREACHABLE = 0;
var CENTRAL_DIRECTORY_PLAUSIBLE = 1;
var CENTRAL_DIRECTORY_REACHABLE = 2;
var ZipReader = class {
	constructor(reader, options = {}) {
		Object.assign(this, {
			reader: new GenericReader(reader),
			options,
			readRanges: {
				indexes: /* @__PURE__ */ new Set(),
				sortedRanges: [],
				pendingRanges: []
			}
		});
	}
	async *getEntriesGenerator(options = {}) {
		const zipReader = this;
		let { reader } = zipReader;
		await initStream(reader);
		if (reader.size === void 0 || !reader.readUint8Array) {
			reader = new BlobReader(await streamToBlob(reader.readable));
			await initStream(reader);
		}
		if (reader.size < 22) throw new Error(ERR_BAD_FORMAT);
		const warnings = zipReader.warnings = [];
		const strictness = getStrictness(options, zipReader.options);
		const checkAmbiguity = strictness == STRICTNESS_STRICT;
		const rejectAmbiguousEndOfDirectory = strictness != STRICTNESS_TOLERANT;
		const maxAppendedDataSize = getMaxAppendedDataSize(getOptionValue$1(zipReader, options, OPTION_MAX_APPENDED_DATA_SIZE), strictness);
		const filenameValidation = getFilenameValidation(getOptionValue$1(zipReader, options, OPTION_FILENAME_VALIDATION), strictness);
		const normalizeFilename = getOptionValue$1(zipReader, options, OPTION_NORMALIZE_FILENAME);
		const { endOfDirectoryInfo, endOfDirectoryReachingEndCount } = await findEndOfCentralDirectory(reader, rejectAmbiguousEndOfDirectory, maxAppendedDataSize);
		if (!endOfDirectoryInfo) {
			if (await startsWithSplitZipSignature$1(reader)) throw new Error(ERR_SPLIT_ZIP_FILE);
			else throw new Error(ERR_EOCDR_NOT_FOUND);
		}
		if (rejectAmbiguousEndOfDirectory && endOfDirectoryReachingEndCount > 1) throwAmbiguousArchive(WARNING_MULTIPLE_END_OF_CENTRAL_DIRECTORY);
		const endOfDirectoryView = getDataView(endOfDirectoryInfo);
		let directoryDataLength = getUint32$1(endOfDirectoryView, 12);
		let directoryDataOffset = getUint32$1(endOfDirectoryView, 16);
		const commentOffset = endOfDirectoryInfo.offset;
		const commentLength = getUint16$1(endOfDirectoryView, 20);
		const appendedDataOffset = commentOffset + 22 + commentLength;
		const appendedDataLength = reader.size - appendedDataOffset;
		if (appendedDataLength > maxAppendedDataSize) throwAmbiguousArchive(WARNING_APPENDED_DATA);
		if (appendedDataLength > 0) addWarning(warnings, WARNING_APPENDED_DATA);
		let lastDiskNumber = getUint16$1(endOfDirectoryView, 4);
		const expectedLastDiskNumber = reader.lastDiskNumber || 0;
		let diskNumber = getUint16$1(endOfDirectoryView, 6);
		let filesLength = getUint16$1(endOfDirectoryView, 10);
		let prependedDataLength = 0;
		let prependedCentralDirectory;
		let startOffset;
		let zip64EndOfDirectory;
		let zip64EndOfDirectoryVersion2;
		let zip64EndOfDirectoryLength = 56;
		let directoryEncryptionInfo;
		const requiresZip64 = directoryDataOffset == 4294967295 || directoryDataLength == 4294967295 || filesLength == 65535 || diskNumber == 65535;
		if (directoryDataOffset != 4294967295 && diskNumber != 65535) directoryDataOffset += getDiskOffset$1(reader, diskNumber);
		if (requiresZip64) {
			const endOfDirectoryLocatorArray = endOfDirectoryInfo.offset >= 20 ? await readUint8Array(reader, endOfDirectoryInfo.offset - 20, 20) : EMPTY_UINT8_ARRAY;
			const endOfDirectoryLocatorView = getDataView(endOfDirectoryLocatorArray);
			if (endOfDirectoryLocatorArray.length == 20 && getUint32$1(endOfDirectoryLocatorView, 0) == 117853008) {
				directoryDataOffset = getDiskOffset$1(reader, getUint32$1(endOfDirectoryLocatorView, 4)) + getBigUint64(endOfDirectoryLocatorView, 8);
				let endOfDirectoryArray = await readUint8Array(reader, directoryDataOffset, 56);
				let endOfDirectoryView = getDataView(endOfDirectoryArray);
				const expectedDirectoryDataOffset = endOfDirectoryInfo.offset - 20 - 56;
				if ((endOfDirectoryArray.length < 56 || getUint32$1(endOfDirectoryView, 0) != 101075792) && directoryDataOffset != expectedDirectoryDataOffset && expectedDirectoryDataOffset >= 0) {
					const originalDirectoryDataOffset = directoryDataOffset;
					directoryDataOffset = expectedDirectoryDataOffset;
					if (directoryDataOffset > originalDirectoryDataOffset) prependedDataLength = directoryDataOffset - originalDirectoryDataOffset;
					endOfDirectoryArray = await readUint8Array(reader, directoryDataOffset, 56);
					endOfDirectoryView = getDataView(endOfDirectoryArray);
				}
				if (endOfDirectoryArray.length < 56 || getUint32$1(endOfDirectoryView, 0) != 101075792) throw new Error(ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND);
				zip64EndOfDirectory = true;
				zip64EndOfDirectoryVersion2 = getBigUint64(endOfDirectoryView, 4) > 44;
				if (zip64EndOfDirectoryVersion2) {
					const extensibleDataLength = Math.min(getBigUint64(endOfDirectoryView, 4) - 44, reader.size - directoryDataOffset - 56);
					if (extensibleDataLength > 0) {
						zip64EndOfDirectoryLength += extensibleDataLength;
						directoryEncryptionInfo = getDirectoryEncryptionInfo(await readUint8Array(reader, directoryDataOffset + 56, extensibleDataLength));
					}
				}
				if (lastDiskNumber == 65535) lastDiskNumber = getUint32$1(endOfDirectoryView, 16);
				else if (lastDiskNumber != getUint32$1(endOfDirectoryView, 16)) reportAmbiguity(checkAmbiguity, warnings, WARNING_MISMATCHED_ZIP64_END_OF_CENTRAL_DIRECTORY);
				if (diskNumber == 65535) diskNumber = getUint32$1(endOfDirectoryView, 20);
				else if (diskNumber != getUint32$1(endOfDirectoryView, 20)) reportAmbiguity(checkAmbiguity, warnings, WARNING_MISMATCHED_ZIP64_END_OF_CENTRAL_DIRECTORY);
				if (filesLength == 65535) filesLength = getBigUint64(endOfDirectoryView, 32);
				else if (filesLength != getBigUint64(endOfDirectoryView, 32)) reportAmbiguity(checkAmbiguity, warnings, WARNING_MISMATCHED_ZIP64_END_OF_CENTRAL_DIRECTORY);
				if (directoryDataLength == 4294967295) directoryDataLength = getBigUint64(endOfDirectoryView, 40);
				else if (directoryDataLength != getBigUint64(endOfDirectoryView, 40)) reportAmbiguity(checkAmbiguity, warnings, WARNING_MISMATCHED_ZIP64_END_OF_CENTRAL_DIRECTORY);
				directoryDataOffset = getDiskOffset$1(reader, diskNumber) + getBigUint64(endOfDirectoryView, 48) + prependedDataLength;
			}
		}
		let declaredDirectoryDataLength = directoryDataLength;
		const centralDirectoryEndOffset = endOfDirectoryInfo.offset - (zip64EndOfDirectory ? zip64EndOfDirectoryLength + 20 : 0);
		if (directoryDataOffset >= reader.size) {
			prependedDataLength = reader.size - directoryDataOffset - directoryDataLength - 22;
			directoryDataOffset = reader.size - directoryDataLength - 22;
		}
		if (expectedLastDiskNumber != lastDiskNumber) throw new Error(ERR_SPLIT_ZIP_FILE);
		if (directoryDataOffset < 0) throw new Error(ERR_BAD_FORMAT);
		let offset = 0;
		let directoryArray = await readUint8Array(reader, directoryDataOffset, directoryDataLength);
		let directoryView = getDataView(directoryArray);
		if (directoryDataLength) {
			if (directoryArray.length < 4) throw new Error(ERR_BAD_FORMAT);
			const expectedDirectoryDataOffset = centralDirectoryEndOffset - directoryDataLength;
			if (directoryDataOffset != expectedDirectoryDataOffset && diskNumber == lastDiskNumber) {
				const storedPointsAtDirectory = getUint32$1(directoryView, offset) == 33639248 || Boolean(directoryEncryptionInfo && directoryEncryptionInfo.compressedSize) || detectEncryptedCentralDirectory(directoryView);
				let reconcile = !storedPointsAtDirectory;
				if (!reconcile && expectedDirectoryDataOffset >= 0 && expectedDirectoryDataOffset + 4 <= reader.size) reconcile = getUint32$1(getDataView(await readUint8Array(reader, expectedDirectoryDataOffset, 4)), 0) == CENTRAL_FILE_HEADER_SIGNATURE;
				if (reconcile) {
					const originalDirectoryDataOffset = directoryDataOffset;
					directoryDataOffset = expectedDirectoryDataOffset;
					if (directoryDataOffset > originalDirectoryDataOffset) {
						prependedDataLength += directoryDataOffset - originalDirectoryDataOffset;
						prependedCentralDirectory = storedPointsAtDirectory;
					}
					directoryArray = await readUint8Array(reader, directoryDataOffset, directoryDataLength);
					directoryView = getDataView(directoryArray);
				}
			}
		}
		const expectedDirectoryDataLength = centralDirectoryEndOffset - directoryDataOffset;
		if (directoryDataLength != expectedDirectoryDataLength && expectedDirectoryDataLength >= 0 && diskNumber == lastDiskNumber) {
			directoryDataLength = expectedDirectoryDataLength;
			directoryArray = await readUint8Array(reader, directoryDataOffset, directoryDataLength);
			directoryView = getDataView(directoryArray);
		}
		if (directoryDataOffset < 0 || directoryDataOffset >= reader.size) throw new Error(ERR_BAD_FORMAT);
		zipReader.directoryOffset = directoryDataOffset;
		zipReader.directoryLength = declaredDirectoryDataLength;
		const decryptCentralDirectory = getFunctionOptionValue$1(zipReader, options, OPTION_DECRYPT_CENTRAL_DIRECTORY);
		let decryptedDirectory, dataAfterEncryptedDirectory;
		if (decryptCentralDirectory && filesLength && directoryArray.length >= 4 && getUint32$1(directoryView, 0) != 33639248 && (zip64EndOfDirectoryVersion2 || detectEncryptedCentralDirectory(directoryView))) {
			const encryptedDirectoryDataLength = getEncryptedDirectoryDataLength(directoryEncryptionInfo, declaredDirectoryDataLength, directoryArray.length);
			dataAfterEncryptedDirectory = directoryArray.subarray(encryptedDirectoryDataLength);
			directoryArray = await decryptCentralDirectory(directoryArray.subarray(0, encryptedDirectoryDataLength), directoryEncryptionInfo);
			directoryView = getDataView(directoryArray);
			declaredDirectoryDataLength = directoryArray.length;
			decryptedDirectory = true;
		}
		if (directoryEncryptionInfo && !decryptedDirectory && (directoryArray.length < 4 || getUint32$1(directoryView, 0) == 33639248)) addWarning(warnings, WARNING_UNKNOWN_ZIP64_EXTENSIBLE_DATA);
		startOffset = directoryDataOffset;
		const filenameEncoding = getOptionValue$1(zipReader, options, OPTION_FILENAME_ENCODING);
		const commentEncoding = getOptionValue$1(zipReader, options, OPTION_COMMENT_ENCODING);
		const filenames = /* @__PURE__ */ new Set();
		let duplicateFilename;
		let previousEntryPosition = -1;
		const recoverWrappedFilesLength = !checkAmbiguity && !zip64EndOfDirectory;
		if (!filesLength && recoverWrappedFilesLength) {
			filesLength = getWrappedFilesLength(directoryView, directoryArray, offset);
			if (filesLength) addWarning(warnings, WARNING_WRAPPED_ENTRIES_COUNT);
		}
		for (let indexFile = 0; indexFile < filesLength; indexFile++) {
			const fileEntry = new ZipEntry(reader, zipReader.options);
			if (offset + 46 > directoryArray.length || getUint32$1(directoryView, offset) != 33639248) {
				if (indexFile == 0 && !decryptedDirectory && (zip64EndOfDirectoryVersion2 || detectEncryptedCentralDirectory(directoryView))) throw new Error(ERR_ENCRYPTED_CENTRAL_DIRECTORY);
				throw new Error(ERR_CENTRAL_DIRECTORY_NOT_FOUND);
			}
			readCommonHeader(fileEntry, directoryView, offset + 6);
			const languageEncodingFlag = Boolean(fileEntry.bitFlag.languageEncodingFlag);
			const filenameOffset = offset + 46;
			const commentOffset = filenameOffset + fileEntry.filenameLength + fileEntry.extraFieldLength;
			const versionMadeBy = getUint16$1(directoryView, offset + 4);
			const msDosCompatible = versionMadeBy >> 8 == 0;
			const unixCompatible = versionMadeBy >> 8 == 3;
			const commentLength = getUint16$1(directoryView, offset + 32);
			const endOffset = commentOffset + commentLength;
			const rawEntryData = new Uint8Array(directoryArray.subarray(filenameOffset, endOffset));
			const rawFilename = rawEntryData.subarray(0, fileEntry.filenameLength);
			const rawComment = rawEntryData.subarray(fileEntry.filenameLength + fileEntry.extraFieldLength);
			const filenameUTF8 = languageEncodingFlag || !filenameEncoding && isUTF8Text(rawFilename);
			const commentUTF8 = languageEncodingFlag || !commentEncoding && isUTF8Text(rawComment);
			const externalFileAttributes = getUint32$1(directoryView, offset + 38);
			const msdosAttributesRaw = externalFileAttributes & 255;
			const msdosAttributes = {
				readOnly: Boolean(msdosAttributesRaw & 1),
				hidden: Boolean(msdosAttributesRaw & 2),
				system: Boolean(msdosAttributesRaw & 4),
				directory: Boolean(msdosAttributesRaw & 16),
				archive: Boolean(msdosAttributesRaw & 32)
			};
			const offsetFileEntry = getUint32$1(directoryView, offset + 42);
			const decode = getFunctionOptionValue$1(zipReader, options, "decodeText") || decodeText;
			const rawFilenameEncoding = filenameUTF8 ? CHARSET_UTF8 : filenameEncoding || CHARSET_CP437;
			const rawCommentEncoding = commentUTF8 ? CHARSET_UTF8 : commentEncoding || CHARSET_CP437;
			let filename = decode(rawFilename, rawFilenameEncoding, TEXT_TYPE_FILENAME);
			if (filename === void 0) filename = decodeText(rawFilename, rawFilenameEncoding);
			if (normalizeFilename) {
				const normalizedFilename = normalizeFilename(filename);
				if (normalizedFilename !== void 0) filename = normalizedFilename;
			}
			if (isUnsafeFilename(filename, filenameValidation)) {
				const error = /* @__PURE__ */ new Error(ERR_UNSAFE_FILENAME);
				error.filename = filename;
				throw error;
			}
			let comment = decode(rawComment, rawCommentEncoding, TEXT_TYPE_COMMENT);
			if (comment === void 0) comment = decodeText(rawComment, rawCommentEncoding);
			Object.assign(fileEntry, {
				index: indexFile,
				decryptedDirectory,
				versionMadeBy,
				msDosCompatible,
				zip64: false,
				compressedSize: 0,
				uncompressedSize: 0,
				commentLength,
				offset: offsetFileEntry,
				diskNumberStart: getUint16$1(directoryView, offset + 34),
				internalFileAttributes: getUint16$1(directoryView, offset + 36),
				externalFileAttributes,
				msdosAttributesRaw,
				msdosAttributes,
				rawFilename,
				filenameUTF8,
				commentUTF8,
				rawExtraField: rawEntryData.subarray(fileEntry.filenameLength, fileEntry.filenameLength + fileEntry.extraFieldLength),
				rawComment,
				filename,
				comment
			});
			if (readCommonFooter(fileEntry, fileEntry, directoryView, offset + 6)) addWarning(warnings, WARNING_MALFORMED_EXTRA_FIELD, filename);
			fileEntry.offset += prependedDataLength;
			const entryPosition = getDiskOffset$1(reader, fileEntry.diskNumberStart) + fileEntry.offset;
			startOffset = Math.min(entryPosition, startOffset);
			if (entryPosition < previousEntryPosition) addWarning(warnings, WARNING_UNSORTED_CENTRAL_DIRECTORY, filename);
			previousEntryPosition = entryPosition;
			if ((fileEntry.version & 255) > MAX_KNOWN_VERSION) addWarning(warnings, WARNING_UNKNOWN_VERSION, filename);
			if ((fileEntry.rawBitFlag & 32) == 32) addWarning(warnings, WARNING_COMPRESSED_PATCHED_DATA, filename);
			if (filenames.has(fileEntry.filename)) duplicateFilename = true;
			filenames.add(fileEntry.filename);
			const unixExternalUpper = fileEntry.externalFileAttributes >> 16 & MAX_16_BITS;
			if (fileEntry.unixMode === void 0 && (unixExternalUpper & 16877) != 0) fileEntry.unixMode = unixExternalUpper;
			const setuid = Boolean(fileEntry.unixMode & FILE_ATTR_UNIX_SETUID_MASK);
			const setgid = Boolean(fileEntry.unixMode & FILE_ATTR_UNIX_SETGID_MASK);
			const sticky = Boolean(fileEntry.unixMode & 512);
			const symlink = ((fileEntry.unixMode === void 0 ? unixExternalUpper : fileEntry.unixMode) & FILE_ATTR_UNIX_TYPE_MASK) == FILE_ATTR_UNIX_TYPE_SYMLINK;
			const executable = !symlink && (fileEntry.unixMode !== void 0 ? (fileEntry.unixMode & 73) != 0 : unixCompatible && (unixExternalUpper & 73) != 0);
			const modeIsDir = fileEntry.unixMode !== void 0 && (fileEntry.unixMode & 61440) == 16384;
			const upperIsDir = (unixExternalUpper & FILE_ATTR_UNIX_TYPE_MASK) == FILE_ATTR_UNIX_TYPE_DIR;
			Object.assign(fileEntry, {
				setuid,
				setgid,
				sticky,
				symlink,
				unixExternalUpper,
				executable,
				directory: modeIsDir || upperIsDir || msDosCompatible && msdosAttributes.directory || fileEntry.filename.endsWith("/"),
				zipCrypto: fileEntry.encrypted && !fileEntry.extraFieldAES
			});
			const entry = new Entry(fileEntry);
			entry.getData = (writer, options) => fileEntry.getData(writer, entry, zipReader.readRanges, options);
			entry.arrayBuffer = async (options) => {
				const writer = new TransformStream();
				const arrayBufferPromise = streamToBlob(writer.readable).then((blob) => blob.arrayBuffer());
				arrayBufferPromise.catch(() => {});
				await fileEntry.getData(writer, entry, zipReader.readRanges, Object.assign({}, options, { preventClose: false }));
				return arrayBufferPromise;
			};
			offset = endOffset;
			if (indexFile == filesLength - 1 && recoverWrappedFilesLength) {
				const wrappedFilesLength = getWrappedFilesLength(directoryView, directoryArray, offset);
				if (wrappedFilesLength) {
					filesLength += wrappedFilesLength;
					addWarning(warnings, WARNING_WRAPPED_ENTRIES_COUNT);
				}
			}
			const { onprogress } = options;
			if (onprogress) try {
				await onprogress(indexFile + 1, filesLength, new Entry(fileEntry));
			} catch {}
			yield entry;
		}
		let offsetAfterSignature = offset;
		let digitalSignature = readDigitalSignature(directoryArray.subarray(offset)) || (decryptedDirectory ? readDigitalSignature(dataAfterEncryptedDirectory) : void 0);
		if (!digitalSignature && !decryptedDirectory) {
			const signatureRecordOffset = directoryDataOffset + offset;
			const signatureRecordLength = Math.min(centralDirectoryEndOffset - signatureRecordOffset, 6 + MAX_16_BITS);
			if (signatureRecordLength >= 6) digitalSignature = readDigitalSignature(await readUint8Array(reader, signatureRecordOffset, signatureRecordLength));
		}
		if (digitalSignature) {
			zipReader.digitalSignature = digitalSignature;
			offsetAfterSignature = offset + 6 + digitalSignature.length;
		}
		if (offset != declaredDirectoryDataLength && offsetAfterSignature != declaredDirectoryDataLength || !decryptedDirectory && offset != directoryDataLength && offsetAfterSignature != directoryDataLength) reportAmbiguity(checkAmbiguity, warnings, WARNING_TRAILING_CENTRAL_DIRECTORY_DATA);
		if (duplicateFilename) reportAmbiguity(checkAmbiguity, warnings, WARNING_DUPLICATE_FILENAME);
		const extractPrependedData = getOptionValue$1(zipReader, options, OPTION_EXTRACT_PREPENDED_DATA);
		const extractAppendedData = getOptionValue$1(zipReader, options, OPTION_EXTRACT_APPENDED_DATA);
		const splitZipSignatureLength = (checkAmbiguity || extractPrependedData) && filesLength && startOffset == 4 && await startsWithSplitZipMarker(reader) ? 4 : 0;
		if (checkAmbiguity && (prependedDataLength || filesLength && startOffset > splitZipSignatureLength)) throwAmbiguousArchive(WARNING_PREPENDED_DATA);
		if (prependedDataLength || filesLength && startOffset > 4) addWarning(warnings, WARNING_PREPENDED_DATA);
		if (prependedCentralDirectory) addWarning(warnings, WARNING_PREPENDED_CENTRAL_DIRECTORY);
		if (extractPrependedData) zipReader.prependedData = startOffset > splitZipSignatureLength ? await readUint8Array(reader, splitZipSignatureLength, startOffset - splitZipSignatureLength) : EMPTY_UINT8_ARRAY;
		zipReader.comment = commentLength ? await readUint8Array(reader, commentOffset + 22, commentLength) : EMPTY_UINT8_ARRAY;
		if (extractAppendedData) zipReader.appendedData = appendedDataOffset < reader.size ? await readUint8Array(reader, appendedDataOffset, reader.size - appendedDataOffset) : EMPTY_UINT8_ARRAY;
		return true;
	}
	async getEntries(options = {}) {
		const entries = [];
		for await (const entry of this.getEntriesGenerator(options)) entries.push(entry);
		return entries;
	}
	async close() {
		const { reader } = this;
		if (!reader.readUint8Array && reader.readable && !reader.readable.locked) await reader.readable.cancel();
	}
	[SYMBOL_ASYNC_DISPOSE]() {
		return this.close();
	}
};
var ZipEntry = class {
	constructor(reader, options) {
		Object.assign(this, {
			reader,
			options
		});
	}
	async getData(writer, fileEntry, readRanges, options = {}) {
		const zipEntry = this;
		const config = getConfiguration();
		const { reader, index, offset, diskNumberStart, extraFieldAES, extraFieldZip64, compressionMethod, bitFlag, rawBitFlag, crc32, rawLastModDate, uncompressedSize, compressedSize } = zipEntry;
		const { dataDescriptor } = bitFlag;
		const localDirectory = fileEntry.localDirectory = {};
		const warnings = fileEntry.warnings = [];
		const localHeaderOffset = getDiskOffset$1(reader, diskNumberStart) + offset;
		const dataArray = await readUint8Array(reader, localHeaderOffset, 30);
		const dataView = getDataView(dataArray);
		let password = getOptionValue$1(zipEntry, options, OPTION_PASSWORD);
		let rawPassword = getOptionValue$1(zipEntry, options, OPTION_RAW_PASSWORD);
		const passThrough = checkPassThroughOption(getOptionValue$1(zipEntry, options, OPTION_PASS_THROUGH));
		const passThroughCompression = Boolean(passThrough);
		const passThroughEncryption = passThrough === true;
		checkPasswordOption(password, rawPassword);
		password = password && password.length && password;
		rawPassword = rawPassword && rawPassword.length && rawPassword;
		if (extraFieldAES) {
			if (extraFieldAES.originalCompressionMethod != 99) throw new Error(ERR_UNSUPPORTED_COMPRESSION);
		}
		if (dataArray.length < 30 || getUint32$1(dataView, 0) != 67324752) throw new Error(ERR_LOCAL_FILE_HEADER_NOT_FOUND);
		readCommonHeader(localDirectory, dataView, 4);
		const { extraFieldLength, filenameLength } = localDirectory;
		const dataOffset = localDirectory.dataOffset = localHeaderOffset + 30 + filenameLength + extraFieldLength;
		const checkLocalDirectoryOption = getOptionValue$1(zipEntry, options, OPTION_CHECK_LOCAL_DIRECTORY);
		const entryStrictness = getStrictness(options, zipEntry.options);
		const checkLocalDirectory = getCheckLocalDirectory(checkLocalDirectoryOption, entryStrictness);
		const checkLocalFilenameOption = getOptionValue$1(zipEntry, options, OPTION_CHECK_LOCAL_FILENAME);
		const checkLocalFilename = getCheckLocalFilename(checkLocalFilenameOption === void 0 ? checkLocalDirectoryOption : checkLocalFilenameOption, entryStrictness);
		let rawLocalFilename = EMPTY_UINT8_ARRAY;
		if (checkLocalFilename && (filenameLength || extraFieldLength)) {
			const trailingDataArray = await readUint8Array(reader, localHeaderOffset + 30, filenameLength + extraFieldLength);
			rawLocalFilename = trailingDataArray.subarray(0, filenameLength);
			localDirectory.rawExtraField = trailingDataArray.subarray(filenameLength);
		} else localDirectory.rawExtraField = extraFieldLength ? await readUint8Array(reader, localHeaderOffset + 30 + filenameLength, extraFieldLength) : EMPTY_UINT8_ARRAY;
		if (checkLocalFilename) localDirectory.rawFilename = rawLocalFilename;
		if (readCommonFooter(zipEntry, localDirectory, dataView, 4, true)) addWarning(warnings, WARNING_MALFORMED_EXTRA_FIELD);
		validateLocalDirectory(zipEntry, localDirectory, rawLocalFilename, checkLocalFilename, checkLocalDirectory ? void 0 : warnings);
		const { lastAccessDate, creationDate, uid, gid } = localDirectory;
		if (lastAccessDate) fileEntry.lastAccessDate = lastAccessDate;
		if (creationDate) fileEntry.creationDate = creationDate;
		if (uid !== void 0 && fileEntry.uid === void 0) fileEntry.uid = uid;
		if (gid !== void 0 && fileEntry.gid === void 0) fileEntry.gid = gid;
		const checkPasswordOnly = getOptionValue$1(zipEntry, options, OPTION_CHECK_PASSWORD_ONLY);
		const encrypted = zipEntry.encrypted && localDirectory.encrypted && (!passThroughEncryption || checkPasswordOnly);
		const zipCrypto = encrypted && !extraFieldAES;
		if (!passThroughEncryption) fileEntry.zipCrypto = zipCrypto;
		if (encrypted && (localDirectory.rawBitFlag & 64) == 64) throw new Error(ERR_UNSUPPORTED_ENCRYPTION);
		const registeredCodec = passThroughCompression ? void 0 : getRegisteredCodec(compressionMethod);
		if (compressionMethod != 0 && compressionMethod != 8 && compressionMethod != 9 && !registeredCodec && !passThroughCompression) throw new Error(ERR_UNSUPPORTED_COMPRESSION);
		if (encrypted) {
			if (!zipCrypto && (extraFieldAES.strength < 1 || extraFieldAES.strength > 3)) throw new Error(ERR_UNSUPPORTED_ENCRYPTION);
			else if (!password && !rawPassword) throw new Error(ERR_ENCRYPTED);
		}
		if (dataOffset + compressedSize > reader.size) throw new Error(ERR_ENTRY_DATA_OUT_OF_BOUNDS);
		const size = compressedSize;
		const signal = checkSignalOption(getOptionValue$1(zipEntry, options, OPTION_SIGNAL));
		throwIfAborted(signal);
		let checkOverlappingEntry = getOptionValue$1(zipEntry, options, OPTION_CHECK_OVERLAPPING_ENTRY);
		const checkOverlappingEntryOnly = getOptionValue$1(zipEntry, options, OPTION_CHECK_OVERLAPPING_ENTRY_ONLY);
		if (checkOverlappingEntryOnly) checkOverlappingEntry = true;
		const { onstart, onprogress, onend } = options;
		const compressed = compressionMethod != 0 && !passThroughCompression;
		const outputSize = passThroughCompression ? compressedSize - getEncryptionOverhead(encrypted, zipCrypto, extraFieldAES && extraFieldAES.strength) : uncompressedSize;
		const deflate64 = compressionMethod == 9;
		let useCompressionStream = getOptionValue$1(zipEntry, options, OPTION_USE_COMPRESSION_STREAM);
		if (deflate64) useCompressionStream = false;
		const checkCrc32Option = getOptionValue$1(zipEntry, options, OPTION_CHECK_CRC32);
		const checkCrc32 = (checkCrc32Option === void 0 ? getOptionValue$1(zipEntry, options, "checkSignature") : checkCrc32Option) && !passThroughCompression && (!encrypted || zipCrypto || extraFieldAES && extraFieldAES.vendorVersion == VENDOR_VERSION_AE_1$1);
		const workerOptions = {
			options: {
				codecType: CODEC_INFLATE,
				password,
				rawPassword,
				zipCrypto,
				encryptionStrength: extraFieldAES && extraFieldAES.strength,
				checkCrc32,
				checkAuthenticationCode: getOptionValue$1(zipEntry, options, OPTION_CHECK_AUTHENTICATION_CODE),
				passwordVerification: zipCrypto && (dataDescriptor ? rawLastModDate >>> 8 & 255 : crc32 >>> 24 & 255),
				outputSize,
				crc32,
				compressed,
				encrypted,
				useWebWorkers: getOptionValue$1(zipEntry, options, OPTION_USE_WEB_WORKERS),
				useCompressionStream,
				transferStreams: getOptionValue$1(zipEntry, options, OPTION_TRANSFER_STREAMS),
				deflate64,
				format: registeredCodec ? registeredCodec.format : void 0,
				codecURI: registeredCodec ? registeredCodec.codecURI : void 0,
				compressionMethod,
				rawBitFlag,
				checkPasswordOnly
			},
			config,
			streamOptions: {
				signal,
				size,
				onstart,
				onprogress,
				onend
			}
		};
		if (checkOverlappingEntry) await detectOverlappingEntry({
			reader,
			fileEntry,
			index,
			offset: localHeaderOffset,
			crc32,
			compressedSize,
			uncompressedSize,
			dataOffset,
			dataDescriptor: dataDescriptor || localDirectory.bitFlag.dataDescriptor,
			extraFieldZip64: extraFieldZip64 || localDirectory.extraFieldZip64,
			readRanges
		});
		let writable, abortError, aborted;
		try {
			if (!checkOverlappingEntryOnly) {
				if (checkPasswordOnly) writer = new WritableStream();
				writer = new GenericWriter(writer);
				await initStream(writer, getDecodableOutputSize(outputSize, compressedSize, compressed));
				({writable} = writer);
				const { outputSize: writtenSize } = await runWorker({
					readable: toCompatibleReadable(reader.createReadable({
						offset: dataOffset,
						size
					})),
					writable
				}, workerOptions);
				if (writtenSize != outputSize) throw Object.assign(new Error(ERR_INVALID_UNCOMPRESSED_SIZE), { outputSize: writtenSize });
				writer.size += writtenSize;
			}
		} catch (error) {
			const { outputSize: failedOutputSize } = workerOptions;
			if (failedOutputSize !== void 0) writer.size += failedOutputSize;
			else if (isErrorObject(error) && error.outputSize !== void 0) writer.size += error.outputSize;
			if (!checkPasswordOnly || !isErrorObject(error) || error.message != "zipjs-abort-check-password") {
				abortError = error;
				aborted = true;
				throw error;
			}
		} finally {
			if (!(!ownsWritable(writer) && getOptionValue$1(zipEntry, options, "preventClose")) && writable && !writable.locked) {
				const writableWriter = writable.getWriter();
				if (aborted) try {
					await writableWriter.abort(abortError);
				} catch {}
				else await writableWriter.close();
			}
		}
		return checkPasswordOnly || checkOverlappingEntryOnly ? void 0 : writer.getData ? writer.getData() : writable;
	}
};
function detectEncryptedCentralDirectory(directoryView) {
	const maxOffset = Math.min(directoryView.byteLength, 1024) - 3;
	for (let offset = 0; offset < maxOffset; offset++) if (getUint32$1(directoryView, offset) == 134630224) return true;
	return false;
}
function getWrappedFilesLength(directoryView, directoryArray, offset) {
	let wrappedFilesLength = 0;
	while (offset + 46 <= directoryArray.length && getUint32$1(directoryView, offset) == 33639248) {
		offset += 46 + getUint16$1(directoryView, offset + 28) + getUint16$1(directoryView, offset + 30) + getUint16$1(directoryView, offset + 32);
		wrappedFilesLength++;
	}
	return wrappedFilesLength % 65536 ? 0 : wrappedFilesLength;
}
function readDigitalSignature(signatureRecordArray) {
	if (signatureRecordArray.length >= 6) {
		const signatureRecordView = getDataView(signatureRecordArray);
		if (getUint32$1(signatureRecordView, 0) == 84233040) {
			const signatureDataLength = getUint16$1(signatureRecordView, 4);
			if (6 + signatureDataLength <= signatureRecordArray.length) return new Uint8Array(signatureRecordArray.subarray(6, 6 + signatureDataLength));
		}
	}
}
function getEncryptedDirectoryDataLength(directoryEncryptionInfo, declaredDirectoryDataLength, directoryDataLength) {
	const encryptedDirectoryDataLength = directoryEncryptionInfo && directoryEncryptionInfo.compressedSize ? directoryEncryptionInfo.compressedSize : declaredDirectoryDataLength;
	return encryptedDirectoryDataLength > 0 && encryptedDirectoryDataLength <= directoryDataLength ? encryptedDirectoryDataLength : directoryDataLength;
}
function getDirectoryEncryptionInfo(rawExtensibleData) {
	const directoryEncryptionInfo = { rawExtensibleData };
	if (rawExtensibleData.length >= 28) {
		const extensibleDataView = getDataView(rawExtensibleData);
		const hashDataLength = getUint16$1(extensibleDataView, 26);
		Object.assign(directoryEncryptionInfo, {
			compressionMethod: getUint16$1(extensibleDataView, 0),
			compressedSize: getBigUint64(extensibleDataView, 2),
			uncompressedSize: getBigUint64(extensibleDataView, 10),
			encryptionAlgorithm: getUint16$1(extensibleDataView, 18),
			bitLength: getUint16$1(extensibleDataView, 20),
			flags: getUint16$1(extensibleDataView, 22),
			hashAlgorithm: getUint16$1(extensibleDataView, 24),
			hashData: rawExtensibleData.subarray(28, 28 + hashDataLength)
		});
	}
	return directoryEncryptionInfo;
}
function readCommonHeader(directory, dataView, offset) {
	const rawBitFlag = directory.rawBitFlag = getUint16$1(dataView, offset + 2);
	const encrypted = (rawBitFlag & 1) == 1;
	const rawLastModDate = getUint32$1(dataView, offset + 6);
	Object.assign(directory, {
		encrypted,
		version: getUint16$1(dataView, offset),
		bitFlag: {
			level: (rawBitFlag & 6) >> 1,
			dataDescriptor: (rawBitFlag & 8) == 8,
			languageEncodingFlag: (rawBitFlag & BITFLAG_LANG_ENCODING_FLAG) == BITFLAG_LANG_ENCODING_FLAG
		},
		rawLastModDate,
		lastModDate: getDate(rawLastModDate),
		filenameLength: getUint16$1(dataView, offset + 22),
		extraFieldLength: getUint16$1(dataView, offset + 24)
	});
}
function readCommonFooter(fileEntry, directory, dataView, offset, localDirectory) {
	const { rawExtraField } = directory;
	const extraField = directory.extraField = /* @__PURE__ */ new Map();
	const rawExtraFieldView = getDataView(rawExtraField);
	let offsetExtraField = 0;
	let malformedExtraField = false;
	try {
		while (offsetExtraField < rawExtraField.length) {
			const type = getUint16$1(rawExtraFieldView, offsetExtraField);
			const size = getUint16$1(rawExtraFieldView, offsetExtraField + 2);
			extraField.set(type, {
				type,
				data: rawExtraField.slice(offsetExtraField + 4, offsetExtraField + 4 + size)
			});
			offsetExtraField += 4 + size;
		}
	} catch {
		malformedExtraField = true;
	}
	if (offsetExtraField > rawExtraField.length) malformedExtraField = true;
	const compressionMethod = getUint16$1(dataView, offset + 4);
	Object.assign(directory, {
		signature: getUint32$1(dataView, offset + 10),
		crc32: getUint32$1(dataView, offset + 10),
		compressedSize: getUint32$1(dataView, offset + 14),
		uncompressedSize: getUint32$1(dataView, offset + 18)
	});
	const extraFieldZip64 = extraField.get(1);
	if (extraFieldZip64) {
		readExtraFieldZip64(extraFieldZip64, directory);
		directory.extraFieldZip64 = extraFieldZip64;
	}
	const extraFieldUnicodePath = extraField.get(EXTRAFIELD_TYPE_UNICODE_PATH);
	if (extraFieldUnicodePath) {
		readExtraFieldUnicode(extraFieldUnicodePath, PROPERTY_NAME_FILENAME, PROPERTY_NAME_RAW_FILENAME, directory, fileEntry);
		directory.extraFieldUnicodePath = extraFieldUnicodePath;
	}
	const extraFieldUnicodeComment = extraField.get(EXTRAFIELD_TYPE_UNICODE_COMMENT);
	if (extraFieldUnicodeComment) {
		readExtraFieldUnicode(extraFieldUnicodeComment, PROPERTY_NAME_COMMENT, PROPERTY_NAME_RAW_COMMENT, directory, fileEntry);
		directory.extraFieldUnicodeComment = extraFieldUnicodeComment;
	}
	const extraFieldAES = extraField.get(EXTRAFIELD_TYPE_AES);
	if (extraFieldAES && extraFieldAES.data.length >= 7) {
		readExtraFieldAES(extraFieldAES, directory, compressionMethod);
		directory.extraFieldAES = extraFieldAES;
	} else directory.compressionMethod = compressionMethod;
	const extraFieldPkwareUnix = extraField.get(13);
	if (extraFieldPkwareUnix) {
		readExtraFieldUnixDates(extraFieldPkwareUnix, directory);
		directory.extraFieldPkwareUnix = extraFieldPkwareUnix;
	}
	const extraFieldUnixType1 = extraField.get(EXTRAFIELD_TYPE_UNIX_TYPE1);
	if (extraFieldUnixType1) {
		readExtraFieldUnixDates(extraFieldUnixType1, directory);
		directory.extraFieldUnixType1 = extraFieldUnixType1;
	}
	const extraFieldNTFS = extraField.get(10);
	if (extraFieldNTFS) {
		readExtraFieldNTFS(extraFieldNTFS, directory);
		directory.extraFieldNTFS = extraFieldNTFS;
	}
	const extraFieldUnix = extraField.get(EXTRAFIELD_TYPE_UNIX);
	let unixIdsRead;
	if (extraFieldUnix) {
		unixIdsRead = readExtraFieldUnix(extraFieldUnix, directory, false);
		directory.extraFieldUnix = extraFieldUnix;
	}
	if (!unixIdsRead) {
		const extraFieldInfoZip = extraField.get(EXTRAFIELD_TYPE_INFOZIP);
		if (extraFieldInfoZip) {
			readExtraFieldUnix(extraFieldInfoZip, directory, true);
			directory.extraFieldInfoZip = extraFieldInfoZip;
		}
	}
	const extraFieldExtendedTimestamp = extraField.get(EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP);
	if (extraFieldExtendedTimestamp) {
		readExtraFieldExtendedTimestamp(extraFieldExtendedTimestamp, directory, localDirectory);
		directory.extraFieldExtendedTimestamp = extraFieldExtendedTimestamp;
	}
	const extraFieldUSDZ = extraField.get(EXTRAFIELD_TYPE_USDZ);
	if (extraFieldUSDZ) directory.extraFieldUSDZ = extraFieldUSDZ;
	return malformedExtraField;
}
function readExtraFieldZip64(extraFieldZip64, directory) {
	directory.zip64 = true;
	const extraFieldView = getDataView(extraFieldZip64.data);
	const missingProperties = ZIP64_PROPERTIES.filter(([propertyName, max]) => directory[propertyName] == max);
	const requiredLength = missingProperties.reduce((length, [, max]) => length + ZIP64_EXTRACTION[max].bytes, 0);
	if (extraFieldZip64.data.length < requiredLength) throw new Error(ERR_EXTRAFIELD_ZIP64_NOT_FOUND);
	for (let indexMissingProperty = 0, offset = 0; indexMissingProperty < missingProperties.length; indexMissingProperty++) {
		const [propertyName, max] = missingProperties[indexMissingProperty];
		const extraction = ZIP64_EXTRACTION[max];
		directory[propertyName] = extraFieldZip64[propertyName] = extraction.getValue(extraFieldView, offset);
		offset += extraction.bytes;
	}
}
function readExtraFieldUnicode(extraFieldUnicode, propertyName, rawPropertyName, directory, fileEntry) {
	if (extraFieldUnicode.data.length < 5) {
		extraFieldUnicode.valid = false;
		return;
	}
	const extraFieldView = getDataView(extraFieldUnicode.data);
	const computedCrc32 = new Crc32();
	computedCrc32.append(fileEntry[rawPropertyName]);
	const computedCrc32View = getDataView(/* @__PURE__ */ new Uint8Array(4));
	computedCrc32View.setUint32(0, computedCrc32.get(), true);
	const nameCrc32 = getUint32$1(extraFieldView, 1);
	const version = getUint8(extraFieldView, 0);
	Object.assign(extraFieldUnicode, {
		version,
		[propertyName]: decodeText(extraFieldUnicode.data.subarray(5)),
		valid: version == 1 && !fileEntry.bitFlag.languageEncodingFlag && nameCrc32 == getUint32$1(computedCrc32View, 0)
	});
	if (extraFieldUnicode.valid) {
		directory[propertyName] = extraFieldUnicode[propertyName];
		directory[propertyName + PROPERTY_NAME_UTF8_SUFFIX] = true;
	}
}
function readExtraFieldAES(extraFieldAES, directory, compressionMethod) {
	const extraFieldView = getDataView(extraFieldAES.data);
	const strength = getUint8(extraFieldView, 4);
	Object.assign(extraFieldAES, {
		vendorVersion: getUint8(extraFieldView, 0),
		vendorId: getUint8(extraFieldView, 2),
		strength,
		originalCompressionMethod: compressionMethod,
		compressionMethod: getUint16$1(extraFieldView, 5)
	});
	directory.compressionMethod = extraFieldAES.compressionMethod;
	if (extraFieldAES.vendorVersion != VENDOR_VERSION_AE_1$1) directory.crc32 = void 0;
}
function readExtraFieldNTFS(extraFieldNTFS, directory) {
	const extraFieldView = getDataView(extraFieldNTFS.data);
	let offsetExtraField = 4;
	let tag1Data;
	try {
		while (offsetExtraField < extraFieldNTFS.data.length && !tag1Data) {
			const tagValue = getUint16$1(extraFieldView, offsetExtraField);
			const attributeSize = getUint16$1(extraFieldView, offsetExtraField + 2);
			if (tagValue == 1) tag1Data = extraFieldNTFS.data.slice(offsetExtraField + 4, offsetExtraField + 4 + attributeSize);
			offsetExtraField += 4 + attributeSize;
		}
	} catch {}
	if (tag1Data && tag1Data.length == 24) {
		const tag1View = getDataView(tag1Data);
		const rawLastModDate = tag1View.getBigUint64(0, true);
		const rawLastAccessDate = tag1View.getBigUint64(8, true);
		const rawCreationDate = tag1View.getBigUint64(16, true);
		Object.assign(extraFieldNTFS, {
			rawLastModDate,
			rawLastAccessDate,
			rawCreationDate
		});
		const extraFieldData = {
			lastModDate: getDateNTFS(rawLastModDate),
			lastAccessDate: getDateNTFS(rawLastAccessDate),
			creationDate: getDateNTFS(rawCreationDate)
		};
		Object.assign(extraFieldNTFS, extraFieldData);
		Object.assign(directory, extraFieldData, {
			rawLastAccessDate,
			rawCreationDate
		});
	}
}
function readExtraFieldUnixDates(extraField, directory) {
	if (extraField.data.length < 8) return;
	const extraFieldView = getDataView(extraField.data);
	const extraFieldData = {
		lastAccessDate: /* @__PURE__ */ new Date((getUint32$1(extraFieldView, 0) | 0) * 1e3),
		lastModDate: /* @__PURE__ */ new Date((getUint32$1(extraFieldView, 4) | 0) * 1e3)
	};
	if (extraField.data.length >= 12) {
		extraFieldData.uid = getUint16$1(extraFieldView, 8);
		extraFieldData.gid = getUint16$1(extraFieldView, 10);
	}
	Object.assign(extraField, extraFieldData);
	Object.assign(directory, extraFieldData);
}
function readExtraFieldUnix(extraField, directory, isInfoZip) {
	try {
		const view = getDataView(extraField.data);
		let uid, gid;
		if (isInfoZip) {
			let offset = 0;
			const version = getUint8(view, offset++);
			const uidSize = getUint8(view, offset++);
			uid = unpackUnixId(extraField.data.subarray(offset, offset + uidSize));
			offset += uidSize;
			const gidSize = getUint8(view, offset++);
			gid = unpackUnixId(extraField.data.subarray(offset, offset + gidSize));
			Object.assign(extraField, {
				version,
				uid,
				gid
			});
		} else if (extraField.data.length >= 4) {
			uid = getUint16$1(view, 0);
			gid = getUint16$1(view, 2);
			Object.assign(extraField, {
				uid,
				gid
			});
		}
		if (uid !== void 0) directory.uid = uid;
		if (gid !== void 0) directory.gid = gid;
		return uid !== void 0 || gid !== void 0;
	} catch {}
}
function unpackUnixId(bytes) {
	const buffer = /* @__PURE__ */ new Uint8Array(4);
	buffer.set(bytes, 0);
	return new DataView(buffer.buffer, buffer.byteOffset, 4).getUint32(0, true);
}
function readExtraFieldExtendedTimestamp(extraFieldExtendedTimestamp, directory, localDirectory) {
	if (!extraFieldExtendedTimestamp.data.length) return;
	const extraFieldView = getDataView(extraFieldExtendedTimestamp.data);
	const flags = getUint8(extraFieldView, 0);
	const timeProperties = [];
	const timeRawProperties = [];
	if (localDirectory) {
		if ((flags & 1) == 1) {
			timeProperties.push(PROPERTY_NAME_LAST_MODIFICATION_DATE);
			timeRawProperties.push(PROPERTY_NAME_RAW_LAST_MODIFICATION_DATE);
		}
		if ((flags & 2) == 2) {
			timeProperties.push(PROPERTY_NAME_LAST_ACCESS_DATE);
			timeRawProperties.push(PROPERTY_NAME_RAW_LAST_ACCESS_DATE);
		}
		if ((flags & 4) == 4) {
			timeProperties.push(PROPERTY_NAME_CREATION_DATE);
			timeRawProperties.push(PROPERTY_NAME_RAW_CREATION_DATE);
		}
	} else if (extraFieldExtendedTimestamp.data.length >= 5) {
		timeProperties.push(PROPERTY_NAME_LAST_MODIFICATION_DATE);
		timeRawProperties.push(PROPERTY_NAME_RAW_LAST_MODIFICATION_DATE);
	}
	let offset = 1;
	timeProperties.forEach((propertyName, indexProperty) => {
		if (extraFieldExtendedTimestamp.data.length >= offset + 4) {
			const time = getUint32$1(extraFieldView, offset);
			directory[propertyName] = extraFieldExtendedTimestamp[propertyName] = /* @__PURE__ */ new Date((time | 0) * 1e3);
			const rawPropertyName = timeRawProperties[indexProperty];
			extraFieldExtendedTimestamp[rawPropertyName] = time;
		}
		offset += 4;
	});
}
async function detectOverlappingEntry({ reader, fileEntry, index, offset, crc32, compressedSize, uncompressedSize, dataOffset, dataDescriptor, extraFieldZip64, readRanges }) {
	let dataDescriptorLength = 0;
	if (dataDescriptor) {
		if (extraFieldZip64) dataDescriptorLength = 20;
		else dataDescriptorLength = 12;
	}
	if (dataDescriptorLength) {
		const dataDescriptorArray = await readUint8Array(reader, dataOffset + compressedSize, dataDescriptorLength + 4);
		const dataDescriptorView = getDataView(dataDescriptorArray);
		let signature = dataDescriptorArray.length == dataDescriptorLength + 4 && getUint32$1(dataDescriptorView, 0) == 134695760;
		if (signature) {
			const signedDataDescriptor = readDataDescriptor(dataDescriptorView, 4, extraFieldZip64);
			if ((fileEntry.encrypted && !fileEntry.zipCrypto || signedDataDescriptor.crc32 == crc32) && signedDataDescriptor.compressedSize == compressedSize && signedDataDescriptor.uncompressedSize == uncompressedSize) dataDescriptorLength += 4;
			else signature = false;
		}
		if (dataDescriptorArray.length >= dataDescriptorLength) {
			const localDataDescriptor = readDataDescriptor(dataDescriptorView, signature ? 4 : 0, extraFieldZip64);
			localDataDescriptor.signature = signature;
			fileEntry.localDirectory.dataDescriptor = localDataDescriptor;
		}
	}
	const range = {
		start: offset,
		end: dataOffset + compressedSize + dataDescriptorLength,
		fileEntry
	};
	const { indexes, sortedRanges, pendingRanges } = readRanges;
	if (!indexes.has(index)) {
		const overlappingRange = findOverlappingRange(sortedRanges, range) || pendingRanges.find((otherRange) => rangesOverlap(range, otherRange));
		if (overlappingRange) {
			const error = /* @__PURE__ */ new Error(ERR_OVERLAPPING_ENTRY);
			error.overlappingEntry = overlappingRange.fileEntry;
			throw error;
		}
		indexes.add(index);
		pendingRanges.push(range);
		if (pendingRanges.length * pendingRanges.length > sortedRanges.length) {
			pendingRanges.sort((range, otherRange) => range.start - otherRange.start);
			readRanges.sortedRanges = mergeRanges(sortedRanges, pendingRanges);
			pendingRanges.length = 0;
		}
	}
}
function findOverlappingRange(sortedRanges, range) {
	let low = 0;
	let high = sortedRanges.length;
	while (low < high) {
		const middle = low + high >>> 1;
		if (sortedRanges[middle].start < range.start) low = middle + 1;
		else high = middle;
	}
	const previousRange = sortedRanges[low - 1];
	const nextRange = sortedRanges[low];
	if (previousRange && rangesOverlap(range, previousRange)) return previousRange;
	if (nextRange && rangesOverlap(range, nextRange)) return nextRange;
}
function rangesOverlap(range, otherRange) {
	return range.start < otherRange.end && otherRange.start < range.end;
}
function mergeRanges(sortedRanges, pendingRanges) {
	const mergedRanges = [];
	let indexSorted = 0;
	let indexPending = 0;
	while (indexSorted < sortedRanges.length || indexPending < pendingRanges.length) if (indexPending == pendingRanges.length || indexSorted < sortedRanges.length && sortedRanges[indexSorted].start < pendingRanges[indexPending].start) mergedRanges.push(sortedRanges[indexSorted++]);
	else mergedRanges.push(pendingRanges[indexPending++]);
	return mergedRanges;
}
function readDataDescriptor(dataDescriptorView, offset, extraFieldZip64) {
	const crc32 = getUint32$1(dataDescriptorView, offset);
	let compressedSize;
	let uncompressedSize;
	if (extraFieldZip64) {
		compressedSize = getBigUint64(dataDescriptorView, offset + 4);
		uncompressedSize = getBigUint64(dataDescriptorView, offset + 12);
	} else {
		compressedSize = getUint32$1(dataDescriptorView, offset + 4);
		uncompressedSize = getUint32$1(dataDescriptorView, offset + 8);
	}
	return {
		crc32,
		compressedSize,
		uncompressedSize
	};
}
function getDiskOffset$1(reader, diskNumber) {
	return reader.getDiskOffset ? reader.getDiskOffset(diskNumber) : 0;
}
async function startsWithSplitZipSignature$1(reader) {
	return await getFirstSignature(reader) == SPLIT_ZIP_FILE_SIGNATURE;
}
async function startsWithSplitZipMarker(reader) {
	const signature = await getFirstSignature(reader);
	return signature == 134695760 || signature == 808471376;
}
async function getFirstSignature(reader) {
	return getUint32$1(getDataView(await readUint8Array(reader, 0, 4)));
}
function isStrictnessValue(value) {
	return value === "strict" || value === "balanced" || value === "tolerant";
}
function getDecodableOutputSize(outputSize, compressedSize, compressed) {
	return Math.min(outputSize, compressed ? compressedSize * MAX_DEFLATE_EXPANSION_RATIO : compressedSize);
}
function getStrictness(options, inheritedOptions) {
	return resolveStrictness(options, resolveStrictness(inheritedOptions, STRICTNESS_BALANCED));
}
function resolveStrictness(options, inheritedStrictness) {
	const strictness = options[OPTION_STRICTNESS];
	if (strictness !== void 0) {
		if (!isStrictnessValue(strictness)) throw new Error(ERR_INVALID_STRICTNESS);
		return strictness;
	}
	const checkAmbiguity = options[OPTION_CHECK_AMBIGUITY];
	if (checkAmbiguity === void 0) return inheritedStrictness;
	if (checkAmbiguity) return STRICTNESS_STRICT;
	return inheritedStrictness == "tolerant" ? STRICTNESS_TOLERANT : STRICTNESS_BALANCED;
}
function getCheckLocalDirectory(checkLocalDirectory, strictness) {
	if (checkLocalDirectory === void 0) return strictness != STRICTNESS_TOLERANT;
	return Boolean(checkLocalDirectory);
}
function getCheckLocalFilename(checkLocalFilename, strictness) {
	if (checkLocalFilename === void 0) return strictness == STRICTNESS_STRICT;
	return Boolean(checkLocalFilename);
}
function getFilenameValidation(filenameValidation, strictness) {
	if (filenameValidation === void 0) return strictness;
	if (!isStrictnessValue(filenameValidation)) throw new Error(ERR_INVALID_FILENAME_VALIDATION);
	return filenameValidation;
}
function isUnsafeFilename(filename, filenameValidation) {
	if (filenameValidation == "tolerant") return false;
	const pathParts = filename.split("/");
	if (pathParts.length > 1 && pathParts[pathParts.length - 1] === "") pathParts.pop();
	if (PARENT_DIRECTORY_REGEXP.test(filename) || filename.startsWith("/") || filename.startsWith("\\") || DRIVE_LETTER_REGEXP.test(filename)) return true;
	return filenameValidation == "strict" && (pathParts.includes(".") || pathParts.includes("") || filename.includes("\0"));
}
function getMaxAppendedDataSize(maxAppendedDataSize, strictness) {
	if (maxAppendedDataSize !== void 0) {
		const size = toNumber(maxAppendedDataSize);
		if (typeof size != "number" || Number.isNaN(size) || size < 0) throw new Error(ERR_INVALID_MAX_APPENDED_DATA_SIZE);
		return size;
	}
	if (strictness == "strict") return 0;
	if (strictness == "tolerant") return Infinity;
	return MAX_16_BITS;
}
async function findEndOfCentralDirectory(reader, rejectAmbiguous, maxAppendedDataSize) {
	const { size } = reader;
	const anchoredLength = Math.min(size, 22 + MAX_16_BITS);
	const remoteProbeBudget = { count: MAX_END_OF_CENTRAL_DIR_PROBES };
	let endOfDirectoryInfo;
	let plausibleEndOfDirectoryInfo;
	let endOfDirectoryReachingEndCount = 0;
	for await (const [anchoredView, anchoredOffset, anchoredArray, indexByte, offset] of scanEndOfCentralDirectory(reader, anchoredLength)) {
		const commentLength = getUint16$1(anchoredView, indexByte + 20);
		if (offset + 22 + commentLength == size) {
			const reachability = await getCentralDirectoryReachability(reader, anchoredView, anchoredOffset, indexByte, offset, size, remoteProbeBudget);
			if (reachability == CENTRAL_DIRECTORY_REACHABLE) {
				if (!endOfDirectoryInfo) endOfDirectoryInfo = getEndOfCentralDirectoryInfo(anchoredArray, indexByte, offset);
				endOfDirectoryReachingEndCount++;
				if (!rejectAmbiguous || endOfDirectoryReachingEndCount > 1) break;
			} else if (reachability == CENTRAL_DIRECTORY_PLAUSIBLE && !plausibleEndOfDirectoryInfo) plausibleEndOfDirectoryInfo = getEndOfCentralDirectoryInfo(anchoredArray, indexByte, offset);
		}
	}
	if (!endOfDirectoryInfo) endOfDirectoryInfo = plausibleEndOfDirectoryInfo;
	if (!endOfDirectoryInfo) endOfDirectoryInfo = await seekEndOfCentralDirectory(reader, maxAppendedDataSize, remoteProbeBudget);
	return {
		endOfDirectoryInfo,
		endOfDirectoryReachingEndCount
	};
}
async function seekEndOfCentralDirectory(reader, maxAppendedDataSize, remoteProbeBudget) {
	const { size } = reader;
	const searchLength = Math.min(size, maxAppendedDataSize == Infinity ? size : 22 + MAX_16_BITS + maxAppendedDataSize);
	let firstSignatureInfo, plausibleInfo;
	for await (const [searchView, searchOffset, searchArray, indexByte, offset] of scanEndOfCentralDirectory(reader, searchLength)) {
		const record = getEndOfCentralDirectoryInfo(searchArray, indexByte, offset);
		if (!firstSignatureInfo) firstSignatureInfo = record;
		const reachability = await getCentralDirectoryReachability(reader, searchView, searchOffset, indexByte, offset, size, remoteProbeBudget);
		if (reachability == CENTRAL_DIRECTORY_REACHABLE) return record;
		if (reachability == CENTRAL_DIRECTORY_PLAUSIBLE && !plausibleInfo) plausibleInfo = record;
	}
	return plausibleInfo || firstSignatureInfo;
}
async function* scanEndOfCentralDirectory(reader, scanLength) {
	const scanOffset = reader.size - scanLength;
	const scanArray = await readUint8Array(reader, scanOffset, scanLength);
	const scanView = getDataView(scanArray);
	for (let indexByte = scanArray.length - 22; indexByte >= 0; indexByte--) if (getUint32$1(scanView, indexByte) == 101010256) yield [
		scanView,
		scanOffset,
		scanArray,
		indexByte,
		scanOffset + indexByte
	];
}
function getEndOfCentralDirectoryInfo(scanArray, indexByte, offset) {
	return {
		offset,
		buffer: new Uint8Array(scanArray.subarray(indexByte, indexByte + 22)).buffer
	};
}
async function getCentralDirectoryReachability(reader, view, anchoredOffset, indexByte, offset, size, remoteProbeBudget) {
	const filesLength = getUint16$1(view, indexByte + 10);
	const directoryDataLength = getUint32$1(view, indexByte + 12);
	const directoryDataOffset = getUint32$1(view, indexByte + 16);
	if (filesLength == 65535 || directoryDataLength == 4294967295 || directoryDataOffset == 4294967295) return await readSignature(reader, view, anchoredOffset, offset - 20, size, remoteProbeBudget) == 117853008 ? CENTRAL_DIRECTORY_REACHABLE : CENTRAL_DIRECTORY_UNREACHABLE;
	if (!filesLength && !directoryDataLength) return CENTRAL_DIRECTORY_PLAUSIBLE;
	const directoryDiskNumber = getUint16$1(view, indexByte + 6);
	for (const centralDirectoryOffset of [offset - directoryDataLength, getDiskOffset$1(reader, directoryDiskNumber) + directoryDataOffset]) if (await readSignature(reader, view, anchoredOffset, centralDirectoryOffset, size, remoteProbeBudget) == 33639248) return CENTRAL_DIRECTORY_REACHABLE;
	return CENTRAL_DIRECTORY_UNREACHABLE;
}
async function readSignature(reader, view, anchoredOffset, signatureOffset, size, remoteProbeBudget) {
	if (signatureOffset < 0 || signatureOffset + 4 > size) return void 0;
	if (signatureOffset >= anchoredOffset) return getUint32$1(view, signatureOffset - anchoredOffset);
	if (remoteProbeBudget.count > 0) {
		remoteProbeBudget.count--;
		return getUint32$1(getDataView(await readUint8Array(reader, signatureOffset, 4)), 0);
	}
}
function validateLocalDirectory(zipEntry, localDirectory, rawLocalFilename, checkLocalFilename, warnings) {
	const { rawFilename } = zipEntry;
	const reject = !warnings;
	const maskedLocalDirectory = zipEntry.decryptedDirectory && (localDirectory.rawBitFlag & 8192) == 8192;
	if (checkLocalFilename && !maskedLocalDirectory && (rawLocalFilename.length != rawFilename.length || rawLocalFilename.some((byteValue, indexByte) => byteValue != rawFilename[indexByte]))) reportAmbiguity(reject, warnings, WARNING_MISMATCHED_LOCAL_FILE_HEADER_FILENAME);
	if ((localDirectory.rawBitFlag & BITFLAG_AMBIGUITY_MASK) != (zipEntry.rawBitFlag & BITFLAG_AMBIGUITY_MASK)) reportAmbiguity(reject, warnings, WARNING_MISMATCHED_LOCAL_FILE_HEADER_BIT_FLAG);
	if (localDirectory.compressionMethod != zipEntry.compressionMethod) reportAmbiguity(reject, warnings, WARNING_MISMATCHED_LOCAL_FILE_HEADER_COMPRESSION_METHOD);
	if (!localDirectory.bitFlag.dataDescriptor && !maskedLocalDirectory && (localDirectory.crc32 || localDirectory.compressedSize || localDirectory.uncompressedSize) && (localDirectory.crc32 != zipEntry.crc32 || localDirectory.compressedSize != zipEntry.compressedSize || localDirectory.uncompressedSize != zipEntry.uncompressedSize)) reportAmbiguity(reject, warnings, WARNING_MISMATCHED_LOCAL_FILE_HEADER_CRC32_OR_SIZES);
}
function reportAmbiguity(reject, warnings, reason) {
	if (reject) throwAmbiguousArchive(reason);
	else addWarning(warnings, reason);
}
function throwAmbiguousArchive(reason) {
	const error = /* @__PURE__ */ new Error(ERR_AMBIGUOUS_ARCHIVE);
	error.reason = reason;
	throw error;
}
function getOptionValue$1(zipReader, options, name) {
	return options[name] === void 0 ? zipReader.options[name] : options[name];
}
function getFunctionOptionValue$1(zipReader, options, name) {
	return checkFunctionOption(getOptionValue$1(zipReader, options, name));
}
function getDate(timeRaw) {
	const date = (timeRaw & 4294901760) >> 16, time = timeRaw & MAX_16_BITS;
	const result = new Date(1980 + ((date & 65024) >> 9), ((date & 480) >> 5) - 1, date & 31, (time & 63488) >> 11, (time & 2016) >> 5, (time & 31) * 2, 0);
	return result < MIN_DATE ? MIN_DATE : result;
}
function getDateNTFS(timeRaw) {
	return new Date(Number(timeRaw / BigInt(1e4) - BigInt(0xa9730b66800)));
}
function getUint8(view, offset) {
	return view.getUint8(offset);
}
function getUint16$1(view, offset) {
	return view.getUint16(offset, true);
}
function getUint32$1(view, offset) {
	return view.getUint32(offset, true);
}
function getBigUint64(view, offset) {
	const value = view.getBigUint64(offset, true);
	if (value > MAX_SAFE_UINT64) throw new Error(ERR_UNSUPPORTED_UINT64);
	return Number(value);
}
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/zip-writer.js
var ERR_DUPLICATED_NAME = "File already exists";
var ERR_INVALID_COMMENT = "Zip file comment exceeds 64KB";
var ERR_INVALID_COMMENT_TYPE = "Invalid zip file comment (must be a Uint8Array)";
var ERR_INVALID_ENTRY_COMMENT = "File entry comment exceeds 64KB";
var ERR_INVALID_ENTRY_COMMENT_TYPE = "Invalid file entry comment (must be a string)";
var ERR_INVALID_DATE = "Invalid date (must be a valid Date instance)";
var ERR_INVALID_ENTRY_NAME = "File entry name exceeds 64KB";
var ERR_INVALID_VERSION = "Version exceeds 65535";
var ERR_INVALID_ENCRYPTION_STRENGTH = "The strength must equal 1, 2, or 3";
var ERR_UNSUPPORTED_ENCRYPTION_USDZ = "Encryption is not supported in USDZ files";
var ERR_UNSUPPORTED_SPLIT_USDZ = "Split zip files are not supported in USDZ files";
var ERR_UNSUPPORTED_ENCRYPTION_PASS_THROUGH = "Encryption is not supported when the 'passThrough' option is set to true (use 'compressed' instead)";
var ERR_INVALID_EXTRAFIELD = "Invalid extra field (must be a Map)";
var ERR_INVALID_EXTRAFIELD_TYPE = "Invalid extra field type (must be integer 0..65535)";
var ERR_INVALID_EXTRAFIELD_DATA_TYPE = "Invalid extra field data (must be a Uint8Array)";
var ERR_INVALID_EXTRAFIELD_DATA = "Extra field data exceeds 64KB";
var MIN_UNIX_TIME = -2147483648;
var MAX_UNIX_TIME = 2147483647;
var MIN_NTFS_TIME = BigInt(0);
var MAX_NTFS_TIME = BigInt("0x7fffffffffffffff");
var ERR_UNSUPPORTED_FORMAT = "Zip64 is not supported (set the 'zip64' option to 'true')";
var ERR_UNDEFINED_UNCOMPRESSED_SIZE = "Undefined uncompressed size";
var ERR_UNDEFINED_COMPRESSION_METHOD = "Undefined compression method";
var ERR_UNDEFINED_CRC32 = "Undefined CRC32";
var ERR_UNDEFINED_READER = "Undefined reader";
var ERR_INVALID_READER = "Invalid reader (must be a Reader instance, a ReadableStream instance, or an object with a 'readable' property)";
var ERR_ZIP_NOT_EMPTY = "Zip file not empty";
var ERR_INVALID_UID = "Invalid uid (must be integer 0..2^32-1)";
var ERR_INVALID_GID = "Invalid gid (must be integer 0..2^32-1)";
var ERR_INVALID_UNIX_MODE = "Invalid UNIX mode (must be integer 0..65535)";
var ERR_INVALID_UNIX_EXTRA_FIELD_TYPE = "Invalid unixExtraFieldType (must be 'infozip' or 'unix')";
var ERR_INVALID_UNIX_ID_SIZE = "uid/gid must be 0..65535 for unixExtraFieldType 'unix' (use 'infozip' for larger ids)";
var ERR_INVALID_MSDOS_ATTRIBUTES = "Invalid msdosAttributesRaw (must be integer 0..255)";
var ERR_INVALID_MSDOS_DATA = "Invalid msdosAttributes (must be an object with boolean flags)";
var ERR_INVALID_LEVEL = "Invalid level (must be integer 0..9)";
var ERR_INVALID_SIGNATURE_DATA = "Signature data exceeds 64KB";
var ERR_INVALID_ENTRY = "Invalid entry option (must be an entry returned by ZipReader#getEntries())";
var ERR_ZIP_CRYPTO_LAST_MOD_DATE = "The last modification date of an entry encrypted with ZipCrypto cannot be changed when passThrough is set";
var WARNING_COMPRESSION_UNAVAILABLE = "compression unavailable";
var WARNING_CLAMPED_LAST_MODIFICATION_DATE = "clamped last modification date";
var EXTRAFIELD_DATA_AES = new Uint8Array([
	7,
	0,
	2,
	0,
	65,
	69,
	3,
	0,
	0
]);
var EXTRAFIELD_OFFSET_AES_VENDOR_VERSION = 4;
var EXTRAFIELD_OFFSET_AES_COMPRESSION_METHOD = 9;
var EXTRAFIELD_USDZ_MAX_LENGTH = 67;
var MIN_PRINTABLE_ASCII_CHARACTER_CODE = 32;
var MAX_PRINTABLE_ASCII_CHARACTER_CODE = 126;
var VENDOR_VERSION_AE_1 = 1;
var INFOZIP_EXTRA_FIELD_TYPE = "infozip";
var UNIX_EXTRA_FIELD_TYPE = "unix";
var LEVEL_BY_BITFLAG_LEVEL = [
	8,
	9,
	5,
	3
];
var MAX_LEVEL = 9;
var workers = 0;
var pendingEntries = [];
var ZipWriter = class {
	constructor(writer, options = {}) {
		writer = new GenericWriter(writer);
		const { availableSize = INFINITY_VALUE, maxSize = INFINITY_VALUE } = writer;
		const addSplitZipSignature = availableSize > 0 && availableSize !== Infinity && maxSize > 0 && maxSize !== Infinity;
		if (addSplitZipSignature && options["usdz"]) throw new Error(ERR_UNSUPPORTED_SPLIT_USDZ);
		Object.assign(this, {
			writer,
			addSplitZipSignature,
			options,
			fileEntries: /* @__PURE__ */ new Map(),
			filenames: /* @__PURE__ */ new Set(),
			offset: options["offset"] === void 0 ? writer.size || writer.writable.size || 0 : options[OPTION_OFFSET],
			initialOffset: options["offset"] === void 0 ? 0 : options[OPTION_OFFSET] - (writer.size || writer.writable.size || 0),
			pendingAddFileCalls: /* @__PURE__ */ new Set(),
			pendingErrors: [],
			warnings: [],
			bufferedWrites: 0,
			directWrites: 0,
			lastFileEntry: void 0,
			archiveClosed: false
		});
	}
	prependZip(reader) {
		return watchPromiseError(this, prependZipEntries(this, reader));
	}
	appendZip(reader) {
		return watchPromiseError(this, this.appendZipEntries(reader));
	}
	async appendZipEntries(reader) {
		const zipWriter = this;
		const { pendingAddFileCalls, filenames, fileEntries } = zipWriter;
		while (pendingAddFileCalls.size) await Promise.allSettled(Array.from(pendingAddFileCalls));
		let resolveAppendZip;
		const promiseAppendZip = new Promise((resolve) => resolveAppendZip = resolve);
		pendingAddFileCalls.add(promiseAppendZip);
		const appendedFilenames = [];
		let releaseLockWriter;
		try {
			reader = new GenericReader(reader);
			await initStream(reader);
			if (reader.size === void 0 || !reader.readUint8Array) {
				reader = new BlobReader(await streamToBlob(reader.readable));
				await initStream(reader);
			}
			const { ZipReader } = await Promise.resolve().then(() => zip_reader_exports);
			const zipReader = new ZipReader(reader);
			const entries = await zipReader.getEntries();
			await zipReader.close();
			await initStream(zipWriter.writer);
			const { directoryOffset } = zipReader;
			entries.forEach(({ filename }) => {
				if (filenames.has(filename)) throw new Error(ERR_DUPLICATED_NAME);
				filenames.add(filename);
				appendedFilenames.push(filename);
			});
			zipWriter.writerLocked = true;
			const { lockWriter } = zipWriter;
			zipWriter.lockWriter = new Promise((resolve) => releaseLockWriter = () => {
				zipWriter.writerLocked = false;
				resolve();
			});
			await lockWriter;
			if (zipWriter.addSplitZipSignature) {
				delete zipWriter.addSplitZipSignature;
				if (!await startsWithSplitZipSignature(reader)) {
					await writeData(zipWriter.writer, getSplitZipSignatureArray());
					zipWriter.offset += 4;
				}
			}
			const entryPositions = await copyZipData(zipWriter, reader, entries, directoryOffset);
			entries.forEach((entry) => {
				const { version, rawLastModDate, rawFilename, bitFlag, encrypted, uncompressedSize, compressedSize, extraFieldZip64 } = entry;
				let { compressionMethod, rawExtraField } = entry;
				const { level, languageEncodingFlag, dataDescriptor } = bitFlag;
				rawExtraField = removeExtraFieldZip64(rawExtraField || EMPTY_UINT8_ARRAY);
				if (entry.extraFieldAES) compressionMethod = 99;
				const extraFieldLength = getLength(rawExtraField);
				const zip64UncompressedSize = Boolean(extraFieldZip64) && extraFieldZip64.uncompressedSize !== void 0;
				const zip64CompressedSize = Boolean(extraFieldZip64) && extraFieldZip64.compressedSize !== void 0;
				const { headerArray, headerView } = getHeaderArrayData({
					version,
					bitFlag: getBitFlag(level, languageEncodingFlag, dataDescriptor, encrypted, compressionMethod) & -7 | level << 1,
					compressionMethod,
					uncompressedSize,
					compressedSize,
					rawLastModDate,
					rawFilename,
					zip64CompressedSize,
					zip64UncompressedSize,
					extraFieldLength
				});
				const { crc32 } = entry;
				if (crc32 !== void 0) setUint32(headerView, 10, crc32);
				const { offset, diskNumberStart } = entryPositions.get(entry);
				Object.assign(entry, {
					zip64Enabled: true,
					zip64UncompressedSize,
					zip64CompressedSize,
					offset,
					diskNumberStart,
					zip64DiskNumberStart: false,
					rawExtraFieldZip64: EMPTY_UINT8_ARRAY,
					rawExtraFieldAES: EMPTY_UINT8_ARRAY,
					rawExtraFieldExtendedTimestamp: EMPTY_UINT8_ARRAY,
					rawExtraFieldNTFS: EMPTY_UINT8_ARRAY,
					rawExtraFieldUnix: EMPTY_UINT8_ARRAY,
					rawExtraField,
					rawCentralExtraField: EMPTY_UINT8_ARRAY,
					headerArray,
					headerView
				});
				fileEntries.set(entry.filename, entry);
			});
		} catch (error) {
			appendedFilenames.forEach((filename) => filenames.delete(filename));
			throw error;
		} finally {
			resolveAppendZip();
			pendingAddFileCalls.delete(promiseAppendZip);
			if (releaseLockWriter) releaseLockWriter();
		}
	}
	add(name = "", reader, options = {}) {
		const zipWriter = this;
		const { pendingAddFileCalls } = zipWriter;
		const promiseAddFile = addFileEntry(zipWriter, name, reader, options);
		pendingAddFileCalls.add(promiseAddFile);
		const deletePendingAddFileCall = () => pendingAddFileCalls.delete(promiseAddFile);
		Promise.prototype.then.call(promiseAddFile, deletePendingAddFileCall, deletePendingAddFileCall);
		return watchPromiseError(zipWriter, promiseAddFile);
	}
	remove(entry) {
		const { filenames, fileEntries } = this;
		if (typeof entry == "string") entry = fileEntries.get(entry);
		if (entry && entry.filename !== void 0) {
			const { filename } = entry;
			if (filenames.has(filename) && fileEntries.has(filename)) {
				filenames.delete(filename);
				fileEntries.delete(filename);
				return true;
			}
		}
		return false;
	}
	async close(comment = EMPTY_UINT8_ARRAY, options = {}) {
		const zipWriter = this;
		const { pendingAddFileCalls, writer } = this;
		const { writable } = writer;
		if (zipWriter.archiveClosed) return getWriterData(writer);
		if (!(comment instanceof Uint8Array)) throw new Error(ERR_INVALID_COMMENT_TYPE);
		if (getLength(comment) > 65535) throw new Error(ERR_INVALID_COMMENT);
		while (pendingAddFileCalls.size) await Promise.allSettled(Array.from(pendingAddFileCalls));
		await Promise.allSettled(zipWriter.pendingErrors.map((watcher) => watcher.recorded));
		const unobservedWatchers = zipWriter.pendingErrors.filter((watcher) => watcher.failed && !watcher.observed);
		if (unobservedWatchers.length) {
			const unobservedErrors = unobservedWatchers.map((watcher) => watcher.error);
			unobservedWatchers.forEach((watcher) => watcher.observed = true);
			const [error] = unobservedErrors;
			try {
				error.entryErrors = unobservedErrors;
			} catch {}
			throw error;
		}
		await closeFile(zipWriter, comment, options);
		zipWriter.archiveClosed = true;
		if (!(!ownsWritable(writer) && getOptionValue(zipWriter, options, "preventClose"))) await writable.getWriter().close();
		return getWriterData(writer);
	}
	[SYMBOL_ASYNC_DISPOSE]() {
		return this.close();
	}
};
var WatchedPromise = class extends Promise {
	then(onFulfilled, onRejected) {
		const { watcher } = this;
		if (watcher) watcher.observed = true;
		return super.then(onFulfilled, onRejected);
	}
};
function getWriterData(writer) {
	return writer.getData ? writer.getData() : writer.writable;
}
function watchPromiseError(zipWriter, promise) {
	const watchedPromise = new WatchedPromise((resolve, reject) => Promise.prototype.then.call(promise, resolve, reject));
	const watcher = {};
	watchedPromise.watcher = watcher;
	watcher.recorded = Promise.prototype.then.call(watchedPromise, void 0, (error) => Object.assign(watcher, {
		failed: true,
		error
	}));
	zipWriter.pendingErrors.push(watcher);
	return watchedPromise;
}
async function prependZipEntries(zipWriter, reader) {
	if (zipWriter.filenames.size) throw new Error(ERR_ZIP_NOT_EMPTY);
	await zipWriter.appendZipEntries(reader);
}
async function addFileEntry(zipWriter, name, reader, options) {
	options = Object.assign({}, options);
	const entry = options[OPTION_ENTRY];
	if (entry !== void 0) {
		const { entryOptions, passThroughOptions } = getSourceEntryOptions(entry, checkPassThroughOption(getOptionValue(zipWriter, options, OPTION_PASS_THROUGH)), getOptionValue(zipWriter, options, PROPERTY_NAME_LAST_MODIFICATION_DATE));
		delete options[OPTION_ENTRY];
		options = Object.assign(entryOptions, passThroughOptions, options);
	}
	if (getOptionValue(zipWriter, options, "directory") && !name.endsWith("/")) name += "/";
	if (zipWriter.filenames.has(name)) throw new Error(ERR_DUPLICATED_NAME);
	zipWriter.filenames.add(name);
	if (workers < getConfiguration().maxWorkers) workers++;
	else await new Promise((resolve) => pendingEntries.push(resolve));
	try {
		return await addFile(zipWriter, name, reader, options);
	} catch (error) {
		zipWriter.filenames.delete(name);
		throw error;
	} finally {
		const pendingEntry = pendingEntries.shift();
		if (pendingEntry) pendingEntry();
		else workers--;
	}
}
async function addFile(zipWriter, name, reader, options) {
	const attributesInfo = resolveAttributes(zipWriter, name, options);
	({name} = attributesInfo);
	const metadataInfo = resolveMetadata(zipWriter, name, options);
	const { comment } = metadataInfo;
	const extraField = options[PROPERTY_NAME_EXTRA_FIELD];
	zipWriter.fileEntries.set(name, void 0);
	const previousFileEntry = zipWriter.lastFileEntry;
	const pendingFileEntry = {};
	let releaseLockFileEntry;
	if (metadataInfo.resolvedOptions.keepOrder) pendingFileEntry.lockFileEntry = new Promise((resolve) => releaseLockFileEntry = resolve);
	zipWriter.lastFileEntry = pendingFileEntry;
	let fileEntry;
	try {
		const { resolvedOptions } = metadataInfo;
		if (resolvedOptions.level != 0 && resolvedOptions.compressionMethod === void 0 && !resolvedOptions.passThroughCompression && !await supportsDeflate(getConfiguration())) {
			resolvedOptions.level = 0;
			addWarning(zipWriter.warnings, WARNING_COMPRESSION_UNAVAILABLE, name);
		}
		const sizesInfo = await resolveSizes(zipWriter, reader, metadataInfo, options);
		({reader} = sizesInfo);
		const diskOffset = getDiskOffset(zipWriter.writer);
		const diskNumber = getDiskNumber(zipWriter.writer);
		let crc32 = options.crc32 === void 0 ? options[PROPERTY_NAME_SIGNATURE] : options.crc32;
		const storesAE2 = sizesInfo.resolvedOptions.encrypted && !resolvedOptions.zipCrypto;
		if (resolvedOptions.passThroughCompression && !resolvedOptions.passThroughEncryption && storesAE2) crc32 = void 0;
		if (resolvedOptions.passThroughCompression && reader && !storesAE2 && crc32 === void 0) throw new Error(ERR_UNDEFINED_CRC32);
		options = Object.assign({}, options, attributesInfo.resolvedOptions, metadataInfo.resolvedOptions, sizesInfo.resolvedOptions, {
			signature: options[PROPERTY_NAME_SIGNATURE],
			crc32,
			offset: zipWriter.offset - diskOffset,
			diskNumberStart: diskNumber,
			[OPTION_USDZ]: zipWriter.options[OPTION_USDZ]
		});
		const headerInfo = getHeaderInfo(options);
		if (headerInfo.lastModDateClamped) addWarning(zipWriter.warnings, WARNING_CLAMPED_LAST_MODIFICATION_DATE, name);
		const dataDescriptorInfo = getDataDescriptorInfo(options);
		const metadataSize = getLength(headerInfo.localHeaderArray, dataDescriptorInfo.dataDescriptorArray);
		fileEntry = await getFileEntry(zipWriter, name, reader, {
			headerInfo,
			dataDescriptorInfo,
			metadataSize,
			fileEntry: pendingFileEntry,
			previousFileEntry,
			releaseLockFileEntry
		}, options);
	} catch (error) {
		zipWriter.fileEntries.delete(name);
		throw error;
	} finally {
		if (releaseLockFileEntry) releaseLockFileEntry(previousFileEntry && previousFileEntry.lockFileEntry);
	}
	Object.assign(fileEntry, {
		name,
		comment,
		extraField
	});
	return new Entry(fileEntry);
}
function getSourceEntryOptions(entry, passThrough, lastModDateOverride) {
	if (entry === null || typeof entry != "object" || Array.isArray(entry)) throw new Error(ERR_INVALID_ENTRY);
	const { externalFileAttributes, versionMadeBy, comment, lastModDate, rawLastModDate, creationDate, lastAccessDate, uncompressedSize, encrypted, zipCrypto, crc32, compressionMethod, extraFieldAES, extraFieldUnix, internalFileAttributes, extraField, bitFlag, directory, uid, gid } = entry;
	const entryOptions = {
		externalFileAttributes,
		versionMadeBy,
		comment,
		lastModDate,
		creationDate,
		lastAccessDate,
		internalFileAttributes,
		directory
	};
	if (bitFlag && bitFlag.languageEncodingFlag) entryOptions[OPTION_USE_UNICODE_FILE_NAMES] = true;
	const userExtraField = getUserExtraField(extraField);
	if (userExtraField) entryOptions[PROPERTY_NAME_EXTRA_FIELD] = userExtraField;
	if (uid !== void 0 || gid !== void 0) Object.assign(entryOptions, {
		uid,
		gid,
		unixExtraFieldType: extraFieldUnix ? UNIX_EXTRA_FIELD_TYPE : INFOZIP_EXTRA_FIELD_TYPE
	});
	const passThroughOptions = {};
	if (passThrough && !directory) {
		Object.assign(passThroughOptions, {
			uncompressedSize,
			crc32,
			compressionMethod
		});
		if (passThrough !== "compressed") Object.assign(passThroughOptions, {
			encrypted,
			zipCrypto,
			encryptionStrength: extraFieldAES ? extraFieldAES.strength : void 0
		});
		if (bitFlag) {
			passThroughOptions.dataDescriptor = bitFlag.dataDescriptor;
			passThroughOptions[OPTION_LEVEL] = LEVEL_BY_BITFLAG_LEVEL[bitFlag.level];
		}
		if (lastModDateOverride === void 0) passThroughOptions.rawLastModDate = rawLastModDate;
		else if (passThrough !== "compressed" && zipCrypto && (!bitFlag || bitFlag.dataDescriptor) && lastModDateOverride instanceof Date && getDosTimeHighByte(lastModDateOverride) != (rawLastModDate >>> 8 & 255)) throw new Error(ERR_ZIP_CRYPTO_LAST_MOD_DATE);
	}
	return {
		entryOptions,
		passThroughOptions
	};
}
function getDosTimeHighByte(lastModDate) {
	let dosLastModDate = /* @__PURE__ */ new Date(Math.ceil(Math.floor(lastModDate.getTime() / 1e3) / 2) * 2e3);
	if (dosLastModDate < MIN_DATE) dosLastModDate = MIN_DATE;
	else if (dosLastModDate > MAX_DATE) dosLastModDate = MAX_DATE;
	return (dosLastModDate.getHours() << 3 | dosLastModDate.getMinutes() >> 3) & 255;
}
function resolveAttributes(zipWriter, name, options) {
	let msDosCompatible = getOptionValue(zipWriter, options, PROPERTY_NAME_MS_DOS_COMPATIBLE);
	let versionMadeBy = getOptionValue(zipWriter, options, PROPERTY_NAME_VERSION_MADE_BY, msDosCompatible ? 20 : 768);
	const executable = getOptionValue(zipWriter, options, PROPERTY_NAME_EXECUTABLE);
	const uid = getNumberOptionValue(zipWriter, options, "uid");
	const gid = getNumberOptionValue(zipWriter, options, "gid");
	let unixMode = getNumberOptionValue(zipWriter, options, PROPERTY_NAME_UNIX_MODE);
	let unixExtraFieldType = getOptionValue(zipWriter, options, OPTION_UNIX_EXTRA_FIELD_TYPE);
	let setuid = getOptionValue(zipWriter, options, PROPERTY_NAME_SETUID);
	let setgid = getOptionValue(zipWriter, options, PROPERTY_NAME_SETGID);
	let sticky = getOptionValue(zipWriter, options, PROPERTY_NAME_STICKY);
	checkIntegerOption(uid, MAX_32_BITS, ERR_INVALID_UID);
	checkIntegerOption(gid, MAX_32_BITS, ERR_INVALID_GID);
	checkIntegerOption(unixMode, MAX_16_BITS, ERR_INVALID_UNIX_MODE);
	if (unixExtraFieldType !== void 0 && unixExtraFieldType !== INFOZIP_EXTRA_FIELD_TYPE && unixExtraFieldType !== UNIX_EXTRA_FIELD_TYPE) throw new Error(ERR_INVALID_UNIX_EXTRA_FIELD_TYPE);
	if (unixExtraFieldType === UNIX_EXTRA_FIELD_TYPE && (uid !== void 0 && uid > 65535 || gid !== void 0 && gid > 65535)) throw new Error(ERR_INVALID_UNIX_ID_SIZE);
	if (unixExtraFieldType === void 0 && (uid !== void 0 || gid !== void 0)) unixExtraFieldType = INFOZIP_EXTRA_FIELD_TYPE;
	let msdosAttributesRaw = getNumberOptionValue(zipWriter, options, PROPERTY_NAME_MSDOS_ATTRIBUTES_RAW);
	let msdosAttributes = getOptionValue(zipWriter, options, PROPERTY_NAME_MSDOS_ATTRIBUTES);
	const hasUnixMetadata = uid !== void 0 || gid !== void 0 || unixMode !== void 0 || unixExtraFieldType || executable;
	const hasMsDosProvided = msdosAttributesRaw !== void 0 || msdosAttributes !== void 0;
	if (hasUnixMetadata) {
		msDosCompatible = false;
		versionMadeBy = versionMadeBy & 255 | 768;
	} else if (hasMsDosProvided) {
		msDosCompatible = true;
		versionMadeBy = versionMadeBy & 255;
	}
	checkIntegerOption(msdosAttributesRaw, 255, ERR_INVALID_MSDOS_ATTRIBUTES);
	if (msdosAttributes && (typeof msdosAttributes !== "object" || Array.isArray(msdosAttributes))) throw new Error(ERR_INVALID_MSDOS_DATA);
	if (versionMadeBy > 65535) throw new Error(ERR_INVALID_VERSION);
	let externalFileAttributes = getOptionValue(zipWriter, options, PROPERTY_NAME_EXTERNAL_FILE_ATTRIBUTES);
	const externalFileAttributesProvided = externalFileAttributes !== void 0;
	if (!externalFileAttributesProvided) externalFileAttributes = 0;
	if (!options["directory"] && name.endsWith("/")) options[PROPERTY_NAME_DIRECTORY] = true;
	const directory = getOptionValue(zipWriter, options, PROPERTY_NAME_DIRECTORY);
	if (directory) {
		if (!name.endsWith("/")) name += "/";
		if (!externalFileAttributesProvided) {
			externalFileAttributes = 16;
			if (!msDosCompatible) externalFileAttributes |= (FILE_ATTR_UNIX_TYPE_DIR | 493) << 16;
		}
	} else if (!msDosCompatible && !externalFileAttributesProvided) {
		if (executable) externalFileAttributes = 493 << 16;
		else externalFileAttributes = 420 << 16;
	}
	if (!msDosCompatible) {
		const unixModeProvided = unixMode !== void 0 || Boolean(setuid || setgid || sticky);
		const defaultUnixMode = externalFileAttributes >> 16 & MAX_16_BITS;
		unixMode = unixMode === void 0 ? defaultUnixMode : unixMode & MAX_16_BITS;
		if (setuid) unixMode |= FILE_ATTR_UNIX_SETUID_MASK;
		else setuid = Boolean(unixMode & FILE_ATTR_UNIX_SETUID_MASK);
		if (setgid) unixMode |= FILE_ATTR_UNIX_SETGID_MASK;
		else setgid = Boolean(unixMode & FILE_ATTR_UNIX_SETGID_MASK);
		if (sticky) unixMode |= 512;
		else sticky = Boolean(unixMode & 512);
		if (!externalFileAttributesProvided || unixModeProvided) {
			if (directory) unixMode = unixMode & ~FILE_ATTR_UNIX_TYPE_MASK | FILE_ATTR_UNIX_TYPE_DIR;
			else if (!(unixMode & 61440)) unixMode |= FILE_ATTR_UNIX_TYPE_FILE;
			externalFileAttributes = (unixMode & MAX_16_BITS) << 16 | externalFileAttributes & MAX_16_BITS;
		}
	}
	({msdosAttributesRaw, msdosAttributes} = normalizeMsdosAttributes(msdosAttributesRaw, msdosAttributes));
	if (hasMsDosProvided) externalFileAttributes = externalFileAttributes & MAX_32_BITS | msdosAttributesRaw & 255;
	const unixExternalUpper = externalFileAttributes >> 16 & MAX_16_BITS;
	const symlink = unixMode !== void 0 && (unixMode & 61440) == 40960;
	return {
		name,
		resolvedOptions: {
			versionMadeBy,
			msDosCompatible: Boolean(msDosCompatible),
			externalFileAttributes,
			unixExternalUpper,
			uid,
			gid,
			unixMode,
			unixExtraFieldType,
			symlink,
			setuid,
			setgid,
			sticky,
			msdosAttributesRaw,
			msdosAttributes
		}
	};
}
function resolveMetadata(zipWriter, name, options) {
	const encode = getFunctionOptionValue(zipWriter, options, "encodeText") || encodeText;
	let rawFilename = encode(name, TEXT_TYPE_FILENAME);
	if (rawFilename === void 0) rawFilename = encodeText(name);
	if (getLength(rawFilename) > 65535) throw new Error(ERR_INVALID_ENTRY_NAME);
	const comment = options["comment"] || "";
	if (typeof comment != "string") throw new Error(ERR_INVALID_ENTRY_COMMENT_TYPE);
	let rawComment = encode(comment, TEXT_TYPE_COMMENT);
	if (rawComment === void 0) rawComment = encodeText(comment);
	if (getLength(rawComment) > 65535) throw new Error(ERR_INVALID_ENTRY_COMMENT);
	const version = getOptionValue(zipWriter, options, PROPERTY_NAME_VERSION);
	if (version !== void 0 && version > 65535) throw new Error(ERR_INVALID_VERSION);
	const lastModDate = getDateOptionValue(zipWriter, options, PROPERTY_NAME_LAST_MODIFICATION_DATE, /* @__PURE__ */ new Date());
	const rawLastModDate = getOptionValue(zipWriter, options, PROPERTY_NAME_RAW_LAST_MODIFICATION_DATE);
	const lastAccessDate = getDateOptionValue(zipWriter, options, PROPERTY_NAME_LAST_ACCESS_DATE);
	const creationDate = getDateOptionValue(zipWriter, options, PROPERTY_NAME_CREATION_DATE);
	const internalFileAttributes = getOptionValue(zipWriter, options, PROPERTY_NAME_INTERNAL_FILE_ATTRIBUTES, 0);
	const passThrough = checkPassThroughOption(getOptionValue(zipWriter, options, OPTION_PASS_THROUGH));
	const passThroughCompression = Boolean(passThrough);
	const passThroughEncryption = passThrough === true;
	const password = getOptionValue(zipWriter, options, OPTION_PASSWORD);
	const rawPassword = getOptionValue(zipWriter, options, OPTION_RAW_PASSWORD);
	checkPasswordOption(password, rawPassword);
	const encryptionStrength = getNumberOptionValue(zipWriter, options, OPTION_ENCRYPTION_STRENGTH, 3);
	const zipCrypto = getOptionValue(zipWriter, options, PROPERTY_NAME_ZIPCRYPTO);
	const extendedTimestamp = getOptionValue(zipWriter, options, OPTION_EXTENDED_TIMESTAMP, true);
	const ntfsTimestamp = getOptionValue(zipWriter, options, OPTION_NTFS_TIMESTAMP);
	const keepOrder = getOptionValue(zipWriter, options, OPTION_KEEP_ORDER, true);
	const useWebWorkers = getOptionValue(zipWriter, options, OPTION_USE_WEB_WORKERS);
	const transferStreams = getOptionValue(zipWriter, options, OPTION_TRANSFER_STREAMS);
	const bufferedWrite = getOptionValue(zipWriter, options, OPTION_BUFFERED_WRITE);
	const createTempStream = getFunctionOptionValue(zipWriter, options, OPTION_CREATE_TEMP_STREAM);
	const dataDescriptorSignature = getOptionValue(zipWriter, options, OPTION_DATA_DESCRIPTOR_SIGNATURE, true);
	const signal = checkSignalOption(getOptionValue(zipWriter, options, OPTION_SIGNAL));
	throwIfAborted(signal);
	const useUnicodeFileNames = getOptionValue(zipWriter, options, OPTION_USE_UNICODE_FILE_NAMES, !isPrintableASCIIText(rawFilename) || !isPrintableASCIIText(rawComment));
	const compressionMethod = getOptionValue(zipWriter, options, PROPERTY_NAME_COMPRESSION_METHOD);
	const registeredCodec = passThroughCompression || compressionMethod === void 0 ? void 0 : getRegisteredCodec(compressionMethod);
	if (!passThroughCompression && compressionMethod !== void 0 && compressionMethod !== 0 && compressionMethod !== 8 && !registeredCodec) throw new Error(ERR_UNSUPPORTED_COMPRESSION);
	let level = getNumberOptionValue(zipWriter, options, OPTION_LEVEL);
	checkIntegerOption(level, MAX_LEVEL, ERR_INVALID_LEVEL);
	if (zipWriter.options["usdz"]) {
		if (password !== void 0 || rawPassword !== void 0) throw new Error(ERR_UNSUPPORTED_ENCRYPTION_USDZ);
		if (level === void 0 && compressionMethod === void 0) level = 0;
	}
	if (passThroughCompression) level = toNumber(options[OPTION_LEVEL]);
	let useCompressionStream = getOptionValue(zipWriter, options, OPTION_USE_COMPRESSION_STREAM);
	let dataDescriptor = getOptionValue(zipWriter, options, OPTION_DATA_DESCRIPTOR);
	if (bufferedWrite && dataDescriptor === void 0) dataDescriptor = false;
	if (dataDescriptor === void 0 || zipCrypto && !passThroughEncryption) dataDescriptor = true;
	if (level !== void 0 && level != 6) useCompressionStream = false;
	const zip64 = getOptionValue(zipWriter, options, PROPERTY_NAME_ZIP64);
	if (!zipCrypto && (password !== void 0 || rawPassword !== void 0) && !(Number.isInteger(encryptionStrength) && encryptionStrength >= 1 && encryptionStrength <= 3)) throw new Error(ERR_INVALID_ENCRYPTION_STRENGTH);
	const rawExtraField = serializeExtraField(options[PROPERTY_NAME_EXTRA_FIELD]);
	const rawLocalExtraField = serializeExtraField(options[OPTION_LOCAL_EXTRA_FIELD]);
	const rawCentralExtraField = serializeExtraField(options[OPTION_CENTRAL_EXTRA_FIELD]);
	return {
		comment,
		resolvedOptions: {
			rawFilename,
			rawComment,
			version,
			lastModDate,
			rawLastModDate,
			lastAccessDate,
			creationDate,
			internalFileAttributes,
			passThroughCompression,
			passThroughEncryption,
			password,
			rawPassword,
			encryptionStrength,
			zipCrypto,
			extendedTimestamp,
			ntfsTimestamp,
			keepOrder,
			useWebWorkers,
			transferStreams,
			bufferedWrite,
			createTempStream,
			dataDescriptorSignature,
			signal,
			useUnicodeFileNames,
			compressionMethod,
			format: registeredCodec ? registeredCodec.format : void 0,
			codecURI: registeredCodec ? registeredCodec.codecURI : void 0,
			codecVersionNeeded: registeredCodec ? registeredCodec.versionNeeded : void 0,
			level,
			useCompressionStream,
			dataDescriptor,
			zip64,
			rawExtraField,
			rawLocalExtraField,
			rawCentralExtraField
		}
	};
}
function serializeExtraField(extraField) {
	if (!extraField) return EMPTY_UINT8_ARRAY;
	if (!(extraField instanceof Map)) throw new Error(ERR_INVALID_EXTRAFIELD);
	let extraFieldSize = 0;
	let offset = 0;
	extraField.forEach((data, type) => {
		checkInteger(type, MAX_16_BITS, ERR_INVALID_EXTRAFIELD_TYPE);
		if (!(data instanceof Uint8Array)) throw new Error(ERR_INVALID_EXTRAFIELD_DATA_TYPE);
		if (getLength(data) > 65535) throw new Error(ERR_INVALID_EXTRAFIELD_DATA);
		extraFieldSize += 4 + getLength(data);
	});
	const rawExtraField = new Uint8Array(extraFieldSize);
	const rawExtraFieldView = getDataView(rawExtraField);
	extraField.forEach((data, type) => {
		setUint16(rawExtraFieldView, offset, type);
		setUint16(rawExtraFieldView, offset + 2, getLength(data));
		arraySet(rawExtraField, data, offset + 4);
		offset += 4 + getLength(data);
	});
	return rawExtraField;
}
async function resolveSizes(zipWriter, reader, { resolvedOptions: metadata }, options) {
	if (metadata.passThroughCompression && !reader && !getOptionValue(zipWriter, options, "directory")) throw new Error(ERR_UNDEFINED_READER);
	let contentSize;
	if (reader) {
		reader = new GenericReader(reader);
		await initStream(reader);
		if (!reader.readable && !reader.readUint8Array) throw new Error(ERR_INVALID_READER);
		({size: contentSize} = reader);
	}
	return Object.assign({ reader }, resolveEntrySizes(zipWriter, Boolean(reader), contentSize, metadata, options));
}
function resolveEntrySizes(zipWriter, hasContent, contentSize, metadata, options) {
	const { passThroughCompression, passThroughEncryption, zipCrypto, password, rawPassword, encryptionStrength } = metadata;
	let { dataDescriptor, zip64, level, compressionMethod } = metadata;
	let maximumCompressedSize = 0;
	let uncompressedSize = 0;
	let unknownSize = false;
	if (passThroughCompression && hasContent) {
		uncompressedSize = options[PROPERTY_NAME_UNCOMPRESSED_SIZE];
		if (uncompressedSize === void 0) throw new Error(ERR_UNDEFINED_UNCOMPRESSED_SIZE);
		if (compressionMethod === void 0) throw new Error(ERR_UNDEFINED_COMPRESSION_METHOD);
	}
	const zip64Enabled = zip64 === true;
	const encrypted = getOptionValue(zipWriter, options, PROPERTY_NAME_ENCRYPTED);
	if (hasContent && passThroughEncryption && !encrypted && getLength(password, rawPassword)) throw new Error(ERR_UNSUPPORTED_ENCRYPTION_PASS_THROUGH);
	const encryptedEntry = hasContent && (Boolean(password && getLength(password) || rawPassword && getLength(rawPassword)) || passThroughEncryption && encrypted);
	if (!hasContent) {
		level = 0;
		compressionMethod = 0;
	}
	const encryptionOverhead = getEncryptionOverhead(encryptedEntry, zipCrypto, encryptionStrength);
	if (hasContent) {
		if (!passThroughCompression) {
			if (contentSize === void 0) {
				dataDescriptor = true;
				if (zip64 || zip64 === void 0) {
					zip64 = unknownSize = true;
					maximumCompressedSize = MAX_32_BITS + 1;
				}
			} else {
				options.uncompressedSize = uncompressedSize = contentSize;
				maximumCompressedSize = (isCompressed(compressionMethod, level) ? getMaximumCompressedSize(uncompressedSize) : uncompressedSize) + encryptionOverhead;
			}
		} else {
			options.uncompressedSize = uncompressedSize;
			maximumCompressedSize = contentSize === void 0 ? getMaximumCompressedSize(uncompressedSize) + encryptionOverhead : contentSize + (passThroughEncryption ? 0 : encryptionOverhead);
		}
	}
	const emptyEntry = !encryptedEntry && (!hasContent || contentSize === 0 && !passThroughCompression) && !isCompressed(compressionMethod, level);
	if (emptyEntry && getOptionValue(zipWriter, options, "dataDescriptor") === void 0) dataDescriptor = false;
	const zip64UncompressedSize = zip64Enabled || unknownSize || uncompressedSize >= 4294967295;
	const zip64CompressedSize = zip64Enabled || maximumCompressedSize >= 4294967295;
	if (zip64UncompressedSize || zip64CompressedSize) {
		if (zip64 === false) throw new Error(ERR_UNSUPPORTED_FORMAT);
		else zip64 = true;
	}
	zip64 = zip64 || false;
	return {
		maximumCompressedSize,
		resolvedOptions: {
			dataDescriptor,
			emptyEntry,
			zip64,
			zip64Enabled,
			unknownSize,
			zip64UncompressedSize,
			zip64CompressedSize,
			uncompressedSize,
			level,
			compressionMethod,
			encrypted: encryptedEntry
		}
	};
}
async function getFileEntry(zipWriter, name, reader, entryInfo, options) {
	const { fileEntries, writer } = zipWriter;
	const { keepOrder, dataDescriptor, emptyEntry, signal } = options;
	const { headerInfo, fileEntry: pendingFileEntry, previousFileEntry, releaseLockFileEntry } = entryInfo;
	const usdz = zipWriter.options[OPTION_USDZ];
	let fileEntry = pendingFileEntry;
	let bufferedWrite;
	let directWrite;
	let releaseLockWriter;
	let writingBufferedEntryData;
	let writingEntryData;
	let writerSizeBeforeEntry;
	let flushedBufferedSize = 0;
	let fileWriter;
	const lockPreviousFileEntry = keepOrder && previousFileEntry ? previousFileEntry.lockFileEntry : void 0;
	fileEntries.set(name, fileEntry);
	try {
		if (options.bufferedWrite || !keepOrder || zipWriter.writerLocked || zipWriter.bufferedWrites || zipWriter.directWrites || !dataDescriptor && !emptyEntry) {
			bufferedWrite = true;
			zipWriter.bufferedWrites++;
			if (options.createTempStream) fileWriter = await options.createTempStream();
			else fileWriter = new TransformStream(void 0, void 0, { highWaterMark: INFINITY_VALUE });
			fileWriter.size = 0;
			await initStream(writer);
		} else {
			directWrite = true;
			zipWriter.directWrites++;
			fileWriter = writer;
			await lockPreviousFileEntry;
			await requestLockWriter();
		}
		await initStream(fileWriter);
		const diskOffset = getDiskOffset(writer);
		if (zipWriter.addSplitZipSignature && !bufferedWrite) await writeSplitZipSignature(zipWriter, writer);
		if (usdz && !bufferedWrite) appendExtraFieldUSDZ(entryInfo, zipWriter.offset - diskOffset);
		const { localHeaderArray } = headerInfo;
		if (!bufferedWrite) await skipDiskIfNeeded();
		const diskNumberStart = getDiskNumber(writer);
		const entryOffset = getSegmentOffset(zipWriter, writer);
		fileEntry.diskNumberStart = diskNumberStart;
		if (!bufferedWrite) {
			writingEntryData = true;
			writerSizeBeforeEntry = writer.size;
			await writeData(fileWriter, localHeaderArray);
		}
		fileEntry = await createFileEntry(reader, fileWriter, fileEntry, entryInfo, getConfiguration(), options);
		if (!bufferedWrite) writingEntryData = false;
		fileEntries.set(name, fileEntry);
		fileEntry.filename = name;
		if (bufferedWrite) {
			await Promise.all([fileWriter.writable.getWriter().close(), lockPreviousFileEntry]);
			await requestLockWriter();
			if (zipWriter.addSplitZipSignature) await writeSplitZipSignature(zipWriter, writer);
			writingBufferedEntryData = true;
			writerSizeBeforeEntry = writer.size;
			await skipDiskIfNeeded();
			fileEntry.diskNumberStart = getDiskNumber(writer);
			fileEntry.offset = getSegmentOffset(zipWriter, writer);
			if (usdz) {
				const previousMetadataSize = entryInfo.metadataSize;
				appendExtraFieldUSDZ(entryInfo, zipWriter.offset - getDiskOffset(writer));
				fileEntry.size += entryInfo.metadataSize - previousMetadataSize;
			}
			updateLocalHeader(fileEntry, headerInfo.localHeaderView, options);
			await writeData(writer, headerInfo.localHeaderArray);
			await flushBufferedData(fileWriter.readable, writer, signal, (chunkLength) => flushedBufferedSize += chunkLength);
			writer.size += fileWriter.size;
			writingBufferedEntryData = false;
		} else {
			fileEntry.diskNumberStart = diskNumberStart;
			fileEntry.offset = entryOffset;
		}
		zipWriter.offset += fileEntry.size;
		return fileEntry;
	} catch (error) {
		if (writingBufferedEntryData || writingEntryData) {
			zipWriter.hasCorruptedEntries = true;
			if (error) try {
				error.corruptedEntry = true;
			} catch {}
			zipWriter.offset += writer.size - writerSizeBeforeEntry;
			if (bufferedWrite) zipWriter.offset += flushedBufferedSize;
		}
		fileEntries.delete(name);
		throw error;
	} finally {
		if (bufferedWrite) zipWriter.bufferedWrites--;
		if (directWrite) zipWriter.directWrites--;
		if (releaseLockFileEntry) releaseLockFileEntry(lockPreviousFileEntry);
		if (releaseLockWriter) releaseLockWriter();
		if (bufferedWrite && fileWriter && fileWriter.dispose) try {
			await fileWriter.dispose();
		} catch {}
	}
	async function requestLockWriter() {
		zipWriter.writerLocked = true;
		const { lockWriter } = zipWriter;
		zipWriter.lockWriter = new Promise((resolve) => releaseLockWriter = () => {
			zipWriter.writerLocked = false;
			resolve();
		});
		await lockWriter;
	}
	async function skipDiskIfNeeded() {
		if (exceedsAvailableSize(writer, getLength(headerInfo.localHeaderArray))) await writer.closeDisk();
	}
}
async function createFileEntry(reader, writer, { diskNumberStart, lockFileEntry }, entryInfo, config, options) {
	const { headerInfo, dataDescriptorInfo, metadataSize } = entryInfo;
	const { headerArray, headerView, lastModDate, rawLastModDate, encrypted, compressed, version, compressionMethod, rawExtraFieldZip64, localExtraFieldZip64Length, rawExtraFieldExtendedTimestamp, extraFieldExtendedTimestampFlag, extraFieldExtendedTimestampTime, rawExtraFieldNTFS, rawExtraFieldUnix, rawExtraFieldAES } = headerInfo;
	const { dataDescriptorArray } = dataDescriptorInfo;
	const { rawFilename, lastAccessDate, creationDate, password, rawPassword, level, useUnicodeFileNames, zip64, zip64Enabled, zip64UncompressedSize, zip64CompressedSize, zipCrypto, dataDescriptor, directory, executable, versionMadeBy, rawComment, rawExtraField, rawCentralExtraField, useWebWorkers, transferStreams, onstart, onprogress, onend, signal, encryptionStrength, extendedTimestamp, msDosCompatible, internalFileAttributes, externalFileAttributes, uid, gid, unixMode, symlink, setuid, setgid, sticky, unixExternalUpper, msdosAttributesRaw, msdosAttributes, useCompressionStream, passThroughCompression, passThroughEncryption, format, codecURI } = options;
	const fileEntry = {
		lockFileEntry,
		versionMadeBy,
		zip64,
		zip64Enabled,
		directory: Boolean(directory),
		executable: Boolean(executable),
		filenameUTF8: Boolean(useUnicodeFileNames),
		rawFilename,
		commentUTF8: Boolean(useUnicodeFileNames),
		rawComment,
		rawExtraFieldZip64,
		localExtraFieldZip64Length,
		rawExtraFieldExtendedTimestamp,
		rawExtraFieldNTFS,
		rawExtraFieldUnix,
		rawExtraFieldAES,
		rawExtraField,
		rawCentralExtraField,
		extendedTimestamp,
		msDosCompatible,
		internalFileAttributes,
		externalFileAttributes,
		diskNumberStart,
		uid,
		gid,
		unixMode,
		symlink: Boolean(symlink),
		setuid,
		setgid,
		sticky,
		unixExternalUpper,
		msdosAttributesRaw,
		msdosAttributes
	};
	let { crc32, uncompressedSize } = options;
	let compressedSize = 0;
	if (!passThroughCompression) uncompressedSize = 0;
	const { writable } = writer;
	if (reader) {
		const size = reader.size;
		const readable = toCompatibleReadable(createReadable(reader, { size }));
		const workerOptions = {
			options: {
				codecType: CODEC_DEFLATE,
				inputSize: size,
				level,
				rawPassword,
				password,
				encryptionStrength,
				zipCrypto: encrypted && zipCrypto,
				passwordVerification: encrypted && zipCrypto && rawLastModDate >> 8 & 255,
				computeCrc32: !passThroughCompression,
				compressed: compressed && !passThroughCompression,
				encrypted: encrypted && !passThroughEncryption,
				useWebWorkers,
				useCompressionStream,
				transferStreams,
				format,
				codecURI,
				compressionMethod
			},
			config,
			streamOptions: {
				signal,
				size,
				onstart,
				onprogress,
				onend
			}
		};
		try {
			const result = await runWorker({
				readable,
				writable
			}, workerOptions);
			compressedSize = result.outputSize;
			writer.size += compressedSize;
			if (!passThroughCompression) {
				uncompressedSize = result.inputSize;
				if (!encrypted || zipCrypto) crc32 = result.crc32;
			}
			if (!zip64CompressedSize && compressedSize >= 4294967295 || !zip64UncompressedSize && uncompressedSize >= 4294967295) throw new Error(ERR_UNSUPPORTED_FORMAT);
		} catch (error) {
			const { outputSize: failedOutputSize } = workerOptions;
			if (failedOutputSize !== void 0) writer.size += failedOutputSize;
			else if (isErrorObject(error) && error.outputSize !== void 0) writer.size += error.outputSize;
			throw error;
		}
	}
	setEntryInfo({
		crc32,
		compressedSize,
		uncompressedSize,
		headerInfo,
		dataDescriptorInfo
	}, options);
	if (dataDescriptor) await writeData(writer, dataDescriptorArray);
	Object.assign(fileEntry, {
		uncompressedSize,
		compressedSize,
		lastModDate,
		rawLastModDate,
		creationDate,
		lastAccessDate,
		encrypted: Boolean(encrypted),
		zipCrypto: Boolean(zipCrypto),
		size: metadataSize + compressedSize,
		compressionMethod,
		version,
		headerArray,
		headerView,
		signature: crc32,
		crc32: encrypted && !zipCrypto && !passThroughCompression ? void 0 : crc32,
		extraFieldExtendedTimestampFlag,
		extraFieldExtendedTimestampTime,
		zip64UncompressedSize,
		zip64CompressedSize
	});
	return fileEntry;
}
function getHeaderInfo(options) {
	const { rawFilename, lastModDate, rawLastModDate: rawLastModDateOption, lastAccessDate, creationDate, level, zip64, zipCrypto, useUnicodeFileNames, dataDescriptor, directory, rawExtraField, rawLocalExtraField, encryptionStrength, extendedTimestamp, ntfsTimestamp, passThroughCompression, encrypted, zip64UncompressedSize, zip64CompressedSize, uncompressedSize, unknownSize, crc32 } = options;
	let { version, compressionMethod } = options;
	const compressed = !directory && isCompressed(compressionMethod, level);
	let rawLocalExtraFieldZip64;
	const uncompressedFile = passThroughCompression || !compressed;
	const zip64ExtraFieldComplete = zip64 && (options.bufferedWrite || !dataDescriptor || !zip64UncompressedSize && !zip64CompressedSize || uncompressedFile && !unknownSize);
	const writeLocalExtraFieldZip64 = zip64ExtraFieldComplete || zip64 && dataDescriptor && (zip64UncompressedSize || zip64CompressedSize);
	if (zip64 && (zip64UncompressedSize || zip64CompressedSize)) {
		const extraFieldZip64 = createRecordWriter(20);
		extraFieldZip64.writeUint16(1);
		extraFieldZip64.writeUint16(16);
		rawLocalExtraFieldZip64 = extraFieldZip64.array;
		if (zip64ExtraFieldComplete) {
			extraFieldZip64.writeUint64(uncompressedSize);
			if (uncompressedFile) {
				const encryptionOverhead = getEncryptionOverhead(encrypted, zipCrypto, encryptionStrength);
				extraFieldZip64.writeUint64(passThroughCompression ? 0 : uncompressedSize + encryptionOverhead);
			}
		}
	} else rawLocalExtraFieldZip64 = EMPTY_UINT8_ARRAY;
	let rawExtraFieldAES;
	if (encrypted && !zipCrypto) {
		const extraFieldAES = createRecordWriter(getLength(EXTRAFIELD_DATA_AES) + 2);
		extraFieldAES.writeUint16(EXTRAFIELD_TYPE_AES);
		extraFieldAES.writeBytes(EXTRAFIELD_DATA_AES);
		rawExtraFieldAES = extraFieldAES.array;
		rawExtraFieldAES[8] = encryptionStrength;
	} else rawExtraFieldAES = EMPTY_UINT8_ARRAY;
	let rawExtraFieldNTFS;
	let rawExtraFieldExtendedTimestamp;
	let extraFieldExtendedTimestampFlag;
	let extraFieldExtendedTimestampTime;
	if (extendedTimestamp) {
		const lastModTimeUnix = getTimeUnix(lastModDate);
		const lastModTimeUnixInRange = inUnixTimeRange(lastModTimeUnix);
		if (lastModTimeUnixInRange) {
			const extraFieldTimestampLength = 9 + (lastAccessDate ? 4 : 0) + (creationDate ? 4 : 0);
			const extraFieldTimestamp = createRecordWriter(extraFieldTimestampLength);
			extraFieldExtendedTimestampFlag = 1 + (lastAccessDate ? 2 : 0) + (creationDate ? 4 : 0);
			extraFieldExtendedTimestampTime = lastModTimeUnix;
			extraFieldTimestamp.writeUint16(EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP);
			extraFieldTimestamp.writeUint16(extraFieldTimestampLength - 4);
			extraFieldTimestamp.writeUint8(extraFieldExtendedTimestampFlag);
			extraFieldTimestamp.writeUint32(lastModTimeUnix);
			if (lastAccessDate) extraFieldTimestamp.writeUint32(clampUnixTime(getTimeUnix(lastAccessDate)));
			if (creationDate) extraFieldTimestamp.writeUint32(clampUnixTime(getTimeUnix(creationDate)));
			rawExtraFieldExtendedTimestamp = extraFieldTimestamp.array;
		} else rawExtraFieldExtendedTimestamp = EMPTY_UINT8_ARRAY;
		if (ntfsTimestamp === void 0 ? !lastModTimeUnixInRange || Boolean(lastAccessDate || creationDate) : ntfsTimestamp) try {
			const lastModTimeNTFS = getTimeNTFS(lastModDate);
			const extraFieldNTFS = createRecordWriter(36);
			extraFieldNTFS.writeUint16(10);
			extraFieldNTFS.writeUint16(32);
			extraFieldNTFS.skip(4);
			extraFieldNTFS.writeUint16(1);
			extraFieldNTFS.writeUint16(24);
			extraFieldNTFS.writeUint64(lastModTimeNTFS);
			extraFieldNTFS.writeUint64(lastAccessDate ? getTimeNTFS(lastAccessDate) : lastModTimeNTFS);
			extraFieldNTFS.writeUint64(creationDate ? getTimeNTFS(creationDate) : lastModTimeNTFS);
			rawExtraFieldNTFS = extraFieldNTFS.array;
		} catch {
			rawExtraFieldNTFS = EMPTY_UINT8_ARRAY;
		}
		else rawExtraFieldNTFS = EMPTY_UINT8_ARRAY;
	} else rawExtraFieldNTFS = rawExtraFieldExtendedTimestamp = EMPTY_UINT8_ARRAY;
	let rawExtraFieldUnix;
	try {
		const { uid, gid, unixExtraFieldType } = options;
		if (unixExtraFieldType == INFOZIP_EXTRA_FIELD_TYPE && (uid !== void 0 || gid !== void 0)) {
			const uidBytes = packUnixId(uid === void 0 ? 0 : uid);
			const gidBytes = packUnixId(gid === void 0 ? 0 : gid);
			const payloadLength = 3 + uidBytes.length + gidBytes.length;
			const extraFieldUnix = createRecordWriter(4 + payloadLength);
			extraFieldUnix.writeUint16(EXTRAFIELD_TYPE_INFOZIP);
			extraFieldUnix.writeUint16(payloadLength);
			extraFieldUnix.writeUint8(1);
			extraFieldUnix.writeUint8(uidBytes.length);
			extraFieldUnix.writeBytes(uidBytes);
			extraFieldUnix.writeUint8(gidBytes.length);
			extraFieldUnix.writeBytes(gidBytes);
			rawExtraFieldUnix = extraFieldUnix.array;
		} else if (unixExtraFieldType == UNIX_EXTRA_FIELD_TYPE && (uid !== void 0 || gid !== void 0)) {
			const extraFieldUnix = createRecordWriter(8);
			extraFieldUnix.writeUint16(EXTRAFIELD_TYPE_UNIX);
			extraFieldUnix.writeUint16(4);
			extraFieldUnix.writeUint16((uid === void 0 ? 0 : uid) & MAX_16_BITS);
			extraFieldUnix.writeUint16((gid === void 0 ? 0 : gid) & MAX_16_BITS);
			rawExtraFieldUnix = extraFieldUnix.array;
		} else rawExtraFieldUnix = EMPTY_UINT8_ARRAY;
	} catch {
		rawExtraFieldUnix = EMPTY_UINT8_ARRAY;
	}
	if (compressionMethod === void 0) compressionMethod = compressed ? 8 : 0;
	if (version === void 0) version = compressionMethod == 0 && !directory && !encrypted ? 10 : 20;
	const { codecVersionNeeded } = options;
	if (compressed && codecVersionNeeded !== void 0) version = version > codecVersionNeeded ? version : codecVersionNeeded;
	if (zip64) version = version > 45 ? version : 45;
	if (encrypted && !zipCrypto) {
		version = version > 51 ? version : 51;
		if (passThroughCompression && crc32 !== void 0) rawExtraFieldAES[EXTRAFIELD_OFFSET_AES_VENDOR_VERSION] = VENDOR_VERSION_AE_1;
		setUint16(getDataView(rawExtraFieldAES), EXTRAFIELD_OFFSET_AES_COMPRESSION_METHOD, compressionMethod);
		compressionMethod = 99;
	}
	const localExtraFieldZip64Length = writeLocalExtraFieldZip64 ? getLength(rawLocalExtraFieldZip64) : 0;
	const extraFieldLength = localExtraFieldZip64Length + getLength(rawExtraFieldAES, rawExtraFieldExtendedTimestamp, rawExtraFieldNTFS, rawExtraFieldUnix, rawExtraField, rawLocalExtraField);
	if (extraFieldLength + (options["usdz"] ? EXTRAFIELD_USDZ_MAX_LENGTH : 0) > 65535) throw new Error(ERR_INVALID_EXTRAFIELD_DATA);
	const dosLastModDate = /* @__PURE__ */ new Date(Math.ceil(Math.floor(lastModDate.getTime() / 1e3) / 2) * 2e3);
	const clampedLastModDate = dosLastModDate < MIN_DATE ? MIN_DATE : dosLastModDate > MAX_DATE ? MAX_DATE : dosLastModDate;
	const storedLastModDate = getLength(rawExtraFieldExtendedTimestamp) ? /* @__PURE__ */ new Date(getTimeUnix(lastModDate) * 1e3) : getLength(rawExtraFieldNTFS) ? lastModDate : clampedLastModDate;
	const { headerArray, headerView, rawLastModDate } = getHeaderArrayData({
		version,
		bitFlag: getBitFlag(level, useUnicodeFileNames, dataDescriptor, encrypted, compressionMethod),
		compressionMethod,
		uncompressedSize,
		lastModDate: clampedLastModDate,
		rawLastModDate: rawLastModDateOption,
		rawFilename,
		zip64CompressedSize,
		zip64UncompressedSize,
		extraFieldLength
	});
	const localHeader = createRecordWriter(30 + getLength(rawFilename) + extraFieldLength);
	const localHeaderArray = localHeader.array;
	const localHeaderView = getDataView(localHeaderArray);
	localHeader.writeUint32(LOCAL_FILE_HEADER_SIGNATURE);
	localHeader.writeBytes(headerArray);
	localHeader.writeBytes(rawFilename);
	if (writeLocalExtraFieldZip64) localHeader.writeBytes(rawLocalExtraFieldZip64);
	localHeader.writeBytes(rawExtraFieldAES);
	localHeader.writeBytes(rawExtraFieldExtendedTimestamp);
	localHeader.writeBytes(rawExtraFieldNTFS);
	localHeader.writeBytes(rawExtraFieldUnix);
	localHeader.writeBytes(rawExtraField);
	localHeader.writeBytes(rawLocalExtraField);
	if (dataDescriptor) {
		if (!zip64CompressedSize) setUint32(localHeaderView, 18, 0);
		if (!zip64UncompressedSize) setUint32(localHeaderView, 22, 0);
	}
	return {
		localHeaderArray,
		localHeaderView,
		headerArray,
		headerView,
		lastModDate: storedLastModDate,
		lastModDateClamped: storedLastModDate === clampedLastModDate && dosLastModDate.getTime() != clampedLastModDate.getTime(),
		rawLastModDate,
		encrypted,
		compressed,
		version,
		compressionMethod,
		extraFieldExtendedTimestampFlag,
		extraFieldExtendedTimestampTime,
		rawExtraFieldZip64: EMPTY_UINT8_ARRAY,
		localExtraFieldZip64Length,
		rawExtraFieldExtendedTimestamp,
		rawExtraFieldNTFS,
		rawExtraFieldUnix,
		rawExtraFieldAES,
		extraFieldLength
	};
}
function appendExtraFieldUSDZ(entryInfo, zipWriterOffset) {
	const { headerInfo } = entryInfo;
	let { localHeaderArray, extraFieldLength } = headerInfo;
	let extraBytesLength = 64 - (zipWriterOffset + getLength(localHeaderArray)) % 64;
	if (extraBytesLength < 4) extraBytesLength += 64;
	const rawExtraFieldUSDZ = new Uint8Array(extraBytesLength);
	const extraFieldUSDZView = getDataView(rawExtraFieldUSDZ);
	setUint16(extraFieldUSDZView, 0, EXTRAFIELD_TYPE_USDZ);
	setUint16(extraFieldUSDZView, 2, extraBytesLength - 4);
	const previousLocalHeaderArray = localHeaderArray;
	headerInfo.localHeaderArray = localHeaderArray = new Uint8Array(getLength(previousLocalHeaderArray) + extraBytesLength);
	arraySet(localHeaderArray, previousLocalHeaderArray);
	arraySet(localHeaderArray, rawExtraFieldUSDZ, getLength(previousLocalHeaderArray));
	const localHeaderArrayView = getDataView(localHeaderArray);
	setUint16(localHeaderArrayView, 28, extraFieldLength + extraBytesLength);
	headerInfo.localHeaderView = localHeaderArrayView;
	entryInfo.metadataSize += extraBytesLength;
}
function packUnixId(id) {
	const dataArray = /* @__PURE__ */ new Uint8Array(4);
	getDataView(dataArray).setUint32(0, id, true);
	let length = 4;
	while (length > 1 && dataArray[length - 1] === 0) length--;
	return dataArray.subarray(0, length);
}
function normalizeMsdosAttributes(msdosAttributesRaw, msdosAttributes) {
	if (msdosAttributesRaw !== void 0) msdosAttributesRaw = msdosAttributesRaw & 255;
	else if (msdosAttributes !== void 0) {
		const { readOnly, hidden, system, directory: msdDir, archive } = msdosAttributes;
		let raw = 0;
		if (readOnly) raw |= 1;
		if (hidden) raw |= 2;
		if (system) raw |= 4;
		if (msdDir) raw |= 16;
		if (archive) raw |= 32;
		msdosAttributesRaw = raw & 255;
	}
	if (msdosAttributes === void 0) msdosAttributes = {
		readOnly: Boolean(msdosAttributesRaw & 1),
		hidden: Boolean(msdosAttributesRaw & 2),
		system: Boolean(msdosAttributesRaw & 4),
		directory: Boolean(msdosAttributesRaw & 16),
		archive: Boolean(msdosAttributesRaw & 32)
	};
	return {
		msdosAttributesRaw,
		msdosAttributes
	};
}
function getDataDescriptorInfo({ zip64, dataDescriptor, dataDescriptorSignature }) {
	let dataDescriptorArray = EMPTY_UINT8_ARRAY;
	let dataDescriptorView, dataDescriptorOffset = 0;
	let dataDescriptorLength = zip64 ? 20 : 12;
	if (dataDescriptorSignature) dataDescriptorLength += 4;
	if (dataDescriptor) {
		dataDescriptorArray = new Uint8Array(dataDescriptorLength);
		dataDescriptorView = getDataView(dataDescriptorArray);
		if (dataDescriptorSignature) {
			dataDescriptorOffset = 4;
			setUint32(dataDescriptorView, 0, DATA_DESCRIPTOR_RECORD_SIGNATURE);
		}
	}
	return {
		dataDescriptorArray,
		dataDescriptorView,
		dataDescriptorOffset
	};
}
function setEntryInfo({ crc32, compressedSize, uncompressedSize, headerInfo, dataDescriptorInfo }, { zip64, zipCrypto, passThroughCompression, dataDescriptor }) {
	const { headerView, encrypted } = headerInfo;
	const { dataDescriptorView, dataDescriptorOffset } = dataDescriptorInfo;
	if ((!encrypted || zipCrypto || passThroughCompression) && crc32 !== void 0) {
		setUint32(headerView, 10, crc32);
		if (dataDescriptor) setUint32(dataDescriptorView, dataDescriptorOffset, crc32);
	}
	if (zip64) {
		if (dataDescriptor) {
			setBigUint64(dataDescriptorView, dataDescriptorOffset + 4, BigInt(compressedSize));
			setBigUint64(dataDescriptorView, dataDescriptorOffset + 12, BigInt(uncompressedSize));
		}
	} else {
		setUint32(headerView, 14, compressedSize);
		setUint32(headerView, 18, uncompressedSize);
		if (dataDescriptor) {
			setUint32(dataDescriptorView, dataDescriptorOffset + 4, compressedSize);
			setUint32(dataDescriptorView, dataDescriptorOffset + 8, uncompressedSize);
		}
	}
}
function updateLocalHeader({ rawFilename, encrypted, zip64, localExtraFieldZip64Length, crc32, compressedSize, uncompressedSize, zip64UncompressedSize, zip64CompressedSize }, localHeaderView, { dataDescriptor, passThroughCompression }) {
	if (!dataDescriptor) {
		if (!encrypted || passThroughCompression && crc32 !== void 0) setUint32(localHeaderView, 14, crc32);
		if (!zip64CompressedSize) setUint32(localHeaderView, 18, compressedSize);
		if (!zip64UncompressedSize) setUint32(localHeaderView, 22, uncompressedSize);
	}
	if (zip64 && localExtraFieldZip64Length) {
		const localHeaderOffset = 30 + getLength(rawFilename) + 4;
		setBigUint64(localHeaderView, localHeaderOffset, BigInt(uncompressedSize));
		setBigUint64(localHeaderView, localHeaderOffset + 8, BigInt(compressedSize));
	}
}
async function closeFile(zipWriter, comment, options) {
	const { directoryDataLength, zip64Entries } = createDirectoryRecords(zipWriter.fileEntries);
	const { directoryStart, directoryEnd, directoryArray } = await writeDirectoryRecords(zipWriter, directoryDataLength, options);
	await writeEndOfDirectoryRecord(zipWriter, comment, options, {
		directoryStart,
		directoryEnd,
		directoryDataLength,
		signatureLength: await writeDigitalSignatureRecord(zipWriter, directoryArray, options),
		zip64Entries
	});
}
function createDirectoryRecords(files) {
	let directoryDataLength = 0;
	let zip64Entries = false;
	for (const [, fileEntry] of files) {
		const { rawFilename, rawExtraFieldAES, rawComment, rawExtraFieldNTFS, rawExtraFieldUnix, rawExtraField, rawCentralExtraField, extraFieldExtendedTimestampFlag, extraFieldExtendedTimestampTime, zip64Enabled, uncompressedSize, compressedSize } = fileEntry;
		let { zip64UncompressedSize, zip64CompressedSize } = fileEntry;
		if (!zip64Enabled) {
			if (zip64UncompressedSize && uncompressedSize < 4294967295) zip64UncompressedSize = fileEntry.zip64UncompressedSize = false;
			if (zip64CompressedSize && compressedSize < 4294967295) zip64CompressedSize = fileEntry.zip64CompressedSize = false;
		}
		zip64Entries = zip64Entries || zip64UncompressedSize || zip64CompressedSize;
		const zip64Offset = fileEntry.offset >= MAX_32_BITS;
		const zip64DiskNumberStart = fileEntry.diskNumberStart >= MAX_16_BITS;
		let rawExtraFieldZip64;
		if (zip64Offset || zip64DiskNumberStart || zip64UncompressedSize || zip64CompressedSize) {
			const length = 4 + (zip64UncompressedSize ? 8 : 0) + (zip64CompressedSize ? 8 : 0) + (zip64Offset ? 8 : 0) + (zip64DiskNumberStart ? 4 : 0);
			const extraFieldZip64 = createRecordWriter(length);
			extraFieldZip64.writeUint16(1);
			extraFieldZip64.writeUint16(length - 4);
			if (zip64UncompressedSize) extraFieldZip64.writeUint64(uncompressedSize);
			if (zip64CompressedSize) extraFieldZip64.writeUint64(compressedSize);
			if (zip64Offset) extraFieldZip64.writeUint64(fileEntry.offset);
			if (zip64DiskNumberStart) extraFieldZip64.writeUint32(fileEntry.diskNumberStart);
			rawExtraFieldZip64 = extraFieldZip64.array;
		} else rawExtraFieldZip64 = EMPTY_UINT8_ARRAY;
		fileEntry.rawExtraFieldZip64 = rawExtraFieldZip64;
		fileEntry.zip64Offset = zip64Offset;
		fileEntry.zip64DiskNumberStart = zip64DiskNumberStart;
		let rawExtraFieldTimestamp;
		if (extraFieldExtendedTimestampTime === void 0) rawExtraFieldTimestamp = EMPTY_UINT8_ARRAY;
		else {
			const extraFieldTimestamp = createRecordWriter(9);
			extraFieldTimestamp.writeUint16(EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP);
			extraFieldTimestamp.writeUint16(5);
			extraFieldTimestamp.writeUint8(extraFieldExtendedTimestampFlag);
			extraFieldTimestamp.writeUint32(extraFieldExtendedTimestampTime);
			rawExtraFieldTimestamp = extraFieldTimestamp.array;
		}
		fileEntry.rawExtraFieldExtendedTimestamp = rawExtraFieldTimestamp;
		const extraFieldLength = getLength(rawExtraFieldZip64, rawExtraFieldAES, rawExtraFieldNTFS, rawExtraFieldUnix, rawExtraFieldTimestamp, rawExtraField, rawCentralExtraField);
		if (extraFieldLength > 65535) throw new Error(ERR_INVALID_EXTRAFIELD_DATA);
		directoryDataLength += 46 + getLength(rawFilename, rawComment) + extraFieldLength;
	}
	return {
		directoryDataLength,
		zip64Entries
	};
}
async function writeDirectoryRecords(zipWriter, directoryDataLength, options) {
	const { fileEntries, writer } = zipWriter;
	const directoryArray = new Uint8Array(directoryDataLength);
	await initStream(writer);
	let offset = 0;
	let directoryDiskOffset = 0;
	let directoryStartDiskNumber = getDiskNumber(writer);
	let directoryStartDiskOffset = getDiskOffset(writer);
	let directoryEndDiskEntriesLength = 0;
	for (const [indexFileEntry, fileEntry] of Array.from(fileEntries.values()).entries()) {
		const { offset: fileEntryOffset, rawFilename, rawExtraFieldZip64, rawExtraFieldAES, rawExtraFieldExtendedTimestamp, rawExtraFieldNTFS, rawExtraFieldUnix, rawExtraField, rawCentralExtraField, rawComment, versionMadeBy, headerArray, headerView, zip64UncompressedSize, zip64CompressedSize, zip64DiskNumberStart, zip64Offset, internalFileAttributes, externalFileAttributes, diskNumberStart, uncompressedSize, compressedSize } = fileEntry;
		const extraFieldLength = getLength(rawExtraFieldZip64, rawExtraFieldAES, rawExtraFieldExtendedTimestamp, rawExtraFieldNTFS, rawExtraFieldUnix, rawExtraField, rawCentralExtraField);
		const directoryRecordLength = 46 + getLength(rawFilename, rawComment) + extraFieldLength;
		if (exceedsAvailableSize(writer, offset + directoryRecordLength - directoryDiskOffset)) {
			await writeData(writer, directoryArray.slice(directoryDiskOffset, offset));
			directoryDiskOffset = offset;
			directoryEndDiskEntriesLength = 0;
			await writer.closeDisk();
		}
		if (indexFileEntry == 0) {
			directoryStartDiskNumber = getDiskNumber(writer);
			directoryStartDiskOffset = getDiskOffset(writer);
		}
		if (!zip64UncompressedSize) setUint32(headerView, 18, uncompressedSize);
		if (!zip64CompressedSize) setUint32(headerView, 14, compressedSize);
		if ((zip64Offset || zip64DiskNumberStart) && fileEntry.version < 45) setUint16(headerView, 0, 45);
		const directoryRecord = createRecordWriter(directoryRecordLength);
		directoryRecord.writeUint32(CENTRAL_FILE_HEADER_SIGNATURE);
		directoryRecord.writeUint16(versionMadeBy);
		directoryRecord.writeBytes(headerArray.subarray(0, 24));
		directoryRecord.writeUint16(extraFieldLength);
		directoryRecord.writeUint16(getLength(rawComment));
		directoryRecord.writeUint16(zip64DiskNumberStart ? MAX_16_BITS : diskNumberStart);
		directoryRecord.writeUint16(internalFileAttributes);
		directoryRecord.writeUint32(externalFileAttributes);
		directoryRecord.writeUint32(zip64Offset ? MAX_32_BITS : fileEntryOffset);
		directoryRecord.writeBytes(rawFilename);
		directoryRecord.writeBytes(rawExtraFieldZip64);
		directoryRecord.writeBytes(rawExtraFieldAES);
		directoryRecord.writeBytes(rawExtraFieldExtendedTimestamp);
		directoryRecord.writeBytes(rawExtraFieldNTFS);
		directoryRecord.writeBytes(rawExtraFieldUnix);
		directoryRecord.writeBytes(rawExtraField);
		directoryRecord.writeBytes(rawCentralExtraField);
		directoryRecord.writeBytes(rawComment);
		arraySet(directoryArray, directoryRecord.array, offset);
		offset += directoryRecordLength;
		directoryEndDiskEntriesLength++;
		if (options.onprogress) try {
			await options.onprogress(indexFileEntry + 1, fileEntries.size, new Entry(fileEntry));
		} catch {}
	}
	await writeData(writer, directoryDiskOffset ? directoryArray.slice(directoryDiskOffset) : directoryArray);
	return {
		directoryStart: {
			diskNumber: directoryStartDiskNumber,
			diskOffset: directoryStartDiskOffset
		},
		directoryEnd: {
			diskNumber: getDiskNumber(writer),
			entriesLength: directoryEndDiskEntriesLength
		},
		directoryArray
	};
}
async function writeDigitalSignatureRecord(zipWriter, directoryArray, options) {
	const signCentralDirectory = getFunctionOptionValue(zipWriter, options, OPTION_SIGN_CENTRAL_DIRECTORY);
	if (signCentralDirectory) {
		const signatureData = await signCentralDirectory(directoryArray);
		const signatureDataLength = getLength(signatureData);
		if (signatureDataLength > 65535) throw new Error(ERR_INVALID_SIGNATURE_DATA);
		const signatureRecord = createRecordWriter(6 + signatureDataLength);
		signatureRecord.writeUint32(DIGITAL_SIGNATURE_RECORD_SIGNATURE);
		signatureRecord.writeUint16(signatureDataLength);
		signatureRecord.writeBytes(signatureData);
		const { writer } = zipWriter;
		if (exceedsAvailableSize(writer, getLength(signatureRecord.array))) await writer.closeDisk();
		await writeData(writer, signatureRecord.array);
		return 6 + signatureDataLength;
	}
	return 0;
}
async function writeEndOfDirectoryRecord(zipWriter, comment, options, cdInfo) {
	const { writer } = zipWriter;
	const { directoryStart, directoryEnd, signatureLength, zip64Entries } = cdInfo;
	let { directoryDataLength } = cdInfo;
	let fileEntriesLength = zipWriter.fileEntries.size;
	let diskNumber = directoryStart.diskNumber;
	let directoryOffset = getSegmentOffset(zipWriter, directoryStart);
	const commentLength = getLength(comment);
	if (commentLength > 65535) throw new Error(ERR_INVALID_COMMENT);
	let zip64 = getOptionValue(zipWriter, options, PROPERTY_NAME_ZIP64);
	let lastDiskNumber = getDiskNumber(writer);
	if (exceedsAvailableSize(writer, (zip64 ? 98 : 22) + commentLength)) lastDiskNumber++;
	if (directoryOffset >= 4294967295 || directoryDataLength >= 4294967295 || fileEntriesLength >= 65535 || lastDiskNumber >= 65535) {
		if (zip64 === false) throw new Error(ERR_UNSUPPORTED_FORMAT);
		else zip64 = true;
	} else if (zip64 === void 0 && zip64Entries) zip64 = true;
	const endOfdirectoryRecord = createRecordWriter(zip64 ? 98 : 22);
	if (exceedsAvailableSize(writer, getLength(endOfdirectoryRecord.array) + commentLength)) await writer.closeDisk();
	lastDiskNumber = getDiskNumber(writer);
	let diskFileEntriesLength = lastDiskNumber == directoryEnd.diskNumber ? directoryEnd.entriesLength : 0;
	if (zip64) {
		endOfdirectoryRecord.writeUint32(ZIP64_END_OF_CENTRAL_DIR_SIGNATURE);
		endOfdirectoryRecord.writeUint64(44);
		endOfdirectoryRecord.writeUint16(45);
		endOfdirectoryRecord.writeUint16(45);
		endOfdirectoryRecord.writeUint32(lastDiskNumber);
		endOfdirectoryRecord.writeUint32(diskNumber);
		endOfdirectoryRecord.writeUint64(diskFileEntriesLength);
		endOfdirectoryRecord.writeUint64(fileEntriesLength);
		endOfdirectoryRecord.writeUint64(directoryDataLength);
		endOfdirectoryRecord.writeUint64(directoryOffset);
		endOfdirectoryRecord.writeUint32(ZIP64_END_OF_CENTRAL_DIR_LOCATOR_SIGNATURE);
		endOfdirectoryRecord.writeUint32(lastDiskNumber);
		endOfdirectoryRecord.writeUint64(BigInt(getSegmentOffset(zipWriter, writer)) + BigInt(directoryDataLength) + BigInt(signatureLength));
		endOfdirectoryRecord.writeUint32(lastDiskNumber + 1);
		if (getOptionValue(zipWriter, options, "supportZip64SplitFile", true)) {
			lastDiskNumber = MAX_16_BITS;
			diskNumber = MAX_16_BITS;
		}
		diskFileEntriesLength = MAX_16_BITS;
		fileEntriesLength = MAX_16_BITS;
		directoryOffset = MAX_32_BITS;
		directoryDataLength = MAX_32_BITS;
	}
	endOfdirectoryRecord.writeUint32(END_OF_CENTRAL_DIR_SIGNATURE);
	endOfdirectoryRecord.writeUint16(lastDiskNumber);
	endOfdirectoryRecord.writeUint16(diskNumber);
	endOfdirectoryRecord.writeUint16(diskFileEntriesLength);
	endOfdirectoryRecord.writeUint16(fileEntriesLength);
	endOfdirectoryRecord.writeUint32(directoryDataLength);
	endOfdirectoryRecord.writeUint32(directoryOffset);
	endOfdirectoryRecord.writeUint16(commentLength);
	await writeData(writer, endOfdirectoryRecord.array);
	if (commentLength) await writeData(writer, comment);
}
function createRecordWriter(length) {
	const array = new Uint8Array(length);
	const view = getDataView(array);
	let offset = 0;
	return {
		array,
		writeUint8: (value) => {
			setUint8(view, offset, value);
			offset += 1;
		},
		writeUint16: (value) => {
			setUint16(view, offset, value);
			offset += 2;
		},
		writeUint32: (value) => {
			setUint32(view, offset, value);
			offset += 4;
		},
		writeUint64: (value) => {
			setBigUint64(view, offset, BigInt(value));
			offset += 8;
		},
		writeBytes: (value) => {
			arraySet(array, value, offset);
			offset += getLength(value);
		},
		skip: (count) => offset += count
	};
}
function getDiskNumber(writer) {
	const { diskNumber = 0 } = writer;
	return diskNumber;
}
function getDiskOffset(writer) {
	const { diskOffset = 0 } = writer;
	return diskOffset;
}
function exceedsAvailableSize(writer, length) {
	const { availableSize = INFINITY_VALUE } = writer;
	return length > availableSize;
}
function getSegmentOffset(zipWriter, { diskNumber = 0, diskOffset = 0 }) {
	return zipWriter.offset - diskOffset - (diskNumber ? zipWriter.initialOffset : 0);
}
async function startsWithSplitZipSignature(reader) {
	return getUint32(getDataView(await readUint8Array(reader, 0, 4)), 0) == SPLIT_ZIP_FILE_SIGNATURE;
}
function removeExtraFieldZip64(rawExtraField) {
	const rawExtraFieldView = getDataView(rawExtraField);
	let offsetExtraField = 0;
	while (offsetExtraField + 4 <= getLength(rawExtraField)) {
		const size = 4 + getUint16(rawExtraFieldView, offsetExtraField + 2);
		if (getUint16(rawExtraFieldView, offsetExtraField) == 1) return removeExtraFieldZip64(concat(rawExtraField.subarray(0, offsetExtraField), rawExtraField.subarray(Math.min(offsetExtraField + size, getLength(rawExtraField)))));
		offsetExtraField += size;
	}
	return rawExtraField;
}
async function copyZipData(zipWriter, reader, entries, directoryOffset) {
	const { writer } = zipWriter;
	const entryPositions = /* @__PURE__ */ new Map();
	if (writer.closeDisk) {
		const sortedEntries = Array.from(entries).sort((firstEntry, secondEntry) => getSourceOffset(reader, firstEntry) - getSourceOffset(reader, secondEntry));
		let copiedLength = 0;
		for (const entry of sortedEntries) {
			const sourceOffset = getSourceOffset(reader, entry);
			await copyData(zipWriter, reader, copiedLength, sourceOffset - copiedLength);
			if (exceedsAvailableSize(writer, await getLocalHeaderLength(reader, sourceOffset))) await writer.closeDisk();
			entryPositions.set(entry, {
				offset: getSegmentOffset(zipWriter, writer),
				diskNumberStart: getDiskNumber(writer)
			});
			copiedLength = sourceOffset;
		}
		await copyData(zipWriter, reader, copiedLength, directoryOffset - copiedLength);
	} else {
		const baseOffset = zipWriter.offset;
		await copyData(zipWriter, reader, 0, directoryOffset);
		entries.forEach((entry) => entryPositions.set(entry, {
			offset: baseOffset + getSourceOffset(reader, entry),
			diskNumberStart: 0
		}));
	}
	return entryPositions;
}
async function copyData(zipWriter, reader, offset, size) {
	if (size > 0) {
		const { writer } = zipWriter;
		let copiedLength = 0;
		try {
			await flushBufferedData(createReadable(reader, {
				offset,
				size
			}), writer, void 0, (chunkLength) => copiedLength += chunkLength);
		} catch (error) {
			zipWriter.hasCorruptedEntries = true;
			try {
				error.corruptedEntry = true;
			} catch {}
			throw error;
		} finally {
			writer.size += copiedLength;
			zipWriter.offset += copiedLength;
		}
	}
}
async function getLocalHeaderLength(reader, offset) {
	const headerArray = await readUint8Array(reader, offset, 30);
	if (getLength(headerArray) < 30) return 30;
	const headerView = getDataView(headerArray);
	return 30 + getUint16(headerView, 26) + getUint16(headerView, 28);
}
function getSourceOffset(reader, { offset, diskNumberStart }) {
	return offset + (reader.getDiskOffset ? reader.getDiskOffset(diskNumberStart) : 0);
}
function getSplitZipSignatureArray() {
	const signatureArray = /* @__PURE__ */ new Uint8Array(4);
	setUint32(getDataView(signatureArray), 0, SPLIT_ZIP_FILE_SIGNATURE);
	return signatureArray;
}
async function writeSplitZipSignature(zipWriter, writer) {
	delete zipWriter.addSplitZipSignature;
	await writeData(writer, getSplitZipSignatureArray());
	zipWriter.offset += 4;
}
async function writeData(writer, array) {
	const { writable } = writer;
	const streamWriter = writable.getWriter();
	try {
		await streamWriter.ready;
		writer.size += getLength(array);
		await streamWriter.write(array);
	} finally {
		streamWriter.releaseLock();
	}
}
async function flushBufferedData(readable, writer, signal, onChunkWritten) {
	const streamWriter = writer.writable.getWriter();
	try {
		await readable.pipeTo(new WritableStream({ async write(chunk) {
			await streamWriter.ready;
			await streamWriter.write(chunk);
			onChunkWritten(getLength(chunk));
		} }), {
			preventClose: true,
			preventAbort: true,
			signal
		});
	} finally {
		streamWriter.releaseLock();
	}
}
function getTimeNTFS(date) {
	if (date) {
		const timeNTFS = (BigInt(date.getTime()) + BigInt(0xa9730b66800)) * BigInt(1e4);
		return timeNTFS < MIN_NTFS_TIME ? MIN_NTFS_TIME : timeNTFS > MAX_NTFS_TIME ? MAX_NTFS_TIME : timeNTFS;
	}
}
function getTimeUnix(date) {
	return Math.floor(date.getTime() / 1e3);
}
function inUnixTimeRange(timeUnix) {
	return timeUnix >= MIN_UNIX_TIME && timeUnix <= MAX_UNIX_TIME;
}
function clampUnixTime(timeUnix) {
	return Math.min(MAX_UNIX_TIME, Math.max(MIN_UNIX_TIME, timeUnix));
}
function getOptionValue(zipWriter, options, name, defaultValue) {
	const result = options[name] === void 0 ? zipWriter.options[name] : options[name];
	return result === void 0 ? defaultValue : result;
}
function getDateOptionValue(zipWriter, options, name, defaultValue) {
	const date = getOptionValue(zipWriter, options, name, defaultValue);
	if (date === null) return defaultValue;
	if (date !== void 0 && (typeof date.getTime != "function" || Number.isNaN(date.getTime()))) throw new Error(ERR_INVALID_DATE);
	return date;
}
function getFunctionOptionValue(zipWriter, options, name) {
	return checkFunctionOption(getOptionValue(zipWriter, options, name));
}
function getNumberOptionValue(zipWriter, options, name, defaultValue) {
	return toNumber(getOptionValue(zipWriter, options, name, defaultValue));
}
function getMaximumCompressedSize(uncompressedSize) {
	return uncompressedSize + 5 * (Math.floor(uncompressedSize / 16383) + 1);
}
function isCompressed(compressionMethod, level) {
	return compressionMethod === void 0 ? level === void 0 || level > 0 : compressionMethod !== 0;
}
function getUint16(view, offset) {
	return view.getUint16(offset, true);
}
function getUint32(view, offset) {
	return view.getUint32(offset, true);
}
function setUint8(view, offset, value) {
	view.setUint8(offset, value);
}
function setUint16(view, offset, value) {
	view.setUint16(offset, value, true);
}
function setUint32(view, offset, value) {
	view.setUint32(offset, value, true);
}
function setBigUint64(view, offset, value) {
	view.setBigUint64(offset, value, true);
}
function arraySet(array, typedArray, offset) {
	array.set(typedArray, offset);
}
function getLength(...arrayLikes) {
	let result = 0;
	arrayLikes.forEach((arrayLike) => arrayLike && (result += arrayLike.length));
	return result;
}
function getHeaderArrayData({ version, bitFlag, compressionMethod, uncompressedSize, compressedSize, lastModDate, rawLastModDate, rawFilename, zip64CompressedSize, zip64UncompressedSize, extraFieldLength }) {
	const headerRecord = createRecordWriter(26);
	const headerArray = headerRecord.array;
	const headerView = getDataView(headerArray);
	headerRecord.writeUint16(version);
	headerRecord.writeUint16(bitFlag);
	headerRecord.writeUint16(compressionMethod);
	if (rawLastModDate === void 0) {
		const dateArray = /* @__PURE__ */ new Uint32Array(1);
		const dateView = getDataView(dateArray);
		setUint16(dateView, 0, (lastModDate.getHours() << 6 | lastModDate.getMinutes()) << 5 | lastModDate.getSeconds() / 2);
		setUint16(dateView, 2, (lastModDate.getFullYear() - 1980 << 4 | lastModDate.getMonth() + 1) << 5 | lastModDate.getDate());
		rawLastModDate = dateArray[0];
	}
	headerRecord.writeUint32(rawLastModDate);
	headerRecord.skip(4);
	if (zip64CompressedSize || compressedSize !== void 0) headerRecord.writeUint32(zip64CompressedSize ? MAX_32_BITS : compressedSize);
	else headerRecord.skip(4);
	if (zip64UncompressedSize || uncompressedSize !== void 0) headerRecord.writeUint32(zip64UncompressedSize ? MAX_32_BITS : uncompressedSize);
	else headerRecord.skip(4);
	headerRecord.writeUint16(getLength(rawFilename));
	headerRecord.writeUint16(extraFieldLength);
	return {
		headerArray,
		headerView,
		rawLastModDate
	};
}
function isPrintableASCIIText(rawText) {
	return rawText.every((characterCode) => characterCode >= MIN_PRINTABLE_ASCII_CHARACTER_CODE && characterCode <= MAX_PRINTABLE_ASCII_CHARACTER_CODE);
}
function getBitFlag(level, useUnicodeFileNames, dataDescriptor, encrypted, compressionMethod) {
	let bitFlag = 0;
	if (useUnicodeFileNames) bitFlag = bitFlag | BITFLAG_LANG_ENCODING_FLAG;
	if (dataDescriptor) bitFlag = bitFlag | 8;
	if (compressionMethod == 8 || compressionMethod == 9) {
		if (level >= 0 && level <= 3) bitFlag = bitFlag | 6;
		if (level > 3 && level <= 5) bitFlag = bitFlag | 4;
		if (level == 9) bitFlag = bitFlag | 2;
	}
	if (encrypted) bitFlag = bitFlag | 1;
	return bitFlag;
}
//#endregion
//#region node_modules/@zip.js/zip.js/lib/zip-core-base.js
try {
	setDefaultConfiguration({ baseURI: import.meta.url });
} catch {}
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/zlib-streams-inline.js
var n = [
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	13,
	15,
	17,
	19,
	23,
	27,
	31,
	35,
	43,
	51,
	59,
	67,
	83,
	99,
	115,
	131,
	163,
	195,
	227,
	258
];
var t = [
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	1,
	1,
	1,
	1,
	2,
	2,
	2,
	2,
	3,
	3,
	3,
	3,
	4,
	4,
	4,
	4,
	5,
	5,
	5,
	5,
	0
];
var r = [
	1,
	2,
	3,
	4,
	5,
	7,
	9,
	13,
	17,
	25,
	33,
	49,
	65,
	97,
	129,
	193,
	257,
	385,
	513,
	769,
	1025,
	1537,
	2049,
	3073,
	4097,
	6145,
	8193,
	12289,
	16385,
	24577
];
var e = [
	0,
	0,
	0,
	0,
	1,
	1,
	2,
	2,
	3,
	3,
	4,
	4,
	5,
	5,
	6,
	6,
	7,
	7,
	8,
	8,
	9,
	9,
	10,
	10,
	11,
	11,
	12,
	12,
	13,
	13
];
var o = [
	16,
	17,
	18,
	0,
	8,
	7,
	9,
	6,
	10,
	5,
	11,
	4,
	12,
	3,
	13,
	2,
	14,
	1,
	15
];
var f = /* @__PURE__ */ new Uint8Array(288);
f.fill(8, 0, 144), f.fill(9, 144, 256), f.fill(7, 256, 280), f.fill(8, 280, 288);
var b = (/* @__PURE__ */ new Uint8Array(30)).fill(5);
function l(n) {
	const t = /* @__PURE__ */ new Uint16Array(16);
	for (const r of n) t[r]++;
	t[0] = 0;
	const r = /* @__PURE__ */ new Uint16Array(17);
	for (let n = 1; n <= 15; n++) r[n + 1] = r[n] + t[n];
	const e = new Uint16Array(n.length);
	for (let t = 0; t < n.length; t++) n[t] && (e[r[n[t]]++] = t);
	return {
		lengthCounts: t,
		symbols: e
	};
}
var p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function s(s) {
	let X;
	s({ wasmURI: () => (X || (X = "data:application/wasm;base64," + function(n) {
		let t = "";
		const r = n.length;
		let e = 0;
		for (; e + 2 < r; e += 3) {
			const r = n[e] << 16 | n[e + 1] << 8 | n[e + 2];
			t += p[r >> 18 & 63] + p[r >> 12 & 63] + p[r >> 6 & 63] + p[63 & r];
		}
		const o = r - e;
		if (1 === o) {
			const r = n[e] << 16;
			t += p[r >> 18 & 63] + p[r >> 12 & 63] + "==";
		} else if (2 === o) {
			const r = n[e] << 16 | n[e + 1] << 8;
			t += p[r >> 18 & 63] + p[r >> 12 & 63] + p[r >> 6 & 63] + "=";
		}
		return t;
	}(function(p) {
		let s = 0, X = 0, x = 0, Y = /* @__PURE__ */ new Uint8Array(1024), a = 0, w = 0;
		for (; !w;) {
			w = U(1);
			const n = U(2);
			if (0 == n) h();
			else if (1 == n) P(l(f), l(b));
			else {
				if (2 != n) throw new Error("invalid deflate block type");
				P(...B());
			}
		}
		return Y.subarray(0, a);
		function c() {
			if (s >= p.length) throw new Error("unexpected end of deflate data");
			return p[s++];
		}
		function U(n) {
			for (; x < n;) X |= c() << x, x += 8;
			const t = X & (1 << n) - 1;
			return X >>>= n, x -= n, t;
		}
		function h() {
			X = 0, x = 0;
			const n = c() | c() << 8;
			s += 2, R(a + n);
			for (let t = 0; t < n; t++) Y[a++] = c();
		}
		function P(o, f) {
			let b = i(o);
			for (; 256 != b;) {
				if (b < 256) R(a + 1), Y[a++] = b;
				else {
					const o = b - 257, l = n[o] + U(t[o]), p = i(f), s = r[p] + U(e[p]);
					R(a + l);
					const X = a - s;
					for (let n = 0; n < l; n++) Y[a++] = Y[X + n];
				}
				b = i(o);
			}
		}
		function B() {
			const n = U(5) + 257, t = U(5) + 1, r = U(4) + 4, e = /* @__PURE__ */ new Uint8Array(19);
			for (let n = 0; n < r; n++) e[o[n]] = U(3);
			const f = l(e), b = new Uint8Array(n + t);
			let p = 0;
			for (; p < b.length;) {
				const n = i(f);
				if (n < 16) b[p++] = n;
				else if (16 == n) {
					const n = b[p - 1];
					let t = U(2) + 3;
					for (; t--;) b[p++] = n;
				} else p += 17 == n ? U(3) + 3 : U(7) + 11;
			}
			return [l(b.subarray(0, n)), l(b.subarray(n))];
		}
		function i(n) {
			const { lengthCounts: t, symbols: r } = n;
			let e = 0, o = 0, f = 0;
			for (let n = 1; n <= 15; n++) {
				e |= U(1);
				const b = t[n];
				if (e - o < b) return r[f + (e - o)];
				f += b, o = o + b << 1, e <<= 1;
			}
			throw new Error("invalid huffman code");
		}
		function R(n) {
			if (Y.length < n) {
				let t = 2 * Y.length;
				for (; t < n;) t *= 2;
				const r = new Uint8Array(t);
				r.set(Y.subarray(0, a)), Y = r;
			}
		}
	}(function(n) {
		const t = (n = String(n).replace(/[^A-Za-z0-9+/=]/g, "")).length, r = [];
		for (let e = 0; e < t; e += 4) {
			const t = p.indexOf(n[e]) << 18 | p.indexOf(n[e + 1]) << 12 | (63 & p.indexOf(n[e + 2])) << 6 | 63 & p.indexOf(n[e + 3]);
			r.push(t >> 16 & 255), "=" !== n[e + 2] && r.push(t >> 8 & 255), "=" !== n[e + 3] && r.push(255 & t);
		}
		return new Uint8Array(r);
	}("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")))), X) });
}
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/streams/zlib-wasm/zlib-streams.js
var FORMAT_DEFLATE = "deflate";
var FORMAT_DEFLATE_RAW = "deflate-raw";
var FORMAT_DEFLATE64_RAW = "deflate64-raw";
var FORMAT_GZIP = "gzip";
var wasm$1;
var malloc;
var free;
var memory;
var initError;
function setWasmExports$1(wasmAPI) {
	wasm$1 = wasmAPI;
	({malloc, free, memory} = wasm$1);
	if (typeof malloc !== "function" || typeof free !== "function" || !memory) {
		wasm$1 = malloc = free = memory = null;
		throw new Error("Invalid WASM module");
	}
}
function setInitError(error) {
	initError = error;
}
function _make(isCompress, type, options = {}) {
	if (!wasm$1) {
		const error = /* @__PURE__ */ new Error("WASM module not loaded");
		error.cause = initError;
		throw error;
	}
	const level = typeof options.level === "number" ? options.level : -1;
	const outBufferSize = typeof options.outBuffer === "number" ? options.outBuffer : 65536;
	const inBufferSize = typeof options.inBufferSize === "number" ? options.inBufferSize : 65536;
	return new TransformStream({
		start() {
			try {
				let result;
				this.out = malloc(outBufferSize);
				this.in = malloc(inBufferSize);
				this.inBufferSize = inBufferSize;
				if (!this.out || !this.in) throw new Error("allocation failed");
				if (isCompress) {
					this._process = wasm$1.deflate_process;
					this._last_consumed = wasm$1.deflate_last_consumed;
					this._end = wasm$1.deflate_end;
					this.streamHandle = wasm$1.deflate_new();
					if (type === FORMAT_GZIP) result = wasm$1.deflate_init_gzip(this.streamHandle, level);
					else if (type === FORMAT_DEFLATE_RAW) result = wasm$1.deflate_init_raw(this.streamHandle, level);
					else result = wasm$1.deflate_init(this.streamHandle, level);
				} else if (type === FORMAT_DEFLATE64_RAW) {
					this._process = wasm$1.inflate9_process;
					this._last_consumed = wasm$1.inflate9_last_consumed;
					this._end = wasm$1.inflate9_end;
					this.streamHandle = wasm$1.inflate9_new();
					result = wasm$1.inflate9_init_raw(this.streamHandle);
				} else {
					this._process = wasm$1.inflate_process;
					this._last_consumed = wasm$1.inflate_last_consumed;
					this._end = wasm$1.inflate_end;
					this.streamHandle = wasm$1.inflate_new();
					if (type === FORMAT_DEFLATE_RAW) result = wasm$1.inflate_init_raw(this.streamHandle);
					else if (type === FORMAT_GZIP) result = wasm$1.inflate_init_gzip(this.streamHandle);
					else result = wasm$1.inflate_init(this.streamHandle);
				}
				if (result !== 0) throw new Error("init failed:" + result);
			} catch (error) {
				disposeStream(this);
				throw error;
			}
		},
		transform(chunk, controller) {
			try {
				const buffer = chunk;
				const heap = new Uint8Array(memory.buffer);
				const process = this._process;
				const last_consumed = this._last_consumed;
				const out = this.out;
				let offset = 0;
				while (offset < buffer.length) {
					const toRead = Math.min(buffer.length - offset, 32768);
					if (!this.in || this.inBufferSize < toRead) {
						if (this.in && free) {
							free(this.in);
							this.in = 0;
						}
						this.in = malloc(toRead);
						this.inBufferSize = toRead;
						if (!this.in) throw new Error("allocation failed");
					}
					heap.set(buffer.subarray(offset, offset + toRead), this.in);
					const result = process(this.streamHandle, this.in, toRead, out, outBufferSize, 0);
					const code = result >> 24 & 255;
					const signedCode = code & 128 ? code - 256 : code;
					if (signedCode < 0) throw new Error("process error:" + signedCode);
					const prod = result & 16777215;
					if (prod) controller.enqueue(heap.slice(out, out + prod));
					const consumed = last_consumed(this.streamHandle);
					if (consumed === 0 && prod === 0) break;
					offset += consumed;
				}
			} catch (error) {
				disposeStream(this);
				controller.error(error);
			}
		},
		flush(controller) {
			try {
				const heap = new Uint8Array(memory.buffer);
				const process = this._process;
				const out = this.out;
				while (true) {
					const result = process(this.streamHandle, 0, 0, out, outBufferSize, 4);
					const code = result >> 24 & 255;
					const signedCode = code & 128 ? code - 256 : code;
					if (signedCode < 0) throw new Error("process error:" + signedCode);
					const produced = result & 16777215;
					if (produced) controller.enqueue(heap.slice(out, out + produced));
					if (code === 1 || produced === 0) break;
				}
			} catch (error) {
				controller.error(error);
			} finally {
				const result = disposeStream(this);
				if (result !== 0) controller.error(/* @__PURE__ */ new Error("end error:" + result));
			}
		},
		cancel() {
			disposeStream(this);
		}
	});
	function disposeStream(state) {
		let endResult = 0;
		if (state.streamHandle && state._end) endResult = state._end(state.streamHandle);
		state.streamHandle = 0;
		if (state.in && free) free(state.in);
		state.in = 0;
		if (state.out && free) free(state.out);
		state.out = 0;
		return endResult;
	}
}
var CompressionStreamZlib = class {
	constructor(type = FORMAT_DEFLATE, options) {
		return _make(true, type, options);
	}
};
var DecompressionStreamZlib = class {
	constructor(type = FORMAT_DEFLATE, options) {
		return _make(false, type, options);
	}
};
CompressionStreamZlib.requiresModule = true;
DecompressionStreamZlib.requiresModule = true;
CompressionStreamZlib.supportedFormats = [
	FORMAT_DEFLATE,
	FORMAT_DEFLATE_RAW,
	FORMAT_GZIP
];
DecompressionStreamZlib.supportedFormats = [
	FORMAT_DEFLATE,
	FORMAT_DEFLATE_RAW,
	FORMAT_GZIP,
	FORMAT_DEFLATE64_RAW
];
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/streams/zlib-wasm/aes-hmac-sha1-wasm.js
var BUFFER_LENGTH = 65536;
var DIGEST_LENGTH = 20;
var wasm;
var buffer;
function setWasmExports(wasmAPI) {
	if (typeof wasmAPI.aes_hmac_new == "function") {
		wasm = wasmAPI;
		buffer = 0;
	}
}
function createEngine(key, authenticationKey) {
	const exports = wasm;
	let context = exports ? createContext(exports, key, authenticationKey) : 0;
	if (!context) return createEngine$2(key, authenticationKey);
	const scratch = buffer;
	return {
		process(data, decrypt) {
			for (let offset = 0; offset < data.length; offset += BUFFER_LENGTH) {
				const chunk = data.subarray(offset, offset + BUFFER_LENGTH);
				const heap = getHeap(exports);
				heap.set(chunk, scratch);
				exports.aes_hmac_process(context, scratch, chunk.length, decrypt ? 1 : 0);
				chunk.set(heap.subarray(scratch, scratch + chunk.length));
			}
		},
		digest() {
			exports.aes_hmac_end(context, scratch);
			context = 0;
			return getHeap(exports).slice(scratch, scratch + DIGEST_LENGTH);
		},
		dispose() {
			if (context) {
				exports.aes_hmac_end(context, 0);
				context = 0;
			}
		}
	};
}
function createContext(exports, key, authenticationKey) {
	if (!buffer) buffer = exports.malloc(BUFFER_LENGTH);
	const context = buffer ? exports.aes_hmac_new() : 0;
	if (context) {
		const heap = getHeap(exports);
		heap.set(key, buffer);
		heap.set(authenticationKey, buffer + key.length);
		if (exports.aes_hmac_init(context, buffer, key.length, buffer + key.length, authenticationKey.length)) {
			exports.aes_hmac_end(context, 0);
			return 0;
		}
	}
	return context;
}
function getHeap(exports) {
	return new Uint8Array(exports.memory.buffer);
}
//#endregion
//#region node_modules/@zip.js/zip.js/lib/core/streams/zlib-wasm/zlib-streams-loader.js
var initializedModule = false;
async function initModule(wasmURI, { baseURI }) {
	if (!initializedModule) try {
		await instantiateModule(wasmURI, baseURI);
		initializedModule = true;
	} catch (error) {
		setInitError(error);
		throw error;
	}
}
async function instantiateModule(wasmURI, baseURI) {
	let arrayBuffer, uri;
	try {
		try {
			uri = new URL(wasmURI, baseURI);
		} catch {}
		arrayBuffer = await (await fetch(uri)).arrayBuffer();
	} catch (error) {
		if (wasmURI.startsWith("data:application/wasm;base64,")) arrayBuffer = arrayBufferFromDataURI(wasmURI);
		else throw error;
	}
	const wasmInstance = await WebAssembly.instantiate(arrayBuffer);
	setWasmExports$1(wasmInstance.instance.exports);
	setWasmExports(wasmInstance.instance.exports);
}
function arrayBufferFromDataURI(dataURI) {
	const base64 = dataURI.split(",")[1];
	const binary = atob(base64);
	const len = binary.length;
	const bytes = new Uint8Array(len);
	for (let i = 0; i < len; ++i) bytes[i] = binary.charCodeAt(i);
	return bytes.buffer;
}
//#endregion
//#region node_modules/@zip.js/zip.js/lib/zip-module-wasm-base.js
var modulePromise;
setAESEngine(createEngine);
configureWorker({ initModule: (config) => {
	if (!modulePromise) {
		let { wasmURI } = config;
		if (typeof wasmURI == "function") wasmURI = wasmURI();
		modulePromise = initModule(wasmURI, config).catch((error) => {
			modulePromise = null;
			throw error;
		});
	}
	return modulePromise;
} });
setDefaultConfiguration({
	CompressionStreamFallback: CompressionStreamZlib,
	DecompressionStreamFallback: DecompressionStreamZlib
});
//#endregion
//#region node_modules/@zip.js/zip.js/lib/zip-module-wasm.js
s(setDefaultConfiguration);
//#endregion
//#region node_modules/@zip.js/zip.js/lib/zip-fs-wasm.js
e$1(setDefaultConfiguration);
//#endregion
export { BlobReader, BlobWriter, TextReader, ZipWriter };
