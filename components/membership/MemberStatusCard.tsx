import { formatPoints, formatRupiah, getTier, nextTier, type Member } from "@/lib/membership";
import { TierBadge } from "./TierBadge";

export function MemberStatusCard({ member }: { member: Member }) {
  const tier = getTier(member.tier);
  const next = nextTier(member.tier);
  const progress = next ? Math.min(100, Math.round((member.yearSpend / next.threshold) * 100)) : 100;

  return (
    <section className="grid overflow-hidden border border-line bg-cream-card md:grid-cols-[1.1fr_1fr]">
      <div className="flex flex-col gap-6 bg-espresso p-7 text-ivory md:p-9">
        <div className="flex items-center justify-between">
          <p className="font-serif text-lg tracking-[2.5px]">
            RUMARASA <span className="text-gold">NUSANTARA</span>
          </p>
          <TierBadge tier={tier.id} size={48} />
        </div>
        <div>
          <p className="font-script text-2xl text-gold">Selamat datang kembali,</p>
          <p className="font-serif text-3xl font-medium md:text-4xl">{member.name}</p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-[13px] tracking-[1.5px] text-khaki uppercase">
          <span>Member {tier.name}</span>
          <span>No. {member.memberId}</span>
          <span>Sejak {member.joinedAt}</span>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-6 p-7 md:p-9">
        <div>
          <p className="text-[13px] tracking-[1.5px] text-cocoa-muted uppercase">Poin Anda</p>
          <p className="font-serif text-5xl font-medium text-copper">{formatPoints(member.points)}</p>
        </div>
        <div>
          <div className="flex justify-between text-[13px] text-cocoa">
            <span>Belanja tahun ini {formatRupiah(member.yearSpend)}</span>
            {next && <span>{formatRupiah(next.threshold)}</span>}
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-sand">
            <div className="h-full rounded-full bg-copper" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2.5 text-sm font-light text-cocoa">
            {next
              ? `${formatRupiah(next.threshold - member.yearSpend)} lagi menuju ${next.name}.`
              : "Anda berada di tingkat tertinggi."}{" "}
            <em className="text-cocoa-muted">Tingkat dihitung ulang setiap 1 Januari.</em>
          </p>
        </div>
      </div>
    </section>
  );
}
