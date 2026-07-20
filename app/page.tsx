import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Promo } from "@/components/sections/Promo";
import { About } from "@/components/sections/About";
import { MenuBook } from "@/components/sections/MenuBook";
import { MenuShowcase } from "@/components/sections/MenuShowcase";
import { Venue } from "@/components/sections/Venue";
import { Facilities } from "@/components/sections/Facilities";
import { Happenings } from "@/components/sections/Happenings";
import { Reservation } from "@/components/sections/Reservation";
import { Membership } from "@/components/sections/Membership";
import { Location } from "@/components/sections/Location";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { getPageData } from "@/lib/api";

export default async function HomePage() {
  const d = await getPageData();

  return (
    <>
      <Navbar waOrderLink={d.site.waOrderLink} />
      <main>
        <Hero content={d.content} site={d.site} />
        <Promo promos={d.promos} waOrderLink={d.site.waOrderLink} />
        <About content={d.content} />
        <MenuBook />
        <MenuShowcase foods={d.foods} beverages={d.beverages} />
        <Venue content={d.content} site={d.site} />
        <Facilities facilities={d.facilities} />
        <Happenings happenings={d.happenings} />
        <Reservation phone={d.site.phone} whatsappNumber={d.site.whatsappNumber} />
        <Membership memberBenefits={d.memberBenefits} whatsappNumber={d.site.whatsappNumber} />
        <Location site={d.site} content={d.content} />
      </main>
      <Footer site={d.site} />
      <FloatingWhatsApp whatsappNumber={d.site.whatsappNumber} name={d.site.name} />
    </>
  );
}
