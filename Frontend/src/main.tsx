import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { NextUIProvider } from '@nextui-org/react'
import './index.css'
// add the beginning of your app entry
import 'vite/modulepreload-polyfill'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
          <App />
    </NextUIProvider>
  </React.StrictMode>,
)
