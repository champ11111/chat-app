import api from "./api";
import User from "../types/user";

interface FormData {
    name: string;
    userIds: number[];
    groupPicture: File | null;
    isGroupChat?: boolean;
}


export const getRooms = () => {
    return api.get('/rooms')
}

export const getRoomById = (id: number) => {
    return api.get(`/rooms/${id}`)
}

export const createRoom = (formData: FormData) => {
    return api.post('/rooms', formData, 
    {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const addUserToRoom = (roomId: number, userId: number) => {
    return api.post("/rooms/addUser", {
        roomId,
        userId
    })
}

export const removeUserFromRoom = (roomId: number, userId: number) => {
    return api.post("/rooms/removeUser", {
        roomId,
        userId
    })
}