"use client";

import { useState, type FormEvent } from "react";
import { Modal } from "@/components/ui/Modal";
import { CheckboxField, Honeypot, SubmitButton, TextAreaField, TextField } from "@/components/ui/Field";
import { TierPicker } from "@/components/membership/TierPicker";
import type { TierId } from "@/lib/membership";
import { submitForm, type SubmitResult } from "@/lib/submit";

interface MemberDialogProps {
  label: string;
  /** Styling for the trigger, so each caller matches its own section. */
  triggerClassName: string;
}

/**
 * Membership signup form in a modal. The signup is saved to the API as a
 * pending member for the admin to approve, and the API emails the applicant
 * a confirmation.
 */
export function MemberDialog({ label, triggerClassName }: MemberDialogProps) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [email, setEmail] = useState("");

  const close = () => {
    setOpen(false);
    setResult(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (key: string) => String(f.get(key) ?? "");
    const tier = (get("tier") || "silver") as TierId;

    setEmail(get("email"));

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
          tier,
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
              Terima kasih! Pendaftaran Anda sudah kami terima dan sedang diverifikasi. Konfirmasi telah
              dikirim ke <strong className="font-medium text-espresso">{email}</strong>, dan nomor serta
              kartu member Anda akan dikirim ke email yang sama setelah disetujui.
            </p>
            <button
              type="button"
              onClick={close}
              className="w-full cursor-pointer rounded-full bg-copper px-8 py-3.5 text-sm tracking-[2px] text-ivory uppercase transition-colors hover:bg-copper-light"
            >
              Tutup
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative flex flex-col gap-4">
            <Honeypot />
            <TierPicker name="tier" />
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
          </form>
        )}
      </Modal>
    </>
  );
}
