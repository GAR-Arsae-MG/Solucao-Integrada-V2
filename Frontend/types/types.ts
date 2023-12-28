export type IUser = {
    id: string,
    nome: string,
    email: string,
    funcao: string,
    imageUrl?: string,
    agencia: string
}

export type IContextType = {
    user: IUser,
    isLoading: boolean,
    setUser: (user: IUser) => void,
    isAuthenticated: boolean,
    checkAuthUser: (email: string, senha: string) => Promise<boolean>
}

export type INewUser = {
    email: string,
    senha: string,
    nome?: string
}