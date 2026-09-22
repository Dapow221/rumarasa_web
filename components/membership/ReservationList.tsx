import type { MemberReservation } from "@/lib/membership";

const statusClass: Record<MemberReservation["status"], string> = {
  Terkonfirmasi: "bg-copper text-ivory",
  Menunggu: "bg-gold/40 text-walnut",
  Selesai: "bg-sand text-cocoa",
  Dibatalkan: "border border-line text-cocoa-muted",
};

function formatLongDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ReservationList({ items }: { items: MemberReservation[] }) {
  if (items.length === 0) {
    return <p className="text-center text-sm font-light text-cocoa">Belum ada reservasi.</p>;
  }

  return (
    <ul className="flex flex-col gap-4">
      {items.map((r) => (
        <li
          key={r.id}
          className="flex flex-col gap-3 border border-line bg-cream-card p-5 sm:flex-row sm:items-center sm:justify-between md:px-7"
        >
          <div>
            <p className="font-serif text-xl font-semibold">{formatLongDate(r.date)}</p>
            <p className="mt-1 text-sm font-light text-cocoa">
              Pukul {r.time} · {r.guests} tamu · {r.area}
              {r.note && <em className="text-cocoa-muted"> · {r.note}</em>}
            </p>
          </div>
          <span
            className={`self-start rounded-full px-4 py-1.5 text-[12px] tracking-[1.5px] uppercase sm:self-center ${statusClass[r.status]}`}
          >
            {r.status}
          </span>
        </li>
      ))}
    </ul>
  );
}
