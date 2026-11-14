import {
  siAndroidstudio,
  siArduino,
  siCplusplus,
  siCss,
  siEspressif,
  siFirebase,
  siGit,
  siGithub,
  siGmail,
  siHtml5,
  siInstagram,
  siJavascript,
  siJetpackcompose,
  siKotlin,
  siMysql,
  siNodedotjs,
  siPhp,
  siReact,
  siTailwindcss,
  siVercel,
  siPython,
  siClaude,
  siVite,
} from 'simple-icons'

// Logos de tecnologías (Simple Icons). Los logos negros se muestran en blanco.
const iconos = {
  React: siReact,
  Vite: siVite,
  'Tailwind CSS': siTailwindcss,
  Tailwind: siTailwindcss,
  JavaScript: siJavascript,
  HTML: siHtml5,
  CSS: siCss,
  Kotlin: siKotlin,
  'Jetpack Compose': siJetpackcompose,
  'Android Studio': siAndroidstudio,
  Firebase: siFirebase,
  'Node.js': siNodedotjs,
  PHP: siPhp,
  MySQL: siMysql,
  ESP32: siEspressif,
  Arduino: siArduino,
  'C++': siCplusplus,
  Git: siGit,
  GitHub: siGithub,
  Vercel: siVercel,
  Python: siPython,
  Claude: siClaude,
  Instagram: siInstagram,
  Email: siGmail,
}

const oscuros = new Set(['GitHub', 'Vercel'])

// Color de marca ajustado para que se lea bien sobre fondo oscuro
export function colorMarca(nombre) {
  // GitHub usa el morado de la página (igual que "Ver código")
  if (nombre === 'GitHub') return colorMarca('Vite')
  const icon = iconos[nombre]
  if (!icon || oscuros.has(nombre)) return '#e4e4e7'
  let r = parseInt(icon.hex.slice(0, 2), 16) / 255
  let g = parseInt(icon.hex.slice(2, 4), 16) / 255
  let b = parseInt(icon.hex.slice(4, 6), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let sat = 0
  let l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    sat = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4
    h /= 6
  }
  // aclarar los colores muy oscuros
  l = Math.min(Math.max(l, 0.66), 0.72)
  sat = Math.min(Math.max(sat, 0.55), 0.95)
  const q = l < 0.5 ? l * (1 + sat) : l + sat - l * sat
  const p2 = 2 * l - q
  const conv = (t) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p2 + (q - p2) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p2 + (q - p2) * (2 / 3 - t) * 6
    return p2
  }
  const hex = (v) =>
    Math.round(v * 255)
      .toString(16)
      .padStart(2, '0')
  ;[r, g, b] = sat === 0 ? [l, l, l] : [conv(h + 1 / 3), conv(h), conv(h - 1 / 3)]
  return `#${hex(r)}${hex(g)}${hex(b)}`
}

// Íconos de línea (estilo Tabler): trazo fino y redondeado
const lineales = {
  Buscar: (
    <>
      <circle cx="10.5" cy="10.5" r="7.25" />
      <path d="M15.9 15.9L19.5 19.5" />
      <ellipse cx="11.9" cy="8.7" rx="2.5" ry="1.7" transform="rotate(35 11.9 8.7)" fill="currentColor" stroke="none" opacity="0.5" />
    </>
  ),
  Sonido: (
    <>
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <path className="onda onda-1" d="M15.5 9.2a4 4 0 0 1 0 5.6" />
      <path className="onda onda-2" d="M18.6 6.4a8 8 0 0 1 0 11.2" />
    </>
  ),
  Silencio: (
    <>
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <path d="M22 9l-6 6M16 9l6 6" />
    </>
  ),
  LinkedIn: (
    <>
      <circle cx="5" cy="5" r="1.6" />
      <path d="M3.5 9.5h3V20h-3z" />
      <path d="M10 20v-6.5a5 5 0 0 1 10 0V20h-3v-6.5a2 2 0 0 0 -4 0V20z" />
    </>
  ),
  // Traducir (文A), mismo trazo que los demás íconos
  Idioma: (
    <>
      <path d="M4 5h7" />
      <path d="M9 3v2c0 4.4-2.2 8-5 8" />
      <path d="M5 9c0 2.1 3 3.9 6.7 4" />
      <path d="M12 20l4-9 4 9" />
      <path d="M19.1 18h-6.2" />
    </>
  ),
  Luna: <path d="M20.5 13.2A8.5 8.5 0 1 1 10.8 3.5a6.6 6.6 0 0 0 9.7 9.7z" />,
  Sol: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v1.5M12 20v1.5M2.5 12H4M20 12h1.5M5.3 5.3l1.06 1.06M17.64 17.64l1.06 1.06M5.3 18.7l1.06-1.06M17.64 6.36l1.06-1.06" />
    </>
  ),
  Hash: (
    <>
      <path d="M5 9h14" />
      <path d="M5 15h14" />
      <path d="M11 4l-4 16" />
      <path d="M17 4l-4 16" />
    </>
  ),
  GitHub: (
    <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
  ),
  // Instagram con el mismo trazo que los demás: cuadro redondeado, lente y el puntito del flash
  Instagram: (
    <>
      <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5.25" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.1" cy="6.9" r="1.05" fill="currentColor" stroke="none" />
    </>
  ),
  Email: (
    <>
      <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
      <path d="M3 7l9 6l9 -6" />
    </>
  ),
}

export function hasIcon(nombre) {
  return Boolean(iconos[nombre])
}

export default function Icon({ nombre, size = 14, mono = false, linea = false, className = '' }) {
  if (linea && lineales[nombre]) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        aria-hidden
        className={`shrink-0 ${className}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {lineales[nombre]}
      </svg>
    )
  }
  const icon = iconos[nombre]
  if (!icon) return null
  const fill = mono || oscuros.has(nombre) ? 'currentColor' : `#${icon.hex}`
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className={`shrink-0 ${className}`} fill={fill}>
      <path d={icon.path} />
    </svg>
  )
}

// Ícono animado de tema: la luna gira y se achica mientras el sol aparece
// girando y sus rayos salen uno por uno (como en la web de Josh Comeau)
const rayos = [0, 45, 90, 135, 180, 225, 270, 315]

export function IconoTema({ claro, size = 25 }) {
  const resorte = 'cubic-bezier(0.34, 1.56, 0.64, 1)'
  return (
    <span className="tema-anim relative inline-grid place-items-center" style={{ width: size, height: size }} aria-hidden>
      {/* Luna */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute inset-0"
        style={{
          transition: `transform 500ms ${resorte}, opacity 250ms ease`,
          transform: claro ? 'rotate(90deg) scale(0.3)' : 'rotate(0deg) scale(1)',
          opacity: claro ? 0 : 1,
        }}
      >
        <path d="M20.5 13.2A8.5 8.5 0 1 1 10.8 3.5a6.6 6.6 0 0 0 9.7 9.7z" />
      </svg>

      {/* Sol */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        className="absolute inset-0"
        style={{
          transition: `transform 600ms ${resorte}, opacity 250ms ease`,
          transform: claro ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.3)',
          opacity: claro ? 1 : 0,
        }}
      >
        <circle cx="12" cy="12" r="4" />
        {rayos.map((g, i) => (
          <line
            key={g}
            x1="12"
            y1="2.5"
            x2="12"
            y2="4"
            transform={`rotate(${g} 12 12)`}
            style={{
              transformBox: 'view-box',
              transition: `opacity 200ms ease ${claro ? 150 + i * 40 : 0}ms`,
              opacity: claro ? 1 : 0,
            }}
          />
        ))}
      </svg>
    </span>
  )
}