export type IUser = {
    id: string,
    name: string,
    email: string,
    imageUrl: string,
    agency: string
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