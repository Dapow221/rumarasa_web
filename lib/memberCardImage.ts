import { medal } from "@/components/membership/TierBadge";
import { cardThemes, memberSince, type MemberCardData } from "@/lib/memberCard";
import { getTier } from "@/lib/membership";

const WIDTH = 1012;
const HEIGHT = 638;
const PAD = 56;

/** The page's own next/font families, so the PNG matches the card on screen. */
function fontFamily(variable: string, fallback: string): string {
  return getComputedStyle(document.body).getPropertyValue(variable).trim() || fallback;
}


/** Same kawung medallion as TierBadge, drawn at (cx, cy) with radius r. */
function drawMedal(ctx: CanvasRenderingContext2D, card: MemberCardData, cx: number, cy: number, r: number) {
  const c = medal[card.tier];
  const s = r / 26;
  const circle = (radius: number, fill: string) => {
    ctx.beginPath();
    ctx.arc(cx, cy, radius * s, 0, Math.PI * 2);
    ctx.fillStyle = fill;
    ctx.fill();
  };
  circle(26, c.ring);
  circle(21.5, c.face);
  ctx.fillStyle = c.mark;
  for (const [dx, dy, rx, ry] of [[0, -8, 3.6, 6], [0, 8, 3.6, 6], [-8, 0, 6, 3.6], [8, 0, 6, 3.6]]) {
    ctx.beginPath();
    ctx.ellipse(cx + dx * s, cy + dy * s, rx * s, ry * s, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  circle(2, c.face);
}

/** Renders the membership card to a PNG the member can keep in their gallery. */
export async function renderMemberCardPng(card: MemberCardData): Promise<Blob> {
  await document.fonts.ready;
  const serif = fontFamily("--font-cormorant", "serif");
  const script = fontFamily("--font-great-vibes", "cursive");
  const sans = fontFamily("--font-jost", "sans-serif");
  const theme = cardThemes[card.tier];

  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d")!;

  ctx.beginPath();
  ctx.roundRect(0, 0, WIDTH, HEIGHT, 44);
  ctx.clip();
  const bg = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  bg.addColorStop(0, theme.from);
  bg.addColorStop(1, theme.to);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);


  drawMedal(ctx, card, WIDTH - PAD - 44, PAD + 44, 44);

  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = theme.text;
  ctx.font = `600 30px ${serif}`;
  ctx.letterSpacing = "4px";
  ctx.fillText("RUMARASA NUSANTARA", PAD, PAD + 34);
  ctx.letterSpacing = "0px";
  ctx.fillStyle = theme.accent;
  ctx.font = `42px ${script}`;
  ctx.fillText("Keluarga Rumarasa", PAD, PAD + 80);

  ctx.font = `22px ${sans}`;
  ctx.letterSpacing = "6px";
  ctx.fillText(`${getTier(card.tier).name.toUpperCase()} MEMBER`, PAD, HEIGHT - 196);
  ctx.letterSpacing = "0px";
  ctx.fillStyle = theme.text;
  ctx.font = `500 58px ${serif}`;
  ctx.fillText(card.name, PAD, HEIGHT - 128, WIDTH - PAD * 2);
  ctx.font = `36px ${sans}`;
  ctx.letterSpacing = "8px";
  ctx.fillText(card.member_no, PAD, HEIGHT - PAD);
  ctx.letterSpacing = "2px";
  ctx.fillStyle = theme.accent;
  ctx.font = `22px ${sans}`;
  ctx.textAlign = "right";
  ctx.fillText(`Sejak ${memberSince(card.joined_at)}`, WIDTH - PAD, HEIGHT - PAD);

  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("canvas export failed"))), "image/png"),
  );
}
