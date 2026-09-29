import { t as cn } from "./gsap-client-BwarljNy.mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useMediaUrl } from "./media-D1sBE-my.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cover-qbqzXd0F.js
var import_jsx_runtime = require_jsx_runtime();
function Cover({ src, alt, className, ken, clip = true, hero }) {
	const url = useMediaUrl(src);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("cover-zoom overflow-hidden bg-bg-subtle", className),
		"data-clip": clip ? hero ? "hero" : "true" : void 0,
		children: url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: url,
			alt,
			className: cn("size-full object-cover", ken && "hero-ken origin-center")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-full bg-gradient-to-br from-[#1a1a16] to-[#0c0c0b]" })
	});
}
//#endregion
export { Cover as t };
