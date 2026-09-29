import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as ArrowLink } from "./arrow-link-DAoNZH_A.mjs";
import { d as useAllJourneys } from "./router-Bq6NahL2.mjs";
import { t as CtaBand } from "./cta-band-cRinhzEv.mjs";
import { t as PageHero } from "./page-hero-C6eQUlRs.mjs";
import { t as JourneyCard } from "./journey-card-Cf_teWdu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/journeys-CMSD4Kux.js
var import_jsx_runtime = require_jsx_runtime();
function JourneysIndex() {
	const all = useAllJourneys();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Journeys",
			title: "Places on the book.",
			lede: "Every entry is a place walked — photos, video, a note."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-5 py-16 md:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl",
				children: [all.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-10 md:grid-cols-2",
					children: all.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JourneyCard, { journey: j }, j.slug))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-md text-sm leading-relaxed text-muted",
					children: "Nothing logged yet."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLink, {
						to: "/map",
						children: "Interactive map"
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {})
	] });
}
//#endregion
export { JourneysIndex as component };
