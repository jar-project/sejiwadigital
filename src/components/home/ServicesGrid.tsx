import { Link } from "@/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowUpRight } from "@/components/icons";
import { SERVICE_ICON } from "@/components/serviceIcons";
import { SERVICE_SLUGS } from "@/lib/site";
import type { Service, SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/routing";

export default function ServicesGrid({
  section,
  services,
  locale,
  startingFrom,
}: {
  section: SiteContent["servicesSection"];
  services: Service[];
  locale: Locale;
  startingFrom: string;
}) {
  return (
    <section id="services" className="scroll-mt-24 py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow={section.eyebrow} title={section.title} sub={section.sub} />
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-6">
          {services.map((s, i) => {
            const Icon = SERVICE_ICON[s.key];
            const dark = s.key === "funnel";
            const span = i === 0 ? "md:col-span-4" : i === 1 ? "md:col-span-2" : i === 2 ? "md:col-span-2" : "md:col-span-4";
            return (
              <Reveal key={s.key} delay={(i % 2) * 0.1} className={span}>
                <Link
                  href={{ pathname: "/layanan/[slug]", params: { slug: SERVICE_SLUGS[s.key][locale] } }}
                  className={`group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-3xl border p-7 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1.5 md:min-h-[340px] md:p-9 ${
                    dark
                      ? "border-navy-950 bg-navy-950 text-white hover:shadow-[0_40px_80px_-30px_rgba(0,38,142,0.8)]"
                      : "border-line bg-white hover:border-navy/30 hover:shadow-[0_40px_80px_-40px_rgba(0,38,142,0.45)]"
                  }`}
                  {...(dark ? { "data-cursor": "dark" } : {})}
                >
                  {dark && <div className="grid-lines-dark absolute inset-0" aria-hidden />}
                  <div className="relative flex items-start justify-between">
                    <span
                      className={`grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 ${
                        dark ? "bg-amber text-navy-950" : "bg-sky text-navy"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <span
                      className={`grid h-11 w-11 place-items-center rounded-full border transition-all duration-500 group-hover:rotate-45 ${
                        dark ? "border-white/20 group-hover:bg-amber group-hover:text-navy-950" : "border-line group-hover:border-navy group-hover:bg-navy group-hover:text-white"
                      }`}
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="relative mt-auto pt-12">
                    <h3 className="text-2xl font-extrabold md:text-[1.9rem]">{s.name}</h3>
                    <p className={`mt-3 max-w-md leading-relaxed ${dark ? "text-white/65" : "text-muted"}`}>{s.short}</p>
                    <p className={`mt-6 text-sm ${dark ? "text-white/55" : "text-muted"}`}>
                      {startingFrom}{" "}
                      <span className={`font-display text-lg font-bold ${dark ? "text-amber" : "text-navy"}`}>{s.startingFrom}</span>
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
