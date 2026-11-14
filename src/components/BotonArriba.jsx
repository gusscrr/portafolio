import { useEffect, useState } from 'react'
import { t } from '../idioma'

// Botón flotante para volver arriba: chico, sobrio, con un brillo suave detrás.
// Solo aparece cuando bajaste bastante.
export default function BotonArriba() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const calc = () => setVisible(window.scrollY > 700)
    calc()
    window.addEventListener('scroll', calc, { passive: true })
    return () => window.removeEventListener('scroll', calc)
  }, [])

  const subir = () => {
    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reducido ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={subir}
      aria-label={t('Volver arriba', 'Back to top')}
      tabIndex={visible ? 0 : -1}
      className={`group/arriba fixed right-5 bottom-5 z-40 grid h-11 w-11 place-items-center rounded-full bg-surface-2 text-zinc-300 boton-arriba ring-1 ring-white/10 transition-[opacity,transform,background-color,color] duration-300 ease-[var(--ease-out)] hover:bg-[color-mix(in_srgb,var(--color-surface-2),white_6%)] hover:text-white active:scale-95 sm:right-8 sm:bottom-8 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
      }`}
    >
      {/* Brillo suave detrás (igual que la foto de perfil) */}
      <span
        aria-hidden
        className="brillo-arriba pointer-events-none absolute -inset-4 -z-10 rounded-full"
      />
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="transition-transform duration-300 ease-[var(--ease-out)] group-hover/arriba:-translate-y-0.5"
      >
        <path d="M12 19V5" />
        <path d="M6 11l6-6 6 6" />
      </svg>

    </button>
  )
}