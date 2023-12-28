import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { NextUIProvider } from '@nextui-org/react'
import './index.css'
import 'vite/modulepreload-polyfill'
import { MapProvider } from 'react-map-gl'
import QueryProvider from '../react-query/QueryProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <MapProvider>
        <QueryProvider>
            <App />
        </QueryProvider>
      </MapProvider>
    </NextUIProvider>
  </React.StrictMode>
)
