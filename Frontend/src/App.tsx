import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Login from './_auth/Login'
import { CadastroAtivo, CadastroUnidades, ListagemAtivos, ListagemUsuarios, Painel } from './_root/pages'
import CadastroUsuários from './_auth/CadastroUsuários'
import AuthLayout from './_auth/AuthLayout'
import { AuthProvider } from '../context/AuthContext'
import RevalidarSenha from './_auth/revalidarSenha'
import ListagemAtivosAdmin from './_root/pages/ListagemAtivosAdmin'
import RootLayout from './_root/RootLayout'
import About from './_root/pages/About'
import ListagemUnidades from './_root/pages/ListagemUnidades'

function App() {
  return (
    <>
    <BrowserRouter>
      <AuthProvider>
          <Routes>

            <Route element={<AuthLayout />}>
              <Route path='/login' Component={Login} />
              <Route path='/registro' Component={CadastroUsuários} />
              <Route path='/revalidar-senha' Component={RevalidarSenha}/>
            </Route>
            
            <Route element={<RootLayout />}>
              <Route path='/cadastroUnidades' Component={CadastroUnidades}/>
              <Route path='/cadastroAtivos' Component={CadastroAtivo} />
              <Route index Component={Painel} />
              <Route path='/listagemAtivos' Component={ListagemAtivos} />
              <Route path='/listagemUsuarios' Component={ListagemUsuarios} />
              <Route path='/listagemAtivosAdministrativos' Component={ListagemAtivosAdmin} />
              <Route path='/listagemUnidades' Component={ListagemUnidades} />
              <Route path='/SobreProjeto' Component={About} />
            </Route>
          </Routes>
      </AuthProvider>
    </BrowserRouter>
    </>
  )
}

export default App
