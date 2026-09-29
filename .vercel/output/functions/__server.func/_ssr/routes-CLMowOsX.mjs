import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as ArrowLink } from "./arrow-link-DAoNZH_A.mjs";
import { d as useAllJourneys } from "./router-Bq6NahL2.mjs";
import { t as SplitHeading } from "./split-heading-DfqSvpiv.mjs";
import { t as CtaBand } from "./cta-band-cRinhzEv.mjs";
import { t as Cover } from "./cover-qbqzXd0F.mjs";
import { t as JourneyCard } from "./journey-card-Cf_teWdu.mjs";
import { t as FilmReel } from "./photo-gallery-B-I54swO.mjs";
import { n as useSiteProfile } from "./site-store-C1MLKHfg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CLMowOsX.js
var import_jsx_runtime = require_jsx_runtime();
var files = /* #__PURE__ */ Object.assign({ "../../content/site/home.json": { portrait: "" } });
function cmsPortrait() {
	for (const raw of Object.values(files)) {
		const row = raw ?? {};
		if (typeof row.portrait === "string" && row.portrait) return row.portrait;
		if (typeof row.image === "string" && row.image) return row.image;
	}
	return "";
}
function Home() {
	const all = useAllJourneys();
	const recent = all.slice(0, 6);
	const film = all.flatMap((j) => j.images.filter(Boolean));
	const hero = useSiteProfile().portrait || cmsPortrait();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative min-h-dvh overflow-hidden",
			children: [
				hero ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cover, {
					src: hero,
					alt: "",
					ken: true,
					hero: true,
					className: "absolute inset-0"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-[#161612] via-bg to-bg" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/25" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 mx-auto flex min-h-dvh max-w-6xl flex-col justify-end px-4 pb-14 pt-28 sm:px-5 md:px-10 md:pb-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-reveal": "load",
							className: "text-[11px] uppercase tracking-[0.28em] text-accent sm:text-xs",
							children: "NORTHLINE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitHeading, {
							as: "h1",
							text: "places I walked.",
							delay: .1,
							className: "font-display mt-4 max-w-4xl text-[2.6rem] leading-[0.95] text-fg sm:text-5xl md:text-7xl lg:text-[5.5rem]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-reveal": "load",
							className: "mt-6 max-w-md text-[0.95rem] leading-relaxed text-fg/80 md:text-lg",
							children: "A personal field journal. Photographs, film, and pins from the road."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-reveal": "load",
							className: "mt-10 flex flex-wrap gap-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLink, {
								to: "/journeys",
								children: "Journeys"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLink, {
								to: "/map",
								children: "Map"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "scroll-hint mt-12 text-[10px] uppercase tracking-[0.28em] text-muted",
							children: "Scroll"
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilmReel, {
			label: "From the book",
			images: film
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-border px-5 py-20 md:px-10 md:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitHeading, {
						as: "h2",
						text: "Recent places.",
						className: "font-display max-w-xl text-3xl leading-tight md:text-5xl"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLink, {
						to: "/journeys",
						children: "All"
					})]
				}), recent.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-14 grid gap-10 md:grid-cols-3",
					children: recent.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JourneyCard, { journey: j }, j.slug))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-10 max-w-md text-sm leading-relaxed text-muted",
					children: "Places will appear here once they are published."
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {})
	] });
}
//#endregion
export { Home as component };
