import { useEffect, useState } from 'react'

// Páginas del sitio: el inicio y "Acerca de" (usa el # de la dirección, sin instalar nada)
export const RUTA_ACERCA = '#/acerca-de'

const leer = () => (window.location.hash === RUTA_ACERCA ? 'acerca' : 'inicio')

export function useRuta() {
  const [ruta, setRuta] = useState(leer)
  useEffect(() => {
    const cambiar = () => setRuta(leer())
    window.addEventListener('hashchange', cambiar)
    return () => window.removeEventListener('hashchange', cambiar)
  }, [])
  return ruta
}

// Ir a una sección del inicio desde cualquier página
export function irASeccion(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  } else {
    window.location.hash = id
  }
}