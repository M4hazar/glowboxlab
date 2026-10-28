import type { NextConfig } from "next";

// Polityka treści: wszystko z własnej domeny. Skrypty inline są potrzebne Next.js (strony są
// statyczne, więc bez nonce), 'wasm-unsafe-eval' dekoderowi modelu 3D. Tylko w produkcji,
// bo serwer deweloperski potrzebuje eval i websocketu. Na podglądach Vercela dochodzi pasek Vercela.
const preview = process.env.VERCEL_ENV === "preview";
const vercelLive = preview ? " https://vercel.live" : "";
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'${vercelLive}`,
  `style-src 'self' 'unsafe-inline'${vercelLive}`,
  `img-src 'self' data: blob:${preview ? " https://vercel.live https://vercel.com" : ""}`,
  `font-src 'self'${preview ? " https://vercel.live https://assets.vercel.com" : ""}`,
  `connect-src 'self' data: blob:${preview ? " https://vercel.live wss://ws-us3.pusher.com" : ""}`,
  "worker-src 'self' blob:",
  `frame-src ${preview ? "https://vercel.live" : "'none'"}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Dwie wersje językowe mają osobne root layouty, więc 404 jest globalne.
    globalNotFound: true,
    // Bez pamięci podręcznej Turbopacka między buildami. Vercel ją przywraca i raz złożył z niej
    // nowy kod ze starym arkuszem stylów (bez jasnego motywu). Zysk to tylko ok. 2 s na build.
    turbopackFileSystemCacheForBuild: false,
    serverActions: {
      // Formularz wyceny przyjmuje załączniki do 4 MB (limit funkcji Vercel to 4,5 MB).
      bodySizeLimit: "5mb",
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Podstawowe nagłówki bezpieczeństwa dla każdej strony.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          ...(process.env.NODE_ENV === "production"
            ? [{ key: "Content-Security-Policy", value: contentSecurityPolicy }]
            : []),
          { key: "Strict-Transport-Security", value: "max-age=63072000" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
