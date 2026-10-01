const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

/** What the API shows a link holder; code and name appear once redeemed. */
export interface LinkVoucher {
  amount: number;
  expires_at: string | null;
  note: string;
  status: "active" | "expired" | "redeemed" | "void";
  code: string | null;
  recipient_name: string | null;
  redeemed_at: string | null;
}

const linkPath = (token: string) => `${API_URL}/api/v1/vouchers/link/${encodeURIComponent(token)}`;

export async function fetchLinkVoucher(token: string): Promise<LinkVoucher | "missing" | "error"> {
  try {
    const res = await fetch(linkPath(token), { cache: "no-store" });
    if (res.status === 404) return "missing";
    if (!res.ok) return "error";
    return ((await res.json()) as { data: LinkVoucher }).data;
  } catch {
    return "error";
  }
}

export type RedeemResult = { ok: true; voucher: LinkVoucher } | { ok: false; message: string };

const conflictMessages: Record<string, string> = {
  already_redeemed: "Voucher ini sudah dipakai.",
  expired: "Voucher ini sudah kedaluwarsa.",
  voided: "Voucher ini sudah tidak berlaku.",
};

export async function redeemLinkVoucher(token: string, body: Record<string, unknown>): Promise<RedeemResult> {
  let res: Response;
  try {
    res = await fetch(`${linkPath(token)}/redeem`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return { ok: false, message: "Tidak bisa terhubung ke server. Coba lagi." };
  }
  if (res.ok) return { ok: true, voucher: ((await res.json()) as { data: LinkVoucher }).data };

  switch (res.status) {
    case 400:
      return { ok: false, message: "Mohon periksa kembali nama, email, dan nomor WhatsApp Anda." };
    case 404:
      return { ok: false, message: "Voucher tidak ditemukan." };
    case 409: {
      const json = (await res.json().catch(() => null)) as { error?: { code?: string } } | null;
      return { ok: false, message: conflictMessages[json?.error?.code ?? ""] ?? "Voucher tidak bisa dipakai." };
    }
    case 429:
      return { ok: false, message: "Terlalu banyak percobaan. Silakan coba lagi nanti." };
    default:
      return { ok: false, message: "Terjadi kesalahan. Silakan coba lagi." };
  }
}
