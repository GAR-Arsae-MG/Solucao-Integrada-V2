import { Button, Card, CardBody, Image, Input, Spinner, Tab, Tabs } from "@nextui-org/react"
import openEye from '../assets/open-eye.svg'
import closedEye from '../assets/olhos-fechados.png'
import LogoSGP from '../assets/Arsae-MG-_-logo_med.png'
import { useState } from "react"
import { useAuthContext } from "../../context/AuthContext"
import { useRevalidatePassword } from "../../react-query/QueriesAndMutations"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { RevalidatePasswordValidation } from "../../validation/FormValidation"
import { zodResolver } from "@hookform/resolvers/zod"

const RevalidarSenha = () => {
    const [show, setShow] = useState(false)
    const { checkAuthUser, isLoading: isUserLoading } = useAuthContext()

    const {mutateAsync: revalidatePassword } = useRevalidatePassword()

    const navigate = useNavigate()

    const toggleVisibility = () => setShow(!show)

    const form = useForm<z.infer<typeof RevalidatePasswordValidation>>({
        resolver: zodResolver(RevalidatePasswordValidation),
        defaultValues: {
            email: '',
            password: '',
        },
        shouldUseNativeValidation: false
    })

    async function onSubmit(values: z.infer<typeof RevalidatePasswordValidation>) {
        const session = await revalidatePassword({
            email: values.email,
            senha: values.password
        })

        if (!session) {
            return alert("Credenciais inválidas, por favor, tente novamente.")
        }

        const isLoggedIn = await checkAuthUser(values.email, values.password)

        if(isLoggedIn) {
            form.reset()

            navigate('/login')
        } else {
            return alert("Credenciais inválidas, por favor, tente novamente.")
        }
    }


  return (
    <>
        <div className="w-full h-full lg:w-96">
            <Card className="h-full flex flex-col bg-slate-800">
                <CardBody className="overflow-auto scrollbar-hide">
                    <Tabs
                        fullWidth
                        size="md"
                        aria-label="revalidar senha"
                    >
                        <Tab
                            key="revalidar-senha"
                            title="Revalidar Senha"
                        >
                            <section className="flex flex-col p-4 gap-4 items-center justify-center">
                                <div className="mb-5">
                                    <Image src={LogoSGP} height={120} width={120} />
                                </div>

                                <h3 className="text-8xl gap-4 p-4 text-white font-bold">Vamos te ajudar com seu problema! </h3>

                                <form method="post" className="gap-4 p-4 w-full" onSubmit={form.handleSubmit(onSubmit)}>
                                    <Input 
                                        {...form.register('email', {required: true})}
                                        label="E-mail"
                                        placeholder="Digite seu E-mail"
                                        required
                                        type="email"
                                        className="p-10"
                                    />
                                    {form.formState.errors.email && <p>{form.formState.errors.email.message}</p>}

                                    <Input 
                                        {...form.register('password', {required: true})}
                                        label="Senha"
                                        placeholder="Digite sua Senha"
                                        required
                                        type={show ? 'text' : 'password'}
                                        className="p-10"
                                        endContent={
                                            <button className="focus:outline-none " type="button" onClick={toggleVisibility} aria-label="Show password">
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
                                    <Link to='/login'><p className="text-white hover:text-blue-400">Já sabe sua senha?</p></Link>
                                    <Link to='/registro'><p className="text-white hover:text-blue-400">Não é cadastrado?</p></Link>
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

export default RevalidarSenha