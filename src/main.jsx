import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/figtree'
import '@fontsource/league-mono/400.css'
import '@fontsource/league-mono/500.css'
import './index.css'
import App from './App.jsx'
import { iniciarTema } from './tema'

iniciarTema()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)