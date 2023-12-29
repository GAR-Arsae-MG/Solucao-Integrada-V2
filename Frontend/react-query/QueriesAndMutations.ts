import { useMutation, useQuery } from '@tanstack/react-query'
import { INewUser } from '../types/types'
import { createUser, getAccounts, getCurrentUser, getGroups, getLocals, getUnits, logoutUser, revalidatePassword } from '../django/api'
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

export const useGetLocals = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_LOCALS],
        queryFn: getLocals
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