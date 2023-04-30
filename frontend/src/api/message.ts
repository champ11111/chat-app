import api from './api'

export const getMessages = () => {
    return api.get('/messages')
}

export const getMessagesByRoomId = (roomId: number) => {
    return api.get(`/messages/${roomId}`)
}

export const sendMessageToRoom = (roomId: number, content: string, type: string) => {
    return api.post(`/messages`,{ content,type,roomId },{
        //i want to send the token to the backend
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }
        })
}       