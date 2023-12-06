import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
} from "react-leaflet";

import 'leaflet/dist/leaflet.css'

import { MapData } from './MapData';
import { LatLngTuple } from "leaflet";

const MapCadastro = (props: { selectedLayer: number; }) => {
  const mapProviders = [
    {
        id: 1,
        name: "ESRI Satélite",
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        attribution:
            "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    },
    {
        id: 2,
        name: "OSM Street Map",
        url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution:
            "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function LayerCartocdn({ condicao }: any) {
    const conditional = condicao;

    if (!conditional) {
        return (
            <TileLayer url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png" />
        );
    }
    if (conditional) {
        return null;
    }
  }

    const getMarkerColor = (sistema: string) => {
      if (sistema === 'agua') {
        return 'blue';
      } else if (sistema === 'esgoto') {
        return 'darkgreen';
      } else {
        return 'orange';
      }
    };

  return (   
    <>
      <MapContainer center={[-19.947128, -45.165717]} zoom={15}>
        <TileLayer
          url={mapProviders[`${props.selectedLayer}`].url}
          attribution={mapProviders[`${props.selectedLayer}`].attribution}
        />

        {MapData.map((ativo) => {
          const {id, tipo2, sistema, coordenadas } = ativo
          const markerColor = getMarkerColor(sistema)
          let componentReturn = null

          if (tipo2 === 'linear') {
            const polylinePoints = coordenadas as LatLngTuple[]
            componentReturn = (
              <Polyline 
                key={`polyline-${id}`}
                positions={polylinePoints}
                pathOptions={{color: markerColor}}
              />
            )
          } else {
            const markerPosition = coordenadas as LatLngTuple
            componentReturn = (
              <Marker 
                key={`marker-${id}`}
                position={markerPosition}
              />
            )
          }

            return componentReturn

        })}

        <LayerCartocdn condicao={props.selectedLayer} />
      </MapContainer>

    </>
  );
};

export default MapCadastro;