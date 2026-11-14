
import { useState } from 'react'
import { email, perfil, redes } from '../data'
import Icon, { colorMarca } from './Icon'
import Reveal from './Reveal'

function Flecha() {
  return (
    <svg width="16" height="16" viewBox="0 0 12 12" fill="none" aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
      <path d="M3.5 8.5l5-5M4.5 3.5h4v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Contact() {
  const [copiado, setCopiado] = useState(false)

  const copiar = async (e) => {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(email)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 1800)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  // Colores: email blanco, GitHub morado (como "Ver código"), Instagram rosa
  const canales = [
    { label: 'Email', valor: email, url: `mailto:${email}`, color: '#e4e4e7', icono: 'Email' },
    ...redes.map((r) => ({
      label: r.label,
      valor: r.label === 'GitHub' ? '@gusscrr' : '@gusscrr_',
      url: r.url,
      color: r.label === 'GitHub' ? colorMarca('Vite') : colorMarca(r.label),
      icono: r.label,
    })),
  ]

  return (
    <section id="contacto" className="scroll-mt-24 pt-20 pb-10 sm:pt-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        {/* Encabezado */}
        <Reveal>
          <p className="inline-flex items-center gap-2 font-mono text-xs text-zinc-300">
            <span className="h-px w-6 bg-zinc-500" />
            Contacto
          </p>
          <h2 className="mt-5 max-w-3xl text-5xl leading-[0.98] font-semibold tracking-[-0.05em] text-white sm:text-7xl">
            ¿Tenés una idea?
            <span className="block text-zinc-500">Hablemos.</span>
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${email}`}
            className="group/flecha inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1e1e21] transition-[background-color,transform] duration-200 hover:bg-zinc-200 active:scale-[0.97]"
          >
            Escribime
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/flecha:translate-x-1">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <p className="text-sm text-zinc-500">Disponible para proyectos web, apps y prototipos.</p>
        </Reveal>

        {/* Canales */}
        <Reveal delay={160} className="mt-14 grid gap-3 md:grid-cols-3">
          {canales.map((c) => {
            const esEmail = c.label === 'Email'
            const Tag = esEmail ? 'div' : 'a'
            const props = esEmail ? {} : { href: c.url, target: '_blank', rel: 'noreferrer' }
            return (
            <Tag
              key={c.label}
              {...props}
              className="group relative flex flex-col justify-between gap-10 overflow-hidden rounded-[24px] p-6 shadow-[0_0_28px_-12px_rgba(48,155,169,0.42)] transition-[transform,filter,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:brightness-125 hover:shadow-[0_0_42px_-10px_rgba(48,155,169,0.55)]"
              style={{ background: `${c.color}17` }}
            >
              <div className="flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl" style={{ color: c.color, background: `${c.color}26` }}>
                  <Icon nombre={c.icono} mono size={20} />
                </span>
                {esEmail ? (
                  <button
                    type="button"
                    onClick={copiar}
                    className="rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-200"
                    style={{ color: copiado ? '#4ade80' : c.color, background: copiado ? '#4ade802e' : `${c.color}1f` }}
                  >
                    {copiado ? '¡Copiado!' : 'Copiar'}
                  </button>
                ) : (
                  <span style={{ color: c.color }}>
                    <Flecha />
                  </span>
                )}
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-400">{c.label}</p>
                {esEmail ? (
                  <a href={c.url} className="mt-1 block truncate text-lg font-semibold tracking-tight" style={{ color: c.color }}>
                    {c.valor}
                  </a>
                ) : (
                  <p className="mt-1 truncate text-lg font-semibold tracking-tight" style={{ color: c.color }}>
                    {c.valor}
                  </p>
                )}
              </div>
            </Tag>
            )
          })}
        </Reveal>

        {/* Pie */}
        <footer className="mt-20 border-t border-white/[0.07] pt-8 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} {perfil.nombre} · {perfil.ubicacion}
        </footer>
      </div>
    </section>
  )
}
