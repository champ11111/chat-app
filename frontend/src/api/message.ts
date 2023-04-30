import api from './api'

export const getMessages = () => {
    return api.get('/messages')
}

export const getMessagesByRoomId = (roomId: number) => {
    return api.get(`/messages/${roomId}`)
}

export const sendMessageToRoom = (roomId: number, content: string, type: string) => {
    return api.post(`/messages`,{ content,type,roomId },{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}