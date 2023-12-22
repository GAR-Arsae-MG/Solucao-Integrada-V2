import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Login from './_auth/Login'
import { CadastroAtivo, CadastroUnidades, ListagemAtivos, ListagemUsuarios, Painel } from './_root/pages'
import CadastroUsuários from './_auth/CadastroUsuários'
import AuthLayout from './_auth/AuthLayout'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>

        <Route element={<AuthLayout />}>
          <Route path='/login' Component={Login} />
          <Route path='/registro' Component={CadastroUsuários} />
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
