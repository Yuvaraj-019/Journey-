import { createFileRoute } from "@tanstack/react-router";
import { reviews } from "@/data/journal";
import { CtaBand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";

export const Route = createFileRoute("/reviews")({
  component: ReviewsPage,
  head: () => ({ meta: [{ title: "Companions — NORTHLINE" }] }),
});

function ReviewsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Companions"
        title="What people say after a week out."
        lede="Not reviews of a product. Notes from people who shared a rope, a hut, a well, or a long afternoon of waiting."
      />
      <section className="px-5 py-16 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          {reviews.length === 0 ? (
            <p className="text-sm text-muted">No notes from companions yet.</p>
          ) : (
            reviews.map((r) => (
              <blockquote key={r.name} className="border-t border-border pt-6">
                <p className="text-xs uppercase tracking-[0.16em] text-faint">{r.rating}</p>
                <p className="mt-4 text-lg leading-relaxed text-fg">“{r.quote}”</p>
                <footer className="mt-4 text-sm text-muted">
                  {r.name} · {r.role}
                </footer>
              </blockquote>
            ))
          )}
        </div>
      </section>
      <CtaBand title="Walked together?" lede="If we shared a line, write. I'll put the honest version in the book." />
    </main>
  );
}
