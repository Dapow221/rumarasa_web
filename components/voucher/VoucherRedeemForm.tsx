"use client";

import { useState, type FormEvent } from "react";
import { CheckboxField, Honeypot, SubmitButton, TextField } from "@/components/ui/Field";
import { redeemLinkVoucher, type LinkVoucher } from "@/lib/voucherApi";

interface VoucherRedeemFormProps {
  token: string;
  onRedeemed: (v: LinkVoucher) => void;
}

export function VoucherRedeemForm({ token, onRedeemed }: VoucherRedeemFormProps) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "");
    if (!window.confirm("Pakai voucher sekarang? Voucher hanya bisa dipakai satu kali.")) return;

    setBusy(true);
    setError(null);
    const result = await redeemLinkVoucher(token, {
      name: get("nama"),
      email: get("email"),
      phone: get("telepon"),
      consent: f.get("persetujuan") === "on",
      website: get("website"),
    });
    setBusy(false);
    if (result.ok) onRedeemed(result.voucher);
    else setError(result.message);
  };

  return (
    <form onSubmit={handleSubmit} className="relative mt-8 flex flex-col gap-4 text-left">
      <Honeypot />
      <TextField label="Nama Lengkap" name="nama" required maxLength={200} autoComplete="name" />
      <TextField label="Email" name="email" type="email" required autoComplete="email" inputMode="email" />
      <TextField
        label="Nomor WhatsApp (opsional)"
        name="telepon"
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        placeholder="08…"
      />
      <CheckboxField name="persetujuan" required>
        Saya setuju data di atas disimpan dan digunakan oleh Rumarasa Nusantara untuk keperluan voucher ini.
      </CheckboxField>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <SubmitButton disabled={busy}>{busy ? "Memproses…" : "Pakai Voucher Sekarang"}</SubmitButton>
      <p className="text-center text-xs font-light text-cocoa-muted">
        Pakai saat Anda sudah di Rumarasa — tunjukkan layar konfirmasi ke kasir.
      </p>
    </form>
  );
}
