/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
    Navbar, 
    NavbarBrand, 
    NavbarContent, 
    NavbarItem, 
    Link, 
    Button, 
    Dropdown, 
    DropdownTrigger, 
    DropdownMenu, 
    DropdownItem, 
    Card, 
    CardHeader, 
    Tooltip, 
    Avatar, 
    useDisclosure, 
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Input, 
    Select, 
    SelectItem
} from "@nextui-org/react";
import LogoSGP  from '../../assets/logo_sgp.png'
import PersonSVG from '../../assets/person-svgrepo-com.svg'
import { useAuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSignOutAccount, useUpdateUserAccount } from "../../../react-query/QueriesAndMutations";
import { getFuncoes } from "../../../django/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IUpdateUser, IUser } from "../../../types/types";
import FileUploader from "../shared/FileUploader";


function TopNav() {
    const { user, setUser } = useAuthContext()
    const navigate = useNavigate()
    const signOutAccount = useSignOutAccount()
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const {register, handleSubmit} = useForm<IUser>()

    const [funcoes, setFuncoes] = useState([])
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    useEffect(() => {
        const fetchFuncoes = async () => {
            const funcoes = await getFuncoes()
            setFuncoes(funcoes)
        }

        fetchFuncoes()
    }, [])

    const updateUserAccount = useUpdateUserAccount()

    const handleUpdatedUser = async (data: IUpdateUser) => {

        if (selectedFile) {
            user!.imagem = URL.createObjectURL(selectedFile)
        }

        await updateUserAccount.mutate(data)

        setUser({
            ...user,
            ...data,
            id: user!.id || '',
            funcao_display: user!.funcao_display || '',
            token: user!.token
        })
    }
    
    const HandleFileChange = (files: File[]) => {
        // Verifique se pelo menos um arquivo foi selecionado
        if (files.length > 0) {
            // Armazene o primeiro arquivo selecionado no estado do componente
            setSelectedFile(files[0]);
        }
    }

    return(
        <Navbar className=" gap-6 bg-slate-900" >

            <div>
                <NavbarBrand
                    rel="/"
                >
                    <img src={LogoSGP} className="h-14 justify-start"/>
                    <p className="font-bold text-inherit"></p>
                </NavbarBrand>
            </div>
           

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <Dropdown>
                    <NavbarItem>
                    <DropdownTrigger>
                        <Button
                        disableRipple
                        className="p-0 text-gray-400 bg-transparent data-[hover=true]:bg-transparent"
                        radius="sm"
                        variant="faded"
                        aria-label="Clique Aqui"
                        >
                        Páginas
                        </Button>
                    </DropdownTrigger>
                    </NavbarItem>

                    <DropdownMenu
                    aria-label="SGP features"
                    className="w-[340px]"
                    itemClasses={{
                        base: "gap-4",
                    }}
                    >

                    <DropdownItem
                        key="Unities_register"
                        description="Registro de Unidades"
                        href="/cadastroUnidades"
                    >
                        Cadastro Unidades
                    </DropdownItem>

                    <DropdownItem
                        key="Ativos_Register"
                        description="Cadastramento de futuros ativos de saneamento."
                        href="/cadastroAtivos"
                    >
                        Cadastro Ativos
                    </DropdownItem>

                    <DropdownItem
                        key="Ativos_list"
                        href="/listagemAtivos"
                        description="Uma lista dos ativos Operacionais"
                    >
                        Lista de Ativos Operacionais
                    </DropdownItem>

                    <DropdownItem
                        key="Ativos_list"
                        href="/ListagemAtivosAdministrativos"
                        description="Uma lista dos ativos Administrativos"
                    >
                        Lista de Ativos Administrativos
                    </DropdownItem>

                    </DropdownMenu>
                </Dropdown>

                <NavbarItem isActive>
                    <Link href="/" aria-current="page">
                        Painel Principal
                    </Link>
                </NavbarItem>

                <NavbarItem>
                    <Link color="success" href="/listagemUsuarios">
                    Usuários
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem className="lg:flex">
                    <Tooltip
                        closeDelay={5000}
                        content={
                            <>
                                <Card>
                                    <CardHeader className="justify-between">
                                        <div className="flex gap-5">
                                            <Avatar 
                                                isBordered 
                                                radius="full" 
                                                size="md"
                                                src={user!.imagem || PersonSVG} 
                                            />
                                            <div className="flex flex-col gap-1 items-start justify-center">
                                                <h4 className="text-small font-semibold leading-none text-default-600">{user!.nome || 'Não Autenticado'}</h4>
                                                <h5 className="text-small tracking-tight text-default-400">{user!.agencia || 'Agência reguladora'}</h5>
                                                <h6 className="text-small tracking-tight text-default-400">{user!.funcao || 'U'}</h6>
                                                <h6 className="text-small tracking-tight text-default-400">{user!.funcao_display || 'Usuário'}</h6>
                                                <h6 className="text-small tracking-tight text-default-400">{user!.email || 'email'}</h6>
                                                <Button
                                                    onClick={() => onOpen()}
                                                >
                                                    Mudar Informações
                                                </Button>
                                            </div>
                                            
                                        </div>
                                    </CardHeader>
                                </Card>
                            
                                <Modal
                                isOpen={isOpen}
                                onOpenChange={onOpenChange}
                                aria-labelledby="modal-title"
                                aria-describedby="modal-description"
                                placement="bottom"
                                >
                                <ModalContent
                                    className=" sm:max-w-[600px] flex flex-col items-start"
                                >
                                    {(onClose) => (
                                        <>
                                            <form
                                                onSubmit={handleSubmit(handleUpdatedUser)}
                                                encType="multipart/form-data"
                                            >  
                                                <ModalHeader
                                                    className="flex flex-col gap-2 items-center justify-center"
                                                >
                                                    <h1>Editar Informações</h1>
                                                    <p>Edite aqui suas informações de perfil</p>
                                                </ModalHeader>

                                                <ModalBody>
                                                    <div className="w-full flex justify-start items-center gap-4 py-4">
                                                        <Avatar 
                                                            isBordered
                                                            radius="md"
                                                            color="success"
                                                            src={user!.imagem || PersonSVG}
                                                            size="sm"
                                                            className="w-52 h-52"
                                                        />

                                                        <FileUploader fieldChange={HandleFileChange} mediaUrl={user!.imagem} />
                                                    </div>

                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid grid-cols-2 items-center gap-4">
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Input
                                                                    {...register('nome')} 
                                                                    label='Nome'
                                                                    type="text"
                                                                    labelPlacement="outside-left"
                                                                    className="col-span-3 text-white"
                                                                    defaultValue={user!.nome}
                                                                >
                                                                    {user!.nome}
                                                                </Input>
                                                            </div>

                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Input 
                                                                    {...register('agencia')}
                                                                    label='Agência'
                                                                    type="text"
                                                                    labelPlacement="outside-left"
                                                                    className="col-span-3"
                                                                    defaultValue={user!.agencia}
                                                                >
                                                                    {user!.agencia}
                                                                </Input>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-2 items-center gap-4">
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Input 
                                                                    {...register('email')}
                                                                    label='Email'
                                                                    type="text"
                                                                    labelPlacement="outside-left"
                                                                    className="col-span-3"
                                                                    defaultValue={user!.email}
                                                                >
                                                                    {user!.email}
                                                                </Input>
                                                            </div>

                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Select
                                                                    {...register('funcao')}
                                                                    label='Função'
                                                                    labelPlacement="outside-left"
                                                                    className="col-span-3"
                                                                >
                                                                    {funcoes.map((funcao, index) => (
                                                                        <SelectItem key={index}>{funcao}</SelectItem>
                                                                    ))}
                                                                </Select>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-2 items-center gap-4">
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <span>Token de Autenticação:</span>


                                                                <p
                                                                    {...register('token')}
                                                                    className="text-default-400 underline"
                                                                >
                                                                    {user!.token}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </ModalBody>

                                                <ModalFooter>
                                                    <Button
                                                        variant="shadow"
                                                        type="submit"
                                                    >
                                                        Fechar e Registrar Mudanças
                                                    </Button>

                                                    <Button
                                                        variant="shadow"
                                                        onClick={onClose}
                                                    >
                                                        Fechar
                                                    </Button>
                                                </ModalFooter>
                                            </form>  
                                        </>
                                    )}
                                </ModalContent>
                                </Modal>
                            </>
                        }

                        className="bg-slate-800"
                    >
                        <Button
                            disableRipple
                            color="success"
                            radius="sm"
                            variant="shadow"
                            aria-label="Clique Aqui"
                        >
                            Perfil
                        </Button>
                    </Tooltip>

                    <Button
                        className="ml-2"
                        color="danger"
                        radius="sm"
                        variant="shadow"
                        aria-label="Clique Aqui"
                        disableRipple
                        onClick={
                            async () => {
                                await signOutAccount.mutate(user!.token)
                                localStorage.removeItem('user')
                                setUser(null)
                                navigate('/login')
                            }
                        }
                    >
                        Sair
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}

export default TopNav