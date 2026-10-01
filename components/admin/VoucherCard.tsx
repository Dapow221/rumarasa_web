"use client";

import { StatusPill, actionBtn, formatDay, formatTimestamp, primaryActionBtn, waChat } from "./AdminShell";
import type { MemberStatus, MemberTier } from "./MemberCard";

export type VoucherStatus = "active" | "redeemed" | "void";
/** List filter: "expired" is an active voucher past its last day. */
export type VoucherFilter = "active" | "expired" | "redeemed" | "void";

export interface Voucher {
  id: number;
  code: string;
  amount: number;
  note: string;
  expires_at: string | null;
  status: VoucherStatus;
  expired: boolean;
  member: {
    id: number;
    member_no: string | null;
    name: string;
    phone: string;
    email: string;
    status: MemberStatus;
    tier: MemberTier;
  } | null;
  assigned_at: string | null;
  sent_at: string | null;
  redeemed_at: string | null;
  created_at: string;
}

export const voucherFilterLabels: Record<VoucherFilter, string> = {
  active: "Aktif",
  expired: "Kedaluwarsa",
  redeemed: "Terpakai",
  void: "Dibatalkan",
};

export function voucherState(v: Voucher): VoucherFilter {
  return v.expired ? "expired" : v.status;
}

/** 100000 → "Rp100.000" */
export function rupiah(n: number): string {
  return "Rp" + new Intl.NumberFormat("id-ID").format(n);
}

/** 100000 → "100K", 1500000 → "1,5JT" — the short amount in the voucher title. */
export function shortRupiah(n: number): string {
  const fmt = (x: number) => new Intl.NumberFormat("id-ID", { maximumFractionDigits: 1 }).format(x);
  return n >= 1_000_000 ? `${fmt(n / 1_000_000)}JT` : `${fmt(n / 1000)}K`;
}

/** The gift message sent to the member on WhatsApp, in Rumarasa's house format. */
export function voucherMessage(v: Voucher): string {
  const m = v.member!;
  return [
    `GIFT VOUCHER ${shortRupiah(v.amount)}`,
    `NAMA                : ${m.name}`,
    `NO VOUCHER  : ${v.code}`,
    `EMAIL              : ${m.email}`,
  ].join("\n");
}

interface VoucherCardProps {
  voucher: Voucher;
  busy: boolean;
  onAssign: () => void;
  onSend: () => void;
  onRedeem: () => void;
  onSetStatus: (status: VoucherStatus) => void;
  onDelete: () => void;
}

export function VoucherCard({ voucher: v, busy, onAssign, onSend, onRedeem, onSetStatus, onDelete }: VoucherCardProps) {
  const state = voucherState(v);
  const usable = state === "active";
  const memberUsable = v.member?.status === "active";

  return (
    <article className="border border-line bg-cream-card p-4 md:p-5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h2 className="font-mono text-xl font-medium tracking-[2px]">{v.code}</h2>
        <StatusPill status={state} label={voucherFilterLabels[state]} />
        <span className="font-serif text-xl text-copper">{rupiah(v.amount)}</span>
        <span className="ml-auto text-xs text-cocoa">Dibuat {formatTimestamp(v.created_at)}</span>
      </div>

      <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1 text-sm font-light text-cocoa sm:grid-cols-2">
        <div>
          <dt className="inline">Member: </dt>
          <dd className="inline">
            {v.member ? (
              <>
                <span className="text-espresso">{v.member.name}</span>
                {v.member.member_no && <span className="text-xs tracking-[1px]"> · {v.member.member_no}</span>}
                {" · "}
                <a href={waChat(v.member.phone)} target="_blank" rel="noopener noreferrer" className="hover:text-copper">
                  +{v.member.phone}
                </a>
                {!memberUsable && <span className="text-red-700"> (member tidak aktif)</span>}
              </>
            ) : (
              <span className="italic">Belum diberikan</span>
            )}
          </dd>
        </div>
        <div>
          <dt className="inline">Berlaku sampai: </dt>
          <dd className="inline">{v.expires_at ? formatDay(v.expires_at) : "Tanpa batas"}</dd>
        </div>
        {v.member && (
          <div>
            <dt className="inline">WhatsApp: </dt>
            <dd className="inline">{v.sent_at ? `Terkirim ${formatTimestamp(v.sent_at)}` : "Belum dikirim"}</dd>
          </div>
        )}
        {v.redeemed_at && (
          <div>
            <dt className="inline">Dipakai: </dt>
            <dd className="inline">{formatTimestamp(v.redeemed_at)}</dd>
          </div>
        )}
        {v.note && (
          <div className="sm:col-span-2">
            <dt className="sr-only">Catatan</dt>
            <dd>“{v.note}”</dd>
          </div>
        )}
      </dl>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {usable && v.member && memberUsable && (
          <>
            <button type="button" disabled={busy} onClick={onSend} className={primaryActionBtn}>
              {v.sent_at ? "Kirim Ulang WA" : "Kirim via WhatsApp"}
            </button>
            <button type="button" disabled={busy} onClick={onRedeem} className={actionBtn}>
              Tandai Terpakai
            </button>
          </>
        )}
        {(state === "active" || state === "expired") && (
          <button type="button" disabled={busy} onClick={onAssign} className={v.member ? actionBtn : primaryActionBtn}>
            {v.member ? "Ganti Member" : "Berikan ke Member"}
          </button>
        )}
        {(state === "active" || state === "expired") && (
          <button type="button" disabled={busy} onClick={() => onSetStatus("void")} className={actionBtn}>
            Batalkan
          </button>
        )}
        {state === "void" && (
          <button type="button" disabled={busy} onClick={() => onSetStatus("active")} className={actionBtn}>
            Aktifkan Lagi
          </button>
        )}
        {!v.sent_at && v.status !== "redeemed" && (
          <button
            type="button"
            disabled={busy}
            onClick={onDelete}
            className="ml-auto cursor-pointer text-xs tracking-[1px] text-red-700 uppercase hover:underline"
          >
            Hapus
          </button>
        )}
      </div>
    </article>
  );
}
