export type IUser = {
    id: string,
    nome: string,
    email: string,
    funcao: string,
    funcao_display: string,
    imagem?: string,
    agencia: string,
    token: string,
    [key: string]: string | File | undefined;
}

export type IContextType = {
    user: IUser | null,
    isLoading: boolean,
    setUser: (user: IUser | null) => void,
    isAuthenticated: boolean,
    checkAuthUser: (email: string, senha: string) => Promise<boolean>
}

export type INewUser = {
    email: string,
    senha: string,
    nome?: string
}

export type IGetUser = {
    id: string,
    email: string,
    nome: string,
    funcao: string,
    funcao_display: string,
    criado_em: Date,
    criado_por?: string,
    agencia: string,
    imagem?: string,
    groups?: string,
}

export type IUpdateUser =  {
    id: string,
    nome: string,
    email: string,
    funcao: string,
    funcao_display: string,
    imagem?: string,
    agencia: string,
    token: string,
    [key: string]: string | File | undefined;
}

//Adicionar os types dos ativos e unidades.

export type IGetUnity = {
    id: number,
    sistemas: string,
    sistemas_display: string,
    tipo: string,
    tipo_display: string,
    latitude: number,
    longitude: number,
    Município?: string,
    localidade?: string,
    Endereco?: string
}

export type IGetAdminAtivo = {
    tipo_ativo: string,
    tipo_ativo_display: string,
    nome_ativo: string,
    código_ativo: string,
    classe_ativo: string,
    classe_ativo_display: string,
    proprietario: string,
    doacao: boolean,
    valor_original: number,
    valor_atual: number,
    status: string,
    status_display: string,
    data_insercao: Date,
    previsao_substituicao: Date,
    unidade: string,
    criado_por: string,
    adquirido_por: string
}

export type IGetOpAtivo = {
    nome_de_campo: string,
    tipo_ativo: string,
    classe: string,
    fase: string,
    tipo_investimento: string,
    etapa_do_servico: string,
    situacao_atual: string,
    proprietario: string,
    doacao: boolean,
    valor_original: number,
    vida_util_reg_anos: number,
    vida_util_reg_meses: number,
    unidade: string,
    data_insercao: Date,
    data_projeto: Date,
    data_obra: Date,
    data_operacao: Date,
    criado_por: string,
    status: string,
    criado_em: Date,
    codigo: string,
    latitude: number,
    longitude: number,
    localidade?: string,
    Endereco?: string,
    status_display: string,
    tipo_ativo_display: string,
    tipo_investimento_display: string,
    etapa_do_servico_display: string
}

// Adicionar os types para os modals.

export type ModalUserEditProps = {
    isOpen: boolean,
    onOpen?: () => void,
    onOpenChange: () => void,
    onClose?: () => void,
    usuario: IGetUser | null,
}