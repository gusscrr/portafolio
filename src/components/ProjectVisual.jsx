// Mini ilustraciones de cada proyecto, hechas solo con CSS.
// Si después tenés capturas reales, se pueden reemplazar por <img>.

function PulsoFirme() {
  return (
    <div className="flex h-full items-end justify-center pt-8">
      <div className="w-40 rounded-t-[26px] border border-b-0 border-white/10 bg-[#0d1512] p-3 pb-0 shadow-2xl">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/10" />
        <p className="text-[9px] text-emerald-200/60">Hola, More</p>
        <p className="text-[11px] font-medium text-emerald-50">Resumen de hoy</p>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          {[
            ['3/5', 'Ejercicios'],
            ['28m', 'Tiempo'],
            ['4d', 'Racha'],
            ['12°', 'Inclinación'],
          ].map(([v, l]) => (
            <div key={l} className="rounded-lg bg-white/[0.04] p-1.5">
              <p className="text-[11px] font-semibold text-emerald-300">{v}</p>
              <p className="text-[7px] text-emerald-100/40">{l}</p>
            </div>
          ))}
        </div>
        <div className="mt-2 flex h-10 items-end gap-1 rounded-lg bg-white/[0.04] p-1.5">
          {[40, 65, 50, 80, 60, 90, 72].map((h, i) => (
            <span key={i} className="flex-1 rounded-sm bg-emerald-400/70" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ClimApp() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-48 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
        <p className="text-[9px] text-sky-100/50">Alta Gracia</p>
        <div className="flex items-start justify-between">
          <p className="text-4xl font-light tracking-tight text-sky-50">22°</p>
          <div className="mt-1 h-7 w-7 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 shadow-[0_0_24px_rgba(251,191,36,0.4)]" />
        </div>
        <p className="text-[9px] text-sky-100/40">Despejado · Máx 26° Mín 14°</p>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {[
            ['12 km/h', 'Viento'],
            ['Buena', 'Aire'],
            ['48%', 'Humedad'],
          ].map(([v, l]) => (
            <div key={l} className="rounded-md bg-white/[0.05] p-1.5">
              <p className="text-[9px] font-medium text-sky-200">{v}</p>
              <p className="text-[7px] text-sky-100/40">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function BlackBarberia() {
  const horas = ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30']
  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-52 rounded-2xl border border-white/10 bg-[#141416] p-4">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-zinc-100">BLACK</p>
          <p className="text-[8px] text-zinc-500">Martes 12</p>
        </div>
        <p className="mt-3 text-[9px] text-zinc-500">Elegí un horario</p>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {horas.map((h, i) => (
            <span
              key={h}
              className={`rounded-md py-1 text-center text-[9px] ${
                i === 2
                  ? 'bg-zinc-100 font-medium text-zinc-900'
                  : i === 4
                    ? 'bg-white/[0.03] text-zinc-700 line-through'
                    : 'bg-white/[0.06] text-zinc-300'
              }`}
            >
              {h}
            </span>
          ))}
        </div>
        <div className="mt-3 rounded-md bg-zinc-100 py-1.5 text-center text-[9px] font-medium text-zinc-900">
          Confirmar turno
        </div>
      </div>
    </div>
  )
}

const visuales = { pulsofirme: PulsoFirme, climapp: ClimApp, blackbarberia: BlackBarberia }

export default function ProjectVisual({ id, color, compacto = false }) {
  const Visual = visuales[id]
  return (
    <div className={`relative overflow-hidden bg-[#232326] ${compacto ? 'h-56 sm:h-64' : 'h-60 sm:h-80'}`}>
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-45"
        style={{ background: `radial-gradient(60% 70% at 50% 100%, ${color}, transparent)` }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />
      <div className="relative h-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1">
        <div className={`h-full ${compacto ? 'scale-110 sm:scale-[1.2]' : 'scale-110 sm:scale-[1.45]'} ${id === 'pulsofirme' ? 'origin-bottom' : 'origin-center'}`}>
          {Visual && <Visual />}
        </div>
      </div>
    </div>
  )
}