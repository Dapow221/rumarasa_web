export const siteConfig = {
  name: "Rumarasa Nusantara",
  tagline: "Taste of Authenticity",
  description:
    "Cita rasa Nusantara di jantung Jakarta Selatan. The archipelago's authentic flavors, served in the heart of South Jakarta.",
  whatsappNumber: "6281234567890",
  phone: "+62215550123",
  address: {
    street: "Jl. Kemang Raya No. 88",
    city: "Jakarta Selatan 12730",
  },
  hours: [
    { days: "Sen – Jum", time: "11.00 – 22.00 WIB" },
    { days: "Sab – Min", time: "10.00 – 23.00 WIB" },
  ],
  links: {
    maps: "https://maps.google.com/?q=Rumarasa+Nusantara+Jakarta+Selatan",
    instagram: "https://www.instagram.com/rumarasa.nusantara/",
    tiktok: "https://www.tiktok.com/@rumarasa.nusantara",
  },
} as const;

function waLink(message: string): string {
  const number = siteConfig.whatsappNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const waOrderLink = waLink(
  "Halo Rumarasa Nusantara, saya ingin memesan / reservasi.",
);

export const waJoinLink = waLink(
  "Halo, saya ingin mendaftar member Keluarga Rumarasa.",
);

export const navLinks = [
  { href: "#promo", label: "Promo" },
  { href: "#tentang", label: "Tentang" },
  { href: "#menu", label: "Menu" },
  { href: "#acara", label: "Acara" },
  { href: "#fasilitas", label: "Fasilitas" },
  { href: "#member", label: "Member" },
  { href: "#lokasi", label: "Lokasi" },
] as const;
