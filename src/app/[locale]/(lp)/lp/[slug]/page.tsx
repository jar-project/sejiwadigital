import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getContent } from "@/content";
import { routing, type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { SERVICE_KEYS, SERVICE_SLUGS, serviceKeyFromSlug } from "@/lib/site";
import LeadForm from "@/components/form/LeadForm";
import OfferingCards from "@/components/sections/OfferingCards";
import Faq from "@/components/sections/Faq";
import Process from "@/components/home/Process";
import Testimonials from "@/components/sections/Testimonials";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { Check } from "@/components/icons";

type Props = { params: Promise<{ locale: string; slug: string }> };

const FORM_VALUE = { web: "Website", ads: "Google Ads", seo: "SEO", funnel: "Full-Funnel" } as const;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => SERVICE_KEYS.map((k) => ({ locale, slug: SERVICE_SLUGS[k][locale] })));
}
export const dynamicParams = false;

function resolve(locale: Locale, slug: string) {
  const key = serviceKeyFromSlug(slug);
  if (!key || SERVICE_SLUGS[key][locale] !== slug) return null;
  return key;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const key = resolve(locale as Locale, slug);
  if (!key) return {};
  const s = getContent(locale).services[key];
  // LP khusus iklan: noindex supaya tidak bersaing dengan halaman layanan di Google
  return pageMetadata({
    locale: locale as Locale,
    title: s.metaTitle,
    description: s.metaDesc,
    hrefFor: (l) => ({ pathname: "/lp/[slug]", params: { slug: SERVICE_SLUGS[key][l] } }),
    noindex: true,
  });
}

export default async function LandingPage({ params }: Props) {
  const { locale: l, slug } = await params;
  const locale = l as Locale;
  setRequestLocale(locale);
  const key = resolve(locale, slug);
  if (!key) notFound();
  const c = getContent(locale);
  const s = c.services[key];

  return (
    <>
      <section className="relative overflow-hidden bg-surface pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_20%_30%,black_10%,transparent_65%)]" aria-hidden />
        <div className="container-x relative grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-6 lg:pt-8">
            <p className="eyebrow">{s.eyebrow}</p>
            <h1 className="mt-5 font-display text-[2.3rem] font-extrabold leading-[1.04] tracking-[-0.04em] text-navy-950 md:text-6xl">
              {s.lp.title}
            </h1>
            <p className="mt-6 max-w-xl text-muted md:text-lg">{s.lp.sub}</p>
            <ul className="mt-8 space-y-3">
              {s.lp.bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 font-medium text-navy-950">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-amber text-navy-950">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted">
              {c.common.startingFrom} <span className="font-display text-2xl font-extrabold text-navy">{s.startingFrom}</span>
            </p>
          </Reveal>
          <Reveal delay={0.1} className="card p-6 shadow-[0_40px_80px_-40px_rgba(0,38,142,0.55)] md:p-9 lg:col-span-6">
            <p className="font-display text-xl font-bold text-navy-950">{c.form.title}</p>
            <p className="mb-6 mt-1 text-sm text-muted">{c.form.sub}</p>
            <LeadForm
              f={c.form}
              locale={locale}
              waMessage={s.waMessage}
              location={`lp_${key}`}
              defaultServices={[FORM_VALUE[key]]}
            />
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow={c.pricing.eyebrow} title={s.offeringsTitle} />
          <div className="mt-12">
            <OfferingCards offerings={s.offerings} startingFrom={c.common.startingFrom} ctaLabel={c.common.consult} serviceValue={FORM_VALUE[key]} />
          </div>
        </div>
      </section>

      <section className="bg-surface py-24 md:py-28">
        <div className="container-x">
          <SectionHeading title={s.benefitsTitle} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {s.benefits.map((b) => (
              <div key={b.title} className="card p-7">
                <h3 className="text-lg font-bold text-navy-950">{b.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Process p={c.process} />
      <Testimonials t={c.testimonials} />
      <Faq eyebrow={c.faq.eyebrow} title={c.faq.title} items={[...s.faqs, ...c.faq.items.slice(0, 2)]} />
    </>
  );
}
