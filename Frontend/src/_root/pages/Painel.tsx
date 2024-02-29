/* eslint-disable @typescript-eslint/no-unused-vars */
import { Accordion, AccordionItem, Card, CardBody, Tab, Tabs} from "@nextui-org/react";
import 'leaflet/dist/leaflet.css'
import Map from "../../components/ui/map";
import { Toaster } from "react-hot-toast";

function Painel() {
    

    return (
        <> 
            <Toaster />
            <div className="flex md:py-10 flex-col md:flex-row">
                <div className="flex md:gap-4 md:p-4 flex-col w-full md:w-[1200px] h-[1200px] scrollbar-hide ">
                    <Card className="max-w-full">
                        <CardBody className="overflow-auto scrollbar-hide">
                            <section id="map">
                                <p className=" flex justify-center font-bold ">Mapa Sanarj</p>
                                    <div>
                                        <Map />
                                    </div>
                            </section>
                        </CardBody>
                    </Card>
                </div>

                <Card className="max-w-full md:max-w-md mt-4 md:mt-0">
                    <CardBody>
                        <Tabs
                            fullWidth
                            size="md"
                        >
                            <Tab
                                title='Instruções'
                            >
                                <h1>para uso adequado do mapa, siga as instruções a seguir: </h1>

                                <Accordion 
                                    variant="shadow"
                                >
                                    <AccordionItem title='Zoom'>
                                        <p>
                                            Aperte Control enquanto utiliza a rolagem do mouse para ter o controle de zoom do mapa.
                                        </p>
                                    </AccordionItem>

                                    <AccordionItem title='Ativos'>
                                        <p>
                                            Clique no mapa com o botão esquerdo no mapa para criar um ativo.
                                        </p>

                                        <p>Todo ativo será um marcador com um simbolo de um pino. Para editar os dados do ativo, basta clicar em cima do mesmo.
                                            É importante que preencha todos os dados do ativo, para que possa ser salvo corretamente.
                                        </p>
                                    </AccordionItem>

                                    <AccordionItem
                                        title='Unidades'
                                    >
                                        <p>As unidades são bem semelhantes aos ativos. Clique no mapa com o botão esquerdo no mapa para criar uma unidade. Clique com o mesmo botão para editar os dados da unidade. Lembre-se de mudar o tipo de marcador na aba lateral antes de clicar no mapa.</p>
                                    </AccordionItem>

                                    <AccordionItem title='Tubulação'>
                                        <p>
                                            Clique no mapa com o botão direito no mapa para criar um polyline que represente a tubulação da localidade. Sempre que clicar no mapa com o botão direito, o polyline se extende.

                                            para criar um novo polyline basta apertar o botão Criar tubulação e clicar novamente no mapa.
                                        </p>

                                        <p>
                                            Você pode modificar a cor da tubulação para o que deseja, seja este de água ou esgoto. Basta apertar nos botões de cores para modificar a cor da tubulação, e em seguida clique em Criar Tubulação.
                                        </p>

                                        <p>
                                            Ao clicar em uma linha já existente com o botão direito, poderá ver e modificar as ademais informações para que possa ser editada.
                                        </p>
                                    </AccordionItem>
                                </Accordion>
                            </Tab>       
                        </Tabs>
                    </CardBody>
                </Card>
            </div>
            
        </>
    )
}

export default Painel