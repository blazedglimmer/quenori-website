import { glyphs } from "@/lib/brand/glyphs";
import { GlyphPaths } from "./Wordmark";

/** A single Quenori letterform, drawn in its own frame. */
export function Glyph({
  char,
  className,
  strokeScale = 1,
  accentLeaf = true,
  guides = false,
}: {
  char: string;
  className?: string;
  strokeScale?: number;
  accentLeaf?: boolean;
  /** Show x-height and baseline guides. */
  guides?: boolean;
}) {
  const glyph = glyphs.find((g) => g.char === char);
  if (!glyph) return null;
  const left = -16;
  // One fixed frame for every letter so they share scale, baseline and x-height.
  const width = 150;
  const tx = left + (width - glyph.advance) / 2;

  return (
    <svg
      viewBox={`${left} -66 ${width} 222`}
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
          <line x1={left} x2={left + width} y1="-60" y2="-60" strokeDasharray="2 4" />
          <line x1={left} x2={left + width} y1="150" y2="150" strokeDasharray="2 4" />
        </g>
      )}
      <GlyphPaths glyph={glyph} x={tx} accentLeaf={accentLeaf} strokeScale={strokeScale} />
    </svg>
  );
}
