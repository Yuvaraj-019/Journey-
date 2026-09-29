import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/field-notes-CEMbykL3.js
var import_jsx_runtime = require_jsx_runtime();
function inline(text) {
	const parts = [];
	const re = /(\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_)/g;
	let last = 0;
	let m;
	let i = 0;
	while (m = re.exec(text)) {
		if (m.index > last) parts.push(text.slice(last, m.index));
		const raw = m[0];
		if (raw.startsWith("**")) parts.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: raw.slice(2, -2) }, i++));
		else parts.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: raw.slice(1, -1) }, i++));
		last = m.index + raw.length;
	}
	if (last < text.length) parts.push(text.slice(last));
	return parts;
}
function parseNotes(raw) {
	const lines = raw.replace(/\r\n/g, "\n").split("\n");
	const blocks = [];
	let para = [];
	let list = null;
	const flushPara = () => {
		const text = para.join(" ").replace(/\s+/g, " ").trim();
		para = [];
		if (text) blocks.push({
			type: "p",
			text
		});
	};
	const flushList = () => {
		if (list && list.items.length) blocks.push(list);
		list = null;
	};
	for (const line of lines) {
		const bullet = line.match(/^\s*(?:[-*•]|\u2022)\s+(.+)/);
		const numbered = line.match(/^\s*\d+[.)]\s+(.+)/);
		if (bullet) {
			flushPara();
			if (!list || list.type !== "ul") {
				flushList();
				list = {
					type: "ul",
					items: []
				};
			}
			list.items.push(bullet[1].trim());
			continue;
		}
		if (numbered) {
			flushPara();
			if (!list || list.type !== "ol") {
				flushList();
				list = {
					type: "ol",
					items: []
				};
			}
			list.items.push(numbered[1].trim());
			continue;
		}
		if (!line.trim()) {
			flushPara();
			flushList();
			continue;
		}
		flushList();
		para.push(line.trim());
	}
	flushPara();
	flushList();
	return blocks;
}
function FieldNotes({ text, className }) {
	const blocks = parseNotes(text);
	if (!blocks.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: className ?? "notes",
		children: blocks.map((b, i) => {
			if (b.type === "p") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-base leading-relaxed text-muted first:mt-0 md:text-lg",
				children: inline(b.text)
			}, i);
			if (b.type === "ul") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-5 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted md:text-lg",
				children: b.items.map((item, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: inline(item) }, j))
			}, i);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-5 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted md:text-lg",
				children: b.items.map((item, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: inline(item) }, j))
			}, i);
		})
	});
}
//#endregion
export { FieldNotes as t };
