import type { MemberBenefit } from "@/lib/content";
import { EF } from "@/components/admin/Editable";
import { AddItem, DeleteItem } from "@/components/admin/ItemControls";
import { MemberDialog } from "./MemberDialog";

interface MembershipProps {
  memberBenefits: MemberBenefit[];
  whatsappNumber: string;
}

export function Membership({ memberBenefits, whatsappNumber }: MembershipProps) {
  return (
    <section id="member" className="scroll-mt-20 bg-cream px-5 py-16 md:px-14 md:py-[90px]">
      <div className="mx-auto max-w-[720px]">
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
            <MemberDialog
              whatsappNumber={whatsappNumber}
              label="Daftar Gratis Sekarang"
              triggerClassName="inline-block cursor-pointer rounded-full bg-copper px-8 py-3.5 text-sm tracking-[2px] whitespace-nowrap text-ivory uppercase transition-colors hover:bg-copper-light md:px-[34px] md:py-[15px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
