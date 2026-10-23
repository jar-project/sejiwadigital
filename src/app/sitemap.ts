import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { SITE, SERVICE_KEYS, SERVICE_SLUGS } from "@/lib/site";

type Href = Parameters<typeof getPathname>[0]["href"];

const url = (locale: Locale, href: Href) => {
  const p = getPathname({ locale, href });
  return `${SITE.url}${p === "/" ? "" : p}`;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: { href: (l: Locale) => Href; priority: number }[] = [
    { href: () => "/", priority: 1 },
    ...SERVICE_KEYS.map((k) => ({
      href: (l: Locale) => ({ pathname: "/layanan/[slug]", params: { slug: SERVICE_SLUGS[k][l] } }) as Href,
      priority: 0.9,
    })),
    { href: () => "/tentang", priority: 0.6 },
    { href: () => "/konsultasi", priority: 0.8 },
  ];

  return entries.flatMap((e) =>
    routing.locales.map((locale) => ({
      url: url(locale, e.href(locale)),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: locale === "id" ? e.priority : e.priority * 0.8,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l === "id" ? "id-ID" : "en", url(l, e.href(l))])),
      },
    })),
  );
}
