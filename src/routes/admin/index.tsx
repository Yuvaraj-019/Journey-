import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { PhotoField } from "@/components/photo-field";
import { VideoField } from "@/components/video-field";
import { Button } from "@/components/ui/button";
import { Cover } from "@/components/cover";
import { SplitHeading } from "@/components/motion/split-heading";
import { geocodePlace, type GeoHit } from "@/lib/geocode";
import { deleteMedia } from "@/lib/media";
import { deleteLocalPlace, upsertLocalPlace, useLocalPlaces } from "@/lib/journal-store";
import { setSitePortrait, useSiteProfile } from "@/lib/site-store";
import { FieldNotes } from "@/components/field-notes";
import { classifyPlace } from "@/data/classify";
import { getRegion } from "@/data/regions";

export const Route = createFileRoute("/admin/")({
  component: AdminPage,
  validateSearch: (search: Record<string, unknown>) => ({
    edit: typeof search.edit === "string" ? search.edit : undefined,
  }),
  head: () => ({ meta: [{ title: "Admin — NORTHLINE" }] }),
});

function AdminPage() {
  const { edit } = Route.useSearch();
  const places = useLocalPlaces();
  const current = useMemo(() => places.find((p) => p.id === edit || p.slug === edit), [places, edit]);

  return (
    <main>
      <header className="px-5 pb-10 pt-28 md:px-10 md:pt-36">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">Admin</p>
          <SplitHeading
            as="h1"
            text={current ? "Edit this place." : "Add a place."}
            className="font-display mt-4 text-4xl leading-[1.05] md:text-6xl"
          />
          <p data-reveal="load" className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            Place name, photos and videos from this device, a short note. The pin is placed from the
            real location of the name you type.
          </p>
        </div>
      </header>

      <section className="px-5 pb-16 md:px-10">
        <div className="mx-auto max-w-3xl">
          <HomePortrait />
          <PlaceForm
            key={current?.id ?? "new"}
            initial={current}
          />
        </div>
      </section>

      {places.length ? (
        <section className="border-t border-border px-5 py-16 md:px-10">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs uppercase tracking-[0.22em] text-muted">Your places</p>
            <ul className="mt-8 space-y-4">
              {places.map((p) => (
                <li key={p.id} className="flex gap-4 rounded-lg border border-border bg-bg-elevated p-3">
                  <Cover src={p.photos[0] ?? ""} alt="" className="size-20 shrink-0 rounded-md" clip={false} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-fg">{p.name}</p>
                    <p className="mt-1 truncate text-xs text-faint">
                      {p.location || p.country} · {p.lat.toFixed(3)}, {p.lng.toFixed(3)}
                    </p>
                    <div className="mt-3 flex gap-4">
                      <Link
                        to="/admin"
                        search={{ edit: p.id }}
                        className="text-[10px] uppercase tracking-[0.14em] text-accent"
                      >
                        Edit
                      </Link>
                      <Link
                        to="/journeys/$slug"
                        params={{ slug: p.slug }}
                        className="text-[10px] uppercase tracking-[0.14em] text-muted"
                      >
                        View
                      </Link>
                      <button
                        type="button"
                        className="text-[10px] uppercase tracking-[0.14em] text-danger"
                        onClick={() => {
                          p.photos.concat(p.videos).forEach((id) => void deleteMedia(id));
                          deleteLocalPlace(p.id);
                          toast("Removed.");
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="border-t border-border px-5 py-16 md:px-10">
        <div className="mx-auto max-w-3xl text-sm leading-relaxed text-muted">
          <p className="text-xs uppercase tracking-[0.22em] text-fg">After you host on Netlify</p>
          <ol className="mt-6 list-decimal space-y-3 pl-5">
            <li>Open Site settings → Identity → Enable Identity. Set registration to Invite only. Invite your email.</li>
            <li>Enable Git Gateway in the same Identity page.</li>
            <li>
              Then this site’s live admin is at <span className="text-fg">yoursite.netlify.app/admin</span>. Log in,
              click Places → New, upload photos and videos from your computer, publish. Netlify rebuilds the site.
            </li>
          </ol>
          <p className="mt-6">
            Videos go as files, not links. Keep clips under about 80 MB so GitHub will accept them.
          </p>
        </div>
      </section>
    </main>
  );
}

function HomePortrait() {
  const site = useSiteProfile();
  return (
    <div className="mb-16 border-b border-border pb-12">
      <p className="text-xs uppercase tracking-[0.16em] text-muted">Home portrait</p>
      <p className="mt-1 text-sm text-faint">
        This is the first image on the site. It is you — not a place you visited.
      </p>
      <div className="mt-5">
        <PhotoField
          value={site.portrait ? [site.portrait] : []}
          onChange={(next) => setSitePortrait(next[0] ?? "")}
          max={1}
          label="Portrait"
        />
      </div>
    </div>
  );
}

function PlaceForm({ initial }: { initial?: ReturnType<typeof useLocalPlaces>[number] }) {
  const navigate = useNavigate();
  const [name, setName] = useState(initial?.name ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [country, setCountry] = useState(initial?.country ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [date, setDate] = useState(initial?.date ?? new Date().toISOString().slice(0, 10));
  const [photos, setPhotos] = useState<string[]>(initial?.photos ?? []);
  const [videos, setVideos] = useState<string[]>(initial?.videos ?? []);
  const [pin, setPin] = useState<GeoHit | null>(
    initial ? { lat: initial.lat, lng: initial.lng, label: initial.location || initial.name } : null,
  );
  const [busy, setBusy] = useState(false);

  async function findPin() {
    const q = [name, location, country].filter(Boolean).join(", ");
    if (!q.trim()) return toast("Type the place name first.");
    const hit = await geocodePlace(q);
    if (!hit) return toast("Could not find that place. Add a city or region (example: Leh, Ladakh, India).");
    setPin(hit);
    if (hit.country) setCountry(hit.country);
    toast(`Pinned at ${hit.lat.toFixed(4)}, ${hit.lng.toFixed(4)}`);
  }

  async function save() {
    const placeName = name.trim();
    if (!placeName) return toast("Add the place name.");
    if (!photos.length && !videos.length) return toast("Add at least one photo or video.");
    setBusy(true);
    try {
      const hit = pin ?? (await geocodePlace([placeName, location, country].filter(Boolean).join(", ")));
      if (!hit) {
        toast("Need a real location to drop the pin. Add city + region, then save again.");
        return;
      }
      setPin(hit);
      if (hit.country && !country.trim()) setCountry(hit.country);
      const saved = upsertLocalPlace({
        id: initial?.id,
        slug: initial?.slug,
        name: placeName,
        location: location.trim() || hit.label,
        country: country.trim() || hit.country || "",
        description: description.trim(),
        date,
        lat: hit.lat,
        lng: hit.lng,
        photos,
        videos,
      });
      toast("Saved.");
      await navigate({ to: "/journeys/$slug", params: { slug: saved.slug } });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      className="space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        void save();
      }}
    >
      <label className="block">
        <span className="text-xs uppercase tracking-[0.16em] text-muted">Place name</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => void findPin()}
          placeholder="Leh"
          className="mt-2 w-full rounded-md border border-border bg-bg-elevated px-4 py-3 text-sm text-fg placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      </label>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs uppercase tracking-[0.16em] text-muted">Region / city</span>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onBlur={() => void findPin()}
            placeholder="Ladakh"
            className="mt-2 w-full rounded-md border border-border bg-bg-elevated px-4 py-3 text-sm text-fg placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-[0.16em] text-muted">Country</span>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            onBlur={() => void findPin()}
            placeholder="Mexico"
            className="mt-2 w-full rounded-md border border-border bg-bg-elevated px-4 py-3 text-sm text-fg placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => void findPin()}
          className="text-xs uppercase tracking-[0.16em] text-accent hover:text-fg"
        >
          Find on map
        </button>
        {pin ? (
          <p className="text-xs text-muted">
            Pin {pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}
            {pin.label ? ` · ${pin.label}` : ""}
          </p>
        ) : (
          <p className="text-xs text-faint">Pin is set from the place name, not the middle of the country.</p>
        )}
      </div>
      <label className="block">
        <span className="text-xs uppercase tracking-[0.16em] text-muted">When</span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-2 w-full rounded-md border border-border bg-bg-elevated px-4 py-3 text-sm text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      </label>
      <label className="block">
        <span className="text-xs uppercase tracking-[0.16em] text-muted">Note</span>
        <p className="mt-1 text-sm text-faint">
          Paragraphs become paragraphs. Lines starting with - or 1. become lists.
        </p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={8}
          placeholder={"First morning in the fort.\n\n- stone stairs at dawn\n- the city below still grey\n- tea on the terrace"}
          className="mt-2 w-full rounded-md border border-border bg-bg-elevated px-4 py-3 text-sm leading-relaxed text-fg placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
        {description.trim() ? (
          <div className="mt-4 rounded-md border border-border bg-bg px-4 py-4">
            <p className="text-[10px] uppercase tracking-[0.16em] text-faint">Preview</p>
            <FieldNotes text={description} />
          </div>
        ) : null}
      </label>
      {pin ? (
        <p className="text-xs uppercase tracking-[0.14em] text-muted">
          {classifyPlace({ name, location, country: country || pin.country, lat: pin.lat, lng: pin.lng }).continent}
          {" · "}
          {getRegion(classifyPlace({ name, location, country: country || pin.country, lat: pin.lat, lng: pin.lng }).region)?.title}
        </p>
      ) : null}
      <PhotoField value={photos} onChange={setPhotos} />
      <VideoField value={videos} onChange={setVideos} />
      <Button type="submit" disabled={busy}>
        {busy ? "Saving…" : "Save place"}
      </Button>
    </form>
  );
}
