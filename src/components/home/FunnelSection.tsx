"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "@/components/icons";
import { SERVICE_SLUGS } from "@/lib/site";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/routing";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function FunnelSection({
  f,
  locale,
  cta,
}: {
  f: SiteContent["funnel"];
  locale: Locale;
  cta: string;
}) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".f-card");
      cards.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 60%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
      gsap.fromTo(
        ".f-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".f-cards", start: "top 60%", end: "bottom 60%", scrub: true },
        },
      );
    },
    { scope: root },
  );

  const widths = [100, 82, 64, 46];

  return (
    <section ref={root} className="relative overflow-x-clip bg-navy-950 py-24 text-white md:py-36" data-cursor="dark">
      <div className="grid-lines-dark absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-navy/50 blur-[120px]" />
      </div>

      <div className="container-x relative grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow eyebrow-light">{f.eyebrow}</p>
            <h2 className="mt-4 text-[2rem] font-extrabold leading-[1.08] md:text-5xl">{f.title}</h2>
            <p className="mt-5 max-w-md text-white/60 md:text-lg">{f.sub}</p>

            {/* Funnel graphic */}
            <div className="mt-12 hidden space-y-2.5 lg:block" aria-hidden>
              {f.stages.map((s, i) => (
                <div key={s.tag} className="flex justify-center" style={{ width: "100%" }}>
                  <div
                    className={`flex h-14 items-center justify-between rounded-2xl px-5 text-sm font-semibold transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
                      active === i ? "bg-amber text-navy-950 shadow-[0_20px_50px_-15px_rgba(248,173,56,0.7)]" : "bg-white/[0.06] text-white/50"
                    }`}
                    style={{ width: `${widths[i]}%` }}
                  >
                    <span>{s.tag.split("·")[1]?.trim()}</span>
                    <span className="font-display">{s.tag.split("·")[0].trim()}</span>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href={{ pathname: "/layanan/[slug]", params: { slug: SERVICE_SLUGS.funnel[locale] } }}
              className="btn btn-primary mt-10 hidden lg:inline-flex"
            >
              {cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="f-cards relative lg:col-span-7 lg:pl-10">
          <div className="absolute bottom-0 left-0 top-0 hidden w-px bg-white/10 lg:block" aria-hidden>
            <div className="f-progress h-full w-full origin-top bg-amber" />
          </div>
          <div className="space-y-5 lg:space-y-[18vh] lg:py-[8vh]">
            {f.stages.map((s, i) => (
              <article
                key={s.tag}
                className={`f-card relative rounded-3xl border p-7 transition-all duration-700 md:p-10 ${
                  active === i ? "border-amber/40 bg-white/[0.07]" : "border-white/10 bg-white/[0.03] lg:opacity-50"
                }`}
              >
                <span
                  className={`absolute -left-[46px] top-12 hidden h-3 w-3 rounded-full transition-colors lg:block ${
                    active >= i ? "bg-amber" : "bg-white/20"
                  }`}
                  aria-hidden
                />
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-amber">{s.tag}</p>
                <h3 className="mt-4 text-3xl font-extrabold md:text-4xl">{s.name}</h3>
                <p className="mt-4 max-w-lg leading-relaxed text-white/65 md:text-lg">{s.desc}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {s.tools.map((t) => (
                    <span key={t} className="rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-white/80">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <Link
            href={{ pathname: "/layanan/[slug]", params: { slug: SERVICE_SLUGS.funnel[locale] } }}
            className="btn btn-primary mt-10 w-full lg:hidden"
          >
            {cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
