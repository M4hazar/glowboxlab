"use client";

import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PrinterIcon,
  ReceiptTextIcon,
  SendIcon,
  TruckIcon,
} from "lucide-react";
import { Tabs } from "radix-ui";
import { useState } from "react";
import type { Dictionary } from "@/content/en";
import { cn } from "@/lib/utils";
import { iconButton } from "./portfolio";

const icons = [SendIcon, ReceiptTextIcon, PrinterIcon, TruckIcon];

// Etapy na poziomej osi; wybrany etap pokazuje opis i szczegóły w panelu pod spodem.
export function ProcessTabs({
  t,
  cta,
  quoteHref,
}: {
  t: Dictionary["process"];
  cta: string;
  quoteHref: string;
}) {
  const total = t.steps.length;
  const [active, setActive] = useState(0);
  // Kierunek zmiany: nowy etap wjeżdża z prawej przy przejściu dalej i z lewej przy powrocie.
  const [forward, setForward] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const counter = (i: number) =>
    t.counter
      .replace("{current}", String(i + 1))
      .replace("{total}", String(total));

  // Strzałki zostają na miejscu, więc zmianę kroku ogłaszamy czytnikom ekranu osobno.
  const go = (dir: 1 | -1) => {
    const next = (active + dir + total) % total;
    setForward(dir === 1);
    setActive(next);
    setAnnouncement(`${counter(next)}: ${t.steps[next].title}`);
  };

  return (
    <Tabs.Root
      value={String(active)}
      onValueChange={(value) => {
        setForward(Number(value) > active);
        setActive(Number(value));
      }}
      className="mt-12 sm:mt-14"
    >
      <Tabs.List
        data-reveal="1"
        className="relative grid grid-cols-4 gap-2 sm:gap-6"
      >
        <span
          aria-hidden
          className="absolute top-5 right-[12.5%] left-[12.5%] h-px bg-white/15"
        >
          <span
            className="absolute inset-0 origin-left bg-brand transition-transform duration-500 ease-glow"
            style={{ transform: `scaleX(${active / (total - 1)})` }}
          />
        </span>
        {t.steps.map((step, i) => (
          <Tabs.Trigger
            key={step.title}
            value={String(i)}
            className="group flex flex-col items-center px-1 pb-2 text-center outline-none"
          >
            <span
              aria-hidden
              className={cn(
                // Radix ustawia fokus zakładki także po kliknięciu, więc obwódka jest na kółku i wygląda jak zaznaczenie.
                "relative z-10 flex size-10 items-center justify-center rounded-full border bg-background text-sm font-semibold transition-[color,background-color,border-color,scale] duration-300 ease-glow group-active:scale-95 group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background",
                i === active
                  ? "border-primary bg-primary text-white"
                  : i < active
                    ? "border-brand text-brand-soft"
                    : "border-brand/40 text-brand-soft group-hover:border-brand",
              )}
            >
              {i + 1}
            </span>
            <span className="sr-only text-base font-semibold text-muted-foreground transition-colors group-hover:text-foreground group-data-[state=active]:text-foreground sm:not-sr-only sm:mt-4">
              {step.title}
            </span>
            <span
              aria-hidden
              className="mt-1 hidden max-w-60 text-sm text-muted-foreground md:block"
            >
              {step.text}
            </span>
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <div
        data-reveal="2"
        className="relative mt-8 rounded-2xl border border-white/10 bg-surface sm:mt-10"
      >
        {t.steps.map((step, i) => {
          const Icon = icons[i];
          return (
            <Tabs.Content
              key={step.title}
              value={String(i)}
              className={cn(
                "grid gap-x-12 gap-y-8 rounded-2xl p-6 outline-none animate-in fade-in-0 duration-500 ease-glow focus-visible:ring-2 focus-visible:ring-ring motion-reduce:animate-none sm:p-8 md:grid-cols-2 lg:p-10",
                forward ? "slide-in-from-right-6" : "slide-in-from-left-6",
              )}
            >
              <div>
                <span className="flex size-12 items-center justify-center rounded-xl bg-primary/15 text-brand-soft">
                  <Icon className="size-6" aria-hidden />
                </span>
                <p className="mt-6 text-sm font-medium text-brand-soft">
                  {counter(i)}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
              <ul className="space-y-4 self-center rounded-xl border border-white/[0.07] bg-background/60 p-6 md:row-span-2 md:mt-14">
                {step.details.map((d) => (
                  <li key={d} className="flex gap-3">
                    <CheckIcon
                      className="mt-0.5 size-5 shrink-0 text-brand-soft"
                      aria-hidden
                    />
                    <span className="text-foreground/90">{d}</span>
                  </li>
                ))}
              </ul>
              <a
                href={quoteHref}
                className="press inline-flex h-11 items-center justify-center self-end justify-self-start rounded-lg bg-primary px-5 text-sm font-semibold text-white hover:bg-brand-strong max-md:w-full"
              >
                {cta}
              </a>
            </Tabs.Content>
          );
        })}
        <div className="absolute top-6 right-6 flex gap-2 sm:top-8 sm:right-8 lg:top-10 lg:right-10">
          <button
            type="button"
            className={iconButton}
            aria-label={t.previous}
            title={t.previous}
            onClick={() => go(-1)}
          >
            <ChevronLeftIcon className="size-5" />
          </button>
          <button
            type="button"
            className={iconButton}
            aria-label={t.next}
            title={t.next}
            onClick={() => go(1)}
          >
            <ChevronRightIcon className="size-5" />
          </button>
        </div>
        <p className="sr-only" aria-live="polite">
          {announcement}
        </p>
      </div>
    </Tabs.Root>
  );
}
