import { proyectos } from '../data'
import Icon, { colorMarca } from './Icon'
import { useTilt } from './Efectos'
import NumeroRodante from './NumeroRodante'
import Reveal from './Reveal'
import TechChip, { Etiqueta } from './TechChip'
import { t } from '../idioma'

/* ---------- Íconos de cada proyecto ---------- */

const iconos = {
  pulsofirme: (
    <path
      d="M7 11V6.5a1.5 1.5 0 013 0V11m0-4.5v-2a1.5 1.5 0 013 0V11m0-5.5a1.5 1.5 0 013 0V12m0-3.5a1.5 1.5 0 013 0V15a6 6 0 01-6 6h-1.2a6 6 0 01-4.6-2.1L4.6 15.6a1.6 1.6 0 012.4-2.1L7 13.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  climapp: (
    <path
      d="M12 3v1.5M5.6 5.6l1 1M3 12h1.5M18.4 5.6l-1 1M8.5 12a3.5 3.5 0 016.8-1.2M8 20h9a3.5 3.5 0 00.4-7 5 5 0 00-9.6 1.2A3 3 0 008 20z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  blackbarberia: (
    <>
      <circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M20 4L8.1 15.9M14.5 14.5L20 20M8.1 8.1L12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
}

function IconoProyecto({ id, color, grande = false, solido = false }) {
  const size = grande ? 'h-14 w-14 rounded-2xl' : 'h-11 w-11 rounded-xl'

  // Versión sólida: cuadro lleno del color, con brillo y relieve
  if (solido) {
    return (
      <span
        className={`relative grid shrink-0 place-items-center overflow-hidden text-white ${size}`}
        style={{
          background: `linear-gradient(160deg, ${color} 0%, ${color}d9 45%, ${color}99 100%)`,
          boxShadow: `inset 0 1px 0 rgb(255 255 255 / 0.35), inset 0 -1px 0 rgb(0 0 0 / 0.25), 0 0 0 1px ${color}66, 0 10px 30px -8px ${color}99`,
        }}
      >
        {/* reflejo superior */}
        <span aria-hidden className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
        <svg
          width={grande ? 26 : 20}
          height={grande ? 26 : 20}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className="relative drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]"
        >
          {iconos[id]}
        </svg>
      </span>
    )
  }

  return (
    <span
      className={`tinte relative grid shrink-0 place-items-center ${size}`}
      style={{ background: `linear-gradient(145deg, ${color}33, ${color}12)`, color }}
    >
      <svg width={grande ? 26 : 20} height={grande ? 26 : 20} viewBox="0 0 24 24" fill="none" aria-hidden>
        {iconos[id]}
      </svg>
    </span>
  )
}

/* ---------- Piezas chicas ---------- */

// Línea de color arriba de cada tarjeta
function LineaColor({ color }) {
  return (
    <span
      aria-hidden
      className="linea-color absolute inset-x-10 top-0 h-px opacity-70 transition-opacity duration-300 group-hover:opacity-100"
      style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
    />
  )
}

function Estado({ texto }) {
  const online = texto === 'Online'
  if (texto === 'Destacado') {
    return (
      <Etiqueta
        color="#fbbf24"
        title={t('Proyecto destacado', 'Featured project')}
        aria-label={t('Proyecto destacado', 'Featured project')}
        className="grid h-10 w-10 place-items-center rounded-full"
      >
        <svg width="19" height="19" viewBox="0 0 24 24" aria-hidden className="relative">
            <path
              d="M12 2.8l2.75 5.57 6.15.9-4.45 4.33 1.05 6.12L12 16.83l-5.5 2.89 1.05-6.12L3.1 9.27l6.15-.9L12 2.8z"
              fill="currentColor"
            />
          </svg>
      </Etiqueta>
    )
  }
  if (online) {
    return (
      <Etiqueta color="#4ade80" className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
        </span>
        <span className="relative">{texto}</span>
      </Etiqueta>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-zinc-300">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
      {texto}
    </span>
  )
}

function Chips({ items }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((s) => (
        <TechChip key={s} nombre={s} />
      ))}
    </ul>
  )
}

function Flecha() {
  return (
    <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
      <path d="M3.5 8.5l5-5M4.5 3.5h4v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Dos botones: probar el deploy y ver el código en GitHub.
// Si el link está vacío en data.js, el botón se ve igual pero no lleva a ningún lado.
// mismo morado que la etiqueta de Vite
const morado = colorMarca('Vite')

function Botones({ p }) {
  const base =
    'group/btn inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.97]'
  const link = (url) => (url ? { href: url, target: '_blank', rel: 'noreferrer' } : { href: '#', onClick: (e) => e.preventDefault() })

  return (
    <>
      <a {...link(p.demo)} className={`${base} boton-demo bg-white text-[#1e1e21] hover:bg-zinc-200`}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
        </svg>
        {p.textoDemo || t('Probar demo', 'Try demo')}
        <Flecha />
      </a>
      <a
        {...link(p.github)}
        className={`${base} tinte font-semibold hover:brightness-125`}
        style={{ color: morado, background: `${morado}2e` }}
      >
        <Icon nombre="GitHub" linea size={16} />
        {t('Ver repo', 'View repo')}
        <Flecha />
      </a>
    </>
  )
}

/* ---------- Tarjeta destacada ---------- */

function Destacado({ p, numero }) {
  const tilt = useTilt(3)
  return (
    <Reveal
      as="article"
      {...tilt}
      className="group relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-surface transition-colors duration-300 hover:border-white/[0.15]"
    >
      <LineaColor color={p.color} />

      <div className="relative z-10 grid lg:grid-cols-[1.25fr_1fr]">
        {/* Izquierda: info */}
        <div className="flex flex-col p-7 sm:p-10">
          <div className="flex items-center gap-4">
            <IconoProyecto id={p.id} color={p.colorIcono ?? p.color} grande />
            <div>
              <p className="text-sm font-semibold text-white">{t('Proyecto destacado', 'Featured project')}</p>
              <p className="mt-0.5 text-sm text-zinc-400">{p.tipo}</p>
            </div>
          </div>

          <h3 className="mt-10 text-5xl font-semibold tracking-[-0.045em] text-white sm:text-6xl">{p.nombre}</h3>

          {p.premio && (
            <Etiqueta
              as="p"
              color="#4ade80"
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden className="relative">
                <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4zM7 6H4a3 3 0 003 4M17 6h3a3 3 0 01-3 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="relative">{p.premio}</span>
            </Etiqueta>
          )}

          <p className="mt-7 max-w-lg text-[17px] leading-relaxed text-zinc-300/90">{p.descripcion}</p>

          <div className="mt-8">
            <Chips items={p.stack} />
          </div>

          <div className="mt-auto flex flex-wrap gap-2.5 pt-10">
            <Botones p={p} />
          </div>
        </div>

        {/* Derecha: datos */}
        <div className="relative flex flex-col border-t border-white/[0.07] p-7 sm:p-10 lg:border-t-0 lg:border-l">
          <div className="relative z-10 flex items-center justify-between">
            <p className="text-sm font-medium text-zinc-300">{t('En números', 'By the numbers')}</p>
            {p.estado && <Estado texto={p.estado} />}
          </div>

          <dl className="relative z-10 mt-8 space-y-7">
            {p.metricas.map((m) => (
              <div key={m.label} className="flex items-baseline gap-4 border-b border-white/[0.07] pb-6 last:border-0">
                <dd className="w-20 shrink-0 text-5xl font-semibold tracking-[-0.04em] text-white"><NumeroRodante valor={m.valor} /></dd>
                <dt className="text-sm text-zinc-400">{m.label}</dt>
              </div>
            ))}
          </dl>

          <div
            className="tinte relative z-10 mt-8 rounded-2xl px-5 py-4"
            style={{ background: `${p.colorIcono ?? p.color}17` }}
          >
            <p className="text-xs font-semibold" style={{ color: p.colorIcono ?? p.color }}>
              {t('Mi rol', 'My role')}
            </p>
            <p className="mt-1.5 text-[15px] leading-relaxed text-white">{p.rol}</p>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

/* ---------- Tarjeta normal ---------- */

function Tarjeta({ p, numero, delay }) {
  const tilt = useTilt(6)
  return (
    <Reveal
      as="article"
      delay={delay}
      {...tilt}
      className="group relative flex flex-col overflow-hidden rounded-[28px] border border-white/[0.08] bg-surface p-7 transition-colors duration-300 hover:border-white/[0.15] sm:p-8"
    >
      <LineaColor color={p.color} />

      <div className="relative z-10 flex items-start justify-between">
        <IconoProyecto id={p.id} color={p.colorIcono ?? p.color} />
        {p.estado && <Estado texto={p.estado} />}
      </div>
      <p className="relative z-10 mt-8 text-sm text-zinc-400">{p.tipo}</p>
      <h3 className="relative z-10 mt-2 text-3xl font-semibold tracking-[-0.035em] text-white">{p.nombre}</h3>
      <p className="relative z-10 mt-4 text-[15px] leading-relaxed text-zinc-300/85">{p.descripcion}</p>

      <dl className="relative z-10 mt-7 grid grid-cols-2 gap-2.5">
        {p.metricas.map((m) => {
          const c = p.colorIcono ?? p.color
          return (
            <div key={m.label} className="rounded-2xl px-4 py-4" style={{ background: `color-mix(in srgb, ${c} var(--metrica-alpha), transparent)` }}>
              <dd className="tinte text-2xl font-semibold tracking-[-0.03em]" style={{ color: c }}>
                <NumeroRodante valor={m.valor} />
              </dd>
              <dt className="mt-1 text-xs text-zinc-400">{m.label}</dt>
            </div>
          )
        })}
      </dl>

      <p className="relative z-10 mt-5 text-sm text-zinc-400">
        {p.rol}
      </p>

      <div className="relative z-10 mt-5">
        <Chips items={p.stack} />
      </div>

      <div className="relative z-10 mt-auto flex flex-wrap gap-2.5 pt-8">
        <Botones p={p} />
      </div>
    </Reveal>
  )
}

/* ---------- Sección ---------- */

export default function Projects() {
  const destacado = proyectos.find((p) => p.destacado)
  const resto = proyectos.filter((p) => !p.destacado)

  return (
    <section id="proyectos" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
        <Reveal className="mb-12 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="etiqueta-seccion mb-4 text-[15px] font-bold tracking-[0.2em] uppercase">{t('Proyectos', 'Projects')}</p>
            <h2 className="max-w-lg text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              {t('De la idea al producto', 'From idea to product')}
            </h2>
            <p className="mt-4 max-w-md text-zinc-400">
              {t('Apps, webs y hardware que diseñé y programé, algunos premiados a nivel nacional.', 'Apps, websites and hardware I designed and built, some of them with national awards.')}
            </p>
          </div>
          <p className="flex items-baseline gap-2 text-[15px] font-medium text-zinc-400">
            <span className="text-4xl font-semibold tracking-[-0.03em] tabular-nums text-white">
              <NumeroRodante valor={String(proyectos.length).padStart(2, '0')} />
            </span>{' '}
            {t('proyectos', 'projects')}
          </p>
        </Reveal>

        <div className="space-y-4">
          {destacado && <Destacado p={destacado} numero="01" />}
          <div className="grid gap-4 md:grid-cols-2">
            {resto.map((p, i) => (
              <Tarjeta key={p.id} p={p} numero={String(i + 2).padStart(2, '0')} delay={i * 80} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}