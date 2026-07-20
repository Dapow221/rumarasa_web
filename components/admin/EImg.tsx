"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useAdmin } from "./AdminProvider";
import { compressImage, ImageTooLargeError } from "@/lib/compressImage";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

type EImgProps = {
  image?: string;
  label: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
} & (
  | { k: string; c?: never; id?: never } // content-block image (e.g. hero.image)
  | { k?: never; c: string; id: string } // collection item image_url
);

/**
 * Editable image slot. Renders the CMS image (or placeholder); in edit mode an
 * overlay button opens a file picker, uploads to the API, and binds the new
 * image to its content key or collection item.
 */
export function EImg({
  image,
  label,
  sizes = "(min-width: 768px) 400px, 100vw",
  priority,
  quality = 70,
  k,
  c,
  id,
}: EImgProps) {
  const { editMode, uploadImage, saveContent, patchItem, notify } = useAdmin();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busyLabel, setBusyLabel] = useState<string | null>(null);

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    try {
      let toUpload = file;
      if (file.size > 4.75 * 1024 * 1024) {
        setBusyLabel("Mengompresi…");
        toUpload = await compressImage(file);
        const mb = (n: number) => (n / 1024 / 1024).toFixed(1);
        notify(`Dikompresi ${mb(file.size)} MB → ${mb(toUpload.size)} MB`);
      }
      setBusyLabel("Mengunggah…");
      const url = await uploadImage(toUpload);
      if (url) {
        if (k) await saveContent(k, url);
        else if (c && id) await patchItem(c, id, { image_url: url });
      }
    } catch (err) {
      notify(err instanceof ImageTooLargeError ? err.message : "Gagal memproses gambar");
    } finally {
      setBusyLabel(null);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      {image ? (
        <Image
          src={image}
          alt={label}
          fill
          sizes={sizes}
          priority={priority}
          quality={quality}
          className="object-cover"
        />
      ) : (
        <ImagePlaceholder label={label} />
      )}
      {editMode && (
        <>
          <button
            type="button"
            disabled={busyLabel !== null}
            onClick={() => inputRef.current?.click()}
            className="absolute bottom-2 left-2 z-10 cursor-pointer rounded-full bg-espresso/90 px-4 py-2 text-xs tracking-[1px] text-ivory uppercase shadow-md transition-colors hover:bg-copper disabled:opacity-60"
          >
            {busyLabel ?? "📷 Ganti foto"}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(e) => void onFile(e.target.files?.[0])}
          />
        </>
      )}
    </div>
  );
}
