import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { formations } from "@/lib/content";

/**
 * Élève connecté·e (compte Supabase individuel).
 * - `levels` et `isAdmin` viennent de `app_metadata`, modifiable uniquement
 *   côté serveur avec la clé secrète : un·e élève ne peut pas s'attribuer un niveau.
 * - `mustChangePassword` : vrai tant que l'élève utilise le mot de passe
 *   provisoire donné par Véronique.
 */
export type Student = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  levels: string[];
  isAdmin: boolean;
  mustChangePassword: boolean;
};

const levelIds = new Set<string>(formations.map((f) => f.id));

export function toStudent(user: User): Student {
  const app = user.app_metadata ?? {};
  const meta = user.user_metadata ?? {};
  const levels: string[] = Array.isArray(app.levels)
    ? app.levels.map(String).filter((l: string) => levelIds.has(l))
    : [];
  return {
    id: user.id,
    email: user.email ?? "",
    firstName: String(meta.first_name ?? ""),
    lastName: String(meta.last_name ?? ""),
    levels,
    isAdmin: app.role === "admin",
    mustChangePassword: app.must_change_password === true,
  };
}

/** N'accepte qu'un chemin interne (évite les redirections vers un autre site). */
export function safeNext(raw: unknown): string {
  const next = typeof raw === "string" ? raw : "";
  return /^\/(?![\/\\])/.test(next) ? next : "/formation/espace";
}

/** Élève courant·e, ou null. `getUser()` revalide le jeton auprès de Supabase. */
export async function getStudent(): Promise<Student | null> {
  if (!supabaseConfigured) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ? toStudent(user) : null;
}

/** Exige une connexion ; renvoie vers /connexion sinon. */
export async function requireStudent(next = "/formation/espace"): Promise<Student> {
  const student = await getStudent();
  if (!student) redirect(`/connexion?next=${encodeURIComponent(next)}`);
  return student;
}

/** Exige le rôle admin (Véronique). */
export async function requireAdmin(): Promise<Student> {
  const student = await requireStudent("/formation/admin");
  if (!student.isAdmin) redirect("/formation/espace");
  return student;
}
