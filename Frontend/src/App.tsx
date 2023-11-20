import './App.css'
import CadastroAtivo from './pages/CadastroAtivos'
import CadastroUnidades from './pages/CadastroUnidades'
import Home from './pages/Home'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/cadastroUnidades' Component={CadastroUnidades}/>
        <Route path='/cadastroAtivos' Component={CadastroAtivo} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
