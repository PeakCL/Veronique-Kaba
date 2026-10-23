// Pré-génère les images des bandeaux (PageBanner) en WebP statique, en deux
// largeurs. Servies telles quelles par le CDN : pas de passage par
// l'optimiseur d'images au premier affichage, donc pas d'arrivée tardive.
// Usage : node scripts/banners.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SOURCES = [
  "foret-rayons-bouleaux.jpg",
  "foret-chemin-soleil.jpg",
  "foret-brume-chemin.jpg",
  "arbres-soleil.jpg",
  "foret-lumiere-homme.jpg",
];
export const WIDTHS = [800, 1200, 1600];

const src = path.resolve("public/images");
const out = path.join(src, "banners");
await mkdir(out, { recursive: true });

for (const file of SOURCES) {
  const name = path.parse(file).name;
  for (const w of WIDTHS) {
    const dest = path.join(out, `${name}-${w}.webp`);
    // Qualité basse assumée : la photo est tramée et saturée façon BD par-dessus
    const info = await sharp(path.join(src, file))
      .resize({ width: w, height: Math.round(w * 0.42), fit: "cover", position: "attention" })
      .webp({ quality: 50, effort: 6 })
      .toFile(dest);
    console.log(`${dest}  ${Math.round(info.size / 1024)} Ko`);
  }
}
