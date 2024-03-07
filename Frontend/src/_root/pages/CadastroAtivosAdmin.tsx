import { useForm } from "react-hook-form"
import { IGetAdminAtivo } from "../../../types/types"
import { ChangeEvent, useEffect, useState } from "react"
import { createExternalAtivoAdmin, getAdminClasseAtivo, getAdminStatus, getAdminTipoAtivo } from "../../../django/api"
import { Card, CardBody, CardHeader, Input, Select, SelectItem } from "@nextui-org/react"
import { ArrowBigRightDash } from "lucide-react"
import CheckboxDonation from "../../components/ui/Checkbox"


const CadastroAtivosAdmin = () => {

    const { register, handleSubmit, setValue, reset } = useForm<IGetAdminAtivo>()

    const [tipoAtivoAdmin, setTipoAtivoAdmin] = useState([])
    const [selectedTipoAtivoAdmin, setSelectedTipoAtivoAdmin] = useState('')

    const [classeAtivoAdmin, setClasseAtivoAdmin] = useState([])
    const [selectedClasseAtivoAdmin, setSelectedClasseAtivoAdmin] = useState('')

    const [statusAtivoAdmin, setStatusAtivoAdmin] = useState([])
    const [selectedStatusAtivoAdmin, setSelectedStatusAtivoAdmin] = useState('')

    useEffect(() => {
        const fetchAdminStatus = async () => {
          const adminStatus = await getAdminStatus()
          setStatusAtivoAdmin(adminStatus)
        }
        fetchAdminStatus()
    
        const fetchAdminClasseAtivo = async () => {
          const adminClasseAtivo = await getAdminClasseAtivo()
          setClasseAtivoAdmin(adminClasseAtivo)
        }
        fetchAdminClasseAtivo()
    
        const fetchAdminTipoAtivo = async () => {
          const adminTipoAtivo = await getAdminTipoAtivo()
          setTipoAtivoAdmin(adminTipoAtivo)
        }
        fetchAdminTipoAtivo()
    }, [])

    const handleAdminStatusChange = async (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedStatusAtivoAdmin(event.target.value)
    }
    
    const handleAdminClasseChange = async (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedClasseAtivoAdmin(event.target.value)
    }
    
    const handleAdminTipoChange = async (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedTipoAtivoAdmin(event.target.value)
    }

    const handleCheckboxChange = (value: boolean) => {
        setValue("doacao", value);
      };

  return (
    <>
        <Card className="max-w-full w-[1200px] bg-slate-900 text-white h-full">
            <CardHeader
                className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold items-center flex justify-center flex-col"
            >
                <h1
                    className="text-slate-200 flex flex-row transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-indigo-500 duration-300"
                >
                    <ArrowBigRightDash />
                    Cadastro de Ativos
                </h1>
                <p className="text-gray-500 text-small">Aqui deve-se cadastrar e declarar seus ativos administrativos, não pertencentes aos ativos operacionais.</p>
            </CardHeader>

            <CardBody
                className="text-center flex flex-col gap-2 p-4"
            >
               <form 
                    onSubmit={handleSubmit((FormData: IGetAdminAtivo) => {
                        createExternalAtivoAdmin(FormData)
                    })}
                    className="gap-4 p-4"
                >
                    <div
                        className="gap-4 p-4 flex flex-col flex-1"
                    >
                        <Input 
                            {...register("nome_ativo")}
                            label="Nome do ativo"
                            placeholder="Escreva o nome do ativo"
                            variant="bordered"
                        />

                        <Select
                            {...register("tipo_ativo")}
                            label="Tipo de ativo"
                            placeholder="Selecione o tipo de ativo"
                            onChange={handleAdminTipoChange}
                        >
                            {tipoAtivoAdmin.map((tipoAtivo: string) => (
                                <SelectItem
                                    key={tipoAtivo.charAt(0).toUpperCase()}
                                    value={tipoAtivo.charAt(0).toUpperCase()}
                                >
                                    {tipoAtivo}
                                </SelectItem>
                            ))}
                        </Select>
                        <p className="text-sm text-default-400">Tipo de ativo selecionado: {selectedTipoAtivoAdmin}</p>

                        <Input 
                            {...register("código_ativo")}
                            label="Código do ativo"
                            placeholder="Escreva o código do ativo"
                            variant="bordered"
                        />

                        <Select
                            {...register("classe_ativo")}
                            label="Classe do ativo"
                            placeholder="Selecione a classe do ativo"
                            onChange={handleAdminClasseChange}
                        >
                            {classeAtivoAdmin.map((classeAtivo: string) => (
                                <SelectItem
                                    key={classeAtivo.charAt(0).toUpperCase()}
                                    value={classeAtivo.charAt(0).toUpperCase()}
                                >
                                    {classeAtivo}
                                </SelectItem>
                            ))}
                        </Select>
                        <p className="text-sm text-default-400">Classe de ativo selecionado: {selectedClasseAtivoAdmin}</p>

                        <Input
                            {...register("proprietario")}
                            label="Proprietario"
                            placeholder="Escreva o proprietario"
                            variant="bordered"
                        /> 

                        <p>Doação?</p>

                        <CheckboxDonation 
                            onChange={handleCheckboxChange}
                            name="doacao"
                        />

                        <Input 
                            {...register("valor_original")}
                            label="Valor original"
                            placeholder="Escreva o valor original"
                            variant="bordered"
                            type="number"
                        />

                        <Input 
                            {...register("valor_atual")}
                            label="Valor atual"
                            placeholder="Escreva o valor atual"
                            variant="bordered"
                            type="number"
                        />

                        <Select
                            {...register("status")}
                            label="Status do ativo"
                            placeholder="Selecione o status do ativo"
                            onChange={handleAdminStatusChange}
                        >
                            {statusAtivoAdmin.map((statusAtivo: string) => (
                                <SelectItem
                                    key={statusAtivo.charAt(0).toUpperCase()}
                                    value={statusAtivo.charAt(0).toUpperCase()}
                                >
                                    {statusAtivo}
                                </SelectItem>
                            ))}
                        </Select>
                        <p>Status selecionado: {selectedStatusAtivoAdmin}</p>

                        <Input 
                            {...register("data_insercao")}
                            label="Data de inserção"
                            placeholder="Escreva a data de inserção"
                            variant="bordered"
                            type="date"
                        />

                        <Input 
                            {...register("previsao_substituicao")}
                            label="Previsão de substituição"
                            placeholder="Escreva a previsão de substituição"
                            variant="bordered"
                            type="date"
                        />

                        <Input 
                            {...register("criado_por")}
                            label="Criado por"
                            placeholder="Escreva por quem o ativo foi criado"
                            variant="bordered"
                        />

                        <Input 
                            {...register("adquirido_por")}
                            label="Adquirido por"
                            placeholder="Escreva por quem o ativo foi adquirido"
                            variant="bordered"
                        />

                        <Input 
                            {...register("unidade")}
                            label="Unidade"
                            placeholder="Escreva a unidade"
                            variant="bordered"
                        />
                    </div>

                    <div className="flex flex-row justify-between ">
                        <button
                            type="submit"
                            className="bg-indigo-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Cadastrar
                        </button>
                        <button
                            type="button"
                            onClick={() => reset()}
                            className="bg-red-500 transition ease-in-out delay-150 hover:-translate-y-1  hover:scale-110 duration-300 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" 
                        >
                            Limpar
                        </button>
                    </div>
               </form>
            </CardBody>
        </Card>
    </>
  )
}

export default CadastroAtivosAdmin