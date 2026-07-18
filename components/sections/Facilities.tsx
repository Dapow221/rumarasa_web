import { facilities } from "@/lib/content";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Facilities() {
  return (
    <section
      id="fasilitas"
      className="scroll-mt-20 border-t border-line bg-cream px-5 py-16 md:px-14 md:py-[90px]"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-10 md:mb-12">
          <SectionHeading
            eyebrow="Kenyamanan Anda"
            title="Fasilitas"
            titleEn="Facilities"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {facilities.map((facility) => (
            <article key={facility.id} className="flex flex-col gap-3.5">
              <div className="h-[220px]">
                <ImagePlaceholder label={facility.imagePlaceholder} />
              </div>
              <h3 className="font-serif text-xl font-semibold md:text-[23px]">
                {facility.title}
              </h3>
              <p className="text-sm leading-relaxed font-light text-cocoa">
                {facility.description}{" "}
                <em className="text-cocoa-muted">{facility.descriptionEn}</em>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
