/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { redirect } from 'react-router-dom'

import { IGetAdminAtivo, IGetOpAtivo, IGetUnity, IGetUser, INewUser, IUpdateUser } from '../types/types'

export const api = axios.create({
    baseURL: 'http://127.0.0.1:8001/',
    withCredentials: true
})

export async function getAccounts(filters: {funcao?: string, is_staff?: boolean, agencia?: string}) {
    const stringFilters = {
        funcao: filters.funcao || '',
        is_staff: filters.is_staff?.toString() || '',
        agencia: filters.agencia || ''
    }
    
    const params = new URLSearchParams(stringFilters)

    try {
        const response = await api.get(`/usuarios/?${params.toString()}`)
        return response.data as IGetUser[]
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

export async function getUnits(filters: {tipo?: string, sistemas?: string}) {
    const stringFilters = {
        tipo: filters.tipo || '',
        sistemas: filters.sistemas || ''
    }

    const params = new URLSearchParams(stringFilters)

    try {
        const response = await api.get(`/unidades/?${params.toString()}`)
        return response.data as IGetUnity[]
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getAtivosAdmin(filters: {tipo_ativo?: string, classe_ativo?: string, status?: string}) {
    const stringFilters = {
        tipo_ativo: filters.tipo_ativo || '',
        classe_ativo: filters.classe_ativo || '',
        status: filters.status || ''
    }

    const params = new URLSearchParams(stringFilters)

    try {
        const response = await api.get(`/ativos-administrativos/?${params.toString()}`)
        return response.data as IGetAdminAtivo[]
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getAtivosOp(filters: {tipo_ativo?: string, tipo_investimento?: string, status?: string, etapa_do_servico?: string}) {
    const stringFilters = {
        situacao_ativo: filters.tipo_ativo || '',
        tipo_investimento: filters.tipo_investimento || '',
        status: filters.status || '',
        etapa_do_servico: filters.etapa_do_servico || ''
    }

    const params = new URLSearchParams(stringFilters)

    try {
        const response = await api.get(`/ativos-operacionais/?${params.toString()}`)
        return response.data as IGetOpAtivo[]
    } catch (error) {
        console.error(error)
        throw error
    }
}


//Rotas HTTP dos models

export const updateExternalUser = async (userId: string, userData: IGetUser | null) => {
    try {
        const response = await api.patch(`/usuarios/${userId}/`, userData)
        return response.data as IGetUser
    } catch (error) {
        console.error(error)
        alert('Erro ao atualizar o usuário')
        throw error as Error
    }
}

export const deleteExternalUser = async (userId: string) => {
    try {
        const response = await api.delete(`/usuarios/${userId}/`);
        return response.data;
    } catch (error) {
        console.error(error);
        alert('Erro ao deletar o usuário');
        throw error;
    }
}

export const createExternalUnity = async (unityData: IGetUnity) => {
    try {
        const response = await api.post(`/unidades/`, unityData)
        return response.data as IGetUnity
    } catch (error) {
        console.error(error)
        alert(`Erro ao criar uma nova unidade, devido ao erro ${error as Error}`)
    }
}

export const updateExternalUnity = async (unityId: string, unityData: IGetUnity | null) => {
    try {
        const response = await api.patch(`/unidades/${unityId}/`, unityData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data as IGetUnity
    } catch (error) {
        console.error(error)
        alert(`Erro ao atualizar a unidade, devido ao erro ${error as Error}`)
    }
}

export const deleteExternalUnity = async (unityId: string) => {
    try {
        const response = await api.delete(`/unidades/${unityId}/`);
        return response.data;
    } catch (error) {
        console.error(error);
        alert('Erro ao deletar a unidade');
        throw error;
    }
}

export const createExternalAtivoAdmin = async (ativoData: IGetAdminAtivo) => {
    try {
        const response = await api.post('/ativos-administrativos/', ativoData)
        return response.data as IGetAdminAtivo
    } catch (error) {
        console.error(error)
        alert(`Erro ao criar um novo ativo, devido ao erro ${error as Error}`)
    }
}

export const updateExternalAtivoAdmin = async (ativoId: string, ativoData: IGetAdminAtivo | null) => {
    try {
        const response = await api.patch(`/ativos-administrativos/${ativoId}/`, ativoData)
        return response.data as IGetAdminAtivo
    } catch (error) {
        console.error(error)
        alert(`Erro ao atualizar o ativo, devido ao erro ${error as Error}`)
    }
}

export const deleteExternalAtivoAdmin = async (ativoId: string) => {
    try {
        const response = await api.delete(`/ativos-administrativos/${ativoId}/`);
        return response.data;
    } catch (error) {
        alert('Erro ao deletar ativo')
        throw error as Error
    }
}

export const createExternalAtivoOp = async (ativoData: IGetOpAtivo) => {
    try {
        const response = await api.post(`/ativos-operacionais/`, ativoData)
        return response.data as IGetOpAtivo
    } catch (error) {
        console.error(error)
        alert(`Erro ao criar um novo ativo, devido ao erro ${error as Error}`)
    }
}

export const updateExternalAtivoOp = async (ativoId: string, ativoData: IGetOpAtivo | null) => {
    try {
        const response = await api.patch(`/ativos-operacionais/${ativoId}/`, ativoData)
        return response.data as IGetOpAtivo
    } catch (error) {
        console.error(error)
        alert(`Erro ao atualizar o ativo, devido ao erro ${error as Error}`)
    }
}

export const deleteExternalAtivoOp = async (ativoId: string) => {
    try {
        const response = await api.delete(`/ativos-operacionais/${ativoId}/`);
        return response.data;
    } catch (error) {
        alert('Erro ao deletar ativo')
        throw error as Error
    }
}

// Rotas de Parâmetros dos models

export async function getFuncoes() {
    try {
        const response = await api.get('/funcoes/')
        const funcoes = response.data
        return funcoes
    } catch (error) {
        console.error('Erro ao buscar funções')
    }
}

export async function getStaff() {
    try {
        const response = await api.get('/staff/')
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getOpTipoAtivo() {
    try {
        const response = await api.get('/ativos-op-tipo_ativo/')
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getOpTipoInvestimento() {
    try {
        const response = await api.get('/ativos-op-tipo_investimento/')
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getOpStatus() {
    try {
        const response = await api.get('/ativos-op-status/')
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getOpEtapaServico() {
    try {
        const response = await api.get('/ativos-op-etapa_servico/')
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getAdminStatus() {
    try {
        const response = await api.get('/ativos-admin-status/')
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getAdminClasseAtivo() {
    try {
        const response = await api.get('/ativos-admin-classe_ativo/')
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getAdminTipoAtivo() {
    try {
        const response = await api.get('/ativos-admin-tipo_ativo/')
        return response.data 
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getUnitSistemas() {
    try {
        const response = await api.get('/unidade-sistemas/')
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getUnitTipos() {
    try {
        const response = await api.get('/unidade-tipos/')
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

// Rotas de AUTENTICAÇÃO/API

export async function getCurrentUser({email, senha}: INewUser) {
    try {
        const response = await api.post('/api-token-auth/', {email: email, senha: senha})

        if (response.status === 200) {
            return (response.data)
        
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

export const updateCurrentUser = async (userData: IUpdateUser) => {
    try {
        const authToken = localStorage.getItem('authToken')
        const formData = new FormData()

        for (const key of Object.keys(userData)) {
            let value: string | undefined | Blob = userData[key as keyof IUpdateUser];
            if (value !== undefined) {
                if (key === 'imagem' && typeof value === 'string') {
                    const response = await fetch(value);
                    value = await response.blob();
                }
                formData.append(key, value);
            }
        }

        const response = await api.put(`api/updateCurrentUser/`, formData, {
            headers: {
                Authorization: `Token ${authToken}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data as IUpdateUser;
    } catch (error) {
        console.error(error);
        alert('Erro ao atualizar o usuário atual');
        throw error;
    }
}
    
export async function createUser({email, senha, nome}: INewUser) {
    try {
        const response = await api.post('/api/register/', {email: email, senha: senha, nome: nome})

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
        const response = await api.post('/api/logout/', {token: token})

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

export async function revalidatePassword({email, senha}: INewUser) {
    try {
        const response = await api.post('/api/revalidate-password/', {email: email, senha: senha})

        if (response.status === 200) {
            return (response.data) && redirect('/login')
        } else {
            throw new Error('Erro ao revalidar a senha')
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

// Rotas de Filtros

export async function getUsersFilters(filters: any) {
    try {

        const currentParams = new URLSearchParams(window.location.search)

        for (const key in filters) {
            currentParams.append(key, filters[key])
        }

        for (const key in filters) {
            if (currentParams.has(key)) {
                currentParams.set(key, filters[key])
            }
        }

        const newUrl = `/usuarios/?${currentParams.toString()}`

        const response = await api.get(newUrl)
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error('Erro ao filtrar usuários')
    }
}

export async function getUnitiesFilters(filters: any) {
    try {

        const currentParams = new URLSearchParams(window.location.search)

        for (const key in filters) {
            currentParams.append(key, filters[key])
        }

        for (const key in filters) {
            if (currentParams.has(key)) {
                currentParams.set(key, filters[key])
            }
        }

        const newUrl = `/unidades/?${currentParams.toString()}`

        const response = await api.get(newUrl)
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error('Erro ao filtrar unidades')
    }
}

export async function getAtivosAdminFilters(filters: any) {
    try {
        const currentParams = new URLSearchParams(window.location.search)

        for (const key in filters) {
            currentParams.append(key, filters[key])
        }

        for (const key in filters) {
            if (currentParams.has(key)) {
                currentParams.set(key, filters[key])
            }
        }

        const newUrl = `/ativos-administrativos/?${currentParams.toString()}`

        const response = await api.get(newUrl)

        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getAtivosOpFilters(filters: any) {
    try {
        const currentParams = new URLSearchParams(window.location.search)

        for (const key in filters) {
            currentParams.append(key, filters[key])
        }

        for (const key in filters) {
            if (currentParams.has(key)) {
                currentParams.set(key, filters[key])
            }
        }

        const newUrl = `/ativos-operacionais/?${currentParams.toString()}`

        const response = await api.get(newUrl)

        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}
