import { useEffect, useState } from 'react'
import { redesNav } from '../data'
import { activarClicks, escucharSonido, setSonido, sonar, sonidoActivo, sonarParlante } from '../sonido'
import { alternarTema, escucharTema, temaActual } from '../tema'
import { Boop } from './Efectos'
import Buscador from './Buscador'
import Icon, { colorMarca, IconoTema } from './Icon'
import { RUTA_ACERCA } from '../ruta'
import { alternarIdioma, t } from '../idioma'

// Inicio y Proyectos van al inicio; Acerca de abre su propia página
const items = () => [
  { id: 'inicio', texto: t('Inicio', 'Home'), href: '#inicio' },
  { id: 'proyectos', texto: t('Proyectos', 'Projects'), href: '#proyectos' },
  { id: 'acerca', texto: t('Acerca de', 'About'), href: RUTA_ACERCA },
]

// Barra limpia de ancho completo: transparente arriba, vidrio negro al bajar.
// Insignia de verificado junto al nombre
function Verificado() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" aria-label={t('Verificado', 'Verified')} role="img" className="shrink-0">
      <path
        fill="#3b9eff"
        d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34z"
      />
      <path fill="#fff" d="M9.99 16.6l-3.6-3.6 1.4-1.41 2.2 2.19 5.2-5.18 1.41 1.41z" />
    </svg>
  )
}

export default function Navbar({ ruta }) {
  const [activo, setActivo] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [abierto, setAbierto] = useState(false)
  const [buscando, setBuscando] = useState(false)
  const [sonido, setSonidoUI] = useState(sonidoActivo())

  // Sonido en los clicks + atajo Ctrl/Cmd + K para buscar
  useEffect(() => {
    const quitarClicks = activarClicks()
    const quitarOyente = escucharSonido(setSonidoUI)
    const atajo = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setBuscando((v) => !v)
      }
    }
    window.addEventListener('keydown', atajo)
    // El footer también puede abrir el buscador
    const desdeAfuera = () => {
      setBuscando(true)
      sonar('abrir')
    }
    window.addEventListener('abrir-buscador', desdeAfuera)
    return () => {
      window.removeEventListener('abrir-buscador', desdeAfuera)
      quitarClicks()
      quitarOyente()
      window.removeEventListener('keydown', atajo)
    }
  }, [])

  const abrirBuscador = () => {
    setAbierto(false)
    setBuscando(true)
    sonar('abrir')
  }
  const cerrarBuscador = () => {
    setBuscando(false)
    sonar('cerrar')
  }
  const alternarSonido = () => {
    const nuevo = !sonido
    // suena siempre: sube al prender y baja al apagar
    sonarParlante(nuevo)
    setSonido(nuevo)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    // En "Acerca de" siempre queda marcado Acerca de; en el inicio, Proyectos solo cuando estás ahí
    const ids = ['inicio', 'trayectoria', 'proyectos', 'stack', 'acerca', 'certificaciones']
    const secciones = ids.map((id) => document.getElementById(id)).filter(Boolean)
    setActivo(ruta === 'acerca' ? 'acerca' : null)
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActivo(ruta === 'acerca' ? 'acerca' : e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    secciones.forEach((s) => obs.observe(s))

    return () => {
      window.removeEventListener('scroll', onScroll)
      obs.disconnect()
    }
  }, [ruta])

  const fondo = scrolled || abierto

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        fondo ? 'bg-[#0d1119]/80 shadow-[0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl backdrop-saturate-150' : 'bg-transparent'
      }`}
    >
      <nav
        className={`mx-auto flex max-w-[1600px] items-center justify-between px-5 transition-[height] duration-300 ease-[var(--ease-out)] sm:px-10 lg:px-16 ${
          scrolled ? 'h-16' : 'h-[104px]'
        }`}
      >
        {/* Nombre + links a la izquierda, como en la web de Josh */}
        <div className="flex items-center">
          <a href="#inicio" className="inline-flex items-center gap-1.5 whitespace-nowrap text-[16px] font-semibold tracking-tight text-white">
            Gustavo Carrasco
            <Verificado />
          </a>

          {/* Links (PC) */}
          <div className="ml-16 hidden items-center gap-10 lg:flex">
            {items().map((i) => (
              <a
                key={i.id}
                href={i.href}
                className={`text-[16px] font-semibold transition-colors duration-200 ${
                  activo === i.id ? 'text-white' : 'text-zinc-200 hover:text-white'
                }`}
              >
                {i.texto}
              </a>
            ))}
          </div>
        </div>

        {/* Redes (PC) */}
        <div className="-mr-2.5 hidden items-center gap-1.5 lg:flex">
          <BotonesHerramientas sonido={sonido} buscar={abrirBuscador} alternarSonido={alternarSonido} />
          {redesNav.map((r) => (
            <a
              key={r.label}
              href={r.url || '#'}
              onClick={(e) => !r.url && e.preventDefault()}
              target={r.url ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={r.label}
              // GitHub se pone morado y LinkedIn celeste al pasar el mouse
              style={{ '--c': r.label === 'GitHub' ? colorMarca('Vite') : r.color }}
              className="grid h-11 w-11 place-items-center text-zinc-100 transition-[color,transform,filter] duration-300 ease-[var(--ease-out)] hover:text-[var(--c)]"
            >
              <Icon nombre={r.label} linea size={25} />
            </a>
          ))}
        </div>

        {/* Herramientas + botón menú (celular) */}
        <div className="flex items-center gap-1 lg:hidden">
        <BotonesHerramientas sonido={sonido} buscar={abrirBuscador} alternarSonido={alternarSonido} sinIdioma />
        <button
          onClick={() => setAbierto((v) => !v)}
          className="-mr-2 grid h-10 w-10 place-items-center text-zinc-300"
          aria-label={abierto ? t('Cerrar menú', 'Close menu') : t('Abrir menú', 'Open menu')}
          aria-expanded={abierto}
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${abierto ? 'top-1.5 rotate-45' : 'top-0'}`}
            />
            <span
              className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${abierto ? 'top-1.5 -rotate-45' : 'top-3'}`}
            />
          </span>
        </button>
        </div>
      </nav>

      {/* Menú desplegable (celular) */}
      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 lg:hidden ${
          abierto ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0">
          <div className="flex flex-col px-5 pb-4">
            {items().map((i) => (
              <a
                key={i.id}
                href={i.href}
                onClick={() => setAbierto(false)}
                className={`border-b border-white/[0.06] py-3.5 text-[15px] last:border-0 ${
                  activo === i.id ? 'text-white' : 'text-zinc-400'
                }`}
              >
                {i.texto}
              </a>
            ))}
            {/* Idioma (en el celular va acá para que entre todo en la barra) */}
            <button
              type="button"
              onClick={alternarIdioma}
              className="flex items-center gap-2.5 py-3.5 text-left text-[15px] text-zinc-400"
            >
              <Icon nombre="Idioma" linea size={19} />
              {t('English', 'Español')}
            </button>
          </div>
        </div>
      </div>
    </header>
    <Buscador abierto={buscando} cerrar={cerrarBuscador} />
    </>
  )
}

// Lupa (buscar) y parlante (prender/apagar sonidos)
function BotonesHerramientas({ sonido, buscar, alternarSonido, sinIdioma = false }) {
  const clase =
    'grid h-11 w-11 place-items-center text-zinc-100 transition-colors duration-300 hover:text-white'
  return (
    <>
      <button type="button" onClick={buscar} aria-label={t('Buscar (Ctrl + K)', 'Search (Ctrl + K)')} title={t('Buscar (Ctrl + K)', 'Search (Ctrl + K)')} data-sin-sonido className={clase}>
        <Boop rotar={-18} escala={1.08}>
          <Icon nombre="Buscar" linea size={25} />
        </Boop>
      </button>
      <button
        type="button"
        onClick={alternarSonido}
        aria-label={sonido ? t('Desactivar sonidos', 'Turn sounds off') : t('Activar sonidos', 'Turn sounds on')}
        title={sonido ? t('Desactivar sonidos', 'Turn sounds off') : t('Activar sonidos', 'Turn sounds on')}
        aria-pressed={sonido}
        data-sin-sonido
        className={clase}
      >
        <Boop escala={1.08}>
          <Icon nombre={sonido ? 'Sonido' : 'Silencio'} linea size={25} />
        </Boop>
      </button>
      <BotonTema clase={clase} />
      {!sinIdioma && <BotonIdioma clase={clase} />}
    </>
  )
}

// Cambia entre español e inglés (globo, mismo estilo que los otros íconos)
export function BotonIdioma({ clase }) {
  return (
    <button
      type="button"
      onClick={alternarIdioma}
      aria-label={t('Switch to English', 'Cambiar a español')}
      title={t('English', 'Español')}
      // Al pasar el puntero se pone celeste (el color del portafolio)
      className={clase.replace('hover:text-white', 'hover:text-[var(--acento)]')}
    >
      <Icon nombre="Idioma" linea size={25} />
    </button>
  )
}

// Luna (tema oscuro) ↔ sol (tema claro)
function BotonTema({ clase }) {
  const [tema, setTema] = useState(temaActual())
  useEffect(() => escucharTema(setTema), [])
  const claro = tema === 'claro'
  return (
    <button
      type="button"
      onClick={alternarTema}
      data-sin-sonido
      aria-label={claro ? t('Cambiar a tema oscuro', 'Switch to dark theme') : t('Cambiar a tema claro', 'Switch to light theme')}
      title={claro ? t('Tema oscuro', 'Dark theme') : t('Tema claro', 'Light theme')}
      className={clase}
    >
      <IconoTema claro={claro} size={25} />
    </button>
  )
}