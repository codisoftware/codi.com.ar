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
		var hueco = escala >= 6 ? 1 : 0;
		var lado = escala - hueco;

		var svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttribute('class', 'px-agente');
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

		var paso = document.startViewTransition(cambiar);

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

	/* ───────── el puntero propio ───────── */

	var puntero = document.querySelector('[data-puntero]');
	if (puntero && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !quieto) {
		var raton = { x: -100, y: -100 };
		var TOCABLE = 'a, button, [data-tarjeta], [data-rubro], label';

		document.addEventListener('mousemove', function (e) {
			raton.x = e.clientX;
			raton.y = e.clientY;
			puntero.classList.add('visible');

			var bajo = e.target;
			puntero.classList.toggle('tocable', !!(bajo.closest && bajo.closest(TOCABLE)));
			puntero.classList.toggle('texto', !!(bajo.closest && bajo.closest('input, textarea')));
		}, { passive: true });

		document.addEventListener('mouseleave', function () { puntero.classList.remove('visible'); });
		document.addEventListener('mouseenter', function () { puntero.classList.add('visible'); });

		requestAnimationFrame(function tic() {
			// la punta de la flecha cae justo donde está el mouse
			puntero.style.transform = 'translate3d(' + (raton.x - 2) + 'px,' + (raton.y - 2) + 'px,0)';
			requestAnimationFrame(tic);
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

	var numeros = Array.prototype.slice.call(document.querySelectorAll('[data-contar]'));
	if (numeros.length && !quieto) {
		numeros.forEach(function (n) { n.textContent = '0'; });

		var mirarNumero = new IntersectionObserver(function (entradas, obs) {
			entradas.forEach(function (e) {
				if (!e.isIntersecting) return;
				obs.unobserve(e.target);

				var meta = parseInt(e.target.dataset.contar, 10);
				var t0 = performance.now();
				var dur = 1100;

				requestAnimationFrame(function paso(ahora) {
					var k = Math.min(1, (ahora - t0) / dur);
					var e2 = 1 - Math.pow(1 - k, 3);   // frena al llegar
					e.target.textContent = Math.round(meta * e2);
					if (k < 1) requestAnimationFrame(paso);
					else e.target.textContent = meta;
				});
			});
		}, { threshold: 0.6 });

		numeros.forEach(function (n) { mirarNumero.observe(n); });
	}

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
		var abierto = Date.now();

		var decir = function (texto, clase) {
			if (!aviso) return;
			aviso.textContent = texto;
			aviso.className = 'form__aviso' + (clase ? ' ' + clase : '');
		};

		form.addEventListener('submit', function (e) {
			e.preventDefault();

			var datos = {
				nombre: form.nombre.value.trim(),
				email: form.email.value.trim(),
				mensaje: form.mensaje.value.trim(),
				empresa: form.empresa ? form.empresa.value.trim() : '',
				origen: form.dataset.origen || 'Home',
				url: window.location.pathname
			};

			// campos vacíos: marcamos cuál falta en vez de un aviso genérico
			var falta = false;
			['nombre', 'email', 'mensaje'].forEach(function (k) {
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

			/* Capa 1 del front: el tarro de miel. Capa 2: nadie completa esto en
			   menos de tres segundos. En los dos casos contestamos como si hubiera
			   salido bien: decirle a un bot que lo detectaste es regalarle la
			   pista para ajustar el patrón. */
			var sospechoso = form.empresa_web.value !== '' || (Date.now() - abierto) < 3000;
			if (sospechoso) { decir('Listo, te escribimos.', 'bien'); form.reset(); return; }

			if (!CLAVE_ENVIO) {
				// Todavía no hay a dónde mandarlo: abrimos el mail ya redactado.
				var cuerpo = datos.mensaje
					+ '\n\n' + datos.nombre
					+ (datos.empresa ? '\n' + datos.empresa : '')
					+ '\n' + datos.email
					+ '\n\nLlegó desde: ' + datos.origen + ' (' + datos.url + ')';
				window.location.href = 'mailto:info@codi.com.ar'
					+ '?subject=' + encodeURIComponent('Consulta desde ' + datos.origen + ' · ' + datos.nombre)
					+ '&body=' + encodeURIComponent(cuerpo);
				decir('Te abrimos el mail con todo cargado.', 'bien');
				return;
			}

			decir('Enviando…');

			/* Va como FormData a propósito. Con JSON el navegador dispara un
			   preflight CORS que Web3Forms no contesta, y el envío muere con
			   ERR_FAILED antes de salir. FormData es un pedido simple. */
			var sobre = new FormData();
			sobre.append('access_key', CLAVE_ENVIO);
			sobre.append('subject', 'Consulta desde ' + datos.origen + ' · ' + datos.nombre);
			sobre.append('from_name', datos.nombre + (datos.empresa ? ' (' + datos.empresa + ')' : ''));
			sobre.append('email', datos.email);
			sobre.append('empresa', datos.empresa);
			sobre.append('origen', datos.origen);
			sobre.append('pagina', datos.url);
			sobre.append('message', datos.mensaje);

			fetch(URL_ENVIO, { method: 'POST', body: sobre })
				.then(function (r) { return r.json(); }).then(function (r) {
				if (!r.success) throw new Error('rechazado');
				decir('Listo, te escribimos.', 'bien');
				form.reset();
			}).catch(function () {
				decir('No salió. Escribinos a info@codi.com.ar.', 'mal');
			});
		});
	}
})();
