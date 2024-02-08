/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDownIcon, EditIcon } from '@chakra-ui/icons'
import { Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Select, SelectItem, Selection, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useGetAtivosOp, useGetAtivosOpFilters } from '../../../react-query/QueriesAndMutations'
import { IGetOpAtivo } from '../../../types/types'
import { DeleteIcon } from '../../components/ui/DeleteIcon'
import { AtivosOpColumns } from '../../constants/Columns'
import { deleteExternalAtivoOp, getOpEtapaServico, getOpStatus, getOpTipoAtivo, getOpTipoInvestimento } from '../../../django/api'
import { MapPinIcon, MapPinned } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ModalAtivosOpEdit } from '../../components/shared/Modals'

const ListagemAtivos = () => {
    const [tipoAtivoOp, setTipoAtivoOp] = useState([])
    const [selectedTipoAtivoOp, setSelectedTipoAtivoOp] = useState('')
    const [tipoInvestimentoOp, setTipoInvestimentoOp] = useState([])
    const [selectedTipoInvestimentoOp, setSelectedTipoInvestimentoOp] = useState('')
    const [statusOp, setStatusOp] = useState([])
    const [selectedStatusOp, setSelectedStatusOp] = useState('')
    const [etapaServicoOp, setEtapaServicoOp] = useState([])
    const [selectedEtapaServicoOp, setSelectedEtapaServicoOp] = useState('')

    const [isAtivoOpModalOpen, setIsAtivoOpModalOpen] = useState(false)
  const [selectedAtivoOp, setSelectedAtivoOp] = useState<IGetOpAtivo | null>(null)
    

    const INITIAL_TABLE_COLUMNS = ['code', 'campName', 'class', 'actions']
    
    const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_TABLE_COLUMNS))

    const navigate = useNavigate()
    
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

                    <div className='flex gap-3'>
                        <Tooltip content='Ir para lista de Ativos Administrativos'>
                            <Button
                            onClick={() => navigate('/listagemAtivosAdministrativos')}
                            >
                                <MapPinIcon />
                            </Button>
                        </Tooltip>

                        <Tooltip content='Ir para lista de Unidades'>
                            <Button
                            onClick={() => navigate('/listagemUnidades')}
                            >
                                <MapPinned />
                            </Button>
                        </Tooltip>
                    </div>
                </div>
            </div>
        )

    }, [navigate, visibleColumns])

    const {data: ativoOp, isLoading: isAtivoOpLoading, isError: isAtivoOpError, refetch: refetchAtivoOp} = useGetAtivosOp({tipo_ativo: selectedTipoAtivoOp, tipo_investimento: selectedTipoInvestimentoOp, status: selectedStatusOp, etapa_do_servico: selectedEtapaServicoOp})

    const {refetch: refetchFilters} = useGetAtivosOpFilters({tipo_ativo: selectedTipoAtivoOp, tipo_investimento: selectedTipoInvestimentoOp, status: selectedStatusOp, etapa_do_servico: selectedEtapaServicoOp})

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
        await refetchFilters()
        refetchAtivoOp()
    }

    const handleOpEtapaServicoChange = async (event: any) => {
        setSelectedEtapaServicoOp(event.target.value)
        await refetchFilters()
        refetchAtivoOp()
    }

    const handleOpTipoAtivoChange = async (event: any) => {
        setSelectedTipoAtivoOp(event.target.value)
        await refetchFilters()
        refetchAtivoOp()
    }

    const handleOpTipoInvestimentoChange = async (event: any) => {
        setSelectedTipoInvestimentoOp(event.target.value)
        await refetchFilters()
        refetchAtivoOp()
    }

    const clearFilters = async () => {
        setSelectedStatusOp('')
        setSelectedEtapaServicoOp('')
        setSelectedTipoAtivoOp('')
        setSelectedTipoInvestimentoOp('')
        await refetchAtivoOp()
        refetchFilters()
    }


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
                        <p className='text-bold text-sm capitalize text-black'>{ativoOp.tipo_investimento_display.value}</p>
                    </div>
                )

            case 'activeType':
                return (
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize text-black'>{ativoOp.tipo_ativo}</p>
                        <p className='text-bold text-sm capitalize text-black'>{ativoOp.tipo_ativo_display.value}</p>
                    </div>
                )
    
            case 'serviceStep':
                return (
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize text-black'>{ativoOp.etapa_do_servico}</p>
                        <p className='text-bold text-sm capitalize text-black'>{ativoOp.etapa_do_servico_display.value}</p>
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
                        <p className='text-bold text-sm capitalize text-primary-400'>{ativoOp.status}</p>
                        <p className='text-bold text-sm capitalize text-black'>{ativoOp.status_display.value}</p>
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
                    <div className='relative flex items-center text-center justify-center gap-2'>
    
                    <Tooltip content="Editar Ativo">
                        <Button 
                            className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            onClick={() => {
                                setIsAtivoOpModalOpen(true)
                                setSelectedAtivoOp(ativoOp)
                            }}
                        >
                            <EditIcon />
                        </Button>
                    </Tooltip>
    
                    <Tooltip color="danger" content="Apagar Ativo">
                        <Button 
                            className="text-lg text-danger cursor-pointer active:opacity-50"
                            onClick={() => deleteExternalAtivoOp(ativoOp.id)}
                        >
                            <DeleteIcon />
                        </Button>
                    </Tooltip>
                </div>
                )
            default:
                return typeof cellValue === 'object' && cellValue !== null ? cellValue.value : cellValue;
        }
        }, [])

  return (
    <>
        <Card className='max-w-full w-[1200px] h-[300px] bg-slate-900'>
            <CardBody>
                <h1 className='text-3xl font-bold text-center text-white'>Ativos Operacionais Dinâmicos</h1>
                <p className='text-xl text-center text-red-900'>Filtros</p>

                <div className='gap-4 p-4'>
                    <div className='flex flex-1 justify-between w-full p-4 gap-4'>
                        <Select
                            label='Status'
                            onChange={handleOpStatusChange}
                            color='primary'
                        >
                            {statusOp.map((status: {key: string, value: string}) => (
                                <SelectItem
                                    key={status.key}
                                    value={status.key}
                                >
                                    {status.value}
                                </SelectItem>
                            ))}
                        </Select>

                        <Select
                            label='Tipo de Ativo'
                            onChange={handleOpTipoAtivoChange}
                            color='primary'
                        >
                            {tipoAtivoOp.map((tipoAtivo: {key: string, value: string}) => (
                                <SelectItem
                                    key={tipoAtivo.key}
                                    value={tipoAtivo.key}
                                >
                                    {tipoAtivo.value}
                                </SelectItem>
                            ))}
                        </Select>

                        <Select
                            label='Tipo de Investimento'
                            onChange={handleOpTipoInvestimentoChange}
                            color='primary'
                        >
                            {tipoInvestimentoOp.map((tipoInvestimento: {key: string, value: string}) => (
                                <SelectItem
                                    key={tipoInvestimento.key}
                                    value={tipoInvestimento.key}
                                >
                                    {tipoInvestimento.value}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>

                    <div className='flex flex-1 justify-between w-full p-4 gap-4'>
                        <Select
                            label='Etapa de Serviço'
                            onChange={handleOpEtapaServicoChange}
                            color='primary'
                        >
                            {etapaServicoOp.map((etapaServico: {key: string, value: string}) => (
                                <SelectItem
                                    key={etapaServico.key}
                                    value={etapaServico.key}
                                >
                                    {etapaServico.value}
                                </SelectItem>
                            ))}
                        </Select>

                        <Button
                            className='w-full'
                            onClick={clearFilters}
                            color='danger'
                        >
                            Limpar filtros
                        </Button>      
                    </div>
                </div>
            </CardBody>
        </Card>

        <ModalAtivosOpEdit isOpen={isAtivoOpModalOpen} onOpenChange={() => setIsAtivoOpModalOpen(false)} ativo={selectedAtivoOp} />

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
                                    className='text-center'
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
                                    className='text-center'
                                >
                                    {(columnKey) => <TableCell>{AtivoOpRenderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
            </CardBody>
        </Card>
        
    </>
  )
}

export default ListagemAtivos