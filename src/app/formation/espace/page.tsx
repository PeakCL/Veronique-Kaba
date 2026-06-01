import { redirect } from "next/navigation";
import Link from "next/link";
import { hasFormationAccess } from "@/lib/auth";
import { formationModules } from "@/lib/content";
import { Bubble } from "@/components/ui/Bubble";
import { LogoutButton } from "@/components/formation/LogoutButton";

export const metadata = {
  title: "Espace formation",
  robots: { index: false, follow: false },
};

export default async function FormationEspacePage() {
  const access = await hasFormationAccess();
  if (!access) redirect("/formation");

  return (
    <div className="px-4 py-12 md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h1 className="font-[family-name:var(--font-display)] text-4xl">
            Espace élève 🎓
          </h1>
          <LogoutButton />
        </div>

        <Bubble variant="aura" className="mt-8" tail="none">
          <p className="text-sm">
            Bienvenue dans votre bulle de formation. Les chapitres se débloquent au fur et à
            mesure — le chapitre 1 est disponible dès maintenant.
          </p>
        </Bubble>

        <div className="mt-8 space-y-6">
          {formationModules.map((m) => (
            <Bubble
              key={m.id}
              variant={m.locked ? "white" : "gold"}
              tail="bottom-left"
              animate={false}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-bold text-lg">{m.title}</h2>
                  <p className="text-xs text-ink/60">{m.duration}</p>
                  <p className="mt-2 text-sm text-ink/75">{m.summary}</p>
                </div>
                {m.locked ? (
                  <span className="shrink-0 rounded-full bg-ink/10 px-3 py-1 text-xs font-bold">
                    🔒 Bientôt
                  </span>
                ) : (
                  <Link
                    href={`/formation/espace/${m.id}`}
                    className="shrink-0 rounded-full bg-gold-400 px-4 py-2 text-sm font-bold comic-border hover:bg-gold-300"
                  >
                    Commencer →
                  </Link>
                )}
              </div>
            </Bubble>
          ))}
        </div>
      </div>
    </div>
  );
}
