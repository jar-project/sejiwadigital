"use client";

const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "ttclid"] as const;
const STORE = "sejiwa_attr";

export type Attribution = Partial<Record<(typeof KEYS)[number], string>> & {
  landing_page?: string;
  referrer?: string;
  first_seen?: string;
};

function safeGet(): Attribution | null {
  try {
    const raw = window.localStorage.getItem(STORE);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

/** Simpan atribusi: first-touch, tapi di-update kalau datang dari klik iklan baru. */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const fresh: Attribution = {};
  KEYS.forEach((k) => {
    const v = params.get(k);
    if (v) fresh[k] = v.slice(0, 200);
  });
  const existing = safeGet();
  const hasFresh = Object.keys(fresh).length > 0;
  if (existing && !hasFresh) return;
  const data: Attribution = {
    ...fresh,
    landing_page: window.location.pathname + window.location.search,
    referrer: document.referrer || "(direct)",
    first_seen: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(STORE, JSON.stringify(data));
  } catch {
    /* storage diblokir: abaikan */
  }
}

export function getAttribution(): Attribution {
  return safeGet() ?? {};
}

type DL = { dataLayer?: Record<string, unknown>[] };

export function pushEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as DL;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}
