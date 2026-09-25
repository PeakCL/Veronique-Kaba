import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { requireSession } from "@/lib/auth";
import { formations } from "@/lib/content";
import { Bubble } from "@/components/ui/Bubble";
import { LogoutButton } from "@/components/formation/LogoutButton";

export const metadata = {
  title: "Mon espace élève",
  robots: { index: false, follow: false },
};

export default async function FormationEspacePage() {
  const session = await requireSession();
  const myLevels = formations.filter((f) => session.levels.includes(f.id));

  return (
    <div className="px-4 py-12 md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-[family-name:var(--font-display)] text-4xl">
            {session.firstName ? `Bonjour ${session.firstName} 🎓` : "Mon espace élève 🎓"}
          </h1>
          <LogoutButton />
        </div>
        {session.isAdmin && (
          <p className="mt-3 text-sm text-ink/60">Accès admin : tous les niveaux sont ouverts.</p>
        )}

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
                  Voir les vidéos <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Bubble>
          ))}
        </div>

        {/* ── Débloquer l'autre niveau ── */}
        {myLevels.length < formations.length && (
          <p className="mt-8 text-sm text-ink/70">
            Vous avez le mot de passe d&apos;un autre niveau ?{" "}
            <Link href="/connexion" className="font-semibold text-aura-600 underline">
              Saisissez-le ici
            </Link>{" "}
            : il s&apos;ajoutera à votre espace.
          </p>
        )}
      </div>
    </div>
  );
}
