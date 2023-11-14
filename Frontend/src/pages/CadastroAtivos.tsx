import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

import {
  Box,
  Text,
  Flex,
  Grid, 
  GridItem,
  Select, 
  Button, 
  FormControl,
  FormLabel,
  Input,
  Checkbox
} from "@chakra-ui/react";

import { ChevronRightIcon } from "@chakra-ui/icons";

import "../assets/CadastroAtivos.css";
import "leaflet/dist/leaflet.css";

import TopNav from '../components/ui/TopNav';
import MapCadastro from '../components/MapCadatro';

function CadastroAtivos() {
  const [selectedSistema, setSelectedSistema] = useState(''); // useState('agua')
  const [selectedTipoAtivo, setSelectedTipoAtivo] = useState('');
  const [selectedLocalidade, setSelectedLocalidade] = useState('');

  const navigate = useNavigate();

  const [nomeUnidade, setNomeUnidade] = useState("");
  const [itemPrincipalBool, setItemPrincipalBool] = useState(true);
  const [nomeCampo, setNomeCampo] = useState("");
  const [especie, setEspecie] = useState("");
  const [classe, setClasse] = useState("");
  const [fase, setFase] = useState("");
  //const [itemPrincipalVinc, setItemPrincipalVinc] = useState("");
  const [dataOp, setDataOp] = useState("");
  const [dataObra, setDataObra] = useState("");
  const [dataProj, setDataProj] = useState("");
  const [tipoInv, setTipoInv] = useState("");
  const [etapaServ, setEtapaServ] = useState("");
  const [situacao, setSituacao] = useState("");
  const [proprietario, setProprietario] = useState("");
  const [recebidoDoacao, setRecebidoDoacao] = useState("");
  const [vidaUtil, setVidaUtil] = useState(0);
  const [valorOriginal, setValorOriginal]= useState(0);

  const [step, setStep] = useState(1);

  const avancarParaProximoStep = () => {
    setStep(step + 1);
  };

  const voltarParaStepAnterior = () => {
    setStep(step - 1);
  };

  const handleFormSubmit = () => {
    // Lógica de submissão do formulário
    navigate("/painel");
  };

  const [selectedLayer, setSelectedLayer] = useState(0);

  function handleButtonESRI() {
    setSelectedLayer(0);
  }

  function handleButtonOSM() {
      setSelectedLayer(1);
  }

  return (
    <>
      <TopNav />
      <Grid
        templateAreas={`"nav main"`}
        gridTemplateRows={'100%'}
        gridTemplateColumns={'1px 1fr'}
        height="calc(100vh - 70px)"
        mt={1}
      >
        <GridItem bg="#1A202C" area={'nav'} />
        <GridItem bg="#1A202C" area={'main'}>
          {step === 1 && (
            <Box maxW="600px" mx="auto" p="8" bg="#C4C4C4" height='100%'>
              <Box mb="4">
              <Box as="h1" fontSize="xl" fontWeight="bold" color="#1C1C1C" mb="2">
                Cadastro de Ativos
              </Box>
              <FormControl mb="4">
                <FormLabel color="#1C1C1C">Unidade de Vinculação</FormLabel>
                <Select 
                  isRequired 
                  placeholder="Selecione a unidade" 
                  bg="#E7E7E7" 
                  border="2px" 
                  borderColor="#5c1a1040" 
                  value={nomeUnidade}
                  onChange={(event) => setNomeUnidade(event.target.value)}
                >
                  <option value="unidade1">Unidade José</option>
                  <option value="unidade2">Unidade Maria</option>
                </ Select>
                <FormLabel color="#1C1C1C" mt={3}>Ativo Principal?</FormLabel>
                <Checkbox 
                  isRequired 
                  bg="#E7E7E7" 
                  border="2px" 
                  borderColor="#5c1a1040" 
                  value={itemPrincipalBool}
                  onChange={(event) => setItemPrincipalBool(event.target.value)}
                />
                <FormLabel color="#1C1C1C" mt={3}>Nome da Unidade</FormLabel>
                <Input 
                  isRequired 
                  placeholder="Insira como o ativo é chamado em campo" 
                  bg="#E7E7E7" 
                  border="2px" 
                  borderColor="#5c1a1040"
                  value={nomeCampo}
                  onChange={(event) => setNomeCampo(event.target.value)}
                />
                <FormLabel color="#1C1C1C" mt={3}>Espécie</FormLabel>
                <Select 
                  isRequired 
                  placeholder="Selecione a espécie" 
                  bg="#E7E7E7" 
                  border="2px" 
                  borderColor="#5c1a1040" 
                  value={especie}
                  onChange={(event) => setEspecie(event.target.value)}
                >
                  <option value="especie1">Espécie 1</option>
                  <option value="especie2">Espécie 2</option>
                </ Select>
                <FormLabel color="#1C1C1C" mt={3}>Classe</FormLabel>
                <Select 
                  isRequired 
                  placeholder="Selecione a classe" 
                  bg="#E7E7E7" 
                  border="2px" 
                  borderColor="#5c1a1040" 
                  value={classe}
                  onChange={(event) => setClasse(event.target.value)}
                >
                  <option value="classe1">Classe 1</option>
                  <option value="classe2">Classe 2</option>
                </ Select>
                <FormLabel color="#1C1C1C" mt={3}>Fase de operação</FormLabel>
                <Select 
                  isRequired 
                  placeholder="Selecione a fase" 
                  bg="#E7E7E7" 
                  border="2px" 
                  borderColor="#5c1a1040" 
                  value={fase}
                  onChange={(event) => setFase(event.target.value)}
                >
                  <option value="fase1">Fase 1</option>
                  <option value="fase2">Fase 2</option>
                </ Select>
              </FormControl>
            </Box>

              <Button colorScheme="blue"
                rightIcon={<ChevronRightIcon />}
                size="lg"
                w="100%"
                mb="4" 
                onClick={avancarParaProximoStep}
              >
                Próximo
              </Button>
            </Box>
          )}
          {step === 2 && (
            <Box maxW="600px" mx="auto" p="8" bg="#C4C4C4" height='100%'>
              <Box mb="4">
              <Box as="h1" fontSize="xl" fontWeight="bold" color="#1C1C1C" mb="2">
                Cadastro de Ativos
              </Box>
                <FormControl mb="4">
                  <FormLabel color="#1C1C1C" mt={3}>Data de Início Operação</FormLabel>
                  <Input 
                    isRequired 
                    placeholder="Selecione a data" 
                    bg="#E7E7E7" 
                    border="2px" 
                    borderColor="#5c1a1040" 
                    type='date'
                    value={dataOp}
                    onChange={(event) => setDataOp(event.target.value)}
                  />
                  <FormLabel color="#1C1C1C" mt={3}>Data de Início de Obra</FormLabel>
                  <Input  
                    placeholder="Selecione a data" 
                    bg="#E7E7E7" 
                    border="2px" 
                    borderColor="#5c1a1040" 
                    type='date'
                    value={dataObra}
                    onChange={(event) => setDataObra(event.target.value)}
                  />
                  <FormLabel color="#1C1C1C" mt={3}>Data de Início de Projeto</FormLabel>
                  <Input  
                    placeholder="Selecione a data" 
                    bg="#E7E7E7" 
                    border="2px" 
                    borderColor="#5c1a1040" 
                    type='date'
                    value={dataProj}
                    onChange={(event) => setDataProj(event.target.value)}
                  />
                </FormControl>
              </Box>
              <Button colorScheme="blue"
                rightIcon={<ChevronRightIcon />}
                size="lg"
                w="100%"
                mb="4" 
                onClick={avancarParaProximoStep}
              >
                Próximo
              </Button>
              <Button colorScheme="blue"
                variant="outline"
                size="lg"
                w="100%"
                onClick={voltarParaStepAnterior}
              >
                Voltar
              </Button>
            </Box>
          )}
          {step === 3 && (
            <Box maxW="600px" mx="auto" p="8" bg="#C4C4C4" height='100%'>
              <Box mb="4">
                <Box as="h1" fontSize="xl" fontWeight="bold" color="#1C1C1C" mb="2">
                  Cadastro de Ativos
                </Box>
                <FormControl mb="4">

                  <FormLabel color="#1C1C1C">Tipo de Investimento</FormLabel>
                  <Select 
                    isRequired 
                    placeholder="Selecione o tipo" 
                    bg="#E7E7E7" 
                    border="2px" 
                    borderColor="#5c1a1040" 
                    value={tipoInv}
                    onChange={(event) => setTipoInv(event.target.value)}
                  >
                    <option value="tipoinv1">Tipo Inv 1</option>
                    <option value="tipoinv2">Tipo Inv 2</option>
                  </ Select>

                  <FormLabel color="#1C1C1C">Etapa do serviço</FormLabel>
                  <Select 
                    isRequired 
                    placeholder="Selecione a etapa" 
                    bg="#E7E7E7" 
                    border="2px" 
                    borderColor="#5c1a1040" 
                    value={etapaServ}
                    onChange={(event) => setEtapaServ(event.target.value)}
                  >
                    <option value="etapa 1">Etapa 1</option>
                    <option value="etapa 2">Etapa 2</option>
                  </ Select>

                  <FormLabel color="#1C1C1C" mt={3}>Situação do item</FormLabel>
                  <Select 
                    isRequired 
                    placeholder="Selecione a situação" 
                    bg="#E7E7E7" 
                    border="2px" 
                    borderColor="#5c1a1040" 
                    value={situacao}
                    onChange={(event) => setSituacao(event.target.value)}
                  >
                    <option value="situacao1">Situacao 1</option>
                    <option value="situacao2">Situacao 2</option>
                  </ Select>
  
                  <FormLabel color="#1C1C1C" mt={3}>Proprietário</FormLabel>
                  <Flex>
                    <Input 
                      isRequired 
                      placeholder="Proprietário do Ativo" 
                      bg="#E7E7E7" 
                      border="2px" 
                      borderColor="#5c1a1040"
                      value={proprietario}
                      onChange={(event) => setProprietario(event.target.value)}
                    />
                    <FormLabel color="#1C1C1C" mt={3}>Recebido em Doação?</FormLabel>
                    <Checkbox 
                      isRequired 
                      bg="#E7E7E7" 
                      border="2px" 
                      borderColor="#5c1a1040" 
                      value={recebidoDoacao}
                      onChange={(event) => setRecebidoDoacao(event.target.value)}
                    />
                  </Flex>
                  <FormLabel color="#1C1C1C" mt={3}>Vida útil regulatória</FormLabel>
                  <Input 
                    isRequired 
                    placeholder="Informe a vida útil" 
                    bg="#E7E7E7" 
                    border="2px" 
                    borderColor="#5c1a1040" 
                    value={vidaUtil}
                    onChange={(event) => setVidaUtil(event.target.value)}
                  />

                  <FormLabel color="#1C1C1C" mt={3}>Valor Original</FormLabel>
                  <Input 
                    isRequired 
                    placeholder="Informe o valor original do ativo" 
                    bg="#E7E7E7" 
                    border="2px" 
                    borderColor="#5c1a1040" 
                    value={valorOriginal}
                    onChange={(event) => setValorOriginal(event.target.value)}
                  />

                </FormControl>
              </Box>

              <Button colorScheme="blue"
                rightIcon={<ChevronRightIcon />}
                size="lg"
                w="100%"
                mb="4" 
                onClick={avancarParaProximoStep}
              >
                Próximo
              </Button>
              <Button colorScheme="blue"
                variant="outline"
                size="lg"
                w="100%"
                onClick={voltarParaStepAnterior}
              >
                Voltar
              </Button>
            </Box>
          )}
          {step === 4 && (
            <Grid
            templateAreas={`"nav main"`}
            gridTemplateRows={'100%'}
            gridTemplateColumns={'300px 1fr'}
            height="calc(100vh - 70px)"
            mt={1}
            gap='1'
          >
            <GridItem pl='2' bg="#1A202C" area={'nav'}>
              <Flex 
                direction="column" 
                bg="transparent" 
                p={4} 
                borderRadius="md" 
                alignContent={'center'} 
                justify={"center"} 
                color="white"
                mt={10}
                >
                <Text fontWeight="bold" mb={2}>
                  Filtros
                </Text>
                <Box>
                  <Flex align="center" mb={2} justify={'space-between'}>
                    <Text mr={2}>Sistema:</Text>
                    <Select
                      bg="#E7E7E7"
                      borderColor="#F5F5F5"
                      borderRadius="md"
                      py={2}
                      px={3}
                      width="180px"
                      placeholder="Selecione"
                      color={'black'}
                      pr={2}
                      value={selectedSistema}
                      onChange={(e) => setSelectedSistema(e.target.value)}
                    >
                      <option value="agua">Água</option>
                      <option value="esgoto">Esgoto</option>
                      <option value="outro">Outro</option>
                    </Select>
                  </Flex>
    
                  <Flex align="center" mb={2} justify={'space-between'}>
                    <Text mr={2}>Tipo de Ativo:</Text>
                    <Select
                      bg="#E7E7E7"
                      borderColor="#F5F5F5"
                      borderRadius="md"
                      py={2}
                      px={3}
                      width="180px"
                      placeholder="Selecione"
                      color={'black'}
                      pr={2}
                      value={selectedTipoAtivo}
                      onChange={(e) => setSelectedTipoAtivo(e.target.value)}
                    >
                      <option value="visivel">Visível</option>
                      <option value="enterrado">Enterrado</option>
                    </Select>
                  </Flex>
    
                  <Flex align="center" justify={'space-between'}>
                    <Text mr={2}>Localidade:</Text>
                    <Select
                      bg="#E7E7E7"
                      borderColor="#F5F5F5"
                      borderRadius="md"
                      py={2}
                      px={3}
                      width="180px"
                      placeholder="Selecione"
                      color={'black'}
                      pr={2}
                      value={selectedLocalidade}
                      onChange={(e) => setSelectedLocalidade(e.target.value)}
                    >
                      <option value="localidade1">Localidade 1</option>
                      <option value="localidade2">Localidade 2</option>
                      <option value="localidade3">Localidade 3</option>
                    </Select>
                  </Flex>
                </Box>
                <Button
                  mt={4}
                  colorScheme="blue"
                  size="lg"
                  w="100%"
                  mb="4"
                  onClick={handleFormSubmit}
                >
                  Cadastrar
                </Button>
                <Button colorScheme="blue"
                  variant="outline"
                  size="lg"
                  w="100%"
                  onClick={voltarParaStepAnterior}
                >
                  Voltar
                </Button>
                <Button colorScheme="blue"
                  size="lg"
                  w="100%"
                  mb="4"
                  mt={8} 
                  onClick={handleButtonESRI}
                >
                  ESRI (Satélite)
                </Button>
                <Button colorScheme="blue"
                  size="lg"
                  w="100%"
                  mb="4" 
                  onClick={handleButtonOSM}
                >
                  OSM (Cartográfico)
                </Button>
              </Flex>
            </GridItem>
            <GridItem bg='transparent' area={'main'}>
              <MapCadastro selectedLayer={selectedLayer}/>
            </GridItem>
          </Grid>
          )}
            
        </GridItem>
      </Grid>
    </>
    
  )
}

export default CadastroAtivos