import Link from "next/link";
import { requireStudent } from "@/lib/auth";
import { ChangePasswordForm } from "@/components/formation/ChangePasswordForm";

export const metadata = {
  title: "Changer mon mot de passe",
  robots: { index: false, follow: false },
};

export default async function MotDePassePage() {
  const student = await requireStudent("/formation/espace/mot-de-passe");

  return (
    <div className="px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-md">
        {!student.mustChangePassword && (
          <Link href="/formation/espace" className="text-sm font-bold text-aura-600 hover:underline">
            ← Retour à mon espace
          </Link>
        )}
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl">
          {student.mustChangePassword ? "Bienvenue ! 🌟" : "Changer mon mot de passe"}
        </h1>
        {student.mustChangePassword && (
          <p className="mt-3 text-ink/70">
            Pour votre première connexion, choisissez votre propre mot de passe à la place du
            mot de passe provisoire.
          </p>
        )}
        <div className="mt-8">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
