import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { formations } from "@/lib/content";

export const FORMATION_COOKIE = "formation_access";

/**
 * Accès à l'espace élève : un mot de passe commun par niveau (donné aux élèves
 * inscrits), plus un mot de passe admin qui ouvre tous les niveaux.
 *
 * Mots de passe lus dans les variables d'environnement. Les valeurs de repli
 * ne servent qu'en développement local : en production, un niveau sans
 * variable est simplement fermé.
 */
const DEV_FALLBACK: Record<string, string> = {
  FORMATION_N1_PASSWORD: "niveau-1-doree",
  FORMATION_N2_PASSWORD: "niveau-2-doree",
  FORMATION_ADMIN_PASSWORD: "admin-doree",
};

function readPassword(envName: string): string | undefined {
  const value = process.env[envName]?.trim();
  if (value) return value;
  return process.env.NODE_ENV === "production" ? undefined : DEV_FALLBACK[envName];
}

const LEVEL_PASSWORD_ENV: Record<string, string> = {
  "niveau-1": "FORMATION_N1_PASSWORD",
  "niveau-2": "FORMATION_N2_PASSWORD",
};

/** Comparaison en temps constant (ne révèle rien par la durée). */
function same(a: string, b: string): boolean {
  const ha = createHmac("sha256", "cmp").update(a).digest();
  const hb = createHmac("sha256", "cmp").update(b).digest();
  return timingSafeEqual(ha, hb);
}

/** Niveaux ouverts par ce mot de passe (vide si incorrect). */
export function levelsForPassword(password: string): { levels: string[]; isAdmin: boolean } {
  const admin = readPassword("FORMATION_ADMIN_PASSWORD");
  if (admin && same(password, admin)) {
    return { levels: formations.map((f) => f.id), isAdmin: true };
  }
  const levels = formations
    .map((f) => f.id)
    .filter((id) => {
      const expected = readPassword(LEVEL_PASSWORD_ENV[id]);
      return Boolean(expected) && same(password, expected!);
    });
  return { levels, isAdmin: false };
}

export type FormationSession = {
  firstName: string;
  levels: string[];
  isAdmin: boolean;
};

/**
 * Clé de signature du cookie, dérivée des mots de passe : changer un mot de
 * passe dans Netlify déconnecte d'office toutes les sessions existantes.
 */
function signingKey(): string {
  return ["FORMATION_N1_PASSWORD", "FORMATION_N2_PASSWORD", "FORMATION_ADMIN_PASSWORD"]
    .map((name) => readPassword(name) ?? "")
    .join("|");
}

function sign(payload: string): string {
  return createHmac("sha256", signingKey()).update(payload).digest("base64url");
}

/** Cookie = données en base64url + signature HMAC : impossible à falsifier. */
export function encodeSession(session: FormationSession): string {
  const payload = Buffer.from(JSON.stringify(session), "utf8").toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function decodeSession(raw: string | undefined): FormationSession | null {
  if (!raw) return null;
  const [payload, signature] = raw.split(".");
  if (!payload || !signature || !same(signature, sign(payload))) return null;
  try {
    const s = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!Array.isArray(s?.levels)) return null;
    return {
      firstName: String(s.firstName ?? ""),
      levels: s.levels.map(String),
      isAdmin: s.isAdmin === true,
    };
  } catch {
    return null;
  }
}

/** Session courante (côté serveur), ou null. */
export async function getFormationSession(): Promise<FormationSession | null> {
  const cookieStore = await cookies();
  return decodeSession(cookieStore.get(FORMATION_COOKIE)?.value);
}

/** N'accepte qu'un chemin interne (évite les redirections vers un autre site). */
export function safeNext(raw: unknown): string {
  const next = typeof raw === "string" ? raw : "";
  return /^\/(?![\/\\])/.test(next) ? next : "/formation/espace";
}

/** Exige une session ; renvoie vers /connexion sinon. */
export async function requireSession(next = "/formation/espace"): Promise<FormationSession> {
  const session = await getFormationSession();
  if (!session) redirect(`/connexion?next=${encodeURIComponent(next)}`);
  return session;
}
