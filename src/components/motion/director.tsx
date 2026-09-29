import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger, whenReady } from "@/lib/gsap-client";

export function MotionDirector() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (prefersReducedMotion()) return;
    registerGsap();
    let ctx: ReturnType<typeof gsap.context> | null = null;

    const run = () => {
      ctx?.revert();
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
          const img = el.querySelector("img");
          const hero = el.dataset.clip === "hero";
          gsap.set(el, { clipPath: "inset(100% 0 0 0)" });
          if (img && !hero) gsap.set(img, { scale: 1.18 });
          const tl = gsap.timeline({
            scrollTrigger: hero
              ? undefined
              : { trigger: el, start: "top 88%", once: true },
          });
          tl.to(el, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.25,
            ease: "power4.out",
          });
          if (img && !hero) {
            tl.to(
              img,
              { scale: 1, duration: 1.7, ease: "power2.out", clearProps: "transform" },
              0,
            );
          }
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          const load = el.dataset.reveal === "load";
          gsap.fromTo(
            el,
            { y: 36, opacity: 0, filter: "blur(8px)" },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1,
              ease: "power3.out",
              delay: load ? 0.15 : 0,
              scrollTrigger: load
                ? undefined
                : { trigger: el, start: "top 88%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]").forEach((parent) => {
          const kids = parent.children;
          gsap.fromTo(
            kids,
            { y: 28, opacity: 0, filter: "blur(6px)" },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.85,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: { trigger: parent, start: "top 86%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-line]").forEach((el) => {
          gsap.fromTo(
            el,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.9,
              ease: "power3.out",
              transformOrigin: "left center",
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.to(el, {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      });
      ScrollTrigger.refresh();
    };

    const safety = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-stagger] > *").forEach((el) => {
        el.style.opacity = "1";
        el.style.filter = "none";
        el.style.transform = "none";
      });
      document.querySelectorAll<HTMLElement>("[data-clip]").forEach((el) => {
        el.style.clipPath = "none";
      });
      document.querySelectorAll<HTMLElement>(".split-word").forEach((el) => {
        el.style.transform = "none";
      });
    }, 4500);

    const stop = whenReady(() => {
      requestAnimationFrame(run);
    });
    return () => {
      window.clearTimeout(safety);
      stop();
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
