import { redirect } from "next/navigation";
import Link from "next/link";
import { User, Mail, GraduationCap, ArrowRight } from "lucide-react";
import { getFormationSession } from "@/lib/auth";
import { formations } from "@/lib/content";
import { Bubble } from "@/components/ui/Bubble";
import { LogoutButton } from "@/components/formation/LogoutButton";

export const metadata = {
  title: "Espace formation",
  robots: { index: false, follow: false },
};

export default async function FormationEspacePage() {
  const session = await getFormationSession();
  if (!session) redirect("/formation");

  const myLevels = formations.filter((f) => session.levels.includes(f.id));
  const fullName = [session.firstName, session.lastName].filter(Boolean).join(" ");

  return (
    <div className="px-4 py-12 md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-[family-name:var(--font-display)] text-4xl">Espace élève 🎓</h1>
          <LogoutButton />
        </div>

        {/* ── Résumé de l'élève ── */}
        <Bubble variant="aura" className="mt-8" tail="none">
          <p className="text-sm font-bold text-aura-700">Vos informations</p>
          <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-aura-600" />
              <dt className="sr-only">Nom</dt>
              <dd>{fullName || "—"}</dd>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-aura-600" />
              <dt className="sr-only">E-mail</dt>
              <dd className="break-all">{session.email}</dd>
            </div>
            <div className="flex items-center gap-2 sm:col-span-2">
              <GraduationCap className="h-4 w-4 text-aura-600" />
              <dt className="sr-only">Niveaux</dt>
              <dd>
                {myLevels.length > 0
                  ? myLevels.map((l) => l.title).join(" · ")
                  : "Aucun niveau débloqué"}
              </dd>
            </div>
          </dl>
        </Bubble>

        {/* ── Accès aux formations ── */}
        <div className="mt-8 space-y-6">
          {myLevels.map((level) => (
            <Bubble key={level.id} variant="gold" tail="bottom-left" animate={false}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold">
                    {level.emoji} {level.title}
                  </h2>
                  <p className="text-xs text-ink/60">{level.duration}</p>
                  <p className="mt-2 text-sm text-ink/75">{level.tagline}</p>
                </div>
                <Link
                  href={`/formation/espace/${level.id}`}
                  className="inline-flex shrink-0 items-center gap-1 rounded-full bg-aura-500 px-4 py-2 text-sm font-bold text-white comic-border hover:bg-aura-400"
                >
                  Accéder <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Bubble>
          ))}
        </div>

        {/* ── Débloquer l'autre niveau ── */}
        {myLevels.length < formations.length && (
          <p className="mt-8 text-sm text-ink/70">
            Vous avez le mot de passe d&apos;un autre niveau ?{" "}
            <Link href="/formation#inscription" className="font-semibold text-aura-600 underline">
              Ajoutez-le ici
            </Link>{" "}
            — il s&apos;ajoutera à votre espace.
          </p>
        )}
      </div>
    </div>
  );
}
