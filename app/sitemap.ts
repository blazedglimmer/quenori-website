import type { MetadataRoute } from "next";
import { indexablePaths } from "@/lib/pages";
import { site } from "@/lib/site";

/** Indexable pages only; see lib/pages.ts. */
export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePaths.map((path) => ({
    url: path === "/" ? site.url : `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.5,
  }));
}
