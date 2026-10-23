import { Link } from "@/i18n/navigation";
import { ArrowRight, Check } from "@/components/icons";
import type { Offering } from "@/content/types";

export default function OfferingCards({
  offerings,
  startingFrom,
  ctaLabel,
  serviceValue,
}: {
  offerings: Offering[];
  startingFrom: string;
  ctaLabel: string;
  serviceValue?: string;
}) {
  const five = offerings.length >= 5;
  const cols = five ? "md:grid-cols-2 lg:grid-cols-6" : offerings.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3";
  return (
    <div className={`grid gap-5 ${cols}`}>
      {offerings.map((o, i) => (
        <div
          key={o.title}
          className={`${five ? (i === 3 ? "lg:col-span-2 lg:col-start-2" : "lg:col-span-2") : ""} relative flex flex-col rounded-3xl border p-7 transition-transform duration-500 hover:-translate-y-1 ${
            o.highlight ? "border-navy bg-navy text-white shadow-[0_30px_70px_-30px_rgba(0,38,142,0.7)]" : "border-line bg-white"
          }`}
          {...(o.highlight ? { "data-cursor": "dark" } : {})}
        >
          {o.highlight && (
            <span className="absolute right-6 top-6 flex gap-1" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-amber" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber" />
            </span>
          )}
          <h3 className="pr-10 text-xl font-bold">{o.title}</h3>
          <p className={`mt-2 text-[0.95rem] leading-relaxed ${o.highlight ? "text-white/65" : "text-muted"}`}>{o.desc}</p>
          <div className="mt-6">
            {o.price !== "Custom" && (
              <p className={`text-xs font-semibold uppercase tracking-[0.12em] ${o.highlight ? "text-white/50" : "text-muted"}`}>{startingFrom}</p>
            )}
            <p className="mt-1 font-display text-3xl font-extrabold tracking-tight">
              <span className={o.highlight ? "text-amber" : "text-navy"}>{o.price}</span>
              {o.unit && <span className={`text-base font-semibold ${o.highlight ? "text-white/60" : "text-muted"}`}>{o.unit}</span>}
            </p>
          </div>
          <ul className="mt-6 space-y-2.5">
            {o.features.map((f) => (
              <li key={f} className="flex gap-2.5 text-[0.93rem]">
                <Check className={`mt-0.5 h-4 w-4 shrink-0 ${o.highlight ? "text-amber" : "text-navy"}`} strokeWidth={2.5} />
                <span className={o.highlight ? "text-white/85" : "text-ink/80"}>{f}</span>
              </li>
            ))}
          </ul>
          <Link
            href={{ pathname: "/konsultasi", query: serviceValue ? { layanan: serviceValue } : undefined }}
            className={`btn mt-8 w-full ${o.highlight ? "btn-primary" : "btn-ghost"} !h-12`}
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ))}
    </div>
  );
}
