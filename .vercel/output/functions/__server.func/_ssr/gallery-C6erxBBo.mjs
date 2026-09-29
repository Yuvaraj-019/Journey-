import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./gsap-client-BwarljNy.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as useAllJourneys } from "./router-Bq6NahL2.mjs";
import { t as PageHero } from "./page-hero-C6eQUlRs.mjs";
import { r as useMediaUrl } from "./media-D1sBE-my.mjs";
import { n as journeyImages } from "./types-DVai5i6l.mjs";
import { t as MediaImg } from "./media-img-CXSkwC2b.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gallery-C6erxBBo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GalleryPage() {
	const journeys = useAllJourneys();
	const frames = (0, import_react.useMemo)(() => {
		const seen = /* @__PURE__ */ new Set();
		const list = [];
		for (const journey of journeys) for (const src of journeyImages(journey)) {
			if (seen.has(src)) continue;
			seen.add(src);
			list.push({
				src,
				title: journey.title
			});
		}
		return list;
	}, [journeys]);
	const [open, setOpen] = (0, import_react.useState)(null);
	const openUrl = useMediaUrl(open !== null ? frames[open]?.src : "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Gallery",
			title: "The photographs.",
			lede: "Everything you logged, in one place."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-5 py-12 md:px-10 md:py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-6xl",
				children: frames.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Photographs will appear here."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4",
					children: frames.map((frame, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"data-clip": true,
						className: cn("overflow-hidden rounded-md bg-bg-subtle", i % 7 === 0 ? "col-span-2 aspect-[16/10]" : "aspect-[4/5]"),
						onClick: () => setOpen(i),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaImg, {
							src: frame.src,
							alt: "",
							className: "size-full object-cover"
						})
					}, `${frame.src}-${i}`))
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("lightbox", open !== null && "is-open"),
			"aria-hidden": open === null,
			children: open !== null && frames[open] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				openUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: openUrl,
					alt: frames[open].title
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "lightbox-cap",
					children: frames[open].title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "lightbox-close",
					onClick: () => setOpen(null),
					children: "Close"
				}),
				frames.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "lightbox-nav left-4",
					onClick: () => setOpen((open - 1 + frames.length) % frames.length),
					children: "←"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "lightbox-nav right-4",
					onClick: () => setOpen((open + 1) % frames.length),
					children: "→"
				})] }) : null
			] }) : null
		})
	] });
}
//#endregion
export { GalleryPage as component };
