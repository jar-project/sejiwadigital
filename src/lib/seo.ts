import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { SITE, SERVICE_SLUGS, type ServiceKey } from "./site";

type Href = Parameters<typeof getPathname>[0]["href"];

export function absUrl(locale: Locale, href: Href) {
  const path = getPathname({ locale, href });
  return `${SITE.url}${path === "/" ? "" : path}` || SITE.url;
}

/** Bangun metadata + hreflang. `hrefFor` memberi href per locale (untuk slug yang diterjemahkan). */
export function pageMetadata({
  locale,
  title,
  description,
  hrefFor,
  noindex = false,
}: {
  locale: Locale;
  title: string;
  description: string;
  hrefFor: (l: Locale) => Href;
  noindex?: boolean;
}): Metadata {
  const languages: Record<string, string> = {};
  routing.locales.forEach((l) => (languages[l === "id" ? "id-ID" : "en"] = absUrl(l, hrefFor(l))));
  languages["x-default"] = absUrl("id", hrefFor("id"));
  const canonical = absUrl(locale, hrefFor(locale));

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE.name,
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
  };
}

export const serviceHref = (key: ServiceKey) => (l: Locale) =>
  ({ pathname: "/layanan/[slug]", params: { slug: SERVICE_SLUGS[key][l] } }) as Href;
