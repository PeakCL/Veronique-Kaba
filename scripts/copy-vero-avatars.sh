#!/bin/bash
# ────────────────────────────────────────────────────────────────────
# copy-vero-avatars.sh — copie les illustrations BD vers public/images/
#
# NOMS ATTENDUS à la racine du projet :
#   vero-salut.png       (plein corps, main levée)
#   vero-confiante.png   (buste, bras croisés)
#   vero-reflechit.png   (buste, menton dans la main)
#   vero-meditation.png  (lotus, plein corps)
#   vero-debout.png      (debout, plein corps)
#
# UTILISATION : bash scripts/copy-vero-avatars.sh
# ────────────────────────────────────────────────────────────────────

DEST="public/images"

files=("vero-salut.png" "vero-confiante.png" "vero-reflechit.png" "vero-meditation.png" "vero-debout.png")

echo "
📋 Copie des illustrations BD vers $DEST/"
for f in "${files[@]}"; do
  if [ -f "$f" ]; then
    cp "$f" "$DEST/$f"
    echo "  ✓ $f"
  else
    echo "  ✗ $f — introuvable"
  fi
done
echo "
✅ Terminé. Lance npm run dev pour voir le résultat."
