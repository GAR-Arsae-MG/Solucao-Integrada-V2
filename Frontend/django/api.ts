import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:8000/',
})

export async function getCurrentUser() {
    try {
        const response = axios.get('users/')
    }
}