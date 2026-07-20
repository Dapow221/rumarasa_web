import {
  beverages as fallbackBeverages,
  facilities as fallbackFacilities,
  foods as fallbackFoods,
  happenings as fallbackHappenings,
  memberBenefits as fallbackBenefits,
  promos as fallbackPromos,
  type Dish,
  type Facility,
  type Happening,
  type MemberBenefit,
  type Promo,
} from "./content";
import { siteConfig } from "./site";
import { waLink } from "./whatsapp";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
const REVALIDATE_SECONDS = 60;

export interface SiteData {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  addressStreet: string;
  addressCity: string;
  hours: { days: string; time: string };
  links: { maps: string; instagram: string; tiktok: string };
  whatsappNumber: string;
  waOrderLink: string;
  waJoinLink: string;
}

export interface PageData {
  content: Record<string, string>;
  site: SiteData;
  foods: Dish[];
  beverages: Dish[];
  promos: Promo[];
  facilities: Facility[];
  happenings: Happening[];
  memberBenefits: MemberBenefit[];
}

/** Content-block lookup with a hardcoded fallback for keys not yet in the CMS. */
export function text(content: Record<string, string>, key: string, fallback: string): string {
  return content[key] ?? fallback;
}

/** Image URL stored in a content block (e.g. "hero.image"), made absolute. */
export function contentImage(content: Record<string, string>, key: string): string | undefined {
  const u = content[key];
  if (!u) return undefined;
  return u.startsWith("http") ? u : API_URL + u;
}

type Row = Record<string, unknown>;

async function api<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}/api/v1/${path}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { data: T };
    return json.data;
  } catch {
    // API unreachable — callers fall back to the static content in lib/content.ts
    return null;
  }
}

function str(row: Row, key: string): string {
  const v = row[key];
  return typeof v === "string" ? v : "";
}

function imageUrl(row: Row): string | undefined {
  const u = str(row, "image_url");
  if (!u) return undefined;
  return u.startsWith("http") ? u : API_URL + u;
}

const toDish = (r: Row): Dish => ({
  id: String(r.id),
  name: str(r, "name"),
  price: str(r, "price"),
  description: str(r, "description"),
  imagePlaceholder: `Foto ${str(r, "name")}`,
  image: imageUrl(r),
});

const toPromo = (r: Row): Promo => ({
  id: String(r.id),
  badge: str(r, "badge"),
  title: str(r, "title"),
  description: str(r, "description"),
  descriptionEn: str(r, "description_en"),
  price: str(r, "price"),
  priceNote: str(r, "price_note"),
  imagePlaceholder: `Foto ${str(r, "title")}`,
  featured: r.featured === true,
  image: imageUrl(r),
});

const toFacility = (r: Row): Facility => ({
  id: String(r.id),
  title: str(r, "title"),
  description: str(r, "description"),
  descriptionEn: str(r, "description_en"),
  imagePlaceholder: `Foto ${str(r, "title")}`,
  image: imageUrl(r),
});

const toHappening = (r: Row): Happening => ({
  id: String(r.id),
  schedule: str(r, "schedule"),
  title: str(r, "title"),
  description: str(r, "description"),
  image: imageUrl(r),
});

const toBenefit = (r: Row): MemberBenefit => ({
  id: String(r.id),
  highlight: str(r, "highlight"),
  description: str(r, "description"),
});

/**
 * Fetches everything the landing page needs in parallel. Each call is cached
 * and revalidated by Next (ISR), so the page renders statically fast and picks
 * up CMS edits within a minute. When the API is down, the static content in
 * lib/content.ts and lib/site.ts keeps the site fully rendered.
 */
export async function getPageData(): Promise<PageData> {
  const [content, dishRows, promoRows, facilityRows, happeningRows, benefitRows] = await Promise.all([
    api<Record<string, string>>("content"),
    api<Row[]>("dishes"),
    api<Row[]>("promos"),
    api<Row[]>("facilities"),
    api<Row[]>("happenings"),
    api<Row[]>("member-benefits"),
  ]);

  const c = content ?? {};
  const t = (key: string, fallback: string) => text(c, key, fallback);
  const whatsappNumber = t("site.whatsapp_number", siteConfig.whatsappNumber);

  const site: SiteData = {
    name: t("site.name", siteConfig.name),
    tagline: t("site.tagline", siteConfig.tagline),
    description: t("site.description", siteConfig.description),
    phone: t("site.phone", siteConfig.phone),
    email: t("site.email", siteConfig.email),
    addressStreet: t("site.address_street", siteConfig.address.street),
    addressCity: t("site.address_city", siteConfig.address.city),
    hours: {
      days: t("site.hours_days", siteConfig.hours.days),
      time: t("site.hours_time", siteConfig.hours.time),
    },
    links: {
      maps: t("site.link_maps", siteConfig.links.maps),
      instagram: t("site.link_instagram", siteConfig.links.instagram),
      tiktok: t("site.link_tiktok", siteConfig.links.tiktok),
    },
    whatsappNumber,
    waOrderLink: waLink(whatsappNumber, "Halo Rumarasa Nusantara, saya ingin memesan / reservasi."),
    waJoinLink: waLink(whatsappNumber, "Halo, saya ingin mendaftar member Keluarga Rumarasa."),
  };

  return {
    content: c,
    site,
    foods: dishRows?.filter((r) => r.kind === "food").map(toDish) ?? fallbackFoods,
    beverages: dishRows?.filter((r) => r.kind === "beverage").map(toDish) ?? fallbackBeverages,
    promos: promoRows?.map(toPromo) ?? fallbackPromos,
    facilities: facilityRows?.map(toFacility) ?? fallbackFacilities,
    happenings: happeningRows?.map(toHappening) ?? fallbackHappenings,
    memberBenefits: benefitRows?.map(toBenefit) ?? fallbackBenefits,
  };
}
