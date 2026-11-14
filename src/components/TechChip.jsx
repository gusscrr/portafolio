import Icon, { colorMarca, hasIcon } from './Icon'

const reducir = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Luz que sigue al puntero + inclinación 3D (como las tarjetas grandes)
function mover(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = e.clientX - r.left
  const y = e.clientY - r.top
  el.style.setProperty('--x', `${x}px`)
  el.style.setProperty('--y', `${y}px`)
  if (reducir()) return
  const rx = (y / r.height - 0.5) * -16
  const ry = (x / r.width - 0.5) * 16
  el.style.transition = 'transform 120ms var(--ease-out), box-shadow 300ms ease'
  el.style.transform = `perspective(400px) translateY(-2px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`
}

function salir(e) {
  const el = e.currentTarget
  el.style.transition = 'transform 600ms var(--ease-out), box-shadow 300ms ease'
  el.style.transform = 'perspective(400px) rotateX(0deg) rotateY(0deg)'
}

// Etiqueta con efectos al pasar el mouse: se inclina en 3D y se levanta,
// aparece un borde suave, una luz que sigue al puntero y un brillo arriba.
// Se usa en las tecnologías y en las etiquetas "Nacional", "Online", el premio y la estrella.
export function Etiqueta({ as: Tag = 'span', color, className = '', style, children, ...props }) {
  return (
    <Tag
      onMouseMove={mover}
      onMouseLeave={salir}
      className={`group/chip relative overflow-hidden ring-1 ring-transparent transition-[transform,box-shadow] duration-300 ease-[var(--ease-out)] will-change-transform hover:ring-[var(--borde)] ${className}`}
      style={{ color, background: `${color}2e`, '--borde': `${color}66`, ...style }}
      {...props}
    >
      {/* luz que sigue al puntero */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/chip:opacity-100"
        style={{ background: `radial-gradient(70px circle at var(--x) var(--y), ${color}40, transparent 70%)` }}
      />
      {/* brillo arriba */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-3 top-0 h-px opacity-0 transition-opacity duration-300 group-hover/chip:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
      {children}
    </Tag>
  )
}

// Etiqueta de tecnología con el color de su marca
export default function TechChip({ nombre, grande = false }) {
  const c = colorMarca(nombre)
  return (
    <Etiqueta
      as="li"
      color={c}
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${grande ? 'px-3 py-1.5 text-sm' : 'px-2.5 py-1 text-xs'}`}
    >
      {hasIcon(nombre) && <Icon nombre={nombre} mono size={grande ? 15 : 13} className="relative" />}
      <span className="relative">{nombre}</span>
    </Etiqueta>
  )
}