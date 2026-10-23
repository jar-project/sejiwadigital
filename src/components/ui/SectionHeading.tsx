import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  sub,
  dark = false,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  dark?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  const center = align === "center";
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && <p className={`eyebrow ${dark ? "eyebrow-light" : ""}`}>{eyebrow}</p>}
      <h2
        className={`mt-4 text-[2rem] font-extrabold leading-[1.08] md:text-5xl ${dark ? "text-white" : "text-navy-950"}`}
      >
        {title}
      </h2>
      {sub && (
        <p className={`mt-5 text-base leading-relaxed md:text-lg ${dark ? "text-white/65" : "text-muted"} ${center ? "mx-auto" : ""} max-w-2xl`}>
          {sub}
        </p>
      )}
    </Reveal>
  );
}
