import { getLocale } from "next-intl/server";
import { getContent } from "@/content";
import { Link } from "@/i18n/navigation";
import Logo from "@/components/ui/Logo";
import { ArrowRight } from "@/components/icons";

export default async function NotFound() {
  const locale = await getLocale();
  const t = getContent(locale).notFound;
  return (
    <main className="relative grid min-h-svh place-items-center overflow-hidden px-5">
      <div className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_60%)]" aria-hidden />
      <div className="relative text-center">
        <Link href="/" className="mx-auto mb-12 block w-fit">
          <Logo />
        </Link>
        <p className="font-display text-[7rem] font-extrabold leading-none tracking-[-0.06em] text-navy md:text-[10rem]">
          4<span className="text-amber">0</span>4
        </p>
        <h1 className="mt-4 text-2xl font-extrabold text-navy-950 md:text-4xl">{t.title}</h1>
        <p className="mt-3 text-muted">{t.sub}</p>
        <Link href="/" className="btn btn-primary mt-8">
          {t.home}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
