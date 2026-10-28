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
import { SectionHeading } from "@/components/site/sections";
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

export function ViewerSection({ dict }: { dict: Dictionary }) {
  const t = dict.viewer;
  const frame = useRef<HTMLDivElement>(null);
  const handle = useRef<SceneHandle | null>(null);
  const [light, setLight] = useState(true);
  const [mode, setMode] = useState<"poster" | "3d" | "fallback">("poster");
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Model 3D ładuje się dopiero, gdy podgląd jest już na ekranie, żeby nie spowalniać wejścia na stronę.
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.intersectionRatio >= 0.2) setNear(true);
      },
      { threshold: [0, 0.2] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (near && mode === "poster") setMode(hasWebGL() ? "3d" : "fallback");
  }, [near, mode]);

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

  const iconButton =
    "inline-flex size-11 items-center justify-center rounded-lg border border-white/12 text-foreground/90 transition-colors hover:border-white/30 hover:bg-white/[0.06] disabled:opacity-40";

  return (
    <section
      id="preview"
      aria-labelledby="preview-title"
      className="py-20 sm:py-28"
    >
      <div className="section">
        <SectionHeading id="preview-title" title={t.title} lead={t.lead} />

        <div
          ref={frame}
          className={cn(
            "relative mt-12 overflow-hidden border border-white/10 bg-background",
            expanded
              ? "fixed inset-0 z-[60] mt-0 flex flex-col rounded-none border-0"
              : "rounded-2xl",
          )}
        >
          <div
            className={cn(
              "relative w-full",
              expanded ? "flex-1" : "aspect-[4/5] sm:aspect-[16/9]",
            )}
            role="img"
            aria-label={t.canvasLabel}
          >
            {/* Plakat widoczny przed załadowaniem i jako wersja zapasowa bez WebGL */}
            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-700",
                mode === "3d" && ready
                  ? "pointer-events-none opacity-0"
                  : "opacity-100",
              )}
            >
              {/* Plakaty są renderami tej samej sceny w proporcjach ramki (4:5 i 16:9), więc model nie przeskakuje po załadowaniu */}
              <Image
                src={`/images/viewer-tall-${light ? "on" : "off"}.webp`}
                alt=""
                fill
                sizes="100vw"
                className="object-cover sm:hidden"
              />
              <Image
                src={`/images/viewer-wide-${light ? "on" : "off"}.webp`}
                alt=""
                fill
                sizes="(min-width: 1280px) 1216px, 100vw"
                className="hidden object-cover sm:block"
              />
              {mode !== "fallback" && (
                <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                  {t.loading}
                </span>
              )}
            </div>
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
            <p className="px-5 pt-4 text-sm text-muted-foreground">
              {t.fallback}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-2 border-t border-white/[0.07] p-4">
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
              disabled={!ready}
              onClick={() => handle.current?.rotateBy(-Math.PI / 4)}
            >
              <RotateCcwIcon className="size-4" />
            </button>
            <button
              type="button"
              className={iconButton}
              aria-label={t.rotateRight}
              title={t.rotateRight}
              disabled={!ready}
              onClick={() => handle.current?.rotateBy(Math.PI / 4)}
            >
              <RotateCwIcon className="size-4" />
            </button>
            <button
              type="button"
              className={iconButton}
              aria-label={t.zoomOut}
              title={t.zoomOut}
              disabled={!ready}
              onClick={() => handle.current?.zoomBy(1 / 1.25)}
            >
              <MinusIcon className="size-4" />
            </button>
            <button
              type="button"
              className={iconButton}
              aria-label={t.zoomIn}
              title={t.zoomIn}
              disabled={!ready}
              onClick={() => handle.current?.zoomBy(1.25)}
            >
              <PlusIcon className="size-4" />
            </button>
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
      </div>
    </section>
  );
}
