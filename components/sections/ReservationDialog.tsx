"use client";

import { useState, type FormEvent } from "react";
import { Modal } from "@/components/ui/Modal";
import {
  Honeypot,
  SubmitButton,
  TextAreaField,
  TextField,
  WhatsAppButton,
} from "@/components/ui/Field";
import { submitForm, type SubmitResult } from "@/lib/submit";
import { formatDate, formatMessage, waLink } from "@/lib/whatsapp";

interface ReservationDialogProps {
  whatsappNumber: string;
  label: string;
  /** Styling for the trigger, so each caller matches its own section. */
  triggerClassName: string;
}

/**
 * Reservation form in a modal. The booking is saved to the API for staff to
 * confirm from the admin panel; WhatsApp stays available as a follow-up, and
 * as the fallback whenever the API can't take the submission.
 *
 * Renders its own trigger button rather than taking a render prop, so the
 * server components that use it stay server components.
 */
export function ReservationDialog({ whatsappNumber, label, triggerClassName }: ReservationDialogProps) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [waHref, setWaHref] = useState("");

  const close = () => {
    setOpen(false);
    setResult(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (key: string) => String(f.get(key) ?? "");

    setWaHref(
      waLink(
        whatsappNumber,
        formatMessage("Reservasi — Rumarasa Nusantara", [
          ["Nama Lengkap", get("nama")],
          ["Nomor Telepon", get("telepon")],
          ["Tanggal", formatDate(get("tanggal"))],
          ["Waktu", get("waktu")],
          ["Jumlah Tamu", get("tamu")],
          ["Permintaan Khusus", get("permintaan")],
        ]),
      ),
    );

    setBusy(true);
    setResult(
      await submitForm("/api/v1/reservations", {
        name: get("nama"),
        phone: get("telepon"),
        date: get("tanggal"),
        time: get("waktu"),
        guests: Number(get("tamu")),
        request: get("permintaan"),
        website: get("website"),
      }),
    );
    setBusy(false);
  };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={triggerClassName}>
        {label}
      </button>

      <Modal
        open={open}
        onClose={close}
        eyebrow="Reservasi"
        title={result?.ok ? "Reservasi Diterima" : "Amankan Meja Anda"}
        description={
          result?.ok ? undefined : "Isi detail di bawah — tim kami akan menghubungi Anda untuk konfirmasi."
        }
      >
        {result?.ok ? (
          <div className="flex flex-col gap-5">
            <p className="text-[15px] leading-relaxed font-light text-cocoa">
              Terima kasih! Permintaan reservasi Anda sudah kami terima. Tim kami akan menghubungi
              Anda melalui WhatsApp atau telepon untuk konfirmasi.
            </p>
            <WhatsAppButton href={waHref}>Hubungi Kami via WhatsApp</WhatsAppButton>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative flex flex-col gap-4">
            <Honeypot />
            <TextField
              label="Nama Lengkap"
              name="nama"
              required
              maxLength={200}
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
              maxLength={1000}
              placeholder="Kursi bayi, alergi makanan, perayaan ulang tahun…"
            />
            {result && !result.ok && <p className="text-sm text-red-700">{result.message}</p>}
            <SubmitButton disabled={busy}>{busy ? "Mengirim…" : "Kirim Reservasi"}</SubmitButton>
            {result && !result.ok && result.retryable && (
              <WhatsAppButton href={waHref}>Kirim via WhatsApp</WhatsAppButton>
            )}
          </form>
        )}
      </Modal>
    </>
  );
}
