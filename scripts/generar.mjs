/* ═══════════════════════════════════════════════════════════
   Genera las páginas internas desde el contenido.

   Son catorce páginas con el mismo menú, el mismo pie y el mismo
   sistema visual. Escritas a mano se desincronizan en una semana:
   alcanza con que alguien toque un link del menú en una sola.

   Uso:  node scripts/generar.mjs
   ═══════════════════════════════════════════════════════════ */

import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { INDUSTRIAS } from '../contenido/industrias.mjs';
import { PRODUCTO } from '../contenido/plataforma.mjs';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const CODI = 'https://codi.com.ar';

const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ───────── el molde ───────── */

function molde({ titulo, descripcion, ruta, cuerpo, jsonld }) {
	return `<!DOCTYPE html>
<html lang="es-AR">
<head>
	<meta charset="UTF-8"/>
	<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
	<title>${esc(titulo)}</title>
	<meta name="description" content="${esc(descripcion)}" />
	<link rel="canonical" href="${CODI}${ruta}" />
	<meta property="og:locale" content="es_AR" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="${esc(titulo)}" />
	<meta property="og:description" content="${esc(descripcion)}" />
	<meta property="og:url" content="${CODI}${ruta}" />
	<meta property="og:site_name" content="Codi" />
	<meta name="theme-color" content="#FFFFFF">
	<link rel="icon" type="image/svg+xml" href="/assets/img/favicon.svg">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="/assets/css/main.css">
	<script>(function(){try{if(localStorage.getItem("codi-tema")==="oscuro")document.documentElement.setAttribute("data-tema","oscuro")}catch(e){}})()</script>
${jsonld || ''}</head>
<body>

<div class="puntero" data-puntero aria-hidden="true">
	<svg class="puntero__flecha" width="22" height="28" viewBox="0 0 22 28">
		<polygon points="2,2 2,21 7,16.5 10.5,24 14,22.4 10.6,15.6 17.4,15.6"/>
	</svg>
	<svg class="puntero__mano" width="26" height="30" viewBox="0 0 26 30">
		<polygon points="7,3 10,3 10,13 12,13 12,11 15,11 15,13 17,13 17,12 20,12 20,21 17,26 10,26 7,22 7,17 4,14 4,11 7,11"/>
	</svg>
</div>

<div class="viajero" data-viajero aria-hidden="true"></div>

${menu()}

<main>
${cuerpo}
</main>

${pie()}

<script src="/assets/js/main.js"></script>
</body>
</html>
`;
}

function menu() {
	return `<header class="nav">
	<div class="nav__inner">
		<a href="/" class="nav__logo" aria-label="Codi, inicio">
			<img src="/assets/img/Codi.svg" alt="Codi" class="marca marca--claro" width="96" height="24"><img src="/assets/img/Codi-dark.svg" alt="" aria-hidden="true" class="marca marca--oscuro" width="96" height="24">
		</a>
		<ul class="nav__links">
			<li><a href="/#trabajo">Qué hacemos</a></li>
			<li><a href="/#casos">Casos</a></li>
			<li><a href="/#ruta">Cómo trabajamos</a></li>
			<li><a href="/#industrias">Industrias</a></li>
			<li><a href="/#plataforma">Plataforma</a></li>
		</ul>
		<button class="tema" data-tema-boton aria-label="Pasar al modo oscuro" aria-pressed="false">
				<svg class="tema__ico tema__ico--luna" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M17 12.4A7.6 7.6 0 1 1 7.6 3a6 6 0 0 0 9.4 9.4z"/></svg><svg class="tema__ico tema__ico--sol" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><rect x="8" y="0" width="4" height="3"/><rect x="8" y="17" width="4" height="3"/><rect x="0" y="8" width="3" height="4"/><rect x="17" y="8" width="3" height="4"/><rect x="6" y="6" width="8" height="8"/></svg>
			</button>
			<a href="/#hablemos" class="btn btn--sm nav__cta">Hablemos</a>
		<button class="nav__toggle" aria-label="Abrir menú" aria-expanded="false"><span></span><span></span><span></span></button>
	</div>
</header>`;
}

function pie() {
	const otras = INDUSTRIAS.map(i => `\t\t\t\t<li><a href="/industrias/${i.slug}/">${esc(i.nombre)}</a></li>`).join('\n');
	return `<footer class="pie">
	<div class="wrap pie__grid">
		<div class="pie__marca">
			<img src="/assets/img/Codi.svg" alt="Codi" class="marca marca--pie marca--claro" width="110" height="28"><img src="/assets/img/Codi-dark.svg" alt="" aria-hidden="true" class="marca marca--pie marca--oscuro" width="110" height="28">
			<p>IA aplicada a las operaciones de las empresas. Construido en Argentina, operando a nivel global.</p>
		</div>
		<div class="pie__col">
			<h5>Industrias</h5>
			<ul>
${otras}
			</ul>
		</div>
		<div class="pie__col">
			<h5>Codi</h5>
			<ul>
				<li><a href="/plataforma/">Plataforma</a></li>
				<li><a href="/estudio/">Codi Studio</a></li>
				<li><a href="/apps/">Apps a medida</a></li>
				<li><a href="/nosotros/">Nosotros</a></li>
			</ul>
		</div>
		<div class="pie__col">
			<h5>Contacto</h5>
			<ul>
				<li><a href="mailto:info@codi.com.ar">info@codi.com.ar</a></li>
				<li><a href="tel:+5491168383333">+54 9 11 6838 3333</a></li>
			</ul>
		</div>
	</div>
	<div class="wrap pie__base">
		<p>© 2026 Codi</p>
	</div>
</footer>`;
}

/* ───────── el formulario ─────────
   Va al final de cada página, no a otra. Y viaja con el origen: saber que
   la consulta salió de Banca vale más que el nombre de quien la mandó.
   ═══════════════════════════════════════════════════════════════════ */

export function formulario(origen) {
	return `<form class="form" data-form data-origen="${esc(origen)}" novalidate>
				<div class="form__fila">
					<label class="campo">
						<span class="campo__rotulo">Nombre</span>
						<input type="text" name="nombre" autocomplete="name" required>
					</label>
					<label class="campo">
						<span class="campo__rotulo">Mail de trabajo</span>
						<input type="email" name="email" autocomplete="email" required>
					</label>
				</div>
				<label class="campo">
					<span class="campo__rotulo">Empresa <i>opcional</i></span>
					<input type="text" name="empresa" autocomplete="organization">
				</label>
				<label class="campo">
					<span class="campo__rotulo">Qué parte de tu operación querés resolver</span>
					<textarea name="mensaje" rows="3" required></textarea>
				</label>

				<div class="tarro" aria-hidden="true">
					<label>No completes esto<input type="text" name="empresa_web" tabindex="-1" autocomplete="off"></label>
				</div>

				<div class="form__pie">
					<button type="submit" class="btn btn--grande">Contanos</button>
					<p class="form__aviso" data-aviso role="status"></p>
				</div>
			</form>

			<div class="gracias" data-gracias hidden>
				<div class="gracias__codi" data-agente="viaja1" data-escala="8" aria-hidden="true"></div>
				<div>
					<p class="gracias__titulo">Listo, lo tenemos.</p>
					<p class="gracias__texto">Te escribimos a <b data-gracias-mail></b>. Si es urgente, WhatsApp al <a href="https://wa.me/5491168383333">+54 9 11 6838 3333</a>.</p>
				</div>
			</div>`;
}

/* ───────── una página de industria ───────── */

const OBJETOS = ['pila', 'cimiento', 'ventana', 'grafico'];

function paginaIndustria(ind) {
	const beneficios = ind.beneficios.map(([t, d], i) => `\t\t\t\t<article class="caso">
					<p class="caso__tag">0${i + 1}</p>
					<h3>${esc(t)}</h3>
					<p>${esc(d)}</p>
				</article>`).join('\n');

	const workflows = ind.workflows.map(([t, d], i) => `\t\t\t\t<article class="tarjeta" data-tarjeta tabindex="0">
					<div class="tarjeta__tarima">
						<div class="tarjeta__objeto" data-agente="${OBJETOS[i % 4]}" data-escala="7" aria-hidden="true"></div>
						<span class="tarjeta__piso"></span>
						<span class="posta posta--tarima" data-posta="wf-${i}"></span>
					</div>
					<h3>${esc(t)}</h3>
					<p class="tarjeta__texto" data-escribir>${esc(d)}</p>
				</article>`).join('\n');

	// Son información, no navegación: si parecen clickeables y llevan al
	// inicio, el que hace clic siente que se rompió algo.
	const porque = ind.porque.map(([t, d], i) => `\t\t\t\t<article class="enlace enlace--info">
					<span class="enlace__num">0${i + 1}</span>
					<h3>${esc(t)}</h3>
					<p>${esc(d)}</p>
				</article>`).join('\n');

	const hermanas = INDUSTRIAS.filter(o => o.slug !== ind.slug).map(o => `\t\t\t\t<a href="/industrias/${o.slug}/" class="rubro" data-rubro>
					<span class="rubro__icono" data-agente="${o.icono}" data-escala="6" aria-hidden="true"></span>
					<span class="posta posta--rubro" aria-hidden="true"></span>
					<h3>${esc(o.nombre)}</h3>
					<p>${esc(o.lead)}</p>
					<span class="rubro__ir">Ver ${esc(o.nombre.toLowerCase())}</span>
				</a>`).join('\n');

	const cuerpo = `	<section class="hero hero--interna">
		<div class="hero__campo" aria-hidden="true"></div>
		<div class="wrap">
			<p class="kicker kicker--vivo"><span class="kicker__pulso"></span><a href="/#industrias" class="kicker__volver">Industrias</a></p>
			<h1>${esc(ind.nombre)}</h1>
			<p class="lead">${esc(ind.lead)}</p>
			<div class="hero__cta">
				<a href="#hablemos" class="btn">Contanos tu operación</a>
				<a href="#workflows" class="btn btn--fantasma">Ver los workflows</a>
			</div>
			<div class="hero__marca" data-agente="${ind.icono}" data-escala="14" aria-hidden="true"></div>
			<span class="posta posta--hero" data-posta="hero"></span>
		</div>
	</section>

	<section class="seccion" data-zona="Beneficios">
		<div class="wrap">
			<header class="seccion__cab seccion__cab--posta">
				<span class="posta posta--seccion" data-posta="beneficios"></span>
				<p class="kicker">Beneficios</p>
				<h2>Qué cambia en tu operación.</h2>
			</header>
			<div class="casos">
${beneficios}
			</div>
		</div>
	</section>

	<section class="seccion seccion--panel" id="workflows" data-zona="Workflows">
		<div class="wrap">
			<header class="seccion__cab seccion__cab--posta">
				<span class="posta posta--seccion" data-posta="workflows"></span>
				<p class="kicker">Workflows</p>
				<h2>Los procesos que automatizamos primero.</h2>
			</header>
			<div class="trabajo">
${workflows}
			</div>
		</div>
	</section>

	<section class="seccion" data-zona="Por qué Codi">
		<div class="wrap">
			<header class="seccion__cab seccion__cab--posta">
				<span class="posta posta--seccion" data-posta="porque"></span>
				<p class="kicker">Por qué Codi</p>
				<h2>Por qué nos eligen en ${esc(ind.nombre.toLowerCase())}.</h2>
			</header>
			<div class="enlaces enlaces--cuatro">
${porque}
			</div>
		</div>
	</section>

	<section class="seccion seccion--panel" data-zona="Otras industrias">
		<div class="wrap">
			<header class="seccion__cab seccion__cab--posta">
				<span class="posta posta--seccion" data-posta="otras"></span>
				<p class="kicker">Otras industrias</p>
				<h2>El mismo agente, otro terreno.</h2>
			</header>
			<div class="rubros">
${hermanas}
			</div>
		</div>
	</section>

	<section class="cierre" id="hablemos" data-zona="Hablemos">
		<div class="wrap">
			<span class="posta posta--cierre" data-posta="cierre"></span>
			<h2>Contanos qué parte de tu operación te está comiendo el día.</h2>
			<p class="lead">Te decimos si un agente lo resuelve, cuánto sale y en cuánto tiempo. Si no lo resuelve, también te lo decimos.</p>
			${formulario(ind.nombre)}
			<p class="cierre__pie">O escribinos directo: <a href="mailto:info@codi.com.ar">info@codi.com.ar</a> · <a href="https://wa.me/5491168383333">+54 9 11 6838 3333</a></p>
		</div>
	</section>`;

	const jsonld = `\t<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Service","serviceType":"Agentes de IA para ${esc(ind.nombre)}","provider":{"@type":"Organization","name":"Codi","url":"${CODI}/"},"areaServed":"AR","description":"${esc(ind.lead)}","url":"${CODI}/industrias/${ind.slug}/"}
	</script>\n`;

	return molde({
		titulo: `Agentes de IA para ${ind.nombre} · Codi`,
		descripcion: ind.lead,
		ruta: `/industrias/${ind.slug}/`,
		cuerpo,
		jsonld
	});
}

/* ───────── una página de producto ───────── */

function bloque(b, n) {
	const cab = `\t\t\t<header class="seccion__cab seccion__cab--posta">
				<span class="posta posta--seccion" data-posta="b${n}"></span>
				<p class="kicker">${esc(b.kicker)}</p>
				<h2>${esc(b.h2)}</h2>
				${b.lead ? `<p class="lead">${esc(b.lead)}</p>` : ''}
			</header>`;

	let cuerpo;
	if (b.estilo === 'casos') {
		cuerpo = `\t\t\t<div class="casos">\n` + b.items.map(([t, d], i) =>
			`\t\t\t\t<article class="caso">
					<p class="caso__tag">0${i + 1}</p>
					<h3>${esc(t)}</h3>
					<p>${esc(d)}</p>
				</article>`).join('\n') + `\n\t\t\t</div>`;
	} else if (b.estilo === 'tarjetas') {
		cuerpo = `\t\t\t<div class="trabajo">\n` + b.items.map(([t, d], i) =>
			`\t\t\t\t<article class="tarjeta" data-tarjeta tabindex="0">
					<div class="tarjeta__tarima">
						<div class="tarjeta__objeto" data-agente="${OBJETOS[i % 4]}" data-escala="7" aria-hidden="true"></div>
						<span class="tarjeta__piso"></span>
						<span class="posta posta--tarima" data-posta="b${n}-${i}"></span>
					</div>
					<h3>${esc(t)}</h3>
					<p class="tarjeta__texto" data-escribir>${esc(d)}</p>
				</article>`).join('\n') + `\n\t\t\t</div>`;
	} else {
		cuerpo = `\t\t\t<div class="enlaces enlaces--cuatro">\n` + b.items.map(([t, d], i) =>
			`\t\t\t\t<article class="enlace enlace--info">
					<span class="enlace__num">0${i + 1}</span>
					<h3>${esc(t)}</h3>
					<p>${esc(d)}</p>
				</article>`).join('\n') + `\n\t\t\t</div>`;
	}

	const fondo = n % 2 === 0 ? ' seccion--panel' : '';
	return `\t<section class="seccion${fondo}" data-zona="${esc(b.kicker)}">\n\t\t<div class="wrap">\n${cab}\n${cuerpo}\n\t\t</div>\n\t</section>`;
}

function paginaProducto(p) {
	const otras = PRODUCTO.filter(o => o.slug !== p.slug).map(o =>
		`\t\t\t\t<a href="/${o.slug}/" class="rubro" data-rubro>
					<span class="rubro__icono" data-agente="${o.icono}" data-escala="6" aria-hidden="true"></span>
					<span class="posta posta--rubro" aria-hidden="true"></span>
					<h3>${esc(o.kicker)}</h3>
					<p>${esc(o.lead)}</p>
					<span class="rubro__ir">Ver ${esc(o.kicker.toLowerCase())}</span>
				</a>`).join('\n');

	const cuerpo = `	<section class="hero hero--interna">
		<div class="hero__campo" aria-hidden="true"></div>
		<div class="wrap">
			<p class="kicker kicker--vivo"><span class="kicker__pulso"></span><a href="/#plataforma" class="kicker__volver">${esc(p.kicker)}</a></p>
			<h1>${esc(p.h1)}</h1>
			<p class="lead">${esc(p.lead)}</p>
			<div class="hero__cta">
				<a href="#hablemos" class="btn">Contanos tu operación</a>
				<a href="/#ruta" class="btn btn--fantasma">Cómo lo implementamos</a>
			</div>
			<div class="hero__marca" data-agente="${p.icono}" data-escala="14" aria-hidden="true"></div>
			<span class="posta posta--hero" data-posta="hero"></span>
		</div>
	</section>

${p.bloques.map((b, i) => bloque(b, i)).join('\n\n')}

	<section class="seccion seccion--panel" data-zona="El resto">
		<div class="wrap">
			<header class="seccion__cab seccion__cab--posta">
				<span class="posta posta--seccion" data-posta="otras"></span>
				<p class="kicker">El resto de la plataforma</p>
				<h2>Las piezas se usan juntas.</h2>
			</header>
			<div class="rubros">
${otras}
			</div>
		</div>
	</section>

	<section class="cierre" id="hablemos" data-zona="Hablemos">
		<div class="wrap">
			<span class="posta posta--cierre" data-posta="cierre"></span>
			<h2>Contanos qué parte de tu operación te está comiendo el día.</h2>
			<p class="lead">Te decimos si un agente lo resuelve, cuánto sale y en cuánto tiempo. Si no lo resuelve, también te lo decimos.</p>
			${formulario(p.kicker)}
			<p class="cierre__pie">O escribinos directo: <a href="mailto:info@codi.com.ar">info@codi.com.ar</a> · <a href="https://wa.me/5491168383333">+54 9 11 6838 3333</a></p>
		</div>
	</section>`;

	return molde({
		titulo: `${p.kicker} · Codi`,
		descripcion: p.lead,
		ruta: `/${p.slug}/`,
		cuerpo
	});
}

/* ───────── /contacto/ ─────────
   El formulario vive al final de cada página, así que esta página ya no
   tiene razón de existir. No se borra: la URL puede estar indexada o
   linkeada desde afuera, y un 404 pierde esas visitas. Se redirige.
   ═══════════════════════════════════════════════════════════════════ */

function paginaContacto() {
	return `<!DOCTYPE html>
<html lang="es-AR">
<head>
	<meta charset="UTF-8"/>
	<title>Contacto · Codi</title>
	<link rel="canonical" href="${CODI}/#hablemos" />
	<meta name="robots" content="noindex, follow" />
	<meta http-equiv="refresh" content="0; url=/#hablemos" />
	<link rel="icon" type="image/svg+xml" href="/assets/img/favicon.svg">
	<style>
		body { margin:0; min-height:100vh; display:grid; place-items:center;
		       background:#0A0C0F; color:#94A2B2;
		       font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; }
		a { color:#6FD2FF; }
	</style>
</head>
<body>
	<p>El formulario está en la home. <a href="/#hablemos">Ir a Hablemos</a>.</p>
	<script>location.replace('/#hablemos');</script>
</body>
</html>
`;
}

/* ───────── a escribir ───────── */

let hechas = 0;
for (const ind of INDUSTRIAS) {
	const carpeta = join(RAIZ, 'industrias', ind.slug);
	mkdirSync(carpeta, { recursive: true });
	writeFileSync(join(carpeta, 'index.html'), paginaIndustria(ind));
	console.log('·', `/industrias/${ind.slug}/`);
	hechas++;
}
mkdirSync(join(RAIZ, 'contacto'), { recursive: true });
writeFileSync(join(RAIZ, 'contacto', 'index.html'), paginaContacto());
console.log('·', '/contacto/ (redirige a la home)');
hechas++;

for (const p of PRODUCTO) {
	const carpeta = join(RAIZ, p.slug);
	mkdirSync(carpeta, { recursive: true });
	writeFileSync(join(carpeta, 'index.html'), paginaProducto(p));
	console.log('·', `/${p.slug}/`);
	hechas++;
}
console.log(`\n${hechas} páginas generadas.`);
