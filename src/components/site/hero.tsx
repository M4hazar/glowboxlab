import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import type { Dictionary } from "@/content/en";
import { SwitchOnOverlay } from "./switch-on-overlay";

export function Hero({ dict }: { dict: Dictionary }) {
  const t = dict.hero;
  return (
    <section className="relative isolate overflow-hidden pt-16 lg:pt-20">
      {/* Poświata za produktem */}
      <div
        aria-hidden
        className="glow-blue pointer-events-none absolute top-[12%] right-[-30%] -z-10 size-[90vw] max-w-[1000px] opacity-60 lg:right-[-10%] lg:size-[65vw]"
      />

      <div className="section grid items-center gap-4 pt-10 pb-16 lg:min-h-[min(calc(100svh-5rem),800px)] lg:grid-cols-2 lg:gap-12 lg:py-12">
        <div className="max-w-xl">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 className="display mt-5 text-[2.6rem] sm:text-6xl lg:text-7xl">
            {t.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="lead mt-6 max-w-md">{t.lead}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
            <a
              href="#quote"
              className="inline-flex h-13 items-center justify-center gap-2.5 rounded-lg bg-primary px-7 font-semibold text-white transition-colors hover:bg-brand-strong"
            >
              {t.primary}
              <ArrowRightIcon className="size-4" aria-hidden />
            </a>
            <a href="#work" className="link-underline">
              {t.secondary}
            </a>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[560px] [mask-image:radial-gradient(closest-side,black_72%,transparent)] lg:max-w-[640px]">
          <Image
            src="/images/hero-off.webp"
            alt={t.imageAlt}
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover"
          />
          <SwitchOnOverlay src="/images/hero-on.webp" />
        </div>
      </div>
    </section>
  );
}
