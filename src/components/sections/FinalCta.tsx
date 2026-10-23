import { Link } from "@/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight, WhatsApp } from "@/components/icons";
import { waLink } from "@/lib/site";

export default function FinalCta({
  title,
  sub,
  consult,
  chatWa,
  waMessage,
  location = "final_cta",
}: {
  title: string;
  sub: string;
  consult: string;
  chatWa: string;
  waMessage: string;
  location?: string;
}) {
  return (
    <section className="pb-24 pt-8 md:pb-32">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-navy px-7 py-16 text-center text-white md:px-16 md:py-24" data-cursor="dark">
          <div className="grid-lines-dark absolute inset-0" aria-hidden />
          <div className="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 gap-5" aria-hidden>
            <span className="h-40 w-40 rounded-full bg-amber md:h-56 md:w-56" />
            <span className="h-40 w-40 rounded-full bg-amber md:h-56 md:w-56" />
          </div>
          <div className="relative mx-auto max-w-3xl pt-10">
            <h2 className="text-[2.1rem] font-extrabold leading-[1.06] md:text-6xl">{title}</h2>
            <p className="mx-auto mt-6 max-w-xl text-white/70 md:text-lg">{sub}</p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/konsultasi" className="btn btn-primary">
                {consult}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={waLink(waMessage)} target="_blank" rel="noopener noreferrer" data-wa-location={location} className="btn btn-ghost-light">
                <WhatsApp className="h-5 w-5" />
                {chatWa}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
