import { habilidades } from '../data'
import { useTilt } from './Efectos'
import NumeroRodante from './NumeroRodante'
import Reveal from './Reveal'
import TechChip from './TechChip'
import { t } from '../idioma'

// Descripción corta de cada categoría
const extras = {
  Frontend: { texto: ['Interfaces web rápidas, prolijas y adaptadas a cualquier pantalla.', 'Fast, clean web interfaces that fit any screen.'] },
  Mobile: { texto: ['Apps Android nativas con Kotlin y Jetpack Compose.', 'Native Android apps with Kotlin and Jetpack Compose.'] },
  Backend: { texto: ['Servidores, bases de datos y autenticación.', 'Servers, databases and authentication.'] },
  Hardware: { texto: ['Prototipos con microcontroladores, sensores y motores.', 'Prototypes with microcontrollers, sensors and motors.'] },
  Herramientas: { texto: ['Control de versiones, deploy e inteligencia artificial.', 'Version control, deployment and artificial intelligence.'] },
}

// Tarjeta con los mismos efectos que las de Proyectos: inclinación 3D,
// borde que se aclara y línea de brillo arriba que se enciende.
function Tarjeta({ className = '', children }) {
  const tilt = useTilt(6)
  return (
    <div
      {...tilt}
      className={`group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/[0.08] bg-surface p-6 transition-colors duration-300 hover:border-white/[0.15] sm:p-7 ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100"
      />
      {children}
    </div>
  )
}

export default function Stack() {
  const total = habilidades.reduce((n, h) => n + h.items.length, 0)

  return (
    <section id="stack" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
        {/* Encabezado */}
        <Reveal className="mb-12 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="etiqueta-seccion mb-4 text-[15px] font-bold tracking-[0.2em] uppercase">Stack</p>
            <h2 className="max-w-lg text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              {t('Con qué trabajo', 'What I work with')}
            </h2>
            <p className="mt-4 max-w-md text-zinc-400">
              {t('Las tecnologías que uso todos los días, de la interfaz al hardware.', 'The technologies I use every day, from the interface to the hardware.')}
            </p>
          </div>
          <p className="flex items-baseline gap-2 text-[15px] font-medium text-zinc-400">
            <span className="text-4xl font-semibold tracking-[-0.03em] tabular-nums text-white"><NumeroRodante valor={total} /></span> {t('tecnologías', 'technologies')}
          </p>
        </Reveal>

        {/* Grilla */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {habilidades.map((h, i) => {
            const extra = extras[h.grupo] ?? {}
            return (
              <Reveal key={h.grupo} delay={i * 60} className={i === 0 ? 'md:col-span-2' : ''}>
                <Tarjeta>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold tracking-tight text-white">{h.nombre}</h3>
                    <span className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-xs font-semibold tabular-nums text-zinc-300"><NumeroRodante valor={h.items.length} /></span>
                  </div>

                  {extra.texto && <p className="mt-4 text-sm leading-relaxed text-zinc-400">{t(...extra.texto)}</p>}

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {h.items.map((it) => (
                      <TechChip key={it} nombre={it} grande />
                    ))}
                  </ul>
                </Tarjeta>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}