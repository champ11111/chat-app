import api from './api'

interface RegisterData {
    username?: string;
    email: string;
    password: string;
}

export const getUsers = () => {
    return api.get('/users')
}

export const getUserByID = (id: number) => {
    return api.get(`/users/${id}`)
}

export const getUser = (uid : any) => {
    return api.get(`/users/${uid}`)
}

export const updateUser = (uid : number,formData : FormData) => {
    return api.put(`/users/${uid}`,formData,
    {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    },
    )
}