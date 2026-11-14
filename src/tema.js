import { sonarInterruptor } from './sonido'

// Tema claro / oscuro: se guarda en el navegador y se aplica en <html data-tema="...">

const CLAVE = 'tema'
const oyentes = new Set()

function leer() {
  try {
    return localStorage.getItem(CLAVE) === 'claro' ? 'claro' : 'oscuro'
  } catch {
    return 'oscuro'
  }
}

let tema = leer()

function aplicar() {
  document.documentElement.dataset.tema = tema
}

// Se llama una vez al arrancar (en main.jsx) para que no parpadee
export function iniciarTema() {
  aplicar()
}

export const temaActual = () => tema

export function alternarTema() {
  tema = tema === 'claro' ? 'oscuro' : 'claro'
  sonarInterruptor()
  try {
    localStorage.setItem(CLAVE, tema)
  } catch {
    /* sin almacenamiento */
  }
  // Cambio instantáneo: se apagan las transiciones un momento
  const html = document.documentElement
  html.classList.add('cambiando-tema')
  aplicar()
  requestAnimationFrame(() => requestAnimationFrame(() => html.classList.remove('cambiando-tema')))
  oyentes.forEach((fn) => fn(tema))
}

export function escucharTema(fn) {
  oyentes.add(fn)
  return () => oyentes.delete(fn)
}