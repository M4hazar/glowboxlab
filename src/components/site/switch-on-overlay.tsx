"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Wersja ON pojawia się na zdjęciu OFF po załadowaniu, jak włączane światło.
// Bazowe zdjęcie OFF jest elementem LCP, więc animacja nie opóźnia pomiaru.
export function SwitchOnOverlay({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const id = window.setTimeout(() => setOn(true), reduce ? 0 : 450);
    return () => window.clearTimeout(id);
  }, [loaded]);

  return (
    <Image
      src={src}
      alt=""
      aria-hidden
      fill
      loading="eager"
      sizes="(min-width: 1024px) 52vw, 100vw"
      onLoad={() => setLoaded(true)}
      className="object-cover transition-opacity duration-[1600ms] ease-[cubic-bezier(.65,0,.25,1)] motion-reduce:transition-none"
      style={{ opacity: on ? 1 : 0 }}
    />
  );
}
