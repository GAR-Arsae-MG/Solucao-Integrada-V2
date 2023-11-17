
import TopNav from '../components/ui/TopNav';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import 'leaflet/dist/leaflet.css'
import MapCadastro from '../components/MapCadatro';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Tabs, Tab, Input, Button, Card, CardBody, Checkbox, CheckboxGroup} from "@nextui-org/react";
import { useForm, SubmitHandler } from 'react-hook-form';

function CadastroAtivo() {

  const {register, handleSubmit, watch, formState:{ errors } } = useForm<FormValues>()

  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

  const onSubmit:SubmitHandler<FormValues>  = async data => {
    console.log(data)
    Navigate('/painel')
  }

  const Navigate = useNavigate()

  const [AssetInfo, setAssetInfo] = useState({
    selectedSistema: '',
    selectedTipoAtivo: '',
    selectedLocalidade: '',
    nomeCampo: '',
    dataOp: '',
    dataObra: '',
    dataProj: '',
    proprietario: '',
    recebidoDoacao: '',
    vidaUtil: 0,
    valorOriginal: 0,
  })

  //useStates do Select

  const [nomeUnidade, setNomeUnidade] = useState([''])

  const [itemPrincipalBool, setItemPrincipalBool] = useState(["Sim", "Não"]);

  const [selectedTab, setSelectedTab] = useState("Cadastro de Ativo")

  const [especie, setEspecie] = useState<string[]>([])

  const [classe, setClasse] = useState([""])

  const [fase, setFase] = useState([""]);

  const [tipoInv, setTipoInv] = useState([""]);

  const [etapaServ, setEtapaServ] = useState([""]);

  const [situacao, setSituacao] = useState("");

  //UseStates para form

  const [step, setStep] = useState(1);

  const avancarParaProximoStep = () => {
    setStep(step + 1);
  };

  const voltarParaStepAnterior = () => {
    setStep(step - 1);
  };

  const [selectedLayer, setSelectedLayer] = useState(0);

  function handleButtonESRI() {
    setSelectedLayer(0);
  }

  function handleButtonOSM() {
      setSelectedLayer(1);
  }

  return(
    <>
      <TopNav />
      
      <div className='flex flex-col w-full items-center gap-4 p-4 min-h-screen from-purple-900 via-indigo-800 to-indigo-500 bg-gradient-to-br'>
        <Card className='max-w-full w-[750px] h-[680px]'>
          <CardBody className='overflow-auto scrollbar-hide' >
            <Tabs
              fullWidth
              size='md'
              aria-label='Tabs form'
              selectedKey={selectedTab}
              onSelectionChange={setSelectedTab}
            >
              {step === 1 && (
                <Tab key="Cadastro de Ativo" title="Cadastro de Ativo">
                  <form className='flex flex-col gap-4 items-center'>
                    <CheckboxGroup 
                      isRequired
                      label="Unidade de Vinculação"
                      placeholder='Nomeie a Unidade'
                      defaultValue={nomeUnidade}
                      onChange={(values) => {
                        if( Array.isArray(values)) {
                          setNomeUnidade(values)
                        }
                      }}
                    >
                      <Checkbox value="unidade1">Unidade Maria</Checkbox>
                      <Checkbox value="Unidade2">Unidade josé</Checkbox>
                    </CheckboxGroup>

                    <CheckboxGroup
                      label="Ativo principal?"
                      placeholder='Determina se o ativo é principal ou secundário'
                    >
                      <Checkbox
                        isRequired
                        type='checkbox'
                        value={itemPrincipalBool[0]}
                        onChange={(event) => setItemPrincipalBool(event.target.checked ? ['Sim']:['Não'])}
                      />
                    </CheckboxGroup>

                    <Input 
                      isRequired
                      label="Nome da Unidade"
                      placeholder='Insira como o ativo é chamado em campo'
                      value={AssetInfo.nomeCampo}
                      onChange={(event) => setAssetInfo({...AssetInfo,nomeCampo: event.target.value})}
                    />

                    <CheckboxGroup
                      isRequired
                      label="Espécie"
                      placeholder='Selecione a Espécie'
                      defaultValue={especie}
                      onChange={(values) => {
                        if( Array.isArray(values)) {
                          setEspecie(values)
                        }
                      }}
                    >
                      <Checkbox value="espécie1">Espécie 1</Checkbox>
                      <Checkbox value="espécie2">Espécie 2</Checkbox>
                    </CheckboxGroup>

                    <CheckboxGroup
                      isRequired
                      label="Classe"
                      placeholder='Selecione a Classe'
                      defaultValue={classe}
                      onChange={(values) => {
                        if(Array.isArray(values)) {
                          setClasse(values)
                        }
                      }}
                    >
                        <Checkbox value="classe1">Classe 1</Checkbox>
                        <Checkbox value="classe2">Classe 2</Checkbox>
                    </CheckboxGroup>

                    <CheckboxGroup
                      isRequired
                      label="Fase de Operação"
                      placeholder='Selecione a fase'
                      defaultValue={fase}
                      onChange={(values) => {
                        if(Array.isArray(values)) {
                          setFase(values)
                        }
                      }}
                    >
                      <Checkbox value="fase1">Fase 1</Checkbox>
                      <Checkbox value="fase2">Fase 2</Checkbox>
                    </CheckboxGroup>

                    <Button 
                      className='rounded-xl'
                      color='primary'
                      startContent={<ChevronRightIcon className={iconClasses} />}
                      onClick={avancarParaProximoStep}
                    >
                      Próximo
                    </Button>
                  </form>
                </Tab>
              )}
              
              {step === 2 && (
                <Tab key="Cadastro de Ativo - Parte 2" title="Cadastro de Ativo - Segunda Etapa">
                  <form className='flex flex-col gap-4 items-center'>
                    <Input 
                      isRequired
                      label="Data de início da Operação"
                      placeholder='Insira a data'
                      value={AssetInfo.dataOp}
                      type='date'
                      onChange={(event) => setAssetInfo({...AssetInfo,dataOp: event.target.value})}
                    />

                    <Input 
                       isRequired
                       label="Data de início da Obra"
                       placeholder='Insira a data'
                       value={AssetInfo.dataObra}
                       type='date'
                       onChange={(event) => setAssetInfo({...AssetInfo,dataObra: event.target.value})}
                    />

                    <Input 
                       isRequired
                       label="Data de início de Projeto"
                       placeholder='Insira a data'
                       value={AssetInfo.dataProj}
                       type='date'
                       onChange={(event) => setAssetInfo({...AssetInfo,dataProj: event.target.value})}
                    />

                    <div className='flex justify-between gap-96'>
                      <Button
                        color='secondary'
                        startContent={<ChevronLeftIcon className={iconClasses} />}
                        className='rounded-xl'
                        onClick={voltarParaStepAnterior}
                      >
                        Anterior
                      </Button>

                    <Button
                        color='primary'
                        startContent={<ChevronRightIcon className={iconClasses} />}
                        className='rounded-xl'
                        onClick={avancarParaProximoStep}
                      >
                        Próximo
                      </Button>
                    </div>
                    
                  </form>
                </Tab>
              )}

              {step === 3 && (
                <Tab  key="Cadastro de Ativo - Parte 3" title="Cadastro de Ativo - Terceira Etapa">
                  <form className='flex flex-col gap-4 items-center'>

                    <CheckboxGroup
                      isRequired
                      label="Tipo de Investimento"
                      placeholder='Explicite o investimento'
                      defaultValue={tipoInv}
                      onChange={(values) => {
                        if(Array.isArray(values)) {
                          setTipoInv(values)
                        }
                      }}
                    >
                      <Checkbox value="TipoInv1">Tipo de Investimento 1</Checkbox>
                      <Checkbox value="TipoInv2">Tipo de Investimento 2</Checkbox>
                    </CheckboxGroup>

                    <CheckboxGroup
                      isRequired
                      label="Etapa de Serviço"
                      defaultValue={etapaServ}
                      onChange={(values) => {
                        if(Array.isArray(values)) {
                          setEtapaServ(values)
                        }
                      }}
                    >
                      <Checkbox value="etapaServ1">Etapa 1</Checkbox>
                      <Checkbox value="etapaServ2">Etapa 2</Checkbox>
                    </CheckboxGroup>

                    <div className='flex justify-between gap-96'>
                      <Button
                        color='secondary'
                        startContent={<ChevronLeftIcon className={iconClasses} />}
                        className='rounded-xl'
                        onClick={voltarParaStepAnterior}
                      >
                        Anterior
                      </Button>

                      <Button
                        color='primary'
                        startContent={<ChevronRightIcon className={iconClasses} />}
                        className='rounded-xl'
                        onClick={avancarParaProximoStep}
                      >
                        Próximo
                      </Button>
                    </div>
                  </form>
                </Tab>
              )}
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default CadastroAtivo