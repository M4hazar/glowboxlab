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
