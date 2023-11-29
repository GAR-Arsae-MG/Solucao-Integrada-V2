import pessoaSVG from '../assets/pessoa.svg'

const columns = [
    {name: "EMAIL", uid: "email"},
    {name: "FUNÇÃO", uid: "role"},
    {name: "AGÊNCIA", uid: "agency"},
    {name: 'TELEFONE', uid: "tel"},
    {name: "ACTIONS", uid: "actions"},
  ];

  const users = [
    {
      id: 0,
      nome: "Pedro",
      avatar: pessoaSVG,
      email: "ra@ra.com",
      funcao: "administrador",
      time: 'Sanarj-MG',
      telefone: "31313131"
    },

    {
      id: 1,
      nome: "Ana",
      avatar: pessoaSVG,
      email: "re@re.com",
      funcao: "regulador",
      time: 'Arsae-MG',
      telefone: "31313131"
    },

    {
      id: 2,
      nome: "Maria",
      avatar: pessoaSVG,
      email: "ri@ri.com",
      funcao: "Operário",
      time: 'Sanarj-MG',
      telefone: "31313131"
    },

    {
      id: 0,
      nome: "Gabriel",
      avatar: pessoaSVG,
      email: "ra@ra.com",
      funcao: "administrador",
      time: 'Sanarj-MG',
      telefone: "31313131"
    },

    {
      id: 1,
      nome: "José",
      avatar: pessoaSVG,
      email: "re@re.com",
      funcao: "regulador",
      time: 'Arsae-MG',
      telefone: "31313131"
    },

    {
      id: 2,
      nome: "Elias",
      avatar: pessoaSVG,
      email: "ri@ri.com",
      funcao: "Diretor",
      time: 'Sanarj-MG',
      telefone: "31313131"
    },

    {
      id: 0,
      nome: "Julia",
      avatar: pessoaSVG,
      email: "ra@ra.com",
      funcao: "administrador",
      time: 'Arsae-MG',
      telefone: "31313131"
    },
]

export {columns, users}