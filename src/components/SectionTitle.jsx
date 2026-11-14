import Reveal from './Reveal'

export default function SectionTitle({ icono, titulo, bajada }) {
  return (
    <Reveal className="mb-10 sm:mb-12">
      <h2 className="flex items-center gap-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
        <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-accent">
          {icono}
        </span>
        {titulo}
      </h2>
      {bajada && <p className="mt-3 max-w-lg text-zinc-400">{bajada}</p>}
    </Reveal>
  )
}
