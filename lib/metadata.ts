import type { Metadata } from "next";
import { site } from "@/lib/site";

const defaultTitle = `${site.name} — ${site.tagline}`;

/**
 * The shared social card rendered by app/opengraph-image.tsx. A page that sets
 * its own `openGraph`/`twitter` no longer inherits the root file-based image,
 * so it is referenced explicitly.
 */
const socialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: defaultTitle,
};

/**
 * Canonical, Open Graph and Twitter metadata for one route.
 *
 * Next.js merges metadata shallowly, so a page that sets only `alternates`
 * would otherwise inherit the root layout's `openGraph` and `twitter` objects,
 * with the homepage's URL and title. Paths are resolved against `metadataBase`
 * (site.url) in the root layout.
 */
export function pageMetadata({
  path,
  title,
  description = site.description,
}: {
  path: `/${string}`;
  title?: string;
  description?: string;
}): Metadata {
  const fullTitle = title ? `${title} — ${site.name}` : defaultTitle;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en",
      url: path,
      title: fullTitle,
      description,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [socialImage],
    },
  };
}
