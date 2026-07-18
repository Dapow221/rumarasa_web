const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // backend hard limit
const TARGET_BYTES = Math.floor(MAX_UPLOAD_BYTES * 0.95); // headroom for multipart overhead
const MAX_DIMENSION = 2560; // plenty for a 1180px-wide layout on retina
const QUALITY_STEPS = [0.85, 0.75, 0.65, 0.55];

export class ImageTooLargeError extends Error {}

/**
 * Returns a file guaranteed to be under the backend's 5 MB upload limit.
 * Small files pass through untouched. Oversized JPEG/PNG/WebP are downscaled
 * on a canvas and re-encoded (PNG → WebP to keep transparency, others → JPEG),
 * stepping quality and dimensions down until the target size is met.
 * Oversized GIFs throw: canvas re-encoding would silently drop the animation.
 */
export async function compressImage(file: File): Promise<File> {
  if (file.size <= TARGET_BYTES) return file;

  if (file.type === "image/gif") {
    throw new ImageTooLargeError(
      "GIF lebih dari 5 MB tidak bisa dikompres otomatis tanpa menghilangkan animasinya — kecilkan dulu secara manual.",
    );
  }

  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) {
    throw new ImageTooLargeError("File tidak bisa dibaca sebagai gambar.");
  }

  // PNG may carry transparency; WebP keeps it while still compressing well.
  const outType = file.type === "image/png" ? "image/webp" : "image/jpeg";
  const outExt = outType === "image/webp" ? ".webp" : ".jpg";

  let maxSide = Math.min(MAX_DIMENSION, Math.max(bitmap.width, bitmap.height));
  for (let attempt = 0; attempt < 4; attempt++) {
    for (const quality of QUALITY_STEPS) {
      const blob = await encode(bitmap, maxSide, outType, quality);
      if (blob && blob.size <= TARGET_BYTES) {
        bitmap.close();
        const name = file.name.replace(/\.[^.]+$/, "") + outExt;
        return new File([blob], name, { type: outType });
      }
    }
    maxSide = Math.floor(maxSide * 0.7);
  }

  bitmap.close();
  throw new ImageTooLargeError("Gambar tidak bisa dikompres di bawah 5 MB.");
}

async function encode(
  bitmap: ImageBitmap,
  maxSide: number,
  type: string,
  quality: number,
): Promise<Blob | null> {
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.drawImage(bitmap, 0, 0, width, height);

  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));
}
