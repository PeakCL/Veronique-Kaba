import { CheckCircle } from "lucide-react";
import { Bubble } from "@/components/ui/Bubble";
import { ComicButton } from "@/components/ui/ComicButton";

export const metadata = {
  title: "Paiement confirmé",
  robots: { index: false, follow: false },
  alternates: { canonical: "/paiement/succes" },
};

export default async function PaiementSuccesPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; provider?: string }>;
}) {
  const { service, provider } = await searchParams;
  const isFormation = service === "formation";
  const viaPayPal = provider === "paypal";

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <Bubble variant="aura" className="max-w-lg text-center" tail="none">
        <CheckCircle className="mx-auto h-16 w-16 text-green-600" />
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl">
          Paiement confirmé !
        </h1>
        <p className="mt-3 text-ink/70">
          Merci pour votre confiance{viaPayPal ? " — paiement PayPal reçu" : ""}. Véronique vous
          contactera pour confirmer les détails.
        </p>
        {isFormation && (
          <p className="mt-2 text-sm font-bold text-aura-600">
            Accédez à l&apos;espace formation avec le mot de passe reçu par e-mail.
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {isFormation ? (
            <ComicButton href="/formation/espace">Espace formation</ComicButton>
          ) : (
            <ComicButton href="/rendez-vous">Prendre rendez-vous</ComicButton>
          )}
          <ComicButton href="/" variant="outline">
            Accueil
          </ComicButton>
        </div>
      </Bubble>
    </div>
  );
}
