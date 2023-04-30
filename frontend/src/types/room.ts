export interface UserRoomRelation {
    id: number;
    user: User;
}

export interface Room {
    id: number;
    name: string;
    isGroupChat: boolean;
    lastMessage: string;
    groupPictureUrl: string;
    createdAt: string;
    updatedAt: string;
    userRoomRelations: UserRoomRelation[];
}
