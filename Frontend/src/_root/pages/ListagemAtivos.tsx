
import TopNav from '../../components/ui/TopNav'
import { Card, CardBody, Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Spinner, Selection, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from '@nextui-org/react'
import {  AtivosOp } from '../../components/MapData'
import { useMemo, useState } from 'react'
import { useGetAtivosOp } from '../../../react-query/QueriesAndMutations'
import { AtivosOpColumns } from '../../constants/Columns'
import { ChevronDownIcon } from '@chakra-ui/icons'

const ListagemAtivos = () => {
    const [tipoAtivoOp, setTipoAtivoOp] = useState('')
    const [tipoInvestimentoOp, setTipoInvestimentoOp] = useState('')
    const [statusOp, setStatusOp] = useState('')
    const [etapaServicoOp, setEtapaServicoOp] = useState('')

    const {data: ativoOp, isLoading: isAtivoOpLoading, iserror: isAtivoOpError, refetch: refetchAtivoOp} = useGetAtivosOp({tipo_ativo: tipoAtivoOp, tipo_investimento: tipoInvestimentoOp, status: statusOp, etapa_do_servico: etapaServicoOp})

    const INITIAL_VISIBLE_COLUMNS = ['codigo', 'nome', 'tipo_ativo', 'status', 'etapa_do_servico', 'actions']

    const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS))

    const headerColumns = useMemo(() => {
       if (visibleColumns === 'all') return AtivosOpColumns

       return AtivosOpColumns.filter((column) => Array.from(visibleColumns).includes(column.uid))
    }, [visibleColumns])

    const topContent = useMemo(() => {
        return (
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between gap-3 items-end'>
                    <Dropdown>
                        <DropdownTrigger className='hidden sm:flex'>
                            <Button endContent={<ChevronDownIcon height={16} width={16} className='text-small' />} variant='flat'>
                                Columns
                            </Button>
                        </DropdownTrigger>

                        <DropdownMenu
                            disallowEmptySelection
                            aria-label='Colunas da tabela'
                            closeOnSelect={false}
                            selectedKeys={visibleColumns}
                            selectionMode='multiple'
                            onMouseLeave={() => setVisibleColumns(visibleColumns)}
                        >
                            {AtivosOpColumns.map((column) => (
                                <DropdownItem key={column.uid} className='capitalize'>
                                    {column.name}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        )
    }, [visibleColumns])

  return (
    <>
        <TopNav />

        <div className='flex flex-col w-full items-center gap-4 p-4 min-h-screen from-purple-900 via-indigo-800 to-indigo-500 bg-gradient-to-tr'>

            <Card className='max-w-full w-[1200px] h-[750px]'>
                <CardBody className='overflow-auto scrollbar-hide'>
                    {isAtivoOpLoading ? (
                        <>
                            <Spinner />
                            <p>Carregando, por favor, espere...</p>
                        </>
                    ): isAtivoOpError ? (
                        <>
                            <p>Erro ao buscar os usuários.</p>
                        </>
                    ): (
                        <Table 
                            aria-label='Tabela de Ativos operacionais Dinâmica' 
                            selectionMode='multiple'
                            topContent={topContent}
                            topContentPlacement='outside'
                        >
                            <TableHeader columns={headerColumns}>
                                {(column) => (
                                    <TableColumn
                                        key={column.uid}
                                        align={column.uid === 'actions' ? 'center':'start'}
                                        allowsSorting={column.sortable}
                                    >
                                        {column.name}
                                    </TableColumn>
                                )}
                            </TableHeader>

                            <TableBody 
                                items={ativoOp} 
                                emptyContent={'Sem dados para mostrar abaixo!'}
                                
                            >
                                {(item) => (
                                    <TableRow
                                        key={item.codigo}
                                    >
                                        {(columnKey) => <TableCell>{AtivosOp(item, columnKey)}</TableCell>}
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </CardBody>
            </Card>
        </div>
    </>
  )
}

export default ListagemAtivos