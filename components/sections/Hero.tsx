import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { layoutGlyphs, wordmarkBounds } from "@/lib/brand/glyphs";
import { liveProducts, products } from "@/lib/products";
import { site } from "@/lib/site";

/** Letter annotations, positioned as a percentage of the wordmark width. */
function annotations() {
  const b = wordmarkBounds();
  return layoutGlyphs().map(({ glyph, x }) => ({
    char: glyph.char,
    nature: glyph.nature,
    left: ((x + glyph.advance * 0.45 - b.left) / b.width) * 100,
  }));
}

/**
 * The wordmark's width is capped by the viewport height, so the statement and
 * the call to action always sit above the fold (430px ≈ header, annotations,
 * headline and spacing).
 */
function wordmarkWidth() {
  const b = wordmarkBounds();
  const ratio = (b.width / b.height).toFixed(3);
  return `min(100%, 1040px, max(300px, calc((100svh - 430px) * ${ratio})))`;
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="mx-auto max-w-[1440px] px-5 pt-10 sm:px-8 sm:pt-12 lg:px-12 lg:pt-14">
        <p className="eyebrow mb-8 text-stone lg:hidden">Independent product studio</p>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div id="hero-wordmark" className="relative" style={{ width: wordmarkWidth() }}>
            <Wordmark animate className="h-auto w-full text-paper" title="Quenori" />

            {/* Sketch-style annotations: what each letter grows from. */}
            <ol
              aria-label="The letterforms"
              className="relative mt-3 hidden h-14 border-t border-line md:block"
            >
              {annotations().map((a, i) => (
                <li
                  key={a.char}
                  className="absolute top-0 flex -translate-x-1/2 flex-col items-center"
                  style={{ left: `${a.left}%` }}
                >
                  <span aria-hidden className={`block w-px bg-line ${i % 2 ? "h-6" : "h-2.5"}`} />
                  <span className="eyebrow mt-1.5 text-[0.6875rem] whitespace-nowrap text-stone">
                    <span className="text-mist normal-case">{a.char}</span> — {a.nature}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <dl className="eyebrow hidden shrink-0 flex-col items-end gap-2 pb-16 text-right text-stone lg:flex">
            <dt className="sr-only">Studio</dt>
            <dd>Independent product studio</dd>
            <dt className="sr-only">Products</dt>
            <dd>
              {products.length} products · {liveProducts.length} live
            </dd>
          </dl>
        </div>

        <div className="grid gap-8 pt-10 pb-20 sm:pb-24 md:pt-12 lg:grid-cols-12 lg:items-end lg:gap-12 lg:pb-28">
          <h1
            id="hero-title"
            className="font-display text-[clamp(2.5rem,5.6vw,5.25rem)] leading-[0.95] font-light tracking-[-0.02em] lg:col-span-7"
          >
            Ideas grow <br className="hidden sm:block" />
            into <em className="text-lichen">products.</em>
          </h1>
          <div className="flex flex-col gap-7 lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-9">
            <p className="max-w-md text-lg leading-relaxed text-mist">{site.description}</p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="#products"
                className="group inline-flex items-center gap-3 bg-paper px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-lichen"
              >
                Explore products
                <span aria-hidden className="transition-transform group-hover:translate-y-0.5">
                  ↓
                </span>
              </Link>
              <Link
                href="#philosophy"
                className="text-sm text-mist underline decoration-line underline-offset-[6px] transition-colors hover:text-paper hover:decoration-lichen"
              >
                Our philosophy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
