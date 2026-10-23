"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, usePathname } from "@/i18n/navigation";
import Logo from "@/components/ui/Logo";
import LocaleSwitcher from "./LocaleSwitcher";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, WhatsApp, X } from "@/components/icons";
import { SERVICE_ICON } from "@/components/serviceIcons";
import { waLink, type ServiceKey } from "@/lib/site";
import type { SiteContent } from "@/content/types";

type NavService = { key: ServiceKey; slug: string; name: string; short: string };

export default function Navbar({
  nav,
  waMessage,
  services,
}: {
  nav: SiteContent["nav"];
  waMessage: string;
  services: NavService[];
}) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 400 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDrop(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
          hidden && !open && !drop ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="container-x pt-3 md:pt-4">
          <nav
            className={`flex h-16 items-center justify-between rounded-full pl-5 pr-2 transition-all duration-500 md:h-[4.25rem] md:pl-7 ${
              scrolled || drop
                ? "border border-line/80 bg-white/85 shadow-[0_10px_40px_-20px_rgba(0,38,142,0.35)] backdrop-blur-xl"
                : "border border-transparent bg-transparent"
            }`}
            aria-label="Main"
          >
            <Link href="/" aria-label="Sejiwa Digital home" className="shrink-0">
              <Logo priority className="!w-[104px] md:!w-[116px]" />
            </Link>

            <ul className="hidden items-center gap-1 text-[0.92rem] font-medium text-ink lg:flex">
              <li className="relative" onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-full px-4 py-2 transition-colors hover:text-navy"
                  aria-expanded={drop}
                  onClick={() => setDrop((v) => !v)}
                >
                  {nav.services}
                  <ChevronDown className={`h-4 w-4 transition-transform ${drop ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {drop && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-1/2 top-full w-[600px] -translate-x-1/2 pt-3"
                    >
                      <div className="grid grid-cols-2 gap-1 rounded-3xl border border-line bg-white p-2 shadow-[0_30px_80px_-30px_rgba(0,38,142,0.4)]">
                        {services.map((s) => {
                          const Icon = SERVICE_ICON[s.key];
                          return (
                            <Link
                              key={s.key}
                              href={{ pathname: "/layanan/[slug]", params: { slug: s.slug } }}
                              className={`group flex gap-3 rounded-2xl p-4 transition-colors hover:bg-surface ${
                                s.key === "funnel" ? "bg-navy-950 text-white hover:!bg-navy-900" : ""
                              }`}
                            >
                              <span
                                className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                                  s.key === "funnel" ? "bg-amber text-navy-950" : "bg-sky text-navy"
                                }`}
                              >
                                <Icon />
                              </span>
                              <span>
                                <span className="flex items-center gap-1 font-semibold">
                                  {s.name}
                                  <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                                </span>
                                <span
                                  className={`mt-1 line-clamp-2 block text-[0.8rem] leading-snug ${
                                    s.key === "funnel" ? "text-white/60" : "text-muted"
                                  }`}
                                >
                                  {s.short}
                                </span>
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
              <li>
                <Link href="/tentang" className="rounded-full px-4 py-2 transition-colors hover:text-navy">
                  {nav.about}
                </Link>
              </li>
              <li>
                <Link href={{ pathname: "/", hash: "pricing" }} className="rounded-full px-4 py-2 transition-colors hover:text-navy">
                  {nav.pricing}
                </Link>
              </li>
              <li>
                <Link href={{ pathname: "/", hash: "faq" }} className="rounded-full px-4 py-2 transition-colors hover:text-navy">
                  {nav.faq}
                </Link>
              </li>
            </ul>

            <div className="flex items-center gap-2">
              <div className="hidden md:block">
                <LocaleSwitcher />
              </div>
              <Link href="/konsultasi" className="btn btn-primary hidden !h-11 !px-5 text-sm sm:inline-flex">
                {nav.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                className="grid h-11 w-11 place-items-center rounded-full bg-navy text-white lg:hidden"
                onClick={() => setOpen(true)}
                aria-label={nav.menu}
              >
                <Menu />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-navy-950 text-white lg:hidden"
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            data-cursor="dark"
            data-lenis-prevent
          >
            <div className="container-x flex h-[76px] items-center justify-between pt-3">
              <Logo variant="white" className="!w-[104px]" />
              <button
                type="button"
                className="grid h-11 w-11 place-items-center rounded-full bg-white/10"
                onClick={() => setOpen(false)}
                aria-label={nav.close}
              >
                <X />
              </button>
            </div>
            <div className="container-x flex flex-1 flex-col overflow-y-auto pb-8 pt-6">
              <p className="eyebrow eyebrow-light">{nav.services}</p>
              <ul className="mt-4 space-y-1">
                {services.map((s, i) => (
                  <motion.li
                    key={s.key}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={{ pathname: "/layanan/[slug]", params: { slug: s.slug } }}
                      className="flex items-center justify-between border-b border-white/10 py-4 font-display text-2xl font-bold"
                    >
                      {s.name}
                      <ArrowUpRight className="h-5 w-5 text-amber" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-white/70">
                <Link href="/tentang">{nav.about}</Link>
                <Link href={{ pathname: "/", hash: "pricing" }}>{nav.pricing}</Link>
                <Link href={{ pathname: "/", hash: "faq" }}>{nav.faq}</Link>
              </div>
              <div className="mt-6">
                <LocaleSwitcher dark />
              </div>
              <div className="mt-auto grid gap-3 pt-10">
                <Link href="/konsultasi" className="btn btn-primary w-full">
                  {nav.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={waLink(waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-wa-location="mobile_menu"
                  className="btn btn-ghost-light w-full"
                >
                  <WhatsApp className="h-5 w-5" />
                  {nav.wa}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
