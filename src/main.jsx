import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Scroll3DProvider } from './assets/components/Scroll3DProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Scroll3DProvider>
  <App />
</Scroll3DProvider>

  </StrictMode>,
)
