# Véronique et l'énergie dorée

Site moderne style BD / bulles pour magnétisme et soins énergétiques (Longwy).

## Démarrage

```bash
npm install
cp .env.example .env.local
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Configuration

| Variable | Description |
|----------|-------------|
| `PAYPAL_MODE` | `sandbox` (test) ou `live` (production) |
| `PAYPAL_CLIENT_ID` | Client ID PayPal (serveur) |
| `PAYPAL_CLIENT_SECRET` | Secret PayPal (serveur uniquement) |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | Client ID public (boutons PayPal) |
| `NEXT_PUBLIC_SITE_URL` | URL du site (prod : `https://veronique-kaba.fr`) |
| `FORMATION_N1_PASSWORD` | Mot de passe commun des élèves du Niveau 1 |
| `FORMATION_N2_PASSWORD` | Mot de passe commun des élèves du Niveau 2 |
| `FORMATION_ADMIN_PASSWORD` | Mot de passe admin : ouvre tous les niveaux |

## Espace élèves

- Les élèves se connectent sur `/connexion` (bouton « Mon espace » dans
  l'en-tête) avec leur prénom et le mot de passe de leur niveau.
- Le niveau est reconnu d'après le mot de passe ; saisir le second mot de passe
  ajoute le Niveau 2 à l'espace.
- La session est un cookie signé (HMAC) dont la clé dérive des mots de passe :
  changer un mot de passe dans Netlify déconnecte tout le monde.
- En production, un niveau sans variable définie est fermé (pas de mot de passe
  par défaut).

## Formulaire de contact — Netlify Forms

Le formulaire `/contact` passe par **Netlify Forms**. Aucune variable
d'environnement, aucun service tiers, aucune boîte mail sur le domaine.

Le robot de build de Netlify détecte les formulaires en analysant le HTML
statique. Les pages Next.js étant rendues par le runtime Next, la structure du
formulaire est déclarée dans `public/__forms.html` (servi tel quel), et
`ContactForm.tsx` y envoie la soumission avec le champ `form-name=contact`.

**Si vous modifiez les champs du formulaire, modifiez les deux fichiers** — les
`name` doivent correspondre, sinon Netlify rejette la soumission.

Deux formulaires sont déclarés : **`contact`** (page Contact) et
**`rendez-vous`** (page Prendre rendez-vous).

Relever les messages : **Netlify > Forms**.
Être notifiée : **Netlify > Forms > Form notifications > Add notification >
Email notification**, vers `Eyaelle54350@gmail.com`.

Protection anti-spam : pot de miel sur le champ `website`
(`data-netlify-honeypot`). Pour ajouter reCAPTCHA, voir la doc Netlify.

> **En local, le formulaire échoue — c'est normal.** Netlify Forms n'existe que
> sur un site déployé : `npm run dev` et `npm run start` renvoient un 405 sur le
> POST, et le formulaire affiche son message d'erreur. Pour tester réellement,
> il faut un déploiement Netlify (une preview de branche suffit).

## Pages

- **/** — Accueil
- **/soins** — Prestations, tarifs, paiement PayPal
- **/philosophie** — redirection 308 vers `/apropos`
- **/temoignages** — redirection 308 vers `/#temoignages`
- **/formation** — Présentation + inscription
- **/formation/espace** — Contenu protégé (cookie)
- **/rendez-vous** — demande de RDV (téléphone, WhatsApp, formulaire Netlify)
- **/contact** — Formulaire + réseaux

## Paiement PayPal

1. Créer un compte [PayPal Developer](https://developer.paypal.com/dashboard/)
2. Créer une app REST API (Sandbox pour les tests)
3. Copier **Client ID** et **Secret** dans `.env.local`
4. Mettre le même Client ID dans `NEXT_PUBLIC_PAYPAL_CLIENT_ID`

Sans configuration, un bouton d'appel téléphonique s'affiche à la place.

Les boutons PayPal officiels apparaissent sur `/soins` et `/formation` (50 € / 70 €) :

- **PayPal** — paiement avec compte PayPal
- **Carte bancaire** — Visa, Mastercard, CB sans créer de compte PayPal

### Activer les paiements par carte

Dans le [dashboard PayPal Business](https://www.paypal.com/businessmanage/account/home) de Véronique :

1. Vérifier que le compte est **Business** (pas Personnel)
2. Activer **Paiements par carte** / *Advanced Credit and Debit Card Payments*
3. En sandbox : l’option est généralement active par défaut sur les comptes test

Si le bouton carte n’apparaît pas, c’est souvent un paramètre manquant côté compte marchand PayPal.

## Espace formation

Mot de passe par défaut (dev) : `energie-doree-2026` — à changer en production.

Après paiement formation, rediriger les élèves vers `/formation/espace` avec le mot de passe communiqué par e-mail.

## Déploiement

Recommandé : [Vercel](https://vercel.com) + variables d'environnement + domaine existant.
