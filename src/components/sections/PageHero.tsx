import Reveal from "@/components/ui/Reveal";

export default function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-48">
      <div
        className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_80%_20%,black_10%,transparent_65%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute -right-24 top-24 hidden gap-4 md:flex" aria-hidden>
        <span className="h-40 w-40 rounded-full bg-amber/90" />
        <span className="h-40 w-40 rounded-full bg-amber/90" />
      </div>
      <div className="container-x relative">
        <Reveal className="max-w-4xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 font-display text-[2.4rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-navy-950 md:text-6xl lg:text-7xl">
            {title}
          </h1>
          {intro && <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{intro}</p>}
        </Reveal>
        {children && (
          <Reveal delay={0.15} className="mt-10">
            {children}
          </Reveal>
        )}
      </div>
    </section>
  );
}
