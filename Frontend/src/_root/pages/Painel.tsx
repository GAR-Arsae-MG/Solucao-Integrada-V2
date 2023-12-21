import { Accordion, AccordionItem, Card, CardBody, Tab, Tabs} from "@nextui-org/react";
import 'leaflet/dist/leaflet.css'
import TopNav from "../../components/ui/TopNav";
import Map from "../../components/ui/map";

function Painel() {
    
    

    return (
        <>
            <TopNav />

            <div className="flex flex-col w-full items-center gap-4 p-4 min-h-screen from-purple-900 via-indigo-800 to-indigo-500 bg-gradient-to-tr">
                <div className="flex py-10">
                    <div className="flex justify-between gap-4 p-4 flex-col w-[1200px] h-[1200px] scrollbar-hide ">
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

                    <Card className="max-w-full">
                        <CardBody>
                            <Tabs
                                fullWidth
                                size="md"
                            >
                                <Tab
                                    title='Instruções'
                                >
                                    <h1>para uso adequado do mapa, siga as instruções a seguir: </h1>

                                    <Accordion variant="shadow">
                                        <AccordionItem title='Zoom'>
                                            <p>
                                                Aperte Control enquanto utiliza a rolagem do mouse para ter o controle de zoom do mapa.
                                            </p>
                                        </AccordionItem>

                                        <AccordionItem title='Ativos'>
                                            <p>
                                                Clique no mapa com o botão esquerdo no mapa para criar um ativo.
                                            </p>

                                            <p>Todo ativo será um marcador com um simbolo de um pino. Para editar o nome do marcador, basta clicar em cima do mesmo.</p>
                                        </AccordionItem>

                                        <AccordionItem title='Localização'>
                                            <p>
                                                Ao lado tem um campo de entrada para poder pesquisar uma localidade. Para isso, basta digitar o nome da localidade e apertar Enter, e logo aparecerá um marcador especificado nessa localidade.
                                            </p>
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
            </div>
        </>
    )
}

export default Painel