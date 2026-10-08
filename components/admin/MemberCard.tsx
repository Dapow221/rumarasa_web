"use client";

import {
  StatusPill,
  actionBtn,
  formatDay,
  formatTimestamp,
  primaryActionBtn,
  waChat,
} from "./AdminShell";
import { MemberCardLink, type MemberCardActions } from "./MemberCardLink";

export type MemberStatus = "pending" | "active" | "rejected" | "suspended";
export type MemberTier = "silver" | "gold" | "platinum";

export interface Member {
  id: number;
  member_no: string | null;
  name: string;
  phone: string;
  email: string;
  birthday: string;
  address: string;
  status: MemberStatus;
  tier: MemberTier;
  card_token: string | null;
  card_sent_at: string | null;
  created_at: string;
}

export type MemberPatch = Partial<Pick<Member, "status" | "tier">>;

export const memberStatusLabels: Record<MemberStatus, string> = {
  pending: "Menunggu",
  active: "Aktif",
  rejected: "Ditolak",
  suspended: "Ditangguhkan",
};

interface MemberCardProps {
  member: Member;
  busy: boolean;
  onUpdate: (patch: MemberPatch, doneMessage: string) => void;
  onDelete: () => void;
  card: MemberCardActions;
}

export function MemberCard({ member: m, busy, onUpdate, onDelete, card }: MemberCardProps) {
  return (
    <article className="border border-line bg-cream-card p-4 md:p-5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h2 className="font-serif text-xl font-medium">{m.name}</h2>
        <StatusPill status={m.status} label={memberStatusLabels[m.status]} />
        {m.member_no && <span className="text-xs tracking-[1px] text-cocoa">{m.member_no}</span>}
        <span className="ml-auto text-xs text-cocoa">Daftar {formatTimestamp(m.created_at)}</span>
      </div>
      <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1 text-sm font-light text-cocoa sm:grid-cols-2">
        <div>
          <dt className="sr-only">Telepon</dt>
          <dd>
            <a href={waChat(m.phone)} target="_blank" rel="noopener noreferrer" className="hover:text-copper">
              +{m.phone}
            </a>
          </dd>
        </div>
        <div>
          <dt className="sr-only">Email</dt>
          <dd className="break-all">{m.email}</dd>
        </div>
        <div>
          <dt className="inline">Lahir: </dt>
          <dd className="inline">{formatDay(m.birthday)}</dd>
        </div>
        <div>
          <dt className="sr-only">Alamat</dt>
          <dd>{m.address}</dd>
        </div>
      </dl>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {m.status === "pending" && (
          <>
            <button
              type="button"
              disabled={busy}
              onClick={() => onUpdate({ status: "active" }, "Member disetujui ✓")}
              className={primaryActionBtn}
            >
              Setujui
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => onUpdate({ status: "rejected" }, "Pendaftaran ditolak")}
              className={actionBtn}
            >
              Tolak
            </button>
          </>
        )}
        {m.status === "active" && (
          <button
            type="button"
            disabled={busy}
            onClick={() => onUpdate({ status: "suspended" }, "Member ditangguhkan")}
            className={actionBtn}
          >
            Tangguhkan
          </button>
        )}
        {(m.status === "suspended" || m.status === "rejected") && (
          <button
            type="button"
            disabled={busy}
            onClick={() => onUpdate({ status: "active" }, "Member diaktifkan ✓")}
            className={actionBtn}
          >
            Aktifkan
          </button>
        )}
        <label className="flex items-center gap-2 text-xs tracking-[1px] text-cocoa uppercase">
          {m.status === "pending" ? "Tier diminta" : "Tier"}
          <select
            value={m.tier}
            disabled={busy}
            onChange={(e) => onUpdate({ tier: e.target.value as MemberTier }, "Tier diubah ✓")}
            className="cursor-pointer border border-line bg-cream px-2 py-1 text-xs uppercase"
          >
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
          </select>
        </label>
        {m.status === "active" && (
          <MemberCardLink token={m.card_token} sentAt={m.card_sent_at} busy={busy} actions={card} />
        )}
        <button
          type="button"
          disabled={busy}
          onClick={() => onDelete()}
          className="ml-auto cursor-pointer text-xs tracking-[1px] text-red-700 uppercase hover:underline"
        >
          Hapus
        </button>
      </div>
    </article>
  );
}
