import { glyphs } from "@/lib/brand/glyphs";
import { GlyphPaths } from "./Wordmark";

/** A single Quenori letterform, drawn in its own frame. */
export function Glyph({
  char,
  className,
  strokeScale = 1,
  accentLeaf = true,
  guides = false,
  tight = false,
}: {
  char: string;
  className?: string;
  strokeScale?: number;
  accentLeaf?: boolean;
  /** Show x-height and baseline guides. */
  guides?: boolean;
  /** Frame the letter closely (its own width) instead of the shared 150u frame. */
  tight?: boolean;
}) {
  const glyph = glyphs.find((g) => g.char === char);
  if (!glyph) return null;
  // Shared frame: every letter gets the same width, so they share scale,
  // baseline and x-height. Tight frame: the letter's own width.
  const left = -16;
  const width = tight ? glyph.advance + 36 : 150;
  const tx = left + (width - glyph.advance) / 2;
  const top = tight ? -52 : -66;
  const height = tight ? 204 : 222;

  return (
    <svg
      viewBox={`${left} ${top} ${width} ${height}`}
      className={className}
      role="img"
      aria-label={`${glyph.char} — ${glyph.nature}`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {guides && (
        <g stroke="currentColor" strokeOpacity="0.18" strokeWidth="0.75">
          <line x1={left} x2={left + width} y1="0" y2="0" />
          <line x1={left} x2={left + width} y1="100" y2="100" />
          <line x1={left} x2={left + width} y1="-45" y2="-45" strokeDasharray="2 4" />
          <line x1={left} x2={left + width} y1="148" y2="148" strokeDasharray="2 4" />
        </g>
      )}
      <GlyphPaths glyph={glyph} x={tx} accentLeaf={accentLeaf} strokeScale={strokeScale} />
    </svg>
  );
}
