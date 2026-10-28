"use client";

import { useEffect } from "react";

// Odsłanianie sekcji przy przewijaniu: elementy z [data-reveal] dostają data-revealed,
// gdy pojawią się na ekranie (wygląd w globals.css).
// Po zmianie języka (data-instant) to, co widać od razu, jest już odsłonięte bez animacji;
// znacznik znika po pierwszym sprawdzeniu, więc dalsze sekcje odsłaniają się normalnie.
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
        delete root.dataset.instant;
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    for (const el of document.querySelectorAll("[data-reveal]")) {
      io.observe(el);
    }

    return () => io.disconnect();
  }, []);

  return null;
}
