import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { medal } from "@/components/membership/TierBadge";
import { cardThemes, memberSince, type MemberCardData } from "@/lib/memberCard";
import { getTier } from "@/lib/membership";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
const WIDTH = 1012;
const HEIGHT = 638;

const font = (file: string) => readFile(join(process.cwd(), "assets/fonts", file));

/** The member's card as a PNG, for the welcome email the API sends. */
export async function GET(_req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!/^[A-Za-z0-9_-]{32}$/.test(token)) return new Response("Not found", { status: 404 });

  const res = await fetch(`${API_URL}/api/v1/members/card/${token}`, { cache: "no-store" });
  if (!res.ok) return new Response("Not found", { status: res.status === 404 ? 404 : 502 });
  const card = ((await res.json()) as { data: MemberCardData }).data;
  const theme = cardThemes[card.tier];
  const m = medal[card.tier];

  const [serif500, serif600, script, sans] = await Promise.all([
    font("CormorantGaramond-Medium.ttf"),
    font("CormorantGaramond-SemiBold.ttf"),
    font("GreatVibes-Regular.ttf"),
    font("Jost-Regular.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 56,
          borderRadius: 44,
          background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
          color: theme.text,
          fontFamily: "Jost",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Cormorant", fontWeight: 600, fontSize: 30, letterSpacing: 4 }}>
              RUMARASA NUSANTARA
            </div>
            <div style={{ fontFamily: "Great Vibes", fontSize: 42, color: theme.accent, marginTop: -4 }}>
              Keluarga Rumarasa
            </div>
          </div>
          <svg width="88" height="88" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="26" fill={m.ring} />
            <circle cx="28" cy="28" r="21.5" fill={m.face} />
            <ellipse cx="28" cy="20" rx="3.6" ry="6" fill={m.mark} />
            <ellipse cx="28" cy="36" rx="3.6" ry="6" fill={m.mark} />
            <ellipse cx="20" cy="28" rx="6" ry="3.6" fill={m.mark} />
            <ellipse cx="36" cy="28" rx="6" ry="3.6" fill={m.mark} />
            <circle cx="28" cy="28" r="2" fill={m.face} />
          </svg>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 22, letterSpacing: 6, color: theme.accent }}>
            {`${getTier(card.tier).name.toUpperCase()} MEMBER`}
          </div>
          <div style={{ fontFamily: "Cormorant", fontWeight: 500, fontSize: 58, marginTop: 4 }}>{card.name}</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 8 }}>
            <div style={{ fontSize: 36, letterSpacing: 8 }}>{card.member_no}</div>
            <div style={{ fontSize: 22, letterSpacing: 2, color: theme.accent }}>
              {`Sejak ${memberSince(card.joined_at)}`}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      headers: { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex" },
      fonts: [
        { name: "Cormorant", data: serif500, weight: 500, style: "normal" },
        { name: "Cormorant", data: serif600, weight: 600, style: "normal" },
        { name: "Great Vibes", data: script, weight: 400, style: "normal" },
        { name: "Jost", data: sans, weight: 400, style: "normal" },
      ],
    },
  );
}
