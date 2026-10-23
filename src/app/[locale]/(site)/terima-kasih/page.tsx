import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getContent } from "@/content";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/seo";
import { waLink } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight, Check, WhatsApp } from "@/components/icons";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = getContent(locale).thanks;
  return pageMetadata({ locale, title: t.metaTitle, description: t.sub, hrefFor: () => "/terima-kasih", noindex: true });
}

export default async function ThankYouPage({ params }: Props) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const c = getContent(locale);
  const t = c.thanks;

  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden pb-24 pt-36">
      <div className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_60%)]" aria-hidden />
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex w-fit gap-2" aria-hidden>
            <span className="h-10 w-10 animate-[float-dot_3s_ease-in-out_infinite] rounded-full bg-amber" />
            <span className="h-10 w-10 animate-[float-dot_3s_ease-in-out_0.4s_infinite] rounded-full bg-amber" />
          </div>
          <h1 className="mt-8 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-navy-950 md:text-6xl">{t.title}</h1>
          <p className="mt-5 text-muted md:text-lg">{t.sub}</p>

          <div className="card mt-10 p-7 text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-navy">{t.next}</p>
            <ol className="mt-5 space-y-4">
              {t.steps.map((s, i) => (
                <li key={s} className="flex items-center gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy font-display text-sm font-bold text-white">
                    {i === 0 ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
                  </span>
                  <span className="font-medium text-ink">{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={waLink(c.common.waGeneral)}
              target="_blank"
              rel="noopener noreferrer"
              data-wa-location="thank_you"
              className="btn bg-[#25D366] text-white hover:bg-[#1fbe5b]"
            >
              <WhatsApp className="h-5 w-5" />
              {t.wa}
            </a>
            <Link href="/" className="btn btn-ghost">
              {t.home}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
