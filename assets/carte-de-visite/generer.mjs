/**
 * Génère le PDF prêt à imprimer de la carte de visite de Véronique Kaba.
 *
 *   node assets/carte-de-visite/generer.mjs
 *
 * Produit, dans ce dossier :
 *   - carte-visite-veronique-kaba.pdf              91 × 61 mm (85 × 55 + 3 mm de fond perdu), sans traits de coupe
 *   - carte-visite-veronique-kaba-traits-coupe.pdf 111 × 81 mm, avec traits de coupe
 * Page 1 = recto, page 2 = verso. Rendu par Google Chrome (mode headless).
 */
import { execFileSync } from "node:child_process";
import { readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// ── Coordonnées (identiques au site : src/lib/content.ts) ──
const contact = {
  phone: "07 71 17 67 27",
  email: "eyaelle54350@gmail.com",
  web: "veronique-kaba.fr",
  place: "Longwy et alentours",
};

// ── Pictogrammes Lucide (mêmes que sur le site) ──
async function icon(name) {
  const mod = await import(pathToFileURL(join(root, `node_modules/lucide-react/dist/esm/icons/${name}.js`)));
  const inner = mod.__iconNode
    .map(([tag, attrs]) => {
      const a = Object.entries(attrs)
        .filter(([k]) => k !== "key")
        .map(([k, v]) => `${k}="${v}"`)
        .join(" ");
      return `<${tag} ${a}/>`;
    })
    .join("");
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
}

/**
 * Polices statiques incorporées (Fontsource, licence OFL) : pas de dépendance
 * réseau, et pas de police variable, que Chrome incorporerait en Type 3 —
 * format refusé par certains imprimeurs.
 */
function fontFaces() {
  const face = (family, weight, file) =>
    `@font-face { font-family: "${family}"; font-weight: ${weight}; font-style: normal; src: url(data:font/woff2;base64,${readFileSync(join(here, "polices", file)).toString("base64")}) format("woff2"); }`;
  return [
    face("Cormorant Garamond", 500, "cormorant-garamond-latin-500-normal.woff2"),
    face("Jost", 300, "jost-latin-300-normal.woff2"),
    face("Jost", 400, "jost-latin-400-normal.woff2"),
  ].join("\n");
}

const img = (file) =>
  `data:image/webp;base64,${readFileSync(join(root, "public/presentation-logo", file)).toString("base64")}`;

const waves = [0, 1, 2, 3, 4]
  .map(
    (i) =>
      `<path d="M0 ${250 + i * 9} C 180 ${150 + i * 14}, 260 ${360 - i * 10}, 425 ${265 + i * 4} S 680 ${150 + i * 12}, 850 ${240 + i * 8}" fill="none" stroke="#C9A15B" stroke-width="0.8" opacity="${(0.18 + i * 0.05).toFixed(2)}"/>`,
  )
  .join("");

/** Traits de coupe : aux angles de la zone de coupe, hors du fond perdu. */
function cropMarks(offset) {
  // offset = distance du bord de page au bord de coupe (mm)
  const W = 85, H = 55, gap = 3.5, len = 5;
  const xs = [offset, offset + W], ys = [offset, offset + H];
  const lines = [];
  for (const x of xs) {
    lines.push([x, offset - gap - len, x, offset - gap]);
    lines.push([x, offset + H + gap, x, offset + H + gap + len]);
  }
  for (const y of ys) {
    lines.push([offset - gap - len, y, offset - gap, y]);
    lines.push([offset + W + gap, y, offset + W + gap + len, y]);
  }
  return `<svg class="marks" viewBox="0 0 ${W + 2 * offset} ${H + 2 * offset}">${lines
    .map(([x1, y1, x2, y2]) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#000" stroke-width="0.25"/>`)
    .join("")}</svg>`;
}

async function html({ marks }) {
  const bleed = 3;
  const margin = marks ? 10 : 0; // marge extérieure pour loger les traits
  const pageW = 85 + 2 * bleed + 2 * margin;
  const pageH = 55 + 2 * bleed + 2 * margin;
  const [phone, mail, globe, pin] = await Promise.all(["phone", "mail", "globe", "map-pin"].map(icon));

  // Contenu positionné par rapport au bord de coupe (le fond déborde de 3 mm).
  const recto = `
    <div class="card cream">
      <div class="trim recto">
        <img class="logo-recto" src="${img("logo-noir-transparent.webp")}" alt="">
        <span class="rule"></span>
        <div class="info">
          <p class="name">Véronique Kaba</p>
          <p class="role">Magnétiseuse énergéticienne</p>
          <span class="dash"></span>
          <ul>
            <li>${phone}<span>${contact.phone}</span></li>
            <li>${mail}<span>${contact.email}</span></li>
            <li>${globe}<span>${contact.web}</span></li>
            <li>${pin}<span>${contact.place}</span></li>
          </ul>
        </div>
      </div>
    </div>`;

  const verso = `
    <div class="card black">
      <svg class="waves" viewBox="0 0 850 550" preserveAspectRatio="none">${waves}</svg>
      <div class="trim verso">
        <img class="logo-verso" src="${img("logo-or-transparent.webp")}" alt="">
        <p class="motto">Équilibre · Énergie · Harmonie</p>
        <span class="dash center"></span>
      </div>
    </div>`;

  const page = (content) => `
    <section class="page">
      ${marks ? cropMarks(margin + bleed) : ""}
      <div class="bleed">${content}</div>
    </section>`;

  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8">
<style>
  ${fontFaces()}
  @page { size: ${pageW}mm ${pageH}mm; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .page { position: relative; width: ${pageW}mm; height: ${pageH}mm; overflow: hidden; page-break-after: always; background: #fff; }
  .marks { position: absolute; inset: 0; width: 100%; height: 100%; }
  .bleed { position: absolute; left: ${margin}mm; top: ${margin}mm; width: ${85 + 2 * bleed}mm; height: ${55 + 2 * bleed}mm; }
  .card { position: absolute; inset: 0; overflow: hidden; }
  .trim { position: absolute; left: ${bleed}mm; top: ${bleed}mm; width: 85mm; height: 55mm; }

  .cream { background: radial-gradient(circle at 25% 15%, #f8f4ec, #efe8dc 70%); color: #1b1815; }
  .black { background: radial-gradient(ellipse at 50% 42%, #1d1813, #070605 78%); color: #c9a15b; }

  /* Recto — tout le contenu reste à plus de 3 mm du bord de coupe */
  .recto { display: flex; align-items: center; padding: 6mm 5mm 6mm 5.5mm; }
  .logo-recto { width: 23mm; height: auto; flex: none; }
  .rule { align-self: stretch; width: 0.2mm; margin: 0 4.2mm; background: #c9a15b; flex: none; }
  .name { font-family: "Cormorant Garamond", serif; font-weight: 500; font-size: 10pt; letter-spacing: 0.14em; text-transform: uppercase; white-space: nowrap; line-height: 1.1; }
  .role { font-family: "Jost", sans-serif; font-weight: 400; font-size: 6.8pt; letter-spacing: 0.03em; margin-top: 0.9mm; white-space: nowrap; }
  .dash { display: block; width: 5mm; height: 0.2mm; background: #c9a15b; margin: 2.6mm 0; }
  .dash.center { margin: 2.4mm auto 0; }
  ul { list-style: none; display: grid; gap: 1.35mm; font-family: "Jost", sans-serif; font-weight: 300; font-size: 6.4pt; }
  li { display: flex; align-items: center; gap: 2mm; white-space: nowrap; }
  li svg { width: 2.6mm; height: 2.6mm; flex: none; color: #b8893f; }

  /* Verso */
  .waves { position: absolute; inset: 0; width: 100%; height: 100%; }
  .verso { display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .logo-verso { width: 25mm; height: auto; }
  .motto { font-family: "Jost", sans-serif; font-weight: 400; font-size: 6.2pt; letter-spacing: 0.32em; text-transform: uppercase; margin-top: 2.6mm; }
</style></head>
<body>${page(recto)}${page(verso)}</body></html>`;
}

for (const marks of [false, true]) {
  const name = marks ? "carte-visite-veronique-kaba-traits-coupe" : "carte-visite-veronique-kaba";
  const htmlPath = join(here, `${name}.html`);
  writeFileSync(htmlPath, await html({ marks }));
  execFileSync(CHROME, [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--virtual-time-budget=15000",
    `--print-to-pdf=${join(here, `${name}.pdf`)}`,
    pathToFileURL(htmlPath).href,
  ], { stdio: "ignore" });
  unlinkSync(htmlPath); // HTML intermédiaire, seul le PDF compte
  console.log(`✓ ${name}.pdf`);
}
