import User from "./user";

export interface readerMessageRelation {
    readerId: number;
    messageId: number;
}

interface Message {
    id?: number;
    content: string;
    type: string;
    createdAt?: string;
    updatedAt?: string;
    readerMessageRelations?: readerMessageRelation[];
    sender: User;
}

export default Message;