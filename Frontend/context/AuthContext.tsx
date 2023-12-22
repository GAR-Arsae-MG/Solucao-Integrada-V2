import { createContext, useState } from "react"
import { IContextType, IUser } from "../types/types"
import { useNavigate } from "react-router-dom"
import { getCurrentUser } from "../django/api"

export const INITIAL_USER = {
    id: '',
    name: '',
    email: '',
    imageUrl: '',
    agency: '',
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    checkAuthUser: async () => false as boolean,
}

const AuthContext = createContext<IContextType>(INITIAL_STATE)

const AuthProvider = ({ children }: { children: React.ReactNode}) => {
    const [user, setUser] = useState<IUser>(INITIAL_USER)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    const navigate = useNavigate()

    const checkAuthUser = async () => {
        setIsLoading(true)

        try {
            const currentAccount = await getCurrentUser()

            if (currentAccount) {
                setUser({
                    id: currentAccount.id,
                    name: currentAccount.name,
                    email: currentAccount.email,
                    imageUrl: currentAccount.image,
                    agency: currentAccount.agency
                })
            }
            
        }
    }
}