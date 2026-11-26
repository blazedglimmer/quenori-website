/**
 * Pixel-tuned favicon designs for the compact crowned-q symbol.
 *
 * Small sizes are not scaled down from the wordmark. Each size uses a
 * drawing made for its pixel grid:
 *
 *   16, 32  — "small": drawn on a 16-unit grid. Two crown lobes and a clear
 *             cleft, trunk on whole pixels, one short root flare. Recognition
 *             of the crowned q comes first; no other detail.
 *   48+     — "full": the compact symbol (MARK) with its four-lobed crown
 *             and two roots.
 */
import { MARK } from "./glyphs.ts";

export const FAVICON_SIZES = [16, 32, 48, 64, 128] as const;
export type FaviconSize = (typeof FAVICON_SIZES)[number];

type Stroke = { d: string; w: number };
type Design = { viewBox: string; radius: number; strokes: Stroke[] };

/**
 * 16-unit grid. A large right lobe, a smaller left lobe and a third on the
 * left flank — asymmetric so it reads as a crown, not a heart — with clefts
 * deep enough to survive at 16px. `trunkX` keeps the trunk on
 * whole pixels at each size (an even pixel width needs an integer centre,
 * an odd one a half-pixel centre).
 */
const small = (trunk: number, crown: number, root: number, trunkX: number): Design => ({
  viewBox: "0 0 16 16",
  radius: 3.5,
  strokes: [
    // Crown and bowl.
    {
      d: `M${trunkX} 6.2C12.3 4.4 11.7 1.8 9.4 1.8C8.2 1.8 7.4 2.6 7.2 3.6C6.9 2.8 6.1 2.4 5.3 2.5C4 2.6 3.3 3.7 3.5 4.9C2.4 5.5 2.5 7.4 3.1 8.6C3.8 10.8 5.3 12 7.2 12C8.7 12 10 11.2 ${trunkX - 0.3} 10`,
      w: crown,
    },
    // Trunk.
    { d: `M${trunkX} 5V13`, w: trunk },
    // Root flare.
    {
      d: `M${trunkX} 12.4C${trunkX - 0.6} 13.4 ${trunkX - 1.4} 13.8 ${trunkX - 2.4} 13.9M${trunkX} 12.4C${trunkX + 0.6} 13.4 ${trunkX + 1.4} 13.8 ${trunkX + 2.4} 13.9`,
      w: root,
    },
  ],
});

const full: Design = {
  viewBox: MARK.viewBox,
  radius: 30,
  strokes: MARK.strokes.map((s) => ({
    d: s.d,
    w: s.weight === "growth" ? MARK.growth : MARK.structure,
  })),
};

export const FAVICON_DESIGNS: Record<FaviconSize, Design> = {
  16: small(2, 1.5, 1.1, 11),
  32: small(1.5, 1.25, 0.9, 11.25),
  48: full,
  64: full,
  128: full,
};

export function faviconSvg(
  size: FaviconSize,
  { background = "#12130f", color = "#eeebe3" }: { background?: string | null; color?: string } = {},
) {
  const d = FAVICON_DESIGNS[size];
  const [x, y, w, h] = d.viewBox.split(" ");
  const bg = background
    ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${d.radius}" fill="${background}" stroke="none"/>`
    : "";
  const paths = d.strokes.map((s) => `<path d="${s.d}" stroke-width="${s.w}"/>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${d.viewBox}" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-linecap="round" stroke-linejoin="round"><title>Quenori</title>${bg}${paths}</svg>`;
}
