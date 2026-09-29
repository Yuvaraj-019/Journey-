import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { regions } from "@/data/regions";
import { useAllJourneys } from "@/lib/use-field";
import { cn } from "@/lib/utils";
import { ArrowLink } from "@/components/arrow-link";

type Panel = "journeys" | "mobile" | null;

function CompassMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path fill="currentColor" d="M16 3 L23 17.5 L16 14 L9 17.5 Z" />
      <rect x="14.7" y="14" width="2.6" height="15" rx="1.3" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

export function SiteHeader() {
  const [panel, setPanel] = useState<Panel>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setPanel(null);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPanel(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = panel ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [panel]);

  const toggle = (next: Panel) => setPanel((p) => (p === next ? null : next));

  return (
    <>
      <header
        className={cn(
          "site-header fixed inset-x-0 top-0 z-50",
          panel ? "bg-bg" : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-5 md:h-[4.25rem] md:px-10">
          <Link to="/" className="flex items-center gap-2 text-fg" onClick={() => setPanel(null)}>
            <CompassMark className="size-5 md:size-6" />
            <span className="text-[11px] font-medium tracking-[0.22em] sm:text-sm">NORTHLINE</span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            <NavButton active={panel === "journeys"} onClick={() => toggle("journeys")}>
              Journeys
            </NavButton>
            <Link
              to="/gallery"
              className="text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg"
            >
              Gallery
            </Link>
            <Link
              to="/insights"
              className="text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg"
            >
              Travel Insights
            </Link>
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <Link
              to="/map"
              className="text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg"
            >
              Interactive Map
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex size-11 items-center justify-center text-fg lg:hidden"
            aria-label={panel === "mobile" ? "Close menu" : "Open menu"}
            onClick={() => toggle("mobile")}
          >
            {panel === "mobile" ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      <div
        className={cn(
          "mega-panel fixed inset-x-0 z-40 max-h-[calc(100dvh-var(--nav-h))] overflow-y-auto bg-bg top-[var(--nav-h)]",
          panel && panel !== "mobile" ? "is-open pointer-events-auto" : "pointer-events-none",
        )}
      >
        {panel === "journeys" ? <JourneysPanel onClose={() => setPanel(null)} /> : null}
      </div>

      {panel && panel !== "mobile" ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-bg/50"
          onClick={() => setPanel(null)}
        />
      ) : null}

      {panel === "mobile" ? (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-bg pt-[var(--nav-h)] lg:hidden">
          <div className="flex flex-col gap-1 px-5 py-8">
            <Link to="/journeys" className="py-3 text-2xl font-display text-fg">
              Journeys
            </Link>
            <Link to="/gallery" className="py-3 text-2xl font-display text-fg">
              Gallery
            </Link>
            <Link to="/insights" className="py-3 text-2xl font-display text-fg">
              Travel Insights
            </Link>
            <Link to="/map" className="py-3 text-2xl font-display text-fg">
              Interactive Map
            </Link>
            <Link to="/places" className="py-3 text-2xl font-display text-fg">
              Places
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}

function NavButton({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative text-xs uppercase tracking-[0.18em] transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-fg after:transition-transform after:duration-300 hover:text-fg hover:after:scale-x-100",
        active ? "text-fg after:scale-x-100" : "text-muted",
      )}
    >
      {children}
    </button>
  );
}

function JourneysPanel({ onClose }: { onClose: () => void }) {
  const all = useAllJourneys();
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted">By range</p>
        </div>
        <div onClick={onClose}>
          <ArrowLink to="/journeys">All journeys</ArrowLink>
        </div>
      </div>
      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-reveal-stagger>
        {regions
          .filter((r) => r.slug !== "world")
          .map((r) => {
            const count = all.filter((j) => j.region === r.slug).length;
            return (
              <li key={r.slug} data-mega-item>
                <Link
                  to="/journeys/regions/$slug"
                  params={{ slug: r.slug }}
                  onClick={onClose}
                  className="flex items-baseline justify-between border-b border-border py-3 transition-colors hover:text-accent"
                >
                  <span>
                    <span className="text-sm text-fg">{r.title}</span>
                    <span className="ml-3 text-xs text-faint">{r.continent}</span>
                  </span>
                  <span className="text-xs text-muted">{count ? `${count} logged` : ""}</span>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
