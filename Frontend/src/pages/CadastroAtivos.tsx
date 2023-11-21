
import TopNav from '../components/ui/TopNav';
import { ChevronRightIcon, ChevronLeftIcon, PlusSquareIcon, CheckIcon, EditIcon } from '@chakra-ui/icons';
import 'leaflet/dist/leaflet.css'
import MapCadastro from '../components/MapCadatro';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Tabs, Tab, Input, Button, Card, CardBody, Divider, RadioGroup, Radio} from "@nextui-org/react";
import { useForm, SubmitHandler } from 'react-hook-form';

function CadastroAtivo() {

  type CadastroAtivoForm = {
    nomeCampo: string,
    nomeUnidade: string,
    especie: string,
    classe: string,
    fase: string,
    dataOp: number,
    dataObra: number,
    dataProj: number,
    proprietario: string,
    tipoInv: string,
    etapaServ: string,
    recebidoDoacao: number,
    vidaUtil: number,
    situacao: string,
    selectedSistema: string,
    selectedTipoAtivo: string,
    valorOriginal: number,
    itemPrincipalBool: boolean,
    selectedLocalidade: string,
  }

  const {register,handleSubmit, formState:{ errors } } = useForm<CadastroAtivoForm>()

  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

  const Navigate = useNavigate()

  const onSubmit:SubmitHandler<CadastroAtivoForm>  = async data => {
    alert(JSON.stringify(data));
    console.log(data)
    Navigate('/painel')
  }

  //useStates do Select

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
            >
              {step === 1 && (
                <Tab key="Cadastro de Ativo" title="Cadastro de Ativo">
                  <form className='flex flex-col gap-4 items-center' onSubmit={handleSubmit(onSubmit)}>
                    <RadioGroup 
                      isRequired
                      label="Unidade de Vinculação"
                      placeholder='Nomeie a Unidade'
                      name='nomeUnidade'
                    >
                      <Radio value="unidade1" {...register('nomeUnidade')}>Unidade Maria</Radio>
                      <Radio value="Unidade2" {...register('nomeUnidade')}>Unidade josé</Radio>
                    </RadioGroup>

                    <RadioGroup
                      label="Ativo principal?"
                      placeholder='Determina se o ativo é principal ou secundário'
                    >
                      <Radio
                       {...register('itemPrincipalBool')}
                        value='true'
                      />
                    </RadioGroup>

                    <Input 
                      isRequired
                      label="Nome da Unidade"
                      placeholder='Insira como o ativo é chamado em campo'
                      {...register('nomeCampo')}
                    />

                    <RadioGroup
                      isRequired
                      label="Espécie"
                      placeholder='Selecione a Espécie'
                      {...register('especie')}
                    >
                      <Radio value="espécie1">Espécie 1</Radio>
                      <Radio value="espécie2">Espécie 2</Radio>
                    </RadioGroup>

                    <RadioGroup
                      isRequired
                      label="Classe"
                      placeholder='Selecione a Classe'
                     {...register('classe')}
                    >
                        <Radio value="classe1">Classe 1</Radio>
                        <Radio value="classe2">Classe 2</Radio>
                    </RadioGroup>

                    <RadioGroup
                      isRequired
                      label="Fase de Operação"
                      placeholder='Selecione a fase'
                      {...register('fase')}
                    >
                      <Radio value="fase1">Fase 1</Radio>
                      <Radio value="fase2">Fase 2</Radio>
                    </RadioGroup>

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
                      {...register('dataOp')}
                      type='date'
                    />

                    <Input 
                       isRequired
                       label="Data de início da Obra"
                       placeholder='Insira a data'
                       {...register('dataObra')}
                       type='date'
                    />

                    <Input 
                       isRequired
                       label="Data de início de Projeto"
                       placeholder='Insira a data'
                       {...register('dataProj')}
                       type='date'
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

                    <RadioGroup
                      isRequired
                      label="Tipo de Investimento"
                      placeholder='Explicite o investimento'
                     {...register('tipoInv')}
                    >
                      <Radio value="TipoInv1">Tipo de Investimento 1</Radio>
                      <Radio value="TipoInv2">Tipo de Investimento 2</Radio>
                    </RadioGroup>

                    <RadioGroup
                      isRequired
                      label="Etapa de Serviço"
                      {...register('etapaServ')}
                    >
                      <Radio value="etapaServ1">Etapa 1</Radio>
                      <Radio value="etapaServ2">Etapa 2</Radio>
                    </RadioGroup>

                    <RadioGroup
                      isRequired
                      label="Situação do item"
                      {...register('situacao')}
                    >
                      <Radio value="Situacao1">Situação 1</Radio>
                      <Radio value="situacao2">Situação 2</Radio>
                    </RadioGroup>

                    <Input 
                      isRequired
                      label="Proprietário"
                      placeholder='Nome do Proprietário'
                      {...register('proprietario')}
                    />

                    <Input 
                      isRequired
                      label="Recebido em Doação"
                      placeholder='insira a quantia'
                      className='border-spacing-2'
                      type='number'
                      {...register('recebidoDoacao')}
                    />

                    <Input 
                      isRequired
                      label="Vida Util Regulatória"
                      placeholder='Quanto tempo de vida util o ativo tem em meses'
                      type='number'
                      {...register('vidaUtil')}
                    />

                    <Input 
                      isRequired
                      label="Valor Original"
                      placeholder='Informe o Valor Original do Ativo'
                      type='number'
                      {...register('valorOriginal')}
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

              {step === 4 && (
                <Tab
                  key="Cadastro de Ativo - Parte 4" title="Cadastro de Ativo - Quarta Etapa"
                >
                  <form
                    className='flex flex-col gap-60 items-center p-10'
                  >
                    <div>
                      <h1>filtros</h1>
                      <Divider className='my-4' />
                      <div className='flex justify-between gap-4'>
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

                    <div className='flex justify-between gap-4 p-4 '>
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

                      <Button
                        color='success'
                        startContent={<CheckIcon className={iconClasses} />}
                        className='rounded-xl'
                        onClick={handleSubmit(onSubmit)}
                      >
                        Cadastrar
                      </Button>
                    </div>

                    <MapCadastro selectedLayer={selectedLayer} />
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