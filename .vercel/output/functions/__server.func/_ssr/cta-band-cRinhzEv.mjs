import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as ArrowLink } from "./arrow-link-DAoNZH_A.mjs";
import { t as SplitHeading } from "./split-heading-DfqSvpiv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cta-band-cRinhzEv.js
var import_jsx_runtime = require_jsx_runtime();
function CtaBand({ eyebrow = "Atlas", title = "Open the map.", lede = "Every pin is a place walked.", to = "/map", cta = "Interactive map" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-border px-4 py-16 sm:px-5 md:px-10 md:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-reveal": true,
					className: "text-[11px] uppercase tracking-[0.22em] text-muted sm:text-xs",
					children: eyebrow
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitHeading, {
					as: "h2",
					text: title,
					className: "font-display mt-4 max-w-3xl text-3xl leading-[1.1] text-fg sm:text-4xl md:text-6xl"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-reveal": true,
					className: "mt-5 max-w-xl text-[0.95rem] leading-relaxed text-muted md:text-lg",
					children: lede
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-reveal": true,
					className: "mt-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLink, {
						to,
						children: cta
					})
				})
			]
		})
	});
}
//#endregion
export { CtaBand as t };
