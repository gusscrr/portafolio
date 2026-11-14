import { useEffect, useRef, useState } from 'react'
import { email, perfil, redes } from '../data'
import Icon, { colorMarca } from './Icon'
import { PalabrasEntrada } from './Efectos'
import Cielo from './Cielo'
import NumeroRodante from './NumeroRodante'
import Reveal from './Reveal'
import { idiomaActual, t } from '../idioma'

/* ---------- Rol que se escribe solo ---------- */

const roles = ['web', 'mobile', 'IoT']

function useTypewriter(palabras) {
  const [texto, setTexto] = useState(palabras[0])
  const [i, setI] = useState(0)
  const [borrando, setBorrando] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const actual = palabras[i % palabras.length]
    let t
    if (!borrando && texto === actual) {
      t = setTimeout(() => setBorrando(true), 2200)
    } else if (borrando && texto === '') {
      t = setTimeout(() => {
        setBorrando(false)
        setI((v) => v + 1)
      }, 250)
    } else {
      t = setTimeout(
        () => setTexto(borrando ? actual.slice(0, texto.length - 1) : actual.slice(0, texto.length + 1)),
        borrando ? 55 : 95,
      )
    }
    return () => clearTimeout(t)
  }, [texto, borrando, i, palabras])

  return texto
}

/* ---------- Número que cuenta de 0 al valor ---------- */


/* ---------- Hero ---------- */

export default function Hero() {
  const rol = useTypewriter(roles)

  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-32 sm:pt-36"
      style={{ background: 'var(--cielo)' }}
    >
      <Cielo />
      <Colinas />

      <div className="mx-auto grid w-full max-w-[1600px] flex-1 content-center gap-14 px-5 pb-[20vh] sm:px-10 lg:px-16 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-center 2xl:grid-cols-[minmax(0,1fr)_380px]">
        <div>
        {/* Título */}
        <Reveal delay={80}>
          <h1 className="text-[36px] leading-[1.05] min-[380px]:text-[40px] font-semibold tracking-[-0.045em] text-white sm:text-[64px] sm:leading-[1] xl:text-[72px] 2xl:text-[92px]">
            <PalabrasEntrada texto={t('Hola, soy Gustavo', 'Hi, I’m Gustavo')} inicio={150} />
            {idiomaActual() === 'en' ? (
              // En inglés el rol va antes: "web developer"
              <span className="mt-1 block whitespace-nowrap text-zinc-500">
                <span className="text-accent">
                  {rol}
                  <span className="ml-1 inline-block h-[0.8em] w-[3px] translate-y-[0.06em] animate-pulse rounded-full bg-accent" />
                </span>{' '}
                <PalabrasEntrada texto="developer" inicio={480} />
              </span>
            ) : (
              <span className="mt-1 block whitespace-nowrap text-zinc-500">
                <PalabrasEntrada texto="Desarrollador" inicio={480} />{' '}
                <span className="block text-accent sm:inline">
                  {rol}
                  <span className="ml-1 inline-block h-[0.8em] w-[3px] translate-y-[0.06em] animate-pulse rounded-full bg-accent" />
                </span>
              </span>
            )}
          </h1>
        </Reveal>

        {/* Bajada */}
        <Reveal delay={140}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 xl:text-xl">
            {idiomaActual() === 'en' ? (
              <>
                I build <span className="text-zinc-100">websites, Android apps</span> and{' '}
                <span className="text-zinc-100">hardware prototypes</span> that solve real problems. From{' '}
                {perfil.ubicacion}.
              </>
            ) : (
              <>
                Construyo <span className="text-zinc-100">webs, apps Android</span> y{' '}
                <span className="text-zinc-100">prototipos con hardware</span> que resuelven problemas reales. Desde{' '}
                {perfil.ubicacion}.
              </>
            )}
          </p>
        </Reveal>

        {/* Botones */}
        <Reveal delay={200} className="mt-10 flex flex-wrap items-center gap-2.5">
          {/* Mismos efectos que el resto de los botones: cambia el fondo, la flechita se mueve y se achica al tocar */}
          <a
            href={`mailto:${email}`}
            className="group/btn boton-demo inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#1e1e21] transition-[background-color,transform] duration-200 hover:bg-zinc-200 active:scale-[0.97]"
          >
            {t('Contactame', 'Contact me')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="transition-transform duration-200 group-hover/btn:translate-x-0.5">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          {redes.filter((r) => r.label !== 'Instagram').map((r) => {
            // GitHub en el mismo morado que "Ver repo"
            const c = r.label === 'GitHub' ? colorMarca('Vite') : colorMarca(r.label)
            return (
              <a
                key={r.label}
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="group/btn tinte inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-[filter,transform] duration-200 hover:brightness-125 active:scale-[0.97]"
                style={{ color: c, background: `${c}2e` }}
              >
                <Icon nombre={r.label} linea size={16} />
                {r.label}
                <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                  <path d="M3.5 8.5l5-5M4.5 3.5h4v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )
          })}
        </Reveal>
        </div>

        {/* Números */}
        <Reveal delay={320} className="grid grid-cols-3 gap-2.5 sm:gap-3 xl:grid-cols-1">
          {perfil.numeros.map((num) => (
            <Numero key={num.label} num={num} />
          ))}
        </Reveal>
      </div>

    </section>
  )
}

/* ---------- Tarjeta de número con luz que sigue al mouse ---------- */

function Numero({ num }) {
  const mover = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
  }
  return (
    <div
      onMouseMove={mover}
      className="group/num relative overflow-hidden rounded-2xl backdrop-blur-md px-4 py-5 transition-transform duration-300 ease-[var(--ease-out)] hover:-translate-y-0.5 sm:px-6 sm:py-6"
      style={{ background: `linear-gradient(${num.color}1f, ${num.color}1f), var(--tile-base)` }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/num:opacity-100"
        style={{ background: `radial-gradient(220px circle at var(--x) var(--y), ${num.color}26, transparent 70%)` }}
      />
      <div
        aria-hidden
        className="absolute inset-x-6 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${num.color}80, transparent)` }}
      />
      <p className="tinte relative text-3xl font-semibold tracking-[-0.03em] tabular-nums sm:text-4xl" style={{ color: num.color }}>
        <NumeroRodante valor={num.valor} />
      </p>
      <p className="relative mt-1.5 text-xs leading-snug text-zinc-400 hyphens-auto [overflow-wrap:anywhere] sm:text-sm sm:[overflow-wrap:normal]">{num.label}</p>
    </div>
  )
}

/* ---------- Colinas del inicio (con un leve movimiento al hacer scroll) ---------- */

export function Colinas() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const mover = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight)
        el.style.setProperty('--s', `${y}px`)
      })
    }
    mover()
    window.addEventListener('scroll', mover, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', mover)
    }
  }, [])

  const capa = (factor) => ({ transform: `translate3d(0, calc(var(--s, 0px) * ${factor}), 0)` })

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10 flex flex-col">
      {/* Colinas iguales a las de Josh, con la misma proporción (no se estiran) */}
      <div className="relative h-[max(43.7vw,440px)] shrink-0 overflow-hidden">
        {/* Fondo: línea de colinas */}
        <svg className="absolute inset-0 h-full w-full will-change-transform" style={capa(0.18)} viewBox="0 0 1897 829" preserveAspectRatio="xMidYMin slice">
          <path style={{ fill: 'var(--colina-atras)' }} d="M0 262 L100 262 L112 239 L128 233 L160 225 L176 223 L212 223 L248 229 L272 237 L296 249 L316 263 L356 300 L360 302 L368 302 L396 277 L412 265 L444 248 L464 241 L496 234 L516 232 L560 232 L592 235 L600 237 L612 238 L652 248 L664 252 L696 265 L720 278 L748 298 L764 313 L788 342 L808 370 L816 371 L860 348 L868 346 L892 337 L912 332 L936 328 L968 325 L992 325 L1024 328 L1036 330 L1076 340 L1116 356 L1144 371 L1160 381 L1172 389 L1212 420 L1216 422 L1220 422 L1224 421 L1232 415 L1248 401 L1280 376 L1324 347 L1368 323 L1408 306 L1436 297 L1456 292 L1460 292 L1476 288 L1504 285 L1544 285 L1556 287 L1564 287 L1576 289 L1620 301 L1624 300 L1628 298 L1660 259 L1684 237 L1708 220 L1748 199 L1780 187 L1816 178 L1836 175 L1860 174 L1864 173 L1896 174 L1896 829 L0 829 Z" />
          <path style={{ fill: 'var(--colina-izq)' }} d="M0 201 L40 211 L64 220 L96 236 L120 251 L140 266 L156 280 L172 296 L196 325 L224 367 L228 371 L236 372 L236 829 L0 829 Z" />
        </svg>
        {/* Frente: se funde con el fondo del resto de la página */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1897 829" preserveAspectRatio="xMidYMin slice">
          <path style={{ fill: 'var(--color-bg)' }} d="M0 413 L32 402 L80 390 L84 390 L100 386 L124 382 L160 378 L168 376 L176 376 L212 372 L228 372 L232 371 L268 370 L272 369 L316 369 L320 368 L392 369 L396 370 L428 371 L476 375 L552 385 L592 393 L596 393 L624 400 L628 400 L632 402 L636 402 L648 405 L652 407 L696 419 L720 427 L772 447 L828 474 L868 497 L904 521 L940 549 L976 581 L1040 645 L1048 651 L1060 653 L1072 651 L1088 645 L1160 612 L1192 600 L1204 597 L1224 590 L1276 577 L1316 570 L1368 564 L1400 563 L1404 562 L1468 562 L1472 563 L1492 563 L1496 564 L1536 566 L1576 571 L1584 573 L1592 573 L1620 579 L1624 579 L1672 591 L1716 606 L1752 621 L1764 623 L1776 621 L1784 614 L1796 596 L1836 503 L1848 480 L1856 466 L1872 442 L1896 412 L1897 407 L1897 829 L0 829 Z" />
        </svg>
      </div>
      {/* Debajo de las colinas: fondo liso de la página */}
      <div className="relative -mt-px flex-1 bg-bg" />
    </div>
  )
}