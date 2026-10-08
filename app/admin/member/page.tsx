"use client";

import { useCallback, useEffect, useState } from "react";
import { useAdmin } from "@/components/admin/AdminProvider";
import { AdminShell, FilterChips, Pager, actionBtn, type ListMeta } from "@/components/admin/AdminShell";
import {
  MemberCard,
  memberStatusLabels,
  type MemberPatch,
  type Member,
  type MemberStatus,
} from "@/components/admin/MemberCard";
import { memberCardMessage, memberCardUrl } from "@/lib/memberCard";
import { apiError } from "@/lib/apiError";

const filters: { value: MemberStatus | ""; label: string }[] = [
  { value: "pending", label: "Menunggu" },
  { value: "active", label: "Aktif" },
  { value: "suspended", label: "Ditangguhkan" },
  { value: "rejected", label: "Ditolak" },
  { value: "", label: "Semua" },
];

export default function AdminMembersPage() {
  const { isAdmin, apiFetch, notify, confirm } = useAdmin();
  const [status, setStatus] = useState<MemberStatus | "">("pending");
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [members, setMembers] = useState<Member[] | null>(null);
  const [meta, setMeta] = useState<ListMeta | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [revision, setRevision] = useState(0);

  // Debounce the search box so typing doesn't fire a request per keystroke.
  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(query.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  const params = useCallback(() => {
    const p = new URLSearchParams();
    if (status) p.set("status", status);
    if (search) p.set("q", search);
    return p;
  }, [status, search]);

  const load = useCallback(async () => {
    const p = params();
    p.set("page", String(page));
    try {
      const res = await apiFetch(`/api/v1/admin/members?${p}`);
      if (!res.ok) throw new Error();
      const json = (await res.json()) as { data: Member[]; meta: ListMeta };
      setMembers(json.data);
      setMeta(json.meta);
    } catch {
      notify("Gagal memuat data member");
    }
  }, [apiFetch, notify, params, page]);

  useEffect(() => {
    if (isAdmin) void load();
  }, [isAdmin, load]);

  const update = async (m: Member, patch: MemberPatch, done: string) => {
    setBusyId(m.id);
    try {
      const res = await apiFetch(`/api/v1/admin/members/${m.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
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

  const remove = async (m: Member) => {
    if (!(await confirm({ message: `Hapus data ${m.name} secara permanen?`, confirmLabel: "Hapus", danger: true }))) return;
    setBusyId(m.id);
    try {
      const res = await apiFetch(`/api/v1/admin/members/${m.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      notify("Dihapus ✓");
      setRevision((n) => n + 1);
      await load();
    } catch {
      notify("Gagal menghapus");
    } finally {
      setBusyId(null);
    }
  };

  /** Runs one card-link action for a member, then reloads the list. */
  const cardAction = async (m: Member, method: "POST" | "DELETE", path: string, done: string) => {
    setBusyId(m.id);
    try {
      const res = await apiFetch(`/api/v1/admin/members/${m.id}/card${path}`, { method });
      if (!res.ok) {
        notify(await apiError(res, "Gagal menyimpan"));
        return;
      }
      notify(done);
      await load();
    } catch {
      notify("Gagal menyimpan");
    } finally {
      setBusyId(null);
    }
  };

  const sendCard = (m: Member) => {
    const text = memberCardMessage(m.name, m.member_no!, memberCardUrl(m.card_token!));
    // Open WhatsApp inside the click handler so the popup blocker allows it.
    window.open(`https://wa.me/${m.phone}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    void cardAction(m, "POST", "/sent", "Ditandai terkirim ✓");
  };

  const copyCard = async (m: Member) => {
    const url = memberCardUrl(m.card_token!);
    try {
      await navigator.clipboard.writeText(url);
      notify("Link disalin ✓");
    } catch {
      notify("Gagal menyalin — buka “Lihat Kartu” lalu salin dari alamat browser");
    }
  };

  const removeCard = async (m: Member) => {
    const ok = await confirm({
      message: `Hapus link kartu ${m.name}? Link yang sudah dibagikan tidak akan bisa dibuka lagi.`,
      confirmLabel: "Hapus Link",
      danger: true,
    });
    if (!ok) return;
    void cardAction(m, "DELETE", "", "Link kartu dihapus");
  };

  const exportCsv = async () => {
    try {
      const res = await apiFetch(`/api/v1/admin/members/export?${params()}`);
      if (!res.ok) throw new Error();
      const url = URL.createObjectURL(await res.blob());
      const a = document.createElement("a");
      a.href = url;
      a.download = `member-rumarasa-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      notify("Gagal mengekspor");
    }
  };

  return (
    <AdminShell title="Member" revision={revision}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <FilterChips
          options={filters}
          value={status}
          onChange={(v) => {
            setStatus(v);
            setPage(1);
          }}
        />
        <div className="flex gap-2">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama, telepon, email, no. member"
            className="w-full border border-line bg-cream-card px-3.5 py-2 text-sm outline-none focus:border-copper md:w-72"
          />
          <button type="button" onClick={() => void exportCsv()} className={actionBtn}>
            CSV
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {members === null ? (
          <p className="text-sm text-cocoa">Memuat…</p>
        ) : members.length === 0 ? (
          <p className="border border-dashed border-line p-8 text-center text-sm text-cocoa">
            Tidak ada member{status ? ` dengan status “${memberStatusLabels[status]}”` : ""}.
          </p>
        ) : (
          members.map((m) => (
            <MemberCard
              key={m.id}
              member={m}
              busy={busyId === m.id}
              onUpdate={(patch, done) => void update(m, patch, done)}
              onDelete={() => void remove(m)}
              card={{
                onCreate: () => void cardAction(m, "POST", "", "Kartu dibuat ✓"),
                onEmail: () => void cardAction(m, "POST", "/email", `Kartu terkirim ke ${m.email} ✓`),
                onSend: () => sendCard(m),
                onCopy: () => void copyCard(m),
                onOpen: () => window.open(memberCardUrl(m.card_token!), "_blank", "noopener"),
                onRemove: () => void removeCard(m),
              }}
            />
          ))
        )}
      </div>

      <Pager meta={meta} onPage={setPage} />
      <p className="mt-8 text-xs text-cocoa-muted">
        Data member bersifat pribadi (UU PDP). Hapus data bila member memintanya.
      </p>
    </AdminShell>
  );
}
