export const site = {
  name: "Quenori",
  /**
   * Canonical origin. Every absolute URL (canonical, Open Graph, sitemap,
   * robots, JSON-LD) is built from this. The bare quenori.com 308-redirects
   * here at the Vercel domain level.
   */
  url: "https://www.quenori.com",
  tagline: "Ideas grow into products.",
  description:
    "An independent product studio building digital experiences, useful tools and technology for the future.",
  /**
   * Public contact address (unverified), shown in the footer and legal pages.
   * Set to null to hide every contact link.
   */
  contactEmail: "remote.dev.codes@gmail.com" as string | null,
  /** Only add entries with real, verified URLs. Empty = section hidden. */
  social: [] as { label: string; href: string }[],
  /**
   * Primary navigation. Contact is deliberately not here until the contact
   * address is verified; it appears in the footer while contactEmail is set.
   */
  nav: [
    { label: "Products", href: "/#products" },
    { label: "Philosophy", href: "/#philosophy" },
    { label: "About", href: "/#about" },
    { label: "Brand", href: "/brand" },
  ],
} as const;
