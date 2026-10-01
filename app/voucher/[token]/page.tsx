"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { VoucherProof } from "@/components/voucher/VoucherProof";
import { VoucherRedeemForm } from "@/components/voucher/VoucherRedeemForm";
import { fetchLinkVoucher, type LinkVoucher } from "@/lib/voucherApi";
import { VoucherValidity } from "@/components/voucher/VoucherValidity";
import { rupiah } from "@/lib/voucher";

export default function VoucherLinkPage() {
  const { token } = useParams<{ token: string }>();
  const [voucher, setVoucher] = useState<LinkVoucher | null | "missing" | "error">(null);

  useEffect(() => {
    void fetchLinkVoucher(token).then(setVoucher);
  }, [token]);

  return (
    <article className="border border-line bg-cream-card p-7 text-center md:p-10">
      <p className="font-script text-2xl text-copper">Rumarasa Nusantara</p>
      <p className="mt-1 text-xs tracking-[3px] text-cocoa uppercase">Gift Voucher</p>

      {voucher === null ? (
        <p className="mt-8 text-sm text-cocoa">Memuat voucher…</p>
      ) : voucher === "missing" ? (
        <Notice title="Voucher tidak ditemukan">Link ini tidak berlaku atau sudah dihapus.</Notice>
      ) : voucher === "error" ? (
        <Notice title="Tidak bisa memuat voucher">Periksa koneksi Anda lalu muat ulang halaman ini.</Notice>
      ) : voucher.status === "redeemed" ? (
        <VoucherProof voucher={voucher} />
      ) : (
        <>
          <p className="mt-6 font-serif text-5xl font-medium text-espresso">{rupiah(voucher.amount)}</p>
          {voucher.note && <p className="mt-3 text-sm text-cocoa italic">“{voucher.note}”</p>}
          <VoucherValidity expiresAt={voucher.expires_at} />
          {voucher.status === "active" ? (
            <VoucherRedeemForm token={token} onRedeemed={setVoucher} />
          ) : (
            <Notice title={voucher.status === "expired" ? "Voucher sudah kedaluwarsa" : "Voucher tidak berlaku"}>
              Hubungi Rumarasa Nusantara bila ada pertanyaan.
            </Notice>
          )}
        </>
      )}
    </article>
  );
}

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <h1 className="font-serif text-2xl font-medium">{title}</h1>
      <p className="mt-2 text-sm font-light text-cocoa">{children}</p>
    </div>
  );
}
