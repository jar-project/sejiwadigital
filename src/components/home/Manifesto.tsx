"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { SiteContent } from "@/content/types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Teks besar yang "menyala" kata per kata mengikuti scroll. */
export default function Manifesto({ m }: { m: SiteContent["manifesto"] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".mw", { opacity: 1 });
        return;
      }
      gsap.fromTo(
        ".mw",
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: { trigger: ".m-text", start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
    },
    { scope: root },
  );

  const parts: { w: string; hl?: boolean }[] = [
    ...m.text.split(" ").map((w) => ({ w })),
    ...m.highlight.split(" ").map((w) => ({ w, hl: true })),
    ...m.after.split(" ").map((w) => ({ w })),
  ];

  return (
    <section ref={root} className="py-24 md:py-40">
      <div className="container-x">
        <p className="eyebrow">{m.eyebrow}</p>
        <p className="m-text mt-8 max-w-5xl font-display text-[1.9rem] font-bold leading-[1.18] tracking-[-0.03em] text-navy-950 md:text-[3.4rem]">
          {parts.map((p, i) => (
            <span key={i} className={`mw inline ${p.hl ? "text-navy" : ""}`}>
              {p.hl ? (
                <span className="relative whitespace-nowrap">
                  <span className="absolute inset-x-0 bottom-[0.08em] -z-10 h-[0.32em] bg-amber/70" aria-hidden />
                  {p.w}
                </span>
              ) : (
                p.w
              )}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
