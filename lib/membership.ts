/**
 * Prototype data for the /membership area. Tier thresholds, benefits, rewards
 * and the signed-in member are placeholders until the program is finalised
 * and there is a member backend to read them from.
 */

export type TierId = "silver" | "gold" | "platinum";

export type BenefitIconName =
  | "points"
  | "chat"
  | "drink"
  | "tag"
  | "star"
  | "calendar"
  | "cake"
  | "seat"
  | "bag"
  | "note"
  | "sparkle"
  | "room"
  | "chef"
  | "gift";

export interface Benefit {
  title: string;
  icon: BenefitIconName;
  /** Rendered in place of the icon, e.g. a points multiplier. */
  badge?: string;
}

export interface Tier {
  id: TierId;
  name: string;
  /** Annual spend in rupiah needed to reach this tier; 0 means on sign-up. */
  threshold: number;
  benefits: Benefit[];
}

const silverBenefits: Benefit[] = [
  { title: "Poin Sambutan Member", icon: "points" },
  { title: "Layanan Member via WhatsApp", icon: "chat" },
  { title: "Welcome Drink Tradisional", icon: "drink" },
  { title: "Harga Khusus Member", icon: "tag" },
];

const goldBenefits: Benefit[] = [
  { title: "Kelipatan Poin", icon: "star", badge: "1.5x" },
  { title: "Bonus Poin Naik Tier", icon: "points" },
  { title: "Prioritas Reservasi", icon: "calendar" },
  { title: "Dessert Ulang Tahun Gratis", icon: "cake" },
  { title: "Pilihan Meja Favorit", icon: "seat" },
  { title: "Diskon Oleh-oleh & Sambal Kemasan", icon: "bag" },
  { title: "Kartu Sambutan dari Chef", icon: "note" },
  { title: "Akses Awal Menu Musiman", icon: "sparkle" },
  ...silverBenefits,
];

const platinumBenefits: Benefit[] = [
  ...goldBenefits.map((b) => (b.badge ? { ...b, badge: "2x" } : b)),
  { title: "Upgrade ke Ruang Privat", icon: "room" },
  { title: "Undangan Chef's Table", icon: "chef" },
  { title: "Diskon Paket Acara & Venue", icon: "tag" },
  { title: "Kue Ulang Tahun Utuh Gratis", icon: "cake" },
  { title: "Hadiah Spesial Hari Raya", icon: "gift" },
];

export const tiers: Tier[] = [
  { id: "silver", name: "Silver", threshold: 0, benefits: silverBenefits },
  { id: "gold", name: "Gold", threshold: 3_000_000, benefits: goldBenefits },
  { id: "platinum", name: "Platinum", threshold: 7_500_000, benefits: platinumBenefits },
];

export function getTier(id: TierId): Tier {
  return tiers.find((t) => t.id === id) ?? tiers[0];
}

export function nextTier(id: TierId): Tier | undefined {
  return tiers[tiers.findIndex((t) => t.id === id) + 1];
}

export interface Reward {
  id: string;
  title: string;
  category: "Hidangan" | "Minuman" | "Voucher" | "Pengalaman";
  points: number;
}

export const rewards: Reward[] = [
  { id: "es-teh", title: "Es Teh Tarik Rumarasa", category: "Minuman", points: 150 },
  { id: "wedang", title: "Wedang Uwuh Hangat", category: "Minuman", points: 180 },
  { id: "pisang", title: "Pisang Goreng Keju", category: "Hidangan", points: 250 },
  { id: "nasgor", title: "Nasi Goreng Kampung", category: "Hidangan", points: 450 },
  { id: "voucher-50", title: "Voucher Makan Rp 50.000", category: "Voucher", points: 600 },
  { id: "voucher-100", title: "Voucher Makan Rp 100.000", category: "Voucher", points: 1100 },
  { id: "tumpeng", title: "Tumpeng Mini untuk 4 Orang", category: "Hidangan", points: 1800 },
  { id: "kelas", title: "Kelas Masak Bersama Chef", category: "Pengalaman", points: 2500 },
];

export interface MemberReservation {
  id: string;
  date: string;
  time: string;
  guests: number;
  area: string;
  status: "Terkonfirmasi" | "Menunggu" | "Selesai" | "Dibatalkan";
  note?: string;
}

export interface Member {
  name: string;
  memberId: string;
  tier: TierId;
  points: number;
  /** Spend this calendar year, in rupiah. */
  yearSpend: number;
  joinedAt: string;
  reservations: MemberReservation[];
}

export const demoMember: Member = {
  name: "Sekar Ayu",
  memberId: "RN-2026-0142",
  tier: "gold",
  points: 1240,
  yearSpend: 4_200_000,
  joinedAt: "Maret 2026",
  reservations: [
    { id: "r1", date: "2026-10-04", time: "19:00", guests: 6, area: "Ruang Privat", status: "Terkonfirmasi", note: "Perayaan ulang tahun" },
    { id: "r2", date: "2026-10-18", time: "12:30", guests: 2, area: "Area Indoor", status: "Menunggu" },
    { id: "r3", date: "2026-09-06", time: "18:30", guests: 4, area: "Area Outdoor", status: "Selesai" },
    { id: "r4", date: "2026-08-15", time: "19:30", guests: 3, area: "Area Indoor", status: "Dibatalkan" },
  ],
};

export function formatRupiah(value: number): string {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export function formatPoints(value: number): string {
  return value.toLocaleString("id-ID");
}

export const memberNavLinks = [
  { href: "/membership", label: "Beranda" },
  { href: "/membership/rewards", label: "Rewards" },
  { href: "/membership/benefit", label: "Benefit" },
  { href: "/membership/reservasi", label: "Reservasi Saya" },
] as const;
