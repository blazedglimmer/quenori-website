export const site = {
  name: "Quenori",
  url: "https://quenori.com",
  tagline: "Ideas grow into products.",
  description:
    "An independent product studio building digital experiences, useful tools and technology for the future.",
  /**
   * Public contact address, shown in the header, footer and legal pages.
   * Set to null to hide every contact link.
   */
  contactEmail: "remote.dev.codes@gmail.com" as string | null,
  /** Only add entries with real, verified URLs. Empty = section hidden. */
  social: [] as { label: string; href: string }[],
  /** Primary navigation. The brand guidelines live in the footer. */
  nav: [
    { label: "Products", href: "/#products" },
    { label: "Philosophy", href: "/#philosophy" },
    { label: "About", href: "/#about" },
  ],
} as const;
