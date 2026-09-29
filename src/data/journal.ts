import type { JournalPost, Review } from "./types";

export const journalPosts: JournalPost[] = [];

export function getPost(slug: string) {
  return journalPosts.find((p) => p.slug === slug);
}

export const reviews: Review[] = [];
