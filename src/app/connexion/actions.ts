"use server";

import { redirect } from "next/navigation";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getStudent, safeNext } from "@/lib/auth";

export type FormState = { error?: string; email?: string };

export async function signIn(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) {
    return { error: "Merci d'indiquer votre e-mail et votre mot de passe.", email };
  }

  if (!supabaseConfigured) {
    return { error: "L'espace élève est en cours de mise en place, réessayez bientôt.", email };
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "E-mail ou mot de passe incorrect.", email };

  redirect(safeNext(formData.get("next")));
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/connexion");
}

export async function changePassword(_prev: FormState, formData: FormData): Promise<FormState> {
  const student = await getStudent();
  if (!student) redirect("/connexion");

  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  if (password.length < 8) return { error: "Le mot de passe doit faire au moins 8 caractères." };
  if (password !== confirm) return { error: "Les deux mots de passe ne correspondent pas." };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return {
      error:
        error.code === "same_password"
          ? "Choisissez un mot de passe différent de l'actuel."
          : "Impossible de changer le mot de passe, réessayez.",
    };
  }

  // Le mot de passe provisoire n'est plus utilisé : on lève l'obligation.
  if (student.mustChangePassword) {
    await createAdminClient().auth.admin.updateUserById(student.id, {
      app_metadata: { must_change_password: false },
    });
  }

  redirect("/formation/espace?motdepasse=ok");
}
