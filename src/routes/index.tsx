import { createFileRoute } from "@tanstack/react-router";
import { ArrowLink } from "@/components/arrow-link";
import { CtaBand } from "@/components/layout/cta-band";
import { JourneyCard } from "@/components/journey-card";
import { SplitHeading } from "@/components/motion/split-heading";
import { FilmReel } from "@/components/photo-gallery";
import { Cover } from "@/components/cover";
import { cmsPortrait } from "@/data/cms-home";
import { useAllJourneys } from "@/lib/use-field";
import { useSiteProfile } from "@/lib/site-store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const all = useAllJourneys();
  const recent = all.slice(0, 6);
  const film = all.flatMap((j) => j.images.filter(Boolean));
  const site = useSiteProfile();
  const hero = site.portrait || cmsPortrait();

  return (
    <main>
      <section className="relative min-h-dvh overflow-hidden">
        {hero ? (
          <Cover src={hero} alt="" ken hero className="absolute inset-0" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-[#161612] via-bg to-bg" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/25" />
        <div className="relative z-10 mx-auto flex min-h-dvh max-w-6xl flex-col justify-end px-4 pb-14 pt-28 sm:px-5 md:px-10 md:pb-20">
          <p data-reveal="load" className="text-[11px] uppercase tracking-[0.28em] text-accent sm:text-xs">
            NORTHLINE
          </p>
          <SplitHeading
            as="h1"
            text="places I walked."
            delay={0.1}
            className="font-display mt-4 max-w-4xl text-[2.6rem] leading-[0.95] text-fg sm:text-5xl md:text-7xl lg:text-[5.5rem]"
          />
          <p
            data-reveal="load"
            className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-fg/80 md:text-lg"
          >
            A personal field journal. Photographs, film, and pins from the road.
          </p>
          <div data-reveal="load" className="mt-10 flex flex-wrap gap-8">
            <ArrowLink to="/journeys">Journeys</ArrowLink>
            <ArrowLink to="/map">Map</ArrowLink>
          </div>
          <p className="scroll-hint mt-12 text-[10px] uppercase tracking-[0.28em] text-muted">
            Scroll
          </p>
        </div>
      </section>

      <FilmReel label="From the book" images={film} />

      <section className="border-t border-border px-5 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SplitHeading
              as="h2"
              text="Recent places."
              className="font-display max-w-xl text-3xl leading-tight md:text-5xl"
            />
            <ArrowLink to="/journeys">All</ArrowLink>
          </div>
          {recent.length ? (
            <div className="mt-14 grid gap-10 md:grid-cols-3">
              {recent.map((j) => (
                <JourneyCard key={j.slug} journey={j} />
              ))}
            </div>
          ) : (
            <p className="mt-10 max-w-md text-sm leading-relaxed text-muted">
              Places will appear here once they are published.
            </p>
          )}
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
