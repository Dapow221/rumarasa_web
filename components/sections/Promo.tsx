import { promos } from "@/lib/content";
import { waOrderLink } from "@/lib/site";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export function Promo() {
  return (
    <section id="promo" className="scroll-mt-20 bg-cream px-5 py-16 md:px-14 md:pt-24 md:pb-[84px]">
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
              className={`flex flex-col ${
                promo.featured
                  ? "bg-espresso text-ivory-dim"
                  : "border border-line bg-cream-card"
              }`}
            >
              <div className="h-[190px]">
                <ImagePlaceholder label={promo.imagePlaceholder} />
              </div>
              <div className="flex flex-1 flex-col gap-2.5 px-7 pt-7 pb-8">
                <p
                  className={`text-xs tracking-[2px] uppercase ${promo.featured ? "text-gold" : "text-copper"}`}
                >
                  {promo.badge}
                </p>
                <h3
                  className={`font-serif text-2xl font-semibold md:text-[27px] ${promo.featured ? "text-ivory" : ""}`}
                >
                  {promo.title}
                </h3>
                <p
                  className={`text-[15px] leading-relaxed font-light ${promo.featured ? "text-parchment" : "text-cocoa"}`}
                >
                  {promo.description}{" "}
                  <em className={promo.featured ? "text-khaki" : "text-cocoa-muted"}>
                    {promo.descriptionEn}
                  </em>
                </p>
                <p
                  className={`mt-auto pt-3.5 font-serif text-2xl ${promo.featured ? "text-gold" : "text-copper"}`}
                >
                  {promo.price}{" "}
                  <span
                    className={`text-[15px] ${promo.featured ? "text-khaki" : "text-cocoa-muted"}`}
                  >
                    {promo.priceNote}
                  </span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
