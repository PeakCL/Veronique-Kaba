"use client";

import { useActionState } from "react";
import { KeyRound } from "lucide-react";
import { Bubble } from "@/components/ui/Bubble";
import { ComicButton } from "@/components/ui/ComicButton";
import { CHAMP } from "@/components/formation/LoginForm";
import { changePassword, type FormState } from "@/app/connexion/actions";

export function ChangePasswordForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(changePassword, {});

  return (
    <Bubble variant="white" tail="none">
      <div className="flex items-center gap-2">
        <KeyRound className="h-5 w-5 text-aura-500" />
        <p className="font-bold">Nouveau mot de passe</p>
      </div>

      <form action={action} className="mt-5 space-y-4">
        <div>
          <label htmlFor="pw-new" className="block text-sm font-bold">
            Mot de passe (8 caractères minimum)
          </label>
          <input
            id="pw-new"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            className={CHAMP}
          />
        </div>
        <div>
          <label htmlFor="pw-confirm" className="block text-sm font-bold">
            Confirmer le mot de passe
          </label>
          <input
            id="pw-confirm"
            name="confirm"
            type="password"
            autoComplete="new-password"
            minLength={8}
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
          {pending ? "Enregistrement…" : "Enregistrer"}
        </ComicButton>
      </form>
    </Bubble>
  );
}
