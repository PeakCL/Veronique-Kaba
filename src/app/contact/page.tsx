import type { Metadata } from "next";
import { site } from "@/lib/content";
import { Bubble } from "@/components/ui/Bubble";
import { ContactForm } from "@/components/contact/ContactForm";
import { Facebook, Instagram, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="px-4 py-12 md:px-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-center font-[family-name:var(--font-display)] text-5xl">Contact</h1>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
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
                  Véronique et l&apos;énergie dorée
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
