"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WhatsApp } from "@/components/icons";
import { useParams } from "next/navigation";
import { waLink } from "@/lib/site";

export default function WaFloat({
  message,
  label,
  bySlug = {},
}: {
  message: string;
  label: string;
  bySlug?: Record<string, string>;
}) {
  const [show, setShow] = useState(false);
  const params = useParams<{ slug?: string }>();
  const msg = (params?.slug && bySlug[params.slug]) || message;
  useEffect(() => {
    const on = () => setShow(window.scrollY > 500);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={waLink(msg)}
          target="_blank"
          rel="noopener noreferrer"
          data-wa-location="floating"
          aria-label={label}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="wa-pulse group fixed bottom-5 right-5 z-40 flex h-14 items-center gap-2 rounded-full bg-[#25D366] pl-4 pr-4 text-white shadow-[0_15px_40px_-10px_rgba(37,211,102,0.7)] md:bottom-7 md:right-7"
        >
          <WhatsApp className="h-6 w-6" />
          <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-500 group-hover:max-w-[160px] md:inline">
            {label}
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
