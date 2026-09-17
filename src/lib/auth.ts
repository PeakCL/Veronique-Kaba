import { cookies } from "next/headers";

export const FORMATION_COOKIE = "formation_access";

/**
 * Session d'un·e élève de formation.
 * Stockée dans un cookie httpOnly (base64 JSON), lue côté serveur uniquement.
 * `levels` : identifiants des niveaux débloqués (ex ["niveau-1"]).
 * L'identité est déclarée par l'élève à la connexion (pas de base de données) —
 * le mot de passe du niveau reste la vraie barrière d'accès.
 */
export type FormationSession = {
  firstName: string;
  lastName: string;
  email: string;
  levels: string[];
};

/** Encode une session en valeur de cookie. */
export function encodeSession(session: FormationSession): string {
  return Buffer.from(JSON.stringify(session), "utf8").toString("base64");
}

/** Décode une valeur de cookie en session (null si invalide). */
export function decodeSession(raw: string | undefined): FormationSession | null {
  if (!raw) return null;
  try {
    const s = JSON.parse(Buffer.from(raw, "base64").toString("utf8"));
    if (s && typeof s.email === "string" && Array.isArray(s.levels)) {
      return {
        firstName: String(s.firstName ?? ""),
        lastName: String(s.lastName ?? ""),
        email: String(s.email),
        levels: s.levels.map(String),
      };
    }
  } catch {
    // cookie corrompu → session absente
  }
  return null;
}

/** Session courante (côté serveur), ou null. */
export async function getFormationSession(): Promise<FormationSession | null> {
  const cookieStore = await cookies();
  return decodeSession(cookieStore.get(FORMATION_COOKIE)?.value);
}

/** L'élève a-t-il accès à ce niveau ? */
export async function hasLevelAccess(levelId: string): Promise<boolean> {
  const session = await getFormationSession();
  return Boolean(session?.levels.includes(levelId));
}
