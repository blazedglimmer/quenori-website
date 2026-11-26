/**
 * Writes the pixel-tuned favicon set:
 *   public/brand/favicon/quenori-icon-{16,32,48,64,128}.{svg,png}
 *   app/favicon.ico  (16, 32 and 48px PNGs)
 *   app/icon.svg     (the 32px-tuned drawing; browsers scale it for tabs)
 *
 * PNGs are rendered at native size by a local Chrome.
 * Run with: npm run brand:favicons   (CHROME_PATH=... if needed)
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { FAVICON_SIZES, faviconSvg, type FaviconSize } from "../lib/brand/favicon.ts";
import { renderPngs } from "./lib/render-png.mjs";

const root = new URL("..", import.meta.url).pathname;
const dir = join(root, "public/brand/favicon");
mkdirSync(dir, { recursive: true });

const png = (size: number) => join(dir, `quenori-icon-${size}.png`);
for (const size of FAVICON_SIZES) {
  writeFileSync(join(dir, `quenori-icon-${size}.svg`), faviconSvg(size) + "\n");
}
await renderPngs(FAVICON_SIZES.map((size) => ({ svg: faviconSvg(size), size, out: png(size) })));
console.log("wrote", FAVICON_SIZES.length, "SVG + PNG pairs");

// ICO with embedded PNGs (supported by every browser that still asks for .ico).
const icoSizes: FaviconSize[] = [16, 32, 48];
const images = icoSizes.map((s) => readFileSync(png(s)));
const header = Buffer.alloc(6 + 16 * images.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
let offset = header.length;
images.forEach((img, i) => {
  const e = 6 + i * 16;
  header.writeUInt8(icoSizes[i], e);
  header.writeUInt8(icoSizes[i], e + 1);
  header.writeUInt8(0, e + 2);
  header.writeUInt8(0, e + 3);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(img.length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += img.length;
});
writeFileSync(join(root, "app/favicon.ico"), Buffer.concat([header, ...images]));
writeFileSync(join(root, "app/icon.svg"), faviconSvg(32) + "\n");
console.log("wrote app/favicon.ico (16, 32, 48) and app/icon.svg");
