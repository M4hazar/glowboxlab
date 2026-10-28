"use client";

import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
} from "lucide-react";
import Link from "next/link";
import {
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { Dictionary } from "@/content/en";
import { iconButton, WorkCard, WorkDialog } from "./portfolio";
import { useReducedMotion } from "./use-reduced-motion";

// Pasek powtarza projekty kilka razy, żeby przewijał się bez końca.
// Prawdziwy zestaw to kopia nr 1, pozostałe są ukryte przed czytnikami ekranu i klawiaturą.
const COPIES = 5;
const REAL = 1;
const SPEED = 28; // px na sekundę
const HOLD_MS = 3500; // przerwa po ręcznym przewinięciu

export function WorkCarousel({
  t,
  heading,
  allHref,
}: {
  t: Dictionary["work"];
  heading: ReactNode;
  allHref: string;
}) {
  const c = t.controls;
  const reduce = useReducedMotion();
  const scroller = useRef<HTMLDivElement>(null);
  const realCards = useRef<(HTMLButtonElement | null)[]>([]);
  const [playing, setPlaying] = useState(true);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Stan animacji trzymany w refach, żeby pętla nie powodowała renderów.
  const s = useRef({
    set: 0,
    pos: 0,
    written: 0,
    speed: 0,
    hover: false,
    focus: false,
    visible: false,
    holdUntil: 0,
    drag: null as null | { x: number; start: number; moved: boolean },
    settle: 0,
  });

  const write = useCallback((el: HTMLDivElement, x: number) => {
    el.scrollLeft = x;
    s.current.written = el.scrollLeft;
  }, []);

  // Trzyma pozycję w środkowej kopii, więc w obie strony zawsze jest dalszy ciąg.
  const normalize = useCallback(() => {
    const el = scroller.current;
    const st = s.current;
    if (!el || !st.set) return;
    const x = el.scrollLeft;
    const wrapped = st.set + ((((x - st.set) % st.set) + st.set) % st.set);
    if (Math.abs(wrapped - x) < 1) return;
    const shift = wrapped - x;
    st.pos += shift;
    if (st.drag) st.drag.start += shift;
    write(el, x + shift);
  }, [write]);

  // Szerokość jednego zestawu kart, liczona na nowo przy każdej zmianie rozmiaru.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const measure = () => {
      const firsts = el.querySelectorAll<HTMLElement>("[data-first]");
      if (firsts.length < 2) return;
      const set = firsts[1].offsetLeft - firsts[0].offsetLeft;
      const st = s.current;
      if (!st.set) {
        // Na start pierwsza karta stoi równo z nagłówkiem sekcji.
        st.set = set;
        write(el, set * REAL);
      } else {
        const phase = (el.scrollLeft - st.set) / st.set;
        st.set = set;
        write(el, set + phase * set);
      }
      st.pos = el.scrollLeft;
      normalize();
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [normalize, write]);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      s.current.visible = entry.isIntersecting;
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce) setPlaying(false);
  }, [reduce]);

  // Pętla przewijania: płynnie zwalnia przy pauzie i rusza z powrotem.
  const running = playing && !open;
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const st = s.current;
      const dt = Math.min(now - last, 50) / 1000;
      last = now;
      const paused =
        !running ||
        !st.visible ||
        st.hover ||
        st.focus ||
        st.drag !== null ||
        now < st.holdUntil;
      const target = paused ? 0 : SPEED;
      st.speed += (target - st.speed) * Math.min(1, dt * 4);
      if (now >= st.holdUntil && !st.drag && st.speed > 0.5) {
        if (Math.abs(el.scrollLeft - st.written) > 2) st.pos = el.scrollLeft;
        st.pos += st.speed * dt;
        if (st.set && st.pos >= st.set * 2) st.pos -= st.set;
        write(el, st.pos);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, write]);

  const onScroll = () => {
    const el = scroller.current;
    const st = s.current;
    if (!el) return;
    // Ruch, którego nie zrobiła pętla, to ręczne przewijanie: pasek chwilę czeka.
    if (Math.abs(el.scrollLeft - st.written) > 2) {
      st.holdUntil = performance.now() + HOLD_MS;
      st.pos = el.scrollLeft;
    }
    window.clearTimeout(st.settle);
    st.settle = window.setTimeout(() => {
      if (!s.current.drag) normalize();
    }, 150);
  };

  const step = (dir: 1 | -1) => {
    const el = scroller.current;
    const st = s.current;
    if (!el || !st.set) return;
    st.holdUntil = performance.now() + HOLD_MS;
    el.scrollBy({
      left: (dir * st.set) / t.items.length,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  // Myszką można przeciągać pasek; na dotyku działa zwykłe przewijanie.
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const el = scroller.current;
    if (!el) return;
    if (e.pointerType !== "mouse") {
      s.current.holdUntil = performance.now() + HOLD_MS;
      return;
    }
    if (e.button !== 0) return;
    s.current.drag = { x: e.clientX, start: el.scrollLeft, moved: false };
    const move = (ev: globalThis.PointerEvent) => {
      const drag = s.current.drag;
      if (!drag) return;
      const dx = ev.clientX - drag.x;
      if (Math.abs(dx) > 5) drag.moved = true;
      if (drag.moved) {
        write(el, drag.start - dx);
        normalize();
      }
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      const moved = s.current.drag?.moved;
      s.current.drag = null;
      s.current.pos = el.scrollLeft;
      if (moved) {
        s.current.holdUntil = performance.now() + HOLD_MS;
        // Klik kończący przeciąganie nie otwiera projektu.
        el.dataset.dragged = "true";
        window.setTimeout(() => delete el.dataset.dragged, 0);
      }
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };

  const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (scroller.current?.dataset.dragged) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className="section">
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        {heading}
        <div className="flex items-center gap-2" data-reveal="1">
          <Link href={allHref} className="link-underline mr-3 text-sm">
            {c.all}
            <ArrowRightIcon className="size-4" aria-hidden />
          </Link>
          <button
            type="button"
            className={iconButton}
            aria-label={playing ? c.pause : c.play}
            title={playing ? c.pause : c.play}
            onClick={() => setPlaying((v) => !v)}
          >
            {playing ? (
              <PauseIcon className="size-4 fill-current" />
            ) : (
              <PlayIcon className="size-4 fill-current" />
            )}
          </button>
          <button
            type="button"
            className={iconButton}
            aria-label={c.scrollLeft}
            title={c.scrollLeft}
            onClick={() => step(-1)}
          >
            <ChevronLeftIcon className="size-5" />
          </button>
          <button
            type="button"
            className={iconButton}
            aria-label={c.scrollRight}
            title={c.scrollRight}
            onClick={() => step(1)}
          >
            <ChevronRightIcon className="size-5" />
          </button>
        </div>
      </div>

      {/* biome-ignore lint/a11y/noStaticElementInteractions: przeciąganie myszką to dodatek, karty i strzałki działają z klawiatury */}
      <div
        ref={scroller}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") s.current.hover = true;
        }}
        onPointerLeave={() => {
          s.current.hover = false;
        }}
        onFocus={(e) => {
          // Pauza tylko przy nawigacji klawiaturą, a nie po kliknięciu myszką.
          s.current.focus = e.target.matches(":focus-visible");
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            s.current.focus = false;
          }
        }}
        onClickCapture={onClickCapture}
        data-reveal="2"
        className="mt-12 cursor-grab overflow-x-auto overscroll-x-contain py-2 select-none [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)] [scrollbar-width:none] active:cursor-grabbing sm:mt-14 [&::-webkit-scrollbar]:hidden"
      >
        <ul className="flex w-max gap-4 sm:gap-6">
          {Array.from({ length: COPIES }, (_, copy) =>
            t.items.map((work, i) => {
              const real = copy === REAL;
              return (
                <li
                  // biome-ignore lint/suspicious/noArrayIndexKey: kopie mają stałą kolejność
                  key={`${copy}-${i}`}
                  data-first={i === 0 ? "" : undefined}
                  aria-hidden={real ? undefined : true}
                >
                  <WorkCard
                    ref={
                      real
                        ? (node) => {
                            realCards.current[i] = node;
                          }
                        : undefined
                    }
                    work={work}
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 340px, 76vw"
                    tabIndex={real ? undefined : -1}
                    onClick={() => {
                      setIndex(i);
                      setOpen(true);
                    }}
                    className="w-[min(76vw,300px)] sm:w-[340px] lg:w-[380px]"
                  />
                </li>
              );
            }),
          )}
        </ul>
      </div>

      <WorkDialog
        t={t}
        open={open}
        onOpenChange={setOpen}
        index={index}
        onIndexChange={setIndex}
        quoteHref="#quote"
        returnFocus={(i) =>
          realCards.current[i]?.focus({ preventScroll: true })
        }
      />
    </div>
  );
}
