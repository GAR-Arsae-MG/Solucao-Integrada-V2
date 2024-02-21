/* eslint-disable @typescript-eslint/no-unused-vars */
import { Accordion, AccordionItem, Card, CardBody, Tab, Tabs} from "@nextui-org/react";
import 'leaflet/dist/leaflet.css'
import Map from "../../components/ui/map";
import { useEffect, useState } from "react";
import { useGetAtivosOp, useGetUnits } from "../../../react-query/QueriesAndMutations";
import { getOpEtapaServico, getOpStatus, getOpTipoAtivo, getOpTipoInvestimento, getUnitSistemas, getUnitTipos } from "../../../django/api";
import toast, { Toaster } from "react-hot-toast";

function Painel() {
    
    const [sistemas, setSistemas] = useState([])
  const [selectedSistema, setSelectedSistema] = useState('')

  const [tipo, setTipo] = useState([])
  const [selectedTipo, setSelectedTipo] = useState('')

  const [tipoAtivoOp, setTipoAtivoOp] = useState([])
  const [selectedTipoAtivoOp, setSelectedTipoAtivoOp] = useState('')

  const [tipoInvestimentoOp, setTipoInvestimentoOp] = useState([])
  const [selectedTipoInvestimentoOp, setSelectedTipoInvestimentoOp] = useState('')

  const [statusOp, setStatusOp] = useState([])
  const [selectedStatusOp, setSelectedStatusOp] = useState('')

  const [etapaServicoOp, setEtapaServicoOp] = useState([])
  const [selectedEtapaServicoOp, setSelectedEtapaServicoOp] = useState('')

  const { isLoading: isUnidadePinLoading, isError: isUnidadePinError} = useGetUnits({tipo: selectedTipo, sistemas: selectedSistema})

  const { isLoading: isAtivoOpPinLoading, isError: isAtivoOpPinError} = useGetAtivosOp({tipo_ativo: selectedTipoAtivoOp, tipo_investimento: selectedTipoInvestimentoOp, status: selectedStatusOp, etapa_do_servico: selectedEtapaServicoOp})
    console.log(
        'parametros', 
        sistemas, tipo, tipoAtivoOp, tipoInvestimentoOp, statusOp, etapaServicoOp,
        setSelectedEtapaServicoOp, setSelectedSistema, setSelectedStatusOp, setSelectedTipo, setSelectedTipoAtivoOp, setSelectedTipoInvestimentoOp,
    )


  useEffect(() => {

    const fetchUnitySistema = async () => {
      const unitySistema = await getUnitSistemas()
      setSistemas(unitySistema)
    }
    fetchUnitySistema()

    const fetchUnityTipo = async () => {
      const unityTipo = await getUnitTipos()
      setTipo(unityTipo)
    }
    fetchUnityTipo()

    const fetchOpStatus = async () => {
      const opStatus = await getOpStatus()
      setStatusOp(opStatus)
    }
    fetchOpStatus()

    const fetchOpEtapaServico = async () => {
        const opEtapaServico = await getOpEtapaServico()
        setEtapaServicoOp(opEtapaServico)
    }
    fetchOpEtapaServico()

    const fetchOpTipoAtivo = async () => {
        const opTipoAtivo = await getOpTipoAtivo()
        setTipoAtivoOp(opTipoAtivo)
    }
    fetchOpTipoAtivo()

    const fetchOpTipoInvestimento = async () => {
        const opTipoInvestimento = await getOpTipoInvestimento()
        setTipoInvestimentoOp(opTipoInvestimento)
    }
    fetchOpTipoInvestimento() 
  }, [])
    

    return (
        <> 
            <Toaster />
            <div className="flex py-10">
                <div className="flex justify-between gap-4 p-4 flex-col w-[1200px] h-[1200px] scrollbar-hide ">
                    <Card className="max-w-full">
                        <CardBody className="overflow-auto scrollbar-hide">
                            <section id="map">
                                <p className=" flex justify-center font-bold ">Mapa Sanarj</p>
                                    <div>
                                        {isAtivoOpPinLoading && isUnidadePinLoading ? (
                                            toast.loading('Carregando Ativos e Unidades...', {
                                                position: 'top-right',
                                                duration: 4000,
                                            })
                                            ): isAtivoOpPinError && isUnidadePinError ? (
                                            toast.error('Falha ao carregar Ativos e Unidades', {
                                                position: 'bottom-right',
                                                duration: 4000,
                                            })
                                            ):(
                                                <Map />
                                            )
                                        }
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
            
        </>
    )
}

export default Painel