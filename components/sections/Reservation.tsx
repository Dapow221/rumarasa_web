interface ReservationProps {
  phone: string;
  waOrderLink: string;
}

export function Reservation({ phone, waOrderLink }: ReservationProps) {
  return (
    <section id="reservasi" className="scroll-mt-20 bg-sand px-5 py-16 md:px-14 md:py-24">
      <div className="mx-auto flex max-w-[900px] flex-col items-center gap-4 text-center md:gap-[18px]">
        <p className="font-script text-2xl text-copper md:text-[28px]">
          Reservasi
        </p>
        <h2 className="font-serif text-3xl font-medium text-balance md:text-[46px]">
          Amankan Meja Anda Malam Ini
        </h2>
        <p className="max-w-[540px] text-[15px] leading-[1.75] font-light text-cocoa md:text-base">
          Reservasi dan pemesanan tercepat melalui WhatsApp — balasan dalam
          hitungan menit selama jam operasional.{" "}
          <em className="text-cocoa-muted">
            Book a table or order ahead via WhatsApp.
          </em>
        </p>
        <div className="mt-2.5 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a
            href={waOrderLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-espresso px-9 py-4 text-sm tracking-[2px] whitespace-nowrap text-ivory-soft uppercase transition-colors hover:bg-copper hover:text-ivory"
          >
            Reservasi WhatsApp
          </a>
          <a
            href={`tel:${phone}`}
            className="rounded-full border border-tan-dark px-9 py-4 text-sm tracking-[2px] whitespace-nowrap text-walnut uppercase transition-colors hover:bg-line hover:text-espresso-line"
          >
            Telepon Kami
          </a>
        </div>
      </div>
    </section>
  );
}
