import { ProductThumb } from "@/components/products/ProductThumb";
import { Reveal } from "@/components/ui/Reveal";
import { productHost, products, statusLabel, type Product } from "@/lib/products";
import { SectionHeading } from "./SectionHeading";

export function Products() {
  return (
    <section
      id="products"
      aria-labelledby="products-title"
      className="scroll-mt-16 border-t border-line"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <Reveal>
          <SectionHeading
            index="01"
            label="Products"
            id="products-title"
            title={
              <>
                Independent products, <em>grown</em> from the same roots.
              </>
            }
            aside={
              <p>
                Each product has its own name, its own home and its own reason to exist. New ones
                are planted here as they take shape.
              </p>
            }
          />
        </Reveal>

        <ol className="mt-16 border-t border-line sm:mt-20">
          {products.map((product, i) => (
            <Reveal as="li" key={product.slug} delay={i * 80} className="border-b border-line">
              <ProductRow product={product} index={i} />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ProductRow({ product, index }: { product: Product; index: number }) {
  const live = product.status === "live";

  return (
    <article
      aria-labelledby={`product-${product.slug}`}
      className="product-row group relative grid grid-cols-[88px_1fr] gap-x-5 gap-y-4 py-8 sm:grid-cols-[120px_1fr] sm:gap-x-8 lg:grid-cols-[3rem_150px_minmax(0,1.3fr)_minmax(0,1fr)_10rem] lg:items-start lg:gap-x-10 lg:py-10"
    >
      <span className="eyebrow hidden pt-1 text-stone lg:block">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="row-span-2 self-start overflow-hidden border border-line transition-colors group-hover:border-stone lg:row-span-1">
        <ProductThumb product={product} className="block aspect-square w-full" />
      </div>

      <div>
        <h3
          id={`product-${product.slug}`}
          className="font-display text-3xl font-light leading-tight sm:text-4xl"
        >
          {live ? (
            <a
              href={product.url}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {product.name}
            </a>
          ) : (
            product.name
          )}
        </h3>
        <p className="mt-2 text-base text-mist">
          {product.tagline ?? <span className="text-stone">Details to be announced.</span>}
        </p>
      </div>

      <div className="col-start-2 lg:col-start-auto">
        {product.description && (
          <p className="max-w-md text-sm leading-relaxed text-stone">{product.description}</p>
        )}
        <dl
          className={`eyebrow flex flex-wrap gap-x-6 gap-y-2 text-[0.6875rem] text-stone ${product.description ? "mt-4 lg:mt-5" : "lg:pt-2"}`}
        >
          <div className="flex gap-2">
            <dt className="sr-only">Category</dt>
            <dd>{product.category ?? "Category — TBA"}</dd>
          </div>
          <div className="flex gap-2 lg:hidden">
            <dt className="sr-only">Status</dt>
            <dd>
              <Status product={product} />
            </dd>
          </div>
        </dl>
      </div>

      <div className="col-start-2 hidden flex-col items-end gap-3 text-right lg:col-start-auto lg:flex">
        <Status product={product} />
        <span
          className={`text-sm ${live ? "text-mist transition-colors group-hover:text-paper" : "text-stone/70"}`}
        >
          {productHost(product)}
          {live && (
            <span
              aria-hidden
              className="ml-2 inline-block transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            >
              ↗
            </span>
          )}
        </span>
      </div>

      {/* Accent hairline that grows along the row on hover. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 transition-transform duration-700 ease-[var(--ease-grow)] group-hover:scale-x-100 motion-reduce:transition-none"
        style={{ background: product.accent }}
      />
    </article>
  );
}

function Status({ product }: { product: Product }) {
  const live = product.status === "live";
  return (
    <span className="eyebrow inline-flex items-center gap-2 text-[0.6875rem]">
      <span
        aria-hidden
        className={`inline-block size-1.5 rounded-full ${live ? "bg-lichen" : "border border-stone"}`}
      />
      <span className={live ? "text-lichen" : "text-stone"}>{statusLabel[product.status]}</span>
    </span>
  );
}
