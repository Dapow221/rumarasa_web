import Link from "next/link";
import { MemberStatusCard } from "@/components/membership/MemberStatusCard";
import { BenefitGrid } from "@/components/membership/BenefitGrid";
import { RewardCard } from "@/components/membership/RewardCard";
import { demoMember, getTier, rewards } from "@/lib/membership";
import { getPageData } from "@/lib/api";

const linkClass =
  "text-[13px] tracking-[1.5px] text-copper uppercase transition-colors hover:text-copper-light";

export default async function MembershipHomePage() {
  const d = await getPageData();
  const tier = getTier(demoMember.tier);
  const affordable = rewards.filter((r) => r.points <= demoMember.points).slice(-4);

  return (
    <div className="flex flex-col gap-14 md:gap-16">
      <MemberStatusCard member={demoMember} />

      <section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-serif text-2xl font-medium md:text-[32px]">
            Benefit {tier.name} Anda
          </h2>
          <Link href="/membership/benefit" className={linkClass}>
            Semua tingkat →
          </Link>
        </div>
        <BenefitGrid benefits={tier.benefits.slice(0, 8)} />
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-serif text-2xl font-medium md:text-[32px]">Bisa Anda tukar sekarang</h2>
          <Link href="/membership/rewards" className={linkClass}>
            Lihat rewards →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {affordable.map((reward) => (
            <RewardCard key={reward.id} reward={reward} balance={demoMember.points} whatsappNumber={d.site.whatsappNumber} />
          ))}
        </div>
      </section>
    </div>
  );
}
