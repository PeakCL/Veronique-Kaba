import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    // AVIF puis WebP : Next sert le format le plus léger supporté par le
    // navigateur. AVIF ~30 % plus petit que WebP sur ces photos de nature.
    formats: ["image/avif", "image/webp"],
    // Niveaux de qualité utilisés dans le code (requis à partir de Next 16).
    qualities: [35, 70, 75],
    // Cache long des images optimisées (Netlify/CDN) — elles ne changent pas.
    minimumCacheTTL: 2678400, // 31 jours
  },
};

export default nextConfig;
