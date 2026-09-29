import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap-client";

export function FieldCanvas() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || prefersReducedMotion()) return;
    const paths = Array.from(svg.querySelectorAll("path"));
    let raf = 0;
    let t = 0;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = e.clientY / window.innerHeight;
    };
    const draw = () => {
      t += 0.0045;
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      const rows = paths.length;
      paths.forEach((path, i) => {
        const base = (i / Math.max(1, rows - 1)) * 100;
        let d = "";
        for (let x = 0; x <= 100; x += 2) {
          const nx = x / 100;
          const warp =
            Math.sin(nx * 6 + t + i * 0.35) * 2.2 +
            Math.sin(nx * 13 - t * 1.4 + i) * 0.9 +
            (mouse.y - 0.5) * 8 * Math.sin(nx * Math.PI) +
            (mouse.x - 0.5) * 5 * Math.cos((base / 100) * Math.PI);
          const y = base + warp;
          d += x === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
        }
        path.setAttribute("d", d);
      });
      raf = requestAnimationFrame(draw);
    };
    window.addEventListener("pointermove", onMove);
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <svg
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[2] mix-blend-overlay"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      {Array.from({ length: 16 }, (_, i) => (
        <path key={i} fill="none" stroke="rgba(235,230,220,0.16)" strokeWidth="0.15" />
      ))}
    </svg>
  );
}
