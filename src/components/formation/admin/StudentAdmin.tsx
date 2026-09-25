"use client";

import { useActionState } from "react";
import { Copy, UserPlus, KeyRound, Trash2 } from "lucide-react";
import { formations } from "@/lib/content";
import { Bubble } from "@/components/ui/Bubble";
import { ComicButton } from "@/components/ui/ComicButton";
import { CHAMP } from "@/components/formation/LoginForm";
import {
  createStudent,
  updateLevels,
  resetPassword,
  deleteStudent,
  type AdminState,
} from "@/app/formation/admin/actions";

export type StudentRow = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  levels: string[];
  isAdmin: boolean;
  mustChangePassword: boolean;
  lastSignIn: string | null;
};

/** Identifiants à transmettre à l'élève — affichés une seule fois. */
function Credentials({ email, password }: { email?: string; password?: string }) {
  if (!password) return null;
  const text = `Espace élève : ${typeof window !== "undefined" ? window.location.origin : ""}/connexion\nE-mail : ${email}\nMot de passe provisoire : ${password}`;
  return (
    <div className="mt-4 rounded-xl border-2 border-dashed border-aura-400 bg-aura-50 p-4 text-sm">
      <p className="font-bold">À transmettre à l&apos;élève (affiché une seule fois) :</p>
      <pre className="mt-2 whitespace-pre-wrap break-all font-mono text-xs">{text}</pre>
      <button
        type="button"
        onClick={() => navigator.clipboard.writeText(text)}
        className="mt-3 inline-flex items-center gap-1 font-semibold text-aura-700 hover:underline"
      >
        <Copy className="h-4 w-4" /> Copier le message
      </button>
    </div>
  );
}

export function CreateStudentForm() {
  const [state, action, pending] = useActionState<AdminState, FormData>(createStudent, {});

  return (
    <Bubble variant="gold" tail="none" animate={false}>
      <div className="flex items-center gap-2">
        <UserPlus className="h-5 w-5 text-aura-600" />
        <h2 className="font-bold">Ajouter un·e élève</h2>
      </div>
      <form action={action} className="mt-4 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="new-first" className="block text-sm font-bold">Prénom *</label>
            <input id="new-first" name="firstName" required className={CHAMP} />
          </div>
          <div>
            <label htmlFor="new-last" className="block text-sm font-bold">Nom</label>
            <input id="new-last" name="lastName" className={CHAMP} />
          </div>
        </div>
        <div>
          <label htmlFor="new-email" className="block text-sm font-bold">E-mail *</label>
          <input id="new-email" name="email" type="email" required className={CHAMP} />
        </div>
        <fieldset>
          <legend className="text-sm font-bold">Niveaux débloqués</legend>
          <div className="mt-2 flex flex-wrap gap-4">
            {formations.map((f, i) => (
              <label key={f.id} className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="levels" value={f.id} defaultChecked={i === 0} className="h-4 w-4" />
                {f.title}
              </label>
            ))}
          </div>
        </fieldset>

        {state.error && <p role="alert" className="text-sm font-semibold text-red-600">{state.error}</p>}
        {state.success && <p role="status" className="text-sm font-semibold text-green-700">{state.success}</p>}

        <ComicButton type="submit" disabled={pending}>
          {pending ? "Création…" : "Créer le compte"}
        </ComicButton>
      </form>
      <Credentials email={state.email} password={state.password} />
    </Bubble>
  );
}

function ResetPasswordButton({ userId }: { userId: string }) {
  const [state, action, pending] = useActionState<AdminState, FormData>(resetPassword, {});
  return (
    <div>
      <form action={action}>
        <input type="hidden" name="userId" value={userId} />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-1 text-sm font-semibold text-aura-700 hover:underline disabled:opacity-50"
        >
          <KeyRound className="h-4 w-4" /> Nouveau mot de passe provisoire
        </button>
      </form>
      {state.error && <p className="mt-2 text-sm font-semibold text-red-600">{state.error}</p>}
      <Credentials email={state.email} password={state.password} />
    </div>
  );
}

export function StudentCard({ student }: { student: StudentRow }) {
  const fullName = [student.firstName, student.lastName].filter(Boolean).join(" ") || "—";

  return (
    <div className="rounded-2xl bg-white p-5 comic-border">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-bold">
            {fullName} {student.isAdmin && <span className="ml-1 rounded-full bg-gold-100 px-2 py-0.5 text-xs">admin</span>}
          </p>
          <p className="break-all text-sm text-ink/70">{student.email}</p>
        </div>
        <p className="text-xs text-ink/55">
          {student.mustChangePassword
            ? "Pas encore connecté·e (mot de passe provisoire)"
            : student.lastSignIn
              ? `Dernière connexion : ${new Date(student.lastSignIn).toLocaleDateString("fr-FR")}`
              : ""}
        </p>
      </div>

      {!student.isAdmin && (
        <>
          <form action={updateLevels} className="mt-4 flex flex-wrap items-center gap-4">
            <input type="hidden" name="userId" value={student.id} />
            {formations.map((f) => (
              <label key={f.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="levels"
                  value={f.id}
                  defaultChecked={student.levels.includes(f.id)}
                  className="h-4 w-4"
                />
                {f.title}
              </label>
            ))}
            <button
              type="submit"
              className="rounded-full bg-aura-100 px-3 py-1 text-sm font-bold text-aura-700 comic-border hover:bg-aura-200"
            >
              Enregistrer les niveaux
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-start justify-between gap-4 border-t border-ink/10 pt-4">
            <ResetPasswordButton userId={student.id} />
            <form
              action={deleteStudent}
              onSubmit={(e) => {
                if (!window.confirm(`Supprimer définitivement le compte de ${fullName} ?`)) e.preventDefault();
              }}
            >
              <input type="hidden" name="userId" value={student.id} />
              <button type="submit" className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:underline">
                <Trash2 className="h-4 w-4" /> Supprimer
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
