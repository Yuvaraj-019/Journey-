import { C as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as ArrowLink } from "./_ssr/arrow-link-DAoNZH_A.mjs";
import { d as useAllJourneys, f as useAllPlaces, n as Route } from "./_ssr/router-Bq6NahL2.mjs";
import { t as CtaBand } from "./_ssr/cta-band-cRinhzEv.mjs";
import { t as PageHero } from "./_ssr/page-hero-C6eQUlRs.mjs";
import { t as JourneyCard } from "./_ssr/journey-card-Cf_teWdu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-D34EYkQJ.js
var import_jsx_runtime = require_jsx_runtime();
function RegionPage() {
	const region = Route.useLoaderData();
	const journeys = useAllJourneys().filter((j) => j.region === region.slug);
	const places = useAllPlaces().filter((p) => p.region === region.slug);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: `${region.continent} · Journeys`,
			title: `${region.title} journeys`,
			lede: region.lede
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-5 py-12 md:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-6xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-2xl text-base leading-relaxed text-muted",
					children: region.body
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-border px-5 py-16 md:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-3xl",
						children: [
							journeys.length,
							" ",
							journeys.length === 1 ? "journey" : "journeys"
						]
					}),
					journeys.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-lg text-sm leading-relaxed text-muted",
						children: "Nothing published in this range yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid gap-10 md:grid-cols-2",
						children: journeys.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JourneyCard, { journey: j }, j.slug))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLink, {
							to: "/journeys",
							children: "All journeys"
						})
					})
				]
			})
		}),
		places.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-border px-5 py-16 md:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display text-3xl",
					children: ["Places in ", region.title]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: places.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-lg border border-border bg-bg-elevated p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-fg",
								children: p.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs uppercase tracking-[0.14em] text-faint",
								children: [
									p.country,
									" · ",
									p.year
								]
							}),
							p.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted",
								children: p.note
							}) : null
						]
					}, p.id))
				})]
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {
			title: `${region.title}.`,
			lede: region.lede
		})
	] });
}
//#endregion
export { RegionPage as component };
