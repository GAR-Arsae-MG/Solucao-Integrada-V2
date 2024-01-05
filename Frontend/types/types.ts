export type IUser = {
    id: string,
    nome: string,
    email: string,
    funcao: string,
    imagem?: string,
    agencia: string,
    token: string
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
    criado_em: Date,
    criado_por?: string,
    agencia: string,
    imagem?: string,
    groups?: string,
}