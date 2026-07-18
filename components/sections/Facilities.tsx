import type { Facility } from "@/lib/content";
import { EF } from "@/components/admin/Editable";
import { EImg } from "@/components/admin/EImg";
import { AddItem, DeleteItem } from "@/components/admin/ItemControls";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Facilities({ facilities }: { facilities: Facility[] }) {
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
            <article key={facility.id} className="relative flex flex-col gap-3.5">
              <DeleteItem collection="facilities" id={facility.id} />
              <div className="h-[220px]">
                <EImg image={facility.image} label={facility.imagePlaceholder} c="facilities" id={facility.id} />
              </div>
              <h3 className="font-serif text-xl font-semibold md:text-[23px]">
                <EF c="facilities" id={facility.id} f="title">{facility.title}</EF>
              </h3>
              <p className="text-sm leading-relaxed font-light text-cocoa">
                <EF c="facilities" id={facility.id} f="description">{facility.description}</EF>{" "}
                <em className="text-cocoa-muted">
                  <EF c="facilities" id={facility.id} f="description_en">{facility.descriptionEn}</EF>
                </em>
              </p>
            </article>
          ))}
        </div>

        <div className="mt-7 flex justify-center">
          <AddItem
            collection="facilities"
            label="Tambah Fasilitas"
            template={{
              title: "Fasilitas Baru",
              description: "Deskripsi fasilitas.",
              description_en: "Facility description.",
            }}
          />
        </div>
      </div>
    </section>
  );
}
