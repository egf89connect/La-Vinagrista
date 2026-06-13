/* ============================================================================
   LA VINAGRISTA · MANIFIESTO DE DATOS EDITABLES
   ----------------------------------------------------------------------------
   Este es el ÚNICO archivo que necesitas tocar para cambiar textos, precios,
   imágenes y enlaces de la web. Ábrelo con el Bloc de notas, edita el texto
   que hay ENTRE COMILLAS y guarda. No borres las comillas ni las comas.

   ¿Dudas? Mira el README.md que viene junto a este proyecto.
   ========================================================================== */

window.__LA_VINAGRISTA__ = {

  /* ----- 1. MARCA -------------------------------------------------------- */
  marca: {
    nombre: "La Vinagrista",
    eslogan: "La joya ácida de la alta gastronomía.",
    logo: "Logo.png",        // logotipo de la cabecera (PNG sin fondo)
    monograma: "Logo2.jpg",  // sello redondo (splash y detalles)
    origen: "Batea · Delta del Ebro · Alta Cocina"
  },

  /* ----- 2. NAVEGACIÓN (menú de la cabecera) ----------------------------- */
  navegacion: [
    { etiqueta: "Manifiesto", ancla: "#manifiesto" },
    { etiqueta: "Colección",  ancla: "#coleccion"  },
    { etiqueta: "Proceso",    ancla: "#proceso"    },
    { etiqueta: "La Mesa",    ancla: "#mesa"       },
    { etiqueta: "Contacto",   ancla: "#contacto"   }
  ],

  /* ----- 3. HERO (primera pantalla) -------------------------------------- */
  hero: {
    kicker: "Batea · Delta del Ebro · Alta Cocina",
    // El gran titular del inicio es el NOMBRE DE LA MARCA (campo "nombre" de la
    // sección 1) con la tipografía del logo. Para cambiarlo, edita marca.nombre.
    tagline: "Vinagres de autor nacidos para transformar el contraste y la intensidad en platos inolvidables.",
    ctaPrimario: { etiqueta: "Descubrir Colección", ancla: "#coleccion" },
    ctaSecundario: { etiqueta: "Próximamente · Reservar Comanda", ancla: "#contacto" }
  },

  /* ----- 4. MARQUEE (cintillo naranja en movimiento) --------------------- */
  marquee: [
    "100% Garnacha Blanca de Batea",
    "Garnacha Negra Selección",
    "Arroz del Delta del Ebro",
    "Cítricos del Delta",
    "Fermentación Lenta",
    "El Alma del Emplatado",
    "@lavinagrista"
  ],

  /* ----- 5. MANIFIESTO (sección 01) -------------------------------------- */
  manifiesto: {
    numero: "01",
    titulo: "Nacidos en Batea, criados para la alta cocina.",
    parrafos: [
      "Somos un grupo de jóvenes de Batea que decidió mirar la tierra con ojos nuevos. Donde otros ven una garnacha centenaria, nosotros vimos el inicio de un vinagre capaz de cambiar el rumbo de un plato.",
      "Unimos la tradición vinícola de la Terra Alta con la frescura del Delta del Ebro para crear vinagres vivos, vibrantes y honestos. De nuestras manos a las cocinas más exigentes del país.",
      "Detrás de cada botella estamos cuatro: Abel Maijó, Adam Maijó, David Martín y Cristina Borrull."
    ],
    hitos: [
      "Fermentación controlada",
      "Sin aditivos",
      "Aliado indispensable para chefs"
    ],
    // Foto del equipo fundador. Para cambiarla, sustituye el archivo
    // Fundadores.jpg por otra imagen tuya (con el mismo nombre).
    imagenes: [
      "Fundadores.jpg"
    ]
  },

  /* ----- 6. COLECCIÓN (sección 02) · LAS 4 BOTELLAS ESTRELLA ------------- *
     Para CAMBIAR PRECIOS en el futuro: rellena el campo "precio"
     (por ejemplo "18,00 €") y pon "disponible": true para activar el botón.   */
  coleccion: [
    {
      id: "blanco",
      nombre: "Blanco de Garnacha",
      base: "Garnacha Blanca de Batea",
      imagen: "Blanco.png",
      notas: "Luminoso, equilibrado, con una acidez limpia, matices florales y recuerdos de fruta blanca madura.",
      maridaje: "Ideal para pescados grasos, ostras del Delta, espumas cítricas y vinagretas sutiles.",
      color: "#F5E6C4",        // crema dorado
      acento: "#EAC86F",
      precio: "",              // ej: "16,00 €"
      disponible: false
    },
    {
      id: "negro",
      nombre: "Negro de Garnacha",
      base: "Garnacha Negra de Batea",
      imagen: "Negro.png",
      notas: "Intenso, profundo, con un cuerpo sedoso que regala notas de maderas nobles, frutos rojos y un final largo.",
      maridaje: "Diseñado para reducciones de caza, escabeches contemporáneos y platos de setas.",
      color: "#F2D2D9",        // rosa vino
      acento: "#92142B",
      precio: "",
      disponible: false
    },
    {
      id: "arroz",
      nombre: "Arroz del Delta",
      base: "Arroz seleccionado del Delta del Ebro",
      imagen: "Arroz.png",
      notas: "Una oda a la sutileza. Acidez delicada, dulce, extremadamente limpia y con un sutil perfil umami.",
      maridaje: "Imprescindible para encurtidos gourmet, sushis de autor y equilibrar caldos densos.",
      color: "#E6EEF4",        // azul sutil
      acento: "#4A7A8C",
      precio: "",
      disponible: false
    },
    {
      id: "naranja",
      nombre: "Naranja del Delta",
      base: "Naranjas frescas del Delta del Ebro",
      imagen: "Naranja.png",
      notas: "Explosión cítrica y salvaje. Un aroma penetrante que equilibra el dulzor natural de la fruta con una acidez vibrante.",
      maridaje: "Perfecto para carpaccios de marisco, postres de vanguardia y cocina fusión.",
      color: "#FFEADB",        // naranja pastel vivo
      acento: "#FF6B35",
      precio: "",
      disponible: false
    }
  ],

  /* ----- 7. PROCESO (sección 03) ----------------------------------------- *
     "icono" admite: hoja | gota | reposo | botella                          */
  proceso: {
    numero: "03",
    titulo: "El proceso estrella",
    pasos: [
      { icono: "hoja",    titulo: "Selección en Origen",     texto: "Cosecha manual de las garnachas en Batea y los mejores frutos del Delta." },
      { icono: "gota",    titulo: "Transformación Paciente", texto: "Microfermentaciones lentas para asegurar la máxima concentración de aromas." },
      { icono: "reposo",  titulo: "Clarificación Natural",   texto: "Reposo respetuoso sin filtrados agresivos que alteren el color de la joya líquida." },
      { icono: "botella", titulo: "Destino Gourmet",         texto: "Embotellado numerado listo para las cocinas más exigentes del país." }
    ]
  },

  /* ----- 8. LA MESA VIVA (sección 04) · galería en movimiento ------------ *
     Imágenes gastronómicas libres de derechos (Unsplash). Sustituibles.     */
  mesaViva: {
    numero: "04",
    titulo: "La mesa viva",
    imagenes: [
      // Ensaladas
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80",
      // Pescados y marisco
      "https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=700&q=80",
      // Verduras
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=700&q=80",
      // Pastas
      "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=700&q=80",
      // Carnes
      "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=700&q=80"
    ]
  },

  /* ----- 9. CONTACTO (sección 05) ---------------------------------------- *
     Cuando quieras recibir las consultas por WhatsApp, escribe el número
     completo con prefijo internacional y SIN signos (ej: "34666555444").
     Si lo dejas vacío, el formulario abrirá el correo (email) de abajo.      */
  contacto: {
    titulo: "Hablemos de tu cocina",
    intro: "Reserva previa de lotes, dudas de chef o distribución: cuéntanoslo. Te respondemos personalmente.",
    whatsapp: "",                       // ej: "34666555444"
    email: "hola@lavinagrista.com",
    perfiles: ["Particular", "Restaurante", "Distribuidor"],
    obrador: "Obrador · Batea, Terra Alta (Tarragona)"
  },

  /* ----- 10. REDES Y PIE ------------------------------------------------- */
  social: {
    instagram: "https://instagram.com/lavinagrista",
    instagramEtiqueta: "@lavinagrista"
  },

  footer: {
    fraseGigante: "La Vinagrista · Alta Gastronomía",
    legales: [
      { etiqueta: "Aviso legal",        enlace: "#" },
      { etiqueta: "Privacidad",         enlace: "#" },
      { etiqueta: "Política de cookies", enlace: "#" }
    ],
    creditos: "Fotografía gastronómica de apoyo: Unsplash (licencia libre). Imágenes de producto y logotipo: © La Vinagrista.",
    copyright: "© 2026 La Vinagrista. Web de demostración."
  }
};
