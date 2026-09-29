import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as reviews } from "./router-Bq6NahL2.mjs";
import { t as CtaBand } from "./cta-band-cRinhzEv.mjs";
import { t as PageHero } from "./page-hero-C6eQUlRs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reviews-CltZWE43.js
var import_jsx_runtime = require_jsx_runtime();
function ReviewsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Companions",
			title: "What people say after a week out.",
			lede: "Not reviews of a product. Notes from people who shared a rope, a hut, a well, or a long afternoon of waiting."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-5 py-16 md:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-6xl gap-8 md:grid-cols-2",
				children: reviews.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No notes from companions yet."
				}) : reviews.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
					className: "border-t border-border pt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.16em] text-faint",
							children: r.rating
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-lg leading-relaxed text-fg",
							children: [
								"“",
								r.quote,
								"”"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
							className: "mt-4 text-sm text-muted",
							children: [
								r.name,
								" · ",
								r.role
							]
						})
					]
				}, r.name))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {
			title: "Walked together?",
			lede: "If we shared a line, write. I'll put the honest version in the book."
		})
	] });
}
//#endregion
export { ReviewsPage as component };
