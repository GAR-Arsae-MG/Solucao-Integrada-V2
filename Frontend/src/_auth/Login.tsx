
import {useState} from 'react'
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";

import LogoSGP from '../assets/Arsae-MG-_-logo_med.png'
import openEye from '../assets/open-eye.svg'
import closedEye from '../assets/olhos-fechados.png'
import { Button, Card, CardBody, Image, Input, Spinner, Tab, Tabs} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { SignInValidation } from "../../validation/FormValidation";
import { useAuthContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import {useSignInAccount} from '../../react-query/QueriesAndMutations'

function Login() {
    const [show, setShow] = useState(false);
    const { checkAuthUser, isLoading: isUserLoading } = useAuthContext()

    const {mutateAsync: signInAccount} = useSignInAccount()

    const navigate = useNavigate()

    const toggleVisbility = () => setShow(!show)

    const form = useForm<z.infer<typeof SignInValidation>>({
      resolver: zodResolver(SignInValidation),
      defaultValues: {
        email: "",
        password: "",
      },
      shouldUseNativeValidation: false
    })

    async function onSubmit(values: z.infer<typeof SignInValidation>) {
      const session = await signInAccount({
        email: values.email,
        senha: values.password
      })

      if (!session) {
        return alert("Credenciais inválidas, por favor, tente novamente.")
      }

      const isLoggedIn = await checkAuthUser(values.email, values.password)

      if(isLoggedIn) {
        form.reset()

        navigate('/')
      } else {
        return alert("Credenciais inválidas, por favor, tente novamente.")
      }
    }



    return (
        <>
          <div>
            <Card className="w-[1200px] h-[800px] flex flex-col bg-slate-800" >
              <CardBody className="overflow-auto scrollbar-hide">
                <Tabs
                  fullWidth
                  size="md"
                  aria-label="Login"
                >
                  <Tab
                    key="login"
                    title="Login"
                  >
                    <section className="flex flex-col p-4 gap-4 items-center justify-center">
                      <div className="mb-5">
                        <Image src={LogoSGP} height={120} width={120} />
                      </div>

                      <h3 className="text-8xl gap-4 p-4 text-white font-bold">Bem-Vindo! Por Favor entre suas credenciais.</h3>

                      <form method="post" className="gap-4 p-4 w-full" onSubmit={form.handleSubmit(onSubmit)}>
                        
                        <Input
                          {...form.register('email', {required: true})}
                          label="E-mail"
                          placeholder="Digite seu e-mail"
                          required
                          className="p-10"
                        />
                        {form.formState.errors.email && <p>{form.formState.errors.email.message}</p>}

                        <Input
                           {...form.register('password', {required: true})}
                          type={show ? "text" : "password"}
                          label="Senha"
                          placeholder="Digite sua senha"
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
                        {form.formState.errors.password && <p>{form.formState.errors.password.message}</p>}

                        <Button type="submit" color="success" className="w-full" disabled={isUserLoading}>
                          {isUserLoading ? (
                            <div className="flex justify-center gap-2">
                              <Spinner size="md" color="secondary" />
                            </div>
                          ): 'Entrar'}
                        </Button>

                      </form>

                      <div className="flex justify-between p-4 gap-4 text-slate-50 hover:text-blue-400">
                        <Link to='/revalidar-senha'><p className="text-white hover:text-blue-400">Esqueceu sua senha?</p></Link>
                        <Link to='/registro'><p className="text-white hover:text-blue-400">Não é cadastrado?</p></Link>
                      </div>
                    </section>
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>

          </div>
        </>
      );

}

export default Login;
