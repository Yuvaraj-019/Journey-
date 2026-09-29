import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./gsap-client-BwarljNy.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as CtaBand } from "./cta-band-cRinhzEv.mjs";
import { t as PageHero } from "./page-hero-C6eQUlRs.mjs";
import { t as packingKits } from "./site-BpAj5ubA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/packing-B-fnaXy8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var adventureCategories = [
	{
		slug: "mountain",
		title: "Mountain & Alpine"
	},
	{
		slug: "water",
		title: "Water & Coast"
	},
	{
		slug: "desert",
		title: "Desert & Overland"
	},
	{
		slug: "wild",
		title: "Wild & Far"
	}
];
function PackingPage() {
	const [cat, setCat] = (0, import_react.useState)("mountain");
	const items = packingKits[cat];
	const [checked, setChecked] = (0, import_react.useState)({});
	const keyPrefix = cat;
	const done = (0, import_react.useMemo)(() => items.filter((i) => checked[`${keyPrefix}:${i.item}`]).length, [
		items,
		checked,
		keyPrefix
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Field tool",
			title: "Packing check.",
			lede: "Pick the kind of going out. Tick what you actually have. The list is short on purpose — if you need a gadget to feel ready, you probably aren't."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-5 py-12 md:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: adventureCategories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setCat(c.slug),
							className: cn("rounded-full border px-4 py-2 text-xs uppercase tracking-[0.14em]", cat === c.slug ? "border-accent bg-bg-elevated text-fg" : "border-border text-muted hover:border-line"),
							children: c.title
						}, c.slug))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-8 text-sm text-muted",
						children: [
							done,
							" of ",
							items.length,
							" sitting in the pack"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-6 space-y-3",
						children: items.map((i) => {
							const id = `${keyPrefix}:${i.item}`;
							const on = Boolean(checked[id]);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setChecked((c) => ({
									...c,
									[id]: !on
								})),
								className: cn("flex w-full items-start gap-4 rounded-lg border px-4 py-4 text-left transition-colors", on ? "border-accent bg-bg-elevated" : "border-border hover:border-line"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("mt-0.5 size-4 shrink-0 rounded-xs border", on ? "border-accent bg-accent" : "border-line") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm text-fg",
									children: i.item
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-sm text-muted",
									children: i.note
								})] })]
							}) }, i.item);
						})
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {
			title: "Kit is the easy part.",
			lede: "The method is the rest. Scout, then pack.",
			to: "/method",
			cta: "The method"
		})
	] });
}
//#endregion
export { PackingPage as component };
