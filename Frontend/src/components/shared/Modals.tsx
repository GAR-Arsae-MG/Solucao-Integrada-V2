/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import { IGetAdminAtivo, IGetOpAtivo, IGetUnity, IGetUser, ModalAtivosAdminEditProps, ModalAtivosOpEditProps, ModalUnitiesEditProps, ModalUserEditProps } from "../../../types/types"
import { getAdminClasseAtivo, getAdminStatus, getAdminTipoAtivo, getFuncoes, getUnitSistemas, getUnitTipos, updateExternalAtivoAdmin, updateExternalUnity, updateExternalUser } from "../../../django/api"
import { useForm } from "react-hook-form"


const ModalUserEdit: React.FC<ModalUserEditProps> = ({isOpen, onOpenChange, usuario}) => {

    const [funcoes, setFuncoes] = useState([])
    const [selectedFuncao, setSelectedFuncao] = useState('')
    const {register, handleSubmit} = useForm<IGetUser>()

    const handleFuncoesChange = async (event: any) => {
        setSelectedFuncao(event.target.value)
    }

    useEffect(() => {
        const fetchFuncoes = async () => {
            const funcoes = await getFuncoes()
            setFuncoes(funcoes)
        }
        fetchFuncoes()
    }, [])

  return (
    <>
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            backdrop="blur"
        >
            
                <ModalContent className="sm:max-w-[600px] flex flex-col items-start">
                    {(onClose) => (
                        <> 
                            <form 
                                encType="multipart/form-data"
                                onSubmit={handleSubmit((formData: IGetUser) => {
                                    updateExternalUser(usuario!.id, formData)
                                    .then(() => {
                                        onClose()
                                    })
                                    .catch(error => {
                                        console.log(error)
                                    })
                                })}
                            >
                                <ModalHeader className="w-full gap-2 items-center justify-center">
                                    <h1 className="text-3xl text-center font-bold text-emerald-950">Editar Usuário</h1>
                                </ModalHeader>

                                <ModalBody>
                                    <div className="grid gap-4 py-4 text-center items-center justify-center">
                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <div className="grid items-center gap-4">
                                                <Input
                                                    {...register('nome')}
                                                    autoFocus
                                                    label='Nome'
                                                    placeholder="Escreva o nome"
                                                    variant="bordered"
                                                    defaultValue={usuario ? usuario.nome: ''}
                                                />
                                            </div>

                                            <div className="grid  items-center gap-4">
                                                <Input
                                                    {...register('email')}
                                                    label='Email'
                                                    placeholder="Escreva o email"
                                                    variant="bordered"
                                                    defaultValue={usuario ? usuario.email : ''}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <div className="grid items-center gap-4">
                                                <Select
                                                    {...register('funcao')}
                                                    label='Função'
                                                    onChange={handleFuncoesChange}
                                                    placeholder="Selecione a função"
                                                    defaultSelectedKeys={usuario!.funcao}
                                                >
                                                    {funcoes.map((funcao: string) => (
                                                        <SelectItem
                                                            key={funcao.charAt(0).toUpperCase()}
                                                            value={funcao.charAt(0).toUpperCase()}
                                                        >
                                                            {funcao}
                                                        </SelectItem>
                                                    ))}
                                                </Select>
                                                <p className="text-default-400 text-sm">Função selecionada: {selectedFuncao}</p>
                                            </div>

                                            <div className="grid items-center gap-4">
                                                <Input
                                                    {...register('criado_por')} 
                                                    label='Criado por'
                                                    placeholder="Escreva por quem este Usuário foi criado"
                                                    variant="bordered"
                                                    defaultValue={usuario ? usuario.criado_por : ''}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <div className="grid items-center gap-4">

                                                <Input
                                                    {...register('agencia')} 
                                                    label='Agência'
                                                    placeholder="Escreva a agência"
                                                    variant="bordered"
                                                    defaultValue={usuario ? usuario.agencia : ''}
                                                />
                                            </div>
                                        </div>

                                        <div className="items-center text-center gap-4">
                                            <div className="items-center gap-4">
                                                <p>Modifique a Imagem</p>
                                            </div>
                                        </div>
                                    </div>
                                </ModalBody>

                                <ModalFooter className="w-full gap-4 p-4 items-center justify-center text-center">
                                    <div className="flex flex-1 justify-between w-full p-4 gap-4">
                                        <Button
                                            color="success"
                                            type="submit"
                                        >
                                            Salvar
                                        </Button>

                                        <Button
                                            onPress={onClose}
                                            color="danger"
                                        >
                                            Cancelar
                                        </Button>
                                    </div>
                                </ModalFooter>
                            </form>       
                        </>
                    )}
                </ModalContent>
        </Modal>

    </>
  )
}

export default ModalUserEdit

export const ModalUnitiesEdit: React.FC<ModalUnitiesEditProps> = ({isOpen, onOpenChange, unidade}) => {
    const { register, handleSubmit } = useForm<IGetUnity>()

    const [sistemas, setSistemas] = useState([])
    const [selectedSistema, setSelectedSistema] = useState('')

    const [tipo, setTipo] = useState([])
    const [selectedTipo, setSelectedTipo] = useState('')

    useEffect(() => {

        const fetchUnitySistema = async () => {
          const unitySistema = await getUnitSistemas()
          setSistemas(unitySistema)
        }
        fetchUnitySistema()
    
        const fetchUnityTipo = async () => {
          const unityTipo = await getUnitTipos()
          setTipo(unityTipo)
        }
        fetchUnityTipo()
    }, [])

    const handleSistemasChange = async (event: any) => {
    setSelectedSistema(event.target.value)
    }

    const handleTipoChange = (event: any) => {
    setSelectedTipo(event.target.value)
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                backdrop="blur"
            >
                <ModalContent className="sm:max-w-[600px] flex flex-col items-start">
                    {(onClose) => (
                        <>
                            <form 
                                encType="multipart/form-data"
                                onSubmit={handleSubmit((formData: IGetUnity) => {
                                    updateExternalUnity(unidade!.id, formData)
                                    .then(() => {
                                        onClose
                                    })
                                    .catch(error => {
                                        console.log(error)
                                    })
                                })}
                            >
                                <ModalHeader className="w-full gap-2 items-center justify-center">
                                    <h1 className="text-3xl text-center text-teal-900 font-bold">Editar Unidade</h1>
                                </ModalHeader>

                                <ModalBody>
                                    <div className="grid gap-4 py-4 text-center items-center justify-center">
                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <div className="grid items-center gap-4">
                                                <Input 
                                                    {...register("nome")}
                                                    autoFocus
                                                    label="Nome"
                                                    placeholder="Escreva o nome da Unidade"
                                                    variant="bordered"
                                                    defaultValue={unidade ? unidade.nome : ''}
                                                />
                                            </div>

                                            <div className="grid items-center gap-4">
                                                <Select
                                                    {...register("sistemas")}
                                                    label='Sistema'
                                                    onChange={handleSistemasChange}
                                                    placeholder="Selecione o sistema"
                                                    defaultSelectedKeys={unidade!.sistemas}
                                                >
                                                    {sistemas.map((sistema: string) => (
                                                        <SelectItem
                                                            key={sistema.charAt(0).toUpperCase()}
                                                            value={sistema.charAt(0).toUpperCase()}
                                                        >
                                                            {sistema}
                                                        </SelectItem>
                                                    ))}
                                                </Select>
                                                <p className="text-sm text-default-400">Sistema selecionado: {selectedSistema}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <div className="grid items-center gap-4">
                                                <Select
                                                    {...register("tipo")}
                                                    label='Tipo'
                                                    onChange={handleTipoChange}
                                                    placeholder="Selecione o tipo"
                                                    defaultSelectedKeys={unidade!.tipo}
                                                >
                                                    {tipo.map((tipo: string) => (
                                                        <SelectItem
                                                            key={tipo.charAt(0).toUpperCase()}
                                                            value={tipo.charAt(0).toUpperCase()}
                                                        >
                                                            {tipo}
                                                        </SelectItem>
                                                    ))}
                                                </Select>
                                                <p className="text-sm text-default-400">Tipo selecionado: {selectedTipo}</p>
                                            </div>

                                            <div className="grid items-center gap-4">
                                                <Input
                                                    {...register("latitude")} 
                                                    label="Latitude"
                                                    placeholder="Escreva a latitude"
                                                    type="number"
                                                    variant="bordered"
                                                    defaultValue={unidade ? unidade.latitude.toString() : ''}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <div className="grid items-center gap-4">
                                                <Input
                                                    {...register("longitude")} 
                                                    label="Longitude"
                                                    placeholder="Escreva a longitude"
                                                    type="number"
                                                    variant="bordered"
                                                    defaultValue={unidade ? unidade.longitude.toString() : ''}
                                                />
                                            </div>

                                            <div className="grid items-center gap-4">
                                                <Input 
                                                    {...register("Município")}
                                                    label="Município"
                                                    placeholder="Escreva o município"
                                                    type="text"
                                                    variant="bordered"
                                                    defaultValue={unidade ? unidade.Município : ''}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <div className="grid items-center gap-4">
                                                <Input 
                                                    {...register("localidade")}
                                                    label="Localidade"
                                                    placeholder="Escreva a localidade"
                                                    variant="bordered"
                                                    defaultValue={unidade ? unidade.localidade : ''} 
                                                />
                                            </div>

                                            <div className="grid items-center gap-4">
                                                <Input 
                                                    {...register("Endereco")}
                                                    label="Endereço"
                                                    placeholder="Escreva o endereço"
                                                    variant="bordered"
                                                    defaultValue={unidade ? unidade.Endereco : ''}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </ModalBody>

                                <ModalFooter className="w-full gap-4 p-4 items-center justify-center text-center">
                                    <div className="flex flex-1 justify-between w-full p-4 gap-4">
                                        <Button
                                            color="success"
                                            type="submit"
                                        >
                                            Salvar
                                        </Button>

                                        <Button
                                            color="danger"
                                            onClick={onClose}
                                        >
                                            Cancelar
                                        </Button>
                                    </div>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export const ModalAtivosAdminEdit: React.FC<ModalAtivosAdminEditProps> = ({isOpen, onOpenChange, ativo}) => {
    const { register, handleSubmit } = useForm<IGetAdminAtivo>()

    const [tipoAtivoAdmin, setTipoAtivoAdmin] = useState([])
    const [selectedTipoAtivoAdmin, setSelectedTipoAtivoAdmin] = useState('')

    const [classeAtivoAdmin, setClasseAtivoAdmin] = useState([])
    const [selectedClasseAtivoAdmin, setSelectedClasseAtivoAdmin] = useState('')

    const [statusAtivoAdmin, setStatusAtivoAdmin] = useState([])
    const [selectedStatusAtivoAdmin, setSelectedStatusAtivoAdmin] = useState('')

    useEffect(() => {
        const fetchAdminStatus = async () => {
          const adminStatus = await getAdminStatus()
          setStatusAtivoAdmin(adminStatus)
        }
        fetchAdminStatus()
    
        const fetchAdminClasseAtivo = async () => {
          const adminClasseAtivo = await getAdminClasseAtivo()
          setClasseAtivoAdmin(adminClasseAtivo)
        }
        fetchAdminClasseAtivo()
    
        const fetchAdminTipoAtivo = async () => {
          const adminTipoAtivo = await getAdminTipoAtivo()
          setTipoAtivoAdmin(adminTipoAtivo)
        }
        fetchAdminTipoAtivo()
    }, [])

    const handleAdminStatusChange = async (event: any) => {
        setSelectedStatusAtivoAdmin(event.target.value)
    }
    
    const handleAdminClasseChange = async (event: any) => {
        setSelectedClasseAtivoAdmin(event.target.value)
    }
    
    const handleAdminTipoChange = async (event: any) => {
        setSelectedTipoAtivoAdmin(event.target.value)
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                backdrop="blur"
            >
                <ModalContent className="sm:max-w-[600px] flex flex-col items-start">
                    {(onClose) => (
                        <>
                            <form 
                                encType="multipart/form-data"
                                onSubmit={handleSubmit((formData: IGetAdminAtivo) => {
                                    updateExternalAtivoAdmin()
                                })}
                            >

                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export const ModalAtivosOpEdit: React.FC<ModalAtivosOpEditProps> = ({isOpen, onOpenChange, ativo}) => {
    const { register, handleSubmit } = useForm<IGetOpAtivo>()


}