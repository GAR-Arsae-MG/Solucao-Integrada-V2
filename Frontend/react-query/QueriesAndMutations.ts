/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from '@tanstack/react-query'
import { INewUser } from '../types/types'
import { createUser, getAccounts, getCurrentUser, getUsersFilters, getGroups, getUnits, logoutUser, revalidatePassword } from '../django/api'
import { QUERY_KEYS } from './QueryKeys'

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUser(user)
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

export const useGetUsers = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USERS],
        queryFn: getAccounts
    })
}

export const useGetGroups = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_GROUPS],
        queryFn: getGroups
    })
}

export const useGetSystemUnits = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_UNITS],
        queryFn: getUnits
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