
import TopNav from '../components/ui/TopNav'
import { Card, CardBody, Radio, RadioGroup, Tab, Tabs } from '@nextui-org/react'
import { useForm } from 'react-hook-form'

const ListagemAtivos = () => {

    type ListagemAtivosPage = {
        selectedSistema: string,
        selectedTipoAtivo: string,
        selectedLocalidade: string,
    }

    const {register} = useForm<ListagemAtivosPage>()

  return (
    <>
        <TopNav />

        <div className='flex flex-col w-full items-center gap-4 p-4 min-h-screen from-purple-900 via-indigo-800 to-indigo-500 bg-gradient-to-tr'>
            <Card className="max-w-full w-[750px] h-[680px]">
                <CardBody className="overflow-auto scrollbar-hide">
                    <Tabs
                        fullWidth
                        size="md"
                        aria-label="Tab Filter"
                    >
                        <Tab key="Painel" title="Listagem Ativos - Filtros">
                            <div className="flex flex-col gap-4 items-center">
                                <div className="flex justify-between gap-4">
                                    <RadioGroup
                                        isRequired
                                        label='Sistema'
                                        {...register('selectedSistema')}
                                    >
                                        <Radio value="agua">Água</Radio>
                                        <Radio value="esgoto">Esgoto</Radio>
                                        <Radio value="outro">Outro</Radio>
                                    </RadioGroup>

                                    <RadioGroup
                                        isRequired
                                        label="Tipo de Ativo"
                                        {...register('selectedTipoAtivo')}
                                    >
                                        <Radio value="visivel">Visível</Radio>
                                        <Radio value="enterrado">Enterrado</Radio>
                                    </RadioGroup>

                                    <RadioGroup
                                        isRequired
                                        label="Localidade"
                                        {...register('selectedLocalidade')}
                                    >
                                        <Radio value="localidade1">Localidade 1</Radio>
                                        <Radio value="localidade2">Localidade 2</Radio>
                                        <Radio value="localidade3">Localidade 3</Radio>
                                    </RadioGroup>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </CardBody>
            </Card>
        </div>
    </>
  )
}

export default ListagemAtivos