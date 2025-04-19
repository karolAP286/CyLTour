import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import HeaderComponent from './components/HeaderComponent.tsx'
import FooterComponent from './components/FooterComponent.tsx';
import LayoutGrid from './components/LayoutGrid.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeaderComponent/>
    <LayoutGrid/>
    <FooterComponent/>
  </StrictMode>,
)
