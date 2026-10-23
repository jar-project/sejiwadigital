import { NextResponse } from "next/server";

/**
 * Terima lead dari form, validasi, lalu teruskan ke Google Apps Script → Google Sheet.
 * URL Apps Script disimpan di env (server only), tidak pernah terekspos ke browser.
 */

const MAX_BYTES = 20_000;
const MIN_FILL_MS = 2500; // bot biasanya submit < 2.5 detik
const hits = new Map<string, { n: number; t: number }>();

const clean = (v: unknown, max = 500) =>
  typeof v === "string" ? v.replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, max) : "";

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const phoneOk = (v: string) => {
  const d = v.replace(/\D/g, "");
  return d.length >= 9 && d.length <= 15;
};

function rateLimited(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.t > 60_000) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  h.n += 1;
  return h.n > 5; // maks 5 submit/menit per IP (best-effort di serverless)
}

export async function POST(req: Request) {
  const len = Number(req.headers.get("content-length") || 0);
  if (len > MAX_BYTES) return NextResponse.json({ ok: false }, { status: 413 });

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // Honeypot / terlalu cepat → pura-pura sukses supaya bot tidak tahu
  if (clean(body.website_url_confirm) || Number(body.elapsed_ms) < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const services = Array.isArray(body.services) ? body.services.map((s) => clean(s, 40)).filter(Boolean).slice(0, 10) : [];
  const attr = (typeof body.attribution === "object" && body.attribution) || {};
  const a = attr as Record<string, unknown>;

  const lead = {
    submitted_at: new Date().toISOString(),
    name: clean(body.name, 120),
    company: clean(body.company, 160),
    role: clean(body.role, 120),
    email: clean(body.email, 160).toLowerCase(),
    phone: clean(body.phone, 40),
    services: services.join(", "),
    industry: clean(body.industry, 120),
    website: clean(body.website, 200),
    company_size: clean(body.size, 40),
    budget: clean(body.budget, 60),
    timeline: clean(body.timeline, 60),
    notes: clean(body.notes, 2000),
    locale: clean(body.locale, 5),
    page: clean(body.page, 200),
    form_location: clean(body.form_location, 60),
    utm_source: clean(a.utm_source, 200),
    utm_medium: clean(a.utm_medium, 200),
    utm_campaign: clean(a.utm_campaign, 200),
    utm_term: clean(a.utm_term, 200),
    utm_content: clean(a.utm_content, 200),
    gclid: clean(a.gclid, 200),
    fbclid: clean(a.fbclid, 200),
    ttclid: clean(a.ttclid, 200),
    landing_page: clean(a.landing_page, 300),
    referrer: clean(a.referrer, 300),
  };

  if (!lead.name || !lead.company || !emailOk(lead.email) || !phoneOk(lead.phone) || services.length === 0) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  const url = process.env.APPS_SCRIPT_URL;
  const secret = process.env.APPS_SCRIPT_SECRET || "";

  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[lead] APPS_SCRIPT_URL belum di-set. Lead (dev):", lead);
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[lead] APPS_SCRIPT_URL missing");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ token: secret, lead }),
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    const text = await res.text();
    let ok = res.ok;
    try {
      ok = ok && JSON.parse(text).ok === true;
    } catch {
      ok = false;
    }
    if (!ok) {
      console.error("[lead] Apps Script error", res.status, text.slice(0, 300));
      return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] fetch failed", err);
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  }
}
