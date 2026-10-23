"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Link } from "@/i18n/navigation";
import { ArrowRight, WhatsApp } from "@/components/icons";
import { waLink } from "@/lib/site";
import type { SiteContent } from "@/content/types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ease = [0.16, 1, 0.3, 1] as const;

function Words({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.1, delay: delay + i * 0.07, ease }}
          >
            {w}
            {" "}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

const ORBIT_ANGLES = [-90, -18, 54, 126, 198];

export default function Hero({ hero, waMessage }: { hero: SiteContent["hero"]; waMessage: string }) {
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (reduce) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.8 },
      });
      tl.to(".dot-a", { xPercent: 52, ease: "none" }, 0)
        .to(".dot-b", { xPercent: -52, ease: "none" }, 0)
        .to(".orbit-chip", { scale: 0.4, opacity: 0, ease: "none", stagger: 0.02 }, 0)
        .to(".orbit-ring", { scale: 0.55, opacity: 0, ease: "none" }, 0)
        .to(".hero-copy", { yPercent: -12, opacity: 0.2, ease: "none" }, 0);
    },
    { scope: root, dependencies: [reduce] },
  );

  return (
    <section ref={root} className="relative overflow-hidden pb-16 pt-32 md:flex md:min-h-[100svh] md:flex-col md:justify-center md:pb-24 md:pt-36">
      {/* background */}
      <div
        className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,black_20%,transparent_70%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full bg-sky blur-3xl" aria-hidden />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12">
        <div className="hero-copy lg:col-span-7">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 py-1.5 pl-2 pr-4 text-[0.8rem] font-medium text-muted backdrop-blur"
          >
            <span className="flex gap-0.5">
              <span className="h-2 w-2 rounded-full bg-amber" />
              <span className="h-2 w-2 rounded-full bg-amber" />
            </span>
            {hero.eyebrow}
          </motion.p>

          <h1 className="mt-7 font-display text-[2.85rem] font-extrabold leading-[0.98] tracking-[-0.045em] text-navy-950 sm:text-6xl md:text-7xl lg:text-[4.1rem] xl:text-[4.75rem]">
            <Words text={hero.titleA} delay={0.1} className="block lg:whitespace-nowrap" />
            <span className="relative block text-navy lg:whitespace-nowrap">
              <Words text={hero.titleB} delay={0.35} />
              <motion.svg
                viewBox="0 0 300 20"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-[min(70%,420px)] text-amber md:h-4"
                aria-hidden
              >
                <motion.path
                  d="M3 14 C 70 4, 160 4, 297 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.9, ease }}
                />
              </motion.svg>
            </span>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease }}
            className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg"
          >
            {hero.sub}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.75, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/konsultasi" className="btn btn-primary">
              {hero.primary}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={waLink(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              data-wa-location="hero"
              className="btn btn-ghost"
            >
              <WhatsApp className="h-5 w-5 text-[#25D366]" />
              {hero.secondary}
            </a>
          </motion.div>
        </div>

        {/* Visual: dua titik + layanan yang mengorbit, menyatu saat scroll */}
        <div className="relative mx-auto aspect-square w-[80%] max-w-[460px] sm:w-full lg:col-span-5 lg:max-w-none">
          <div className="orbit-ring absolute inset-[6%] rounded-full border border-dashed border-navy/20" aria-hidden />
          <div className="orbit-ring absolute inset-[22%] rounded-full border border-navy/10" aria-hidden />

          <div className="absolute inset-0 grid place-items-center">
            <div className="flex items-center gap-[4%] w-[62%]">
              {["dot-a", "dot-b"].map((cls, i) => (
                <div key={cls} className={`${cls} flex-1`} style={{ mixBlendMode: "multiply" }}>
                  <motion.div
                    className="aspect-[1/0.86] w-full rounded-[46%] bg-amber shadow-[0_30px_60px_-20px_rgba(248,173,56,0.8)]"
                    initial={reduce ? false : { scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.4 + i * 0.12 }}
                  />
                </div>
              ))}
            </div>
          </div>

          {hero.chips.map((chip, i) => {
            const a = (ORBIT_ANGLES[i] * Math.PI) / 180;
            const r = 44;
            return (
              <div
                key={chip}
                className="absolute"
                style={{ left: `${50 + r * Math.cos(a)}%`, top: `${50 + r * Math.sin(a)}%`, transform: "translate(-50%,-50%)" }}
              >
                <span className="orbit-chip block">
                <motion.span
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-white px-3.5 py-2 text-[0.78rem] font-semibold text-navy shadow-[0_10px_30px_-12px_rgba(0,38,142,0.35)] md:text-sm"
                  initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                  transition={{
                    opacity: { delay: 0.8 + i * 0.1, duration: 0.6 },
                    scale: { delay: 0.8 + i * 0.1, duration: 0.6, ease },
                    y: { duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                  {chip}
                </motion.span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted md:flex" aria-hidden>
        {hero.scroll}
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute left-0 top-0 h-4 w-px bg-navy"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </div>
    </section>
  );
}
