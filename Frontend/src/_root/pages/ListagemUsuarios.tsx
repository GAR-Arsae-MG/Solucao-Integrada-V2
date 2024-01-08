import React, { useCallback } from 'react'
import TopNav from '../../components/ui/TopNav'
import { Card, CardBody, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User } from '@nextui-org/react'
import { columns } from '../../components/data'
import { EyeIcon } from '../../components/ui/EyeIcon';
import { EditIcon } from '../../components/ui/EditIcon';
import { DeleteIcon } from '../../components/ui/DeleteIcon';
import { IGetUser } from '../../../types/types';
import { useGetUsers } from '../../../react-query/QueriesAndMutations';



function ListagemUsuarios() {
    const { data: users, isLoading, isError } = useGetUsers()

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
                        <Tooltip content='Detalhes'>
                            <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                                <EyeIcon />
                            </span>
                        </Tooltip>

                        <Tooltip content="Editar usuário">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon />
                            </span>
                        </Tooltip>

                        <Tooltip color="danger" content="Deletar Usuário">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            default: 
                return cellValue
        }
    }, [])

    if (isLoading) {
        return (
            <div className='flex items-center justify-center'>
                <Spinner />
                <p>Carregando...</p> 
            </div>
        )
    }

    if (isError) {
        return (
            <div className='flex items-center justify-center'>
                <p>Erro ao buscar os usuários.</p>
            </div>
        )
    }

  return (

    <>
        <TopNav />

        <div className='flex flex-col w-full items-center gap-4 p-4 min-h-screen from-purple-900 via-indigo-800 to-indigo-500 bg-gradient-to-tr'>
            <Card className='max-w-full w-[1200px]'>
                <CardBody className='overflow-auto scrollbar-hide'>
                    <div>
                        <p className='text-3xl font-bold text-gray-900 flex flex-col items-center text-center gap-4 p-4'>Listagem de Usuários</p>
                    </div>

                    <div className='flex flex-col'>
                        <div className='inline-flex justify-between gap-4' >
                            <Select
                                label='Agência'
                                color='primary'
                            >
                                <SelectItem
                                    key={'Arsae'}
                                >
                                    Arsae-MG
                                </SelectItem>

                                <SelectItem
                                    key={'Sanarj'}
                                >
                                    Sanarj
                                </SelectItem>
                            </Select>

                            <Select
                                label='Criado por'
                                color='success'
                            >
                                <SelectItem
                                    key={'Admin'}
                                >
                                    Admin
                                </SelectItem>
                            </Select>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <Card className='max-w-full w-[1200px] h-[680px]'>
                <CardBody className='overflow-auto scrollbar-hide'>
                    <Table aria-label='Tabela de usuários Dinâmica'>
                        <TableHeader columns={columns}>
                            {(column) => (
                                <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center': 'start'}>
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
                </CardBody>
            </Card>
        </div>
    </>
  )
}

export default ListagemUsuarios