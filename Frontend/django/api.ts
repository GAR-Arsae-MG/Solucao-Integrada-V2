import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:8000/',
})

export async function getAccount() {
    try {
        const response = await api.get('/api/usuarios/')
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await getAccount()
    
        if (!currentAccount || currentAccount.length === 0) {
            throw new Error('Conta não encontrada')
        }
    
        const currentUser = await api.get(`/api/usuarios/${currentAccount.id}/`)
        
        if (!currentUser) {
            throw new Error('Usuário não encontrado')
        }
    
        return currentUser.data

    }   catch (error) {
        console.error(error)
        throw error
    }}
    