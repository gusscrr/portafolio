import { useEffect, useRef, useState } from 'react'
import AcercaDe from './components/AcercaDe'
import BotonArriba from './components/BotonArriba'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Stack from './components/Stack'
import Timeline from './components/Timeline'
import { escucharIdioma, idiomaActual } from './idioma'
import { useRuta } from './ruta'

export default function App() {
  const ruta = useRuta()
  const primera = useRef(true)
  // Al cambiar el idioma se vuelve a dibujar toda la página con los textos nuevos
  const [idioma, setIdioma] = useState(idiomaActual())
  useEffect(() => escucharIdioma(setIdioma), [])

  // Al cambiar de página: arriba de todo, o directo a la sección pedida (ej. #proyectos)
  useEffect(() => {
    if (primera.current) {
      primera.current = false
      return
    }
    const id = window.location.hash.slice(1)
    const el = ruta === 'inicio' && id ? document.getElementById(id) : null
    if (el) el.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [ruta])

  return (
    <div key={idioma} className="relative isolate overflow-x-clip">
      <Navbar ruta={ruta} />
      <main key={ruta}>
        {ruta === 'acerca' ? (
          <AcercaDe />
        ) : (
          <>
            <Hero />
            <Timeline />
            <Projects />
            <Stack />
          </>
        )}
      </main>
      <Footer />
      <BotonArriba />
    </div>
  )
}