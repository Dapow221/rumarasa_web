"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdmin } from "./AdminProvider";

interface Summary {
  pending_members: number;
  pending_reservations: number;
}

interface AdminShellProps {
  title: string;
  /** Bump after every change so the pending-count badges refetch. */
  revision: number;
  children: ReactNode;
}

/**
 * Frame for the back-office pages: session guard, section tabs with pending
 * counts, and the page title. Children only render once an admin is signed in.
 */
export function AdminShell({ title, revision, children }: AdminShellProps) {
  const { isAdmin, ready, apiFetch } = useAdmin();
  const pathname = usePathname();
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    if (!isAdmin) return;
    let cancelled = false;
    apiFetch("/api/v1/admin/summary")
      .then((res) => (res.ok ? res.json() : null))
      .then((json: { data: Summary } | null) => {
        if (!cancelled && json) setSummary(json.data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [isAdmin, apiFetch, revision]);

  if (!ready) {
    return <Frame>{null}</Frame>;
  }
  if (!isAdmin) {
    return (
      <Frame>
        <p className="text-[15px] font-light text-cocoa">Sesi admin berakhir.</p>
        <Link href="/admin" className="mt-4 inline-block text-sm text-copper underline underline-offset-4">
          Masuk kembali
        </Link>
      </Frame>
    );
  }

  const tabs = [
    { href: "/admin/member", label: "Member", count: summary?.pending_members },
    { href: "/admin/reservasi", label: "Reservasi", count: summary?.pending_reservations },
    { href: "/admin/voucher", label: "Voucher", count: undefined },
  ];

  return (
    <Frame>
      <nav className="flex flex-wrap items-center gap-2 border-b border-line pb-4">
        {tabs.map((t) => {
          const active = pathname === t.href;
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs tracking-[1.5px] uppercase transition-colors ${
                active ? "bg-espresso text-ivory" : "text-cocoa hover:bg-cream-card"
              }`}
            >
              {t.label}
              {!!t.count && (
                <span className="rounded-full bg-copper px-2 py-0.5 text-[11px] tracking-normal text-ivory">
                  {t.count}
                </span>
              )}
            </Link>
          );
        })}
        <Link
          href="/"
          className="ml-auto rounded-full px-4 py-2 text-xs tracking-[1.5px] text-cocoa uppercase hover:bg-cream-card"
        >
          Edit Konten Situs →
        </Link>
      </nav>
      <h1 className="mt-8 font-serif text-3xl font-medium md:text-4xl">{title}</h1>
      <div className="mt-6">{children}</div>
    </Frame>
  );
}

function Frame({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-cream px-4 py-8 pb-28 md:px-10 md:py-12">
      <div className="mx-auto max-w-[1100px]">
        <p className="font-script text-2xl text-copper">Rumarasa Nusantara</p>
        <div className="mt-4">{children}</div>
      </div>
    </main>
  );
}

// ---------- Shared bits for the back-office lists ----------

export interface ListMeta {
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export function Pager({ meta, onPage }: { meta: ListMeta | null; onPage: (page: number) => void }) {
  if (!meta || meta.total === 0) return null;
  const from = (meta.page - 1) * meta.limit + 1;
  const to = Math.min(meta.page * meta.limit, meta.total);
  const btn =
    "cursor-pointer rounded-full border border-line px-4 py-2 text-xs tracking-[1px] uppercase hover:border-copper disabled:cursor-default disabled:opacity-40";
  return (
    <div className="mt-6 flex items-center justify-between gap-3 text-sm text-cocoa">
      <span>
        {from}–{to} dari {meta.total}
      </span>
      <div className="flex gap-2">
        <button type="button" className={btn} disabled={meta.page <= 1} onClick={() => onPage(meta.page - 1)}>
          ← Sebelumnya
        </button>
        <button type="button" className={btn} disabled={!meta.hasMore} onClick={() => onPage(meta.page + 1)}>
          Berikutnya →
        </button>
      </div>
    </div>
  );
}

export function FilterChips<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-xs tracking-[1px] uppercase transition-colors ${
            value === o.value
              ? "border-copper bg-copper text-ivory"
              : "border-line text-cocoa hover:border-copper"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

const pillTones: Record<string, string> = {
  pending: "bg-amber-100 text-amber-900",
  active: "bg-emerald-100 text-emerald-900",
  confirmed: "bg-emerald-100 text-emerald-900",
  completed: "bg-stone-200 text-stone-800",
  rejected: "bg-red-100 text-red-900",
  cancelled: "bg-red-100 text-red-900",
  suspended: "bg-stone-200 text-stone-800",
  no_show: "bg-stone-200 text-stone-800",
  redeemed: "bg-stone-200 text-stone-800",
  expired: "bg-amber-100 text-amber-900",
  void: "bg-red-100 text-red-900",
};

export function StatusPill({ status, label }: { status: string; label: string }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[11px] tracking-[1px] uppercase ${pillTones[status] ?? ""}`}>
      {label}
    </span>
  );
}

export const actionBtn =
  "cursor-pointer rounded-full border border-line px-3.5 py-1.5 text-xs tracking-[1px] uppercase transition-colors hover:border-copper hover:text-copper disabled:opacity-50";
export const primaryActionBtn =
  "cursor-pointer rounded-full bg-copper px-3.5 py-1.5 text-xs tracking-[1px] text-ivory uppercase transition-colors hover:bg-copper-light disabled:opacity-50";

/** `2026-07-19` → `19 Jul 2026`, parsed as a calendar date (no timezone shift). */
export function formatDay(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

/** API timestamp → `19 Jul 2026` in Jakarta time, whatever zone the server or viewer is in. */
export function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
}

/** WhatsApp chat link for a normalized 62… number. */
export function waChat(phone: string): string {
  return `https://wa.me/${phone}`;
}
