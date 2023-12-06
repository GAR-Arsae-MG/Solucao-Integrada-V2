import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Login from './_auth/Login'
import { CadastroAtivo, CadastroUnidades, ListagemAtivos, ListagemUsuarios, Painel } from './_root/pages'
import elementMap from './components/ui/elementMap'

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
          <Route path='/Mapa' Component={elementMap} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
