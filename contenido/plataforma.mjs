/* Las tres páginas de producto. Mismo criterio que industrias: el copy sale
   de lo que ya está publicado en codi.com.ar, servido con el diseño nuevo. */

export const PRODUCTO = [
	{
		slug: 'plataforma',
		kicker: 'Plataforma',
		h1: 'La plataforma de IA para la empresa.',
		lead: 'Donde las empresas construyen, ejecutan y mejoran IA que hace trabajo real.',
		icono: 'pila',
		bloques: [
			{
				kicker: 'Enfoque completo',
				h2: 'Los workflows de una empresa no se resuelven en partes.',
				lead: 'Codi los resuelve enteros, de la primera consulta a la acción ejecutada.',
				estilo: 'casos',
				items: [
					['Cualquier modelo', 'Corre sobre cualquier modelo de IA, optimizado por tarea: la mejor calidad al costo correcto, sin casarte con un solo proveedor.'],
					['Cualquier canal', 'Voz, WhatsApp, chat web, Instagram, mail, SMS y documentos. Los agentes trabajan en todos los canales por donde llega el trabajo.'],
					['Cualquier función', 'Atención, ventas, cobranzas, operaciones y back office. Se adapta a cualquier caso de uso y se conecta con más de 600 herramientas.']
				]
			},
			{
				kicker: 'Gobierno',
				h2: 'Control total sobre lo que hace cada agente.',
				lead: 'La salud y el rendimiento de cada agente, de un vistazo.',
				estilo: 'tarjetas',
				items: [
					['Logs y trazas', 'Acceso completo al razonamiento, las acciones y las llamadas a herramientas de cada agente, para entender cada decisión.'],
					['Guardrails en tiempo real', 'Límites activos sobre lo que cada agente puede decir y hacer, aplicados en cada interacción, no sólo en diseño.'],
					['Alertas de negocio', 'Notificaciones cuando una métrica se desvía: contención, conversión, tiempos de resolución.'],
					['Roles y permisos', 'Definí quién puede construir, editar y desplegar, hasta el nivel de cada recurso.']
				]
			},
			{
				kicker: 'Estándar empresarial',
				h2: 'Del despliegue a la protección de datos.',
				estilo: 'info',
				items: [
					['Despliegue acelerado', 'SaaS multi-tenant, single-tenant o en tu propia nube, según tu infraestructura y tus requisitos de cumplimiento.'],
					['Seguridad incorporada', 'Protección contra prompt injection, guardrails de agentes y gateways seguros para cada integración.'],
					['Protección de datos', 'Cero retención de datos con proveedores de IA, redacción automática de datos personales y cifrado AES-256.'],
					['Cumplimiento', 'Trazabilidad completa de cada decisión, pensada para auditorías y para la supervisión de un ente regulador.']
				]
			}
		]
	},
	{
		slug: 'estudio',
		kicker: 'Codi Studio',
		h1: 'Negocio e ingeniería construyen el mismo agente.',
		lead: 'Un solo entorno para todo el equipo: desde quienes definen cómo debe trabajar un agente hasta quienes lo hacen correr de forma segura a escala.',
		icono: 'cimiento',
		bloques: [
			{
				kicker: 'Trabajo real',
				h2: 'El trabajo de una empresa no es una tanda de preguntas y respuestas.',
				lead: 'Atraviesa canales, lleva tiempo y vive adentro de tus sistemas. Se construye para eso.',
				estilo: 'casos',
				items: [
					['A través de canales', 'Voz, chat, mail, documentos y cualquier otro canal por donde llegue el trabajo. Los agentes operan en todos.'],
					['Totalmente integrado', 'Conectado a los sistemas donde corre el trabajo: el agente lee datos, dispara acciones y actualiza registros directamente.'],
					['Complejidad real', 'Agentes que ejecutan procesos de muchos pasos y toman decisiones reales en el camino, no un flujo fijo.']
				]
			},
			{
				kicker: 'Dos interfaces, un entorno',
				h2: 'Potente para ingeniería, simple para negocio.',
				estilo: 'tarjetas',
				items: [
					['Construir con lenguaje natural', 'Quien conoce el proceso describe cómo debe trabajar el agente, sin escribir una línea de código.'],
					['Construir con código', 'Quien lo hace correr a escala tiene el control fino: herramientas, lógica y despliegue.'],
					['El conocimiento de tu organización', 'Tus manuales, tus procedimientos y tus datos entran como contexto del agente.'],
					['Probado antes de producción', 'Se ensaya contra casos reales y se mide antes de que lo vea un cliente.']
				]
			},
			{
				kicker: 'A escala',
				h2: 'Construido para equipos que construyen mucho.',
				estilo: 'info',
				items: [
					['Workspaces', 'Equipos, proyectos y unidades de negocio, cada uno en su propio espacio aislado.'],
					['Versionado', 'Cada cambio registrado. Volvé a cualquier versión, en cualquier momento.'],
					['Catálogo', 'Construí un agente una vez y reutilizalo en todos lados. Lo mismo con skills y herramientas.'],
					['A/B testing', 'Dividí el tráfico entre dos variantes de un agente y elegí el ganador con datos.']
				]
			}
		]
	},
	{
		slug: 'apps',
		kicker: 'Apps a medida',
		h1: 'Una app a medida para cada caso de uso.',
		lead: 'Un lugar donde tu gente y tus agentes trabajan juntos, sobre tus datos y sobre cómo realmente trabajás.',
		icono: 'ventana',
		bloques: [
			{
				kicker: 'La idea',
				h2: 'Un agente con un dashboard pegado no alcanza.',
				lead: 'Cada caso de uso necesita una interfaz propia, que conecte al agente que hace el trabajo con la persona que lo supervisa.',
				estilo: 'casos',
				items: [
					['A medida del trabajo', 'Cada app toma la forma de un caso de uso: los datos que usa, los pasos que sigue y las decisiones que requiere.'],
					['Sobre los datos reales', 'La app corre sobre los mismos datos que el agente, en tiempo real: la persona y el agente ven lo mismo.'],
					['Pensada para revisar', 'El operador revisa, aprueba y ajusta el trabajo desde la misma interfaz, no desde otra herramienta.']
				]
			},
			{
				kicker: 'Cómo se construye',
				h2: 'Describís la app que necesitás y la plataforma la arma.',
				estilo: 'tarjetas',
				items: [
					['Construí cualquier app', 'Un panel de operaciones, una consola de aprobaciones, un CRM completo: si el caso lo necesita, se construye.'],
					['Agentes y apps en un solo lugar', 'Se construyen, ejecutan y gobiernan en la misma plataforma que tus agentes.'],
					['Construí conversando', 'Agregá una vista, ajustá un paso, mostrá un número. Construís y modificás la interfaz pidiéndolo.'],
					['Cambiala cuando cambie el proceso', 'La operación se mueve y la interfaz se mueve con ella, sin esperar un release.']
				]
			}
		]
	}
];
