import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getContent } from "@/content";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Process from "@/components/home/Process";
import FinalCta from "@/components/sections/FinalCta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const a = getContent(locale).about;
  return pageMetadata({ locale, title: a.metaTitle, description: a.metaDesc, hrefFor: () => "/tentang" });
}

export default async function AboutPage({ params }: Props) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const c = getContent(locale);
  const a = c.about;

  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.title} intro={a.intro} />

      <section className="bg-surface py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading title={a.storyTitle} />
          </div>
          <div className="space-y-6 lg:col-span-7">
            {a.story.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="font-display text-xl font-semibold leading-relaxed text-navy-950 md:text-2xl">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeading title={a.valuesTitle} />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {a.values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1} className={`rounded-3xl p-8 ${i === 1 ? "bg-navy text-white" : "card"}`}>
                <span className={`font-display text-5xl font-extrabold ${i === 1 ? "text-amber" : "text-navy/15"}`}>0{i + 1}</span>
                <h3 className="mt-6 text-2xl font-bold">{v.title}</h3>
                <p className={`mt-3 leading-relaxed ${i === 1 ? "text-white/70" : "text-muted"}`}>{v.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-navy-950 py-24 text-white md:py-32" data-cursor="dark">
        <div className="grid-lines-dark absolute inset-0" aria-hidden />
        <div className="container-x relative">
          <SectionHeading title={a.whyTitle} dark />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {a.why.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
                <span className="flex gap-1" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full bg-amber" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber" />
                </span>
                <h3 className="mt-5 text-xl font-bold">{w.title}</h3>
                <p className="mt-2 leading-relaxed text-white/60">{w.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Process p={c.process} />
      <FinalCta
        title={c.finalCta.title}
        sub={c.finalCta.sub}
        consult={c.common.consult}
        chatWa={c.common.chatWa}
        waMessage={c.common.waGeneral}
        location="about_final"
      />
    </>
  );
}
