import { voucherDay } from "@/lib/voucher";

export function VoucherValidity({ expiresAt }: { expiresAt: string | null }) {
  return (
    <section className="mt-6 border border-line bg-cream px-5 py-4">
      <h2 className="text-xs tracking-[2px] text-cocoa uppercase">Berlaku Sampai</h2>
      <p className="mt-1 font-serif text-2xl font-medium text-espresso">
        {expiresAt ? voucherDay(expiresAt) : "Tanpa batas waktu"}
      </p>
    </section>
  );
}
