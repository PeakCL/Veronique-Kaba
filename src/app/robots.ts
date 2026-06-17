import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Espace formation privé : inutile à indexer
      disallow: ["/formation/espace", "/paiement"],
    },
    sitemap: new URL("/sitemap.xml", base).toString(),
    host: base,
  };
}
