import Link from "next/link";
import { requireAdmin, toStudent } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  CreateStudentForm,
  StudentCard,
  type StudentRow,
} from "@/components/formation/admin/StudentAdmin";

export const metadata = {
  title: "Gestion des élèves",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  await requireAdmin();

  const { data, error } = await createAdminClient().auth.admin.listUsers({ perPage: 1000 });
  const students: StudentRow[] = (data?.users ?? [])
    .map((u) => ({ ...toStudent(u), lastSignIn: u.last_sign_in_at ?? null }))
    .sort((a, b) => Number(b.isAdmin) - Number(a.isAdmin) || a.firstName.localeCompare(b.firstName, "fr"));

  return (
    <div className="px-4 py-12 md:px-6">
      <div className="mx-auto max-w-4xl">
        <Link href="/formation/espace" className="text-sm font-bold text-aura-600 hover:underline">
          ← Retour à mon espace
        </Link>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl">Gestion des élèves</h1>
        <p className="mt-3 text-ink/70">
          Créez un compte après l&apos;inscription : un mot de passe provisoire s&apos;affiche, à
          transmettre à l&apos;élève (SMS, e-mail…). À sa première connexion, l&apos;élève choisit
          son propre mot de passe.
        </p>

        <div className="mt-8">
          <CreateStudentForm />
        </div>

        <h2 className="mt-12 font-[family-name:var(--font-display)] text-2xl">
          Élèves ({students.filter((s) => !s.isAdmin).length})
        </h2>
        {error && <p className="mt-4 font-semibold text-red-600">Erreur : {error.message}</p>}
        <div className="mt-6 space-y-4">
          {students.map((s) => (
            <StudentCard key={s.id} student={s} />
          ))}
        </div>
      </div>
    </div>
  );
}
