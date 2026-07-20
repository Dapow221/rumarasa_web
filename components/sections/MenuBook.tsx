"use client";

import Image from "next/image";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const PAGE_COUNT = 40;
const SHEETS = PAGE_COUNT / 2;
const FLIP_MS = 800;

const pageSrc = (n: number) => `/menu-book/${n}.webp`;

/**
 * Self-hosted page-flip book of the full menu (pages in public/menu-book).
 * Desktop gets a 3D two-page flipbook; mobile gets a swipeable single-page
 * strip. Only pages near the current spread are mounted so the 40-page book
 * doesn't load all at once.
 */
export function MenuBook() {
  const [flipped, setFlipped] = useState(0); // sheets already turned: 0..SHEETS
  const [animating, setAnimating] = useState<number | null>(null);

  const turn = (dir: 1 | -1) => {
    const target = flipped + dir;
    if (target < 0 || target > SHEETS) return;
    setAnimating(dir === 1 ? flipped : flipped - 1);
    setFlipped(target);
    setTimeout(() => setAnimating(null), FLIP_MS + 100);
  };

  const pageLabel =
    flipped === 0
      ? "1"
      : flipped === SHEETS
        ? String(PAGE_COUNT)
        : `${2 * flipped}–${2 * flipped + 1}`;

  return (
    <section id="buku-menu" className="bg-batik scroll-mt-20 border-t border-line px-5 py-16 md:px-14 md:py-24">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-10 md:mb-12">
          <SectionHeading eyebrow="Jelajahi menu lengkap" title="Buku Menu" titleEn="Menu Book" />
          <p className="mx-auto mt-2.5 max-w-[520px] text-center text-[15px] font-light text-cocoa">
            Klik sisi kanan atau kiri buku untuk membalik halaman.
          </p>
        </div>

        {/* Desktop: 3D flipbook */}
        <div className="hidden md:block">
          <div className="mx-auto w-full max-w-[820px]" style={{ perspective: "2600px" }}>
            <div
              className="relative transition-transform duration-700 ease-in-out"
              style={{
                aspectRatio: "3110 / 2200",
                transform:
                  flipped === 0
                    ? "translateX(-25%)"
                    : flipped === SHEETS
                      ? "translateX(25%)"
                      : "none",
              }}
            >
              {Array.from({ length: SHEETS }, (_, s) => {
                const isFlipped = s < flipped;
                const mounted = Math.abs(s - flipped) <= 2 || s === animating;
                return (
                  <div
                    key={s}
                    className="absolute top-0 right-0 h-full w-1/2 [transform-style:preserve-3d]"
                    style={{
                      transformOrigin: "left center",
                      transform: isFlipped ? "rotateY(-180deg)" : "rotateY(0deg)",
                      transition: `transform ${FLIP_MS}ms ease-in-out`,
                      zIndex: animating === s ? SHEETS + 10 : isFlipped ? s + 1 : SHEETS - s,
                    }}
                  >
                    <div className="absolute inset-0 overflow-hidden bg-cream-card [backface-visibility:hidden]">
                      {mounted && (
                        <Image
                          src={pageSrc(2 * s + 1)}
                          alt={`Halaman menu ${2 * s + 1}`}
                          fill
                          sizes="410px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div
                      className="absolute inset-0 overflow-hidden bg-cream-card [backface-visibility:hidden]"
                      style={{ transform: "rotateY(180deg)" }}
                    >
                      {mounted && (
                        <Image
                          src={pageSrc(2 * s + 2)}
                          alt={`Halaman menu ${2 * s + 2}`}
                          fill
                          sizes="410px"
                          className="object-cover"
                        />
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Click zones */}
              <button
                type="button"
                aria-label="Halaman sebelumnya"
                onClick={() => turn(-1)}
                className="absolute inset-y-0 left-0 w-1/2 cursor-pointer"
                style={{ zIndex: SHEETS + 20 }}
              />
              <button
                type="button"
                aria-label="Halaman berikutnya"
                onClick={() => turn(1)}
                className="absolute inset-y-0 right-0 w-1/2 cursor-pointer"
                style={{ zIndex: SHEETS + 20 }}
              />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => turn(-1)}
              disabled={flipped === 0}
              aria-label="Sebelumnya"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-tan-dark text-xl text-walnut transition-colors hover:bg-line disabled:cursor-default disabled:opacity-40"
            >
              ←
            </button>
            <p className="min-w-[110px] text-center text-[13px] tracking-[2px] text-cocoa-muted uppercase">
              Hal. {pageLabel} / {PAGE_COUNT}
            </p>
            <button
              type="button"
              onClick={() => turn(1)}
              disabled={flipped === SHEETS}
              aria-label="Berikutnya"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-tan-dark text-xl text-walnut transition-colors hover:bg-line disabled:cursor-default disabled:opacity-40"
            >
              →
            </button>
          </div>
        </div>

        {/* Mobile: swipeable page strip */}
        <div className="md:hidden">
          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {Array.from({ length: PAGE_COUNT }, (_, i) => (
              <Image
                key={i}
                src={pageSrc(i + 1)}
                alt={`Halaman menu ${i + 1}`}
                width={850}
                height={1203}
                sizes="78vw"
                // Only the first spread is worth fetching up front; the rest
                // stream in as the reader swipes.
                loading={i < 2 ? "eager" : "lazy"}
                className="h-auto w-[78vw] flex-none snap-center border border-line bg-cream-card"
              />
            ))}
          </div>
          <p className="mt-3 text-center text-[13px] tracking-[1.5px] text-cocoa-muted uppercase">
            Geser untuk membalik halaman
          </p>
        </div>
      </div>
    </section>
  );
}
