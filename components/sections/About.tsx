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
    body: "Like a vine finding its next hold, we try ideas early and in the open, and keep the ones that hold.",
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
      <div className="mx-auto grid max-w-[1440px] gap-16 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:py-32">
        <Reveal className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <SectionHeading
            align="stack"
            label="About"
            id="about-title"
            title={
              <>
                An independent studio for <em className="text-moss">useful</em> things.
              </>
            }
            aside={
              <div className="space-y-5 text-soil">
                <p>
                  Quenori is an independent technology and product studio. We design, engineer and
                  look after our own digital products, each made to be genuinely useful and each
                  given the time it needs to grow.
                </p>
                <p>
                  What connects our products isn&apos;t a single category but a way of working:
                  curious about new ideas, careful with the details, and patient enough to see them
                  through.
                </p>
              </div>
            }
          />
        </Reveal>

        <ul className="grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:col-span-7">
          {focus.map((f, i) => (
            <Reveal as="li" key={f.title} delay={i * 90} className="flex flex-col bg-paper p-7 sm:p-9">
              <Glyph char={f.glyph} tight className="h-36 w-auto self-start text-ink sm:h-44" />
              <h3 className="mt-6 font-display text-2xl leading-snug font-light">{f.title}</h3>
              <p className="mt-3 leading-relaxed text-soil">{f.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
