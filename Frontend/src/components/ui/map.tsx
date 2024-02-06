/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo, useRef, createRef } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  Polyline,
  LoadScript
} from "@react-google-maps/api";
import '../../assets/Map.css'
import Places from "../places"
import { Button, Input, Radio, RadioGroup } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import defaultMarker from '../../assets/location.png'
import ativoPin from '../../assets/ativo.png'
import { LatLngLiteral, MapOptions, Tubulação, LatLngwithId, Painel, AtivoUnityData, IGetOpAtivo, IGetUnity } from "../../../types/types";

export default function Map({data}: AtivoUnityData) {

  //Markers Logic
  const [selectedAtivoOp, setSelectedAtivoOp] = useState<AtivoUnityData | null>(null)
  const [ativosOp, setAtivosOp] = useState<AtivoUnityData[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newMarker: AtivoUnityData = {
        tipo: "Ativo",
        tipoAtivo: "Visível",
        data: {
          id: '',
          nome_de_campo: `Ativo ${ativosOp.length + 1}`,
          tipo_ativo: '',
          classe: '',
          fase: '',
          tipo_investimento: '',
          etapa_do_servico: '',
          situacao_atual: '',
          proprietario: '',
          doacao: true,
          valor_original: 0,
          vida_util_reg_anos: 0,
          vida_util_reg_meses: 0,
          unidade: '',
          data_insercao: new Date(),
          data_projeto: new Date(),
          data_obra: new Date(),
          data_operacao: new Date(),
          criado_por: '',
          status: '',
          criado_em: new Date(),
          codigo: '',
          latitude: e.latLng.lat(),
          longitude: e.latLng.lng(),
          Município: '',
          localidade: '',
          Endereco: '',
          status_display: '',
          tipo_ativo_display: '',
          tipo_investimento_display: '',
          etapa_do_servico_display: ''
        }
      }
      setAtivosOp([...ativosOp, newMarker])
    }
  }

  const handleAtivoClick = (ativo: AtivoUnityData): void => {
    setSelectedAtivoOp(ativo)

    console.log(selectedAtivoOp)
    
    if ('nome_de_campo' in ativo.data) {
      setInputValue(ativo.data.nome_de_campo)
    }

    if ('nome' in ativo.data) {
      setInputValue(ativo.data.nome)
    }
  }

  const handleAtivoClose = () => {
    setSelectedAtivoOp(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    if (selectedAtivoOp && selectedAtivoOp.tipo === 'Ativo') {
      setAtivosOp((prevMarkers) => 
        prevMarkers.map(
          (marker) => 
            marker.data.id === selectedAtivoOp.data.id && selectedAtivoOp.tipo === 'Ativo' ? 
            {...marker, data: {...(marker.data as IGetOpAtivo), nome_de_campo: e.target.value}} as AtivoUnityData : marker
        )
      )
    }

    if (selectedAtivoOp && selectedAtivoOp.tipo === 'Unidade') {
      setAtivosOp((prevMarkers) => 
        prevMarkers.map(
          (marker) => 
            marker.data.id === selectedAtivoOp.data.id ? 
              {
                ...marker, 
                data: {
                  ...(marker.data as IGetUnity),
                  nome: e.target.value,
                }
              } as AtivoUnityData 
              : marker
        )
      )
    }
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


            <div>
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
            
            <div>

              <Button
                color="warning"
                onClick={handleCreatePolyline}
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
                      icon={ativoPin}
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
                        <p>ID: {selectedAtivoOp.data.id}</p>
                        <p>Tipo de marcador: {selectedAtivoOp.tipo}</p>
                        <p>Tipo Ativo: {selectedAtivoOp.tipoAtivo}</p>

                        <h2>Editar nome de Ativo</h2>
                        <Input 
                            placeholder="Nome do ativo"
                            value={inputValue}
                            onChange={handleInputChange}
                            type="text"
                        />

                        <Input 
                          label='Código do Ativo'
                          placeholder="Código do Ativo"
                          type="text"
                          
                        />
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