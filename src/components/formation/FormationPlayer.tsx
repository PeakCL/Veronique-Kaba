"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, PlayCircle, CheckCircle2 } from "lucide-react";
import type { FormationLesson } from "@/lib/content";
import { VideoEmbed } from "@/components/formation/VideoEmbed";

/**
 * Lecteur de formation : les leçons (courtes vidéos) s'enchaînent dans l'ordre.
 * Playlist à gauche, vidéo à droite, navigation précédent / suivant.
 */
export function FormationPlayer({ lessons }: { lessons: readonly FormationLesson[] }) {
  const [index, setIndex] = useState(0);

  if (lessons.length === 0) {
    return (
      <div className="rounded-2xl bg-white/70 p-8 text-center comic-border">
        <p className="text-4xl">📼</p>
        <p className="mt-3 font-bold">Les vidéos arrivent bientôt</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink/65">
          Le contenu de ce niveau est en préparation. Vous serez prévenu·e dès sa mise en ligne.
        </p>
      </div>
    );
  }

  const current = lessons[index];
  const atFirst = index === 0;
  const atLast = index === lessons.length - 1;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      {/* ── Vidéo courante ── */}
      <div>
        <VideoEmbed video={current.video} title={current.title} />

        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-wide text-aura-600">
            Leçon {index + 1} / {lessons.length}
          </p>
          <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl">
            {current.title}
          </h2>
          <p className="text-sm text-ink/60">{current.duration}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink/80">{current.summary}</p>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={atFirst}
            className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-semibold comic-border disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            Précédente
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => Math.min(lessons.length - 1, i + 1))}
            disabled={atLast}
            className="inline-flex items-center gap-1 rounded-full bg-aura-500 px-4 py-2 text-sm font-semibold text-white comic-border disabled:opacity-40"
          >
            Suivante
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Playlist ── */}
      <aside>
        <p className="mb-3 text-sm font-bold text-ink/70">Programme du niveau</p>
        <ol className="space-y-2">
          {lessons.map((lesson, i) => {
            const active = i === index;
            return (
              <li key={lesson.id}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left text-sm comic-border transition-colors ${
                    active ? "bg-gold-200" : "bg-white hover:bg-gold-50"
                  }`}
                >
                  {active ? (
                    <PlayCircle className="mt-0.5 h-5 w-5 shrink-0 text-aura-600" />
                  ) : (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-ink/25" />
                  )}
                  <span>
                    <span className="font-semibold">
                      {i + 1}. {lesson.title}
                    </span>
                    <span className="block text-xs text-ink/55">{lesson.duration}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </aside>
    </div>
  );
}
