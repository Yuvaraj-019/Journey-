import type { Adventure } from "./types";

export const adventureCategories = [
  { slug: "mountain", title: "Mountain & Alpine" },
  { slug: "water", title: "Water & Coast" },
  { slug: "desert", title: "Desert & Overland" },
  { slug: "wild", title: "Wild & Far" },
] as const;

export const adventures: Adventure[] = [];

export function getAdventure(slug: string) {
  return adventures.find((a) => a.slug === slug);
}

export function adventuresByCategory(categorySlug: string) {
  return adventures.filter((a) => a.categorySlug === categorySlug);
}
