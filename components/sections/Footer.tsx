import Image from "next/image";
import { siteConfig, waOrderLink } from "@/lib/site";
import { InstagramIcon, TikTokIcon } from "@/components/ui/icons";
import logo from "@/public/logo_rumarasa.png";

const footerLinks = [
  { href: "#promo", label: "Promo" },
  { href: "#menu", label: "Menu" },
  { href: "#reservasi", label: "Reservasi" },
  { href: "#member", label: "Member" },
  { href: waOrderLink, label: "WhatsApp", external: true },
];

export function Footer() {
  return (
    <footer className="bg-espresso-deep px-5 pt-12 pb-10 text-khaki md:px-14 md:pt-14">
      <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-5 text-center">
        <Image
          src={logo}
          alt="Rumarasa Nusantara"
          className="h-[72px] w-[72px] object-cover brightness-150 md:h-[88px] md:w-[88px]"
          style={{ objectPosition: "center 32%" }}
          sizes="88px"
        />
        <p className="font-serif text-xl tracking-[3px] text-ivory-muted md:text-[22px]">
          RUMARASA NUSANTARA
        </p>
        <nav className="flex flex-wrap justify-center gap-x-7 gap-y-3 text-[12.5px] tracking-[1.5px] uppercase">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-khaki transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="mt-1 flex gap-4">
          <a
            href={siteConfig.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-espresso-line text-tan transition-colors hover:border-gold hover:text-gold"
          >
            <InstagramIcon />
          </a>
          <a
            href={siteConfig.links.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-espresso-line text-tan transition-colors hover:border-gold hover:text-gold"
          >
            <TikTokIcon />
          </a>
        </div>
        <p className="text-[13px] font-light text-bronze">
          © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.tagline}{" "}
          · Jakarta Selatan
        </p>
      </div>
    </footer>
  );
}
