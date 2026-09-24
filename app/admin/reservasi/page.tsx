"use client";

import { useCallback, useEffect, useState } from "react";
import { useAdmin } from "@/components/admin/AdminProvider";
import { AdminShell, FilterChips, Pager, type ListMeta } from "@/components/admin/AdminShell";
import {
  ReservationCard,
  reservationStatusLabels,
  type Reservation,
  type ReservationStatus,
} from "@/components/admin/ReservationCard";

type Period = "today" | "upcoming" | "all";

const periods: { value: Period; label: string }[] = [
  { value: "today", label: "Hari Ini" },
  { value: "upcoming", label: "Mendatang" },
  { value: "all", label: "Semua" },
];

const statusOptions = Object.entries(reservationStatusLabels) as [ReservationStatus, string][];

/** Today's date in Jakarta as YYYY-MM-DD — the restaurant's "today". */
function jakartaToday(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" });
}

export default function AdminReservationsPage() {
  const { isAdmin, apiFetch, notify } = useAdmin();
  const [period, setPeriod] = useState<Period>("upcoming");
  const [status, setStatus] = useState<ReservationStatus | "">("");
  const [page, setPage] = useState(1);
  const [list, setList] = useState<Reservation[] | null>(null);
  const [meta, setMeta] = useState<ListMeta | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [revision, setRevision] = useState(0);

  const load = useCallback(async () => {
    const p = new URLSearchParams({ page: String(page) });
    const today = jakartaToday();
    if (period !== "all") p.set("from", today);
    if (period === "today") p.set("to", today);
    if (status) p.set("status", status);
    try {
      const res = await apiFetch(`/api/v1/admin/reservations?${p}`);
      if (!res.ok) throw new Error();
      const json = (await res.json()) as { data: Reservation[]; meta: ListMeta };
      setList(json.data);
      setMeta(json.meta);
    } catch {
      notify("Gagal memuat reservasi");
    }
  }, [apiFetch, notify, page, period, status]);

  useEffect(() => {
    if (isAdmin) void load();
  }, [isAdmin, load]);

  const run = async (r: Reservation, init: RequestInit, done: string) => {
    setBusyId(r.id);
    try {
      const res = await apiFetch(`/api/v1/admin/reservations/${r.id}`, init);
      if (!res.ok) throw new Error();
      notify(done);
      setRevision((n) => n + 1);
      await load();
    } catch {
      notify("Gagal menyimpan");
    } finally {
      setBusyId(null);
    }
  };

  const setReservationStatus = (r: Reservation, to: ReservationStatus) =>
    run(
      r,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: to }),
      },
      `${reservationStatusLabels[to]} ✓`,
    );

  const remove = (r: Reservation) => {
    if (!window.confirm(`Hapus reservasi atas nama ${r.name}?`)) return;
    void run(r, { method: "DELETE" }, "Dihapus ✓");
  };

  return (
    <AdminShell title="Reservasi" revision={revision}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <FilterChips
          options={periods}
          value={period}
          onChange={(v) => {
            setPeriod(v);
            setPage(1);
          }}
        />
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value as ReservationStatus | "");
            setPage(1);
          }}
          className="cursor-pointer border border-line bg-cream-card px-3 py-2 text-sm"
          aria-label="Filter status"
        >
          <option value="">Semua status</option>
          {statusOptions.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {list === null ? (
          <p className="text-sm text-cocoa">Memuat…</p>
        ) : list.length === 0 ? (
          <p className="border border-dashed border-line p-8 text-center text-sm text-cocoa">
            Belum ada reservasi untuk filter ini.
          </p>
        ) : (
          list.map((r) => (
            <ReservationCard
              key={r.id}
              reservation={r}
              busy={busyId === r.id}
              onStatus={(to) => void setReservationStatus(r, to)}
              onDelete={() => remove(r)}
            />
          ))
        )}
      </div>

      <Pager meta={meta} onPage={setPage} />
    </AdminShell>
  );
}
