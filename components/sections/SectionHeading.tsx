import type { ReactNode } from "react";

/**
 * Section heading. Three compositions so consecutive sections don't repeat
 * the same layout:
 *   split  — title left, aside bottom-right
 *   center — centred title, aside beneath
 *   stack  — title, aside beneath, both left-aligned
 */
export function SectionHeading({
  label,
  id,
  title,
  aside,
  align = "split",
}: {
  label: string;
  id: string;
  title: ReactNode;
  aside?: ReactNode;
  align?: "split" | "center" | "stack";
}) {
  const heading = (
    <>
      <p className="eyebrow opacity-70">{label}</p>
      <h2
        id={id}
        className="mt-5 font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-none font-light tracking-[-0.015em] text-balance"
      >
        {title}
      </h2>
    </>
  );

  if (align === "center") {
    return (
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        {heading}
        {aside && <div className="mt-8 max-w-xl text-base leading-relaxed opacity-75">{aside}</div>}
      </div>
    );
  }

  if (align === "stack") {
    return (
      <div className="max-w-3xl">
        {heading}
        {aside && <div className="mt-8 max-w-xl text-lg leading-relaxed opacity-75">{aside}</div>}
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">{heading}</div>
      {aside && (
        <div className="self-end text-base leading-relaxed opacity-75 lg:col-span-4 lg:col-start-9">
          {aside}
        </div>
      )}
    </div>
  );
}
