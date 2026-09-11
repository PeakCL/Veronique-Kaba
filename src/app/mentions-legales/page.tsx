import type { Metadata } from "next";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site de Véronique Kaba — magnétiseuse et énergéticienne à Longwy.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <div className="px-4 py-12 md:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-[family-name:var(--font-display)] text-4xl">Mentions légales</h1>

        <div className="mt-8 space-y-8 text-ink/80">
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-ink">Éditeur du site</h2>
            <p className="mt-3 text-sm leading-relaxed">
              {site.name} — {site.profession}
              <br />
              SIRET : {site.siret}
              <br />
              Téléphone : {site.phone}
              <br />
              E-mail :{" "}
              <a href={`mailto:${site.email}`} className="hover:underline">
                {site.email}
              </a>
              <br />
              {site.locationDetail}
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-ink">Hébergement</h2>
            <p className="mt-3 text-sm leading-relaxed">
              {/* À compléter avec votre hébergeur réel (ex. Vercel, OVH, o2switch…) */}
              Site hébergé par : <span className="italic">à compléter (nom, adresse de l&apos;hébergeur)</span>.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-ink">Propriété intellectuelle</h2>
            <p className="mt-3 text-sm leading-relaxed">
              L&apos;ensemble des contenus de ce site (textes, images, identité visuelle) est protégé.
              Toute reproduction, même partielle, est interdite sans autorisation préalable.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-ink">Données personnelles</h2>
            <p className="mt-3 text-sm leading-relaxed">
              Les informations transmises via le formulaire de contact sont utilisées uniquement pour
              répondre à votre demande et ne sont jamais cédées à des tiers. Conformément au RGPD, vous
              disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données : il
              vous suffit d&apos;en faire la demande par téléphone ou e-mail.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-ink">Avertissement santé</h2>
            <p className="mt-3 text-sm leading-relaxed">
              Les soins énergétiques et le magnétisme proposés sont des pratiques de bien-être
              complémentaires. Ils ne remplacent en aucun cas un avis, un diagnostic ou un traitement
              médical, et n&apos;ont pas vocation à se substituer à la médecine conventionnelle.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
