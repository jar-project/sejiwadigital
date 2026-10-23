export const SITE = {
  name: "Sejiwa Digital",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://sejiwadigital.com").replace(/\/$/, ""),
  email: "kontak@sejiwadigital.com",
  whatsapp: "6285138747131",
  whatsappDisplay: "+62 851-3874-7131",
  city: "Jakarta, Indonesia",
  social: {
    instagram: "https://instagram.com/sejiwadigital",
    linkedin: "https://www.linkedin.com/company/sejiwadigital",
    tiktok: "https://www.tiktok.com/@sejiwadigital",
  },
};

export function waLink(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const SERVICE_KEYS = ["web", "ads", "seo", "funnel"] as const;
export type ServiceKey = (typeof SERVICE_KEYS)[number];

export const SERVICE_SLUGS: Record<ServiceKey, { id: string; en: string }> = {
  web: { id: "pembuatan-website", en: "web-development" },
  ads: { id: "iklan-digital", en: "performance-ads" },
  seo: { id: "jasa-seo", en: "seo" },
  funnel: { id: "full-funnel", en: "full-funnel" },
};

export function serviceKeyFromSlug(slug: string): ServiceKey | undefined {
  return SERVICE_KEYS.find(
    (k) => SERVICE_SLUGS[k].id === slug || SERVICE_SLUGS[k].en === slug,
  );
}
