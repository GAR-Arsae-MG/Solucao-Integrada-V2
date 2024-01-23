/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from '@tanstack/react-query'

import { createUser, getAccounts, getAtivosAdmin, getAtivosAdminFilters, getAtivosOp, getAtivosOpFilters, getCurrentUser, getGroups, getUnitiesFilters, getUnits, getUsersFilters, logoutUser, revalidatePassword, updateCurrentUser } from '../django/api'
import { IGetUser, INewUser } from '../types/types'
import { QUERY_KEYS } from './QueryKeys'

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUser(user)
    })
}

export const useUpdateUserAccount = () => {
    return useMutation({
        mutationFn: (userData: IGetUser) => updateCurrentUser(userData)
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: {
            email: string
            senha: string
        }) => getCurrentUser(user)
    })
}

export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: logoutUser
    })
}

export const useRevalidatePassword = () => {
    return useMutation({
        mutationFn: (user: {
            email: string
            senha: string
        }) => revalidatePassword(user)
    })
}

//Queries de consulta

export const useGetUsers = (filters: {funcao?: string, is_staff?: boolean, agencia?: string}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USERS, filters],
        queryFn:() => getAccounts(filters)
    })
}

export const useGetGroups = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_GROUPS],
        queryFn: getGroups
    })
}

export const useGetAtivosAdmin = (filters: {tipo_ativo?: string, classe_ativo?: string, status?: string}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ATIVOS_ADMIN],
        queryFn:() => getAtivosAdmin(filters)
    })
}

export const useGetAtivosOp = (filters: {tipo_ativo?: string, tipo_investimento?: string, status?: string, etapa_do_servico?: string}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ATIVOS_OP],
        queryFn:() => getAtivosOp(filters)
    })
}

export const useGetUnits = (filters: {tipo?: string, sistemas?: string}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_UNITS],
        queryFn:() => getUnits(filters)
    })
}

export const useGetUsersFilters = (filters: any) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USERS_FILTERS, filters],
        queryFn:() => getUsersFilters(filters),
        staleTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
        enabled: !!filters,
        refetchOnMount: true
    })
}

export const useGetAtivosOpFilters = (filters: any) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ATIVOS_OP_FILTERS, filters],
        queryFn: () => getAtivosOpFilters(filters),
        staleTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
        enabled: !!filters,
        retryOnMount: true
    })
}

export const useGetAtivosAdminfilters = (filters: any) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ATIVOS_ADMIN_FILTERS, filters],
        queryFn: () => getAtivosAdminFilters(filters),
        staleTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
        enabled: !!filters,
        retryOnMount: true
    })
}

export const useGetUnitsFilters = (filters: any) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_UNITS_FILTERS, filters],
        queryFn: () => getUnitiesFilters(filters),
        staleTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
        enabled: !!filters,
        retryOnMount: true
    })
}

