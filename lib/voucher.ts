/** 100000 → "Rp100.000" */
export function rupiah(n: number): string {
  return "Rp" + new Intl.NumberFormat("id-ID").format(n);
}

/** 100000 → "100K", 1500000 → "1,5JT" — the short amount in the voucher title. */
export function shortRupiah(n: number): string {
  const fmt = (x: number) => new Intl.NumberFormat("id-ID", { maximumFractionDigits: 1 }).format(x);
  return n >= 1_000_000 ? `${fmt(n / 1_000_000)}JT` : `${fmt(n / 1000)}K`;
}

/** `2026-12-31` → `31 Des 2026`, read as a calendar date (no timezone shift). */
export function voucherDay(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

/** Public redeem page for a link voucher, on whichever site the admin is using. */
export function voucherLinkUrl(token: string): string {
  return `${window.location.origin}/voucher/${token}`;
}

/** WhatsApp gift message for a member, in Rumarasa's house format. */
export function memberVoucherMessage(v: { amount: number; code: string }, name: string, email: string): string {
  return [
    `GIFT VOUCHER ${shortRupiah(v.amount)}`,
    `NAMA                : ${name}`,
    `NO VOUCHER  : ${v.code}`,
    `EMAIL              : ${email}`,
  ].join("\n");
}

/** WhatsApp message carrying a link voucher to someone who isn't a member. */
export function linkVoucherMessage(v: { amount: number; expires_at: string | null }, url: string): string {
  return [
    `GIFT VOUCHER ${shortRupiah(v.amount)}`,
    v.expires_at && `BERLAKU S/D : ${voucherDay(v.expires_at)}`,
    `LINK                  : ${url}`,
  ]
    .filter(Boolean)
    .join("\n");
}

/** Syarat & ketentuan shown to anyone redeeming a voucher. */
export const VOUCHER_TERMS = [
  "Setiap transaksi hanya dapat menggunakan 1 voucher.",
  "Voucher dapat digunakan untuk minimal transaksi Rp200.000 sebelum pajak dan service.",
  "Voucher tidak dapat diuangkan.",
  "Voucher tidak dapat digunakan selama bulan Ramadhan.",
];
