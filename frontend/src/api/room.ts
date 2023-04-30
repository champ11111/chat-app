import api from "./api";
import User from "../types/user";

export const getRooms = () => {
    return api.get('/rooms')
}

export const getRoomById = (id: number) => {
    return api.get(`/rooms/${id}`)
}

export const createRoom = (name: string, isGroupChat: boolean, userIds: number[]) => {
    return api.post('/rooms', {
        name,
        isGroupChat,
        userIds
    })
}

export const addUserToRoom = (roomId: number, userId: number) => {
    return api.post("/rooms/addUser", {
        roomId,
        userId
    })
}
