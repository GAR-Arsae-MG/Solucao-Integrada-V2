import { Card, CardBody, CardHeader } from "@nextui-org/react"


const About = () => {
  return (
    <>
      <Card className=" w-full">
        <CardHeader className="text-center items-center justify-center flex flex-col">
          <h1 className="text-3xl text-center font-bold text-emerald-950">Sobre o SGP</h1>
          <span className="gap-4 p-4 text-teal-800">SGP é um projeto em desenvolvimento desde o primeiro trimestre de 2023 feito para a resolução dos problemas de mapeamento, armazenamento e logística das agências de tubulação de água e esgoto.</span>
          <hr />
        </CardHeader>

        <CardBody className="px-16 gap-4">
          <p>Inicialmente pensado para uma única agência de água e esgoto, ao longo do seu desenvolvimento o projeto fora recebendo melhorias de código e gestão que permitissem que o projeto rapidamente possa ser usado por outras agências sem a necessidade de mudança de código.</p>

          <p>O programa conta com diversas funcionalidades, como o mapa que mapeia unidades, ativos e tubulações adequadamente no município, cada um de acordo com sua visualização visual única. Também obtemos listas que mostram todas as informações dos ativos e unidades, permitindo sabermos todas as suas informações e ter controle completo sobre.</p>
        </CardBody>

      </Card>
    </>
  )
}

export default About