import { useForm } from "react-hook-form"
import {Tabs, Tab, Button, Card, CardBody,RadioGroup, Radio} from "@nextui-org/react";
import 'leaflet/dist/leaflet.css'
import TopNav from "../components/ui/TopNav";
import { EditIcon, PlusSquareIcon } from "@chakra-ui/icons";
import MapCadastro from "../components/MapCadatro";


function Painel() {
    
    type Painel = {
        selectedSistema: string,
        selectedTipoAtivo: string,
        selectedLocalidade: string,
        selectedLayer: number,
    }

    const {register,setValue, watch} = useForm<Painel>({
        defaultValues: {
            selectedLayer: 0
        }
    })

    function handleButtonESRI() {
        setValue('selectedLayer', 0)
    }
    
    function handleButtonOSM() {
        setValue('selectedLayer', 1)
    }

   const selectedLayerValue = watch('selectedLayer')

    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

    return (
        <>
            <TopNav />

            <div className="flex flex-col w-full items-center gap-4 p-4 min-h-screen from-purple-900 via-indigo-800 to-indigo-500 bg-gradient-to-tr">
                <Card className="max-w-full w-[750px] h-[680px]">
                    <CardBody className="overflow-auto scrollbar-hide">
                        <Tabs
                            fullWidth
                            size="md"
                            aria-label="Tab Filter"
                        >
                            <Tab key="Painel" title="Painel - Filtros">
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

                                <div className="flex justify-between gap-4 p-4">
                                    <Button
                                        color='primary'
                                        startContent={<PlusSquareIcon className={iconClasses} />}
                                        className='rounded-xl'
                                        onClick={handleButtonESRI}
                                    >
                                        ESRI(Satelite)
                                    </Button>

                                    <Button
                                        color='warning'
                                        startContent={<EditIcon className={iconClasses} />}
                                        className='rounded-xl'
                                        onClick={handleButtonOSM}
                                    >
                                        OSM(Cartográfico)
                                    </Button>

                                    <MapCadastro selectedLayer={selectedLayerValue} />
                                </div>
                            </Tab>
                        </Tabs>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export default Painel