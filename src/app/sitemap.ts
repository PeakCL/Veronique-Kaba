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
  const now = new Date();
  return routes.map((r) => ({
    url: new URL(r.path, base).toString(),
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
