import { C as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as ArrowLink } from "./_ssr/arrow-link-DAoNZH_A.mjs";
import { c as Route$8 } from "./_ssr/router-Bq6NahL2.mjs";
import { t as CtaBand } from "./_ssr/cta-band-cRinhzEv.mjs";
import { t as Cover } from "./_ssr/cover-qbqzXd0F.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-DmC4mBB6.js
var import_jsx_runtime = require_jsx_runtime();
function JournalPostPage() {
	const post = Route$8.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "px-5 pb-10 pt-28 md:px-10 md:pt-36",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLink, {
						to: "/journal",
						children: "All notes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-8 text-xs uppercase tracking-[0.22em] text-muted",
						children: post.date
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display mt-4 text-4xl leading-[1.1] md:text-5xl",
						children: post.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-lg leading-relaxed text-muted",
						children: post.lede
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-6xl px-5 md:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cover, {
				src: post.image,
				alt: "",
				className: "aspect-[16/8] rounded-lg"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
			className: "px-5 py-16 md:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-3xl space-y-5",
				children: post.body.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-base leading-relaxed text-fg/90 md:text-lg",
					children: p
				}, p.slice(0, 24)))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaBand, {})
	] });
}
//#endregion
export { JournalPostPage as component };
