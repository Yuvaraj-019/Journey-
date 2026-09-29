import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as getRegion, f as useAllPlaces } from "./router-Bq6NahL2.mjs";
import { t as CtaBand } from "./cta-band-cRinhzEv.mjs";
import { t as PageHero } from "./page-hero-C6eQUlRs.mjs";
import { t as Cover } from "./cover-qbqzXd0F.mjs";
import { t as FieldNotes } from "./field-notes-CEMbykL3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/places-D6zxlh4w.js
var import_jsx_runtime = require_jsx_runtime();
function PlacesPage() {
	const places = useAllPlaces();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "The atlas",
			title: "Places visited.",
			lede: "Every pin is a place logged — name, photos, video."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-5 py-10 md:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: places.map((p) => {
						const cover = p.images?.[0];
						const region = getRegion(p.region);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-col overflow-hidden rounded-lg border border-border bg-bg-elevated",
							children: [cover ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cover, {
								src: cover,
								alt: "",
								className: "aspect-[16/10]",
								clip: false
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-1 flex-col p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm uppercase tracking-[0.16em] text-faint",
										children: [
											region?.continent || p.country,
											" · ",
											p.year
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-2 text-lg text-fg",
										children: p.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted",
										children: [p.location, p.country].filter(Boolean).join(" · ")
									}),
									p.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 line-clamp-4 text-sm leading-relaxed text-muted",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldNotes, {
											text: p.note,
											className: "notes notes-compact"
										})
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1" }),
									p.journeySlug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/journeys/$slug",
										params: { slug: p.journeySlug },
										className: "mt-4 text-xs uppercase tracking-[0.16em] text-fg hover:text-accent",
										children: "Open →"
									}) : null
								]
							})]
						}, p.id);
					})
				}), places.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-10 text-sm text-muted",
					children: "No places yet."
				}) : null]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {})
	] });
}
//#endregion
export { PlacesPage as component };
