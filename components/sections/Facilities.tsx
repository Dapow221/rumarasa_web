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
        {/*
          One DOM tree for both layouts: a snap slider under `sm` (cards sized in
          vw so the next one peeks and invites the swipe), a plain grid above it.
          Bleeding the track past the section padding lets the first card sit
          flush with the heading while still snapping to centre.
        */}
        <div className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {facilities.map((facility) => (
            <article
              key={facility.id}
              className="relative flex w-[78vw] flex-none snap-center flex-col gap-3.5 sm:w-auto"
            >
              <DeleteItem collection="facilities" id={facility.id} />
              <div className="h-[220px]">
                <EImg
                  image={facility.image}
                  label={facility.imagePlaceholder}
                  c="facilities"
                  id={facility.id}
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 78vw"
                />
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

        <p className="mt-1 text-center text-[13px] tracking-[1.5px] text-cocoa-muted uppercase sm:hidden">
          Geser untuk melihat semua
        </p>

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
