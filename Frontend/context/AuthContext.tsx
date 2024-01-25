import React, { createContext, useContext, useEffect, useState } from "react"
import { IContextType, IUser } from "../types/types"
import { useNavigate } from "react-router-dom"
import { getCurrentUser } from "../django/api"
import axios from "axios"


const INITIAL_USER = {
    id: '',
    nome: '',
    email: '',
    funcao: '',
    funcao_display: '',
    imagem: '../src/assets/pessoa.svg',
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

    const setAuthTokens = (authToken: string) => {
        localStorage.setItem('authToken', authToken);
        axios.defaults.headers.common['Authorization'] = `Token ${authToken}`;
    };

    const clearAuthTokens = () => {
        localStorage.removeItem('authToken');
        delete axios.defaults.headers.common['Authorization'];
  
    };

     const checkAuthUser = async (email: string, senha: string): Promise<boolean> => {
        setIsLoading(true)

        try {
            const currentAccount = await getCurrentUser({ email, senha })

            if (currentAccount) {
                setUser(currentAccount)
                setIsAuthenticated(true)
                localStorage.setItem('user', JSON.stringify(currentAccount))
                setAuthTokens(currentAccount.token)
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
        const authToken = localStorage.getItem('authToken');
        if (storedUser && authToken) {
            setUser(JSON.parse(storedUser))
            setAuthTokens(authToken)
            setIsAuthenticated(true)
        } else {
            clearAuthTokens()
            const currentPath = window.location.pathname

            if (currentPath !== '/registro' && currentPath !== '/revalidar-senha') {
                navigate('/login')
            }
        }
        axios.defaults.withCredentials = true;
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