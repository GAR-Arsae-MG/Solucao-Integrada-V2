import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import {Tabs, Tab, Input, Button, Card, CardBody, Divider, RadioGroup, Radio} from "@nextui-org/react";



function Painel() {
    
    type Painel = {
        selectedSistema: string,
        selectedTipoAtivo: string,
        selectedLocalidade: string,
        selectedLayer: number,
    }

    const {register,setValue, handleSubmit} = useForm<Painel>({
        defaultValues: {
            selectedLayer: 0
        }
    })

    function handleButtonESRI() {
        setValue('selectedLayer', 0)
    }
    
    function handleButtonOSM() {
        setValue('selectedLayer', 1)
    }
}

export default Painel