import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getContent, getServices } from "@/content";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Manifesto from "@/components/home/Manifesto";
import Problem from "@/components/home/Problem";
import ServicesGrid from "@/components/home/ServicesGrid";
import FunnelSection from "@/components/home/FunnelSection";
import Process from "@/components/home/Process";
import Work from "@/components/home/Work";
import Pricing from "@/components/sections/Pricing";
import Audit from "@/components/sections/Audit";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const c = getContent(locale);
  return pageMetadata({ locale, title: c.meta.title, description: c.meta.desc, hrefFor: () => "/" });
}

export default async function HomePage({ params }: Props) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const c = getContent(locale);
  const services = getServices(locale);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/brand/logo.png`,
      image: `${SITE.url}/brand/logo.png`,
      description: c.meta.desc,
      email: SITE.email,
      telephone: `+${SITE.whatsapp}`,
      areaServed: "ID",
      address: { "@type": "PostalAddress", addressLocality: "Jakarta", addressCountry: "ID" },
      sameAs: Object.values(SITE.social),
      knowsAbout: ["Web Development", "Google Ads", "Meta Ads", "TikTok Ads", "SEO"],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: c.faq.items.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <Hero hero={c.hero} waMessage={c.common.waGeneral} />
      <Marquee items={c.marquee} />
      <Manifesto m={c.manifesto} />
      <Problem p={c.problem} />
      <ServicesGrid section={c.servicesSection} services={services} locale={locale} startingFrom={c.common.startingFrom} />
      <FunnelSection f={c.funnel} locale={locale} cta={c.common.learnMore} />
      <Process p={c.process} />
      <Work w={c.work} />
      <Pricing p={c.pricing} services={services} common={c.common} />
      <Audit a={c.audit} />
      <Testimonials t={c.testimonials} />
      <Faq eyebrow={c.faq.eyebrow} title={c.faq.title} items={c.faq.items} />
      <FinalCta
        title={c.finalCta.title}
        sub={c.finalCta.sub}
        consult={c.common.consult}
        chatWa={c.common.chatWa}
        waMessage={c.common.waGeneral}
      />
    </>
  );
}
