
import { perfil } from '../data'
import Reveal from './Reveal'

// Datos rápidos (color = mismo sistema de etiquetas de la página)
const datos = [
  { label: 'Ubicación', valor: perfil.ubicacion, color: '#a1a1aa' },
  { label: 'Escuela', valor: 'PROA Alta Gracia · 6° año', color: '#3b9eff' },
  { label: 'Foco', valor: 'Web · Mobile · IoT', color: '#a78bfa' },
  { label: 'Estado', valor: 'Disponible para proyectos', color: '#4ade80', pulso: true },
]

export default function About() {
  return (
    <section id="sobre-mi" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        {/* Encabezado */}
        <Reveal className="mb-12 sm:mb-14">
          <p className="inline-flex items-center gap-2 font-mono text-xs text-zinc-300">
            <span className="h-px w-6 bg-zinc-500" />
            Sobre mí
          </p>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            Idea, diseño, código y circuito.
          </h2>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          {/* Texto */}
          <div className="space-y-6">
            <Reveal as="p" className="text-xl leading-relaxed text-zinc-300 sm:text-[22px]">
              Me gusta llevar una idea desde el boceto hasta algo que la gente pueda usar:{' '}
              <span className="text-white">el diseño, el código y, cuando hace falta, el circuito.</span>
            </Reveal>
            <Reveal as="p" delay={80} className="text-[17px] leading-relaxed text-zinc-400">
              Soy estudiante de 6° año en la Escuela Experimental PROA, sede Alta Gracia. Trabajo con{' '}
              <span className="text-zinc-200">React</span> para la web, <span className="text-zinc-200">Kotlin</span>{' '}
              para Android y <span className="text-zinc-200">ESP32</span> para hardware.
            </Reveal>
            <Reveal as="p" delay={140} className="text-[17px] leading-relaxed text-zinc-400">
              Con el equipo de PulsoFirme ganamos la{' '}
              <span className="text-zinc-200">final nacional de Emprende U 2026</span> y el{' '}
              <span className="text-zinc-200">1° puesto en ONIET 2026</span>.
            </Reveal>
          </div>

          {/* Datos rápidos */}
          <Reveal delay={120} className="grid gap-2.5 self-start sm:grid-cols-2 lg:grid-cols-1">
            {datos.map((d) => (
              <div
                key={d.label}
                className="flex items-center justify-between gap-4 rounded-2xl px-5 py-4 shadow-[0_0_28px_-12px_rgba(48,155,169,0.42)] transition-shadow duration-500 hover:shadow-[0_0_42px_-10px_rgba(48,155,169,0.55)]"
                style={{ background: `${d.color}17` }}
              >
                <span className="text-xs font-medium text-zinc-400">{d.label}</span>
                <span className="flex items-center gap-2 text-right text-sm font-semibold" style={{ color: d.color }}>
                  {d.pulso && (
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: d.color }} />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: d.color }} />
                    </span>
                  )}
                  {d.valor}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
