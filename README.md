# quenori.com

The official website and brand system for Quenori, an independent product studio.

Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS 4. Every route is statically prerendered.

```bash
npm run dev           # http://localhost:3000
npm run build
npm run brand:export  # regenerate public/brand/*.svg and app/icon.svg from the glyph data
```

## Where things live

| Path | What |
| --- | --- |
| `lib/brand/glyphs.ts` | **The logo.** The seven letterforms as path data on a shared grid, plus the two stroke weights. Every logo rendering comes from this file. |
| `lib/brand/svg.ts` | String SVG builders used by the asset export, OG image and app icons. |
| `components/brand/` | `Wordmark` (primary / simplified, optional draw-on animation), `Mark` (compact q-tree), `Glyph` (single letter). |
| `lib/products.ts` | Product ecosystem config. |
| `lib/site.ts` | Site name, nav, contact email, social links. |
| `components/sections/` | Hero, Products, Philosophy, About. |
| `app/brand/` | Brand guidelines page (`/brand`). |

## Adding a product

Add one entry to `lib/products.ts`. The product index, philosophy diagram, footer and JSON-LD pick it up automatically, and the thumbnail is generated from the product's slug and accent colour. Leave `tagline`, `description` and `category` as `null` until they are announced; the UI shows neutral placeholders instead.

## Changing the logo

Edit the paths in `lib/brand/glyphs.ts`, then run `npm run brand:export` so the downloadable SVGs and favicon match.

## Before launch

- Confirm `contactEmail` in `lib/site.ts` (currently `hello@quenori.com`, unverified).
- Add verified social URLs to `site.social` (the section stays hidden while it's empty).
- Replace the placeholder Privacy Policy and Terms of Service pages.
- Fill in Prices, Gameplay and AI Coding Agent details in `lib/products.ts`.
