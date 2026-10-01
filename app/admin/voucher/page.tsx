"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useAdmin } from "@/components/admin/AdminProvider";
import { AdminShell, FilterChips, Pager, primaryActionBtn, type ListMeta } from "@/components/admin/AdminShell";
import type { Member } from "@/components/admin/MemberCard";
import {
  VoucherCard,
  rupiah,
  voucherFilterLabels,
  voucherMessage,
  type Voucher,
  type VoucherFilter,
  type VoucherStatus,
} from "@/components/admin/VoucherCard";
import { Modal } from "@/components/ui/Modal";

const filters: { value: VoucherFilter | ""; label: string }[] = [
  { value: "active", label: voucherFilterLabels.active },
  { value: "redeemed", label: voucherFilterLabels.redeemed },
  { value: "expired", label: voucherFilterLabels.expired },
  { value: "void", label: voucherFilterLabels.void },
  { value: "", label: "Semua" },
];

const inputCls = "w-full border border-line bg-cream px-3.5 py-2 text-sm outline-none focus:border-copper";

/** Reads `{ error: { message } }` from a failed API response. */
async function apiError(res: Response, fallback: string): Promise<string> {
  try {
    const json = (await res.json()) as { error?: { message?: string } };
    return json.error?.message ?? fallback;
  } catch {
    return fallback;
  }
}

export default function AdminVouchersPage() {
  const { isAdmin, apiFetch, notify } = useAdmin();
  const [status, setStatus] = useState<VoucherFilter | "">("active");
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [vouchers, setVouchers] = useState<Voucher[] | null>(null);
  const [meta, setMeta] = useState<ListMeta | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [assigning, setAssigning] = useState<Voucher | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(query.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  const load = useCallback(async () => {
    const p = new URLSearchParams({ page: String(page) });
    if (status) p.set("status", status);
    if (search) p.set("q", search);
    try {
      const res = await apiFetch(`/api/v1/admin/vouchers?${p}`);
      if (!res.ok) throw new Error();
      const json = (await res.json()) as { data: Voucher[]; meta: ListMeta };
      setVouchers(json.data);
      setMeta(json.meta);
    } catch {
      notify("Gagal memuat voucher");
    }
  }, [apiFetch, notify, status, search, page]);

  useEffect(() => {
    if (isAdmin) void load();
  }, [isAdmin, load]);

  /** Runs one voucher action, reports the API's own error message, then reloads. */
  const act = async (v: Voucher, path: string, init: RequestInit, done: string): Promise<boolean> => {
    setBusyId(v.id);
    try {
      const res = await apiFetch(`/api/v1/admin/vouchers/${v.id}${path}`, init);
      if (!res.ok) {
        notify(await apiError(res, "Gagal menyimpan"));
        return false;
      }
      notify(done);
      await load();
      return true;
    } catch {
      notify("Gagal menyimpan");
      return false;
    } finally {
      setBusyId(null);
    }
  };

  const patch = (v: Voucher, body: object, done: string) =>
    act(v, "", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }, done);

  const send = (v: Voucher) => {
    // Open WhatsApp inside the click handler so the popup blocker allows it.
    window.open(`https://wa.me/${v.member!.phone}?text=${encodeURIComponent(voucherMessage(v))}`, "_blank", "noopener");
    void act(v, "/sent", { method: "POST" }, "Ditandai terkirim ✓");
  };

  const redeem = (v: Voucher) => {
    if (!window.confirm(`Pakai voucher ${v.code} senilai ${rupiah(v.amount)} untuk ${v.member!.name}?`)) return;
    void act(v, "/redeem", { method: "POST" }, "Voucher terpakai ✓");
  };

  const setVoucherStatus = (v: Voucher, s: VoucherStatus) => {
    if (s === "void" && !window.confirm(`Batalkan voucher ${v.code}? Member tidak bisa memakainya lagi.`)) return;
    void patch(v, { status: s }, s === "void" ? "Voucher dibatalkan" : "Voucher diaktifkan ✓");
  };

  const remove = (v: Voucher) => {
    if (!window.confirm(`Hapus voucher ${v.code}?`)) return;
    void act(v, "", { method: "DELETE" }, "Dihapus ✓");
  };

  return (
    <AdminShell title="Voucher" revision={0}>
      <CreateVoucherForm
        onCreated={(v) => {
          notify(`Voucher ${v.code} dibuat ✓`);
          setStatus("active");
          setQuery("");
          void load();
          setAssigning(v);
        }}
      />

      <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <FilterChips
          options={filters}
          value={status}
          onChange={(v) => {
            setStatus(v);
            setPage(1);
          }}
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari kode, nama, telepon, no. member"
          className="w-full border border-line bg-cream-card px-3.5 py-2 text-sm outline-none focus:border-copper md:w-80"
        />
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {vouchers === null ? (
          <p className="text-sm text-cocoa">Memuat…</p>
        ) : vouchers.length === 0 ? (
          <p className="border border-dashed border-line p-8 text-center text-sm text-cocoa">
            Tidak ada voucher{status ? ` dengan status “${voucherFilterLabels[status]}”` : ""}.
          </p>
        ) : (
          vouchers.map((v) => (
            <VoucherCard
              key={v.id}
              voucher={v}
              busy={busyId === v.id}
              onAssign={() => setAssigning(v)}
              onSend={() => send(v)}
              onRedeem={() => redeem(v)}
              onSetStatus={(s) => setVoucherStatus(v, s)}
              onDelete={() => remove(v)}
            />
          ))
        )}
      </div>

      <Pager meta={meta} onPage={setPage} />
      <p className="mt-8 text-xs text-cocoa-muted">
        Di kasir: cari kode voucher, pastikan nama member sesuai dengan tamu, lalu tekan “Tandai Terpakai”.
      </p>

      <MemberPicker
        voucher={assigning}
        onClose={() => setAssigning(null)}
        onPick={async (m) => {
          const v = assigning!;
          setAssigning(null);
          await patch(v, { member_id: m.id }, `Voucher ${v.code} diberikan ke ${m.name} ✓`);
        }}
      />
    </AdminShell>
  );
}

function CreateVoucherForm({ onCreated }: { onCreated: (v: Voucher) => void }) {
  const { apiFetch, notify } = useAdmin();
  const [amount, setAmount] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [note, setNote] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);

  const amountValue = Number(amount.replace(/\D/g, ""));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await apiFetch("/api/v1/admin/vouchers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountValue, expires_at: expiresAt, note, code }),
      });
      if (!res.ok) {
        notify(await apiError(res, "Gagal membuat voucher"));
        return;
      }
      const json = (await res.json()) as { data: Voucher };
      setAmount("");
      setExpiresAt("");
      setNote("");
      setCode("");
      onCreated(json.data);
    } catch {
      notify("Gagal membuat voucher");
    } finally {
      setBusy(false);
    }
  };

  const label = "flex flex-col gap-1.5 text-xs tracking-[1.5px] text-cocoa uppercase";

  return (
    <form onSubmit={submit} className="border border-line bg-cream-card p-4 md:p-5">
      <h2 className="font-serif text-xl font-medium">Buat Voucher Baru</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className={label}>
          Nilai (Rp)
          <input
            inputMode="numeric"
            required
            value={amount ? new Intl.NumberFormat("id-ID").format(amountValue) : ""}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="100.000"
            className={inputCls}
          />
        </label>
        <label className={label}>
          Berlaku sampai (opsional)
          <input type="date" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} className={inputCls} />
        </label>
        <label className={label}>
          Catatan (opsional)
          <input
            value={note}
            maxLength={500}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Hadiah ulang tahun"
            className={inputCls}
          />
        </label>
        <label className={label}>
          Kode (kosongkan = otomatis)
          <input
            value={code}
            maxLength={10}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="RR45012026"
            pattern="RR[0-9]{2}(0[1-9]|1[0-2])[0-9]{4}"
            title="Format: RR + 2 angka + bulan (MM) + tahun (YYYY), contoh RR45012026"
            className={`${inputCls} font-mono uppercase`}
          />
        </label>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button type="submit" disabled={busy || amountValue < 1000} className={primaryActionBtn}>
          {busy ? "Membuat…" : "Buat Voucher"}
        </button>
        <span className="text-xs text-cocoa-muted">Setelah dibuat, pilih member penerimanya.</span>
      </div>
    </form>
  );
}

function MemberPicker({
  voucher,
  onClose,
  onPick,
}: {
  voucher: Voucher | null;
  onClose: () => void;
  onPick: (m: Member) => void;
}) {
  const { apiFetch } = useAdmin();
  const [query, setQuery] = useState("");
  const [members, setMembers] = useState<Member[] | null>(null);

  useEffect(() => {
    if (!voucher) return;
    let cancelled = false;
    const t = setTimeout(async () => {
      const p = new URLSearchParams({ status: "active", limit: "10" });
      if (query.trim()) p.set("q", query.trim());
      try {
        const res = await apiFetch(`/api/v1/admin/members?${p}`);
        const json = res.ok ? ((await res.json()) as { data: Member[] }) : { data: [] };
        if (!cancelled) setMembers(json.data);
      } catch {
        if (!cancelled) setMembers([]);
      }
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [voucher, query, apiFetch]);

  useEffect(() => {
    if (!voucher) {
      setQuery("");
      setMembers(null);
    }
  }, [voucher]);

  return (
    <Modal
      open={voucher !== null}
      onClose={onClose}
      eyebrow={voucher ? `${voucher.code} · ${rupiah(voucher.amount)}` : ""}
      title="Berikan ke Member"
      description="Hanya member aktif yang bisa menerima voucher."
    >
      <input
        type="search"
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari nama, telepon, no. member"
        className={inputCls}
      />
      <ul className="mt-3 flex max-h-80 flex-col gap-1 overflow-y-auto">
        {members === null ? (
          <li className="p-3 text-sm text-cocoa">Memuat…</li>
        ) : members.length === 0 ? (
          <li className="p-3 text-sm text-cocoa">Tidak ada member aktif yang cocok.</li>
        ) : (
          members.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                disabled={m.id === voucher?.member?.id}
                onClick={() => onPick(m)}
                className="flex w-full cursor-pointer flex-wrap items-baseline gap-x-2 border border-transparent px-3 py-2 text-left text-sm hover:border-copper disabled:cursor-default disabled:opacity-50"
              >
                <span className="font-medium">{m.name}</span>
                {m.member_no && <span className="text-xs tracking-[1px] text-cocoa">{m.member_no}</span>}
                <span className="text-xs text-cocoa">+{m.phone}</span>
                <span className="ml-auto text-[11px] tracking-[1px] text-cocoa uppercase">{m.tier}</span>
              </button>
            </li>
          ))
        )}
      </ul>
    </Modal>
  );
}
