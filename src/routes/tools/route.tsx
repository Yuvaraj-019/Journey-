import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBand } from "@/components/layout/cta-band";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tools")({
  component: RouteGradePage,
  head: () => ({ meta: [{ title: "Route grade — NORTHLINE" }] }),
});

const questions = [
  {
    q: "Have you walked this kind of ground before, in this season?",
    options: [
      { label: "Yes, recently, similar altitude or water", score: 2 },
      { label: "Adjacent — close enough that pride might lie", score: 1 },
      { label: "No. This would be a first.", score: 0 },
    ],
  },
  {
    q: "What's your bail-out?",
    options: [
      { label: "A real one, within a day, that I've named", score: 2 },
      { label: "A town on the map I haven't looked at twice", score: 1 },
      { label: "The plan is to not need one", score: 0 },
    ],
  },
  {
    q: "Who else is on the line?",
    options: [
      { label: "A partner or crew who can say no to me", score: 2 },
      { label: "Someone who likes my photographs", score: 1 },
      { label: "Just me, and the algorithm", score: 0 },
    ],
  },
  {
    q: "What happens if the weather is wrong for two days?",
    options: [
      { label: "Food, fuel, and a smaller mountain already chosen", score: 2 },
      { label: "We'd be uncomfortable, but we'd live", score: 1 },
      { label: "The itinerary doesn't have room for that", score: 0 },
    ],
  },
];

function RouteGradePage() {
  const [answers, setAnswers] = useState<number[]>([-1, -1, -1, -1]);
  const [done, setDone] = useState(false);
  const score = answers.reduce((a, b) => a + Math.max(0, b), 0);

  function grade() {
    if (answers.some((a) => a < 0)) return;
    setDone(true);
  }

  const result =
    score >= 7
      ? {
          title: "The line is probably the one you think it is.",
          text: "Still scout. Still pack a wait. The grade is a green light to take the next honest step, not a guarantee.",
        }
      : score >= 4
        ? {
            title: "A smaller mountain is hiding inside this one.",
            text: "You can go, but the itinerary should shrink until the nos have a place to live. That's not retreat. That's the method.",
          }
        : {
            title: "This is a wish with a GPX file.",
            text: "Keep the dream. Change the week. Hire the knowledge, pick a closer range, or wait a season. I mean this kindly.",
          };

  return (
    <main>
      <PageHero
        eyebrow="Field tool"
        title="Route grade."
        lede="A short diagnosis of whether the line is the one you think it is. Four questions. No signup. The answers stay on this page."
      />
      <section className="px-5 py-12 md:px-10">
        <div className="mx-auto max-w-2xl space-y-10">
          {questions.map((q, qi) => (
            <div key={q.q}>
              <p className="text-lg text-fg">{q.q}</p>
              <ul className="mt-4 space-y-2">
                {q.options.map((o) => (
                  <li key={o.label}>
                    <button
                      type="button"
                      onClick={() =>
                        setAnswers((a) => {
                          const next = [...a];
                          next[qi] = o.score;
                          return next;
                        })
                      }
                      className={cn(
                        "w-full rounded-md border px-4 py-3 text-left text-sm",
                        answers[qi] === o.score
                          ? "border-accent bg-bg-elevated text-fg"
                          : "border-border text-muted hover:border-line",
                      )}
                    >
                      {o.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Button type="button" onClick={grade} disabled={answers.some((a) => a < 0)}>
            Grade the line → →
          </Button>
          {done ? (
            <div className="rounded-lg border border-border bg-bg-elevated p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">Score {score} / 8</p>
              <h2 className="font-display mt-3 text-3xl">{result.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">{result.text}</p>
            </div>
          ) : null}
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
