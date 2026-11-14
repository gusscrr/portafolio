import { useState } from 'react'
import { t } from '../idioma'
import Certificaciones from './Certificaciones'
import { PalabrasEntrada, useTilt } from './Efectos'
import Reveal from './Reveal'

// Textos de la página en los dos idiomas
const presentacion = () =>
  t(
    [
      'Desde la Hackatón ProA 2024 no paré de crear proyectos.',
      'Soy desarrollador web, mobile e IoT. Estudio en la Escuela Experimental PROA de Alta Gracia. Gané la Hackatón con ClimApp, llegué a la final nacional de Samsung con FoodLoop y soy campeón nacional del Emprende U con PulsoFirme.',
      'Actualmente vivo en Córdoba Capital y hago webs, apps Android y prototipos con hardware que resuelven problemas reales, desde el diseño hasta el servidor.',
    ],
    [
      'Since the 2024 ProA Hackathon, I haven’t stopped building projects.',
      'I’m a web, mobile and IoT developer. I study at the PROA Experimental School in Alta Gracia. I won the Hackathon with ClimApp, reached the Samsung national final with FoodLoop and I’m a national Emprende U champion with PulsoFirme.',
      'I currently live in Córdoba, Argentina, and I build websites, Android apps and hardware prototypes that solve real problems, from design to server.',
    ],
  )

const sobreMi = () =>
  t(
    [
      'Desde muy chico siempre me llamó la atención la tecnología. No hay nada más lindo que haber aprendido de mi papá, entrar en este mundo y poder encarar mis propias metas y proyectos.',
      'Siempre me gustó entender cómo funcionan las cosas, así que fui experimentando mucho y aprendiendo en el camino.',
      'Me gusta superarme cada día y ponerme desafíos nuevos. Soy bastante perfeccionista y me cuesta dar algo por terminado si no quedó como me lo imaginé.',
      'Soy un chico simpático y me encanta trabajar en equipo y conocer gente nueva. Mi combinación favorita es un buen mate al lado mientras programo en Visual Studio Code por horas.',
      'Me encanta aprender y capacitarme todo el tiempo. Y fuera de la compu, entreno seguido porque me gusta mantenerme en forma.',
    ],
    [
      'Technology caught my attention ever since I was a kid. There’s nothing better than having learned from my dad, getting into this world and being able to chase my own goals and projects.',
      'I’ve always liked understanding how things work, so I experimented a lot and learned along the way.',
      'I like pushing myself every day and taking on new challenges. I’m quite a perfectionist, and I find it hard to call something finished if it didn’t turn out the way I imagined.',
      'I’m a friendly guy and I love working in a team and meeting new people. My favorite combo is a good mate by my side while I code in Visual Studio Code for hours.',
      'I love learning and training all the time. And away from the computer, I work out regularly because I like staying in shape.',
    ],
  )

// Foto redonda con aro celeste (el color del portafolio) y un brillo suave detrás
function Foto() {
  const tilt = useTilt(5)
  return (
    <div {...tilt} className="relative mx-auto w-[min(78vw,340px)] lg:mx-0 lg:w-[340px] xl:w-[440px]">
      {/* Brillo suave detrás, apenas visible (como el halo de una tarjeta) */}
      <div
        aria-hidden
        className="absolute -inset-[18%] -z-10 rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(56, 170, 190, 0.22), rgba(56, 170, 190, 0.08) 55%, transparent 100%)' }}
      />
      <div
        className="rounded-full p-[3px] shadow-[0_0_50px_-6px_rgba(56,170,190,0.35),0_30px_60px_-20px_rgba(0,0,0,0.6)]"
        style={{ background: 'linear-gradient(150deg, var(--acento), color-mix(in srgb, var(--acento) 20%, transparent) 55%, var(--acento))' }}
      >
        <div className="rounded-full p-2" style={{ background: 'var(--color-bg)' }}>
          <img
            src="/gustavo.webp"
            alt={t('Gustavo Carrasco con el guante de PulsoFirme', 'Gustavo Carrasco with the PulsoFirme glove')}
            width="800"
            height="800"
            className="aspect-square w-full rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

// Nubes grises del fondo (calcadas de la imagen de referencia, no se estiran)
function Nubes() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[max(25.6vw,200px)]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 520 1663 425" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="nube-atras" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" style={{ stopColor: 'var(--acerca-nube-1)' }} />
            <stop offset="1" style={{ stopColor: 'var(--acerca-nube-2)' }} />
          </linearGradient>
        </defs>
        <path fill="url(#nube-atras)" d="M0 769 L18 761 L21 761 L45 754 L72 750 L90 750 L93 749 L96 750 L99 749 L138 754 L159 761 L171 767 L189 780 L201 765 L222 746 L246 732 L255 728 L285 718 L294 716 L315 713 L345 713 L366 716 L387 722 L402 729 L417 739 L423 744 L438 760 L447 775 L453 788 L456 789 L468 783 L498 773 L513 770 L522 769 L558 769 L573 771 L609 782 L618 786 L636 798 L648 809 L654 817 L663 833 L678 825 L687 806 L693 796 L702 785 L714 775 L726 767 L738 761 L762 753 L789 751 L813 755 L831 763 L852 778 L855 778 L861 762 L870 743 L879 731 L888 722 L900 713 L918 704 L927 701 L954 696 L978 697 L1005 705 L1014 709 L1029 718 L1032 689 L1038 668 L1047 654 L1059 642 L1077 631 L1101 623 L1116 621 L1131 621 L1152 624 L1191 638 L1194 635 L1203 606 L1215 586 L1224 577 L1239 567 L1257 560 L1269 558 L1290 558 L1302 560 L1314 564 L1323 568 L1341 580 L1362 602 L1365 603 L1383 587 L1410 569 L1431 559 L1455 551 L1479 546 L1497 544 L1524 544 L1548 548 L1569 555 L1581 561 L1596 571 L1605 579 L1611 586 L1617 594 L1629 615 L1632 616 L1650 601 L1663 593 L1663 945 L0 945 Z" />
        <path style={{ fill: 'var(--color-bg)' }} d="M0 866 L33 855 L60 850 L78 848 L90 848 L93 847 L138 847 L141 848 L159 848 L162 849 L183 850 L258 860 L264 862 L279 864 L303 871 L306 871 L333 880 L342 884 L363 895 L381 908 L384 907 L405 890 L417 883 L441 872 L474 862 L492 859 L498 857 L510 856 L525 853 L555 850 L591 849 L594 848 L627 848 L630 849 L648 849 L651 850 L663 850 L681 852 L720 859 L738 865 L741 865 L744 867 L762 873 L783 884 L798 870 L816 857 L837 846 L870 835 L873 835 L882 832 L909 828 L921 828 L924 827 L963 827 L966 828 L978 828 L1014 832 L1020 834 L1038 837 L1068 847 L1077 851 L1095 862 L1113 877 L1119 884 L1128 883 L1134 879 L1152 871 L1194 858 L1224 853 L1242 851 L1254 851 L1257 850 L1317 850 L1320 851 L1332 851 L1359 854 L1404 863 L1428 871 L1431 873 L1440 875 L1455 857 L1470 843 L1497 826 L1527 815 L1551 810 L1569 809 L1572 808 L1617 808 L1663 813 L1663 945 L0 945 Z" />
      </svg>
    </div>
  )
}

// Fotos del carrusel "Sobre mí" (todas en el mismo formato 4:3) con su epígrafe
const fotos = [
  { src: '/sobre-mi/foto-01.webp', lugar: 'Emprende U', texto: 'Presentando PulsoFirme' },
  { src: '/sobre-mi/foto-02.webp', lugar: 'Laboratorio', texto: 'Con la impresora 3D' },
  { src: '/sobre-mi/foto-03.webp', lugar: 'PulsoFirme', texto: 'Programando el proyecto' },
  { src: '/sobre-mi/foto-04.webp', lugar: 'Emprende U', texto: '1° puesto nacional' },
  { src: '/sobre-mi/foto-05.webp', lugar: 'Concejo Deliberante', texto: 'Reconocimiento en Alta Gracia' },
  { src: '/sobre-mi/foto-06.webp', lugar: 'Concejo Deliberante', texto: 'Recibiendo el reconocimiento' },
  { src: '/sobre-mi/foto-07.webp', lugar: 'Emprende U', texto: 'Pasamos a la final' },
  { src: '/sobre-mi/foto-08.webp', lugar: 'Hacer para crecer', texto: 'Trabajando en el aula' },
  { src: '/sobre-mi/foto-09.webp', lugar: 'Emprende U', texto: 'Campeones nacionales' },
  { src: '/sobre-mi/foto-10.webp', lugar: 'Emprende U', texto: 'Presentación en el escenario' },
]

// Carrusel: la foto actual adelante con otras dos asomando atrás (como una pila de fotos),
// y abajo los puntos de progreso y el número. Cambia solo cada 5 segundos.
function Carrusel() {
  const [i, setI] = useState(0)
  const [pausa, setPausa] = useState(false)
  const ir = (j) => setI((j + fotos.length) % fotos.length)

  return (
    <div
      className="mx-auto w-full max-w-[560px] lg:mx-0 lg:w-[400px] xl:w-[520px]"
      onMouseEnter={() => setPausa(true)}
      onMouseLeave={() => setPausa(false)}
    >
      <div className="relative">
        {/* Fotos de atrás (la pila) */}
        <div aria-hidden className="absolute inset-0 translate-x-5 translate-y-4 rotate-[4deg] rounded-[24px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)] ring-1 ring-white/10" style={{ background: 'color-mix(in srgb, var(--color-surface), white 2%)' }} />
        <div aria-hidden className="absolute inset-0 translate-x-2.5 translate-y-2 rotate-[2deg] rounded-[24px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)] ring-1 ring-white/10" style={{ background: 'color-mix(in srgb, var(--color-surface), white 7%)' }} />

        {/* Foto actual */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-surface shadow-[0_30px_60px_-20px_rgba(0,0,0,0.65)] ring-1 ring-white/10">
          {fotos.map((f, j) => (
            <img
              key={f.src}
              src={f.src}
              alt={`${f.lugar}: ${f.texto}`}
              width="1200"
              height="900"
              loading={j === 0 ? 'eager' : 'lazy'}
              className="cert-slide absolute inset-0 h-full w-full object-cover"
              style={{ opacity: j === i ? 1 : 0, transform: j === i ? 'scale(1)' : 'scale(1.04)' }}
            />
          ))}
        </div>
      </div>

      {/* Puntos: el actual se estira y se va llenando; al terminar pasa a la siguiente */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {fotos.map((f, j) => {
            const activo = j === i
            return (
              <button
                key={f.src}
                type="button"
                onClick={() => ir(j)}
                aria-label={`${t('Ver foto', 'View photo')} ${j + 1}`}
                aria-current={activo}
                className="group/punto grid h-6 place-items-center"
              >
                <span
                  className="relative block h-2 overflow-hidden rounded-full transition-[width,background-color] duration-500 ease-[var(--ease-out)]"
                  style={{
                    width: activo ? 32 : 8,
                    background: activo ? 'color-mix(in srgb, var(--acento) 25%, transparent)' : 'rgba(127,127,127,0.35)',
                  }}
                >
                  {activo && (
                    <span
                      key={`${j}-${i}`}
                      onAnimationEnd={() => ir(i + 1)}
                      className="punto-relleno absolute inset-y-0 left-0 rounded-full"
                      style={{ background: 'var(--acento)', animationPlayState: pausa ? 'paused' : 'running' }}
                    />
                  )}
                </span>
              </button>
            )
          })}
        </div>
        {/* Número con flechitas a los costados */}
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={() => ir(i - 1)}
            aria-label={t('Foto anterior', 'Previous photo')}
            className="group/fl grid size-7 place-items-center rounded-full text-zinc-400 ring-1 ring-white/10 transition-[background-color,color,transform] duration-200 hover:bg-white/[0.08] hover:text-white active:scale-90"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="transition-transform duration-200 group-hover/fl:-translate-x-px">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <p className="w-[52px] text-center text-sm font-semibold tabular-nums text-zinc-400">
            <span className="text-white">{String(i + 1).padStart(2, '0')}</span> / {String(fotos.length).padStart(2, '0')}
          </p>
          <button
            type="button"
            onClick={() => ir(i + 1)}
            aria-label={t('Foto siguiente', 'Next photo')}
            className="group/fl grid size-7 place-items-center rounded-full text-zinc-400 ring-1 ring-white/10 transition-[background-color,color,transform] duration-200 hover:bg-white/[0.08] hover:text-white active:scale-90"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="transition-transform duration-200 group-hover/fl:translate-x-px">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// Página "Acerca de": presentación con foto y abajo las certificaciones
export default function AcercaDe() {
  return (
    <div id="acerca">
      {/* Inicio de la página: fondo liso oscuro con nubes abajo, como en la web de Josh */}
      <div
        className="relative isolate flex min-h-[max(min(56.8vw,100svh),640px)] flex-col justify-end overflow-hidden pt-32 pb-[max(8.6vw,64px)]"
        style={{ background: 'var(--acerca-cielo)' }}
      >
        <Nubes />
      {/* Presentación: texto ubicado y medido como en la web de Josh */}
      <section className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-14 px-5 pb-8 sm:px-10 lg:flex-row lg:justify-center lg:gap-14 lg:px-16 xl:gap-28">
        <div className="w-full max-w-[540px] lg:w-[440px] lg:shrink-0 xl:w-[540px]">
          <Reveal delay={60}>
            <h1 className="text-[44px] leading-[1.1] font-bold tracking-[-0.02em] text-white sm:text-[60px] sm:whitespace-nowrap">
              <PalabrasEntrada texto={t('¡Hola! Soy Gus', 'Hi! I’m Gus')} inicio={150} />
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-14 space-y-5 text-[18px] leading-[1.65] font-medium text-zinc-200 sm:text-[19px]">
              {presentacion().map((txt) => (
                <p key={txt}>{txt}</p>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={220}>
          <Foto />
        </Reveal>
      </section>
      </div>

      {/* Sobre mí: más texto a la izquierda y carrusel de fotos a la derecha */}
      <section className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-14 px-5 pt-20 pb-4 sm:px-10 sm:pt-28 sm:pb-6 lg:flex-row lg:justify-center lg:gap-14 lg:px-16 xl:gap-28">
        <div className="w-full max-w-[540px] lg:w-[440px] lg:shrink-0 xl:w-[540px]">
          <Reveal>
            <h2 className="text-[36px] leading-[1.1] font-bold tracking-[-0.02em] text-white sm:text-[44px]">
              {t('Un poco más sobre mí', 'A bit more about me')}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-10 space-y-5 text-[18px] leading-[1.65] font-medium text-zinc-200 sm:text-[19px]">
              {sobreMi().map((txt) => (
                <p key={txt}>{txt}</p>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={180} className="w-full lg:w-auto">
          <Carrusel />
        </Reveal>
      </section>

      <Certificaciones />
    </div>
  )
}