/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo, useRef, useEffect } from "react";
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

  interface Polyline {
    id: string,
    path: LatLngLiteral[]
    type: string
    creationDate: Date,
    updateDate: Date,
    itemCode: string,
    diameter: string,
    InitialPoint: LatLngLiteral
  }

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
            //onClick={() => ()}
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

          {
            (
              <Polyline 
                //key={}
                //path={}
                options={{
                  //strokeColor: polyline.type === 'agua' ? '#0E5386' : '#3A6324',
                  editable: true,
                  draggable: true,
                  visible: true,
                }}
                //onRightClick={() => polylineClickHandler(polyline.id)}
                //onDblClick={() => handlePolylineDoubleClick(polyline.id, polyline.Initial)}
              />
            )
            }

          { /*(
              <InfoWindow
                position={selectedPolyline.path[0]}
                onCloseClick={() => setSelectedPolyline(null)}
              >
                <div>
                  <p>ID: {selectedPolyline.id}</p>
                  <p>Data de criação: {selectedPolyline.creationDate.toLocaleString()}</p>
                  <p>Data de atualização: {selectedPolyline.updateDate.toLocaleString()}</p>
                  <p>Item Code: {selectedPolyline.itemCode}</p>
                  <p>Diâmetro: {selectedPolyline.diameter} m</p>
                  <p>Extensão: {selectedPolyline.path.length} m</p>
                </div>
              </InfoWindow>
          )*/}
        </GoogleMap>
      </LoadScript>
    </div>
  </div>;
}