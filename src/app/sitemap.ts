import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

/** Pages publiques à indexer, avec leur priorité relative. */
const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/soins", priority: 0.9, changeFrequency: "monthly" },
  { path: "/recouvrement-ame", priority: 0.8, changeFrequency: "monthly" },
  { path: "/formation", priority: 0.8, changeFrequency: "monthly" },
  { path: "/apropos", priority: 0.7, changeFrequency: "yearly" },
  { path: "/rendez-vous", priority: 0.7, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/mentions-legales", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Pas de `lastModified` : la date de build, identique pour toutes les URL, n'apporte
  // aucune information à Google — un lastmod non fiable est ignoré. Mieux vaut l'omettre
  // que de déclarer une date fausse.
  return routes.map((r) => ({
    // `replace` : la racine devient « https://domaine.fr » (sans slash final),
    // exactement la forme servie dans la balise canonical.
    url: new URL(r.path, base).toString().replace(/\/$/, ""),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
