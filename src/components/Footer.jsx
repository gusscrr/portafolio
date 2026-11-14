import { useEffect, useState } from 'react'
import { email, perfil, proyectos, redes, redesNav } from '../data'
import { escucharSonido, setSonido, sonar, sonidoActivo, sonarParlante } from '../sonido'
import { alternarTema, escucharTema, temaActual } from '../tema'
import { Boop } from './Efectos'
import Icon, { colorMarca, IconoTema } from './Icon'
import { alternarIdioma, t } from '../idioma'

const navegacion = () => [
  { href: '#inicio', texto: t('Inicio', 'Home') },
  { href: '#trayectoria', texto: t('Trayectoria', 'Journey') },
  { href: '#stack', texto: 'Stack' },
  { href: '#/acerca-de', texto: t('Acerca de', 'About') },
]

const tecnologias = ['React', 'Kotlin', 'ESP32', 'Tailwind CSS', 'Node.js', 'Firebase', 'Vite', 'Arduino']

function Verificado() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-label={t('Verificado', 'Verified')} role="img" className="shrink-0">
      <path
        fill="#3b9eff"
        d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34z"
      />
      <path fill="#fff" d="M9.99 16.6l-3.6-3.6 1.4-1.41 2.2 2.19 5.2-5.18 1.41 1.41z" />
    </svg>
  )
}

// Título de columna en mayúsculas, gris azulado (como el footer de Josh)
function Titulo({ children, className = '' }) {
  return <p className={`text-[14.5px] font-semibold tracking-[0.02em] text-[#a8c0d4] uppercase ${className}`}>{children}</p>
}

const link = 'text-[15px] font-medium text-[#e6edf3] transition-colors duration-200 hover:text-white'
const icono =
  'grid h-9 w-9 place-items-center text-[#c9d7e3] max-[359px]:h-8 max-[359px]:w-8 sm:h-11 sm:w-11 transition-colors duration-300 hover:text-[var(--c,#fff)]'

export default function Footer() {
  const [correo, setCorreo] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [sonido, setSonidoUI] = useState(sonidoActivo())

  const [tema, setTema] = useState(temaActual())

  useEffect(() => escucharSonido(setSonidoUI), [])
  useEffect(() => escucharTema(setTema), [])

  // Abre el mail con el email de la persona ya escrito
  const enviar = (e) => {
    e.preventDefault()
    const asunto = encodeURIComponent(t('Contacto desde tu portafolio', 'Contact from your portfolio'))
    const cuerpo = encodeURIComponent(t(`Hola Gustavo, mi email es ${correo}`, `Hi Gustavo, my email is ${correo}`))
    window.location.href = `mailto:${email}?subject=${asunto}&body=${cuerpo}`
    setCorreo('')
    setEnviado(true)
  }

  const alternarSonido = () => {
    const nuevo = !sonido
    // suena siempre: sube al prender y baja al apagar
    sonarParlante(nuevo)
    setSonido(nuevo)
  }

  const linkedin = redesNav.find((r) => r.label === 'LinkedIn')
  const instagram = redesNav.find((r) => r.label === 'Instagram')
  const github = redes.find((r) => r.label === 'GitHub')

  return (
    <footer
      id="contacto"
      className="relative isolate mt-10 overflow-hidden"
      style={{ background: 'var(--pie-fondo)' }}
    >
      {/* Nubes oscuras arriba (mismo color que el resto de la página) */}
      <svg aria-hidden className="pointer-events-none absolute inset-x-0 -top-px -z-10 h-auto w-full" viewBox="0 0 1884 380">
        <path
          style={{ fill: 'var(--color-bg)' }}
          d="M0 0H1884V268C1840 262 1800 252 1776 240C1755 310 1700 360 1610 360C1530 360 1470 315 1436 272C1390 298 1340 312 1275 312C1180 312 1110 280 1083 213C1050 226 1020 232 985 232C870 232 770 180 728 113C660 145 590 158 510 158C420 158 330 135 270 100C200 138 100 158 0 158Z"
        />
      </svg>

      {/* Nubes de abajo a la izquierda */}
      <svg aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-px -z-10 h-auto w-full" viewBox="0 500 1884 335">
        <path
          style={{ fill: 'var(--pie-nube)' }}
          d="M0 835V540C40 522 85 512 130 512C250 512 340 580 400 670C440 648 485 636 530 636C630 636 710 680 745 745C785 725 830 713 875 713C980 713 1060 770 1082 835Z"
        />
      </svg>

      <div className="mx-auto grid w-full max-w-[1116px] gap-14 px-5 pt-[calc(12vw+32px)] pb-10 sm:px-10 xl:grid-cols-[340px_556px] xl:justify-center xl:gap-[140px] xl:px-0 xl:pt-[calc(13vw+20px)]">
        {/* Izquierda: nombre, frase, email y copyright */}
        <div className="flex flex-col">
          <a href="#inicio" className="inline-flex w-fit items-center gap-2 text-[22px] font-semibold tracking-tight text-white">
            {perfil.nombre}
            <Verificado />
          </a>
          <p className="mt-2 text-[15px] font-semibold text-[#e6edf3]">{t('Desarrollador web, mobile e IoT.', 'Web, mobile and IoT developer.')}</p>

          <form onSubmit={enviar} className="mt-12 w-full sm:max-w-[340px]">
            <label htmlFor="footer-email" className="block text-[15px] leading-relaxed text-[#e6edf3]">
              {t('¿Tenés una idea o un proyecto?', 'Got an idea or a project?')}
              <br />
              {t('Dejame tu email y te escribo:', 'Leave your email and I’ll get in touch:')}
            </label>
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#0d0f12] p-1.5 pl-4 ring-1 ring-white/[0.06] transition-shadow duration-200 focus-within:ring-white/25">
              <input
                id="footer-email"
                type="email"
                required
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder={enviado ? t('¡Gracias! Te escribo pronto', 'Thanks! I’ll write soon') : t('tu@email.com', 'you@email.com')}
                style={{ outline: 'none' }}
                className="h-9 min-w-0 flex-1 cursor-text bg-transparent text-[16px] text-white caret-white placeholder:text-zinc-500"
              />
              <button
                type="submit"
                aria-label={t('Enviar', 'Send')}
                className="group/flecha grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#ffdc00] text-[#0d0f12] transition-[background-color,transform] duration-200 hover:bg-[#ffe54d] active:scale-[0.94]"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden className="transition-transform duration-300 ease-[var(--ease-out)] group-hover/flecha:translate-x-0.5">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </form>

          <p className="mt-auto hidden h-11 items-center pt-0 text-sm text-[#e6edf3] xl:mt-auto xl:flex">
            © {new Date().getFullYear()} {perfil.nombre}, {t('Córdoba Capital', 'Córdoba, Argentina')}. {t('Todos los derechos reservados.', 'All rights reserved.')}
          </p>
        </div>

        {/* Derecha: columnas y fila de íconos */}
        <div className="flex w-full flex-col xl:w-[556px] xl:pt-[97px]">
          <div className="grid grid-cols-2 gap-x-10 gap-y-12 sm:grid-cols-[226px_minmax(0,1fr)_auto] sm:gap-x-0">
            {/* Tecnologías en dos columnas (como "Explorar por categoría") */}
            {/* En celular se oculta (como el footer de Josh: solo dos columnas) */}
            <div className="hidden sm:block">
              <Titulo>{t('Tecnologías', 'Technologies')}</Titulo>
              <ul className="mt-4 grid grid-cols-[84px_auto] gap-y-3.5">
                {tecnologias.map((tec) => (
                  <li key={tec}>
                    <a href="#stack" className={`${link} whitespace-nowrap`}>
                      {tec}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Proyectos (como "Cursos interactivos") */}
            <div>
              <Titulo>{t('Proyectos', 'Projects')}</Titulo>
              <ul className="mt-4 space-y-3.5">
                {proyectos.map((p) => (
                  <li key={p.id}>
                    <a href="#proyectos" className={link}>
                      {p.nombre}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* General, alineada a la derecha */}
            <div className="text-right">
              <Titulo>General</Titulo>
              <ul className="mt-4 space-y-3.5">
                {navegacion().map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className={link}>
                      {n.texto}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Fila de íconos grandes */}
          <div className="-mx-2 mt-14 flex items-center justify-between sm:mx-0 sm:mt-12 sm:-mr-2.5 sm:flex-wrap sm:justify-end sm:gap-1.5 xl:mt-auto xl:pt-12">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event('abrir-buscador'))}
              aria-label={t('Buscar', 'Search')}
              data-sin-sonido
              className={icono}
            >
              <Boop rotar={-18} escala={1.08}>
                <Icon nombre="Buscar" linea size={25} />
              </Boop>
            </button>
            <button
              type="button"
              onClick={alternarSonido}
              aria-label={sonido ? t('Desactivar sonidos', 'Turn sounds off') : t('Activar sonidos', 'Turn sounds on')}
              aria-pressed={sonido}
              data-sin-sonido
              className={icono}
            >
              <Boop escala={1.08}>
                <Icon nombre={sonido ? 'Sonido' : 'Silencio'} linea size={25} />
              </Boop>
            </button>
            <button
              type="button"
              onClick={alternarTema}
              data-sin-sonido
              aria-label={tema === 'claro' ? t('Cambiar a tema oscuro', 'Switch to dark theme') : t('Cambiar a tema claro', 'Switch to light theme')}
              title={tema === 'claro' ? t('Tema oscuro', 'Dark theme') : t('Tema claro', 'Light theme')}
              className={icono}
            >
              <IconoTema claro={tema === 'claro'} size={25} />
            </button>
            <button
              type="button"
              onClick={alternarIdioma}
              aria-label={t('Switch to English', 'Cambiar a español')}
              title={t('English', 'Español')}
              style={{ '--c': 'var(--acento)' }}
              className={icono}
            >
              <Icon nombre="Idioma" linea size={25} />
            </button>
            <a href={`mailto:${email}`} aria-label="Email" style={{ '--c': '#ea4335' }} className={icono}>
              <Icon nombre="Email" linea size={25} />
            </a>
            <a href={github?.url} target="_blank" rel="noreferrer" aria-label="GitHub" style={{ '--c': colorMarca('Vite') }} className={icono}>
              <Icon nombre="GitHub" linea size={25} />
            </a>
            <a
              href={instagram?.url}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              style={{ '--c': instagram?.color }}
              className={icono}
            >
              <Icon nombre="Instagram" linea size={25} />
            </a>
            <a
              href={linkedin?.url || '#'}
              onClick={(e) => !linkedin?.url && e.preventDefault()}
              target={linkedin?.url ? '_blank' : undefined}
              rel="noreferrer"
              aria-label="LinkedIn"
              style={{ '--c': linkedin?.color }}
              className={icono}
            >
              <Icon nombre="LinkedIn" linea size={25} />
            </a>
          </div>

          <p className="mt-10 text-sm text-[#e6edf3] xl:hidden">
            © {new Date().getFullYear()} {perfil.nombre}, {t('Córdoba Capital', 'Córdoba, Argentina')}. {t('Todos los derechos reservados.', 'All rights reserved.')}
          </p>
        </div>
      </div>
    </footer>
  )
}