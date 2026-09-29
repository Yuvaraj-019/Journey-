import { useRef, useState } from "react";
import { toast } from "sonner";
import { saveMediaBlob } from "@/lib/media";

const MAX_VIDEOS = 8;
const MAX_FILE_BYTES = 80 * 1024 * 1024;

export function VideoField({
  value,
  onChange,
}: {
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function addFile(file: File) {
    if (value.length >= MAX_VIDEOS) return toast(`Up to ${MAX_VIDEOS} videos.`);
    if (!file.type.startsWith("video/")) return toast("Choose a video from this device.");
    if (file.size > MAX_FILE_BYTES) return toast("That video is larger than 80 MB. Compress it first, then add it.");
    setBusy(true);
    try {
      const id = await saveMediaBlob(file);
      onChange([...value, id]);
    } catch {
      toast("Couldn't add that video.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.16em] text-muted">Videos</p>
      <p className="mt-1 text-sm text-faint">From this device only. You can add more than one.</p>
      <button
        type="button"
        className="mt-4 rounded-sm border border-border px-4 py-3 text-xs uppercase tracking-[0.16em] text-accent hover:text-fg"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
      >
        {busy ? "Saving video…" : "Add video from device"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime,video/*"
        multiple
        className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          e.target.value = "";
          void (async () => {
            for (const file of files) await addFile(file);
          })();
        }}
      />

      {value.length ? (
        <ul className="mt-4 space-y-3">
          {value.map((src, i) => (
            <li
              key={`${src}-${i}`}
              className="flex items-center justify-between gap-3 rounded-md border border-border bg-bg-elevated px-4 py-3"
            >
              <span className="truncate text-sm text-fg">Video {i + 1}</span>
              <button
                type="button"
                className="text-[10px] uppercase tracking-[0.14em] text-danger"
                onClick={() => onChange(value.filter((_, n) => n !== i))}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
