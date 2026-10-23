import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getContent } from "@/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Sejiwa Digital";

const font = (w: number) =>
  readFile(join(process.cwd(), `node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-${w}-normal.woff`));

export default async function OgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = getContent(locale);
  const [bold, semi] = await Promise.all([font(800), font(600)]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#070F36",
          padding: "72px 80px",
          fontFamily: "Jakarta",
          color: "white",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", right: -80, top: -60, display: "flex", gap: 28 }}>
          <div style={{ width: 300, height: 260, borderRadius: 150, background: "#F8AD38" }} />
          <div style={{ width: 300, height: 260, borderRadius: 150, background: "#F8AD38" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30, fontWeight: 600, color: "#F8AD38" }}>
          SEJIWA DIGITAL
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 86, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3, display: "flex", flexDirection: "column" }}>
            <span>{c.hero.titleA}</span>
            <span style={{ color: "#F8AD38" }}>{c.hero.titleB}</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 30, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>
            Website · Google Ads · Meta Ads · TikTok Ads · SEO
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Jakarta", data: bold, weight: 800, style: "normal" },
        { name: "Jakarta", data: semi, weight: 600, style: "normal" },
      ],
    },
  );
}
