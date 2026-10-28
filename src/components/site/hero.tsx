import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import type { Dictionary } from "@/content/en";

export function Hero({ dict }: { dict: Dictionary }) {
  const t = dict.hero;
  return (
    <section id="top" className="pt-16 lg:pt-20">
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
            src="/images/hero.webp"
            alt={t.imageAlt}
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
