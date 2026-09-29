import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as CtaBand } from "./cta-band-cRinhzEv.mjs";
import { t as PageHero } from "./page-hero-C6eQUlRs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tools-LTPjoUM2.js
var import_jsx_runtime = require_jsx_runtime();
var tools = [
	{
		to: "/tools/route",
		title: "Route grade",
		lede: "A senior-human diagnosis of whether the line is the one you think it is. Four questions. An honest grade."
	},
	{
		to: "/tools/conditions",
		title: "Conditions desk",
		lede: "Season notes for eleven ranges. Windows, not wishful thinking."
	},
	{
		to: "/tools/packing",
		title: "Packing check",
		lede: "A kit list that matches mountain, water, desert, or wild — not a catalogue."
	}
];
function ToolsIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Test the line · free, no signup",
			title: "Field tools.",
			lede: "Three small desks I actually use before a walk. Not gadgets. Questions."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-5 py-16 md:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-6xl gap-6 md:grid-cols-3",
				children: tools.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: t.to,
					className: "rounded-lg border border-border bg-bg-elevated p-6 transition-colors hover:border-line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm uppercase tracking-[0.16em] text-fg",
							children: t.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted",
							children: t.lede
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-xs uppercase tracking-[0.16em] text-faint",
							children: "Open → →"
						})
					]
				}, t.to))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {})
	] });
}
//#endregion
export { ToolsIndex as component };
