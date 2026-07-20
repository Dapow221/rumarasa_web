/** Builds a wa.me deep link with a pre-filled message. */
export function waLink(whatsappNumber: string, message: string): string {
  return `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
}

/**
 * Formats a form submission as a readable WhatsApp message. Blank optional
 * fields are dropped so the restaurant never receives empty lines.
 */
export function formatMessage(title: string, fields: [string, string][]): string {
  const lines = fields
    .filter(([, value]) => value.trim() !== "")
    .map(([label, value]) => `${label}: ${value.trim()}`);
  return `*${title}*\n\n${lines.join("\n")}`;
}

/** `2026-07-19` (native date input) → `19/07/2026`. */
export function formatDate(isoDate: string): string {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  return year && month && day ? `${day}/${month}/${year}` : isoDate;
}
