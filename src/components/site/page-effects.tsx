"use client";

import { useEffect } from "react";

// Efekty wspólne dla całej strony, bez własnego wyglądu:
// odsłanianie sekcji przy przewijaniu ([data-reveal]) i światło przy kursorze ([data-spotlight]).
export function PageEffects() {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.effects = "";

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "";
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    for (const el of document.querySelectorAll("[data-reveal]")) {
      io.observe(el);
    }

    // Jedno nasłuchiwanie dla wszystkich kart, pozycja kursora trafia do zmiennych CSS.
    let frame = 0;
    let last: PointerEvent | null = null;
    const paint = () => {
      frame = 0;
      const e = last;
      if (!e || !(e.target instanceof Element)) return;
      const card = e.target.closest<HTMLElement>("[data-spotlight]");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      last = e;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    document.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
    };
  }, []);

  return null;
}
