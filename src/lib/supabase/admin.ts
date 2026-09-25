import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase avec la clé secrète — contourne toutes les protections.
 * Serveur uniquement (Server Actions de l'espace admin) : ne jamais l'importer
 * dans un composant client.
 */
export function createAdminClient() {
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!secret) {
    throw new Error("SUPABASE_SECRET_KEY manquante — voir .env.example");
  }
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, secret, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
