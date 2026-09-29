import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({ meta: [{ title: "About — NORTHLINE" }] }),
});

function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="The field journal"
        title="Places I walked."
        lede="A private log made public. Name a place, add photos and videos, pin it on the map."
      />

      <section className="px-5 py-16 md:px-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-base leading-relaxed text-muted">
            NORTHLINE is only this: the places I visit, the pictures and clips I bring home, and a
            map that shows where they are. Nothing is listed until I add it.
          </p>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
