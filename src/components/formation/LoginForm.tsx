"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { Bubble } from "@/components/ui/Bubble";
import { ComicButton } from "@/components/ui/ComicButton";
import { signIn, type FormState } from "@/app/connexion/actions";

export const CHAMP =
  "mt-1 w-full rounded-xl border-3 border-ink bg-cream px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aura-400";

export function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(signIn, {});

  return (
    <Bubble variant="white" tail="none">
      <div className="flex items-center gap-2">
        <Lock className="h-5 w-5 text-aura-500" />
        <p className="font-bold">Connexion à mon espace</p>
      </div>

      <form action={action} className="mt-5 space-y-4">
        <input type="hidden" name="next" value={next ?? ""} />
        <div>
          <label htmlFor="login-email" className="block text-sm font-bold">
            Adresse e-mail
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={state.email}
            required
            className={CHAMP}
          />
        </div>
        <div>
          <label htmlFor="login-password" className="block text-sm font-bold">
            Mot de passe
          </label>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className={CHAMP}
          />
        </div>

        {state.error && (
          <p role="alert" className="text-sm font-semibold text-red-600">
            {state.error}
          </p>
        )}

        <ComicButton type="submit" disabled={pending} className="w-full">
          {pending ? "Connexion…" : "Me connecter"}
        </ComicButton>
      </form>

      <p className="mt-4 text-center text-sm">
        <Link href="/connexion/oublie" className="font-semibold text-aura-600 hover:underline">
          Mot de passe oublié ?
        </Link>
      </p>
    </Bubble>
  );
}
