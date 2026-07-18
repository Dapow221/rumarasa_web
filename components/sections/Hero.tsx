import { waOrderLink } from "@/lib/site";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export function Hero() {
  return (
    <header id="atas" className="relative h-[86vh] min-h-[560px] overflow-hidden md:min-h-[640px]">
      <div className="absolute inset-0">
        <ImagePlaceholder label="Foto suasana restoran / hero dish" />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(26,15,7,0.35) 0%, rgba(26,15,7,0.15) 45%, rgba(26,15,7,0.72) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 px-5 pb-14 text-center md:gap-[18px] md:px-14 md:pb-[72px]">
        <p className="font-script text-2xl text-gold md:text-[34px]">
          Taste of Authenticity
        </p>
        <h1 className="max-w-[880px] font-serif text-4xl leading-[1.08] font-medium text-balance text-ivory sm:text-5xl md:text-[68px]">
          Cita Rasa Nusantara di Jantung Jakarta Selatan
        </h1>
        <p className="max-w-[560px] text-[15px] font-light tracking-[0.4px] text-ivory-muted md:text-[17px]">
          The archipelago&rsquo;s authentic flavors, served in the heart of
          South Jakarta.
        </p>
        <div className="pointer-events-auto mt-3 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a
            href={waOrderLink}
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
      </div>
    </header>
  );
}
