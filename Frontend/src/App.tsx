import './App.css'
import CadastroAtivos from './pages/CadastroAtivos'
import Home from './pages/Home'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/cadastroAtivos' Component={CadastroAtivos} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
