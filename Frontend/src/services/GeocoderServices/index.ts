import axios from "axios";
import { GeocoderResult } from "../../components/types";

export class GeocoderService {
    private static NOMINATIM_HOST = 'https://nominatim.openstreetmap.org/search?';

    static getResults = async (searchText: string) => {
        const params = {
            q: searchText,
            format: 'json',
            addressdetails: '1',
            polygon_geojson: '0',
        }

        const queryString = new URLSearchParams(params).toString();
        const requestOptions = {
            method: 'GET',
        };

        const response = await axios.get(`${GeocoderService.NOMINATIM_HOST}${queryString}`, requestOptions);

        const resultParsed: GeocoderResult[] = response.data.map((item: GeocoderResult) => ({
                display_name: item.display_name,
                lat: item.lat,
                lon: item.lon,
                place_id: item.place_id
            })
        )

        return resultParsed
    }

}