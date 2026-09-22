import { MemberDialog } from "@/components/sections/MemberDialog";

export function JoinCallout({ whatsappNumber }: { whatsappNumber: string }) {
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <p className="font-serif text-xl leading-relaxed text-espresso md:text-2xl">
        Mulai nikmati lebih banyak keistimewaan hari ini.
        <br />
        <span className="text-cocoa">Naik tingkat, rasakan lebih banyak privilese.</span>
      </p>
      <MemberDialog
        whatsappNumber={whatsappNumber}
        label="Daftar Gratis via WhatsApp"
        triggerClassName="cursor-pointer rounded-full bg-copper px-8 py-3.5 text-sm tracking-[2px] whitespace-nowrap text-ivory uppercase transition-colors hover:bg-copper-light"
      />
    </div>
  );
}
