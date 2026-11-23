/**
 * Plain-string SVG builders for the logo suite. Used by the asset export
 * script, the Open Graph image and the app icons, so every rendering of the
 * logo comes from the same glyph data as the React components.
 */
import {
  glyphs,
  layoutGlyphs,
  MARK,
  STROKE,
  STROKE_SIMPLIFIED,
  wordmarkViewBox,
} from "./glyphs.ts";

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
            `<path d="${s.d}" stroke-width="${simplified ? STROKE_SIMPLIFIED : STROKE[s.weight]}"/>`,
        )
        .join("");
      const fills = (glyph.fills ?? [])
        .map(
          (f) =>
            `<path d="${f.d}" transform="translate(${f.at[0]} ${f.at[1]}) rotate(${f.rotate})" fill="${leaf}" fill-rule="evenodd" stroke="none"/>`,
        )
        .join("");
      return `<g transform="translate(${gx} 0)">${strokes}${fills}</g>`;
    })
    .join("");
  const bg = background ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${background}"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${w}" height="${h}" fill="none" stroke="${color}" stroke-linecap="round" stroke-linejoin="round"><title>Quenori</title>${bg}${body}</svg>`;
}

export function markSvg({
  color = BRAND_COLORS.paper as string,
  background = BRAND_COLORS.ink as string | null,
  radius = 22,
}: { color?: string; background?: string | null; radius?: number } = {}) {
  const tree = glyphs[0];
  const [x, y, w, h] = MARK.viewBox.split(" ");
  const bg = background
    ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${background}"/>`
    : "";
  const paths = tree.strokes
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
