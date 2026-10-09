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
import { EMPRESA } from '../contenido/empresa.mjs';
import { RUBROS, ESTUDIOS } from '../contenido/rubros.mjs';
import { readFileSync } from 'fs';

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
	<meta property="og:image" content="${CODI}/assets/og/codi.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="${esc(titulo)}" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="${esc(titulo)}" />
	<meta name="twitter:description" content="${esc(descripcion)}" />
	<meta name="twitter:image" content="${CODI}/assets/og/codi.png" />
	<meta name="theme-color" content="#FFFFFF">
	<link rel="icon" type="image/svg+xml" href="/assets/img/favicon.svg">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="/assets/css/main.css">
	<script>(function(){try{if(localStorage.getItem("codi-tema")==="oscuro")document.documentElement.setAttribute("data-tema","oscuro")}catch(e){}
		/* El sentido del barrido lo deja anotado la página que se va: pagereveal
		   dispara antes de que corra cualquier script propio. */
		var n=sessionStorage.getItem("codi-nav");if(n)document.documentElement.dataset.nav=n;})()</script>
${jsonld || ''}</head>
<body>

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
			<li><a href="/#agentes">Agentes</a></li>
			<li><a href="/#rubros">Rubros</a></li>
			<li><a href="/#ruta">Cómo funciona</a></li>
			<li><a href="/#casos">Casos</a></li>
		</ul>
		<div class="nav__acciones">
			<button class="tema" data-tema-boton aria-label="Pasar al modo oscuro" aria-pressed="false">
				<svg class="tema__ico tema__ico--luna" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M17 12.4A7.6 7.6 0 1 1 7.6 3a6 6 0 0 0 9.4 9.4z"/></svg><svg class="tema__ico tema__ico--sol" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><rect x="8" y="0" width="4" height="3"/><rect x="8" y="17" width="4" height="3"/><rect x="0" y="8" width="3" height="4"/><rect x="17" y="8" width="3" height="4"/><rect x="6" y="6" width="8" height="8"/></svg>
			</button>
			<a href="/#hablemos" class="btn btn--sm nav__cta">Hablemos</a>
		</div>
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
			<p>IA aplicada a las operaciones de las empresas. Desde Argentina.</p>
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
				<li><a href="/implementacion/">Implementación</a></li>
				<li><a href="/transformacion/">Transformación</a></li>
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
	/* El que llega hasta acá ya se convenció, y hasta ahora el único camino con
	   jerarquía era el formulario, que es el más lento. El WhatsApp existía como nota
	   al pie en gris, sin texto armado: a Rodrigo le llegaba un «Hola» pelado. Ahora
	   los dos caminos están arriba y el mensaje viaja con el origen, que es lo que
	   convierte un «Hola» en una charla que se puede contestar con algo concreto. */
	const texto = encodeURIComponent(
		`Hola Codi. Entré a la web, a la parte de ${origen}. Quiero saber si un agente `
		+ `me sirve para lo que tengo. Te cuento en qué se nos va el tiempo, ¿arrancamos?`);
	return `<div class="cierre__salidas">
				<a class="btn btn--grande" href="https://wa.me/5491168383333?text=${texto}" target="_blank" rel="noopener">Escribinos por WhatsApp</a>
				<a class="btn btn--fantasma btn--grande" href="mailto:info@codi.com.ar?subject=${encodeURIComponent('Consulta desde ' + origen)}&body=${texto}">Mandar un mail</a>
			</div>
			<p class="form__invita">O dejanos los datos y te escribimos nosotros.</p>
			<form class="form" data-form data-origen="${esc(origen)}" novalidate
				action="https://api.web3forms.com/submit" method="POST">
				<input type="hidden" name="access_key" value="5b366589-b055-42c8-aa10-73db464d729b">
				<input type="hidden" name="subject" value="Consulta desde la web de Codi">
				<div class="form__fila">
					<label class="campo">
						<span class="campo__rotulo">Nombre</span>
						<input type="text" name="nombre" autocomplete="name" required>
					</label>
					<label class="campo">
						<span class="campo__rotulo">Empresa <i>opcional</i></span>
						<input type="text" name="empresa" autocomplete="organization">
					</label>
				</div>
				<label class="campo">
					<span class="campo__rotulo">¿Por cuál agente nos escribís?</span>
					<select name="agente" required>
						<option value="">Elegí uno</option>
						<option>Contestar dónde está un pedido</option>
						<option>Recordar vencimientos y reclamar lo impago</option>
						<option>Dar turnos por WhatsApp</option>
						<option>Contestar consultas de propiedades</option>
						<option>Contestar a los compradores a cualquier hora</option>
						<option>Atender reclamos y avisar a una persona</option>
						<option>Cargar los comprobantes que llegan</option>
						<option>Cuadrar el banco contra el sistema</option>
						<option>Contestar datos internos por chat</option>
						<option>Todavía no sé / es otra cosa</option>
					</select>
				</label>
				<label class="campo">
					<span class="campo__rotulo">Tu mail</span>
					<input type="email" name="email" autocomplete="email" required>
				</label>
				<label class="campo">
					<span class="campo__rotulo">Contanos un poco más <i>opcional</i></span>
					<textarea name="mensaje" rows="3"></textarea>
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
				<div class="gracias__cuerpo">
					<p class="gracias__titulo">Nos llegó tu mensaje.</p>
					<p class="gracias__texto">Te contestamos a <b data-gracias-mail></b>.</p>
					<p class="gracias__texto">Si querés acortar los tiempos, seguimos por WhatsApp.</p>
					<a class="btn gracias__wa" href="https://wa.me/5491168383333?text=Hola%20Codi.%20Acabo%20de%20dejar%20mis%20datos%20en%20la%20web%20y%20quiero%20ir%20m%C3%A1s%20r%C3%A1pido.%20%C2%BFLo%20vemos%20por%20ac%C3%A1%3F" target="_blank" rel="noopener">Seguir por WhatsApp</a>
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
			<h2>Contanos qué parte de tu operación se lleva más horas.</h2>
			<p class="lead">Te decimos si un agente lo resuelve, cuánto sale y en cuánto tiempo. Si no lo resuelve, también te lo decimos.</p>
			${formulario(ind.nombre)}
			<p class="cierre__pie">O escribinos directo: <a href="mailto:info@codi.com.ar">info@codi.com.ar</a> · <a href="https://wa.me/5491168383333?text=Hola%20Codi.%20Entr%C3%A9%20a%20la%20web%20y%20quiero%20saber%20si%20un%20agente%20me%20sirve%20para%20lo%20que%20tengo.%20Te%20cuento%20en%20qu%C3%A9%20se%20nos%20va%20el%20tiempo%2C%20%C2%BFarrancamos%3F" target="_blank" rel="noopener">+54 9 11 6838 3333</a></p>
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

function paginaProducto(p, familia, volverA, rotuloOtras) {
	const otras = familia.filter(o => o.slug !== p.slug).map(o =>
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
			<p class="kicker kicker--vivo"><span class="kicker__pulso"></span><a href="${volverA}" class="kicker__volver">${esc(p.kicker)}</a></p>
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
				<p class="kicker">${esc(rotuloOtras)}</p>
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
			<h2>Contanos qué parte de tu operación se lleva más horas.</h2>
			<p class="lead">Te decimos si un agente lo resuelve, cuánto sale y en cuánto tiempo. Si no lo resuelve, también te lo decimos.</p>
			${formulario(p.kicker)}
			<p class="cierre__pie">O escribinos directo: <a href="mailto:info@codi.com.ar">info@codi.com.ar</a> · <a href="https://wa.me/5491168383333?text=Hola%20Codi.%20Entr%C3%A9%20a%20la%20web%20y%20quiero%20saber%20si%20un%20agente%20me%20sirve%20para%20lo%20que%20tengo.%20Te%20cuento%20en%20qu%C3%A9%20se%20nos%20va%20el%20tiempo%2C%20%C2%BFarrancamos%3F" target="_blank" rel="noopener">+54 9 11 6838 3333</a></p>
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

/* ───────── los rubros ─────────
   Una página por rubro, más dos secciones de la home que salen del mismo
   dato: la franja de estudios y la grilla de rubros. Se escriben entre
   marcadores dentro de index.html, así la home y las páginas no se
   contradicen nunca.
   ═══════════════════════════════════════════════════════════════════ */

function datoRubro(r) {
	if (!r.dato) return `<p class="dato dato--sin">${esc(r.sinDato)}</p>`;
	return `<div class="dato">
				<p class="dato__cifra">${esc(r.dato.cifra)}</p>
				<p class="dato__texto">${esc(r.dato.texto)}</p>
				<p class="dato__fuente">Fuente: <a href="${r.dato.url}" target="_blank" rel="noopener">${esc(r.dato.fuente)}</a></p>
			</div>`;
}

function paginaRubro(r) {
	const pasos = r.pasos.map(([t, d], i) => `\t\t\t\t<article class="enlace enlace--info">
					<span class="enlace__num">0${i + 1}</span>
					<h3>${esc(t)}</h3>
					<p>${esc(d)}</p>
				</article>`).join('\n');

	const escenas = r.escenas.map(([cuando, que]) => `\t\t\t\t<article class="caso">
					<p class="caso__tag">${esc(cuando)}</p>
					<p>${esc(que)}</p>
				</article>`).join('\n');

	const otros = RUBROS.filter(o => o.slug !== r.slug).map(o => `\t\t\t\t<a href="/rubros/${o.slug}/" class="rubro" data-rubro>
					<span class="rubro__icono" data-agente="${o.icono}" data-escala="6" aria-hidden="true"></span>
					<span class="posta posta--rubro" aria-hidden="true"></span>
					<h3>${esc(o.nombre)}</h3>
					<p>${esc(o.proceso)}</p>
					<span class="rubro__ir">Ver ${esc(o.nombre.toLowerCase())}</span>
				</a>`).join('\n');

	const cuerpo = `	<section class="hero hero--interna">
		<div class="hero__campo" aria-hidden="true"></div>
		<div class="wrap">
			<p class="kicker kicker--vivo"><span class="kicker__pulso"></span><a href="/#rubros" class="kicker__volver">${esc(r.nombre)}</a></p>
			<h1>${esc(r.gancho)}</h1>
			<p class="lead">${esc(r.lead)}</p>
			<div class="hero__cta">
				<a href="#hablemos" class="btn">Contanos tu operación</a>
				<a href="#como" class="btn btn--fantasma">Cómo funciona</a>
			</div>
			<div class="hero__marca" data-agente="${r.icono}" data-escala="14" aria-hidden="true"></div>
			<span class="posta posta--hero" data-posta="hero"></span>
		</div>
	</section>

	<section class="seccion seccion--panel" data-zona="El problema">
		<div class="wrap">
			<header class="seccion__cab seccion__cab--posta">
				<span class="posta posta--seccion" data-posta="problema"></span>
				<p class="kicker">El problema</p>
				<h2>Lo que se pierde hoy.</h2>
			</header>
			${datoRubro(r)}
		</div>
	</section>

	<section class="seccion" id="como" data-zona="Cómo funciona">
		<div class="wrap">
			<header class="seccion__cab seccion__cab--posta">
				<span class="posta posta--seccion" data-posta="como"></span>
				<p class="kicker">Qué hace el agente</p>
				<h2>Paso por paso.</h2>
			</header>
			<div class="enlaces enlaces--cuatro">
${pasos}
			</div>
		</div>
	</section>

	<section class="seccion seccion--panel" data-zona="Un día cualquiera">
		<div class="wrap">
			<header class="seccion__cab seccion__cab--posta">
				<span class="posta posta--seccion" data-posta="escenas"></span>
				<p class="kicker">Un día cualquiera</p>
				<h2>Así se ve andando.</h2>
			</header>
			<div class="casos casos--dos">
${escenas}
			</div>
		</div>
	</section>

	<section class="seccion" data-zona="Otros rubros">
		<div class="wrap">
			<header class="seccion__cab seccion__cab--posta">
				<span class="posta posta--seccion" data-posta="otros"></span>
				<p class="kicker">Otros rubros</p>
				<h2>Las mismas piezas, otro negocio.</h2>
			</header>
			<div class="rubros">
${otros}
			</div>
		</div>
	</section>

	<section class="cierre" id="hablemos" data-zona="Hablemos">
		<div class="wrap">
			<span class="posta posta--cierre" data-posta="cierre"></span>
			<h2>Contanos cómo trabaja hoy tu equipo.</h2>
			<p class="lead">Te decimos qué parte puede tomar un agente, cuánto sale y en cuánto tiempo está andando.</p>
			${formulario(r.nombre)}
			<p class="cierre__pie">O escribinos directo: <a href="mailto:info@codi.com.ar">info@codi.com.ar</a> · <a href="https://wa.me/5491168383333?text=Hola%20Codi.%20Entr%C3%A9%20a%20la%20web%20y%20quiero%20saber%20si%20un%20agente%20me%20sirve%20para%20lo%20que%20tengo.%20Te%20cuento%20en%20qu%C3%A9%20se%20nos%20va%20el%20tiempo%2C%20%C2%BFarrancamos%3F" target="_blank" rel="noopener">+54 9 11 6838 3333</a></p>
		</div>
	</section>`;

	return molde({
		titulo: `Agentes de IA para ${r.nombre.toLowerCase()} · Codi`,
		descripcion: r.lead,
		ruta: `/rubros/${r.slug}/`,
		cuerpo
	});
}

function seccionEstudios() {
	const items = ESTUDIOS.map(e => `\t\t\t\t<li>
					<strong>${esc(e.cifra)}</strong>
					<span>${esc(e.texto)}</span>
					<a href="${e.url}" target="_blank" rel="noopener">${esc(e.fuente)}</a>
				</li>`).join('\n');
	return `	<section class="estudios" aria-label="Estudios del sector">
		<div class="wrap">
			<p class="estudios__rotulo">Estudios del sector</p>
			<ul class="estudios__lista">
${items}
			</ul>
		</div>
	</section>
`;
}

function seccionRubros() {
	const tarjetas = RUBROS.map(r => `\t\t\t\t<a href="/rubros/${r.slug}/" class="rubro" data-rubro>
					<span class="rubro__icono" data-agente="${r.icono}" data-escala="6" aria-hidden="true"></span>
					<span class="posta posta--rubro" aria-hidden="true"></span>
					<h3>${esc(r.nombre)}</h3>
					<p>${esc(r.proceso)}</p>
					<span class="rubro__ir">Ver cómo funciona</span>
				</a>`).join('\n');

	// Las industrias reguladas eran una sección aparte que decía lo mismo con otras
	// palabras. Van acá abajo, como lista: son páginas para leer, no tarjetas para elegir.
	const reguladas = INDUSTRIAS.map(ind =>
		`\t\t\t\t\t<li><a href="/industrias/${ind.slug}/">${esc(ind.nombre)}</a></li>`).join('\n');

	return `	<section class="seccion" id="rubros" data-zona="Rubros">
		<div class="wrap">
			<header class="seccion__cab seccion__cab--posta">
				<span class="posta posta--seccion" data-posta="rubros"></span>
				<p class="kicker">Agentes por rubro</p>
				<h2>Lo que resolvemos, rubro por rubro.</h2>
			</header>
			<div class="rubros rubros--cuatro">
${tarjetas}
			</div>
			<div class="reguladas">
				<span class="ancla" id="industrias" aria-hidden="true"></span>
				<p class="reguladas__intro">También en industrias donde un error no se perdona, cada una con su página:</p>
				<ul class="reguladas__lista">
${reguladas}
				</ul>
			</div>
		</div>
	</section>
`;
}

function inyectar(html, nombre, contenido) {
	const ini = `<!-- GENERADO:${nombre} -->`, fin = `<!-- /GENERADO:${nombre} -->`;
	const a = html.indexOf(ini), b = html.indexOf(fin);
	if (a < 0 || b < a) throw new Error('falta el marcador ' + nombre + ' en index.html');
	return html.slice(0, a + ini.length) + '\n' + contenido + '\t' + html.slice(b);
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
	writeFileSync(join(carpeta, 'index.html'), paginaProducto(p, PRODUCTO, '/#plataforma', 'El resto de la plataforma'));
	console.log('·', `/${p.slug}/`);
	hechas++;
}
for (const p of EMPRESA) {
	const carpeta = join(RAIZ, p.slug);
	mkdirSync(carpeta, { recursive: true });
	writeFileSync(join(carpeta, 'index.html'), paginaProducto(p, EMPRESA, '/', 'Seguir leyendo'));
	console.log('·', `/${p.slug}/`);
	hechas++;
}

/* El índice de industrias: la puerta de entrada a las seis. */
{
	const tarjetas = INDUSTRIAS.map(o => `\t\t\t\t<a href="/industrias/${o.slug}/" class="rubro" data-rubro>
					<span class="rubro__icono" data-agente="${o.icono}" data-escala="6" aria-hidden="true"></span>
					<span class="posta posta--rubro" aria-hidden="true"></span>
					<h3>${esc(o.nombre)}</h3>
					<p>${esc(o.lead)}</p>
					<span class="rubro__ir">Ver ${esc(o.nombre.toLowerCase())}</span>
				</a>`).join('\n');

	const cuerpo = `	<section class="hero hero--interna">
		<div class="hero__campo" aria-hidden="true"></div>
		<div class="wrap">
			<p class="kicker kicker--vivo"><span class="kicker__pulso"></span><a href="/" class="kicker__volver">Industrias</a></p>
			<h1>Donde ya corren nuestros agentes.</h1>
			<p class="lead">Seis industrias donde un error no se perdona. En todas, el agente toca sistemas de verdad: lee, decide y ejecuta.</p>
			<div class="hero__cta">
				<a href="#hablemos" class="btn">Contanos tu operación</a>
				<a href="/#ruta" class="btn btn--fantasma">Cómo lo implementamos</a>
			</div>
			<span class="posta posta--hero" data-posta="hero"></span>
		</div>
	</section>

	<section class="seccion seccion--panel" data-zona="Industrias">
		<div class="wrap">
			<header class="seccion__cab seccion__cab--posta">
				<span class="posta posta--seccion" data-posta="lista"></span>
				<p class="kicker">Las seis</p>
				<h2>Cada una con sus workflows.</h2>
			</header>
			<div class="rubros">
${tarjetas}
			</div>
		</div>
	</section>

	<section class="cierre" id="hablemos" data-zona="Hablemos">
		<div class="wrap">
			<span class="posta posta--cierre" data-posta="cierre"></span>
			<h2>Contanos qué parte de tu operación se lleva más horas.</h2>
			<p class="lead">Te decimos si un agente lo resuelve, cuánto sale y en cuánto tiempo. Si no lo resuelve, también te lo decimos.</p>
			${formulario('Industrias')}
			<p class="cierre__pie">O escribinos directo: <a href="mailto:info@codi.com.ar">info@codi.com.ar</a> · <a href="https://wa.me/5491168383333?text=Hola%20Codi.%20Entr%C3%A9%20a%20la%20web%20y%20quiero%20saber%20si%20un%20agente%20me%20sirve%20para%20lo%20que%20tengo.%20Te%20cuento%20en%20qu%C3%A9%20se%20nos%20va%20el%20tiempo%2C%20%C2%BFarrancamos%3F" target="_blank" rel="noopener">+54 9 11 6838 3333</a></p>
		</div>
	</section>`;

	mkdirSync(join(RAIZ, 'industrias'), { recursive: true });
	writeFileSync(join(RAIZ, 'industrias', 'index.html'), molde({
		titulo: 'Industrias · Codi',
		descripcion: 'Seis industrias donde ya corren agentes de Codi: banca, telecom, salud, energía, seguros y retail.',
		ruta: '/industrias/',
		cuerpo
	}));
	console.log('·', '/industrias/');
	hechas++;
}

for (const r of RUBROS) {
	const carpeta = join(RAIZ, 'rubros', r.slug);
	mkdirSync(carpeta, { recursive: true });
	writeFileSync(join(carpeta, 'index.html'), paginaRubro(r));
	console.log('·', `/rubros/${r.slug}/`);
	hechas++;
}

// la home: sólo las dos secciones que salen de los datos
{
	const ruta = join(RAIZ, 'index.html');
	let home = readFileSync(ruta, 'utf8');
	home = inyectar(home, 'estudios', seccionEstudios());
	home = inyectar(home, 'rubros', seccionRubros());
	writeFileSync(ruta, home);
	console.log('·', '/ (estudios y rubros)');
}

console.log(`\n${hechas} páginas generadas.`);
