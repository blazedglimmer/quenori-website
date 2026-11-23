/**
 * Quenori letterforms.
 *
 * Every glyph is drawn on the same grid:
 *   x-height  y = 0
 *   baseline  y = 100
 *   ascender  y ≈ -60   (canopy, wing and leaf may reach into this zone)
 *   descender y ≈ 150   (only the roots of the q)
 *
 * Two stroke weights make up the whole system:
 *   structure — the letter itself. It carries legibility.
 *   growth    — the finer natural detail that grows out of the structure.
 *
 * Rule: each letter is one structure gesture that resolves into one growth
 * detail. Nothing is placed beside a letter; the nature lives inside it.
 */

export type StrokeWeight = "structure" | "growth";

export type GlyphStroke = {
  d: string;
  weight: StrokeWeight;
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
  growth: 4,
} as const;

/** Simplified wordmark uses a heavier, single weight for small sizes. */
export const STROKE_SIMPLIFIED = 12;

export const glyphs: Glyph[] = [
  {
    char: "q",
    nature: "Tree",
    note: "The bowl is a canopy with a soft cleft at its crown; the descender is the trunk, which roots below the baseline.",
    advance: 96,
    strokes: [
      // Canopy — the bowl, opened where it meets the trunk.
      {
        d: "M84 16C80 -2 66 -11 51 -7C43 -14 26 -15 15 -5C3 6 -1 28 2 50C5 80 24 101 49 100C65 99 77 90 84 76",
        weight: "structure",
      },
      // Trunk — the descender.
      {
        d: "M86 -8C86 30 87 78 86 112C85.5 122 87 131 91 140",
        weight: "structure",
      },
      // Roots.
      { d: "M86.5 122C82 134 73 141 62 145", weight: "growth", detail: true },
      { d: "M88.5 128C95 136 103 140 113 141", weight: "growth", detail: true },
    ],
  },
  {
    char: "u",
    nature: "Vine tendril",
    note: "A plain, quiet u whose spur keeps growing past the baseline and coils into a tendril.",
    advance: 86,
    strokes: [
      {
        d: "M8 0L8 58C8 86 22 100 41 100C59 100 72 88 74 66",
        weight: "structure",
      },
      { d: "M74 -1L74 90C74 97 78 100 84 100", weight: "structure" },
      {
        d: "M84 100C92 100 98 94 98 86C98 79 93 76 89 77.5C85.5 79 85 83 87.5 85",
        weight: "growth",
        detail: true,
      },
    ],
  },
  {
    char: "e",
    nature: "Snail",
    note: "The bowl is the shell, the eye spirals inward, and the tail becomes a foot that lifts into the head.",
    advance: 112,
    strokes: [
      // Crossbar + shell + foot, one gesture.
      {
        d: "M9 50L80 50C82 19 64 0 44 0C20 0 5 22 5 51C5 81 24 100 49 100L90 100C98 100 104 96 107 88",
        weight: "structure",
      },
      // Shell spiral inside the eye.
      {
        d: "M45 36C39 36 36 31 39 27C42 23 50 23 53 29C56 35 53 42 46 43",
        weight: "growth",
        detail: true,
      },
      // Feelers.
      { d: "M107 88L103 70", weight: "growth", detail: true },
      { d: "M107 88L117 73", weight: "growth", detail: true },
    ],
  },
  {
    char: "n",
    nature: "Mountain ridge",
    note: "The shoulder climbs past a small false summit to a weathered peak, then falls away as the right leg.",
    advance: 88,
    strokes: [
      { d: "M8 -2L8 100", weight: "structure" },
      {
        d: "M8 38C13 26 20 16 28 9L34 13C38 5 41 -1 45 -6C58 5 75 19 78 42L78 100",
        weight: "structure",
      },
    ],
  },
  {
    char: "o",
    nature: "Growth rings",
    note: "The outer ring is the letter; an eccentric inner ring marks the years inside, as in a cut branch.",
    advance: 92,
    strokes: [
      {
        d: "M46 -4C72 -4 89 19 88 50C87 81 70 104 44 104C18 104 3 81 4 50C5 20 21 -4 46 -4Z",
        weight: "structure",
      },
      {
        d: "M52 30C64 31 71 42 70 55C69 68 60 77 48 77C36 77 30 67 30 56C30 46 35 38 43 33",
        weight: "growth",
        detail: true,
      },
    ],
  },
  {
    char: "r",
    nature: "Bird in flight",
    note: "A beak at the head of the stem; the arm is a single swept wing, its underside drawn as a finer line meeting at the tip.",
    advance: 74,
    strokes: [
      // Beak + stem.
      { d: "M-7 11L11 -3L11 100", weight: "structure" },
      // Wing, leading edge.
      {
        d: "M11 31C18 13 33 -3 52 -11C60 -14 69 -15 78 -13",
        weight: "structure",
      },
      // Wing, trailing edge.
      {
        d: "M78 -13C65 -8 51 -3 39 5C30 11 22 18 16 26",
        weight: "growth",
        detail: true,
      },
    ],
  },
  {
    char: "i",
    nature: "Leaf & branch",
    note: "The stem is a branch, slightly bent by its own weight; the tittle is a leaf on a fine stalk, its midrib cut through.",
    advance: 36,
    strokes: [
      { d: "M15 4C13 38 15 72 14 100", weight: "structure" },
      // Stalk.
      { d: "M15 4C15 -4 17 -10 21 -15", weight: "growth", detail: true },
    ],
    fills: [
      {
        // Leaf with a midrib slit (even-odd), base at origin, tip up.
        d: "M0 0C14 -8 16 -30 0 -46C-16 -30 -14 -8 0 0ZM0 -7C1.6 -18 1.6 -29 0 -38C-1.6 -29 -1.6 -18 0 -7Z",
        at: [21, -15],
        rotate: 30,
      },
    ],
  },
];

export const TRACKING = 14;

export function wordmarkWidth(tracking = TRACKING) {
  return glyphs.reduce((sum, g) => sum + g.advance, 0) + tracking * (glyphs.length - 1);
}

/** Grid-space bounds of the full wordmark (canopy, wing, leaf and roots included). */
export function wordmarkBounds(tracking = TRACKING) {
  const left = -10;
  const top = -64;
  const right = wordmarkWidth(tracking) + 20;
  const bottom = 152;
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

/** The compact brand mark: the q (tree) alone, on a square grid. */
export const MARK = {
  viewBox: "-30 -24 174 174",
  structure: 15,
  growth: 10,
} as const;
