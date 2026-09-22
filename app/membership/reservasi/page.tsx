import type { Metadata } from "next";
import { MemberPageTitle } from "@/components/membership/MemberPageTitle";
import { ReservationList } from "@/components/membership/ReservationList";
import { ReservationDialog } from "@/components/sections/ReservationDialog";
import { demoMember } from "@/lib/membership";
import { getPageData } from "@/lib/api";

export const metadata: Metadata = { title: "Reservasi Saya" };

const PROTOTYPE_TODAY = "2026-09-22";

export default async function MyReservationPage() {
  const d = await getPageData();
  const upcoming = demoMember.reservations.filter((r) => r.date >= PROTOTYPE_TODAY);
  const past = demoMember.reservations.filter((r) => r.date < PROTOTYPE_TODAY);

  return (
    <div className="mx-auto max-w-[860px]">
      <MemberPageTitle
        eyebrow="Reservasi"
        title="Reservasi Saya"
        description="Member Gold ke atas mendapat prioritas meja. Balasan dalam hitungan menit selama jam operasional."
      />
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
        <ReservationDialog
          whatsappNumber={d.site.whatsappNumber}
          label="Buat Reservasi"
          triggerClassName="cursor-pointer rounded-full bg-espresso px-9 py-4 text-sm tracking-[2px] whitespace-nowrap text-ivory-soft uppercase transition-colors hover:bg-copper hover:text-ivory"
        />
        <a
          href={`tel:${d.site.phone}`}
          className="rounded-full border border-tan-dark px-9 py-4 text-center text-sm tracking-[2px] whitespace-nowrap text-walnut uppercase transition-colors hover:bg-line hover:text-espresso-line"
        >
          Telepon Kami
        </a>
      </div>

      <section className="mt-14">
        <h2 className="mb-5 font-serif text-2xl font-medium md:text-[30px]">Akan Datang</h2>
        <ReservationList items={upcoming} />
      </section>
      <section className="mt-12">
        <h2 className="mb-5 font-serif text-2xl font-medium md:text-[30px]">Riwayat</h2>
        <ReservationList items={past} />
      </section>
    </div>
  );
}
