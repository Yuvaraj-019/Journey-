import { useEffect, useRef, useState } from "react";
import { gsap, markReady, prefersReducedMotion } from "@/lib/gsap-client";

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      markReady();
      setGone(true);
      return;
    }
    const obj = { n: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        markReady();
        setGone(true);
      },
    });
    tl.to(obj, {
      n: 100,
      duration: 1.65,
      ease: "power2.inOut",
      onUpdate: () => setPct(Math.round(obj.n)),
    });
    tl.to(
      root.current,
      { yPercent: -110, duration: 0.85, ease: "power4.inOut" },
      "+=0.12",
    );
    return () => {
      tl.kill();
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col justify-end bg-bg px-5 pb-10 md:px-10 md:pb-14"
      aria-hidden
    >
      <p className="text-xs uppercase tracking-[0.28em] text-muted">NORTHLINE</p>
      <p className="font-display mt-4 text-[22vw] leading-[0.8] tabular-nums text-fg md:text-[12rem]">
        {String(pct).padStart(3, "0")}
        <span className="text-[0.35em] tracking-normal">%</span>
      </p>
      <p className="mt-4 text-sm italic text-muted">places I walked.</p>
    </div>
  );
}
