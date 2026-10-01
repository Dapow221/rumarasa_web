import { rupiah } from "@/lib/voucher";
import type { LinkVoucher } from "@/lib/voucherApi";

/** The "used" screen the customer shows the cashier. */
export function VoucherProof({ voucher: v }: { voucher: LinkVoucher }) {
  const when = v.redeemed_at
    ? new Date(v.redeemed_at).toLocaleString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Jakarta",
      })
    : "";

  return (
    <div className="mt-6">
      <p className="inline-block rounded-full bg-emerald-100 px-4 py-1 text-xs tracking-[2px] text-emerald-900 uppercase">
        Voucher Terpakai ✓
      </p>
      <p className="mt-5 font-serif text-5xl font-medium text-espresso">{rupiah(v.amount)}</p>
      <dl className="mt-6 flex flex-col gap-3 border-t border-line pt-5 text-left text-sm">
        <Row label="No Voucher">
          <span className="font-mono text-lg tracking-[2px]">{v.code}</span>
        </Row>
        {v.recipient_name && <Row label="Nama">{v.recipient_name}</Row>}
        <Row label="Dipakai">{when} WIB</Row>
      </dl>
      <p className="mt-6 text-xs font-light text-cocoa-muted">Tunjukkan layar ini ke kasir.</p>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-xs tracking-[1.5px] text-cocoa uppercase">{label}</dt>
      <dd className="text-right text-espresso">{children}</dd>
    </div>
  );
}
