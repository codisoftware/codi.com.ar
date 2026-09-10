/* ═══════════════════════════════════════════════════════════
   Genera las miniaturas para compartir (Open Graph), 1200×630.

   Una por página: al compartir /industrias/banca/ tiene que verse
   "Banca", no la home. La miniatura es lo único que se ve en un feed
   antes de decidir si se hace clic.

   Esto NO corre en cada build: las imágenes quedan commiteadas. Se
   vuelve a correr sólo si cambia un título o el diseño de la tarjeta.

   Uso:  node scripts/og.mjs
   Pide playwright, que el resto del sitio no necesita.
   ═══════════════════════════════════════════════════════════ */

import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';
import { INDUSTRIAS } from '../contenido/industrias.mjs';
import { PRODUCTO } from '../contenido/plataforma.mjs';
import { EMPRESA } from '../contenido/empresa.mjs';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const SALIDA = join(RAIZ, 'assets', 'og');

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

const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* La tarjeta va en oscuro aunque el sitio abra en claro: en un feed, un
   rectángulo negro con un cian fuerte se despega del resto. */
function tarjeta({ kicker, titulo, cola }) {
	return `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<style>
	* { margin: 0; box-sizing: border-box; }
	body {
		width: 1200px; height: 630px; overflow: hidden;
		background: #0A0C0F; color: #E9EEF4;
		font-family: Inter, sans-serif;
		display: flex; flex-direction: column; justify-content: space-between;
		padding: 64px 72px; position: relative;
	}
	.reja {
		position: absolute; inset: 0; pointer-events: none;
		background-image:
			linear-gradient(#202834 1px, transparent 1px),
			linear-gradient(90deg, #202834 1px, transparent 1px);
		background-size: 68px 68px;
		opacity: .5;
		mask-image: radial-gradient(70% 60% at 72% 30%, #000, transparent 75%);
	}
	.brillo {
		position: absolute; inset: -20% -10% auto -10%; height: 120%;
		background: radial-gradient(52% 44% at 76% 28%, rgba(55,164,220,.22), transparent 70%);
	}
	.fila { display: flex; align-items: center; justify-content: space-between; position: relative; }
	.marca { font-size: 30px; font-weight: 700; letter-spacing: -.03em; }
	.marca span { color: #37A4DC; }
	.kicker {
		font-family: 'JetBrains Mono', monospace; font-size: 17px; font-weight: 500;
		letter-spacing: .16em; text-transform: uppercase; color: #6FD2FF;
	}
	.medio { position: relative; display: flex; align-items: center; gap: 48px; }
	h1 {
		font-size: ${titulo.length > 58 ? 54 : 66}px; font-weight: 800;
		line-height: 1.05; letter-spacing: -.03em; max-width: 16ch;
	}
	h1 em { font-style: normal; color: #6FD2FF; }
	.bicho { flex: none; filter: drop-shadow(0 10px 30px rgba(0,0,0,.6)); }
	.cola {
		font-family: 'JetBrains Mono', monospace; font-size: 19px;
		letter-spacing: .06em; color: #94A2B2;
	}
	.raya { height: 3px; background: #37A4DC; width: 92px; margin-bottom: 26px; }
</style></head><body>
	<div class="brillo"></div><div class="reja"></div>

	<div class="fila">
		<p class="marca">CODI <span>&gt;</span></p>
		<p class="kicker">${esc(kicker)}</p>
	</div>

	<div class="medio">
		<div>
			<div class="raya"></div>
			<h1>${titulo}</h1>
		</div>
		<div class="bicho">${pixeles(16)}</div>
	</div>

	<p class="cola">${esc(cola)}</p>
</body></html>`;
}

/* ───────── qué tarjeta lleva cada página ───────── */

const PAGINAS = [
	{
		archivo: 'home',
		kicker: 'Agentes de IA · en producción',
		titulo: 'Agentes que hacen el trabajo del que <em>depende tu negocio.</em>',
		cola: 'codi.com.ar'
	},
	{
		archivo: 'industrias',
		kicker: 'Industrias',
		titulo: 'Donde ya corren <em>nuestros agentes.</em>',
		cola: 'codi.com.ar/industrias'
	},
	...INDUSTRIAS.map(i => ({
		archivo: 'industrias-' + i.slug,
		kicker: 'Industrias',
		titulo: 'Agentes de IA para <em>' + esc(i.nombre) + '.</em>',
		cola: 'codi.com.ar/industrias/' + i.slug
	})),
	...PRODUCTO.map(p => ({
		archivo: p.slug,
		kicker: p.kicker,
		titulo: esc(p.h1),
		cola: 'codi.com.ar/' + p.slug
	})),
	...EMPRESA.map(p => ({
		archivo: p.slug,
		kicker: p.kicker,
		titulo: esc(p.h1),
		cola: 'codi.com.ar/' + p.slug
	}))
];

/* ───────── a renderizar ───────── */

mkdirSync(SALIDA, { recursive: true });

const navegador = await chromium.launch();
const pagina = await (await navegador.newContext({
	viewport: { width: 1200, height: 630 },
	deviceScaleFactor: 1
})).newPage();

for (const p of PAGINAS) {
	await pagina.setContent(tarjeta(p), { waitUntil: 'networkidle' });
	await pagina.waitForTimeout(120);
	writeFileSync(join(SALIDA, p.archivo + '.png'), await pagina.screenshot({ type: 'png' }));
	console.log('·', 'assets/og/' + p.archivo + '.png');
}

await navegador.close();
console.log(`\n${PAGINAS.length} miniaturas generadas.`);
