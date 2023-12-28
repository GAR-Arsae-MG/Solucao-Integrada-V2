/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { INewUser, IUser } from '../types/types'
import { redirect } from 'react-router-dom'

export const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
})

export async function getAccounts() {
    try {
        const response = await api.get('/usuarios/')
        return response.data as JSON
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getLocals() {
    try {
        const response = await api.get('/locais/')
        return response.data as JSON
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getGroups() {
    try {
        const response = await api.get('/grupos/')
        return response.data as JSON
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getUnits() {
    try {
        const response = await api.get('/unidades/')
        return response.data as JSON
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getAtivos() {
    try {
        const response = await api.get('/ativos/')
        return response.data as JSON
    } catch (error) {
        console.error(error)
        throw error
    }
}


export async function getCurrentUser({email, senha}: INewUser) {
    try {
        const response = await api.post('/api-token-auth/', {email: email, senha: senha})

        if (response.status === 200) {
            return (response.data) && redirect('/')
        
        } else {
            throw new Error('Credenciais inválidas')
        } 
        

    }   catch (error: any) {
        if (error.response) {
            console.error(error.response.data)
            console.error(error.response.status)
            console.error(error.response.headers)
        }else if (error.request) {
            console.error(error.request)
        } else {
            console.error('Erro', error.message)
        }
        throw error
    }
}
    
export async function createUser({email, senha, nome}: INewUser) {
    try {
        const response = await api.post('/api/register', {email: email, senha: senha, nome: nome})

        if (response.status === 201) {
            return (response.data) && redirect('/login')
        
        } else {
            throw new Error('Erro ao criar usuário')
        }
    } catch (error: any) {
        if (error.response) {
            console.error(error.response.data)
            console.error(error.response.status)
            console.error(error.response.headers)
        }else if (error.request) {
            console.error(error.request)
        } else {
            console.error('Erro', error.message)
        }
        throw error
    }
}

export async function logoutUser(token: string) {
    try {
        const response = await api.post('/api/logout', {token: token})

        if (response.status === 200) {
            redirect('/login')
        
        } else {
            throw new Error('Erro ao fazer logout')
        }
    } catch (error: any) {
        if (error.response) {
            console.error(error.response.data)
            console.error(error.response.status)
            console.error(error.response.headers)
        }else if (error.request) {
            console.error(error.request)
        } else {
            console.error('Erro', error.message)
        }
        throw error
    }
}


export async function getInfoUser(token:string): Promise<IUser> {
    try {
        const response = await api.get('/api/user-info', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (response.status === 200) {
            return response.data as IUser
        
        } else {
            throw new Error('Erro ao buscar informações do usuário')
        }
    } catch (error: any) {
        if (error.response) {
            console.error(error.response.data)
            console.error(error.response.status)
            console.error(error.response.headers)
        }else if (error.request) {
            console.error(error.request)
        } else {
            console.error('Erro', error.message)
        }
        throw error
    }
}