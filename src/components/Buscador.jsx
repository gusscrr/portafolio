import { useEffect, useMemo, useRef, useState } from 'react'
import { habilidades, proyectos } from '../data'
import Icon, { colorMarca, hasIcon } from './Icon'
import { sonar } from '../sonido'
import { irASeccion, RUTA_ACERCA } from '../ruta'
import { t } from '../idioma'

// Todo lo que se puede buscar en la página (se arma según el idioma)
const armarOpciones = () => {
  const secciones = [
    { texto: t('Inicio', 'Home'), destino: 'inicio' },
    { texto: t('Trayectoria', 'Journey'), destino: 'trayectoria', extra: 'premios logros awards' },
    { texto: t('Proyectos', 'Projects'), destino: 'proyectos' },
    { texto: 'Stack', destino: 'stack', extra: 'tecnologías technologies' },
    { texto: t('Acerca de', 'About'), destino: 'acerca', extra: 'certificaciones certificados premios diplomas certificates' },
    { texto: t('Contacto', 'Contact'), destino: 'contacto', extra: 'email mail' },
  ]
  return [
    ...secciones.map((s) => ({ ...s, tipo: t('Sección', 'Section'), clase: 'seccion' })),
    ...proyectos.map((p) => ({ texto: p.nombre, destino: 'proyectos', tipo: t('Proyecto', 'Project'), clase: 'proyecto', color: p.colorIcono ?? p.color })),
    ...habilidades.flatMap((h) =>
      h.items.map((it) => ({ texto: it, destino: 'stack', tipo: t('Tecnología', 'Technology'), clase: 'tech', extra: h.nombre, tech: true })),
    ),
  ]
}

const normalizar = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

export default function Buscador({ abierto, cerrar }) {
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const input = useRef(null)
  const lista = useRef(null)

  const opciones = useMemo(armarOpciones, [])
  const resultados = useMemo(() => {
    const n = normalizar(q.trim())
    if (!n) return opciones.filter((o) => o.clase !== 'tech')
    return opciones.filter((o) => normalizar(`${o.texto} ${o.extra ?? ''} ${o.tipo}`).includes(n))
  }, [q, opciones])

  useEffect(() => {
    if (!abierto) return
    setQ('')
    setSel(0)
    const t = setTimeout(() => input.current?.focus(), 30)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      clearTimeout(t)
      document.body.style.overflow = prev
    }
  }, [abierto])

  useEffect(() => setSel(0), [q])

  // Mantener visible la opción elegida con el teclado
  useEffect(() => {
    lista.current?.querySelector(`[data-i="${sel}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [sel])

  const ir = (o) => {
    cerrar()
    setTimeout(() => {
      if (o.destino === 'acerca') window.location.hash = RUTA_ACERCA
      else irASeccion(o.destino)
    }, 120)
  }

  const teclas = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSel((v) => Math.min(v + 1, resultados.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSel((v) => Math.max(v - 1, 0))
    } else if (e.key === 'Enter' && resultados[sel]) {
      sonar('click')
      ir(resultados[sel])
    } else if (e.key === 'Escape') {
      cerrar()
    }
  }

  const hayTexto = q.trim().length > 0
  const borrar = () => {
    setQ('')
    input.current?.focus()
  }

  return (
    <div className={`fixed inset-0 z-[60] ${abierto ? 'visible' : 'invisible'}`} role="dialog" aria-modal="true" aria-label={t('Buscar', 'Search')}>
      {/* Clic afuera: cierra */}
      <button
        aria-label={t('Cerrar buscador', 'Close search')}
        data-sin-sonido
        onClick={cerrar}
        className={`absolute inset-0 cursor-default bg-transparent transition-opacity duration-300 ${abierto ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Panel claro que baja desde arriba, con el borde de abajo en ondas (como la web de Josh) */}
      <div
        className={`absolute inset-x-0 top-0 transition-transform duration-500 ease-[var(--ease-out)] ${
          abierto ? 'translate-y-0' : '-translate-y-[110%]'
        }`}
        style={{ color: '#14161b' }}
      >
        <div className="relative px-5 pt-6 pb-4 sm:pt-7" style={{ background: '#e6e9ee' }}>
          {/* Cerrar (X con el mismo efecto que la web de Josh) */}
          <BotonCerrar cerrar={cerrar} />

          <div className="mx-auto w-full max-w-[620px] pr-12 md:pr-0">
            {/* Campo con línea abajo */}
            <label className="flex items-center gap-3 border-b-2 pb-2.5" style={{ borderColor: '#1d9be0' }}>
              <Icon nombre="Buscar" linea size={20} />
              <input
                ref={input}
                id="buscador-input"
                name="busqueda-portafolio"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={teclas}
                style={{ outline: 'none', color: '#14161b' }}
                placeholder={t('Buscar…', 'Search…')}
                className="buscador-input min-w-0 flex-1 cursor-text bg-transparent text-[17px] font-medium outline-none"
              />
              {hayTexto && <Papelera borrar={borrar} />}
            </label>

            {!hayTexto ? (
              <p className="mt-12 pb-14 text-center text-[15px] italic" style={{ color: '#2a2f3a' }}>
                {t('Buscá entre mis proyectos, secciones y tecnologías.', 'Search through my projects, sections and technologies.')}
              </p>
            ) : (
              <ul ref={lista} className="sin-barra mt-5 max-h-[46vh] overflow-y-auto pb-10">
                {resultados.length === 0 && (
                  <li className="py-8 text-center text-[15px] italic" style={{ color: '#4b5260' }}>
                    {t('No encontré nada con', 'Nothing found for')} “{q}”.
                  </li>
                )}
                {resultados.map((o, i) => {
                  const c = o.tech ? colorMarca(o.texto) : o.color
                  return (
                    <li key={`${o.tipo}-${o.texto}`}>
                      <button
                        data-i={i}
                        onMouseMove={() => setSel(i)}
                        onClick={() => ir(o)}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-150"
                        style={{ background: sel === i ? 'rgba(20,22,27,0.07)' : 'transparent' }}
                      >
                        <span
                          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg"
                          style={{ color: c ?? '#4b5260', background: c ? `${c}26` : 'rgba(20,22,27,0.06)' }}
                        >
                          {o.tech && hasIcon(o.texto) ? (
                            <Icon nombre={o.texto} size={15} />
                          ) : o.clase === 'proyecto' ? (
                            <span className="h-2 w-2 rounded-full bg-current" />
                          ) : (
                            <Icon nombre="Hash" linea size={15} />
                          )}
                        </span>
                        <span className="flex-1 text-[15px] font-semibold">{o.texto}</span>
                        <span className="text-xs font-medium" style={{ color: '#5d6472' }}>
                          {o.tipo}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>

        {/* Borde de abajo en ondas: misma forma que el buscador de Josh */}
        <svg aria-hidden className="-mt-px block h-[max(7.4vw,48px)] w-full" viewBox="0 0 1365 100" preserveAspectRatio="xMidYMin slice">
          <path fill="#e6e9ee" d="M0 0 L0 35.0 C2.7 35.0 11.3 34.8 16 35.0 C20.7 35.2 25.0 36.0 28 36.0 C31.0 36.0 30.7 35.2 34 35.0 C37.3 34.8 42.0 35.3 48 34.6 C54.0 33.9 65.0 31.8 70 30.8 C75.0 29.8 74.3 30.0 78 28.6 C81.7 27.2 88.0 24.7 92 22.6 C96.0 20.5 99.0 18.4 102 16.2 C105.0 14.0 108.0 11.1 110 9.6 C112.0 8.1 113.0 7.4 114 7.0 C115.0 6.6 112.7 4.3 116 7.0 C119.3 9.7 128.3 18.9 134 23.2 C139.7 27.5 145.0 30.3 150 32.8 C155.0 35.3 159.3 36.7 164 38.4 C168.7 40.1 171.0 41.0 178 42.8 C185.0 44.6 198.3 47.5 206 49.0 C213.7 50.5 217.0 50.9 224 51.6 C231.0 52.3 243.0 52.6 248 53.0 C253.0 53.4 249.3 53.8 254 54.0 C258.7 54.2 270.0 54.2 276 54.0 C282.0 53.8 285.7 53.1 290 52.6 C294.3 52.1 297.3 51.9 302 50.8 C306.7 49.7 314.0 47.6 318 46.2 C322.0 44.8 322.7 44.5 326 42.6 C329.3 40.7 338.0 35.0 338 35.0 C338.0 35.0 349.0 46.2 354 50.4 C359.0 54.6 364.7 57.9 368 60.0 C371.3 62.1 369.7 61.3 374 63.0 C378.3 64.7 389.3 68.8 394 70.4 C398.7 72.0 398.0 71.9 402 72.8 C406.0 73.7 412.0 75.0 418 76.0 C424.0 77.0 432.3 77.9 438 78.6 C443.7 79.3 448.0 79.8 452 80.0 C456.0 80.2 459.3 79.8 462 80.0 C464.7 80.2 462.0 80.8 468 81.0 C474.0 81.2 491.0 81.2 498 81.0 C505.0 80.8 505.3 80.5 510 80.0 C514.7 79.5 521.0 78.9 526 78.0 C531.0 77.1 535.7 76.1 540 74.6 C544.3 73.1 548.3 71.1 552 69.0 C555.7 66.9 560.0 63.2 562 62.0 C564.0 60.8 561.3 60.4 564 62.0 C566.7 63.6 573.7 68.7 578 71.4 C582.3 74.1 585.7 76.0 590 78.0 C594.3 80.0 598.0 81.4 604 83.4 C610.0 85.4 621.3 88.8 626 90.0 C630.7 91.2 630.7 90.6 632 90.6 C633.3 90.6 634.0 90.0 634 90.0 C634.0 90.0 641.0 92.3 648 93.0 C655.0 93.7 670.3 94.0 676 94.0 C681.7 94.0 682.0 93.0 682 93.0 C682.0 93.0 684.7 94.2 692 93.8 C699.3 93.4 716.7 91.9 726 90.6 C735.3 89.3 741.3 88.0 748 86.2 C754.7 84.4 759.3 83.0 766 80.0 C772.7 77.0 784.0 70.0 788 68.0 C792.0 66.0 787.3 66.8 790 68.0 C792.7 69.2 800.7 73.5 804 75.0 C807.3 76.5 804.3 76.0 810 77.0 C815.7 78.0 828.7 80.3 838 81.0 C847.3 81.7 858.3 81.3 866 81.0 C873.7 80.7 879.7 79.3 884 79.0 C888.3 78.7 887.0 79.4 892 79.0 C897.0 78.6 908.3 77.4 914 76.6 C919.7 75.8 923.0 74.5 926 74.0 C929.0 73.5 926.3 74.8 932 73.6 C937.7 72.4 953.0 68.7 960 66.6 C967.0 64.5 969.7 62.9 974 61.0 C978.3 59.1 982.0 57.4 986 55.0 C990.0 52.6 993.7 50.3 998 46.6 C1002.3 42.9 1009.3 35.3 1012 33.0 C1014.7 30.7 1011.3 32.0 1014 33.0 C1016.7 34.0 1023.0 37.2 1028 39.2 C1033.0 41.2 1039.3 43.4 1044 44.8 C1048.7 46.2 1052.3 47.1 1056 47.8 C1059.7 48.5 1062.3 48.4 1066 49.0 C1069.7 49.6 1072.3 50.8 1078 51.6 C1083.7 52.4 1089.7 53.6 1100 54.0 C1110.3 54.4 1131.3 54.2 1140 54.0 C1148.7 53.8 1149.0 53.3 1152 52.8 C1155.0 52.3 1154.7 51.7 1158 51.0 C1161.3 50.3 1166.0 50.5 1172 48.8 C1178.0 47.1 1187.3 43.9 1194 41.0 C1200.7 38.1 1206.3 35.0 1212 31.4 C1217.7 27.8 1224.0 22.8 1228 19.6 C1232.0 16.4 1234.0 13.3 1236 12.0 C1238.0 10.7 1237.0 10.3 1240 12.0 C1243.0 13.7 1248.7 19.1 1254 22.0 C1259.3 24.9 1268.3 28.2 1272 29.6 C1275.7 31.0 1274.0 30.4 1276 30.6 C1278.0 30.8 1281.0 30.6 1284 31.0 C1287.0 31.4 1291.0 32.9 1294 33.2 C1297.0 33.5 1302.0 33.0 1302 33.0 C1302.0 33.0 1310.0 34.8 1314 35.0 C1318.0 35.2 1321.3 34.2 1326 34.0 C1330.7 33.8 1338.3 34.2 1342 34.0 C1345.7 33.8 1344.2 33.2 1348 33.0 C1351.8 32.8 1362.2 33.0 1365 33.0 L1365 0 Z" />
        </svg>
      </div>
    </div>
  )
}


/* ---------- Resortes (copiados midiendo la web de Josh) ----------
   "p" va de 0 a 1 (ida) y vuelve a 0 (vuelta) con física de resorte.
   Se usa para mover los puntos de los íconos cuadro por cuadro. */
function resorte(alCambiar, { sostener = 150, tension = 300, friccion = 10, topeIda = true, topeVuelta = false } = {}) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
  let p = 0
  let vel = 0
  let destino = 1
  let antes = performance.now()
  const inicio = antes
  let id
  const paso = (ahora) => {
    let dt = Math.min(0.032, (ahora - antes) / 1000)
    antes = ahora
    if (destino === 1 && ahora - inicio > sostener) destino = 0
    // varios pasos chicos para que el resorte sea estable
    for (let i = 0; i < 4; i++) {
      const h = dt / 4
      vel += (-tension * (p - destino) - friccion * vel) * h
      p += vel * h
      if (destino === 1 && topeIda && p > 1) { p = 1; vel = 0 }
      if (destino === 0 && topeVuelta && p < 0) { p = 0; vel = 0 }
    }
    alCambiar(p)
    if (destino === 0 && Math.abs(p) < 0.001 && Math.abs(vel) < 0.01) {
      alCambiar(0)
      return
    }
    id = requestAnimationFrame(paso)
  }
  id = requestAnimationFrame(paso)
  return () => cancelAnimationFrame(id)
}

// X para cerrar, igual a la de Josh:
// al pasar el puntero la X se aplasta un poquito y rebota;
// al hacer clic se aplasta hasta quedar como una rayita "—", se estira y vuelve con rebote.
function BotonCerrar({ cerrar }) {
  const l1 = useRef(null)
  const l2 = useRef(null)
  const parar = useRef(() => {})

  const dibujar = (aplastar, abrir) => {
    const y = 5 + aplastar
    const x1 = 5 - abrir
    const x2 = 19 + abrir
    l1.current?.setAttribute('x1', x1)
    l1.current?.setAttribute('y1', y)
    l1.current?.setAttribute('x2', x2)
    l1.current?.setAttribute('y2', 24 - y)
    l2.current?.setAttribute('x1', x1)
    l2.current?.setAttribute('y1', 24 - y)
    l2.current?.setAttribute('x2', x2)
    l2.current?.setAttribute('y2', y)
  }

  const boop = () => {
    parar.current()
    parar.current = resorte((p) => dibujar(p * 1.9, 0), { sostener: 170, tension: 275, friccion: 14, topeIda: false })
  }
  const apretar = () => {
    parar.current()
    parar.current = resorte((p) => dibujar(p * 7, p * 2), { sostener: 190, tension: 300, friccion: 16 })
  }

  return (
    <button
      type="button"
      onPointerEnter={boop}
      onPointerDown={apretar}
      onClick={cerrar}
      aria-label={t('Cerrar', 'Close')}
      data-sin-sonido
      className="absolute top-2 right-0 grid place-items-center rounded-full p-4 sm:top-3 sm:right-4"
      style={{ color: '#14161b' }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden className="overflow-visible">
        <line ref={l1} x1="5" y1="5" x2="19" y2="19" />
        <line ref={l2} x1="5" y1="19" x2="19" y2="5" />
      </svg>
    </button>
  )
}

// Papelera para borrar lo escrito, igual a la de Josh:
// al hacer clic la tapa salta hacia arriba girando un poco y vuelve a su lugar.
function Papelera({ borrar }) {
  const tapa = useRef(null)
  const parar = useRef(() => {})
  const clic = (e) => {
    e.preventDefault()
    parar.current()
    parar.current = resorte(
      (p) => tapa.current?.setAttribute('style', `transform: translateY(${-21 * p}px) rotate(${12.7 * p}deg); transform-origin: 12px 12px; transform-box: view-box;`),
      { sostener: 125, tension: 275, friccion: 12, topeVuelta: true },
    )
    // Se borra cuando la tapa vuelve a cerrarse (si no, el tacho desaparece antes de animarse)
    setTimeout(borrar, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 300)
  }
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={clic}
      aria-label={t('Borrar búsqueda', 'Clear search')}
      className="grid shrink-0 place-items-center"
      style={{ color: '#14161b' }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="overflow-visible">
        <path d="M19 6V20C19 21 18 22 17 22H7C6 22 5 21 5 20V6" />
        <path d="M10 11V17" />
        <path d="M14 11V17" />
        <g ref={tapa}>
          <path d="M3 6H21" />
          <path d="M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6" />
        </g>
      </svg>
    </button>
  )
}