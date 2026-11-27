"""Genera versiones WebP optimizadas de todas las imágenes de assets/img.

Para cada imagen fuente (jpg, jpeg, png, webp) crea:
  <nombre>-lg.webp  ancho máximo 1600 px
  <nombre>-sm.webp  ancho 800 px (solo si la imagen supera 900 px)
y escribe _tools/data/images.json con las dimensiones, que usa build.js
para añadir srcset, width y height a cada <img>.

Los originales no se modifican. Es idempotente: solo regenera lo que cambió.

Uso (desde web-nueva):  python _tools/optimize-images.py
"""
import json
import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
IMG_DIR = ROOT / "assets" / "img"
MANIFEST = ROOT / "_tools" / "data" / "images.json"

LARGE_WIDTH = 1600
SMALL_WIDTH = 800
SMALL_THRESHOLD = 900
QUALITY = 78
SOURCE_EXT = {".jpg", ".jpeg", ".png", ".webp"}
GENERATED_SUFFIXES = ("-lg", "-sm")


def is_generated(path: Path) -> bool:
    return path.stem.endswith(GENERATED_SUFFIXES)


def needs_update(src: Path, out: Path) -> bool:
    return not out.exists() or out.stat().st_mtime < src.stat().st_mtime


def save_webp(img: Image.Image, width: int, out: Path) -> tuple[int, int]:
    if img.width > width:
        height = round(img.height * width / img.width)
        img = img.resize((width, height), Image.LANCZOS)
    img.save(out, "WEBP", quality=QUALITY, method=6)
    return img.size


def rel(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def process(src: Path) -> dict:
    lg = src.with_name(f"{src.stem}-lg.webp")
    sm = src.with_name(f"{src.stem}-sm.webp")
    with Image.open(src) as raw:
        img = ImageOps.exif_transpose(raw)
        if img.mode not in ("RGB", "RGBA"):
            img = img.convert("RGBA" if "transparency" in img.info else "RGB")
        lg_size = (save_webp(img, LARGE_WIDTH, lg) if needs_update(src, lg)
                   else Image.open(lg).size)
        entry = {"w": lg_size[0], "h": lg_size[1], "lg": rel(lg)}
        if img.width > SMALL_THRESHOLD:
            sm_size = (save_webp(img, SMALL_WIDTH, sm) if needs_update(src, sm)
                       else Image.open(sm).size)
            entry.update({"sm": rel(sm), "smw": sm_size[0]})
    return entry


def main() -> int:
    manifest, before, after, errors = {}, 0, 0, []
    for src in sorted(IMG_DIR.rglob("*")):
        if src.suffix.lower() not in SOURCE_EXT or is_generated(src):
            continue
        with Image.open(src) as probe:
            if getattr(probe, "is_animated", False):
                continue  # las animaciones (p. ej. la de la 404) se sirven tal cual
        try:
            entry = process(src)
        except (OSError, ValueError) as exc:
            errors.append(f"{rel(src)}: {exc}")
            continue
        manifest[rel(src)] = entry
        before += src.stat().st_size
        after += (ROOT / entry["lg"]).stat().st_size

    MANIFEST.write_text(json.dumps(manifest, indent=1, ensure_ascii=False), encoding="utf-8")
    print(f"{len(manifest)} imágenes · originales {before / 1e6:.1f} MB -> WebP grande {after / 1e6:.1f} MB")
    for err in errors:
        print(f"  ERROR {err}", file=sys.stderr)
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
