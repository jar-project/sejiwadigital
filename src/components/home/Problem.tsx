import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { Check, X } from "@/components/icons";
import type { SiteContent } from "@/content/types";

export default function Problem({ p }: { p: SiteContent["problem"] }) {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="container-x">
        <SectionHeading eyebrow={p.eyebrow} title={p.title} sub={p.sub} />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <Reveal className="card p-7 md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">{p.beforeLabel}</p>
            <ul className="mt-6 space-y-4">
              {p.before.map((t) => (
                <li key={t} className="flex gap-3 text-[1.02rem] text-muted">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-red-50 text-red-500">
                    <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                  <span className="line-through decoration-muted/30">{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.12} className="relative overflow-hidden rounded-3xl bg-navy p-7 text-white md:p-10" data-cursor="dark">
            <div className="absolute -right-16 -top-16 flex gap-3 opacity-90" aria-hidden>
              <span className="h-28 w-28 rounded-full bg-amber/90" />
              <span className="h-28 w-28 rounded-full bg-amber/90" />
            </div>
            <p className="relative text-sm font-semibold uppercase tracking-[0.14em] text-amber">{p.afterLabel}</p>
            <ul className="relative mt-6 space-y-4">
              {p.after.map((t) => (
                <li key={t} className="flex gap-3 text-[1.02rem] font-medium">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-amber text-navy-950">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
