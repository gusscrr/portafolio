import { useEffect, useRef, useState } from 'react'

const reducir = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---------- Palabras que aparecen una por una (desenfoque → nítido) ---------- */

export function PalabrasEntrada({ texto, inicio = 0, paso = 90, className = '' }) {
  return texto.split(' ').map((palabra, i) => (
    <span key={i} className={`palabra-entrada ${className}`} style={{ '--d': `${inicio + i * paso}ms` }}>
      {palabra}
      {i < texto.split(' ').length - 1 ? ' ' : ''}
    </span>
  ))
}

/* ---------- Texto que se ilumina palabra por palabra al hacer scroll ---------- */

export function TextoScroll({ texto, destacar = [], className = '' }) {
  const ref = useRef(null)
  const [p, setP] = useState(reducir() ? 1 : 0)
  const palabras = texto.split(' ')

  useEffect(() => {
    if (reducir()) return
    let raf = 0
    const calc = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        const vh = window.innerHeight
        // empieza a iluminarse cuando entra por abajo y termina a mitad de pantalla
        const v = (vh * 0.85 - r.top) / (vh * 0.85 - vh * 0.35 + r.height * 0.4)
        setP(Math.min(1, Math.max(0, v)))
      })
    }
    calc()
    window.addEventListener('scroll', calc, { passive: true })
    window.addEventListener('resize', calc)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', calc)
      window.removeEventListener('resize', calc)
    }
  }, [])

  return (
    <p ref={ref} className={className}>
      {palabras.map((w, i) => {
        const local = Math.min(1, Math.max(0, p * palabras.length - i))
        const fuerte = destacar.includes(w.replace(/[.,:]/g, ''))
        return (
          <span
            key={i}
            className="transition-[opacity,color] duration-200"
            style={{ opacity: 0.18 + local * 0.82, color: fuerte ? '#fff' : undefined }}
          >
            {w}{' '}
          </span>
        )
      })}
    </p>
  )
}

/* ---------- Botón magnético: se acerca al mouse ---------- */

export function Magnetico({ children, fuerza = 0.3, max = 10 }) {
  const ref = useRef(null)

  const mover = (e) => {
    if (reducir()) return
    const el = ref.current
    const r = el.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    const x = Math.max(-max, Math.min(max, dx * fuerza))
    const y = Math.max(-max, Math.min(max, dy * fuerza))
    el.style.transition = 'transform 150ms var(--ease-out)'
    el.style.transform = `translate(${x}px, ${y}px)`
  }
  const salir = () => {
    const el = ref.current
    el.style.transition = 'transform 500ms var(--ease-out)'
    el.style.transform = 'translate(0, 0)'
  }

  return (
    <span ref={ref} onMouseMove={mover} onMouseLeave={salir} className="inline-flex">
      {children}
    </span>
  )
}

/* ---------- Inclinación 3D de tarjetas + luz que sigue al puntero ---------- */

export function useTilt(grados = 5) {
  const mover = (e) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    el.style.setProperty('--x', `${x}px`)
    el.style.setProperty('--y', `${y}px`)
    if (reducir()) return
    const rx = ((y / r.height) - 0.5) * -grados
    const ry = ((x / r.width) - 0.5) * grados
    el.style.transition = 'transform 120ms var(--ease-out), border-color 300ms ease'
    el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`
  }
  const salir = (e) => {
    const el = e.currentTarget
    el.style.transition = 'transform 600ms var(--ease-out), border-color 300ms ease'
    el.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)'
  }
  return { onMouseMove: mover, onMouseLeave: salir }
}

/* ---------- "Boop": al pasar el mouse el ícono gira o salta un instante
   y vuelve con efecto resorte (como los íconos de la web de Josh Comeau) ---------- */

export function Boop({ children, rotar = 0, x = 0, y = 0, escala = 1, tiempo = 150 }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const padre = el?.closest('a, button')
    if (!padre) return
    let anim = null
    const total = tiempo + 650
    const activar = () => {
      if (reducir()) return
      // Si todavía está rebotando, no lo cortamos (así no da saltos ni se traba)
      if (anim && anim.playState === 'running') return
      // Animación del navegador: no depende de transiciones CSS,
      // así no se frena cuando cambia el tema ni se pisa con otros estilos
      anim = el.animate(
        [
          { transform: 'none', easing: 'cubic-bezier(0.2, 0.8, 0.3, 1)' },
          {
            transform: `translate(${x}px, ${y}px) rotate(${rotar}deg) scale(${escala})`,
            offset: tiempo / total,
            easing: 'cubic-bezier(0.3, 1.8, 0.4, 1)',
          },
          { transform: 'none' },
        ],
        { duration: total },
      )
    }
    padre.addEventListener('pointerenter', activar)
    return () => {
      anim?.cancel()
      padre.removeEventListener('pointerenter', activar)
    }
  }, [rotar, x, y, escala, tiempo])
  return (
    <span ref={ref} className="inline-flex">
      {children}
    </span>
  )
}