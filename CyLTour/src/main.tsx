import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LayoutComponent from './components/LayoutComponent.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <LayoutComponent/> 
  </StrictMode>,
)
