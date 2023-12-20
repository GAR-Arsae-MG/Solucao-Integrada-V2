/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo, useRef } from "react";
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
import ativo from '../../assets/ativo.png'


type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

export default function Map() {

  interface  Marker {
    id: string
    name: string
    position: LatLngLiteral
  }

  //Markers Logic
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null)
  const [markers, setMarkers] = useState<Marker[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newMarker: Marker = {
        id: new Date().toISOString(),
        position: e.latLng.toJSON(),
        name: `Ativo ${markers.length + 1}`,
      }
      setMarkers([...markers, newMarker])
    }
  }

  const handleMarkerClick = (marker: Marker): void => {
    setSelectedMarker(marker)
    setInputValue(marker.name)
  }

  const handleMarkerClose = () => {
    setSelectedMarker(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    if (selectedMarker) {
      setMarkers((prevMarkers) => 
        prevMarkers.map(
          (marker) => 
            marker.id === selectedMarker.id ? {...marker, name: e.target.value} : marker
        )
      )
    }
  }

  //Polyline Logic

  interface Polyline {
    id: string,
    path: LatLngLiteral[]
    type: 'agua' | 'esgoto',
    creationDate: Date,
    updateDate: Date,
    itemCode: string,
    length: string,
    diameter: string,
    InitialPoint: LatLngLiteral
  }

  const [selectedPolyline, setSelectedPolyline] = useState<Polyline | null>(null)
  const [polylines, setPolylines] = useState<Polyline[]>([])
  const [inputPolyline, setInputPolyline] = useState({
    itemCode: '',
    diameter: '',
    type: '',
    creationDate: new Date(),
    updateDate: new Date(),
  })

  function calculateLength(path: LatLngLiteral[]): number {
    let totalLength = 1

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

  let idCounter = 0
  const handleMapRightClick = (e: google.maps.MapMouseEvent) => {

    function getNewId() {
      return idCounter++
    }

    if (e.latLng) {
      const path = [e.latLng.toJSON()]

      const newPolyline: Polyline = {
        id: getNewId().toString(),
        path: path,
        type: 'agua',
        creationDate: new Date('2000-01-01'),
        updateDate: new Date('2000-01-01'),
        itemCode:  `Tubulação ${polylines.length + 1}`,
        length: `${calculateLength(path)} metros`,
        diameter: `50 milímetros`,
        InitialPoint: path[0]
      }
      setPolylines([...polylines, newPolyline])
    }
  }

  const handlePolylineClick = (polyline: Polyline): void => {
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

  //Map Logic

  type Painel = {
    selectedSistema: string,
    selectedTipoAtivo: string,
    selectedLocalidade: string,   
  }

  const {register} = useForm<Painel>()

  const [office, setOffice] = useState<LatLngLiteral>()

  const mapRef = useRef<GoogleMap>()

  const center = useMemo<LatLngLiteral>(() => ({ 
    lat: -19.947128,
    lng: -45.165717
  }), [])
  
  const options = useMemo<MapOptions>(() => ({
    mapId: 'd78eeda2034f463a',
    clickableIcons: false,
  }), [])

  return <div className="flex h-full">
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
            //onClick={}
          >
            Água
          </Button>
          <Button 
            color="success"
            //onClick={() => ()}
          >
            Esgoto
          </Button>
        </div>
        
        <div>
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
            
          {markers.map((marker) => (
            <Marker 
                key={marker.id}
                position={marker.position}
                onClick={() => handleMarkerClick(marker)}
                icon={ativo}
            />
          ))}

          {selectedMarker && (
            <InfoWindow
              key={selectedMarker.id}
              position={selectedMarker.position}
              onCloseClick={handleMarkerClose}
            >
                <div>
                  <h2>Editar nome de Ativo</h2>
                  <Input 
                      placeholder="Nome do ativo"
                      value={inputValue}
                      onChange={handleInputChange}
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
                  <p>Tamanho: {selectedPolyline.length} m</p>

                  <h2>Editar Informações</h2>

                  <Input 
                    placeholder="Nome da Tubulação"
                    value={inputPolyline.itemCode}
                    onChange={handleInputChangePolyline}
                    type="text"
                  />

                  <Input 
                    placeholder="Diâmetro da Tubulação"
                    value={inputPolyline.diameter}
                    onChange={handleInputChangePolyline}
                    type="text" 
                  />

                  <Input 
                    placeholder="Data de Criação"
                    value={new Date(inputPolyline.creationDate).toLocaleDateString('pt-BR')}
                    onChange={handleInputChangePolyline}
                    type="date"
                  />

                  <Input 
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
  </div>;
}