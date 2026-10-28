"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import {
  type ComponentProps,
  type KeyboardEvent,
  useRef,
  useState,
} from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Dictionary } from "@/content/en";
import { cn } from "@/lib/utils";

type Work = Dictionary["work"];

export const iconButton =
  "press inline-flex size-11 items-center justify-center rounded-full border border-white/12 text-foreground/90 hover:border-white/30 hover:bg-white/[0.06]";

// Karta projektu: ta sama w przewijanym pasku i na podstronie portfolio.
export function WorkCard({
  work,
  sizes,
  className,
  ...props
}: {
  work: Work["items"][number];
  sizes: string;
} & ComponentProps<"button">) {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      className={cn("group block text-left outline-none", className)}
      {...props}
    >
      <span className="relative block aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-surface transition-colors group-hover:border-white/25 group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background">
        <Image
          src={work.image}
          alt=""
          fill
          draggable={false}
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-glow group-hover:scale-[1.04]"
        />
        <span className="absolute right-3 bottom-3 inline-flex size-9 translate-y-1 items-center justify-center rounded-full bg-background/70 text-foreground opacity-0 backdrop-blur transition-[opacity,translate] duration-300 ease-glow group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <PlusIcon className="size-4" aria-hidden />
        </span>
      </span>
      <span className="mt-5 block text-xl font-semibold tracking-tight">
        {work.title}
      </span>
      <span className="mt-1.5 block text-muted-foreground">{work.text}</span>
    </button>
  );
}

// Okno ze szczegółami projektu, z przełączaniem i przyciskiem do formularza wyceny.
export function WorkDialog({
  t,
  open,
  onOpenChange,
  index,
  onIndexChange,
  quoteHref,
  returnFocus,
}: {
  t: Work;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  index: number;
  onIndexChange: (index: number) => void;
  quoteHref: string;
  returnFocus: (index: number) => void;
}) {
  const c = t.controls;
  const total = t.items.length;
  const item = t.items[index];
  const toQuote = useRef(false);
  const go = (dir: 1 | -1) => onIndexChange((index + dir + total) % total);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        onKeyDown={onKeyDown}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          // Po przejściu do formularza fokus zostaje tam, gdzie zaprowadził link.
          if (toQuote.current) {
            toQuote.current = false;
            return;
          }
          returnFocus(index);
        }}
        className="max-h-[calc(100dvh-2rem)] gap-0 overflow-y-auto border-white/10 bg-surface p-0 sm:max-w-4xl md:grid-cols-[1.25fr_1fr]"
      >
        <div className="relative aspect-[4/3] bg-background md:aspect-auto md:min-h-[440px]">
          <Image
            key={item.image}
            src={item.image}
            alt={item.alt}
            fill
            sizes="(min-width: 768px) 500px, 100vw"
            className="object-contain p-4 animate-in fade-in-0 duration-300 sm:p-6"
          />
        </div>
        <div className="flex flex-col p-6 sm:p-8">
          <div aria-live="polite" aria-atomic="true">
            <p className="text-sm font-medium text-brand-soft">
              {c.counter
                .replace("{current}", String(index + 1))
                .replace("{total}", String(total))}
            </p>
            <DialogTitle className="mt-2 pr-10 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {item.title}
            </DialogTitle>
          </div>
          <DialogDescription className="mt-3 text-base leading-relaxed text-muted-foreground">
            {item.description}
          </DialogDescription>
          <dl className="mt-6 divide-y divide-white/[0.07] border-y border-white/[0.07] text-sm">
            {item.details.map((d) => (
              <div key={d.label} className="flex justify-between gap-6 py-3">
                <dt className="text-muted-foreground">{d.label}</dt>
                <dd className="text-right font-medium">{d.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex items-center gap-2 md:mt-auto md:pt-8">
            <DialogClose
              asChild
              onClick={() => {
                toQuote.current = true;
              }}
            >
              <a
                href={quoteHref}
                className="press inline-flex h-11 flex-1 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-white hover:bg-brand-strong"
              >
                {c.cta}
              </a>
            </DialogClose>
            <button
              type="button"
              className={iconButton}
              aria-label={c.previous}
              title={c.previous}
              onClick={() => go(-1)}
            >
              <ChevronLeftIcon className="size-5" />
            </button>
            <button
              type="button"
              className={iconButton}
              aria-label={c.next}
              title={c.next}
              onClick={() => go(1)}
            >
              <ChevronRightIcon className="size-5" />
            </button>
          </div>
        </div>
        <DialogClose
          aria-label={c.close}
          title={c.close}
          className={cn(
            iconButton,
            "absolute top-3 right-3 border-transparent bg-background/70 backdrop-blur",
          )}
        >
          <XIcon className="size-5" />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

// Wszystkie projekty naraz, na podstronie portfolio.
export function PortfolioGrid({
  t,
  quoteHref,
}: {
  t: Work;
  quoteHref: string;
}) {
  const cards = useRef<(HTMLButtonElement | null)[]>([]);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  return (
    <>
      <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {t.items.map((work, i) => (
          <li key={work.title} data-reveal={i % 3}>
            <WorkCard
              ref={(node) => {
                cards.current[i] = node;
              }}
              work={work}
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
              className="w-full"
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
            />
          </li>
        ))}
      </ul>
      <WorkDialog
        t={t}
        open={open}
        onOpenChange={setOpen}
        index={index}
        onIndexChange={setIndex}
        quoteHref={quoteHref}
        returnFocus={(i) => cards.current[i]?.focus()}
      />
    </>
  );
}
