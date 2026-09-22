import type { Metadata } from "next";
import { MemberHeader } from "@/components/membership/MemberHeader";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { getPageData } from "@/lib/api";

export const metadata: Metadata = {
  title: { default: "Membership", template: "%s · Membership — Rumarasa Nusantara" },
  description: "Keluarga Rumarasa — kumpulkan poin, naik tingkat, dan nikmati benefit eksklusif.",
};

export default async function MembershipLayout({ children }: { children: React.ReactNode }) {
  const d = await getPageData();

  return (
    <>
      <MemberHeader />
      <div className="border-b border-line bg-sand px-5 py-2 text-center text-[12px] tracking-[1.2px] text-cocoa-muted uppercase">
        Prototipe — data member di halaman ini masih contoh
      </div>
      <main className="bg-batik min-h-[70vh] px-5 py-12 md:px-14 md:py-16">
        <div className="mx-auto max-w-[1180px]">{children}</div>
      </main>
      <Footer site={d.site} />
      <FloatingWhatsApp whatsappNumber={d.site.whatsappNumber} name={d.site.name} />
    </>
  );
}
