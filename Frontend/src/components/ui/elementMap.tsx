import { Loader } from "@googlemaps/js-api-loader"
const VITE_GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const elementMap = () => {

  const loader = new Loader({
    apiKey: VITE_GOOGLE_MAPS_API_KEY,
    version: 'weekly',
    language: 'pt-br',
    region: 'BR',
  })

  loader.load().then(async () => {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const map = new Map(document.getElementById("map") as HTMLDivElement, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  });

  return (
    

    <div id="map"></div>
  )
}

export default elementMap
