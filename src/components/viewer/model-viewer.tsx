"use client";

import {
  LightbulbIcon,
  LightbulbOffIcon,
  Maximize2Icon,
  Minimize2Icon,
  MinusIcon,
  PlusIcon,
  RotateCcwIcon,
  RotateCwIcon,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
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

const START_EVENTS = [
  "pointerdown",
  "pointermove",
  "touchstart",
  "keydown",
  "wheel",
  "scroll",
] as const;

// Model 3D ładuje się chwilę po załadowaniu strony albo od razu przy pierwszym
// ruchu użytkownika, żeby był gotowy, zanim ktoś zacznie nim obracać, a nie
// blokował wczytywania strony. Do tego czasu widać plakat z tej samej sceny.
function useDeferredStart(delay = 3000) {
  const [start, setStart] = useState(false);
  useEffect(() => {
    let timer: number | undefined;
    const go = () => setStart(true);
    const arm = () => {
      timer = window.setTimeout(go, delay);
    };
    for (const name of START_EVENTS) {
      window.addEventListener(name, go, { once: true, passive: true });
    }
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", arm);
      for (const name of START_EVENTS) window.removeEventListener(name, go);
    };
  }, [delay]);
  return start;
}

export function ModelViewer({ dict }: { dict: Dictionary }) {
  const t = dict.viewer;
  const frame = useRef<HTMLDivElement>(null);
  const handle = useRef<SceneHandle | null>(null);
  const start = useDeferredStart();
  const [light, setLight] = useState(true);
  const [mode, setMode] = useState<"poster" | "3d" | "fallback">("poster");
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const [expanded, setExpanded] = useState(false);

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
    if (start && visible && mode === "poster") {
      setMode(hasWebGL() ? "3d" : "fallback");
    }
  }, [start, visible, mode]);

  const close = useCallback(() => setExpanded(false), []);
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
    "inline-flex size-11 items-center justify-center rounded-lg border border-white/12 text-foreground/90 transition-colors hover:border-white/30 hover:bg-white/[0.06] disabled:opacity-40";

  return (
    <div
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
        {/* Plakat to render tej samej sceny w tym samym kadrze. Zostaje pod modelem 3D,
            który pojawia się nad nim, więc przejście jest niewidoczne. */}
        <Image
          src={`/images/lightbox-${light ? "on" : "off"}.webp`}
          alt=""
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1024px) 640px, 100vw"
          className={cn("object-cover", expanded && "object-contain")}
        />
        {mode === "3d" && (
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              ready ? "opacity-100" : "opacity-0",
            )}
          >
            <LightboxScene
              light={light}
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
          onClick={() => setExpanded((v) => !v)}
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
