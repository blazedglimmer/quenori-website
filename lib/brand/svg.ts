/**
 * Plain-string SVG builders for the logo suite. Used by the asset export
 * script, the Open Graph image and the app icons, so every rendering of the
 * logo comes from the same glyph data as the React components.
 */
import { glyphs, layoutGlyphs, MARK, strokeWidth, wordmarkViewBox, type Glyph } from "./glyphs.ts";

/** Escapes text for use inside SVG/XML elements. */
const xml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const BRAND_COLORS = {
  ink: "#12130f",
  paper: "#eeebe3",
  lichen: "#b8c98a",
  moss: "#4f6b2f",
} as const;

type WordmarkSvgOptions = {
  variant?: "primary" | "simplified";
  color?: string;
  /** Leaf colour; defaults to `color` (monochrome). */
  leaf?: string;
  background?: string;
};

export function wordmarkSvg({
  variant = "primary",
  color = BRAND_COLORS.paper,
  leaf = color,
  background,
}: WordmarkSvgOptions = {}) {
  const simplified = variant === "simplified";
  const viewBox = wordmarkViewBox();
  const [x, y, w, h] = viewBox.split(" ");
  const body = layoutGlyphs()
    .map(({ glyph, x: gx }) => {
      const strokes = glyph.strokes
        .filter((s) => !(simplified && s.detail))
        .map(
          (s) =>
            `<path d="${s.d}" stroke-width="${strokeWidth(s, simplified)}"/>`,
        )
        .join("");
      const fills = (glyph.fills ?? [])
        .filter((f) => !(simplified && f.detail))
        .map(
          (f) =>
            `<path d="${f.d}" transform="translate(${f.at[0]} ${f.at[1]}) rotate(${f.rotate})" fill="${f.tone === "ink" ? color : leaf}" fill-rule="evenodd" stroke="none"/>`,
        )
        .join("");
      return `<g transform="translate(${gx} 0)">${strokes}${fills}</g>`;
    })
    .join("");
  const bg = background ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${background}" stroke="none"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${w}" height="${h}" fill="none" stroke="${color}" stroke-linecap="round" stroke-linejoin="round"><title>Quenori</title>${bg}${body}</svg>`;
}

export function markSvg({
  color = BRAND_COLORS.paper as string,
  background = BRAND_COLORS.ink as string | null,
  radius = 30,
}: { color?: string; background?: string | null; radius?: number } = {}) {
  const [x, y, w, h] = MARK.viewBox.split(" ");
  const bg = background
    ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${background}" stroke="none"/>`
    : "";
  const paths = MARK.strokes
    .map(
      (s) =>
        `<path d="${s.d}" stroke-width="${s.weight === "growth" ? MARK.growth : MARK.structure}"/>`,
    )
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MARK.viewBox}" width="${w}" height="${h}" fill="none" stroke="${color}" stroke-linecap="round" stroke-linejoin="round"><title>Quenori</title>${bg}${paths}</svg>`;
}

export function svgDataUri(svg: string) {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

/** A single letterform as a standalone SVG (for the letter illustration set). */
export function letterSvg(
  char: string,
  { color = BRAND_COLORS.paper as string, leaf }: { color?: string; leaf?: string } = {},
) {
  leaf ??= color;
  const glyph = glyphs.find((g) => g.char === char) as Glyph;
  const width = 150;
  const tx = -16 + (width - glyph.advance) / 2;
  const strokes = glyph.strokes.map((s) => `<path d="${s.d}" stroke-width="${strokeWidth(s)}"/>`).join("");
  const fills = (glyph.fills ?? [])
    .map((f) => `<path d="${f.d}" transform="translate(${f.at[0]} ${f.at[1]}) rotate(${f.rotate})" fill="${f.tone === "ink" ? color : leaf}" fill-rule="evenodd" stroke="none"/>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-16 -56 ${width} 212" width="${width}" height="212" fill="none" stroke="${color}" stroke-linecap="round" stroke-linejoin="round"><title>${xml(`${glyph.char} — ${glyph.nature}`)}</title><g transform="translate(${tx} 0)">${strokes}${fills}</g></svg>`;
}
