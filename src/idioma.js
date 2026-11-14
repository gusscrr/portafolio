// Idioma de la página: español o inglés. Se guarda en el navegador.

const CLAVE = 'idioma'
const oyentes = new Set()

function leer() {
  try {
    return localStorage.getItem(CLAVE) === 'en' ? 'en' : 'es'
  } catch {
    return 'es'
  }
}

let idioma = leer()
document.documentElement.lang = idioma

export const idiomaActual = () => idioma

// Devuelve el texto en el idioma actual: t('Hola', 'Hello')
export const t = (es, en) => (idioma === 'en' ? en : es)

export function alternarIdioma() {
  idioma = idioma === 'en' ? 'es' : 'en'
  try {
    localStorage.setItem(CLAVE, idioma)
  } catch {
    /* sin almacenamiento */
  }
  document.documentElement.lang = idioma
  oyentes.forEach((fn) => fn(idioma))
}

export function escucharIdioma(fn) {
  oyentes.add(fn)
  return () => oyentes.delete(fn)
}