import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Promo } from "@/components/sections/Promo";
import { About } from "@/components/sections/About";
import { MenuShowcase } from "@/components/sections/MenuShowcase";
import { Facilities } from "@/components/sections/Facilities";
import { Happenings } from "@/components/sections/Happenings";
import { Reservation } from "@/components/sections/Reservation";
import { Membership } from "@/components/sections/Membership";
import { Location } from "@/components/sections/Location";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Promo />
        <About />
        <MenuShowcase />
        <Facilities />
        <Happenings />
        <Reservation />
        <Membership />
        <Location />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
