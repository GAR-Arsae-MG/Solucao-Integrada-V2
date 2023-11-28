
import TopNav from '../components/ui/TopNav'
import { Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, Tooltip, DropdownTrigger, Input, Tab, Tabs, Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { MapData, MapItem, columns } from '../components/MapData'
import React, { useCallback } from 'react'
import { EyeIcon } from '../components/ui/EyeIcon'
import { EditIcon } from '../components/ui/EditIcon'
import { DeleteIcon } from '../components/ui/DeleteIcon'

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

    const sumarizarValoresOriginais = (data: MapItem[]) => {
        return data.reduce((acc, item: { valorOriginal: number }) => acc + item.valorOriginal, 0);
    };

    const sumarizarValoresResiduais = (data: MapItem[]) => {
        return data.reduce((acc, item: { valorResidual: number }) => acc + item.valorResidual, 0);
    };

    type Ativo = typeof MapData[0]

    const renderCell = useCallback((ativo: Ativo, columnKey: React.Key) => {
        const cellValue = ativo[columnKey as keyof Ativo]

        switch(columnKey) {
            case 'name':
                return(
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize'>{cellValue}</p>
                        <p className='text-bold text-sm capitalize text-default-400'>{ativo.nomeAtivo}</p>
                    </div>
                )
            
            case 'type':
                return (
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize'>{cellValue}</p>
                        <p className='text-bold text-sm capitalize text-default-400'>{ativo.tipo}</p>
                    </div>
                )
            
            case 'actions': 
                return (
                    <div className='relative flex items-center gap-2'>
                    <Tooltip content='Details'>
                        <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                            <EyeIcon />
                        </span>
                    </Tooltip>

                    <Tooltip content="Edit user">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <EditIcon />
                        </span>
                    </Tooltip>

                    <Tooltip color="danger" content="Delete user">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <DeleteIcon />
                        </span>
                    </Tooltip>
                </div>
                )
            default:
                return cellValue   
        }
    }, [])

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
                                <div className='flex justify-between items-center z-20'>
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

                                    <div className='flex self-end items-end flex-col mx-3 justify-between pr-36 font-bold p-4'>
                                            <p className='gap-4'>Valor original:{sumarizarValoresOriginais(MapData)} </p>
                                            <p className='gap-4'>Valor Residual:{sumarizarValoresResiduais(MapData)} </p>
                                    </div>
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
                            </div>

                        </Tab>
                    </Tabs>
                </CardBody>
            </Card>

            <Card className='max-w-full w-[1200px] h-[750px]'>
                <CardBody className='overflow-auto scrollbar-hide'>
                    <Tabs
                        fullWidth
                        size='md'
                        aria-label='Actives List'
                    >
                        <Tab 
                            key='Painel_Actives'
                            title='Listagem Ativos - Lista'
                        >
                            <Table>
                                <TableHeader columns={columns}>
                                    {(column) => (
                                        <TableColumn
                                            key={column.uid}
                                            align={column.uid === 'actions' ? 'center':'start'}
                                        >
                                            {column.name}
                                        </TableColumn>
                                    )}
                                </TableHeader>

                                <TableBody items={MapData}>
                                    {(item) => (
                                        <TableRow
                                            key={item.id}
                                        >
                                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </Tab>
                    </Tabs>
                </CardBody>
            </Card>
        </div>
    </>
  )
}

export default ListagemAtivos