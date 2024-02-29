/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, CardBody, Input, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User } from '@nextui-org/react';
import React, { useCallback, useEffect, useState } from 'react';

import { deleteExternalUser, getFuncoes, getStaff } from '../../../django/api';
import { useGetUsers, useGetUsersFilters } from '../../../react-query/QueriesAndMutations';
import { IGetUser } from '../../../types/types';
import { columns } from '../../components/data';
import { DeleteIcon } from '../../components/ui/DeleteIcon';
import { EditIcon } from '../../components/ui/EditIcon';
import ModalUserEdit from '../../components/shared/Modals';

function ListagemUsuarios() {
    const [funcoes, setFuncoes] = useState([])
    const [selectedFuncao, setSelectedFuncao] = useState('')
    const [staff, setStaff] = useState([])
    const [selectedStaff, setSelectedStaff] = useState(false)
    const [selectedAgencia, setSelectedAgencia] = useState('')

    const [isUserModalOpen, setIsUserModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<IGetUser | null>(null)
    
    const { data: users, isLoading: isUserLoading, isError: isUserError, refetch: refetchUsers } = useGetUsers({funcao: selectedFuncao, is_staff: selectedStaff, agencia: selectedAgencia})
    
    const { refetch: refetchFilters } = useGetUsersFilters({funcao: selectedFuncao, is_staff: selectedStaff, agencia: selectedAgencia})

    useEffect(() => {
        const fetchFuncoes = async () => {
            const funcoes = await getFuncoes()
            setFuncoes(funcoes)
        }
        fetchFuncoes()

        const fetchStaff = async () => {
            const staff = await getStaff()
            setStaff(staff)
        }
        fetchStaff()
    }, [])

    const handleFuncoesChange = async (event: any) => {
        setSelectedFuncao(event.target.value)
        await refetchFilters()
        refetchUsers()
    }

    const handleStaffChange = async (event: any) => {
        setSelectedStaff(event.target.value)
        await refetchFilters()
        refetchUsers()
    }

    const handleAgenciaChange = async (event: any) => {
        setSelectedAgencia(event.target.value)
        await refetchFilters()
        refetchUsers()
    }

    const clearFilters = async () => {
        setSelectedFuncao('')
        setSelectedStaff(false)
        setSelectedAgencia('')
        await refetchUsers()
        refetchFilters()
    }

 const renderCell = useCallback((user:IGetUser , columnKey: React.Key) => {
        let cellValue = user[columnKey as keyof IGetUser]

        if (cellValue instanceof Date) {
            cellValue = cellValue.toLocaleString()
        }

        if (cellValue === undefined) {
            cellValue = 'N/A'
        }

        switch(columnKey) {
            case 'name':
                return(
                    <User
                        avatarProps={{radius:'lg', src: user.imagem}}
                        description={user.nome}
                        name={user.nome}
                    >
                        {user.nome}
                    </User>
                )

            case 'email':
                return(
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm'>{user.email}</p>
                    </div>
                );

            case 'role': 
                return (
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize'>{user.funcao_display}</p>
                    </div>
                );
            
            case 'agency': 
            return (
                <div className='flex flex-col '>
                    <p className='text-bold text-sm capitalize'>{user.agencia}</p>
                </div>
            );

            case 'criado_por': 
            return (
                <div className='flex flex-col '>
                    <p className='text-bold text-sm capitalize'>{user.criado_por}</p>
                </div>
            );

            case 'actions':
                return(
                    <div className='relative flex items-center gap-2'>

                        <Tooltip content="Editar usuário">
                            <Button 
                                className="text-lg text-success-800 cursor-pointer active:opacity-50"
                                onClick={() => {
                                    setIsUserModalOpen(true)
                                    setSelectedUser(user)
                                }}
                                
                            >
                                <EditIcon />
                            </Button>
                        </Tooltip>

                        <Tooltip color="danger" content="Deletar Usuário">
                            <Button 
                                className="text-lg text-danger cursor-pointer active:opacity-50"
                                onClick={() => deleteExternalUser(user!.id)}
                            >
                                <DeleteIcon />
                            </Button>
                        </Tooltip>
                    </div>
                );
            default: 
                return <div className='hidden sm:block'>{cellValue}</div>
        }
    }, [])

  return (

    <>

        <Card className='max-w-full w-[1200px] h-[300px] bg-slate-900'>
            <CardBody>
                <p className='text-3xl font-bold text-center text-gray-200'>Listagem de usuários</p>
                <p className='text-xl text-center text-red-900'>Filtros</p>

                <div className=' gap-4 p-4'>
                    <div className='flex flex-1 justify-between w-full p-4 gap-4'>
                        <Select
                            label='Função'
                            onChange={handleFuncoesChange}
                            color='primary'
                        >
                            {funcoes.map((funcao: string) => (
                                <SelectItem
                                    key={funcao.charAt(0).toUpperCase()}
                                    value={funcao.charAt(0).toUpperCase()}
                                >
                                    {funcao}
                                </SelectItem>
                            ))}
                        </Select>

                        <Select
                            label="Perfil Administrativo?"
                            onChange={handleStaffChange}
                            color='success'
                        >
                            {staff.map((staff: boolean) => (
                                <SelectItem
                                    key={staff.toString()}
                                    value={staff.toString()}
                                >
                                    {staff ? 'Sim': 'Não'}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>

                    <div className='flex flex-1 justify-between w-full p-4 gap-4'>
                        <Input 
                            label='Agencia'
                            onChange={handleAgenciaChange}
                            value={selectedAgencia}
                            placeholder='Escreva o nome completo da agência'
                        />

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

        <ModalUserEdit isOpen={isUserModalOpen} onOpenChange={() => setIsUserModalOpen(false)} usuario={selectedUser} />

        <Card className='max-w-full w-[1200px] h-[680px]'>
            <CardBody className='overflow-auto scrollbar-hide'>


                {isUserLoading ? (
                    <>
                        <Spinner />
                        <p>Carregando...</p>
                    </>
                ): isUserError ? (
                    <>
                        <p>Erro ao buscar os usuários.</p>
                    </>
                ): (
                    <Table aria-label='Tabela de usuários Dinâmica'>
                        <TableHeader columns={columns}>
                            {(column) => (
                                <TableColumn 
                                    key={column.uid} 
                                    align={column.uid === 'actions' ? 'center': 'start'}
                                >
                                    {column.name}
                                </TableColumn>
                            )}
                        </TableHeader>

                        <TableBody items={users}>
                            {(item) => (
                                <TableRow key={item.id}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
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

export default ListagemUsuarios