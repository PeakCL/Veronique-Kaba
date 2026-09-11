import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { sessionInfo, site } from "@/lib/content";
import { Bubble } from "@/components/ui/Bubble";
import { ComicButton } from "@/components/ui/ComicButton";
import { CalendlyEmbed } from "@/components/booking/CalendlyEmbed";

export const metadata: Metadata = {
  title: "Prendre rendez-vous — Soin de magnétisme à Longwy ou en visio",
  description:
    "Réservez votre séance de magnétisme ou de soin énergétique avec Véronique, en présentiel à Longwy ou à distance en visio. Séance de 40 min, 60 €.",
  alternates: { canonical: "/rendez-vous" },
};

export default function RendezVousPage() {
  return (
    <div className="px-4 py-12 md:px-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Prendre rendez-vous", path: "/rendez-vous" },
        ])}
      />
      <div className="mx-auto max-w-4xl">
        <Bubble variant="aura" className="text-center mb-10" tail="none">
          <h1 className="font-[family-name:var(--font-display)] text-5xl">
            Prendre rendez-vous
          </h1>
          <p className="mt-3 text-ink/70">
            Séance de soin · {sessionInfo.duration} · {sessionInfo.price} € — présentiel (15 km
            autour de Longwy) ou visio
          </p>
          <p className="mt-2 text-sm text-ink/60">
            Pour la formation ou le recouvrement d&apos;âme, un échange préalable est prévu.
          </p>
        </Bubble>

        <CalendlyEmbed />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Bubble variant="white" tail="bottom-left">
            <h2 className="font-bold text-lg">Par téléphone</h2>
            <a
              href={site.phoneHref}
              className="mt-2 block font-[family-name:var(--font-display)] text-3xl text-aura-600 hover:underline"
            >
              {site.phone}
            </a>
          </Bubble>
          <Bubble variant="aura" tail="bottom-right">
            <h2 className="font-bold text-lg">Par message</h2>
            <p className="mt-2 text-sm text-ink/70">
              Formulaire de contact pour toute question avant réservation.
            </p>
            <ComicButton href="/contact" className="mt-4" variant="outline">
              Formulaire contact
            </ComicButton>
          </Bubble>
        </div>
      </div>
    </div>
  );
}
