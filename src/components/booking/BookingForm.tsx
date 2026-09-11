"use client";

import { useState } from "react";
import { CalendarCheck } from "lucide-react";
import { Bubble } from "@/components/ui/Bubble";
import { ComicButton } from "@/components/ui/ComicButton";
import { site } from "@/lib/content";

const CHAMP =
  "mt-1 w-full rounded-xl border-3 border-ink bg-cream px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aura-400";

/**
 * Demande de rendez-vous — passe par Netlify Forms (formulaire « rendez-vous »,
 * déclaré dans public/__forms.html). Les `name` doivent correspondre exactement
 * entre les deux fichiers, sinon Netlify rejette la soumission.
 */
export function BookingForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);

    // Pot de miel : succès simulé pour ne pas signaler au bot qu'il est détecté.
    if (data.get("website")) {
      setStatus("ok");
      form.reset();
      return;
    }

    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "rendez-vous",
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          phone: String(data.get("phone") ?? ""),
          "session-type": String(data.get("session-type") ?? ""),
          mode: String(data.get("mode") ?? ""),
          availability: String(data.get("availability") ?? ""),
        }).toString(),
      });
      if (!res.ok) throw new Error(`Netlify Forms: ${res.status}`);
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <Bubble variant="gold" tail="bottom-left">
        <p className="text-5xl">✨</p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl">
          Demande envoyée !
        </h2>
        <p className="mt-3 leading-relaxed text-ink/75">
          Véronique vous recontacte sous 24 h pour convenir du créneau. Si c&apos;est urgent,
          appelez directement le{" "}
          <a href={site.phoneHref} className="font-bold text-aura-600 hover:underline">
            {site.phone}
          </a>
          .
        </p>
      </Bubble>
    );
  }

  return (
    <Bubble variant="white" tail="bottom-left">
      <h2 className="font-[family-name:var(--font-display)] text-2xl">
        Demander un rendez-vous
      </h2>
      <p className="mt-2 text-sm text-ink/70">
        Dites-moi ce dont vous avez besoin et quand vous êtes disponible — je vous réponds
        sous 24 h.
      </p>

      <form
        name="rendez-vous"
        method="POST"
        action="/__forms.html"
        data-netlify="true"
        data-netlify-honeypot="website"
        onSubmit={handleSubmit}
        className="mt-6 space-y-4"
      >
        <input type="hidden" name="form-name" value="rendez-vous" />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="rdv-name" className="block text-sm font-bold">
              Nom *
            </label>
            <input id="rdv-name" name="name" required className={CHAMP} />
          </div>
          <div>
            <label htmlFor="rdv-phone" className="block text-sm font-bold">
              Téléphone
            </label>
            <input id="rdv-phone" name="phone" type="tel" className={CHAMP} />
          </div>
        </div>

        <div>
          <label htmlFor="rdv-email" className="block text-sm font-bold">
            Adresse e-mail *
          </label>
          <input id="rdv-email" name="email" type="email" required className={CHAMP} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="rdv-type" className="block text-sm font-bold">
              Type de séance *
            </label>
            <select id="rdv-type" name="session-type" required defaultValue="" className={CHAMP}>
              <option value="" disabled>
                Choisir…
              </option>
              <option>Séance de soin (magnétisme, énergétique, coupe de feu)</option>
              <option>Recouvrement d&apos;âme</option>
              <option>Formation Magnétisme 2.0</option>
              <option>Je ne sais pas encore</option>
            </select>
          </div>
          <div>
            <label htmlFor="rdv-mode" className="block text-sm font-bold">
              Format *
            </label>
            <select id="rdv-mode" name="mode" required defaultValue="" className={CHAMP}>
              <option value="" disabled>
                Choisir…
              </option>
              <option>En présentiel (autour de Longwy)</option>
              <option>À distance (visio)</option>
              <option>Peu importe</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="rdv-availability" className="block text-sm font-bold">
            Vos disponibilités *
          </label>
          <textarea
            id="rdv-availability"
            name="availability"
            required
            rows={4}
            placeholder="Ex. : plutôt en fin de journée, ou le samedi matin. N'hésitez pas à préciser ce qui vous amène."
            className={CHAMP}
          />
        </div>

        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="sr-only"
          aria-hidden
        />

        <ComicButton type="submit" disabled={status === "loading"} className="w-full">
          <CalendarCheck className="h-4 w-4" />
          {status === "loading" ? "Envoi…" : "Envoyer ma demande"}
        </ComicButton>

        <div aria-live="polite" role="status">
          {status === "error" && (
            <p className="text-center text-sm font-bold text-red-600">
              Erreur d&apos;envoi — appelez le {site.phone}
            </p>
          )}
        </div>
      </form>
    </Bubble>
  );
}
