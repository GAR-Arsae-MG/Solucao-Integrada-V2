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
    setUser: React.Dispatch<React.SetStateAction<IUser>>,
    isAuthenticated: boolean,
    checkAuthUser: () => Promise<boolean>
}

export type INewUser = {
    email: string,
    senha: string,
    nome?: string
}