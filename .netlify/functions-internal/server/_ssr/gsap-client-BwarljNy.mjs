import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as gsapWithCSS, t as ScrollTrigger } from "../_libs/gsap.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gsap-client-BwarljNy.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function slugify(value) {
	return value.toLowerCase().trim().replace(/['"]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 72);
}
function uid(prefix = "id") {
	return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}
var registered = false;
function registerGsap() {
	if (typeof window === "undefined" || registered) return;
	gsapWithCSS.registerPlugin(ScrollTrigger);
	registered = true;
}
function prefersReducedMotion() {
	if (typeof window === "undefined") return true;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function whenReady(fn) {
	if (typeof window === "undefined") return () => {};
	if (window.__northlineReady) {
		fn();
		return () => {};
	}
	window.addEventListener("northline:ready", fn, { once: true });
	return () => window.removeEventListener("northline:ready", fn);
}
function markReady() {
	if (typeof window === "undefined") return;
	window.__northlineReady = true;
	window.dispatchEvent(new Event("northline:ready"));
}
//#endregion
export { slugify as a, registerGsap as i, markReady as n, uid as o, prefersReducedMotion as r, whenReady as s, cn as t };
