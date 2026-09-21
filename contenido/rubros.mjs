/* Los rubros donde Codi vende agentes como servicio.

   Cada número tiene fuente, y la fuente se muestra. Donde no hay un dato
   publicado que se sostenga, no se inventa uno: se dice que se mide en la
   cuenta del cliente. Un porcentaje sin respaldo en la página de alguien que
   vende resultados resta todo lo demás. */

export const RUBROS = [
	{
		slug: 'inmobiliarias',
		nombre: 'Inmobiliarias',
		icono: 'casa',
		gancho: 'La consulta que entró el domingo a la noche la contestó otra inmobiliaria el lunes a las nueve.',
		proceso: 'Responde cada consulta en minutos, la califica y la carga en Tokko.',
		lead: 'Un agente que contesta las consultas de los portales y de WhatsApp a cualquier hora, pregunta lo que pregunta un corredor y deja la visita agendada.',
		dato: {
			cifra: '42 h',
			texto: 'tarda en promedio una empresa en responder una consulta. El 23% nunca la responde.',
			fuente: 'Harvard Business Review, 2011',
			url: 'https://hbr.org/2011/03/the-short-life-of-online-sales-leads'
		},
		pasos: [
			['Responde en minutos', 'La consulta del portal o de WhatsApp tiene respuesta al toque, sea la hora que sea.'],
			['Califica', 'Zona, presupuesto, si es para vivir o para invertir, cuándo se muda.'],
			['Agenda la visita', 'Ofrece horarios reales y deja la visita confirmada.'],
			['Carga en Tokko', 'El lead entra calificado, con la conversación entera adentro.']
		],
		escenas: [
			['Domingo 22:40', 'Alguien pregunta por un dos ambientes. A las 22:41 tiene respuesta y un horario para el martes.'],
			['Lunes 9:00', 'El equipo abre Tokko y encuentra tres visitas agendadas durante el fin de semana.']
		]
	},
	{
		slug: 'concesionarias',
		nombre: 'Concesionarias',
		icono: 'auto',
		gancho: 'El que pidió el precio del usado un sábado a la tarde, el lunes ya está en otra concesionaria.',
		proceso: 'Responde el lead con precio, agenda el test drive y hace el seguimiento.',
		lead: 'Un agente que contesta cada consulta con precio y disponibilidad, pregunta por la financiación y el usado, y no deja caer a nadie en el seguimiento.',
		dato: {
			cifra: '74%',
			texto: 'de las concesionarias no incluyó el precio al responder una consulta, y el 19% tardó más de una hora.',
			fuente: 'DAS Technology, 1.700 concesionarias de EE.UU., 2025',
			url: 'https://news.dealershipguy.com/p/study-finds-many-dealers-fall-short-on-key-lead-processes-2025-01-28'
		},
		pasos: [
			['Contesta con precio', 'Precio, versión y disponibilidad en la primera respuesta, que es lo que la persona preguntó.'],
			['Califica', 'Financiación, usado como parte de pago, plazo de compra.'],
			['Agenda el test drive', 'Con un horario del salón, confirmado.'],
			['Sigue la conversación', 'Vuelve a escribir a los dos días y a la semana, con algo nuevo que decir.']
		],
		escenas: [
			['Sábado 17:15', 'Una consulta por un usado del portal. Respuesta con precio, cuotas y un turno para probarlo el martes.'],
			['Miércoles 11:00', 'El que no contestó recibe la baja de precio de ese mismo modelo.']
		]
	},
	{
		slug: 'clinicas',
		nombre: 'Clínicas y consultorios',
		icono: 'cruz',
		gancho: 'El turno que nadie confirmó es una hora de consultorio vacía.',
		proceso: 'Confirma, recuerda y reprograma turnos, y llena los huecos de la agenda.',
		lead: 'Un agente que confirma cada turno por WhatsApp, reprograma en la misma conversación al que no puede y le ofrece el hueco a quien está esperando.',
		dato: {
			cifra: '1 de cada 4',
			texto: 'consultas agendadas no se concreta.',
			fuente: 'Hospital Italiano de Buenos Aires, 2019',
			url: 'https://www1.hospitalitaliano.org.ar/hiba/es/news/faltar-al-medico-es-perjudicial-para-la-salud'
		},
		pasos: [
			['Confirma', 'Escribe 48 y 24 horas antes, y registra la respuesta.'],
			['Reprograma', 'Al que no puede le ofrece otro horario ahí mismo, sin que tenga que llamar.'],
			['Llena el hueco', 'El turno liberado se le ofrece a la lista de espera.'],
			['Deja la agenda al día', 'Todo impacta en la agenda que ya usan, sin cargar nada a mano.']
		],
		escenas: [
			['Martes 18:00', 'Un paciente avisa que no llega. Le queda el jueves a la misma hora, y el martes se ocupa con alguien de la lista de espera.'],
			['Miércoles 8:00', 'La secretaria arranca el día con la agenda confirmada, sin haber hecho una llamada.']
		]
	},
	{
		slug: 'mercado-libre',
		nombre: 'Vendedores de Mercado Libre',
		icono: 'caja',
		gancho: 'La pregunta que contestás a la mañana la hizo alguien que anoche compró en otra publicación.',
		proceso: 'Contesta las preguntas antes de la compra a cualquier hora y resuelve la posventa.',
		lead: 'Un agente que contesta las preguntas de tus publicaciones con tu stock y tus condiciones reales, y se encarga de la posventa sin que tengas que estar mirando el celular.',
		dato: null,
		sinDato: 'No hay un estudio independiente que mida cuánto vende de más una cuenta que responde rápido. Por eso lo medimos en la tuya: tiempo de respuesta y conversión, antes y después.',
		pasos: [
			['Contesta las preguntas', 'Con el stock, el envío y las condiciones reales de cada publicación.'],
			['Atiende la posventa', 'Estado del envío, cambios y facturas.'],
			['Te pasa lo delicado', 'Un reclamo o una devolución llegan a una persona, con el caso resumido.'],
			['Mide', 'Tiempo de respuesta y conversión de la cuenta, mes a mes.']
		],
		escenas: [
			['Viernes 23:50', 'Alguien pregunta si el talle viene grande. Tiene respuesta en un minuto y compra antes de irse a dormir.'],
			['Lunes 10:00', 'Llegás y los reclamos del fin de semana te esperan resumidos, sin los que ya se resolvieron solos.']
		]
	}
];

/* Los datos del sector que abren la home. Son estudios de terceros, no
   resultados de Codi: se dice así y se enlazan. */
export const ESTUDIOS = [
	{
		cifra: '1 de cada 4',
		texto: 'turnos agendados no se concreta',
		fuente: 'Hospital Italiano, 2019',
		url: 'https://www1.hospitalitaliano.org.ar/hiba/es/news/faltar-al-medico-es-perjudicial-para-la-salud'
	},
	{
		cifra: '42 h',
		texto: 'tarda en promedio una empresa en responder una consulta',
		fuente: 'Harvard Business Review, 2011',
		url: 'https://hbr.org/2011/03/the-short-life-of-online-sales-leads'
	},
	{
		cifra: '14%',
		texto: 'de los problemas se resuelve del todo en autoservicio',
		fuente: 'Gartner, 2024',
		url: 'https://www.gartner.com/en/newsroom/press-releases/2024-08-19-gartner-survey-finds-only-14-percent-of-customer-service-issues-are-fully-resolved-in-self-service'
	}
];
