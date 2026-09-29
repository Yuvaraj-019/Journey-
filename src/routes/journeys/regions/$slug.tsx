import { createFileRoute, notFound } from "@tanstack/react-router";
import { getRegion } from "@/data/regions";
import { CtaBand } from "@/components/layout/cta-band";
import { JourneyCard } from "@/components/journey-card";
import { PageHero } from "@/components/layout/page-hero";
import { ArrowLink } from "@/components/arrow-link";
import { useAllJourneys, useAllPlaces } from "@/lib/use-field";

export const Route = createFileRoute("/journeys/regions/$slug")({
  loader: ({ params }) => {
    const region = getRegion(params.slug);
    if (!region) throw notFound();
    return region;
  },
  component: RegionPage,
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.title ?? "Range"} — NORTHLINE` }],
  }),
});

function RegionPage() {
  const region = Route.useLoaderData();
  const journeys = useAllJourneys().filter((j) => j.region === region.slug);
  const places = useAllPlaces().filter((p) => p.region === region.slug);

  return (
    <main>
      <PageHero
        eyebrow={`${region.continent} · Journeys`}
        title={`${region.title} journeys`}
        lede={region.lede}
      />
      <section className="px-5 py-12 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="max-w-2xl text-base leading-relaxed text-muted">{region.body}</p>
        </div>
      </section>

      <section className="border-t border-border px-5 py-16 md:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl">
            {journeys.length} {journeys.length === 1 ? "journey" : "journeys"}
          </h2>
          {journeys.length === 0 ? (
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted">
              Nothing published in this range yet.
            </p>
          ) : (
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              {journeys.map((j) => (
                <JourneyCard key={j.slug} journey={j} />
              ))}
            </div>
          )}
          <div className="mt-10">
            <ArrowLink to="/journeys">All journeys</ArrowLink>
          </div>
        </div>
      </section>

      {places.length ? (
        <section className="border-t border-border px-5 py-16 md:px-10">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl">Places in {region.title}</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {places.map((p) => (
                <li key={p.id} className="rounded-lg border border-border bg-bg-elevated p-5">
                  <p className="text-sm text-fg">{p.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-faint">
                    {p.country} · {p.year}
                  </p>
                  {p.note ? <p className="mt-3 text-sm text-muted">{p.note}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand
        title={`${region.title}.`}
        lede={region.lede}
      />
    </main>
  );
}
