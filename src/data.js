// Todos los textos del currículum están acá. Editá este archivo para cambiar contenido.
// Cada texto está en español; la traducción al inglés está más abajo (en "ingles").
import { escucharIdioma, idiomaActual } from './idioma'

const perfilEs = {
  nombre: 'Gustavo Carrasco',
  iniciales: 'GC',
  foto: null, // poné acá la ruta de tu foto, ej: '/foto.jpg' (guardada en la carpeta public)
  rol: 'Desarrollador web y mobile',
  ubicacion: 'Córdoba Capital',
  disponible: true,
  sobreMi: [
    'Soy estudiante de 6° año en la Escuela Experimental PROA, sede Alta Gracia. Me gusta llevar una idea desde el boceto hasta algo que la gente pueda usar: el diseño, el código y, cuando hace falta, el circuito.',
    'Trabajo con React para la web, Kotlin para Android y ESP32 para hardware. Con el equipo de PulsoFirme ganamos la final nacional de Emprende U 2026 y el primer puesto en ONIET 2026.',
  ],
  numeros: [
    { valor: '3', label: 'Proyectos destacados', color: '#3b9eff' },
    { valor: '6', label: 'Premios y reconocimientos', color: '#fbbf24' },
    { valor: '1°', label: 'Puesto nacional', color: '#4ade80' },
  ],
}

export const redes = [
  { label: 'GitHub', url: 'https://github.com/gusscrr' },
  { label: 'Instagram', url: 'https://instagram.com/gusscrr_' },
]

// Redes de la barra de arriba (LinkedIn: pegá acá el link de tu perfil)
export const redesNav = [
  { label: 'GitHub', url: 'https://github.com/gusscrr', color: '#a78bfa' },
  { label: 'Instagram', url: 'https://instagram.com/gusscrr_', color: '#f0517a' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/gustavo-c-15150444b', color: '#5aa7ec' },
]

export const email = 'guss.carr03@gmail.com'

const trayectoriaEs = [
  {
    fecha: '2024',
    titulo: '1° puesto — Hackatón ProA',
    lugar: 'Escuela Experimental ProA',
    detalle: 'Gané la hackatón con el desarrollo de ClimApp, mi web del clima.',
    certificado: '/certificados/hackaton-proa.pdf',
  },
  {
    fecha: '2025',
    titulo: '1° puesto en la semifinal — Samsung',
    lugar: 'Competencia Samsung · Proyecto FoodLoop',
    detalle: 'Clasificamos a la final en Buenos Aires.',
    web: 'https://foodloop-guscrr.vercel.app/',
    repo: 'https://github.com/gusscrr/foodloop',
  },
  {
    fecha: '2026',
    titulo: '1° puesto en la semifinal — Emprende U',
    lugar: 'Emprende U · Universidad Nacional de Córdoba',
    detalle: 'Clasificamos a la final nacional.',
  },
  {
    fecha: '2026',
    titulo: 'Ganadores de la final nacional',
    lugar: 'Emprende U 2026 · Universidad Nacional de Rosario',
    detalle: 'Representamos a Córdoba con PulsoFirme y ganamos entre equipos de todo el país.',
    certificado: '/certificados/emprende-u.pdf',
    destacado: true,
  },
  {
    fecha: '2026',
    titulo: '1° puesto — Prototipos, Salud y Bienestar',
    lugar: 'ONIET 2026',
    detalle: 'El guante inteligente PulsoFirme ganó su categoría.',
    certificado: '/certificados/oniet.pdf',
    destacado: true,
  },
  {
    fecha: '2026',
    titulo: 'Reconocimiento local',
    lugar: 'Municipalidad de Alta Gracia',
    detalle: 'Por el desarrollo de PulsoFirme.',
    certificado: '/certificados/reconocimiento-municipal.pdf',
  },
  {
    fecha: 'Actualidad',
    titulo: 'Estudiante de 6° año',
    lugar: 'Escuela Experimental PROA · Sede Alta Gracia',
  },
]

const proyectosEs = [
  {
    id: 'pulsofirme',
    nombre: 'PulsoFirme',
    tipo: 'App móvil · Web · Hardware',
    etiqueta: 'App + Hardware',
    url: 'PulsoFirme · App Android',
    descripcion:
      'Guante inteligente para personas con Parkinson y artritis. Estabiliza el temblor con micromotores, mide la inclinación de la mano y acompaña al paciente y a su cuidador con ejercicios y seguimiento.',
    rol: 'Ensamblé y armé el prototipo del guante, y desarrollé el sitio web oficial del proyecto.',
    stack: ['Kotlin', 'Jetpack Compose', 'Firebase', 'ESP32', 'HTML', 'CSS'],
    premio: '1° ONIET 2026 · Ganadores Emprende U',
    destacado: true,
    estado: 'Destacado',
    metricas: [
      { valor: '2', label: 'Premios nacionales' },
      { valor: '60', label: 'Pantallas de la app' },
      { valor: '4', label: 'Integrantes' },
    ],
    color: '#d4d4d8',
    colorIcono: '#3b9eff', // azul de la marca PulsoFirme
    // Pegá acá los links (si uno queda vacío, el botón aparece como 'Próximamente')
    github: 'https://github.com/gusscrr/pulso-firme',
    demo: 'https://pulso-firme-roan.vercel.app/',
    textoDemo: 'Visitar web',
  },
  {
    id: 'climapp',
    nombre: 'ClimApp',
    tipo: 'Aplicación web',
    etiqueta: 'Web',
    url: 'cliam-app.vercel.app',
    descripcion:
      'Web del clima con temperatura, viento y calidad del aire en tiempo real. Usa tu ubicación y permite buscar cualquier ciudad del mundo.',
    rol: 'Proyecto 100% mío: lo diseñé y lo desarrollé de principio a fin.',
    stack: ['React', 'Vite', 'Tailwind'],
    premio: null,
    color: '#a1a1aa',
    colorIcono: '#7dd3fc', // azul cielo de la interfaz de ClimApp
    estado: 'Online',
    metricas: [
      { valor: 'En vivo', label: 'Clima en tiempo real' },
      { valor: 'Global', label: 'Cualquier ciudad' },
    ],
    github: 'https://github.com/gusscrr/climapp',
    demo: 'https://climapp-guscrr.vercel.app/',
  },
  {
    id: 'blackbarberia',
    nombre: 'Black Barbería',
    tipo: 'Aplicación web',
    etiqueta: 'Web',
    url: 'Black Barbería · Turnos',
    descripcion:
      'Sistema de turnos online para una barbería: el cliente elige servicio, día y horario, y la barbería gestiona su agenda desde un panel.',
    rol: 'Proyecto 100% mío: diseño, frontend y servidor, todo hecho por mí.',
    stack: ['React', 'Node.js'],
    premio: null,
    color: '#71717a',
    estado: 'Online',
    colorIcono: '#d4d4d8', // gris de la interfaz de Black Barbería
    metricas: [
      { valor: '24/7', label: 'Reservas online' },
      { valor: 'Full stack', label: 'Front + servidor' },
    ],
    github: 'https://github.com/gusscrr/black-barberia',
    demo: 'https://black-barberia-guscrr.vercel.app/',
    textoDemo: 'Visitar web',
  },
]

const habilidadesEs = [
  { grupo: 'Frontend', items: ['React', 'Vite', 'Tailwind CSS', 'JavaScript', 'HTML', 'CSS'] },
  { grupo: 'Mobile', items: ['Kotlin', 'Jetpack Compose', 'Android Studio'] },
  { grupo: 'Backend', items: ['Node.js', 'Python', 'Firebase', 'PHP', 'MySQL'] },
  { grupo: 'Hardware', items: ['ESP32', 'Arduino', 'C++'] },
  { grupo: 'Herramientas', items: ['Git', 'GitHub', 'Vercel', 'Claude'] },
]

// Certificaciones: poné cada PDF y cada imagen en la carpeta public/certificados/
// "pdf" = el archivo o link que se abre con "Ver certificado"
// "imagen" = foto del certificado que se muestra en la tarjeta (si queda vacía, se ve el diploma dibujado)
const certificacionesEs = [
  {
    id: 'emprende-u',
    titulo: 'Campeones nacionales',
    entidad: 'Emprende U 2026 · Universidad Nacional de Rosario',
    detalle: 'Primer puesto en la final nacional con PulsoFirme.',
    fecha: '2026',
    color: '#fbbf24',
    pdf: '/certificados/emprende-u.pdf',
    imagen: '/certificados/emprende-u.jpg',
  },
  {
    id: 'oniet',
    titulo: '1° puesto — Prototipos, Salud y Bienestar',
    entidad: 'ONIET 2026 · Universidad Blas Pascal',
    detalle: 'Primer puesto de la categoría en la 30ª Olimpiada Nacional, con el guante PulsoFirme.',
    fecha: '2026',
    color: '#3b9eff',
    pdf: '/certificados/oniet.pdf',
    imagen: '/certificados/oniet.jpg',
  },
  {
    id: 'hackaton-proa',
    titulo: 'Campeón — Hackatón ProA',
    entidad: 'Escuela Experimental ProA',
    detalle: 'Primer puesto en la Hackathon ProA 2024 con el desarrollo de ClimApp.',
    fecha: '2024',
    color: '#4ade80',
    pdf: '/certificados/hackaton-proa.pdf',
    imagen: '/certificados/hackaton-proa.jpg',
  },
  {
    id: 'municipal',
    titulo: 'Declaración de Interés Municipal',
    entidad: 'Concejo Deliberante de Alta Gracia',
    detalle: 'El proyecto PulsoFirme fue declarado de interés municipal.',
    fecha: '2026',
    color: '#c084fc',
    pdf: '/certificados/reconocimiento-municipal.pdf',
    imagen: '/certificados/reconocimiento-municipal.jpg',
  },
]

/* ---------- Inglés ---------- */
// Solo los textos que cambian; el resto (links, colores, fotos) se toma del español.

const ingles = {
  perfil: {
    rol: 'Web and mobile developer',
    ubicacion: 'Córdoba, Argentina',
    numeros: ['Featured projects', 'Awards and recognitions', 'National 1st place'],
  },
  trayectoria: [
    { fecha: '2024', titulo: '1st place — ProA Hackathon', lugar: 'ProA Experimental School', detalle: 'I won the hackathon by building ClimApp, my weather website.' },
    { fecha: '2025', titulo: '1st place in the semifinal — Samsung', lugar: 'Samsung competition · FoodLoop project', detalle: 'We qualified for the final in Buenos Aires.' },
    { fecha: '2026', titulo: '1st place in the semifinal — Emprende U', lugar: 'Emprende U · National University of Córdoba', detalle: 'We qualified for the national final.' },
    { fecha: '2026', titulo: 'National final winners', lugar: 'Emprende U 2026 · National University of Rosario', detalle: 'We represented Córdoba with PulsoFirme and won against teams from all over the country.' },
    { fecha: '2026', titulo: '1st place — Prototypes, Health and Wellbeing', lugar: 'ONIET 2026', detalle: 'The PulsoFirme smart glove won its category.' },
    { fecha: '2026', titulo: 'Local recognition', lugar: 'Municipality of Alta Gracia', detalle: 'For developing PulsoFirme.' },
    { fecha: 'Today', titulo: 'Final-year student', lugar: 'PROA Experimental School · Alta Gracia campus' },
  ],
  proyectos: {
    pulsofirme: {
      tipo: 'Mobile app · Web · Hardware',
      url: 'PulsoFirme · Android app',
      descripcion:
        'Smart glove for people with Parkinson’s and arthritis. It steadies tremors with micromotors, measures hand tilt and supports patients and caregivers with exercises and tracking.',
      rol: 'I assembled and built the glove prototype, and developed the project’s official website.',
      premio: '1st ONIET 2026 · Emprende U winners',
      metricas: ['National awards', 'App screens', 'Team members'],
      textoDemo: 'Visit website',
    },
    climapp: {
      tipo: 'Web app',
      descripcion:
        'Weather website with real-time temperature, wind and air quality. It uses your location and lets you search any city in the world.',
      rol: '100% my own project: I designed and built it from start to finish.',
      metricas: [
        { valor: 'Live', label: 'Real-time weather' },
        { valor: 'Global', label: 'Any city' },
      ],
    },
    blackbarberia: {
      tipo: 'Web app',
      url: 'Black Barbería · Bookings',
      descripcion:
        'Online booking system for a barbershop: customers pick a service, day and time, and the barbershop manages its schedule from a dashboard.',
      rol: '100% my own project: design, frontend and server, all built by me.',
      metricas: [
        { valor: '24/7', label: 'Online bookings' },
        { valor: 'Full stack', label: 'Front + server' },
      ],
      textoDemo: 'Visit website',
    },
  },
  habilidades: { Herramientas: 'Tools' },
  certificaciones: {
    'emprende-u': {
      titulo: 'National champions',
      entidad: 'Emprende U 2026 · National University of Rosario',
      detalle: 'First place in the national final with PulsoFirme.',
    },
    oniet: {
      titulo: '1st place — Prototypes, Health and Wellbeing',
      entidad: 'ONIET 2026 · Blas Pascal University',
      detalle: 'First place in the category at the 30th National Olympiad, with the PulsoFirme glove.',
    },
    'hackaton-proa': {
      titulo: 'Champion — ProA Hackathon',
      entidad: 'ProA Experimental School',
      detalle: 'First place at the 2024 ProA Hackathon, building ClimApp.',
    },
    municipal: {
      titulo: 'Declared of Municipal Interest',
      entidad: 'Alta Gracia City Council',
      detalle: 'The PulsoFirme project was declared of municipal interest.',
    },
  },
}

function enIngles() {
  const i = ingles
  return {
    perfil: {
      ...perfilEs,
      rol: i.perfil.rol,
      ubicacion: i.perfil.ubicacion,
      numeros: perfilEs.numeros.map((n, k) => ({ ...n, label: i.perfil.numeros[k] })),
    },
    // La trayectoria se muestra al revés: de lo más nuevo (Actualidad) a lo más viejo
    trayectoria: trayectoriaEs.map((x, k) => ({ ...x, ...i.trayectoria[k], esActual: x.fecha === 'Actualidad' })).reverse(),
    proyectos: proyectosEs.map((p) => {
      const e = i.proyectos[p.id] || {}
      const metricas = e.metricas
        ? e.metricas.map((m, k) => (typeof m === 'string' ? { ...p.metricas[k], label: m } : m))
        : p.metricas
      return { ...p, ...e, metricas }
    }),
    habilidades: habilidadesEs.map((h) => ({ ...h, nombre: i.habilidades[h.grupo] || h.grupo })),
    certificaciones: certificacionesEs.map((c) => ({ ...c, ...i.certificaciones[c.id] })),
  }
}

function enEspanol() {
  return {
    perfil: perfilEs,
    trayectoria: trayectoriaEs.map((x) => ({ ...x, esActual: x.fecha === 'Actualidad' })).reverse(),
    proyectos: proyectosEs,
    habilidades: habilidadesEs.map((h) => ({ ...h, nombre: h.grupo })),
    certificaciones: certificacionesEs,
  }
}

// Estos valores cambian solos cuando se cambia el idioma
export let perfil, trayectoria, proyectos, habilidades, certificaciones

function aplicar(idioma) {
  ;({ perfil, trayectoria, proyectos, habilidades, certificaciones } = idioma === 'en' ? enIngles() : enEspanol())
}
aplicar(idiomaActual())
escucharIdioma(aplicar)