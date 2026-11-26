# quenori.com

The official website and brand system for Quenori, an independent product studio.

Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS 4. Every route is statically prerendered.

```bash
npm run dev           # http://localhost:3000
npm run build
npm run brand:export    # regenerate public/brand/*.svg and letter SVGs from the glyph data
npm run brand:favicons  # regenerate the pixel-tuned favicon set, app/favicon.ico and app/icon.svg
```

`brand:favicons` renders PNGs with a local Chrome. Set `CHROME_PATH` if it isn't at the default macOS location.

## Where things live

| Path | What |
| --- | --- |
| `lib/brand/glyphs.ts` | **The logo.** The seven letterforms as path data on a shared grid, plus the two stroke weights. Every logo rendering comes from this file. |
| `lib/brand/favicon.ts` | Pixel-tuned favicon drawings: a simplified crowned q for 16 and 32px, the full symbol from 48px up. |
| `lib/brand/svg.ts` | String SVG builders used by the asset export, OG image and app icons. |
| `components/brand/` | `Wordmark` (primary / simplified, optional draw-on animation), `Mark` (compact q-tree), `Glyph` (single letter). |
| `lib/products.ts` | Product ecosystem config. |
| `lib/site.ts` | Site name, nav, contact email, social links. |
| `components/sections/` | Hero, Products, Philosophy, About. |
| `app/brand/` | Brand guidelines page (`/brand`). |

## Adding a product

Add one entry to `lib/products.ts`. The products section, philosophy diagram, footer and JSON-LD pick it up automatically. Live products are featured; give them an `identity` (their own mark, colours, typeface and a product view) and they are shown exactly as on their own site, inside Quenori's frame. Products that aren't live appear in the compact "In development" list. Leave `tagline`, `description` and `category` as `null` until they are announced.

## Changing the logo

Edit the paths in `lib/brand/glyphs.ts`, then run `npm run brand:export`. If the q or the symbol changed, also update `lib/brand/favicon.ts` and run `npm run brand:favicons`.

## Before launch

- Confirm `contactEmail` in `lib/site.ts` receives mail (set it to `null` to hide every contact link).
- Add verified social URLs to `site.social` (the section stays hidden while it's empty).
- Replace the placeholder Privacy Policy and Terms of Service pages.
- Fill in Prices, Gameplay and AI Coding Agent details in `lib/products.ts`.
