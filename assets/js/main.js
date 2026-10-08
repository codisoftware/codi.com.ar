/* ═══════════════════════════════════════════════════════════
   CODI · el agente que viaja por la página
   Todo el contenido se sirve visible. El JS realza, no revela.
   ═══════════════════════════════════════════════════════════ */

(function () {
	'use strict';

	document.body.classList.add('js');

	var quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	/* ───────── el elenco · pocos píxeles, bien grandes ───────── */

	var ELENCO = {
		/* dos fotogramas del que viaja: el visor late y los pies alternan */
		viaja1: [
			'.#....#.',
			'.######.',
			'########',
			'#oooooo#',
			'########',
			'##.##.##',
			'.#....#.',
			'##....##'
		],
		viaja2: [
			'.#....#.',
			'.######.',
			'########',
			'#.oooo.#',
			'########',
			'##.##.##',
			'..#..#..',
			'.##..##.'
		],
		/* los iconos de cada rubro */
		camion: [
			'........',
			'######..',
			'######..',
			'######o#',
			'########',
			'.##..##.',
			'.##..##.',
			'........'
		],
		cruzsola: [
			'........',
			'..oooo..',
			'..oooo..',
			'oooooooo',
			'oooooooo',
			'..oooo..',
			'..oooo..',
			'........'
		],
		paquete: [
			'########',
			'#......#',
			'###oo###',
			'###oo###',
			'###oo###',
			'###oo###',
			'#......#',
			'########'
		],
		auricular: [
			'..####..',
			'.#....#.',
			'##.##.##',
			'##....##',
			'##.oo.##',
			'.#....#.',
			'..#oo#..',
			'..####..'
		],
		carpeta: [
			'........',
			'###.....',
			'########',
			'#......#',
			'#.oooo.#',
			'#......#',
			'#......#',
			'########'
		],
		equipo: [
			'##.##.##',
			'##.##.##',
			'........',
			'oooooooo',
			'oo.oo.oo',
			'oo.oo.oo',
			'oo.oo.oo',
			'........'
		],
		casa: [
			'...##...',
			'..####..',
			'.######.',
			'########',
			'.#o##o#.',
			'.#o##o#.',
			'.##..##.',
			'.##..##.'
		],
		auto: [
			'........',
			'..####..',
			'.#oo#o#.',
			'########',
			'########',
			'#o####o#',
			'.##..##.',
			'........'
		],
		caja: [
			'.######.',
			'#oo##oo#',
			'########',
			'#..oo..#',
			'#..oo..#',
			'#......#',
			'#......#',
			'########'
		],

		/* los iconos de cada industria */
		banca: [
			'...##...',
			'..####..',
			'.oooooo.',
			'########',
			'.#.##.#.',
			'.#.##.#.',
			'.#.##.#.',
			'########'
		],
		antena: [
			'#o....o#',
			'.#o..o#.',
			'..#..#..',
			'...##...',
			'...##...',
			'..####..',
			'.######.',
			'.######.'
		],
		cruz: [
			'.######.',
			'.##oo##.',
			'.##oo##.',
			'.oooooo.',
			'.oooooo.',
			'.##oo##.',
			'.##oo##.',
			'.######.'
		],
		rayo: [
			'....###.',
			'...###..',
			'..###...',
			'.oooooo.',
			'...###..',
			'..###...',
			'.###....',
			'##......'
		],
		escudo: [
			'.######.',
			'########',
			'##oooo##',
			'##oooo##',
			'########',
			'.######.',
			'..####..',
			'...##...'
		],
		bolsa: [
			'..#..#..',
			'.#....#.',
			'########',
			'#......#',
			'#.o..o.#',
			'#......#',
			'#......#',
			'########'
		],

		/* los objetos de cada forma de trabajo */
		pila: [
			'########',
			'#.....o#',
			'########',
			'........',
			'########',
			'#.....o#',
			'########',
			'........'
		],
		cimiento: [
			'..oooo..',
			'..oooo..',
			'........',
			'.######.',
			'.######.',
			'........',
			'########',
			'########'
		],
		ventana: [
			'########',
			'#oo....#',
			'########',
			'#......#',
			'#.####.#',
			'#.####.#',
			'#......#',
			'########'
		],
		grafico: [
			'........',
			'......oo',
			'......oo',
			'...##.oo',
			'...##.oo',
			'##.##.oo',
			'##.##.oo',
			'########'
		],
		operador: [
			'..####..',
			'.######.',
			'##o##o##',
			'########',
			'##.##.##',
			'.######.',
			'.#....#.',
			'##....##'
		],
		constructor: [
			'.#....#.',
			'.######.',
			'########',
			'#oooooo#',
			'########',
			'##.##.##',
			'.#....#.',
			'##....##'
		],
		lente: [
			'...#....',
			'..####..',
			'.######.',
			'.#oooo#.',
			'.#oooo#.',
			'.######.',
			'..#..#..',
			'.##..##.'
		],
		medidor: [
			'.#....#.',
			'.######.',
			'########',
			'#o#oo#o#',
			'########',
			'#.#..#.#',
			'.######.',
			'##....##'
		],
		c: [
			'..oooo..',
			'.oo..oo.',
			'oo....oo',
			'oo......',
			'oo......',
			'oo....oo',
			'.oo..oo.',
			'..oooo..'
		]
	};

	var SVG_NS = 'http://www.w3.org/2000/svg';

	function dibujar(mapa, escala) {
		var filas = mapa.length, cols = mapa[0].length;
		// Sin separación entre píxeles: el hueco los volvía cuadraditos sueltos, y eso se
		// lee como juguete. Pegados, cada dibujo es una forma sólida.
		var lado = escala;

		var svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttribute('class', 'px-agente');
		// los bordes del píxel no se interpolan: si no, aparecen costuras grises entre bloques
		svg.setAttribute('shape-rendering', 'crispEdges');
		svg.setAttribute('width', cols * escala);
		svg.setAttribute('height', filas * escala);
		svg.setAttribute('viewBox', '0 0 ' + cols * escala + ' ' + filas * escala);

		for (var y = 0; y < filas; y++) {
			for (var x = 0; x < cols; x++) {
				var ch = mapa[y][x];
				if (ch === '.') continue;
				var r = document.createElementNS(SVG_NS, 'rect');
				r.setAttribute('x', x * escala);
				r.setAttribute('y', y * escala);
				r.setAttribute('width', lado);
				r.setAttribute('height', lado);
				if (ch === 'o') r.setAttribute('class', 'acc');
				svg.appendChild(r);
			}
		}
		return svg;
	}

	document.querySelectorAll('[data-agente]').forEach(function (nodo) {
		var mapa = ELENCO[nodo.dataset.agente];
		if (!mapa) return;
		nodo.appendChild(dibujar(mapa, parseInt(nodo.dataset.escala, 10) || 4));
	});

	/* ───────── el sentido del barrido entre páginas ─────────
	   Lo anota la página que se va, porque la que entra no llega a tiempo:
	   pagereveal dispara antes que cualquier script del documento nuevo. */
	if (!quieto) {
		var anotarNav = function (v) {
			try { sessionStorage.setItem('codi-nav', v); } catch (err) {}
		};

		// un clic en un link del sitio es ir hacia adelante
		document.addEventListener('click', function (e) {
			var a = e.target.closest && e.target.closest('a[href]');
			if (!a || a.target === '_blank') return;
			if (a.origin && a.origin !== location.origin) return;
			if (a.getAttribute('href').charAt(0) === '#') return;
			anotarNav('adelante');
		}, true);

		// y el historial, hacia atrás
		if ('onpageswap' in window) {
			window.addEventListener('pageswap', function (e) {
				var act = e.activation;
				if (!act || act.navigationType !== 'traverse') return;
				// dentro del historial hay que mirar el índice: el botón
				// 'adelante' también es un traverse, y va para el otro lado
				var atras = !!(act.from && act.entry && act.from.index > act.entry.index);
				anotarNav(atras ? 'atras' : 'adelante');
			});
		}
	}

	/* ═══════════ claro y oscuro ═══════════ */

	var GUARDADO = 'codi-tema';
	var botonTema = document.querySelector('[data-tema-boton]');

	function ponerTema(t) {
		if (t === 'oscuro') document.documentElement.setAttribute('data-tema', 'oscuro');
		else document.documentElement.removeAttribute('data-tema');
		try { localStorage.setItem(GUARDADO, t); } catch (e) {}
		if (botonTema) {
			botonTema.setAttribute('aria-label', t === 'oscuro' ? 'Pasar al modo claro' : 'Pasar al modo oscuro');
			botonTema.setAttribute('aria-pressed', t === 'oscuro' ? 'true' : 'false');
		}
	}
	/* El tema nuevo PISA al viejo, no lo tapa.

	   El telón anterior cubría la pantalla entera con un color plano antes de
	   cambiar: por un instante no se veía nada. Con View Transitions el
	   navegador queda con dos capas encima, la de antes y la de después, las
	   dos con el contenido puesto, y nosotros sólo recortamos la de arriba.
	   Nunca hay un cuadro en blanco ni en negro: se ve el mismo texto pasando
	   de un tema al otro, por columnas de píxeles.

	   Donde no exista la API, el cambio es instantáneo y listo: es preferible
	   a inventar un efecto que tape. */

	function columnas(p, n) {
		var altos = [];
		var arrastre = 0.55;   // cuánto se demora la última columna respecto de la primera
		for (var i = 0; i < n; i++) {
			var atraso = (i / (n - 1)) * arrastre;
			var k = (p - atraso) / (1 - arrastre);
			altos.push(Math.max(0, Math.min(1, k)) * 100);
		}

		var pts = ['0% 0%', '100% 0%'];
		for (var q = n - 1; q >= 0; q--) {
			pts.push(((q + 1) / n * 100).toFixed(2) + '% ' + altos[q].toFixed(2) + '%');
			pts.push((q / n * 100).toFixed(2) + '% ' + altos[q].toFixed(2) + '%');
		}
		return 'polygon(' + pts.join(', ') + ')';
	}

	function telon(cambiar) {
		if (quieto || !document.startViewTransition) { cambiar(); return; }

		/* El tema recorta la raíz entera. Con el header y el cuerpo nombrados
		   quedarían fuera de ese grupo y el recorte no los tocaría, así que
		   les soltamos el nombre mientras dura y se los devolvemos después. */
		var partes = [document.querySelector('.nav'), document.querySelector('main')];
		partes.forEach(function (el) { if (el) el.style.viewTransitionName = 'none'; });

		var paso = document.startViewTransition(cambiar);
		paso.finished.finally(function () {
			partes.forEach(function (el) { if (el) el.style.viewTransitionName = ''; });
		});

		paso.ready.then(function () {
			var barras = Math.max(12, Math.round(window.innerWidth / 70));
			var cuadros = [];
			for (var k = 0; k <= 24; k++) cuadros.push(columnas(k / 24, barras));

			document.documentElement.animate(
				{ clipPath: cuadros },
				{
					duration: 720,
					easing: 'cubic-bezier(.35, 0, .2, 1)',
					pseudoElement: '::view-transition-new(root)'
				}
			);
		}).catch(function () {});
	}

	if (botonTema) {
		botonTema.addEventListener('click', function () {
			var oscuroAhora = document.documentElement.hasAttribute('data-tema');
			telon(function () { ponerTema(oscuroAhora ? 'claro' : 'oscuro'); });
		});
		// deja el aria al día con lo que ya aplicó el script del <head>
		ponerTema(document.documentElement.hasAttribute('data-tema') ? 'oscuro' : 'claro');
	}

	/* ───────── nav ───────── */

	var nav = document.querySelector('.nav');
	var toggle = document.querySelector('.nav__toggle');
	var links = document.querySelector('.nav__links');

	if (toggle && links) {
		toggle.addEventListener('click', function () {
			var abierto = links.classList.toggle('abierto');
			toggle.setAttribute('aria-expanded', abierto ? 'true' : 'false');
		});
	}

	if (nav) {
		var sombra = function () { nav.classList.toggle('pegado', window.scrollY > 12); };
		sombra();
		window.addEventListener('scroll', sombra, { passive: true });
	}

	/* ───────── el viaje a una sección, con curva propia ─────────
	   El scroll suave del navegador es lineal y se nota. Este arranca
	   despacio, corre por el medio y frena antes de llegar.
	   ═══════════════════════════════════════════════════════════ */

	document.documentElement.style.scrollBehavior = 'auto';

	function irA(destinoY) {
		var inicio = window.scrollY;
		var salto = destinoY - inicio;
		if (Math.abs(salto) < 2) return;

		var dur = Math.min(1500, 560 + Math.abs(salto) * 0.24);
		var t0 = performance.now();

		requestAnimationFrame(function paso(ahora) {
			var k = Math.min(1, (ahora - t0) / dur);
			var e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
			window.scrollTo(0, inicio + salto * e);
			if (k < 1) requestAnimationFrame(paso);
		});
	}

	document.querySelectorAll('a[href^="#"]').forEach(function (a) {
		a.addEventListener('click', function (e) {
			var destino = document.querySelector(a.getAttribute('href'));
			if (!destino) return;
			e.preventDefault();

			if (links) links.classList.remove('abierto');
			if (toggle) toggle.setAttribute('aria-expanded', 'false');

			var y = destino.getBoundingClientRect().top + window.scrollY - 64;
			if (quieto) window.scrollTo(0, y);
			else irA(y);
		});
	});

	/* ───────── el efecto de escritura ─────────
	   El texto vive entero en el HTML y recién se parte en letras al
	   activarse, así el prerender y quien no tenga JS lo leen igual.
	   ═══════════════════════════════════════════════════════════ */

	function partir(p) {
		if (!p || p.dataset.partido) return;
		p.dataset.partido = '1';

		var texto = p.textContent;
		p.textContent = '';
		texto.split('').forEach(function (ch) {
			var s = document.createElement('span');
			s.className = 'letra';
			s.textContent = ch;
			p.appendChild(s);
		});
	}

	function escribir(p, demora) {
		if (!p || p.dataset.escrito) return;
		p.dataset.escrito = '1';
		partir(p);

		var letras = p.querySelectorAll('.letra');
		if (demora) {
			setTimeout(function () { correr(p, letras); }, demora);
			return;
		}
		correr(p, letras);
	}

	function correr(p, letras) {
		p.classList.add('tipeando');

		var i = 0;
		var reloj = setInterval(function () {
			if (i > 0) letras[i - 1].classList.remove('cursor');

			for (var k = 0; k < 3 && i < letras.length; k++, i++) {
				letras[i].classList.add('puesta');
			}

			if (i >= letras.length) {
				clearInterval(reloj);
				p.classList.remove('tipeando');
			} else {
				// el cursor acompaña a la letra que se acaba de escribir
				letras[i - 1].classList.add('cursor');
			}
		}, 16);
	}

	function reescribir(p, demora) {
		if (!p) return;
		delete p.dataset.escrito;
		p.querySelectorAll('.letra').forEach(function (l) { l.classList.remove('puesta', 'cursor'); });
		escribir(p, demora);
	}

	/* ───────── la ruta ─────────
	   La escena no se scrubbea con el scroll: cuando entra en pantalla corre
	   sola. Antes había que seguir scrolleando para que pasara algo, y una
	   animación que depende de que el otro siga moviendo la rueda se lee
	   como que está trabada.
	   ═══════════════════════════════════════════════════════════════════ */

	var ruta = document.querySelector('[data-ruta]');
	var linea = document.querySelector('[data-linea]');
	var svgRuta = document.querySelector('.ruta__svg');
	var hitos = Array.prototype.slice.call(document.querySelectorAll('[data-hito]'));
	var nodos = Array.prototype.slice.call(document.querySelectorAll('[data-nodo]'));

	var largo = 0;
	var trazoActual = 0;
	var escenaViva = false;
	var enNodo = [0, 0, 0];   // en qué punto del camino cae cada fase

	/* Dónde cae cada nodo sobre el camino, buscando el punto más cercano. */
	function ubicarNodos() {
		if (!linea || !largo) return;
		nodos.forEach(function (n, i) {
			var cx = parseFloat(n.getAttribute('x')) + parseFloat(n.getAttribute('width')) / 2;
			var cy = parseFloat(n.getAttribute('y')) + parseFloat(n.getAttribute('height')) / 2;
			var mejor = 0, dist = Infinity;
			for (var l = 0; l <= largo; l += 2) {
				var pt = linea.getPointAtLength(l);
				var d = (pt.x - cx) * (pt.x - cx) + (pt.y - cy) * (pt.y - cy);
				if (d < dist) { dist = d; mejor = l; }
			}
			enNodo[i] = mejor / largo;
		});
	}

	function pintarLinea() {
		if (!linea || !largo) return;
		/* Sólo el tramo recorrido. El hueco es enorme a propósito: con un
		   hueco del largo del camino, el patrón alcanzaba a repetirse y
		   dejaba un pedazo de línea suelto a la derecha. */
		linea.style.strokeDasharray = (largo * trazoActual).toFixed(2) + ' 99999';
	}

	/* Un solo barrido, sin frenar en cada fase: la línea sale y no para
	   hasta el final. Cada fase se prende cuando la línea le pasa por
	   encima, así el movimiento se lee continuo y los puntos van
	   apareciendo solos mientras scrolleás. */
	function correrEscena() {
		if (escenaViva || !linea || !largo) return;
		escenaViva = true;

		var DURACION = 3000;
		var prendidas = [];

		var t0 = performance.now();
		requestAnimationFrame(function paso(ahora) {
			var k = Math.min(1, (ahora - t0) / DURACION);

			// arranca enseguida y afloja al final: sin frenada al medio
			trazoActual = 1 - Math.pow(1 - k, 2.2);
			pintarLinea();

			hitos.forEach(function (h, i) {
				if (prendidas[i] || trazoActual < enNodo[i]) return;
				prendidas[i] = true;
				h.classList.add('encendido');
				if (nodos[i]) nodos[i].classList.add('vivo');
				escribir(h.querySelector('[data-escribir]'));
			});

			if (k < 1) requestAnimationFrame(paso);
		});
	}

	function medirRuta() {
		if (!ruta || !linea) return;
		largo = linea.getTotalLength();
		ubicarNodos();
		pintarLinea();
	}

	if (ruta && linea) {
		if (quieto) {
			// sin movimiento: el camino entero dibujado y las tres fases a la vista
			requestAnimationFrame(function () {
				largo = linea.getTotalLength();
				trazoActual = 1;
				linea.style.strokeDasharray = 'none';
				hitos.forEach(function (h) { h.classList.add('encendido'); });
				nodos.forEach(function (n) { n.classList.add('vivo'); });
			});
		} else {
			requestAnimationFrame(medirRuta);
			window.addEventListener('resize', medirRuta);
			window.addEventListener('load', medirRuta);

			new IntersectionObserver(function (entradas, obs) {
				entradas.forEach(function (e) {
					if (!e.isIntersecting) return;
					obs.disconnect();
					medirRuta();
					correrEscena();
				});
			}, { threshold: 0.35 }).observe(ruta);
		}
	}

	/* ═══════════ el agente viaja de posta en posta ═══════════ */

	var viajero = document.querySelector('[data-viajero]');
	var postas = Array.prototype.slice.call(document.querySelectorAll('[data-posta]'));

	/* A quién está mirando el cursor ahora mismo. Antes esto se leía del DOM
	   con '.activa .posta', y como la tarjeta de "qué hacemos" queda activa
	   para siempre y está primera en la página, se quedaba con el bicho: ni
	   las industrias ni las de plataforma se lo podían llevar. */
	var enfocada = null;

	function mirar(el) { enfocada = el; }
	function soltar() { enfocada = null; }

	if (viajero && postas.length && !quieto) {
		var f1 = dibujar(ELENCO.viaja1, 6);
		var f2 = dibujar(ELENCO.viaja2, 6);
		f1.setAttribute('class', 'px-agente cuadro cuadro--a');
		f2.setAttribute('class', 'px-agente cuadro cuadro--b');
		viajero.appendChild(f1);
		viajero.appendChild(f2);

		var MEDIO = 24; // la mitad del bicho: 8 píxeles × escala 6

		// los fotogramas
		setInterval(function () { viajero.classList.toggle('cuadroB'); }, 240);

		var pos = { x: 0, y: 0 };
		var arrancado = false;

		var objetivo = function () {
			var vh = window.innerHeight;

			// la escena de la ruta manda mientras está en pantalla
			if (linea && svgRuta && escenaViva && largo) {
				var c = svgRuta.getBoundingClientRect();
				if (c.top < vh * 0.92 && c.bottom > vh * 0.08) {
					var esc = c.width / 1000;   // ahora escala parejo en los dos ejes
					var pt = linea.getPointAtLength(largo * trazoActual);
					return {
						x: c.left + pt.x * esc,
						y: c.top + pt.y * esc - 22   // parado arriba de la línea, no encima
					};
				}
			}

			// lo que estás mirando manda: el bicho se para al lado
			var tarima = enfocada && enfocada.querySelector('.posta');
			if (tarima) {
				var rt = tarima.getBoundingClientRect();
				if (rt.width && rt.top > 8 && rt.bottom < vh - 8) {
					return { x: rt.left + rt.width / 2, y: rt.top + rt.height / 2 };
				}
			}

			// si no, la última posta que ya cruzó el 62% de la pantalla
			var elegida = postas[0];
			postas.forEach(function (p) {
				if (p.getBoundingClientRect().top < vh * 0.62) elegida = p;
			});

			var r = elegida.getBoundingClientRect();
			var cy = r.top + r.height / 2;
			var clavado = Math.max(96, Math.min(vh - 96, cy));

			// Si la posta quedó fuera de pantalla el bicho espera en el borde,
			// pero corrido al margen: si no, se sienta encima de un texto.
			var afuera = Math.abs(clavado - cy) > 4;
			return {
				x: afuera ? window.innerWidth - 66 : r.left + r.width / 2,
				y: clavado
			};
		};

		requestAnimationFrame(function marco() {
			var t = objetivo();

			if (!arrancado) { pos.x = t.x; pos.y = t.y; arrancado = true; }

			var dx = t.x - pos.x;
			var dy = t.y - pos.y;
			pos.x += dx * 0.125;
			pos.y += dy * 0.125;

			// se inclina hacia donde va, como si se tirara para adelante
			var giro = Math.max(-15, Math.min(15, dx * 0.11));
			var apuro = Math.abs(dx) + Math.abs(dy);

			viajero.style.transform =
				'translate3d(' + (pos.x - MEDIO).toFixed(1) + 'px,' + (pos.y - MEDIO).toFixed(1) + 'px, 0) rotate(' + giro.toFixed(2) + 'deg)';
			viajero.classList.toggle('apurado', apuro > 30);

			requestAnimationFrame(marco);
		});
	}

	/* ───────── el menú marca dónde estás ───────── */

	var deMenu = Array.prototype.slice.call(document.querySelectorAll('.nav__links a[href^="#"]'));
	if (deMenu.length) {
		var mirarSeccion = new IntersectionObserver(function (entradas) {
			entradas.forEach(function (e) {
				if (!e.isIntersecting) return;
				deMenu.forEach(function (l) {
					l.classList.toggle('actual', l.getAttribute('href') === '#' + e.target.id);
				});
			});
		}, { rootMargin: '-45% 0px -50% 0px' });

		deMenu.forEach(function (l) {
			var s = document.querySelector(l.getAttribute('href'));
			if (s) mirarSeccion.observe(s);
		});
	}

	/* ───────── industrias: el bicho se acerca al que mirás ───────── */

	var rubros = Array.prototype.slice.call(document.querySelectorAll('[data-rubro]'));
	if (rubros.length && !quieto) {
		rubros.forEach(function (r) {
			['mouseenter', 'focus'].forEach(function (ev) {
				r.addEventListener(ev, function () {
					rubros.forEach(function (x) { x.classList.remove('activa'); });
					r.classList.add('activa');
					mirar(r);
				});
			});
			['mouseleave', 'blur'].forEach(function (ev) {
				r.addEventListener(ev, function () {
					r.classList.remove('activa');
					if (enfocada === r) soltar();
				});
			});
		});
	}

	/* ───────── los números de casos suben desde cero ───────── */

	/* 🔴 Los números de Casos NO se animan. Contar desde cero mostraba «85%» abajo de
	   un rótulo que dice 100% y «20/7» donde dice 24/7: un número falso en pantalla es
	   un número falso, aunque dure 400 ms, y estos tres sostienen la credibilidad de la
	   página entera. Quedan escritos en el HTML y no los toca nadie. */

	/* ───────── la plataforma entra escalonada ───────── */

	var enlaces = Array.prototype.slice.call(document.querySelectorAll('.enlace'));
	if (enlaces.length) {
		if (quieto) {
			enlaces.forEach(function (l) { l.classList.add('entro'); });
		} else {
			var mirarEnlace = new IntersectionObserver(function (entradas, obs) {
				entradas.forEach(function (e) {
					if (!e.isIntersecting) return;
					obs.unobserve(e.target);
					setTimeout(function () {
						e.target.classList.add('entro');
					}, enlaces.indexOf(e.target) * 130);
				});
			}, { threshold: 0.3 });

			enlaces.forEach(function (l) { mirarEnlace.observe(l); });
		}
	}

	/* ═══════════ las cuatro formas ═══════════
	   Una sola está activa. El bicho se para en su tarima y el texto se
	   escribe. El texto vive entero en el HTML: sólo se parte al activarse,
	   así el prerender y quien no tenga JS lo leen igual.
	   ══════════════════════════════════════════════════════════════════ */

	var zonaTrabajo = document.querySelector('.trabajo');   // vale en la home y en las internas
	var formas = Array.prototype.slice.call(document.querySelectorAll('[data-tarjeta]'));

	var formaActiva = null;

	/* Marcar cuál mirás mueve al bicho y enciende la tarima. El texto NO se
	   reescribe: se escribió una vez al llegar a la sección y se queda. Que
	   se rearme cada vez que pasás el mouse se lee como un parpadeo. */
	function activar(t) {
		if (formaActiva === t) return;
		formas.forEach(function (x) { x.classList.remove('activa'); });
		t.classList.add('activa');
		formaActiva = t;
	}

	if (formas.length) {
		if (quieto) {
			formas.forEach(function (t) { t.classList.add('activa'); });
		} else {
			formas.forEach(function (t) {
				['mouseenter', 'focus'].forEach(function (ev) {
					t.addEventListener(ev, function () { activar(t); mirar(t); });
				});
				['mouseleave', 'blur'].forEach(function (ev) {
					t.addEventListener(ev, function () { if (enfocada === t) soltar(); });
				});
			});

			if (zonaTrabajo) {
				new IntersectionObserver(function (entradas, obs) {
					entradas.forEach(function (e) {
						if (!e.isIntersecting) return;
						obs.disconnect();
						activar(formas[0]);
					});
				}, { threshold: 0.25 }).observe(zonaTrabajo);
			}
		}
	}
	/* ═══════════ el formulario ═══════════
	   Del lado del navegador sólo entran dos capas: el tarro de miel y el
	   control de tiempo. Rate limit, filtro de contenido, tope de gasto y
	   registro del origen van del lado del servidor cuando exista el endpoint.
	   ═══════════════════════════════════════════════════════════════════ */

	/* Para que el formulario mande el mail solo, sin servidor propio, hay que
	   pegar acá una clave de Web3Forms (web3forms.com, gratis). El alta pide
	   una casilla de destino y manda un mail de confirmación: tiene que
	   hacerlo alguien que lea info@codi.com.ar. Con la clave puesta el
	   formulario postea y el mail llega solo; sin clave, cae en el mailto,
	   que es lo que hace hoy el sitio publicado. */
	var CLAVE_ENVIO = '5b366589-b055-42c8-aa10-73db464d729b';   // info@codi.com.ar
	var URL_ENVIO = 'https://api.web3forms.com/submit';

	var form = document.querySelector('[data-form]');
	if (form) {
		var aviso = form.querySelector('[data-aviso]');
		var gracias = form.parentNode.querySelector('[data-gracias]');
		var abierto = Date.now();

		/* Cuando sale bien, el formulario se va y queda Codi con la
		   confirmación. Dejar los campos vacíos abajo de un "listo" invita a
		   mandarlo de nuevo, y encima no se ve que haya pasado nada. */
		function confirmar(contacto) {
			if (!gracias) { decir('Listo, te escribimos.', 'bien'); return; }
			var donde = gracias.querySelector('[data-gracias-mail]');
			if (donde) donde.textContent = contacto;
			form.hidden = true;
			gracias.hidden = false;
			/* El bicho se queda acá abajo. Si sigue viajando aparece dos veces (uno en el
			   «listo, lo tenemos» y otro suelto) y encima se vuelve arriba justo cuando la
			   persona terminó de escribirnos. */
			if (viajero) viajero.style.display = 'none';
		}

		var decir = function (texto, clase) {
			if (!aviso) return;
			aviso.textContent = texto;
			aviso.className = 'form__aviso' + (clase ? ' ' + clase : '');
		};

		form.addEventListener('submit', function (e) {
			e.preventDefault();

			var datos = {
				nombre: form.nombre.value.trim(),
				agente: form.agente ? form.agente.value : '',
				email: form.email.value.trim(),
				mensaje: form.mensaje.value.trim(),
				empresa: form.empresa ? form.empresa.value.trim() : '',
				origen: form.dataset.origen || 'Home',
				url: window.location.pathname
			};

			/* Se pide lo mínimo: el nombre, por cuál agente escribe y el mail. Los detalles
			   y la empresa son opcionales: el que ya se decidió no tiene que redactar nada
			   para que le contestemos. */
			var falta = false;
			['nombre', 'agente', 'email'].forEach(function (k) {
				var campo = form[k].closest('.campo');
				var vacio = !datos[k];
				campo.classList.toggle('mal', vacio);
				if (vacio) falta = true;
			});
			if (falta) { decir('Falta completar algo.', 'mal'); return; }

			if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(datos.email)) {
				form.email.closest('.campo').classList.add('mal');
				decir('Ese mail no parece válido.', 'mal');
				return;
			}

			/* El tarro de miel: el que lo completa es un bot y se le contesta como si
			   hubiera salido bien, porque avisarle es regalarle la pista. */
			if (form.empresa_web.value !== '') { confirmar(datos.email); return; }

			/* Antes, mandar en menos de tres segundos también se descartaba en
			   silencio, con un "Listo, lo tenemos" arriba. Un autocompletado del
			   navegador entra en tres segundos: eso era perder leads de verdad. Ahora
			   el mensaje sale igual, marcado, y decide una persona. */
			if ((Date.now() - abierto) < 3000) datos.origen += ' · rápido';

			var cuerpo = (datos.mensaje || '(sin detalles)')
				+ '\n\nAgente: ' + datos.agente
				+ '\nNombre: ' + datos.nombre
				+ (datos.empresa ? '\nEmpresa: ' + datos.empresa : '')
				+ '\nMail: ' + datos.email
				+ '\n\nLlegó desde: ' + datos.origen + ' (' + datos.url + ')';
			var asunto = 'Quiere: ' + (datos.agente || 'consulta') + ' · ' + datos.nombre;

			if (!CLAVE_ENVIO) {
				// Todavía no hay a dónde mandarlo: abrimos el mail ya redactado.
				window.location.href = 'mailto:info@codi.com.ar'
					+ '?subject=' + encodeURIComponent(asunto)
					+ '&body=' + encodeURIComponent(cuerpo);
				confirmar(datos.email);
				return;
			}

			decir('Enviando…');

			/* Va como FormData a propósito. Con JSON el navegador dispara un
			   preflight CORS que Web3Forms no contesta, y el envío muere con
			   ERR_FAILED antes de salir. FormData es un pedido simple. */
			var sobre = new FormData();
			sobre.append('access_key', CLAVE_ENVIO);
			sobre.append('subject', asunto);
			sobre.append('from_name', datos.nombre + (datos.empresa ? ' (' + datos.empresa + ')' : ''));
			sobre.append('email', datos.email);
			sobre.append('agente', datos.agente);
			sobre.append('empresa', datos.empresa);
			sobre.append('origen', datos.origen);
			sobre.append('pagina', datos.url);
			sobre.append('message', cuerpo);

			fetch(URL_ENVIO, { method: 'POST', body: sobre })
				.then(function (r) { return r.json(); }).then(function (r) {
				if (!r.success) throw new Error('rechazado');
				confirmar(datos.email);
			}).catch(function () {
				/* 🔴 Si el servicio de envío falla o la clave se vence, el lead NO se pierde:
				   se le abre el mail con todo escrito. Nadie de este lado puede ver la
				   casilla de info@, así que el formulario no puede depender de que ande. */
				decir('Te abrimos el mail con todo escrito. Si no se abrió solo, mandalo a info@codi.com.ar.', 'mal');
				window.location.href = 'mailto:info@codi.com.ar'
					+ '?subject=' + encodeURIComponent(asunto)
					+ '&body=' + encodeURIComponent(cuerpo);
			});
		});
	}

	/* ───────── el mercado de agentes ─────────
	   Las conversaciones ya están en el HTML. Esto solo las revela de a una, con la pausa
	   que tendría alguien escribiendo del otro lado: leer una charla de corrido no se
	   parece a nada, y lo que vende es el ritmo.

	   Con prefers-reduced-motion se ve la charla entera de una vez. */

	var mercado = document.querySelector('[data-mercado]');
	if (mercado) {
		var cartas = Array.prototype.slice.call(mercado.querySelectorAll('[data-carta]'));

		/* Las conversaciones vienen VISIBLES en el HTML: sin JS, y para quien lea el
		   codigo o lo indexe, se leen enteras. Las esconde el JS, que es el unico que
		   despues las sabe volver a mostrar. */
		document.querySelectorAll('[data-demo]').forEach(function (d) { d.hidden = true; });
		var relojes = [];

		function frenar() {
			relojes.forEach(clearTimeout);
			relojes = [];
			document.querySelectorAll('[data-charla]').forEach(function (c) { c.style.height = ''; });
			var puntos = document.querySelector('.escribiendo');
			if (puntos) puntos.remove();
		}

		// La ficha del caso se abre pegada a la fila de la tarjeta, no al final de la
		// seccion: abajo de todo la conversacion se leia sin saber de que caso hablaba.
		var ficha = document.createElement('div');
		ficha.className = 'ficha';
		ficha.innerHTML = '<span class="ficha__pico" aria-hidden="true"></span>' +
			'<div class="ficha__cinta">' +
			'<p class="ficha__pregunta">¿Es tu caso?</p>' +
			'<span class="ficha__salidas"></span>' +
			'<button type="button" class="ficha__cerrar" aria-label="Cerrar el caso">✕</button>' +
			'</div>';
		var pico = ficha.querySelector('.ficha__pico');

		// Mientras no se miran, las conversaciones esperan aca: siguen en el HTML para
		// quien lo lea sin JS y para los buscadores.
		var deposito = document.createElement('div');
		deposito.hidden = true;
		mercado.parentNode.appendChild(deposito);

		var abiertaAhora = null;

		/** Mete la ficha despues de la ultima tarjeta de la misma fila y apunta el pico. */
		function ubicar(carta, demo) {
			var fila = cartas.filter(function (c) { return Math.abs(c.offsetTop - carta.offsetTop) < 8; });
			var ultima = fila[fila.length - 1] || carta;
			mercado.insertBefore(ficha, ultima.nextSibling);
			if (demo.parentNode !== ficha) {
				ficha.appendChild(demo);
				// El par de botones del caso, clonado arriba: el que ya se decidió no
				// scrollea tres pantallas para que lo dejen. Se clona, así no hay nueve
				// pares duplicados en el HTML.
				var salidas = ficha.querySelector('.ficha__salidas');
				var acciones = demo.querySelector('.demo__acciones');
				salidas.innerHTML = '';
				if (acciones) {
					Array.prototype.forEach.call(acciones.children, function (a) {
						salidas.appendChild(a.cloneNode(true));
					});
				}
			}
			var cajaF = ficha.getBoundingClientRect();
			var cajaC = carta.getBoundingClientRect();
			pico.style.left = (cajaC.left - cajaF.left + cajaC.width / 2) + 'px';
		}

		/* Mueve lo justo: primero intenta que entre el final de la ficha, pero nunca
		   tanto como para meter la tarjeta abajo de la barra. Una conversación sin su
		   tarjeta arriba es una pantalla de la que no se sabe de qué habla. */
		function acomodar(carta) {
			var barra = 92;
			var cajaF = ficha.getBoundingClientRect();
			var cajaC = carta.getBoundingClientRect();
			var delta = 0;
			if (cajaF.bottom > window.innerHeight) {
				delta = Math.min(cajaF.bottom - window.innerHeight + 16, Math.max(0, cajaC.top - barra));
			} else if (cajaC.top < barra) {
				delta = cajaC.top - barra;
			}
			if (Math.abs(delta) < 4) return;
			window.scrollBy({ top: delta, behavior: quieto ? 'auto' : 'smooth' });
		}

		function cerrarTodo() {
			frenar();
			cartas.forEach(function (c) {
				c.setAttribute('aria-expanded', 'false');
				var r = c.querySelector('.mercado__ver');
				if (r) r.textContent = 'Ver el caso';
			});
			document.querySelectorAll('[data-demo]').forEach(function (d) {
				d.hidden = true;
				if (d.parentNode === ficha) deposito.appendChild(d);
			});
			if (ficha.parentNode) ficha.parentNode.removeChild(ficha);
			abiertaAhora = null;
		}

		ficha.querySelector('.ficha__cerrar').addEventListener('click', function () {
			var carta = abiertaAhora;
			cerrarTodo();
			if (carta) carta.focus();
		});

		document.addEventListener('keydown', function (e) {
			if (e.key !== 'Escape' || !abiertaAhora) return;
			var carta = abiertaAhora;
			cerrarTodo();
			carta.focus();
		});

		// Al cambiar el ancho cambian las filas: la ficha tiene que seguir a su tarjeta.
		window.addEventListener('resize', function () {
			if (!abiertaAhora) return;
			var demo = document.getElementById(abiertaAhora.getAttribute('aria-controls'));
			if (demo) ubicar(abiertaAhora, demo);
		});

		function puntitos() {
			var p = document.createElement('div');
			p.className = 'escribiendo';
			p.setAttribute('aria-hidden', 'true');
			p.innerHTML = '<i></i><i></i><i></i>';
			return p;
		}

		/** Revela los globos uno por uno. El agente "escribe" antes de contestar. */
		function correr(charla) {
			var globos = Array.prototype.slice.call(charla.querySelectorAll('[data-globo]'));
			if (quieto) {
				globos.forEach(function (g) { g.classList.add('puesto'); });
				return;
			}

			/* Los puntitos de «escribiendo» entran y salen del flujo, y con ellos crecía y
			   se achicaba toda la ficha. Como los globos ya están todos en el HTML, el alto
			   final se mide ANTES de empezar y se clava: lo que empuja el que está
			   escribiendo son globos que todavía no se ven. */
			charla.style.height = charla.offsetHeight + 'px';
			charla.classList.add('corriendo');
			globos.forEach(function (g) { g.classList.remove('puesto'); });

			var demora = 120;
			globos.forEach(function (globo) {
				var esAgente = globo.classList.contains('globo--agente');
				// Lo que tarda en leerse el mensaje anterior, con tope: una charla no puede
				// durar más que la paciencia de quien la mira.
				var pensar = esAgente ? Math.min(450, 260 + globo.textContent.length * 2) : 240;

				if (esAgente || globo === globos[0]) {
					relojes.push(setTimeout(function () {
						var p = puntitos();
						charla.insertBefore(p, globo);
					}, demora));
					demora += pensar;
					relojes.push(setTimeout(function () {
						var p = charla.querySelector('.escribiendo');
						if (p) p.remove();
						globo.classList.add('puesto');
					}, demora));
				} else {
					demora += pensar;
					relojes.push(setTimeout(function () { globo.classList.add('puesto'); }, demora));
				}
				demora += 140;
			});

			// terminada la charla, el alto vuelve a ser el que pida el texto
			relojes.push(setTimeout(function () { charla.style.height = ''; }, demora + 200));
		}

		cartas.forEach(function (carta) {
			carta.addEventListener('click', function () {
				var abierta = carta.getAttribute('aria-expanded') === 'true';
				var demo = document.getElementById(carta.getAttribute('aria-controls'));

				// Cerrar la ficha anterior achica el documento abajo del dedo y la página
				// se iba 1052 px para arriba. Se anota dónde estaba la tarjeta antes de
				// cerrar y se la devuelve al mismo lugar después.
				var antes = carta.getBoundingClientRect().top;
				cerrarTodo();
				if (abierta || !demo) return;
				var corrimiento = carta.getBoundingClientRect().top - antes;
				if (corrimiento) window.scrollBy({ top: corrimiento, behavior: 'auto' });

				carta.setAttribute('aria-expanded', 'true');
				var rotulo = carta.querySelector('.mercado__ver');
				if (rotulo) rotulo.textContent = 'Cerrar';
				abiertaAhora = carta;
				ubicar(carta, demo);
				demo.hidden = false;
				ubicar(carta, demo);   // ya visible: recien ahora el pico mide bien
				correr(demo.querySelector('[data-charla]'));

				acomodar(carta);
			});
		});
	}

})();
