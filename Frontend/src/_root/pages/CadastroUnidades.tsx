import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Button, Card, CardBody, Input, Radio, RadioGroup, Tab, Tabs } from "@nextui-org/react"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"

function CadastroUnidades() {
    type CadastroUnidadeForm = {
      nomeUnidade: string
      localidade: string
      sistema: string[]
      tipoAtivo: string
      formaAtivo: ("pontual") 
    }

    const {register, watch,handleSubmit } = useForm<CadastroUnidadeForm>()

    const navigate = useNavigate()

    const onSubmit:SubmitHandler<CadastroUnidadeForm> = async data => {
        alert(JSON.stringify(data));
        console.log(data)
        navigate('/cadastroAtivos')
      };
    
      const handleCancelarClick = () => {
        // Lógica de cancelamento
        navigate("/painel");
      };

      const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

      const tipoAtivo = watch('tipoAtivo')
      const booleanDisabled = tipoAtivo !== 'enterrado' ? true : false

    return (
        <>
            <Card className="max-w-full w-[750px] h-[680px]">
                <CardBody className="overflow-auto scrollbar-hide">
                    <Tabs
                        fullWidth
                        size="md"
                        aria-label="Tabs form"
                    >
                        <Tab key="Cadastro-Unidades-Sistema" title="Cadastro de unidades do Sistema">
                            <form className="flex flex-col gap-4 items-center" onSubmit={handleSubmit(onSubmit)} >
                                <Input 
                                    isRequired
                                    label="Nome da Unidade"
                                    placeholder="Insira o Nome da Unidade"
                                    {...register('nomeUnidade')}
                                />

                                <Input 
                                    isRequired
                                    label="Localidade"
                                    placeholder="Insira Localidade, endereço"
                                    {...register('localidade')}
                                />

                                <RadioGroup
                                    label="Sistema"
                                    name="sistema"
                                    isRequired

                                >
                                    <Radio value="Agua" {...register("sistema")}>Sistema de Água</Radio>
                                    <Radio value="esgoto"  {...register('sistema')}>Sistema de Esgoto</Radio>
                                    <Radio value="administrativo" {...register('sistema')}>Sistema Administrativo</Radio>
                                    <Radio value="outro" {...register('sistema')}>Outro</Radio>
                                </RadioGroup>

                                <div className="flex justify-between gap-64 p-10">
                                    <RadioGroup
                                        label="Tipo do Ativo"
                                        name="tipoAtivo"
                                        isRequired
                                    >
                                        <Radio value="enterrado" {...register("tipoAtivo")}>Enterrado</Radio>
                                        <Radio value="visível" {...register("tipoAtivo")}>Vísivel</Radio>
                                    </RadioGroup>

                                    <RadioGroup
                                        label="Forma do Ativo"
                                        name="formaAtivo"
                                        isDisabled={booleanDisabled}
                                    >
                                        <Radio value="linear" {...register("formaAtivo")}>Linear</Radio>
                                        <Radio value="pontual" {...register("formaAtivo")}>Pontual</Radio>
                                    </RadioGroup>
                                </div>

                                <div className="flex justify-between gap-4 p-4">
                                    <Button
                                        color="secondary"
                                        startContent={<ChevronLeftIcon className={iconClasses} />}
                                        className="rounded-xl"
                                        onClick={handleCancelarClick}
                                    >
                                        Cancelar
                                    
                                    </Button>

                                    <Button
                                        color="success"
                                        startContent={<ChevronRightIcon className={iconClasses} />}
                                        className="rounded-xl"
                                        type="submit"
                                        onClick={handleSubmit(onSubmit)}
                                    >
                                        Avançar
                                    </Button>
                                </div>
                            </form>
                        </Tab>
                    </Tabs>
                </CardBody>
            </Card>
        </>
    )
    
}

export default CadastroUnidades