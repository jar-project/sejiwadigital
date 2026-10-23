"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "@/i18n/navigation";
import { ArrowRight, Check, WhatsApp } from "@/components/icons";
import { getAttribution, pushEvent } from "@/lib/tracking";
import { waLink } from "@/lib/site";
import type { SiteContent } from "@/content/types";

type F = SiteContent["form"];

type State = {
  services: string[];
  company: string;
  industry: string;
  website: string;
  size: string;
  budget: string;
  timeline: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  notes: string;
};

const EMPTY: State = {
  services: [],
  company: "",
  industry: "",
  website: "",
  size: "",
  budget: "",
  timeline: "",
  name: "",
  role: "",
  email: "",
  phone: "",
  notes: "",
};

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
const phoneOk = (v: string) => {
  const d = v.replace(/\D/g, "");
  return d.length >= 9 && d.length <= 15;
};

function Chips({
  options,
  value,
  onPick,
  multi = false,
  name,
}: {
  options: { value: string; label: string }[];
  value: string | string[];
  onPick: (v: string) => void;
  multi?: boolean;
  name: string;
}) {
return (
  <div className="flex flex-wrap gap-2" role={multi ? "group" : "radiogroup"} aria-label={name}>
    {options.map((o) => {
      const active = Array.isArray(value) ? value.includes(o.value) : value === o.value;
      return (
        <button
          key={o.value}
          type="button"
          className="chip"
          data-active={active}
          aria-pressed={active}
          onClick={() => onPick(o.value)}
        >
          {multi && (
            <span
              className={`grid h-4 w-4 place-items-center rounded-full border ${active ? "border-amber bg-amber text-navy-950" : "border-line"}`}
            >
              {active && <Check className="h-3 w-3" strokeWidth={3} />}
            </span>
          )}
          {o.label}
        </button>
      );
    })}
  </div>
);
}

export default function LeadForm({
  f,
  locale,
  waMessage,
  location = "consultation_page",
  defaultServices = [],
  dark = false,
}: {
  f: F;
  locale: string;
  waMessage: string;
  location?: string;
  defaultServices?: string[];
  dark?: boolean;
}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [s, setS] = useState<State>({ ...EMPTY, services: defaultServices });
  const [errors, setErrors] = useState<Partial<Record<keyof State, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const hp = useRef<HTMLInputElement>(null);
  const startedAt = useRef<number>(Date.now());
  const topRef = useRef<HTMLDivElement>(null);

  // Preselect dari URL: ?layanan=SEO atau ?tipe=audit
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const pre: string[] = [];
    const lay = q.get("layanan");
    if (lay && f.serviceOptions.some((o) => o.value === lay)) pre.push(lay);
    if (q.get("tipe") === "audit") pre.push("Audit");
    if (pre.length) setS((p) => ({ ...p, services: Array.from(new Set([...p.services, ...pre])) }));
  }, [f.serviceOptions]);

  const set = <K extends keyof State>(k: K, v: State[K]) => {
    setS((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (i: number) => {
    const e: Partial<Record<keyof State, string>> = {};
    if (i === 0 && s.services.length === 0) e.services = f.errors.services;
    if (i === 1 && !s.company.trim()) e.company = f.errors.company;
    if (i === 2) {
      if (!s.budget) e.budget = f.errors.budget;
      if (!s.timeline) e.timeline = f.errors.timeline;
    }
    if (i === 3) {
      if (!s.name.trim()) e.name = f.errors.name;
      if (!emailOk(s.email)) e.email = f.errors.email;
      if (!phoneOk(s.phone)) e.phone = f.errors.phone;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const go = (to: number) => {
    setDir(to > step ? 1 : -1);
    setStep(to);
    if (to === 1) pushEvent("form_start", { form_location: location });
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const next = () => validate(step) && go(step + 1);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) return next();
    if (!validate(3)) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...s,
          locale,
          page: window.location.pathname,
          form_location: location,
          elapsed_ms: Date.now() - startedAt.current,
          website_url_confirm: hp.current?.value ?? "",
          attribution: getAttribution(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      pushEvent("generate_lead", {
        form_location: location,
        lead_services: s.services.join(", "),
        lead_budget: s.budget,
      });
      router.push("/terima-kasih");
    } catch {
      setStatus("error");
    }
  };

  const label = `mb-2 block text-sm font-semibold ${dark ? "text-white" : "text-navy-950"}`;
  const err = "mt-2 text-sm font-medium text-red-500";

  const toOpts = (arr: string[]) => arr.map((v) => ({ value: v, label: v }));

  return (
    <form onSubmit={submit} noValidate className="relative">
      <div ref={topRef} className="scroll-mt-28" />
      {/* Progress */}
      <ol className="mb-8 grid grid-cols-4 gap-2">
        {f.steps.map((t, i) => (
          <li key={t}>
            <button
              type="button"
              disabled={i > step}
              onClick={() => i < step && go(i)}
              className="w-full text-left disabled:cursor-default"
            >
              <span className={`block h-1.5 overflow-hidden rounded-full ${dark ? "bg-white/15" : "bg-line"}`}>
                <motion.span
                  className="block h-full rounded-full bg-amber"
                  initial={false}
                  animate={{ width: i <= step ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
              <span
                className={`mt-2 block text-xs font-semibold ${
                  i === step ? (dark ? "text-white" : "text-navy") : dark ? "text-white/45" : "text-muted"
                }`}
              >
                {i + 1}. {t}
              </span>
            </button>
          </li>
        ))}
      </ol>

      {/* Honeypot: tersembunyi dari manusia */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label>
          Website URL
          <input ref={hp} type="text" name="website_url_confirm" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="relative min-h-[300px]">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={step}
            custom={dir}
            initial={{ opacity: 0, x: dir * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -30 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 0 && (
              <div>
                <p className={label}>{f.servicesLabel}</p>
                <Chips
                  name={f.servicesLabel}
                  multi
                  options={f.serviceOptions}
                  value={s.services}
                  onPick={(v) =>
                    set("services", s.services.includes(v) ? s.services.filter((x) => x !== v) : [...s.services, v])
                  }
                />
                {errors.services && <p className={err}>{errors.services}</p>}
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="lf-company" className={label}>{f.companyLabel}</label>
                  <input
                    id="lf-company"
                    className="input"
                    value={s.company}
                    onChange={(e) => set("company", e.target.value)}
                    placeholder={f.companyPh}
                    autoComplete="organization"
                    aria-invalid={!!errors.company}
                  />
                  {errors.company && <p className={err}>{errors.company}</p>}
                </div>
                <div>
                  <label htmlFor="lf-industry" className={label}>{f.industryLabel}</label>
                  <input id="lf-industry" className="input" value={s.industry} onChange={(e) => set("industry", e.target.value)} placeholder={f.industryPh} />
                </div>
                <div>
                  <label htmlFor="lf-website" className={label}>{f.websiteLabel}</label>
                  <input id="lf-website" className="input" value={s.website} onChange={(e) => set("website", e.target.value)} placeholder={f.websitePh} inputMode="url" />
                </div>
                <div className="sm:col-span-2">
                  <p className={label}>{f.sizeLabel}</p>
                  <Chips name={f.sizeLabel} options={toOpts(f.sizeOptions)} value={s.size} onPick={(v) => set("size", v)} />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-7">
                <div>
                  <p className={label}>{f.budgetLabel}</p>
                  <Chips name={f.budgetLabel} options={toOpts(f.budgetOptions)} value={s.budget} onPick={(v) => set("budget", v)} />
                  {errors.budget && <p className={err}>{errors.budget}</p>}
                </div>
                <div>
                  <p className={label}>{f.timelineLabel}</p>
                  <Chips name={f.timelineLabel} options={toOpts(f.timelineOptions)} value={s.timeline} onPick={(v) => set("timeline", v)} />
                  {errors.timeline && <p className={err}>{errors.timeline}</p>}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="lf-name" className={label}>{f.nameLabel}</label>
                  <input id="lf-name" className="input" value={s.name} onChange={(e) => set("name", e.target.value)} placeholder={f.namePh} autoComplete="name" aria-invalid={!!errors.name} />
                  {errors.name && <p className={err}>{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="lf-role" className={label}>{f.roleLabel}</label>
                  <input id="lf-role" className="input" value={s.role} onChange={(e) => set("role", e.target.value)} placeholder={f.rolePh} autoComplete="organization-title" />
                </div>
                <div>
                  <label htmlFor="lf-email" className={label}>{f.emailLabel}</label>
                  <input id="lf-email" type="email" className="input" value={s.email} onChange={(e) => set("email", e.target.value)} placeholder={f.emailPh} autoComplete="email" aria-invalid={!!errors.email} />
                  {errors.email && <p className={err}>{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="lf-phone" className={label}>{f.phoneLabel}</label>
                  <input id="lf-phone" type="tel" className="input" value={s.phone} onChange={(e) => set("phone", e.target.value)} placeholder={f.phonePh} autoComplete="tel" inputMode="tel" aria-invalid={!!errors.phone} />
                  {errors.phone && <p className={err}>{errors.phone}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="lf-notes" className={label}>{f.notesLabel}</label>
                  <textarea id="lf-notes" rows={3} className="input" value={s.notes} onChange={(e) => set("notes", e.target.value)} placeholder={f.notesPh} />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {status === "error" && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {f.errors.generic}{" "}
          <a href={waLink(waMessage)} target="_blank" rel="noopener noreferrer" data-wa-location="form_error" className="font-semibold underline">
            WhatsApp
          </a>
        </div>
      )}

      <div className="mt-8 flex items-center gap-3">
        {step > 0 && (
          <button type="button" onClick={() => go(step - 1)} className={`btn ${dark ? "btn-ghost-light" : "btn-ghost"}`}>
            {f.prev}
          </button>
        )}
        <button type="submit" className="btn btn-primary flex-1 sm:flex-none" disabled={status === "sending"}>
          {step < 3 ? f.next : status === "sending" ? f.sending : f.submit}
          {status !== "sending" && <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
      {step === 3 && <p className={`mt-4 text-xs ${dark ? "text-white/50" : "text-muted"}`}>{f.privacy}</p>}

      {step === 0 && (
        <a
          href={waLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          data-wa-location={`${location}_inline`}
          className={`mt-6 inline-flex items-center gap-2 text-sm font-medium ${dark ? "text-white/70 hover:text-white" : "text-muted hover:text-navy"}`}
        >
          <WhatsApp className="h-4 w-4 text-[#25D366]" />
          {f.side.waTitle}
        </a>
      )}
    </form>
  );
}
