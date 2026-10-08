"use client";

import { useState, type FormEvent } from "react";
import { CheckboxField, Honeypot, SubmitButton, TextField } from "@/components/ui/Field";
import { redeemLinkVoucher, type LinkVoucher } from "@/lib/voucherApi";
import { VoucherTerms } from "./VoucherTerms";

interface VoucherRedeemFormProps {
  token: string;
  onRedeemed: (v: LinkVoucher) => void;
}

export function VoucherRedeemForm({ token, onRedeemed }: VoucherRedeemFormProps) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Redeeming is single-use, so the first press only asks for confirmation.
  const [confirming, setConfirming] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "");
    if (!confirming) {
      setConfirming(true);
      return;
    }

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
    setConfirming(false);
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
      <VoucherTerms />
      <CheckboxField name="syarat" required>
        Saya telah membaca dan menyetujui Syarat &amp; Ketentuan voucher di atas.
      </CheckboxField>
      <CheckboxField name="persetujuan" required>
        Saya setuju data di atas disimpan dan digunakan oleh Rumarasa Nusantara untuk keperluan voucher ini.
      </CheckboxField>
      {error && <p className="text-sm text-red-700">{error}</p>}
      {confirming && (
        <p role="alert" className="rounded-lg border border-copper/40 bg-sand px-4 py-3 text-center text-sm text-espresso">
          Pakai voucher sekarang? Voucher hanya bisa dipakai <strong className="font-medium">satu kali</strong>.
        </p>
      )}
      <SubmitButton disabled={busy}>
        {busy ? "Memproses…" : confirming ? "Ya, Pakai Sekarang" : "Pakai Voucher Sekarang"}
      </SubmitButton>
      {confirming && !busy && (
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="cursor-pointer text-center text-xs tracking-[1.5px] text-cocoa uppercase hover:text-espresso"
        >
          Batal
        </button>
      )}
      <p className="text-center text-xs font-light text-cocoa-muted">
        Pakai saat Anda sudah di Rumarasa — tunjukkan layar konfirmasi ke kasir.
      </p>
    </form>
  );
}
