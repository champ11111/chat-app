import api from "./api";
import User from "../types/user";

interface roomCreateData {
    name: string;
    isGroupChat: boolean;
    userIds: number[];
    groupPicture?: string;
}

export const getRooms = () => {
    return api.get('/rooms')
}

export const getRoomById = (id: number) => {
    return api.get(`/rooms/${id}`)
}

export const createRoom = (data: roomCreateData) => {
    return api.post('/rooms', data, 
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