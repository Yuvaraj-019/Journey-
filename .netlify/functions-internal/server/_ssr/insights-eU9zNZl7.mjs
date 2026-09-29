import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { x as regions } from "./router-Bq6NahL2.mjs";
import { t as PageHero } from "./page-hero-C6eQUlRs.mjs";
import { t as packingKits } from "./site-BpAj5ubA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/insights-eU9zNZl7.js
var import_jsx_runtime = require_jsx_runtime();
var windows = [
	{
		slug: "himalaya",
		when: "Oct–Nov"
	},
	{
		slug: "alps",
		when: "Jul–Sep"
	},
	{
		slug: "patagonia",
		when: "Dec–Feb"
	},
	{
		slug: "japan",
		when: "Apr–May, Oct"
	},
	{
		slug: "indian-subcontinent",
		when: "Oct–Mar in the hills"
	},
	{
		slug: "sahara",
		when: "Nov–Feb"
	}
];
function InsightsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Travel Insights",
			title: "When to go. What to pack.",
			lede: "Short notes — not a guidebook."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-5 py-16 md:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.22em] text-muted",
					children: "Season windows"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
					"data-reveal-stagger": true,
					children: windows.map((w) => {
						const region = regions.find((r) => r.slug === w.slug);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-lg border border-border bg-bg-elevated p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-fg",
								children: region?.title ?? w.slug
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs uppercase tracking-[0.14em] text-muted",
								children: w.when
							})]
						}, w.slug);
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-border px-5 py-16 md:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.22em] text-muted",
					children: "Mountain kit"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					"data-reveal-stagger": true,
					children: packingKits.mountain.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-b border-border pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-fg",
							children: item.item
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: item.note
						})]
					}, item.item))
				})]
			})
		})
	] });
}
//#endregion
export { InsightsPage as component };
