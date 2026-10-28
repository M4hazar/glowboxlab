import { ArrowRightIcon } from "lucide-react";
import type { CSSProperties } from "react";
import { ModelViewer } from "@/components/viewer/model-viewer";
import type { Dictionary } from "@/content/en";

// Kolejne elementy wchodzą z małym przesunięciem w czasie (klasy rise, line i settle w globals.css).
const delay = (seconds: number) =>
  ({ "--delay": `${seconds}s` }) as CSSProperties;

export function Hero({ dict }: { dict: Dictionary }) {
  const t = dict.hero;
  return (
    <section id="top" className="pt-16 lg:pt-20">
      <div className="section grid items-center gap-4 pt-10 pb-16 lg:min-h-[min(calc(100svh-5rem),800px)] lg:grid-cols-2 lg:gap-12 lg:py-12">
        <div className="max-w-xl">
          <p className="eyebrow rise">{t.eyebrow}</p>
          <h1 className="display mt-5 flex flex-col text-[2.6rem] sm:text-6xl lg:text-7xl">
            {t.title.map((line, i) => (
              <span
                key={line}
                className="line block"
                style={delay(0.08 + i * 0.1)}
              >
                <span>{line}</span>
              </span>
            ))}
          </h1>
          <p className="lead rise mt-6 max-w-md" style={delay(0.3)}>
            {t.lead}
          </p>
          <div
            className="rise mt-9 flex flex-wrap items-center gap-x-8 gap-y-5"
            style={delay(0.42)}
          >
            <a
              href="#quote"
              className="group press inline-flex h-13 items-center justify-center gap-2.5 rounded-lg bg-primary px-7 font-semibold text-white hover:bg-brand-strong"
            >
              {t.primary}
              <ArrowRightIcon
                className="size-4 transition-transform duration-300 ease-glow group-hover:translate-x-1"
                aria-hidden
              />
            </a>
            <a href="#work" className="link-underline">
              {t.secondary}
            </a>
          </div>
        </div>

        <div className="settle mx-auto w-full max-w-[560px] lg:max-w-[640px]">
          <ModelViewer dict={dict} />
        </div>
      </div>
    </section>
  );
}
