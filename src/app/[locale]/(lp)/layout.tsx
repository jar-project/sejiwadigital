import Logo from "@/components/ui/Logo";
import WaFloat from "@/components/layout/WaFloat";
import { getContent } from "@/content";
import { SERVICE_KEYS, SERVICE_SLUGS, SITE, waLink } from "@/lib/site";
import { WhatsApp } from "@/components/icons";
import type { Locale } from "@/i18n/routing";

/** Layout landing page iklan: tanpa navbar, fokus konversi. */
export default async function LpLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale as Locale;
  const c = getContent(locale);
  const bySlug = Object.fromEntries(SERVICE_KEYS.map((k) => [SERVICE_SLUGS[k][locale], c.services[k].waMessage]));

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-40">
        <div className="container-x flex h-20 items-center justify-between">
          <Logo priority className="!w-[110px]" />
          <a
            href={waLink(c.common.waGeneral)}
            target="_blank"
            rel="noopener noreferrer"
            data-wa-location="lp_header"
            className="btn btn-ghost !h-11 !px-4 text-sm"
          >
            <WhatsApp className="h-5 w-5 text-[#25D366]" />
            <span className="hidden sm:inline">{SITE.whatsappDisplay}</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-line py-8 text-center text-sm text-muted">
        © {new Date().getFullYear()} Sejiwa Digital · {SITE.email}
      </footer>
      <WaFloat message={c.common.waGeneral} label={c.common.chatWa} bySlug={bySlug} />
    </>
  );
}
