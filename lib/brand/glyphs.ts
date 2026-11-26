/**
 * Quenori letterforms.
 *
 * Every glyph is drawn on the same grid:
 *   x-height  y = 0
 *   baseline  y = 100
 *   ascender  y ≈ -45   (the q's crown, the wing and the leaf reach into this zone)
 *   descender y ≈ 148   (only the roots of the q)
 *
 * Two stroke weights make up the whole system:
 *   structure — the letter itself. It carries legibility.
 *   growth    — the finer natural detail that grows out of the structure.
 *
 * Rule: each letter is one structure gesture that may resolve into one growth
 * detail. Nothing is placed beside a letter; the nature lives inside it.
 *
 * The crowned q is the signature. Everything else stays quieter than it.
 */

export type StrokeWeight = "structure" | "growth";

export type GlyphStroke = {
  d: string;
  weight: StrokeWeight;
  /**
   * Hand-drawn weight variation (multiplier, ~0.94–1.08). Strokes drawn by
   * hand are never identical; this keeps the wordmark from looking machined.
   */
  w?: number;
  /** Dropped from the simplified wordmark and the small-size renderings. */
  detail?: boolean;
};

export type GlyphFill = {
  /** Drawn with its anchor (e.g. a leaf's base) at 0,0. */
  d: string;
  /** Anchor position in the glyph's local coordinates. */
  at: [number, number];
  rotate: number;
};

export type Glyph = {
  char: string;
  /** What the letter grows from. */
  nature: string;
  /** One-line note for the brand guidelines. */
  note: string;
  /** Horizontal advance in grid units (excluding tracking). */
  advance: number;
  strokes: GlyphStroke[];
  fills?: GlyphFill[];
};

export const STROKE = {
  structure: 9,
  growth: 5,
} as const;

/** Simplified wordmark uses a heavier, single weight for small sizes. */
export const STROKE_SIMPLIFIED = 12;

export const glyphs: Glyph[] = [
  {
    char: "q",
    nature: "Tree",
    note: "The signature. A lobed crown rises above the other letters, so the q stands as the word's capital; the trunk is the descender and roots below the baseline.",
    advance: 98,
    strokes: [
      // Crown: four lobes across the top, then a smooth bowl back to the trunk.
      {
        d: "M86 14C91 -2 85 -17 71 -20C67 -35 50 -39 42 -28C33 -43 9 -40 5 -23C-8 -21 -12 -4 -5 8C-9 30 4 101 48 100C66 99 78 90 84 76",
        weight: "structure",
        w: 1.04,
      },
      // Trunk — the descender, drawn with a slight lean.
      {
        d: "M86 6C87 34 85 64 87 96C88 112 86 127 91 142",
        weight: "structure",
        w: 1.1,
      },
      // Roots.
      { d: "M87.5 124C82 134 73 140 61 142", weight: "growth", detail: true },
      { d: "M89.5 131C96 138 104 141 115 140", weight: "growth", w: 0.9, detail: true },
    ],
  },
  {
    char: "u",
    nature: "Vine",
    note: "A calm u whose spur keeps growing past the stem and turns over once, like a vine reaching for its next hold.",
    advance: 92,
    strokes: [
      {
        d: "M8 0C9 20 7 40 8 58C8 86 22 100 41 100C59 100 73 87 74 56",
        weight: "structure",
      },
      { d: "M74 -1C75 30 73 62 74 90C74 97 78 100 84 100", weight: "structure", w: 0.98 },
      {
        d: "M84 100C90 100 94 96 94 90C94 86 91 84 88 85",
        weight: "growth",
        detail: true,
      },
    ],
  },
  {
    char: "e",
    nature: "Snail",
    note: "The bowl is the shell, with a spiral in its eye; the tail runs on as the foot and lifts at its end.",
    advance: 98,
    strokes: [
      // Crossbar + shell + foot, one gesture.
      {
        d: "M9 50L77 50C80 50 81 47.5 81 44C81 18 64 0 44 0C20 0 5 22 5 51C5 81 24 100 49 100L86 100C94 100 99 96 102 88",
        weight: "structure",
        w: 0.98,
      },
      // Shell spiral inside the eye.
      {
        d: "M46 37C39 37 36 31 39 26C43 21 52 22 55 29C58 36 54 43 46 44",
        weight: "growth",
        detail: true,
      },
    ],
  },
  {
    char: "n",
    nature: "Mountain",
    note: "The shoulder climbs to a single weathered peak, a little left of centre, and falls away as the right leg.",
    advance: 88,
    strokes: [
      { d: "M8 -2C9 34 7 68 8 100", weight: "structure", w: 1.03 },
      {
        d: "M8 38C15 19 27 5 41 -6C56 4 75 18 78 42L78 100",
        weight: "structure",
        w: 0.97,
      },
    ],
  },
  {
    char: "o",
    nature: "Growth rings",
    note: "A slightly uneven outer ring, and an off-centre inner ring left open, as in a branch cut by hand.",
    advance: 95,
    strokes: [
      {
        d: "M46 -4C73 -5 90 20 88 51C86 82 69 105 43 104C17 103 3 80 4 49C5 19 22 -3 46 -4Z",
        weight: "structure",
      },
      {
        d: "M53 31C65 33 71 44 70 56C69 69 59 77 47 76C36 75 30 66 31 55C32 46 37 39 44 35",
        weight: "growth",
        w: 0.95,
        detail: true,
      },
    ],
  },
  {
    char: "r",
    nature: "Bird in flight",
    note: "The stem turns over at the top into a head and beak; the arm is a raised wing whose underside breaks into overlapping feathers.",
    advance: 76,
    strokes: [
      // Stem, head and beak.
      {
        d: "M11 100C10 70 12 38 11 8C11 -1 6 -7 -1 -7L-12 -2",
        weight: "structure",
        w: 1.02,
      },
      // Wing, leading edge.
      {
        d: "M12 28C19 11 30 0 44 -6C54 -10 63 -14 76 -16",
        weight: "structure",
        w: 0.96,
      },
      // Wing, trailing edge: three feathers.
      {
        d: "M76 -16C72 -9 67 -8 63 -9C62 -3 57 0 51 -1C50 5 44 8 38 7C35 13 28 18 20 23",
        weight: "growth",
        detail: true,
      },
    ],
  },
  {
    char: "i",
    nature: "Leaf",
    note: "A plain stem, slightly bent by its own weight. The tittle is a small leaf, set at an angle; it reads as a dot first and a leaf second.",
    advance: 36,
    strokes: [{ d: "M15 6C13 38 15 72 14 100", weight: "structure", w: 1.06 }],
    fills: [
      {
        // Small lens-shaped leaf, base at origin, tip up.
        d: "M0 0C8 -5 9 -18 0 -28C-9 -18 -8 -5 0 0Z",
        at: [17, -13],
        rotate: 34,
      },
    ],
  },
];

export const TRACKING = 14;

export function strokeWidth(stroke: GlyphStroke, simplified = false) {
  const base = simplified ? STROKE_SIMPLIFIED : STROKE[stroke.weight];
  return Math.round(base * (stroke.w ?? 1) * 100) / 100;
}

export function wordmarkWidth(tracking = TRACKING) {
  return glyphs.reduce((sum, g) => sum + g.advance, 0) + tracking * (glyphs.length - 1);
}

/** Grid-space bounds of the full wordmark (crown, wing, leaf and roots included). */
export function wordmarkBounds(tracking = TRACKING) {
  const left = -16;
  const top = -50;
  const right = wordmarkWidth(tracking) + 12;
  const bottom = 150;
  return { left, top, width: right - left, height: bottom - top };
}

export function wordmarkViewBox(tracking = TRACKING) {
  const b = wordmarkBounds(tracking);
  return `${b.left} ${b.top} ${b.width} ${b.height}`;
}

export function layoutGlyphs(tracking = TRACKING) {
  let x = 0;
  return glyphs.map((glyph, index) => {
    const placed = { glyph, x, index };
    x += glyph.advance + tracking;
    return placed;
  });
}

/**
 * The favicon / compact mark: the crowned q, redrawn for pixels rather than
 * scaled down from the wordmark. Fewer, rounder lobes with a deeper cleft,
 * a heavier trunk and two short roots, so it still reads as a tree at 16px.
 */
export const MARK = {
  viewBox: "-36 -52 190 190",
  structure: 17,
  growth: 12,
  strokes: [
    {
      d: "M84 24C97 0 81 -27 57 -19C49 -45 11 -43 10 -17C-12 -13 -17 15 -4 29C-9 60 12 100 46 100C65 100 79 90 85 76",
      weight: "structure",
    },
    { d: "M86 -10C87 30 85 70 87 102C88 112 88 119 90 126", weight: "structure" },
    { d: "M88 116C82 124 74 128 63 129", weight: "growth" },
    { d: "M89 118C95 125 103 128 113 128", weight: "growth" },
  ] as GlyphStroke[],
} as const;
