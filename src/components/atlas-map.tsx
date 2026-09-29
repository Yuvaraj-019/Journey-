import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Place } from "@/data/types";
import { isInIndia, locatePlace, type MapPin } from "@/data/geo";
import {
  INDIA_PATHS,
  INDIA_VIEW,
  SRI_PATHS,
  WORLD_PATHS,
  WORLD_VIEW,
  projectIndia,
  projectWorld,
} from "@/data/map-paths";
import { cn } from "@/lib/utils";
import { FieldNotes } from "@/components/field-notes";

export function AtlasMap({ places }: { places: Place[] }) {
  const [view, setView] = useState<"world" | "india">("world");
  const [active, setActive] = useState<string | null>(null);

  const pins = useMemo<MapPin[]>(() => {
    const out: MapPin[] = [];
    for (const place of places) {
      const pos = locatePlace(place);
      if (!pos) continue;
      out.push({
        id: place.id,
        name: place.name,
        country: place.country,
        region: place.region,
        year: place.year,
        note: place.note,
        journeySlug: place.journeySlug,
        ...pos,
      });
    }
    return out;
  }, [places]);

  const shown = view === "india" ? pins.filter(isInIndia) : pins;
  const selected = shown.find((p) => p.id === active) ?? null;
  const project = view === "india" ? projectIndia : projectWorld;
  const vb = view === "india" ? `0 0 ${INDIA_VIEW.w} ${INDIA_VIEW.h}` : `0 0 ${WORLD_VIEW.w} ${WORLD_VIEW.h}`;
  const land = view === "india" ? [...INDIA_PATHS, ...SRI_PATHS] : WORLD_PATHS;
  const pinR = view === "india" ? 11 : 5;
  const uid = view === "india" ? "in" : "wo";

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="map-switch" role="tablist" aria-label="Map view">
          <button
            type="button"
            role="tab"
            aria-selected={view === "world"}
            className={cn("map-switch-btn", view === "world" && "is-on")}
            onClick={() => {
              setView("world");
              setActive(null);
            }}
          >
            World
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === "india"}
            className={cn("map-switch-btn", view === "india" && "is-on")}
            onClick={() => {
              setView("india");
              setActive(null);
            }}
          >
            India
          </button>
        </div>
        <p className="text-xs uppercase tracking-[0.16em] text-faint">
          {shown.length} pin{shown.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className={cn("atlas-stage relative mt-8 overflow-hidden rounded-lg border border-border", view === "india" && "atlas-stage-india")}>
        <svg
          viewBox={vb}
          className="block h-auto w-full"
          role="img"
          aria-label={view === "india" ? "Accurate map of India" : "Accurate world map"}
        >
          <defs>
            <linearGradient id={`${uid}-land`} x1="18%" y1="8%" x2="86%" y2="92%">
              <stop offset="0%" stopColor="#3a3a34" />
              <stop offset="42%" stopColor="#2a2a26" />
              <stop offset="100%" stopColor="#1c1c18" />
            </linearGradient>
            <filter id={`${uid}-cast`} x="-18%" y="-18%" width="140%" height="145%">
              <feDropShadow dx="16" dy="22" stdDeviation="14" floodColor="#000" floodOpacity="0.7" />
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="#141412" />
          <g filter={`url(#${uid}-cast)`}>
            {land.map((d, i) => (
              <path key={i} d={d} fill={`url(#${uid}-land)`} />
            ))}
          </g>
          {shown.map((pin) => {
            const { x, y } = project(pin.lat, pin.lng);
            const on = pin.id === active;
            return (
              <g
                key={pin.id}
                transform={`translate(${x} ${y})`}
                className="cursor-pointer"
                onClick={() => setActive(on ? null : pin.id)}
              >
                {on ? <circle r={pinR * 2.1} fill="none" stroke="#d8d2c4" strokeWidth="1.4" opacity="0.8" /> : null}
                <circle r={pinR} fill="#d8d2c4" />
                <circle r={pinR * 0.38} fill="#0c0c0b" />
              </g>
            );
          })}
        </svg>

        {shown.length === 0 ? (
          <p className="pointer-events-none absolute inset-x-0 bottom-6 text-center text-sm text-muted">
            No pins here yet.
          </p>
        ) : null}
      </div>

      {selected ? (
        <aside className="mt-6 rounded-lg border border-border bg-bg-elevated p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-faint">
            {selected.country} · {selected.year}
          </p>
          <h2 className="font-display mt-2 text-3xl">{selected.name}</h2>
          {selected.note ? (
            <div className="mt-3">
              <FieldNotes text={selected.note} className="notes notes-compact" />
            </div>
          ) : null}
          {selected.journeySlug ? (
            <Link
              to="/journeys/$slug"
              params={{ slug: selected.journeySlug }}
              className="mt-4 inline-block text-xs uppercase tracking-[0.16em] text-accent hover:text-fg"
            >
              Open journey
            </Link>
          ) : null}
        </aside>
      ) : (
        <p className="mt-4 text-sm text-faint">Tap a pin.</p>
      )}
    </div>
  );
}
