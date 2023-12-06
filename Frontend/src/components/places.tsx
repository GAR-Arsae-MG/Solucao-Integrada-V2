import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { Autocomplete, AutocompleteItem} from "@nextui-org/react";

type PlacesProps = {
  setOffice: (position: google.maps.LatLngLiteral) => void;
};

export default function Places({ setOffice }: PlacesProps) {
    const {
      ready, 
      value, 
      setValue,
      suggestions: {status, data}, 
      clearSuggestions,
    } = usePlacesAutocomplete()

    const handleSelect = async (val: string) => {
      setValue(val, false)
      clearSuggestions()

      const results = await getGeocode({address: val})
      const {lat, lng} = await getLatLng(results[0])
      setOffice({lat, lng})
    }
  
    
    return (
      <Autocomplete
        value={value}
        onChange={e => setValue(e.target.value)}
        onInputChange={handleSelect}
        disabled={!ready}
        label='Endereço'
        placeholder="Escreva seu endereço..."
      >
        {data.map(({place_id, description}) => (
          <AutocompleteItem
            key={place_id}
            value={description}
            placeholder={description}
            onChange={e => setValue(e.target.value)}
          >
            {description}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    )
  
}
