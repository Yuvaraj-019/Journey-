import { createFileRoute } from "@tanstack/react-router";
import { methodPhases } from "@/data/method";
import { CtaBand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";

export const Route = createFileRoute("/method")({
  component: MethodPage,
  head: () => ({ meta: [{ title: "The 5 Method — NORTHLINE" }] }),
});

function MethodPage() {
  return (
    <main>
      <PageHero
        eyebrow="The framework"
        title="The 5 Method."
        lede="I run every journey through five phases — Scout, Route, Pack, Move, Record. It's how a field doctor works: understand the land before you treat it, and stay with the notes long after the first camp."
      />
      <section className="px-5 pb-8 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm uppercase tracking-[0.2em] text-faint">
            {methodPhases.map((p) => p.title).join(" · ")}
          </p>
        </div>
      </section>
      {methodPhases.map((p) => (
        <section key={p.slug} id={p.slug} className="border-t border-border px-5 py-16 md:px-10">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-12">
            <div className="md:col-span-2">
              <p data-reveal className="font-display text-4xl text-faint">{p.num}</p>
            </div>
            <div className="md:col-span-10">
              <h2 data-reveal className="font-display text-4xl md:text-5xl">{p.title}</h2>
              <p data-reveal className="mt-4 text-lg text-fg">{p.question}</p>
              <p data-reveal className="mt-5 max-w-2xl text-base leading-relaxed text-muted">{p.body}</p>
              <p data-reveal className="mt-6 text-sm uppercase tracking-[0.16em] text-faint">{p.outcome}</p>
            </div>
          </div>
        </section>
      ))}
      <CtaBand
        eyebrow="Ready to start with the scouting?"
        title="Tell me the range."
        lede="I'll tell you what I'd do about it. Or skip the conversation and log the days yourself."
        cta="Start the diagnosis"
      />
    </main>
  );
}
