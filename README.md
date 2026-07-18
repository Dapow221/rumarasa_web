# Rumarasa Nusantara

Marketing site for Rumarasa Nusantara — *Taste of Authenticity*. Built with
Next.js (App Router), TypeScript, and Tailwind CSS 4.

## Development

```bash
bun install
bun dev        # http://localhost:3000
bun run build  # production build
bun run typecheck
```

## Structure

```
app/                  # App Router: layout (fonts, metadata), page, globals
components/
  sections/           # One component per landing-page section
  ui/                 # Shared primitives (ImagePlaceholder, SectionHeading, icons)
lib/
  site.ts             # Site config: contact, hours, links, WhatsApp deep links
  content.ts          # Typed content: menu, promos, facilities, events
```

## Notes

- All sections are React Server Components except `Navbar` (mobile menu) and
  `MenuShowcase` (category tabs + slider), keeping the client bundle minimal.
- Photography is not wired up yet: `ImagePlaceholder` marks every image slot.
  Replace each with `next/image` once assets exist — keep the wrapper sizes.
- All copy and business data live in `lib/` so content edits never touch
  component code (and can later be swapped for a CMS or API).
