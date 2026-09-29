const files = import.meta.glob("../../content/site/*.json", { eager: true, import: "default" });

export function cmsPortrait(): string {
  for (const raw of Object.values(files)) {
    const row = (raw ?? {}) as Record<string, unknown>;
    if (typeof row.portrait === "string" && row.portrait) return row.portrait;
    if (typeof row.image === "string" && row.image) return row.image;
  }
  return "";
}
