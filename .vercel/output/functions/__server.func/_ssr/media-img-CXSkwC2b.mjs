import { t as cn } from "./gsap-client-BwarljNy.mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useMediaUrl } from "./media-D1sBE-my.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/media-img-CXSkwC2b.js
var import_jsx_runtime = require_jsx_runtime();
function MediaImg({ src, alt, className }) {
	const url = useMediaUrl(src);
	if (!url) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("bg-bg-subtle", className) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: url,
		alt,
		className
	});
}
//#endregion
export { MediaImg as t };
