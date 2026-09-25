import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { site } from "@/lib/content";
import { Bubble } from "@/components/ui/Bubble";

export const metadata: Metadata = {
  title: "Mot de passe oublié",
  robots: { index: false, follow: false },
};

export default function MotDePasseOubliePage() {
  return (
    <div className="px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-md">
        <h1 className="text-center font-[family-name:var(--font-display)] text-4xl">
          Mot de passe oublié
        </h1>

        <Bubble variant="aura" tail="none" className="mt-8">
          <p className="leading-relaxed text-ink/80">
            Pas d&apos;inquiétude : contactez Véronique, elle vous redonne le mot de passe de
            votre formation.
          </p>
          <div className="mt-5 flex flex-col gap-3">
            <a
              href={site.phoneHref}
              className="flex items-center gap-2 font-semibold text-aura-700 hover:underline"
            >
              <Phone className="h-4 w-4" /> {site.phone}
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-2 font-semibold text-aura-700 hover:underline"
            >
              <Mail className="h-4 w-4" /> Formulaire de contact
            </Link>
          </div>
        </Bubble>

        <p className="mt-8 text-center text-sm">
          <Link href="/connexion" className="font-semibold text-aura-600 hover:underline">
            ← Retour à la connexion
          </Link>
        </p>
      </div>
    </div>
  );
}
