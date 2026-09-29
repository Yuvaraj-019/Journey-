import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./gsap-client-BwarljNy.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useMediaUrl } from "./media-D1sBE-my.mjs";
import { t as MediaImg } from "./media-img-CXSkwC2b.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/photo-gallery-B-I54swO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PhotoGallery({ images, title }) {
	const frames = images.filter(Boolean);
	const [open, setOpen] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (open === null) return;
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(null);
			if (e.key === "ArrowRight") setOpen((i) => i === null ? i : (i + 1) % frames.length);
			if (e.key === "ArrowLeft") setOpen((i) => i === null ? i : (i - 1 + frames.length) % frames.length);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, frames.length]);
	if (!frames.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-border px-5 py-16 md:px-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-reveal": true,
				className: "text-xs uppercase tracking-[0.22em] text-muted",
				children: "Photos"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4",
				children: frames.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"data-clip": true,
					"data-cursor": true,
					className: cn("overflow-hidden rounded-md bg-bg-subtle", i === 0 ? "col-span-2 aspect-[16/9] md:col-span-2 md:row-span-2 md:aspect-auto md:h-full" : "aspect-[4/5]"),
					onClick: () => setOpen(i),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaImg, {
						src,
						alt: "",
						className: "size-full object-cover"
					})
				}, `${src}-${i}`))
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("lightbox", open !== null && "is-open"),
		"aria-hidden": open === null,
		children: open !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LightboxImage, {
				src: frames[open],
				alt: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "lightbox-cap",
				children: [
					String(open + 1).padStart(2, "0"),
					" / ",
					String(frames.length).padStart(2, "0")
				]
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
	})] });
}
function LightboxImage({ src, alt }) {
	const url = useMediaUrl(src);
	if (!url) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: url,
		alt
	});
}
function FilmReel({ images, label = "From the field" }) {
	const frames = images.filter(Boolean);
	if (frames.length < 3) return null;
	const loop = [...frames, ...frames];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "overflow-hidden border-t border-border py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-6 px-5 text-xs uppercase tracking-[0.22em] text-muted md:px-10",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "film-reel",
			children: loop.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "film-frame",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaImg, {
					src,
					alt: ""
				})
			}, `${src}-${i}`))
		})]
	});
}
//#endregion
export { PhotoGallery as n, FilmReel as t };
