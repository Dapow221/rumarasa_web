import { TierBadge } from "@/components/membership/TierBadge";
import { cardThemes, memberSince, type MemberCardData } from "@/lib/memberCard";
import { getTier } from "@/lib/membership";

/** Credit-card-sized membership card, coloured by tier. */
export function MembershipCard({ card }: { card: MemberCardData }) {
  const theme = cardThemes[card.tier];
  const inactive = card.status !== "active";

  return (
    <div
      className="relative aspect-[1.586] w-full overflow-hidden rounded-2xl p-5 text-left shadow-[0_18px_40px_-18px_rgba(42,27,16,0.55)] sm:p-6"
      style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`, color: theme.text }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="leading-tight">
          <p className="font-serif text-[15px] font-semibold tracking-[2px]">RUMARASA NUSANTARA</p>
          <p className="font-script text-xl" style={{ color: theme.accent }}>
            Keluarga Rumarasa
          </p>
        </div>
        <TierBadge tier={card.tier} size={44} />
      </div>

      <div className="absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6">
        <p className="text-[11px] tracking-[3px] uppercase" style={{ color: theme.accent }}>
          {getTier(card.tier).name} Member
        </p>
        <p className="mt-1 truncate font-serif text-2xl font-medium sm:text-[28px]">{card.name}</p>
        <div className="mt-2 flex items-end justify-between gap-3">
          <p className="text-lg tracking-[4px] tabular-nums">{card.member_no}</p>
          <p className="text-[11px] tracking-[1px]" style={{ color: theme.accent }}>
            Sejak {memberSince(card.joined_at)}
          </p>
        </div>
      </div>

      {inactive && (
        <div className="absolute inset-0 flex items-center justify-center bg-espresso/60">
          <p className="rounded-full border border-ivory/70 px-5 py-2 text-sm tracking-[3px] text-ivory uppercase">
            Tidak Aktif
          </p>
        </div>
      )}
    </div>
  );
}
