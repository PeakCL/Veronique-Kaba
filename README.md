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
| `NEXT_PUBLIC_SITE_URL` | URL du site (ex. `https://www.veronique-et-lenergie-doree.fr`) |
| `NEXT_PUBLIC_CALENDLY_URL` | Lien Calendly pour prise de RDV |
| `FORMATION_ACCESS_PASSWORD` | Mot de passe espace formation élèves |

## Pages

- **/** — Accueil
- **/soins** — Prestations, tarifs, paiement PayPal
- **/philosophie** — Approche & valeurs
- **/temoignages** — Retours clients
- **/formation** — Présentation + inscription
- **/formation/espace** — Contenu protégé (cookie)
- **/rendez-vous** — Calendly embed
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
