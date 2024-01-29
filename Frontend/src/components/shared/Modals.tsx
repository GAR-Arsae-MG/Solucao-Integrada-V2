import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@nextui-org/react"
import React from "react"
import { ModalUserEditProps } from "../../../types/types"


const ModalUserEdit: React.FC<ModalUserEditProps> = ({isOpen, onOpenChange}) => {

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
                                    />
                                </div>

                                <div className="grid  items-center gap-4">
                                    <Input
                                        label='Email'
                                        placeholder="Escreva o email"
                                        variant="bordered"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 items-center gap-4">
                                <div className="grid items-center gap-4">
                                    <Select
                                        label='Função'
                                        placeholder="Selecione a função"
                                    >
                                        <SelectItem>

                                        </SelectItem>
                                    </Select>
                                </div>

                                <div className="grid items-center gap-4">
                                    <Input 
                                        label='Criado por'
                                        placeholder="Escreva por quem este Usuário foi criado"
                                        variant="bordered"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 items-center gap-4">
                                <div className="grid items-center gap-4">
                                    <Input 
                                        label='Agência'
                                        placeholder="Escreva a agência"
                                        variant="bordered"
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