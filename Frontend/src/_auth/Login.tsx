import React from "react";
import {useState} from 'react'
import Swal from "sweetalert2";
import {
    ChakraProvider,
    FormLabel,
    Input,
    FormErrorMessage,
    Box,
    Text,
    FormControl,
    Button,
    Image,
    InputRightElement,
    InputGroup,
  } from "@chakra-ui/react";

import Wallpaper from '../assets/wallpaperLogin.png'
import LogoSGP from '../assets/Arsae-MG-_-logo_med.png'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);

    const handleEmail = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassword(event.target.value)
    }
    
    const handleClick = () => setShow(!show)
    
    const handleLoginClick = () => {
        if (email === "admin@admin.com" && password === "admin") {
            Swal.fire({
            icon: "success",
            title: "Logado com sucesso",
            html:
                "Clique " +
                '<b><a href="/painel">aqui</a></b>' +
                " para ir ao painel",
            showConfirmButton: false,
            })
        } if(email == "" || password == "") {
            Swal.fire({
                icon: 'warning',
                title: 'Atenção!',
                text: 'Parâmetro vazio.'
            })
        } else {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: "E-mail ou senha inválidos",
            })
        }
    }

    return (
        <ChakraProvider resetCSS>
          <Box
            // bgGradient="linear(to right, whatsapp.500,green.500,green.500)"
            backgroundImage={Wallpaper}
            backgroundSize="cover"
            width="100%"
            height="100vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            opacity={1}
            textColor="#FFF"
          >
            <Box m="auto" p={5}>
              <Box
                backgroundColor="#1A202C"
                boxShadow="lg"
                borderRadius="lg"
                p="48px"
                width="100%"
                m="auto"
                mb={10}
                maxWidth="md"
                minWidth="xs"
                mr={40}
              >
                <Box
                  mb={2}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Image
                    src={LogoSGP}
                    alt="Logo SGP"
                    htmlWidth={190}
                    htmlHeight={250}
                  />
                  <Text mt={2}>Bem-vindo(a) novamente!</Text>
                </Box>
                <Box pt={2} pb={2}>
                  <Box>
                    <FormControl mb={3}>
                      <FormLabel>Email</FormLabel>
                      <InputGroup size="md">
                        <Input
                          isRequired
                          type={show ? "text" : "email"}
                          placeholder="Insira o email"
                          onChange={handleEmail}
                        />
                        <FormErrorMessage>Erro no email</FormErrorMessage>
                      </InputGroup>
                    </FormControl>
                    <FormControl mb={4}>
                      <FormLabel>Senha</FormLabel>
                      <InputGroup size="md">
                        <Input
                          isRequired
                          type={show ? "text" : "password"}
                          placeholder="Insira a senha"
                          onChange={handlePassword}
                        />
                        <InputRightElement width="4.5rem">
                          <Button
                            h="1.75rem"
                            size="sm"
                            mr={1}
                            onClick={handleClick}
                            color="#E7E7E7"
                            textColor="#000"
                          >
                            {show ? "Esconder" : "Mostrar"}
                          </Button>
                        </InputRightElement>
                        <FormErrorMessage>Erro no email</FormErrorMessage>
                      </InputGroup>
                    </FormControl>
                    <FormControl>
                      <FormErrorMessage>Error message</FormErrorMessage>
                      <Button
                        variant="solid"
                        size="md"
                        width="100%"
                        color="#CBD5E0"
                        textColor="#000"
                        mt={2}
                        onClick={handleLoginClick}
                      >
                        Login
                      </Button>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </ChakraProvider>
      );

}

export default Login;
