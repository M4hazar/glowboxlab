"use client";

import {
  LightbulbIcon,
  LightbulbOffIcon,
  RotateCcwIcon,
  RotateCwIcon,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { type RefObject, useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/site/use-theme";
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
  const theme = useTheme();

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

  const loading = mode === "3d" && !ready;
  const iconButton =
    "press inline-flex size-11 items-center justify-center rounded-lg border border-ink/12 text-foreground/90 hover:border-ink/30 hover:bg-ink/[0.06] disabled:opacity-40";

  return (
    <div ref={viewer}>
      <div
        ref={frame}
        role="img"
        aria-label={t.canvasLabel}
        className="relative aspect-square w-full [mask-image:radial-gradient(closest-side,black_72%,transparent)]"
      >
        {/* Plakat to render tej samej sceny w tym samym kadrze i na tle motywu. Zostaje pod
            modelem 3D, który pojawia się nad nim, więc przejście jest niewidoczne. Który plakat
            widać, decyduje CSS (atrybut motywu na <html>), więc nic nie mignie przed hydratacją. */}
        {(["dark", "light"] as const).map((variant) => (
          <Image
            key={variant}
            src={`/images/lightbox-${light ? "on" : "off"}${variant === "light" ? "-light" : ""}.webp`}
            alt=""
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1024px) 640px, 100vw"
            className={cn(
              "object-cover",
              variant === "light" ? "hidden light:block" : "light:hidden",
            )}
          />
        ))}
        {mode === "3d" && (
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-300",
              ready ? "opacity-100" : "opacity-0",
            )}
          >
            <LightboxScene
              light={light}
              theme={theme ?? "dark"}
              active={visible}
              handle={handle}
              onReady={() => setReady(true)}
            />
          </div>
        )}
      </div>

      {mode === "fallback" && (
        <p className="px-5 pt-4 text-center text-sm text-muted-foreground">
          {t.fallback}
        </p>
      )}

      <div className="relative z-10 -mt-10 flex flex-wrap items-center justify-center gap-2">
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
      </div>
    </div>
  );
}
