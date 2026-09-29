import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/layout/page-hero";
import { MediaImg } from "@/components/media-img";
import { useMediaUrl } from "@/lib/media";
import { journeyImages } from "@/data/types";
import { useAllJourneys } from "@/lib/use-field";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
  head: () => ({ meta: [{ title: "Gallery — NORTHLINE" }] }),
});

function GalleryPage() {
  const journeys = useAllJourneys();
  const frames = useMemo(() => {
    const seen = new Set<string>();
    const list: { src: string; title: string }[] = [];
    for (const journey of journeys) {
      for (const src of journeyImages(journey)) {
        if (seen.has(src)) continue;
        seen.add(src);
        list.push({ src, title: journey.title });
      }
    }
    return list;
  }, [journeys]);
  const [open, setOpen] = useState<number | null>(null);
  const openUrl = useMediaUrl(open !== null ? frames[open]?.src : "");

  return (
    <main>
      <PageHero eyebrow="Gallery" title="The photographs." lede="Everything you logged, in one place." />
      <section className="px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-6xl">
          {frames.length === 0 ? (
            <p className="text-sm text-muted">Photographs will appear here.</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
              {frames.map((frame, i) => (
                <button
                  key={`${frame.src}-${i}`}
                  type="button"
                  data-clip
                  className={cn(
                    "overflow-hidden rounded-md bg-bg-subtle",
                    i % 7 === 0 ? "col-span-2 aspect-[16/10]" : "aspect-[4/5]",
                  )}
                  onClick={() => setOpen(i)}
                >
                  <MediaImg src={frame.src} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className={cn("lightbox", open !== null && "is-open")} aria-hidden={open === null}>
        {open !== null && frames[open] ? (
          <>
            {openUrl ? <img src={openUrl} alt={frames[open].title} /> : null}
            <p className="lightbox-cap">{frames[open].title}</p>
            <button type="button" className="lightbox-close" onClick={() => setOpen(null)}>
              Close
            </button>
            {frames.length > 1 ? (
              <>
                <button
                  type="button"
                  className="lightbox-nav left-4"
                  onClick={() => setOpen((open - 1 + frames.length) % frames.length)}
                >
                  ←
                </button>
                <button
                  type="button"
                  className="lightbox-nav right-4"
                  onClick={() => setOpen((open + 1) % frames.length)}
                >
                  →
                </button>
              </>
            ) : null}
          </>
        ) : null}
      </div>
    </main>
  );
}
