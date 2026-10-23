import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { SiteContent } from "@/content/types";

const TONES = {
  navy: { bg: "bg-navy", ui: "bg-white/10", accent: "bg-amber", text: "text-white" },
  sky: { bg: "bg-sky", ui: "bg-navy/10", accent: "bg-navy", text: "text-navy" },
  amber: { bg: "bg-amber", ui: "bg-navy-950/10", accent: "bg-navy-950", text: "text-navy-950" },
  ink: { bg: "bg-navy-950", ui: "bg-white/10", accent: "bg-amber", text: "text-white" },
};

/**
 * PLACEHOLDER: mockup abstrak. Ganti dengan screenshot asli
 * (taruh di /public/work/*.webp lalu pakai <Image>).
 */
function Mock({ tone }: { tone: keyof typeof TONES }) {
  const t = TONES[tone];
  return (
    <div className={`relative aspect-[16/11] overflow-hidden rounded-[1.25rem] ${t.bg}`}>
      <div className="absolute inset-x-[7%] top-[10%] bottom-0 overflow-hidden rounded-t-xl bg-white shadow-2xl transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-3 group-hover:scale-[1.02]">
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2.5">
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="ml-3 h-2 w-1/3 rounded-full bg-surface" />
        </div>
        <div className="p-[6%]">
          <div className="flex items-center justify-between">
            <span className="h-2.5 w-14 rounded-full bg-navy" />
            <span className="flex gap-2">
              <span className="h-2 w-8 rounded-full bg-line" />
              <span className="h-2 w-8 rounded-full bg-line" />
              <span className={`h-2 w-10 rounded-full ${t.accent}`} />
            </span>
          </div>
          <div className="mt-[8%] grid grid-cols-5 gap-4">
            <div className="col-span-3 space-y-2.5">
              <span className="block h-3.5 w-11/12 rounded-full bg-navy-950/85" />
              <span className="block h-3.5 w-8/12 rounded-full bg-navy-950/85" />
              <span className="block h-2 w-10/12 rounded-full bg-line" />
              <span className="block h-2 w-7/12 rounded-full bg-line" />
              <span className={`mt-3 block h-5 w-20 rounded-full ${t.accent}`} />
            </div>
            <div className="col-span-2 aspect-square rounded-xl bg-surface" />
          </div>
          <div className="mt-[8%] grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-14 rounded-lg bg-surface" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Work({ w }: { w: SiteContent["work"] }) {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="container-x">
        <SectionHeading eyebrow={w.eyebrow} title={w.title} sub={w.sub} />
        <div className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-2">
          {w.items.map((it, i) => (
            <Reveal key={it.name} delay={(i % 2) * 0.12} className={i % 2 === 1 ? "md:mt-16" : ""}>
              <article className="group">
                <Mock tone={it.tone} />
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-navy-950">{it.name}</h3>
                    <p className="mt-1 text-muted">{it.category}</p>
                  </div>
                  <span className="shrink-0 rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-navy">
                    {it.tag}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
