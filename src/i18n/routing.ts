import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["id", "en"],
  defaultLocale: "id",
  // Bahasa Indonesia di root (/), English di /en
  localePrefix: "as-needed",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/layanan/[slug]": { id: "/layanan/[slug]", en: "/services/[slug]" },
    "/tentang": { id: "/tentang", en: "/about" },
    "/konsultasi": { id: "/konsultasi", en: "/consultation" },
    "/terima-kasih": { id: "/terima-kasih", en: "/thank-you" },
    "/lp/[slug]": "/lp/[slug]",
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
