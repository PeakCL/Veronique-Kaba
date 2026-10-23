import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Espace formation privé : inutile à indexer
      // Présentation et choix du logo : réservés à Véronique
      disallow: ["/formation/espace", "/paiement", "/presentation-logo", "/choix-logo"],
    },
    sitemap: new URL("/sitemap.xml", base).toString(),
    host: base,
  };
}
