import { createClient } from "@supabase/supabase-js";

/**
 * Fonction planifiée Netlify : un projet Supabase gratuit est mis en pause après
 * 7 jours sans activité, ce qui bloquerait la connexion des élèves. Une petite
 * requête quotidienne suffit à le garder éveillé.
 */
export default async () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
  const { error } = await supabase.auth.admin.listUsers({ perPage: 1 });
  if (error) {
    console.error("Supabase keepalive :", error.message);
    return new Response("error", { status: 500 });
  }
  return new Response("ok");
};

export const config = { schedule: "@daily" };
