import './App.css'
import CadastroAtivo from './_root/pages/CadastroAtivos'
import CadastroUnidades from './_root/pages/CadastroUnidades'
import Home from './_root/pages/Home'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Painel from './_root/pages/Painel'
import ListagemAtivos from './_root/pages/ListagemAtivos'
import ListagemUsuarios from './_root/pages/ListagemUsuarios'
import Login from './_auth/Login'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>

        <Route>
          <Route path='/login' Component={Login} />
        </Route>
        
        <Route>
          <Route path='/cadastroUnidades' Component={CadastroUnidades}/>
          <Route path='/cadastroAtivos' Component={CadastroAtivo} />
          <Route index Component={Painel} />
          <Route path='/listagemAtivos' Component={ListagemAtivos} />
          <Route path='/ListagemUsuarios' Component={ListagemUsuarios} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
