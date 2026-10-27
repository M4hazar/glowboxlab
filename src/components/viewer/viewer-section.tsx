"use client";

import {
  Hand,
  Maximize2Icon,
  Minimize2Icon,
  MinusIcon,
  PlusIcon,
  RotateCcwIcon,
  RotateCwIcon,
  ScanIcon,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content/en";
import { cn } from "@/lib/utils";
import type { LedColour, SceneHandle } from "./lightbox-scene";

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
  const [led, setLed] = useState<LedColour>("white");
  const [mode, setMode] = useState<"poster" | "3d" | "fallback">("poster");
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Model 3D ładuje się dopiero, gdy sekcja zbliża się do ekranu.
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: "300px 0px" },
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
    "inline-flex size-11 items-center justify-center rounded-lg border border-white/12 bg-white/[0.03] text-foreground/90 transition-colors hover:border-white/25 hover:bg-white/[0.07] disabled:opacity-40 sm:size-10";

  return (
    <section
      id="preview"
      aria-labelledby="preview-title"
      className="relative py-20 sm:py-28"
    >
      <div className="section">
        <div className="max-w-3xl">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 id="preview-title" className="display mt-4 text-4xl sm:text-6xl">
            {t.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-5 max-w-xl text-lg text-pretty text-muted-foreground">
            {t.lead}
          </p>
        </div>

        <div
          ref={frame}
          className={cn(
            "relative mt-12 overflow-hidden border border-white/10 bg-[#05070a]",
            expanded
              ? "fixed inset-0 z-[60] mt-0 rounded-none border-0"
              : "rounded-2xl shadow-[0_40px_120px_-40px_rgb(0_127_255/0.35)]",
          )}
        >
          <p className="pointer-events-none absolute top-4 left-5 z-10 text-xs text-muted-foreground">
            {t.label}
          </p>

          <div
            className={cn(
              "relative w-full",
              expanded
                ? "h-[calc(100dvh-9.5rem)] sm:h-[calc(100dvh-5.5rem)]"
                : "aspect-[4/5] sm:aspect-[16/9]",
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
              <Image
                src={
                  light ? "/images/viewer-on.webp" : "/images/viewer-off.webp"
                }
                alt=""
                fill
                sizes="(min-width: 1280px) 1216px, 100vw"
                className="object-cover"
              />
              {mode !== "fallback" && (
                <span className="absolute bottom-24 left-1/2 -translate-x-1/2 text-xs text-muted-foreground sm:bottom-6">
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
                  led={led}
                  active={visible}
                  handle={handle}
                  onReady={() => setReady(true)}
                />
              </div>
            )}
          </div>

          {mode === "fallback" && (
            <p className="px-5 pt-3 text-sm text-muted-foreground">
              {t.fallback}
            </p>
          )}

          <div className="relative z-10 flex flex-col gap-4 border-t border-white/[0.07] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="hidden items-center gap-2.5 text-sm text-muted-foreground sm:flex">
              <Hand className="size-5" aria-hidden />
              {t.dragHint}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 sm:justify-center sm:gap-6">
              <fieldset className="flex items-center gap-3">
                <legend className="sr-only">{t.light}</legend>
                <span aria-hidden className="text-sm font-medium">
                  {t.light}
                </span>
                <div className="flex rounded-lg border border-white/12 bg-white/[0.03] p-1">
                  {([false, true] as const).map((value) => (
                    <button
                      key={String(value)}
                      type="button"
                      aria-pressed={light === value}
                      onClick={() => setLight(value)}
                      className={cn(
                        "h-9 min-w-14 rounded-md px-3 text-sm font-semibold tracking-wide transition-colors",
                        light === value
                          ? "bg-primary text-white"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {value ? t.on : t.off}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="flex items-center gap-3">
                <legend className="sr-only">{t.ledColour}</legend>
                <span aria-hidden className="text-sm font-medium">
                  {t.ledColour}
                </span>
                <div className="flex gap-2">
                  {(["white", "blue"] as const).map((value) => (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={led === value}
                      aria-label={t.colours[value]}
                      title={t.colours[value]}
                      onClick={() => {
                        setLed(value);
                        setLight(true);
                      }}
                      className={cn(
                        "flex size-9 items-center justify-center rounded-full border transition-colors",
                        led === value
                          ? "border-brand-soft"
                          : "border-white/15 hover:border-white/35",
                      )}
                    >
                      <span
                        className={cn(
                          "size-5 rounded-full",
                          value === "white"
                            ? "bg-white shadow-[0_0_12px_rgb(255_255_255/0.6)]"
                            : "bg-brand shadow-[0_0_12px_rgb(0_127_255/0.8)]",
                        )}
                      />
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="flex items-center justify-between gap-2 sm:justify-end">
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
                aria-label={t.reset}
                title={t.reset}
                disabled={!ready}
                onClick={() => handle.current?.reset()}
              >
                <ScanIcon className="size-4" />
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
        <p className="mt-4 text-xs text-muted-foreground">{t.note}</p>
      </div>
    </section>
  );
}
