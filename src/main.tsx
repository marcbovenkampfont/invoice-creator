import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import App from './App.tsx'

const params = new URLSearchParams(window.location.search)
const redirect = params.get('redirect')

if (redirect) {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '')
  const normalizedRedirect = redirect.startsWith('/') ? redirect : `/${redirect}`
  window.history.replaceState(null, '', `${base}${normalizedRedirect}`)
}

createRoot(document.getElementById('root')!).render(  
  <StrictMode>
    <App />
  </StrictMode>,
)
