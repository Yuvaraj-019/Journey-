import { o as __toESM } from "../_runtime.mjs";
import { n as gsapWithCSS } from "../_libs/gsap.mjs";
import { r as prefersReducedMotion, s as whenReady, t as cn } from "./gsap-client-BwarljNy.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/split-heading-DfqSvpiv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SplitHeading({ text, as: Tag = "h1", className, delay = 0 }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const words = el.querySelectorAll(".split-word");
		if (prefersReducedMotion()) {
			words.forEach((w) => {
				w.style.transform = "none";
				w.style.opacity = "1";
			});
			return;
		}
		gsapWithCSS.set(words, {
			yPercent: 120,
			opacity: 1
		});
		const play = () => {
			gsapWithCSS.to(words, {
				yPercent: 0,
				duration: 1.05,
				ease: "power4.out",
				stagger: .06,
				delay
			});
		};
		return whenReady(play);
	}, [text, delay]);
	const parts = text.split(/(\s+)/);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		ref,
		className: cn("split-heading", className),
		children: parts.map((part, i) => /^\s+$/.test(part) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: part }, i) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "split-mask",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "split-word",
				children: part
			})
		}, i))
	});
}
//#endregion
export { SplitHeading as t };
