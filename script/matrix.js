const canvas = document.getElementById('canv');
const ctx = canvas.getContext('2d');

const fontSize = 20;
let w, h, cols, ypos;

/**
 * Crée un polygone de clipping qui correspond à la zone "gauche"
 * du linear-gradient(135deg, color1 50%, color2 50%).
 *
 * On clip le demi-plan x + y <= (w + h)/2
 * -> diagonale qui passe par le centre, pente -1, cohérente avec le découpage.
 */
function applyLeftClip() {
  const c = (w + h) / 2;

  // Intersections de la droite x + y = c avec les bords du canvas
  const points = [];

  // Bord haut: y = 0 => x = c
  if (c >= 0 && c <= w) points.push({ x: c, y: 0 });

  // Bord gauche: x = 0 => y = c
  if (c >= 0 && c <= h) points.push({ x: 0, y: c });

  // Bord bas: y = h => x = c - h
  const xb = c - h;
  if (xb >= 0 && xb <= w) points.push({ x: xb, y: h });

  // Bord droit: x = w => y = c - w
  const yr = c - w;
  if (yr >= 0 && yr <= h) points.push({ x: w, y: yr });

  // On construit le polygone de la zone x+y <= c.
  // Cette zone inclut toujours le coin (0,0).
  // On va créer un chemin dans l’ordre autour du canvas.

  // Points candidats (coins) qui satisfont x+y <= c
  const corners = [];
  if (0 + 0 <= c) corners.push({ x: 0, y: 0 });
  if (w + 0 <= c) corners.push({ x: w, y: 0 });
  if (w + h <= c) corners.push({ x: w, y: h });
  if (0 + h <= c) corners.push({ x: 0, y: h });

  // Combine coins + intersections, puis on trie par angle autour du centre
  const all = [...corners, ...points];

  const cx = w / 2;
  const cy = h / 2;

  all.sort((a, b) => {
    const aa = Math.atan2(a.y - cy, a.x - cx);
    const bb = Math.atan2(b.y - cy, b.x - cx);
    return aa - bb;
  });

  ctx.beginPath();
  ctx.moveTo(all[0].x, all[0].y);
  for (let i = 1; i < all.length; i++) ctx.lineTo(all[i].x, all[i].y);
  ctx.closePath();
  ctx.clip();
}

function resizeCanvas() {
  // Taille réelle en pixels (évite le flou)
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;

  cols = Math.floor(w / fontSize) + 1;
  ypos = Array(cols).fill(0);

  // Canvas transparent (on ne remplit pas tout en noir)
  ctx.clearRect(0, 0, w, h);
}

function matrix() {
  // On dessine uniquement dans la partie claire à gauche
  ctx.save();
  applyLeftClip();

  // Effet de traînée (noir très léger) uniquement à gauche
  ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = '#AC1818';
if (!window.__jbFontInit && 'FontFace' in window) {
    window.__jbFontInit = true;
    const jb = new FontFace(
        'JetBrains Mono',
        'url(./assets/fonts/JetBrainsMono/JetBrainsMono-Regular.woff2)',
        { style: 'normal', weight: '400' }
    );
    jb.load().then(font => document.fonts.add(font)).catch(() => {});
}
ctx.font = '15pt "JetBrains Mono", monospace';

  ypos.forEach((y, ind) => {
    const text = String.fromCharCode(Math.floor(Math.random() * 128));
    const x = ind * fontSize;

    // Petit garde-fou: évite de dessiner inutilement hors zone
    // (clip gère déjà, mais ça économise un peu)
    if (x < 0 || x > w) return;

    ctx.fillText(text, x, y);

    if (y > h + Math.random() * 10000) ypos[ind] = 0;
    else ypos[ind] = y + fontSize;
  });

  ctx.restore();
}

resizeCanvas();
setInterval(matrix, 50);
window.addEventListener('resize', resizeCanvas);
