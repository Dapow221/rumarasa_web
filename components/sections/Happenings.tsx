import { happenings } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Happenings() {
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
              className="flex flex-col gap-3 border border-espresso-line p-7 md:px-7 md:py-8"
            >
              <p className="text-xs tracking-[2px] text-gold uppercase">
                {event.schedule}
              </p>
              <h3 className="font-serif text-2xl font-semibold text-ivory md:text-[26px]">
                {event.title}
              </h3>
              <p className="text-sm leading-relaxed font-light text-parchment">
                {event.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
