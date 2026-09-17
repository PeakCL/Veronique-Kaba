import type { FormationLesson } from "@/lib/content";

/**
 * Affiche la vidéo d'une leçon selon son format.
 * - youtube : src = identifiant de la vidéo
 * - vimeo   : src = identifiant numérique
 * - mp4     : src = URL du fichier
 * - null    : état « bientôt disponible »
 */
export function VideoEmbed({
  video,
  title,
}: {
  video: FormationLesson["video"];
  title: string;
}) {
  if (!video) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl bg-ink/5 comic-border">
        <div className="p-8 text-center">
          <p className="text-5xl">🎬</p>
          <p className="mt-4 font-bold">Vidéo bientôt disponible</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-ink/60">
            Cette leçon sera mise en ligne dès que Véronique aura fourni la vidéo.
          </p>
        </div>
      </div>
    );
  }

  if (video.type === "mp4") {
    return (
      <video
        controls
        preload="metadata"
        className="aspect-video w-full rounded-2xl bg-black comic-border"
      >
        <source src={video.src} type="video/mp4" />
        Votre navigateur ne peut pas lire cette vidéo.
      </video>
    );
  }

  const embedSrc =
    video.type === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${video.src}`
      : `https://player.vimeo.com/video/${video.src}`;

  return (
    <iframe
      src={embedSrc}
      title={title}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      allowFullScreen
      className="aspect-video w-full rounded-2xl border-0 bg-black comic-border"
    />
  );
}
