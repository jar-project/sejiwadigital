import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  // 301 dari URL website lama (static HTML) supaya ranking SEO & link iklan lama tidak hilang
  async redirects() {
    const web = "/layanan/pembuatan-website";
    return [
      { source: "/jasa-pembuatan-website", destination: web, permanent: true },
      { source: "/jasa-website-company-profile", destination: web, permanent: true },
      { source: "/jasa-website-landing-page", destination: web, permanent: true },
      { source: "/jasa-website-toko-online", destination: web, permanent: true },
      { source: "/jasa-website-kursus-online", destination: web, permanent: true },
      { source: "/website-murah", destination: "/lp/pembuatan-website", permanent: true },
      { source: "/kontak", destination: "/konsultasi", permanent: true },
      { source: "/portofolio", destination: "/", permanent: true },
      { source: "/artikel/:path*", destination: "/", permanent: false },
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
