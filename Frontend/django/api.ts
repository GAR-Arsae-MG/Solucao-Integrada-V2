import axios from 'axios'
import { INewUser, IRequestProps } from '../types/types'

export const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
})

export async function getAccount() {
    try {
        const response = await api.get('/usuarios/')
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getCurrentUser({email, password}: INewUser) {
    try {
        const response = await api.get('/api-token-auth/')

        const requestOptions = await api({
            method: 'POST',
            url: '/api-token-auth/',
            data: {
                username: email,
                password: password
            }
        })

        const status = response.status
        const user = await response.data()

        console.log(status, user)

        return user

    }   catch (error) {
        console.error(error)
        throw error
    }}
    