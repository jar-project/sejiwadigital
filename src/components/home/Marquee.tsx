export default function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-navy-900 bg-navy py-5 text-white" data-cursor="dark" aria-hidden>
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap font-display text-lg font-bold md:text-2xl">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8">
            {t}
            <span className="flex gap-1">
              <span className="h-2 w-2 rounded-full bg-amber" />
              <span className="h-2 w-2 rounded-full bg-amber" />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
