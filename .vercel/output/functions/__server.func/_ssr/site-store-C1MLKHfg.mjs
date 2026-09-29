import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-store-C1MLKHfg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var KEY = "northline-site-v1";
var EMPTY = { portrait: "" };
var listeners = /* @__PURE__ */ new Set();
var snapshot = EMPTY;
var rawCache = null;
function read() {
	if (typeof window === "undefined") return EMPTY;
	const raw = localStorage.getItem(KEY);
	if (raw === rawCache) return snapshot;
	rawCache = raw;
	if (!raw) {
		snapshot = EMPTY;
		return snapshot;
	}
	try {
		const parsed = JSON.parse(raw);
		snapshot = { portrait: typeof parsed.portrait === "string" ? parsed.portrait : "" };
	} catch {
		snapshot = EMPTY;
	}
	return snapshot;
}
function write(next) {
	snapshot = next.portrait ? next : EMPTY;
	rawCache = snapshot === EMPTY ? null : JSON.stringify(snapshot);
	if (rawCache) localStorage.setItem(KEY, rawCache);
	else localStorage.removeItem(KEY);
	listeners.forEach((l) => l());
}
function getSiteProfile() {
	return read();
}
function setSitePortrait(portrait) {
	write({ portrait });
}
function subscribeSite(fn) {
	listeners.add(fn);
	return () => listeners.delete(fn);
}
function useSiteProfile() {
	return (0, import_react.useSyncExternalStore)(subscribeSite, getSiteProfile, () => EMPTY);
}
//#endregion
export { useSiteProfile as n, setSitePortrait as t };
