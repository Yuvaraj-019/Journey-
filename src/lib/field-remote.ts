import type { Journey, Place } from "@/data/types";
import { listPublishedJourneys, listPublishedPlaces } from "@/lib/field-api";

type Cache = {
  journeys: Journey[];
  places: Place[];
  loaded: boolean;
  error: string | null;
};

let cache: Cache = { journeys: [], places: [], loaded: false, error: null };
const listeners = new Set<() => void>();

function emit() {
  for (const listen of listeners) listen();
}

export function getFieldCache() {
  return cache;
}

export function subscribeField(listen: () => void) {
  listeners.add(listen);
  return () => {
    listeners.delete(listen);
  };
}

export async function refreshField() {
  try {
    const [journeys, places] = await Promise.all([listPublishedJourneys(), listPublishedPlaces()]);
    cache = { journeys, places, loaded: true, error: null };
  } catch (err) {
    cache = {
      ...cache,
      loaded: true,
      error: err instanceof Error ? err.message : "Could not load the field book.",
    };
  }
  emit();
}
