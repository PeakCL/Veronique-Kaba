import type { Metadata } from "next";
import Link from "next/link";
import { getFormationSession } from "@/lib/auth";
import { LoginForm } from "@/components/formation/LoginForm";

export const metadata: Metadata = {
  title: "Mon espace élève — connexion",
  robots: { index: false, follow: false },
};

export default async function ConnexionPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  // Déjà connecté·e : on affiche quand même le formulaire, pour pouvoir
  // ajouter le mot de passe d'un autre niveau.
  const session = await getFormationSession();

  return (
    <div className="px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-md">
        <h1 className="text-center font-[family-name:var(--font-display)] text-4xl">
          Mon espace élève 🎓
        </h1>
        <p className="mt-3 text-center text-ink/70">
          Entrez le mot de passe de votre formation, transmis par Véronique lors de votre
          inscription.
        </p>

        {session && (
          <p className="mt-6 rounded-xl bg-aura-50 px-4 py-3 text-center text-sm comic-border">
            Vous êtes déjà connecté·e.{" "}
            <Link href="/formation/espace" className="font-semibold text-aura-700 underline">
              Aller à mon espace
            </Link>
            , ou saisissez ci-dessous le mot de passe d&apos;un autre niveau.
          </p>
        )}

        <div className="mt-8">
          <LoginForm next={next} />
        </div>

        <p className="mt-8 text-center text-sm text-ink/70">
          Pas encore inscrit·e ?{" "}
          <Link href="/formation" className="font-semibold text-aura-600 hover:underline">
            Découvrir les formations
          </Link>
        </p>
      </div>
    </div>
  );
}
