import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBand } from "@/components/layout/cta-band";

export const Route = createFileRoute("/tools/")({
  component: ToolsIndex,
  head: () => ({ meta: [{ title: "Field tools — NORTHLINE" }] }),
});

const tools = [
  {
    to: "/tools/route",
    title: "Route grade",
    lede: "A senior-human diagnosis of whether the line is the one you think it is. Four questions. An honest grade.",
  },
  {
    to: "/tools/conditions",
    title: "Conditions desk",
    lede: "Season notes for eleven ranges. Windows, not wishful thinking.",
  },
  {
    to: "/tools/packing",
    title: "Packing check",
    lede: "A kit list that matches mountain, water, desert, or wild — not a catalogue.",
  },
];

function ToolsIndex() {
  return (
    <main>
      <PageHero
        eyebrow="Test the line · free, no signup"
        title="Field tools."
        lede="Three small desks I actually use before a walk. Not gadgets. Questions."
      />
      <section className="px-5 py-16 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {tools.map((t) => (
            <Link
              key={t.to}
              to={t.to as never}
              className="rounded-lg border border-border bg-bg-elevated p-6 transition-colors hover:border-line"
            >
              <h2 className="text-sm uppercase tracking-[0.16em] text-fg">{t.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{t.lede}</p>
              <p className="mt-6 text-xs uppercase tracking-[0.16em] text-faint">Open → →</p>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
