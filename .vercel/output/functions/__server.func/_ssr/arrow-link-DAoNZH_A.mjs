import { t as cn } from "./gsap-client-BwarljNy.mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/arrow-link-DAoNZH_A.js
var import_jsx_runtime = require_jsx_runtime();
function ArrowLink({ to, children, className, params }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		params,
		"data-cursor": true,
		className: cn("group inline-flex items-center gap-3 text-sm uppercase tracking-[0.18em] text-fg", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "relative",
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-fg transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			"aria-hidden": true,
			className: "arrow-pair text-muted group-hover:text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "-ml-[1em]",
				children: "→"
			})]
		})]
	});
}
//#endregion
export { ArrowLink as t };
