import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WaFloat from "@/components/layout/WaFloat";
import { getContent } from "@/content";
import { SERVICE_KEYS, SERVICE_SLUGS } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale as Locale;
  const c = getContent(locale);
  const services = SERVICE_KEYS.map((k) => ({
    key: k,
    slug: SERVICE_SLUGS[k][locale],
    name: c.services[k].name,
    short: c.services[k].short,
  }));
  const bySlug = Object.fromEntries(SERVICE_KEYS.map((k) => [SERVICE_SLUGS[k][locale], c.services[k].waMessage]));

  return (
    <>
      <Navbar nav={c.nav} waMessage={c.common.waGeneral} services={services} />
      <main>{children}</main>
      <Footer locale={locale} />
      <WaFloat message={c.common.waGeneral} label={c.common.chatWa} bySlug={bySlug} />
    </>
  );
}
