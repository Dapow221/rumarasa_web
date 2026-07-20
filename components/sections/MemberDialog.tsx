"use client";

import { useState, type FormEvent } from "react";
import { Modal } from "@/components/ui/Modal";
import { SubmitButton, TextAreaField, TextField } from "@/components/ui/Field";
import { formatDate, formatMessage, waLink } from "@/lib/whatsapp";

interface MemberDialogProps {
  whatsappNumber: string;
  label: string;
  /** Styling for the trigger, so each caller matches its own section. */
  triggerClassName: string;
}

/** Membership signup form in a modal; submits as a WhatsApp message. */
export function MemberDialog({ whatsappNumber, label, triggerClassName }: MemberDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (key: string) => String(f.get(key) ?? "");

    const message = formatMessage("Pendaftaran Member — Keluarga Rumarasa", [
      ["Nama Lengkap", get("nama")],
      ["Email", get("email")],
      ["Nomor Telepon", get("telepon")],
      ["Tanggal Lahir", formatDate(get("lahir"))],
      ["Alamat Lengkap", get("alamat")],
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
        eyebrow="Keluarga Rumarasa"
        title="Daftar Member Gratis"
        description="Lengkapi data di bawah — pendaftaran Anda kami terima melalui WhatsApp."
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            label="Nama Lengkap"
            name="nama"
            required
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
            autoComplete="street-address"
            placeholder="Jalan, nomor, kelurahan, kecamatan, kota"
          />
          <SubmitButton>Daftar via WhatsApp</SubmitButton>
        </form>
      </Modal>
    </>
  );
}
