/* Las tres páginas de empresa. Mismo criterio que industrias y producto: el
   copy sale de lo que ya está publicado en codi.com.ar, servido con el diseño
   nuevo, sin rayas dobles y sin títulos que se repiten idénticos. */

export const EMPRESA = [
	{
		slug: 'nosotros',
		kicker: 'Nosotros',
		h1: 'El equipo que lleva la IA a donde se trabaja.',
		lead: 'Codi nació aplicando inteligencia artificial a problemas reales de negocio: recomendación personalizada, e-commerce y fintech. Hoy esa experiencia corre sobre una sola plataforma.',
		icono: 'operador',
		bloques: [
			{
				kicker: 'La historia',
				h2: 'Más de una década llevando IA a producción.',
				lead: 'Diez años de trabajo y más de 50 proyectos entregados. Nuestro equipo está repartido en tres continentes, y esa mezcla de culturas y recorridos es la que termina apareciendo en las soluciones.',
				estilo: 'casos',
				items: [
					['+50 proyectos', 'Entregados y andando, no pilotos que quedaron en una presentación.'],
					['10 años', 'Llevando modelos a producción, desde antes de que fuera una categoría.'],
					['3 continentes', 'Un equipo diverso, con perspectivas que se traducen en soluciones distintas.']
				]
			},
			{
				kicker: 'Lo que nos define',
				h2: 'Seis cosas que no negociamos.',
				estilo: 'tarjetas',
				items: [
					['Impacto primero', 'Medimos el éxito por resultados, no por entregables. Cientos de millones de datos puestos al servicio del negocio.'],
					['Integración sin fricción', 'Soluciones que piden un esfuerzo mínimo de integración para empezar a generar valor.'],
					['Tiempo real', 'Respuestas en milisegundos, para interacciones que no pueden esperar.'],
					['Tus datos, tus reglas', 'Todo el procesamiento puede ocurrir dentro de tu propia nube.']
				]
			},
			{
				kicker: 'Cómo encaja',
				h2: 'A medida, de verdad.',
				estilo: 'info',
				items: [
					['End to end o modular', 'Elegís el encaje según tu operación, no según lo que nos conviene vender.'],
					['Entrenado sobre volumen', 'Grandes cantidades de datos detrás de cada resultado, para que sea confiable.'],
					['Dentro de tu nube', 'Si el dato no puede salir de tu organización, no sale.'],
					['Con tu equipo adentro', 'Trabajamos con tu gente, no en paralelo a tu gente.']
				]
			}
		]
	},
	{
		slug: 'implementacion',
		kicker: 'Implementación',
		h1: 'La implementación es donde la IA de una empresa se define.',
		lead: 'Ponemos equipos dentro de tu operación: llevan la IA a producción, entregan impacto rápido y después te dan las llaves.',
		icono: 'pila',
		bloques: [
			{
				kicker: 'El equipo',
				h2: 'Embebidos en tu operación, no del otro lado del mail.',
				lead: 'Ingenieros de implementación y estrategas de deployment trabajan dentro de tu entorno. No es un vendor remoto: es un equipo que se sienta con el tuyo.',
				estilo: 'casos',
				items: [
					['Ingeniería', 'Los que lo hacen funcionar: integraciones, datos, guardrails y puesta en producción.'],
					['Estrategia', 'Los que lo hacen importar: qué caso primero, cómo se mide y cuándo se escala.'],
					['Tu equipo', 'Adentro desde el día uno, porque la capacidad tiene que quedar en tu organización.']
				]
			},
			{
				kicker: 'Las tres fases',
				h2: 'De liderado por Codi a ownership total, por diseño.',
				estilo: 'tarjetas',
				items: [
					['El caso correcto, en producción', 'Empezamos por tus datos, encontramos lo que vale la pena construir y lo llevamos a producción. El valor es real antes de escalar.'],
					['Escalar lo que funciona', 'Con el primer caso midiendo resultados, extendemos a los workflows siguientes reutilizando lo construido.'],
					['Transferir la capacidad', 'Tus equipos aprenden a construir, operar y mejorar los agentes. Pasamos de constructor a partner.'],
					['Y nos corremos', 'El final del proyecto es que puedas seguir sin nosotros. Si no, algo salió mal.']
				]
			},
			{
				kicker: 'Dónde corre',
				h2: 'Se despliega donde tu infraestructura lo permita.',
				estilo: 'info',
				items: [
					['Multi-tenant', 'Actualizaciones continuas, monitoreado por Codi, con aislamiento lógico y autoescalado transparente.'],
					['Single tenant', 'Infraestructura dedicada y aislada, con actualizaciones automáticas y configuración a medida.'],
					['Tu propia nube', 'Tus datos nunca salen de tu organización: controlás seguridad, gobierno y cuándo se actualiza.'],
					['Lo que pida el regulador', 'Si el cumplimiento manda, el despliegue se acomoda a eso y no al revés.']
				]
			}
		]
	},
	{
		slug: 'transformacion',
		kicker: 'Transformación',
		h1: 'La IA no es una tecnología que adoptás. Es un cambio en cómo opera tu organización.',
		lead: 'El ERP, el CRM, la nube: cada ola tuvo su fecha de go-live. La IA no tiene fecha de go-live, tiene un punto de partida. No coordina personas, ejecuta trabajo.',
		icono: 'medidor',
		bloques: [
			{
				kicker: 'El punto',
				h2: 'El valor no está en el despliegue.',
				lead: 'Está en lo que la organización se convierte gracias a él. Eso no es adoptar una tecnología: es cambiar el modelo operativo. Y llegar ahí pide acertar en cinco cosas.',
				estilo: 'casos',
				items: [
					['El problema correcto, en el orden correcto', 'Qué caso construye la base que hace más rápido todo lo que sigue. La velocidad viene de empezar bien, no de empezar primero.'],
					['Workflows, no funciones', 'El trabajo real cruza el organigrama. La IA encerrada en un área reproduce las estructuras viejas con herramientas nuevas.'],
					['El músculo adentro', 'Construir, operar y mejorar agentes tiene que quedar en tu organización. Un partner acelera el camino, el músculo es tuyo.']
				]
			},
			{
				kicker: 'Las otras dos',
				h2: 'Control y medición.',
				estilo: 'tarjetas',
				items: [
					['Control y flexibilidad', 'Cualquier modelo, cualquier nube, tus datos siempre tuyos. Una plataforma que corre tus operaciones es demasiado crítica para quedar atada a un proveedor.'],
					['Throughput, no solo costo', 'Bajar costos es el piso, no el techo. La medida real es cuánto más trabajo resuelve la organización, a qué velocidad y con qué calidad.'],
					['Medido desde el principio', 'Si no se puede medir antes de empezar, no se va a poder demostrar después.'],
					['Sin fecha de corte', 'No hay un go-live y listo. Hay una base que se extiende, y eso cambia cómo se planifica.']
				]
			}
		]
	}
];
