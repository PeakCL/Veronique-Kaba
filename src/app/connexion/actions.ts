"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  FORMATION_COOKIE,
  decodeSession,
  encodeSession,
  levelsForPassword,
  safeNext,
} from "@/lib/auth";

export type FormState = { error?: string; firstName?: string };

export async function signIn(_prev: FormState, formData: FormData): Promise<FormState> {
  const firstName = String(formData.get("firstName") ?? "").trim().slice(0, 80);
  const password = String(formData.get("password") ?? "").trim();
  if (!password) return { error: "Merci d'indiquer le mot de passe de votre formation.", firstName };

  const { levels, isAdmin } = levelsForPassword(password);
  if (levels.length === 0) return { error: "Mot de passe incorrect.", firstName };

  // On garde les niveaux déjà débloqués (ex. Niveau 1 puis Niveau 2).
  const cookieStore = await cookies();
  const existing = decodeSession(cookieStore.get(FORMATION_COOKIE)?.value);
  cookieStore.set(
    FORMATION_COOKIE,
    encodeSession({
      firstName: firstName || existing?.firstName || "",
      levels: Array.from(new Set([...(existing?.levels ?? []), ...levels])),
      isAdmin: isAdmin || existing?.isAdmin === true,
    }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    },
  );

  redirect(safeNext(formData.get("next")));
}

export async function signOut() {
  (await cookies()).delete(FORMATION_COOKIE);
  redirect("/connexion");
}
