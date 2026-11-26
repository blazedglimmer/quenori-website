/**
 * Writes the static logo suite to public/brand and the favicon to app/.
 * Run with: npm run brand:export
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { glyphs } from "../lib/brand/glyphs.ts";
import { BRAND_COLORS, letterSvg, markSvg, wordmarkSvg } from "../lib/brand/svg.ts";

const root = new URL("..", import.meta.url).pathname;
const out = (p: string, svg: string) => {
  writeFileSync(join(root, p), svg + "\n");
  console.log("wrote", p);
};
const { ink, paper, lichen, moss } = BRAND_COLORS;

out("public/brand/quenori-wordmark-dark.svg", wordmarkSvg({ color: paper, leaf: lichen }));
out("public/brand/quenori-wordmark-light.svg", wordmarkSvg({ color: ink, leaf: moss }));
out("public/brand/quenori-wordmark-simplified-dark.svg", wordmarkSvg({ variant: "simplified", color: paper, leaf: lichen }));
out("public/brand/quenori-wordmark-simplified-light.svg", wordmarkSvg({ variant: "simplified", color: ink, leaf: moss }));
out("public/brand/quenori-wordmark-mono-black.svg", wordmarkSvg({ color: "#000000" }));
out("public/brand/quenori-wordmark-mono-white.svg", wordmarkSvg({ color: "#ffffff" }));
out("public/brand/quenori-mark.svg", markSvg());
out("public/brand/quenori-mark-light.svg", markSvg({ color: ink, background: paper }));
out("public/brand/quenori-mark-mono-black.svg", markSvg({ color: "#000000", background: null }));

mkdirSync(join(root, "public/brand/letters"), { recursive: true });
for (const g of glyphs) {
  out(`public/brand/letters/${g.char}-dark.svg`, letterSvg(g.char, { color: paper, leaf: lichen }));
  out(`public/brand/letters/${g.char}-light.svg`, letterSvg(g.char, { color: ink, leaf: moss }));
}
