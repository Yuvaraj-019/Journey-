import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import Lenis from "lenis";
import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger } from "@/lib/gsap-client";
import "lenis/dist/lenis.css";

function emitProgress(scroll: number, limit: number) {
  const progress = limit > 0 ? Math.min(1, Math.max(0, scroll / limit)) : 0;
  window.dispatchEvent(new CustomEvent("nl-scroll", { detail: { progress } }));
}

export function SmoothScroll() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (prefersReducedMotion()) {
      const onWin = () => {
        const limit = document.documentElement.scrollHeight - window.innerHeight;
        emitProgress(window.scrollY, limit);
      };
      onWin();
      window.addEventListener("scroll", onWin, { passive: true });
      return () => window.removeEventListener("scroll", onWin);
    }
    registerGsap();
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    lenis.on("scroll", (e: { scroll: number; limit: number }) => {
      ScrollTrigger.update();
      emitProgress(e.scroll, e.limit);
    });
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    emitProgress(0, 1);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    emitProgress(0, 1);
  }, [pathname]);

  return null;
}
