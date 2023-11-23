import './App.css'
import CadastroAtivo from './pages/CadastroAtivos'
import CadastroUnidades from './pages/CadastroUnidades'
import Home from './pages/Home'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Painel from './pages/Painel'
import ListagemAtivos from './pages/ListagemAtivos'
import ListagemUsuarios from './pages/ListagemUsuarios'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/cadastroUnidades' Component={CadastroUnidades}/>
        <Route path='/cadastroAtivos' Component={CadastroAtivo} />
        <Route path='/painel' Component={Painel} />
        <Route path='/listagemAtivos' Component={ListagemAtivos} />
        <Route path='/ListagemUsuarios' Component={ListagemUsuarios} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
