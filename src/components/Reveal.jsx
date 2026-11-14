import { useEffect, useRef } from 'react'

// Hace aparecer suave el contenido cuando entra en pantalla.
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          obs.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ '--d': `${delay}ms` }} {...props}>
      {children}
    </Tag>
  )
}