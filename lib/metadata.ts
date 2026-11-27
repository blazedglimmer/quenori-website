import type { Metadata } from "next";
import { isIndexable, type PagePath } from "@/lib/pages";
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
 *
 * Indexing follows lib/pages.ts: non-indexable pages get `noindex, follow`
 * (still crawlable, links still followed, canonical unchanged). Nothing else
 * sets `robots`, so there is never a conflicting tag.
 */
export function pageMetadata({
  path,
  title,
  description = site.description,
}: {
  path: PagePath;
  title?: string;
  description?: string;
}): Metadata {
  const fullTitle = title ? `${title} — ${site.name}` : defaultTitle;
  return {
    ...(title ? { title } : {}),
    description,
    ...(isIndexable(path) ? {} : { robots: { index: false, follow: true } }),
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
