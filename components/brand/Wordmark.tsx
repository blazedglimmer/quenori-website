import { layoutGlyphs, strokeWidth, wordmarkViewBox, type Glyph } from "@/lib/brand/glyphs";

type WordmarkProps = {
  /** primary: full illustrated detail. simplified: structure only, heavier stroke. */
  variant?: "primary" | "simplified";
  /** Draw the letters on as the page loads (CSS only, respects reduced motion). */
  animate?: boolean;
  /** Colour the leaf with the accent. Off = pure monochrome. */
  accentLeaf?: boolean;
  /** Multiplies stroke weights (used for weight studies only). */
  strokeScale?: number;
  className?: string;
  title?: string;
};

export function Wordmark({
  variant = "primary",
  animate = false,
  accentLeaf = variant === "primary",
  strokeScale = 1,
  className,
  title = "Quenori",
}: WordmarkProps) {
  const simplified = variant === "simplified";

  return (
    <svg
      viewBox={wordmarkViewBox()}
      role="img"
      aria-label={title}
      className={[animate ? "qn-draw" : "", className].filter(Boolean).join(" ")}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {layoutGlyphs().map(({ glyph, x, index }) => (
        <GlyphPaths
          key={glyph.char}
          glyph={glyph}
          x={x}
          index={index}
          simplified={simplified}
          accentLeaf={accentLeaf}
          strokeScale={strokeScale}
        />
      ))}
    </svg>
  );
}

export function GlyphPaths({
  glyph,
  x = 0,
  index = 0,
  simplified = false,
  accentLeaf = false,
  strokeScale = 1,
}: {
  glyph: Glyph;
  x?: number;
  index?: number;
  simplified?: boolean;
  accentLeaf?: boolean;
  strokeScale?: number;
}) {
  return (
    <g
      transform={x ? `translate(${x} 0)` : undefined}
      className="qn-glyph"
      style={{ "--i": index } as React.CSSProperties}
    >
      {glyph.strokes
        .filter((s) => !(simplified && s.detail))
        .map((s, i) => (
          <path
            key={i}
            d={s.d}
            pathLength={1}
            className={s.weight === "growth" ? "qn-growth" : "qn-structure"}
            strokeWidth={strokeWidth(s, simplified) * strokeScale}
          />
        ))}
      {glyph.fills
        ?.filter((f) => !(simplified && f.detail))
        .map((f, i) => {
          const ink = f.tone === "ink";
          return (
            <g key={i} transform={`translate(${f.at[0]} ${f.at[1]})`}>
              <g className={ink ? "qn-eye" : "qn-leaf"}>
                <path
                  d={f.d}
                  transform={`rotate(${f.rotate})`}
                  fill={
                    !ink && accentLeaf ? "var(--color-leaf, currentColor)" : "currentColor"
                  }
                  fillRule="evenodd"
                  stroke="none"
                />
              </g>
            </g>
          );
        })}
    </g>
  );
}
