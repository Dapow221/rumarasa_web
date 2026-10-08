"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MembershipCard } from "@/components/membership/MembershipCard";
import { fetchMemberCard, type MemberCardData } from "@/lib/memberCard";

export default function MemberCardPage() {
  const { token } = useParams<{ token: string }>();
  const [card, setCard] = useState<MemberCardData | null | "missing" | "error">(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void fetchMemberCard(token).then(setCard);
  }, [token]);

  if (card === null) return <p className="text-center text-sm text-cocoa">Memuat kartu…</p>;
  if (card === "missing" || card === "error") {
    return (
      <div className="border border-line bg-cream-card p-8 text-center">
        <h1 className="font-serif text-2xl font-medium">
          {card === "missing" ? "Kartu tidak ditemukan" : "Tidak bisa memuat kartu"}
        </h1>
        <p className="mt-2 text-sm font-light text-cocoa">
          {card === "missing"
            ? "Link ini tidak berlaku atau sudah diganti. Hubungi Rumarasa Nusantara untuk link terbaru."
            : "Periksa koneksi Anda lalu muat ulang halaman ini."}
        </p>
      </div>
    );
  }

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/kartu/${token}/image`);
      if (!res.ok) throw new Error();
      const url = URL.createObjectURL(await res.blob());
      const a = document.createElement("a");
      a.href = url;
      a.download = `kartu-member-${card.member_no}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.location.href = `/kartu/${token}/image`;
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <h1 className="sr-only">Kartu Member {card.name}</h1>
      <MembershipCard card={card} />
      {card.status === "active" ? (
        <>
          <p className="text-sm font-light text-cocoa">Tunjukkan kartu ini ke kasir setiap berkunjung.</p>
          <button
            type="button"
            onClick={() => void save()}
            disabled={saving}
            className="cursor-pointer rounded-full bg-espresso px-9 py-3.5 text-sm tracking-[2px] text-ivory-soft uppercase transition-colors hover:bg-copper hover:text-ivory disabled:opacity-60"
          >
            {saving ? "Menyiapkan…" : "Simpan Kartu"}
          </button>
        </>
      ) : (
        <p className="text-sm font-light text-cocoa">
          Keanggotaan ini sedang tidak aktif. Hubungi Rumarasa Nusantara untuk informasi lebih lanjut.
        </p>
      )}
    </div>
  );
}
