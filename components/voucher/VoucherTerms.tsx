import { VOUCHER_TERMS } from "@/lib/voucher";

export function VoucherTerms() {
  return (
    <section className="border-t border-line pt-5 text-left">
      <h2 className="text-xs tracking-[2px] text-cocoa uppercase">Syarat &amp; Ketentuan</h2>
      <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 text-[13px] leading-relaxed font-light text-cocoa">
        {VOUCHER_TERMS.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </section>
  );
}
