"use client";

import { useState, type FormEvent } from "react";
import { Modal } from "@/components/ui/Modal";
import {
  CheckboxField,
  Honeypot,
  SubmitButton,
  TextAreaField,
  TextField,
  WhatsAppButton,
} from "@/components/ui/Field";
import { submitForm, type SubmitResult } from "@/lib/submit";
import { formatDate, formatMessage, waLink } from "@/lib/whatsapp";

interface MemberDialogProps {
  whatsappNumber: string;
  label: string;
  /** Styling for the trigger, so each caller matches its own section. */
  triggerClassName: string;
}

/**
 * Membership signup form in a modal. The signup is saved to the API (as a
 * pending member for the admin to approve); WhatsApp stays available as a
 * follow-up, and as the fallback whenever the API can't take the submission.
 */
export function MemberDialog({ whatsappNumber, label, triggerClassName }: MemberDialogProps) {
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
        formatMessage("Pendaftaran Member — Keluarga Rumarasa", [
          ["Nama Lengkap", get("nama")],
          ["Email", get("email")],
          ["Nomor Telepon", get("telepon")],
          ["Tanggal Lahir", formatDate(get("lahir"))],
          ["Alamat Lengkap", get("alamat")],
        ]),
      ),
    );

    setBusy(true);
    setResult(
      await submitForm(
        "/api/v1/members",
        {
          name: get("nama"),
          email: get("email"),
          phone: get("telepon"),
          birthday: get("lahir"),
          address: get("alamat"),
          consent: f.get("persetujuan") === "on",
          website: get("website"),
        },
        { conflict: "Nomor telepon ini sudah terdaftar sebagai member." },
      ),
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
        eyebrow="Keluarga Rumarasa"
        title={result?.ok ? "Pendaftaran Diterima" : "Daftar Member Gratis"}
        description={
          result?.ok
            ? undefined
            : "Lengkapi data di bawah — tim kami akan memverifikasi pendaftaran Anda."
        }
      >
        {result?.ok ? (
          <div className="flex flex-col gap-5">
            <p className="text-[15px] leading-relaxed font-light text-cocoa">
              Terima kasih! Pendaftaran Anda sudah kami terima dan sedang diverifikasi. Nomor member
              Anda akan dikirimkan setelah disetujui.
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
              placeholder="Isikan Nama Lengkap"
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              placeholder="Isikan alamat email anda"
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
            <TextField label="Tanggal Lahir" name="lahir" type="date" required />
            <TextAreaField
              label="Alamat Lengkap"
              name="alamat"
              required
              maxLength={1000}
              autoComplete="street-address"
              placeholder="Jalan, nomor, kelurahan, kecamatan, kota"
            />
            <CheckboxField name="persetujuan" required>
              Saya setuju data di atas disimpan dan digunakan oleh Rumarasa Nusantara untuk
              keperluan keanggotaan, dan dapat meminta penghapusannya kapan saja.
            </CheckboxField>
            {result && !result.ok && <p className="text-sm text-red-700">{result.message}</p>}
            <SubmitButton disabled={busy}>{busy ? "Mengirim…" : "Daftar Sekarang"}</SubmitButton>
            {result && !result.ok && result.retryable && (
              <WhatsAppButton href={waHref}>Daftar via WhatsApp</WhatsAppButton>
            )}
          </form>
        )}
      </Modal>
    </>
  );
}
