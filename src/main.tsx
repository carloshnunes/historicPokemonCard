import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CollectionProvider } from './contexts/CollectionContext'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CollectionProvider>
        <App />
      </CollectionProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
