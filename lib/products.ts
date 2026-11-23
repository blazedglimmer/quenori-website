/**
 * The Quenori product ecosystem.
 *
 * Adding a product = adding one entry here. The products index, the
 * philosophy diagram, the footer and the sitemap all read from this list,
 * and every product gets a generated thumbnail from its slug + accent.
 *
 * Only write what is actually known. Unknown fields stay null and render
 * as neutral placeholders instead of invented copy.
 */

export type ProductStatus = "live" | "coming-soon";

export type Product = {
  slug: string;
  name: string;
  /** Short line in the product's own words. null = not announced yet. */
  tagline: string | null;
  description: string | null;
  category: string | null;
  status: ProductStatus;
  /** Subdomain URL. Only linked when status is "live". */
  url: string;
  /** Product accent, drawn from the Quenori earth palette. */
  accent: string;
};

export const products: Product[] = [
  {
    slug: "lifvara",
    name: "Lifvara",
    // Copy taken from lifvara.quenori.com (title + meta description).
    tagline: "Your whole day, on one page.",
    description:
      "Lifvara keeps your time, habits, notes, money and nutrition in one calm place, and puts what matters today on a single page.",
    category: "Personal productivity",
    status: "live",
    url: "https://lifvara.quenori.com",
    accent: "#a9bf8e", // sage
  },
  {
    slug: "prices",
    name: "Prices",
    tagline: null, // TODO: add once announced
    description: null,
    category: null,
    status: "coming-soon",
    url: "https://prices.quenori.com",
    accent: "#d2a45b", // ochre
  },
  {
    slug: "gameplay",
    name: "Gameplay",
    tagline: null, // TODO: add once announced
    description: null,
    category: null,
    status: "coming-soon",
    url: "https://gameplay.quenori.com",
    accent: "#c9785a", // clay
  },
  {
    slug: "aicodingagent",
    name: "AI Coding Agent",
    tagline: null, // TODO: add once announced
    description: null,
    // Inferred from the product name only — confirm.
    category: "Developer tools",
    status: "coming-soon",
    url: "https://aicodingagent.quenori.com",
    accent: "#7fa3b5", // lake
  },
];

export const statusLabel: Record<ProductStatus, string> = {
  live: "Live",
  "coming-soon": "Coming soon",
};

export function productHost(product: Product) {
  return product.url.replace(/^https?:\/\//, "");
}
