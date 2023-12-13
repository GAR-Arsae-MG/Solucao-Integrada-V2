/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo, useRef } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  Polyline
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
  }

  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null)
  const [markers, setMarkers] = useState<Marker[]>([])
  const [inputValue, setInputValue] = useState('')
  const [polylines, setPolylines] = useState<Polyline[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [selectedType, setSelectedType] = useState('agua')
  const [selectedPolyline, setSelectedPolyline] = useState<Polyline | null>(null)
  const [firstPolylineToLink, setFirstPolylineToLink] = useState(null)

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

  const handleMapRightClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setPolylines((currentPolylines) => {
        const lastPolyline = currentPolylines[currentPolylines.length - 1]

        if (isDragging) {
          const newPoint = e.latLng!.toJSON()
          const lastPoint = lastPolyline.path[lastPolyline.path.length - 1]

          const distance = google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(lastPoint),
            new google.maps.LatLng(newPoint)
          )

          if (distance > 1) {
            const newPolyline = {...lastPolyline, path: [...lastPolyline.path, newPoint]}

            return [...currentPolylines.slice(0, -1), newPolyline]
          } else {
            return currentPolylines
          }
        } else {
          const newPolyline: Polyline = {
            id: new Date().toISOString(),
            path: [e.latLng!.toJSON()],
            type: selectedType
          }
          return [...currentPolylines, newPolyline]
        }
      })
      setIsDragging(true)
    }
    
  }

  const handleMapMouseMove = (e: google.maps.MapMouseEvent) => {
    if (isDragging && e.latLng) {
      setPolylines((currentPolylines) => {

        const lastPolyline = currentPolylines[currentPolylines.length - 1]
        lastPolyline.path.push(e.latLng!.toJSON())
        return [...currentPolylines.slice(0, -1), lastPolyline]
      })
    }
  }

  const selectedPolylineHandler = (e: google.maps.MapMouseEvent) => {
    if (selectedPolyline) {
      setSelectedPolyline({
        ...selectedPolyline,
        path: [...selectedPolyline.path, e.latLng!.toJSON()]
      })
    }
  }

  const removeUnconnectedPolylines = () => {
    setPolylines((currentPolylines) => {
      return currentPolylines.filter((polyline, _index, self) => {
        return self.some((otherPolyline) => {
          if (polyline === otherPolyline) {
            return false
          }

          const polylineStart = polyline.path[0]
          const polylineEnd = polyline.path[polyline.path.length - 1]
          const otherPolylineStart = otherPolyline.path[0]
          const otherPolylineEnd = otherPolyline.path[otherPolyline.path.length - 1]

          return (
            polylineStart === otherPolylineStart ||
            polylineStart === otherPolylineEnd ||
            polylineEnd === otherPolylineStart ||
            polylineEnd === otherPolylineEnd
          )
        })
      })
    })
  }

  const interlinkPolylines = (id1: string, id2: string) => {
    setPolylines((currentPolylines) => {

      const polyline1 = currentPolylines.find((polyline) => polyline.id === id1)
      const polyline2 = currentPolylines.find((polyline) => polyline.id === id2)

      if (!polyline1 || !polyline2) {
        return currentPolylines
      }

      if (polyline1.path.length + polyline2.path.length > 10) {
        return currentPolylines
      }

      const newPolyline: Polyline = {
        id: new Date().toISOString(),
        path: [...polyline1.path, ...polyline2.path],
        type: polyline1.type
      }

      return [
        ...currentPolylines.filter((polyline) => polyline !== polyline1 && polyline !== polyline2),
        newPolyline
      ]
    })
  }

  const polylineClickHandler = (polylineId: any) => {
    if (!firstPolylineToLink) {
      setFirstPolylineToLink(polylineId)
    } else {
      interlinkPolylines(firstPolylineToLink, polylineId)
      setFirstPolylineToLink(null)
    }
  }

  const eventRightClickHandler = (e: google.maps.MapMouseEvent) => {
    e.stop()

    handleMapRightClick(e)
    selectedPolylineHandler(e)
    removeUnconnectedPolylines
  }

  const handleMapMouseUp = () => {
    setIsDragging(false)
  }

  const handleButtonClick = (type: string) => {
    setSelectedType(type)
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


        <div>
          <Button 
            color="primary"
            onClick={() => handleButtonClick('agua')}
          >
            Água
          </Button>
          <Button 
            color="success"
            onClick={() => handleButtonClick('esgoto')}
          >
            Esgoto
          </Button>
        </div>

      </div>
    </div>

    <div className="w-4/5 h-full">
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerClassName="map-container"
        options={options}
        onClick={handleMapClick}
        onRightClick={eventRightClickHandler}
        onMouseMove={handleMapMouseMove}
        onMouseUp={handleMapMouseUp}
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

         {polylines.map((polyline) => (
            <Polyline 
              key={polyline.id}
              path={polyline.path}
              options={{
                strokeColor: polyline.type === 'agua' ? '#0E5386' : '#3A6324',
                editable: true,
                draggable: true,
                visible: true,
              }}
              onRightClick={() => polylineClickHandler(polyline.id)}
            />
         ))}
      </GoogleMap>
    </div>
  </div>;
}