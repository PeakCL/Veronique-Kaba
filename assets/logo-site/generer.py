"""
Génère les fichiers logo et favicon du site à partir des logos détourés.

    python3 assets/logo-site/generer.py

Sources : public/presentation-logo/logo-{or,noir}-transparent.webp
(à remplacer par des exports de la version vectorielle quand elle existera).
"""
from pathlib import Path
from PIL import Image, ImageDraw
import numpy as np

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "public/presentation-logo"
OUT = Path(__file__).resolve().parent
NOIR_VELOURS = (15, 13, 11, 255)


def letters_only(src):
    """Monogramme : garde les lettres, la diagonale et l'éclat ; retire cercle et pointillés."""
    a = np.array(Image.open(src).convert("RGBA")).astype(float)
    a[0:772, 925:, 3] = 0   # pointillés à droite du K
    a[0:420, 880:, 3] = 0   # pointillés en haut à droite
    a[640:, 0:175, 3] = 0   # bout d'arc en bas à gauche
    a[830:, 0:900, 3] = 0   # pointillés sous les lettres
    x0, y0, x1, y1 = 110, 270, a.shape[1], min(920, a.shape[0])
    c = a[y0:y1, x0:x1].copy()
    h, w = c.shape[:2]
    ys, xs = np.arange(h), np.arange(w)
    fy = np.clip(np.minimum(ys / (h * 0.14), (h - 1 - ys) / (h * 0.04)), 0, 1)  # fondu haut/bas
    fx = np.clip(xs / (w * 0.06), 0, 1)                                        # fondu gauche
    c[..., 3] *= np.outer(fy, fx)
    im = Image.fromarray(c.astype("uint8"), "RGBA")
    return im.crop(im.getbbox())


def tile(mono, size, pad=0.09, radius=0.22, rounded=True):
    """Monogramme or sur tuile noir velours (lisible sur onglets clairs et sombres)."""
    t = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    mask = Image.new("L", (size, size), 0)
    if rounded:
        ImageDraw.Draw(mask).rounded_rectangle((0, 0, size - 1, size - 1), radius=int(size * radius), fill=255)
    else:
        mask.paste(255, (0, 0, size, size))
    t.paste(Image.new("RGBA", (size, size), NOIR_VELOURS), (0, 0), mask)
    w = int(size * (1 - 2 * pad))
    h = int(mono.height * w / mono.width)
    t.alpha_composite(mono.resize((w, h), Image.LANCZOS), ((size - w) // 2, (size - h) // 2))
    return t


def both(im, name):
    (OUT / "public/logo").mkdir(parents=True, exist_ok=True)
    im.save(OUT / f"public/logo/{name}.png", optimize=True)
    im.save(OUT / f"public/logo/{name}.webp", quality=90, method=6)


gold = Image.open(SRC / "logo-or-transparent.webp").convert("RGBA")
black = Image.open(SRC / "logo-noir-transparent.webp").convert("RGBA")
mono_or = letters_only(SRC / "logo-or-transparent.webp")
mono_noir = letters_only(SRC / "logo-noir-transparent.webp")

(OUT / "src/app").mkdir(parents=True, exist_ok=True)
tile(mono_or, 512).save(OUT / "src/app/icon.png", optimize=True)
tile(mono_or, 256).save(OUT / "src/app/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
# iOS arrondit lui-même les angles : tuile carrée et opaque
tile(mono_or, 180, pad=0.12, rounded=False).convert("RGB").save(OUT / "src/app/apple-icon.png", optimize=True)

both(gold, "vk-logo-or")
both(black, "vk-logo-noir")
for mono, name in [(mono_or, "vk-monogramme-or"), (mono_noir, "vk-monogramme-noir")]:
    both(mono.resize((480, int(mono.height * 480 / mono.width)), Image.LANCZOS), name)

print("Fichiers générés dans", OUT)
