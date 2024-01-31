/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGetUnits, useGetUnitsFilters } from "../../../react-query/QueriesAndMutations"
import { deleteExternalUnity, getUnitSistemas, getUnitTipos } from "../../../django/api"
import { IGetUnity } from "../../../types/types"
import { Button, Card, CardBody, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react"
import { EditIcon } from "../../components/ui/EditIcon"
import { DeleteIcon } from "../../components/ui/DeleteIcon"
import { MapPinIcon, MapPinned } from "lucide-react"
import { UnidadesColumns } from "../../constants/Columns"
import { ModalUnitiesEdit } from "../../components/shared/Modals"


const ListagemUnidades = () => {
  const [sistemas, setSistemas] = useState([])
  const [selectedSistema, setSelectedSistema] = useState('')

  const [tipo, setTipo] = useState([])
  const [selectedTipo, setSelectedTipo] = useState('')

  const [isUnityModalOpen, setIsUnityModalOpen] = useState(false)
  const [selectedUnity, setSelectedUnity] = useState<IGetUnity | null>(null)

  const navigate = useNavigate()

  const {data: Unidade, isLoading: isLoadingUnidade, isError: isUnidadeError, refetch: refetchSistemas} = useGetUnits({tipo: selectedTipo, sistemas: selectedSistema})
  const {refetch: refetchFilters} = useGetUnitsFilters({tipo: selectedTipo, sistemas: selectedSistema})

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

  const handleUnitySistemaChange = async (event: any) => {
    setSelectedSistema(event.target.value)
    await refetchFilters()
    refetchSistemas()
  }

  const handleUnityTipoChange = async (event: any) => {
    setSelectedTipo(event.target.value)
    await refetchFilters()
    refetchSistemas()
  }

  const clearFilters = async () => {
    setSelectedSistema('')
    setSelectedTipo('')
    await refetchSistemas()
    refetchFilters
  }

  const topContentUnidades = useMemo(() => {
    return (

      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="flex gap-3">
            <Tooltip content='Ir para lista de Ativos Operacionais'>
              <Button
                onClick={() => navigate('/listagemAtivos')}
              >
                <MapPinIcon />
              </Button>
            </Tooltip>

            <Tooltip content='Ir para lista de Ativos administrativos'>
              <Button
                onClick={() => navigate('/listagemAtivosAdministrativos')}
              >
                <MapPinned />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    )
  }, [navigate])

  const UnidadesRenderCell = useCallback((unidade: IGetUnity, columnKey: React.Key) => {
    let cellValue = unidade[columnKey as keyof IGetUnity]

    if (cellValue === undefined) {
      cellValue = 'N/A'
    }

    switch (columnKey) {
      case 'name':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-black text-sm capitalize">{unidade.nome}</p>
          </div>
        )

      case 'systems':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-black text-sm capitalize">{unidade.sistemas_display}</p>
          </div>
        )

      case 'type':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-black text-sm capitalize">{unidade.tipo_display}</p>
          </div>
        )
      
      case 'latitude':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-black text-sm capitalize">{unidade.latitude}</p>
          </div>
        )

      case 'longitude':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-black text-sm capitalize">{unidade.longitude}</p>
          </div>
        )

      case 'município':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-black text-sm capitalize">{unidade.Município}</p>
          </div>
        )

      case 'locality':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-black text-sm capitalize">{unidade.localidade}</p>
          </div>
        )

      case 'address':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-black text-sm capitalize">{unidade.Endereco}</p>
          </div>
        )

      case 'actions':
        return (
          <div className='relative flex items-center text-center justify-center gap-2'>

            <Tooltip content='Editar Ativo'>
              <Button 
                className='text-lg text-default-400 cursor-pointer active:opacity-50'
                onClick={() => {
                  setIsUnityModalOpen(true)
                  setSelectedUnity(unidade)
                }}
              >
                <EditIcon />
              </Button>
            </Tooltip>

            <Tooltip color='danger' content='Excluir Ativo'>
              <Button 
                className='text-lg text-red-600 cursor-pointer active:opacity-50'
                onClick={() => {deleteExternalUnity(unidade.id)}}
              >
                <DeleteIcon />
              </Button>
            </Tooltip>
          </div>
        )
      
      default:
        return cellValue
    }
  }, [])

  return (
    <>
      <Card className="max-w-full w-[1200px] h-[300px] bg-slate-900">
        <CardBody>
          <h1 className="text-3xl font-bold text-center text-white">Unidades Dinâmicas</h1>
          <p className="text-xl text-center text-red-900">Filtros</p>

          <div className="gap-4 p-4">
            <div className="flex flex-1 justify-between w-full p-4 gap-4">
              <Select
                label='Sistemas'
                onChange={handleUnitySistemaChange}
                color="primary"
                selectionMode="single"
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

              <Select
                label='Tipo'
                onChange={handleUnityTipoChange}
                color="secondary"
                selectionMode="single"
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
            </div>

            <div className="flex flex-1 w-full p-4 gap-4">
                  <Button
                   className="w-full"
                   onClick={clearFilters}
                   color="danger"
                  >
                    Limpar Filtros
                  </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      <ModalUnitiesEdit isOpen={isUnityModalOpen} onOpenChange={() => setIsUnityModalOpen(false)} unidade={selectedUnity}/>

      <Card className="max-w-full w-[1200px] h-[750px]">
        <CardBody className="overflow-auto scrollbar-hide">
          {isLoadingUnidade ? (
            <>
              <Spinner />
              <p className="text-center flex flex-1">Carregando, por favor espere...</p>
            </>
          ): isUnidadeError ? (
            <>
              <p className="text-center flex flex-1">Erro ao buscar Unidades!</p>
            </>
          ): (
            <Table
              aria-label="Tabela de Unidades Dinâmica"
              topContent={topContentUnidades}
            >
              <TableHeader
                columns={UnidadesColumns}
              >
                {(column) => (
                  <TableColumn
                    key={column.uid}
                    align={column.uid === 'actions' ? 'center':'start'}
                    className="text-center"
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>

              <TableBody
                items={Unidade}
                emptyContent={'Sem dados para mostrar abaixo!'}
              >
                {(item) => (
                  <TableRow
                    key={item.id}
                    className="text-center"
                  >
                    {(columnKey) => <TableCell>{UnidadesRenderCell(item, columnKey)}</TableCell>}
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

export default ListagemUnidades