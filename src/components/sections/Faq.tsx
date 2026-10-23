"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { Plus } from "@/components/icons";

export default function Faq({
  eyebrow,
  title,
  items,
  id = "faq",
}: {
  eyebrow: string;
  title: string;
  items: { q: string; a: string }[];
  id?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id={id} className="scroll-mt-24 py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow={eyebrow} title={title} />
        </div>
        <div className="lg:col-span-8">
          <ul className="divide-y divide-line border-y border-line">
            {items.map((it, i) => {
              const isOpen = open === i;
              return (
                <li key={it.q}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className={`text-lg font-semibold transition-colors md:text-xl ${isOpen ? "text-navy" : "text-navy-950"}`}>{it.q}</span>
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                        isOpen ? "rotate-45 border-amber bg-amber text-navy-950" : "border-line text-navy"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 leading-relaxed text-muted">{it.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
