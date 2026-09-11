"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Bubble } from "@/components/ui/Bubble";
import { ComicButton } from "@/components/ui/ComicButton";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);

    // Pot de miel : un bot remplit tous les champs, un humain ne voit pas celui-ci.
    // On simule un succès pour ne pas lui signaler qu'il a été détecté.
    if (data.get("website")) {
      setStatus("ok");
      form.reset();
      return;
    }

    try {
      // Netlify Forms : la soumission part vers /__forms.html, un fichier statique
      // de `public/` où le formulaire est déclaré (le robot de build de Netlify ne
      // peut pas détecter un formulaire rendu par le runtime Next).
      // Le champ `form-name` indique à Netlify quel formulaire est concerné.
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "contact",
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          message: String(data.get("message") ?? ""),
        }).toString(),
      });
      if (!res.ok) throw new Error(`Netlify Forms: ${res.status}`);
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <Bubble variant="white" tail="bottom-left">
      <form
        name="contact"
        method="POST"
        action="/__forms.html"
        data-netlify="true"
        data-netlify-honeypot="website"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input type="hidden" name="form-name" value="contact" />
        <div>
          <label htmlFor="name" className="block text-sm font-bold">
            Nom *
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-1 w-full rounded-xl border-3 border-ink bg-cream px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aura-400"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-bold">
            Adresse e-mail *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-xl border-3 border-ink bg-cream px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aura-400"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-bold">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="mt-1 w-full rounded-xl border-3 border-ink bg-cream px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aura-400"
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
          <Send className="h-4 w-4" />
          {status === "loading" ? "Envoi…" : "Envoyer le formulaire"}
        </ComicButton>
        <div aria-live="polite" role="status">
          {status === "ok" && (
            <p className="text-center text-sm font-bold text-green-700">
              Message envoyé ! Véronique vous répondra très vite ✨
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-sm font-bold text-red-600">
              Erreur d&apos;envoi — appelez le 07 71 17 67 27
            </p>
          )}
        </div>
      </form>
    </Bubble>
  );
}
