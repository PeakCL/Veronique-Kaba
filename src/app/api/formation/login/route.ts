import { NextRequest, NextResponse } from "next/server";
import { formations } from "@/lib/content";
import {
  FORMATION_COOKIE,
  decodeSession,
  encodeSession,
  type FormationSession,
} from "@/lib/auth";

/** Mots de passe de repli en dev (remplacés par les variables d'env en prod). */
const DEV_FALLBACK: Record<string, string> = {
  FORMATION_N1_PASSWORD: "niveau-1-doree",
  FORMATION_N2_PASSWORD: "niveau-2-doree",
  FORMATION_ADMIN_PASSWORD: "admin-doree",
};

/** Mot de passe admin (Véronique + gestion) : débloque tous les niveaux. */
const adminPassword = () =>
  process.env.FORMATION_ADMIN_PASSWORD ?? DEV_FALLBACK.FORMATION_ADMIN_PASSWORD;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { levelId, password, firstName, lastName, email } = body ?? {};

  const level = formations.find((f) => f.id === levelId);
  if (!level) {
    return NextResponse.json({ error: "Niveau inconnu" }, { status: 400 });
  }

  if (!firstName || !lastName || !email) {
    return NextResponse.json(
      { error: "Merci d'indiquer prénom, nom et e-mail." },
      { status: 400 },
    );
  }

  // Le mot de passe admin ouvre tous les niveaux (prévisualisation) ; sinon on
  // vérifie le mot de passe du niveau choisi.
  const isAdmin = Boolean(password) && password === adminPassword();
  const expected = process.env[level.passwordEnv] ?? DEV_FALLBACK[level.passwordEnv];
  if (!isAdmin && (!password || password !== expected)) {
    return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
  }

  // Fusionne avec une éventuelle session existante : on garde les niveaux déjà
  // débloqués et on ajoute celui-ci ; l'identité est mise à jour à la volée.
  const existing = decodeSession(req.cookies.get(FORMATION_COOKIE)?.value);
  const granted = isAdmin ? formations.map((f) => f.id) : [level.id];
  const levels = Array.from(new Set([...(existing?.levels ?? []), ...granted]));

  const session: FormationSession = {
    firstName: String(firstName).trim().slice(0, 80),
    lastName: String(lastName).trim().slice(0, 80),
    email: String(email).trim().slice(0, 160),
    levels,
  };

  const res = NextResponse.json({ ok: true, levelId: level.id });
  res.cookies.set(FORMATION_COOKIE, encodeSession(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  return res;
}
