
import React, { useState, useMemo, useRef, createRef, useEffect } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  Polyline,
  LoadScript
} from "@react-google-maps/api";
import toast, { Toaster } from 'react-hot-toast';
import '../../assets/Map.css'
import Places from "../places"
import { Button, Input, Radio, RadioGroup, Select, SelectItem } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import defaultMarker from '../../assets/location.png'
import ativoPin from '../../assets/ativo.png'
import unidadePin from '../../assets/unities-pin.svg'
import { LatLngLiteral, MapOptions, Tubulação, LatLngwithId, Painel, AtivoUnityData, IGetOpAtivo, IGetUnity, AtivoOp, Unidade } from "../../../types/types";
import { getOpEtapaServico, getOpStatus, getOpTipoAtivo, getOpTipoInvestimento, getUnitSistemas, getUnitTipos, updateExternalAtivoOp, updateExternalUnity } from "../../../django/api";
import { useGetAtivosOp, useGetUnits } from "../../../react-query/QueriesAndMutations";
import CheckboxDonation from "./Checkbox";

export default function Map() {

  const { register: registerOpAtivo, handleSubmit: handleSubmitOpAtivo } = useForm<IGetOpAtivo>()
  const { register: registerUnity, handleSubmit: handleSubmitUnity } = useForm<IGetUnity>()

  //Markers Logic
  const [selectedAtivoOp, setSelectedAtivoOp] = useState<AtivoUnityData | null>(null)
  const [ativosOpPin, SetAtivosOpPin] = useState<AtivoOp[]>([])
  const [unidadesPin, setUnidadesPin] = useState<Unidade[]>([])
  const [TipoMarcador, setTipoMarcador] = useState<'Ativo' | 'Unidade'>('Ativo');

  const [maxId, setMaxId] = useState(0);

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

  const {data: UnidadePin, isLoading: isUnidadePinLoading, isError: isUnidadePinError} = useGetUnits({tipo: selectedTipo, sistemas: selectedSistema})

  const {data: AtivoOpPin, isLoading: isAtivoOpPinLoading, isError: isAtivoOpPinError} = useGetAtivosOp({tipo_ativo: selectedTipoAtivoOp, tipo_investimento: selectedTipoInvestimentoOp, status: selectedStatusOp, etapa_do_servico: selectedEtapaServicoOp})

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

  const handleSistemasChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectedSistema(event.target.value)
  }

  const handleTipoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectedTipo(event.target.value)
  }

  const handleOpStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatusOp(event.target.value)
  }

const handleOpEtapaServicoChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEtapaServicoOp(event.target.value)
  }

const handleOpTipoAtivoChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTipoAtivoOp(event.target.value)
  }

const handleOpTipoInvestimentoChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTipoInvestimentoOp(event.target.value)
  }

  useEffect(() => {
    if (AtivoOpPin && UnidadePin) {
      const newMaxId = Math.max(...AtivoOpPin.map(ativo => parseInt(ativo.id)), ...UnidadePin.map(unidade => parseInt(unidade.id)));
      setMaxId(newMaxId);
    }
  }, [AtivoOpPin, UnidadePin]);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    console.log('handleMapClick chamado', e.latLng, TipoMarcador)


    function getNewId() {
      return maxId + 1
    }

    if (e.latLng && TipoMarcador === 'Ativo') {
      const newMarker: AtivoOp = {
        ...selectedAtivoOp,
        tipoMarcador: "Ativo",
        tipoAtivo: "Visível",
        id: selectedAtivoOp && 'id' in selectedAtivoOp ? selectedAtivoOp.id : getNewId().toString(),
        latitude: e.latLng.lat(),
        longitude: e.latLng.lng(),
        nome_de_campo: selectedAtivoOp && 'nome_de_campo' in selectedAtivoOp ? selectedAtivoOp.nome_de_campo : '',
        codigo: selectedAtivoOp && 'codigo' in selectedAtivoOp ? selectedAtivoOp.codigo : '',
        classe: selectedAtivoOp && 'classe' in selectedAtivoOp ? selectedAtivoOp.classe : '',
        criado_em: selectedAtivoOp && 'criado_em' in selectedAtivoOp ? selectedAtivoOp.criado_em : new Date(),
        criado_por: selectedAtivoOp && 'criado_por' in selectedAtivoOp ? selectedAtivoOp.criado_por : '',
        data_insercao: selectedAtivoOp && 'data_insercao' in selectedAtivoOp ? selectedAtivoOp.data_insercao : new Date(),
        data_obra: selectedAtivoOp && 'data_obra' in selectedAtivoOp ? selectedAtivoOp.data_obra : new Date(),
        data_operacao: selectedAtivoOp && 'data_operacao' in selectedAtivoOp ? selectedAtivoOp.data_operacao : new Date(),
        data_projeto: selectedAtivoOp && 'data_projeto' in selectedAtivoOp ? selectedAtivoOp.data_projeto : new Date(),
        fase: selectedAtivoOp && 'fase' in selectedAtivoOp ? selectedAtivoOp.fase : '',
        doacao: selectedAtivoOp && 'doacao' in selectedAtivoOp ? selectedAtivoOp.doacao : false,
        etapa_do_servico: selectedAtivoOp && 'etapa_do_servico' in selectedAtivoOp ? selectedAtivoOp.etapa_do_servico : '',
        localidade: selectedAtivoOp && 'localidade' in selectedAtivoOp ? selectedAtivoOp.localidade : '',
        Município: selectedAtivoOp && 'Município' in selectedAtivoOp ? selectedAtivoOp.Município : '',
        Endereco: selectedAtivoOp && 'Endereco' in selectedAtivoOp ? selectedAtivoOp.Endereco : '',
        proprietario: selectedAtivoOp && 'proprietario' in selectedAtivoOp ? selectedAtivoOp.proprietario : '',
        situacao_atual: selectedAtivoOp && 'situacao_atual' in selectedAtivoOp ? selectedAtivoOp.situacao_atual : '',
        status: selectedAtivoOp && 'status' in selectedAtivoOp ? selectedAtivoOp.status : '',
        tipo_ativo: selectedAtivoOp && 'tipo_ativo' in selectedAtivoOp ? selectedAtivoOp.tipo_ativo : '',
        unidade: selectedAtivoOp && 'unidade' in selectedAtivoOp ? selectedAtivoOp.unidade : '',
        tipo_investimento: selectedAtivoOp && 'tipo_investimento' in selectedAtivoOp ? selectedAtivoOp.tipo_investimento : '',
        valor_original: selectedAtivoOp && 'valor_original' in selectedAtivoOp ? selectedAtivoOp.valor_original : 0,
        vida_util_reg_anos: selectedAtivoOp && 'vida_util_reg_anos' in selectedAtivoOp ? selectedAtivoOp.vida_util_reg_anos : 0,
        vida_util_reg_meses: selectedAtivoOp && 'vida_util_reg_meses' in selectedAtivoOp ? selectedAtivoOp.vida_util_reg_meses : 0,
        etapa_do_servico_display: selectedAtivoOp && 'etapa_do_servico_display' in selectedAtivoOp ? (typeof selectedAtivoOp.etapa_do_servico_display === 'string' ? {key: selectedAtivoOp.etapa_do_servico_display, value: selectedAtivoOp.etapa_do_servico_display} : selectedAtivoOp.etapa_do_servico_display) : {key: '', value: ''},
        status_display: selectedAtivoOp && 'status_display' in selectedAtivoOp ? (typeof selectedAtivoOp.status_display === 'string' ? {key: selectedAtivoOp.status_display, value: selectedAtivoOp.status_display} : selectedAtivoOp.status_display) : {key: '', value: ''},
        tipo_ativo_display: selectedAtivoOp && 'tipo_ativo_display' in selectedAtivoOp ? (typeof selectedAtivoOp.tipo_ativo_display === 'string' ? {key: selectedAtivoOp.tipo_ativo_display, value: selectedAtivoOp.tipo_ativo_display} : selectedAtivoOp.tipo_ativo_display) : {key: '', value: ''},
        tipo_investimento_display: selectedAtivoOp && 'tipo_investimento_display' in selectedAtivoOp ? (typeof selectedAtivoOp.tipo_investimento_display === 'string' ? {key: selectedAtivoOp.tipo_investimento_display, value: selectedAtivoOp.tipo_investimento_display} : selectedAtivoOp.tipo_investimento_display) : {key: '', value: ''},
      }
      if (AtivoOpPin!.length > 0) {
        SetAtivosOpPin([...(AtivoOpPin as AtivoOp[]), newMarker]);
      } else {
        SetAtivosOpPin([newMarker]);
      }
    }

    if (e.latLng && TipoMarcador === 'Unidade') {
      const newMarker: Unidade = {
        ...selectedAtivoOp,
        tipoMarcador: "Unidade",
        tipoAtivo: "Visível",
        id: selectedAtivoOp && 'id' in selectedAtivoOp ? selectedAtivoOp.id : getNewId().toString(),
        latitude: e.latLng.lat(),
        longitude: e.latLng.lng(),
        nome: selectedAtivoOp && 'nome' in selectedAtivoOp ? selectedAtivoOp.nome : '',
        sistemas: selectedAtivoOp && 'sistemas' in selectedAtivoOp ? selectedAtivoOp.sistemas : '',
        tipo: selectedAtivoOp && 'tipo' in selectedAtivoOp ? selectedAtivoOp.tipo : '',
        Município: selectedAtivoOp && 'Município' in selectedAtivoOp ? selectedAtivoOp.Município : '',
        localidade: selectedAtivoOp && 'localidade' in selectedAtivoOp ? selectedAtivoOp.localidade : '',
        Endereco: selectedAtivoOp && 'Endereco' in selectedAtivoOp ? selectedAtivoOp.Endereco : '',
        sistemas_display: selectedAtivoOp && 'sistemas_display' in selectedAtivoOp ? (typeof selectedAtivoOp.sistemas_display === 'string' ? {key: selectedAtivoOp.sistemas_display, value: selectedAtivoOp.sistemas_display}: selectedAtivoOp.sistemas_display) : {key: '', value: ''},
        tipo_display: selectedAtivoOp && 'tipo_display' in selectedAtivoOp ? (typeof selectedAtivoOp.tipo_display === 'string' ? {key: selectedAtivoOp.tipo_display, value: selectedAtivoOp.tipo_display}: selectedAtivoOp.tipo_display) : {key: '', value: ''},

      } 
      if (UnidadePin && UnidadePin!.length > 0) {
        setUnidadesPin([...(UnidadePin as Unidade[]), newMarker]);
      } else {
        setUnidadesPin([newMarker]);
      }
    }
  }

  const handleAtivoClick = (ativo: AtivoUnityData): void => {
    setSelectedAtivoOp(ativo)

    console.log(selectedAtivoOp)
  }

  const handleAtivoClose = () => {
    setSelectedAtivoOp(null)
  }

  //Polyline Logic

  const [nextPolylineType, setNextPolylineType] = useState<'agua' | 'esgoto'>('agua')

  const [selectedPolyline, setSelectedPolyline] = useState<Tubulação | null>(null)
  const [polylines, setPolylines] = useState<Tubulação[]>([])
  const [isNewPolyline, setIsNewPolyline] = useState(false)
  const [inputPolyline, setInputPolyline] = useState({
    itemCode: '',
    diameter: '',
    type: '',
    creationDate: new Date(),
    updateDate: new Date(),
  })

  function calculateLength(path: LatLngLiteral[]): number {
    let totalLength = 0

    for (let i = 1; i < path.length; i++) {
      const currentPoint = path[i]
      const previousPoint = path[i - 1]
      totalLength += google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(currentPoint),
        new google.maps.LatLng(previousPoint)
      )
    }
    return totalLength
  }

  const idCounter = useRef(1)

  const createPolyline = (path: LatLngLiteral[]): Tubulação => {

    function getNewId() {
      return idCounter.current++
    }

    return {
      id: getNewId().toString(),
      path: path,
      type: nextPolylineType,
      tipoAtivo: 'Enterrado',
      creationDate: new Date('2000-01-01'),
      updateDate: new Date('2000-01-01'),
      itemCode:  `Tubulação ${polylines.length + 1}`,
      length: `${calculateLength(path)} metros`,
      diameter: `50 milímetros`,
      InitialPoint: path[0]
    }
  }

  const handleCreatePolyline = () => {
    setIsNewPolyline(true)
  }

  const handleMapRightClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newPoint: LatLngwithId = {...e.latLng.toJSON(), id: ''}
      let path = []
      let newPolyline

      if (polylines.length > 0 && !isNewPolyline) {
        const lastPolyline = polylines[polylines.length - 1]
        newPoint.id = lastPolyline.id
        
        if (lastPolyline.id === newPoint.id) {
          lastPolyline.path.push(newPoint)
          newPolyline = lastPolyline
        } else {
          path = [newPoint]
          newPolyline = createPolyline(path)
        }
      } else {
        path = [newPoint]
        newPolyline = createPolyline(path)
        setIsNewPolyline(false)
      }
      setPolylines([...polylines, newPolyline])
    }
    console.log(polylines)
  }

  const handlePolylineClick = (polyline: Tubulação): void => {
    setSelectedPolyline(polyline)
    setInputPolyline({
      itemCode: polyline.itemCode,
      diameter: polyline.diameter,
      type: polyline.type,
      creationDate: polyline.creationDate,
      updateDate: polyline.updateDate,
    })
  }

  const handlePolylineClose = () => {
    setSelectedPolyline(null)
  }

  const handleInputChangePolyline = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPolyline({
      ...inputPolyline,
      [e.target.name]: e.target.value
    })
    if (selectedPolyline) {
      setPolylines((prevPolylines) => 
        prevPolylines.map(
          (polyline) => 
            polyline.id === selectedPolyline.id ? {...polyline, [e.target.name]: e.target.value} : polyline
        )
      )
    }
  }

  const handleTypeChange = (type: 'agua' | 'esgoto') => {
    setNextPolylineType(type)
  }

  //Map Logic

  const {register} = useForm<Painel>()

  const [office, setOffice] = useState<LatLngLiteral>()

  const mapRef = createRef<GoogleMap>()

  const center = useMemo<LatLngLiteral>(() => ({ 
    lat: -19.947128,
    lng: -45.165717
  }), [])
  
  const options = useMemo<MapOptions>(() => ({
    mapId: 'd78eeda2034f463a',
    clickableIcons: false,
  }), [])

  return (
      <>
        <Toaster />
        <div className="flex h-full">
          <div className="w-1/4 p-4 bg-black text-cyan-50 rounded-lg gap-4">
          <h1>Painel - Filtros</h1>
          <Places setOffice={(position) => {
            setOffice(position)
            mapRef.current?.panTo(position)
          }} />

          <div className=" p-10 gap-10 bg-white rounded-lg ">
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


            <div className="gap-4 p-2 justify-between flex">
              <Button 
                color="primary"
                onClick={() => handleTypeChange('agua')}
              >
                Água
              </Button>
              <Button 
                color="success"
                onClick={() => handleTypeChange('esgoto')}
              >
                Esgoto
              </Button>
            </div>
            
            <div className="gap-4 p-2">

              <Button
                color="warning"
                onClick={handleCreatePolyline}
                className="mb-4"
              >
                Adicionar Polylines
              </Button>

              <Button 
                color="danger"
                //onClick={() => ()}
              >
                Deletar Polylines
              </Button>
            </div>

            <div className="items-center p-4 gap-4 w-full">
              <Button
                className="mb-4"
                color="primary"
                onClick={() => setTipoMarcador('Ativo')}
              >
                Marcador de Ativos
              </Button>

              <Button
                color="secondary"
                onClick={() => setTipoMarcador('Unidade')}
              >
                Marcador de Unidades
              </Button>
            </div>
          </div>
        </div>

        <div className="w-4/5 h-full">
            <LoadScript
              googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
              libraries={["geometry", "places"]}
            >
              <GoogleMap
                zoom={15}
                center={center}
                mapContainerClassName="map-container"
                options={options}
                onClick={handleMapClick}
                onRightClick={handleMapRightClick}
                ref={mapRef}

              >
                {office && (
                  <>
                    <Marker 
                      position={office} 
                      icon={defaultMarker} 
                      title="location"
                    />
                  </>
                )}

                {isAtivoOpPinLoading ? (
                  toast.loading('Carregando Ativos...', {
                    position: 'top-right',
                    duration: 4000,
                  })
                ): isAtivoOpPinError ? (
                  toast.error('Falha ao carregar Ativos', {
                    position: 'top-right',
                    duration: 4000,
                  })
                ):(
                  ativosOpPin.map((ativoOp) => (
                    <Marker 
                      key={ativoOp.id}
                      position={{ lat: ativoOp.latitude, lng: ativoOp.longitude }}
                      onClick={() => handleAtivoClick(ativoOp)}
                      icon={ativoPin}
                    />
                  ))
                )}

                {isUnidadePinLoading ? (
                  toast.loading('Carregando Unidades...', {
                    position: 'top-right',
                    duration: 4000,
                  })
                ): isUnidadePinError ? (
                  toast.error('Falha ao carregar Unidades', {
                    position: 'top-right',
                    duration: 4000,
                  })
                ): (
                  unidadesPin.map((unidade) => (
                    <Marker 
                      key={unidade.id}
                      position={{ lat: unidade.latitude, lng: unidade.longitude }}
                      onClick={() => handleAtivoClick(unidade)}
                      icon={unidadePin}
                    />
                  ))
                )
                }

                {selectedAtivoOp && (
                  <InfoWindow
                    key={selectedAtivoOp.id}
                    position={{ lat: selectedAtivoOp.latitude, lng: selectedAtivoOp.longitude }}
                    onCloseClick={handleAtivoClose}
                  >
                      <div>
                        <h2>Informações gerais do Ativo</h2>
                        {selectedAtivoOp.tipoMarcador === 'Ativo' ? (
                          <>
                            <form
                              onSubmit={handleSubmitOpAtivo((formData: IGetOpAtivo) => {
                                updateExternalAtivoOp(selectedAtivoOp.id, formData);
                              })}

                              className="flex flex-col gap-2"
                            >
                              <p>ID: {selectedAtivoOp.id}</p>
                              <p>Tipo de marcador: {selectedAtivoOp.tipoMarcador}</p>
                              <p>Tipo Ativo: {selectedAtivoOp.tipoAtivo}</p>
      
                              <h2>Editar nome de Ativo</h2>
                              <Input
                                  {...registerOpAtivo("nome_de_campo")} 
                                  placeholder="Nome do ativo"
                                  label="Nome do Ativo"
                                  defaultValue={selectedAtivoOp ? selectedAtivoOp.nome_de_campo: ''}
                                  type="text"
                                  variant="underlined"
                              />
      
                              <Input
                                {...registerOpAtivo("codigo")} 
                                label='Código do Ativo'
                                placeholder="Código do Ativo"
                                type="text"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.codigo: ''}
                                variant="underlined"
                              />

                              <Select
                                {...registerOpAtivo("tipo_ativo")}
                                label="Tipo de Ativo"
                                placeholder="Selecione o Tipo de Ativo"
                                onChange={handleOpTipoAtivoChange}
                                defaultSelectedKeys={selectedAtivoOp ? selectedAtivoOp.tipo_ativo : ''}
                              >
                                {tipoAtivoOp.map((tipoAtivoOp: {key: string, value: string}) => (
                                    <SelectItem
                                        key={tipoAtivoOp.key}
                                        value={tipoAtivoOp.key}
                                    >
                                        {tipoAtivoOp.value}
                                    </SelectItem>
                                ))}
                              </Select>
                              <p>Tipo de ativo selecionado: {selectedTipoAtivoOp}</p>

                              <Input 
                                {...registerOpAtivo("classe")}
                                label="Classe"
                                placeholder="Escreva a Classe do ativo"
                                variant="bordered"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.classe : ''}
                              />

                              <Input 
                                {...registerOpAtivo("fase")}
                                label="Fase"
                                placeholder="Escreva a Fase do ativo"
                                variant="bordered"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.fase : ''}
                              />

                              <Select
                                {...registerOpAtivo("tipo_investimento")}
                                label="Tipo de Investimento"
                                placeholder="Selecione o Tipo de Investimento"
                                onChange={handleOpTipoInvestimentoChange}
                                defaultSelectedKeys={selectedAtivoOp ? selectedAtivoOp.tipo_investimento : ''}
                              >
                                {tipoInvestimentoOp.map((tipoInvestimentoOp: {key: string, value: string}) => (
                                    <SelectItem
                                        key={tipoInvestimentoOp.key}
                                        value={tipoInvestimentoOp.key}
                                    >
                                        {tipoInvestimentoOp.value}
                                    </SelectItem>
                                ))}
                              </Select>

                              <p className="text-sm text-default-400">Tipo de investimento selecionado: {selectedTipoInvestimentoOp}</p>

                              <Select
                                {...registerOpAtivo("etapa_do_servico")}
                                label="Etapa do Serviço"
                                placeholder="Selecione a Etapa do Serviço"
                                onChange={handleOpEtapaServicoChange}
                                defaultSelectedKeys={selectedAtivoOp ? selectedAtivoOp.etapa_do_servico : ''}
                              >
                                {etapaServicoOp.map((etapasServicoOp: {key: string, value: string}) => (
                                    <SelectItem
                                        key={etapasServicoOp.key}
                                        value={etapasServicoOp.key}
                                    >
                                        {etapasServicoOp.value}
                                    </SelectItem>
                                ))}
                              </Select>

                              <p className="text-sm text-default-400">Etapa do Serviço selecionado: {selectedEtapaServicoOp}</p>

                              <Input 
                                {...registerOpAtivo("situacao_atual")}
                                label="Situação Atual"
                                placeholder="Escreva a Situação Atual"
                                variant="bordered"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.situacao_atual : ''}
                              />

                              <Input 
                                {...registerOpAtivo("proprietario")}
                                label="Proprietário"
                                placeholder="Escreva o Proprietário"
                                variant="bordered"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.proprietario : ''}
                              />

                              <p>Doação?</p>

                              <CheckboxDonation 
                                  {...registerOpAtivo("doacao")}
                              />

                              <Input 
                                {...registerOpAtivo("valor_original")}
                                label="Valor Original"
                                placeholder="Escreva o Valor Original"
                                variant="bordered"
                                type="number"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.valor_original.toString() : ''}
                              />

                              <Input 
                                {...registerOpAtivo("vida_util_reg_anos")}
                                label="Vida Útil (Anos)"
                                placeholder="Escreva a Vida Útil (Anos)"
                                variant="bordered"
                                type="number"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.vida_util_reg_anos.toString() : ''}
                              />

                              <Input 
                                {...registerOpAtivo("vida_util_reg_meses")}
                                label="Vida Útil (Meses)"
                                placeholder="Escreva a Vida Útil (Meses)"
                                variant="bordered"
                                type="number"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.vida_util_reg_meses.toString() : ''}
                              />

                              <Input 
                                {...registerOpAtivo("unidade")}
                                label="Unidade"
                                placeholder="Escreva a unidade"
                                variant="bordered"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.unidade : ''}
                              />

                              <Input 
                                {...registerOpAtivo("data_insercao")}
                                label="Data de inserção"
                                placeholder="Escreva a Data de Inserção"
                                variant="bordered"
                                type="date"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.data_insercao.toString() : ''}
                              />

                              <Input 
                                {...registerOpAtivo("data_obra")}
                                label="Data da Obra"
                                placeholder="Escreva a Data da Obra"
                                variant="bordered"
                                type="date"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.data_obra.toString() : ''}
                              />

                              <Input 
                                {...registerOpAtivo("data_operacao")}
                                label="Data de Operação"
                                placeholder="Escreva a Data de Operação"
                                variant="bordered"
                                type="date"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.data_operacao.toString() : ''}
                              />

                              <Input 
                                {...registerOpAtivo("data_projeto")}
                                label="Data de Inserção"
                                placeholder="Escreva a Data do Projeto"
                                variant="bordered"
                                type="date"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.data_projeto.toString() : ''}
                              />

                              <Input 
                                {...registerOpAtivo("criado_por")}
                                label="Criado Por"
                                placeholder="Escreva por quem foi criado o ativo"
                                variant="bordered"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.criado_por : ''}
                              />

                              <Input 
                                {...registerOpAtivo("criado_em")}
                                label="Criado Em"
                                placeholder="Escreva quando foi criado o ativo"
                                variant="bordered"
                                type="date"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.criado_em.toString() : ''}
                              />

                              <Select
                                {...registerOpAtivo("status")}
                                label="Status"
                                placeholder="Selecione o Status"
                                onChange={handleOpStatusChange}
                                variant="bordered"
                                defaultSelectedKeys={selectedAtivoOp ? selectedAtivoOp.status: ''}
                              >
                                {statusOp.map((status: {key: string, value: string}) => (
                                    <SelectItem 
                                        key={status.key} 
                                        value={status.key}
                                    >
                                        {status.value}
                                    </SelectItem>
                                ))}
                              </Select>

                              <p className="text-sm text-default-400">Status: {selectedStatusOp}</p>

                              <Input 
                                {...registerOpAtivo("codigo")}
                                label="Código"
                                placeholder="Escreva o Código do ativo"
                                variant="bordered"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.codigo : ''}
                              />

                              <Input 
                                {...registerOpAtivo("latitude")}
                                label="Latitude"
                                placeholder="Escreva a Latitude"
                                variant="bordered"
                                type="number"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.latitude.toString() : ''}
                              />

                              <Input 
                                {...registerOpAtivo("longitude")}
                                label="Longitude"
                                placeholder="Escreva a Longitude"
                                variant="bordered"
                                type="number"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.longitude.toString() : ''}
                              />

                              <Input 
                                {...registerOpAtivo("Município")}
                                label="Município"
                                placeholder="Escreva o Município"
                                variant="bordered"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.Município : ''}
                              />

                              <Input 
                                {...registerOpAtivo("localidade")}
                                label="Localidade"
                                placeholder="Escreva a Localidade"
                                variant="bordered"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.localidade : ''}
                              />

                              <Input 
                                {...registerOpAtivo("Endereco")}
                                label="Endereço"
                                placeholder="Escreva o Endereço"
                                variant="bordered"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.Endereco : ''}
                              />

                              <Button
                                color="success"
                                type="submit"
                                className="w-full"
                              >
                                Salvar
                              </Button> 
                            </form>
                          </>
                        ) : (
                          <>
                            <form
                              onSubmit={handleSubmitUnity((formData: IGetUnity) => {
                                updateExternalUnity(selectedAtivoOp.id, formData);
                              })}
                              className="flex flex-col gap-2"
                            >
                              <p>ID: {selectedAtivoOp.id}</p>
                              <p>Tipo de marcador: {selectedAtivoOp.tipoMarcador}</p>
                              <p>Tipo Ativo: {selectedAtivoOp.tipoAtivo}</p>

                              <Input 
                                {...registerUnity("nome")}
                                placeholder="Nome da Unidade"
                                label="Nome da Unidade"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.nome: ''}
                                type="text"
                                variant="underlined"
                              />

                              <Select
                                {...registerUnity("sistemas")}
                                label='Sistema'
                                onChange={handleSistemasChange}
                                placeholder="Selecione o sistema"
                                defaultSelectedKeys={selectedAtivoOp.sistemas}
                                variant="underlined"
                              >
                                {sistemas.map((sistema: {key: string, value: string}) => (
                                    <SelectItem
                                        key={sistema.key}
                                        value={sistema.key}
                                    >
                                        {sistema.value}
                                    </SelectItem>
                                ))}
                              </Select>
                              <p className="text-sm text-default-400">Sistema selecionado: {selectedSistema}</p>

                              <Select
                                {...registerUnity("tipo")}
                                label='Tipo'
                                onChange={handleTipoChange}
                                placeholder="Selecione o tipo"
                                defaultSelectedKeys={selectedAtivoOp.tipo}
                                variant="underlined"
                              >
                                {tipo.map((tipo: {key: string, value: string}) => (
                                    <SelectItem
                                        key={tipo.key}
                                        value={tipo.key}
                                    >
                                        {tipo.value}
                                    </SelectItem>
                                ))}
                              </Select>
                              <p className="text-sm text-default-400">Tipo selecionado: {selectedTipo}</p>

                              <Input
                                {...registerUnity("latitude")} 
                                label="Latitude"
                                placeholder="Escreva a latitude"
                                type="number"
                                variant="bordered"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.latitude.toString() : ''}
                              />

                              <Input
                                {...registerUnity("longitude")} 
                                label="Longitude"
                                placeholder="Escreva a longitude"
                                type="number"
                                variant="bordered"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.longitude.toString() : ''}
                              />

                              <Input 
                                {...registerUnity("Município")}
                                placeholder="Município"
                                label="Município"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.Município: ''}
                                type="text"
                                variant="underlined"
                              />

                              <Input 
                                {...registerUnity("localidade")}
                                placeholder="Localidade"
                                label="Localidade"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.localidade: ''}
                                type="text"
                                variant="underlined"
                              />

                              <Input 
                                {...registerUnity("Endereco")}
                                placeholder="Endereço"
                                label="Endereço"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.Endereco: ''}
                                type="text"
                                variant="underlined"
                              />

                              <Button
                                color="success"
                                type="submit"
                              >
                                Salvar
                              </Button>
                            </form>
                          </>
                        )}
                      </div>
                  </InfoWindow>
                )}

                {polylines.map((polyline) =>
                  (
                    <Polyline 
                      key={polyline.id}
                      path={polyline.path}
                      options={{
                        strokeColor: polyline.type === 'agua' ? '#0E5386' : '#3A6324',
                        editable: true,
                        draggable: true,
                        visible: true,
                      }}
                      onRightClick={() => handlePolylineClick(polyline)}
                      //onDblClick={() => handlePolylineDoubleClick(polyline.id, polyline.Initial)}
                    />
                  ))
                  }

                {selectedPolyline && (
                    <InfoWindow
                      position={selectedPolyline.InitialPoint}
                      onCloseClick={handlePolylineClose}
                    >
                      <div>
                        <h2>Informações gerais do Polyline</h2>
                        <p>ID: {selectedPolyline.id}</p>
                        <p>Tipo: {selectedPolyline.type}</p>
                        <p>Tamanho: {selectedPolyline.length}</p>

                        <h2>Editar Informações</h2>

                        <Input 
                          name="itemCode"
                          label="Nome da Tubulação"
                          placeholder="Nome da Tubulação"
                          value={inputPolyline.itemCode}
                          onChange={handleInputChangePolyline}
                          type="text"
                        />

                        <Input
                          name="diameter"
                          label="Diâmetro da Tubulação" 
                          placeholder="Diâmetro da Tubulação"
                          value={inputPolyline.diameter}
                          onChange={handleInputChangePolyline}
                          type="text" 
                        />

                        <Input 
                          name="creationDate"
                          label="Data de Criação"
                          placeholder="Data de Criação"
                          value={new Date(inputPolyline.creationDate).toLocaleDateString('pt-BR')}
                          onChange={handleInputChangePolyline}
                          type="date"
                        />

                        <Input 
                          name="updateDate"
                          label="Data de Atualização"
                          placeholder="Data de Atualização"
                          value={new Date(inputPolyline.updateDate).toLocaleTimeString('pt-BR')}
                          onChange={handleInputChangePolyline}
                          type="date"
                        />

                      </div>
                    </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </>
    )
}