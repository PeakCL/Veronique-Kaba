import { redirect } from "next/navigation";
import Link from "next/link";
import { User, Mail, GraduationCap, ArrowRight, KeyRound, Settings } from "lucide-react";
import { requireStudent } from "@/lib/auth";
import { formations } from "@/lib/content";
import { Bubble } from "@/components/ui/Bubble";
import { LogoutButton } from "@/components/formation/LogoutButton";

export const metadata = {
  title: "Mon espace élève",
  robots: { index: false, follow: false },
};

export default async function FormationEspacePage({
  searchParams,
}: {
  searchParams: Promise<{ motdepasse?: string }>;
}) {
  const student = await requireStudent();
  if (student.mustChangePassword) redirect("/formation/espace/mot-de-passe");
  const { motdepasse } = await searchParams;

  // L'admin voit tous les niveaux (prévisualisation).
  const myLevels = formations.filter((f) => student.isAdmin || student.levels.includes(f.id));
  const fullName = [student.firstName, student.lastName].filter(Boolean).join(" ");

  return (
    <div className="px-4 py-12 md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-[family-name:var(--font-display)] text-4xl">
            {student.firstName ? `Bonjour ${student.firstName} 🎓` : "Mon espace élève 🎓"}
          </h1>
          <LogoutButton />
        </div>

        {motdepasse === "ok" && (
          <p role="status" className="mt-6 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-800 comic-border">
            Votre mot de passe a bien été enregistré.
          </p>
        )}

        {student.isAdmin && (
          <Link
            href="/formation/admin"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold-100 px-4 py-2 text-sm font-bold comic-border hover:bg-gold-200"
          >
            <Settings className="h-4 w-4" /> Gérer les élèves
          </Link>
        )}

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
              <dd className="break-all">{student.email}</dd>
            </div>
            <div className="flex items-center gap-2 sm:col-span-2">
              <GraduationCap className="h-4 w-4 text-aura-600" />
              <dt className="sr-only">Niveaux</dt>
              <dd>
                {myLevels.length > 0
                  ? myLevels.map((l) => l.title).join(" · ")
                  : "Aucun niveau débloqué pour le moment"}
              </dd>
            </div>
          </dl>
          <Link
            href="/formation/espace/mot-de-passe"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-aura-600 hover:underline"
          >
            <KeyRound className="h-4 w-4" /> Changer mon mot de passe
          </Link>
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

        {myLevels.length < formations.length && (
          <p className="mt-8 text-sm text-ink/70">
            Envie de continuer avec un autre niveau ?{" "}
            <Link href="/formation" className="font-semibold text-aura-600 underline">
              Voir les formations
            </Link>{" "}
            — une fois inscrit·e, Véronique l&apos;ajoute directement à votre espace.
          </p>
        )}
      </div>
    </div>
  );
}
