import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import type { Journey, Place, Stat } from "@/data/types";
import { slugify, uid } from "@/lib/utils";
import { cleanVideos } from "@/lib/video";

export type JourneyDraft = {
  slug?: string;
  title: string;
  region: string;
  year: string;
  dates: string;
  location: string;
  summary: string;
  body: string[];
  stats: Stat[];
  adventureSlugs: string[];
  images: string[];
  videos?: string[];
  featured?: boolean;
  places: {
    id?: string;
    name: string;
    country: string;
    note: string;
    images?: string[];
  }[];
};

export type PlaceDraft = {
  id?: string;
  name: string;
  country: string;
  region: string;
  year: string;
  note: string;
  journeySlug?: string;
  images?: string[];
};

type JourneyRow = {
  id: string;
  user_id: string;
  slug: string;
  title: string;
  region: string;
  year: string;
  dates: string;
  location: string;
  summary: string;
  body: string;
  stats: string;
  adventure_slugs: string;
  images: string;
  videos: string;
  featured: boolean | number | string;
  created_at: string;
};

type PlaceRow = {
  id: string;
  user_id: string;
  name: string;
  country: string;
  region: string;
  year: string;
  note: string;
  journey_slug: string | null;
  images: string;
  created_at: string;
};

function parseArr<T>(raw: unknown, fallback: T[] = []): T[] {
  if (Array.isArray(raw)) return raw as T[];
  if (typeof raw === "string") {
    try {
      const value = JSON.parse(raw) as unknown;
      return Array.isArray(value) ? (value as T[]) : fallback;
    } catch {
      return fallback;
    }
  }
  return fallback;
}

function allowedSrc(src: string) {
  return (
    src.startsWith("data:image/") ||
    src.startsWith("/images/") ||
    src.startsWith("https://")
  );
}

function cleanImages(input: unknown, max = 8) {
  if (!Array.isArray(input)) return [] as string[];
  return input
    .filter((src): src is string => typeof src === "string" && allowedSrc(src) && src.length < 520_000)
    .slice(0, max);
}

function toPlace(row: PlaceRow): Place {
  const images = cleanImages(parseArr<string>(row.images));
  return {
    id: row.id,
    name: row.name,
    country: row.country,
    region: row.region,
    year: row.year,
    note: row.note,
    journeySlug: row.journey_slug || undefined,
    custom: true,
    images,
  };
}

function toJourney(row: JourneyRow, places: Place[], fullImages: boolean): Journey {
  const images = cleanImages(parseArr<string>(row.images));
  const shown = fullImages ? images : images.slice(0, 1);
  return {
    slug: row.slug,
    title: row.title,
    region: row.region,
    year: row.year,
    dates: row.dates,
    location: row.location,
    summary: row.summary,
    body: parseArr<string>(row.body),
    stats: parseArr<Stat>(row.stats),
    places,
    adventureSlugs: parseArr<string>(row.adventure_slugs),
    featured: Boolean(row.featured),
    image: shown[0] || "",
    images: shown,
    videos: cleanVideos(parseArr<string>(row.videos)),
    custom: true,
  };
}

export const listPublishedJourneys = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const rows = await sql<JourneyRow>`
    select id, user_id, slug, title, region, year, dates, location, summary, body, stats,
           adventure_slugs, images, videos, featured, created_at
    from field_journeys
    order by created_at desc
  `;
  const placeRows = await sql<PlaceRow>`
    select id, user_id, name, country, region, year, note, journey_slug, images, created_at
    from field_places
    order by created_at desc
  `;
  const bySlug = new Map<string, Place[]>();
  for (const place of placeRows) {
    const mapped = toPlace(place);
    if (!mapped.journeySlug) continue;
    const list = bySlug.get(mapped.journeySlug) ?? [];
    list.push(mapped);
    bySlug.set(mapped.journeySlug, list);
  }
  return rows.map((row) => toJourney(row, bySlug.get(row.slug) ?? [], false));
});

export const getPublishedJourney = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const sql = await getSql();
    const rows = await sql<JourneyRow>`
      select id, user_id, slug, title, region, year, dates, location, summary, body, stats,
             adventure_slugs, images, videos, featured, created_at
      from field_journeys
      where slug = ${slug}
      limit 1
    `;
    const row = rows[0];
    if (!row) return null;
    const placeRows = await sql<PlaceRow>`
      select id, user_id, name, country, region, year, note, journey_slug, images, created_at
      from field_places
      where journey_slug = ${slug}
      order by created_at asc
    `;
    return toJourney(row, placeRows.map(toPlace), true);
  });

export const listPublishedPlaces = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const rows = await sql<PlaceRow>`
    select id, user_id, name, country, region, year, note, journey_slug, images, created_at
    from field_places
    order by created_at desc
  `;
  return rows.map(toPlace);
});

export const listMyJourneys = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<JourneyRow>`
      select id, user_id, slug, title, region, year, dates, location, summary, body, stats,
             adventure_slugs, images, videos, featured, created_at
      from field_journeys
      where user_id = ${context.userId}
      order by created_at desc
    `;
    const placeRows = await sql<PlaceRow>`
      select id, user_id, name, country, region, year, note, journey_slug, images, created_at
      from field_places
      where user_id = ${context.userId}
      order by created_at desc
    `;
    const bySlug = new Map<string, Place[]>();
    for (const place of placeRows) {
      const mapped = toPlace(place);
      if (!mapped.journeySlug) continue;
      const list = bySlug.get(mapped.journeySlug) ?? [];
      list.push(mapped);
      bySlug.set(mapped.journeySlug, list);
    }
    return rows.map((row) => toJourney(row, bySlug.get(row.slug) ?? [], true));
  });

export const listMyPlaces = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<PlaceRow>`
      select id, user_id, name, country, region, year, note, journey_slug, images, created_at
      from field_places
      where user_id = ${context.userId}
      order by created_at desc
    `;
    return rows.map(toPlace);
  });

export const saveJourney = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((draft: JourneyDraft) => draft)
  .handler(async ({ context, data }) => {
    const title = data.title.trim();
    if (!title) throw new Error("Name the journey.");
    const images = cleanImages(data.images);
    const videos = cleanVideos(data.videos);
    if (!images.length && !videos.length) throw new Error("Add a photo or a video.");
    const storedImages = images;
    const sql = await getSql();
    const requested = (data.slug?.trim() || slugify(title) || "field-log").slice(0, 72);
    const existing = await sql<JourneyRow>`
      select id, user_id, slug, title, region, year, dates, location, summary, body, stats,
             adventure_slugs, images, videos, featured, created_at
      from field_journeys
      where slug = ${requested}
      limit 1
    `;
    const owned = existing[0] && existing[0].user_id === context.userId ? existing[0] : null;
    let slug = requested;
    if (existing[0] && !owned) {
      slug = `${requested}-${uid("n")}`;
    }
    const id = owned?.id ?? uid("jn");
    const body = (data.body ?? []).map((p) => p.trim()).filter(Boolean);
    const stats = (data.stats ?? []).slice(0, 3);
    const adventureSlugs = (data.adventureSlugs ?? []).slice(0, 8);
    const payload = {
      title,
      region: data.region.trim() || "himalaya",
      year: data.year.trim() || String(new Date().getFullYear()),
      dates: data.dates.trim(),
      location: data.location.trim(),
      summary: data.summary.trim(),
      body: JSON.stringify(body),
      stats: JSON.stringify(stats),
      adventureSlugs: JSON.stringify(adventureSlugs),
      images: JSON.stringify(storedImages),
      videos: JSON.stringify(videos),
      featured: data.featured !== false,
    };

    if (owned) {
      await sql`
        update field_journeys set
          title = ${payload.title},
          region = ${payload.region},
          year = ${payload.year},
          dates = ${payload.dates},
          location = ${payload.location},
          summary = ${payload.summary},
          body = ${payload.body},
          stats = ${payload.stats},
          adventure_slugs = ${payload.adventureSlugs},
          images = ${payload.images},
          videos = ${payload.videos},
          featured = ${payload.featured}
        where id = ${id} and user_id = ${context.userId}
      `;
      await sql`delete from field_places where user_id = ${context.userId} and journey_slug = ${slug}`;
    } else {
      await sql`
        insert into field_journeys (
          id, user_id, slug, title, region, year, dates, location, summary, body, stats,
          adventure_slugs, images, videos, featured
        ) values (
          ${id}, ${context.userId}, ${slug}, ${payload.title}, ${payload.region}, ${payload.year},
          ${payload.dates}, ${payload.location}, ${payload.summary}, ${payload.body}, ${payload.stats},
          ${payload.adventureSlugs}, ${payload.images}, ${payload.videos}, ${payload.featured}
        )
      `;
    }

    const places = (data.places ?? [])
      .map((place) => ({
        id: uid("pl"),
        name: place.name.trim(),
        country: place.country.trim() || "—",
        note: place.note.trim(),
        images: cleanImages(place.images, 4),
      }))
      .filter((place) => place.name);

    for (const place of places) {
      await sql`
        insert into field_places (
          id, user_id, name, country, region, year, note, journey_slug, images
        ) values (
          ${place.id}, ${context.userId}, ${place.name}, ${place.country}, ${payload.region},
          ${payload.year}, ${place.note}, ${slug}, ${JSON.stringify(place.images)}
        )
      `;
    }

    return { slug };
  });

export const deleteJourney = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((slug: string) => slug)
  .handler(async ({ context, data: slug }) => {
    const sql = await getSql();
    await sql`delete from field_places where user_id = ${context.userId} and journey_slug = ${slug}`;
    await sql`delete from field_journeys where user_id = ${context.userId} and slug = ${slug}`;
  });

export const savePlace = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((draft: PlaceDraft) => draft)
  .handler(async ({ context, data }) => {
    const name = data.name.trim();
    if (!name) throw new Error("Name the place.");
    const sql = await getSql();
    const images = cleanImages(data.images, 6);
    const id = data.id?.trim() || uid("pl");
    const country = data.country.trim() || "—";
    const region = data.region.trim() || "himalaya";
    const year = data.year.trim() || String(new Date().getFullYear());
    const note = data.note.trim();
    const journeySlug = data.journeySlug?.trim() || null;

    const existing = await sql<PlaceRow>`
      select id from field_places where id = ${id} and user_id = ${context.userId} limit 1
    `;
    if (existing[0]) {
      await sql`
        update field_places set
          name = ${name},
          country = ${country},
          region = ${region},
          year = ${year},
          note = ${note},
          journey_slug = ${journeySlug},
          images = ${JSON.stringify(images)}
        where id = ${id} and user_id = ${context.userId}
      `;
    } else {
      await sql`
        insert into field_places (
          id, user_id, name, country, region, year, note, journey_slug, images
        ) values (
          ${id}, ${context.userId}, ${name}, ${country}, ${region}, ${year}, ${note},
          ${journeySlug}, ${JSON.stringify(images)}
        )
      `;
    }
    return { id };
  });

export const deletePlace = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: string) => id)
  .handler(async ({ context, data: id }) => {
    const sql = await getSql();
    await sql`delete from field_places where id = ${id} and user_id = ${context.userId}`;
  });
