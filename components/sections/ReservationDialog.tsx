"use client";

import { useState, type FormEvent } from "react";
import { Modal } from "@/components/ui/Modal";
import { SubmitButton, TextAreaField, TextField } from "@/components/ui/Field";
import { formatDate, formatMessage, waLink } from "@/lib/whatsapp";

interface ReservationDialogProps {
  whatsappNumber: string;
  label: string;
  /** Styling for the trigger, so each caller matches its own section. */
  triggerClassName: string;
}

/**
 * Reservation form in a modal. On submit the answers are formatted into a
 * WhatsApp message and handed to wa.me — nothing is stored server-side, so the
 * booking lives in the restaurant's chat history.
 *
 * Renders its own trigger button rather than taking a render prop, so the
 * server components that use it stay server components.
 */
export function ReservationDialog({ whatsappNumber, label, triggerClassName }: ReservationDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (key: string) => String(f.get(key) ?? "");

    const message = formatMessage("Reservasi — Rumarasa Nusantara", [
      ["Nama Lengkap", get("nama")],
      ["Nomor Telepon", get("telepon")],
      ["Tanggal", formatDate(get("tanggal"))],
      ["Waktu", get("waktu")],
      ["Jumlah Tamu", get("tamu")],
      ["Permintaan Khusus", get("permintaan")],
    ]);

    window.open(waLink(whatsappNumber, message), "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={triggerClassName}>
        {label}
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        eyebrow="Reservasi"
        title="Amankan Meja Anda"
        description="Isi detail di bawah — kami akan mengirimkannya ke WhatsApp kami untuk dikonfirmasi."
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            label="Nama Lengkap"
            name="nama"
            required
            autoComplete="name"
            placeholder="Nama Lengkap"
          />
          <TextField
            label="Nomor Telepon"
            name="telepon"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            placeholder="Isi no WA/Telp"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Tanggal" name="tanggal" type="date" required />
            <TextField label="Waktu" name="waktu" type="time" required />
          </div>
          <TextField
            label="Jumlah Tamu"
            name="tamu"
            type="number"
            required
            min={1}
            max={500}
            inputMode="numeric"
            placeholder="Isikan Jumlah Tamu"
          />
          <TextAreaField
            label="Permintaan Khusus (Opsional)"
            name="permintaan"
            placeholder="Kursi bayi, alergi makanan, perayaan ulang tahun…"
          />
          <SubmitButton>Kirim via WhatsApp</SubmitButton>
        </form>
      </Modal>
    </>
  );
}
