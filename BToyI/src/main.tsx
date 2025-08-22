import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import {Button} from '@/components/ui/button'
import './index.css'
import {Card} from '@/components/ui/card'
import AppHeader from './components/ui/AppHeader'
import AppTable from './components/ui/AppTable'
import { ProductTable } from './components/ui/ProductTable'
import Tabla from './components/ui/Tabla'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="p-10">
      <Card className="flex flex-col shadow-none p-5">
        <AppHeader />
        <AppTable/>
        <ProductTable/>
        <Tabla/>
      </Card>
    </div>
  </StrictMode>,
)
