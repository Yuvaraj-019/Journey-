import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (typeof window === "undefined" || registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function whenReady(fn: () => void) {
  if (typeof window === "undefined") return () => {};
  if (window.__northlineReady) {
    fn();
    return () => {};
  }
  window.addEventListener("northline:ready", fn, { once: true });
  return () => window.removeEventListener("northline:ready", fn);
}

export function markReady() {
  if (typeof window === "undefined") return;
  window.__northlineReady = true;
  window.dispatchEvent(new Event("northline:ready"));
}

declare global {
  interface Window {
    __northlineReady?: boolean;
  }
}

export { gsap, ScrollTrigger };
