/**
 * Crée (ou promeut) le compte admin de l'espace élèves.
 *
 *   node --env-file=.env.local scripts/create-admin.mjs <email> <mot-de-passe> [prénom]
 *
 * Si le compte existe déjà, il reçoit le rôle admin et le mot de passe indiqué.
 */
import { createClient } from "@supabase/supabase-js";

const [email, password, firstName = "Véronique"] = process.argv.slice(2);
if (!email || !password || password.length < 8) {
  console.error("Usage : node --env-file=.env.local scripts/create-admin.mjs <email> <mot-de-passe (8+ car.)> [prénom]");
  process.exit(1);
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data: list, error: listError } = await supabase.auth.admin.listUsers({ perPage: 1000 });
if (listError) throw listError;
const existing = list.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());

const attrs = {
  password,
  app_metadata: { role: "admin", must_change_password: false },
  user_metadata: { first_name: firstName },
};

const { error } = existing
  ? await supabase.auth.admin.updateUserById(existing.id, attrs)
  : await supabase.auth.admin.createUser({ email, email_confirm: true, ...attrs });
if (error) throw error;

console.log(`${existing ? "Compte promu" : "Compte créé"} : ${email} (admin)`);
