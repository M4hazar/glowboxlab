import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Dwie wersje językowe mają osobne root layouty, więc 404 jest globalne.
    globalNotFound: true,
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
