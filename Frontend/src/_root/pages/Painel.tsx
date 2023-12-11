import { Card, CardBody, Spinner} from "@nextui-org/react";
import 'leaflet/dist/leaflet.css'
import TopNav from "../../components/ui/TopNav";
import { useLoadScript } from "@react-google-maps/api";
import Map from "../../components/ui/map";

const VITE_GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
function Painel() {
    
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: VITE_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    })

    if (!isLoaded) {
        return <Spinner className="flex justify-center" />
    }

    return (
        <>
            <TopNav />

            <div className="flex flex-col w-full items-center gap-4 p-4 min-h-screen from-purple-900 via-indigo-800 to-indigo-500 bg-gradient-to-tr">
                <div className="flex flex-row  py-10">
                    <div className="flex justify-between gap-4 p-4 flex-col w-[1200px] h-[1200px] scrollbar-hide ">
                        <Card className="max-w-full">
                            <CardBody className="overflow-auto scrollbar-hide">
                                <section id="map">
                                    <p className=" flex justify-center font-bold ">Mapa Sanarj</p>
                                        <div>
                                            <Map />
                                        </div>
                                </section>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Painel