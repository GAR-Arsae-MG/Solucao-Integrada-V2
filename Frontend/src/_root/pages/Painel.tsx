import { useForm } from "react-hook-form"
import {Tabs, Tab, Button, Card, CardBody,RadioGroup, Radio} from "@nextui-org/react";
import 'leaflet/dist/leaflet.css'
import TopNav from "../../components/ui/TopNav";
import { EditIcon, PlusSquareIcon } from "@chakra-ui/icons";
import MapCadastro from "../../components/MapCadatro";
import { useState } from "react";


function Painel() {
    
    type Painel = {
        selectedSistema: string,
        selectedTipoAtivo: string,
        selectedLocalidade: string,
    }

    const {register} = useForm<Painel>()

    const [selectedLayer, setSelectedLayer] = useState(0);

    function handleButtonESRI() {
        setSelectedLayer(0);
      }
    
      function handleButtonOSM() {
          setSelectedLayer(1);
      }

    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

    return (
        <>
            <TopNav />

            <div className="flex flex-col w-full items-center gap-4 p-4 min-h-screen from-purple-900 via-indigo-800 to-indigo-500 bg-gradient-to-tr">
                <div className="flex flex-row  py-10">
                    <Card className="h-48 w-[800px] ">
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
                                    <section className="flex items-center gap-4 py-1 justify-between">
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
                                </section>
                                </Tab>
                            </Tabs>
                        </CardBody>
                    </Card>

                    <div className="flex justify-between gap-4 p-4 flex-col w-[600px] h-[600px] scrollbar-hide ">
                        <Card className="max-w-full">
                            <CardBody className="overflow-auto scrollbar-hide">
                                <section className="">
                                    <MapCadastro  selectedLayer={selectedLayer} />
                                </section>
                            </CardBody>
                        </Card>
                    </div>
                </div>
                

                
            </div>


        </>
    )
}

export default Painel