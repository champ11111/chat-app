import api from "./api";

export const sendMessage = (data: {senderId:number ;roomId: number; content: string }) => {
    return api.post("/messages", data);
};