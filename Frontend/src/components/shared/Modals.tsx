/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import { IGetAdminAtivo, IGetOpAtivo, IGetUnity, IGetUser, ModalAtivosAdminEditProps, ModalAtivosOpEditProps, ModalUnitiesEditProps, ModalUserEditProps } from "../../../types/types"
import { getAdminClasseAtivo, getAdminStatus, getAdminTipoAtivo, getFuncoes, getOpEtapaServico, getOpStatus, getOpTipoAtivo, getOpTipoInvestimento, getUnitSistemas, getUnitTipos, updateExternalAtivoAdmin, updateExternalAtivoOp, updateExternalUnity, updateExternalUser } from "../../../django/api"
import { useForm } from "react-hook-form"
import CheckboxDonation from "../ui/Checkbox"


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
                                        onClose()
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
                                    updateExternalAtivoAdmin(ativo!.id, formData)
                                    .then(() => {
                                        onClose()
                                    })
                                    .catch(error => {
                                        console.log(error)
                                    })
                                })}
                            >
                                <ModalHeader className="w-full gap-2 items-center justify-center">
                                    <h1 className="text-3xl text-center text-teal-900 font-bold">Editar Ativos Administrativos</h1>
                                </ModalHeader>

                                <ModalBody>
                                    <div className="grid gap-4 py-4 text-center items-center justify-center">
                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <div className="grid items-center gap-4">
                                                <Input 
                                                    {...register("nome_ativo")}
                                                    label="Nome do ativo"
                                                    placeholder="Escreva o nome do ativo"
                                                    variant="bordered"
                                                    defaultValue={ativo ? ativo.nome_ativo : ''}
                                                />
                                            </div>

                                            <div className="grid items-center gap-4">
                                                <Select
                                                    {...register("tipo_ativo")}
                                                    label="Tipo de ativo"
                                                    placeholder="Selecione o tipo de ativo"
                                                    onChange={handleAdminTipoChange}
                                                    defaultSelectedKeys={ativo ? ativo.tipo_ativo : ''}
                                                >
                                                    {tipoAtivoAdmin.map((tipoAtivo: string) => (
                                                        <SelectItem
                                                            key={tipoAtivo.charAt(0).toUpperCase()}
                                                            value={tipoAtivo.charAt(0).toUpperCase()}
                                                        >
                                                            {tipoAtivo}
                                                        </SelectItem>
                                                    ))}
                                                </Select>
                                                <p className="text-sm text-default-400">Tipo de ativo selecionado: {selectedTipoAtivoAdmin}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <div className="grid items-center gap-4">
                                                <Input 
                                                    {...register("código_ativo")}
                                                    label="Código do ativo"
                                                    placeholder="Escreva o código do ativo"
                                                    variant="bordered"
                                                    defaultValue={ativo ? ativo.código_ativo : ''}
                                                />
                                            </div>

                                            <div className="grid items-center gap-4">
                                                <Select
                                                    {...register("classe_ativo")}
                                                    label="Classe do ativo"
                                                    placeholder="Selecione a classe do ativo"
                                                    onChange={handleAdminClasseChange}
                                                    defaultSelectedKeys={ativo ? ativo.classe_ativo : ''}
                                                >
                                                    {classeAtivoAdmin.map((classeAtivo: string) => (
                                                        <SelectItem
                                                            key={classeAtivo.charAt(0).toUpperCase()}
                                                            value={classeAtivo.charAt(0).toUpperCase()}
                                                        >
                                                            {classeAtivo}
                                                        </SelectItem>
                                                    ))}
                                                </Select>
                                                <p className="text-sm text-default-400">Classe de ativo selecionado: {selectedClasseAtivoAdmin}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <div className="grid items-center gap-4">
                                                <Input
                                                    {...register("proprietario")}
                                                    label="Proprietario"
                                                    placeholder="Escreva o proprietario"
                                                    variant="bordered"
                                                    defaultValue={ativo ? ativo.proprietario : ''}
                                                /> 
                                            </div>

                                            <div className="grid items-center gap-4">
                                                <p>Doação?</p>

                                                <CheckboxDonation 
                                                    {...register("doacao")}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <div className="grid items-center gap-4">
                                                <Input 
                                                    {...register("valor_original")}
                                                    label="Valor original"
                                                    placeholder="Escreva o valor original"
                                                    variant="bordered"
                                                    type="number"
                                                    defaultValue={ativo ? ativo.valor_original.toString() : ''}
                                                />
                                            </div>

                                            <div className="grid items-center gap-4">
                                                <Input 
                                                    {...register("valor_atual")}
                                                    label="Valor atual"
                                                    placeholder="Escreva o valor atual"
                                                    variant="bordered"
                                                    type="number"
                                                    defaultValue={ativo ? ativo.valor_atual.toString() : ''}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <div className="grid items-center gap-4">
                                                <Select
                                                    {...register("status")}
                                                    label="Status do ativo"
                                                    placeholder="Selecione o status do ativo"
                                                    onChange={handleAdminStatusChange}
                                                    defaultSelectedKeys={ativo ? ativo.status : ''}
                                                >
                                                    {statusAtivoAdmin.map((statusAtivo: string) => (
                                                        <SelectItem
                                                            key={statusAtivo.charAt(0).toUpperCase()}
                                                            value={statusAtivo.charAt(0).toUpperCase()}
                                                        >
                                                            {statusAtivo}
                                                        </SelectItem>
                                                    ))}
                                                </Select>
                                                <p>Status selecionado: {selectedStatusAtivoAdmin}</p>
                                            </div>

                                            <div className="grid items-center gap-4">
                                                <Input 
                                                    {...register("data_insercao")}
                                                    label="Data de inserção"
                                                    placeholder="Escreva a data de inserção"
                                                    variant="bordered"
                                                    type="date"
                                                    defaultValue={ativo ? ativo.data_insercao.toString() : ''}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <div className="grid items-center gap-4">
                                                <Input 
                                                    {...register("previsao_substituicao")}
                                                    label="Previsão de substituição"
                                                    placeholder="Escreva a previsão de substituição"
                                                    variant="bordered"
                                                    type="date"
                                                    defaultValue={ativo ? ativo.previsao_substituicao.toString() : ''}
                                                />
                                            </div>

                                            <div className="grid items-center gap-4">
                                                <Input 
                                                    {...register("criado_por")}
                                                    label="Criado por"
                                                    placeholder="Escreva por quem o ativo foi criado"
                                                    variant="bordered"
                                                    defaultValue={ativo ? ativo.criado_por : ''}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <div className="grid items-center gap-4">
                                                <Input 
                                                    {...register("adquirido_por")}
                                                    label="Adquirido por"
                                                    placeholder="Escreva por quem o ativo foi adquirido"
                                                    variant="bordered"
                                                    defaultValue={ativo ? ativo.adquirido_por : ''}
                                                />
                                            </div>

                                            <div className="grid items-center gap-4">
                                                <Input 
                                                    {...register("unidade")}
                                                    label="Unidade"
                                                    placeholder="Escreva a unidade"
                                                    variant="bordered"
                                                    defaultValue={ativo ? ativo.unidade : ''}
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

export const ModalAtivosOpEdit: React.FC<ModalAtivosOpEditProps> = ({isOpen, onOpenChange, ativo}) => {
    const { register, handleSubmit } = useForm<IGetOpAtivo>()

    const [tipoAtivoOp, setTipoAtivoOp] = useState([])
    const [selectedTipoAtivoOp, setSelectedTipoAtivoOp] = useState('')

    const [tipoInvestimentoOp, setTipoInvestimentoOp] = useState([])
    const [selectedTipoInvestimentoOp, setSelectedTipoInvestimentoOp] = useState('')

    const [statusOp, setStatusOp] = useState([])
    const [selectedStatusOp, setSelectedStatusOp] = useState('')

    const [etapaServicoOp, setEtapaServicoOp] = useState([])
    const [selectedEtapaServicoOp, setSelectedEtapaServicoOp] = useState('')

    useEffect(() => {
        const fetchOpStatus = async () => {
            const opStatus = await getOpStatus()
            setStatusOp(opStatus)
        }
        fetchOpStatus()

        const fetchOpEtapaServico = async () => {
            const opEtapaServico = await getOpEtapaServico()
            setEtapaServicoOp(opEtapaServico)
        }
        fetchOpEtapaServico()

        const fetchOpTipoAtivo = async () => {
            const opTipoAtivo = await getOpTipoAtivo()
            setTipoAtivoOp(opTipoAtivo)
        }
        fetchOpTipoAtivo()

        const fetchOpTipoInvestimento = async () => {
            const opTipoInvestimento = await getOpTipoInvestimento()
            setTipoInvestimentoOp(opTipoInvestimento)
        }
        fetchOpTipoInvestimento()
    }, [])

    const handleOpStatusChange = async (event: any) => {
        setSelectedStatusOp(event.target.value)
    }

    const handleOpEtapaServicoChange = async (event: any) => {
        setSelectedEtapaServicoOp(event.target.value)
    }

    const handleOpTipoAtivoChange = async (event: any) => {
        setSelectedTipoAtivoOp(event.target.value)
    }

    const handleOpTipoInvestimentoChange = async (event: any) => {
        setSelectedTipoInvestimentoOp(event.target.value)
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                backdrop="blur"
            >
                <ModalContent
                    className="flex flex-col items-start overflow-scroll sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1200px]"
                >
                    {(onClose) => (
                        <>
                            <form
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4" 
                                encType="multipart/form-data"
                                onSubmit={handleSubmit((formData: IGetOpAtivo) => {
                                    updateExternalAtivoOp(ativo!.id, formData)
                                    .then(() => {
                                        onClose()
                                    })
                                    .catch(error => {
                                        console.log(error)
                                    })
                                })}
                            >
                                <ModalHeader
                                    className="w-full gap-2 items-center justify-center"
                                >
                                    <h1 className="text-3xl text-center text-teal-900 font-bold">Editar Ativos Operacionais</h1>
                                </ModalHeader>

                                <ModalBody
                                    className="w-full gap-2"
                                >
                                    <div className="w-full flex flex-1 flex-col items-center justify-around p-4 gap-4">
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <div className="grid gap-4 py-4 text-center items-center justify-center">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                                                    <div className="grid items-center gap-4">
                                                        <Input 
                                                            {...register("nome_de_campo")}
                                                            label="Nome do Ativo"
                                                            placeholder="Escreva o nome do Ativo"
                                                            variant="bordered"
                                                            defaultValue={ativo ? ativo.nome_de_campo : ''}
                                                        />
                                                    </div>

                                                    <div className="grid items-center gap-4">
                                                        <Select
                                                            {...register("tipo_ativo")}
                                                            label="Tipo de Ativo"
                                                            placeholder="Selecione o Tipo de Ativo"
                                                            onChange={handleOpTipoAtivoChange}
                                                            defaultSelectedKeys={ativo ? ativo.tipo_ativo : ''}
                                                        >
                                                            {tipoAtivoOp.map((tipoAtivoOp: string) => (
                                                                <SelectItem
                                                                    key={tipoAtivoOp.charAt(0).toUpperCase()}
                                                                    value={tipoAtivoOp.charAt(0).toUpperCase()}
                                                                >
                                                                    {tipoAtivoOp}
                                                                </SelectItem>
                                                            ))}
                                                        </Select>

                                                        <p className="text-sm text-default-400">Tipo de ativo selecionado: {selectedTipoAtivoOp}</p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                                                    <div className="grid items-center gap-4">
                                                        <Input 
                                                            {...register("classe")}
                                                            label="Classe"
                                                            placeholder="Escreva a Classe do ativo"
                                                            variant="bordered"
                                                            defaultValue={ativo ? ativo.classe : ''}
                                                        />
                                                    </div>

                                                    <div className="grid items-center gap-4">
                                                        <Input 
                                                            {...register("fase")}
                                                            label="Fase"
                                                            placeholder="Escreva a Fase do ativo"
                                                            variant="bordered"
                                                            defaultValue={ativo ? ativo.fase : ''}
                                                        /> 
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                                                    <div className="grid items-center gap-4">
                                                        <Select
                                                            {...register("tipo_investimento")}
                                                            label="Tipo de Investimento"
                                                            placeholder="Selecione o Tipo de Investimento"
                                                            onChange={handleOpTipoInvestimentoChange}
                                                            defaultSelectedKeys={ativo ? ativo.tipo_investimento : ''}
                                                        >
                                                            {tipoInvestimentoOp.map((tipoInvestimentoOp: string) => (
                                                                <SelectItem
                                                                    key={tipoInvestimentoOp.charAt(0).toUpperCase()}
                                                                    value={tipoInvestimentoOp.charAt(0).toUpperCase()}
                                                                >
                                                                    {tipoInvestimentoOp}
                                                                </SelectItem>
                                                            ))}
                                                        </Select>

                                                        <p className="text-sm text-default-400">Tipo de investimento selecionado: {selectedTipoInvestimentoOp}</p>
                                                    </div>

                                                    <div className="grid items-center gap-4">
                                                        <Select
                                                            {...register("etapa_do_servico")}
                                                            label="Etapa do Serviço"
                                                            placeholder="Selecione a Etapa do Serviço"
                                                            onChange={handleOpEtapaServicoChange}
                                                            defaultSelectedKeys={ativo ? ativo.etapa_do_servico : ''}
                                                        >
                                                            {etapaServicoOp.map((etapasServicoOp: string) => (
                                                                <SelectItem
                                                                    key={etapasServicoOp.charAt(0).toUpperCase()}
                                                                    value={etapasServicoOp.charAt(0).toUpperCase()}
                                                                >
                                                                    {etapasServicoOp}
                                                                </SelectItem>
                                                            ))}
                                                        </Select>

                                                        <p className="text-sm text-default-400">Etapa do Serviço selecionado: {selectedEtapaServicoOp}</p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                                                    <div className="grid items-center gap-4">
                                                        <Input 
                                                            {...register("situacao_atual")}
                                                            label="Situação Atual"
                                                            placeholder="Escreva a Situação Atual"
                                                            variant="bordered"
                                                            defaultValue={ativo ? ativo.situacao_atual : ''}
                                                        />
                                                    </div>

                                                    <div className="grid items-center gap-4">
                                                        <Input 
                                                            {...register("proprietario")}
                                                            label="Proprietário"
                                                            placeholder="Escreva o Proprietário"
                                                            variant="bordered"
                                                            defaultValue={ativo ? ativo.proprietario : ''}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                                                    <div className="grid items-center gap-4">
                                                        <p>Doação?</p>

                                                        <CheckboxDonation 
                                                            {...register("doacao")}
                                                        />
                                                    </div>

                                                    <div className="grid items-center gap-4">
                                                        <Input 
                                                            {...register("valor_original")}
                                                            label="Valor Original"
                                                            placeholder="Escreva o Valor Original"
                                                            variant="bordered"
                                                            type="number"
                                                            defaultValue={ativo ? ativo.valor_original.toString() : ''}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                                                    <div className="grid items-center gap-4">
                                                        <Input 
                                                            {...register("vida_util_reg_anos")}
                                                            label="Vida Útil (Anos)"
                                                            placeholder="Escreva a Vida Útil (Anos)"
                                                            variant="bordered"
                                                            type="number"
                                                            defaultValue={ativo ? ativo.vida_util_reg_anos.toString() : ''}
                                                        />
                                                    </div>

                                                    <div className="grid items-center gap-4">
                                                        <Input 
                                                            {...register("vida_util_reg_meses")}
                                                            label="Vida Útil (Meses)"
                                                            placeholder="Escreva a Vida Útil (Meses)"
                                                            variant="bordered"
                                                            type="number"
                                                            defaultValue={ativo ? ativo.vida_util_reg_meses.toString() : ''}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                                                    <div className="grid items-center gap-4">
                                                        <Input 
                                                            {...register("unidade")}
                                                            label="Unidade"
                                                            placeholder="Escreva a unidade"
                                                            variant="bordered"
                                                            defaultValue={ativo ? ativo.unidade : ''}
                                                        />
                                                    </div>

                                                    <div className="grid items-center gap-4">
                                                        <Input 
                                                            {...register("data_insercao")}
                                                            label="Data de Inserção"
                                                            placeholder="Escreva a Data de Inserção"
                                                            variant="bordered"
                                                            type="date"
                                                            defaultValue={ativo ? ativo.data_insercao.toString() : ''}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                                                    <div className="grid items-center gap-4">
                                                        <Input 
                                                            {...register("data_obra")}
                                                            label="Data de Inserção"
                                                            placeholder="Escreva a Data de Inserção"
                                                            variant="bordered"
                                                            type="date"
                                                            defaultValue={ativo ? ativo.data_obra.toString() : ''}
                                                        />
                                                    </div>

                                                    <div className="grid items-center gap-4">
                                                        <Input 
                                                            {...register("data_operacao")}
                                                            label="Data de Inserção"
                                                            placeholder="Escreva a Data de Inserção"
                                                            variant="bordered"
                                                            type="date"
                                                            defaultValue={ativo ? ativo.data_operacao.toString() : ''}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <hr className="hidden sm:block self-stretch mx-4" />

                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <div className="grid gap-4 py-4 text-center items-center justify-center">

                                                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                                                    <div className="grid items-center gap-4">
                                                        <Input 
                                                            {...register("data_projeto")}
                                                            label="Data de Inserção"
                                                            placeholder="Escreva a Data de Inserção"
                                                            variant="bordered"
                                                            type="date"
                                                            defaultValue={ativo ? ativo.data_projeto.toString() : ''}
                                                        />
                                                    </div>

                                                    <div className="grid items-center gap-4">
                                                        <Input 
                                                            {...register("criado_por")}
                                                            label="Criado Por"
                                                            placeholder="Escreva por quem foi criado o ativo"
                                                            variant="bordered"
                                                            defaultValue={ativo ? ativo.criado_por : ''}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                                                    <div className="grid items-center gap-4">
                                                        <Input 
                                                            {...register("criado_em")}
                                                            label="Criado Em"
                                                            placeholder="Escreva quando foi criado o ativo"
                                                            variant="bordered"
                                                            type="date"
                                                            defaultValue={ativo ? ativo.criado_em.toString() : ''}
                                                        />
                                                    </div>

                                                    <div className="grid items-center gap-4">
                                                        <Select
                                                            {...register("status")}
                                                            label="Status"
                                                            placeholder="Selecione o Status"
                                                            onChange={handleOpStatusChange}
                                                            variant="bordered"
                                                            defaultSelectedKeys={ativo!.status}
                                                        >
                                                            {statusOp.map((status: string) => (
                                                                <SelectItem 
                                                                    key={status.charAt(0).toUpperCase()} 
                                                                    value={status.charAt(0).toUpperCase()}
                                                                >
                                                                    {status}
                                                                </SelectItem>
                                                            ))}
                                                        </Select>

                                                        <p className="text-sm text-default-400">Status: {selectedStatusOp}</p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                                                    <div className="grid items-center gap-4">
                                                        <Input 
                                                            {...register("codigo")}
                                                            label="Código"
                                                            placeholder="Escreva o Código do ativo"
                                                            variant="bordered"
                                                            defaultValue={ativo ? ativo.codigo : ''}
                                                        />
                                                    </div>

                                                    <div className="grid items-center gap-4">
                                                        <Input 
                                                            {...register("latitude")}
                                                            label="Latitude"
                                                            placeholder="Escreva a Latitude"
                                                            variant="bordered"
                                                            type="number"
                                                            defaultValue={ativo ? ativo.latitude.toString() : ''}
                                                        /> 
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                                                    <div className="grid items-center gap-4">
                                                        <Input 
                                                            {...register("longitude")}
                                                            label="Longitude"
                                                            placeholder="Escreva a Longitude"
                                                            variant="bordered"
                                                            type="number"
                                                            defaultValue={ativo ? ativo.longitude.toString() : ''}
                                                        />
                                                    </div>

                                                    <div className="grid items-center gap-4">
                                                        <Input 
                                                            {...register("Município")}
                                                            label="Município"
                                                            placeholder="Escreva o Município"
                                                            variant="bordered"
                                                            defaultValue={ativo ? ativo.Município : ''}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                                                    <div className="grid items-center gap-4">
                                                        <Input 
                                                            {...register("localidade")}
                                                            label="Localidade"
                                                            placeholder="Escreva a Localidade"
                                                            variant="bordered"
                                                            defaultValue={ativo ? ativo.localidade : ''}
                                                        />
                                                    </div>

                                                    <div className="grid items-center gap-4">
                                                        <Input 
                                                            {...register("Endereco")}
                                                            label="Endereço"
                                                            placeholder="Escreva o Endereço"
                                                            variant="bordered"
                                                            defaultValue={ativo ? ativo.Endereco : ''}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ModalBody>

                                <ModalFooter
                                    className="w-full gap-4 p-4 items-center justify-center text-center"
                                >
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

