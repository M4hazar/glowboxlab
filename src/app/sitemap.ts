import type { MetadataRoute } from "next";
import { absoluteUrl, type RouteKey, routes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return (Object.keys(routes) as RouteKey[]).flatMap((key) =>
    (["en", "pl"] as const).map((locale) => ({
      url: absoluteUrl(routes[key][locale]),
      changeFrequency:
        key === "privacy" || key === "terms"
          ? ("yearly" as const)
          : ("monthly" as const),
      priority: key === "home" ? 1 : key === "portfolio" ? 0.7 : 0.3,
      alternates: {
        languages: {
          "en-GB": absoluteUrl(routes[key].en),
          "pl-PL": absoluteUrl(routes[key].pl),
        },
      },
    })),
  );
}
