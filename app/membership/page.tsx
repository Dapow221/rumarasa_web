import Link from "next/link";
import { MemberPageTitle } from "@/components/membership/MemberPageTitle";
import { TierBadge } from "@/components/membership/TierBadge";
import { BenefitGrid } from "@/components/membership/BenefitGrid";
import { RewardCard } from "@/components/membership/RewardCard";
import { JoinCallout } from "@/components/membership/JoinCallout";
import { getTier, rewards, tiers } from "@/lib/membership";
import { getPageData } from "@/lib/api";

const linkClass =
  "text-[13px] tracking-[1.5px] text-copper uppercase transition-colors hover:text-copper-light";

export default async function MembershipHomePage() {
  const d = await getPageData();
  const silver = getTier("silver");

  return (
    <div className="flex flex-col gap-14 md:gap-16">
      <div className="flex flex-col gap-8">
        <MemberPageTitle
          eyebrow="Membership"
          title="Keluarga Rumarasa"
          description="Gratis untuk bergabung. Kumpulkan poin dari setiap kunjungan, naik tingkat, dan nikmati benefit eksklusif."
        />
        <JoinCallout />
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-5">
        {tiers.map((tier) => (
          <div key={tier.id} className="flex flex-col items-center gap-3 border border-line bg-cream-card p-6 text-center">
            <TierBadge tier={tier.id} />
            <h2 className="font-serif text-2xl font-medium">{tier.name}</h2>
            <p className="text-[13px] text-cocoa-muted">{tier.benefits.length} benefit</p>
          </div>
        ))}
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-serif text-2xl font-medium md:text-[32px]">Benefit member baru</h2>
          <Link href="/membership/benefit" className={linkClass}>
            Semua tingkat →
          </Link>
        </div>
        <BenefitGrid benefits={silver.benefits} />
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-serif text-2xl font-medium md:text-[32px]">Tukar poin Anda</h2>
          <Link href="/membership/rewards" className={linkClass}>
            Lihat rewards →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {rewards.slice(0, 4).map((reward) => (
            <RewardCard key={reward.id} reward={reward} whatsappNumber={d.site.whatsappNumber} />
          ))}
        </div>
      </section>
    </div>
  );
}
