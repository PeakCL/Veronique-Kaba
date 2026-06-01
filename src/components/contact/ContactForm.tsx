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

    if (data.get("website")) {
      setStatus("ok");
      form.reset();
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <Bubble variant="white" tail="bottom-left">
      <form onSubmit={handleSubmit} className="space-y-4">
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
      </form>
    </Bubble>
  );
}
