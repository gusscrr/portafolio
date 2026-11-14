import { useEffect, useRef, useState } from 'react'

/*
  Número que rueda (el mismo efecto de StarDust): cada dígito es una
  tira del 0 al 9 que se desliza hasta su número, como un contador
  mecánico. Rueda cada vez que aparece en pantalla bajando.
  Los signos (°, /, +, letras) quedan quietos.
*/
const DIGITOS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export default function NumeroRodante({ valor, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const texto = String(valor)
  const caracteres = texto.split('')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }
    const obs = new IntersectionObserver(
      // Rueda solo al bajar: cuando sale por abajo (porque subiste)
      // vuelve a 0, así la próxima vez que bajes gira de nuevo.
      // Si sale por arriba (porque seguiste bajando) se queda en su número,
      // y al volver a subir no se mueve.
      ([e]) => {
        if (e.isIntersecting) setVisible(true)
        else if (e.boundingClientRect.top > 0) setVisible(false)
      },
      { threshold: 0.6 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // las ruedas giran con un pequeño retraso de derecha a izquierda
  let digitoN = 0
  return (
    <span ref={ref} className={`rodante ${className}`} aria-label={texto} role="text">
      {caracteres.map((c, i) => {
        const clave = caracteres.length - i
        if (!/[0-9]/.test(c)) {
          return (
            <span key={'s' + clave} className="rodante-signo" aria-hidden="true">
              {c === ' ' ? '\u00a0' : c}
            </span>
          )
        }
        const orden = digitoN++
        const destino = visible ? Number(c) : 0
        return (
          <span key={'d' + clave} className="rueda" aria-hidden="true">
            <span className="rueda-medida">{c}</span>
            <span className="rueda-ventana">
              <span
                className="rueda-tira"
                style={{
                  transform: `translate(-50%, ${-destino * 10}%)`,
                  transitionDelay: `${orden * 90}ms`,
                }}
              >
                {DIGITOS.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </span>
            </span>
          </span>
        )
      })}
    </span>
  )
}