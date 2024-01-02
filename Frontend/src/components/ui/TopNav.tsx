import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Card, CardHeader, Tooltip, Avatar} from "@nextui-org/react";
import LogoSGP  from '../../assets/logo_sgp.png'
import PersonSVG from '../../assets/person-svgrepo-com.svg'
import { useAuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSignOutAccount } from "../../../react-query/QueriesAndMutations";


function TopNav() {
    const { user, setUser } = useAuthContext()
    const navigate = useNavigate()
    const signOutAccount = useSignOutAccount()

    return(
        <Navbar className=" gap-6 bg-slate-900" >

            <div>
                <NavbarBrand
                    rel="/painel"
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
                        description="Uma lista dos ativos atuais"
                    >
                        Lista de Ativos
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
                        content={
                            <>
                                <Card>
                                    <CardHeader className="justify-between">
                                        <div className="flex gap-5">
                                            <Avatar 
                                                isBordered 
                                                radius="full" 
                                                size="md"
                                                src={user!.imageUrl || PersonSVG} 
                                            />
                                            <div className="flex flex-col gap-1 items-start justify-center">
                                                <h4 className="text-small font-semibold leading-none text-default-600">{user!.nome || 'Não Autenticado'}</h4>
                                                <h5 className="text-small tracking-tight text-default-400">{user!.agencia || 'Agência reguladora'}</h5>
                                                <h6 className="text-small tracking-tight text-default-400">{user!.funcao || 'usuario'}</h6>
                                                <h6 className="text-small tracking-tight text-default-400">{user!.email || 'email'}</h6>
                                            </div>
                                            
                                        </div>
                                    </CardHeader>
                                </Card>
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