import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as getRegion } from "./router-Bq6NahL2.mjs";
import { t as Cover } from "./cover-qbqzXd0F.mjs";
import { n as journeyImages, t as journeyCover } from "./types-DVai5i6l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/journey-card-Cf_teWdu.js
var import_jsx_runtime = require_jsx_runtime();
function JourneyCard({ journey, large }) {
	const region = getRegion(journey.region);
	const frames = journeyImages(journey).length;
	const continent = journey.continent || region?.continent || "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/journeys/$slug",
		params: { slug: journey.slug },
		className: "group block",
		"data-cursor": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cover, {
				src: journeyCover(journey),
				alt: "",
				className: large ? "aspect-[16/9] rounded-lg" : "aspect-[16/10] rounded-md"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-reveal": true,
				className: "mt-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-muted",
				children: [
					continent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: continent }) : null,
					journey.year ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-faint",
						children: journey.year
					}) : null,
					frames > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full border border-border px-2 py-0.5 text-[10px]",
						children: [frames, " frames"]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border border-border px-2 py-0.5 text-[10px]",
						children: "Field log"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				"data-reveal": true,
				className: large ? "font-display mt-2 text-2xl leading-snug text-fg md:text-3xl" : "font-display mt-2 text-xl leading-snug text-fg",
				children: journey.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-reveal": true,
				className: "mt-2 line-clamp-3 text-sm leading-relaxed text-muted",
				children: journey.summary
			})
		]
	});
}
//#endregion
export { JourneyCard as t };
