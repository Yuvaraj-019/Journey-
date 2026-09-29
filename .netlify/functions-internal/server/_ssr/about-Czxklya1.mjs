import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as CtaBand } from "./cta-band-cRinhzEv.mjs";
import { t as PageHero } from "./page-hero-C6eQUlRs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-Czxklya1.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "The field journal",
			title: "Places I walked.",
			lede: "A private log made public. Name a place, add photos and videos, pin it on the map."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-5 py-16 md:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-3xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-base leading-relaxed text-muted",
					children: "NORTHLINE is only this: the places I visit, the pictures and clips I bring home, and a map that shows where they are. Nothing is listed until I add it."
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {})
	] });
}
//#endregion
export { AboutPage as component };
