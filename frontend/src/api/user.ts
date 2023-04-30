import api from './api'

interface RegisterData {
    username?: string;
    email: string;
    password: string;
}

export const getUsers = () => {
    return api.get('/users')
}

export const getUser = (uid : any) => {
    return api.get(`/users/${uid}`)
}

export const updateUser = (uid : any, email : string, username:string, password: string) => {
    return api.put(`/users/${uid}`, {
        email,
        username,
        password
    },
    {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
    },
    )
}