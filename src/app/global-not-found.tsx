import type { Metadata } from "next";
import { jakarta } from "@/app/fonts";
import { en } from "@/content/en";
import { pl } from "@/content/pl";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 | GlowBox Lab",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${jakarta.variable} dark`}>
      <body className="flex min-h-dvh items-center justify-center px-6">
        <main className="max-w-xl text-center">
          {/* biome-ignore lint/performance/noImgElement: logo SVG */}
          <img
            src="/brand/sygnet.svg"
            alt=""
            width={96}
            height={97}
            className="mx-auto h-20 w-auto"
          />
          <p className="eyebrow mt-10">404</p>
          <h1 className="display mt-4 text-4xl sm:text-5xl">
            {en.notFound.title}
          </h1>
          <p className="mt-4 text-muted-foreground">{en.notFound.text}</p>
          <p className="mt-1 text-muted-foreground" lang="pl">
            {pl.notFound.title} {pl.notFound.text}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="/"
              className="inline-flex h-12 items-center rounded-lg bg-primary px-6 font-semibold text-white"
            >
              {en.notFound.back}
            </a>
            <a
              href="/pl"
              lang="pl"
              className="inline-flex h-12 items-center rounded-lg border border-white/15 px-6 font-medium"
            >
              {pl.notFound.back}
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
