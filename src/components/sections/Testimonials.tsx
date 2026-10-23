import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { Quote } from "@/components/icons";
import type { SiteContent } from "@/content/types";

// PLACEHOLDER: ganti isi testimoni di src/content/id.ts & en.ts
export default function Testimonials({ t }: { t: SiteContent["testimonials"] }) {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {t.items.map((it, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <figure className="card flex h-full flex-col p-7 md:p-8">
                <Quote className="h-8 w-8 text-amber" />
                <blockquote className="mt-5 flex-1 text-[1.05rem] leading-relaxed text-ink">“{it.quote}”</blockquote>
                <figcaption className="mt-8 flex items-center gap-3 border-t border-line pt-6">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-navy font-display font-bold text-white">
                    {it.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-semibold text-navy-950">{it.name}</span>
                    <span className="block text-sm text-muted">{it.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
