

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import LogoSGP  from '../../assets/logo_sgp.png'  


function TopNav() {
    return(
        <Navbar className=" gap-6 bg-slate-900" >
            <NavbarBrand>
                <img src={LogoSGP} className="h-14 justify-start" />
                <p className="font-bold text-inherit"></p>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <Dropdown>
                    <NavbarItem>
                    <DropdownTrigger>
                        <Button
                        disableRipple
                        className="p-0 bg-transparent data-[hover=true]:bg-transparent"
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
                    <Link href="/painel" aria-current="page">
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
                <NavbarItem className="hidden lg:flex">
                    <Link href="/">Login</Link>
                </NavbarItem>

                <NavbarItem>
                    <Button as={Link} color="primary" href="/" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}

export default TopNav