import { Link } from "@/i18n/navigation";
import Logo from "@/components/ui/Logo";
import { Mail, Pin, WhatsApp } from "@/components/icons";
import { SITE, SERVICE_SLUGS, SERVICE_KEYS, waLink } from "@/lib/site";
import { getContent } from "@/content";
import type { Locale } from "@/i18n/routing";

export default function Footer({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white" data-cursor="dark">
      <div className="grid-lines-dark absolute inset-0 opacity-60" aria-hidden />
      <div className="container-x relative pb-10 pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo variant="white" className="!w-[150px]" />
            <p className="mt-6 max-w-sm leading-relaxed text-white/60">{c.footer.tagline}</p>
            <div className="mt-8 flex gap-3">
              {Object.entries(SITE.social).map(([k, href]) => (
                <a
                  key={k}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 px-4 py-2 text-sm capitalize text-white/70 transition-colors hover:border-amber hover:text-amber"
                >
                  {k}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-amber">{c.footer.services}</p>
            <ul className="mt-5 space-y-3 text-white/70">
              {SERVICE_KEYS.map((k) => (
                <li key={k}>
                  <Link
                    href={{ pathname: "/layanan/[slug]", params: { slug: SERVICE_SLUGS[k][locale] } }}
                    className="transition-colors hover:text-white"
                  >
                    {c.services[k].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-amber">{c.footer.contact}</p>
            <ul className="mt-5 space-y-4 text-white/70">
              <li>
                <a
                  href={waLink(c.common.waGeneral)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-wa-location="footer"
                  className="flex items-center gap-3 transition-colors hover:text-white"
                >
                  <WhatsApp className="h-5 w-5 text-amber" />
                  {SITE.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 transition-colors hover:text-white">
                  <Mail className="h-5 w-5 text-amber" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Pin className="h-5 w-5 text-amber" />
                {c.footer.address}
              </li>
            </ul>
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-amber">{c.footer.company}</p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-white/70">
              <li><Link href="/tentang" className="hover:text-white">{c.nav.about}</Link></li>
              <li><Link href="/konsultasi" className="hover:text-white">{c.nav.cta}</Link></li>
              <li><Link href={{ pathname: "/", hash: "faq" }} className="hover:text-white">{c.nav.faq}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 select-none font-display text-[19vw] font-extrabold leading-[0.8] tracking-[-0.06em] text-white/[0.04] md:text-[13.5rem]" aria-hidden>
          sejiwa
        </div>

        <div className="mt-6 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/45 md:flex-row">
          <p>© {year} Sejiwa Digital. {c.footer.rights}</p>
          <p>sejiwadigital.com</p>
        </div>
      </div>
    </footer>
  );
}
