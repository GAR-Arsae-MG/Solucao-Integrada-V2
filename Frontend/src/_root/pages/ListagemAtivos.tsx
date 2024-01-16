import { ChevronDownIcon, EditIcon } from '@chakra-ui/icons'
import { Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Selection, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react'
import { useCallback, useMemo, useState } from 'react'

import { useGetAtivosOp, useGetAtivosOpFilters } from '../../../react-query/QueriesAndMutations'
import { IGetOpAtivo } from '../../../types/types'
import { DeleteIcon } from '../../components/ui/DeleteIcon'
import { EyeIcon } from '../../components/ui/EyeIcon'
import TopNav from '../../components/ui/TopNav'
import { AtivosOpColumns } from '../../constants/Columns'

const ListagemAtivos = () => {
    const [tipoAtivoOp, setTipoAtivoOp] = useState('')
    const [tipoInvestimentoOp, setTipoInvestimentoOp] = useState('')
    const [statusOp, setStatusOp] = useState('')
    const [etapaServicoOp, setEtapaServicoOp] = useState('')
    const {data: ativoOp, isLoading: isAtivoOpLoading, isError: isAtivoOpError, refetch: refetchAtivoOp} = useGetAtivosOp({tipo_ativo: tipoAtivoOp, tipo_investimento: tipoInvestimentoOp, status: statusOp, etapa_do_servico: etapaServicoOp})
    const {refetch: refetchFilters} = useGetAtivosOpFilters({tipo_ativo: tipoAtivoOp, tipo_investimento: tipoInvestimentoOp, status: statusOp, etapa_do_servico: etapaServicoOp})

    const INITIAL_TABLE_COLUMNS = ['code', 'campName', 'class', 'actions']
    
    const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_TABLE_COLUMNS))
    
    const headerOpColumns = useMemo(() => {
        if (visibleColumns === 'all') return AtivosOpColumns

        return AtivosOpColumns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns])

    const handleColumnChange = (value: Selection) => {
        setVisibleColumns(new Set(Array.from(value)));
    }
    
    const topContentAtivosOp = useMemo(() => {
        
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Colunas
                                </Button>
                            </DropdownTrigger>

                            <DropdownMenu
                                disallowEmptySelection
                                closeOnSelect={false}
                                selectionMode="multiple"
                                selectedKeys={visibleColumns}
                                onSelectionChange={handleColumnChange}
                            >
                                {AtivosOpColumns.map((column) => (
                                    <DropdownItem key={column.uid}>{column.name}</DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>

                    </div>
                </div>
            </div>
        )

    }, [visibleColumns])


    const AtivoOpRenderCell = useCallback((ativoOp: IGetOpAtivo, columnKey: React.Key) => {
        let cellValue = ativoOp[columnKey as keyof IGetOpAtivo]
    
        if (cellValue instanceof Date) {
            cellValue = cellValue.toLocaleString()
        }
    
        if (cellValue === undefined) {
            cellValue = 'N/A'
        }
    
        switch(columnKey) {
            case 'code':
                return(
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize text-black'>{ativoOp.codigo}</p>
                    </div>
                )
            
            case 'campName':
                return (
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize text-black'>{ativoOp.nome_de_campo}</p>
                    </div>
                )
    
            case 'class': 
                return (
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize text-black'>{ativoOp.classe}</p>
                    </div>
                )
    
            case 'phase':
                return (
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize text-black'>{ativoOp.fase}</p>
                    </div>
                )
    
            case 'createdAt':
                return (
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize text-black'>{ativoOp.criado_em.toLocaleString()}</p>
                    </div>
                )
    
            case 'createdBy':
                return (
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize text-black'>{ativoOp.criado_por}</p>
                    </div>
                )
    
            case 'insertionDate':
                return (
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize text-black'>{ativoOp.data_insercao.toLocaleString()}</p>
                    </div>
                )
    
            case 'projectDate':
                return (
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize text-black'>{ativoOp.data_projeto.toLocaleString()}</p>
                    </div>
                )
    
            case 'obraDate': 
                return (
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize text-black'>{ativoOp.data_obra.toLocaleString()}</p>
                    </div>
                )
            
            case 'operationDate':
                return (
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize text-black'>{ativoOp.data_operacao.toLocaleString()}</p>
                    </div>
                )
    
            case 'investimentType':
                return (
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize text-black'>{ativoOp.tipo_investimento}</p>
                    </div>
                )
    
            case 'serviceStep':
                return (
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize text-black'>{ativoOp.etapa_do_servico}</p>
                    </div>
                )
    
            case 'currentSituation':
                return (
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize text-black'>{ativoOp.situacao_atual}</p>
                    </div>
                )
    
            case 'owner':
                return (
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize text-black'>{ativoOp.proprietario}</p>
                    </div>
                )
    
            case 'originalValue':
                return (
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize text-black'>{ativoOp.valor_original}</p>
                    </div>
                )
    
            case 'donation':
                return (
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize text-black'>{ativoOp.doacao}</p>
                    </div>
                )
    
            case 'utilLifeYears':
                return (
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize text-black'>{ativoOp.vida_util_reg_anos}</p>
                    </div>
                )
    
            case 'utilLifeMonths':
                return (
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize text-black'>{ativoOp.vida_util_reg_meses}</p>
                    </div>
                )
    
            case 'status': 
                return (
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize text-black'>{ativoOp.status}</p>
                    </div>
                )
                
            case 'latitude':
                return (
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize text-black'>{ativoOp.latitude}</p>
                    </div>
                )
    
            case 'longitude':
                return (
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize text-black'>{ativoOp.longitude}</p>
                    </div>
                )
    
            case 'locality':
                return (
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize text-black'>{ativoOp.localidade}</p>
                    </div>
                )
    
            case 'address':
                return (
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize text-black'>{ativoOp.Endereco}</p>
                    </div>
                )
                
            case 'actions': 
                return (
                    <div className='relative flex items-center gap-2'>
                    <Tooltip content='Detalhes'>
                        <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                            <EyeIcon />
                        </span>
                    </Tooltip>
    
                    <Tooltip content="Editar Ativo">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <EditIcon />
                        </span>
                    </Tooltip>
    
                    <Tooltip color="danger" content="Apagar Ativo">
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
                            topContent={topContentAtivosOp} 
                        >
                            <TableHeader columns={headerOpColumns}>
                                {(column) => (
                                    <TableColumn
                                        key={column.uid}
                                        align={column.uid === 'actions' ? 'center':'start'}
                                        
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
                                        {(columnKey) => <TableCell>{AtivoOpRenderCell(item, columnKey)}</TableCell>}
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