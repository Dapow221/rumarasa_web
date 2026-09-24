"use client";

import { StatusPill, actionBtn, formatDay, primaryActionBtn, waChat } from "./AdminShell";

export type ReservationStatus = "pending" | "confirmed" | "cancelled" | "completed" | "no_show";

export interface Reservation {
  id: number;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  request: string;
  status: ReservationStatus;
}

export const reservationStatusLabels: Record<ReservationStatus, string> = {
  pending: "Menunggu",
  confirmed: "Dikonfirmasi",
  cancelled: "Dibatalkan",
  completed: "Selesai",
  no_show: "Tidak Datang",
};

/** Which moves make sense from each status; the first is the primary action. */
const transitions: Record<ReservationStatus, { to: ReservationStatus; label: string }[]> = {
  pending: [
    { to: "confirmed", label: "Konfirmasi" },
    { to: "cancelled", label: "Batalkan" },
  ],
  confirmed: [
    { to: "completed", label: "Selesai" },
    { to: "no_show", label: "Tidak Datang" },
    { to: "cancelled", label: "Batalkan" },
  ],
  cancelled: [{ to: "pending", label: "Buka Kembali" }],
  completed: [{ to: "confirmed", label: "Batalkan Selesai" }],
  no_show: [{ to: "confirmed", label: "Batalkan Tidak Datang" }],
};

interface ReservationCardProps {
  reservation: Reservation;
  busy: boolean;
  onStatus: (status: ReservationStatus) => void;
  onDelete: () => void;
}

export function ReservationCard({ reservation: r, busy, onStatus, onDelete }: ReservationCardProps) {
  return (
    <article className="grid grid-cols-[auto_1fr] gap-4 border border-line bg-cream-card p-4 md:gap-6 md:p-5">
      <div className="flex w-20 flex-col items-center justify-center border-r border-line pr-4 text-center md:w-24">
        <span className="font-serif text-2xl font-medium">{r.time}</span>
        <span className="mt-1 text-xs text-cocoa">{formatDay(r.date)}</span>
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h2 className="font-serif text-xl font-medium">{r.name}</h2>
          <StatusPill status={r.status} label={reservationStatusLabels[r.status]} />
        </div>
        <p className="mt-1 text-sm font-light text-cocoa">
          {r.guests} tamu ·{" "}
          <a href={waChat(r.phone)} target="_blank" rel="noopener noreferrer" className="hover:text-copper">
            +{r.phone}
          </a>
        </p>
        {r.request && <p className="mt-2 text-sm font-light text-espresso">“{r.request}”</p>}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {transitions[r.status].map((t, i) => (
            <button
              key={t.to}
              type="button"
              disabled={busy}
              onClick={() => onStatus(t.to)}
              className={i === 0 && r.status === "pending" ? primaryActionBtn : actionBtn}
            >
              {t.label}
            </button>
          ))}
          <button
            type="button"
            disabled={busy}
            onClick={onDelete}
            className="ml-auto cursor-pointer text-xs tracking-[1px] text-red-700 uppercase hover:underline"
          >
            Hapus
          </button>
        </div>
      </div>
    </article>
  );
}
