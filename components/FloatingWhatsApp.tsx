import { waOrderLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/icons";

export function FloatingWhatsApp() {
  return (
    <a
      href={waOrderLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 md:right-7 md:bottom-7"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
