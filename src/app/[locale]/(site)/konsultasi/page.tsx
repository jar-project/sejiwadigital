import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getContent } from "@/content";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { SITE, waLink } from "@/lib/site";
import LeadForm from "@/components/form/LeadForm";
import Reveal from "@/components/ui/Reveal";
import { Check, Mail, WhatsApp } from "@/components/icons";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const f = getContent(locale).form;
  return pageMetadata({ locale, title: f.metaTitle, description: f.metaDesc, hrefFor: () => "/konsultasi" });
}

export default async function ConsultationPage({ params }: Props) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const c = getContent(locale);
  const f = c.form;

  return (
    <section className="relative overflow-hidden pb-24 pt-32 md:pb-32 md:pt-44">
      <div
        className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_20%_10%,black_10%,transparent_60%)]"
        aria-hidden
      />
      <div className="container-x relative grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow">{f.eyebrow}</p>
            <h1 className="mt-5 font-display text-[2.4rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-navy-950 md:text-6xl">
              {f.title}
            </h1>
            <p className="mt-5 max-w-xl text-muted md:text-lg">{f.sub}</p>
          </Reveal>
          <Reveal delay={0.1} className="card mt-10 p-6 shadow-[0_40px_80px_-50px_rgba(0,38,142,0.5)] md:p-10">
            <LeadForm f={f} locale={locale} waMessage={c.common.waGeneral} location="consultation_page" />
          </Reveal>
        </div>

        <aside className="lg:col-span-5 lg:pt-40">
          <Reveal delay={0.2} className="relative overflow-hidden rounded-3xl bg-navy p-8 text-white md:p-10" data-cursor="dark">
            <div className="absolute -right-10 -top-10 flex gap-3" aria-hidden>
              <span className="h-24 w-24 rounded-full bg-amber" />
              <span className="h-24 w-24 rounded-full bg-amber" />
            </div>
            <h2 className="relative text-2xl font-extrabold">{f.side.title}</h2>
            <ul className="relative mt-6 space-y-4">
              {f.side.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-amber text-navy-950">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-white/85">{p}</span>
                </li>
              ))}
            </ul>
            <div className="relative mt-10 border-t border-white/15 pt-8">
              <p className="font-semibold">{f.side.waTitle}</p>
              <p className="mt-1 text-sm text-white/60">{f.side.waSub}</p>
              <a
                href={waLink(c.common.waGeneral)}
                target="_blank"
                rel="noopener noreferrer"
                data-wa-location="consultation_side"
                className="btn mt-5 w-full bg-[#25D366] text-white hover:bg-[#1fbe5b]"
              >
                <WhatsApp className="h-5 w-5" />
                {SITE.whatsappDisplay}
              </a>
              <a href={`mailto:${SITE.email}`} className="mt-4 flex items-center justify-center gap-2 text-sm text-white/70 hover:text-white">
                <Mail className="h-4 w-4" />
                {SITE.email}
              </a>
            </div>
          </Reveal>
        </aside>
      </div>
    </section>
  );
}
