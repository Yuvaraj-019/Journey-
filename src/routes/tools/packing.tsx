import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { adventureCategories } from "@/data/adventures";
import { packingKits } from "@/data/site";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBand } from "@/components/layout/cta-band";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tools/packing")({
  component: PackingPage,
  head: () => ({ meta: [{ title: "Packing check — NORTHLINE" }] }),
});

function PackingPage() {
  const [cat, setCat] = useState<(typeof adventureCategories)[number]["slug"]>("mountain");
  const items = packingKits[cat];
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const keyPrefix = cat;

  const done = useMemo(
    () => items.filter((i) => checked[`${keyPrefix}:${i.item}`]).length,
    [items, checked, keyPrefix],
  );

  return (
    <main>
      <PageHero
        eyebrow="Field tool"
        title="Packing check."
        lede="Pick the kind of going out. Tick what you actually have. The list is short on purpose — if you need a gadget to feel ready, you probably aren't."
      />
      <section className="px-5 py-12 md:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap gap-2">
            {adventureCategories.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => setCat(c.slug)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs uppercase tracking-[0.14em]",
                  cat === c.slug
                    ? "border-accent bg-bg-elevated text-fg"
                    : "border-border text-muted hover:border-line",
                )}
              >
                {c.title}
              </button>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted">
            {done} of {items.length} sitting in the pack
          </p>
          <ul className="mt-6 space-y-3">
            {items.map((i) => {
              const id = `${keyPrefix}:${i.item}`;
              const on = Boolean(checked[id]);
              return (
                <li key={i.item}>
                  <button
                    type="button"
                    onClick={() => setChecked((c) => ({ ...c, [id]: !on }))}
                    className={cn(
                      "flex w-full items-start gap-4 rounded-lg border px-4 py-4 text-left transition-colors",
                      on ? "border-accent bg-bg-elevated" : "border-border hover:border-line",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 size-4 shrink-0 rounded-xs border",
                        on ? "border-accent bg-accent" : "border-line",
                      )}
                    />
                    <span>
                      <span className="block text-sm text-fg">{i.item}</span>
                      <span className="mt-1 block text-sm text-muted">{i.note}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <CtaBand title="Kit is the easy part." lede="The method is the rest. Scout, then pack." to="/method" cta="The method" />
    </main>
  );
}
