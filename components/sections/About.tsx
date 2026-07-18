import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

const stats = [
  { value: "30+", label: "Hidangan daerah" },
  { value: "100%", label: "Bumbu segar harian" },
  { value: "Halal", label: "Tersertifikasi" },
];

export function About() {
  return (
    <section id="tentang" className="scroll-mt-20 bg-sand px-5 py-16 md:px-14 md:py-[90px]">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-[72px]">
        <div className="relative h-[320px] sm:h-[420px] lg:h-[520px]">
          <div className="pointer-events-none absolute -right-3 -bottom-3 top-3 left-3 border border-tan md:-right-6 md:-bottom-6 md:top-6 md:left-6" />
          <ImagePlaceholder label="Foto interior / dapur" />
        </div>
        <div className="flex flex-col gap-4 md:gap-[18px]">
          <p className="font-script text-2xl text-copper md:text-[26px]">
            Tentang kami
          </p>
          <h2 className="font-serif text-3xl leading-[1.15] font-medium md:text-[44px]">
            Rumah bagi Rasa Asli Nusantara
          </h2>
          <p className="text-[15px] leading-[1.8] font-light text-cocoa md:text-base">
            Rumarasa Nusantara lahir dari kecintaan pada resep warisan keluarga
            — dari rendang yang dimasak berjam-jam hingga sambal yang diulek
            segar setiap hari. Kami menghadirkan kekayaan kuliner dari Sabang
            sampai Merauke dalam suasana hangat khas rumah sendiri.
          </p>
          <p className="text-[15px] leading-[1.75] font-light italic text-cocoa-muted">
            Born from a love of heirloom recipes, we bring the archipelago&rsquo;s
            culinary heritage to your table — warm, honest, and unmistakably
            Indonesian.
          </p>
          <div className="mt-3 flex flex-wrap gap-8 md:gap-10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-3xl text-copper md:text-4xl">
                  {stat.value}
                </p>
                <p className="text-[13px] tracking-[1px] text-cocoa uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
