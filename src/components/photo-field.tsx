import { useRef, useState } from "react";
import { toast } from "sonner";
import { compressImage, MAX_PHOTOS } from "@/lib/compress-image";
import { saveMediaBlob } from "@/lib/media";
import { cn } from "@/lib/utils";
import { MediaImg } from "./media-img";

export function PhotoField({
  value,
  onChange,
  max = MAX_PHOTOS,
  label = "Photos",
}: {
  value: string[];
  onChange: (next: string[]) => void;
  max?: number;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function addFiles(files: FileList | File[]) {
    const existing = max === 1 ? [] : value;
    const room = max - existing.length;
    if (room <= 0) return toast(`Up to ${max} photographs.`);
    const batch = Array.from(files).filter((f) => f.type.startsWith("image/")).slice(0, room);
    if (!batch.length) return toast("Choose photos from this device.");
    setBusy(true);
    try {
      const next: string[] = [];
      for (const file of batch) {
        const dataUrl = await compressImage(file);
        const blob = await (await fetch(dataUrl)).blob();
        next.push(await saveMediaBlob(blob));
      }
      onChange([...existing, ...next]);
    } catch {
      toast("That photo wouldn't save. Try a smaller jpeg or png.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-1 text-sm text-faint">From this phone or computer. First one becomes the cover.</p>

      <div
        className={cn(
          "mt-4 rounded-lg border border-dashed border-border bg-bg-elevated px-5 py-8 text-center transition-colors",
          busy ? "opacity-70" : "hover:border-line",
        )}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          void addFiles(e.dataTransfer.files);
        }}
      >
        <p className="text-sm text-fg">{busy ? "Saving…" : "Drop photos here"}</p>
        <p className="mt-1 text-xs text-faint">or</p>
        <button
          type="button"
          className="mt-3 text-xs uppercase tracking-[0.16em] text-accent hover:text-fg"
          onClick={() => inputRef.current?.click()}
        >
          Choose photos
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) void addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {value.length ? (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4" data-reveal-stagger>
          {value.map((src, i) => (
            <li key={`${src}-${i}`} className="group relative overflow-hidden rounded-md">
              <MediaImg src={src} alt="" className="aspect-[4/5] w-full object-cover" />
              <button
                type="button"
                className="absolute right-2 top-2 rounded-sm bg-bg/80 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-fg opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => onChange(value.filter((_, n) => n !== i))}
              >
                Remove
              </button>
              {i === 0 ? (
                <span className="absolute bottom-2 left-2 rounded-sm bg-bg/80 px-2 py-1 text-[10px] uppercase tracking-[0.14em]">
                  Cover
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}

      <p className="mt-2 text-xs text-faint">
        {value.length}/{max}
      </p>
    </div>
  );
}
