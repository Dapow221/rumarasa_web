import { formatPoints, type Reward } from "@/lib/membership";
import { waLink } from "@/lib/whatsapp";

interface RewardCardProps {
  reward: Reward;
  balance: number;
  whatsappNumber: string;
}

/** Redemption goes through WhatsApp until there is a member backend to debit points. */
export function RewardCard({ reward, balance, whatsappNumber }: RewardCardProps) {
  const short = reward.points - balance;
  const redeemLink = waLink(
    whatsappNumber,
    `Halo Rumarasa, saya ingin menukar ${formatPoints(reward.points)} poin untuk: ${reward.title}.`,
  );

  return (
    <article className="flex flex-col border border-line bg-cream-card">
      <div className="flex h-28 items-center justify-center bg-sand font-script text-3xl text-copper">
        {reward.category}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-serif text-xl leading-snug font-semibold">{reward.title}</h3>
        <p className="mt-auto text-sm text-cocoa">
          <span className="font-serif text-2xl font-medium text-copper">
            {formatPoints(reward.points)}
          </span>{" "}
          poin
        </p>
        {short > 0 ? (
          <p className="rounded-full border border-line py-2.5 text-center text-[12px] tracking-[1.5px] text-cocoa-muted uppercase">
            Kurang {formatPoints(short)} poin
          </p>
        ) : (
          <a
            href={redeemLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-espresso py-2.5 text-center text-[12px] tracking-[1.5px] text-ivory-soft uppercase transition-colors hover:bg-copper hover:text-ivory"
          >
            Tukar Poin
          </a>
        )}
      </div>
    </article>
  );
}
