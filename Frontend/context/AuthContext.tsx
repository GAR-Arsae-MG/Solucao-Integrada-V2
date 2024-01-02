import React, { createContext, useContext, useEffect, useState } from "react"
import { IContextType, IUser } from "../types/types"
import { useNavigate } from "react-router-dom"
import { getCurrentUser } from "../django/api"


const INITIAL_USER = {
    id: '',
    nome: '',
    email: '',
    funcao: '',
    imageUrl: '../src/assets/pessoa.svg',
    agencia: '',
    token: '',
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    checkAuthUser: async () => false as boolean
}

const AuthContext = createContext<IContextType | undefined>(INITIAL_STATE)

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<IUser | null>(INITIAL_USER)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    const navigate = useNavigate()

     const checkAuthUser = async (email: string, senha: string): Promise<boolean> => {
        setIsLoading(true)

        try {
            const currentAccount = await getCurrentUser({ email, senha })

            if (currentAccount) {
                setUser(currentAccount)
                setIsAuthenticated(true)
                localStorage.setItem('user', JSON.stringify(currentAccount))
                navigate('/')
                return true
            }
            return false
        } catch (error) {
            console.log(error)
            return false
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
            setIsAuthenticated(true)
        } else {
            navigate('/login')
        }
    }, [navigate])

    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        checkAuthUser
    }

    return ( 
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider')
    }
    return context
}