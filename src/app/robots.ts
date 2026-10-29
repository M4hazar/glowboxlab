import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// Eksport statyczny wymaga jawnego zapisu tej trasy do pliku.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
