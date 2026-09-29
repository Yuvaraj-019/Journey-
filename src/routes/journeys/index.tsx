import { createFileRoute } from "@tanstack/react-router";
import { ArrowLink } from "@/components/arrow-link";
import { CtaBand } from "@/components/layout/cta-band";
import { JourneyCard } from "@/components/journey-card";
import { PageHero } from "@/components/layout/page-hero";
import { useAllJourneys } from "@/lib/use-field";

export const Route = createFileRoute("/journeys/")({ component: JourneysIndex });

function JourneysIndex() {
  const all = useAllJourneys();

  return (
    <main>
      <PageHero
        eyebrow="Journeys"
        title="Places on the book."
        lede="Every entry is a place walked — photos, video, a note."
      />

      <section className="px-5 py-16 md:px-10">
        <div className="mx-auto max-w-6xl">
          {all.length ? (
            <div className="grid gap-10 md:grid-cols-2">
              {all.map((j) => (
                <JourneyCard key={j.slug} journey={j} />
              ))}
            </div>
          ) : (
            <p className="max-w-md text-sm leading-relaxed text-muted">Nothing logged yet.</p>
          )}
          <div className="mt-10">
            <ArrowLink to="/map">Interactive map</ArrowLink>
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
