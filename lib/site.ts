export const site = {
  name: "Quenori",
  url: "https://quenori.com",
  tagline: "Ideas grow into products.",
  description:
    "An independent product studio building digital experiences, useful tools and technology for the future.",
  /**
   * TODO: confirm the public contact address before launch.
   * Set to null to hide the contact link everywhere.
   */
  contactEmail: "hello@quenori.com" as string | null,
  /** Only add entries with real, verified URLs. Empty = section hidden. */
  social: [] as { label: string; href: string }[],
  nav: [
    { label: "Products", href: "/#products" },
    { label: "Philosophy", href: "/#philosophy" },
    { label: "About", href: "/#about" },
    { label: "Brand", href: "/brand" },
  ],
} as const;
