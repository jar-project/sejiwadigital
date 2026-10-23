"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { SERVICE_SLUGS, serviceKeyFromSlug } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export default function LocaleSwitcher({ dark = false }: { dark?: boolean }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams<{ slug?: string }>();
  const router = useRouter();

  const go = (next: Locale) => {
    if (next === locale) return;
    const slug = params?.slug;
    if (slug && (pathname === "/layanan/[slug]" || pathname === "/lp/[slug]")) {
      const key = serviceKeyFromSlug(slug);
      const mapped = key ? SERVICE_SLUGS[key][next] : slug;
      router.replace({ pathname, params: { slug: mapped } } as never, { locale: next });
      return;
    }
    router.replace(pathname as never, { locale: next });
  };

  return (
    <div
      className={`flex items-center rounded-full border p-1 text-xs font-semibold ${
        dark ? "border-white/20 text-white/70" : "border-line text-muted"
      }`}
      role="group"
      aria-label="Language"
    >
      {(["id", "en"] as Locale[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => go(l)}
          aria-pressed={l === locale}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            l === locale ? (dark ? "bg-white text-navy" : "bg-navy text-white") : dark ? "hover:text-white" : "hover:text-navy"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
