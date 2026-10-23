"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, PlayCircle, CheckCircle2 } from "lucide-react";
import type { FormationLesson } from "@/lib/content";
import { VideoEmbed } from "@/components/formation/VideoEmbed";

/**
 * Lecteur de formation : les leçons (courtes vidéos) s'enchaînent dans l'ordre.
 * Playlist à gauche, vidéo à droite, navigation précédent / suivant. Changer
 * de leçon fait glisser le surlignage doré et fondre la vidéo suivante.
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
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
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
          </motion.div>
        </AnimatePresence>

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
                  aria-current={active ? "step" : undefined}
                  className={`relative flex w-full items-start gap-3 overflow-hidden rounded-xl bg-white px-3 py-3 text-left text-sm comic-pop ${
                    active ? "" : "hover:bg-gold-50"
                  }`}
                >
                  {/* Surlignage partagé : il glisse d'une leçon à l'autre */}
                  {active && (
                    <motion.span
                      layoutId="lesson-highlight"
                      className="absolute inset-0 bg-gold-200"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                      aria-hidden
                    />
                  )}
                  {active ? (
                    <PlayCircle className="relative mt-0.5 h-5 w-5 shrink-0 text-aura-600" />
                  ) : (
                    <CheckCircle2 className="relative mt-0.5 h-5 w-5 shrink-0 text-ink/25" />
                  )}
                  <span className="relative">
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
