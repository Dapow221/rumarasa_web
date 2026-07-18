import Image from "next/image";
import type { MemberBenefit } from "@/lib/content";
import { EF } from "@/components/admin/Editable";
import { AddItem, DeleteItem } from "@/components/admin/ItemControls";
import logo from "@/public/logo_rumarasa.png";

interface MembershipProps {
  memberBenefits: MemberBenefit[];
  waJoinLink: string;
}

export function Membership({ memberBenefits, waJoinLink }: MembershipProps) {
  return (
    <section id="member" className="scroll-mt-20 bg-cream px-5 py-16 md:px-14 md:py-[90px]">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="flex flex-col gap-4">
          <p className="font-script text-2xl text-copper md:text-[26px]">
            Keluarga Rumarasa
          </p>
          <h2 className="font-serif text-3xl leading-[1.15] font-medium md:text-[44px]">
            Jadi Member, Nikmati Lebih{" "}
            <span className="text-xl italic text-caramel md:text-[26px]">
              / Membership
            </span>
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
          <div className="mt-3.5">
            <a
              href={waJoinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-copper px-8 py-3.5 text-sm tracking-[2px] whitespace-nowrap text-ivory uppercase transition-colors hover:bg-copper-light md:px-[34px] md:py-[15px]"
            >
              Daftar Gratis via WhatsApp
            </a>
          </div>
        </div>

        {/* Member card */}
        <div className="flex flex-col gap-2 bg-espresso p-8 text-ivory-dim shadow-[0_24px_60px_-24px_rgba(42,27,16,0.5)] md:px-10 md:py-11">
          <div className="flex items-center justify-between">
            <Image
              src={logo}
              alt=""
              className="h-11 w-11 object-cover brightness-[1.6]"
              style={{ objectPosition: "center 30%" }}
              sizes="44px"
            />
            <span className="text-[11px] tracking-[3px] text-khaki uppercase">
              Member Card
            </span>
          </div>
          <p className="mt-7 font-serif text-2xl text-ivory md:text-[30px]">
            Keluarga Rumarasa
          </p>
          <p className="font-script text-xl text-gold md:text-[22px]">
            Taste of Authenticity
          </p>
          <div className="mt-7 flex justify-between text-xs tracking-[2px] text-khaki">
            <span>NO. 0001 2345</span>
            <span>SEJAK 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}
