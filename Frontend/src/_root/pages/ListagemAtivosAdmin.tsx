/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Select, SelectItem, Selection, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ativosAdminColumns } from '../../constants/Columns'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { MapPinIcon, MapPinned } from 'lucide-react'
import { useGetAtivosAdmin, useGetAtivosAdminfilters } from '../../../react-query/QueriesAndMutations'
import { getAdminClasseAtivo, getAdminStatus, getAdminTipoAtivo } from '../../../django/api'
import { IGetAdminAtivo } from '../../../types/types'
import { EyeIcon } from '../../components/ui/EyeIcon'
import { EditIcon } from '../../components/ui/EditIcon'
import { DeleteIcon } from '../../components/ui/DeleteIcon'
import { useNavigate } from 'react-router-dom'


const ListagemAtivosAdmin = () => {
  const [tipoAtivoAdmin, setTipoAtivoAdmin] = useState([])
  const [selectedTipoAtivoAdmin, setSelectedTipoAtivoAdmin] = useState('')

  const [classeAtivoAdmin, setClasseAtivoAdmin] = useState([])
  const [selectedClasseAtivoAdmin, setSelectedClasseAtivoAdmin] = useState('')

  const [statusAtivoAdmin, setStatusAtivoAdmin] = useState([])
  const [selectedStatusAtivoAdmin, setSelectedStatusAtivoAdmin] = useState('')

  const INITIAL_TABLE_COLUMNS = ['name', 'code', 'status', 'unit', 'actions']

  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_TABLE_COLUMNS))

  const headerAdminColumns = useMemo(() => {
    if (visibleColumns === 'all') return ativosAdminColumns

    return ativosAdminColumns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns])

  const handleColumnChange = (value: Selection) => {
    setVisibleColumns(new Set(Array.from(value)));
  }

  const navigate = useNavigate()

  const topContentAtivosAdmin = useMemo(() => {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between gap-3 items-end'>
          <div className='flex gap-3'>
            <Dropdown>
              <DropdownTrigger className='hidden sm:flex'>
                <Button endContent={<ChevronDownIcon className='text-small' />} variant='flat'>
                  Colunas
                </Button>
              </DropdownTrigger>

              <DropdownMenu
                disallowEmptySelection
                closeOnSelect={false}
                selectionMode='multiple'
                selectedKeys={visibleColumns}
                onSelectionChange={handleColumnChange}
              >
                {ativosAdminColumns.map((column) => (
                  <DropdownItem key={column.uid}>{column.name}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>

          <div className='flex gap-3'>
              <Tooltip content='Ir para lista de Ativos Operacionais'>
                <Button
                  onClick={() => navigate('/listagemAtivos')}
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

  const {data: ativoAdmin, isLoading: isLoadingAtivoAdmin, isError: isAtivoAdminError, refetch: refetchAtivoAdmin} = useGetAtivosAdmin({tipo_ativo: selectedTipoAtivoAdmin, classe_ativo: selectedClasseAtivoAdmin, status: selectedStatusAtivoAdmin})
  const {refetch: refetchFilters} = useGetAtivosAdminfilters({tipo_ativo: selectedTipoAtivoAdmin, classe_ativo: selectedClasseAtivoAdmin, status: selectedStatusAtivoAdmin})

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
    await refetchFilters()
    refetchAtivoAdmin()
  }

  const handleAdminClasseChange = async (event: any) => {
    setSelectedClasseAtivoAdmin(event.target.value)
    await refetchFilters()
    refetchAtivoAdmin()
  }

  const handleAdminTipoChange = async (event: any) => {
    setSelectedTipoAtivoAdmin(event.target.value)
    await refetchFilters()
    refetchAtivoAdmin()
  }

  const clearFilters = async () => {
    setSelectedClasseAtivoAdmin('')
    setSelectedStatusAtivoAdmin('')
    setSelectedTipoAtivoAdmin('')
    await refetchAtivoAdmin()
    refetchFilters
  }

  const AtivoAdminRenderCell = useCallback((ativoAdmin: IGetAdminAtivo, columnKey: React.Key) => {
    let cellValue = ativoAdmin[columnKey as keyof IGetAdminAtivo]

    if (cellValue instanceof Date) {
      cellValue = cellValue.toLocaleString()
    }

    if (cellValue === undefined) {
      cellValue = 'N/A'
    }

    switch (columnKey) {
      case 'activeType':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-black text-sm capitalize'>{ativoAdmin.tipo_ativo_display}</p>
          </div>
        )

      case 'name':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-black text-sm'>{ativoAdmin.nome_ativo}</p>
          </div>
        )

      case 'code':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-black text-sm'>{ativoAdmin.código_ativo}</p>
          </div>
        )

      case 'class':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-black text-sm capitalize'>{ativoAdmin.classe_ativo_display}</p>
          </div>
        )

      case 'owner':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-black text-sm'>{ativoAdmin.proprietario}</p>
          </div>
        )

      case 'donation':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-black text-sm'>{ativoAdmin.doacao}</p>
          </div>
        )

      case 'originalValue':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-black text-sm'>{ativoAdmin.valor_original}</p>
          </div>
        )

      case 'currentValue':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-black text-sm'>{ativoAdmin.valor_atual}</p>
          </div>
        )

      case 'status':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-black text-sm capitalize'>{ativoAdmin.status_display}</p>
          </div>
        )

      case 'insertionDate':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-black text-sm'>{ativoAdmin.data_insercao.toLocaleString()}</p>
          </div>
        )
      
      case 'substitutionDate':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-black text-sm'>{ativoAdmin.previsao_substituicao.toLocaleString()}</p>
          </div>
        )

      case 'unit':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-black text-sm'>{ativoAdmin.unidade}</p>
          </div>
        )

      case 'createdBy':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-black text-sm'>{ativoAdmin.criado_por}</p>
          </div>
        )

      case 'acquiredBy': 
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-black text-sm'>{ativoAdmin.adquirido_por}</p>
          </div>
        )

      case 'actions':
        return (
          <div className='relative flex items-center text-center justify-center gap-2'>
            <Tooltip content='Detalhes'>
              <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                <EyeIcon /> 
              </span>
            </Tooltip>

            <Tooltip content='Editar Ativo'>
              <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                <EditIcon />
              </span>
            </Tooltip>

            <Tooltip color='danger' content='Excluir Ativo'>
              <span className='text-lg text-red-600 cursor-pointer active:opacity-50'>
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
      <Card className='max-w-full w-[1200px] h-[300px] bg-slate-900'>
        <CardBody>
          <h1 className='text-3xl font-bold text-center text-white'>Ativos Administrativos Dinâmicos</h1>
          <p className='text-xl text-center text-red-900'>Filtros</p>

          <div className='gap-4 p-4'>
            <div className='flex flex-1 justify-between w-full p-4 gap-4'>
              <Select
                label='Status'
                onChange={handleAdminStatusChange}
                color='primary'
                selectionMode='single'
              >
                {statusAtivoAdmin.map((status: string) => (
                  <SelectItem
                    key={status.charAt(0).toUpperCase()}
                    value={status.charAt(0).toUpperCase()}
                  >
                    {status}
                  </SelectItem>
                ))}
              </Select>

              <Select
                label='Tipo de Ativo'
                onChange={handleAdminTipoChange}
                color='success'
              >
                {tipoAtivoAdmin.map((tipo: string) => (
                  <SelectItem
                    key={tipo.charAt(0).toUpperCase()}
                    value={tipo.charAt(0).toUpperCase()}
                  >
                    {tipo}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className='flex flex-1 justify-between w-full p-4 gap-4'>
              <Select
                label='Classe de Ativo'
                onChange={handleAdminClasseChange}
                color='secondary'
              >
                {classeAtivoAdmin.map((classe: string) => (
                  <SelectItem
                    key={classe.charAt(0).toUpperCase()}
                    value={classe.charAt(0).toUpperCase()}
                  >
                    {classe}
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

      <Card className='max-w-full w-[1200px] h-[750px]'>
        <CardBody className='overflow-auto scrollbar-hide'>
          {isLoadingAtivoAdmin ? (
            <>
              <Spinner />
              <p className='text-center flex flex-1'>Carregando, por favor espere...</p>
            </>
          ): isAtivoAdminError ? (
            <>
              <p className='text-center flex flex-1'>Erro ao buscar Usuarios</p>
            </>
          ): (
            <Table
              aria-label='Tabela de Ativos Administrativos Dinâmica'
              topContent={topContentAtivosAdmin}
            >
              <TableHeader
                columns={headerAdminColumns}
              >
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
                items={ativoAdmin}
                emptyContent={'Sem dados para mostrar abaixo!'}
              >
                {(item) => (
                  <TableRow
                    key={item.código_ativo}
                    className='text-center'
                  >
                    {(columnKey) => <TableCell>{AtivoAdminRenderCell(item, columnKey)}</TableCell>}
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

export default ListagemAtivosAdmin