import Link from "next/link";
import type { MemberBenefit } from "@/lib/content";
import { EF } from "@/components/admin/Editable";
import { AddItem, DeleteItem } from "@/components/admin/ItemControls";
import { TierBadge } from "@/components/membership/TierBadge";
import { tiers } from "@/lib/membership";

export function Membership({ memberBenefits }: { memberBenefits: MemberBenefit[] }) {
  return (
    <section id="member" className="scroll-mt-20 bg-sand px-5 py-16 md:px-14 md:py-[90px]">
      <div className="mx-auto grid max-w-[1080px] items-center gap-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
        <div className="flex flex-col gap-4">
          <p className="font-script text-2xl text-copper md:text-[26px]">Keluarga Rumarasa</p>
          <h2 className="font-serif text-3xl leading-[1.15] font-medium md:text-[44px]">
            Jadi Member, Nikmati Lebih{" "}
            <span className="text-xl italic text-caramel md:text-[26px]">/ Membership</span>
          </h2>
          <ol className="mt-2 flex flex-col gap-3.5">
            {memberBenefits.map((benefit, index) => (
              <li key={benefit.id} className="relative flex items-baseline gap-3.5 pr-10">
                <DeleteItem collection="member-benefits" id={benefit.id} />
                <span className="font-serif text-xl text-copper">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-[15px] leading-relaxed font-light text-cocoa">
                  <strong className="font-medium text-espresso">
                    <EF c="member-benefits" id={benefit.id} f="highlight">{benefit.highlight}</EF>
                  </strong>{" "}
                  — <EF c="member-benefits" id={benefit.id} f="description">{benefit.description}</EF>
                </p>
              </li>
            ))}
          </ol>
          <div>
            <AddItem
              collection="member-benefits"
              label="Tambah Benefit"
              template={{ highlight: "Benefit baru", description: "deskripsi benefit." }}
            />
          </div>
          <div className="mt-3.5 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/membership"
              className="rounded-full bg-copper px-8 py-3.5 text-center text-sm tracking-[2px] whitespace-nowrap text-ivory uppercase transition-colors hover:bg-copper-light"
            >
              Lihat Membership
            </Link>
            <Link
              href="/membership/reservasi"
              className="rounded-full border border-tan-dark px-8 py-3.5 text-center text-sm tracking-[2px] whitespace-nowrap text-walnut uppercase transition-colors hover:bg-line hover:text-espresso-line"
            >
              Reservasi Meja
            </Link>
          </div>
        </div>

        <ul className="flex flex-col gap-4">
          {tiers.map((tier) => (
            <li key={tier.id}>
              <Link
                href="/membership/benefit"
                className="flex items-center gap-5 border border-line bg-cream-card px-6 py-5 transition-colors hover:border-tan"
              >
                <TierBadge tier={tier.id} size={48} />
                <span className="flex-1">
                  <span className="block font-serif text-2xl font-medium">{tier.name}</span>
                  <span className="text-sm font-light text-cocoa">
                    {tier.benefits.length} benefit
                  </span>
                </span>
                <span aria-hidden="true" className="text-copper">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
