import { Link } from "@/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight, Check } from "@/components/icons";
import type { SiteContent } from "@/content/types";

export default function Audit({ a }: { a: SiteContent["audit"] }) {
  return (
    <section className="py-10 md:py-16">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-amber px-7 py-12 md:px-14 md:py-16">
          <div className="absolute -bottom-24 -right-10 flex gap-6 opacity-25" aria-hidden>
            <span className="h-64 w-64 rounded-full bg-white" />
            <span className="h-64 w-64 rounded-full bg-white" />
          </div>
          <div className="relative grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-navy">{a.eyebrow}</p>
              <h2 className="mt-3 text-[2rem] font-extrabold leading-[1.08] text-navy-950 md:text-5xl">{a.title}</h2>
              <p className="mt-5 max-w-xl text-navy-950/75 md:text-lg">{a.sub}</p>
            </div>
            <div className="lg:col-span-5">
              <ul className="space-y-3">
                {a.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-3 rounded-2xl bg-white/60 px-5 py-4 font-semibold text-navy-950 backdrop-blur">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-navy text-white">
                      <Check className="h-4 w-4" strokeWidth={3} />
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
              <Link href={{ pathname: "/konsultasi", query: { tipe: "audit" } }} className="btn btn-navy mt-6 w-full">
                {a.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
