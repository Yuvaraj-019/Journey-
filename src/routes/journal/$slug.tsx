import { createFileRoute, notFound } from "@tanstack/react-router";
import { getPost } from "@/data/journal";
import { Cover } from "@/components/cover";
import { CtaBand } from "@/components/layout/cta-band";
import { ArrowLink } from "@/components/arrow-link";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  component: JournalPostPage,
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.title ?? "Journal"} — NORTHLINE` }],
  }),
});

function JournalPostPage() {
  const post = Route.useLoaderData();
  return (
    <main>
      <header className="px-5 pb-10 pt-28 md:px-10 md:pt-36">
        <div className="mx-auto max-w-3xl">
          <ArrowLink to="/journal">All notes</ArrowLink>
          <p className="mt-8 text-xs uppercase tracking-[0.22em] text-muted">{post.date}</p>
          <h1 className="font-display mt-4 text-4xl leading-[1.1] md:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{post.lede}</p>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <Cover src={post.image} alt="" className="aspect-[16/8] rounded-lg" />
      </div>
      <article className="px-5 py-16 md:px-10">
        <div className="mx-auto max-w-3xl space-y-5">
          {post.body.map((p) => (
            <p key={p.slice(0, 24)} className="text-base leading-relaxed text-fg/90 md:text-lg">
              {p}
            </p>
          ))}
        </div>
      </article>
      <CtaBand />
    </main>
  );
}
