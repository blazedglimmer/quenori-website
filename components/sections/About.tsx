import { Glyph } from "@/components/brand/Glyph";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "./SectionHeading";

const focus = [
  {
    glyph: "q",
    title: "Useful first",
    body: "We build products people can rely on every day. Usefulness is the test every feature has to pass.",
  },
  {
    glyph: "u",
    title: "Room to experiment",
    body: "Like a tendril finding new ground, we try ideas early and in the open, and keep the ones that hold.",
  },
  {
    glyph: "o",
    title: "Engineering and design, together",
    body: "Structure and craft grow in the same rings. How something works and how it feels are one decision.",
  },
  {
    glyph: "e",
    title: "In it for the long run",
    body: "Products are never finished. We would rather move steadily and keep improving than launch and leave.",
  },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="on-paper scroll-mt-16">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <Reveal>
          <SectionHeading
            index="03"
            label="About"
            id="about-title"
            title={
              <>
                An independent studio for <em className="text-moss">useful</em> things.
              </>
            }
          />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          <Reveal className="space-y-6 text-lg leading-relaxed text-soil lg:col-span-6">
            <p>
              Quenori is an independent technology and product studio. We design, engineer and look
              after our own digital products, each made to be genuinely useful and each given the
              time it needs to grow.
            </p>
            <p>
              What connects our products isn&apos;t a single category but a way of working:
              curious about new ideas, careful with the details, and patient enough to see them
              through.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid border-t border-ink/15 sm:mt-24 sm:grid-cols-2 lg:grid-cols-4">
          {focus.map((f, i) => (
            <Reveal
              as="li"
              key={f.title}
              delay={i * 90}
              className="border-b border-ink/15 py-10 sm:px-6 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0"
            >
              <Glyph char={f.glyph} className="-ml-3 h-32 w-auto text-ink" />
              <h3 className="mt-6 font-display text-2xl font-light leading-snug">{f.title}</h3>
              <p className="mt-3 leading-relaxed text-soil">{f.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
