import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import setVh from './utils/setVh'

// initialize mobile vh CSS variable (tiny, safe fallback for mobile 100vh)
setVh();
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
