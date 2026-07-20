"use client";

import type { Happening } from "@/lib/content";
import { EF } from "@/components/admin/Editable";
import { EImg } from "@/components/admin/EImg";
import { AddItem, DeleteItem } from "@/components/admin/ItemControls";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useAutoSlide } from "@/components/ui/useAutoSlide";

const CARD_WIDTH = 352;
const CARD_GAP = 28;
const AUTOPLAY_MS = 2000;

export function Happenings({ happenings }: { happenings: Happening[] }) {
  const scrollerRef = useAutoSlide(CARD_WIDTH + CARD_GAP, AUTOPLAY_MS);

  return (
    <section
      id="acara"
      className="scroll-mt-20 bg-espresso px-5 py-16 text-ivory-dim md:px-14 md:py-[90px]"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-10 md:mb-12">
          <SectionHeading
            eyebrow="Lebih dari sekadar makan"
            title="Acara & Aktivitas"
            titleEn="Happenings"
            dark
          />
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-7 overflow-x-auto scroll-smooth px-0.5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {happenings.map((event) => (
            <article
              key={event.id}
              className="relative flex w-[280px] flex-none flex-col border border-espresso-line md:w-[352px]"
            >
              <DeleteItem collection="happenings" id={event.id} />
              <div className="h-[200px] md:h-[220px]">
                <EImg
                  image={event.image}
                  label={`Foto ${event.title}`}
                  c="happenings"
                  id={event.id}
                  sizes="(min-width: 768px) 352px, 280px"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 px-7 py-7 md:py-8">
                {event.schedule && (
                  <p className="text-xs tracking-[2px] text-gold uppercase">
                    <EF c="happenings" id={event.id} f="schedule">{event.schedule}</EF>
                  </p>
                )}
                <h3 className="font-serif text-2xl font-semibold text-ivory md:text-[26px]">
                  <EF c="happenings" id={event.id} f="title">{event.title}</EF>
                </h3>
                <p className="text-sm leading-relaxed font-light text-parchment">
                  <EF c="happenings" id={event.id} f="description">{event.description}</EF>
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <AddItem
            collection="happenings"
            label="Tambah Acara"
            dark
            template={{
              title: "Acara Baru",
              description: "Deskripsi acara.",
            }}
          />
        </div>
      </div>
    </section>
  );
}
