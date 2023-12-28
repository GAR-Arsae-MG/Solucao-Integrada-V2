import { Card, CardBody, Input, Tab, Tabs, Image } from '@nextui-org/react'
import { SignUpValidation } from '../../validation/FormValidation'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import LogoSGP from '../assets/Arsae-MG-_-logo_med.png'
import openEye from '../assets/open-eye.svg'
import closedEye from '../assets/olhos-fechados.png'

const CadastroUsuários = () => {

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false);
  const toggleVisbility = () => setShow(!show)

  const handleEmail = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(event.target.value)
  }

  const handleName = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setName(event.target.value)
  }

  const handlePassword = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(event.target.value)
  }

  return (
    <>
      <div>
          <Card className='w-[1200px] h-[800px] flex flex-col bg-slate-800'>
            <CardBody className='overflow-auto scrollbar-hide'>
              <Tabs
                fullWidth
                size='md'
                aria-label='Cadastro'
              >
                <Tab
                  key='cadastro'
                  title='Cadastro de Usuário'
                >
                    <section className="flex flex-col p-4 gap-4 items-center justify-center">
                      <div className="mb-5">
                        <Image src={LogoSGP} height={120} width={120} />
                      </div>

                      <h3 className="text-8xl gap-4 p-4 text-white font-bold">Não é Cadastrado? Não se preocupe!</h3>

                      <form method="post" className="gap-4 p-4 w-full">

                        <Input
                          label="E-mail"
                          placeholder="Digite seu e-mail"
                          value={email}
                          onChange={handleEmail}
                          required
                          className="p-10"
                        />

                        <Input 
                          label="Nome"
                          placeholder="Digite seu nome"
                          value={name}
                          onChange={handleName}
                          required
                          className="p-10"
                        />

                        <Input 
                          type={show ? "text" : "password"}
                          label="Senha"
                          placeholder="Digite sua senha"
                          value={password}
                          onChange={handlePassword}
                          required
                          className="p-10"
                          endContent={
                            <button className="focus:outline-none " type="button" onClick={toggleVisbility} aria-label="Show password">
                              {show ? (
                                <Image src={openEye} className="text-2xl text-default-400 pointer-events-none" height={20} width={20} />
                              ): (
                                <Image src={closedEye} className="text-2xl text-default-400 pointer-events-none" height={20} width={20} />
                              )}
                            </button>
                          }
                        />
                      </form>

                      <div className="flex justify-between p-4 gap-4 text-slate-50 hover:text-blue-400">
                        <Link to='/login'><p className="text-white hover:text-blue-400">Já tem sua conta?</p></Link>
                      </div>
                    </section>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
      </div>
    </>
  )
}

export default CadastroUsuários