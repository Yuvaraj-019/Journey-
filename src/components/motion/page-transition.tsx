import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { gsap, prefersReducedMotion } from "@/lib/gsap-client";

export function PageTransition() {
  const overlay = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (prefersReducedMotion()) return;
    const el = overlay.current;
    const word = label.current;
    if (!el) return;
    const name =
      pathname === "/"
        ? "NORTHLINE"
        : pathname.replace(/^\//, "").split("/")[0]?.toUpperCase() || "NORTHLINE";
    if (word) word.textContent = name;
    const tl = gsap.timeline();
    tl.set(el, { yPercent: 100, display: "flex" })
      .fromTo(word, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" }, 0.12)
      .to(el, { yPercent: 0, duration: 0.5, ease: "power4.inOut" }, 0)
      .to(word, { y: -20, opacity: 0, duration: 0.3, ease: "power2.in" }, 0.55)
      .to(el, { yPercent: -100, duration: 0.55, ease: "power4.inOut" }, 0.62)
      .set(el, { display: "none" });
    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div
      ref={overlay}
      className="pointer-events-none fixed inset-0 z-[90] hidden items-end bg-bg-elevated px-5 pb-12 md:px-10"
      aria-hidden
    >
      <span ref={label} className="font-display text-5xl text-fg md:text-7xl">
        NORTHLINE
      </span>
    </div>
  );
}
