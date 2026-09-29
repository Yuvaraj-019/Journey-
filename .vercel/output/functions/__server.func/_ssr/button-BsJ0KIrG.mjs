import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./gsap-client-BwarljNy.mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-BsJ0KIrG.js
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-[transform,background-color,color,border-color,opacity] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent", {
	variants: {
		variant: {
			solid: "bg-accent text-accent-fg hover:bg-fg rounded-sm px-5 py-3 text-sm",
			ghost: "bg-transparent text-fg border border-border hover:border-line hover:bg-bg-elevated rounded-sm px-5 py-3 text-sm",
			arrow: "bg-transparent text-fg hover:text-accent px-0 py-0 rounded-none gap-3 text-sm uppercase tracking-[0.18em]"
		},
		size: {
			default: "",
			lg: "px-6 py-3.5 text-base"
		}
	},
	defaultVariants: {
		variant: "solid",
		size: "default"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
//#endregion
export { Button as t };
