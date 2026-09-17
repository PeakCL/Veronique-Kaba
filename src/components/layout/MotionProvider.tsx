"use client";

import { MotionConfig } from "framer-motion";

/**
 * Respecte la préférence système « réduire les animations ».
 * `reducedMotion="user"` : quand l'utilisateur a activé l'option d'accessibilité
 * (macOS/Windows/iOS/Android), framer-motion neutralise les animations de
 * transform — plus de flottements ni d'entrées animées imposées.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
