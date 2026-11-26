/**
 * The Quenori product ecosystem.
 *
 * Adding a product = adding one entry here. The products section, the
 * philosophy diagram, the footer and the structured data all read from it.
 *
 *  - Live products are featured. If a product has an `identity`, it is shown
 *    in its own colours, mark and typeface — Quenori only provides the frame.
 *  - Products that are not live are listed compactly as "in development".
 *
 * Only write what is actually known. Unknown fields stay null and render as
 * neutral placeholders instead of invented copy.
 */

export type ProductStatus = "live" | "in-development";

/** A product's own visual identity, taken from its live site. */
export type ProductIdentity = {
  /** The product's own mark, under /public. */
  mark: string;
  /** Surface and text colours from the product's own site. */
  background: string;
  foreground: string;
  muted: string;
  /** Display typeface key (see `productFonts` in app/layout.tsx). */
  displayFont?: "newsreader";
  /** A real view of the product, under /public. */
  preview?: { src: string; width: number; height: number; alt: string };
};

export type Product = {
  slug: string;
  name: string;
  /** Short line in the product's own words. null = not announced yet. */
  tagline: string | null;
  description: string | null;
  category: string | null;
  /** The product's own list of what it covers, verbatim from its site. */
  highlights?: string[];
  status: ProductStatus;
  /** Subdomain URL. Only linked when status is "live". */
  url: string;
  identity?: ProductIdentity;
};

export const products: Product[] = [
  {
    slug: "lifvara",
    name: "Lifvara",
    // Copy taken from the hero of lifvara.quenori.com (checked 2026-11-23).
    tagline: "Your whole day, on one page.",
    description:
      "Lifvara keeps your time, habits, notes, money and meals in one calm place. Today puts them together, so you can see how the day is going without opening five apps.",
    // Lifvara doesn't name a category on its site, meta or manifest; left
    // empty until it does.
    category: null,
    highlights: ["Time", "Habits", "Notes", "Money", "Nutrition"],
    status: "live",
    url: "https://lifvara.quenori.com",
    identity: {
      mark: "/products/lifvara/mark.svg",
      background: "#faf9f7",
      foreground: "#1b1f27",
      muted: "#5f6168",
      displayFont: "newsreader",
      preview: {
        src: "/products/lifvara/today.png",
        width: 2272,
        height: 932,
        // From Lifvara's public landing page, where it is labelled as example
        // data (fictional person "Alex", sample entries). No customer data.
        alt: "Lifvara’s Today page with example data: a paused focus session, time logged today, habits and what’s coming up.",
      },
    },
  },
  {
    slug: "prices",
    name: "Prices",
    tagline: null, // TODO: add once announced
    description: null,
    category: null,
    status: "in-development",
    url: "https://prices.quenori.com",
  },
  {
    slug: "gameplay",
    name: "Gameplay",
    tagline: null, // TODO: add once announced
    description: null,
    category: null,
    status: "in-development",
    url: "https://gameplay.quenori.com",
  },
  {
    slug: "aicodingagent",
    name: "AI Coding Agent",
    tagline: null, // TODO: add once announced
    description: null,
    category: null, // TODO: add once positioning is announced
    status: "in-development",
    url: "https://aicodingagent.quenori.com",
  },
];

export const statusLabel: Record<ProductStatus, string> = {
  live: "Live",
  "in-development": "In development",
};

export const liveProducts = products.filter((p) => p.status === "live");
export const upcomingProducts = products.filter((p) => p.status !== "live");

export function productHost(product: Product) {
  return product.url.replace(/^https?:\/\//, "");
}
