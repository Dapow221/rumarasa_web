"use client";

import { useState } from "react";
import { useAdmin } from "./AdminProvider";

interface AddItemProps {
  collection: string;
  template: Record<string, unknown>;
  label: string;
  dark?: boolean;
}

/** "+ Tambah …" button, visible only in edit mode. */
export function AddItem({ collection, template, label, dark }: AddItemProps) {
  const { editMode, createItem } = useAdmin();
  const [busy, setBusy] = useState(false);
  if (!editMode) return null;

  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await createItem(collection, template);
        setBusy(false);
      }}
      className={`cursor-pointer rounded-full border border-dashed px-6 py-3 text-[13px] tracking-[1.5px] uppercase transition-colors disabled:opacity-60 ${
        dark
          ? "border-ivory/50 text-ivory hover:bg-ivory/10"
          : "border-tan-dark text-walnut hover:bg-line"
      }`}
    >
      {busy ? "Menambahkan…" : `+ ${label}`}
    </button>
  );
}

/** Two-step delete button ("×" → "Hapus?"), visible only in edit mode. */
export function DeleteItem({ collection, id }: { collection: string; id: string }) {
  const { editMode, deleteItem } = useAdmin();
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  if (!editMode) return null;

  if (!confirming) {
    return (
      <button
        type="button"
        aria-label="Hapus item"
        onClick={() => setConfirming(true)}
        onBlur={() => setConfirming(false)}
        className="absolute top-2 right-2 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-espresso/85 text-ivory shadow-md transition-colors hover:bg-red-700"
      >
        ×
      </button>
    );
  }
  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await deleteItem(collection, id);
        setBusy(false);
        setConfirming(false);
      }}
      onBlur={() => setConfirming(false)}
      className="absolute top-2 right-2 z-10 cursor-pointer rounded-full bg-red-700 px-3 py-1.5 text-xs tracking-[1px] text-white uppercase shadow-md"
    >
      {busy ? "…" : "Hapus?"}
    </button>
  );
}

/** Star toggle for promos.featured, visible only in edit mode. */
export function FeatureToggle({ id, featured }: { id: string; featured: boolean }) {
  const { editMode, patchItem } = useAdmin();
  if (!editMode) return null;

  return (
    <button
      type="button"
      aria-label={featured ? "Hapus sorotan" : "Jadikan sorotan"}
      title="Promo unggulan (kartu gelap)"
      onClick={() => void patchItem("promos", id, { featured: !featured })}
      className={`absolute top-2 left-2 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full shadow-md transition-colors ${
        featured ? "bg-gold text-espresso" : "bg-espresso/85 text-ivory/70 hover:text-gold"
      }`}
    >
      ★
    </button>
  );
}
