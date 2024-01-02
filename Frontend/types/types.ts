export type IUser = {
    id: string,
    nome: string,
    email: string,
    funcao: string,
    imageUrl?: string,
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