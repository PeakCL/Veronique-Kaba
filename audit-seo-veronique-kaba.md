# Audit SEO — veronique-kaba.fr
**Véronique et l'énergie dorée · Magnétiseuse & énergéticienne (Longwy + à distance)**
Audit complet · 17 juin 2026

---

## Synthèse

Le site est propre, rapide (Next.js avec images optimisées) et bien structuré sur le plan éditorial : ton chaleureux, pages claires, parcours de réservation présent. La base est saine. Mais sur le plan SEO, le site ne « parle » presque pas aux moteurs de recherche : pas de données structurées, pas de sitemap détecté, et surtout une image de partage social cassée qui pointe vers une adresse de développement (`localhost`).

Le levier le plus important n'est pas sur le site lui-même : c'est le **référencement local**. Pour une magnétiseuse, 80 % de la visibilité utile vient des requêtes du type « magnétiseur Longwy », et celles-ci se gagnent surtout via une fiche Google Business Profile et des annuaires spécialisés (Resalib, Doctoome, PagesJaunes), où la concurrence locale est déjà présente.

**Top 3 des priorités :**
1. Corriger l'image Open Graph (`localhost:3000`) — visible et cassée à chaque partage Facebook/Instagram/WhatsApp.
2. Créer/optimiser la fiche **Google Business Profile** + s'inscrire sur 3-4 annuaires locaux.
3. Ajouter les **données structurées** (LocalBusiness + Person + Service + Review) et un sitemap.

**Évaluation globale : base solide, mais sous-optimisée.** Aucun problème critique de rankings, mais beaucoup d'opportunités faciles non exploitées.

---

## 1. Opportunités de mots-clés

Activité très locale + service à distance. Deux familles : **local** (intention forte, conversion élevée) et **thématique/longue traîne** (informationnel, attire en haut de funnel). Volumes estimés (pas d'outil de volume connecté — voir note en fin de rapport).

| Mot-clé | Difficulté | Opportunité | Position actuelle | Intention | Format recommandé |
|---|---|---|---|---|---|
| magnétiseur Longwy | Faible | **Élevée** | À vérifier | Locale / transactionnelle | Page d'accueil + GBP |
| magnétiseuse Longwy | Faible | **Élevée** | À vérifier | Locale | Accueil |
| soin énergétique Longwy | Faible | **Élevée** | À vérifier | Locale | Page Soins |
| coupeur / coupeuse de feu Longwy | Faible | **Élevée** | À vérifier | Locale | Page dédiée coupe de feu |
| magnétiseur à distance | Moyenne | **Élevée** | À vérifier | Transactionnelle | Page « Soin à distance » dédiée |
| magnétiseur Meurthe-et-Moselle (54) | Moyenne | Moyenne | À vérifier | Locale | Accueil + annuaires |
| énergéticien Longwy | Faible | Moyenne | À vérifier | Locale | Accueil / Soins |
| magnétiseur brûlure / zona | Moyenne | **Élevée** | — | Informationnelle | Article / page coupe de feu |
| magnétiseur pour sportifs | Faible | Moyenne | — | Commerciale | Page ou article dédié |
| magnétiseur douleurs articulaires | Moyenne | Moyenne | — | Informationnelle | Article de blog |
| magnétiseur stress / burn-out | Moyenne | Moyenne | — | Informationnelle | Article de blog |
| magnétiseur enfant | Faible | Moyenne | — | Commerciale | Section/page dédiée |
| recouvrement d'âme tambour | Faible | Moyenne | À vérifier | Informationnelle | Page existante (à étoffer) |
| formation magnétisme à distance | Moyenne | Moyenne | À vérifier | Commerciale | Page Formation |
| qu'est-ce que le magnétisme | Élevée | Faible | — | Informationnelle | Article pilier |
| magnétiseur névralgie / sciatique | Moyenne | Moyenne | — | Informationnelle | Article |
| barreur de feu à distance | Moyenne | Moyenne | — | Transactionnelle | Page coupe de feu |
| soin énergétique fatigue / vitalité | Moyenne | Faible | — | Informationnelle | Article |
| magnétiseur avis | Faible | Moyenne | À vérifier | Navigationnelle | Page Témoignages + GBP |
| magnétiseur Mont-Saint-Martin / Longwy-Haut | Faible | Moyenne | — | Locale | Mentions sur Accueil/Contact |

**Logique :** d'abord verrouiller le local (peu concurrentiel, fort taux de conversion), puis capter la longue traîne informationnelle via un blog — c'est ce qui manque totalement aujourd'hui.

---

## 2. Audit on-page

| Page | Problème | Sévérité | Correctif recommandé |
|---|---|---|---|
| **Toutes** | `og:image` pointe vers `http://localhost:3000/images/mains-orbe-energie.png` — image de partage cassée | **Critique** | Remplacer par une URL absolue de production (`https://veronique-kaba.fr/images/...`) |
| **Toutes** | `og:title` et `og:description` identiques sur toutes les pages (génériques) | Moyenne | Rendre l'OG title/description spécifiques à chaque page |
| Accueil | H1 « Magnétiseuse & énergéticienne — apaiser corps & esprit » ne contient pas « Longwy » | Élevée | Intégrer la ville : ex. « Magnétiseuse à Longwy & à distance — apaiser corps & esprit » |
| Accueil | Image hero sans attribut `alt` (`![]`) | Moyenne | Ajouter un alt descriptif (« Méditation et énergie — magnétiseuse à Longwy ») |
| Accueil | Title ne met pas « Longwy » en avant tôt | Moyenne | Ex. « Magnétiseuse à Longwy — Magnétisme & soins énergétiques » |
| Soins | Page riche et bien rédigée, mais titres de section non optimisés (« Magnétisme », « Soin énergétique ») | Faible | Étoffer en H2 longue traîne : « Magnétisme à Longwy : pour quelles douleurs ? » |
| Recouvrement d'âme | Contenu mince (~150 mots), tarif absent | Moyenne | Étoffer à 400+ mots (déroulé, pour qui, FAQ), indiquer une fourchette de prix |
| Témoignages | Avis non balisés (pas de schema Review), pas de source vérifiable | Moyenne | Ajouter schema Review + idéalement lien vers avis Google/Resalib |
| Contact | Pas d'adresse ni de zone précise au-delà de « 15 km » ; pas de carte | Moyenne | Ajouter ville/secteur, lien GBP, éventuellement carte |
| Toutes | `meta-keywords` présent (balise ignorée par Google depuis ~2009) | Faible | Supprimer (sans impact, mais inutile) |
| Toutes | Aucune page Mentions légales / politique de confidentialité détectée | Moyenne | Ajouter (obligation légale FR + signal de confiance E-E-A-T) |

**Points positifs :** un seul H1 par page, titles uniques et lisibles, méta-descriptions présentes et bien rédigées, URL propres et courtes (`/soins`, `/formation`…), maillage interne cohérent, images en WebP optimisées.

---

## 3. Lacunes de contenu

Le site ne contient **aucun contenu informationnel** (pas de blog). C'est la plus grosse opportunité de croissance organique sur la longue traîne.

**Page « Soin à distance / en visio » dédiée** — *Priorité haute · effort modéré.* La requête « magnétiseur à distance » est recherchée nationalement et lève un frein majeur. Aujourd'hui c'est juste mentionné, jamais développé. Format : page de service.

**Page « Coupe de feu / brûlures / zona »** — *Priorité haute · effort modéré.* « Coupeur de feu » + « zona » + « brûlure » sont des requêtes à forte intention, peu concurrentielles localement. Aujourd'hui réduit à un paragraphe sur /soins. Format : page dédiée.

**Blog — 4 à 6 articles piliers** — *Priorité moyenne · effort substantiel.* Sujets : « Le magnétisme, comment ça marche ? », « Magnétisme et sport : récupérer après une blessure », « Soulager le stress et le burn-out par l'énergie », « Magnétisme pour les enfants : ce qu'il faut savoir », « Zona et brûlures : que peut faire un coupeur de feu ? ». Capte l'informationnel et nourrit le maillage interne. Format : articles de blog.

**FAQ structurée** — *Priorité moyenne · gain rapide (1-2 h).* Questions réelles (« Combien de séances ? », « Est-ce remboursé ? », « Le soin à distance fonctionne-t-il ? », « Contre-indications ? »). Éligible au schema FAQ → extraits enrichis dans Google. Format : section sur Accueil ou page Soins.

**Page « Pour qui ? / Indications »** — *Priorité moyenne · effort modéré.* Regrouper sportifs, enfants, seniors, stress, douleurs — chaque public est une porte d'entrée de recherche.

---

## 4. Checklist SEO technique

| Vérification | Statut | Détail |
|---|---|---|
| HTTPS | ✅ Pass | Site servi en HTTPS |
| Mobile / responsive | ✅ Pass | `viewport` correct, framework moderne |
| Vitesse de chargement | ✅ Pass | Next.js + images WebP optimisées (`/_next/image`) |
| Balises title uniques | ✅ Pass | Chaque page a un title distinct |
| Méta-descriptions | ✅ Pass | Présentes et pertinentes |
| URL propres | ✅ Pass | Courtes, lisibles, sans paramètres |
| `og:image` | ❌ Fail | Pointe vers `localhost:3000` — cassée |
| Données structurées (Schema.org) | ❌ Fail | Aucune (ni LocalBusiness, ni Person, ni Service, ni Review, ni FAQ) |
| sitemap.xml | ⚠️ Avertissement | Aucun contenu servi à `/sitemap.xml` — à confirmer et créer |
| robots.txt | ⚠️ Avertissement | Aucun contenu servi à `/robots.txt` — à créer (avec lien vers sitemap) |
| Domaine dupliqué | ⚠️ Avertissement | `veronique-et-lenergie-doree.fr` apparaît dans les résultats — risque de contenu dupliqué / autorité diluée |
| OG spécifiques par page | ⚠️ Avertissement | OG title/description génériques partout |
| Mentions légales | ⚠️ Avertissement | Page non détectée (obligation FR + E-E-A-T) |
| Google Business Profile | ⚠️ À vérifier | Pilier du référencement local — à créer/optimiser |

---

## 5. Comparaison concurrentielle (local)

Concurrence locale principalement via **annuaires** plutôt que sites propres : Resalib, Doctoome, PagesJaunes, NosAvis, Annuaire-thérapeutes captent l'essentiel des requêtes « magnétiseur Longwy ». C'est une bonne nouvelle : un site propre bien optimisé + une fiche GBP peuvent rapidement dépasser ces annuaires sur le nom de la ville.

| Dimension | veronique-kaba.fr | Annuaires (Resalib, Doctoome…) | Concurrents avec site propre | Avantage |
|---|---|---|---|---|
| Qualité / design du site | Élevée | Faible (pages génériques) | Variable | **Vous** |
| Données structurées | Aucune | Fortes (rich snippets, avis) | Faibles | Annuaires |
| Présence annuaires / citations | Faible | — | Moyenne | Annuaires |
| Avis visibles (Google/Resalib) | Aucun public | Nombreux | Variable | Annuaires |
| Profondeur de contenu | Moyenne | Faible | Faible | **Vous** |
| Référencement local (GBP) | À créer | N/A | Variable | À gagner |
| Spécialisation affichée (coupe de feu, sport, distance) | Bonne | Faible | Faible | **Vous** |

**Lecture :** votre atout est la qualité éditoriale et la spécialisation. Votre retard se rattrape vite : citations locales + avis + données structurées.

---

## 6. Plan d'action priorisé

### Gains rapides (cette semaine)

**1. Corriger l'image Open Graph** — *Impact élevé · 15 min.*
Remplacer `http://localhost:3000/images/mains-orbe-energie.png` par `https://veronique-kaba.fr/images/mains-orbe-energie.png` (ou autre image de prod) dans la config. À chaque partage social aujourd'hui, l'aperçu est cassé.

**2. Créer / réclamer la fiche Google Business Profile** — *Impact élevé · 1 h.*
Catégorie « Praticien de médecine douce / Magnétiseur », zone de service « 15 km autour de Longwy », téléphone, lien site, photos. C'est LE levier n°1 pour « magnétiseur Longwy ».

**3. Intégrer « Longwy » dans le H1 et le title de l'accueil** — *Impact élevé · 20 min.*
Ex. title « Magnétiseuse à Longwy — Magnétisme & soins énergétiques » ; H1 « Magnétiseuse & énergéticienne à Longwy ».

**4. Ajouter l'attribut alt manquant sur l'image hero** — *Impact faible · 5 min.*

**5. Créer robots.txt + sitemap.xml** — *Impact moyen · 30 min (auto avec Next.js).*
`next-sitemap` ou la route `app/sitemap.ts` génèrent les deux. À soumettre ensuite dans Google Search Console.

**6. Inscription sur 3-4 annuaires locaux** — *Impact élevé · 1-2 h.*
Resalib, Doctoome, PagesJaunes, Annuaire-thérapeutes. NAP (nom, téléphone, zone) strictement identique partout.

**7. Vérifier le domaine `veronique-et-lenergie-doree.fr`** — *Impact moyen · 30 min.*
S'il vous appartient et fait doublon, mettre une redirection 301 vers veronique-kaba.fr. Sinon, vérifier qu'il ne s'agit pas d'un ancien site à récupérer/fermer.

### Investissements stratégiques (ce trimestre)

**8. Données structurées Schema.org** — *Impact élevé · ½ journée.*
`LocalBusiness` (nom, zone, tél, horaires, géo), `Person` (Véronique), `Service` (par soin), `Review`/`AggregateRating` (avis réels uniquement), `FAQPage`. Éligibilité aux extraits enrichis (étoiles, FAQ) dans Google.

**9. Page « Soin à distance / visio » dédiée** — *Impact élevé · ½ journée.*
Cible « magnétiseur à distance », lève le frein principal, détachée du local.

**10. Page « Coupe de feu / brûlures / zona »** — *Impact moyen-élevé · ½ journée.*
Requêtes à forte intention, faible concurrence locale.

**11. Lancer un blog (4-6 articles piliers)** — *Impact élevé à terme · plusieurs jours.*
Magnétisme & sport, stress/burn-out, enfants, zona/brûlures, « comment ça marche ». Publier 1-2/mois. Dépend de la création de la structure blog.

**12. Section FAQ + schema FAQ** — *Impact moyen · 2-3 h.*

**13. Stratégie d'avis** — *Impact élevé · continu.*
Inviter chaque client satisfait à laisser un avis Google/Resalib. Les avis nourrissent le local ET la confiance. Ne jamais inventer d'avis.

**14. Mentions légales + politique de confidentialité** — *Impact moyen · 1-2 h.*
Obligation légale FR et signal E-E-A-T (santé/bien-être = secteur « YMYL » scruté par Google).

---

## Note méthodologique

Cet audit repose sur l'analyse directe des 7 pages publiques du site, l'inspection des balises (title, meta, Open Graph, alt, structure Hn), la recherche du paysage concurrentiel local, et la tentative d'accès à `robots.txt`/`sitemap.xml`. Les **volumes de recherche et positions exactes sont estimés** : pour des données chiffrées précises, connecter un outil SEO (Ahrefs, Semrush) et **Google Search Console** (gratuit, à installer en priorité — il donnera les vraies requêtes, positions et clics du site).

---

### Sources
- [Resalib — magnétiseurs à Longwy](https://www.resalib.fr/recherche/magnetiseur/longwy)
- [Doctoome — magnétiseur Longwy 54400](https://www.doctoome.com/s/magnetiseur/longwy-54400)
- [PagesJaunes — magnétiseur Meurthe-et-Moselle](https://www.pagesjaunes.fr/annuaire/departement/meurthe-et-moselle-54/magnetiseur)
- [NosAvis — magnétiseur Longwy](https://magnetiseurs.nosavis.com/magnetiseur/meurthe+et+moselle-54/longwy-54400/)
- [Annuaire-thérapeutes — magnétisme Meurthe-et-Moselle](https://www.annuaire-therapeutes.com/therapeutes/36-magnetisme/54-meurthe-et-moselle)
