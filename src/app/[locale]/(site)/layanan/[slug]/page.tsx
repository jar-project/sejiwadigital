import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getContent } from "@/content";
import { routing, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { pageMetadata, serviceHref, absUrl } from "@/lib/seo";
import { SERVICE_KEYS, SERVICE_SLUGS, SITE, serviceKeyFromSlug, waLink } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/sections/PageHero";
import OfferingCards from "@/components/sections/OfferingCards";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import Audit from "@/components/sections/Audit";
import Process from "@/components/home/Process";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight, Check, WhatsApp } from "@/components/icons";

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
  return pageMetadata({ locale: locale as Locale, title: s.metaTitle, description: s.metaDesc, hrefFor: serviceHref(key) });
}

export default async function ServicePage({ params }: Props) {
  const { locale: l, slug } = await params;
  const locale = l as Locale;
  setRequestLocale(locale);
  const key = resolve(locale, slug);
  if (!key) notFound();
  const c = getContent(locale);
  const s = c.services[key];
  const allFaqs = [...s.faqs, ...c.faq.items.slice(0, 3)];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.name,
      description: s.metaDesc,
      serviceType: s.name,
      areaServed: "ID",
      url: absUrl(locale, serviceHref(key)(locale)),
      provider: { "@type": "ProfessionalService", name: SITE.name, url: SITE.url },
      offers: s.offerings.map((o) => ({ "@type": "Offer", name: o.title, description: o.desc, priceCurrency: "IDR" })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absUrl(locale, "/") },
        { "@type": "ListItem", position: 2, name: s.name, item: absUrl(locale, serviceHref(key)(locale)) },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: allFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <PageHero eyebrow={s.eyebrow} title={s.title} intro={s.intro}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link href={{ pathname: "/konsultasi", query: { layanan: FORM_VALUE[key] } }} className="btn btn-primary">
            {c.common.consult}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a href={waLink(s.waMessage)} target="_blank" rel="noopener noreferrer" data-wa-location={`service_${key}_hero`} className="btn btn-ghost">
            <WhatsApp className="h-5 w-5 text-[#25D366]" />
            {c.common.chatWa}
          </a>
          <p className="text-sm text-muted sm:ml-4">
            {c.common.startingFrom} <span className="font-display text-lg font-bold text-navy">{s.startingFrom}</span>
          </p>
        </div>
      </PageHero>

      <section className="bg-surface py-24 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow={c.pricing.eyebrow} title={s.offeringsTitle} />
          <div className="mt-12">
            <OfferingCards
              offerings={s.offerings}
              startingFrom={c.common.startingFrom}
              ctaLabel={c.common.consult}
              serviceValue={FORM_VALUE[key]}
            />
          </div>
          <p className="mt-6 text-sm text-muted">
            {key === "ads" ? `${c.common.adSpendNote} ` : ""}
            {c.common.placeholderNote}
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading title={s.benefitsTitle} />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {s.benefits.map((b, i) => (
              <Reveal key={b.title} delay={(i % 2) * 0.1} className="card p-7">
                <span className="flex gap-1" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full bg-amber" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-navy-950">{b.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{b.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-navy-950 py-24 text-white md:py-28" data-cursor="dark">
        <div className="grid-lines-dark absolute inset-0" aria-hidden />
        <div className="container-x relative">
          <SectionHeading title={s.includedTitle} dark />
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {s.included.map((it, i) => (
              <Reveal key={it} delay={(i % 4) * 0.06}>
                <li className="flex h-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 font-medium">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-amber text-navy-950">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  {it}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Process p={c.process} />
      <Audit a={c.audit} />
      <Faq eyebrow={c.faq.eyebrow} title={c.faq.title} items={allFaqs} />
      <FinalCta
        title={c.finalCta.title}
        sub={c.finalCta.sub}
        consult={c.common.consult}
        chatWa={c.common.chatWa}
        waMessage={s.waMessage}
        location={`service_${key}_final`}
      />
    </>
  );
}
