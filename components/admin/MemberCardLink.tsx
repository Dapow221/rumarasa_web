"use client";

import { actionBtn, formatTimestamp, primaryActionBtn } from "./AdminShell";

export interface MemberCardActions {
  onCreate: () => void;
  onEmail: () => void;
  onSend: () => void;
  onCopy: () => void;
  onOpen: () => void;
  onRemove: () => void;
}

interface MemberCardLinkProps {
  token: string | null;
  sentAt: string | null;
  busy: boolean;
  actions: MemberCardActions;
}

/** Card-link controls for an active member, mirroring the voucher link flow. */
export function MemberCardLink({ token, sentAt, busy, actions: a }: MemberCardLinkProps) {
  const emailButton = (
    <button type="button" disabled={busy} onClick={a.onEmail} className={primaryActionBtn}>
      Kirim Kartu via Email
    </button>
  );
  if (!token) {
    return (
      <>
        {emailButton}
        <button type="button" disabled={busy} onClick={a.onCreate} className={actionBtn}>
          Buat Kartu
        </button>
      </>
    );
  }
  return (
    <>
      {emailButton}
      <button type="button" disabled={busy} onClick={a.onSend} className={actionBtn}>
        Kirim via WA
      </button>
      <button type="button" disabled={busy} onClick={a.onOpen} className={actionBtn}>
        Lihat Kartu
      </button>
      <button type="button" disabled={busy} onClick={a.onCopy} className={actionBtn}>
        Salin Link
      </button>
      <button type="button" disabled={busy} onClick={a.onRemove} className={actionBtn}>
        Hapus Link
      </button>
      {sentAt && <span className="text-xs text-cocoa">Kartu terkirim {formatTimestamp(sentAt)}</span>}
    </>
  );
}
