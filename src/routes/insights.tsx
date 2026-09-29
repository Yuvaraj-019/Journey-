import { createFileRoute } from "@tanstack/react-router";
import { packingKits } from "@/data/site";
import { regions } from "@/data/regions";
import { PageHero } from "@/components/layout/page-hero";

export const Route = createFileRoute("/insights")({
  component: InsightsPage,
  head: () => ({ meta: [{ title: "Travel Insights — NORTHLINE" }] }),
});

const windows = [
  { slug: "himalaya", when: "Oct–Nov" },
  { slug: "alps", when: "Jul–Sep" },
  { slug: "patagonia", when: "Dec–Feb" },
  { slug: "japan", when: "Apr–May, Oct" },
  { slug: "indian-subcontinent", when: "Oct–Mar in the hills" },
  { slug: "sahara", when: "Nov–Feb" },
];

function InsightsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Travel Insights"
        title="When to go. What to pack."
        lede="Short notes — not a guidebook."
      />

      <section className="px-5 py-16 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">Season windows</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-reveal-stagger>
            {windows.map((w) => {
              const region = regions.find((r) => r.slug === w.slug);
              return (
                <li key={w.slug} className="rounded-lg border border-border bg-bg-elevated p-5">
                  <p className="text-sm text-fg">{region?.title ?? w.slug}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted">{w.when}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="border-t border-border px-5 py-16 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">Mountain kit</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal-stagger>
            {packingKits.mountain.map((item) => (
              <li key={item.item} className="border-b border-border pb-4">
                <p className="text-sm text-fg">{item.item}</p>
                <p className="mt-1 text-sm text-muted">{item.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
