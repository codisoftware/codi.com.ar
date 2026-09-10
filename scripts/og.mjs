/* ═══════════════════════════════════════════════════════════
   Genera la miniatura para compartir (Open Graph), 1200×630.

   Es una sola para todo el sitio: la marca y el personaje, nada más.
   Sin eso, un link compartido sale sin imagen, que es la mitad de lo
   que se ve en un feed antes de decidir el clic.

   No corre en cada build: la imagen queda commiteada. Se vuelve a
   hacer sólo si cambia el logo o el diseño de la tarjeta.

   Uso:  npm run og
   Pide playwright, que el resto del sitio no necesita.
   ═══════════════════════════════════════════════════════════ */

import { mkdirSync, writeFileSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const SALIDA = join(RAIZ, 'assets', 'og');

/* El logo real, embebido: la tarjeta se renderiza sin servidor, así que
   una ruta /assets/... no resolvería. Va la versión clara, que es la
   pensada para fondo oscuro. */
const LOGO = readFileSync(join(RAIZ, 'assets', 'img', 'Codi-dark.svg'), 'utf8')
	.replace(/<\?xml[^>]*\?>/, '')
	// El SVG trazado trae width y height pero no viewBox. Sin viewBox, al
	// escalarlo el navegador lo recorta en vez de achicarlo.
	.replace(/<svg /, '<svg viewBox="0 0 718 255" preserveAspectRatio="xMidYMid meet" ')
	.trim();

/* el mismo bicho del sitio, dibujado acá para no depender del JS de la página */
const AGENTE = [
	'.#....#.', '.######.', '########', '#oooooo#',
	'########', '##.##.##', '.#....#.', '##....##'
];

function pixeles(escala) {
	let r = '';
	AGENTE.forEach((fila, y) => {
		[...fila].forEach((ch, x) => {
			if (ch === '.') return;
			const color = ch === 'o' ? '#37A4DC' : '#E9EEF4';
			r += `<rect x="${x * escala}" y="${y * escala}" width="${escala - 1}" height="${escala - 1}" fill="${color}"/>`;
		});
	});
	const lado = 8 * escala;
	return `<svg width="${lado}" height="${lado}" viewBox="0 0 ${lado} ${lado}">${r}</svg>`;
}

/* La tarjeta va en oscuro aunque el sitio abra en claro: en un feed, un
   rectángulo negro con un cian fuerte se despega del resto. */
const tarjeta = `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
	* { margin: 0; box-sizing: border-box; }
	body {
		width: 1200px; height: 630px; overflow: hidden;
		background: #0A0C0F;
		display: flex; align-items: center; justify-content: center;
		position: relative;
	}
	.reja {
		position: absolute; inset: 0;
		background-image:
			linear-gradient(#202834 1px, transparent 1px),
			linear-gradient(90deg, #202834 1px, transparent 1px);
		background-size: 68px 68px;
		opacity: .55;
		mask-image: radial-gradient(62% 62% at 50% 46%, #000, transparent 78%);
	}
	.brillo {
		position: absolute; inset: 0;
		background: radial-gradient(46% 46% at 50% 44%, rgba(55,164,220,.20), transparent 72%);
	}
	.lockup {
		position: relative;
		display: flex; align-items: center; gap: 68px;
	}
	.logo { width: 420px; }
	.logo svg { width: 100%; height: auto; display: block; }
	.bicho { filter: drop-shadow(0 12px 34px rgba(0,0,0,.65)); }
</style></head><body>
	<div class="brillo"></div><div class="reja"></div>
	<div class="lockup">
		<div class="logo">${LOGO}</div>
		<div class="bicho">${pixeles(22)}</div>
	</div>
</body></html>`;

/* ───────── a renderizar ───────── */

mkdirSync(SALIDA, { recursive: true });

const navegador = await chromium.launch();
const pagina = await (await navegador.newContext({
	viewport: { width: 1200, height: 630 },
	deviceScaleFactor: 1
})).newPage();

await pagina.setContent(tarjeta, { waitUntil: 'load' });
await pagina.waitForTimeout(150);
writeFileSync(join(SALIDA, 'codi.png'), await pagina.screenshot({ type: 'png' }));

await navegador.close();
console.log('· assets/og/codi.png');
