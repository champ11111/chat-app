import api from './api'

interface RegisterData {
    username?: string;
    email: string;
    password: string;
}

export const register = ({ username, email, password }: RegisterData) => {
    return api.post('/auth/register', {
        username,
        email,
        password
    },
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    )
}

export const login = ({ email, password }: RegisterData) => {
    return api.post('/auth/login', {
        email,
        password
    })
}