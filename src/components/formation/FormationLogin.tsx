"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { Bubble } from "@/components/ui/Bubble";
import { ComicButton } from "@/components/ui/ComicButton";
import { formations } from "@/lib/content";

const CHAMP =
  "mt-1 w-full rounded-xl border-3 border-ink bg-cream px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aura-400";

export function FormationLogin() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    levelId: formations[0].id,
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/formation/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      window.location.href = "/formation/espace";
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Accès refusé — réservé aux élèves inscrits.");
      setLoading(false);
    }
  }

  return (
    <Bubble variant="white" tail="bottom-left">
      <div className="flex items-center gap-2">
        <Lock className="h-5 w-5 text-aura-500" />
        <p className="font-bold">Accès espace membre</p>
      </div>
      <p className="mt-2 text-sm text-ink/70">
        Renseignez vos coordonnées et le mot de passe reçu par e-mail pour votre niveau.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="fl-firstName" className="block text-sm font-bold">
              Prénom *
            </label>
            <input
              id="fl-firstName"
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              required
              className={CHAMP}
            />
          </div>
          <div>
            <label htmlFor="fl-lastName" className="block text-sm font-bold">
              Nom *
            </label>
            <input
              id="fl-lastName"
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              required
              className={CHAMP}
            />
          </div>
        </div>

        <div>
          <label htmlFor="fl-email" className="block text-sm font-bold">
            Adresse e-mail *
          </label>
          <input
            id="fl-email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
            className={CHAMP}
          />
        </div>

        <div>
          <label htmlFor="fl-level" className="block text-sm font-bold">
            Votre niveau *
          </label>
          <select
            id="fl-level"
            value={form.levelId}
            onChange={(e) => update("levelId", e.target.value)}
            className={CHAMP}
          >
            {formations.map((f) => (
              <option key={f.id} value={f.id}>
                {f.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="fl-password" className="block text-sm font-bold">
            Mot de passe *
          </label>
          <input
            id="fl-password"
            type="password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            required
            className={CHAMP}
          />
        </div>

        {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

        <ComicButton type="submit" disabled={loading} className="w-full">
          {loading ? "Vérification…" : "Entrer dans l'espace"}
        </ComicButton>
      </form>
    </Bubble>
  );
}
