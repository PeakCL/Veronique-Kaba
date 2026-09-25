import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getStudent, safeNext } from "@/lib/auth";
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
  if (await getStudent()) redirect(safeNext(next));

  return (
    <div className="px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-md">
        <h1 className="text-center font-[family-name:var(--font-display)] text-4xl">
          Mon espace élève 🎓
        </h1>
        <p className="mt-3 text-center text-ink/70">
          Connectez-vous avec l&apos;e-mail et le mot de passe transmis par Véronique lors de
          votre inscription.
        </p>

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
