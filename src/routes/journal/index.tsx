import { createFileRoute, Link } from "@tanstack/react-router";
import { journalPosts } from "@/data/journal";
import { Cover } from "@/components/cover";
import { CtaBand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";

export const Route = createFileRoute("/journal/")({
  component: JournalIndex,
  head: () => ({ meta: [{ title: "Journal — NORTHLINE" }] }),
});

function JournalIndex() {
  return (
    <main>
      <PageHero eyebrow="Field notes" title="The journal." lede="Notes will live here when you write them." />
      <section className="px-5 py-16 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          {journalPosts.length === 0 ? (
            <p className="text-sm text-muted">No notes yet.</p>
          ) : (
            journalPosts.map((p) => (
              <Link key={p.slug} to="/journal/$slug" params={{ slug: p.slug }} className="group block">
                {p.image ? <Cover src={p.image} alt="" className="aspect-[16/9] rounded-md" /> : null}
                <p className="mt-4 text-xs uppercase tracking-[0.16em] text-muted">{p.date}</p>
                <h2 className="font-display mt-2 text-2xl leading-snug text-fg group-hover:text-accent">
                  {p.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.lede}</p>
              </Link>
            ))
          )}
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
