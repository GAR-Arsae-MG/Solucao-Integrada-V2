import React from 'react';

import {
  MapContainer,
  TileLayer,
  Polyline,
} from "react-leaflet";

import Geoman from "../Geoman";

const MapCadastro = (props: { selectedLayer: unknown; }) => {
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

  function LayerCartocdn({ condicao }) {
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

    // const [polygonLatLngs, setPolygonLatLngs] = useState([]);
    // const [layerID, setLayerID] = useState(0);

	// LEAFLET DRAW ON CREATE
    // function handlePolygonCreated(event) {
    //     const polygon = event.layer

    //     if (polygon != null) {
    //         // SE EXISTE PROPRIEDADE DRAGGING TIPO == MARKER
    //         if(polygon.dragging) {
    //             var lat_lngs = polygon._latlng
                
    //         } else {
    //             var lat_lngs = polygon._latlngs
    //         }

    //         console.log(lat_lngs)
    //         console.log(polygon._leaflet_id)
    //         setLayerID(polygon._leaflet_id)
    //         setPolygonLatLngs(lat_lngs)
    //     }
    // }

    // function handlePolygonEdited(event) {
    //     const polygon = event.layers._layers

    //     if (polygon != null) {
    //         // SE EXISTE PROPRIEDADE DRAGGING TIPO == MARKER
    //         // if(polygon.dragging) {
    //         //     var lat_lngs = polygon._latlng
    //         // } else {
    //         //     var lat_lngs = polygon._latlngs
    //         // }

    //         console.log(`polygon.${layerID}._latlngs`)
    //         // setPolygonLatLngs(lat_lngs)
    //     }
    // }

    // function handlePolygonDeleted(event) {
    //     const polygon = event.layer;

    //     if (polygon != null) {
    //         // SE EXISTE PROPRIEDADE DRAGGING TIPO == MARKER
    //         if(polygon.dragging) {
    //             var lat_lngs = polygon._latlng
    //         } else {
    //             var lat_lngs = polygon._latlngs
    //         }

    //         console.log(lat_lngs)
    //         setPolygonLatLngs(lat_lngs)
    //     }
    // }

    const multiPolyline = [
        [
            [-19.947128, -45.165717],
            [-19.951, -45.165717],
            [-19.947128, -45.17],
        ],
        [
            [-19.95, -45.17],
            [-19.95, -45.172],
            [-19.94, -45.18],
        ],
    ];
    const redOptions = { color: "red" };

  return (   
      <MapContainer center={[-19.947128, -45.165717]} zoom={15}>
        <TileLayer
          url={mapProviders[`${props.selectedLayer}`].url}
          attribution={mapProviders[`${props.selectedLayer}`].attribution}
        />
        <Polyline pathOptions={redOptions} positions={multiPolyline} />
        <LayerCartocdn condicao={props.selectedLayer} />
        <Geoman />
      </MapContainer>
  );
};

export default MapCadastro;