/**
 * Program catalog for the /membership area: tiers, benefits and rewards.
 * Member records live in the API; there is no member login yet.
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
}

export interface Tier {
  id: TierId;
  name: string;
  benefits: Benefit[];
}

const silverBenefits: Benefit[] = [
  { title: "Poin Sambutan Member", icon: "points" },
  { title: "Layanan Member via WhatsApp", icon: "chat" },
  { title: "Welcome Drink Tradisional", icon: "drink" },
  { title: "Harga Khusus Member", icon: "tag" },
];

const goldBenefits: Benefit[] = [
  { title: "Kelipatan Poin", icon: "star" },
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
  ...goldBenefits,
  { title: "Upgrade ke Ruang Privat", icon: "room" },
  { title: "Undangan Chef's Table", icon: "chef" },
  { title: "Diskon Paket Acara & Venue", icon: "tag" },
  { title: "Kue Ulang Tahun Utuh Gratis", icon: "cake" },
  { title: "Hadiah Spesial Hari Raya", icon: "gift" },
];

export const tiers: Tier[] = [
  { id: "silver", name: "Silver", benefits: silverBenefits },
  { id: "gold", name: "Gold", benefits: goldBenefits },
  { id: "platinum", name: "Platinum", benefits: platinumBenefits },
];

export function getTier(id: TierId): Tier {
  return tiers.find((t) => t.id === id) ?? tiers[0];
}

export interface Reward {
  id: string;
  title: string;
  category: "Hidangan" | "Minuman" | "Voucher" | "Pengalaman";
}

export const rewards: Reward[] = [
  { id: "es-teh", title: "Es Teh Tarik Rumarasa", category: "Minuman" },
  { id: "wedang", title: "Wedang Uwuh Hangat", category: "Minuman" },
  { id: "pisang", title: "Pisang Goreng Keju", category: "Hidangan" },
  { id: "nasgor", title: "Nasi Goreng Kampung", category: "Hidangan" },
  { id: "voucher-50", title: "Voucher Makan", category: "Voucher" },
  { id: "tumpeng", title: "Tumpeng Mini untuk 4 Orang", category: "Hidangan" },
  { id: "kelas", title: "Kelas Masak Bersama Chef", category: "Pengalaman" },
];

export const memberNavLinks = [
  { href: "/membership", label: "Beranda" },
  { href: "/membership/rewards", label: "Rewards" },
  { href: "/membership/benefit", label: "Benefit" },
  { href: "/membership/reservasi", label: "Reservasi" },
] as const;
