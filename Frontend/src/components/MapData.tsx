import { useCallback } from "react";
import { IGetOpAtivo } from "../../types/types";
import { Tooltip } from "@nextui-org/react";
import { EyeIcon } from "./ui/EyeIcon";
import { EditIcon } from "./ui/EditIcon";
import { DeleteIcon } from "./ui/DeleteIcon";

export const AtivosOp = (ativoOp: IGetOpAtivo, columnKey: React.Key) => {

    const AtivoOpRenderCell = useCallback(() => {
      let cellValue = ativoOp[columnKey as keyof IGetOpAtivo]
  
      if (cellValue instanceof Date) {
          cellValue = cellValue.toLocaleDateString()
      }
  
      if (cellValue === undefined) {
          cellValue = 'N/A'
      }
  
      switch(columnKey) {
          case 'code':
              return(
                  <div className='flex flex-col'>
                      <p className='text-bold text-sm capitalize'>{cellValue}</p>
                      <p className='text-bold text-sm capitalize text-default-400'>{ativoOp.codigo}</p>
                  </div>
              )
          
          case 'campName':
              return (
                  <div className='flex flex-col'>
                      <p className='text-bold text-sm capitalize'>{cellValue}</p>
                      <p className='text-bold text-sm capitalize text-default-400'>{ativoOp.nome_de_campo}</p>
                  </div>
              )
  
          case 'class': 
              return (
                  <div className='flex flex-col'>
                      <p className='text-bold text-sm capitalize'>{cellValue}</p>
                      <p className='text-bold text-sm capitalize text-default-400'>{ativoOp.classe}</p>
                  </div>
              )
  
          case 'phase':
              return (
                  <div className='flex flex-col'>
                      <p className='text-bold text-sm capitalize'>{cellValue}</p>
                      <p className='text-bold text-sm capitalize text-default-400'>{ativoOp.fase}</p>
                  </div>
              )
  
          case 'createdAt':
              return (
                  <div className='flex flex-col'>
                      <p className='text-bold text-sm capitalize'>{cellValue}</p>
                      <p className='text-bold text-sm capitalize text-default-400'>{ativoOp.criado_em.toLocaleDateString()}</p>
                  </div>
              )
  
          case 'createdBy':
              return (
                  <div className='flex flex-col'>
                      <p className='text-bold text-sm capitalize'>{cellValue}</p>
                      <p className='text-bold text-sm capitalize text-default-400'>{ativoOp.criado_por}</p>
                  </div>
              )
  
          case 'insertionDate':
              return (
                  <div className='flex flex-col'>
                      <p className='text-bold text-sm capitalize'>{cellValue}</p>
                      <p className='text-bold text-sm capitalize text-default-400'>{ativoOp.data_insercao.toLocaleDateString()}</p>
                  </div>
              )
  
          case 'projectDate':
              return (
                  <div className='flex flex-col'>
                      <p className='text-bold text-sm capitalize'>{cellValue}</p>
                      <p className='text-bold text-sm capitalize text-default-400'>{ativoOp.data_projeto.toLocaleDateString()}</p>
                  </div>
              )
  
          case 'obraDate': 
              return (
                  <div className='flex flex-col'>
                      <p className='text-bold text-sm capitalize'>{cellValue}</p>
                      <p className='text-bold text-sm capitalize text-default-400'>{ativoOp.data_obra.toLocaleDateString()}</p>
                  </div>
              )
          
          case 'operationDate':
              return (
                  <div className='flex flex-col'>
                      <p className='text-bold text-sm capitalize'>{cellValue}</p>
                      <p className='text-bold text-sm capitalize text-default-400'>{ativoOp.data_operacao.toLocaleDateString()}</p>
                  </div>
              )
  
          case 'investimentType':
              return (
                  <div className='flex flex-col'>
                      <p className='text-bold text-sm capitalize'>{cellValue}</p>
                      <p className='text-bold text-sm capitalize text-default-400'>{ativoOp.tipo_investimento}</p>
                  </div>
              )
  
          case 'serviceStep':
              return (
                  <div className='flex flex-col'>
                      <p className='text-bold text-sm capitalize'>{cellValue}</p>
                      <p className='text-bold text-sm capitalize text-default-400'>{ativoOp.etapa_do_servico}</p>
                  </div>
              )
  
          case 'currentSituation':
              return (
                  <div className='flex flex-col'>
                      <p className='text-bold text-sm capitalize'>{cellValue}</p>
                      <p className='text-bold text-sm capitalize text-default-400'>{ativoOp.situacao_atual}</p>
                  </div>
              )
  
          case 'owner':
              return (
                  <div className='flex flex-col'>
                      <p className='text-bold text-sm capitalize'>{cellValue}</p>
                      <p className='text-bold text-sm capitalize text-default-400'>{ativoOp.proprietario}</p>
                  </div>
              )
  
          case 'originalValue':
              return (
                  <div className='flex flex-col'>
                      <p className='text-bold text-sm capitalize'>{cellValue}</p>
                      <p className='text-bold text-sm capitalize text-default-400'>{ativoOp.valor_original}</p>
                  </div>
              )
  
          case 'donation':
              return (
                  <div className='flex flex-col'>
                      <p className='text-bold text-sm capitalize'>{cellValue}</p>
                      <p className='text-bold text-sm capitalize text-default-400'>{ativoOp.doacao}</p>
                  </div>
              )
  
          case 'utilLifeYears':
              return (
                  <div className='flex flex-col'>
                      <p className='text-bold text-sm capitalize'>{cellValue}</p>
                      <p className='text-bold text-sm capitalize text-default-400'>{ativoOp.vida_util_reg_anos}</p>
                  </div>
              )
  
          case 'utilLifeMonths':
              return (
                  <div className='flex flex-col'>
                      <p className='text-bold text-sm capitalize'>{cellValue}</p>
                      <p className='text-bold text-sm capitalize text-default-400'>{ativoOp.vida_util_reg_meses}</p>
                  </div>
              )
  
          case 'status': 
              return (
                  <div className='flex flex-col'>
                      <p className='text-bold text-sm capitalize'>{cellValue}</p>
                      <p className='text-bold text-sm capitalize text-default-400'>{ativoOp.status}</p>
                  </div>
              )
              
          case 'latitude':
              return (
                  <div className='flex flex-col'>
                      <p className='text-bold text-sm capitalize'>{cellValue}</p>
                      <p className='text-bold text-sm capitalize text-default-400'>{ativoOp.latitude}</p>
                  </div>
              )
  
          case 'longitude':
              return (
                  <div className='flex flex-col'>
                      <p className='text-bold text-sm capitalize'>{cellValue}</p>
                      <p className='text-bold text-sm capitalize text-default-400'>{ativoOp.longitude}</p>
                  </div>
              )
  
          case 'locality':
              return (
                  <div className='flex flex-col'>
                      <p className='text-bold text-sm capitalize'>{cellValue}</p>
                      <p className='text-bold text-sm capitalize text-default-400'>{ativoOp.localidade}</p>
                  </div>
              )
  
          case 'address':
              return (
                  <div className='flex flex-col'>
                      <p className='text-bold text-sm capitalize'>{cellValue}</p>
                      <p className='text-bold text-sm capitalize text-default-400'>{ativoOp.Endereco}</p>
                  </div>
              )
              
          case 'actions': 
              return (
                  <div className='relative flex items-center gap-2'>
                  <Tooltip content='Detalhes'>
                      <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                          <EyeIcon />
                      </span>
                  </Tooltip>
  
                  <Tooltip content="Editar Ativo">
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <EditIcon />
                      </span>
                  </Tooltip>
  
                  <Tooltip color="danger" content="Apagar Ativo">
                      <span className="text-lg text-danger cursor-pointer active:opacity-50">
                          <DeleteIcon />
                      </span>
                  </Tooltip>
              </div>
              )
          default:
              return cellValue   
      }
      }, [ativoOp, columnKey])

      return AtivoOpRenderCell()
}
