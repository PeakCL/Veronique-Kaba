# Audit SEO — veronique-kaba.fr
**Véronique et l'énergie dorée · Magnétiseuse & énergéticienne (Longwy + à distance)**
Audit technique & on-page · 11 septembre 2026
*Fait suite à l'audit du 17 juin 2026 (`audit-seo-veronique-kaba.md`).*

---

## Synthèse

Depuis juin, l'essentiel des correctifs techniques a été livré : données structurées
(LocalBusiness + Person + WebSite + Service + Course + FAQ + Breadcrumb), `sitemap.xml`,
`robots.txt`, mentions légales, Open Graph en URL absolue, HTTPS + HSTS, redirections
www → apex et http → https. **La base technique est désormais saine.**

Deux problèmes bloquants subsistent, et ils ne sont pas de nature « SEO » au sens strict —
ils cassent la conversion et la crédibilité, ce que Google lit aussi :

1. **La page de réservation affiche un texte de développeur aux visiteurs.**
2. **L'adresse e-mail publiée partout sur le site pointe vers un domaine expiré.**

Tout le trafic SEO gagné aujourd'hui se perd sur ces deux points.

### Top 5 des priorités

| # | Problème | Impact | Effort |
|---|---|---|---|
| 1 | `/rendez-vous` affiche « Configurez `NEXT_PUBLIC_CALENDLY_URL` … » | **Critique** | 10 min |
| 2 | E-mail de contact sur un domaine mort (`veronique-et-lenergie-doree.fr`) | **Critique** | 30 min |
| 3 | `/philosophie` redirige en **307 temporaire** au lieu de 308 permanent | Élevé | 2 min |
| 4 | Fond décoratif de 863 Ko chargé en `priority` sur desktop | Élevé | 15 min |
| 5 | Fiche Google Business Profile absente du `sameAs` Schema.org | Élevé | 20 min |

**État déployé :** le build en ligne correspond au commit `36f1045` (9 juillet 2026).
Aucun écart entre le code local et la production — tous les constats ci-dessous sont valables
sur les deux.

---

## Statut des correctifs — appliqués le 11 septembre 2026

Corrigés dans le code (build vérifié, `tsc` et `next lint` au vert) :

| # | Correctif | Vérification |
|---|---|---|
| 1.1 | Repli de `/rendez-vous` réécrit — plus aucune mention technique | aucune occurrence de `.env` / `NEXT_PUBLIC_*` dans le HTML servi |
| 1.2 | `site.email` → `contact@veronique-kaba.fr` | propagé sur Contact, Mentions légales et JSON-LD |
| 2.1 | `/philosophie` → `permanentRedirect` | **308** (était 307) |
| 2.2 | `noindex` sur `/paiement/succes` et `/formation/espace/[moduleId]` + canonical propre | `noindex, nofollow` |
| 2.3 | Mentions légales réindexées | `index, follow` |
| 2.4 | Page 404 française (`src/app/not-found.tsx`) avec liens de rattrapage | h1 « Cette page s'est envolée » |
| 3.1 | Fonds décoratifs allégés (textures dédiées, `priority` retiré, `quality={35}`) | hero 863 Ko → **128 Ko** ; WarmCTA 144 Ko → 32 Ko |
| 3.2 | Images sources ré-encodées (max 2560 px) | **52,6 Mo → 2,6 Mo** |
| 4.1 | Fiche Google ajoutée en `sameAs` + `hasMap`, lien nettoyé de ses paramètres de session | présent dans le JSON-LD |
| 4.4 | `og:image` dédiée **1200 × 630** (`og-partage.webp`) | l'ancienne était déclarée 1200×1200 alors qu'elle faisait 1024×1024 |
| 5.2 | `/recouvrement-ame` restructurée : 5 `h2`, déroulé, public visé, modalités, tarif | 269 → **530 mots** |
| 5.4 | `<meta name="keywords">` supprimée | 0 occurrence |
| 5.5 | Sitemap : `lastmod` retiré, racine alignée sur le canonical | 8 URL, 0 `lastmod` |
| — | `BreadcrumbList` ajouté sur `/apropos`, `/contact`, `/rendez-vous`, `/recouvrement-ame` | 4 pages |
| — | `README.md` et `.env.example` corrigés (domaine, variable Calendly signalée obligatoire) | — |

**Poids de l'accueil : 1 562 Ko → 717 Ko (−54 %).**

### Restant à faire — hors code

Ces points ne peuvent pas être corrigés depuis le dépôt&nbsp;:

1. **Définir `NEXT_PUBLIC_CALENDLY_URL` sur Netlify** — sans elle, `/rendez-vous` affiche le
   repli (désormais présentable) au lieu de l'agenda. *Le correctif de code rend la page
   acceptable ; il ne remplace pas le calendrier.*
2. **Créer la boîte `contact@veronique-kaba.fr`** (MX + SPF/DKIM/DMARC) — le code pointe
   désormais vers cette adresse, **mais elle n'existe pas encore**. Tant qu'elle n'est pas
   créée, les e-mails continuent d'échouer.
3. **Mettre à jour `CONTACT_EMAIL` sur Netlify** — destinataire du formulaire de contact.
4. **Renseigner les horaires réels** dans `localBusinessJsonLd()` (gabarit commenté en place).
5. **Récupérer l'URL canonique de la fiche Google** depuis le tableau de bord GBP
   (`https://www.google.com/maps/place/?q=place_id:…`) — le lien actuel, nettoyé, reste un lien
   de recherche.
6. **Fiche Google Business Profile, Search Console, annuaires, avis** — voir §6.
7. **Supprimer `avatar-véro.png` et `véro-avatar.png`** à la racine (3 Mo chacun, non suivis par
   git donc non récupérables — laissés en place volontairement).

---

## 1. Bloquants (à corriger cette semaine)

### 1.1 — La page de réservation affiche un message de configuration technique

**Sévérité : Critique.** C'est la page vers laquelle pointent **6 liens internes** depuis
l'accueil, le bouton « Réserver » du menu (desktop + mobile), et le CTA principal du hero.

**Preuve** — contenu réellement servi sur `https://veronique-kaba.fr/rendez-vous` :

> 📅 Calendrier en ligne
> Configurez `NEXT_PUBLIC_CALENDLY_URL` dans votre fichier `.env.local` pour activer l'embed Calendly.

La page renvoie `200`, est en `index, follow`, et figure dans le `sitemap.xml` en priorité 0.7 :
Google l'explore et l'indexe en l'état. Un visiteur qui clique « Réserver une séance » arrive
sur un message d'erreur destiné au développeur.

**Cause** — `src/components/booking/CalendlyEmbed.tsx` affiche ce bloc de repli quand la
variable `NEXT_PUBLIC_CALENDLY_URL` est absente ou vaut encore `votre-compte`. Elle n'est pas
définie sur Netlify.

**Correctif** — deux actions :

1. Définir `NEXT_PUBLIC_CALENDLY_URL` dans les variables d'environnement Netlify
   (Site configuration → Environment variables) avec la vraie URL Calendly, puis redéployer.
2. Rendre le repli présentable pour l'utilisateur, afin qu'une variable manquante ne puisse
   plus jamais exposer du jargon technique en production :

```tsx
// src/components/booking/CalendlyEmbed.tsx — remplacer le bloc de repli
if (!calendlyUrl || calendlyUrl.includes("votre-compte")) {
  return (
    <Bubble variant="white" tail="none">
      <div className="rounded-2xl border-4 border-dashed border-sky-300 bg-sky-50 p-12 text-center">
        <p className="text-6xl">📅</p>
        <p className="mt-4 font-[family-name:var(--font-display)] text-2xl">
          Réserver votre séance
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink/70">
          Le plus simple : un appel ou un message — je vous réponds sous 24 h et nous
          convenons ensemble du créneau qui vous convient.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ComicButton href={site.phoneHref}>Appeler maintenant</ComicButton>
          <ComicButton href="/contact" variant="outline">Envoyer un message</ComicButton>
        </div>
      </div>
    </Bubble>
  );
}
```

---

### 1.2 — L'adresse e-mail publiée pointe vers un domaine expiré

**Sévérité : Critique.** `contact@veronique-et-lenergie-doree.fr` est publié :

- sur la page **Contact** (« Coordonnées ») ;
- dans les **Mentions légales** (mention obligatoire) ;
- dans le balisage **Schema.org `LocalBusiness`** (champ `email`, lu par Google) ;
- dans `.env.example` (`CONTACT_EMAIL`).

**Preuve** — le domaine n'a plus aucun enregistrement DNS :

```
$ dig +short NS veronique-et-lenergie-doree.fr   → (vide)
$ dig +short  A veronique-et-lenergie-doree.fr   → (vide)
$ dig +short MX veronique-et-lenergie-doree.fr   → (vide)
```

Pas de serveur de noms, pas de serveur de mail : **tout message envoyé à cette adresse est
rejeté**. Chaque prospect qui écrit plutôt que d'appeler est perdu sans que personne le sache.

Par ailleurs, `veronique-kaba.fr` n'a **pas non plus d'enregistrement MX** — aucune boîte mail
n'est hébergée sur le domaine actif.

*Bonne nouvelle au passage :* le risque de contenu dupliqué signalé en juin est éteint —
l'ancien domaine ne résout plus du tout.

**Correctif :**

1. Créer une adresse sur le domaine actif — `contact@veronique-kaba.fr` — via l'hébergeur
   DNS (les NS sont chez NS1/Netlify) ou un service tiers (Google Workspace, Infomaniak,
   Zoho Mail). Ajouter les enregistrements **MX**, puis **SPF/DKIM/DMARC** pour la délivrabilité.
2. Mettre à jour `src/lib/content.ts` :

```ts
email: "contact@veronique-kaba.fr",
```

   Ce seul changement propage la correction sur la page Contact, les Mentions légales et le
   JSON-LD — les trois lisent `site.email`.
3. Mettre à jour `CONTACT_EMAIL` dans les variables d'environnement Netlify (destinataire du
   formulaire de contact — à vérifier : si elle vaut encore l'ancienne adresse, **le formulaire
   de contact ne délivre rien non plus**).
4. Corriger l'exemple dans `.env.example` et l'URL dans le tableau du `README.md`
   (ligne 23, qui mentionne encore `www.veronique-et-lenergie-doree.fr`).

> **Sécurité :** un domaine expiré peut être racheté par un tiers, qui recevrait alors les
> e-mails destinés à cette adresse. Traiter en priorité. Si le domaine a une valeur de marque,
> envisager de le reprendre et de le rediriger en 301 vers `veronique-kaba.fr`.

---

## 2. Technique — problèmes confirmés

### 2.1 — `/philosophie` redirige en 307 (temporaire) au lieu de 308

**Impact : Élevé.** Un 307 dit à Google « cette URL reviendra » : l'ancienne URL reste indexée
et **les signaux ne sont pas transférés** vers `/apropos`.

**Preuve :** `curl -I https://veronique-kaba.fr/philosophie` → `307`.
À comparer avec `/temoignages`, correctement traitée en `308`.

**Correctif** — `src/app/philosophie/page.tsx` :

```tsx
import { permanentRedirect } from "next/navigation";

export default function PhilosophieRedirect() {
  permanentRedirect("/apropos");
}
```

### 2.2 — `/paiement/succes` est indexable et se canonicalise vers l'accueil

**Impact : Moyen.** La page renvoie `200` avec `robots: index, follow` et,
faute de métadonnées propres, hérite du `canonical` du layout racine — soit
`https://veronique-kaba.fr` (l'accueil). C'est un canonical inter-pages : mauvais signal.

`robots.txt` contient bien `Disallow: /paiement`, ce qui limite les dégâts, mais un `Disallow`
empêche l'exploration, **pas l'indexation de l'URL** si elle est découverte par ailleurs
(et une directive `noindex` sur une page bloquée n'est jamais lue).

**Correctif** — ajouter dans `src/app/paiement/succes/page.tsx` :

```tsx
export const metadata = {
  title: "Paiement confirmé",
  robots: { index: false, follow: false },
  alternates: { canonical: "/paiement/succes" },
};
```

Même remarque pour `src/app/formation/espace/[moduleId]/page.tsx`, qui n'exporte aucune
métadonnée et hérite donc lui aussi du `canonical` de l'accueil : ajouter
`robots: { index: false, follow: false }`.

### 2.3 — Les mentions légales sont en `noindex`

**Impact : Moyen.** `src/app/mentions-legales/page.tsx` force `robots: { index: false }`.

Sur un site de bien-être — secteur que Google classe en **YMYL** (*Your Money or Your Life*),
scruté de près sur les critères E-E-A-T — la page qui porte le SIRET, l'identité de
l'éditeur et les coordonnées est un **signal de confiance**. La désindexer prive le site de ce
signal sans aucun bénéfice en retour.

**Correctif :** passer en `robots: { index: true, follow: true }`.

### 2.4 — La page 404 est celle de Next.js par défaut, en anglais

**Impact : Moyen (UX / crawl).** Une URL inexistante affiche
« **404: This page could not be found.** » — texte anglais générique sur un site francophone,
sans aucun lien de rattrapage vers les pages principales.

**Correctif :** créer `src/app/not-found.tsx` avec un message en français, le `PageBanner` du
site, et des liens vers `/`, `/soins`, `/rendez-vous`, `/contact`.

---

## 3. Performance

Mesures directes du 11 septembre 2026 (l'API PageSpeed Insights était en quota dépassé ;
chiffres relevés au `curl` sur les ressources réellement servies).

**TTFB : 0,50 s** — bon (Netlify, page pré-rendue). **Poids total de l'accueil : ≈ 1,56 Mo en desktop.**

| Ressource | Desktop (≥1920px) | Mobile (640px) |
|---|---|---|
| `arbres-soleil.jpg` — fond décoratif du hero | **863 Ko** | 92 Ko |
| `foret-lumiere-homme.jpg` — fond WarmCTA | 144 Ko | ~40 Ko |
| `vero-ouverture-nature.png` | 67 Ko | ~30 Ko |
| 3 polices Google (Baloo 2 + Nunito + Caveat) | 143 Ko | 143 Ko |
| JavaScript (9 chunks) | ~187 Ko | ~187 Ko |

### 3.1 — 863 Ko de fond décoratif chargé en priorité (desktop)

**Impact : Élevé sur desktop, faible sur mobile.** Dans `src/components/sections/Hero.tsx`,
l'image de fond est rendue à **14 % d'opacité** derrière un dégradé et une trame de points —
elle est à peine perceptible — mais elle est déclarée `priority`, donc préchargée en
concurrence directe avec le vrai élément LCP (l'illustration de Véronique). En `q=75` et
`sizes="100vw"`, un écran 1920px télécharge 863 Ko pour une texture invisible.

**Correctif** — trois lignes, dans `Hero.tsx` :

```tsx
<Image
  src={images.heroFond}
  alt=""
  fill
  className="object-cover opacity-[0.14]"
  quality={35}        // 75 → 35 : invisible à 14 % d'opacité
  sizes="100vw"
  // priority supprimé : à 14 % d'opacité, ce n'est jamais l'élément LCP
/>
```

Gain attendu : **de l'ordre de 700 Ko** sur desktop, sans différence visible. Appliquer la même
logique au fond de `WarmCTA`.

### 3.2 — Images sources surdimensionnées dans le dépôt

`public/images/` contient des fichiers hors normes : `soin-magnetisme-mains.jpg` (**20 Mo**),
`reiki-chakra-cristaux.jpg` (13 Mo), `mains-galaxie-lumiere.jpg` (9,6 Mo),
`soin-energie-seance.jpg` (8,6 Mo). Deux PNG de 3 Mo traînent aussi à la racine du projet
(`avatar-véro.png`, `véro-avatar.png`, non suivis par git).

Next.js les optimise à la volée, donc l'utilisateur final ne les reçoit pas telles quelles —
mais cela alourdit le dépôt, ralentit les builds, et la **première** requête sur une image
non encore mise en cache est lente (transformation à froid).

**Correctif :** ré-encoder les sources à 2560px de large max, en WebP, qualité 80.
Supprimer les deux PNG de la racine. `reiki-chakra-cristaux.jpg` et `mains-galaxie-lumiere.jpg`
ne sont d'ailleurs référencées **nulle part** dans le code (seulement dans `src/lib/blur.ts`) :
à supprimer.

### 3.3 — Trois familles de polices Google

143 Ko de `woff2` pour Baloo 2, Nunito et Caveat. C'est un parti pris graphique assumé et
`next/font` les auto-héberge correctement (pas de requête tierce). À surveiller seulement si
le budget performance se tend : Caveat n'est utilisée que pour quelques accents manuscrits.

---

## 4. Données structurées

Le balisage en place est correct et bien pensé (`@id` stables, nœuds reliés par référence,
`HealthAndBeautyBusiness` + `LocalBusiness`, `GeoCircle` de 15 km, SIRET en `identifier`).
Quatre manques :

### 4.1 — La fiche Google Business Profile n'est pas déclarée dans `sameAs`

**Impact : Élevé (référencement local).** `site.googleProfile` existe dans `content.ts` et sert
d'un lien dans `TestimonialsStrip`, mais **n'apparaît pas dans le `sameAs`** du `LocalBusiness`.
C'est précisément le lien qui aide Google à relier le site à la fiche — le cœur du pack local.

De plus, l'URL stockée est un lien de partage jetable
(`https://share.google/uVvgboCH6BQU7t7du`) qui se résout vers une URL de recherche Google
chargée de paramètres de session (`rlz`, `sca_esv`, `biw`, `bih`, horodatage). Ce n'est pas une
URL canonique stable.

**Correctif :** récupérer l'identifiant de lieu (le `kgmid` visible dans l'URL résolue est
`/g/11q4yzvyhn`) et utiliser un lien propre de type
`https://www.google.com/maps/place/?q=place_id:<PLACE_ID>`, puis :

```ts
// src/lib/seo.ts — localBusinessJsonLd()
sameAs: [site.social.facebook, site.social.instagram, site.googleProfile],
hasMap: site.googleProfile,
```

### 4.2 — Aucun horaire d'ouverture déclaré

**Impact : Moyen (référencement local).** Le `LocalBusiness` n'a pas d'`openingHoursSpecification`.
Les horaires de la fiche Google priment, mais la cohérence site ↔ fiche est un signal en soi.

```ts
openingHoursSpecification: [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    opens: "09:00",
    closes: "18:00",
  },
],
```
*(à ajuster aux horaires réels — ne jamais déclarer des horaires inexacts.)*

### 4.3 — Les avis balisés n'afficheront jamais d'étoiles

**Impact : Faible (attente à recalibrer).** `reviewsJsonLd()` publie 2 avis en `Review` sur
l'accueil. Depuis septembre 2019, Google **ignore les avis auto-hébergés** (« self-serving
reviews ») pour les types `LocalBusiness` et `Organization` : un avis collecté et publié par
l'entreprise sur son propre site n'est pas éligible aux résultats enrichis. Le balisage n'est
pas nocif, il est simplement sans effet sur les étoiles en SERP.

**Ce qui fonctionne à la place :** les avis **Google Business Profile**, qui s'affichent dans
le pack local et la Knowledge Panel. C'est le levier à travailler (voir §6).
Conserver le balisage actuel — il reste utile aux moteurs de réponse IA — mais ne pas en
attendre d'étoiles, et ne jamais ajouter d'`aggregateRating` inventé.

### 4.4 — `og:image` carrée avec une carte Twitter « large image »

**Impact : Faible.** `mains-energie-doree.webp` est déclarée en **1200 × 1200** (carré), alors
que `twitter:card` vaut `summary_large_image`, qui attend un ratio ~1.91:1. L'aperçu sera
rogné ou dégradé en petite carte. Facebook/WhatsApp gèrent le carré, X/Twitter et LinkedIn
préfèrent 1200 × 630.

**Correctif :** produire une variante 1200 × 630 dédiée au partage social.

---

## 5. On-page & contenu

### 5.1 — Ce qui est bon

Vérifié sur les 8 pages indexables :

- ✅ **Un seul `<h1>` par page**, tous descriptifs.
- ✅ **Titles uniques**, ville en début de chaîne, template `| Véronique Kaba` cohérent.
- ✅ **Méta-descriptions uniques**, avec prix et durée — bon taux de clic attendu.
- ✅ **Alt d'images renseignés et descriptifs** ; les fonds décoratifs ont bien `alt=""` +
  `aria-hidden` (pratique correcte, pas un oubli).
- ✅ **Maillage interne complet** : les 7 pages publiques sont liées depuis l'accueil.
- ✅ **URL propres**, en français, sans paramètre.
- ✅ **HTTPS + HSTS**, redirections `www` → apex et `http` → `https` en **301**.
- ✅ `/soins` est solide : 697 mots, hiérarchie `h1 → h2 → h3` propre, FAQ, `Service` +
  `FAQPage` + `BreadcrumbList` balisés.

### 5.2 — `/recouvrement-ame` : page trop mince

**Impact : Moyen.** 269 mots, **un `h1` et aucun `h2`**, aucun tarif affiché. Déjà signalé en
juin, non traité. La requête « recouvrement d'âme tambour » est peu concurrentielle : la page
peut gagner des positions avec un contenu réellement développé.

**Correctif** — viser 500–700 mots structurés en `h2` :
« Qu'est-ce que le recouvrement d'âme ? » · « À qui ce soin s'adresse-t-il ? » ·
« Le déroulé d'une séance au tambour » · « En présentiel ou à distance » · « Tarif et durée » ·
2–3 questions en FAQ (réutilisables via `faqPageJsonLd()`). Ajouter le `breadcrumbJsonLd()`,
absent de cette page.

### 5.3 — `/formation` : 314 mots pour une page commerciale

**Impact : Faible-Moyen.** La page vend une prestation à 70 € et porte un balisage `Course`,
mais reste courte. Étoffer : programme détaillé par module, prérequis (aucun),
public visé, ce qu'on sait faire à l'issue, format présentiel/distanciel, FAQ.

### 5.4 — `<meta name="keywords">` toujours émise

**Impact : Nul.** Balise ignorée par Google depuis ~2009. Sans effet négatif, mais elle expose
publiquement le ciblage. Supprimer `keywords` de `src/app/layout.tsx` (garder le tableau
`site.seoKeywords`, utile en interne).

### 5.5 — Incohérences mineures

- **Canonical de l'accueil** : `https://veronique-kaba.fr` (sans slash final) alors que le
  `sitemap.xml` déclare `https://veronique-kaba.fr/` (avec). Google normalise, mais autant
  aligner les deux.
- **`lastmod` du sitemap** : généré avec `new Date()` **au moment du build**, donc identique
  pour les 8 URL et figé au 9 juillet 2026. Un `lastmod` uniforme et périmé n'apporte aucune
  information à Google. Mieux vaut soit une date réelle par page, soit l'omettre.
- **FAQ** : depuis août 2023, Google réserve les résultats enrichis `FAQPage` aux sites
  d'autorité gouvernementale ou sanitaire. Le balisage reste utile (moteurs IA, AI Overviews),
  mais n'attendez pas de questions dépliables dans la SERP.

---

## 6. Ce qui reste ouvert depuis juin

Ces chantiers de l'audit précédent n'ont pas été traités et restent les plus rentables :

| Chantier | Impact | Effort |
|---|---|---|
| **Fiche Google Business Profile** — créer/optimiser, catégorie « Magnétiseur », zone 15 km, photos, horaires | **Le levier n°1 du local** | 1 h |
| **Stratégie d'avis Google** — solliciter chaque client satisfait | Élevé, continu | continu |
| **Page dédiée « Soin à distance / visio »** — cible « magnétiseur à distance », requête nationale | Élevé | ½ journée |
| **Page dédiée « Coupe de feu / brûlures / zona »** — forte intention, faible concurrence | Moyen-élevé | ½ journée |
| **Annuaires locaux** (Resalib, Doctoome, PagesJaunes, Annuaire-thérapeutes) avec NAP identique | Élevé | 1–2 h |
| **Blog, 4–6 articles piliers** — magnétisme & sport, stress/burn-out, enfants, zona | Élevé à terme | plusieurs jours |
| **Google Search Console** — à connecter et à y soumettre le sitemap | Indispensable (mesure) | 30 min |

> Le NAP (nom, adresse, téléphone) doit être **strictement identique** partout — site, fiche
> Google, annuaires. Il dépend donc du §1.2 : régler l'adresse e-mail **avant** de créer les
> citations, sinon il faudra toutes les reprendre.

---

## 7. Plan d'action ordonné

### Cette semaine — bloquants

1. Définir `NEXT_PUBLIC_CALENDLY_URL` sur Netlify + rendre le repli présentable · **10 min**
2. Créer `contact@veronique-kaba.fr` (MX + SPF/DKIM/DMARC), mettre à jour `site.email` et
   `CONTACT_EMAIL`, vérifier que le formulaire de contact délivre bien · **30 min**
3. `/philosophie` → `permanentRedirect` · **2 min**
4. `priority` retiré + `quality={35}` sur les fonds décoratifs · **15 min**
5. `googleProfile` ajouté au `sameAs` + `hasMap` du `LocalBusiness` · **20 min**

### Ce mois-ci —technique & confiance

6. `noindex` sur `/paiement/succes` et `/formation/espace/[moduleId]` · **10 min**
7. Mentions légales repassées en `index` · **2 min**
8. Page 404 personnalisée en français avec liens de rattrapage · **1 h**
9. `openingHoursSpecification` dans le `LocalBusiness` · **15 min**
10. Fiche Google Business Profile créée/optimisée + sollicitation d'avis · **1 h puis continu**
11. Google Search Console connectée, sitemap soumis · **30 min**
12. Images sources ré-encodées, fichiers orphelins supprimés · **1 h**
13. `og:image` 1200 × 630 pour le partage social · **30 min**

### Ce trimestre — contenu

14. `/recouvrement-ame` étoffée à 500–700 mots + FAQ + breadcrumb · **½ journée**
15. `/formation` étoffée · **½ journée**
16. Page « Soin à distance » dédiée · **½ journée**
17. Page « Coupe de feu / zona » dédiée · **½ journée**
18. Inscription aux annuaires locaux (NAP identique) · **1–2 h**
19. Blog : 4–6 articles piliers, 1–2 par mois · **continu**

---

## Note méthodologique

Audit conduit le 11 septembre 2026 sur le site **en production** et sur le code source
(commit `36f1045`, identique au build déployé). Méthode : exploration des 13 URL publiques
et privées (codes HTTP, `title`, `canonical`, `robots`, structure `Hn`, `alt`), extraction et
validation du JSON-LD servi, lecture de `robots.txt` et `sitemap.xml`, résolution DNS des deux
domaines, mesure du poids réel des ressources par largeur de `srcset`, et inspection des
en-têtes HTTP.

**Limites :** l'API PageSpeed Insights a renvoyé un quota dépassé — les chiffres de performance
sont des mesures directes de poids et de TTFB, non des scores Lighthouse ni des Core Web Vitals
terrain (ces derniers demandent de toute façon un volume de trafic que le site n'a
probablement pas encore). **Aucun volume de recherche ni position réelle** n'est disponible
sans Google Search Console — sa connexion reste la première action de mesure à mener.
