"use client";

import { useEffect, useRef, useState } from "react";

/** Kursor dua titik amber, motif dari logo Sejiwa. Desktop saja. */
export default function Cursor() {
  const a = useRef<HTMLDivElement>(null);
  const b = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const target = { x: -100, y: -100 };
    const p1 = { x: -100, y: -100 };
    const p2 = { x: -100, y: -100 };
    let hover = false;
    let dark = false;
    let raf = 0;

    const move = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const el = e.target as HTMLElement | null;
      hover = !!el?.closest("a, button, [role='button'], label, input, textarea, select");
      dark = !!el?.closest("[data-cursor='dark']");
    };

    const loop = () => {
      p1.x += (target.x - p1.x) * 0.35;
      p1.y += (target.y - p1.y) * 0.35;
      p2.x += (target.x - p2.x) * 0.14;
      p2.y += (target.y - p2.y) * 0.14;
      const s = hover ? 2.4 : 1;
      if (a.current) a.current.style.transform = `translate3d(${p1.x - 4}px, ${p1.y - 4}px, 0) scale(${hover ? 0.6 : 1})`;
      if (b.current) {
        b.current.style.transform = `translate3d(${p2.x + 6}px, ${p2.y - 4}px, 0) scale(${s})`;
        b.current.style.opacity = hover ? "0.45" : "1";
        b.current.style.mixBlendMode = dark ? "normal" : "multiply";
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div ref={a} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-amber" />
      <div
        ref={b}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-amber transition-[opacity] duration-300"
      />
    </>
  );
}
