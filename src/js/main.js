// Quantum Florida Management - Main JavaScript
(function () {
    'use strict';

    // ═══════════════════════════════════════════════════════════════
    // BILINGUAL TRANSLATIONS (EN / ES)
    // ═══════════════════════════════════════════════════════════════
    var translations = {
        // ── Navigation ──
        nav_home:           { en: 'Home',           es: 'Inicio' },
        nav_services:       { en: 'Services',       es: 'Servicios' },
        nav_pricing:        { en: 'Pricing',        es: 'Precios' },
        nav_about:          { en: 'About Us',       es: 'Nosotros' },
        nav_testimonials:   { en: 'Testimonials',   es: 'Testimonios' },
        nav_cta:            { en: 'Get Started',    es: 'Comenzar' },
        nav_login:          { en: 'Log In',         es: 'Ingresar' },

        // ── Hero ──
        hero_tagline:       { en: 'Licensed Property Management in Florida', es: 'Administraci\u00f3n de Propiedades Licenciada en Florida' },
        hero_title:         { en: 'Your Property.<br><span class="text-accent">Our Priority.</span>', es: 'Tu Propiedad.<br><span class="text-accent">Nuestra Prioridad.</span>' },
        hero_description:   { en: 'Full-service property management with a simple, transparent flat monthly fee. From maintenance coordination to HOA representation, rental management to sales assistance \u2014 we handle everything so you don\'t have to.', es: 'Administraci\u00f3n integral de propiedades con una tarifa mensual fija, simple y transparente. Desde coordinaci\u00f3n de mantenimiento hasta representaci\u00f3n en HOA, gesti\u00f3n de alquileres y asistencia en ventas \u2014 nosotros nos encargamos de todo.' },
        hero_btn_plans:     { en: 'View Our Plans', es: 'Ver Nuestros Planes' },
        hero_btn_consult:   { en: 'Free Consultation', es: 'Consulta Gratuita' },
        stat_properties:    { en: 'Properties Managed', es: 'Propiedades Administradas' },
        stat_satisfaction:  { en: 'Client Satisfaction', es: 'Satisfacci\u00f3n del Cliente' },
        stat_experience:    { en: 'Years Experience', es: 'A\u00f1os de Experiencia' },
        hero_card_title:    { en: 'Flat Fee. Full Service.', es: 'Tarifa Fija. Servicio Completo.' },
        hero_card_text:     { en: 'No hidden costs. No percentages. One predictable monthly fee covers all our management services.', es: 'Sin costos ocultos. Sin porcentajes. Una tarifa mensual predecible cubre todos nuestros servicios de administraci\u00f3n.' },

        // ── Services ──
        services_tagline:   { en: 'What We Do', es: 'Lo Que Hacemos' },
        services_title:     { en: 'Comprehensive Property Management Services', es: 'Servicios Integrales de Administraci\u00f3n de Propiedades' },
        services_subtitle:  { en: 'Everything you need to protect your investment and maximize your property\'s potential \u2014 all under one roof.', es: 'Todo lo que necesitas para proteger tu inversi\u00f3n y maximizar el potencial de tu propiedad \u2014 bajo un mismo techo.' },

        svc1_title: { en: 'Property Administration', es: 'Administraci\u00f3n de Propiedades' },
        svc1_desc:  { en: 'Complete day-to-day management of your property. We handle bill payments, insurance coordination, permit tracking, and all administrative tasks so you can focus on what matters most.', es: 'Gesti\u00f3n completa del d\u00eda a d\u00eda de tu propiedad. Nos encargamos de pagos de facturas, coordinaci\u00f3n de seguros, seguimiento de permisos y todas las tareas administrativas para que te enfoques en lo que m\u00e1s importa.' },
        svc1_f1: { en: 'Monthly financial reporting', es: 'Reportes financieros mensuales' },
        svc1_f2: { en: 'Bill payment & vendor management', es: 'Pago de facturas y gesti\u00f3n de proveedores' },
        svc1_f3: { en: 'Insurance policy coordination', es: 'Coordinaci\u00f3n de p\u00f3lizas de seguros' },
        svc1_f4: { en: '24/7 emergency response line', es: 'L\u00ednea de emergencias 24/7' },

        svc2_title: { en: 'Maintenance & Repairs', es: 'Mantenimiento y Reparaciones' },
        svc2_desc:  { en: 'Proactive and reactive maintenance management. Our vetted network of licensed contractors ensures quality work at competitive prices, with full transparency on every job.', es: 'Gesti\u00f3n de mantenimiento proactivo y reactivo. Nuestra red de contratistas licenciados garantiza trabajo de calidad a precios competitivos, con total transparencia en cada trabajo.' },
        svc2_f1: { en: 'Licensed & insured contractor network', es: 'Red de contratistas licenciados y asegurados' },
        svc2_f2: { en: 'Preventive maintenance scheduling', es: 'Programaci\u00f3n de mantenimiento preventivo' },
        svc2_f3: { en: 'Emergency repair coordination', es: 'Coordinaci\u00f3n de reparaciones de emergencia' },
        svc2_f4: { en: 'Quality inspections & photo reports', es: 'Inspecciones de calidad e informes fotogr\u00e1ficos' },

        svc3_title: { en: 'HOA Representation', es: 'Representaci\u00f3n ante el HOA' },
        svc3_desc:  { en: 'We attend HOA meetings on your behalf, stay on top of rule changes, handle violation notices, and ensure your property stays compliant. Never miss an important community decision again.', es: 'Asistimos a las reuniones del HOA en tu nombre, monitoreamos cambios de reglas, gestionamos notificaciones de violaciones y aseguramos que tu propiedad cumpla con las normas. Nunca m\u00e1s te pierdas una decisi\u00f3n importante de la comunidad.' },
        svc3_f1: { en: 'Board meeting attendance & reporting', es: 'Asistencia a juntas directivas e informes' },
        svc3_f2: { en: 'Violation notice resolution', es: 'Resoluci\u00f3n de notificaciones de violaciones' },
        svc3_f3: { en: 'Rule compliance monitoring', es: 'Monitoreo de cumplimiento de normas' },
        svc3_f4: { en: 'Assessment & fee tracking', es: 'Seguimiento de evaluaciones y cuotas' },

        svc4_title: { en: 'Rental Management', es: 'Gesti\u00f3n de Alquileres' },
        svc4_desc:  { en: 'Maximize your rental income with our full-service leasing support. We coordinate with licensed realtors to find qualified tenants, handle lease agreements, and manage the entire rental cycle.', es: 'Maximiza tus ingresos por alquiler con nuestro servicio completo de arrendamiento. Coordinamos con agentes inmobiliarios licenciados para encontrar inquilinos calificados, manejar contratos de arrendamiento y gestionar todo el ciclo de renta.' },
        svc4_f1: { en: 'Tenant screening & placement', es: 'Evaluaci\u00f3n y colocaci\u00f3n de inquilinos' },
        svc4_f2: { en: 'Lease preparation & execution', es: 'Preparaci\u00f3n y ejecuci\u00f3n de contratos' },
        svc4_f3: { en: 'Rent collection & disbursement', es: 'Cobro y desembolso de rentas' },
        svc4_f4: { en: 'Move-in/move-out inspections', es: 'Inspecciones de entrada y salida' },

        svc5_title: { en: 'Sales Coordination', es: 'Coordinaci\u00f3n de Ventas' },
        svc5_desc:  { en: 'Ready to sell? We connect you with top-performing licensed realtors in your area, coordinate property preparation, and manage the entire process to help you get the best possible return.', es: '\u00bfListo para vender? Te conectamos con los mejores agentes inmobiliarios licenciados de tu zona, coordinamos la preparaci\u00f3n de la propiedad y gestionamos todo el proceso para ayudarte a obtener el mejor retorno posible.' },
        svc5_f1: { en: 'Licensed realtor referral network', es: 'Red de referidos de agentes licenciados' },
        svc5_f2: { en: 'Pre-sale property preparation', es: 'Preparaci\u00f3n de propiedad para la venta' },
        svc5_f3: { en: 'Market analysis & pricing guidance', es: 'An\u00e1lisis de mercado y gu\u00eda de precios' },
        svc5_f4: { en: 'Closing coordination support', es: 'Soporte en coordinaci\u00f3n de cierre' },

        svc6_title: { en: 'Financial Oversight', es: 'Supervisi\u00f3n Financiera' },
        svc6_desc:  { en: 'Crystal-clear financial management with detailed monthly statements, expense tracking, and year-end reporting. We keep every dollar accounted for and your records tax-ready.', es: 'Gesti\u00f3n financiera transparente con estados de cuenta mensuales detallados, seguimiento de gastos e informes de fin de a\u00f1o. Mantenemos cada d\u00f3lar contabilizado y tus registros listos para impuestos.' },
        svc6_f1: { en: 'Detailed monthly statements', es: 'Estados de cuenta mensuales detallados' },
        svc6_f2: { en: 'Expense categorization & tracking', es: 'Categorizaci\u00f3n y seguimiento de gastos' },
        svc6_f3: { en: 'Year-end tax documentation (1099s)', es: 'Documentaci\u00f3n fiscal de fin de a\u00f1o (1099s)' },
        svc6_f4: { en: 'Online owner portal access', es: 'Acceso al portal del propietario en l\u00ednea' },

        // ── Why Us ──
        why_tagline:    { en: 'Why Quantum', es: 'Por Qu\u00e9 Quantum' },
        why_title:      { en: 'The Flat-Fee Advantage', es: 'La Ventaja de la Tarifa Fija' },
        why_text:       { en: 'Traditional property managers charge a percentage of your rent \u2014 meaning the more you earn, the more they take. At Quantum Florida Management, we believe in a different approach.', es: 'Los administradores tradicionales cobran un porcentaje de tu renta \u2014 lo que significa que mientras m\u00e1s ganas, m\u00e1s se llevan. En Quantum Florida Management, creemos en un enfoque diferente.' },
        why_f1_title:   { en: 'Predictable Monthly Cost', es: 'Costo Mensual Predecible' },
        why_f1_text:    { en: 'One flat fee covers all our management services. No surprises, no hidden charges, no percentage cuts.', es: 'Una tarifa fija cubre todos nuestros servicios de administraci\u00f3n. Sin sorpresas, sin cargos ocultos, sin porcentajes.' },
        why_f2_title:   { en: 'Aligned Interests', es: 'Intereses Alineados' },
        why_f2_text:    { en: 'We don\'t profit more when your costs go up. Our success is tied to your satisfaction, not your expenses.', es: 'No ganamos m\u00e1s cuando tus costos suben. Nuestro \u00e9xito est\u00e1 ligado a tu satisfacci\u00f3n, no a tus gastos.' },
        why_f3_title:   { en: 'Licensed & Insured', es: 'Licenciados y Asegurados' },
        why_f3_text:    { en: 'Fully compliant with Florida statutes. Licensed property managers and partnerships with authorized realtors.', es: 'Totalmente conformes con las leyes de Florida. Administradores de propiedades licenciados y alianzas con agentes inmobiliarios autorizados.' },
        why_f4_title:   { en: 'Local Expertise', es: 'Experiencia Local' },
        why_f4_text:    { en: 'Deep knowledge of Florida\'s property laws, HOA regulations, landlord-tenant statutes, and local market conditions.', es: 'Profundo conocimiento de las leyes de propiedad de Florida, regulaciones de HOA, estatutos de arrendador-inquilino y condiciones del mercado local.' },

        comp_traditional: { en: 'Traditional Manager', es: 'Administrador Tradicional' },
        comp_t1: { en: '8-12% of monthly rent', es: '8-12% de la renta mensual' },
        comp_t2: { en: 'Leasing fees up to 100% first month', es: 'Comisiones de arrendamiento hasta 100% del primer mes' },
        comp_t3: { en: 'Maintenance markups 10-20%', es: 'Recargos de mantenimiento 10-20%' },
        comp_t4: { en: 'Hidden fees & surcharges', es: 'Cargos ocultos y recargos' },
        comp_quantum: { en: 'Quantum Florida', es: 'Quantum Florida' },
        comp_q1: { en: 'One flat monthly fee', es: 'Una tarifa mensual fija' },
        comp_q2: { en: 'No leasing commissions', es: 'Sin comisiones de arrendamiento' },
        comp_q3: { en: 'Transparent contractor pricing', es: 'Precios transparentes de contratistas' },
        comp_q4: { en: 'Zero hidden costs', es: 'Cero costos ocultos' },

        // ── Pricing ──
        pricing_tagline:  { en: 'Simple Pricing', es: 'Precios Simples' },
        pricing_title:    { en: 'Flat-Fee Plans That Make Sense', es: 'Planes de Tarifa Fija Que Tienen Sentido' },
        pricing_subtitle: { en: 'Choose the plan that fits your property. No hidden fees. No percentages. Cancel anytime with 30-day notice.', es: 'Elige el plan que se ajuste a tu propiedad. Sin cargos ocultos. Sin porcentajes. Cancela en cualquier momento con 30 d\u00edas de aviso.' },
        price_period:     { en: '/month', es: '/mes' },
        btn_get_started:  { en: 'Get Started', es: 'Comenzar' },
        badge_popular:    { en: 'Most Popular', es: 'M\u00e1s Popular' },

        plan1_name: { en: 'Essential', es: 'Esencial' },
        plan1_desc: { en: 'Perfect for single-unit condos and apartments', es: 'Perfecto para condominios y apartamentos de una unidad' },
        plan1_f1: { en: 'Property administration', es: 'Administraci\u00f3n de propiedad' },
        plan1_f2: { en: 'Maintenance coordination', es: 'Coordinaci\u00f3n de mantenimiento' },
        plan1_f3: { en: 'Monthly financial reports', es: 'Reportes financieros mensuales' },
        plan1_f4: { en: 'Online owner portal', es: 'Portal del propietario en l\u00ednea' },
        plan1_f5: { en: 'Emergency response line', es: 'L\u00ednea de respuesta de emergencias' },
        plan1_f6: { en: 'HOA meeting attendance', es: 'Asistencia a reuniones de HOA' },
        plan1_f7: { en: 'Rental/sales coordination', es: 'Coordinaci\u00f3n de alquileres/ventas' },

        plan2_name: { en: 'Professional', es: 'Profesional' },
        plan2_desc: { en: 'Full-service management for rental properties', es: 'Administraci\u00f3n completa para propiedades en alquiler' },
        plan2_f1: { en: 'Everything in Essential', es: 'Todo lo del plan Esencial' },
        plan2_f2: { en: 'HOA meeting representation', es: 'Representaci\u00f3n en reuniones de HOA' },
        plan2_f3: { en: 'Tenant screening & placement', es: 'Evaluaci\u00f3n y colocaci\u00f3n de inquilinos' },
        plan2_f4: { en: 'Rent collection & disbursement', es: 'Cobro y desembolso de rentas' },
        plan2_f5: { en: 'Lease management', es: 'Gesti\u00f3n de contratos de arrendamiento' },
        plan2_f6: { en: 'Licensed realtor coordination', es: 'Coordinaci\u00f3n con agentes licenciados' },
        plan2_f7: { en: 'Year-end tax documentation', es: 'Documentaci\u00f3n fiscal de fin de a\u00f1o' },

        plan3_name: { en: 'Premium', es: 'Premium' },
        plan3_desc: { en: 'Multi-unit portfolios & investment properties', es: 'Portafolios multi-unidad y propiedades de inversi\u00f3n' },
        plan3_f1: { en: 'Everything in Professional', es: 'Todo lo del plan Profesional' },
        plan3_f2: { en: 'Up to 4 units per property', es: 'Hasta 4 unidades por propiedad' },
        plan3_f3: { en: 'Priority maintenance response', es: 'Respuesta prioritaria de mantenimiento' },
        plan3_f4: { en: 'Quarterly property inspections', es: 'Inspecciones trimestrales de propiedad' },
        plan3_f5: { en: 'Sales coordination & staging', es: 'Coordinaci\u00f3n de ventas y staging' },
        plan3_f6: { en: 'Dedicated account manager', es: 'Gerente de cuenta dedicado' },
        plan3_f7: { en: 'Investment performance reports', es: 'Reportes de rendimiento de inversi\u00f3n' },

        pricing_note: { en: 'All plans include a 30-day satisfaction guarantee. Maintenance and contractor costs are billed separately at cost with no markup.', es: 'Todos los planes incluyen garant\u00eda de satisfacci\u00f3n de 30 d\u00edas. Los costos de mantenimiento y contratistas se facturan por separado al costo, sin recargo.' },

        // ── About ──
        about_tagline: { en: 'About Us', es: 'Sobre Nosotros' },
        about_title:   { en: 'Trusted Property Management Across Florida', es: 'Administraci\u00f3n de Propiedades de Confianza en Toda Florida' },
        about_text1:   { en: 'Quantum Florida Management was founded on a simple principle: property owners deserve transparent, reliable management at a fair price. We saw an industry filled with hidden fees and conflicting incentives, and decided to build something better.', es: 'Quantum Florida Management fue fundada bajo un principio simple: los propietarios merecen una administraci\u00f3n transparente, confiable y a un precio justo. Vimos una industria llena de cargos ocultos e incentivos conflictivos, y decidimos construir algo mejor.' },
        about_text2:   { en: 'Our team brings together licensed property managers, experienced maintenance coordinators, and strong partnerships with authorized Florida realtors. Whether you own a condo in Miami, a townhouse in Orlando, or an investment property in Tampa \u2014 we have the local expertise to protect and grow your asset.', es: 'Nuestro equipo re\u00fane administradores de propiedades licenciados, coordinadores de mantenimiento con experiencia y s\u00f3lidas alianzas con agentes inmobiliarios autorizados en Florida. Ya sea que tengas un condominio en Miami, un townhouse en Orlando o una propiedad de inversi\u00f3n en Tampa \u2014 tenemos la experiencia local para proteger y hacer crecer tu activo.' },
        cred_licensed: { en: 'Florida Licensed', es: 'Licenciados en Florida' },
        cred_insured:  { en: 'Fully Insured', es: 'Completamente Asegurados' },
        cred_narpm:    { en: 'NARPM Member', es: 'Miembro de NARPM' },
        about_serving: { en: 'Serving All of Florida', es: 'Sirviendo a Toda Florida' },

        // ── Process ──
        process_tagline: { en: 'How It Works', es: 'C\u00f3mo Funciona' },
        process_title:   { en: 'Getting Started Is Simple', es: 'Comenzar Es Simple' },
        step1_title: { en: 'Free Consultation', es: 'Consulta Gratuita' },
        step1_text:  { en: 'Tell us about your property and goals. We\'ll assess your needs and recommend the right plan.', es: 'Cu\u00e9ntanos sobre tu propiedad y tus objetivos. Evaluaremos tus necesidades y te recomendaremos el plan adecuado.' },
        step2_title: { en: 'Property Onboarding', es: 'Integraci\u00f3n de Propiedad' },
        step2_text:  { en: 'We conduct a thorough property assessment, set up your owner portal, and establish vendor relationships.', es: 'Realizamos una evaluaci\u00f3n completa de la propiedad, configuramos tu portal de propietario y establecemos relaciones con proveedores.' },
        step3_title: { en: 'Active Management', es: 'Administraci\u00f3n Activa' },
        step3_text:  { en: 'Sit back while we handle the day-to-day. Receive monthly reports and stay informed through your portal.', es: 'Rel\u00e1jate mientras nosotros nos encargamos del d\u00eda a d\u00eda. Recibe reportes mensuales y mantente informado a trav\u00e9s de tu portal.' },

        // ── Testimonials ──
        test_tagline: { en: 'Testimonials', es: 'Testimonios' },
        test_title:   { en: 'What Our Clients Say', es: 'Lo Que Dicen Nuestros Clientes' },
        test1_text:   { en: '"I was paying my previous manager over $300/month in percentage fees alone. Quantum\'s flat fee saves me real money, and the service is significantly better. They attend every HOA meeting and keep me updated on everything."', es: '"Le pagaba a mi administrador anterior m\u00e1s de $300/mes solo en comisiones porcentuales. La tarifa fija de Quantum me ahorra dinero real, y el servicio es significativamente mejor. Asisten a cada reuni\u00f3n del HOA y me mantienen informada de todo."' },
        test1_role:   { en: 'Condo Owner, Miami Beach', es: 'Propietaria de Condominio, Miami Beach' },
        test2_text:   { en: '"As an out-of-state investor with three rental units in Orlando, having Quantum manage everything gives me complete peace of mind. Their maintenance team is responsive and their financial reporting is impeccable."', es: '"Como inversionista fuera del estado con tres unidades de alquiler en Orlando, tener a Quantum administrando todo me da total tranquilidad. Su equipo de mantenimiento es eficiente y sus reportes financieros son impecables."' },
        test2_role:   { en: 'Investment Property Owner, Orlando', es: 'Propietario de Inversi\u00f3n, Orlando' },
        test3_text:   { en: '"When it was time to sell my property, Quantum connected me with an excellent realtor and coordinated all the preparation work. The property sold above asking price in just two weeks. Couldn\'t be happier."', es: '"Cuando lleg\u00f3 el momento de vender mi propiedad, Quantum me conect\u00f3 con un excelente agente inmobiliario y coordin\u00f3 todo el trabajo de preparaci\u00f3n. La propiedad se vendi\u00f3 por encima del precio solicitado en solo dos semanas. No podr\u00eda estar m\u00e1s contento."' },
        test3_role:   { en: 'Former Owner, Tampa', es: 'Ex Propietario, Tampa' },

        // ── CTA ──
        cta_title: { en: 'Ready to Simplify Your Property Management?', es: '\u00bfListo para Simplificar la Administraci\u00f3n de tu Propiedad?' },
        cta_text:  { en: 'Join hundreds of Florida property owners who trust Quantum to protect their investments. Schedule a free consultation today.', es: '\u00danete a cientos de propietarios en Florida que conf\u00edan en Quantum para proteger sus inversiones. Agenda una consulta gratuita hoy.' },
        cta_btn1:  { en: 'Schedule Free Consultation', es: 'Agendar Consulta Gratuita' },
        cta_btn2:  { en: 'Call (305) 555-1234', es: 'Llamar (305) 555-1234' },

        // ── Contact ──
        contact_tagline:      { en: 'Contact Us', es: 'Cont\u00e1ctanos' },
        contact_title:        { en: 'Let\'s Talk About Your Property', es: 'Hablemos Sobre Tu Propiedad' },
        contact_text:         { en: 'Whether you have questions about our services, need a custom quote for multiple properties, or are ready to get started \u2014 we\'re here to help.', es: 'Ya sea que tengas preguntas sobre nuestros servicios, necesites una cotizaci\u00f3n personalizada para m\u00faltiples propiedades, o est\u00e9s listo para comenzar \u2014 estamos aqu\u00ed para ayudarte.' },
        contact_phone_label:  { en: 'Phone', es: 'Tel\u00e9fono' },
        contact_email_label:  { en: 'Email', es: 'Correo' },
        contact_office_label: { en: 'Office', es: 'Oficina' },
        contact_office_text:  { en: 'Serving All of Florida<br>Miami | Orlando | Tampa | Jacksonville', es: 'Sirviendo a Toda Florida<br>Miami | Orlando | Tampa | Jacksonville' },

        // ── Form ──
        form_name:           { en: 'Full Name', es: 'Nombre Completo' },
        form_name_ph:        { en: 'John Smith', es: 'Juan P\u00e9rez' },
        form_email:          { en: 'Email', es: 'Correo Electr\u00f3nico' },
        form_phone:          { en: 'Phone', es: 'Tel\u00e9fono' },
        form_service:        { en: 'I\'m Interested In', es: 'Me Interesa' },
        form_select_default: { en: 'Select a service...', es: 'Selecciona un servicio...' },
        form_opt_admin:      { en: 'Property Administration', es: 'Administraci\u00f3n de Propiedades' },
        form_opt_maint:      { en: 'Maintenance & Repairs', es: 'Mantenimiento y Reparaciones' },
        form_opt_hoa:        { en: 'HOA Representation', es: 'Representaci\u00f3n ante el HOA' },
        form_opt_rental:     { en: 'Rental Management', es: 'Gesti\u00f3n de Alquileres' },
        form_opt_sales:      { en: 'Sales Coordination', es: 'Coordinaci\u00f3n de Ventas' },
        form_opt_full:       { en: 'Full-Service Management', es: 'Administraci\u00f3n Integral' },
        form_message:        { en: 'Tell Us About Your Property', es: 'Cu\u00e9ntanos Sobre Tu Propiedad' },
        form_message_ph:     { en: 'Property type, location, number of units...', es: 'Tipo de propiedad, ubicaci\u00f3n, n\u00famero de unidades...' },
        form_submit:         { en: 'Send Message', es: 'Enviar Mensaje' },
        form_disclaimer:     { en: 'By submitting this form, you agree to be contacted regarding property management services. We respect your privacy.', es: 'Al enviar este formulario, aceptas ser contactado sobre servicios de administraci\u00f3n de propiedades. Respetamos tu privacidad.' },

        // ── Footer ──
        footer_tagline:      { en: 'Professional property management with transparent flat-fee pricing. Serving property owners across the state of Florida.', es: 'Administraci\u00f3n profesional de propiedades con precios transparentes de tarifa fija. Sirviendo a propietarios en todo el estado de Florida.' },
        footer_services:     { en: 'Services', es: 'Servicios' },
        footer_company:      { en: 'Company', es: 'Compa\u00f1\u00eda' },
        footer_areas:        { en: 'Service Areas', es: '\u00c1reas de Servicio' },
        footer_contact_link: { en: 'Contact', es: 'Contacto' },
        footer_copy:         { en: '\u00a9 2026 Quantum Florida Management. All rights reserved.', es: '\u00a9 2026 Quantum Florida Management. Todos los derechos reservados.' },
        footer_privacy:      { en: 'Privacy Policy', es: 'Pol\u00edtica de Privacidad' },
        footer_terms:        { en: 'Terms of Service', es: 'T\u00e9rminos de Servicio' },
        footer_fair:         { en: 'Fair Housing Statement', es: 'Declaraci\u00f3n de Vivienda Justa' },
        footer_portals:      { en: 'Portals', es: 'Portales' },
        footer_portal_login: { en: 'Sign In to Portal', es: 'Iniciar Sesion en Portal' },

        // ── FAQ ──
        nav_faq:             { en: 'FAQ', es: 'Preguntas' },
        faq_tagline:         { en: 'Frequently Asked Questions', es: 'Preguntas Frecuentes' },
        faq_title:           { en: 'Common Questions About Our Services', es: 'Preguntas Comunes Sobre Nuestros Servicios' },
        faq_q1: { en: 'How much does property management cost in Florida?', es: '\u00bfCu\u00e1nto cuesta la administraci\u00f3n de propiedades en Florida?' },
        faq_a1: { en: 'Our flat-fee plans start at just $149/month for single-unit condos and apartments. Unlike traditional property managers who charge 8-12% of monthly rent plus leasing fees, our transparent pricing means no surprises. Choose from Essential ($149), Professional ($249), or Premium ($399) depending on your needs.', es: 'Nuestros planes de tarifa fija comienzan en solo $149/mes para condominios y apartamentos de una unidad. A diferencia de los administradores tradicionales que cobran 8-12% de la renta mensual m\u00e1s comisiones, nuestros precios transparentes significan cero sorpresas. Elige entre Esencial ($149), Profesional ($249) o Premium ($399) seg\u00fan tus necesidades.' },
        faq_q2: { en: 'Do you manage properties in Miami, Orlando, and Tampa?', es: '\u00bfAdministran propiedades en Miami, Orlando y Tampa?' },
        faq_a2: { en: 'Yes! Quantum Florida Management serves property owners throughout the state of Florida, including Miami-Dade, Broward County (Fort Lauderdale), Orange County (Orlando), Hillsborough County (Tampa), and Duval County (Jacksonville). Our local expertise covers HOA regulations, landlord-tenant laws, and market conditions specific to each area.', es: '\u00a1S\u00ed! Quantum Florida Management sirve a propietarios en todo el estado de Florida, incluyendo Miami-Dade, Broward County (Fort Lauderdale), Orange County (Orlando), Hillsborough County (Tampa) y Duval County (Jacksonville). Nuestra experiencia local cubre regulaciones de HOA, leyes de arrendador-inquilino y condiciones de mercado espec\u00edficas de cada \u00e1rea.' },
        faq_q3: { en: 'What does HOA management include?', es: '\u00bfQu\u00e9 incluye la administraci\u00f3n del HOA?' },
        faq_a3: { en: 'Our HOA representation service includes attending board meetings on your behalf, monitoring rule changes, resolving violation notices, tracking assessments and fees, and ensuring your property stays fully compliant with community regulations. This service is included in our Professional and Premium plans.', es: 'Nuestro servicio de representaci\u00f3n ante el HOA incluye asistir a reuniones de la junta directiva en tu nombre, monitorear cambios de reglas, resolver notificaciones de violaciones, dar seguimiento a evaluaciones y cuotas, y asegurar que tu propiedad cumpla con las regulaciones de la comunidad. Este servicio est\u00e1 incluido en nuestros planes Profesional y Premium.' },
        faq_q4: { en: 'Are you licensed property managers in Florida?', es: '\u00bfSon administradores de propiedades licenciados en Florida?' },
        faq_a4: { en: 'Absolutely. Quantum Florida Management is fully licensed and insured in compliance with Florida statutes. We are also members of NARPM (National Association of Residential Property Managers). Our partnerships with authorized Florida realtors ensure all rental and sales transactions are handled by properly licensed professionals.', es: 'Absolutamente. Quantum Florida Management est\u00e1 totalmente licenciado y asegurado en cumplimiento con las leyes de Florida. Tambi\u00e9n somos miembros de NARPM (Asociaci\u00f3n Nacional de Administradores de Propiedades Residenciales). Nuestras alianzas con agentes inmobiliarios autorizados en Florida aseguran que todas las transacciones de alquiler y venta sean manejadas por profesionales debidamente licenciados.' },
        faq_q5: { en: 'How do you handle rental property maintenance?', es: '\u00bfC\u00f3mo manejan el mantenimiento de propiedades en alquiler?' },
        faq_a5: { en: 'We manage both preventive and reactive maintenance through our vetted network of licensed and insured contractors. This includes scheduling routine maintenance, coordinating emergency repairs through our 24/7 response line, conducting quality inspections with photo reports, and ensuring all work is completed at competitive prices with full transparency \u2014 no markups.', es: 'Gestionamos tanto el mantenimiento preventivo como el reactivo a trav\u00e9s de nuestra red verificada de contratistas licenciados y asegurados. Esto incluye programar mantenimiento rutinario, coordinar reparaciones de emergencia a trav\u00e9s de nuestra l\u00ednea de respuesta 24/7, realizar inspecciones de calidad con informes fotogr\u00e1ficos, y asegurar que todo el trabajo se complete a precios competitivos con total transparencia \u2014 sin recargos.' },
        faq_q6: { en: 'Can I cancel my property management contract?', es: '\u00bfPuedo cancelar mi contrato de administraci\u00f3n de propiedades?' },
        faq_a6: { en: 'Yes, all our plans can be cancelled with just 30 days written notice. We also include a 30-day satisfaction guarantee when you first sign up. There are no long-term commitments or early cancellation penalties. We earn your business every month through quality service.', es: 'S\u00ed, todos nuestros planes pueden cancelarse con solo 30 d\u00edas de aviso por escrito. Tambi\u00e9n incluimos una garant\u00eda de satisfacci\u00f3n de 30 d\u00edas cuando te inscribes por primera vez. No hay compromisos a largo plazo ni penalidades por cancelaci\u00f3n anticipada. Nos ganamos tu confianza cada mes con un servicio de calidad.' },
        faq_q7: { en: 'Do you help find tenants for rental properties?', es: '\u00bfAyudan a encontrar inquilinos para propiedades en alquiler?' },
        faq_a7: { en: 'Yes! Our Professional and Premium plans include full rental management: tenant screening and background checks, lease preparation and execution, rent collection and disbursement, and move-in/move-out inspections. We coordinate with licensed realtors to market your property and find qualified tenants quickly.', es: '\u00a1S\u00ed! Nuestros planes Profesional y Premium incluyen gesti\u00f3n completa de alquileres: evaluaci\u00f3n de inquilinos y verificaci\u00f3n de antecedentes, preparaci\u00f3n y ejecuci\u00f3n de contratos de arrendamiento, cobro y desembolso de rentas, e inspecciones de entrada y salida. Coordinamos con agentes inmobiliarios licenciados para promocionar tu propiedad y encontrar inquilinos calificados r\u00e1pidamente.' },
        faq_q8: { en: '\u00bfHablan espa\u00f1ol? / Do you speak Spanish?', es: '\u00bfHablan espa\u00f1ol? / Do you speak Spanish?' },
        faq_a8: { en: 'Yes! Our team is fully bilingual (English and Spanish). We serve a large Spanish-speaking community across Florida and all our services, reports, and communications are available in both languages. Use the language toggle on this page to view our entire site in Spanish.', es: '\u00a1S\u00ed! Nuestro equipo es completamente biling\u00fce (ingl\u00e9s y espa\u00f1ol). Servimos a una gran comunidad hispanohablante en toda Florida y todos nuestros servicios, reportes y comunicaciones est\u00e1n disponibles en ambos idiomas. Usa el bot\u00f3n de idioma en esta p\u00e1gina para ver todo nuestro sitio en espa\u00f1ol.' }
    };

    // ═══════════════════════════════════════════════════════════════
    // LANGUAGE SWITCHER
    // ═══════════════════════════════════════════════════════════════
    // Detect language from URL parameter (for SEO hreflang support)
    var urlParams = new URLSearchParams(window.location.search);
    var urlLang   = urlParams.get('lang');
    var currentLang = (urlLang === 'en' || urlLang === 'es') ? urlLang : (localStorage.getItem('qfm_lang') || 'en');
    var langToggle  = document.getElementById('langToggle');
    var langFlag    = document.getElementById('langFlag');
    var langLabel   = document.getElementById('langLabel');

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('qfm_lang', lang);
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('data-lang', lang);

        // Update toggle button to show the OTHER language (the one you'd switch TO)
        if (lang === 'en') {
            langFlag.textContent  = '\ud83c\uddea\ud83c\uddf8';
            langLabel.textContent = 'ES';
        } else {
            langFlag.textContent  = '\ud83c\uddfa\ud83c\uddf8';
            langLabel.textContent = 'EN';
        }

        // Translate all elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (translations[key] && translations[key][lang]) {
                if (el.tagName === 'OPTION') {
                    el.textContent = translations[key][lang];
                } else {
                    el.innerHTML = translations[key][lang];
                }
            }
        });

        // Translate placeholders
        document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-ph');
            if (translations[key] && translations[key][lang]) {
                el.placeholder = translations[key][lang];
            }
        });

        // Update page title
        if (lang === 'es') {
            document.title = 'Quantum Florida Management | Administraci\u00f3n Profesional de Propiedades en Florida';
        } else {
            document.title = 'Quantum Florida Management | Professional Property Management in Florida';
        }
    }

    langToggle.addEventListener('click', function () {
        var newLang = currentLang === 'en' ? 'es' : 'en';
        setLanguage(newLang);

        // Update URL with language parameter for SEO hreflang support
        var url = new URL(window.location.href);
        url.searchParams.set('lang', newLang);
        history.pushState({ lang: newLang }, '', url.toString());

        // Add a bounce animation on click
        langToggle.classList.add('lang-toggle--bounce');
        setTimeout(function () {
            langToggle.classList.remove('lang-toggle--bounce');
        }, 400);
    });

    // ═══════════════════════════════════════════════════════════════
    // APPLY ADMIN CONTENT FROM LOCALSTORAGE
    // ═══════════════════════════════════════════════════════════════
    (function applyAdminContent() {
        try {
            var raw = localStorage.getItem('qfm_data');
            if (!raw) return;
            var data = JSON.parse(raw);
            var c = data.siteContent;
            if (!c) return;

            // Override bilingual translations with admin-edited values
            if (c.hero_tagline_en || c.hero_tagline_es) {
                translations.hero_tagline = { en: c.hero_tagline_en || translations.hero_tagline.en, es: c.hero_tagline_es || translations.hero_tagline.es };
            }
            if (c.hero_title_en || c.hero_title_es) {
                translations.hero_title = { en: c.hero_title_en || translations.hero_title.en, es: c.hero_title_es || translations.hero_title.es };
            }
            if (c.hero_desc_en || c.hero_desc_es) {
                translations.hero_description = { en: c.hero_desc_en || translations.hero_description.en, es: c.hero_desc_es || translations.hero_description.es };
            }
            if (c.plan1_desc_en || c.plan1_desc_es) {
                translations.plan1_desc = { en: c.plan1_desc_en || translations.plan1_desc.en, es: c.plan1_desc_es || translations.plan1_desc.es };
            }
            if (c.plan2_desc_en || c.plan2_desc_es) {
                translations.plan2_desc = { en: c.plan2_desc_en || translations.plan2_desc.en, es: c.plan2_desc_es || translations.plan2_desc.es };
            }
            if (c.plan3_desc_en || c.plan3_desc_es) {
                translations.plan3_desc = { en: c.plan3_desc_en || translations.plan3_desc.en, es: c.plan3_desc_es || translations.plan3_desc.es };
            }
            if (c.about1_en || c.about1_es) {
                translations.about_text1 = { en: c.about1_en || translations.about_text1.en, es: c.about1_es || translations.about_text1.es };
            }
            if (c.about2_en || c.about2_es) {
                translations.about_text2 = { en: c.about2_en || translations.about_text2.en, es: c.about2_es || translations.about_text2.es };
            }

            // Update pricing amounts
            var p1 = document.getElementById('price1');
            var p2 = document.getElementById('price2');
            var p3 = document.getElementById('price3');
            if (p1 && c.price1) p1.textContent = c.price1;
            if (p2 && c.price2) p2.textContent = c.price2;
            if (p3 && c.price3) p3.textContent = c.price3;

            // Update stat counters (data-target drives the animation)
            var s1 = document.getElementById('statProperties');
            var s2 = document.getElementById('statSatisfaction');
            var s3 = document.getElementById('statYears');
            if (s1 && c.stat_properties)  s1.setAttribute('data-target', c.stat_properties);
            if (s2 && c.stat_satisfaction) s2.setAttribute('data-target', c.stat_satisfaction);
            if (s3 && c.stat_years)        s3.setAttribute('data-target', c.stat_years);

        } catch (e) { /* silently ignore parse errors */ }
    })();

    // Apply saved language on load
    setLanguage(currentLang);


    // ═══════════════════════════════════════════════════════════════
    // HEADER SCROLL EFFECT
    // ═══════════════════════════════════════════════════════════════
    var header = document.getElementById('header');

    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ═══════════════════════════════════════════════════════════════
    // MOBILE NAVIGATION
    // ═══════════════════════════════════════════════════════════════
    var navToggle = document.getElementById('navToggle');
    var navMenu   = document.getElementById('navMenu');

    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    document.querySelectorAll('.nav__link').forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // ═══════════════════════════════════════════════════════════════
    // ACTIVE NAVIGATION LINK
    // ═══════════════════════════════════════════════════════════════
    var sections = document.querySelectorAll('section[id]');

    function highlightNav() {
        var scrollY = window.scrollY + 100;
        sections.forEach(function (section) {
            var sectionTop    = section.offsetTop;
            var sectionHeight = section.offsetHeight;
            var sectionId     = section.getAttribute('id');
            var navLink       = document.querySelector('.nav__link[href="#' + sectionId + '"]');

            if (navLink && scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav__link').forEach(function (l) {
                    l.classList.remove('active');
                });
                navLink.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });

    // ═══════════════════════════════════════════════════════════════
    // SMOOTH SCROLL
    // ═══════════════════════════════════════════════════════════════
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            var target   = document.querySelector(targetId);
            if (target) {
                var headerHeight    = header.offsetHeight;
                var targetPosition  = target.offsetTop - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // ═══════════════════════════════════════════════════════════════
    // ANIMATED COUNTERS
    // ═══════════════════════════════════════════════════════════════
    function animateCounters() {
        var counters = document.querySelectorAll('.stat__number');
        counters.forEach(function (counter) {
            var target   = parseInt(counter.getAttribute('data-target'), 10);
            var duration = 2000;
            var step     = target / (duration / 16);
            var current  = 0;

            function update() {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            }
            update();
        });
    }

    var heroObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounters();
                heroObserver.disconnect();
            }
        });
    }, { threshold: 0.3 });

    var heroStats = document.querySelector('.hero__stats');
    if (heroStats) heroObserver.observe(heroStats);

    // ═══════════════════════════════════════════════════════════════
    // SCROLL REVEAL ANIMATION
    // ═══════════════════════════════════════════════════════════════
    var revealElements = document.querySelectorAll(
        '.service__card, .pricing__card, .testimonial__card, .process__step, .why-us__feature, .comparison__card'
    );

    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(function (el) {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // ═══════════════════════════════════════════════════════════════
    // CONTACT FORM
    // ═══════════════════════════════════════════════════════════════
    var contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var submitBtn    = contactForm.querySelector('.form__submit');
        var originalText = submitBtn.textContent;

        submitBtn.textContent = currentLang === 'es' ? 'Enviando...' : 'Sending...';
        submitBtn.disabled    = true;

        setTimeout(function () {
            submitBtn.textContent = currentLang === 'es' ? '\u00a1Mensaje Enviado!' : 'Message Sent!';
            submitBtn.classList.add('form__submit--success');
            contactForm.reset();

            setTimeout(function () {
                submitBtn.textContent = translations.form_submit[currentLang];
                submitBtn.disabled    = false;
                submitBtn.classList.remove('form__submit--success');
            }, 3000);
        }, 1500);
    });

    // ═══════════════════════════════════════════════════════════════
    // PRICING HOVER
    // ═══════════════════════════════════════════════════════════════
    document.querySelectorAll('.pricing__card').forEach(function (card) {
        card.addEventListener('mouseenter', function () {
            document.querySelectorAll('.pricing__card').forEach(function (c) {
                if (c !== card) c.classList.add('pricing__card--dimmed');
            });
        });
        card.addEventListener('mouseleave', function () {
            document.querySelectorAll('.pricing__card').forEach(function (c) {
                c.classList.remove('pricing__card--dimmed');
            });
        });
    });

})();
