import { lookupGazetteer } from "@/data/gazetteer";

export type GeoHit = { lat: number; lng: number; label: string; country?: string };

export async function geocodePlace(query: string): Promise<GeoHit | null> {
  const q = query.trim();
  if (!q) return null;
  const local = lookupGazetteer(q);

  try {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=1`;
    const res = await fetch(url);
    if (!res.ok) return local;
    const data = (await res.json()) as {
      features?: { geometry?: { coordinates?: number[] }; properties?: Record<string, string> }[];
    };
    const f = data.features?.[0];
    const coords = f?.geometry?.coordinates;
    if (!coords || coords.length < 2) return local;
    const [lng, lat] = coords;
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return local;
    const p = f?.properties ?? {};
    const label = [p.name, p.city, p.state, p.country].filter(Boolean).join(", ") || q;
    return { lat, lng, label, country: p.country || "" };
  } catch {
    return local;
  }
}
