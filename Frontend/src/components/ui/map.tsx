/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
} from "@react-google-maps/api";
import '../../assets/Map.css'
import Places from "../places"
import { Radio, RadioGroup } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import defaultMarker from '../../assets/location.png'
import ativo from '../../assets/ativo.png'

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

export default function Map() {

  const [selectedMarker, setSelectedMarker] = useState<any>([])

  const handleMarkerClick = (e) => {
    setSelectedMarker((current: any) => [...current, {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    }])
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

  const onLoad = useCallback((map) => (mapRef.current = map), [])

  return <div className="flex h-full">
    <div className="w-1/4 p-4 bg-black text-cyan-50 rounded-lg gap-4">
      <h1>Commute?</h1>
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
      </div>
    </div>

    <div className="w-4/5 h-full">
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerClassName="map-container"
        options={options}
        onLoad={onLoad}
        onClick={handleMarkerClick}
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
          
         {selectedMarker.map((marker: { lat: any; lng: any; }) => (
           <Marker 
            key={`${marker.lat}-${marker.lng}`} 
            position={{lat: marker.lat, lng: marker.lng}} 
            title="ativo"
            icon={ativo}
           />
         ))} 
      </GoogleMap>
    </div>
  </div>;
}