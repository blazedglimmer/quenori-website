/**
 * Writes the static logo suite to public/brand and the favicon to app/.
 * Run with: npm run brand:export
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { BRAND_COLORS, markSvg, wordmarkSvg } from "../lib/brand/svg.ts";

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
out("app/icon.svg", markSvg({ radius: 34 }));
