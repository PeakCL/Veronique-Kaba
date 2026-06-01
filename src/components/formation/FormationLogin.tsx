"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { Bubble } from "@/components/ui/Bubble";
import { ComicButton } from "@/components/ui/ComicButton";

export function FormationLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/formation/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      window.location.href = "/formation/espace";
    } else {
      setError("Mot de passe incorrect — réservé aux élèves inscrits.");
      setLoading(false);
    }
  }

  return (
    <Bubble variant="white" tail="bottom-left">
      <div className="flex items-center gap-2">
        <Lock className="h-5 w-5 text-aura-500" />
        <h2 className="font-bold">Accès espace membre</h2>
      </div>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe formation"
          required
          className="w-full rounded-xl border-3 border-ink bg-cream px-4 py-3"
        />
        {error && <p className="text-sm text-red-600 font-semibold">{error}</p>}
        <ComicButton type="submit" disabled={loading} className="w-full">
          {loading ? "Vérification…" : "Entrer dans l'espace"}
        </ComicButton>
      </form>
    </Bubble>
  );
}
