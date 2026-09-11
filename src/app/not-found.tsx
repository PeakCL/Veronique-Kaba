import type { Metadata } from "next";
import { Bubble } from "@/components/ui/Bubble";
import { ComicButton } from "@/components/ui/ComicButton";
import { VeroAvatar } from "@/components/ui/VeroAvatar";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

const liens = [
  { href: "/soins", label: "Les soins" },
  { href: "/recouvrement-ame", label: "Recouvrement d'âme" },
  { href: "/formation", label: "La formation" },
  { href: "/apropos", label: "À propos" },
];

export default function NotFound() {
  return (
    <div className="px-4 py-16 md:px-6">
      <div className="mx-auto grid max-w-4xl items-center gap-8 lg:grid-cols-[1fr_auto]">
        <Bubble variant="aura" tail="bottom-left">
          <p className="font-[family-name:var(--font-hand)] text-5xl text-aura-600">404</p>

          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl">
            Cette page s&apos;est envolée
          </h1>

          <p className="mt-4 leading-relaxed text-ink/75">
            L&apos;adresse demandée n&apos;existe pas ou plus. Rien de grave — voici par où
            reprendre&nbsp;:
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <ComicButton href="/">Retour à l&apos;accueil</ComicButton>
            <ComicButton href="/rendez-vous" variant="outline">
              Prendre rendez-vous
            </ComicButton>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {liens.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="font-bold text-aura-600 hover:underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm text-ink/60">
            Une question&nbsp;?{" "}
            <a href={site.phoneHref} className="font-bold text-aura-600 hover:underline">
              {site.phone}
            </a>{" "}
            ou{" "}
            <a href="/contact" className="font-bold text-aura-600 hover:underline">
              le formulaire de contact
            </a>
            .
          </p>
        </Bubble>

        <VeroAvatar pose="reflechit" size="md" className="hidden lg:flex" />
      </div>
    </div>
  );
}
