import type { ReactNode } from "react";

export function SectionHeading({
  index,
  label,
  id,
  title,
  aside,
}: {
  index: string;
  label: string;
  id: string;
  title: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        <p className="eyebrow flex items-center gap-3 opacity-70">
          <span>{index}</span>
          <span aria-hidden className="h-px w-8 bg-current opacity-40" />
          <span>{label}</span>
        </p>
        <h2
          id={id}
          className="mt-6 font-display text-[clamp(2.25rem,5vw,4.5rem)] font-light leading-[1] tracking-[-0.015em]"
        >
          {title}
        </h2>
      </div>
      {aside && (
        <div className="self-end text-base leading-relaxed opacity-75 lg:col-span-4 lg:col-start-9">
          {aside}
        </div>
      )}
    </div>
  );
}
