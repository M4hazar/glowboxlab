import { ArrowDownIcon, ArrowRightIcon, CheckIcon } from "lucide-react";
import Image from "next/image";
import type { Dictionary } from "@/content/en";
import { SwitchOnOverlay } from "./switch-on-overlay";

export function Hero({ dict }: { dict: Dictionary }) {
  const t = dict.hero;
  return (
    <section className="relative isolate overflow-hidden pt-16 lg:pt-20">
      {/* Poświata i podłoga budują scenę wokół produktu */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="glow-blue absolute top-[10%] right-[-20%] size-[80vw] max-w-[1100px] opacity-70 lg:right-[-8%] lg:size-[70vw]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="section grid min-h-[calc(100svh-4rem)] items-center gap-6 pt-8 pb-16 lg:min-h-[min(calc(100svh-5rem),860px)] lg:grid-cols-[1.05fr_1fr] lg:gap-4 lg:pt-0 lg:pb-12">
        <div className="relative z-10 max-w-2xl">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 className="display mt-5 text-[2.9rem] sm:text-7xl xl:text-[5.4rem]">
            {t.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl">
            {t.lead}
          </p>
          <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            <a
              href="#quote"
              className="group inline-flex h-14 items-center justify-center gap-3 rounded-lg bg-primary px-7 text-base font-semibold text-white shadow-[0_10px_50px_-12px_rgb(0_127_255/0.9)] transition-colors duration-300 hover:bg-brand-strong"
            >
              {t.primary}
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a href="#work" className="link-underline self-start sm:self-auto">
              {t.secondary}
              <ArrowRightIcon className="size-4" />
            </a>
          </div>
          <ul className="mt-12 grid gap-3 text-sm text-foreground/75 sm:flex sm:flex-wrap sm:gap-x-7">
            {t.points.map((point) => (
              <li key={point} className="flex items-center gap-2.5">
                <span className="flex size-5 items-center justify-center rounded-full bg-brand/15 text-brand-soft">
                  <CheckIcon className="size-3" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative -mx-5 sm:mx-0 lg:-mr-16 xl:-mr-28">
          <div className="relative mx-auto aspect-square w-full max-w-[720px] [mask-image:radial-gradient(closest-side,black_72%,transparent)]">
            <Image
              src="/images/hero-off.webp"
              alt={t.imageAlt}
              fill
              priority
              fetchPriority="high"
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
            <SwitchOnOverlay src="/images/hero-on.webp" />
          </div>
        </div>
      </div>

      <a
        href="#preview"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground lg:flex"
      >
        {t.scroll}
        <ArrowDownIcon className="size-4 animate-bounce [animation-duration:2.4s]" />
      </a>
    </section>
  );
}
