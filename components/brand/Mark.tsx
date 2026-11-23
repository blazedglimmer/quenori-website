import { glyphs, MARK } from "@/lib/brand/glyphs";

const tree = glyphs[0];

/** Compact brand mark — the q drawn as a tree. Works from 16px up. */
export function Mark({
  className,
  title = "Quenori",
  tile = false,
}: {
  className?: string;
  title?: string;
  /** Render on a solid ink tile (app icon / avatar usage). */
  tile?: boolean;
}) {
  return (
    <svg
      viewBox={MARK.viewBox}
      role="img"
      aria-label={title}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {tile && (
        <rect x="-30" y="-24" width="174" height="174" rx="22" fill="var(--color-ink)" stroke="none" />
      )}
      <g stroke={tile ? "var(--color-paper)" : undefined}>
        {tree.strokes.map((s, i) => (
          <path key={i} d={s.d} strokeWidth={s.weight === "growth" ? MARK.growth : MARK.structure} />
        ))}
      </g>
    </svg>
  );
}
