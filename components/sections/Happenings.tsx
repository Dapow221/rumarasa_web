import type { Happening } from "@/lib/content";
import { EF } from "@/components/admin/Editable";
import { AddItem, DeleteItem } from "@/components/admin/ItemControls";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Happenings({ happenings }: { happenings: Happening[] }) {
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {happenings.map((event) => (
            <article
              key={event.id}
              className="relative flex flex-col gap-3 border border-espresso-line p-7 md:px-7 md:py-8"
            >
              <DeleteItem collection="happenings" id={event.id} />
              <p className="text-xs tracking-[2px] text-gold uppercase">
                <EF c="happenings" id={event.id} f="schedule">{event.schedule}</EF>
              </p>
              <h3 className="font-serif text-2xl font-semibold text-ivory md:text-[26px]">
                <EF c="happenings" id={event.id} f="title">{event.title}</EF>
              </h3>
              <p className="text-sm leading-relaxed font-light text-parchment">
                <EF c="happenings" id={event.id} f="description">{event.description}</EF>
              </p>
            </article>
          ))}
        </div>

        <div className="mt-7 flex justify-center">
          <AddItem
            collection="happenings"
            label="Tambah Acara"
            dark
            template={{
              schedule: "Jadwal acara",
              title: "Acara Baru",
              description: "Deskripsi acara.",
            }}
          />
        </div>
      </div>
    </section>
  );
}
