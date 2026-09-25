import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { requireSession } from "@/lib/auth";
import { formations } from "@/lib/content";
import { Bubble } from "@/components/ui/Bubble";
import { FormationPlayer } from "@/components/formation/FormationPlayer";

export const metadata = {
  title: "Niveau de formation",
  robots: { index: false, follow: false },
};

export default async function LevelPage({
  params,
}: {
  params: Promise<{ levelId: string }>;
}) {
  const { levelId } = await params;
  const session = await requireSession(`/formation/espace/${levelId}`);

  const level = formations.find((f) => f.id === levelId);
  if (!level) notFound();

  // Accès réservé au niveau dont l'élève a le mot de passe.
  if (!session.levels.includes(level.id)) redirect("/formation/espace");

  return (
    <div className="px-4 py-12 md:px-6">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/formation/espace"
          className="text-sm font-bold text-aura-600 hover:underline"
        >
          ← Retour à l&apos;espace
        </Link>

        <Bubble variant="gold" className="mt-6" tail="none" animate={false}>
          <h1 className="font-[family-name:var(--font-display)] text-3xl">
            {level.emoji} {level.title}
          </h1>
          <p className="mt-1 text-sm text-ink/70">
            {level.tagline} · {level.duration}
          </p>
        </Bubble>

        <div className="mt-8">
          <FormationPlayer lessons={level.lessons} />
        </div>
      </div>
    </div>
  );
}
