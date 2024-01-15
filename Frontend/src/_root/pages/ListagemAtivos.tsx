
import TopNav from '../../components/ui/TopNav'
import { Card, CardBody, Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Spinner } from '@nextui-org/react'
import {  AtivosOp } from '../../components/MapData'
import { useState } from 'react'
import { useGetAtivosOp } from '../../../react-query/QueriesAndMutations'
import { AtivosOpColumns } from '../../constants/Columns'

const ListagemAtivos = () => {
    const [tipoAtivoOp, setTipoAtivoOp] = useState('')
    const [tipoInvestimentoOp, setTipoInvestimentoOp] = useState('')
    const [statusOp, setStatusOp] = useState('')
    const [etapaServicoOp, setEtapaServicoOp] = useState('')

    const {data: ativoOp, isLoading: isAtivoOpLoading, iserror: isAtivoOpError, refetch: refetchAtivoOp} = useGetAtivosOp({tipo_ativo: tipoAtivoOp, tipo_investimento: tipoInvestimentoOp, status: statusOp, etapa_do_servico: etapaServicoOp})

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
                        <Table aria-label='Tabela de Ativos operacionais Dinâmica' selectionMode='multiple'>
                            <TableHeader columns={AtivosOpColumns}>
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