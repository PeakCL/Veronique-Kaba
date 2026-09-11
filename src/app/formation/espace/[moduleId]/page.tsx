import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { hasFormationAccess } from "@/lib/auth";
import { formationModules } from "@/lib/content";
import { Bubble } from "@/components/ui/Bubble";

export const metadata = {
  title: "Module de formation",
  robots: { index: false, follow: false },
};

export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const access = await hasFormationAccess();
  if (!access) redirect("/formation");

  const { moduleId } = await params;
  const formationModule = formationModules.find((m) => m.id === moduleId);
  if (!formationModule || formationModule.locked) notFound();

  return (
    <div className="px-4 py-12 md:px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/formation/espace"
          className="text-sm font-bold text-aura-600 hover:underline"
        >
          ← Retour à l&apos;espace
        </Link>

        <Bubble variant="gold" className="mt-6" tail="none">
          <h1 className="font-[family-name:var(--font-display)] text-3xl">{formationModule.title}</h1>
          <p className="mt-2 text-sm text-ink/60">{formationModule.duration}</p>

          <div className="mt-8 aspect-video rounded-2xl bg-ink/5 flex items-center justify-center comic-border">
            <div className="text-center p-8">
              <p className="text-5xl">🎬</p>
              <p className="mt-4 font-bold">Vidéo de formation</p>
              <p className="mt-2 text-sm text-ink/60 max-w-sm">
                Intégrez ici vos vidéos (Vimeo, YouTube privé, ou hébergement direct).
                Ce placeholder sera remplacé par le contenu réel de Véronique.
              </p>
            </div>
          </div>

          <div className="mt-8 prose prose-sm max-w-none">
            <h2 className="font-bold">Exercice pratique</h2>
            <p className="text-ink/80">
              Placez vos paumes face à face, à 5 cm. Fermez les yeux 2 minutes. Notez toute
              sensation de chaleur, picotement ou pulsation — c&apos;est votre magnétisme qui
              s&apos;éveille !
            </p>
          </div>
        </Bubble>
      </div>
    </div>
  );
}
