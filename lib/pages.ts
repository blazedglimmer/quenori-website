/**
 * Every public page route on www.quenori.com and whether search engines
 * should index it. This is the single source of truth for indexing:
 *
 * - `pageMetadata()` (lib/metadata.ts) emits `noindex, follow` for pages
 *   marked `indexable: false`, and no robots tag at all for indexable ones.
 * - `app/sitemap.ts` lists only indexable pages.
 *
 * When adding a page route, add it here as well. `pageMetadata()` only
 * accepts paths listed here, so a missing entry fails the type check.
 *
 * Product subdomains (lifvara.quenori.com etc.) are separate sites with their
 * own sitemaps and do not belong here.
 */
export const pages = {
  "/": { indexable: true },
  "/brand": { indexable: true },
  // Placeholders until the reviewed legal text is published. To publish,
  // set `indexable: true` (see "Publishing the legal pages" in README.md).
  "/privacy": { indexable: false },
  "/terms": { indexable: false },
} as const satisfies Record<`/${string}`, { indexable: boolean }>;

export type PagePath = keyof typeof pages;

export function isIndexable(path: PagePath): boolean {
  return pages[path].indexable;
}

export const indexablePaths: PagePath[] = (Object.keys(pages) as PagePath[]).filter(isIndexable);
