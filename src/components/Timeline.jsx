import { useEffect, useRef, useState } from 'react'
import { trayectoria } from '../data'
import NumeroRodante from './NumeroRodante'
import Reveal from './Reveal'
import { Etiqueta } from './TechChip'
import Icon, { colorMarca } from './Icon'
import { t } from '../idioma'

const morado = colorMarca('Vite')
const flecha = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="transition-transform duration-300 ease-[var(--ease-out)] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
    <path d="M3.5 8.5l5-5M4.5 3.5h4v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// Línea vertical que se va completando a medida que bajás
function useProgreso(ref) {
  const [p, setP] = useState(0)
  useEffect(() => {
    const calc = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const centro = window.innerHeight * 0.6
      const v = (centro - r.top) / r.height
      setP(Math.min(1, Math.max(0, v)))
    }
    calc()
    window.addEventListener('scroll', calc, { passive: true })
    window.addEventListener('resize', calc)
    return () => {
      window.removeEventListener('scroll', calc)
      window.removeEventListener('resize', calc)
    }
  }, [ref])
  return p
}

export default function Timeline() {
  const lista = useRef(null)
  const progreso = useProgreso(lista)
  const premios = trayectoria.filter((x) => !x.esActual).length

  return (
    <section id="trayectoria" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
        {/* Encabezado */}
        <Reveal className="mb-14 flex flex-col gap-6 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="etiqueta-seccion mb-4 text-[15px] font-bold tracking-[0.2em] uppercase">{t('Trayectoria', 'Journey')}</p>
            <h2 className="max-w-lg text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              {t('Mi camino hasta acá', 'My journey so far')}
            </h2>
            <p className="mt-4 max-w-md text-zinc-400">
              {t('Lo que conseguimos con PulsoFirme en competencias de todo el país.', 'What we achieved with PulsoFirme in competitions across the country.')}
            </p>
          </div>
          <p className="flex items-baseline gap-2 text-[15px] font-medium text-zinc-400">
            <span className="text-4xl font-semibold tracking-[-0.03em] tabular-nums text-white"><NumeroRodante valor={String(premios).padStart(2, '0')} /></span>{' '}
            {t('reconocimientos', 'recognitions')}
          </p>
        </Reveal>

        {/* Línea de tiempo */}
        <ol ref={lista} className="relative">
          {/* Línea base + línea que se completa */}
          <span aria-hidden className="linea-base absolute top-2 bottom-2 left-[6px] sm:top-[26px] w-1 rounded-full sm:left-[166px]" />
          <span
            aria-hidden
            className="absolute top-2 left-[6px] w-1 rounded-full sm:top-[26px] sm:left-[166px]"
            style={{
              height: `calc(${progreso * 100}% - 16px)`,
              background: 'linear-gradient(to bottom, var(--acento), color-mix(in srgb, var(--acento) 55%, transparent))',
            }}
          />

          {trayectoria.map((x, i) => (
            <Reveal
              key={x.titulo}
              as="li"
              delay={i * 60}
              className="group relative grid grid-cols-[16px_1fr] gap-x-6 pb-12 last:pb-0 sm:grid-cols-[140px_16px_1fr] sm:gap-x-5"
            >
              {/* Fecha (PC) */}
              <p className={`hidden text-right text-[13px] leading-5 font-medium tabular-nums text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300 sm:block ${x.destacado ? 'sm:pt-[18px]' : 'sm:pt-4'}`}>
                {x.fecha}
              </p>

              {/* Nodo: centrado con el título (y con la fecha) */}
              <span className={`relative mt-0.5 flex h-4 w-4 items-center justify-center ${x.destacado ? 'sm:mt-5' : 'sm:mt-[18px]'}`}>
                {/* halo suave al pasar el mouse */}
                <span
                  className="absolute h-4 w-4 rounded-full opacity-0 transition-[transform,opacity] duration-300 ease-[var(--ease-out)] group-hover:scale-[1.9] group-hover:opacity-100"
                  style={{ background: 'color-mix(in srgb, var(--acento) 22%, transparent)' }}
                />
                <span
                  className="relative h-4 w-4 rounded-full border-[3px] transition-[background-color,border-color] duration-500"
                  style={{
                    borderColor: progreso * trayectoria.length > i ? 'var(--acento)' : 'var(--punto-borde)',
                    background: x.destacado && progreso * trayectoria.length > i ? 'var(--acento)' : 'var(--color-bg)',
                  }}
                />
              </span>

              {/* Contenido */}
              <div className="-mt-1 rounded-2xl px-0 py-1 transition-[background-color,transform] duration-300 ease-[var(--ease-out)] sm:px-5 sm:py-4 sm:group-hover:translate-x-1 sm:group-hover:bg-white/[0.025]">
                <p className="mb-1.5 text-[13px] leading-5 font-medium tabular-nums text-zinc-400 sm:hidden">{x.fecha}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h3
                    className={`font-semibold tracking-tight text-white ${x.destacado ? 'text-xl sm:text-2xl' : 'text-lg'}`}
                  >
                    {x.titulo}
                  </h3>
                  {x.destacado && (
                    <Etiqueta color="#fbbf24" className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold">
                      <span className="relative">{t('Nacional', 'National')}</span>
                    </Etiqueta>
                  )}
                </div>
                <p className="mt-1.5 text-sm font-medium text-zinc-300">{x.lugar}</p>
                {x.detalle && <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-zinc-400">{x.detalle}</p>}
                {x.certificado && (
                  <a
                    href={x.certificado}
                    target="_blank"
                    rel="noreferrer"
                    className="group/btn boton-demo mt-4 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#1e1e21] transition-[background-color,transform] duration-200 hover:bg-zinc-200 active:scale-[0.97]"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="icono-doc">
                      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                      <path d="M14 3v5h5" />
                    </svg>
                    {t('Ver certificado', 'View certificate')}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="transition-transform duration-300 ease-[var(--ease-out)] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                      <path d="M3.5 8.5l5-5M4.5 3.5h4v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}
                {(x.web || x.repo) && (
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {x.web && (
                      <a
                        href={x.web}
                        target="_blank"
                        rel="noreferrer"
                        className="group/btn boton-demo inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#1e1e21] transition-[background-color,transform] duration-200 hover:bg-zinc-200 active:scale-[0.97]"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
                        </svg>
                        {t('Visitar web', 'Visit website')}
                        {flecha}
                      </a>
                    )}
                    {x.repo && (
                      <a
                        href={x.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="group/btn tinte inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-[filter,transform] duration-200 hover:brightness-125 active:scale-[0.97]"
                        style={{ color: morado, background: `${morado}2e` }}
                      >
                        <Icon nombre="GitHub" linea size={15} />
                        {t('Ver repo', 'View repo')}
                        {flecha}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}