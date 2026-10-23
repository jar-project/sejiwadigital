"use client";

import { useEffect } from "react";
import { captureAttribution, pushEvent } from "@/lib/tracking";

/** Simpan UTM/gclid/fbclid + kirim event setiap klik WhatsApp. */
export default function TrackingClient() {
  useEffect(() => {
    captureAttribution();
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.includes("wa.me/")) {
        pushEvent("whatsapp_click", {
          wa_location: a.dataset.waLocation || "unknown",
          page_path: window.location.pathname,
        });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
