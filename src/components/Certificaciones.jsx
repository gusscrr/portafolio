import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { certificaciones } from '../data'
import { useTilt } from './Efectos'
import NumeroRodante from './NumeroRodante'
import Reveal from './Reveal'
import { t } from '../idioma'

// Miniatura del certificado real (si no hay imagen, un rectángulo del color)
function Flecha() {
  return (
    <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden className="transition-transform duration-300 ease-[var(--ease-out)] group-hover/btn:translate-x-1">
      <path d="M3.5 8.5l5-5M4.5 3.5h4v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Vista del certificado: info a la izquierda y el certificado a la derecha
function Vista({ c, abrir, i, ir, pausar, pausado, terminar }) {
  const tilt = useTilt(3)
  const total = certificaciones.length
  return (
    <div
      {...tilt}
      onMouseEnter={() => pausar(true)}
      onMouseLeave={(e) => {
        tilt.onMouseLeave(e)
        pausar(false)
      }}
      className="group relative grid overflow-hidden rounded-[28px] border border-white/[0.08] bg-surface lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]"
    >
      {/* Info */}
      <div className="relative z-10 flex flex-col p-7 sm:p-10">
        {/* Número con flechitas a los costados (igual que el carrusel de fotos) */}
        <div className="flex items-center gap-1.5 self-start">
          <button
            type="button"
            onClick={() => ir((i - 1 + total) % total)}
            aria-label={t('Certificado anterior', 'Previous certificate')}
            className="group/fl grid size-7 place-items-center rounded-full text-zinc-400 ring-1 ring-white/10 transition-[background-color,color,transform] duration-200 hover:bg-white/[0.08] hover:text-white active:scale-90"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="transition-transform duration-200 group-hover/fl:-translate-x-px">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <p className="w-[52px] text-center text-sm font-semibold tabular-nums text-zinc-400">
            <span className="text-white">{String(i + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
          </p>
          <button
            type="button"
            onClick={() => ir((i + 1) % total)}
            aria-label={t('Certificado siguiente', 'Next certificate')}
            className="group/fl grid size-7 place-items-center rounded-full text-zinc-400 ring-1 ring-white/10 transition-[background-color,color,transform] duration-200 hover:bg-white/[0.08] hover:text-white active:scale-90"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="transition-transform duration-200 group-hover/fl:translate-x-px">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div key={c.id} className="cert-entrada mt-8">
          <h3 className="max-w-md text-3xl leading-[1.1] font-semibold tracking-[-0.03em] text-white sm:text-4xl">{c.titulo}</h3>
          <p className="mt-4 text-[15px] font-medium text-zinc-300">{c.entidad}</p>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-zinc-400">{c.detalle}</p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          <a
            href={c.pdf}
            target="_blank"
            rel="noreferrer"
            className="group/btn boton-demo inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-[#1e1e21] transition-[background-color,transform] duration-200 hover:bg-zinc-200 active:scale-[0.97]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="icono-doc">
              <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
              <path d="M14 3v5h5" />
            </svg>
            {t('Ver certificado', 'View certificate')}
            <Flecha />
          </a>
          <button
            type="button"
            onClick={abrir}
            className="group/full inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-zinc-200 transition-[background-color,transform] duration-200 hover:bg-white/[0.1] active:scale-[0.97]"
          >
            {/* las dos flechitas se abren hacia afuera al pasar el mouse */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden className="overflow-visible">
              <path className="flecha-expandir arriba" d="M15 3h6v6M21 3l-7 7" />
              <path className="flecha-expandir abajo" d="M9 21H3v-6M3 21l7-7" />
            </svg>
            {t('Pantalla completa', 'Full screen')}
          </button>
        </div>

        {/* Puntos: el actual se estira y se va llenando mientras corre el tiempo */}
        <div className="mt-auto flex items-center gap-2 pt-10">
          {certificaciones.map((x, j) => {
            const activo = j === i
            return (
              <button
                key={x.id}
                type="button"
                onClick={() => ir(j)}
                aria-label={`${t('Ver', 'View')} ${x.titulo}`}
                aria-current={activo}
                className="group/punto grid h-6 place-items-center"
              >
                <span
                  className="relative block h-2 overflow-hidden rounded-full transition-[width,background-color] duration-500 ease-[var(--ease-out)]"
                  style={{
                    width: activo ? 36 : 8,
                    background: activo ? 'color-mix(in srgb, var(--acento) 25%, transparent)' : 'rgba(127,127,127,0.35)',
                  }}
                >
                  {activo && (
                    <span
                      key={`${x.id}-${i}`}
                      onAnimationEnd={terminar}
                      className="punto-relleno absolute inset-y-0 left-0 rounded-full"
                      style={{ background: 'var(--acento)', animationPlayState: pausado ? 'paused' : 'running' }}
                    />
                  )}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Certificado */}
      <div
        className="relative flex items-center justify-center px-6 pt-2 pb-10 sm:px-10 lg:py-10"
        style={{ background: 'radial-gradient(70% 70% at 55% 50%, color-mix(in srgb, var(--acento) 14%, transparent), transparent 72%)' }}
      >
        <button
          type="button"
          onClick={abrir}
          aria-label={`${t('Ver en grande', 'View larger')}: ${c.titulo}`}
          className="group/img relative grid w-full max-w-[540px] cursor-zoom-in"
        >
          {/* hojas de atrás, como una pila de certificados */}
          <span aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rotate-[3deg] rounded-lg bg-white/[0.06] [grid-area:1/1]" />
          <span aria-hidden className="absolute inset-0 translate-x-1.5 translate-y-1.5 rotate-[1.5deg] rounded-lg bg-white/[0.09] [grid-area:1/1]" />

          {/* Todos los certificados apilados: el elegido aparece y los demás se desvanecen */}
          {certificaciones.map((x, j) => {
            const activo = j === i
            return (
              <img
                key={x.id}
                src={x.imagen}
                alt={activo ? `${t('Certificado', 'Certificate')}: ${x.titulo}` : ''}
                aria-hidden={!activo}
                className="cert-slide relative w-full self-center rounded-lg bg-[#fff] shadow-[0_24px_50px_-18px_rgba(0,0,0,0.65)] ring-1 ring-black/5 transition-transform group-hover/img:-translate-y-1 [grid-area:1/1]"
                style={{
                  opacity: activo ? 1 : 0,
                  transform: activo ? 'none' : 'scale(0.97) translateY(10px)',
                  filter: activo ? 'blur(0)' : 'blur(6px)',
                  zIndex: activo ? 1 : 0,
                }}
              />
            )
          })}
          <span className="pointer-events-none absolute right-3 bottom-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-[#fff] opacity-0 backdrop-blur transition-opacity duration-300 group-hover/img:opacity-100">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
            {t('Ver en grande', 'View larger')}
          </span>
        </button>
      </div>
    </div>
  )
}

// Certificado en pantalla completa, con flechas para pasar de uno a otro
function Visor({ i, setI, cerrar }) {
  const c = certificaciones[i]
  const total = certificaciones.length
  const ant = () => setI((i - 1 + total) % total)
  const sig = () => setI((i + 1) % total)

  useEffect(() => {
    const teclas = (e) => {
      if (e.key === 'Escape') cerrar()
      if (e.key === 'ArrowLeft') ant()
      if (e.key === 'ArrowRight') sig()
    }
    window.addEventListener('keydown', teclas)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', teclas)
      document.body.style.overflow = prev
    }
  })

  const flecha = 'grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[rgba(255,255,255,0.1)] text-[#fff] backdrop-blur transition-[background-color,transform] duration-200 hover:bg-[rgba(255,255,255,0.2)] active:scale-95'

  return createPortal(
    <div className="visor-entrada fixed inset-0 z-[70] flex flex-col bg-[#05070b]/90 backdrop-blur-md" role="dialog" aria-modal="true" aria-label={c.titulo}>
      {/* Barra de arriba */}
      <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-[#fff]">{c.titulo}</p>
          <p className="truncate text-sm text-[rgba(255,255,255,0.6)]">{c.entidad}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden text-sm tabular-nums text-[rgba(255,255,255,0.6)] sm:block">
            {i + 1} / {total}
          </span>
          <a
            href={c.pdf}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#fff] px-4 py-2 text-sm font-medium text-[#0d0f12] transition-colors hover:bg-[#e4e4e7]"
          >
            {t('Abrir PDF', 'Open PDF')}
          </a>
          <button type="button" onClick={cerrar} aria-label={t('Cerrar', 'Close')} className="grid h-10 w-10 place-items-center rounded-full bg-[rgba(255,255,255,0.1)] text-[#fff] transition-colors hover:bg-[rgba(255,255,255,0.2)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Certificado */}
      <div className="flex min-h-0 flex-1 items-center justify-center gap-3 px-3 pb-8 sm:gap-6 sm:px-8" onClick={(e) => e.target === e.currentTarget && cerrar()}>
        <button type="button" onClick={ant} aria-label={t('Anterior', 'Previous')} className={flecha}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <img
          key={c.id}
          src={c.imagen}
          alt={`${t('Certificado', 'Certificate')}: ${c.titulo}`}
          className="cert-entrada max-h-full min-w-0 max-w-[min(1100px,100%)] rounded-xl bg-[#fff] object-contain shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]"
        />
        <button type="button" onClick={sig} aria-label={t('Siguiente', 'Next')} className={flecha}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>,
    document.body,
  )
}

export default function Certificaciones({ sinEncabezado = false }) {
  const [sel, setSel] = useState(0)
  const [visor, setVisor] = useState(false)
  const actual = certificaciones[sel]
  const total = certificaciones.length
  const ir = (n) => setSel((n + total) % total)
  const [pausa, setPausa] = useState(false)

  // Cambia solo cuando el punto termina de llenarse (5 s).
  // Se frena con el mouse encima o con el visor abierto, y sigue desde donde quedó.
  const siguiente = () => setSel((v) => (v + 1) % total)

  return (
    <section id="certificaciones" className={`scroll-mt-24 ${sinEncabezado ? 'pt-4 pb-20 sm:pb-28' : 'py-20 sm:py-28'}`}>
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
        {/* Encabezado */}
        {!sinEncabezado && (
        <Reveal className="mb-12 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="etiqueta-seccion mb-4 text-[15px] font-bold tracking-[0.2em] uppercase">{t('Reconocimientos', 'Recognitions')}</p>
            <h2 className="max-w-lg text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">{t('Certificaciones', 'Certificates')}</h2>
            <p className="mt-4 max-w-md text-zinc-400">{t('Los certificados de los premios y reconocimientos que gané.', 'Certificates for the awards and recognitions I’ve earned.')}</p>
          </div>
          <p className="flex items-baseline gap-2 text-[15px] font-medium text-zinc-400">
            <span className="text-4xl font-semibold tracking-[-0.03em] tabular-nums text-white">
              <NumeroRodante valor={String(certificaciones.length).padStart(2, '0')} />
            </span>
            {t('certificados', 'certificates')}
          </p>
        </Reveal>
        )}

        <Reveal>
          <Vista c={actual} abrir={() => setVisor(true)} i={sel} ir={ir} pausar={setPausa} pausado={pausa || visor} terminar={siguiente} />
        </Reveal>
      </div>

      {visor && <Visor i={sel} setI={setSel} cerrar={() => setVisor(false)} />}
    </section>
  )
}