"use client";

import {
  LightbulbIcon,
  LightbulbOffIcon,
  LoaderCircleIcon,
  Maximize2Icon,
  Minimize2Icon,
  MinusIcon,
  PlusIcon,
  RotateCcwIcon,
  RotateCwIcon,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { Dictionary } from "@/content/en";
import { cn } from "@/lib/utils";
import type { SceneHandle } from "./lightbox-scene";

const LightboxScene = dynamic(() => import("./lightbox-scene"), { ssr: false });

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

// Model 3D ładuje się chwilę po wczytaniu strony, gdy jest na ekranie i nikt nie przewija:
// przygotowanie sceny na moment zajmuje przeglądarkę, a w trakcie przewijania strona by szarpnęła.
// Od razu tylko wtedy, gdy ktoś sięga po sam model (klik, dotyk, fokus na przyciskach).
// Do tego czasu widać plakat z tej samej sceny.
function useDeferredStart(
  viewer: RefObject<HTMLElement | null>,
  visible: boolean,
  delay = 3000,
  quiet = 400,
) {
  const [start, setStart] = useState(false);
  const [armed, setArmed] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    let timer: number | undefined;
    const go = () => setStart(true);
    const arm = () => {
      timer = window.setTimeout(() => setArmed(true), delay);
    };
    const onScroll = () => {
      lastScroll.current = performance.now();
    };
    const scrollEvents = ["scroll", "wheel", "touchmove"] as const;
    for (const name of scrollEvents) {
      window.addEventListener(name, onScroll, { passive: true });
    }
    const el = viewer.current;
    el?.addEventListener("pointerdown", go);
    el?.addEventListener("focusin", go);
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", arm);
      for (const name of scrollEvents) {
        window.removeEventListener(name, onScroll);
      }
      el?.removeEventListener("pointerdown", go);
      el?.removeEventListener("focusin", go);
    };
  }, [viewer, delay]);

  useEffect(() => {
    if (!armed || !visible || start) return;
    let timer: number | undefined;
    let idle: number | undefined;
    const scrolling = () => performance.now() - lastScroll.current < quiet;
    const check = () => {
      if (scrolling()) {
        timer = window.setTimeout(check, quiet);
      } else if ("requestIdleCallback" in window) {
        idle = window.requestIdleCallback(
          () => (scrolling() ? check() : setStart(true)),
          { timeout: 1000 },
        );
      } else {
        setStart(true);
      }
    };
    check();
    return () => {
      window.clearTimeout(timer);
      if (idle !== undefined) window.cancelIdleCallback(idle);
    };
  }, [armed, visible, start, quiet]);

  return start;
}

export function ModelViewer({ dict }: { dict: Dictionary }) {
  const t = dict.viewer;
  const viewer = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const handle = useRef<SceneHandle | null>(null);
  const [visible, setVisible] = useState(true);
  const start = useDeferredStart(viewer, visible);
  const [light, setLight] = useState(true);
  const [mode, setMode] = useState<"poster" | "3d" | "fallback">("poster");
  const [ready, setReady] = useState(false);
  // Plakat jest potrzebny tylko do pierwszego pojawienia się modelu 3D.
  const [posterDone, setPosterDone] = useState(false);
  const [expanded, setExpanded] = useState(false);
  // Po przełączeniu pełnego ekranu model jest ukryty, dopóki nie narysuje się w nowym rozmiarze.
  const [settling, setSettling] = useState(false);
  const settled = useCallback(() => setSettling(false), []);
  const toggleExpanded = (value: boolean) => {
    setExpanded(value);
    if (mode === "3d") setSettling(true);
    // Przybliżenie jest tylko na pełnym ekranie, więc po wyjściu kadr wraca do zwykłego.
    if (!value) handle.current?.resetZoom();
  };

  // Model ładuje się i renderuje tylko wtedy, gdy jest na ekranie.
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (start && mode === "poster") {
      setMode(hasWebGL() ? "3d" : "fallback");
    }
  }, [start, mode]);

  const close = useCallback(() => {
    setExpanded(false);
    setSettling(true);
    handle.current?.resetZoom();
  }, []);

  // Zabezpieczenie, gdyby rozmiar się nie zmienił i model nie dał znaku.
  useEffect(() => {
    if (!settling) return;
    const timer = window.setTimeout(settled, 800);
    return () => window.clearTimeout(timer);
  }, [settling, settled]);
  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded, close]);

  const loading = mode === "3d" && !ready;
  const iconButton =
    "press inline-flex size-11 items-center justify-center rounded-lg border border-white/12 text-foreground/90 hover:border-white/30 hover:bg-white/[0.06] disabled:opacity-40";

  return (
    <div
      ref={viewer}
      className={cn(
        expanded && "fixed inset-0 z-[60] flex flex-col bg-background",
      )}
    >
      <div
        ref={frame}
        role="img"
        aria-label={t.canvasLabel}
        className={cn(
          "relative w-full",
          expanded
            ? "flex-1"
            : "aspect-square [mask-image:radial-gradient(closest-side,black_72%,transparent)]",
        )}
      >
        {/* Plakat to render tej samej sceny w tym samym kadrze. Model 3D pojawia się nad nim,
            więc przejście jest niewidoczne, a potem plakat znika: pokazuje domyślne ujęcie
            i po obrocie modelu prześwitywałby przy wyjściu z pełnego ekranu. Na pełnym ekranie
            kadr modelu jest inny niż plakatu (zwłaszcza na telefonie), więc plakat się chowa,
            a do wczytania modelu widać tylko wskaźnik ładowania. */}
        <Image
          src={`/images/lightbox-${light ? "on" : "off"}.webp`}
          alt=""
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1024px) 640px, 100vw"
          className={cn(
            "object-cover",
            expanded && "object-contain",
            ((expanded && mode !== "fallback") || posterDone) && "invisible",
          )}
        />
        {expanded && loading && (
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center [animation:appear_0.3s_ease_0.3s_backwards]"
          >
            <LoaderCircleIcon className="size-8 text-muted-foreground motion-safe:animate-spin" />
          </div>
        )}
        {mode === "3d" && (
          <div
            className={cn(
              "absolute inset-0 transition-opacity",
              settling ? "duration-0" : "duration-300",
              ready && !settling ? "opacity-100" : "opacity-0",
            )}
            onTransitionEnd={() => setPosterDone(true)}
          >
            <LightboxScene
              light={light}
              active={visible}
              handle={handle}
              onReady={() => setReady(true)}
              onResize={settled}
            />
          </div>
        )}
      </div>

      {/* Komunikat dla czytników ekranu jest poza role="img", bo jej zawartość nie jest odczytywana. */}
      <p role="status" className="sr-only">
        {expanded && loading ? t.loading : ""}
      </p>

      {mode === "fallback" && (
        <p className="px-5 pt-4 text-center text-sm text-muted-foreground">
          {t.fallback}
        </p>
      )}

      <div
        className={cn(
          "flex flex-wrap items-center justify-center gap-2",
          expanded
            ? "border-t border-white/[0.07] p-4"
            : "relative z-10 -mt-10",
        )}
      >
        <button
          type="button"
          aria-label={t.light}
          title={t.light}
          aria-pressed={light}
          onClick={() => setLight((v) => !v)}
          className={cn(
            iconButton,
            light &&
              "border-primary bg-primary text-white hover:border-brand-strong hover:bg-brand-strong",
          )}
        >
          {light ? (
            <LightbulbIcon className="size-5" />
          ) : (
            <LightbulbOffIcon className="size-5" />
          )}
        </button>
        <button
          type="button"
          className={iconButton}
          aria-label={t.rotateLeft}
          title={t.rotateLeft}
          disabled={loading}
          onClick={() => handle.current?.rotateBy(-Math.PI / 4)}
        >
          <RotateCcwIcon className="size-4" />
        </button>
        <button
          type="button"
          className={iconButton}
          aria-label={t.rotateRight}
          title={t.rotateRight}
          disabled={loading}
          onClick={() => handle.current?.rotateBy(Math.PI / 4)}
        >
          <RotateCwIcon className="size-4" />
        </button>
        {expanded && (
          <>
            <button
              type="button"
              className={iconButton}
              aria-label={t.zoomOut}
              title={t.zoomOut}
              disabled={loading}
              onClick={() => handle.current?.zoomBy(1 / 1.25)}
            >
              <MinusIcon className="size-4" />
            </button>
            <button
              type="button"
              className={iconButton}
              aria-label={t.zoomIn}
              title={t.zoomIn}
              disabled={loading}
              onClick={() => handle.current?.zoomBy(1.25)}
            >
              <PlusIcon className="size-4" />
            </button>
          </>
        )}
        <button
          type="button"
          className={iconButton}
          aria-label={expanded ? t.exitFullscreen : t.fullscreen}
          title={expanded ? t.exitFullscreen : t.fullscreen}
          aria-pressed={expanded}
          onClick={() => toggleExpanded(!expanded)}
        >
          {expanded ? (
            <Minimize2Icon className="size-4" />
          ) : (
            <Maximize2Icon className="size-4" />
          )}
        </button>
      </div>
    </div>
  );
}
