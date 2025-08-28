import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import {Button} from '@/components/ui/button'
import './index.css'
import {Card} from '@/components/ui/card'
import AppHeader from './BToyParts/AppHeader'
import AppTable from './BToyParts/AppTable'
import Section from  './BToyParts/Section'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="p-10">
      <Card className="flex flex-col shadow-none p-5">
        <AppHeader />
        <AppTable/>
      </Card>
      <Card className="flex flex-col shadow-none p-5">
        <Section />
      </Card>
    </div>
  </StrictMode>,
)
