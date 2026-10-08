import type { Metadata } from "next";
import { MemberPageTitle } from "@/components/membership/MemberPageTitle";
import { TierBenefits } from "@/components/membership/TierBenefits";
import { JoinCallout } from "@/components/membership/JoinCallout";

export const metadata: Metadata = { title: "Benefit" };

export default function BenefitPage() {
  return (
    <>
      <MemberPageTitle eyebrow="Keluarga Rumarasa" title="Benefit" />
      <div className="mt-10">
        <TierBenefits />
      </div>
      <div className="mt-16 md:mt-20">
        <JoinCallout />
      </div>
    </>
  );
}
