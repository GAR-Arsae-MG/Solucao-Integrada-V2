import './App.css'
import CadastroAtivo from './pages/CadastroAtivosn2'
import Home from './pages/Home'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/cadastroAtivos' Component={CadastroAtivo} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
