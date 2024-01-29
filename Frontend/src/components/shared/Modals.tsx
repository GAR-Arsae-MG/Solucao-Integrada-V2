/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import { ModalUserEditProps } from "../../../types/types"
import { getFuncoes, updateExternalUser } from "../../../django/api"


const ModalUserEdit: React.FC<ModalUserEditProps> = ({isOpen, onOpenChange, usuario}) => {

    const [funcoes, setFuncoes] = useState([])
    const [selectedFuncao, setSelectedFuncao] = useState('')

    const handleFuncoesChange = async (event: any) => {
        setSelectedFuncao(event.target.value)
    }

    useEffect(() => {
        const fetchFuncoes = async () => {
            const funcoes = await getFuncoes()
            setFuncoes(funcoes)
        }
        fetchFuncoes()
    }, [])

  return (
    <>
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            backdrop="blur"
        >
          <ModalContent className="sm:max-w-[600px] flex flex-col items-start">
            {(onClose) => (
                <>
                     <ModalHeader className="w-full gap-2 items-center justify-center">
                        <h1 className="text-3xl text-center font-bold text-emerald-950">Editar Usuário</h1>
                    </ModalHeader>

                    <ModalBody>
                        <div className="grid gap-4 py-4 text-center items-center justify-center">
                            <div className="grid grid-cols-2 items-center gap-4">
                                <div className="grid items-center gap-4">
                                    <Input 
                                        autoFocus
                                        label='Nome'
                                        placeholder="Escreva o nome"
                                        variant="bordered"
                                        defaultValue={usuario ? usuario.nome: ''}
                                    />
                                </div>

                                <div className="grid  items-center gap-4">
                                    <Input
                                        label='Email'
                                        placeholder="Escreva o email"
                                        variant="bordered"
                                        defaultValue={usuario ? usuario.email: ''}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 items-center gap-4">
                                <div className="grid items-center gap-4">
                                    <Select
                                        label='Função'
                                        onChange={handleFuncoesChange}
                                        placeholder="Selecione a função"
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
                                    <p className="text-default-400 text-sm">Função selecionada: {selectedFuncao}</p>
                                </div>

                                <div className="grid items-center gap-4">
                                    <Input 
                                        label='Criado por'
                                        placeholder="Escreva por quem este Usuário foi criado"
                                        variant="bordered"
                                        defaultValue={usuario ? usuario.criado_por : ''}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 items-center gap-4">
                                <div className="grid items-center gap-4">
                                    <Input 
                                        label='Agência'
                                        placeholder="Escreva a agência"
                                        variant="bordered"
                                        defaultValue={usuario ? usuario.agencia : ''}
                                    />
                                </div>
                            </div>

                            <div className="items-center text-center gap-4">
                                <div className="items-center gap-4">
                                    <p>Modifique a Imagem</p>
                                </div>
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter className="w-full gap-4 p-4 items-center justify-center text-center">
                        <div className="flex flex-1 justify-between w-full p-4 gap-4">
                            <Button
                                color="success"
                                onPress={updateExternalUser}
                            >
                                Salvar
                            </Button>

                            <Button
                                onPress={onClose}
                                color="danger"
                            >
                                Cancelar
                            </Button>
                        </div>
                    </ModalFooter>
                </>
            )}
          </ModalContent>
        </Modal>

    </>
  )
}

export default ModalUserEdit