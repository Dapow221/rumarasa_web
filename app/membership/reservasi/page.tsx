import type { Metadata } from "next";
import { MemberPageTitle } from "@/components/membership/MemberPageTitle";
import { ReservationDialog } from "@/components/sections/ReservationDialog";
import { getPageData } from "@/lib/api";

export const metadata: Metadata = { title: "Reservasi" };

export default async function ReservationPage() {
  const d = await getPageData();

  return (
    <div className="mx-auto max-w-[860px]">
      <MemberPageTitle
        eyebrow="Reservasi"
        title="Reservasi Meja"
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
    </div>
  );
}
