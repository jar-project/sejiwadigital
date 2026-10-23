import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { SiteContent } from "@/content/types";

export default function Process({ p }: { p: SiteContent["process"] }) {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading eyebrow={p.eyebrow} title={p.title} />
        <ol className="relative mt-14 grid gap-5 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-[27px] hidden h-px bg-gradient-to-r from-amber via-navy/30 to-transparent md:block" aria-hidden />
          {p.steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1} className="relative">
              <li className="list-none">
                <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-line bg-white font-display text-lg font-extrabold text-navy shadow-[0_10px_30px_-15px_rgba(0,38,142,0.5)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-xl font-bold text-navy-950">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.desc}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
