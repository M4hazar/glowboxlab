import type { NextConfig } from "next";

// Strona to same pliki (folder `out`) na zwykłym hostingu OVH, bez serwera Node.js.
// Formularz obsługuje `hosting/api/quote.php`, a przekierowanie na /pl, nagłówki
// bezpieczeństwa i 404 `hosting/.htaccess`. Oba trafiają do `out` przy `pnpm build`.
const nextConfig: NextConfig = {
  output: "export",
  experimental: {
    // Dwie wersje językowe mają osobne root layouty, więc 404 jest globalne.
    globalNotFound: true,
    // Bez pamięci podręcznej Turbopacka między buildami: raz złożyła nowy kod ze starym
    // arkuszem stylów (bez jasnego motywu). Zysk to tylko ok. 2 s na build.
    turbopackFileSystemCacheForBuild: false,
  },
  images: {
    // Bez serwera nie ma optymalizacji obrazów w locie. Pliki w public są już w WebP.
    unoptimized: true,
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
