import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Tabla from './Tabla.tsx'
import Search from './Search.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Search />
    <Tabla />
  </StrictMode>,
)
