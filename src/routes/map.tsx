import { createFileRoute } from "@tanstack/react-router";
import { AtlasMap } from "@/components/atlas-map";
import { PageHero } from "@/components/layout/page-hero";
import { useAllPlaces } from "@/lib/use-field";

export const Route = createFileRoute("/map")({
  component: MapPage,
  head: () => ({ meta: [{ title: "Map — NORTHLINE" }] }),
});

function MapPage() {
  const places = useAllPlaces();

  return (
    <main>
      <PageHero
        eyebrow="Atlas"
        title="Where the pins are."
        lede="Switch World or India. Every logged place is a pin."
      />
      <section className="px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-6xl">
          <AtlasMap places={places} />
        </div>
      </section>
    </main>
  );
}
