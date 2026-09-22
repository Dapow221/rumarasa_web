import type { Metadata } from "next";
import { MemberPageTitle } from "@/components/membership/MemberPageTitle";
import { RewardCard } from "@/components/membership/RewardCard";
import { demoMember, formatPoints, rewards } from "@/lib/membership";
import { getPageData } from "@/lib/api";

export const metadata: Metadata = { title: "Rewards" };

export default async function RewardsPage() {
  const d = await getPageData();

  return (
    <>
      <MemberPageTitle
        eyebrow="Tukar Poin"
        title="Rewards"
        description="Setiap Rp 10.000 transaksi memberi Anda 1 poin. Tukarkan dengan hidangan, voucher, atau pengalaman bersama kami."
      />
      <p className="mt-8 text-center text-sm text-cocoa">
        Saldo Anda:{" "}
        <span className="font-serif text-2xl font-medium text-copper">
          {formatPoints(demoMember.points)}
        </span>{" "}
        poin
      </p>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {rewards.map((reward) => (
          <RewardCard
            key={reward.id}
            reward={reward}
            balance={demoMember.points}
            whatsappNumber={d.site.whatsappNumber}
          />
        ))}
      </div>
      <p className="mt-8 text-center text-[13px] font-light text-cocoa-muted">
        Poin berlaku 12 bulan sejak transaksi terakhir. Penukaran dikonfirmasi oleh tim kami via WhatsApp.
      </p>
    </>
  );
}
