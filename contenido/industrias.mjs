/* El contenido de las páginas de industria, separado del molde.
   Sale de las páginas que ya están publicadas en codi.com.ar: no inventamos
   promesas nuevas, sólo las servimos con el diseño nuevo. */

export const INDUSTRIAS = [
	{
		slug: 'banca',
		nombre: 'Banca',
		icono: 'banca',
		lead: 'Donde los workflows más complejos de un banco se convierten en producción lista para reguladores, de punta a punta.',
		beneficios: [
			['Velocidad operativa', 'Procesos multi-paso que llevaban semanas, resueltos en minutos: del intake a la aprobación, sin fricción entre sistemas.'],
			['Escala sin headcount', 'Tu back-office y tus equipos de atención manejan volúmenes mucho mayores, sin sumar gente ni degradar la calidad.'],
			['Mayor satisfacción del cliente', 'Solicitudes resueltas de punta a punta y respuestas en minutos, no en días. El cliente lo nota en cada interacción.']
		],
		workflows: [
			['Crédito y lending', 'El ciclo completo del crédito: intake, análisis, aprobación y servicing, ejecutado de punta a punta.'],
			['Riesgo y compliance', 'KYC, due diligence y monitoreo AML con escalamiento humano y traza de auditoría completa en cada decisión.'],
			['Atención al cliente', 'Solicitudes autenticadas y ejecutadas a través de cada sistema del banco, no solo respondidas.'],
			['Pagos y operaciones', 'Pagos, conciliación y gestión de casos de alto volumen, automatizados con control total.']
		],
		porque: [
			['IA de frontera, en producción', 'Los modelos más avanzados del mercado, ejecutando workflows bancarios reales hoy, no en un piloto eterno.'],
			['Una plataforma para toda la empresa', 'Crédito, riesgo, atención y operaciones sobre la misma plataforma, conectada con tus sistemas core.'],
			['Listo para reguladores', 'Trazabilidad completa, guardrails en tiempo real y protección de datos pensados para auditorías y supervisión.'],
			['Un partner, no un vendor', 'Acompañamos a tu equipo desde el primer workflow hasta la operación en escala, con resultados medibles.']
		]
	},
	{
		slug: 'telecom',
		nombre: 'Telecom',
		icono: 'antena',
		lead: 'Atención y operaciones para millones de clientes, resueltas de punta a punta.',
		beneficios: [
			['Contención a escala', 'Resolución automática de las consultas más frecuentes, sin derivar a operadores y sin degradar la experiencia.'],
			['Menos churn', 'Detección temprana de clientes en riesgo y acciones de retención proactivas, antes de que se vayan.'],
			['Costo por contacto a la baja', 'Automatización de los motivos de contacto de mayor volumen, con el costo por resolución cayendo mes a mes.']
		],
		workflows: [
			['Atención al cliente', 'Facturación, planes y soporte técnico resueltos end-to-end, en todos los canales.'],
			['Retención', 'Ofertas y gestiones de retención proactivas por WhatsApp y voz, activadas por señales de riesgo.'],
			['Ventas y upgrades', 'Venta cruzada y upgrades de plan en cada interacción, en el momento justo del contacto.'],
			['Soporte de campo', 'Coordinación de técnicos y visitas, del diagnóstico a la confirmación con el cliente.']
		],
		porque: [
			['IA de frontera, en producción', 'Los modelos más avanzados del mercado, atendiendo millones de contactos reales por mes, no una demo.'],
			['Una plataforma para toda la empresa', 'Atención, retención, ventas y campo sobre la misma plataforma, conectada con tu CRM y tu billing.'],
			['Listo para reguladores', 'Seguridad, guardrails y trazabilidad completas para operar a la escala y con el estándar que telecom exige.'],
			['Un partner, no un vendor', 'Trabajamos con tu equipo hasta que los números de contención y churn se mueven de verdad.']
		]
	},
	{
		slug: 'salud',
		nombre: 'Salud',
		icono: 'cruz',
		lead: 'La operación clínica y administrativa, sin fricción para pacientes ni equipos.',
		beneficios: [
			['Agenda llena', 'Turnos gestionados y confirmados automáticamente, con cada hueco de la agenda aprovechado.'],
			['Menos ausentismo', 'Recordatorios y reprogramación inteligente que reducen el no-show antes de que ocurra.'],
			['Equipos liberados', 'Administración automatizada de punta a punta: tu equipo dedica su tiempo al paciente, no al papeleo.']
		],
		workflows: [
			['Turnos y admisión', 'Agendamiento, confirmación e intake digital, resueltos antes de que el paciente llegue.'],
			['Seguimiento de pacientes', 'Post-consulta, medicación y controles por WhatsApp, con escalamiento al equipo cuando hace falta.'],
			['Autorizaciones y obras sociales', 'Gestión de autorizaciones y trámites con obras sociales, sin idas y vueltas manuales.'],
			['Atención a toda hora', 'Preguntas frecuentes, orientación y derivación disponibles siempre, en todos los canales.']
		],
		porque: [
			['IA de frontera, en producción', 'Los modelos más avanzados del mercado, gestionando pacientes y turnos reales todos los días.'],
			['Una plataforma para toda la empresa', 'Turnos, seguimiento, autorizaciones y atención sobre la misma plataforma, conectada con tus sistemas de gestión.'],
			['Listo para reguladores', 'Protección de datos sensibles, guardrails y trazabilidad completas para el estándar que la salud exige.'],
			['Un partner, no un vendor', 'Acompañamos a tus equipos clínicos y administrativos hasta que la operación funciona sola.']
		]
	},
	{
		slug: 'energia',
		nombre: 'Energía y utilities',
		icono: 'rayo',
		lead: 'Facturación, cobranzas y reclamos de servicios esenciales, automatizados.',
		beneficios: [
			['Facturación sin fricción', 'Consultas de facturación resueltas end-to-end, sin derivaciones ni esperas para el cliente.'],
			['Cobranzas efectivas', 'Gestión masiva y personalizada de la deuda, con el mensaje correcto por el canal correcto.'],
			['Reclamos más rápidos', 'Triage automático y derivación inmediata: cada reclamo llega al equipo correcto desde el primer contacto.']
		],
		workflows: [
			['Facturación', 'Consultas, duplicados y planes de pago resueltos en la misma interacción.'],
			['Cobranzas', 'Contacto, negociación y seguimiento multicanal de la cartera, con compromisos de pago registrados.'],
			['Reclamos y averías', 'Recepción, clasificación y derivación de reclamos técnicos, con seguimiento hasta la resolución.'],
			['Altas y cambios de servicio', 'Onboarding de nuevos clientes y gestiones de cambio de servicio, de la solicitud a la activación.']
		],
		porque: [
			['IA de frontera, en producción', 'Los modelos más avanzados del mercado, gestionando millones de cuentas y reclamos reales.'],
			['Una plataforma para toda la empresa', 'Facturación, cobranzas, reclamos y altas sobre la misma plataforma, conectada con tus sistemas comerciales.'],
			['Listo para reguladores', 'Trazabilidad, seguridad y guardrails para operar servicios esenciales con el estándar que el ente regulador exige.'],
			['Un partner, no un vendor', 'Acompañamos la operación hasta que los tiempos de resolución y la mora mueven la aguja.']
		]
	},
	{
		slug: 'seguros',
		nombre: 'Seguros',
		icono: 'escudo',
		lead: 'Cotización, siniestros y renovaciones a la velocidad que el cliente espera.',
		beneficios: [
			['Cotización inmediata', 'De la consulta a la cotización en la misma interacción, sin formularios eternos ni esperas.'],
			['Siniestros ágiles', 'Denuncia y seguimiento automatizados, con el asegurado informado en cada paso del proceso.'],
			['Renovaciones aseguradas', 'Gestión proactiva de la cartera: cada póliza contactada antes del vencimiento, no después.']
		],
		workflows: [
			['Cotización y venta', 'Cotización guiada por chat y WhatsApp, de la primera consulta a la emisión.'],
			['Siniestros', 'Denuncia, documentación y seguimiento de estado, con liquidación más rápida y menos fricción.'],
			['Renovaciones', 'Contacto proactivo y retención de pólizas, con ofertas personalizadas antes del vencimiento.'],
			['Atención a asegurados', 'Consultas de cobertura, pagos y documentación resueltas en el momento, en cualquier canal.']
		],
		porque: [
			['IA de frontera, en producción', 'Los modelos más avanzados del mercado, cotizando y gestionando siniestros reales hoy.'],
			['Una plataforma para toda la empresa', 'Venta, siniestros, renovaciones y atención sobre la misma plataforma, conectada con tu core de seguros.'],
			['Listo para reguladores', 'Trazabilidad completa, guardrails y protección de datos alineados con la supervisión del sector.'],
			['Un partner, no un vendor', 'Acompañamos a tu equipo hasta que la conversión y la retención de cartera muestran resultados.']
		]
	},
	{
		slug: 'retail',
		nombre: 'Retail',
		icono: 'bolsa',
		lead: 'Venta y atención omnicanal, personalizadas para cada cliente.',
		beneficios: [
			['Más conversión', 'Recomendación y acompañamiento en el momento de decidir, con la oferta correcta para cada cliente.'],
			['Atención a toda hora', 'Soporte en todos los canales, con la misma calidad a las 3 de la tarde o a las 3 de la mañana.'],
			['Clientes que vuelven', 'Re-engagement inteligente de clientes inactivos, con la oferta correcta por el canal preferido.']
		],
		workflows: [
			['Venta asistida', 'Recomendación de productos y cross-sell en tiempo real, mientras el cliente decide.'],
			['Estado de pedidos', 'Seguimiento y gestión post-venta: envíos, cambios y devoluciones sin fricción.'],
			['Atención omnicanal', 'Web, WhatsApp e Instagram en una sola operación, con el contexto del cliente siempre presente.'],
			['Re-engagement', 'Campañas de reactivación personalizadas, disparadas por comportamiento y canal preferido.']
		],
		porque: [
			['IA de frontera, en producción', 'Los modelos más avanzados del mercado, vendiendo y atendiendo clientes reales en cada canal.'],
			['Una plataforma para toda la empresa', 'Venta, post-venta, atención y re-engagement sobre la misma plataforma, conectada con tu e-commerce y tu CRM.'],
			['Listo para picos de demanda', 'Seguridad, protección de datos y guardrails para operar picos de demanda sin riesgos.'],
			['Un partner, no un vendor', 'Acompañamos a tu equipo hasta que la conversión y la recompra muestran resultados medibles.']
		]
	}
];
