
import React, { useState, useMemo, useRef, createRef, useEffect } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  Polyline,
  LoadScript
} from "@react-google-maps/api";
import '../../assets/Map.css'
import Places from "../places"
import { Button, Input, Radio, RadioGroup, Select, SelectItem } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import defaultMarker from '../../assets/location.png'
import ativoPin from '../../assets/ativo.png'
import unidadePin from '../../assets/unities-pin.svg'
import { LatLngLiteral, MapOptions, Tubulação, LatLngwithId, Painel, AtivoUnityData, IGetOpAtivo, IGetUnity } from "../../../types/types";
import { getUnitSistemas, getUnitTipos, updateExternalAtivoOp, updateExternalUnity } from "../../../django/api";
import { useGetUnits } from "../../../react-query/QueriesAndMutations";

export default function Map() {

  const { register: registerOpAtivo, handleSubmit: handleSubmitOpAtivo } = useForm<IGetOpAtivo>()
  const { register: registerUnity, handleSubmit: handleSubmitUnity } = useForm<IGetUnity>()

  //Markers Logic
  const [selectedAtivoOp, setSelectedAtivoOp] = useState<AtivoUnityData | null>(null)
  const [ativosOp, setAtivosOp] = useState<AtivoUnityData[]>([])
  const [TipoMarcador, setTipoMarcador] = useState<'Ativo' | 'Unidade'>('Ativo');

  const [sistemas, setSistemas] = useState([])
  const [selectedSistema, setSelectedSistema] = useState('')

  const [tipo, setTipo] = useState([])
  const [selectedTipo, setSelectedTipo] = useState('')

  const {data: UnidadePin} = useGetUnits({tipo: selectedTipo, sistemas: selectedSistema})

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
  }, [])

  const handleSistemasChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectedSistema(event.target.value)
  }

  const handleTipoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectedTipo(event.target.value)
  }

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    console.log('handleMapClick chamado', e.latLng, TipoMarcador)

    function getNewId() {
      return idCounter.current++
    }

    if (e.latLng && TipoMarcador === 'Ativo') {
      const newMarker: AtivoUnityData = {
        tipo: "Ativo",
        tipoAtivo: "Visível",
        data: {
          id: selectedAtivoOp && 'id' in selectedAtivoOp.data ? selectedAtivoOp.data.id : getNewId().toString(),
          nome_de_campo: selectedAtivoOp && 'nome_de_campo' in selectedAtivoOp.data ? selectedAtivoOp.data.nome_de_campo : `Ativo ${ativosOp.length + 1}`,
          tipo_ativo: selectedAtivoOp && 'tipo_ativo' in selectedAtivoOp.data ? selectedAtivoOp.data.tipo_ativo : '',
          classe: selectedAtivoOp && 'classe' in selectedAtivoOp.data ? selectedAtivoOp.data.classe : '',
          fase: selectedAtivoOp && 'fase' in selectedAtivoOp.data ? selectedAtivoOp.data.fase : '',
          tipo_investimento: selectedAtivoOp && 'tipo_investimento' in selectedAtivoOp.data ? selectedAtivoOp.data.tipo_investimento : '',
          etapa_do_servico: selectedAtivoOp && 'etapa_do_servico' in selectedAtivoOp.data ? selectedAtivoOp.data.etapa_do_servico : '',
          situacao_atual: selectedAtivoOp && 'situacao_atual' in selectedAtivoOp.data ? selectedAtivoOp.data.situacao_atual : '',
          proprietario: selectedAtivoOp && 'proprietario' in selectedAtivoOp.data ? selectedAtivoOp.data.proprietario : '',
          doacao: selectedAtivoOp && 'doacao' in selectedAtivoOp.data ? selectedAtivoOp.data.doacao : false,
          valor_original:selectedAtivoOp && 'valor_original' in selectedAtivoOp.data ? selectedAtivoOp.data.valor_original : 0,
          vida_util_reg_anos:selectedAtivoOp && 'vida_util_reg_anos' in selectedAtivoOp.data ? selectedAtivoOp.data.vida_util_reg_anos : 0,
          vida_util_reg_meses:selectedAtivoOp && 'vida_util_reg_meses' in selectedAtivoOp.data ? selectedAtivoOp.data.vida_util_reg_meses : 0,
          unidade: selectedAtivoOp && 'unidade' in selectedAtivoOp.data ? selectedAtivoOp.data.unidade : '',
          data_insercao: selectedAtivoOp && 'data_insercao' in selectedAtivoOp.data ? selectedAtivoOp.data.data_insercao : new Date(),
          data_projeto: selectedAtivoOp && 'data_projeto' in selectedAtivoOp.data ? selectedAtivoOp.data.data_projeto : new Date(),
          data_obra: selectedAtivoOp && 'data_obra' in selectedAtivoOp.data ? selectedAtivoOp.data.data_obra : new Date(),
          data_operacao: selectedAtivoOp && 'data_operacao' in selectedAtivoOp.data ? selectedAtivoOp.data.data_operacao : new Date(),
          criado_por: selectedAtivoOp && 'criado_por' in selectedAtivoOp.data ? selectedAtivoOp.data.criado_por : '',
          status: selectedAtivoOp && 'status' in selectedAtivoOp.data ? selectedAtivoOp.data.status : '',
          criado_em: selectedAtivoOp && 'criado_em' in selectedAtivoOp.data ? selectedAtivoOp.data.criado_em : new Date(),
          codigo: selectedAtivoOp && 'codigo' in selectedAtivoOp.data ? selectedAtivoOp.data.codigo : '',
          latitude: selectedAtivoOp && 'latitude' in selectedAtivoOp.data ? selectedAtivoOp.data.latitude : e.latLng.lat(),
          longitude: selectedAtivoOp && 'longitude' in selectedAtivoOp.data ? selectedAtivoOp.data.longitude : e.latLng.lng(),
          Município: selectedAtivoOp && 'Município' in selectedAtivoOp.data ? selectedAtivoOp.data.Município : '',
          localidade: selectedAtivoOp && 'localidade' in selectedAtivoOp.data ? selectedAtivoOp.data.localidade : '',
          Endereco: selectedAtivoOp && 'Endereco' in selectedAtivoOp.data ? selectedAtivoOp.data.Endereco : '',
          status_display: selectedAtivoOp && 'status_display' in selectedAtivoOp.data ? selectedAtivoOp.data.status_display : '',
          tipo_ativo_display: selectedAtivoOp && 'tipo_ativo_display' in selectedAtivoOp.data ? selectedAtivoOp.data.tipo_ativo_display : '',
          tipo_investimento_display: selectedAtivoOp && 'tipo_investimento_display' in selectedAtivoOp.data ? selectedAtivoOp.data.tipo_investimento_display : '',
          etapa_do_servico_display: selectedAtivoOp && 'etapa_do_servico_display' in selectedAtivoOp.data ? selectedAtivoOp.data.etapa_do_servico_display : '',
        }
      }
      setAtivosOp([...ativosOp, newMarker])
    }

    if (e.latLng && TipoMarcador === 'Unidade') {
      const newMarker: AtivoUnityData = {
        tipo: "Unidade",
        tipoAtivo: "Visível",
        data: {
          id: selectedAtivoOp && 'id' in selectedAtivoOp.data ? selectedAtivoOp.data.id : getNewId().toString(),
          nome: selectedAtivoOp && 'nome' in selectedAtivoOp.data ? selectedAtivoOp.data.nome : `Unidade ${ativosOp.length + 1}`,
          sistemas: selectedAtivoOp && 'sistemas' in selectedAtivoOp.data ? selectedAtivoOp.data.sistemas : '',
          sistemas_display: selectedAtivoOp && 'sistemas_display' in selectedAtivoOp.data ? selectedAtivoOp.data.sistemas_display : '',
          tipo: selectedAtivoOp && 'tipo' in selectedAtivoOp.data ? selectedAtivoOp.data.tipo : '',
          tipo_display: selectedAtivoOp && 'tipo_display' in selectedAtivoOp.data ? selectedAtivoOp.data.tipo_display : '',
          latitude: selectedAtivoOp && 'latitude' in selectedAtivoOp.data ? selectedAtivoOp.data.latitude : e.latLng.lat(),
          longitude: selectedAtivoOp && 'longitude' in selectedAtivoOp.data ? selectedAtivoOp.data.longitude : e.latLng.lng(),
          Município: selectedAtivoOp && 'Município' in selectedAtivoOp.data ? selectedAtivoOp.data.Município : '',
          localidade: selectedAtivoOp && 'localidade' in selectedAtivoOp.data ? selectedAtivoOp.data.localidade : '',
          Endereco: selectedAtivoOp && 'Endereco' in selectedAtivoOp.data ? selectedAtivoOp.data.Endereco : '',
        }
      }
      setAtivosOp([...ativosOp, newMarker])
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
                  
                {ativosOp.map((ativo) => (
                  <Marker 
                      key={ativo.data.id}
                      position={{ lat: ativo.data.latitude, lng: ativo.data.longitude }}
                      onClick={() =>
                        handleAtivoClick(ativo) 
                      }
                      icon={ativo.tipo === 'Ativo' ? ativoPin : unidadePin}
                  />
                ))}

                {selectedAtivoOp && (
                  <InfoWindow
                    key={selectedAtivoOp.data.id}
                    position={{ lat: selectedAtivoOp.data.latitude, lng: selectedAtivoOp.data.longitude }}
                    onCloseClick={handleAtivoClose}
                  >
                      <div>
                        <h2>Informações gerais do Ativo</h2>
                        {selectedAtivoOp.tipo === 'Ativo' ? (
                          <>
                            <form
                              onSubmit={handleSubmitOpAtivo((formData: IGetOpAtivo) => {
                                updateExternalAtivoOp(selectedAtivoOp.data.id, formData);
                              })}

                              className="flex flex-col gap-2"
                            >
                              <p>ID: {selectedAtivoOp.data.id}</p>
                              <p>Tipo de marcador: {selectedAtivoOp.tipo}</p>
                              <p>Tipo Ativo: {selectedAtivoOp.tipoAtivo}</p>
      
                              <h2>Editar nome de Ativo</h2>
                              <Input
                                  {...registerOpAtivo("nome_de_campo")} 
                                  placeholder="Nome do ativo"
                                  label="Nome do Ativo"
                                  defaultValue={selectedAtivoOp ? selectedAtivoOp.data.nome_de_campo: ''}
                                  type="text"
                                  variant="underlined"
                              />
      
                              <Input
                                {...registerOpAtivo("codigo")} 
                                label='Código do Ativo'
                                placeholder="Código do Ativo"
                                type="text"
                                variant="underlined"
                              />
                            </form>
                          </>
                        ) : (
                          <>
                            <form
                              onSubmit={handleSubmitUnity((formData: IGetUnity) => {
                                updateExternalUnity(selectedAtivoOp.data.id, formData);
                              })}
                              className="flex flex-col gap-2"
                            >
                              <p>ID: {selectedAtivoOp.data.id}</p>
                              <p>Tipo de marcador: {selectedAtivoOp.tipo}</p>
                              <p>Tipo Ativo: {selectedAtivoOp.tipoAtivo}</p>

                              <Input 
                                {...registerUnity("nome")}
                                placeholder="Nome da Unidade"
                                label="Nome da Unidade"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.data.nome: ''}
                                type="text"
                                variant="underlined"
                              />

                              <Select
                                {...registerUnity("sistemas")}
                                label='Sistema'
                                onChange={handleSistemasChange}
                                placeholder="Selecione o sistema"
                                defaultSelectedKeys={selectedAtivoOp.data.sistemas}
                                variant="underlined"
                              >
                                {sistemas.map((sistema: string) => (
                                    <SelectItem
                                        key={sistema.charAt(0).toUpperCase()}
                                        value={sistema.charAt(0).toUpperCase()}
                                    >
                                        {sistema}
                                    </SelectItem>
                                ))}
                              </Select>
                              <p className="text-sm text-default-400">Sistema selecionado: {selectedSistema}</p>

                              <Select
                                {...registerUnity("tipo")}
                                label='Tipo'
                                onChange={handleTipoChange}
                                placeholder="Selecione o tipo"
                                defaultSelectedKeys={selectedAtivoOp.data.tipo}
                                variant="underlined"
                              >
                                {tipo.map((tipo: string) => (
                                    <SelectItem
                                        key={tipo.charAt(0).toUpperCase()}
                                        value={tipo.charAt(0).toUpperCase()}
                                    >
                                        {tipo}
                                    </SelectItem>
                                ))}
                              </Select>
                              <p className="text-sm text-default-400">Tipo selecionado: {selectedTipo}</p>

                              <Input 
                                {...registerUnity("Município")}
                                placeholder="Município"
                                label="Município"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.data.Município: ''}
                                type="text"
                                variant="underlined"
                              />

                              <Input 
                                {...registerUnity("localidade")}
                                placeholder="Localidade"
                                label="Localidade"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.data.localidade: ''}
                                type="text"
                                variant="underlined"
                              />

                              <Input 
                                {...registerUnity("Endereco")}
                                placeholder="Endereço"
                                label="Endereço"
                                defaultValue={selectedAtivoOp ? selectedAtivoOp.data.Endereco: ''}
                                type="text"
                                variant="underlined"
                              />
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