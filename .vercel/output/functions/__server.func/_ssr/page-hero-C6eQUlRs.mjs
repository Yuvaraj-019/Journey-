import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as SplitHeading } from "./split-heading-DfqSvpiv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-hero-C6eQUlRs.js
var import_jsx_runtime = require_jsx_runtime();
function PageHero({ eyebrow, title, lede }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "px-4 pb-12 pt-24 sm:px-5 md:px-10 md:pb-20 md:pt-36",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [
				eyebrow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-reveal": "load",
					className: "text-[11px] uppercase tracking-[0.22em] text-muted sm:text-xs",
					children: eyebrow
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitHeading, {
					as: "h1",
					text: title,
					delay: .08,
					className: "font-display mt-4 max-w-4xl text-[2.35rem] leading-[1.05] text-fg sm:text-5xl md:text-6xl lg:text-7xl"
				}),
				lede ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-reveal": "load",
					className: "mt-6 max-w-2xl text-[0.95rem] leading-relaxed text-muted md:text-lg",
					children: lede
				}) : null
			]
		})
	});
}
//#endregion
export { PageHero as t };
