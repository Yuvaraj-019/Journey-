export const MAX_PHOTOS = 12;
const MAX_EDGE = 1400;
const TARGET_CHARS = 280_000;

export async function compressImage(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  let width = bitmap.width;
  let height = bitmap.height;
  if (width > MAX_EDGE || height > MAX_EDGE) {
    const scale = Math.min(MAX_EDGE / width, MAX_EDGE / height);
    width = Math.max(1, Math.round(width * scale));
    height = Math.max(1, Math.round(height * scale));
  }
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("Could not read that photo.");
  }
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  let quality = 0.76;
  let out = canvas.toDataURL("image/jpeg", quality);
  while (out.length > TARGET_CHARS && quality > 0.45) {
    quality -= 0.08;
    out = canvas.toDataURL("image/jpeg", quality);
  }
  return out;
}

export function isAllowedPhoto(src: string) {
  return (
    src.startsWith("data:image/") ||
    src.startsWith("/uploads/") ||
    src.startsWith("/images/") ||
    src.startsWith("https://") ||
    src.startsWith("http://") ||
    src.startsWith("media-") ||
    src.startsWith("blob:")
  );
}
