export interface UserRoomRelation {
    id: number;
    user: User;
}

interface User {
    id?: number;
    username: string;
    email?: string;
    password?: string;
    profilePictureUrl: string;
    createdAt?: string;
    updatedAt?: string;
    userRoomRelations?: UserRoomRelation[];
}

export default User;