import type { TierId } from "@/lib/membership";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

/** What a card link shows: no contact details, only what is printed on the card. */
export interface MemberCardData {
  name: string;
  member_no: string;
  tier: TierId;
  status: "pending" | "active" | "rejected" | "suspended";
  joined_at: string;
}

export interface CardTheme {
  from: string;
  to: string;
  text: string;
  accent: string;
}

/** Card colours per tier, shared by the on-screen card and the saved PNG. */
export const cardThemes: Record<TierId, CardTheme> = {
  silver: { from: "#efebe4", to: "#c9c3b8", text: "#2a1b10", accent: "#6f695e" },
  gold: { from: "#f4dfae", to: "#c8953f", text: "#2a1b10", accent: "#7a521c" },
  platinum: { from: "#4a3826", to: "#1c110a", text: "#f5e9d7", accent: "#d9b98a" },
};

/** "2026-10-08T…" → "Okt 2026" */
export function memberSince(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", { month: "short", year: "numeric" });
}

/** Card page for a member, on whichever site the admin is using. */
export function memberCardUrl(token: string): string {
  return `${window.location.origin}/kartu/${token}`;
}

export function memberCardMessage(name: string, memberNo: string, url: string): string {
  return [
    `Halo ${name}, berikut kartu member Keluarga Rumarasa Anda.`,
    `NO MEMBER : ${memberNo}`,
    `KARTU          : ${url}`,
    "",
    "Tunjukkan kartu ini ke kasir setiap berkunjung.",
  ].join("\n");
}

export async function fetchMemberCard(token: string): Promise<MemberCardData | "missing" | "error"> {
  try {
    const res = await fetch(`${API_URL}/api/v1/members/card/${encodeURIComponent(token)}`, { cache: "no-store" });
    if (res.status === 404) return "missing";
    if (!res.ok) return "error";
    return ((await res.json()) as { data: MemberCardData }).data;
  } catch {
    return "error";
  }
}
