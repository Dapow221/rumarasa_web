const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export type SubmitResult =
  | { ok: true }
  /** `retryable` = the server couldn't take it (down, busy, rate-limited), so
   *  the visitor should fall back to WhatsApp rather than fix their input. */
  | { ok: false; message: string; retryable: boolean };

/**
 * Posts a public form (member signup, reservation) to the API. Error messages
 * are Indonesian and meant to be shown as-is under the form.
 */
export async function submitForm(
  path: string,
  body: Record<string, unknown>,
  messages: { conflict?: string } = {},
): Promise<SubmitResult> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return { ok: false, retryable: true, message: "Tidak bisa terhubung ke server." };
  }
  if (res.ok) return { ok: true };

  switch (res.status) {
    case 409:
      return { ok: false, retryable: false, message: messages.conflict ?? "Data ini sudah terdaftar." };
    case 400:
      return {
        ok: false,
        retryable: false,
        message: "Mohon periksa kembali data Anda — nomor telepon, email, dan tanggal harus valid.",
      };
    case 429:
      return { ok: false, retryable: true, message: "Terlalu banyak percobaan. Silakan coba lagi nanti." };
    default:
      return { ok: false, retryable: true, message: "Server sedang bermasalah." };
  }
}
