import { contentImage, text, type SiteData } from "@/lib/api";
import { E } from "@/components/admin/Editable";
import { EImg } from "@/components/admin/EImg";

interface VenueProps {
  content: Record<string, string>;
  site: SiteData;
}

export function Venue({ content, site }: VenueProps) {
  return (
    <section
      id="venue"
      className="bg-batik scroll-mt-20 border-t border-line px-5 py-16 md:px-14 md:py-[90px]"
    >
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-[72px]">
        <div className="flex flex-col gap-4 md:gap-[18px]">
          <p className="font-script text-2xl text-copper md:text-[26px]">
            Event · Meeting · Weddings & Catering
          </p>
          <h2 className="font-serif text-3xl leading-[1.15] font-medium md:text-[44px]">
            <E k="venue.title">
              {text(content, "venue.title", "Great Venue for Any Occasion")}
            </E>
          </h2>
          <p className="text-[15px] leading-[1.8] font-light text-cocoa md:text-base">
            <E k="venue.description">
              {text(
                content,
                "venue.description",
                "Rumarasa Nusantara menyediakan ruang makan fleksibel dengan suasana hangat dan nyaman — dirancang untuk berbagai acara dan pertemuan, mulai dari perayaan ulang tahun yang meriah, rapat bisnis yang santai, hingga peluncuran produk yang berkesan.",
              )}
            </E>
          </p>
          <p className="text-[15px] leading-[1.8] font-light text-cocoa md:text-base">
            <E k="venue.description2">
              {text(
                content,
                "venue.description2",
                "Kami juga siap melayani kebutuhan katering untuk setiap momen spesial Anda. Nikmati beragam pilihan menu autentik Indonesia — dari hidangan laut segar hingga masakan tradisional Nusantara — yang dapat disesuaikan dengan acara Anda: pernikahan, arisan, meeting kantor, hingga kumpul keluarga.",
              )}
            </E>
          </p>
          <p className="text-[15px] leading-[1.75] font-light italic text-cocoa-muted">
            <E k="venue.cta_note">
              {text(
                content,
                "venue.cta_note",
                "Untuk reservasi dan informasi lebih lanjut, tim kami siap membantu:",
              )}
            </E>
          </p>
          <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a
              href={site.waOrderLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-copper px-8 py-3.5 text-center text-sm tracking-[2px] whitespace-nowrap text-ivory uppercase transition-colors hover:bg-copper-light md:px-[34px]"
            >
              Hubungi via WhatsApp
            </a>
            <a
              href={`tel:${site.phone}`}
              className="rounded-full border border-tan-dark px-8 py-3.5 text-center text-sm tracking-[2px] whitespace-nowrap text-walnut uppercase transition-colors hover:bg-line hover:text-espresso-line md:px-[34px]"
            >
              Telepon Kami
            </a>
          </div>
        </div>

        <div className="relative h-[320px] sm:h-[420px] lg:h-[520px]">
          <div className="pointer-events-none absolute -left-3 -bottom-3 top-3 right-3 z-10 border border-tan md:-left-6 md:-bottom-6 md:top-6 md:right-6" />
          <EImg
            image={contentImage(content, "venue.image")}
            label="Foto ruang acara / venue"
            k="venue.image"
          />
        </div>
      </div>
    </section>
  );
}
