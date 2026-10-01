"use client";

import { useState } from "react";
import { rupiah, voucherDay } from "@/lib/voucher";
import { StatusPill, actionBtn, formatTimestamp, primaryActionBtn, waChat } from "./AdminShell";
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
  link_token: string | null;
  recipient: { name: string; phone: string | null; email: string } | null;
  redeemed_via: "cashier" | "link" | null;
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

export interface VoucherActions {
  onAssign: () => void;
  onSend: () => void;
  onRedeem: () => void;
  onCreateLink: () => void;
  onCopyLink: () => void;
  onRemoveLink: () => void;
  onSetStatus: (status: VoucherStatus) => void;
  /** null removes the expiry. Resolves true once saved. */
  onSetExpiry: (date: string | null) => Promise<boolean>;
  onDelete: () => void;
}

export function VoucherCard({ voucher: v, busy, ...a }: { voucher: Voucher; busy: boolean } & VoucherActions) {
  const state = voucherState(v);
  const open = state === "active" || state === "expired";
  const memberUsable = v.member?.status === "active";

  return (
    <article className="border border-line bg-cream-card p-4 md:p-5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h2 className="font-mono text-xl font-medium tracking-[2px]">{v.code}</h2>
        <StatusPill status={state} label={voucherFilterLabels[state]} />
        {v.link_token && <StatusPill status="link" label="Via Link" />}
        <span className="font-serif text-xl text-copper">{rupiah(v.amount)}</span>
        <span className="ml-auto text-xs text-cocoa">Dibuat {formatTimestamp(v.created_at)}</span>
      </div>

      <VoucherDetails voucher={v} busy={busy} onSetExpiry={a.onSetExpiry} />

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {state === "active" && v.member && memberUsable && (
          <>
            <button type="button" disabled={busy} onClick={a.onSend} className={primaryActionBtn}>
              {v.sent_at ? "Kirim Ulang WA" : "Kirim via WhatsApp"}
            </button>
            <button type="button" disabled={busy} onClick={a.onRedeem} className={actionBtn}>
              Tandai Terpakai
            </button>
          </>
        )}
        {state === "active" && v.link_token && (
          <>
            <button type="button" disabled={busy} onClick={a.onSend} className={primaryActionBtn}>
              Kirim Link via WA
            </button>
            <button type="button" disabled={busy} onClick={a.onCopyLink} className={actionBtn}>
              Salin Link
            </button>
            <button type="button" disabled={busy} onClick={a.onRemoveLink} className={actionBtn}>
              Hapus Link
            </button>
          </>
        )}
        {open && !v.link_token && (
          <button type="button" disabled={busy} onClick={a.onAssign} className={v.member ? actionBtn : primaryActionBtn}>
            {v.member ? "Ganti Member" : "Berikan ke Member"}
          </button>
        )}
        {state === "active" && !v.member && !v.link_token && (
          <button type="button" disabled={busy} onClick={a.onCreateLink} className={actionBtn}>
            Buat Link (Non-Member)
          </button>
        )}
        {open && (
          <button type="button" disabled={busy} onClick={() => a.onSetStatus("void")} className={actionBtn}>
            Batalkan
          </button>
        )}
        {state === "void" && (
          <button type="button" disabled={busy} onClick={() => a.onSetStatus("active")} className={actionBtn}>
            Aktifkan Lagi
          </button>
        )}
        {!v.sent_at && v.status !== "redeemed" && (
          <button
            type="button"
            disabled={busy}
            onClick={a.onDelete}
            className="ml-auto cursor-pointer text-xs tracking-[1px] text-red-700 uppercase hover:underline"
          >
            Hapus
          </button>
        )}
      </div>
    </article>
  );
}

interface VoucherDetailsProps {
  voucher: Voucher;
  busy: boolean;
  onSetExpiry: VoucherActions["onSetExpiry"];
}

function VoucherDetails({ voucher: v, busy, onSetExpiry }: VoucherDetailsProps) {
  const holder = v.member ? (
    <>
      <span className="text-espresso">{v.member.name}</span>
      {v.member.member_no && <span className="text-xs tracking-[1px]"> · {v.member.member_no}</span>}
      {" · "}
      <a href={waChat(v.member.phone)} target="_blank" rel="noopener noreferrer" className="hover:text-copper">
        +{v.member.phone}
      </a>
      {v.member.status !== "active" && <span className="text-red-700"> (member tidak aktif)</span>}
    </>
  ) : v.recipient ? (
    <>
      <span className="text-espresso">{v.recipient.name}</span> (non-member) · {v.recipient.email}
      {v.recipient.phone && ` · +${v.recipient.phone}`}
    </>
  ) : v.link_token ? (
    <span className="italic">Dibagikan lewat link — belum dipakai</span>
  ) : (
    <span className="italic">Belum diberikan</span>
  );

  return (
    <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1 text-sm font-light text-cocoa sm:grid-cols-2">
      <div>
        <dt className="inline">Penerima: </dt>
        <dd className="inline">{holder}</dd>
      </div>
      <div>
        <dt className="inline">Berlaku sampai: </dt>
        <dd className="inline">
          {v.status === "redeemed" ? (
            v.expires_at ? voucherDay(v.expires_at) : "Tanpa batas"
          ) : (
            <ExpiryEditor expiresAt={v.expires_at} busy={busy} onSave={onSetExpiry} />
          )}
        </dd>
      </div>
      {(v.member || v.link_token) && v.status !== "redeemed" && (
        <div>
          <dt className="inline">WhatsApp: </dt>
          <dd className="inline">{v.sent_at ? `Terkirim ${formatTimestamp(v.sent_at)}` : "Belum dikirim"}</dd>
        </div>
      )}
      {v.redeemed_at && (
        <div>
          <dt className="inline">Dipakai: </dt>
          <dd className="inline">
            {formatTimestamp(v.redeemed_at)} {v.redeemed_via === "link" ? "· online lewat link" : "· di kasir"}
          </dd>
        </div>
      )}
      {v.note && (
        <div className="sm:col-span-2">
          <dt className="sr-only">Catatan</dt>
          <dd>“{v.note}”</dd>
        </div>
      )}
    </dl>
  );
}

/** Today in WIB as YYYY-MM-DD, the earliest expiry the API accepts. */
function todayJakarta(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" });
}

function ExpiryEditor({ expiresAt, busy, onSave }: { expiresAt: string | null; busy: boolean; onSave: VoucherActions["onSetExpiry"] }) {
  const [editing, setEditing] = useState(false);
  const [date, setDate] = useState(expiresAt ?? "");

  const save = async (value: string | null) => {
    if (await onSave(value)) setEditing(false);
  };

  if (!editing) {
    return (
      <>
        {expiresAt ? voucherDay(expiresAt) : "Tanpa batas"}{" "}
        <button
          type="button"
          disabled={busy}
          onClick={() => {
            setDate(expiresAt ?? "");
            setEditing(true);
          }}
          className="cursor-pointer text-xs tracking-[1px] text-copper uppercase hover:underline"
        >
          Ubah
        </button>
      </>
    );
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-2 align-middle">
      <input
        type="date"
        value={date}
        min={todayJakarta()}
        onChange={(e) => setDate(e.target.value)}
        className="border border-line bg-cream px-2 py-1 text-sm outline-none focus:border-copper"
      />
      <button
        type="button"
        disabled={busy || !date || date === expiresAt}
        onClick={() => void save(date)}
        className="cursor-pointer text-xs tracking-[1px] text-copper uppercase hover:underline disabled:cursor-default disabled:opacity-40"
      >
        Simpan
      </button>
      {expiresAt && (
        <button
          type="button"
          disabled={busy}
          onClick={() => void save(null)}
          className="cursor-pointer text-xs tracking-[1px] text-cocoa uppercase hover:underline"
        >
          Tanpa batas
        </button>
      )}
      <button
        type="button"
        onClick={() => setEditing(false)}
        className="cursor-pointer text-xs tracking-[1px] text-cocoa uppercase hover:underline"
      >
        Batal
      </button>
    </span>
  );
}
