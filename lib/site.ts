export const siteConfig = {
  name: "Rumarasa Nusantara",
  tagline: "Taste of Authenticity",
  description:
    "Cita rasa Nusantara di jantung Jakarta Selatan. The archipelago's authentic flavors, served in the heart of South Jakarta.",
  whatsappNumber: "6281110065589",
  phone: "+62 8111 0065 589",
  email: "rumarasanusantara@gmail.com",
  address: {
    street: "Jl. Taman Mpu Sendok No.45",
    city: "Selong, Jakarta Selatan",
  },
  /** Coordinates of the restaurant, used for the map embed. */
  coords: { lat: -6.2323907, lng: 106.8124392 },
  hours: { days: "Open Everyday", time: "10.00 - 22.00" },
  links: {
    maps: "https://www.google.com/maps/place/Rumarasa+Nusantara/@-6.2323907,106.8124392,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f1ba037e27b7:0x91ed7440c2e1644a!8m2!3d-6.2323907!4d106.8124392",
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
  { href: "#venue", label: "Venue" },
  { href: "#fasilitas", label: "Fasilitas" },
  { href: "#member", label: "Member" },
  { href: "#lokasi", label: "Lokasi" },
] as const;
