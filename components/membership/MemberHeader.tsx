"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memberNavLinks } from "@/lib/membership";
import logo from "@/public/logo_rumarasa.png";

export function MemberHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-5 py-3 md:px-14">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logo}
            alt="Rumarasa Nusantara"
            className="h-10 w-10 object-cover mix-blend-multiply md:h-12 md:w-12"
            style={{ objectPosition: "center 30%" }}
            priority
            sizes="48px"
          />
          <span className="hidden font-serif text-lg font-semibold tracking-[2.5px] text-espresso sm:inline md:text-[21px]">
            RUMARASA <span className="text-copper">NUSANTARA</span>
          </span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 text-[13px] tracking-[1.5px] text-espresso-line uppercase transition-colors hover:text-copper"
        >
          <span aria-hidden="true">←</span> Kembali ke Situs
        </Link>
      </div>

      <nav
        aria-label="Menu member"
        className="flex justify-start gap-6 overflow-x-auto px-5 [scrollbar-width:none] md:justify-center md:gap-10 [&::-webkit-scrollbar]:hidden"
      >
        {memberNavLinks.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`border-b-2 pt-1 pb-3 text-[13px] tracking-[1.5px] whitespace-nowrap uppercase transition-colors ${
                active
                  ? "border-copper text-copper"
                  : "border-transparent text-cocoa-muted hover:text-espresso"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
