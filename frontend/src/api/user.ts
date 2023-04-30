import api from './api'

interface RegisterData {
    username?: string;
    email: string;
    password: string;
}

export const getUsers = () => {
    return api.get('/users')
}