"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navLinks, waOrderLink } from "@/lib/site";
import logo from "@/public/logo_rumarasa.png";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-5 py-3 md:px-14">
        <Link
          href="#atas"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Image
            src={logo}
            alt="Rumarasa Nusantara"
            className="h-11 w-11 object-cover mix-blend-multiply md:h-[52px] md:w-[52px]"
            style={{ objectPosition: "center 30%" }}
            priority
            sizes="52px"
          />
          <span className="font-serif text-lg font-semibold tracking-[2.5px] text-espresso md:text-[21px]">
            RUMARASA <span className="text-copper">NUSANTARA</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 text-sm tracking-[1.2px] uppercase lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-espresso-line transition-colors hover:text-copper"
            >
              {link.label}
            </a>
          ))}
          <a
            href={waOrderLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-espresso px-5 py-2.5 tracking-[1.5px] whitespace-nowrap text-ivory-soft transition-colors hover:bg-copper hover:text-ivory"
          >
            Pesan · Order
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-px w-6 bg-espresso transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-espresso transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="flex flex-col gap-1 border-t border-line px-5 pt-2 pb-5 lg:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-2 text-sm tracking-[1.2px] text-espresso-line uppercase"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={waOrderLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 self-start rounded-full bg-espresso px-6 py-3 text-sm tracking-[1.5px] uppercase text-ivory-soft"
          >
            Pesan · Order
          </a>
        </div>
      )}
    </nav>
  );
}
