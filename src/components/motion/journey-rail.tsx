import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap-client";

export function JourneyRail() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [walking, setWalking] = useState(false);

  useEffect(() => {
    setWalking(!prefersReducedMotion());
    let idle = 0;
    const onScroll = (e: Event) => {
      const p = (e as CustomEvent<{ progress: number }>).detail?.progress ?? 0;
      setProgress(p);
      setVisible(p > 0.015 && p < 0.995);
      setWalking(!prefersReducedMotion());
      window.clearTimeout(idle);
      idle = window.setTimeout(() => setWalking(false), 180);
    };
    window.addEventListener("nl-scroll", onScroll);
    return () => {
      window.removeEventListener("nl-scroll", onScroll);
      window.clearTimeout(idle);
    };
  }, []);

  return (
    <div className="journey-rail" aria-hidden>
      <div
        className={walking ? "journey-thumb is-walk" : "journey-thumb"}
        style={{
          top: `calc(8px + ${progress} * (100% - 44px))`,
          opacity: visible ? 1 : 0.28,
        }}
      >
        <img src="/images/walker.png" alt="" width={22} height={48} draggable={false} />
      </div>
    </div>
  );
}
