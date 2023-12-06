import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { NextUIProvider } from '@nextui-org/react'
import './index.css'
import 'vite/modulepreload-polyfill'
import { MapProvider } from 'react-map-gl'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <MapProvider>
          <App />
      </MapProvider>
    </NextUIProvider>
  </React.StrictMode>,
)
