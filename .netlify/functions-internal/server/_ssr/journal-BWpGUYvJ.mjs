import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as journalPosts } from "./router-Bq6NahL2.mjs";
import { t as CtaBand } from "./cta-band-cRinhzEv.mjs";
import { t as PageHero } from "./page-hero-C6eQUlRs.mjs";
import { t as Cover } from "./cover-qbqzXd0F.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/journal-BWpGUYvJ.js
var import_jsx_runtime = require_jsx_runtime();
function JournalIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Field notes",
			title: "The journal.",
			lede: "Notes will live here when you write them."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-5 py-16 md:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-6xl gap-12 md:grid-cols-2",
				children: journalPosts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No notes yet."
				}) : journalPosts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/journal/$slug",
					params: { slug: p.slug },
					className: "group block",
					children: [
						p.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cover, {
							src: p.image,
							alt: "",
							className: "aspect-[16/9] rounded-md"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-xs uppercase tracking-[0.16em] text-muted",
							children: p.date
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display mt-2 text-2xl leading-snug text-fg group-hover:text-accent",
							children: p.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: p.lede
						})
					]
				}, p.slug))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {})
	] });
}
//#endregion
export { JournalIndex as component };
