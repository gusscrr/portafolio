// Sonidos cortos generados en el navegador (sin archivos de audio)

const CLAVE = 'sonido-activo'
let ctx = null
let activo = (() => {
  try {
    return localStorage.getItem(CLAVE) !== 'no'
  } catch {
    return true
  }
})()
const oyentes = new Set()

export const sonidoActivo = () => activo

export function setSonido(valor) {
  activo = valor
  try {
    localStorage.setItem(CLAVE, valor ? 'si' : 'no')
  } catch {
    /* sin almacenamiento */
  }
  oyentes.forEach((fn) => fn(valor))
}

export function escucharSonido(fn) {
  oyentes.add(fn)
  return () => oyentes.delete(fn)
}

// Tipos: 'click' (botones y links), 'abrir' y 'cerrar' (buscador), 'encender'
const tonos = {
  click: { desde: 520, hasta: 340, dur: 0.06, vol: 0.06, onda: 'triangle' },
  abrir: { desde: 380, hasta: 640, dur: 0.09, vol: 0.05, onda: 'sine' },
  cerrar: { desde: 600, hasta: 360, dur: 0.08, vol: 0.05, onda: 'sine' },
  encender: { desde: 440, hasta: 880, dur: 0.12, vol: 0.06, onda: 'sine' },
}

export function sonar(tipo = 'click', forzar = false) {
  if (!activo && !forzar) return
  try {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)()
    if (ctx.state === 'suspended') ctx.resume()
    const t = tonos[tipo] || tonos.click
    const ahora = ctx.currentTime
    const osc = ctx.createOscillator()
    const gan = ctx.createGain()
    osc.type = t.onda
    osc.frequency.setValueAtTime(t.desde, ahora)
    osc.frequency.exponentialRampToValueAtTime(t.hasta, ahora + t.dur)
    gan.gain.setValueAtTime(0.0001, ahora)
    gan.gain.exponentialRampToValueAtTime(t.vol, ahora + 0.008)
    gan.gain.exponentialRampToValueAtTime(0.0001, ahora + t.dur)
    osc.connect(gan).connect(ctx.destination)
    osc.start(ahora)
    osc.stop(ahora + t.dur + 0.02)
  } catch {
    /* el navegador no soporta audio */
  }
}

// Interruptor de luz: dos "clics" secos (el de bajar y el de subir la tecla)
export function sonarInterruptor() {
  if (!activo) return
  try {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)()
    if (ctx.state === 'suspended') ctx.resume()
    const ahora = ctx.currentTime

    const clic = (cuando, tono, vol) => {
      // golpe de ruido corto y filtrado (el "tac" del plástico)
      const largo = Math.floor(ctx.sampleRate * 0.03)
      const buffer = ctx.createBuffer(1, largo, ctx.sampleRate)
      const datos = buffer.getChannelData(0)
      for (let i = 0; i < largo; i++) datos[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / largo, 6)
      const ruido = ctx.createBufferSource()
      ruido.buffer = buffer
      const filtro = ctx.createBiquadFilter()
      filtro.type = 'bandpass'
      filtro.frequency.value = tono
      filtro.Q.value = 1.4
      const g = ctx.createGain()
      g.gain.value = vol
      ruido.connect(filtro).connect(g).connect(ctx.destination)
      ruido.start(cuando)

      // cuerpo grave muy cortito (el "toc" de la tecla)
      const osc = ctx.createOscillator()
      const g2 = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(tono / 14, cuando)
      osc.frequency.exponentialRampToValueAtTime(tono / 28, cuando + 0.04)
      g2.gain.setValueAtTime(vol * 0.5, cuando)
      g2.gain.exponentialRampToValueAtTime(0.0001, cuando + 0.045)
      osc.connect(g2).connect(ctx.destination)
      osc.start(cuando)
      osc.stop(cuando + 0.05)
    }

    clic(ahora, 2200, 0.5)
    clic(ahora + 0.07, 3200, 0.35)
  } catch {
    /* el navegador no soporta audio */
  }
}

// Parlante: dos notas cortitas tipo "pop" que suben al prender y bajan al apagar
export function sonarParlante(prender) {
  try {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)()
    if (ctx.state === 'suspended') ctx.resume()
    const t = ctx.currentTime
    const notas = prender ? [660, 990] : [990, 660]

    notas.forEach((f, i) => {
      const cuando = t + i * 0.085
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = 'sine'
      // cada nota arranca un poquito más grave y sube (efecto burbuja)
      osc.frequency.setValueAtTime(f * 0.8, cuando)
      osc.frequency.exponentialRampToValueAtTime(f, cuando + 0.025)
      g.gain.setValueAtTime(0.0001, cuando)
      g.gain.exponentialRampToValueAtTime(0.2, cuando + 0.008)
      g.gain.exponentialRampToValueAtTime(0.0001, cuando + 0.13)
      osc.connect(g).connect(ctx.destination)
      osc.start(cuando)
      osc.stop(cuando + 0.14)
    })
  } catch {
    /* el navegador no soporta audio */
  }
}

// Suena un click en cualquier link o botón de la página
export function activarClicks() {
  const onClick = (e) => {
    const el = e.target.closest('a, button')
    if (!el || el.dataset.sinSonido !== undefined) return
    sonar('click')
  }
  document.addEventListener('click', onClick)
  return () => document.removeEventListener('click', onClick)
}