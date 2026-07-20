export interface Dish {
  id: string;
  name: string;
  price: string;
  description: string;
  imagePlaceholder: string;
  image?: string;
}

export interface Promo {
  id: string;
  badge: string;
  title: string;
  description: string;
  descriptionEn: string;
  price: string;
  priceNote: string;
  imagePlaceholder: string;
  featured?: boolean;
  image?: string;
}

export interface Facility {
  id: string;
  title: string;
  description: string;
  descriptionEn: string;
  imagePlaceholder: string;
  image?: string;
}

export interface Happening {
  id: string;
  schedule: string;
  title: string;
  description: string;
  image?: string;
}

export interface MemberBenefit {
  id: string;
  highlight: string;
  description: string;
}

export const foods: Dish[] = [
  {
    id: "rendang",
    name: "Rendang Sapi Padang",
    price: "Rp 78.000",
    description:
      "Daging sapi dimasak 8 jam dalam santan dan rempah Minang hingga empuk dan pekat bumbunya.",
    imagePlaceholder: "Foto rendang",
  },
  {
    id: "betutu",
    name: "Ayam Betutu Bali",
    price: "Rp 72.000",
    description:
      "Ayam utuh berbumbu base genep khas Bali, dipanggang perlahan dalam balutan daun pisang.",
    imagePlaceholder: "Foto ayam betutu",
  },
  {
    id: "ikan-bakar",
    name: "Ikan Bakar Jimbaran",
    price: "Rp 85.000",
    description:
      "Ikan segar bakar sambal matah, disajikan dengan plecing kangkung dan nasi hangat.",
    imagePlaceholder: "Foto ikan bakar",
  },
  {
    id: "gudeg",
    name: "Gudeg Yogya Komplit",
    price: "Rp 62.000",
    description:
      "Nangka muda manis gurih dengan krecek, telur pindang, dan ayam kampung opor.",
    imagePlaceholder: "Foto gudeg",
  },
  {
    id: "coto",
    name: "Coto Makassar",
    price: "Rp 58.000",
    description:
      "Sup daging kaya rempah dari Sulawesi Selatan, disajikan dengan ketupat dan sambal tauco.",
    imagePlaceholder: "Foto coto makassar",
  },
  {
    id: "sate-lilit",
    name: "Sate Lilit Bali",
    price: "Rp 55.000",
    description:
      "Sate ikan cincang berbumbu, dililit pada batang serai dan dibakar di atas arang.",
    imagePlaceholder: "Foto sate lilit",
  },
];

export const beverages: Dish[] = [
  {
    id: "cendol",
    name: "Es Cendol Gula Aren",
    price: "Rp 32.000",
    description:
      "Cendol pandan lembut, santan segar, dan gula aren asli — penutup yang menyejukkan.",
    imagePlaceholder: "Foto es cendol",
  },
  {
    id: "es-teler",
    name: "Es Teler Nusantara",
    price: "Rp 35.000",
    description:
      "Alpukat, kelapa muda, nangka, dan cincau dalam kuah santan susu yang segar.",
    imagePlaceholder: "Foto es teler",
  },
  {
    id: "kopi-tubruk",
    name: "Kopi Tubruk Gayo",
    price: "Rp 28.000",
    description: "Kopi arabika Gayo diseduh tubruk khas warung kopi tempo dulu.",
    imagePlaceholder: "Foto kopi tubruk",
  },
  {
    id: "wedang-jahe",
    name: "Wedang Jahe Sereh",
    price: "Rp 25.000",
    description: "Jahe bakar, sereh, dan gula aren — hangat dan menenangkan.",
    imagePlaceholder: "Foto wedang jahe",
  },
  {
    id: "es-kelapa",
    name: "Es Kelapa Muda Jeruk",
    price: "Rp 30.000",
    description:
      "Kelapa muda utuh dengan perasan jeruk nipis dan gula aren cair.",
    imagePlaceholder: "Foto es kelapa",
  },
  {
    id: "jus-alpukat",
    name: "Jus Alpukat Kopi",
    price: "Rp 33.000",
    description:
      "Alpukat mentega lembut dengan lelehan kopi susu gula aren.",
    imagePlaceholder: "Foto jus alpukat",
  },
];

export const promos: Promo[] = [
  {
    id: "lunch-set",
    badge: "Senin – Kamis",
    title: "Paket Makan Siang",
    description:
      "Nasi, lauk pilihan, sayur, dan es teh — harga khusus jam 11.00–14.00.",
    descriptionEn: "Weekday lunch set.",
    price: "Rp 65.000",
    priceNote: "/ orang",
    imagePlaceholder: "Foto paket makan siang",
  },
  {
    id: "rijsttafel",
    badge: "Akhir pekan",
    title: "Rijsttafel Keluarga",
    description:
      "Sajian 8 hidangan Nusantara untuk 4–6 orang, gratis dessert sampler.",
    descriptionEn: "Weekend family feast.",
    price: "Rp 480.000",
    priceNote: "/ meja",
    imagePlaceholder: "Foto rijsttafel keluarga",
    featured: true,
  },
  {
    id: "member-treat",
    badge: "Member",
    title: "Kopi & Kudapan Sore",
    description:
      "Diskon 20% kopi Nusantara & jajanan pasar setiap hari, 15.00–17.30.",
    descriptionEn: "Member afternoon treat.",
    price: "−20%",
    priceNote: "khusus member",
    imagePlaceholder: "Foto kopi & kudapan",
  },
];

export const facilities: Facility[] = [
  {
    id: "outdoor",
    title: "Area Outdoor",
    description: "Teras rindang untuk bersantap sore di udara terbuka.",
    descriptionEn: "Garden terrace.",
    imagePlaceholder: "Foto area outdoor",
  },
  {
    id: "vip",
    title: "Ruang Privat",
    description: "Ruang VIP ber-AC untuk acara keluarga dan kantor.",
    descriptionEn: "Private VIP room.",
    imagePlaceholder: "Foto ruang privat / VIP",
  },
  {
    id: "musala",
    title: "Musala",
    description: "Musala bersih dengan perlengkapan salat lengkap.",
    descriptionEn: "Prayer room.",
    imagePlaceholder: "Foto musala",
  },
  {
    id: "parkir",
    title: "Parkir Luas",
    description: "Parkir mobil dan motor yang luas, gratis untuk tamu.",
    descriptionEn: "Ample free parking.",
    imagePlaceholder: "Foto area parkir",
  },
];

export const happenings: Happening[] = [
  {
    id: "family-gathering",
    schedule: "",
    title: "Family Gathering",
    description:
      "Nikmati minuman dan makanan lezat ala Rumarasa Nusantara bersama keluarga tercinta dalam nuansa asri yang menenangkan.",
  },
  {
    id: "arisan",
    schedule: "",
    title: "Arisan",
    description:
      "Rasakan sentuhan seni kuliner Rumarasa Nusantara, di mana cita rasa tradisional bertemu presentasi modern.",
  },
  {
    id: "komunitas",
    schedule: "",
    title: "Komunitas",
    description:
      "Tempat yang pas untuk berkumpul bersama komunitas — berbagi cerita, ide, dan cita rasa Nusantara.",
  },
  {
    id: "ulang-tahun",
    schedule: "",
    title: "Ulang Tahun",
    description:
      "Buat momen ulang tahun Anda lebih spesial dengan suasana hangat dan menu istimewa dari dapur kami.",
  },
  {
    id: "wedding",
    schedule: "",
    title: "Wedding",
    description:
      "Rayakan hari istimewa Anda di tempat yang ideal untuk resepsi pernikahan yang elegan dan berkesan.",
  },
  {
    id: "korporat",
    schedule: "",
    title: "Korporat",
    description:
      "Pilihan tepat untuk acara korporat dengan suasana eksklusif dan hidangan berkualitas.",
  },
];

export const memberBenefits: MemberBenefit[] = [
  {
    id: "points",
    highlight: "Poin setiap transaksi",
    description: "tukarkan dengan hidangan favorit Anda.",
  },
  {
    id: "birthday",
    highlight: "Diskon ulang tahun 25%",
    description: "untuk Anda dan keluarga.",
  },
  {
    id: "early-access",
    highlight: "Akses awal",
    description: "ke menu musiman, kelas masak, dan acara spesial.",
  },
];
