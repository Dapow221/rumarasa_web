import type { Metadata } from "next";
import { MemberPageTitle } from "@/components/membership/MemberPageTitle";
import { RewardCard } from "@/components/membership/RewardCard";
import { rewards } from "@/lib/membership";
import { getPageData } from "@/lib/api";

export const metadata: Metadata = { title: "Rewards" };

export default async function RewardsPage() {
  const d = await getPageData();

  return (
    <>
      <MemberPageTitle
        eyebrow="Tukar Poin"
        title="Rewards"
        description="Kumpulkan poin dari setiap kunjungan dan tukarkan dengan hidangan, voucher, atau pengalaman bersama kami."
      />
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {rewards.map((reward) => (
          <RewardCard
            key={reward.id}
            reward={reward}
            whatsappNumber={d.site.whatsappNumber}
          />
        ))}
      </div>
      <p className="mt-8 text-center text-[13px] font-light text-cocoa-muted">
        Tanyakan saldo poin dan konfirmasi penukaran ke tim kami via WhatsApp.
      </p>
    </>
  );
}
