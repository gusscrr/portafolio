import { useEffect, useMemo, useState } from 'react'
import { escucharTema, temaActual } from '../tema'

/*
  Cielo vivo del inicio:
  - Tema oscuro: estrellas que titilan.
  - Tema claro: nubes suaves que cruzan despacio.
*/

// números "al azar" pero siempre iguales (así no cambian en cada recarga)
function azar(semilla) {
  let s = semilla
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

function Estrellas() {
  const estrellas = useMemo(() => {
    const r = azar(7)
    return Array.from({ length: 70 }, (_, i) => ({
      id: i,
      x: r() * 100,
      y: r() * 62,
      tam: r() < 0.15 ? 2.4 : r() < 0.5 ? 1.6 : 1.1,
      dur: 2.5 + r() * 4,
      delay: -r() * 6,
      brillo: 0.35 + r() * 0.6,
    }))
  }, [])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {estrellas.map((e) => (
        <span
          key={e.id}
          className="estrella absolute rounded-full bg-white"
          style={{
            left: `${e.x}%`,
            top: `${e.y}%`,
            width: e.tam,
            height: e.tam,
            '--b': e.brillo,
            animationDuration: `${e.dur}s`,
            animationDelay: `${e.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

function Nube({ className, style }) {
  return (
    <svg viewBox="0 0 220 80" className={className} style={style} aria-hidden>
      <path
        fill="#ffffff"
        d="M30 70c-16 0-28-10-28-23s12-23 28-23c4-14 18-24 34-24 13 0 24 6 30 16 5-4 12-6 19-6 16 0 29 11 31 25 3-1 6-1 9-1 18 0 33 11 33 26 0 6-3 10-7 10z"
      />
    </svg>
  )
}

function Nubes() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <Nube className="nube absolute w-[240px] opacity-60" style={{ top: '12%', animationDuration: '110s', animationDelay: '-20s' }} />
      <Nube className="nube absolute w-[170px] opacity-45" style={{ top: '24%', animationDuration: '140s', animationDelay: '-80s' }} />
      <Nube className="nube absolute w-[320px] opacity-50" style={{ top: '5%', animationDuration: '160s', animationDelay: '-115s' }} />
    </div>
  )
}

export default function Cielo() {
  const [tema, setTema] = useState(temaActual())
  useEffect(() => escucharTema(setTema), [])
  return tema === 'claro' ? <Nubes /> : <Estrellas />
}