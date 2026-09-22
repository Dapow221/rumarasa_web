import type { TierId } from "@/lib/membership";

const medal: Record<TierId, { ring: string; face: string; mark: string }> = {
  silver: { ring: "#b9b4ab", face: "#e6e2da", mark: "#8c867b" },
  gold: { ring: "#c8953f", face: "#f2d9a4", mark: "#a0702a" },
  platinum: { ring: "#4a3826", face: "#8a6e50", mark: "#f5e9d7" },
};

/** Medallion with a kawung-style mark, tinted per tier. */
export function TierBadge({ tier, size = 56 }: { tier: TierId; size?: number }) {
  const c = medal[tier];
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" aria-hidden="true">
      <circle cx="28" cy="28" r="26" fill={c.ring} />
      <circle cx="28" cy="28" r="21.5" fill={c.face} />
      <circle cx="28" cy="28" r="18.5" fill="none" stroke={c.ring} strokeWidth="0.8" strokeDasharray="1.5 2" />
      <g fill={c.mark}>
        <ellipse cx="28" cy="20" rx="3.6" ry="6" />
        <ellipse cx="28" cy="36" rx="3.6" ry="6" />
        <ellipse cx="20" cy="28" rx="6" ry="3.6" />
        <ellipse cx="36" cy="28" rx="6" ry="3.6" />
      </g>
      <circle cx="28" cy="28" r="2" fill={c.face} />
    </svg>
  );
}
