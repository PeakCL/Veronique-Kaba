# Logo et favicon du site — en attente de validation

Fichiers prêts, **pas encore branchés sur le site** : on attend que Véronique
valide le logo. L'arborescence reproduit leur destination dans le projet.

## Contenu

| Fichier | Usage |
|---|---|
| `src/app/favicon.ico` | Favicon (16, 32, 48 px) — monogramme or sur tuile noire |
| `src/app/icon.png` | Icône 512 px (onglets, Android, résultats Google) |
| `src/app/apple-icon.png` | Icône écran d'accueil iPhone (180 px, carrée, opaque) |
| `public/logo/vk-logo-or.{webp,png}` | Logo complet, fond transparent — **pour fonds sombres** |
| `public/logo/vk-logo-noir.{webp,png}` | Logo complet, fond transparent — **pour fonds clairs** |
| `public/logo/vk-monogramme-or.{webp,png}` | Lettres VK seules (sans cercle) — petites tailles, fonds sombres |
| `public/logo/vk-monogramme-noir.{webp,png}` | Lettres VK seules — petites tailles, fonds clairs (en-tête du site) |

Le favicon et les monogrammes n'ont que les lettres : à 16–40 px, le cercle fin
et les pointillés deviennent illisibles.

## Activer (après validation)

1. Copier les fichiers à leur place :
   ```bash
   cp assets/logo-site/src/app/* src/app/
   mkdir -p public/logo && cp assets/logo-site/public/logo/* public/logo/
   ```
   Next.js détecte seul `favicon.ico`, `icon.png` et `apple-icon.png` dans
   `src/app/` : aucune balise à ajouter.
2. En-tête (`src/components/layout/Header.tsx`) : remplacer la pastille
   « Sparkles » par `/logo/vk-monogramme-noir.webp` (hauteur ~40 px).
3. Données structurées : dans `localBusinessJsonLd()` (`src/lib/seo.ts`),
   remplacer `logo: primaryImage` (une photo, aujourd'hui) par
   `logo: abs("/logo/vk-logo-noir.png")`.

## Régénérer

Quand la version vectorielle existera, exporter deux PNG transparents
(or et noir) à la place de `public/presentation-logo/logo-*-transparent.webp`,
puis :

```bash
python3 assets/logo-site/generer.py
```
