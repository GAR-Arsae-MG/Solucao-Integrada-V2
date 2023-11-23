import React, { useCallback } from 'react'
import TopNav from '../components/ui/TopNav'
import { Card, CardBody, Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User } from '@nextui-org/react'
import { columns, users } from '../components/data'
import { EyeIcon } from '../components/ui/EyeIcon';
import { EditIcon } from '../components/ui/editIcon';
import { DeleteIcon } from '../components/ui/deleteIcon';

type User = typeof users[0];

function ListagemUsuarios() {

 const renderCell = useCallback((user:User , columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof User]

        switch(columnKey) {
            case 'name':
                return(
                    <User
                        avatarProps={{radius:'lg', src: user.avatar}}
                        description={user.email}
                        name={cellValue}
                    >
                        {user.email}
                    </User>
                );

            case 'role': 
                return (
                    <div className='flex flex-col '>
                        <p className='text-bold text-sm capitalize'>{cellValue}</p>
                        <p className='text-bold text-sm capitalize text-default-400'>{user.time}</p>
                    </div>
                );

            case 'actions':
                return(
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
                );
            default: 
                return cellValue
        }
    }, [])

  return (

    <>
        <TopNav />

        <div className='flex flex-col w-full items-center gap-4 p-4 min-h-screen from-purple-900 via-indigo-800 to-indigo-500 bg-gradient-to-tr'>
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