import Image from "next/image";

export default function Logo({
  variant = "color",
  className = "",
  priority = false,
}: {
  variant?: "color" | "white";
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={variant === "white" ? "/brand/logo-white.png" : "/brand/logo.png"}
      alt="Sejiwa Digital"
      width={1323}
      height={515}
      priority={priority}
      className={`h-auto w-[118px] md:w-[132px] ${className}`}
    />
  );
}
