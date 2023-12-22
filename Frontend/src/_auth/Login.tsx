import React from "react";
import {useState} from 'react'
import Swal from "sweetalert2";


import LogoSGP from '../assets/Arsae-MG-_-logo_med.png'
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";

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
                '<b><a href="/">aqui</a></b>' +
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
        <>
          <div>
            <Card className="w-[1200px] h-[800px] flex flex-col bg-slate-800">
              <CardBody className="overflow-auto scrollbar-hide">
                <Tabs
                  fullWidth
                  size="md"
                  aria-label="Login"
                >
                  <Tab
                    key="login"
                    title="Login"
                  >
                    
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>

          </div>
        </>
      );

}

export default Login;
