"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import OfferingCards from "./OfferingCards";
import type { Service, SiteContent } from "@/content/types";

const FORM_VALUE: Record<string, string> = {
  web: "Website",
  ads: "Google Ads",
  seo: "SEO",
  funnel: "Full-Funnel",
};

export default function Pricing({
  p,
  services,
  common,
}: {
  p: SiteContent["pricing"];
  services: Service[];
  common: SiteContent["common"];
}) {
  const [tab, setTab] = useState(0);
  const s = services[tab];

  return (
    <section id="pricing" className="scroll-mt-24 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading eyebrow={p.eyebrow} title={p.title} sub={p.sub} align="center" />

        <div className="mt-10 flex justify-center">
          <div className="no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-full border border-line bg-surface p-1.5" role="tablist">
            {services.map((sv, i) => (
              <button
                key={sv.key}
                role="tab"
                type="button"
                aria-selected={tab === i}
                onClick={() => setTab(i)}
                className={`relative whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-colors md:px-6 ${
                  tab === i ? "text-white" : "text-muted hover:text-navy"
                }`}
              >
                {tab === i && (
                  <motion.span
                    layoutId="price-tab"
                    className="absolute inset-0 rounded-full bg-navy"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">{sv.name}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={s.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10"
            role="tabpanel"
          >
            <OfferingCards
              offerings={s.offerings}
              startingFrom={common.startingFrom}
              ctaLabel={common.consult}
              serviceValue={FORM_VALUE[s.key]}
            />
            <p className="mt-6 text-center text-sm text-muted">
              {s.key === "ads" ? `${common.adSpendNote} ` : ""}
              {common.placeholderNote}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
