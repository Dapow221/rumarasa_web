import { contentImage, text, type SiteData } from "@/lib/api";
import { E } from "@/components/admin/Editable";
import { EImg } from "@/components/admin/EImg";
import { InstagramIcon, TikTokIcon } from "@/components/ui/icons";

interface HeroProps {
  content: Record<string, string>;
  site: SiteData;
}

export function Hero({ content, site }: HeroProps) {
  return (
    <header id="atas" className="relative h-[86vh] min-h-[560px] overflow-hidden md:min-h-[640px]">
      <div className="absolute inset-0">
        <EImg
          image={contentImage(content, "hero.image")}
          label="Foto suasana restoran / hero dish"
          // The photo sits under a dark overlay and headline, so it can be
          // encoded softer and capped well below the 2x/3840px bucket.
          sizes="(max-width: 768px) 100vw, 1600px"
          priority
          quality={55}
          k="hero.image"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-black/40" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-5 md:px-14">
        <div className="flex max-w-[960px] flex-col items-center gap-4 text-center md:gap-[18px]">
          <p className="pointer-events-auto font-script text-3xl text-gold md:text-[44px]">
            <E k="site.tagline">{site.tagline}</E>
          </p>
          <h1 className="pointer-events-auto max-w-[880px] font-serif text-4xl leading-[1.08] font-medium text-balance text-ivory sm:text-5xl md:text-[68px]">
            <E k="hero.title">
              {text(content, "hero.title", "Cita Rasa Nusantara di Jantung Jakarta Selatan")}
            </E>
          </h1>
          <p className="pointer-events-auto max-w-[560px] text-[15px] font-light tracking-[0.4px] text-ivory-muted md:text-[17px]">
            <E k="hero.subtitle">
              {text(
                content,
                "hero.subtitle",
                "The archipelago’s authentic flavors, served in the heart of South Jakarta.",
              )}
            </E>
          </p>
          <div className="pointer-events-auto mt-3 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a
              href={site.waOrderLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-copper px-8 py-3.5 text-sm tracking-[2px] whitespace-nowrap text-ivory uppercase transition-colors hover:bg-copper-light md:px-[34px] md:py-[15px]"
            >
              Pesan via WhatsApp
            </a>
            <a
              href="#menu"
              className="rounded-full border border-ivory/55 px-8 py-3.5 text-sm tracking-[2px] whitespace-nowrap text-ivory uppercase transition-colors hover:bg-ivory/15 md:px-[34px] md:py-[15px]"
            >
              Lihat Menu
            </a>
          </div>
          <div className="pointer-events-auto mt-1 flex gap-3">
            <a
              href={site.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/55 text-ivory transition-colors hover:bg-ivory/15"
            >
              <InstagramIcon />
            </a>
            <a
              href={site.links.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/55 text-ivory transition-colors hover:bg-ivory/15"
            >
              <TikTokIcon />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
