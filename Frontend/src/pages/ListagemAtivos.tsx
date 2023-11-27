
import TopNav from '../components/ui/TopNav'
import { Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Tab, Tabs } from '@nextui-org/react'
import { useForm } from 'react-hook-form'

const ListagemAtivos = () => {

    type ListagemAtivosPage = {
        selectedSistema: string,
        selectedTipoAtivo: string,
        selectedLocalidade: string,
        dataProj: number,
        dataObra: number,
        dataOp: number,
        dataInserção: number,
    }

    const {register} = useForm<ListagemAtivosPage>()

  return (
    <>
        <TopNav />

        <div className='flex flex-col w-full items-center gap-4 p-4 min-h-screen from-purple-900 via-indigo-800 to-indigo-500 bg-gradient-to-tr'>
            <Card className=" w-[1200px] h-[250px] flex flex-row">
                <CardBody className="overflow-auto scrollbar-hide">
                    <Tabs
                        fullWidth
                        size="md"
                        aria-label="Tab Filter"
                    >
                        <Tab key="Painel" title="Listagem Ativos - Filtros">
                            <div className='justify-between flex flex-col'>
                                <div className='flex flex-row gap-4 p-4'>
                                    <Input 
                                        label="Data de Projeto"
                                        type='date'
                                        placeholder='dd/mm/aaa'
                                        {...register('dataProj')}
                                        className='w-18 '
                                    />

                                    <Input 
                                        label="Data de Obra"
                                        type='date'
                                        placeholder='dd/mm/aaa'
                                        {...register('dataObra')}
                                        className='w-18 '
                                    />

                                    <Input 
                                        label="Data de Operação"
                                        type='date'
                                        placeholder='dd/mm/aaa'
                                        {...register('dataOp')}
                                        className='w-18 '
                                    />

                                    <Input 
                                        label="Data de Inserção"
                                        type='date'
                                        placeholder='dd/mm/aaa'
                                        {...register('dataInserção')}
                                        className='w-18 '
                                    />

                                    <Dropdown>
                                        <DropdownTrigger>
                                            <Button
                                                variant='shadow'
                                                color='primary'
                                            >
                                                Situações
                                            </Button>
                                        </DropdownTrigger>

                                        <DropdownMenu
                                            variant='faded'
                                            aria-label='Filtro de situações'
                                        >
                                            <DropdownItem key='active'>Ativo</DropdownItem>
                                            <DropdownItem key='stopped'>Paralisado</DropdownItem>
                                            <DropdownItem key='canceled'>Cancelado</DropdownItem>
                                            <DropdownItem key='building'>Em Construção</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>

                                <div className='flex flex-row gap-4 p-4'>
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <Button
                                                variant='shadow'
                                                color='primary'
                                            >
                                                Sistemas
                                            </Button>
                                        </DropdownTrigger>

                                        <DropdownMenu
                                            variant='faded'
                                            aria-label='Filtro de situações'
                                        >
                                            <DropdownItem key='agua'>Água</DropdownItem>
                                            <DropdownItem key='esgoto'>Esgoto</DropdownItem>
                                            <DropdownItem key='administrativo'>Administrativo</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>

                                    <Dropdown>
                                        <DropdownTrigger>
                                            <Button
                                                variant='shadow'
                                                color='primary'
                                            >
                                                Tipo
                                            </Button>
                                        </DropdownTrigger>

                                        <DropdownMenu
                                            variant='faded'
                                            aria-label='Filtro de situações'
                                        >
                                            <DropdownItem key='type1'>Tipo 1</DropdownItem>
                                            <DropdownItem key='type2'>Tipo 2</DropdownItem>
                                            <DropdownItem key='type3'>Tipo 3</DropdownItem>
                                            <DropdownItem key='type4'>Tipo 4</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>

                                    <Dropdown>
                                        <DropdownTrigger>
                                            <Button
                                                variant='shadow'
                                                color='primary'
                                            >
                                                Tipo de Investimento
                                            </Button>
                                        </DropdownTrigger>

                                        <DropdownMenu
                                            variant='faded'
                                            aria-label='Filtro de situações'
                                        >
                                            <DropdownItem key='active'>Tipo 1</DropdownItem>
                                            <DropdownItem key='stopped'>Tipo 2</DropdownItem>
                                            <DropdownItem key='canceled'>Tipo 3</DropdownItem>
                                            <DropdownItem key='building'>Tipo 4</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>

                                    <Dropdown>
                                        <DropdownTrigger>
                                            <Button
                                                variant='shadow'
                                                color='primary'
                                            >
                                                Etapa do Serviço
                                            </Button>
                                        </DropdownTrigger>

                                        <DropdownMenu
                                            variant='faded'
                                            aria-label='Filtro de situações'
                                        >
                                            <DropdownItem key='active'>Iniciando</DropdownItem>
                                            <DropdownItem key='stopped'>Contínuo</DropdownItem>
                                            <DropdownItem key='canceled'>Paralisado</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>

                                    <Dropdown>
                                        <DropdownTrigger>
                                            <Button
                                                variant='shadow'
                                                color='primary'
                                            >
                                                Unidades
                                            </Button>
                                        </DropdownTrigger>

                                        <DropdownMenu
                                            variant='faded'
                                            aria-label='Filtro de situações'
                                        >
                                            <DropdownItem key='active'>Unidade Maria</DropdownItem>
                                            <DropdownItem key='stopped'>Unidade José</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>

                                <div className='flex self-end items-end mx-3 justify-between pr-36'>
                                    <div className='justify-between'>
                                        <p>Valor original: </p>
                                    </div>
                                </div>
                            </div>

                        </Tab>
                    </Tabs>
                </CardBody>
            </Card>

            <Card className='max-w-full w-[1200px] h-[750px]'>
                <CardBody>
                    <Tabs
                        fullWidth
                        size='md'
                        aria-label='Actives List'
                    >
                        <Tab 
                            key='Painel_Actives'
                            title='Listagem Ativos - Lista'
                        >
                            
                        </Tab>
                    </Tabs>
                </CardBody>
            </Card>
        </div>
    </>
  )
}

export default ListagemAtivos