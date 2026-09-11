import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/content";
import { images } from "@/lib/images";
import { Bubble } from "@/components/ui/Bubble";
import { PageBanner } from "@/components/sections/PageBanner";
import { ContactForm } from "@/components/contact/ContactForm";
import { Facebook, Instagram, Mail, MapPin, Phone, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Magnétiseuse à Longwy",
  description:
    "Contactez Véronique, magnétiseuse et énergéticienne à Longwy. Séances en présentiel (15 km autour de Longwy) ou à distance en visio. Téléphone : 07 71 17 67 27.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="pb-12 pt-4 md:pt-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageBanner
        title="Contact"
        subtitle="Une question, une prise de rendez-vous ? Écrivez-moi avec bienveillance ✨"
        imageSrc={images.meditationPapillons}
        imageAlt="Nature et sérénité — contacter Véronique, magnétiseuse à Longwy"
      />

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <ContactForm />

          <div className="space-y-6">
            <Bubble variant="sky" tail="bottom-right">
              <h2 className="font-bold">Coordonnées</h2>
              <p className="mt-3 flex items-center gap-2">
                <Phone className="h-4 w-4 text-aura-600" />
                <a href={site.phoneHref} className="hover:underline">
                  {site.phone}
                </a>
              </p>
              <p className="mt-2 flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-green-600" />
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:underline"
                >
                  Écrire sur WhatsApp
                </a>
              </p>
              <p className="mt-2 flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-aura-600" />
                <a href={`mailto:${site.email}`} className="break-all hover:underline">
                  {site.email}
                </a>
              </p>
              <p className="mt-2 flex items-start gap-2 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-aura-600" />
                <span>{site.locationDetail}</span>
              </p>
              <p className="mt-2 text-xs text-ink/60">SIRET {site.siret}</p>
            </Bubble>

            <Bubble variant="aura" tail="bottom-left">
              <h2 className="font-bold">Réseaux sociaux</h2>
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-semibold hover:text-aura-700"
                >
                  <Facebook className="h-5 w-5" />
                  Véronique Kaba
                </a>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-semibold hover:text-aura-700"
                >
                  <Instagram className="h-5 w-5" />
                  @vero.kaba
                </a>
              </div>
            </Bubble>
          </div>
        </div>
      </div>
    </div>
  );
}
