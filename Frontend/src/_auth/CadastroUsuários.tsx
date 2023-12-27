import { Card, CardBody, Input, Tab, Tabs } from '@nextui-org/react'
import { SignUpValidation } from '../../validation/FormValidation'
import { useState } from 'react'

const CadastroUsuários = () => {

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

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
          <Card className='w-[1200px] h-[800px] max-w-ful'>
            <CardBody className='overflow-auto scrollbar-hide'>
              <Tabs
                fullWidth
                size='md'
                aria-label='Cadastro'
              >
                <Tab
                  key='cadastro'
                  title='Cadastro de Usuário'
                  className='flex flex-row justify-between gap-4 p-4'
                >
                  <div className=' flex flex-col p-4 gap-4 items-center justify-center'>
                    <h1 className='font-bold w-full'>Sem Acesso? Sem problema!</h1>
                    <form>
                        <Input 
                          label='Nome'
                          placeholder='Digite seu nome'
                          onChange={handleName}
                          required
                        />

                        <Input 
                          label='E-mail'
                          placeholder='Digite seu e-mail'
                          onChange={handleEmail}
                          required
                        />

                        <Input 
                          label='Senha'
                          placeholder='Digite sua senha'
                          onChange={handlePassword}
                          required
                        />
                    </form>
                  </div>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
      </div>
    </>
  )
}

export default CadastroUsuários