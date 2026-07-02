#!/bin/bash
# ────────────────────────────────────────────────────────────────────
# copy-vero-avatars.sh — copie les illustrations BD vers public/images/
#
# NOMS ATTENDUS dans assets/inbox/ (dépose tes exports là, pas à la racine) :
#   vero-salut.png       (plein corps, main levée)
#   vero-confiante.png   (buste, bras croisés)
#   vero-reflechit.png   (buste, menton dans la main)
#   vero-meditation.png  (lotus, plein corps)
#   vero-debout.png      (debout, plein corps)
#
# UTILISATION : bash scripts/copy-vero-avatars.sh
# ────────────────────────────────────────────────────────────────────

SRC="assets/inbox"
DEST="public/images"

files=("vero-salut.png" "vero-confiante.png" "vero-reflechit.png" "vero-meditation.png" "vero-debout.png")

echo "
📋 Copie des illustrations BD de $SRC/ vers $DEST/"
for f in "${files[@]}"; do
  if [ -f "$SRC/$f" ]; then
    cp "$SRC/$f" "$DEST/$f"
    echo "  ✓ $f"
  else
    echo "  ✗ $f — introuvable dans $SRC/"
  fi
done
echo "
✅ Terminé. Lance npm run dev pour voir le résultat."
