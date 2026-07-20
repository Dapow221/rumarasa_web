import type { Promo as PromoItem } from "@/lib/content";
import { EF } from "@/components/admin/Editable";
import { EImg } from "@/components/admin/EImg";
import { AddItem, DeleteItem, FeatureToggle } from "@/components/admin/ItemControls";

interface PromoProps {
  promos: PromoItem[];
  waOrderLink: string;
}

export function Promo({ promos, waOrderLink }: PromoProps) {
  return (
    <section id="promo" className="bg-batik scroll-mt-20 px-5 py-16 md:px-14 md:pt-24 md:pb-[84px]">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between md:mb-11">
          <div>
            <p className="font-script text-2xl text-copper md:text-[26px]">
              Penawaran spesial
            </p>
            <h2 className="mt-1 font-serif text-3xl font-medium md:text-[44px]">
              Promo Bulan Ini{" "}
              <span className="text-xl italic text-caramel md:text-[26px]">
                / This Month
              </span>
            </h2>
          </div>
          <a
            href={waOrderLink}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start border-b border-tan pb-[3px] text-[13px] tracking-[1.5px] text-copper uppercase sm:self-auto"
          >
            Tanya promo →
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {promos.map((promo) => (
            <article
              key={promo.id}
              className={`relative flex flex-col ${
                promo.featured
                  ? "bg-espresso text-ivory-dim"
                  : "border border-line bg-cream-card"
              }`}
            >
              <DeleteItem collection="promos" id={promo.id} />
              <FeatureToggle id={promo.id} featured={promo.featured ?? false} />
              <div className="h-[190px]">
                <EImg image={promo.image} label={promo.imagePlaceholder} c="promos" id={promo.id} />
              </div>
              <div className="flex flex-1 flex-col gap-2.5 px-7 pt-7 pb-8">
                <p
                  className={`text-xs tracking-[2px] uppercase ${promo.featured ? "text-gold" : "text-copper"}`}
                >
                  <EF c="promos" id={promo.id} f="badge">{promo.badge}</EF>
                </p>
                <h3
                  className={`font-serif text-2xl font-semibold md:text-[27px] ${promo.featured ? "text-ivory" : ""}`}
                >
                  <EF c="promos" id={promo.id} f="title">{promo.title}</EF>
                </h3>
                <p
                  className={`text-[15px] leading-relaxed font-light ${promo.featured ? "text-parchment" : "text-cocoa"}`}
                >
                  <EF c="promos" id={promo.id} f="description">{promo.description}</EF>{" "}
                  <em className={promo.featured ? "text-khaki" : "text-cocoa-muted"}>
                    <EF c="promos" id={promo.id} f="description_en">{promo.descriptionEn}</EF>
                  </em>
                </p>
                <p
                  className={`mt-auto pt-3.5 font-serif text-2xl ${promo.featured ? "text-gold" : "text-copper"}`}
                >
                  <EF c="promos" id={promo.id} f="price">{promo.price}</EF>{" "}
                  <span
                    className={`text-[15px] ${promo.featured ? "text-khaki" : "text-cocoa-muted"}`}
                  >
                    <EF c="promos" id={promo.id} f="price_note">{promo.priceNote}</EF>
                  </span>
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-7 flex justify-center">
          <AddItem
            collection="promos"
            label="Tambah Promo"
            template={{
              badge: "Badge promo",
              title: "Promo Baru",
              description: "Deskripsi promo.",
              description_en: "Promo description.",
              price: "Rp 0",
              price_note: "/ orang",
            }}
          />
        </div>
      </div>
    </section>
  );
}
