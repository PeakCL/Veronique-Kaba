import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/** Vrai si les variables Supabase publiques sont définies (sinon espace élève désactivé). */
export const supabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);

/**
 * Client Supabase côté serveur (Server Components, Server Actions) — agit au nom
 * de l'élève connecté·e grâce aux cookies de session.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Appelé depuis un Server Component : lecture seule. Le middleware
            // se charge de rafraîchir la session.
          }
        },
      },
    },
  );
}
